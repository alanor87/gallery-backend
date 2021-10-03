const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const api = require('./api');

app.use(cors());
app.use(morgan());
app.use(express.json());

app.use('/api/v1/users', api.users);
app.use('/api/v1/images', api.images);
app.use('/api/v1/interface', api.interface);

app.use((_, res) => {
    res.status(404)
        .json({
            status: 'error',
            code: '404',
            message: 'Not found!',
        })
})

module.exports = app;