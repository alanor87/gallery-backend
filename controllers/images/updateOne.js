const { Image } = require("../../models");

const updateOne = async (req, res, next) => {
    const imageIdToUpdate = req.params.id;
    try {
        const newImageInfo = req.body;
        const updatedImage = await Image.findByIdAndUpdate(imageIdToUpdate, newImageInfo, { new: true });
        res.status(200).json({
            code: 204,
            status: `ID ${imageIdToUpdate} updated successfully`,
            body: updatedImage,
        })
    }
    catch (error) {
        error.message = `Error while updating image (ID : ${imageIdToUpdate} ).`
        next(error);
    }
}

module.exports = updateOne;
