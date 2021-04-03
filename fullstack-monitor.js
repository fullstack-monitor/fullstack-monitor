require('console.history');
const client = require('socket.io-client');
const Queue = require('./queue.js');

let socket;
let pauseMonitoring = true
const config = { PORT: null };
const queue = new Queue();
const preQueue = [];

const getStack = (type, args) => {
  // Get stack trace information. By throwing an error, we get access to
  // a stack trace. We then go up in the trace tree and filter out
  // irrelevant information.
  var stack = false;
  try {
    throw Error('');
  } catch (error) {
    // The lines containing 'console-history.js' are not relevant to us.
    var stackParts = error.stack.split('\n');
    stack = [];
    for (var i = 0; i < stackParts.length; i++) {
      if (
        stackParts[i].indexOf('console-history.js') > -1 ||
        stackParts[i].indexOf('console-history.min.js') > -1 ||
        stackParts[i] === 'Error'
      ) {
        continue;
      }
      stack.push(stackParts[i].trim());
    }
  }
  stack.shift();
  stack.shift();
  return stack;
}

const setup = async () => {
  socket = client.connect(`http://localhost:${config.PORT || 3861}/`);

  console._intercept = (type, args) => {
    if (type === 'warn' || type === 'info') return null;
    const logTimestamp = new Date()
      .toISOString()
      .split('T')
      .join(' - ')
      .slice(0, -1)

    console._log('before WS is setup intercept function');
    // console._log(`type`, type);
    // console._log(`args`, args);
    preQueue.push({
      type,
      args,
      stack: getStack(type, args),
      timestamp: logTimestamp
    })
    console._collect(type, args);
  }

  function resolveWSConnection() {
    return new Promise((resolve) => {
      socket.on('connect', () => {
        pauseMonitoring = false;
        resolve('connected');
      });

      socket.on('connect_error', () => {
        console._log('Connection Failed to Socket');
        resolve('not connected');
      });
    });
  }

  await resolveWSConnection();

  console._intercept = (type, args) => {
    if (type === 'warn' || type === 'info') return null;
      // Collect the timestamp of the console log.
      const time = new Date().toISOString().split('T').join(' - ').slice(0, -1);
    // Your own code can go here, but the preferred method is to override this
    // function in your own script, and add the line below to the end or
    // begin of your own 'console._intercept' function.
    // REMEMBER: Use only underscore console commands inside _intercept!
    const stack = getStack(type, args);
    queue.enqueue(() => console._collect(type, args, stack, time));
  };
  console._collect = (type, args, stack, timestamp) => {
    return new Promise((resolve) => {
      // Make sure the 'type' parameter is set. If no type is set, we fall
      // back to the default log type.
      if (!type) type = 'log';

      // To ensure we behave like the original console log functions, we do not
      // output anything if no arguments are provided.
      if (!args || args.length === 0) return;

      // Act normal, and just pass all original arguments to
      // the origial console function :)
      console['_' + type].apply(console, args);

      // Add the log to our history.
      const data = {
        class: 'server',
        type,
        timestamp,
        log: args[0],
        stack,
      };
      socket.emit('store-logs', data);
      socket.on('store-logs', () => {
        resolve('Success');
        console.history.push({
          type,
          timestamp,
          arguments: args,
          stack,
        });
      });
    });
  };
};

const run = (req, res, next) => {
  // Collect the timestamp of the console log.
  const timestamp = new Date().toISOString().split('T').join(' - ').slice(0, -1);
  if (!pauseMonitoring) {
    queue.enqueue(() => {
      return new Promise((resolve) => {
        const oldWrite = res.write;
        const oldEnd = res.end;
        const chunks = [];

        res.write = (...restArgs) => {
          chunks.push(Buffer.from(restArgs[0]));
          oldWrite.apply(res, restArgs);
        };

        res.end = (...restArgs) => {
          if (restArgs[0]) {
            chunks.push(Buffer.from(restArgs[0]));
          }
          const body = Buffer.concat(chunks).toString('utf8');

          // Add the log to our history.
          const data = [
            {
              class: 'request',
              timestamp,
              fromIP:
                req.headers['x-forwarded-for'] || req.connection.remoteAddress,
              method: req.method,
              originalUri: req.originalUrl,
              uri: req.url,
              requestData: req.body,
            },
            {
              class: 'response',
              timestamp,
              responseData: body,
              responseStatus: res.statusCode,
              referer: req.headers.referer || '',
            },
          ];
          socket.emit('store-logs', data);
          socket.on('store-logs', () => resolve('Success'));
          resolve('ERROR');
          oldEnd.apply(res, restArgs);
        };
        next();
      });
    });
  } else {
    next();
  }
};

module.exports = {
  run,
  setup,
  config,
};
