var hostName = "http://sceneborder.imwork.net/"; //接口公共的ip或者域名
//path里定义了所有的接口
var path = {
    //登录
    "login": hostName + 'user_login_check',
//获取在线用户数
    "getOnlineUserCount":hostName + 'get_online_user_count',
    //退出
    "userLogout":hostName + 'user_logout',
    //用户管理模块
    //获取所有用户列表
    "getUserInfo": hostName + 'get_user_info',
    "userLoginCheck": hostName + 'user_login_check',
    //编辑用户信息
    "updateUserInfo": hostName + 'update_user_info',
    //得到单个用户的信息
    "getUserByid": hostName + 'get_user_byid',
    //新增用户
    "addUserAcount": hostName + 'add_user_acount',
    //删除用户
    "deleteUser": hostName + 'delete_user',
    //导出
    "download": hostName + 'download',
    //首页图表数据
    //poi完整度
    "getPoiIntegrityRate": hostName + 'get_poi_integrity_rate',
    //Poi点数量
    "getPoisSummary": hostName + 'get_pois_summary',
    //
    "getPoiSceneSummary": hostName + 'get_poi_scene_summary',
    //poi场景
    "getPoiProvSceneNum": hostName + 'get_poi_prov_scene_num',
    //首页地图数据
    "getPoiAllCitys": hostName + 'get_poi_all_citys'
}

var getApi = function (url, data, success, error) {
    var option = {
        beforeSend: function() {
            var showName = sessionStorage.getItem('showName');
            if(!showName) {
                window.location.href = '../login/login.html';
            }
        },
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
var putApi = function (url, data, success, error) {
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
var postApi = function (url, data, success, error) {
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
var jsonpPostApi = function (url, data, success, error) {
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
var jsonpGetApi = function (url, data, success, error) {
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
