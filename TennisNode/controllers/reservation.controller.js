const reservationService = require('../services/reservation.service')
const userService = require('../services/user.service')
const Role = require('../_helpers/role');

module.exports = {
  createReservation,
  getUnconfirmedReservations,
  getConfirmedReservations,
  getAllReservations,
  getUserReservations,
  deleteReservation,
  deleteReservationAdmin,
  confirmReservation,
  unconfirmReservation,
  getAvailableTimes,
  getAllAvailDates,
  deleteDate
};


function createReservation(req, res, next) {

  // add a reservation and respond to the client confirming that the reservation was successfully added.
  //console.log("YEasdfasdfET");
  reservationService.addReservation(req.body, req.user.sub).then(() => res.json("Recorded!"))
    .catch(err => res.json(err));
}

function getAllReservations(req,res,next){
// return all reservations from the database and send to the client.
  reservationService.getAllReservations().then((records) => res.json(records))
    .catch(err => res.json(err));
}

function getUnconfirmedReservations(req,res,next){
  reservationService.getUnconfirmedReservations().then((records) => res.json(records))
    .catch(err => res.json(err));
}

function getConfirmedReservations(req,res,next){
  reservationService.getConfirmedReservations().then((records) => res.json(records))
    .catch(err => res.json(err));
}

function getUserReservations(req,res,next){
// return all parecords from the database and send to the client.
  /*
  parecordService.getAllPArecords()
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Got all records successfully' }))
      .catch(err => next(err));

   */
  reservationService.getUserReservations(req.user.sub).then((records) => res.json(records))
    .catch(err => res.json(err));
}

function deleteReservation(req,res,next) {

// delete parecord from the database and respond to the client by conforming the action. //req.user.username

  reservationService.deleteReservation(req.params.date, req.params.end, req.user.sub, req.params.court).then(() => res.json("Deleted: 1"))
    .catch(err => res.json(err))

}

function deleteReservationAdmin(req, res, next)
{
  userService.getByUsername(req.params.username).then((username) => {
    reservationService.deleteReservation(req.params.date, req.params.end, username, req.params.court).then(() => res.json("Deleted: 1"))
      .catch(err => res.json(err))
  })
    .catch(err => res.json(err));
}

function confirmReservation(req, res, next) {
  console.log(req.body);
  reservationService.confirmReservation(req.body).then(() => res.json("Confirmed: 1"))
    .catch(err => res.json(err));
}

function unconfirmReservation(req, res, next) {
  reservationService.unconfirmReservation(req.body).then(() => res.json("Unconfirmed: 1"))
    .catch(err => res.json(err));
}

function getAvailableTimes(req, res, next) {
    reservationService.getAvailableTimes(req.params.date).then((times)=>{res.json(times)})
      .catch(err=> res.json(err));
}

function  getAllAvailDates(req, res, next) {
    reservationService.getAllAvailDates().then(dates => res.json(dates))
      .catch(err => res.json(err));
}

function deleteDate(req, res, next) {
  reservationService.deleteDate(req.params.date).then(()=>{res.json("Deleted: 1")}).catch(err => res.json(err));
}
