// Node modules requires
require('dotenv').config();
require('regenerator-runtime/runtime');
const path = require('path');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');

// run this command in the terminal
// DEBUG=http:server node app.js
const debug = require('debug');
const debugLog = debug('http:server');

// local file requires
const config = require('./config/appConfig');
const router = require('./routes/routes');
const db = require('././models/index');
const sequelize = db.sequelize;
// const models = require('./models/index');
// const UserService = require('./services/UserService');

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
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(compression());
app.use(session({
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
    cookie: config.session.cookie
}));
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
    session.cookie.secure = true
}
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

sequelize.sync().then(async () => {
    if (config.db.eraseDatabaseOnSync) {
        await models.User.create({
            username: 'admin',
            password: 'passwrd',
            email: 'f.steve.renner@gmail.com'
        });
    }
    app.listen(config.port, config.host, (err) => {
        if (err) {
            throw new Error(err);
        }
        Logger.info(`Server listening at ${config.host}:${config.port}`)
    });
});

