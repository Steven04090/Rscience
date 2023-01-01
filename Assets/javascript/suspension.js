
  var chart;
  var sites = [];
  var data = {datasets: sites};
  const ctx = document.getElementById('canvas').getContext('2d');

  //json轉檔
  JsonTransition();
  function JsonTransition(){
  $.getJSON("Assets/json/suspension/suspension_20221215.json", function(json_file) {
   //json to array
   x_array = json_file.map(function(item) {
      return {
        'x':item.whole,
        'y':item.suspension_number
      };
   });

   //load data
   load_data();
    // draw chart
    init();
  });
};

  const zoomOptions = {
    limits:{
        y:{min:0},
        x:{min:'original', max: 'original',minRange:3600*1000*24*24 },//time base on 1000
      },
      pan: {
        enabled: true,
        mode: 'x',
      },
      zoom:{
        mode: 'x',
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        //zoom 改變x軸顯示
        onZoomComplete({chart}) {
          if ((chart.getZoomLevel()) > (1.2)) {
          options.scales.x.time.unit = "day";
        }
        else{
          options.scales.x.time.unit = "month";
        }
        chart.update('none');
       }
      },
    }
  const options ={
        maintainAspectRatio:false,
        responsive: true,
        interaction: {
          intersect: false,
          mode: 'x',
        },
         plugins:{
            zoom: zoomOptions,
            title:{
              display:false,
              color:'#fff',
              position:"bottom",
              font:{size:20,},
            },
            legend: {
            display: false,
            }, 
          },
         
          scales: { 
            y:{
              ticks: {
                    color:"#eee",
                },
                grid: {color: 'rgba( 160, 255, 240, 0.2)',},
                border:{color:"rgba( 160, 255, 240, 0.25)",width:1,},
                display:true,
            },
            x: {
              ticks: {
                    color:"#eee",
                },
              grid: {
                color: 'rgba( 160, 255, 240, 0.2)',
                offset:false,
                },
                type: 'time',
                  time: {
                    tooltipFormat: 'YYYY/MM/DD',
                    unit:  'month',
                },
                border:{display:false,},
                display: true,
                
            },      
          },
        };
  
  const config = {
      type: 'bar',
      data: data,
      options:options,
      };
  function init() {
  chart = new Chart(ctx, config);
    };

  function load_data(){
            var site = {
                //label:y_array[i],
                data:x_array,
                minBarLength:10,
                backgroundColor:'#69d4c682',
            };
          sites.push(site);
   //     }
    };

  //zoom區
  function resetZoom() {
  chart.resetZoom();
}
