const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017"
const client = new MongoClient(url);

const dbName = 'nodejs-books';

const connect = async () => {
    await client.connect();
    const db = client.db(dbName);
    return db;
}
module.exports = connect
