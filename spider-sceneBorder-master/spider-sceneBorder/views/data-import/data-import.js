var pageid;
var pagenum;


$('#select_1Btn').click(function() {
	var selectDate = $("input[name='choose-date']:checked").val(); //获取选中的时间段
	console.log(selectDate);
	var selectDay=$("#datepicker").val(); //获取选中的具体日期
	var selectProvince=$("#province").val();
	var selectCity=$("#city").val();
	var selectArea=$("#area").val();
	var selectType=$("#select_type").val(); //获取选中的具体日期
	var selectLat=$("#select_lat").val();
	var selectLon=$("#select_lon").val();
});

$('#exportBnt').click(function(){
		
		var prov=$("#province").val();
		var city=$("#city").val();
		var scene=$("#select_type").val();
		if ($("#province").val()=='' || $("#province").val()=='1'||city==''||scene==''){
			//alert('no empty');
			
			$(".data_table").html('<span style="color:#F00">请选择地域、城市和类型信息</span>');

			return -1;
		}
		
		//prov="湖南省";
		//city="长沙盘";
		//scene='楼盘';
		//alert(prov+city+scene);
		s_url="http://sceneborder.imwork.net/download?prov="+prov+"&city="+city+"&scene="+scene
		//alert(s_url);
		//window.location.href="http://sceneborder.imwork.net/download?prov=湖南省&&city=长沙市&&scene=楼盘"
		window.location.href=s_url;
	
});

function load(page){
        var data={
		"prov":$("#province").val(),
		"city":$("#city").val(),
		"county":$("#area").val(),
		"scene":$("#select_type").val(),
        "page":page,
		"name":$("#select_name").val(),
		"addr":$("#select_address").val(),
		"lonrng":$("#select_lon").val(),
		"latrng":$("#select_lat").val()};
        	console.log(data.prov+data.city+data.county+data.scene);
		if ($("#province").val()=='' || $("#province").val()=='1'||city==''||data.county==''||data.scene==''){
			//alert('no empty');
			
			$(".data_table").html('<span style="color:#F00">请选择地域、城市、区域和类型信息</span>');

			return -1;
		}
    $.ajax({
        async:false,
		type:"GET",
		url:"http://sceneborder.imwork.net/querypoi2view",
		data:data,
		datatype:'jsonp',
		crossDomain: true,
		success:function(result){
			$(".data_table").empty();
            //$('#data_table').empty();
            result1=JSON.parse(result);
            //result1=result;
            pageid=result1.pageid;
            pagenum=result1.pagenum;
            if( result1.data.length>0) {
                $(".data_table").append('<tr style="background: #eff0f4;">' +
                '<tr style="background: #eff0f4;">' +
                //'<th><input type="checkbox"> </th>' +
                    //'	<th>日期</th>'+
                '	<th>省份</th>' +
                '	<th>地市</th>' +
                '	<th>地区</th>' +
                '	<th>详细地址</th>' +
                '	<th>名称</th>' +
                '	<th>场景</th>' +
                '	<th>经度</th>' +
                '	<th>纬度</th>' +
                '	<th>边框</th>' +
                '</tr>');
                $.each(result1.data, function (i, value){
                    value=result1.data[i];
                    if (value.guoke_wgs84==null) {wgs84='--';}
                    else {wgs84=value.guoke_wgs84;}
                    tr = '<tr>'+
                    //'<tr><td><input type="checkbox" ></td>' +
                    '<td width="50">' + value.prov_name + '</td>' +
                    '<td width="50">' + value.city_name + '</td>' +
                    '<td width="50">' + value.county_name + '</td>' +
                    '<td width="350">' + value.addr + '</td>' +
                    '<td width="200">' + value.name + '</td>' +
                    '<td width="50">' + value.scene_name + '</td>' +
                    '<td width="120">' + value.x + '</td>' +
                    '<td width="120">' + value.y + '</td>' +
                    '<td >' + value.guoke_wgs84 + '</td></tr>';
                    $(".data_table").append(tr);
                });
                //$(".data_table").append('</table>');
            } else $(".data_table").append('no data');

		}
	});//ajax

    };  //function load

function loadpage() {
        var s = '';
        var pagemax = 1;
        var pagemin = 1;

        //s += "共" + pagenum + "页 当前" + pageid +"/"+pagenum+ "页  ";
        s += "当前" + pageid +"/"+pagenum+ "页  ";
        if (pageid>1) {
            s+="<span id='first' style='color:#00;'><a>首页</a></span><span id='pre' style='color:#00f'><a>上一页</a></span>";
            }
        else {
            s+='<span> 首页</span><span> 上一页</span>';
        }
        var mmm=pageid-4;
        var ppp=parseInt(pageid)+5;
        for (var i=mmm;i<ppp;i++){
            if (i>=pagemin && i<=pagenum){
                if(i==pageid){
                    s+="<span class='active list' style='color:#F00;font-family: MicrosoftYaHei'>"+i+"</span> ";
                }
                else{
                    s += "<span class='list' style='color:#00f'><a>"+i+"</a></span> ";
                }
            }

        }
        if (pageid<pagenum){
             s+="<span id='next' style='color:#00f'>下一页</span><span id='last' style='color:#00f'>末页</span>";
        }
        else{
             s+='<span> 下一页</span><span> 末页</span>';
        }
        console.log(s);

        $('#page').html(s);


    $('#pre').click(function(){
        pageid=parseInt(pageid)-1;
        load(pageid);
        loadpage();
    });
    $('#next').click(function(){
        //alert('next');
        pageid=parseInt(pageid)+1;
        load(pageid);
        loadpage();
    });
    $('#first').click(function(){
        pageid=1;
        load(pageid);
        loadpage();
    });
    $('#last').click(function(){
        pageid=pagenum;
        load(pageid);
        loadpage();
    })

        $('.list').click(function(){
        pageid=$(this).text();
        //    alert(pageid+ 'class');
        load(pageid);
        loadpage();
    });
    }




$('#selectBtn').click(function(){
        //alert('query');
        if (load(1)!=-1){loadpage();}
        
});


$('#resetBtn').click(function(){
        //alert('query');       
        document.getElementById("province").value=1;    
        document.getElementById("city").options.length=0;    
        document.getElementById("area").options.length=0;
        document.getElementById("select_address").value="";
        document.getElementById("select_type").value='';
        document.getElementById("select_name").value='';
        document.getElementById("datepicker").value='';
        document.getElementById("select_lat").value='';
        document.getElementById("select_lon").value='';
        document.getElementById("select_lon").value='';
        //document.getElementById("today").checked=false;
        //document.getElementById("yesterday").checked=false;
        //document.getElementById("aweek").checked=false;
        //document.getElementById("amonth").checked=false;
        
});