require('dotenv').config();

// Node modules requires
const express = require('express');
const helmet = require('helmet');
const compression = require('compression')
const multer = require('multer');
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

// Express middleware
app.use(helmet());








app.listen(PORT, HOST, (err) => {
    if (err) {
        throw new Error(err);
    } else {
        Logger.info(`Server listening at ${HOST}:${PORT}`)
    }
})










// run this command in the terminal
// DEBUG=http:server node app.js