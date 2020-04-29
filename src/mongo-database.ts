declare var require: any

export class Database {
//followed from tutorial here https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
private MongoClient = require('mongodb').MongoClient;
private uri : string;
private client;
private collectionName : string;
private dbName : string = "db";

constructor(collectionName) {
    let secrets, password;
    if (!process.env.PASSWORD) {
        secrets = require('./secrets.json');
        password = secrets.password;
    } else {
        password = process.env.PASSWORD;
    }
    this.uri = `mongodb+srv://guest:${password}@cs326cluster-0pubh.mongodb.net/test?retryWrites=true&w=majority`
    this.collectionName = collectionName;
    this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
    
	(async () => {
        await this.client.connect().catch(err => { console.log(err); });
    })();

}

public async put(username: string, videoObj) : Promise<void> {
    let db = this.client.db(this.dbName);
    let collection = db.collection(this.collectionName);

    let category = videoObj.category;
    let label = "Web Services";

    let insertVideoObj = {
        videoUrl: videoObj.videoUrl,
        videoTitle: videoObj.title,
        videoOrder: 3,
        notes: videoObj.notes,
        bookmarks: videoObj.bookmarks
    }

    console.log("put: username = " + username + ", value = " + videoObj);
    let result = await collection.updateOne({'username':'eric', 
                                            'categories':{$elemMatch:{"categoryName":"Coding"}},
                                            'categories.labels': { $elemMatch: {"labelName": "Web Services"}}},
                                            { $push : { 'categories.0.labels.$.videos' : insertVideoObj} }, 
                                            { 'upsert' : true });
    console.log("\nresult = " + result);
}

public async get(key: string) : Promise<string> {
    let db = this.client.db(this.dbName); // this.level(this.dbFile);
    let collection = db.collection(this.collectionName);
    console.log("get: key = " + key);
    let result = await collection.findOne({'name' : key });
    
    console.log("get: returned " + JSON.stringify(result));
    if (result) {
        return result.value;
    } else {
        return null;
    }
}

public async del(key: string) : Promise<void> {
    let db = this.client.db(this.dbName);
    let collection = db.collection(this.collectionName);
    console.log("delete: key = " + key);
    let result = await collection.deleteOne({'name' : key });
    console.log("result = " + result);
    // await this.db.del(key);
}
    
public async isFound(key: string) : Promise<boolean>  {
    console.log("isFound: key = " + key);
    let v = await this.get(key);
    console.log("is found result = " + v);
    if (v === null) {
        return false;
    } else {
        return true;
    }
}

}