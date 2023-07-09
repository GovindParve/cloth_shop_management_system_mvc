
function successAlert(msg)
{
	var dialog = bootbox.dialog({
    message: '<p class="text-center">'+msg.fontcolor("green").fontsize(5)+'</p>',
    closeButton: false
   });
   setTimeout(function()
   {
	dialog.modal('hide');
	location.reload();
   }, 1500);
}
function myAlert(msg)
{
	var dialog = bootbox.dialog({
		//title: "Embel Technologies Says :",
	   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
	   });
	
	   setTimeout(function()
	  {
		dialog.modal('hide');
	   }, 1500);
}

function getUserDetails(){
	
	var params= {};
	var name= $('#EmpName').val();
	
	var userId=name.split(",")[0];
	var empname=name.split(",")[1];

	$("#userName1").append($("<input/>").attr("value","").text());
	$("#password").append($("<input/>").attr("value","").text());
		
	params["userId"]= userId;
	params["empname"]= empname;
	
	params["methodName"] = "getUserDetailsToAccessControl";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			document.getElementById("userName1").value = v.userName;
			document.getElementById("password").value = v.password;
				});
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {

		}
	});
}

function ValAccessControlDetails(){
	
	if(document.acescont.EmpName.value == "")
	{
		myAlert("Please Select Employee Name.");
		return false;
	}	
	
	if(document.acescont.typeId.value == "")
	{
		myAlert("Please Select Type");
		return false;
	}
	
	if(document.acescont.shopName1.value == "")
	{
		myAlert("Please Select Shop Name.");
		return false;
	}
	
	var shopname  = $('#shopName1').val();
	//alert(shopname);
	AddAccessControlDetails();
}

function AddAccessControlDetails(){
	
	document.acescont.btn.disabled = true;
	
	var EmpName = $('#EmpName').val();
	var userid= EmpName.split(",")[0];
	var employeeName = EmpName.split(",")[1];
	
	var userName = $('#userName1').val();
	var password = $('#password').val();
	var type = $('#typeId').val();
	
	var shopname  = $('#shopName1').val();
	alert
	var shopid= shopname.split(",")[0];
	var shop= shopname.split(",")[1];

	var params = {};
	
	params["userid"] =userid;
	params["EmpName"] =employeeName;
	params["userName"] =userName;
	params["password"] =password;
	params["type"] = type;
	params["shopid"] =shopid;
	params["shop"] =shop;
	params["methodName"] = "AddAccessControl";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		successAlert(data);
		if(document.acescont)
		{
			document.acescont.reset();
		}	
		document.acescont.btn.disabled =false;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
	
}
