const { Image } = require("../../models");
const axios = require('axios');

const createOne = async (req, res, next) => {
    try {
        const imageToCreate = req.body;

        // const newImage = await Image.create(imageToCreate);
        res.status(201).json({
            status: 'Success',
            code: 201,
            message: 'Image created.',
            body: imageToCreate,
        });
    }
    catch (error) {
        error.message = `Error while creating image.`
        next(error);
    }

};

module.exports = createOne;