const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    disabled: {type: Boolean, default:false}
  }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('App', schema);
