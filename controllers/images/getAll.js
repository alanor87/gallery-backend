const { Image: images } = require('../../models');

const getAll = async (req, res, next) => {
    try {
        const allImages = await images.find({});
        res.json(allImages);
    }
    catch (error) {
        error.message = `Error while updating images.`
        next(error);
    }
};

module.exports = getAll;