
    //點外面關掉menu
    $(document).on("click", function(event){
      var $trigger = $(".select_wrap");
      if($trigger !== event.target && !$trigger.has(event.target).length){
          $(".select_wrap").removeClass("active");
    }
  })
    //menu開啟
    $(".default_option").click(function(){
      var $this = $(this).parent().find('.select_ul');
      $(".select_wrap .select_ul").not($this).parents(".select_wrap").removeClass("active");
    $(this).parent().toggleClass("active");
  })
  
  //選單覆蓋title
  $(".select_ul li").click(function(){
    var currentele = $(this).html();
    var $this = $(this).closest('.select_wrap');
    $this.find(".default_option li").html(currentele);
    $(this).parents(".select_wrap").removeClass("active");
  })

    var chart;
    const imageURLs = [ 
    'Assets/image/job/Dragon_Knight.bmp',//盧
    'Assets/image/job/ImperialGuard.bmp',//皇
    'Assets/image/job/Shadow_cross.bmp',//斬
    'Assets/image/job/Abyss_Chaser.bmp',//魅
    'Assets/image/job/Arch_Mage.bmp',//咒
    'Assets/image/job/Elmental_Master.bmp',//元
    'Assets/image/job/Meister.bmp',//機
    'Assets/image/job/Biolo.bmp',//基
    'Assets/image/job/Cardinal.bmp',//主
    'Assets/image/job/Imquisitor.bmp',//修
    'Assets/image/job/WindHawk.bmp',//遊
    'Assets/image/job/Troubadour.bmp',//詩
    'Assets/image/job/dancing.bmp',//舞
    ];
    const images = imageURLs.map(v => {
    var image = new Image();
    image.src = v;
    return image;
    });
    var x_array =[];
    var y_array = [];
    var time_array = [];
    var username = [];
    var job = [];
    var sites = [];
    var temp = [];
    var temp_sites = new Object();
    var temp_sites2 = [];
    var temp_job = [];
    var temp_job2 = [];
    var indexes = [];
    var whole_job_length;
    var data = {datasets: sites};
    var job_value;
    var guess_index = [];
    var onclick_temp = 0;
    var delayed;
    Chart.register({
         id: 'draw_img',
         beforeDraw: (c) => {
         let datasets = c.data.datasets;
         var counter2 = 0;
         datasets.forEach((e, i) => {
          if (counter2 < whole_job_length) {
           let data = c.getDatasetMeta(i).data;
           var job_selector = job[counter2];
                  switch (job_selector) {
                    case '盧':job_number = 0;break;
                    case '皇':job_number = 1;break;
                    case '斬':job_number = 2;break;
                    case '魅':job_number = 3;break;
                    case '咒':job_number = 4;break;
                    case '元':job_number = 5;break;
                    case '機':job_number = 6;break;
                    case '基':job_number = 7;break;
                    case '主':job_number = 8;break;
                    case '修':job_number = 9;break;
                    case '遊':job_number = 10;break;
                    case '詩':job_number = 11;break;
                    case '舞':job_number = 12;break;
                    default:
                      console.log(`還有其他的?`);
                  }
                  counter2++;
              data.forEach( function(e) {
                let ctx = c.ctx;
                let x = e.x;
                let y = e.y;
                let r = e.options.radius + 6;
                //圖片蓋到axis時不顯示
                if(x < 40 ||ctx.canvas.height - y < 20){
                  return;
                }
                else{
                  ctx.save();
                  ctx.beginPath();
                  ctx.drawImage(images[job_number], x-r/2, y-r/2, r, r);
                  ctx.stroke();
                  ctx.restore();
                }
                });
          }
        });
          },
          
          id:'yscaleText',
          afterDraw(chart, args,options){
            const{ ctx, chartArea:{top,bottom,right},scales:{x,y}}= chart;
            ctx.save();
            ctx.font ='12px Arial';
            ctx.fillStyle = '#f1f1f1';
            ctx.fillText('(傷害 Damage)',0, top -10);
            ctx.restore();
          }
        });
    const ctx = document.getElementById('canvas').getContext('2d');
    //json轉檔
    JsonTransition();
    function JsonTransition(){
    $.getJSON("Assets/json/job_damage.json", function(json_file) {
      
     x_array= json_file.objects.map(function(item ,index) {
        if(item.guess_currency){
          //得知guess的index 存成一個陣列
          guess_index.push(index);
          return Math.floor((item.guess_currency/item.currency_ratio)*10000/39);
        }
        else
      return Math.floor((item.Virtual_currency/item.currency_ratio)*10000/39);
     });
     //json轉成單一array
     y_array = json_file.objects.map(function(item) {
        return item.Every_Damage;
     });
     time_array = json_file.objects.map(function(item) {
        return item.Time;
     });
     username = json_file.objects.map(function(item) {
        return item.username;
     });
     job = json_file.objects.map(function(item) {
        return item.job;
     });
      job_sort();
      // 畫表格
      init();
    });
  };
  
    const zoomOptions = {
        limits:{
          y:{min:0,max:60000,minRange:3000},//minRange控制滾輪放大程度
          x:{min:0,max:12000,minRange:500},
        },
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom:{
          wheel: {
            enabled: true,
            //speed:0.05,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
          
          onZoomComplete({chart}) {
          // This update is needed to display up to date zoom level in the title.
          // Without this, previous zoom level is displayed.
          // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
          chart.update('none');
          },
        },
        
      }
    const options ={
          maintainAspectRatio:false,
          responsive: true,
          clip: false,
          hover: {
            mode: "nearest",
            axis: "xy",
            intersect: true,
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
              tooltip: {
                  //events: ['mousemove'],
                  enabled: true,
                  displayColors: false,
                  mode: "nearest",
                  axis: "xy",
                  intersect: true,
                  //鳥爛排版
                  padding:{
                    x:24,
                    y:18,
                  },
                  titleAlign:"center",
                  titleFont:{
                    size: 22,
                    family:'Microsoft JhengHei',
                  },
                  titleColor:'#cacfd4',
                  titleMarginBottom:10,
                  backgroundColor:"#192c40f0",
                  bodyFont: {
                    size: 17,
                    family:'Microsoft JhengHei',
                  },
                  borderColor:'#92f2e9',
                  borderWidth:0.15,
                  callbacks: {
                    title:function(tooltipItems){
                      var title =  tooltipItems[0].dataset.label;
                      return title;
                    },
                      label: function(tooltipItems) {
                        //不=0 代表是我預估的
                        let iamguess =" (玩家提供)";
                        if(tooltipItems.dataset.iamguess !=0){
                          iamguess =" (我預估)";
                        }
                        let label = "花費: " + (tooltipItems.raw.x) + "顆";
                        let label2 = "傷害: " + (tooltipItems.raw.y) + "K";
                        
                        //用空格排版
                        return [label + iamguess, label2];
                      },
                  }
              },
          },
           
          scales: {
              y:{
                  grid: {color: 'rgba( 160, 255, 240, 0.2)',},
                  border:{color:"rgba( 160, 255, 240, 0.25)",width:1,},
                  display:true,
                  max:15000,
                  min:0,
                  ticks: {
                      color:"#f1f1f1",
                      beginAtZero: true,
                      precision:0,
                      padding: 8,
                      crossAlign: 'start',
                      
                      callback: (value, index, ticks) => {
                        if(index === ticks.length - 1){return null;}
                        else
                            if(value >= 10000){return Math.floor(value/1000) + 'M';}
                            else
                              return Math.floor(value) + 'K';
                      }
                  }
              },
              x: {
                grid: {color: 'rgba( 160, 255, 240, 0.2)',},
                  border:{display:false,},
                  display: true,
                  min:0,
                  max: 800,
                  title:{
                    display: true,
                    text:'(轉蛋價值 39$)',
                    color:'#f1f1f1',
                  },
                  ticks: {
                      color:"#f1f1f1",
                      beginAtZero: true,
                      precision:0,
                      callback: (value, index, ticks) => {
                        if(index === ticks.length - 1){return null;}
                          else
                              return Math.floor(value) + '顆';
                      }
                  }
              },
          },
          animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 10 + context.datasetIndex * 10;
          }
          return delay;
        },
      },
  
          onHover: function (evt, elements) {
              evt.native.target.style.cursor = elements[0] ? 'pointer' : 'grab';
          },
          onClick: (event, elements, chart) => {
            //先還原
            event.chart.data.datasets[onclick_temp].borderColor ='transparent';
            if (elements[0]) {
              //對象的index & Label
              const i = elements[0].datasetIndex;
              onclick_temp = i;
              const datasetLabel = event.chart.data.datasets[i].label;
              event.chart.data.datasets[i].borderColor ="#53F4E7";
              event.chart.data.datasets[i].borderWidth =2;
            }
            chart.update();
          }
      };
  
    const config = {
        type: 'scatter',
        data: data,
        options:options,
        //point click 點data時event
        plugins: [
  {
      afterEvent(chart, args, options) {
          if (
              args.event.type === "click" && typeof chart.tooltip.dataPoints !== "undefined"
          ) {
              // note the cursor position upon clicking
              const { x, y } = args.event;
              // note the boundary positions of the nearest chart element
              const left = chart.tooltip.dataPoints[0].element.x - chart.tooltip.dataPoints[0].element.options.radius - 14;
              const right = chart.tooltip.dataPoints[0].element.x + chart.tooltip.dataPoints[0].element.options.radius + 14;
              const top = chart.tooltip.dataPoints[0].element.y - chart.tooltip.dataPoints[0].element.options.radius - 14;
              const bottom = chart.tooltip.dataPoints[0].element.y + chart.tooltip.dataPoints[0].element.options.radius + 14;
              const div = document.getElementById("equip_table_box");
              const div2 = document.getElementById("data_user");
              const title = chart.tooltip.dataPoints[0].dataset.label;
              const time = chart.tooltip.dataPoints[0].dataset.gettime;
  
              // proceed if the cursor is within the element boundaries
              if (x >= left && x <= right && y >= top && y <= bottom) {
                div.style.display = "block";
                div2.style.display = "flex";
                //先找到點到的物件的username
                //比對equip_data的username
                //再將內容一個一個map過去
                $.getJSON("Assets/json/equip_data.json", function(json_file) {
                  for(var i = 0 ;i < json_file.objects.length; i++){
                    if (title == json_file.objects[i].username){
                      $("#data_time").text(time);
  
                      $("#data_title").text(json_file.objects[i].username);
                      $("#e_top").children('span').text(json_file.objects[i].e_top);
                      $("#e_top_middle").children('span').text(json_file.objects[i].e_top_middle);
                      $("#e_top_down").children('span').text(json_file.objects[i].e_top_down);
                      $("#e_cloth").children('span').text(json_file.objects[i].e_cloth);
                      $("#e_weapon").children('span').text(json_file.objects[i].e_weapon);
                      $("#e_shield").children('span').text(json_file.objects[i].e_shield);
                      $("#e_shawl").children('span').text(json_file.objects[i].e_shawl);
                      $("#e_shoes").children('span').text(json_file.objects[i].e_shoes);
                      $("#e_accessories_right").children('span').text(json_file.objects[i].e_accessories_right);
                      $("#e_accessories_left").children('span').text(json_file.objects[i].e_accessories_left);
                      $("#b_top").children('span').text(json_file.objects[i].b_top);
                      $("#b_top_middle").children('span').text(json_file.objects[i].b_top_middle);
                      $("#b_top_down").children('span').text(json_file.objects[i].b_top_down);
                      $("#b_cloth").children('span').text(json_file.objects[i].b_cloth);
                      $("#b_hand").children('span').text(json_file.objects[i].b_hand);
                      $("#b_shield").children('span').text(json_file.objects[i].b_shield);
                      $("#b_shawl").children('span').text(json_file.objects[i].b_shawl);
                      $("#b_shoes").children('span').text(json_file.objects[i].b_shoes);
                      $("#b_accessories_right").children('span').text(json_file.objects[i].b_accessories_right);
                      $("#b_accessories_left").children('span').text(json_file.objects[i].b_accessories_left);
                      break;
                    }
                    else if(i == json_file.objects.length - 1 && title != json_file.objects[i].username){
                      $(".equip-table").find('span').text("沒有 :(");
                      $("#data_user").find('div').text("沒有 :(");
                      $("#data_title").text(title);
                    };
                  };
                })
              }
              else{
                div.style.display = "none";
                div2.style.display = "none";
              }
          }
      }
      }
      ]
        };
    function init() {
    chart = new Chart(ctx, config);
      };

    //job部分
      function job_sort(){
        whole_job_length = job.length;
        var m = 0;
        for(var i = 0; i < job.length; i++){
          //找到guess位置
          var index = 0;
          if(i == guess_index[m]){
            index = guess_index[m];
            m ++;
          };
              var site = {
                  label:username[i],
                  pointRadius: 24,
                  borderWidth: 0,
                  hitRadius:1,
                  radius:0,
                  hoverBorderWidth:3,
                  hoverRadius:28,
                  borderColor: 'transparent',
                  backgroundColor: 'transparent',
                  hidden:false,
                  pointStyle:'rect',
                  iamguess:index,
                  gettime:time_array[i],
                  data:[{
                  x: Number(x_array[i]),
                  y: Number(y_array[i]),
                  }],
              };
            sites.push(site);
          }
      };
  
      $('.job_option').on('click',  function() {
        //分開js後 寫法變了???
        const val = $(this)[0].attributes.value.value;
      //const val = $(this).attr('value');
      onclick_temp = 0; //切重製
        job_value = val;
        indexes = [];
        //如果目前資料(長度) 不等於 全部資料(長度)，先把暫存移除的資料回復，再做filter，如果已經相等，直接偵測點選的job
        if(whole_job_length != sites.length){
            
          restore_sites();
          detect_job_value();
          chart.update();
        }
        else{
          detect_job_value();
        }
    });
  
      function detect_job_value(){ 
        
        if(job_value != 'all'){
            
            for_index();
            chart.update();
          }
          else{
            chart.update();
          }
      };
  
      function for_index(){
        //重製indexes
        indexes = [];
            for (var index = 0; index < whole_job_length; index++) {
              //job的index也要改
                if (job[index] != job_value) {
                  indexes.push(index);
                }
            }
            for (var i = indexes.length -1; i >= 0; i--){
              temp_sites = Object.assign({}, sites.splice(indexes[i],1));
              temp_job = job.splice(indexes[i],1);  
              temp_sites2.push(temp_sites[0]);
              temp_job2.push(temp_job[0]);
            }
      };
  
      function restore_sites(){
        temp_sites = undefined;
        temp_job = undefined;

          for (var index = 0; index < temp_sites2.length; index++) {
                  indexes.push(index);
          }
          
          //先取temp_site2的長度出來，寫一個for迴圈，再用Object.assign一個個存入sites
          for (var b = indexes.length -1; b >= 0; b--){
            temp_sites = Object.assign({}, temp_sites2.splice(indexes[b],1));
            temp_job = temp_job2.splice(indexes[b],1);
            sites.push(temp_sites[0]);
            job.push(temp_job[0]);
          }
          temp_job2 = [];
          temp_sites2 = [];
      };
 

    function closed_float_box(){
      document.getElementById("equip_table_box").style.display = "none"; 
      document.getElementById("data_user").style.display = "none"; 
    };
  
    //zoom區
    function resetZoom() {
    chart.resetZoom();
    };
  
    //模擬滑鼠滾輪 zoom in & out
    function Zoomin() {
      var evt = document.createEvent('MouseEvents');
      evt.initEvent('wheel', true, true);
      evt.deltaY = -2000;
      document.getElementById("canvas").dispatchEvent(evt);
    };
    function Zoomout() {
      var evt = document.createEvent('MouseEvents');
      evt.initEvent('wheel', true, true);
      evt.deltaY = 2000;
      document.getElementById("canvas").dispatchEvent(evt);
    };
    
  