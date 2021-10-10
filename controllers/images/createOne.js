const { Image } = require("../../models");

const createOne = async (req, res, next) => {
    try {
        const imageToCreate = req.body;
        const newImage = await Image.create(imageToCreate);
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