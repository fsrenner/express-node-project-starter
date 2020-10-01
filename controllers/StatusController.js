const config = require('../config/appConfig');
const db = require('../models/index');

module.exports = {
    sendStatus: async (req, res) => {
        const body = req.body;
        const query = req.query
        db.sequelize.query('select now();').then(dbDate => {
            return res.json({
                status: `The application is up and running on ${config.host}:${config.port}.`,
                dbDate: dbDate[0][0].now,
                body,
                query
            });
        });
    },
    sendHello: async (req, res) => {
        const params = req.params;
        return res.json({
            hello: `Hello ${params.hello}`
        });
    }
};
