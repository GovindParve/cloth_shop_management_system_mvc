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
function addBank()
{	
	var checkNumber = /^[0-9]+$/;
	var shopId = $('#shopId').val();
	var bankName = $("#bankName").val();
	var accountNumber = $("#accountNumber").val();
	var bankIfscCode = $("#bankIfscCode").val();
	var address = $("#address").val();
	var contactNo = $("#contactNo").val();
	var bankBranchName = $("#bankBranchName").val();
	var bankAccountHname = $("#bankAccountHname").val();
	
	if(bankName == null || bankName == "" || bankName == " " || bankName == undefined)
	{
		myAlert("Please Enter Bank Name");
		return false;
	}
	
	if(accountNumber == "")
	{
		var msg="Please Enter Account Number";
		var dialog = bootbox.dialog({
			//title: "Embel Technologies Says :",
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/SMT/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
		    closeButton: false
		});
		
		setTimeout(function() {
			dialog.modal('hide');
		}, 1500);
		
		return false;
	}else{
		
		var accNocheck = /^[0-9]+$/;
		if(document.prod.accountNumber.value.match(accNocheck)){
			
		}else{
			
			var msg="Please Enter Valid Account Number";
			var dialog = bootbox.dialog({
				
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/SMT/staticContent/images/s1.jpg" height="50" width="50"/></p>',
			    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
			    closeButton: false
			});
			
			setTimeout(function() {
				dialog.modal('hide');
			}, 1500);
			
			return false;
		}
	}
	
/*	if(bankIfscCode == null || bankIfscCode == "" || bankIfscCode == " " || bankIfscCode == undefined)
	{
		myAlert("Please Enter Ifsc Code");
		return false;
	}
	if(bankBranchName == null || bankBranchName == "" || bankBranchName == " " || bankBranchName == undefined)
	{
		myAlert("Please Enter Branch Name");
		return false;
	}
	if(bankAccountHname == null || bankAccountHname == "" || bankAccountHname == " " || bankAccountHname == undefined)
	{
		myAlert("Please Enter Account Holder Name");
		return false;
	}
	if(contactNo == null || contactNo == "" || contactNo == " " || contactNo == undefined)
	{
		myAlert("Please Enter Contact Number");
		return false;
	}*/
	
	if(bankIfscCode == null || bankIfscCode == "" || bankIfscCode == " " || bankIfscCode == undefined)
	{
		bankIfscCode = "N/A";
	}
	
	if(bankBranchName == null || bankBranchName == "" || bankBranchName == " " || bankBranchName == undefined)
	{
		bankBranchName = "N/A";
	}
	
	if(bankAccountHname == null || bankAccountHname == "" || bankAccountHname == " " || bankAccountHname == undefined)
	{
		bankAccountHname = "N/A";
	}
		
	if(contactNo == null || contactNo == "" || contactNo == " " || contactNo == undefined)
	{
		contactNo = "0";
	}
	
	if(address == null || address == "" || address == " " || address == undefined)
	{
		address = "N/A";
	}
	
	var params= {};
	
	params["shopId"] = shopId;
	params["bankName"] = bankName;
	params["accountNumber"] = accountNumber;
	params["bankIfscCode"] = bankIfscCode;
	params["address"] = address;
	params["contactNo"] = contactNo;
	params["bankBranchName"] = bankBranchName;
	params["bankAccountHname"] = bankAccountHname;
	params["methodName"] = "addBankDetails";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		successAlert(data);
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}