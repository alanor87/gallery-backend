const { User, Image } = require("../../models");
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Using CLOUDINARY_URL in .env, which includes all of the following!
// const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
// cloudinary.config({
//     cloud_name: CLOUDINARY_CLOUD_NAME,
//     api_key: CLOUDINARY_API_KEY,
//     api_secret: CLOUDINARY_API_SECRET,
// })


const createOne = async (req, res, next) => {
    try {

        const responseFromImgHosting = await cloudinary.uploader.upload(req.file.path);
        console.log('responseFromImgHosting : ', responseFromImgHosting);
        const { url: imageURL } = responseFromImgHosting;
        console.log('imageURL : ', imageURL);
        const { userId } = req;
        console.log('userId : ', userId);
        const newImage = await Image.create({
            imageURL,
            belongsTo: userId,
            imageInfo: {
                tags: [],
                likes: 0,
            },
        });
        await User.findOneAndUpdate({ _id: userId }, { $push: { 'userOwnedImages': newImage._id } });
        res.status(201).json({
            status: 'Success',
            code: 201,
            message: 'Image created.',
            body: newImage,
        });
    }
    catch (error) {
        console.log('error : ', error);
        error.message = `Error while creating image.`
        next(error);
    }

};

module.exports = createOne;