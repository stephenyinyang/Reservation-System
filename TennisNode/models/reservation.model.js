const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    confirmed: {type: Boolean, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'Member', required: true},
    court: {type: Number, required: true}
  }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Reservation', schema);
