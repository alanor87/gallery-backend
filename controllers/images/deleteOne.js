const { User, Image } = require("../../models");
const { cloudinary } = require('../../utils');

const deleteOne = async (req, res, next) => {
    const { id, imgHostingId } = req.params;
    try {
        await User.findOneAndUpdate({ _id: req.userId }, { $pull: { 'userOwnedImages': id } });
        await Image.findByIdAndDelete(id);
        await cloudinary.api.delete_resources(imgHostingId);

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