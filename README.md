# Fullstack-Monitor
## About
Fullstack-monitor is a logging Tool for Developers, to be able to see console logs, request, response from Client and Server side of application. It is currently intended to use in developer mode. The Tool has  two dependencies, console.history and socket.io.

## Instructions

### Installation
```
npm install fullstack-monitor
```
### Front-end Setup
1. Import fullstack-monitor in front-end, usually in index.js
```
  import FL from 'fullstack-monitor'
```
            
2. Configure for the user's desired port, by default it will set to 3861.
```
  FL.config.port = 3861
  FL.setup();
```

### Back-end Setup
1. Import fullstack- monitor in back-end, usually in server.js
```
  const fl = require('fullstack-monitor');
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
1. Go to localhost:3861 or the port configured to see the user interface of fullstack-monitor
2. In Home Page, all logs types are logs are shown, currently there are four diffrent types of logs.
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




## Contributors

- Paulo
- Aye
- Mohammed
- Tom
