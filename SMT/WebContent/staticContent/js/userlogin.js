function myAlert(msg)
{
	var dialog = bootbox.dialog({
    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
    closeButton: false
   });

   setTimeout(function() {
	dialog.modal('hide');
   }, 1500);
}

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

function validataionUserLogin()
{
	var typeId= $('#typeId').val();
	var userName = $('#userName123').val();
	var uEmail=$('#uEmail').val();
	var password=$('#password').val();
	var repassword=$('#repassword').val();

	if(typeId != null && typeId != "" && typeId != " "){
		if(userName != null && userName != "" && userName != " "){
			if(uEmail != null && uEmail != "" && uEmail != " "){
				var checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(uEmail.match(checkEmail))
				{
			if(password != null && password != "" && password != " "){
				if(repassword != null && repassword != "" && repassword != " "){
					if(password == repassword){
						userLogin();
					}
					else{
						myAlert("Password and Re-Password is not match !");
					}
				}
				else{
					myAlert("Please enter Re-Password !");
				}
			}
			else{
				myAlert("Please enter password !");
			}
		}else{
			myAlert("Please Enter Valid Email Address !");
			}
		}
		else{
			myAlert("Please Enter Email Address !");
		}
			}
		else{
			myAlert("Please enter username !");
		}
	}
	else{
		myAlert("Please select type !");
	}
}

function userLogin()
{
	document.createusr.btn.disabled = true;
	var typeId= $('#typeId').val();
	var userName = $('#userName123').val();
	var uEmail = $("#uEmail").val();
	var password=$('#password').val();
	var repassword=$('#repassword').val();

	var params= {};

	params ["typeId"] = typeId;
	params ["userName"] = userName;
	params["uEmail"] = uEmail;
	params ["password"] = password;
	params ["repassword"] = repassword;

	params["methodName"] = "userLogin";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{   
		successAlert("User Added Successfully");

		if(document.createuser) 
		{
			document.createuser.reset();
		}
		//location.reload();
		

			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
	function getAllUserList()
	{
	var params= {};
	params["methodName"] = "getUserList";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#userDetails').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			var total =   $('#userDetails').DataTable( {
				
				 fnRowCallback : function(nRow, aData, iDisplayIndex){
		        	  $("th:first", nRow).html(iDisplayIndex +1);
		        	  return nRow;
		        	 },
				         
				         "sPaginationType": "full_numbers",
				          destroy: true,
				          searching: true,
				          //orderable: true,
				          "paging":   false,
				          "ordering": false,
				          "info":     false,
				          "scrollY": 250,
				          "scrollX": true,
				       
				          columns: [
				        	  		{"data": "pkUserId", "width": "5%", "defaultContent": ""},
				        	  		{"data": "typeId", "width": "5%", "defaultContent": ""},
				                    {"data": "userName", "width": "5%", "defaultContent": ""},
				                    {"data": "password", "width": "5%", "defaultContent": ""},
				                    {"data": "userEmail", "width": "5%", "defaultContent": ""},
				                   ],
				                   
				                   dom: 'Bfrtip',
				   				buttons: [
				   				          /*'copy', 'csv', 'excel', 'pdf', 'print',*/
				   					 
				   	                     {
				   	                    	extend: 'copyHtml5', footer: true,
				   	                    	title : function()
				   	                    	 {
				   	                    		 return "User List";
				   	                    	 },
				   	                     },
				   	                     {
				   	                    	extend: 'excelHtml5', footer: true,
				   	                    	title : function()
				   	                    	 {
				   	                    		 return "User List";
				   	                    	 },
				   	                     },
				   	                     {
				   	                    	extend: 'csvHtml5', footer: true,
				   	                    	title : function()
				   	                    	 {
				   	                    		 return "User List";
				   	                    	 },	 
				   	                     },
				   	                     {
				   	                    	 extend : 'pdfHtml5', footer: true,
				   	                    	 title : function()
				   	                    	 {
				   	                    		 return "User List";
				   	                    	 },
				   	                    	 orientation : 'landscape',
				   	                    	 pageSize : 'LEGAL',
				   	                    	 titleAttr : 'PDF' 
				   	                     } ]
			} );
		} );
	
		var mydata = catmap;
		$('#userDetails').dataTable().fnAddData(mydata);
		}
	);
}
	
function getAllUsersToEdit()
{
	var userType = $("#updateTypeId").val();
	
	$("#userNameList").empty();
	$("#updatePassword").empty();
	$("#repassword").empty();
	$("#userNameList").append($("<option></option>").attr("value","").text("Select User Name"));
	var params = {};
	params["userType"] = userType;	
	params["methodName"] = "getAllUsersToEdit";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var count = 1;
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			$("#userNameList").append($("<option></option>").attr("value",v.pkUserId).text(v.userName));
			count++;
		});
		}).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout")
			{
			}
	});
}

