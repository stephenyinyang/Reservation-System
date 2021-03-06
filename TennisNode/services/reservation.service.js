const db = require('../_helpers/database');
const Reservation = db.Reservations;
const AvailableTimes = db.AvailableTimes;


module.exports = {
  getConfirmedReservations,
  getUnconfirmedReservations,
  getAllReservations,
  getUserReservations,
  addReservation,
  deleteReservation,
  confirmReservation,
  unconfirmReservation,
  getAvailableTimes,
  getAllAvailDates,
  deleteDate
}


//: write the necessary functions that will address the needs of parecord.controller. Hint: look at the signatures in the module.exports. Hint2: look at user.service to see how you can interact with the database. Hint3: look at the class material.

async function getUnconfirmedReservations() {
  return await Reservation.find({confirmed: false}).populate('createdBy'); //check if need hash or curly brackets later
}

async function getConfirmedReservations() {
  return await Reservation.find({confirmed: true}).populate('createdBy'); //check if need hash or curly brackets later
}

async function getAllReservations() {
  return await Reservation.find().populate('createdBy'); //check if need hash or curly brackets later
}

async function getUserReservations(username) {
  return await Reservation.find({createdBy: username}).populate('createdBy');
}

async function deleteReservation(date, endDate, username, court) {
  endDate = endDate.trim();

  if (await Reservation.findOne({ createdBy: username, start: date, court: court})) {
    let day = new Date(date);
    let dayStart = new Date(endDate);
    day.setHours(0,0,0,0);
    dayStart.setHours(8, 0, 0 ,0);
    await getAvailableTimes(day).then(async (avail)=> {
      if (avail.available === false) {
        avail.available = true;
      }
      let start = new Date(date);
      let length = new Date(endDate) - start;
      let numIntervals = Math.floor(length / 1800000);
      let i = (start - dayStart);

      let offset = i/1800000;
      console.log(length);
      console.log(i / 1800000);
      console.log(numIntervals);
      let courtNum = parseInt(court);
      console.log(typeof courtNum);
      console.log(courtNum);

      for (i = i / 1800000; i < numIntervals + offset; i++) {

        avail.times[i].push(courtNum);
        avail.times[i][avail.times[i].length - 1]= avail.times[i][avail.times[i].length - 1][0];

        //console.log(avail.times[i]);
        avail.times[i].sort();

        //console.log(avail.times[i]);
      }
      await AvailableTimes.updateOne({day: avail.day}, {$set: {times: avail.times}});
    }).catch(err => {throw err;});

    await Reservation.deleteOne({ createdBy: username, start: date, court: court });

  }
  else if (!(await Reservation.findOne({ createdBy: username, start: date, court: court }))){
    throw 'Deleted: 0';
  }
}

async function addReservation(parecord, username) {
  // validate
  if (await Reservation.findOne({ createdBy: username, start: parecord.start, court: parecord.court  })) {
    throw 'Reservation created by"' + username +'" already exists';
  }
  else if(!username){
    throw 'Error with the user submitting the request. User information missing. Malformed request.';
  }
 // console.log("Start: " + parecord.start.getHours());
  //populate missing fields in the parecord object
  //parecord.start.setHours(parecord.start.getHours())

  //parecord.end.setUTCSeconds(-4);
  console.log("Start: " + parecord.start);
  console.log("End: " + parecord.end);
  let newrecord= parecord;
  newrecord.createdBy = username;
  let day = new Date(parecord.start);
  let dayStart = new Date(parecord.end);
  let dayEnd = new Date(parecord.start);

  day.setHours(0,0,0,0);
  dayStart.setHours(8, 0, 0 ,0);
  dayEnd.setHours(22, 30,0,0);
  let response = await getAvailableTimes(day).then(async (avail)=>{
    if(avail.available === false)
    {
      throw "Not an available time";
    }
    let start = new Date(parecord.start);
    let length = new Date(parecord.end) - start;
    let numIntervals = Math.floor(length/1800000);
    let i = (start - dayStart);
    if(i < 0)
    {
      throw "Reservation Failed: Must start at or after 8:00AM EST"
    }
    let offset = Math.floor(i/1800000);
    let courtNum = parseInt(parecord.court);

    if(dayEnd < new Date(parecord.end))
    {
      throw "Reservation Failed: Goes past 10:30pm EST"
    }
    for(i= i/1800000; i < numIntervals + offset ; i++)
    {

      if(!avail.times[i].includes(courtNum))
      {
        console.log("Overlap case");
        throw "Unavailable time! Overlaps with others times";
      }
      avail.times[i].splice(avail.times[i].indexOf(courtNum), 1);
      //console.log(avail.times[i]);
    }
    //console.log("yo");
    avail.available = false;
    for(i=0; i < avail.times.length; i++)
    {
      if(avail.times[i].length > 0)
      {
        avail.available = true;
      }
    }
    //console.log("after yo");
    //AvailableTimes.updateOne({day: avail.day}, {$set: {times: avail.times}});
    //AvailableTimes.deleteOne({day:avail.day});
    //replace = new AvailableTimes(avail);
    //await replace.save();
    await AvailableTimes.updateOne({day: avail.day}, {$set: {times: avail.times}});
  }).catch(err => {throw err;});
  console.log(response);

  dbrecord = new Reservation(newrecord);

  await dbrecord.save();

}

async function confirmReservation(reservation) {
  if (await Reservation.findOne({start: reservation.start, court: reservation.court, _id: reservation._id})) {
    await Reservation.updateOne({start: reservation.start, court: reservation.court, _id: reservation._id},
      {$set: {confirmed: true}});
  }
  else {
    throw 'Reservation not found';
  }
}

async function unconfirmReservation(reservation) {

  if (await Reservation.findOne({start: reservation.start, court: reservation.court, _id: reservation._id})) {
    await Reservation.updateOne({start: reservation.start, court: reservation.court, _id: reservation._id},
      {$set: {confirmed: false}});
  }
  else {
    throw 'Reservation not found';
  }
}

async function getAvailableTimes(date) {
  if(!(await AvailableTimes.findOne({day: date})))
  {
    let newDay = {};
    newDay.day = date;
    let arrayTimes = [];
    var i;
    for( i = 0; i < 29; i++)
    {
      let arrayNums = [1, 2, 3, 4, 5, 6];
      arrayTimes.push(arrayNums);
    }
    newDay.times = arrayTimes
    dbavailtimes = new AvailableTimes(newDay);
    await dbavailtimes.save();
    //console.log(newDay);
  }
  return await AvailableTimes.findOne({day: date});
}

async function getAllAvailDates()
{
  return await AvailableTimes.find({available: true}).populate();
}

async function deleteDate(date)
{
  console.log(date);
  if(await AvailableTimes.findOne({day: date})) {
    return await AvailableTimes.deleteOne({day: date});
  }
  else
  {
    throw 'Deleted: 0';
  }
}
