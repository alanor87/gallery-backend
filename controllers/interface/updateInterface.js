const { Interface } = require('../../models');

const updateInterfaceSettings = async (req, res) => {
    try {
        const newInterfaceSettings = req.body;
        console.log('newInterfaceSettings : ', newInterfaceSettings);
        const settings = await Interface.findByIdAndUpdate(newInterfaceSettings._id, newInterfaceSettings, { new: true });
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

module.exports = updateInterfaceSettings;