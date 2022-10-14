const mongoose = require('mongoose');

function dbConnect() {
    mongoose.connect("mongodb://localhost:27017/supplychain");

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', () => {
        console.log('DB CONNECTED...');
    });
}

module.exports = dbConnect;