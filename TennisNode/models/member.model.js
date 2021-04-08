const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// notice that User has evolved and not includes 'caloriegoal' and 'minutegoal'.
const schema = new Schema({
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        phone: { type: String, unique: true, required: true },
        address: { type: String, unique: true, required: true },
        racketTension: { type: Number, required: true },
        racketType: { type: String, required: true },
        racketStrings: { type: String, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: {type:String, required: true},
        createdDate: { type: Date, default: Date.now }
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Member', schema);
