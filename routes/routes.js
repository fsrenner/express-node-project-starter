const router = require('express').Router();
const StatusController = require('../controllers/StatusController');
const DocumentController = require('../controllers/DocumentController');

// Status routes
router.get('/status', StatusController.sendStatus);
router.get('/status/:hello', StatusController.sendHello);

// Document upload
router.post('/api/document', DocumentController.uploadDocument);

module.exports = router;