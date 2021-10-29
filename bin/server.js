require('dotenv').config();
const app = require('../app');
const db = require('../db/connect-mongoose');
const { cloudinary } = require('../api/cloudinary-api');

// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" },
//     function (error, result) { console.log(result); });

const { PORT = 3030 } = process.env;


db.then(() => {
    app.listen(PORT, () => {
        console.log('Listening to the port!', PORT);
    });
})
    .catch(error => console.log(error));
