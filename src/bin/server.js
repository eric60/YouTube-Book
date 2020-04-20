'use strict';
exports.__esModule = true;
var mongo_database_1 = require("./mongo-database");
var myServer_1 = require("./myServer");
var theDatabase = new mongo_database_1.Database('collection'); // CHANGE THIS
var theServer = new myServer_1.MyServer(theDatabase);
theServer.listen(8080);
