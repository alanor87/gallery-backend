const { Image } = require("../../models");

const updateOne = async (req, res) => {
    try {
        const imageIdToUpdate = req.params.id;
        const newImageInfo = req.body;
        const updatedImage = await Image.findByIdAndUpdate(imageIdToUpdate, newImageInfo, { new: true });
        console.log(updatedImage);
        res.status(200).json({
            code: 204,
            status: `ID ${imageIdToUpdate} updated successfully`,
            body: updatedImage,
        })
    }
    catch (error) {
        res.send(error);
    }
}

module.exports = updateOne;
