    var number_array = [];
    var tooltip = null;
    // dataSource json use fetch api
    let dataSource =  function({year}) {
    return fetch('Assets/json/maintain.json')
      .then(result => result.json())
      .then(result => {
        if (result.items) {
          return result.items.map(r => ({
            startDate: new Date(r.date),
            endDate: new Date(r.date),
            name: r.status,
            color:r.color,
            details: r.special
          }));
        }
        return [];  
      });
    }
    const calendar = new Calendar('#calendar', {
      
    language: 'zh-TW',
    dataSource: dataSource,
    mouseOnDay: function(e) {
    if (e.events.length > 0) {
      var content = '';
      for (var i in e.events) {
          if(e.events[i].details ==undefined){
            e.events[i].details = "";
          }
        content += '<div class="event-tooltip-content">'
          + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>' + '<div class="event-details" style="color:' + e.events[i].color + '">' + e.events[i].details + '</div>'+ '</div>';
      }
      
      if (tooltip !== null) {
        tooltip.destroy();
        tooltip = null;
      }
      
      tooltip = tippy(e.element, {
          placement: 'right',
          content: content,
          animateFill: false,
          animation: 'shift-away',
          arrow: true
      });
      tooltip.show();
    }
  },
  mouseOutDay: function() {
    if (tooltip !== null) {
      tooltip.destroy();
      tooltip = null;
    }
  }
});

    var today = new Date();
    var thisyear =  today.getFullYear();
    $.getJSON("Assets/json/maintain.json", function(json_file) {
        var n1 = 0;
        var t1 = 0;
        var d1 = 0;
        var z = 0;
        for(var i = 0 ;i < json_file.items.length; i++){
          var inside_array = [];
          //如果資料讀到前一年 或最後一筆 就統計
          if ((new Date(json_file.items[i].date)).getFullYear() != thisyear - z || i == json_file.items.length - 1){
            z++;
            inside_array.push(n1,t1,d1);
            number_array.push(inside_array);
            n1 = 0;
            t1 = 0;
            d1 = 0;
          }
            //如果資料年份 = 今年 然後分類
            if ((new Date(json_file.items[i].date)).getFullYear() == thisyear - z){
                if(json_file.items[i].normal_maintain==1){
                    n1+=1;
                }
                else if(json_file.items[i].temporary_maintain==1){
                    t1+=1;
                }
                else{
                    d1+=1;
                }
            }
        }
        $("#normal").text(number_array[0][0]);
        $("#temp").text(number_array[0][1]);
        $("#delay").text(number_array[0][2]);
    });
    document.querySelector('#calendar').addEventListener('yearChanged', function(e) {
        //選到目前年份
        var x =   e.currentYear - thisyear;
        var y =  2019 - e.currentYear;
        //只到2019
        if( x <=0 && y <1){
           x  = Math.abs(x);
          $("#normal").text(number_array[x][0]);
          $("#temp").text(number_array[x][1]);
          $("#delay").text(number_array[x][2]);
        }
        else{
          $("#normal").text(0);
          $("#temp").text(0);
          $("#delay").text(0);
        }
        
    })
