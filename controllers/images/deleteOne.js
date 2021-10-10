const { Image } = require("../../models");

const deleteOne = async (req, res, next) => {
    const imageIdToDelete = req.params.id;
    try {
        console.log('id : ', imageIdToDelete);
        await Image.findByIdAndDelete(imageIdToDelete);
        res.status(200).json({
            status: 'Success',
            code: 200,
            message: 'Image deleted.',
        });
    }
    catch (error) {
        error.message = `Error while deleting image (ID : ${imageIdToDelete} ).`
        next(error);
    }

};

module.exports = deleteOne;