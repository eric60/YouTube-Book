'use strict';

import { Database } from './mongo-database';
import { MyServer } from './myServer';

const theDatabase = new Database('web-programming-db'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(8080);