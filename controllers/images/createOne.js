const { Image } = require("../../models");
const imgbb = require('imgbb-uploader');
require('dotenv').config();

const { IMGBB_API_KEY } = process.env;


const createOne = async (req, res, next) => {
    try {
        const responseFromImgbb = await imgbb(IMGBB_API_KEY, req.file.path);
        res.status(201).json({
            status: 'Success',
            code: 201,
            message: 'Image created.',
            body: responseFromImgbb,
        });
    }
    catch (error) {
        error.message = `Error while creating image.`
        next(error);
    }

};

module.exports = createOne;