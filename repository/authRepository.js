const { User } = require('../models');

module.exports.find = async (json) => {
    try {
        const rows = await User.findAll({
            where: json
        });
        return rows;
    } catch (err) {
        throw err;
    }
}