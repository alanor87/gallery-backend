const { User, Image } = require("../../models");
const { cloudinary } = require('../../utils');

const createOne = async (req, res, next) => {
    try {
        console.log('req.files : ', req.files);
        const newImages = [];
        for (let i = 0; i < req.files.length; i += 1) {
            const singleImageUploadResponse = await cloudinary.uploader.upload(req.files[i].path);
            const { url: imageURL, public_id: imageHostingId } = singleImageUploadResponse;
            const { userId } = req;
            const newImage = await Image.create({
                imageURL,
                imageHostingId,
                belongsTo: userId,
                imageInfo: {
                    tags: [],
                    likes: [],
                },
            });
            await User.findOneAndUpdate({ _id: userId }, { $push: { 'userOwnedImages': newImage._id } });
            newImages.push(newImage);
        }

        res.status(201).json({
            status: 'Success',
            code: 201,
            message: 'Image created.',
            newImages,
        });
    }
    catch (error) {
        error.message = `Error while creating image.`
        next(error);
    }

};

module.exports = createOne;