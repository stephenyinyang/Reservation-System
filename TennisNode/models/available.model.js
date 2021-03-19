
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    day: {type: Date, required: true},
    times : {type: [[Number]], required: true },
    available: {type: Boolean, default:true }
  }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Available', schema);
