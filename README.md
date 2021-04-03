![](./img/Fullstack-Monitor-Banner.jpeg)

- [About](#about)
  - [Instructions](#instructions)
    - [Installation](#installation)
    - [Front-end Setup](#front-end-setup)
    - [Back-end Setup](#back-end-setup)
    - [Run](#run)
    - [User-Interface](#user-interface)
  - [Example Project](#example-project)
  - [Contributors](#contributors)

# About
Fullstack-monitor is log monitoring tools for developers, offering visibility of console logs, requests and responses from both the Client and Server side of your application in one single place.

This makes it easy to see what is happening across the stack as your front and back-end communicate.

In order to use this, you must also install the [Fullstack-Monitor-CLI](https://github.com/PFA-Pink-Fairy-Armadillo/fullstack-monitor-cli) npm package.

- [Fullstack-Monitor-CLI Github](https://github.com/PFA-Pink-Fairy-Armadillo/fullstack-monitor-cli).
- [Fullstack-Monitor-CLI NPM Package](https://www.npmjs.com/package/fullstack-monitor-cli).

- [Fullstack-Monitor NPM Package](https://www.npmjs.com/package/fullstack-monitor)

## Instructions

### Installation
```
npm install fullstack-monitor
```
### Front-end Setup
1. Import fullstack-monitor in front-end, usually `in index.js`.
```
  import FL from 'fullstack-monitor'
```
            
2. Invoke the `FL.setup` function with the string `client` argument.
```
  FL.setup('client');
```
- Please note, any code executed before the `setup` function is invoked will not be monitored.

### Back-end Setup
1. Import fullstack- monitor in back-end, usually in `server.js` or `index.js`, with the `server` argument. 
```
  const fl = require('fullstack-monitor');
  fl.setup('server');
```

1. Pass the `fl.run` into `app.use` as a middleware function, where `app` refers to `const app = express();`.
```
  app.use(fl.run);
```


### Run
Run your application with
```
  npm run dev
```
- Or the equivalent command in your setup.

### User-Interface
1. Globally install [Fullstack-Monitor-CLI](https://www.npmjs.com/package/fullstack-monitor-cli)
```
$ npm install -g fullstack-monitor-cli
```
2. Bootup the `Fullstack-Monitor-CLI` server.
```
$ fullstack-monitor-cli --start
```
3. Go to `localhost:3861` or the port configured to see the user interface of fullstack-monitor. Or just use the `--chrome` command:
```
$ fullstack-monitor-cli --chrome
```
4. In Home Page, all logs types are logs are shown, currently there are four diffrent types of logs.
    - Console.log coming from the client side - as  Type : Client
    - Console.log coming from the server side - as  Type : Server
    - Request coming from the client side - as Type : Request
    - Repond going out from server side - as Type : Server
    
![Alt text](/img/main_page.PNG?raw=true "Main Page")

3. For each Type, users can navigate through the Top Menu bar.
4. There's Custom Tab in Top Menu Bar where user can select only the Type they want to see.

![Alt text](/img/custom_logs.PNG?raw=true "Custom Logs")

5. By clicking on the each indiviaul line of data, detailed information of each log can be seen.

![Alt text](/img/detailed_info.PNG?raw=true "Detailed Info")

6. With the Delete Button, users can delele all existing logs.

## Example Project

For an example of `Fullstack-Monitor` installed on a project see this GitHub Repo here:

- [Example-Project](https://github.com/PFA-Pink-Fairy-Armadillo/Example-Project)

## Contributors

- [Paulo Choi](https://github.com/paulochoi)
- [Aye Moe](https://github.com/ayemmoe)
- [Mohammed Naser](https://github.com/mnaser11218)
- [Tom Harper](https://github.com/tommyrharper)
