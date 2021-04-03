# Fullstack-Monitor
## About
Fullstack-monitor is a logging Tool for Developers, to be able to see console logs, request, response from Client and Server side of application. It is currently intended to use in developer mode. 

## Instructions

### Installation
```
npm install fullstack-monitor
```
### Front-end Setup
1. Import fullstack-monitor in front-end, usually in index.js
```
  import FL from ‘fullstack-monitor’
```
            
2. Configure for the user's desired port, by default it will set to 3861.
```
  FL.config.port = 3861
  FL.setup();
```

### Back-end Setup
1. Import fullstack- monitor in back-end, usually in server.js
```
  const fl = require(‘fullstack-monitor’);
  fl.setup();
```

2. Invoke  fl.run  after all routes are acquried/imported.
```
  App.use(fl.run);
```


### Run
Run your application with
```
  npm run dev
```

### User-Interface
Go to localhost:3861 or the port configured to see the user interface of fullstack-monitor

#### Main Page
![Alt text](/img/main_page.PNG?raw=true "Main Page")

#### Detailed Tab
![Alt text](/img/detailed_info.PNG?raw=true "Detailed Info")

#### Custom Logs
![Alt text](/img/custom_logs.PNG?raw=true "Custom Logs")




## Contributors

- Paulo
- Aye
- Mohammed
- Tom
