const multer = require('multer');
const bunyan = require('bunyan');

module.exports = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    logger: bunyan.createLogger({
        name: 'expressApplication',                     // Required
        level: 'debug',      // Optional, see "Levels" section
        // stream: <node.js stream>,           // Optional, see "Streams" section
        // streams: [<bunyan streams>, ...],   // Optional, see "Streams" section
        // serializers: <serializers mapping>, // Optional, see "Serializers" section
        // src: <boolean>,                     // Optional, see "src" section
     
        // Any other fields are added to all log records as is.
        // foo: 'bar',
    }),
    multer: {
        storage: multer.memoryStorage()
    },
    session: {
        secret: 'session secret',
        resave: false,
        saveUninitialized: true,
        cookie: {}
    }
};