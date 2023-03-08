Chart.register(ChartStreaming);

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
  console.log("onConnect");
  client.subscribe("World");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}


const temperature_graph = createGraph("temperature", "");
const current_graph = createGraph("current", "#DF2E38");
const speed_graph = createGraph('speed', '#609966');
const vibration_graph = createGraph('vibration', '#FFB84C');



  function createGraph(id, color){
    graph = new Chart(document.getElementById(id), {
        type: 'line',
        data: {
          // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            // label: '# of Votes',
            // data: [12, 19, 3, 5, 2, 3],
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
                refresh: 1000,
                delay: 1000,

                onRefresh: function(chart){
                  x = Date.now();
                  y = Math.floor(Math.random() * 10);
                  chart.data.datasets[0].data.push({x, y});
                }
              }
            }
          }
        }
      });


    return graph
  }