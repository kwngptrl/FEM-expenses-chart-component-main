const today = new Date().toLocaleDateString('en-US', {weekday: 'short'}).toLowerCase();
/* console.log(today); */

async function fetchData() {
  const url = './data.json';
  const response = await fetch(url);
  const datapoints = await response.json();
  console.log(datapoints, typeof datapoints);
  return datapoints;
};
  
  const data = {
    labels: [],
    datasets: [{}]
  }

  const config = {
    type: 'bar',
    data,
    options: {
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      },
      plugins: {
        tooltip: {
          displayColors: false,
          callbacks: {
            title: () => ""
          }
        },
        legend: {
          display: false
        }        
      },
      scales: {
        y: {
          display: false,
          /* beginAtZero: true,
          ticks: {
            display: false
          },
          grid: {
            display: false
          } */
        },
        x: {
          border: {
            display: false
          },
          grid: {
            display: false
          }
        }
      }
    }
  }

  const myChart = new Chart(document.getElementById('myChart'), config);

  fetchData().then(datapoints => {
    const days = datapoints.map(
      function(index){
        console.log(index);
        return index.day;
      });
    const amounts = datapoints.map(
      function(index){
        return index.amount;
      });
    const dayColors = datapoints.map(
      function(index){
        return index.day === today ? 'hsl(186, 34%, 60%)': 'hsl(10, 79%, 65%)';
      });
    const hoverDayColors = datapoints.map(
      function(index){
        return index.day === today ? 'hsl(186, 47%, 80%)': 'hsl(10, 100%, 76%)';
      });
      /* console.log(`days= ${days}, ${days[todayIndex-1]}`);
      console.log(`amounts= ${amounts}`);
      console.log(today === days[todayIndex-1]); 
      console.log(dayColors);*/

      myChart.config.data.labels = days;
      myChart.config.data.datasets[0].data = amounts;
      myChart.config.data.datasets[0].backgroundColor = dayColors;
      myChart.config.data.datasets[0].hoverBackgroundColor = hoverDayColors;
      myChart.update();
  });


  
