const { Interface } = require('../../models');

const getInterfaceSettings = async (req, res, next) => {
    try {
        const interfaceSettings = await Interface.find({});
        res.json(interfaceSettings[0]);
    }
    catch (error) {
        next(error);
    };
};

module.exports = getInterfaceSettings;