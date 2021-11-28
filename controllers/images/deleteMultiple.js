const { Image, User } = require("../../models");

const deleteMultiple = async (req, res, next) => {
    try {
        const deleteRequests = req.body.imagesIdToDelete.map(_id => Image.findByIdAndDelete(_id));
        const result = await Promise.all(deleteRequests);
        console.log('result : ', result);
        res.status(200).json({
            status: 'Success',
            code: 200,
            message: 'Images deleted.',
        });
    }
    catch (error) {
        error.message = 'Error while deleting multiple images.';
        next(error);
    }
};

module.exports = deleteMultiple;