const { Interface: interface } = require('../../models');

const getInterface = async (req, res, next) => {
    try {
        const interfaceSettings = await interface.find({});
        res.json(interfaceSettings);
    }
    catch (error) {
        res.send(error);
    };
};

module.exports = getInterface;