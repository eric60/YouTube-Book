'use strict';

import { Database } from './mongo-database'
import { MyServer } from './myServer';

const theDatabase = new Database('collection'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(process.env.PORT || 8080);