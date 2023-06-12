const mongoose = require('mongoose');



const alarmSchema = new mongoose.Schema({
    date: {
        type : Date,
        immutable: true,
        default: Date.now
    },
    message: {
        type: String,
        required: [ true, 'Message required']
    }
});


module.exports = mongoose.model('alarm', alarmSchema);