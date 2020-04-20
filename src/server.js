'use strict';
exports.__esModule = true;
var myServer_1 = require("./myServer");
// const theDatabase = new Database('collection'); // CHANGE THIS
var theServer = new myServer_1.MyServer();
theServer.listen(process.env.PORT || 8080);
