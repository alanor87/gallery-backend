const { Image: images } = require('../../models');

const getAll = async (req, res, next) => {
    try {
        const allImages = await images.find({});
        res.json(allImages);
    }
    catch (error) {
        res.send(error);
    }
};

module.exports = getAll;