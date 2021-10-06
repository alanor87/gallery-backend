const { Interface } = require('../../models');

const getInterfaceSettings = async (req, res, next) => {
    try {
        const interfaceSettings = await Interface.find({});
        res.json(interfaceSettings[0]);
    }
    catch (error) {
        res.send(error);
    };
};

module.exports = getInterfaceSettings;