//import {User} from "../_helpers/database";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// notice that User has evolved and not includes 'caloriegoal' and 'minutegoal'.
const schema = new Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    confirmed: {type: Boolean, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User',required: true},
    court: {type: Number, required: true}
  }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Reservation', schema);
