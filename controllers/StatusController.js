const config = require('../config/config');

const sendStatus = async (req, res) => {
    const body = req.body;
    const query = req.query
    return res.json({
        status: `The application is up and running on ${config.host}:${config.port}. Data sent:`,
        body,
        query
    });
};

const sendHello = async (req, res) => {
    const params = req.params;
    return res.json({
        hello: `Hello ${params.hello}`
    });
};

module.exports = {
    sendStatus,
    sendHello
};