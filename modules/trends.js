const Data = require('../models/Data');

const trends = async(req, res) =>{

    if(req.user){
        let data = await Data.find();
        const lastRecordedValue = data[data.length-1];
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() -1);
        const last24HoursData = data.filter(d => d.created_at > twentyFourHoursAgo && d.created_at <= lastRecordedValue.created_at);
        const temperature = last24HoursData.map(d => ( { y: d.temperature, x: d.created_at}));
        const speed = last24HoursData.map(d => ( { y: d.speed, x: d.created_at}));
        const current = last24HoursData.map(d => ( { y: d.current, x: d.created_at}));
        const vibration = last24HoursData.map(d => ( { y: d.vibration, x: d.created_at}));
        res.json({temperature, speed, current, vibration});
    }else{
        res.status(401).json({error: "Invalid user"});
    }
}

module.exports = trends;