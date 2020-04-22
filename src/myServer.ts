declare var require: any
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
	private router = express.Router();

	constructor() {
		// this.theDatabase = db;
		// from https://enable-cors.org/server_expressjs.html
		this.router.use((request, response, next) => {
			response.header('Content-Type','application/json');
			response.header('Access-Control-Allow-Origin', '*');
			response.header('Access-Control-Allow-Headers', '*');
			next();
		});
		// Serve static pages from a particular path.
		this.server.use('/', express.static('../static'));

		this.server.use('/', this.router);

		this.router.all('/video/:username/create', this.createVideoHandler.bind(this))

		this.router.all('/video/:username/delete', this.deleteVideoHandler.bind(this))

		// Set a fall-through handler if nothing matches.
		this.router.get('*', async (request, response) => {
			response.send(JSON.stringify({ "result" : "command-not-found" }));
		});

	}
	
	public listen(port) : void  {
		this.server.listen(port);
	}
	
	// ------------------------- CRUD handlers ------------------------------------
    
    private async createVideoHandler(request, response) : Promise<void> {
		// get video object from front end
		let videoObj = {
			"videoUrl": "https://www.youtube.com/watch?v=SfruceeKV54",
			"videoTitle": "calc1 video 1",
			"videoOrder": 2,
			"notes": "test- mongo notes",
			"bookmarks": [{
				"timestamp": "00:01:10",
				"timestampNotes": "hello hello 123"
			}]
		}
		let username = request.params['username'];
		let category = request.query.category;
		let label = request.query.label;
		console.log('------ username, category, label: ' + username + ", " + category + " , " + label);
		await this.createVideo(username, category, label, videoObj, response);
	}
	
	private async deleteVideoHandler(request, response) : Promise<void> {
		// get video object from front end
		let videoObj = {
			"videoUrl": "https://www.youtube.com/watch?v=SfruceeKV54",
			"videoTitle": "calc1 video 1",
			"videoOrder": 2,
			"notes": "test- mongo notes",
			"bookmarks": [{
				"timestamp": "00:01:10",
				"timestampNotes": "hello hello 123"
			}]
		}
		let username = request.param['username'];
		await this.deleteVideo(username, videoObj, response);
    }
​
   // ---------------------------- CRUD functions -------------------------------------

    public async createVideo(username: string, category: string, label: string, videoObj: object, response) : Promise<void> {
		console.log("creating video")
		// await this.theDatabase.put(name, 0);

		response.write(JSON.stringify(
						{'result' : 'created',
						'username' : username,
						'category' : category 
						}));
		response.end();
	}
	
	public async deleteVideo(username: string, videoObj: object, response) : Promise<void> {
		console.log("deleting video")
		// await this.theDatabase.del(videoObj);

		response.write(JSON.stringify(
						{'result' : 'deleted',
						'video' : videoObj
						}));
		response.end();
    }
​​
}

