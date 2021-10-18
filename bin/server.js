const app = require('../app');
const db = require('../db/connect-mongoose');

require('dotenv').config();
const { PORT = 3030 } = process.env;


db.then(() => {
    app.listen(PORT, () => {
        console.log('Listening to the port!', PORT);
    });
})
    .catch(error => console.log(error));
