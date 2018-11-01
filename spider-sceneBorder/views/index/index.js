var map = new BMap.Map("indexMap");
var point = new BMap.Point(102.493, 24.3315);
map.centerAndZoom(point, 15);

$(document).ready(function() {
	//POI完整度
	getApi(path.getPoiIntegrityRate, null, function(data) {
		console.log(data);
		var city = [];
		var count= [];
		var data = JSON.parse(data);
		for(var i = 0; i < data.length; i++) {
			city[i] = data[i].prov_name;
			count[i] = data[i].integrity_rate;
			draw_chart1(city, count);    //省级数据采集完整率
		}
	}, function(data) {});
	
	//获取POI点数量
	getApi(path.getPoisSummary, null, function(data) {
		console.log(data);
		var prov_name = [];
		var pois_count = [];
		var data = JSON.parse(data);
		for(var i = 0; i < data.length; i++) {
			prov_name[i] = data[i].prov_name;
			pois_count[i] = data[i].pois_count;
			draw_chart2(prov_name, pois_count);  //省级已采集POI信息总数量
		}
	}, function(data) {});
	
	//获取POI场景学校等
	getApi(path.getPoiSceneSummary, null, function(data) {
		console.log(data);
		var scene_name = [];
		var pois_count = [];
		var data = JSON.parse(data);
		for(var i = 0; i < data.length; i++) {
			scene_name[i] = data[i].scene_name;
			pois_count[i] = data[i].pois_count;
			draw_chart3(scene_name, pois_count);  //系统已采集场景级POI数量分布
		}
	}, function(data) {});
	
	//poi场景省份
	getApi(path.getPoiProvSceneNum, null, function(data) {
		console.log(data);
		var scene_count = [];
		var prov= [];
		var data = JSON.parse(data);
		for(var i = 0; i < data.length; i++) {
			prov[i] = data[i].prov_name;
			scene_count[i] = data[i].scene_count; 
			draw_chart4(prov, scene_count);  //省级已采集场景类型
			
		}
	}, function(data) {});
});

function draw_chart1(Xdata, yData) {
	getApi(path.getPoiSummary, null, function(data) {
		//		console.log('data'+data);
	}, function(data) {});
	var myCharts1 = echarts.init(document.getElementById('chart_1'));
	var option = {
		backgroundColor: '#fff',
		color: ['#3398DB'],
		grid: {
			top:"3%",
			left: '3%',
			right: '4%',
			bottom: '2%',
			containLabel: true
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
			formatter: "{b} <br> 完整率: {c}%"
		},
		xAxis: {
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#ddd',
				}
			}

		},
		yAxis: {
			type: 'category',
			data: Xdata,
			axisLine: {
				lineStyle: {
					color: '#ddd',
				}
			}
		},
		series: [{
			type: 'bar',
			barWidth: '60%', //柱图宽度
			itemStyle: {
				normal: {
					barBorderRadius: 10,
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
			data: yData
		}]
	};
	myCharts1.setOption(option);
};

function draw_chart2(prov_name, pois_count) {
	var myCharts2 = echarts.init(document.getElementById('chart_2'));
	var option = {
				grid: {
			top:"3%",
			left: '3%',
			right: '4%',
			bottom: '2%',
			containLabel: true
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			},
			formatter: "{b} <br> 省级已采集POI信息总数量：{c}"
		},
		backgroundColor: '#fff',
		xAxis: {
			type: 'category',
			data: prov_name,
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
			data: pois_count,
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

function draw_chart3(scene_name, pois_count) {
	var myCharts3 = echarts.init(document.getElementById('chart_3'));
	var option = {
		color: ['#3398DB'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
		top:"3%",
			left: '3%',
			right: '4%',
			bottom: '2%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: scene_name,
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
		}],
		yAxis: [{
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
		}],
		series: [{
			name: '场景级POI数量',
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
		}]
	};

	myCharts3.setOption(option);
}


function draw_chart4(prov,count) {
	var myCharts3 = echarts.init(document.getElementById('chart_4'));
	var
		option = {
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				top:"3%",
			left: '3%',
			right: '4%',
			bottom: '2%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: prov,
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
			}],
			yAxis: [{
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
			}],
			series: [{
				name: '已采集场景类型',
				type: 'bar',
				barWidth: '30%',
				data: count,
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
			}]
		};
	myCharts3.setOption(option);
}