// var map = new BMap.Map("indexMap");
// var point = new BMap.Point(102.493, 24.3315);
// map.centerAndZoom(point, 15);

$(document).ready(function() {

    //POI完整度
    getApi(path.getPoiAllCitys, null, function(data) {
        console.log(data);
        var valueData = [];
        var geoCoordMap= {};
        var data = JSON.parse(data);
        for(var i = 0; i < data.length; i++) {
            var obj1 = {};
            var str=data[i].city_name;
            str = str.substring(0,str.length-1);
            obj1.name = str;
            obj1.value = data[i].pois_num;
            valueData.push(obj1);
            var value=[data[i].lon,data[i].lat]
            geoCoordMap[str]=value;
        }
        getMap(valueData,geoCoordMap);
    }, function(data) {});

    //POI完整度
	getApi(path.getPoiIntegrityRate, null, function(data) {
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

function  getMap(data,geoCoordMap) {
    // var data = [
    //     {name: '海门', value: 9},
    //     {name: '鄂尔多斯', value: 12},
    //     {name: '招远', value: 12},
    //     {name: '舟山', value: 12},
    //     {name: '齐齐哈尔', value: 14},
    //     {name: '盐城', value: 15},
    //     {name: '赤峰', value: 16},
    //     {name: '青岛', value: 18},
    //     {name: '乳山', value: 18},
    //     {name: '金昌', value: 19},
    //     {name: '泉州', value: 21},
    //     {name: '莱西', value: 21},
    //     {name: '日照', value: 21},
    //     {name: '胶南', value: 22},
    //     {name: '南通', value: 23},
    //     {name: '拉萨', value: 24},
    //     {name: '云浮', value: 24},
    //     {name: '梅州', value: 25},
    //     {name: '文登', value: 25},
    //     {name: '上海', value: 25},
    //     {name: '攀枝花', value: 25},
    //     {name: '威海', value: 25},
    //     {name: '承德', value: 25},
    //     {name: '厦门', value: 26},
    //     {name: '汕尾', value: 26},
    //     {name: '潮州', value: 26},
    //     {name: '丹东', value: 27},
    //     {name: '太仓', value: 27},
    //     {name: '曲靖', value: 27},
    //     {name: '烟台', value: 28},
    //     {name: '福州', value: 29},
    //     {name: '瓦房店', value: 30},
    //     {name: '即墨', value: 30},
    //     {name: '抚顺', value: 31},
    //     {name: '玉溪', value: 31},
    //     {name: '张家口', value: 31},
    //     {name: '阳泉', value: 31},
    //     {name: '莱州', value: 32},
    //     {name: '湖州', value: 32},
    //     {name: '汕头', value: 32},
    //     {name: '昆山', value: 33},
    //     {name: '宁波', value: 33},
    //     {name: '湛江', value: 33},
    //     {name: '揭阳', value: 34},
    //     {name: '荣成', value: 34},
    //     {name: '连云港', value: 35},
    //     {name: '葫芦岛', value: 35},
    //     {name: '常熟', value: 36},
    //     {name: '东莞', value: 36},
    //     {name: '河源', value: 36},
    //     {name: '淮安', value: 36},
    //     {name: '泰州', value: 36},
    //     {name: '南宁', value: 37},
    //     {name: '营口', value: 37},
    //     {name: '惠州', value: 37},
    //     {name: '江阴', value: 37},
    //     {name: '蓬莱', value: 37},
    //     {name: '韶关', value: 38},
    //     {name: '嘉峪关', value: 38},
    //     {name: '广州', value: 38},
    //     {name: '延安', value: 38},
    //     {name: '太原', value: 39},
    //     {name: '清远', value: 39},
    //     {name: '中山', value: 39},
    //     {name: '昆明', value: 39},
    //     {name: '寿光', value: 40},
    //     {name: '盘锦', value: 40},
    //     {name: '长治', value: 41},
    //     {name: '深圳', value: 41},
    //     {name: '珠海', value: 42},
    //     {name: '宿迁', value: 43},
    //     {name: '咸阳', value: 43},
    //     {name: '铜川', value: 44},
    //     {name: '平度', value: 44},
    //     {name: '佛山', value: 44},
    //     {name: '海口', value: 44},
    //     {name: '江门', value: 45},
    //     {name: '章丘', value: 45},
    //     {name: '肇庆', value: 46},
    //     {name: '大连', value: 47},
    //     {name: '临汾', value: 47},
    //     {name: '吴江', value: 47},
    //     {name: '合肥', value: 229},
    //     {name: '武汉', value: 273},
    //     {name: '大庆', value: 279}
    // ];
    // var geoCoordMap = {
    //     '海门':[121.15,31.89],
    //     '鄂尔多斯':[109.781327,39.608266],
    //     '招远':[120.38,37.35],
    //     '舟山':[122.207216,29.985295],
    //     '齐齐哈尔':[123.97,47.33],
    //     '盐城':[120.13,33.38],
    //     '赤峰':[118.87,42.28],
    //     '青岛':[120.33,36.07],
    //     '乳山':[121.52,36.89],
    //     '金昌':[102.188043,38.520089],
    //     '泉州':[118.58,24.93],
    //     '莱西':[120.53,36.86],
    //     '日照':[119.46,35.42],
    //     '胶南':[119.97,35.88],
    //     '南通':[121.05,32.08],
    //     '拉萨':[91.11,29.97],
    //     '云浮':[112.02,22.93],
    //     '梅州':[116.1,24.55],
    //     '文登':[122.05,37.2],
    //     '上海':[121.48,31.22],
    //     '攀枝花':[101.718637,26.582347],
    //     '威海':[122.1,37.5],
    //     '承德':[117.93,40.97],
    //     '厦门':[118.1,24.46],
    //     '汕尾':[115.375279,22.786211],
    //     '潮州':[116.63,23.68],
    //     '丹东':[124.37,40.13],
    //     '太仓':[121.1,31.45],
    //     '曲靖':[103.79,25.51],
    //     '烟台':[121.39,37.52],
    //     '福州':[119.3,26.08],
    //     '瓦房店':[121.979603,39.627114],
    //     '即墨':[120.45,36.38],
    //     '抚顺':[123.97,41.97],
    //     '玉溪':[102.52,24.35],
    //     '张家口':[114.87,40.82],
    //     '阳泉':[113.57,37.85],
    //     '莱州':[119.942327,37.177017],
    //     '湖州':[120.1,30.86],
    //     '汕头':[116.69,23.39],
    //     '昆山':[120.95,31.39],
    //     '宁波':[121.56,29.86],
    //     '湛江':[110.359377,21.270708],
    //     '揭阳':[116.35,23.55],
    //     '荣成':[122.41,37.16],
    //     '连云港':[119.16,34.59],
    //     '葫芦岛':[120.836932,40.711052],
    //     '常熟':[120.74,31.64],
    //     '东莞':[113.75,23.04],
    //     '河源':[114.68,23.73],
    //     '淮安':[119.15,33.5],
    //     '泰州':[119.9,32.49],
    //     '南宁':[108.33,22.84],
    //     '营口':[122.18,40.65],
    //     '惠州':[114.4,23.09],
    //     '江阴':[120.26,31.91],
    //     '蓬莱':[120.75,37.8],
    //     '韶关':[113.62,24.84],
    //     '嘉峪关':[98.289152,39.77313],
    //     '广州':[113.23,23.16],
    //     '延安':[109.47,36.6],
    //     '太原':[112.53,37.87],
    //     '兰州':[103.73,36.03],
    //     '沧州':[116.83,38.33],
    //     '临沂':[118.35,35.05],
    //     '南充':[106.110698,30.837793],
    //     '天津':[117.2,39.13],
    //     '富阳':[119.95,30.07],
    //     '泰安':[117.13,36.18],
    //     '诸暨':[120.23,29.71],
    //     '郑州':[113.65,34.76],
    //     '哈尔滨':[126.63,45.75],
    //     '聊城':[115.97,36.45],
    //     '芜湖':[118.38,31.33],
    //     '唐山':[118.02,39.63],
    //     '平顶山':[113.29,33.75],
    //     '邢台':[114.48,37.05],
    //     '德州':[116.29,37.45],
    //     '济宁':[116.59,35.38],
    //     '荆州':[112.239741,30.335165],
    //     '宜昌':[111.3,30.7],
    //     '大庆':[125.03,46.58]
    // };
    var myCharts3 = echarts.init(document.getElementById('indexMap'));
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    var option = {
        tooltip : {
            trigger: 'item'
        },
        bmap: {
            center: [112.967000, 28.197000],
            zoom: 5,
            roam: true,
            mapStyle: {
                styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#999999'
                    }
                }]
            }
        },
        series : [
            {
                name: '数量',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: convertData(data),
                // symbolSize: function (val) {
                //     return val[2] / 1000;
                // },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#6BBFFD'
                    }
                }
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6)),
                // symbolSize: function (val) {
                //     return val[2] / 1000;
                // },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#6BBFFD',
                        shadowBlur: 10,
                        shadowColor: '#FFAA91'
                    }
                },
                zlevel: 1
            }
        ]
    };
    myCharts3.setOption(option);
}