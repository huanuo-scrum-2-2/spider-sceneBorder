$(document).ready(function() {
	drawMap();
	getPieData();
	getLineData();
});

function drawMap(){
var map = new BMap.Map("allmap");
var point = new BMap.Point(102.493, 24.3315);
map.centerAndZoom(point, 15);

var pStart = new BMap.Point(102.54443599439445, 24.375266547671135);
var B036D0064C = new BMap.Polygon([
	new BMap.Point(102.54443599439445, 24.375266547671135),
	new BMap.Point(102.54981909101997, 24.374917927304026),
	new BMap.Point(102.55024105430854, 24.375200206946126),
	new BMap.Point(102.55283470997934, 24.373264510407623),
	new BMap.Point(102.54536056344197, 24.37444605744872),

], {
	strokeColor: "blue",
	strokeWeight: 2,
	strokeOpacity: 0.5
});

var B036D00XUR = new BMap.Polygon([
	new BMap.Point(102.493, 24.3315),
	new BMap.Point(102.4947156473546, 24.33290832995698),
	new BMap.Point(102.494264055253, 24.3323263350018),
	new BMap.Point(102.50037698495302, 24.325859108994347),
	new BMap.Point(102.49860568122948, 24.32595206648902),
	new BMap.Point(102.49395377099094, 24.331552333311514),
], {
	strokeColor: "blue",
	strokeWeight: 2,
	strokeOpacity: 0.5
});

map.addOverlay(B036D0064C);
map.addOverlay(B036D00XUR)

}
function getPieData() {
	var dom = document.getElementById("chart_pie");
	var myChart = echarts.init(dom);
   var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)",
                },

//              color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980'],
                series: [{
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            formatter: "{b}  {c} ",
                            fontSize: 12,
                            //	position: 'center'

                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                  
                    data: [
                {value:335, name:'景区'},
                {value:234, name:'学校'},
                {value:135, name:'道路'},
                {value:1548, name:'住宅'}
            ].sort(function(a, b) {
                        return b.value - a.value;
                    }),

                }]
            };
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

function getLineData(){
var base = +new Date(1968, 9, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [Math.random() * 300];

for (var i = 1; i < 20000; i++) {
    var now = new Date(base += oneDay);
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}
var dom = document.getElementById("chart_line");
var myChart = echarts.init(dom);
option = {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
   
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
    },
    dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
    }, {
        start: 0,
        end: 10,
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    }],
    series: [
        {
            name:'爬取频率',
            type:'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                normal: {
                    color: 'rgb(255, 70, 131)'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    }, {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }])
                }
            },
            data: data
        }
    ]
};
if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}