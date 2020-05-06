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
    let label = videoObj.label;

    let insertVideoObj = {
        videoUrl: videoObj.videoUrl,
        videoTitle: videoObj.title,
        videoOrder: 3,
        notes: videoObj.notes,
        bookmarks: videoObj.bookmarks
    }

    console.log("\nput: username = " + username + ", label: " + label);
    let result = await collection.updateOne({'username': username, 
                                            'categories.0.categoryName' : category, 
                                            'categories.0.labels': { $elemMatch: {"labelName" : label}}},
                                            { $push : { 'categories.0.labels.$.videos' : insertVideoObj} }, 
                                            { 'upsert' : true });
    console.log("\nresult = " + result);
}

public async putUpdate(username: string, videoObj) : Promise<void> {
    let db = this.client.db(this.dbName);
    let collection = db.collection(this.collectionName);

    console.log("Updating for: " + username);

    let insertVideoObj = {
        videoUrl: videoObj.videoUrl,
        videoTitle: videoObj.title,
        videoOrder: 3,
        notes: videoObj.notes,
        bookmarks: videoObj.bookmarks
    }

    let result = await collection.updateOne({'username': username, 	   
                                            'categories.0.labels.0.videos' : {$elemMatch: {"videoUrl" : videoObj.videoUrl }}}, 
                                            {$set: {'categories.0.labels.0.videos.$': insertVideoObj}}
                                            )

                                            
    console.log("\nUpdate result = " + result);
}

public async getAll(username: string) : Promise<string> {
    let db = this.client.db(this.dbName); 
    let collection = db.collection(this.collectionName);
    console.log("getAll: key = " + username);

    let result = await collection.findOne({'username' : username });
    
    console.log("\ngetAll: returned " + JSON.stringify(result));
    if (result) {
        return result;
    } else {
        return null;
    }
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

public async del(username: string, videoId : string) : Promise<void> {
    let db = this.client.db(this.dbName);
    let collection = db.collection(this.collectionName);


    console.log("\ndelete: username = " + username);
//had to hardcode some fields here, issues with matching. There's a problem with our variable values

console.log("DB del Video URL: " + videoId);
    
let result = await collection.updateOne({'username': username, 	   
                                            'categories.0.labels.0.videos' : {$elemMatch: {"videoUrl" : videoId }}}, 
                                            {$unset: {'categories.0.labels.0.videos.$': ""}},
                                            {'upsert' : true});

    await collection.updateOne({'username' : username},  
                            {$pull : {'categories.0.labels.0.videos' : null}}, 
                            {'upsert' : true});

                                    

    console.log("\nresult = " + result);
}

public async isFound(username: string, video: any) : Promise<boolean>  { 
    let url = video.videoUrl;
    console.log("isFound: key = " + url);
    let db = this.client.db(this.dbName); // this.level(this.dbFile);
    let collection = db.collection(this.collectionName);
    console.log("get: key = " + url);
    let result = await collection.findOne({'username': username, 'categories.0.labels.0.videos' : 
                                        {$elemMatch: {"videoUrl" : url }}});
    console.log("is found result = " + result);
    if (result === null) {
        return false;
    } else {
        return true;
    }
}

}