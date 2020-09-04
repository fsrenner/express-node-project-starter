// Node modules requires
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const multer = require('multer');
const errorHandler = require('errorhandler');
const flatten = require('flat');
const debug = require('debug');
const debugLog = debug('http:server');

// local file requires
const Logger = require('./logger');

// Global static variables
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

// Global functions
const app = express();
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Express middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));
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
app.use('/', (req, res, next) => {
    Logger.debug(`${req.protocol} ${req.method} request made from ${req.hostname} and ip ${req.ip} to path ${req.path} using original url ${req.originalUrl} with content-type ${req.get('content-type')}`);
    next();
});

const errorLogHandler = (err, str) => { Logger.error(`The following error occurred: ${err}, details: ${str}`) };
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    app.use(errorHandler({ log: errorLogHandler }));
}


app.get('/status', (req, res) => {
    const body = req.body;
    const query = req.query
    return res.json({
        status: `The application is up and running on ${HOST}:${PORT}. Data sent:`,
        body,
        query
    });
});


app.listen(PORT, HOST, (err) => {
    if (err) {
        throw new Error(err);
    } else {
        Logger.info(`Server listening at ${HOST}:${PORT}`)
    }
})










// run this command in the terminal
// DEBUG=http:server node app.js