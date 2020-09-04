const express = require('express');
const path = require('path');
const multer = require('multer');
const config = require('./config/config');

const Logger = config.logger;
const upload = multer(config.multer);
const router = express.Router();


const HOST = config.host;
const PORT = config.port;


router.use('/', (req, res, next) => {
    Logger.debug(`${req.protocol} ${req.method} request made from ${req.hostname} and ip ${req.ip} to path ${req.path} using original url ${req.originalUrl} with content-type ${req.get('content-type')}`);
    next();
});

router.use('/static', express.static(path.join(__dirname, 'public')));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use('/', (req, res, next) => {
    Logger.debug(`${req.protocol} ${req.method} request made from ${req.hostname} and ip ${req.ip} to path ${req.path} using original url ${req.originalUrl} with content-type ${req.get('content-type')}`);
    next();
});

router.get('/status', (req, res) => {
    const body = req.body;
    const query = req.query
    return res.json({
        status: `The application is up and running on ${HOST}:${PORT}. Data sent:`,
        body,
        query
    });
});

module.exports = router;