const router = require('express').Router();
const userController = require('../controllers/userController');
const securityManager = require('../middleware/security');

router.post('/login', userController.SignIn);
router.post('/register', userController.register);
router.route('/editUser')
    .post(securityManager.authorize, userController.editUserDetails)
    .delete(securityManager.authorize, userController.deleteUser);
router.route('/').get(securityManager.authorize, userController.getUserEmail);
router.route('/getSaves')
    .get(securityManager.authorize, userController.getUserSaves);
router.route('/editSaves/:savesId')
    .post(securityManager.authorize, userController.saveService);
router.route('/removeSave/:savesId')
    .post(securityManager.authorize, userController.removeService);

module.exports = router;