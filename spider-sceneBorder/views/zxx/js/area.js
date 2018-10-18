
  $(document).ready(function() {
  	
  		
       $("#fra").on("load",function(){
//加载完成，需要执行的代码
					data = {};
					sqlData();
					});
       
       $("#resetbutton").click(function(){
				$('form')[0].reset()  //重置表单数据
					data = {};
					sqlData();
					});
      
      
       $("#selectbut").click(function(){
      
			  data = {
				"nameinput":$("#nameinput").val(),
				"addrinput": $("#addrinput").val(),
        "loninput": $("#loninput").val(),
        "latinput": $("#latinput").val(),
        "typeinput": $("#typeinput").val()
		   }

				sqlData();
			});
			
				$('#exportbut').click(function(){ 	
			  	//document.parentWindow.parent.document.getElementById("cityinput")[0].value
			    data = {
				  "addrinput":$('#addrinput', parent.document).val(),
				  "nameinput":$('#nameinput', parent.document).val(),
				  "loninput":$('#loninput', parent.document).val(),
				  "latinput":$('#latinput', parent.document).val(),
				  "typeinput":$('#typeinput', parent.document).val(),
				  //"sysdate":new Date()
				  //如果能获取到#exportinput的值，则执行导出
				  "exportinput":$('#exportinput', parent.document).val()
					}
			    
				  file();
				  
			});
      
      
		});	
		
		function file(){
        $.ajax({

            type: 'post', 

            url: 'http://127.0.0.1:5000/test',
            
            async: false,
            crossDomain: true,
            dataType:'text',
						data:data,
            success:function(tt)
            {
            	console.log("---"+tt)
							alert("导出成功，文件路径："+tt)
             
            } ,
            
            error: function() {console.log('wrong')}

            });
    };
		
		function sqlData(){
        $.ajax({

            type: 'post', 

            url: 'http://127.0.0.1:5000/test',
            
            async: false,
            crossDomain: true,
            dataType:'text',
						data:data,
            success:function(tt)
            {
            	console.log("---"+tt)
							var tf = $("#fra").contents().find(".tableform");
							var tb =tf.children("tbody");
							
							

             //eval将字符串转成对象数组

             //var json =[{"id": "1", "name": "xing", "age": "22"}, {"id": "2", "name": "yuan", "age": "21"}];

             //json = eval(json);

             //alert("===json:id=" + json.id + ",uname=" + json.uname + ",email=" + json.email);

 

             var json = eval(tt); //数组
             if(tb.length>0) 
             	{tb.empty();}//删除之前的数据          
           // $('.tableform tr:gt(0)').remove();
                var s = '';
                for (var i = 0; i < json.length; i++) {s += '<tr><td>' + json[i].name + '</td><td>' + json[i].address + '</td><td>' + json[i].lon + '</td>'
                   + '<td>' + json[i].lat + '</td><td>' + json[i].std_tag+ '</td><td>' + json[i].provice+ '</td><td>' + json[i].city+ '</td><td>' + json[i].district+ '</td><td>' + json[i].boundary
                   + '</td><td>'+ json[i].flag+'</td></tr>'
                   console.log(json[i].name)
                   console.log(json[i].city)
                   console.log(json[i].address)};//将数据库中的数据显示在表格中
               sbody = '<tbody>'+s+'</tbody>'
               tf.append(sbody);
               //$(".tableform").append(s)
              
               
               console.log("area-success")
            } ,
            
            error: function() {console.log('wrong')}

            });
    };
  
 
   
   
        var shenArr = new Array(); //声明数组
        shenArr["广东"] = ["广州","深圳","珠海","汕头"];
        shenArr["湖南"] = ["长沙","株洲","张家界","邵阳"];
        shenArr["湖北"] = ["武汉","宜昌","荆州","仙桃"];
        shenArr["安徽"] = ["合肥","黄山"];
        shenArr["河南"] = ["郑州","洛阳"];
 
        function getPro() {
            var s = document.getElementById("province_select");
            for(var v in shenArr) {
                //document.write(arr[v] + "<br/>");
                s.add(new Option(v,v),null);//把数组键加入到省的下拉框中
            }
        };
 
        function getCity(){
            var s = document.getElementById("province_select"); //省下拉框
            var c = document.getElementById("city_select"); // 市下拉框
            var v = s.value; //省市名称，也是数组中的键
 
            c.options.length=0;//清除当前city中的选项
            //循环把某一个省的城市加入到市的下拉框
            for(var i in shenArr[v]){
                c.add(new Option(shenArr[v][i]),null);
            }
        };
        
    

        //$(document).ready(function(){
        //	$("#selectbut").click(function(){
        		
        //	})
       // })
       