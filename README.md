# Fullstack-Monitor

## Instructions

### Installation
```
npm install fullstack-monitor
```

### Setup
#### Front-End Setup
1. Import fullstack-monitor in front-end, usually in index.js, very top level of your applicaiton
	
``` 
import FL from ‘fullstack-monitor’
```
            
2. Configure for the  desired port with config.port . Default port is set to 3861.
```
FL.config.port = 3861
FL.setup();
```



#### Backend Setup
1. Import fullstack- monitor in back-end, usually in server.js
```
const fl = require(‘fullstack-monitor’);
fl.setup();
```

2. Invoke this fl.run middleware after all routes are acquried/imported.
```
App.use(fl.run);
```


### Run
Run your application with
```
     npm run dev
```

### User Interface
Go to localhost:3861 or the port configured to see the user interface of
fullstack-monitor


![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title")

## Contributors

- Paulo
- Aye
- Mohammed
- Tom
