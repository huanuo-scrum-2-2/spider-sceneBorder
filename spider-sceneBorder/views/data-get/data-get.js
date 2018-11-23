var xx;
var yy;

$(document).ready(function () {
	$('#scenario').change(function(){ 
		var selectProvince = $("#province option:selected").text();
    var selectCity = $("#city option:selected").text();
		locationurl="http://sceneborder.imwork.net/"+ 'get_centerxy_by_wgs84?prov=' + selectProvince + '&city=' + selectCity
		var vgetApi = function (url, data, success, error) {
        var option = {
            method: 'get',
            url: url,
            async: false,
            contentType: "application/json; charset=UTF-8",
            data: data,
            success: success,
            error: error
        };
        $.ajax(option);
    };
 
	 vgetApi(locationurl, null, function (data) {

        var data = JSON.parse(data);
        window.xx=data.x;
        window.yy=data.y;
                
       function G(id) {
            return document.getElementById(id);
        }

        var map = new BMap.Map("allmap");
        
        
        map.setMapStyle({
  styleJson:[
          {
                    "featureType": "background",
                    "elementType": "all",
                    "stylers": {
                              "color": "#ffffffff"
                    }
          }
]
})       
    var point = new BMap.Point(window.xx, window.yy);
    map.centerAndZoom(point, 12);
     map.enableScrollWheelZoom(true);   
        //console.log(data);
    }, function (data) {
    });	
}) 
	
	
	

        //====================================================心跳包重连CODE END=========================================

        function G(id) {
            return document.getElementById(id);
        }

        var map = new BMap.Map("allmap");
        
        
        map.setMapStyle({
  styleJson:[
          {
                    "featureType": "background",
                    "elementType": "all",
                    "stylers": {
                              "color": "#ffffffff"
                    }
          }
]
})
        
        
        
    var point = new BMap.Point(113.14076702065299, 34.855163909251885);
    map.centerAndZoom(point, 12);
    map.enableScrollWheelZoom(true);
        var ac = new BMap.Autocomplete({
            "input": "suggestId",
            "location": map
        });
        ac.addEventListener("onhighlight", function (e) {
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });
        var myValue;
        ac.addEventListener("onconfirm", function (e) {
            var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            setPlace();
        });

        function setPlace() {
            function myFun() {
                var pp = local.getResults().getPoi(0).point;
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));
            }

            var local = new BMap.LocalSearch(map, {
                onSearchComplete: myFun
            });
            local.search(myValue);
        }

        map.addEventListener("dragstart", function (evt) {
            var cp = map.getCenter();
        });

        map.addEventListener("dragging", function (evt) {
            var offsetPoint = new BMap.Pixel(evt.offsetX, evt.offsetY); //记录鼠标当前点坐标<br>

        });
        
        
        
         var vgetApi = function (url, data, success, error) {
        var option = {
            method: 'get',
            url: url,
            async: false,
            contentType: "application/json; charset=UTF-8",
            data: data,
            success: success,
            error: error
        };
        $.ajax(option);
    };
        
          function vdraw_chart2(prov_name, pois_count, pois_count2) {
        var myCharts2 = echarts.init(document.getElementById('chart_1'));
        var option = {
        		color: ['#3398DB'],
            grid: {
                top: "3%",
                left: '3%',
                right: '4%',
                bottom: '2%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: "{a} {c}"
            },
            backgroundColor: '#fff',
             xAxis: {
                type: 'category',
                data: prov_name,
             axisTick: {
				alignWithLabel: true
			},
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
			axisLabel: {
				color: 'rgb(170,170,170)',
				formatter: '{value} '
			}
            },
            yAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
			axisLabel: {
				color: 'rgb(170,170,170)',
				formatter: '{value} '
			}
		},
            series: [{
			name: 'poiBorder量',
			type: 'bar',
			barWidth: '30%',
			data: pois_count,
			itemStyle: {
				normal: {
					barBorderRadius: [20, 20, 0, 0],
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
								offset: 0,
								color: '#A6F9E7'
							},
							{
								offset: 0.3,
								color: '#88DDF1'
							},
							{
								offset: 0.7,
								color: '#6BBFFD'
							}
						]
					)
				}
			},
		},
		

		
		
                {
                    name: 'poi量',
                     data: pois_count2,
                    //data: ['1','2'],
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#ffb9b9'
                        },
                    },
                }
            ]
        };
        myCharts2.setOption(option);
    }


    function vdraw_chart1(prov_name, pois_count, pois_count2) {
        var myCharts1 = echarts.init(document.getElementById('chart_2'));
        var option = {
        		color: ['#3398DB'],
            grid: {
                top: "3%",
                left: '3%',
                right: '4%',
                bottom: '2%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: "{a} {c}"
            },
            backgroundColor: '#fff',
             xAxis: {
                type: 'category',
                data: prov_name,
             axisTick: {
				alignWithLabel: true
			},
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
			axisLabel: {
				color: 'rgb(170,170,170)',
				formatter: '{value} '
			}
            },
            yAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
			axisLabel: {
				color: 'rgb(170,170,170)',
				formatter: '{value} '
			}
		},
            series: [{
			name: 'poiBorder量',
			type: 'bar',
			barWidth: '30%',
			data: pois_count,
			itemStyle: {
				normal: {
					barBorderRadius: [20, 20, 0, 0],
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
								offset: 0,
								color: '#A6F9E7'
							},
							{
								offset: 0.3,
								color: '#88DDF1'
							},
							{
								offset: 0.7,
								color: '#6BBFFD'
							}
						]
					)
				}
			},
		},
		

		
		
                {
                    name: 'poi量',
                     data: pois_count2,
                    //data: ['1','2'],
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#ffb9b9'
                        },
                    },
                }
            ]
        };
        myCharts1.setOption(option);
    } 
        
    
     var hostName = "http://sceneborder.imwork.net/";
    var mypath = {
    "getPoisSummary": hostName + 'get_pois_summary',
    "getPoiSceneSummary": hostName + 'get_poi_scene_summary'
    };
        
        
        
       vgetApi(mypath.getPoisSummary, null, function (data) {
        var prov = [];
        var count = [];
        var countd = [];
        var data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            prov[i] = data[i].prov_name;
            count[i] = data[i].pois_border_count;
            countd[i] = data[i].pois_count;
            console.log('采集场景数量 getPoisSummary ');
            
            
            
            
            vdraw_chart2(prov, count, countd);
        }
        //console.log(data);
    }, function (data) {
    });
   
          vgetApi(mypath.getPoiSceneSummary, null, function (data) {
        var city = [];
        var count = [];
        var countd = [];
        var data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            city[i] = data[i].scene_name;
            count[i] = data[i].pois_border_count;
            countd[i] = data[i].pois_count;
            console.log('采集场景数量 getPoiSceneSummary ');
            vdraw_chart1(city, count, countd);
        }
        //console.log(data);
    }, function (data) {
    });     
        


    }
);


