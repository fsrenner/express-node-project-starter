// Node modules requires
require('dotenv').config();
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
const config = require(`${__dirname}/config/config`);
const router = require('./router');

// Global static variables
const HOST = config.host;
const PORT = config.port;

// Global functions
const app = express();
const Logger = config.logger;

// Express middleware
app.use('/', router);
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(session({
    secret: 'session secret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
  }

app.listen(PORT, HOST, (err) => {
    if (err) {
        throw new Error(err);
    }
    Logger.info(`Server listening at ${HOST}:${PORT}`)
})










// run this command in the terminal
// DEBUG=http:server node app.js