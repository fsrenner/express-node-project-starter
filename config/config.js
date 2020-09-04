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
        saveUninitialized: true,
        cookie: {}
    },
    passport: {
        facebook: {
            clientID: 'some-fb-client-id',
            clientSecret: 'some-secret',
            callbackURL: "http://localhost:3001/auth/facebook/callback"
        },
        google: {
            consumerKey: GOOGLE_CONSUMER_KEY,
            consumerSecret: GOOGLE_CONSUMER_SECRET,
            callbackURL: "http://www.example.com/auth/google/callback"
        }
    }
    
};