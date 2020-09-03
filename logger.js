const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
    name: 'expressApplication',                     // Required
    level: 'debug',      // Optional, see "Levels" section
    // stream: <node.js stream>,           // Optional, see "Streams" section
    // streams: [<bunyan streams>, ...],   // Optional, see "Streams" section
    // serializers: <serializers mapping>, // Optional, see "Serializers" section
    // src: <boolean>,                     // Optional, see "src" section
 
    // Any other fields are added to all log records as is.
    // foo: 'bar',
});