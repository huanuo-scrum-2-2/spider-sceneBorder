function check_login() {
    var user_name = document.getElementById('user_name').value;
    var user_pswd = document.getElementById('user_pswd').value;
    if (user_name != "" && user_pswd != "") {
        //请求input信息
        var loginParam = {
            "vuser": user_name,
            "vpasswd": user_pswd
        };
        $.ajax({
            type: 'GET',
            url: path.login,
            data: loginParam,
            contentType: "application/json; charset=UTF-8",
            success: function (data) {
                console.log(user_name);
                if (data.status == "true") {
                    sessionStorage.removeItem('role');
                    sessionStorage.setItem('user_role', data.role); // 将当前登录用户信息存入sessionStorage
                    sessionStorage.removeItem('showName');
                    sessionStorage.setItem('showName', data.show_name); // 将当前登录用户信息存入sessionStorage
                    sessionStorage.removeItem('user_id');
                    sessionStorage.setItem('user_id', data.user_id); // 将当前登录用户信息存入sessionStorage
                    window.location.href = '../main/main.html';  //页面跳转
                } else {
                    alert(data.info);
                }
            },
            dataType: 'json'
        });
    } else {
        alert('请输入完整的用户名和密码');
    }
    // return false;
};
