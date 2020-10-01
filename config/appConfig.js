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
    document: 'file',
    session: {
        secret: 'session secret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
    },
    db: {
        database: process.env.DB || 'test',
        user: process.env.DB_USER || 'test',
        pass: process.env.DB_PASS || 'test',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        ssl: process.env.DB_SSL || false,
        dialect: process.env.DB_DIALECT || 'postgres',
        eraseDatabaseOnSync: false
    }
};
