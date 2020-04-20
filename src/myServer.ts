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

		this.router.all('/video/:username/create', this.createVideoHandler.bind(this))
    }

    
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
		let username = request.param['username'];
		let category = request.query.category;
		let label = request.query.label;
		await this.createVideo(username, category, label, videoObj, response);
    }
​
    public listen(port) : void  {
		this.server.listen(port);
    }

    public async createVideo(username: string, category: string, label: string, videoObj: object, response) : Promise<void> {
		console.log("creating video")
		await this.theDatabase.put(name, 0);

		response.write(JSON.stringify({'result' : 'created',
						'name' : name,
						'value' : 0 }));
		response.end();
    }
​​
}

