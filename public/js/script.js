Chart.register(ChartStreaming);
var temperature_graph = createGraph("temperature", "");
var current_graph = createGraph("current", "#DF2E38");
var speed_graph = createGraph('speed', '#609966');
var vibration_graph = createGraph('vibration', '#FFB84C');

// Create a client instance
client = new Paho.MQTT.Client("127.0.0.1", Number(9001), "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Connected To Broker");
  client.subscribe("updates");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  const topic = message.destinationName;
  const data = message.payloadString;

  if(topic === "updates_lulu"){
    const { temperature, current, speed, vibration, motor_status, water_pump_status } = JSON.parse(data);
    // console.log("Temperature ", temperature);
    // console.log("Current ", current);
    // console.log("Speed ", speed);
    // console.log("Vibration ", vibration);
    updateGraph(temperature_graph, temperature);
    updateGraph(current_graph, current);
    updateGraph(speed_graph, speed);
    updateGraph(vibration_graph, vibration);

  }
}

function createGraph(id, color){
  graph = new Chart(document.getElementById(id), {
      type: 'line',
      data: {
        datasets: [{
          borderColor: color,
          borderWidth: 1,
          radius: 0
        }]
      },
      options: {
        plugins:{
          legend:{
            display: false
          },
          tootip: {
            enabled: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            type: 'realtime',
            realtime: {
              duration: 20000,
              display: false,
              // refresh: 1000,
              delay: 1000,

              // onRefresh: function(chart){
              //   x = Date.now();
              //   y = Math.floor(Math.random() * 10);
              //   chart.data.datasets[0].data.push({x, y});
              // }
            },
            ticks :{
              display: false
            }
          }
        }
      }
    });


  return graph
}

function updateGraph(graph, point){
  const y = point;
  const x = Date.now();
  graph.data.datasets[0].data.push({x, y});
  graph.update('quite');
}