const { Interface } = require('../../models');

const saveInterfaceSettings = async (req, res, next) => {
    try {
        const newInterfaceSettings = req.body;
        const settings = await Interface.findByIdAndUpdate(newInterfaceSettings.id, newInterfaceSettings, { new: true });
        res.status(200).json({
            code: 200,
            status: 'Interface saving success',
            body: settings,
        })
    }
    catch (error) {
        res.send(error)
    }
};

module.exports = saveInterfaceSettings;