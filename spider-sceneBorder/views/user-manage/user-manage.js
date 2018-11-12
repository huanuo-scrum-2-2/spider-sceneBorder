$(function () {
    getUserList();
})

function getUserList() {
    getApi(path.getUserInfo, null, function (data) {
        data = JSON.parse(data);
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += '<tr>';   //拼接表格
            html += '<td><input type="checkbox"/></td><td>' + data[i].user_id +
                '</td><td>' + data[i].user_name +
                '</td><td>' + data[i].role_priv_level +
                '</td><td>' + data[i].login_time +
                '</td><td>' + data[i].dept_name +
                '</td><td>' + data[i].owner_prov +
                '</td><td><button class="btn btn-primary" onclick="editUser(' + data[i].user_id +
                ')" >编辑</button><button class="btn btn-primary" onclick="deleteUser(' + data[i].user_id +
                ')" >删除</button>';
            html += '</tr>';
        }
        $('#userTable').html(html);
    }, function (data) {
    });
}

function editUser(id) {
    $('#editModal').modal('show');
    var param = {  //update_user_info
        user_id: user_id,
        show_name: show_name,
        user_name: user_name,
        user_passwd: user_passwd,
        role: role,
        owner_prov: owner_prov,
        owner_city: owner_city,
        owner_mail: owner_mail,
        owner_phone: owner_phone
    }

}

function deleteUser(id) {
    var flag = confirm("确定要删除选中的记录吗?");
    if (flag) {
        var param={user_id:id};
        getApi(path.deleteUser, param, function () {
            location.reload();
        }, function (data) {
        });
    } else {
        alert("已取消操作");
    }
}

function addUser() {
    $('#editModal').modal('show');
}