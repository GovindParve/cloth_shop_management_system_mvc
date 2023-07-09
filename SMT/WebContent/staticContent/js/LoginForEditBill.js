/**LoginForEditBill.js **/


function editBillLogin()
{
	var pass = $("#pass").val();
	if(pass == "" || pass == null || pass == undefined || pass == " ")
	{
		alert("Please Enter Password");
		return false;
	}
	var params = {};
	params["pass"] = pass;
	
	params["methodName"] = "editBillLogin";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var data2 = 1;
		var data1 = parseInt(data);
		if(data1 == data2){
			//window.location.replace("/SMT/jsp/editBill.jsp");
			window.location.replace("/SMT/jsp/EditSaleInvoiceBill.jsp");
			//location.reload();
		} else {
			alert("Password is Wrong...!!!");
			window.location.replace("/SMT/jsp/LoginForEditBill.jsp");
			//location.reload();
		}
		//window.location.replace("/SMT/jsp/editBill.jsp");
	}
	).error(function(jqXHR, textStatus, errorThrown)
	{
		if(textStatus==="timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}