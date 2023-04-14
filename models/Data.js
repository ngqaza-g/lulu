const mongoose = require('mongoose');


const dataSchema  = new mongoose.Schema({
    temperature: {
        type: Number,
        required : [ true, 'Temperature value is required' ]
    },
    speed: {
        type: Number,
        required : [ true, 'Speed value is required' ]
    },
    current: {
        type: Number,
        required : [ true, 'Current value is required' ]
    },
    vibration: {
        type: Number,
        required : [ true, 'Vibration value is required' ]
    },
    created_at:{
        type : Date,
        immutable: true,
        default: Date.now
    }

});

const Data = mongoose.model('Data', dataSchema, 'Data'); 
module.exports = Data;