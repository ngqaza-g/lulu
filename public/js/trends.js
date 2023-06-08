async function update(){
    const res = await fetch('/trends/data');
    if(res.status == 200){
        const {temperature, current, speed, vibration } = await res.json();

        create_graph('temperature', temperature);
        create_graph('current', current);
        create_graph('speed', speed);
        create_graph('vibration', vibration);
    }

}


function create_graph(id, data){

    const cxt = document.getElementById(id);
    console.log(cxt);
    const chart = new Chart(document.getElementById(id), {
      type: 'line',
      data: {
        datasets: [{
          data: data
        }]
      },
      options: {
        scales:{
            x: {
                ticks: {
                    display: false
               }
            }
        },
        plugins:{
            legend: {
                display: false
            }
        }
      }
    });
}


update()
.catch(e => console.log(e));