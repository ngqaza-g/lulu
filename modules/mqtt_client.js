const mqtt = require('mqtt');
const Data = require('../models/Data');

const MQTT_BROKER = process.env.MQTT_BROKER || '127.0.0.1';
const client = mqtt.connect(`mqtt://${MQTT_BROKER}`);

client.on('connect', function(){
    client.subscribe(process.env.UPDATE_TOPIC, function(err){
        if(!err){
            console.log("Backend connected to Mqtt");
        }else{
            console.log(err)
        }
    })
});

client.on('message', async function(topic, message){
    if(topic === process.env.UPDATE_TOPIC){
        try{
            const data = JSON.parse(message.toString());
            const newData = await Data.create(data);
            console.log(newData);
        }catch(error){
            console.log(error);
        }
    }
});


module.exports = client;