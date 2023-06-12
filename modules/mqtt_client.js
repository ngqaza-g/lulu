const mqtt = require('mqtt');
const Data = require('../models/Data');
const Alarm = require('../models/Alarms');

const MQTT_BROKER = process.env.MQTT_BROKER || '127.0.0.1';
const client = mqtt.connect(`mqtt://${MQTT_BROKER}`);

client.on('connect', function(){
    client.subscribe("updates", function(err){
        if(!err){
            console.log("Backend connected to Mqtt");
        }else{
            console.log(err)
        }
    })
});

client.on('message', async function(topic, message){
    if(topic === "updates"){
        try{
            const { temperature, current, speed, vibration, motor_status, water_pump_status, error, error_message } = JSON.parse(message.toString());
            const newData = await Data.create({temperature, current, speed, vibration});
            if(error) await Alarm.create({message: error_message});
            console.log(newData);
        }catch(error){
            console.log(error);
        }
    }
});

module.exports = client;