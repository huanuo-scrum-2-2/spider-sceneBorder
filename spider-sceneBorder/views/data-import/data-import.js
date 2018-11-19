$(function() {
	$("#datepicker").datepicker();
});

$('#selectBtn').click(function() {
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