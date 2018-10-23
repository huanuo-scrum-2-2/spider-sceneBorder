var map = new BMap.Map("indexMap");
var point = new BMap.Point(102.493, 24.3315);
map.centerAndZoom(point, 15);

draw_chart1();
draw_chart2();
draw_chart3();
draw_chart4();
function draw_chart1() {
	var myCharts1 = echarts.init(document.getElementById('chart_1'));
	var option = {
		backgroundColor: '#fff',
		color: ['#3398DB'],
		grid: {            
			x: 55,
			y: 25,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
			formatter: "{b} <br> 合格率: {c}%"
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01],
			axisLine: {
				lineStyle: {
					color: '#ddd',
					width: 1, //这里是为了突出显示加上的
				}
			}

		},
		yAxis: {
			type: 'category',
			data: ['湖北省', '湖南省', '河南省', '安徽省', '浙江省', '山东省', '广东省'],
			axisLine: {
				lineStyle: {
					color: '#ddd',
					width: 1, //这里是为了突出显示加上的
				}
			}
		},
		series: [{
			type: 'bar',
			itemStyle: {
				normal: {
					barBorderRadius: 30,
					color: new echarts.graphic.LinearGradient(
						0, 0, 1, 0, [{
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
			label: {
				normal: {
					show: true,
					// formatter: '{c}',
					formatter: function(v) {
						var val = v.data;
						if(val == 0) {
							return '';
						}
						return val;
					},
					color: '#fff'
				}
			},
			data: [22, 33, 44, 55, 66, 77, 88]
		}]
	};
	myCharts1.setOption(option);
};

function draw_chart2() {
	var myCharts2 = echarts.init(document.getElementById('chart_2'));
	var option = {
		grid: {            
			x: 55,
			y: 25,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
			formatter: "{b} <br> {c}"
		},
		backgroundColor: '#fff',
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
		},
		yAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
		},
		series: [{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
			itemStyle: {
				normal: {
					color: "#16D9F0"
				},
			},
		}]
	};
	myCharts2.setOption(option);
}

function draw_chart3() {
	var data = [{
		"name": "0917",
		"value": 56
	}, {
		"name": "0918",
		"value": 33
	}, {
		"name": "0919",
		"value": 53
	}, {
		"name": "0920",
		"value": 47
	}, {
		"name": "0831",
		"value": 40
	}, {
		"name": "0832",
		"value": 66
	}, {
		"name": "0833",
		"value": 51
	}];
	var xData = [],
		yData = [];
	data.map(function(a, b) {
		xData.push(a.name);
		if(a.value === 0) {
			yData.push(a.value + min);
		} else {
			yData.push(a.value);
		}
		// yData.push((Math.random(0,1) * 100).toFixed(0));
	});
	var myCharts3 = echarts.init(document.getElementById('chart_3'));
	var option = {
		grid: {            
			x: 55,
			y: 25,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
			formatter: "{b}:{c}"
		},
		xAxis: [{
			type: 'category',
			data: xData,
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
		}],
		yAxis: [{
				type: 'value',
				splitLine: {
					show: true,
					width: 0.5
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
			{
				type: 'value',
				splitLine: {
					show: true
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: false
				},
			}
		],
		series: [{
				name: '合格率',
				type: 'bar',
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
				data: yData

			},
			{
				name: '背景',
				type: 'bar',
				data: [100, 100, 100, 100, 100, 100, 100],
				itemStyle: {
					normal: {
						color: 'rgba(255,255,255,0.1)'
					}
				},
			},

		]
	};
	myCharts3.setOption(option);
}

function draw_chart4() {
	var data = [{
		"name": "0917",
		"value": 56
	}, {
		"name": "0918",
		"value": 33
	}, {
		"name": "0919",
		"value": 53
	}, {
		"name": "0920",
		"value": 47
	}, {
		"name": "0831",
		"value": 40
	}, {
		"name": "0832",
		"value": 66
	}, {
		"name": "0833",
		"value": 51
	}];
	var xData = [],
		yData = [];
	data.map(function(a, b) {
		xData.push(a.name);
		if(a.value === 0) {
			yData.push(a.value + min);
		} else {
			yData.push(a.value);
		}
		// yData.push((Math.random(0,1) * 100).toFixed(0));
	});
	var myCharts3 = echarts.init(document.getElementById('chart_4'));
	var option = {
		grid: {            
			x: 55,
			y: 25,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
			formatter: "{b}:{c}"
		},
		xAxis: [{
			type: 'category',
			data: xData,
			axisLine: {
				lineStyle: {
					color: '#ddd'
				}
			},
		}],
		yAxis: [{
				type: 'value',
				splitLine: {
					show: true,
					width: 0.5
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
			{
				type: 'value',
				splitLine: {
					show: true
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: false
				},
			}
		],
		series: [{
				name: '合格率',
				type: 'bar',
				itemStyle: {
					normal: {
						barBorderRadius: [20, 20, 0, 0],
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0,
									color: '#FEDEAB'
								},
								{
									offset: 0.3,
									color: '#FFB296'
								},
								{
									offset: 0.7,
									color: '#FC7F79'
								}
							]
						)
					}
				},
				data: yData

			},
			{
				name: '背景',
				type: 'bar',
				data: [100, 100, 100, 100, 100, 100, 100],
				itemStyle: {
					normal: {
						color: 'rgba(255,255,255,0.1)'
					}
				},
			},

		]
	};
	myCharts3.setOption(option);
}