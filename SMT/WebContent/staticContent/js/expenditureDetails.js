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

//Adding expense detail
function addExpenseDetails()
{
	
	if(document.expenseDetails.expTypeName.value == "")
	{
		myAlert("Please Select Expense Type");
		return false;
	}	
	var letterNumber = /^[a-zA-Z0-9, ]+$/;
	if(document.expenseDetails.expTypeName.value.match(letterNumber))
	{}
	else
	{
		myAlert("Enter Only Alphabates And Numbers in Expense Type field..!!");
		return false;
	}
	if(document.expenseDetails.expenseName.value == "")
	{
		myAlert("Please Enter Expense Name");
		return false;
	}	
	var letterNumber = /^[a-zA-Z0-9, ]+$/;
	if(document.expenseDetails.expenseName.value.match(letterNumber))
	{}
	else
	{
		myAlert("Enter Only Alphabates And Numbers in Expense name field..!!");
		return false;
	}
	
	
	addExpense();
	
}

function addExpense()
{
	document.expenseDetails.btn.disabled = true;
	
	var shopId = $('#shopId').val();
	
	var expenseName = $('#expenseName').val();
	var input = document.getElementById('expTypeName'),
	list = document.getElementById('expType_drop'),
	i,expenseTypeId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			expenseTypeId = list.options[i].getAttribute('data-value');
		}
	}
	
	if(expenseTypeId == null || expenseTypeId == "" || expenseTypeId == undefined || expenseTypeId == " ")
	{
		myAlert("Please Select Valid Expense Type");
		return false;
	}
	
	var params = {};
	
	params ["shopId"] = shopId;
	params["expenseName"] = expenseName;
	params["expenseTypeId"] = expenseTypeId;
	params["methodName"] = "addExpenseDetails";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) 
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

function reset() {
	document.expenseDetails.reset();
}

function addExpenseForBillingAndGoodsReceive() {

	document.expenseDetails1.btn1.disabled = true;
	var expenseName = $('#expenseNameForBilling').val();
	var params = {};

	params["expenseName"] = expenseName;
	params["methodName"] = "addExpenseDetailsForBilling";

	$.post('/Fertilizer/jsp/utility/controller.jsp', params, function(data) {
		successAlert(data);
		if (document.expenseDetails1) {
			document.expenseDetails1.reset();
		}
		document.expenseDetails1.btn1.disabled = false;
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

function addExpenseType()
{
	document.expenseDetails.btn.disabled = true;
	
	var shopId = $('#shopId').val();
	var expTypeName = $('#expTypeName').val();
	
	if(expTypeName == null || expTypeName == "" || expTypeName == " " || expTypeName == undefined)
	{
		myAlert("Please Enter Expense Type");
		document.expenseDetails.btn.disabled = false;
		return false;
	}
	
	var params = {};
	
	params["shopId"] = shopId;
	params["expTypeName"] = expTypeName;
	params["methodName"] = "addExpenseType";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) 
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
