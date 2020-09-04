// Node modules requires
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

// run this command in the terminal
// DEBUG=http:server node app.js
const debug = require('debug');
const debugLog = debug('http:server');

// local file requires
const config = require(`./config/config`);
const router = require('./routes/routes');

// Global static variables
const HOST = config.host;
const PORT = config.port;

// Global functions
const app = express();
const Logger = config.logger;

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', (req, res, next) => {
    Logger.debug(`${req.protocol} ${req.method} request made from ${req.hostname} and ip ${req.ip} to path ${req.path} using original url ${req.originalUrl} with content-type ${req.get('content-type')}`);
    next();
});
app.use('/', router);
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(compression());
app.use(session(config.session));
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
    session.cookie.secure = true
}


app.listen(PORT, HOST, (err) => {
    if (err) {
        throw new Error(err);
    }
    Logger.info(`Server listening at ${HOST}:${PORT}`)
})










// run this command in the terminal
// DEBUG=http:server node app.js