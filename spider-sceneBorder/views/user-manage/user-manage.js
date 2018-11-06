$(function () {
    getUserList();
})

function  getUserList() {
    getApi(path.getUserInfo, null, function(data) {
        data=JSON.parse(data);
        var html='';
        for(var i = 0; i < data.length; i++) {
            html += '<tr>';   //拼接表格
            html+='<td><input type="checkbox"/></td><td>' + data[i].user_id +
                '</td><td>' + data[i].user_name +
                '</td><td>' + data[i].role_priv_level +
                '</td><td>' + data[i].login_time +
                '</td><td>' + data[i].dept_name +
                '</td><td>' + data[i].owner_prov +
                '</td><td><button class="btn btn-primary" onclick="editUser('+data[i].user_id +
                ')" >编辑</button><button class="btn btn-primary" onclick="deleteUser('+data[i].user_id +
                ')" >删除</button>'

            ;
            html += '</tr>';
        }
        $('#userTable').html(html);
    }, function(data) {});
}

function  editUser(id) {
    $('#editModal').modal('show');


}

function deleteUser(id) {

}

function addUser() {
    $('#editModal').modal('show');
}