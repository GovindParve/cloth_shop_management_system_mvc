function myAlertFocusToKey(msg)
{
	var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
	   });

	   setTimeout(function() {
		dialog.modal('hide');
		document.getElementById("key").focus();		
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

function validateGenerateBillCOPY(){
	var BillNo = $('#BillNo').val(); 
	var input = document.getElementById('BillNo'), list = document
	.getElementById('seedBillNo'), i, billNo;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
		}
	}
	if(BillNo != null && BillNo != "" && BillNo != " ")
	{
		if(billNo != null)
		{
			generateBillCOPY();
		}
		else
		{
			myAlert("Invalid Bill Number ! Please select correct Bill number form avaliable list");
		}
	}
	else{
		myAlert("Please select Bill Number first !");
	}
}

function generateBillCOPY() {
	var input = document.getElementById('BillNo'), list = document
	.getElementById('seedBillNo'), i, billNo;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
		}
	}
	var params = {};
	params["billNo"] = billNo;
	var params = {};
	params["billNo"] = billNo;
	params["methodName"] = "CustBillCOPY";
	$.post('/SMT/jsp/utility/controller.jsp', params,
			function(data) {
		location.reload(true);
		window.open("Car_bill_PDF_COPY.jsp");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function validateGenerateBillCOPYForOtherBill(){
	var BillNo = $('#BillNo').val(); 
	var input = document.getElementById('BillNo'), list = document
	.getElementById('seedBillNo'), i, billNo;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
		}
	}
	if(BillNo != null && BillNo != "" && BillNo != " "){
		if(billNo != null){
			generateBillCOPY1();
		}
		else{
			myAlert("Invalid Bill Number ! Please select correct Bill number form avaliable list");
		}
	}
	else{
		myAlert("Please select Bill Number first !");
	}
}

function generateBillCOPY1() {
	var input = document.getElementById('BillNo'), 
	list = document.getElementById('seedBillNo'), i, billNo;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
		}
	}
	var params = {};
	params["billNo"] = billNo;
	params["methodName"] = "OtherBillCOPY";

	$.post('/SMT/jsp/utility/controller.jsp', params,
			function(data) {
		
		//window.open("ghantalwarMensWearOtherBillPdfCopy.jsp");
		window.open("Other_Bill_PDF_Copy_SM.jsp");
		location.reload(true);
		//window.open("pehenavaOtherBillPdfCopy.jsp");
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}



function validateGenerateBillCOPYForCreditBill()
{
	var BillNo = $('#BillNo').val(); 
	var input = document.getElementById('BillNo'), 
	list = document.getElementById('seedBillNo'), i, billNo, custName, gstTinNo, custName1;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			billNo = list.options[i].getAttribute('data-value');
			custName = list.options[i].getAttribute('value1');
			custName1 = list.options[i].getAttribute('value2');
			gstTinNo = list.options[i].getAttribute('myvalue');
		}
	}
	if(BillNo != null && BillNo != "" && BillNo != " ")
	{
		if(billNo != null)
		{
			GenerateBillCOPYForCreditBill();
		}
		else
		{
			myAlert("Invalid Bill Number ! Please select correct Bill number form avaliable list");
		}
	}
	else{
		myAlert("Please select Bill Number first !");
	}
}

function GenerateBillCOPYForCreditBill()
{
	var input = document.getElementById('BillNo'), 
	list = document.getElementById('seedBillNo'), i, billNo,custName,gstTinNo,custName1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			billNo = list.options[i].getAttribute('data-value');
			custName = list.options[i].getAttribute('value1');
			custName1 = list.options[i].getAttribute('value2');
			gstTinNo = list.options[i].getAttribute('myvalue');
		}
	}
	
	var params = {};
	params["billNo"] = billNo;
	params["gstTinNo"] = gstTinNo;
	params["custName"] = custName;
	params["custName1"] = custName1;
	params["methodName"] = "BillCOPYForCreditBill";
	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
	{
		
		//window.open("ghantalwarMensWearCreditCustBillingCopyPDF.jsp");
		window.open("CreditCustomerBillPDF_Copy_SM.jsp");
		location.reload(true);
		//window.open("creditCustBillingCopyPDF.jsp");
		
	}).error(function(jqXHR, textStatus, errorThrown)
	{
		if (textStatus === "timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}