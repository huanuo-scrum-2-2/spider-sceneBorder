$(document).ready(function () {
        /* !window.WebSocket、window.MozWebSocket检测浏览器对websocket的支持*/
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
                $("ul li:eq(6)").html('websocket连接成功');
                ws.send('ready!');
                heartCheck.reset().start();      //心跳检测重置
                console.log("ws连接成功!" + new Date().toUTCString());
            };
            ws.onmessage = function (evt) {    //如果获取到消息，心跳检测重置
                $("ul li:eq(7)").html($("ul li:eq(6)").html())
                $("ul li:eq(6)").html(evt.data);

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
                    fillColor: "blue"
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

        //====================================================心跳包重连CODE END=========================================

        function G(id) {
            return document.getElementById(id);
        }

        var map = new BMap.Map("allmap");
        var point = new BMap.Point(102.49395377099094, 24.331552333311514);
        map.centerAndZoom(point, 15);
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


    }
);


$('#selectBtn').click(function () {

    function G(id) {
        return document.getElementById(id);
    }

    var map = new BMap.Map("allmap");
    var point = new BMap.Point(114.59136534274533, 30.884559278604662);
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
    var selectArea = $("#area option:selected").text();
    var scene = $("#scenario option:selected").text();
    var selectmap = $("#mapchoosed option:selected").text();
    var mypath = {
        "runSpider": hostName + 'runspider?prov=' + selectProvince + '&city=' + selectCity + '&scene=' + scene + '&source=' + selectmap
        ,
        "getpoisonrunning": hostName + 'get_pois_on_running?prov=' + selectProvince + '&city=' + selectCity + '&scene=' + scene
        ,
        "getgridonrunning": hostName + 'get_grid_on_running?prov=' + selectProvince + '&city=' + selectCity + '&scene=' + scene
        ,
        "getgridhadrun": hostName + 'get_grids_had_run?prov=' + selectProvince + '&city=' + selectCity + '&scene=' + scene
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
            fillColor: "green"
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
            backgroundColor: '#FFFAFA',
            xAxis: {
                type: 'category',
                // data: prov_name,
                data: ['1','2'],
                axisLine: {
                    lineStyle: {
                        color: '#008B8B'
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#008B8B'
                    }
                },
            },
            series: [{
                name: 'poi量',
                data: pois_count,
                type: 'bar', //type: 'line',
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: '#00FFFB'
                    },
                },
            },
                {
                    name: 'poi边框量',
                    // data: pois_count2,
                    data: ['1','2'],
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#FF7474'
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
            backgroundColor: '#FFFAFA',
            xAxis: {
                type: 'category',
                data: prov_name,
                axisLine: {
                    lineStyle: {
                        color: '#008B8B'
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#008B8B'
                    }
                },
            },
            series: [{
                name: 'grid完成量',
                data: pois_count,
                type: 'bar', //type: 'line',
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: '#5D5D5D'
                    },
                },
            },
                {
                    name: 'grid总量',
                    data: pois_count2,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#FF00FF'
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

            add_bud_2_map(data[i].boundary);

        }
        //console.log(data);
    }, function (data) {
    });


})


;