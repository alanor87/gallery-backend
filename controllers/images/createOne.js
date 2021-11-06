const { User, Image } = require("../../models");
const { cloudinary } = require('../../utils');

const createOne = async (req, res, next) => {
    try {
        const responseFromImgHosting = await cloudinary.uploader.upload(req.file.path);
        const { url: imageURL, public_id: imageHostingId } = responseFromImgHosting;
        const { userId } = req;
        const newImage = await Image.create({
            imageURL,
            imageHostingId,
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
            responseFromImgHosting
        });
    }
    catch (error) {
        error.message = `Error while creating image.`
        next(error);
    }

};

module.exports = createOne;