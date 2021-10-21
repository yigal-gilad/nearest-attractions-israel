const express = require('express');
const app = express();
const http = require('http');
// const debug = require('debug')()
const helmet = require('helmet');
const clc = require("cli-color");
const mongoose = require('mongoose');
const server = http.Server(app);
const bodyParser = require("body-parser");
const env = require('./readenv');
const Ddos = require('ddos');
const ddos = new Ddos({ burst: parseInt(env.ddos_burst), limit: parseInt(env.ddos_limit) });
const port = env.port;
const request = require("request");
if (env.node_env !== "production") {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(require('express-request-response-logger')());
}

const authRoute = require('./routes/attractionsRoute')

app.use(authRoute);
app.use(ddos.express)
app.use(require('sanitize').middleware);
app.use(helmet())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(__dirname + '/dist/app'));
app.use(express.static(__dirname + '/assets/img'));

// connect db
mongoose.connect(env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', function () {
  console.log(clc.bgGreen("the database is connected!"))
}).on('error', function () {
  console.log(clc.bgRed.blue("DB connection error!"));
});

// var attraction = require('./schemas/attraction');

// request.get('https://data.gov.il/api/3/action/datastore_search?resource_id=29f4ec99-ec7f-43c1-947e-60a960980607&limit=41', (error, response, body) => {
//   let json = JSON.parse(body);
//   var arr = json.result.records;
//   console.log(json.result.records);
//   var i = 0;
//   var reco = function () {
//     i += 1
//     if (i < json.result.records.length) {
//       var Attraction = new attraction({
//         Id: json.result.records[i].Id,
//         Name: json.result.records[i].Name,
//         Product_Url: json.result.records[i].Product_Url,
//         Attraction_Type: json.result.records[i].Attraction_Type,
//         Opening_Hours: json.result.records[i].Opening_Hours,
//         Address: json.result.records[i].Address,
//         pos: {
//           type: "Point",
//           coordinates: [json.result.records[i].X,
//           json.result.records[i].Y]
//         }
//       });
//       Attraction.save().then(function () {
//         console.log("inserted object " + i);
//         reco();
//       });
//     } else {
//       console.log("reco ended")
//     }
//   }
//   reco();
// });

// start server
server.listen(port, () => {
  console.log('started on port: ' + clc.cyan.bold(port));
});

