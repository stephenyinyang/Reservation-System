const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.Promise = global.Promise;

module.exports = {
    Members: require('../models/member.model'),
    Reservations: require('../models/reservation.model'),
    AvailableTimes: require('../models/available.model'),
    App: require('../models/app.model'),
};
