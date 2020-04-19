let http = require('http');
let url = require('url');
let express = require('express');
​
export class MyServer {
​
		private theDatabase;
​
		// Server stuff: use express instead of http.createServer
		private server = express();
		private port = 8080;
		private router = express.Router();
​
		constructor(db) {
		this.theDatabase = db;
		// from https://enable-cors.org/server_expressjs.html
		this.router.use((request, response, next) => {
			response.header('Content-Type','application/json');
			response.header('Access-Control-Allow-Origin', '*');
			response.header('Access-Control-Allow-Headers', '*');
			next();
		});
		// Serve static pages from a particular path.
		this.server.use('/', express.static('./html'));
		//// YOUR CODE GOES HERE
		//// HANDLE CREATE, READ, UPDATE, AND DELETE OPERATIONS
		//// HANDLE ERRORS WITH A WILDCARD (*)
		// Start up the counter endpoint at '/counter'.
		//this.server.use('/counter', this.router);
​
		this.router.all('/video/create', this.createHandler.bind(this))
		this.router.all('/video/*', this.errorHandler.bind(this))
		this.router.all('/video/read', this.readHandler.bind(this))
		this.router.all('/video/update', this.updateHandler.bind(this))
        this.router.all('/video/delete', this.deleteHandler.bind(this))
        
        this.router.all('/label/create', this.createHandler.bind(this))
		this.router.all('/label/*', this.errorHandler.bind(this))
		this.router.all('/label/read', this.readHandler.bind(this))
		this.router.all('/label/update', this.updateHandler.bind(this))
        this.router.all('/label/delete', this.deleteHandler.bind(this))
        
        this.router.all('/category/create', this.createHandler.bind(this))
		this.router.all('/category/*', this.errorHandler.bind(this))
		this.router.all('/category/read', this.readHandler.bind(this))
		this.router.all('/category/update', this.updateHandler.bind(this))
		this.router.all('/category/delete', this.deleteHandler.bind(this))
    }
​
    private async errorHandler(request, response, next) : Promise<void> {
		let name = request.params['username']+"-"+request.query.username
		console.log("----- in error name: " + name)
		let value : boolean = await this.theDatabase.isFound(name);
		console.log('error handler isFound: ' + value)
		if (!value) {
			response.write(JSON.stringify({'result' : 'error'}));
			response.end();
		} else {
			next();
		}
    }
    
    private async createHandler(request, response) : Promise<void> {
		await this.createCounter(request.params['username']+"-"+ request.query.username, response);
    }
​
    private async readHandler(request, response): Promise<void> {
		await this.readCounter(request.params['username'] + "-" + request.query.username, response);
    }
​
    private async updateHandler(request, response) : Promise<void> {
		let value = request.query.value
		await this.updateCounter(request.params['username'] + "-" + request.query.username, value, response);
    }
​
    private async deleteHandler(request, response) : Promise<void> {
		await this.deleteCounter(request.params['username'] + "-" + request.query.username, response);
    }
​
    public listen(port) : void  {
	this.server.listen(port);
    }
​/*
    public async createCounter(name: string, response) : Promise<void> {
	console.log("creating counter named '" + name + "'");
	await this.theDatabase.put(name, 0);
	response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
	response.end();
    }
​
    public async errorCounter(name: string, response) : Promise<void> {
	response.write(JSON.stringify({'result': 'error'}));
	response.end();
    }
​
    public async readCounter(name: string, response) : Promise<void> {
	let value = await this.theDatabase.get(name);
	response.write(JSON.stringify({'result' : 'read',
				       'name' : name,
				       'value' : value }));
	response.end();
    }
​
    public async updateCounter(name: string, value: number, response) : Promise<void> {
	await this.theDatabase.put(name, value);
	response.write(JSON.stringify({'result' : 'updated',
				       'name' : name,
				       'value' : value }));
	response.end();
    }
    
    public async deleteCounter(name : string, response) : Promise<void> {
	await this.theDatabase.del(name);
	response.write(JSON.stringify({'result' : 'deleted',
				       'value'  : name }));
	response.end();
    }
*/
}

