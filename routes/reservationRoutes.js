const router = require('express').Router();
const reservationController = require('../controllers/reservationController');
const securityManager = require('../middleware/security');

router.route('/')
    .get(securityManager.authorize, reservationController.GetUserReservations)
    .post(securityManager.authorize, reservationController.createReservation);
router.route('/all/:pay')
    .get(securityManager.authorize, reservationController.GetUserPaymentReservations)
router.route('/:reservationId')
    .get(securityManager.authorize, reservationController.GetReservation)
    .delete(securityManager.authorize, reservationController.deleteReservation);

router.route('/receipt/:reservationId')
    .get(securityManager.authorize, reservationController.GetReceipt)
    .post(securityManager.authorize, reservationController.makePayment);

router.route('/confirm/:reservationId')
    .get(securityManager.authorize, reservationController.confirmPayment)

module.exports = router;