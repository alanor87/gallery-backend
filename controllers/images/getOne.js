const { Image } = require("../../models");

const getOne = async (req, res, next) => {
    const imageIdToGet = req.params.id;
    try {
        const image = await Image.findById(imageIdToGet);
        if (!image) res.status(404).json({
            status: 'Success',
            code: 404,
            message: `Image was not found by ID ${imageIdToGet}`,
        });

        res.status(200).json({
            status: 'Success',
            code: 200,
            body: image,
        });
    }
    catch (error) {
        error.message = `Error while getting image (ID : ${imageIdToGet} ).`
        next(error);
    }

};

module.exports = getOne;