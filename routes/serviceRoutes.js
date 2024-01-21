const router = require('express').Router();
const serviceController = require('../controllers/serviceController');
const securityManager = require('../middleware/security');

router.route('/').get(serviceController.getAllServices);
router.route('/').post(serviceController.getFilteredServices);
router.route('/:serviceId').get(serviceController.getService);

module.exports = router;