$('#selectBtn').click(function () {
	
		if ($("#province option:selected").text()!='请选择'&&$("#city option:selected").text()!='请选择'&&$("#scenario option:selected").text()!='请选择'&&$("#mapchoosed option:selected").text()!='请选择'    ){
					
			 if (!window.WebSocket) {
            if (window.MozWebSocket) {
                window.WebSocket = window.MozWebSocket;
            } else {
                console.log("<p>你的浏览器不支持websocket</p>");
            }
        }

        var lockReconnect = false;  //避免ws重复连接
        var wsUrl = "ws://sceneborder.imwork.net:31756/websocket/";
        createWebSocket(wsUrl);   //连接ws

        function createWebSocket(url) {
            try {
                ws = new WebSocket(url);
                initEventHandle();
            } catch (e) {
                reconnect(url);
                console.log(e);
            }
        }

        function initEventHandle() {
            ws.onclose = function () {
                console.log("ws连接关闭!" + new Date().toUTCString());
                reconnect(wsUrl);
            };
            ws.onerror = function () {
                console.log("ws连接错误!");
                reconnect(wsUrl);
            };
            ws.onopen = function (evt) {
                $("ul li:eq(0)").html('websocket连接成功');
                ws.send('ready!');
                heartCheck.reset().start();      //心跳检测重置
                console.log("ws连接成功!" + new Date().toUTCString());
            };
            ws.onmessage = function (evt) {    //如果获取到消息，心跳检测重置
                $("ul li:eq(1)").html($("ul li:eq(0)").html())
                $("ul li:eq(0)").html(evt.data);

                add_coverage_2_map(evt.data)
                heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
                // var eventData = evt.data;
                // handMsg(eventData);   //引入消息处理模块
            };
            // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            window.onbeforeunload = function () {
                ws.close();
            };
        }

        function add_coverage_2_map(sdata) {
            if (sdata.indexOf("栅格范围|") != -1) {
                var xy = sdata.split("栅格范围|")[1].split(";")
                var lb = xy[0].split(",")
                var rt = xy[1].split(",")
                var polygon = new BMap.Polygon([
                    new BMap.Point(lb[0], lb[1]),
                    new BMap.Point(lb[0], rt[1]),
                    new BMap.Point(rt[0], rt[1]),
                    new BMap.Point(rt[0], lb[1]),
                    new BMap.Point(lb[0], lb[1])
                ], {
                    strokeColor: "green",
                    strokeWeight: 2,
                    strokeOpacity: 0.5,
                    fillColor: "orange"
                }); //创建多边形

                map.addOverlay(polygon);
            }
        }

        function reconnect(url) {
            if (lockReconnect) return;
            lockReconnect = true;
            setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
                createWebSocket(url);
                lockReconnect = false;
            }, 5000);
        }

        //心跳检测
        var heartCheck = {
            //timeout: 540000,        //9分钟发一次心跳
            //timeout: 3600,        //1分钟发一次心跳
            timeout: 10800,        //3分钟发一次心跳
            timeoutObj: null,
            serverTimeoutObj: null,
            reset: function () {
                clearTimeout(this.timeoutObj);
                clearTimeout(this.serverTimeoutObj);
                return this;
            },
            start: function () {
                var self = this;
                this.timeoutObj = setTimeout(function () {
                    //这里发送一个心跳，后端收到后，返回一个心跳消息，
                    //onmessage拿到返回的心跳就说明连接正常
                    ws.send("ping");
                    console.log("ping!")
                    self.serverTimeoutObj = setTimeout(function () {
                        //如果超过一定时间还没重置，说明后端主动断开了
                        //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                        ws.close();
                    }, self.timeout)
                }, this.timeout)
            }
        }
	
	
	
	

    function G(id) {
        return document.getElementById(id);
    }

    var map = new BMap.Map("allmap");
    
            map.setMapStyle({
  styleJson:[
          {
                    "featureType": "background",
                    "elementType": "all",
                    "stylers": {
                              "color": "#ffffffff"
                    }
          }
]
})
    
    
    var point = new BMap.Point(window.xx, window.yy);
    map.centerAndZoom(point, 12);
    map.enableScrollWheelZoom(true);
    var ac = new BMap.Autocomplete({
        "input": "suggestId",
        "location": map
    });
    ac.addEventListener("onhighlight", function (e) {
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province + _value.city + _value.district + _value.street + _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
    });
    var myValue;
    ac.addEventListener("onconfirm", function (e) {
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        setPlace();
    });

    function setPlace() {
        function myFun() {
            var pp = local.getResults().getPoi(0).point;
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));
        }

        var local = new BMap.LocalSearch(map, {
            onSearchComplete: myFun
        });
        local.search(myValue);
    }

    map.addEventListener("dragstart", function (evt) {
        var cp = map.getCenter();
    });

    map.addEventListener("dragging", function (evt) {
        var offsetPoint = new BMap.Pixel(evt.offsetX, evt.offsetY); //记录鼠标当前点坐标<br>

    });


    var hostName = "http://sceneborder.imwork.net/";
    var selectProvince = $("#province option:selected").text();
    var selectCity = $("#city option:selected").text();
   
    var scene = $("#scenario option:selected").text();
    var selectmap = $("#mapchoosed option:selected").text();
    var mypath = {
        "runSpider": hostName + 'runspider?prov=' + selectProvince + '&city=' + selectCity + '&scene=' + scene + '&source=' + selectmap
        ,
        "getpoisonrunning": hostName + 'get_pois_on_running?prov=' + selectProvince + '&city=' + selectCity + '&scene=' + scene+ '&source=' + selectmap
        ,
        "getgridonrunning": hostName + 'get_grid_on_running?prov=' + selectProvince + '&city=' + selectCity + '&scene=' + scene+ '&source=' + selectmap
        ,
        "getgridhadrun": hostName + 'get_grids_had_run?prov=' + selectProvince + '&city=' + selectCity + '&scene=' + scene+ '&source=' + selectmap
    };
    var myjsonpPostApi = function (url, data, success, error) {
        var option = {
            method: 'post',
            url: url,
            async: false,
            data: data,
            dataType: "jsonp",
            success: success,
            error: error
        };
        $.ajax(option);
    };

    var vgetApi = function (url, data, success, error) {
        var option = {
            method: 'get',
            url: url,
            async: false,
            contentType: "application/json; charset=UTF-8",
            data: data,
            success: success,
            error: error
        };
        $.ajax(option);
    };


    function add_bud_2_map(sdata) {
        var polygon = new BMap.Polygon([
            new BMap.Point(sdata[0][0], sdata[0][1]),
            new BMap.Point(sdata[1][0], sdata[1][1]),
            new BMap.Point(sdata[2][0], sdata[2][1]),
            new BMap.Point(sdata[3][0], sdata[3][1]),
            new BMap.Point(sdata[4][0], sdata[4][1])
        ], {
            strokeColor: "blue",
            strokeWeight: 2,
            strokeOpacity: 0.5,
            fillColor: "yellow"
        }); //创建多边形
        map.addOverlay(polygon);
    }


    /*
    myjsonpPostApi(mypath.getpoisonrunning, null, function(data) {
            var pois_num = [];
            var pois_border_num = [];
            var data = JSON.parse(data);
            for(var i = 0; i < data.length; i++) {
                pois_num[i] = data[i].pois_num;
                pois_border_num[i] = data[i].pois_border_num;
                console.log(pois_num[i]);
            }
        }, function(data) {});
    */


    function vdraw_chart2(prov_name, pois_count, pois_count2) {
        var myCharts2 = echarts.init(document.getElementById('chart_1'));
         var option = {
        		color: ['#3398DB'],
            grid: {
                top: "3%",
                left: '3%',
                right: '4%',
                bottom: '2%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: "{a} {c}"
            },
            backgroundColor: '#fff',
             xAxis: {
                type: 'category',
                data: prov_name,
             axisTick: {
				alignWithLabel: true
			},
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
			axisLabel: {
				color: 'rgb(170,170,170)',
				formatter: '{value} '
			}
            },
            yAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
			axisLabel: {
				color: 'rgb(170,170,170)',
				formatter: '{value} '
			}
		},
            series: [{
			 name: 'poi量',
			type: 'bar',
			barWidth: '30%',
			data: pois_count,
			itemStyle: {
				normal: {
					barBorderRadius: [20, 20, 0, 0],
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
								offset: 0,
								color: '#A6F9E7'
							},
							{
								offset: 0.3,
								color: '#88DDF1'
							},
							{
								offset: 0.7,
								color: '#6BBFFD'
							}
						]
					)
				}
			},
		},
		

		
		
                {
                     name: 'poi边框量',
                     data: pois_count2,
                    //data: ['1','2'],
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#ffb9b9'
                        },
                    },
                }
            ]
        };
        myCharts2.setOption(option);
    }


    function vdraw_chart1(prov_name, pois_count, pois_count2) {
        var myCharts1 = echarts.init(document.getElementById('chart_2'));
         var option = {
        		color: ['#3398DB'],
            grid: {
                top: "3%",
                left: '3%',
                right: '4%',
                bottom: '2%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: "{a} {c}"
            },
            backgroundColor: '#fff',
             xAxis: {
                type: 'category',
                data: prov_name,
             axisTick: {
				alignWithLabel: true
			},
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
			axisLabel: {
				color: 'rgb(170,170,170)',
				formatter: '{value} '
			}
            },
            yAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
			axisLabel: {
				color: 'rgb(170,170,170)',
				formatter: '{value} '
			}
		},
            series: [{
			 name: 'grid完成量',
			type: 'bar',
			barWidth: '30%',
			data: pois_count,
			itemStyle: {
				normal: {
					barBorderRadius: [20, 20, 0, 0],
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
								offset: 0,
								color: '#A6F9E7'
							},
							{
								offset: 0.3,
								color: '#88DDF1'
							},
							{
								offset: 0.7,
								color: '#6BBFFD'
							}
						]
					)
				}
			},
		},
		

		
		
                {
                     name: 'grid总量',
                     data: pois_count2,
                    //data: ['1','2'],
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#ffb9b9'
                        },
                    },
                }
            ]
        };
        myCharts1.setOption(option);
    }


    vgetApi(mypath.runSpider, null, function (data) {
        var data = JSON.parse(data);
        console.log('在线采集 runspider');
        console.log(data);
        /*for(var i = 0; i < data.length; i++) {
        	console.log('运行spider');
            console.log(data[i]);
        }*/

    }, function (data) {
    });


    vgetApi(mypath.getpoisonrunning, null, function (data) {
        var city = [];
        var count = [];
        var countd = [];
        var data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            city[i] = data[i].city_name;
            count[i] = data[i].pois_num;
            countd[i] = data[i].pois_border_num;
            console.log('采集场景数量 get_pois_on_running ')
            console.log(data[i].city_name);
            console.log(data[i].pois_num);
            console.log(data[i].pois_border_num);
            vdraw_chart2(city, count, countd);
        }
        //console.log(data);
    }, function (data) {
    });

    vgetApi(mypath.getgridonrunning, null, function (data) {
        var city = [];
        var count = [];
        var countd = [];
        var data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            city[i] = data[i].city_name;
            count[i] = data[i].grid_done;
            countd[i] = data[i].grids;
            console.log('采集边框数量 get_grid_on_running')
            console.log(data[i].city_name);
            console.log(data[i].grid_done);
            console.log(data[i].grids);
            vdraw_chart1(city, count, countd);
        }
        //console.log(data);
    }, function (data) {
    });


    vgetApi(mypath.getgridhadrun, null, function (data) {
        var data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
        	 console.log(data[i].boundary);
            add_bud_2_map(data[i].boundary);

        }
        //console.log(data);
    }, function (data) {
    });
			
		
	}else{alert('省份、地市、场景、地图 均不可为空');}
	


})


;