var hostName = "http://sceneborder.imwork.net/"; //接口公共的ip或者域名
//path里定义了所有的接口 
var path = {
	//登录
	"login": hostName + "equipment/count",
	//首页左上角图表数据
	//poi完整度
	"getPoiIntegrityRate": hostName + 'get_poi_integrity_rate',
	//Poi点数量
	"getPoisSummary": hostName + 'get_pois_summary',
	//
	"getPoiSceneSummary": hostName + 'get_poi_scene_summary',
	//poi场景
	"getPoiProvSceneNum": hostName + 'get_poi_prov_scene_num'
}

var getApi = function(url, data, success, error) {
	var option = {
		method: 'get',
		url: url,
		async: 'false',
		contentType: "application/json; charset=UTF-8",
		data: data,
		success: success,
		error: error
	};
	$.ajax(option);
};
var putApi = function(url, data, success, error) {
	var option = {
		method: 'put',
		url: url,
		async: 'false',
		data: JSON.stringify(data),
		contentType: "application/json; charset=UTF-8",
		dataType: 'json',
		success: success,
		error: error
	};
	$.ajax(option);
};
var postApi = function(url, data, success, error) {
	var option = {
		method: 'post',
		url: url,
		async: 'false',
		data: JSON.stringify(data),
		contentType: "application/json; charset=UTF-8",
		dataType: 'json',
		success: success,
		error: error
	};
	$.ajax(option);
};
var jsonpPostApi = function(url, data, success, error) {
	var option = {
		method: 'post',
		url: url,
		async: 'false',
		data: data,
		dataType: "jsonp",
		success: success,
		error: error
	};
	$.ajax(option);
};
var jsonpGetApi = function(url, data, success, error) {
	var option = {
		type: 'get',
		url: url,
		async: 'false',
		data: data,
		dataType: "jsonp",
		success: success,
		error: error
	};
	$.ajax(option);
};