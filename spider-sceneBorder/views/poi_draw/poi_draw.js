//var map = new BMap.Map("allmap");
//map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
//map.enableScrollWheelZoom();
//
//var polyline = new BMap.Polyline([
//	new BMap.Point(116.399, 39.910),
//	new BMap.Point(116.405, 39.920),
//	new BMap.Point(116.423493, 39.907445)
//], {
//	strokeColor: "blue",
//	strokeWeight: 2,
//	strokeOpacity: 0.5
//}); //创建折线
//map.addOverlay(polyline); //增加折线
//
//var polygon = new BMap.Polygon([
//	new BMap.Point(116.387112, 39.920977),
//	new BMap.Point(116.385243, 39.913063),
//	new BMap.Point(116.394226, 39.917988),
//	new BMap.Point(116.401772, 39.921364),
//	new BMap.Point(116.41248, 39.927893)
//], {
//	strokeColor: "blue",
//	strokeWeight: 2,
//	strokeOpacity: 0.5
//}); //创建多边形
//map.addOverlay(polygon); //增加多边形
var longitude = new Array();
var latitude = new Array();
var azimuth = new Array();
var ciHeight = new Array();
var downward = new Array();
var ciName = new Array();
var ci = new Array();
var point;
var selelctCellid;
var MarkerOptions;
var level;
//创建地图
var map = new BMap.Map("allmap", {
	minZoom: 12,
	maxZoom: 21
});

map.centerAndZoom(new BMap.Point(113.013653, 28.220242), 17); // 设置中心点

map.setCurrentCity("长沙");
var bounds = map.getBounds();
var bsSouthWest = bounds.getSouthWest(); //可视区域左下角
var bsNorthEast = bounds.getNorthEast(); //可视区域右上角
var ss = db09tows84(bsSouthWest.lng, bsSouthWest.lat);
var ss2 = db09tows84(bsNorthEast.lng, bsNorthEast.lat);
var minLng = ss[0];
var maxLng = ss2[0];
var minLat = ss[1];
var maxLat = ss2[1];

$.ajax({

	type: 'POST',  //请求方式
	url: "http://localhost:8000/CellQuery/findCityCiNum",  //接口地址
	data: "",  //参数
	success: function(data) {   //获取到数据之后的方法
		alert(data[0].CITY);

	},
	error:function(data){
		
	}

});

