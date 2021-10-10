require('dotenv').config();
const mongoose = require('mongoose');
const { DB_NAME, DB_USER, DB_PASS } = process.env;

const DB_HOST = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.chh3o.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const options = {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connection = mongoose.connect(DB_HOST, options);

mongoose.connection.on('connected', () => {
    console.log('Database connection open')
});
mongoose.connection.on('disconnected', () => {
    console.log('Database connection closed')
});
mongoose.connection.on('error', () => {
    console.log('Database connection error')
});

module.exports = connection;