var edit_flag = true;
var user_id;

$(function () {
    getUserList();
})

//获取所有用户
function getUserList() {
    getApi(path.getUserInfo, null, function (userInfo) {
        data = JSON.parse(userInfo);
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += '<tr>';   //拼接表格
            html += '<td><input type="checkbox"/></td><td>' + data[i].user_id +
                '</td><td>' + data[i].user_name +
                '</td><td>' + data[i].show_name +
                '</td><td>' + data[i].role_priv_level +
                '</td><td>' + data[i].login_time +
                '</td><td>' + data[i].dept_name +
                '</td><td>' + data[i].owner_prov +
                '</td><td>' + data[i].owner_city +
                '</td><td>' + data[i].owner_mail +
                '</td><td>' + data[i].owner_phone +
                '</td><td>' + data[i].login_status +
                '</td><td><button class="btn btn-primary" onclick="editUser(' + data[i].user_id +
                ')" >编辑</button><button class="btn btn-primary" onclick="deleteUser(' + data[i].user_id +
                ')" >删除</button></td>';
            html += '</tr>';
        }
        $('#userTable').html(html);
    }, function (data) {
    });
}

//点击新增按钮弹出模态框
$("#addUser").on('click', function () {
    edit_flag = false;
    $("#editModal input").val(""); //清空输入框
    $("#editModal").modal("toggle");
})

//点击编辑弹出模态框  并将用户信息回显
function editUser(id) {
    edit_flag = true;
    $('#editModal').modal('show');
    user_id = id;
    var param = {
        user_id: user_id
    };
    getApi(path.getUserByid, param, function (userInfo) {
        data = JSON.parse(userInfo);
        $("#showname").val(data[0].show_name);
        $("#username").val(data[0].user_name);
        province = data[0].owner_prov;
        city = data[0].owner_city;
        document.getElementsByName("province")[0].value = province;
        document.getElementsByName("city")[0].value = city;
        $("#useremail").val(data[0].owner_mail);
        $("#userphone").val(data[0].owner_phone);
        $("input:radio").eq(data[0].role_priv_level).attr("checked", "true");
    }, function (data) {
    });
}

//新增或修改
function datasubmit() {
    var param;
    if (edit_flag) { //编辑
        param = {
            user_id: user_id,
            user_name: $('#username').val(),
            user_passwd: $('#userpsd').val(),
            show_name: $('#showname').val(),
            role: $("input[name='optionsRadiosinline']:checked").val(),
            owner_prov: $('#province').val(),
            owner_city: $('#city').val(),
            owner_mail: $('#useremail').val(),
            owner_phone: $('#userphone').val()
        }
        getApi(path.updateUserInfo, param, function (userInfo) {
            location.reload();
        }, function (data) {
        });
    } else {  //新增
        param = {
            user_name: $('#username').val(),
            user_passwd: $('#userpsd').val(),
            show_name: $('#showname').val(),
            owner_prov: $('#province').val(),
            owner_city: $('#city').val(),
            owner_mail: $('#useremail').val(),
            owner_phone: $('#userphone').val()
        };
        getApi(path.addUserAcount, param, function () {
            location.reload();
        }, function (data) {
        });
    }
    $("#editModal").modal("toggle");
    console.log(param);
}

//删除
function deleteUser(id) {
    var flag = confirm("确定要删除选中的记录吗?");
    if (flag) {
        var param = {user_id: id};
        getApi(path.deleteUser, param, function () {
            location.reload();
        }, function (data) {
        });
    } else {
        alert("已取消操作");
    }
}

