const { User, Image } = require("../../models");
const imgbb = require('imgbb-uploader');
require('dotenv').config();

const { IMGBB_API_KEY } = process.env;


const createOne = async (req, res, next) => {
    try {
        const responseFromImgbb = await imgbb(IMGBB_API_KEY, req.file.path);
        const { display_url: smallImageURL } = responseFromImgbb;
        const { url: imageURL } = responseFromImgbb.image;
        const { userId } = req;
        console.log('small, norm and id : ', smallImageURL, imageURL, userId);
        const newImage = await Image.create({
            imageURL,
            smallImageURL,
            belongsTo: userId,
            imageInfo: {
                tags: [],
                likes: 0,
            },
        });
        res.status(201).json({
            status: 'Success',
            code: 201,
            message: 'Image created.',
            body: newImage,
        });
    }
    catch (error) {
        error.message = `Error while creating image.`
        next(error);
    }

};

module.exports = createOne;