function getUsersAllInfo()
{
	var userType = $("#updateTypeId").val();
	var userNameList = $('#userNameList').val();
	
	$("#uEmail").empty();
	$("#updatePassword").empty();
	$("#repassword").empty();
	
	var params = {};
	params["userType"] = userType;
	params["userNameList"] = userNameList;
	params["methodName"] = "getUsersAllInfoController";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var count = 1;
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			$("#userNameList").append($("<option></option>").attr("value",v.pkUserId).text(v.userName));
			document.getElementById("uEmail").value = v.userEmail;
			count++;
		});
		}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout")
		{
		}
	});
}
	
function updateUserDetails()
{
	var updateTypeId= $('#updateTypeId').val();
	var pk_user_id = $('#userNameList').val();
	var uEmail = $('#uEmail').val();
	var updatePassword=$('#updatePassword').val();
	var UpdateRePassword=$('#UpdateRePassword').val();
	var updatePasswordUp = updatePassword.toUpperCase()
	var UpdateRePasswordUp = UpdateRePassword.toUpperCase();
	var checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var checkPassword = /^\S*$/;
	
	if(updateTypeId == "select")
	{
		myAlert("Please Select Type");
		return false;
	}
	else{}
	
	if(pk_user_id == null || pk_user_id == "" || pk_user_id == undefined || pk_user_id == " ")
	{
		myAlert("Please Select Username");
		return false;
	}
	
	if(uEmail == null || uEmail == "" || uEmail == undefined || uEmail == " ")
	{
		myAlert("Please Enter Email Id");
		return false;
	}
	if(uEmail.match(checkEmail))
	{}
	else
	{
		myAlert("Please Enter Valid Email Id");
		return false;
	}
	
	if(updatePassword.match(checkPassword))
	{}
	if(updatePassword == null || updatePassword == "" || updatePassword == undefined || updatePassword == " ")
	{
		myAlert("Please Enter Password");
		return false;
	}
	else if(updatePassword.match(checkPassword))
	{}
	else
	{
		myAlert("Spaces are Not Allowed In Password");
		return false;
	}

	if(UpdateRePassword == null || UpdateRePassword == "" || UpdateRePassword == undefined || UpdateRePassword == " ")
	{
		myAlert("Please Enter Re-Password");
		return false;
	}
	else if(UpdateRePassword.match(checkPassword))
	{}
	else
	{
		myAlert("Spaces are Not Allowed In Password");
		return false;
	}
	
	if(updatePassword == UpdateRePassword)
	{}
	else
	{
		myAlert("Password Did Not Matched");
		return false;
	}
	
	var params= {};
	
	params ["updateTypeId"] = updateTypeId;
	params ["pk_user_id"] = pk_user_id;
	params ["uEmail"] = uEmail;
	params ["updatePassword"] = updatePassword;
	params ["UpdateRePassword"] = UpdateRePassword;

	params["methodName"] = "updateUserDetails";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{   			
		if(document.createuser) 
		{
			document.createuser.reset();
		}
		location.reload();
		document.createuser.btn.disabled = false;
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
	
/*	
	function updateUserDetails()
	{
		var updateTypeId= $('#updateTypeId').val();
		var pk_user_id = $('#userNameList').val();
		var updatePassword=$('#updatePassword').val();
		var UpdateRePassword=$('#UpdateRePassword').val();
		
		var updatePasswordUp = updatePassword.toUpperCase()
		var UpdateRePasswordUp = UpdateRePassword.toUpperCase();
		
		var checkPassword = /^\S*$/;
		
		if(updateTypeId == "select")
		{
			myAlert("Please Select Type");
			return false;
		}
		else{}
		
		if(pk_user_id == null || pk_user_id == "" || pk_user_id == undefined || pk_user_id == " ")
		{
			myAlert("Please Select Username");
			return false;
		}
		else if(updatePassword.match(checkPassword))
		{}
		
		if(updatePassword == null || updatePassword == "" || updatePassword == undefined || updatePassword == " ")
		{
			myAlert("Please Enter Password");
			return false;
		}
		else if(updatePassword.match(checkPassword))
		{}
		else
		{
			myAlert("Spaces are Not Allowed In Password");
			return false;
		}

		if(UpdateRePassword == null || UpdateRePassword == "" || UpdateRePassword == undefined || UpdateRePassword == " ")
		{
			myAlert("Please Enter Re-Password");
			return false;
		}
		else if(UpdateRePassword.match(checkPassword))
		{}
		else
		{
			myAlert("Spaces are Not Allowed In Password");
			return false;
		}
		
		if(updatePassword == UpdateRePassword)
		{}
		else
		{
			myAlert("Password Did Not Matched");
			return false;
		}
		
		var params= {};
		
		params ["updateTypeId"] = updateTypeId;
		params ["pk_user_id"] = pk_user_id;
		params ["updatePassword"] = updatePassword;
		params ["UpdateRePassword"] = UpdateRePassword;

		params["methodName"] = "updateUserDetails";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
		{   
			successAlert(data);
			
			if(document.createuser) 
			{
				document.createuser.reset();
			}
			location.reload();
			document.createuser.btn.disabled = false;
		}
		).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {
				$(loaderObj).hide();
				$(loaderObj).find('#errorDiv').show();
			}
		});
	}
*/



