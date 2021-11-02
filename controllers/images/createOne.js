const { Image } = require("../../models");


const createOne = async (req, res, next) => {
    try {
        res.status(201).json({
            status: 'Success',
            code: 201,
            message: 'Image created.',
            body: req.file,
        });
    }
    catch (error) {
        error.message = `Error while creating image.`
        next(error);
    }

};

module.exports = createOne;