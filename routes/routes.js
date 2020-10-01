const router = require('express').Router();
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');

// Relevant configuration file requires
const config = require('../config/appConfig')
const { isAuthenticated } = require('../config/passport');
const swaggerDocument = require('../swagger.json');

const StatusController = require('../controllers/StatusController');
const DocumentController = require('../controllers/DocumentController');
const AuthController = require('../controllers/AuthController');

// Router Middle-Ware
router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument));

// Status routes
router.get('/status', StatusController.sendStatus);
router.get('/status/:hello', StatusController.sendHello);

// User Authentication routes
router.post(
    '/login',
    passport.authenticate(
        ['local'],
        { failureRedirect: '/unauthorized' }
    ),
    AuthController.login
);

router.get('/unauthorized', AuthController.unauthorized);
router.post('/logout', AuthController.logout);

// API authentication protected routes
router.post('/api/document', isAuthenticated, DocumentController.uploadDocument);

module.exports = router;