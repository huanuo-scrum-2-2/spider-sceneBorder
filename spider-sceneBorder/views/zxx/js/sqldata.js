 $(document).ready(function() {
      // $("#selectbut").submit(function(){
       	//	alert($("#cityinput").val());
       	//	alert($("#nameinput").val());
			
        $.ajax({

            type: 'post', 

            url: 'http://127.0.0.1:5000/test',
            
            async: false,
            crossDomain: true,
            dataType:'text',
			data:{},
            success:function(tt)
            {
            	console.log("---"+tt)
            
				
			

  

             //eval将字符串转成对象数组

             //var json =[{"id": "1", "name": "xing", "age": "22"}, {"id": "2", "name": "yuan", "age": "21"}];

             //json = eval(json);

             //alert("===json:id=" + json.id + ",uname=" + json.uname + ",email=" + json.email);

 

             	var json = eval(tt); //数组

            	$('.tableform tr:gt(0)').remove();//删除之前的数据
                var s = '';
                for (var i = 0; i < json.length; i++) {s += '<tr><td>' + json[i].name + '</td><td>' + json[i].city + '</td><td>' + json[i].district + '</td>'
                   + '<td>' + json[i].address + '</td><td>' + json[i].location+ '</td><td>'+json[i].bd09mc+'</td></tr>'
                   console.log(json[i].name)
                   console.log(json[i].city)
                   console.log(json[i].address)};//将数据库中的数据显示在表格中
				alert($('.tableform'))
                $('.tableform').append(s);
              	alert($("table").hasClass('tableform'));
             console.log("sqldata-success")

            } ,
            
            error: function() {console.log('wrong')}

            })
    //})
    });
