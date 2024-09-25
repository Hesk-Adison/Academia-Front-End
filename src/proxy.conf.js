
const PROXY_CONFIG = [
  {  
    
    context: ['/Api'],
    target:'https://upload.dmzsoftware.co.mz',
    secure: false,
    //logLevel: 'debug',
    pathRewrite: { 'Api': 'https://upload.dmzsoftware.co.mz'  }



//  context: ['/Api'],
//     target:'https://upload.dmzsoftware.co.mz/',
//     secure: false,
//     logLevel: 'debug',
//     pathRewrite: { 'Api': ''  },
//     "architect": {
//       "serve": {
//       "builder": "@angular-devkit/build-angular:dev-server",
//       "options": {
//       "browserTarget": "your-application-name:build",
//       "proxyConfig": "src/proxy.conf.json"
//       }
//     }
//   }


    // "target": "http://localhost:3000",
    // "secure": false
}
]


// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });
    

module.exports = PROXY_CONFIG   