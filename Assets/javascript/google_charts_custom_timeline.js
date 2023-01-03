    google.charts.load('current', {
    callback: function () {
      drawTimeline();
      window.addEventListener('resize', drawTimeline, false);
    },
    packages:['controls','timeline'],'language': 'zh-TW'
   });
   var timelineRangeSlider;
   function drawTimeline() {
      $.ajax({
          url: "Assets/json/official_activity.json",
          dataType: "json",
          success: function (jsonData) {
           var container = document.getElementById('google_chart');
          // var chart = new google.visualization.Timeline(container);
          var dataTable = new google.visualization.DataTable();
              dataTable.addColumn({type: 'string', label:'type'});
              dataTable.addColumn({type: 'string', label:'Name'});
              dataTable.addColumn({type:'date',  label:'Start'});
              dataTable.addColumn({type:'date',  label:'End'});
              for (var i = 0; i < jsonData.rows.length; i++) {
                dataTable.addRow([
                    jsonData.rows[i].c[0],
                    jsonData.rows[i].c[1],
                    new Date(jsonData.rows[i].c[2].v),
                    new Date(jsonData.rows[i].c[3].v),
                  ]);
              }
   
              var formatDate = new google.visualization.DateFormat({
                  pattern: 'MM/dd/yyyy'
              });
              dataTable.insertColumn(2, { type: 'string', role: 'tooltip', p: {html: true} });
              for (var i = 0; i < dataTable.getNumberOfRows(); i++) {
                  var duration = Math.abs(dataTable.getValue(i, 4).getTime() - dataTable.getValue(i, 3).getTime()) / 1000;
                  //沒精準到小時，so直接+1天
                  var days = Math.floor(duration / 86400) + 1;
                  duration -= days * 86400;
   
                  var tooltip = '';
                  tooltip += '<div class="ggl-tooltip"><div>';
                  tooltip += '<span>' + dataTable.getValue(i, 1) + '</span>';
                  tooltip += '</div><div>';
                  tooltip += formatDate.formatValue(dataTable.getValue(i, 3)) + ' - ' + formatDate.formatValue(dataTable.getValue(i, 4));
                  tooltip += '</div><div>';
                  tooltip += '<span>總時程:&nbsp;</span>'+ days + ' 天 ';
                  tooltip += '</div></div>';
                  dataTable.setValue(i, 2, tooltip);
              }
   
               var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));
   
              var timeline = new google.visualization.ChartWrapper({
              chartType: 'Timeline',
              containerId: 'google_chart',
              view: {columns: [0,1,2,3,4]},
              dataTable:dataTable,
              options:{
                colors:['rgb(50, 80, 161)','rgb(116, 49, 110)','rgb(62, 94, 73)','rgb(126, 103, 62)','rgb(57, 121, 141)','rgb(141, 57, 57)'],
                tooltip: {isHtml: true},
                timeline:{
                  groupByRowLabel:true,
                  
                  colorByRowLabel: true,
                  rowLabelStyle: {
                    fontSize: 20,
                  },  
                  barLabelStyle:{
                    fontSize: 15,
                  }
                }
              },
              });
              
              timelineRangeSlider = new google.visualization.ControlWrapper({
                controlType: 'ChartRangeFilter',
                containerId: 'timeline-filter',
                options: {   
                  filterColumnIndex: 3,
                //  filterColumnLabel: 'Start',
                ui: {
                chartType: 'ScatterChart',
                chartOptions: {
                  chartArea: {width: '95%'},
                  hAxis: {baselineColor: 'none'},
                  legend: {position: 'none'},
                },
                // Display a single series that shows the closing value of the stock.
                // Thus, this view has two columns: the date (axis) and the stock value (line series).
                chartView: {
                  columns: [3, 4]
                },
                  // 1 day in milliseconds = 24 * 60 * 60 * 1000 = 86,400,000
                  minRangeSize: 86400000
                }
                },
                //日期區間????怪怪der
                state: {range: {start: new Date(2021, 11, 30), end: new Date(2022, 12, 20)}}
              });
              dashboard.bind(timelineRangeSlider, timeline);
              dashboard.draw(dataTable);
   
              google.visualization.events.addListener(timeline, 'ready', function () {
   
                  // find <rect> elements
                  var rects = container.getElementsByTagName('rect');
                  Array.prototype.forEach.call(rects, function(rect) {
                      if (rect.getAttribute('stroke') === '#9a9a9a') {
                      // remove border
                      rect.setAttribute('stroke-width', '0');
                      }
                  });
   
                  // find <path> elements 橫線#b7b7b7 直線#e6e6e6
                  var paths = container.getElementsByTagName('path');
                  Array.prototype.forEach.call(paths, function(path) {
                      if ((path.getAttribute('stroke') === '#ffffff') || (path.getAttribute('stroke') === '#e6e6e6')) {
                      // remove border
                      path.setAttribute('stroke-width', '0.5');
                      path.setAttribute('stroke', '#ffffff99');
                      }
                      if ((path.getAttribute('stroke') === '#b7b7b7')){
                        path.setAttribute('stroke', '#ffffff66');
                      }
                  });
   
                  });
   
              }
          })
      
   }