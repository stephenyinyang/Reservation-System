const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/addReservation', reservationController.createReservation);
router.get('/getAllReservations', reservationController.getAllReservations);
router.get('/getUnconfirmedReservations', reservationController.getUnconfirmedReservations);
router.get('/getConfirmedReservations', reservationController.getConfirmedReservations);
router.get('/getMyReservations', reservationController.getMemberReservations);
router.delete('/:date/:court/:end/:username', authorize(Role.admin), reservationController.deleteReservationAdmin);
router.delete('/:date/:court/:end', reservationController.deleteReservation);
router.post('/confirm', authorize(Role.admin), reservationController.confirmReservation);
router.post('/unconfirm', authorize(Role.admin), reservationController.unconfirmReservation);
router.get('/getAvailableTimes/:date', reservationController.getAvailableTimes);
router.get('/getAvailableDays', reservationController.getAllAvailDates);
router.delete('/deleteDate/:date', reservationController.deleteDate);
module.exports = router;
