const router = require('express').Router();
const StatusController = require('../controllers/StatusController');
const DocumentController = require('../controllers/DocumentController');
const passport = require('passport');
const { isAuthenticated } = require('../config/passport');

// Status routes
router.get('/status', StatusController.sendStatus);
router.get('/status/:hello', StatusController.sendHello);

// User login and logout routes
router.get(
    '/login',
    passport.authenticate(
        ['local', 'facebook', 'google'],
        { failureRedirect: '/unauthorized' }
    ),
    AuthController.login
);

router.get('/unauthorized', AuthController.unauthorized);

// API authentication protected routes
router.post('/api/document', isAuthenticated, DocumentController.uploadDocument);

module.exports = router;