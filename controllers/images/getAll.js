const { Image: images } = require('../../models');

const getAll = async (req, res, next) => {
    const { userId } = req;
    try {
        const allImages = await images.find({ belongsTo: userId });
        res.json(allImages);
    }
    catch (error) {
        error.message = `Error while loading images.`
        next(error);
    }
};

module.exports = getAll;