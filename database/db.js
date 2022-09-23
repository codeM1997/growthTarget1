const mongoose = require('mongoose');

const dbName = 'nodejs-books';


const connect = async () => {
    await mongoose.connect(`mongodb://localhost:27017/${dbName}`);

}

module.exports = connect;