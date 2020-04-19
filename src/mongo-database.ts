
//followed from tutorial here https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database

const {MongoClient} = require('mongodb');

async function main(){
    
    // Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect cluster.
    const uri = "mongodb+srv://<username>:<password>@cs326cluster-0pubh.mongodb.net/test?retryWrites=true&w=majority";
 
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);