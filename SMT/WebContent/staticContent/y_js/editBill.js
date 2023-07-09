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

function editBill1()
{	
	
	var oldCashAmount = $('#oldCashAmount').val();
	var oldCardAmount = $('#oldCardAmount').val();
	var oldUPIAmount = $('#oldUPIAmount').val();
	var oldUpidAmount = $('#oldUpidAmount').val();
	
	//alert("oldCashAmount"+oldCashAmount+"oldCardAmount"+oldCardAmount+"oldUPIAmount"+oldUPIAmount+"oldUpidAmount"+oldUpidAmount);
	var firstNameSm = '';
	var lastNameSm = '';
	var mobileNo = $('#mobileNo').val();
	var creditCustomer1 = $('#creditCustomer1').val();

	if(mobileNo == "" || mobileNo == null || mobileNo == undefined)
	{
		mobileNo = 0;
	}
	else if(+(mobileNo.length) < 10)
	{
		myAlert("Please Enter Correct Mobile Number");
		return false;
	}
	
	var billNo = $('#billNoBW').val();
	if(billNo == null || billNo == undefined || billNo == "" || billNo == " ")
	{
		myAlert("Please Enter Bill Number");
		return false;
	}	
	
	var params = {};

	var count = jQuery("#jqGrid2").jqGrid('getGridParam', 'records')
	var allRowsInGrid = $('#jqGrid2').getGridParam('data');
	var totalAmount = 0;
	var checkCount = 0;
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{	
		var fkShopId = allRowsInGrid[i].fkShopId;
		params["fkShopId"+i] = fkShopId;
		
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId"+i] = pkBillId;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var quantityToUpdateStock = allRowsInGrid[i].quantityToUpdateStock;
		params["quantityToUpdateStock"+i] = quantityToUpdateStock;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;
		
		var employeeName1 = allRowsInGrid[i].employeeName1;
		var res = employeeName1.split(" ");
		
		var saleEmpId = res[0];
		params["saleEmpId"+i] = saleEmpId;
		
		if(res[1] == undefined || res[1] == null)
		{
			firstNameSm = 'NA';
		}
		else
		{
			firstNameSm = res[1];
		}
		
		if(res[2] == undefined || res[2] == null)
		{
			lastNameSm = 'NA';
		}
		else
		{
			lastNameSm = res[2];
		}
		
		var saleEmpName = firstNameSm+" "+lastNameSm;
		params["saleEmpName"+i] = saleEmpName;		
	}	
	
	var totalAmount = $("#totalAmount").val();
	var lastPaymentMode = '';
	var cashCard_cashAmount = '';
	var cashCard_cardAmount = '';
	var cashupi_cashAmount='';
	var cashupi_upiAmount='';
	var oldCashAmount = $('#oldCashAmount').val();
	var oldCardAmount = $('#oldCardAmount').val();
	var oldUPIAmount = $('#oldUPIAmount').val();
	var oldUpidAmount = $('#oldUpidAmount').val();
	
	var finalCreditAmount = $("#finalCreditAmount").val();
	var paymentMode = $("#paymentMode").val();

	if(paymentMode == 'none' || paymentMode == null || paymentMode == undefined || paymentMode == "")
	{
		lastPaymentMode = $("#lastPaymentMode").val();
		paymentMode = lastPaymentMode;
		cashCard_cashAmount = $('#oldCashAmount').val();
		cashCard_cardAmount = $('#oldCardAmount').val();
		cashupi_cashAmount = $('#oldUPIAmount').val();
		cashupi_upiAmount = $('#oldUpidAmount').val();
		
		params["cashCard_cashAmount"] = cashCard_cashAmount;
		params["cashCard_cardAmount"] = cashCard_cardAmount;
		params["cashupi_cashAmount"] = cashupi_cashAmount;
		params["cashupi_upiAmount"] = cashupi_upiAmount;
	}
	else if(paymentMode == "cashAndupi")
	{	
		cashupi_cashAmount = $('#cashupi_cashAmount').val();
		cashupi_upiAmount = $('#cashupi_upiAmount').val();
		if(cashupi_cashAmount == undefined || cashupi_cashAmount == null || cashupi_cashAmount == "" || cashupi_cashAmount == " ")
		{
			myAlert("Please Enter Cash Amount");
			//document.custord.btnSubmit1.disabled = false;
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashupi_cashAmount.match(checkCashAmt))
			{
				params["cashupi_cashAmount"] = cashupi_cashAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				//document.custord.btnSubmit1.disabled = false;
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		if(cashupi_upiAmount == undefined || cashupi_upiAmount == null || cashupi_upiAmount == "" || cashupi_upiAmount == " ")
		{
			myAlert("Please Enter Upi Amount");
			//document.custord.btnSubmit1.disabled = false;
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCardAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashupi_upiAmount.match(checkCardAmt))
			{
				params["cashupi_upiAmount"] = cashupi_upiAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				//document.custord.btnSubmit1.disabled = false;
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		

		if((+cashupi_cashAmount + +cashupi_upiAmount) > (+oldCashAmount + +oldCardAmount))
		{
			myAlert("Cash Amount + Upi Amount is Greater Than "+(+totalAmount - +finalCreditAmount));
			//document.custord.btnSubmit.disabled = false;
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else if((+cashupi_cashAmount + +cashupi_upiAmount) < (+oldCashAmount + +oldCardAmount))
		{
			myAlert("Cash Amount + Card Amount is Less Than "+(+totalAmount - +finalCreditAmount));
			document.custord.btnSubmit.disabled = false;
			//document.custord.btnSubmit.disabled = false;
			return false;
		}
	}
	else if(paymentMode == "cashAndCard")
	{	
		cashCard_cashAmount = $('#cashCard_cashAmount').val();
		cashCard_cardAmount = $('#cashCard_cardAmount').val();
		if(cashCard_cashAmount == undefined || cashCard_cashAmount == null || cashCard_cashAmount == "" || cashCard_cashAmount == " ")
		{
			myAlert("Please Enter Cash Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cashAmount.match(checkCashAmt))
			{
				params["cashCard_cashAmount"] = cashCard_cashAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		if(cashCard_cardAmount == undefined || cashCard_cardAmount == null || cashCard_cardAmount == "" || cashCard_cardAmount == " ")
		{
			myAlert("Please Enter Card Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCardAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cardAmount.match(checkCardAmt))
			{
				params["cashCard_cardAmount"] = cashCard_cardAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		
		if((+cashCard_cashAmount + +cashCard_cardAmount) > (+oldUPIAmount + +oldUpidAmount))
		{
			myAlert("Cash Amount + Card Amount is Greater Than "+(+totalAmount - +finalCreditAmount));
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else if((+cashCard_cashAmount + +cashCard_cardAmount) < (+oldUPIAmount + +oldUpidAmount))
		{
			myAlert("Cash Amount + Card Amount is Less Than "+(+totalAmount - +finalCreditAmount));
			document.custord.btnSubmit.disabled = false;
			return false;
		}
	}
	
	params["count"] = count;
	params["totalAmount"] = totalAmount;
	params["paymentMode"] = paymentMode;
	params["finalCreditAmount"] = finalCreditAmount;
	params["creditCustomer1"] = creditCustomer1;
	params["mobileNo"] = mobileNo;
	
	params["methodName"] = "editBillTaxInvoiceC";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) 
	{
		successAlert(data);
		//alert(data);
		//location.reload();
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}



function editCreditCustBillValidate()
{
	var creditcustCustomer = $("#creditcustCustomer").val();
	var creditCustBillNo = $("#creditCustBillNo").val();
	
	if(creditcustCustomer == "" || creditcustCustomer == null || creditcustCustomer == " " || creditcustCustomer == undefined)
	{
		myAlert("Select Customer Name");
		return false;
	}	
	if(creditCustBillNo == "" || creditCustBillNo == null || creditCustBillNo == " " || creditCustBillNo == undefined)
	{
		myAlert("Select Bill No.");
		return false;
	}	
	editCreditCustBill();
}




function editCreditCustBill()
{	
	var firstNameSm = '';
	var lastNameSm = '';
	
	var input = document.getElementById('creditcustCustomer'),
	list = document.getElementById('creditcust_drop'),
	i,fkRootCustId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootCustId = list.options[i].getAttribute('data-value');
		}
	}
	
	var creditCustBillNo = $("#creditCustBillNo").val();
	
	var params = {};

	var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records')
	var allRowsInGrid = $('#jqGrid1').getGridParam('data');
	var totalAmount = 0;
	var checkCount = 0;
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{	
		var fkShopId = allRowsInGrid[i].fkShopId;
		params["fkShopId"+i] = fkShopId;
		
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId"+i] = pkBillId;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var quantityToUpdateStock = allRowsInGrid[i].quantityToUpdateStock;
		params["quantityToUpdateStock"+i] = quantityToUpdateStock;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity"+i] = quantity;
		
		var employeeName1 = allRowsInGrid[i].employeeName1;
		var res = employeeName1.split(" ");
		
		var saleEmpId = res[0];
		params["saleEmpId"+i] = saleEmpId;
		
		if(res[1] == undefined || res[1] == null)
		{
			firstNameSm = 'NA';
		}
		else
		{
			firstNameSm = res[1];
		}
		
		if(res[2] == undefined || res[2] == null)
		{
			lastNameSm = 'NA';
		}
		else
		{
			lastNameSm = res[2];
		}
		
		var saleEmpName = firstNameSm+" "+lastNameSm;
		params["saleEmpName"+i] = saleEmpName;		
	}	
	
	var totalAmount = $("#totalAmountCC").val();
	var lastPaymentMode = '';
	var cashCard_cashAmount = '';
	var cashCard_cardAmount = '';
	
	var cashUpi_cashAmount='';
	var cashUpi_upiAmount='';
	
	var oldupiCashAmount= $('#oldUPIAmountCC').val();
	
	var oldupiAmount= $('#oldUpidAmountCC').val();
	var oldCashAmount = $('#oldCashAmountCC').val();
	var oldCardAmount = $('#oldCardAmountCC').val();
	var finalCreditAmount = $("#finalCreditAmountCC").val();
	var paymentMode = $("#paymentModeCC").val();
	var netPaymentAmountCC = $("#netPaymentAmountCC").val();

	if(paymentMode == 'noneCC' || paymentMode == null || paymentMode == undefined || paymentMode == "" || paymentMode == "Select")
	{
		lastPaymentMode = $("#oldPaymentModeCC").val();
		paymentMode = lastPaymentMode;
		cashCard_cashAmount = $('#oldCashAmountCC').val();
		cashCard_cardAmount = $('#oldCardAmountCC').val();
		cashUpi_cashAmount=$('#oldUPIAmountCC').val();
		cashUpi_upiAmount=$('#oldUpidAmountCC').val();
			
		params["cashCard_cashAmount"] = cashCard_cashAmount;
		params["cashCard_cardAmount"] = cashCard_cardAmount;
		params["cashUpi_cashAmount"] = cashUpi_cashAmount;
		params["cashUpi_upiAmount"] = cashUpi_upiAmount;
	}
	else if(paymentMode == "cash")
	{
		paymentMode = "cash";
	}
	else if(paymentMode == "card")
	{
		paymentMode = "card";
	}
	else if(paymentMode == "Upi")
	{
		paymentMode = "Upi";
	}
	else if(paymentMode == "cashAndCard")
	{		
		cashCard_cashAmount = $('#cashCard_cashAmountCC').val();
		cashCard_cardAmount = $('#cashCard_cardAmountCC').val();
		if(cashCard_cashAmount == undefined || cashCard_cashAmount == null || cashCard_cashAmount == "" || cashCard_cashAmount == " ")
		{
			myAlert("Please Enter Cash Amount");
			document.ccEdit.creditBtn.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cashAmount.match(checkCashAmt))
			{
				params["cashCard_cashAmount"] = cashCard_cashAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.ccEdit.creditBtn.disabled = false;
				return false;
			}
		}
		if(cashCard_cardAmount == undefined || cashCard_cardAmount == null || cashCard_cardAmount == "" || cashCard_cardAmount == " ")
		{
			myAlert("Please Enter Card Amount");
			document.ccEdit.creditBtn.disabled = false;
			return false;
		}
		else
		{
			var checkCardAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cardAmount.match(checkCardAmt))
			{
				params["cashCard_cardAmount"] = cashCard_cardAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.ccEdit.creditBtn.disabled = false;
				return false;
			}
		}
		
		if((+cashCard_cashAmount + +cashCard_cardAmount) == +netPaymentAmountCC)
		{}
		else
		{
			myAlert("Cash Amount + Card Amount is Must Be Equal To Net Paid Amount");
			document.ccEdit.creditBtn.disabled = false;
			return false;
		}
		
		paymentMode = "cashAndCard";
	}
	
	
	else if(paymentMode == "cashAndupi")
	{		
		cashUpi_cashAmount = $('#cashupi_cashAmountCC').val();
		cashUpi_upiAmount = $('#cashupi_upiAmountCC').val();
		if(cashUpi_cashAmount == undefined || cashUpi_cashAmount == null || cashUpi_cashAmount == "" || cashUpi_cashAmount == " ")
		{
			myAlert("Please Enter Cash Amount");
			document.ccEdit.creditBtn.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashUpi_cashAmount.match(checkCashAmt))
			{
				params["cashUpi_cashAmount"] = cashUpi_cashAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.ccEdit.creditBtn.disabled = false;
				return false;
			}
		}
		if(cashUpi_upiAmount == undefined || cashUpi_upiAmount == null || cashUpi_upiAmount == "" || cashUpi_upiAmount == " ")
		{
			myAlert("Please Enter Upi Amount");
			document.ccEdit.creditBtn.disabled = false;
			return false;
		}
		else
		{
			var checkCardAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashUpi_upiAmount.match(checkCardAmt))
			{
				params["cashUpi_upiAmount"] = cashUpi_upiAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.ccEdit.creditBtn.disabled = false;
				return false;
			}
		}
		
		if((+cashUpi_cashAmount + +cashUpi_upiAmount) == +netPaymentAmountCC)
		{}
		else
		{
			myAlert("Cash Amount + Upi Amount is Must Be Equal To Net Paid Amount");
			document.ccEdit.creditBtn.disabled = false;
			return false;
		}
		
		paymentMode = "cashAndupi";
	}
	
	
	params["count"] = count;
	params["totalAmount"] = totalAmount;
	params["paymentMode"] = paymentMode;
	params["netPaymentAmountCC"] = netPaymentAmountCC; 
	
	params["methodName"] = "editBillCreditCustomerController";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) 
	{
		successAlert(data);
		//alert(data);
		//location.reload();
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}


function billEdit2()
{
	if(document.supd1.creditCustomer.value == "")
	{
		myAlert("Select Customer Name.");
		return false;
	}	
	if(document.supd1.billNo2.value == "")
	{
		myAlert("Select Bill No.");
		return false;
	}	
	billeditCreditCust();
}

function billeditCreditCust()
{
	var params = {};
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}

	var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid1').getGridParam('data');

	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{	
		var firstNameSm = '';
		var lastNameSm = '';
		
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId" + i] = pkBillId;
		
		var employeeName1 = allRowsInGrid[i].employeeName1;
		var res = employeeName1.split(" ");
		
		var saleEmpId = res[0];
		params["saleEmpId"+i] = saleEmpId;
		
		if(res[1] == undefined || res[1] == null)
		{
			firstNameSm = 'NA';
		}
		else
		{
			firstNameSm = res[1];
		}
		
		if(res[2] == undefined || res[2] == null)
		{
			lastNameSm = 'NA';
		}
		else
		{
			lastNameSm = res[2];
		}
		
		var saleEmpName = firstNameSm+" "+lastNameSm;
		params["saleEmpName"+i] = saleEmpName;
	}

	
	var billNo = $('#billNo2').val();

	params["billNo"] = billNo;
	params["count"] = count;
	params["creditCustomer1"] = creditCustomer1;
	
	params["methodName"] = "creditCustEditBillTaxInvoice";	

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		
		successAlert(data);
		
		//alert(data);
		//location.reload();
	
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

var first;
function getEmpName()
{
	var params= {};
	
	params["methodName"] = "getEmpNameforGrid";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)	
	{  
		var jsonData = $.parseJSON(data);
		first = jsonData;
		//alert("get Data from DataBase****"+first);
		var catmap = jsonData.list;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}


function getSaleItems2()
{	
	var billNo = $('#billNoBW').val();
	var params = {};
	params["methodName"] = "getSaleItemByBillNoForBillEdit";
	params["billNo"] = billNo;
	
	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
			{
				$("#jqGrid2").jqGrid("clearGridData");
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				
				$.each(jsonData, function(i, v)
				{					
					getEmpName();
					var empname = first;
				
					getEmpName();
					var empname = first;
					
					getEmpName();
					var empname = first;
					
					if(v.contactNo == "0")
					{
						document.getElementById("mobileNo").value = "";
					}
					else
					{
						document.getElementById("mobileNo").value = v.contactNo;
					}					
					document.getElementById("creditCustomer1").value = v.customerName;
					document.getElementById("totalAmount").value = v.totalProductAmount;
					document.getElementById("discount").value = v.totalDiscount;
					document.getElementById("lastPaymentMode").value = v.paymentMode;
					document.getElementById("grossTotal").value = v.grossTotal;
					document.getElementById("totalQuantity").value = v.billProCount;
					document.getElementById("oldCashAmount").value = v.oldCashAmount;
					document.getElementById("oldCardAmount").value = v.oldCardAmount;
					document.getElementById("finalCreditAmount").value = v.totalSaleReturnAmt;
					document.getElementById("oldUpidAmount").value = v.oldUpiAmount;
					document.getElementById("oldUPIAmount").value = v.oldUpiCashAmount;
					
					$("#jqGrid2").jqGrid({
								datatype : "local",

								colNames : [ "PkBillId", "fkShopId", "Date","Barcode<be>No", "Category<br>Name","Item Name", "quantityToUpdateStock", "Quantity", "Return<br>Quantity", "Sale<br>Price", 
											 "SP<br>Without<br>Tax", "Contact<br>No", "<br>Total", "Discount", "Size", "GST%", "igst", "Tax<br>Amount", "Total", 
											 "Total<br>Per<br>Product", "Employee<br>Name"
								             ],

								             colModel : [ 
								            {
									           	 name : 'pkBillId',
									           	 width : 140,
									           	 sortable: false,
									           	 hidden : true,
									         }, 								            	 
							            	 {
								            	 name : 'fkShopId',
								            	 sortable: false,
									           	 hidden : true,
								            	 //width : 110,
								             },							            	 
							            	 {
								            	 name : 'Date',
								            	 sortable: false,
								            	 width : 110,
								            	 editable : true
								             },
								             {
								            	 name : "barcodeNo",
								            	 sortable: false,
								            	 width : 100,
								            	 editable : true
								             },
								             {
								            	 name : "categoryName",
								            	 sortable: false,
								            	 width : 140,
								            	 editable : true
								             },
								             {
								            	 name : "itemName",
								            	 sortable: false,
								            	 width : 100,
								            	 editable : true
								             },
								             {
								            	 name : 'quantityToUpdateStock',
								            	 sortable: false,
								            	 hidden: true,
								            	 //width : 50,
								            	 //editable : true
								             },	
								             {
								            	 name : 'quantity',
								            	 sortable: false,
								            	 width : 50,
								            	 editable : true
								             },								
								             {
								            	 name : 'editQuantity',
								            	 editoptions: { defaultValue: '00'},
								            	 width : 70,
								            	 sortable: false,
								            	 hidden: true,
								            	 editable : true
								             },
								             {
								            	 name : "salePrice",
								            	 sortable: false,
								            	 width : 70,
								            	 hidden: true,
								            	 editable : true
								             },
								             {
								            	 name : "spWithoutTax",
								            	 sortable: false,
								            	 width : 70,
								             },
								             {
								            	 name : "contactNo",
								            	 width : 120,
								            	 sortable: false,
								            	 hidden:true,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 sortable: false,
								            	 hidden:true,
								             },
								             {
								            	 name : 'discount',
								            	 sortable: false,
								            	 width : 60,
								            	 editable : true
								            	 
								             },
								             {
								            	 name : 'size',
								            	 width : 90,
								            	 sortable: false,
								            	 hidden : true,
								             },
								             {
								            	 name : 'gst',
								            	 sortable: false,
								            	 width : 50,
								             },
								             {
								            	 name : 'iGst',
								            	 width : 50,
								            	 sortable: false,
								            	 hidden: true,
								             },
								             {
								            	 name : 'taxAmt',
								            	 sortable: false,
								            	 width : 90,
								             },								            
								             {
								            	 name : "totalAmt",
								            	 width : 100,
								            	 sortable: false,
								             },
								             {
								            	 name : 'finalTotalPerProduct',
								            	 width : 120,
								            	 sortable: false,
								            	 hidden: true,
								             },
								             {	name:'employeeName1',//this is for take drop down in grid
									        	  width:200,
									        	  align:'center',
									        	  sortable: false,
					                              
					                              edittype: 'select',
					                              sortable: false,
					                              editable:true,
					                              editoptions: { value:empname}
								             
									          }
								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1600,
								             shrinkToFit: true,
								             rowList : [10,20,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             afterSaveCell: function ()
								             {
								            	 var rowId =$("#jqGrid2").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid2").getRowData(rowId);
								            	 var quantity = rowData['quantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var salePrice = rowData['salePrice'];
								            	 var discount = rowData['discount'];
								            	 var pName = rowData['itemName'];
								            	 var categoryName = rowData['categoryName'];
								            	 var unit = rowData['size'];
								            	 var returnTotalAmt = rowData['returnTotalAmt'];
								            	 var taxAmt = rowData['taxAmt'];
								            	 var gst = rowData['gst'];
								            	 var iGst = rowData['iGst'];
								            	 var totalAmt = rowData['totalAmt'];
								            	 var finalTotalPerProduct = rowData['finalTotalPerProduct'];
								            	 var employeeName1=rowData['employeeName1'];
								            	 
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
								            	 {
							            		 	editQuantity = 00;
							            		 	var setZero = "00";
						                    		$("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", setZero);
						                    		return false;
								            	 }
/*								            	 
								            	 if(editQuantity == "0" || editQuantity == "")
								            	 { 
								            		 var edit = "00";
							            		 	 $("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", edit);
								            	 }
								            	 
								            	 if(Number(editQuantity) > Number(quantity))
								            	 {
								            		 alert("Return Quantity Is Greater Than Quantity");
								            		 var totalAmt = rowData['finalTotalPerProduct'];
								            		 var rtota = 0.00;
								            		 var edit = "00";
							            		 	 $("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", rtota);
						                    		 $("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", totalAmt);
						                    		 $("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", edit);
								            		 
								            		 return false;
								            	 }

								            	 var afterquantity = quantity - editQuantity;
*/								            	/*if(editQuantity > 0)
								            	 {
								            		if (unit == "meter"
													|| unit == "Meter"
													|| unit == "METER"
													|| unit == "MTR"
													|| unit == "mtr"
													|| unit == "Mtr")
													{
								            			 
													}else
													{
														var setZero = 0;
														$("#jqGrid2").jqGrid("setCell", rowId, "discount", setZero);
													}
								            	 }*/

								            	 if(quantity > 0)
								            	 {								            	 
									            	 var tota = quantity * totalAmt;
	
									            	// var tota1 = (editQuantity * salePrice)-(editQuantity*discount);
									            	 var tota1 = (quantity * totalAmt);// (editQuantity * salePrice);
									            	/*alert("Return Amount of"+pName+"is"+tota1);*/
	
									            	 $("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", tota1);
	
									            	 if(tota == 0)
									            	 {
									            		 $("#jqGrid2").jqGrid("setCell", rowId, "grossamt", tota);
									            	 }
									            	 else
									            	 {
									            		 var gross = ((discount/100)*tota) + tota;
									            		 $("#jqGrid2").jqGrid("setCell", rowId, "grossamt", gross);
									            	 }
								            	 

								            	 $("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", tota.toFixed(2));
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
/*												
												 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3});
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
*/
								            	 document.getElementById("totalAmount").value = parseTotal.toFixed(2);;
								            	 document.getElementById("grossTotal").value = parseTotal.toFixed(2);;
								             }else{}
								             },
							            	 
								             //footerrow: true, // set a footer row

								             gridComplete: function()
								             {
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
/*								            	 
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
*/								            	 
								            	 document.getElementById("totalAmount").value = parseTotal.toFixed(2);;
								            	 document.getElementById("grossTotal").value = +(+parseTotal - +v.totalSaleReturnAmt).toFixed(2);
								             },

								             pager : "#jqGridPager2",

							});

					$("#jqGrid2").addRowData(i, jsonData[i]);

					$('#jqGrid2').navGrid('#jqGridPager2',
							// the buttons to appear on the toolbar of the grid
							{ edit: true, add: true, del: false, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
							// options for the Edit Dialog
							{
								editCaption : "The Edit Dialog",
								recreateForm : true,
								checkOnUpdate : true,
								checkOnSubmit : true,
								closeAfteredit : true,
								errorTextFormat : function(data) {
									return 'Error: '
									+ data.responseText
								}
							},

							{},

							// options for the Delete Dailog
							{
								closeAfterdel:true,
								recreateForm: true,
								afterComplete: function() {
									$('#jqGrid2').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGrid2").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid2").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var salePrice = rowData['salePrice'];
					            	 var discount = rowData['discount'];

					            	 if(Number(editQuantity) > Number(quantity))
					            	 {
					            		 alert("Return Quantity Is Greater Than Quantity");
					            	 }

					            	 var afterquantity = quantity - editQuantity;

					            	 var tota = afterquantity * salePrice;

					            	 var tota1 = editQuantity * salePrice;

					            	 $("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", tota1);

					            	 if(tota == 0){

					            		 $("#jqGrid2").jqGrid("setCell", rowId, "grossamt", tota);
					            	 }
					            	 else{
					            		 var gross = ((discount/100)*tota) + tota;
					            		 $("#jqGrid2").jqGrid("setCell", rowId, "grossamt", gross);

					            	 }

					            	 $("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", tota);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
					            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
					             
								},
								errorTextFormat: function (data) {
									return 'Error: ' + data.responseText
								},
								onSelectRow: function(id) {
									if (id && id !== lastSel) {
										jQuery("#jqGrid2").saveRow(lastSel, true, 'clientArray');
										jQuery("#jqGrid2").editRow(id, true);
										lastSel = id;
										console.log(id);
									}
								}
							});
				});
			}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
				}
			});
}

function getSaleItems1()
{
	var billNo = $('#billNo2').val();
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}

	var params = {};
	
	params["methodName"] = "getSaleItemByBillNoForBillEditCreditCust";
	
	params["creditCustomer1"] = "creditCustomer1";
	params["billNo"] = billNo;
	$.post(
			'/SMT/jsp/utility/controller.jsp',
			params,
			function(data) {

				$("#jqGrid1").jqGrid("clearGridData");
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				$.each(jsonData, function(i, v) 
				{	
					getEmpName();
					var empname = first;
					
					getEmpName();
					var empname = first;
					
					getEmpName();
					var empname = first;
					
					$("#jqGrid1").jqGrid(
							{
								datatype : "local",

								colNames : [ "pkId", "Date","Category Name","Item Name","Barcode No",
								             "Quantity", "Return Quant", "SalePrice",
								             "Return Total","Total","Discount",
								              "Size", "creditCustId", "Bill No", 
								             "gst", "iGst", "Tax Amount", "finalTotalPerProduct",
								             "Employee<br>Name"],

								             colModel : [
								             {
									            	 name : "pkBillId",
									            	 //hidden : true
									         }, 
							            	 {
								            	 name : 'Date',
								            	 width : 140,
								             },								            	 
								            
								             {
								            	 name : "categoryName",
								            	 width : 100,
								             },

								             {
								            	 name : "itemName",
								            	 width : 100,
								             },
								             {
								            	 name : "barcodeNo",
								            	 width : 100,
								             },
								             {
								            	 name : 'quantity',
								            	 width : 70,
								             },								
								             {
								            	 name : 'editQuantity',
								            	 width : 70,
								            	 editable : true,
								            	 hidden:true,
								             },
								             {
								            	 name : "salePrice",
								            	 width : 100,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								            	 hidden:true,
								             },
								             {
								            	 name : "totalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								            	 hidden:true,
								             },
								             {
								            	 name : 'discount',
								            	 width : 50,
								             },								            
								             {
								            	 name : 'size',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'fkCreditCustId',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'billNo',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'gst',
								            	 width : 140,
								            	 //hidden : true
								             },
								             {
								            	 name : 'iGst',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'taxAmt',
								            	 width : 140,
								            	 //hidden : true
								             },
								             {
								            	 name : "finalTotalPerProduct",
								            	 width : 150,
								            	 formatter: 'number',
								            	 hidden:true,
								             },
								             {	name:'employeeName1',//this is for take drop down in grid
									        	  width:250,
									        	  align:'center',
									        	  sortable: false,
					                              editable:true,
					                              edittype: 'select', 
					                              editoptions: { value:empname}
									          }
								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1350,
								             shrinkToFit: true,
								             rowList : [10,20,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             afterSaveCell: function () {
								            	 var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid1").getRowData(rowId);
								            	 var quantity = rowData['quantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var salePrice = rowData['salePrice'];
								            	 var discount = rowData['discount'];
								            	 var unit = rowData['size'];
								            	 var fkCreditCustId = rowData['fkCreditCustId'];
								            	 var returnTotalAmt = rowData['returnTotalAmt'];
								            	 var billNo = rowData['billNo'];
								            	 var gst = rowData['gst'];
								            	 var iGst = rowData['iGst'];
								            	 var taxAmt = rowData['taxAmt'];
								            	 var finalTotalPerProduct = rowData['finalTotalPerProduct'];
								            	 
								            	 if (editQuantity == "")
								            	 {
								            		var setZero = "00";
		 				                    		$("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero);							            		 
								            	 }
								            	 
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
								            	 {
								            		 	editQuantity = 0;
								            		 	var setZero = "00";
							                    		$("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero);
							                    		return false;
								            	 }
								            	 
								            	 if(Number(editQuantity) > Number(quantity))
								            	 {
								            		 alert("Return Quantity Is Greater Than Quantity");
								            		 var setZero = "00";
							                    	 $("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero)
								            		 return false;
								            	 }
								            	 var afterquantity = quantity - editQuantity;
								            	 var tota = afterquantity * finalTotalPerProduct;//salePrice;
								            	 var total1 = editQuantity * finalTotalPerProduct;//salePrice;

								            	 $("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", total1);

								            	 if(tota == 0)
								            	 {
								            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", tota);
								            	 }
								            	 else
								            	 {
								            		 var gross = ((discount/100)*tota) + tota;
								            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", gross);
								            	 }

								            	 $("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", tota);
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'salePrice', false, 'sum');
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { salePrice: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },
								             footerrow: true, // set a footer row

								             gridComplete: function()
								             {
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'salePrice', false, 'sum');
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { salePrice: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },

								             pager : "#jqGridPager1",

							});

					$("#jqGrid1").addRowData(i, jsonData[i]);

					$('#jqGrid1')
					.navGrid(
							'#jqGridPager1',
							// the buttons to appear on the toolbar of the grid
							{ edit: true, add: true, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
							// options for the Edit Dialog
							{
								editCaption : "The Edit Dialog",
								recreateForm : true,
								checkOnUpdate : true,
								checkOnSubmit : true,
								closeAfteredit : true,
								errorTextFormat : function(data) {
									return 'Error: '
									+ data.responseText
								}
							},

							{},

							// options for the Delete Dailog
							{
								closeAfterdel:true,
								recreateForm: true,
								afterComplete: function() {
									$('#jqGrid1').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid1").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var salePrice = rowData['salePrice'];
					            	 var discount = rowData['discount'];
					            	 if(Number(editQuantity) > Number(quantity))
					            	 {
					            		 alert("Return Quantity Is Greater Than Quantity");
					            	 }
					            	 var afterquantity = quantity - editQuantity;
					            	 var tota = afterquantity * salePrice;
					            	 var total1 = editQuantity * salePrice;

					            	 $("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", total1);

					            	 if(tota == 0){

					            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", tota);
					            	 }
					            	 else{
					            		 var gross = ((discount/100)*tota) + tota;
					            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", gross);

					            	 }

					            	 $("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", tota);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
					            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
					             
								},
								errorTextFormat: function (data) {
									return 'Error: ' + data.responseText
								},
								onSelectRow: function(id) {
									if (id && id !== lastSel) {
										jQuery("#jqGrid1").saveRow(lastSel, true, 'clientArray');
										jQuery("#jqGrid1").editRow(id, true);
										lastSel = id;
										console.log(id);
									}
								}
							});
				});

			}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
				}
			});
}

function getAllSaleReturn()
{
	var params = {};
	var namePresent;
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');

	var action = new Array();
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {
		var idVal = "";
		if (i != 0) {
			idVal = i;
		}
		var itemId = allRowsInGrid[i].itemId;
		params["itemId" + i] = itemId;

		var color = allRowsInGrid[i].color;
		params["color" + i] = color;

		var customerBill = allRowsInGrid[i].customerBill;
		params["customerBill" + i] = customerBill;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;

		var SalePrice = allRowsInGrid[i].SalePrice;
		params["SalePrice" + i] = SalePrice;

		var totalAmount = allRowsInGrid[i].totalAmount;
		params["totalAmount" + i] = totalAmount;

		var netAmount = allRowsInGrid[i].netAmount;
		params["netAmount" + i] = netAmount;

		var soldDate = allRowsInGrid[i].soldDate;
		params["soldDate" + i] = soldDate;

		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;

		var color = allRowsInGrid[i].color;
		params["color" + i] = color;

		var discountforsalereturn = allRowsInGrid[i].discountforsalereturn;
		params["discountforsalereturn"+i] = discountforsalereturn;

		var total = params["unitPrice" + i] * params["quantity" + i];

		params["total" + i] = total;
		for (var int = 0; int < count.length; int++) {

		}
	}

	var customerBill = $('#customerBill').val();
	params["customerBill"] = customerBill;

	params["count"] = count;

	params["methodName"] = "saleReturnReceipt";
	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		alert(data);
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function getItemDetails()
{
	this.getitems = getitems;

	/********************************** code for GET ITEM DETAILS BY CATEGORY*******************************************/

	function sumFmatter(cellvalue, options, rowObject) {
		return options.rowData.quantity * options.rowData.unitPrice;

	}

	function getitems() {

		$("#jqGrid").jqGrid("clearGridData");
		var customerBill = $('#customerBill').val();

		var params = {};
		params["methodName"] = "getItemsBySaleBill";
		params["customerBill"] = customerBill;
		$.post(
				'/SMT/jsp/utility/controller.jsp',params,function(data) {

					var jsonData = $.parseJSON(data);
					var catmap = jsonData.list;

					function sumFmatter (cellvalue, options, rowObject)
					{
						var jam=0;
						var jam1="";
						var tot= (options.rowData.quantity * options.rowData.SalePrice);
						var shree = document.good1.resolution.value;

						var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
						var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
						var AllRows=JSON.stringify(allRowsInGrid1);
						for (var i = 0; i < count; i++) {

							var quantity = allRowsInGrid1[i].quantity;
							params["quantity"+i] = quantity;

							var SalePrice = allRowsInGrid1[i].SalePrice;
							params["SalePrice"+i] = SalePrice;

							var totals1=((SalePrice)*(quantity));

							jam = jam + totals1;

						}
						jam1= jam+tot;

						document.getElementById("resolution").value = jam1;
						return tot;
					}

					$.each(jsonData, function(i, v) {

						$("#jqGrid").jqGrid(
								{
									datatype : "local",

									colNames : ["customerBill","ItemID","Employee Name", "Item Name","Color",
									            "Quantity", "Price",
									            "Sale DAte", "totalAmount" ,"discount","NETTotal" ],

									            colModel : [ 

									                        {
									                        	name : "customerBill",
									                        },
									                        {
									                        	name : "itemId",
									                        	hidden : true
									                        },

									                        {
									                        	name:"empName",
									                        	width : 220,
									                        },

									                        {
									                        	name : "itemName",
									                        	width : 200,
									                        },

									                        {
									                        	name:"color" ,
									                        	width : 100,
									                        },

									                        {
									                        	name : "quantity",
									                        	width : 140,
									                        	editable : true
									                        },

									                        {
									                        	name : 'SalePrice',
									                        	width : 120,
									                        	editable : true
									                        }, 
									                        {
									                        	name : 'soldDate',
									                        	width : 200,
									                        	editable : true
									                        },

									                        {
									                        	label : 'Total',
									                        	name : "totalAmount",
									                        	width : 175,
									                        },

									                        {
									                        	name:"discountforsalereturn",
									                        	width : 150
									                        },
									                        {
									                        	name : "netAmount",
									                        	formatter: sumFmatter,
									                        	width : 150,
									                        }
									                        ],

									                        sortorder : 'desc',

									                        loadonce : true,
									                        viewrecords : true,
									                        width : 1200,
									                        height : 200,
									                        pager : "#jqGridPager"
								});

						$("#jqGrid").addRowData(i, jsonData[i]);

						$('#jqGrid').navGrid('#jqGridPager',
								// the buttons to appear on the toolbar of the grid
								{ edit: true, add: true, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
								// options for the Edit Dialog
								{
									editCaption: "The Edit Dialog",
									recreateForm: true,
									checkOnUpdate : true,
									checkOnSubmit : true,
									closeAfterEdit: true,
									errorTextFormat: function (data) {
										return 'Error: ' + data.responseText
									}
								},
								// options for the Add Dialog
								{
									closeAfterAdd: true,
									recreateForm: true,
									errorTextFormat: function (data) {
										return 'Error: ' + data.responseText
									}
								},
								// options for the Delete Dailog
								{
									closeAfterdel:true,
									recreateForm: true,
									afterComplete: function() {
										$('#jqGrid').trigger( 'reloadGrid' );
									},
									errorTextFormat: function (data) {
										return 'Error: ' + data.responseText
									},
									onSelectRow: function(id) {
										if (id && id !== lastSel) {
											jQuery("#jqGrid").saveRow(lastSel, true, 'clientArray');
											jQuery("#jqGrid").editRow(id, true);
											lastSel = id;
											console.log(id);
										}
									}
								});
					});
				}).error(function(jqXHR, textStatus, errorThrown) {
					if (textStatus === "timeout") {
					}
				});
	}
}

var items = new getItemDetails();
function getBillByMiscellaneousCustomer1(){
	var input = document.getElementById('creditCustomer5'),
	list = document.getElementById('cust_drop5'),
	i,creditCustomer,creditCustomer1;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer1 = list.options[i].getAttribute('data-value');
			creditCustomer = list.options[i].getAttribute('value');
		}
	}
	var creditCustomer = creditCustomer;
	$("#billNo").empty();
	$("#billNo").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};
	params["creditCustomer"]= creditCustomer;
	params["methodName"] = "getAllBillByCustomer1";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			$("#billNo").append($("<option></option>").attr("value",v.billNo).text(v.billNo)); 
				});
			})
}

function getBillByCustomer1(){
	var input = document.getElementById('creditcustCustomer'),
	list = document.getElementById('creditcust_drop'),
	i,creditCustomer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	var creditCustomer = creditCustomer;
	$("#creditCustBillNo").empty();
	$("#creditCustBillNo").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};
	params["creditCustomer"]= creditCustomer;
	params["methodName"] = "getAllBillByCustomer2";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			$("#creditCustBillNo").append($("<option></option>").attr("value",i).text(v.billNo)); 
		});
	})
}

function getCreditCustEditBill()
{
	var billNo = $('#creditCustBillNo').val();
	var input = document.getElementById('creditcustCustomer'),
	list = document.getElementById('creditcust_drop'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}

	var params = {};
	
	params["methodName"] = "getSaleItemByBillNoForBillEditCreditCust";
	
	params["creditCustomer1"] = "creditCustomer1";
	params["billNo"] = billNo;
	$.post('/SMT/jsp/utility/controller.jsp',
			params,
			function(data)
			{
				$("#jqGrid1").jqGrid("clearGridData");
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				$.each(jsonData, function(i, v)
				{
					getEmpName();
					var empname = first;
				
					getEmpName();
					var empname = first;
					
					getEmpName();
					var empname = first;						
					
					document.getElementById("totalAmountCC").value = v.totalProductAmount;
					document.getElementById("discountCC").value = v.totalDiscount;
					document.getElementById("oldPaymentModeCC").value = v.paymentMode;					
					document.getElementById("totalQuantityCC").value = v.billProCount;
					document.getElementById("oldCashAmountCC").value = v.oldCashAmount;
					document.getElementById("oldCardAmountCC").value = v.oldCardAmount;
					document.getElementById("finalCreditAmountCC").value = v.totalSaleReturnAmt;
					document.getElementById("netPaymentAmountCC").value = v.netPaymentAmount;
					document.getElementById("grossTotalCC").value = v.grossamt;
					document.getElementById("oldUPIAmountCC").value = v.oldUpiCashAmount;
					document.getElementById("oldUpidAmountCC").value = v.oldUpiAmount;
					
					$("#jqGrid1").jqGrid(
							{
								datatype : "local",

								colNames : [ "Date","fkShopId", "itemID", "CatId", "Category<br>Name", "productId", "Item<br>Name", "SubCatId", "Barcode<br>No",
								             "quantityToUpdateStock","Qty", "Return Quantity", "Sale<br>Price", "SP<br>Without<br>Tax", "Return Total", "Discount", "Size", 
								             "creditCustId", "Bill No", "gst", "iGst", "Tax Amount", "Total", "Employee Name"],

								             colModel : [
								            	 
								             {
								            	 name : 'Date',
								            	 sortable: false,
								            	 width : 120,
								            	 editable : true
								             },								            	 
								             {
								            	 name : "fkShopId",
								            	 hidden : true,
								            	 //width : 120,
								             }, 						            	 
								             {
								            	 name : "pkBillId",
								            	 hidden : true,
								             }, 
								             {
								            	 name : "catId",
								            	 hidden : true,
								            	 editable : true
								             }, 
								             {
								            	 name : "categoryName",
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 140,
								            	 editable : true
								             },
								             {
								            	 name : "productId",
								            	 hidden : true,
								            	 editable : true
								             }, 
								             {
								            	 name : "itemName",
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 90,
								            	 editable : true
								            	 
								             },
								             {
								            	 name : "subCatId",
								            	 hidden : true,
								            	 editable : true
								             }, 
								             {
								            	 name : "barcodeNo",
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 100,
								            	 editable : true
								             },
								             {
								            	 name : 'quantityToUpdateStock',
								            	 hidden : true,
								            	 //sortable: false,
								            	 //width : 70,
								            	 //editable : true
								             },	
								             {
								            	 name : 'quantity',
								            	 sortable: false,
								            	 width : 70,
								            	 editable : true
								             },								
								             {
								            	name : 'editQuantity',
								            	editoptions: { defaultValue: '00'},
								            	 width : 70,
								            	 sortable: false,
								            	 hidden: true,
								            	 editable : true
								             },
								             {
								            	 name : "salePrice",
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 100,
								            	 hidden: true,
								            	 editable : true
								             },
								             {
								            	 name : "spWithoutTax",
								            	 sortable: false,
								            	 sortable: false,
								            	 width : 100,
								            	 editable : true
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 sortable: false,
								            	 hidden:true,
								             },
								             {
								            	 name : 'discount',
								            	 sortable: false,
								            	 width : 80,
								            	 editable : true
								             },								            
								             {
								            	 name : 'size',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'fkCreditCustId',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'billNo',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'gst',
								            	 width : 50,
								            	 //hidden : true
								            	 editable : true
								             },
								             {
								            	 name : 'iGst',
								            	 width : 50,
								            	 hidden : true
								             },
								             {
								            	 name : 'taxAmt',
								            	 sortable: false,
								            	 width : 100,
								             },
								             {
								            	 name : "totalAmt",
								            	 sortable: false,
								            	 width : 150,
								             },
								             {
							            	 	  name:'employeeName1',//this is for take drop down in grid
									        	  width:240,
									        	  align:'center',
									        	  sortable: false,
					                              editable:true,
					                              edittype: 'select', 
					                              editoptions: { value:empname}										          
								             },
								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1200,
								             shrinkToFit: true,
								             rowList : [10,20,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             afterSaveCell: function ()
								             {
								            	 var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid1").getRowData(rowId);
								            	 var quantity = rowData['quantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var salePrice = rowData['salePrice'];
								            	 var discount = rowData['discount'];
								            	 var unit = rowData['size'];
								            	 var fkCreditCustId = rowData['fkCreditCustId'];
								            	 var returnTotalAmt = rowData['returnTotalAmt'];
								            	 var billNo = rowData['billNo'];
								            	 var gst = rowData['gst'];
								            	 var iGst = rowData['iGst'];
								            	 var taxAmt = rowData['taxAmt'];
								            	 var finalTotalPerProduct = rowData['finalTotalPerProduct'];
								            	 
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
								            	 {
								            		 	editQuantity = 0;
								            		 	var setZero = "00";
							                    		$("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero);
							                    		return false;
								            	 }
								            	 
								            	 if(editQuantity == "0" || editQuantity == "")
								            	 {
								            		var setZero = "00";
		 				                    		$("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero);							            		 
								            	 }
								            	 
								            	 
								            	 /*
									            	 if(Number(editQuantity) > Number(quantity))
									            	 {
									            		 alert("Return Quantity Is Greater Than Quantity");
									            		 var setZero = "00";
								                    	 $("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero)
									            		 return false;
									            	 }
									            	 var afterquantity = quantity - editQuantity;
									            	 var tota = afterquantity * finalTotalPerProduct;//salePrice;
									            	 var total1 = editQuantity * finalTotalPerProduct;//salePrice;
	
									            	 $("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", total1);
	
									            	 if(tota == 0)
									            	 {
									            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", tota);
									            	 }
									            	 else
									            	 {
									            		 var gross = ((discount/100)*tota) + tota;
									            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", gross);
									            	 }
	
									            	 $("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", tota);								            	 
								            	 */
								            	 
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
/*
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
*/
								            	 document.getElementById("totalAmountCC").value = parseTotal;
								            	 document.getElementById("grossTotalCC").value = +((+parseTotal) - (+v.oldCashAmount + +v.oldCardAmount + +v.totalSaleReturnAmt));								            	 
								            	 },
								            // footerrow: true, // set a footer row

								             gridComplete: function()
								             {
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
/*								            	 
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
*/
								            	 document.getElementById("totalAmountCC").value = parseTotal.toFixed(2);
								            	 document.getElementById("grossTotalCC").value = +((+parseTotal) - (+v.oldCashAmount + +v.oldCardAmount + +v.totalSaleReturnAmt)).toFixed(2);
								            },

								             pager : "#jqGridPager1",

							});

					$("#jqGrid1").addRowData(i, jsonData[i]);

					$('#jqGrid1')
					.navGrid(
							'#jqGridPager1',
							// the buttons to appear on the toolbar of the grid
							{ edit: true, add: true, del: false, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
							// options for the Edit Dialog
							{
								editCaption : "The Edit Dialog",
								recreateForm : true,
								checkOnUpdate : true,
								checkOnSubmit : true,
								closeAfteredit : true,
								errorTextFormat : function(data) {
									return 'Error: '
									+ data.responseText
								}
							},

							{},

							// options for the Delete Dailog
							{
								closeAfterdel:true,
								recreateForm: true,
								afterComplete: function() {
									$('#jqGrid1').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGrid1").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid1").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var salePrice = rowData['salePrice'];
					            	 var discount = rowData['discount'];
					            	 if(Number(editQuantity) > Number(quantity))
					            	 {
					            		 alert("Return Quantity Is Greater Than Quantity");
					            	 }
					            	 var afterquantity = quantity - editQuantity;
					            	 var tota = afterquantity * salePrice;
					            	 var total1 = editQuantity * salePrice;

					            	 $("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", total1);

					            	 if(tota == 0){

					            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", tota);
					            	 }
					            	 else
					            	 {
					            		 var gross = ((discount/100)*tota) + tota;
					            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", gross);
					            	 }

					            	 $("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", tota);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
					            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
					            	 
					            	 document.getElementById("totalAmountCC").value = parseTotal.toFixed(2);	
					            	 document.getElementById("grossTotalCC").value = +((+parseTotal) - (+v.oldCashAmount + +v.oldCardAmount + +v.totalSaleReturnAmt)).toFixed(2);
								},
								errorTextFormat: function (data) {
									return 'Error: ' + data.responseText
								},
								onSelectRow: function(id) {
									if (id && id !== lastSel) {
										jQuery("#jqGrid1").saveRow(lastSel, true, 'clientArray');
										jQuery("#jqGrid1").editRow(id, true);
										lastSel = id;
										console.log(id);
									}
								}
							});
				});

			}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
				}
			});
}




















//************************ Edit Sale Invoce New Code *************************/


function getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling()
{
	
	var billNo = $('#billNoBW').val();
	
	if(billNo == "" ||billNo == " " ||billNo == undefined || billNo == null)
	{
		myAlert("Please Enter Bill Number !!!");
		document.getElementById("key").value = "";
		document.getElementById("itemName").value = "";
		return false;
	}
	
	$("#totalQuantity").append($("<input/>").attr("value","").text());
	$("#totalAmount").append($("<input/>").attr("value","").text());
	$("#discount").append($("<input/>").attr("value","").text());
	$("#paymentMode").append($("<input/>").attr("value","").text());
	
	$("#creditCustomer1").append($("<input/>").attr("value","").text());
	$("#CustGst").append($("<input/>").attr("value","").text());
	$("#mobileNo").append($("<input/>").attr("value","").text());
	$("#grossTotal").append($("<input/>").attr("value","").text());
	
	var params= {};
	params["billNo"]= billNo;
	params["methodName"] = "getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
					
					document.getElementById("totalQuantity").value = v.totalAmount;
					document.getElementById("totalAmount").value = v.totalAmount;
					//document.getElementById("discount").value = v.totalAmount;//totalDiscount;
					document.getElementById("paymentMode").value = v.paymentMode;
					
					//alert("v.oldUpiAmount :- "+v.oldUpiAmount);
					
					/*$(document).ready(function(){
						$("#paymentMode").change(function(){
							$(this).find("option:selected").each(function(){*/
					if($(this).attr("paymentMode")=="cheque")
					{
						$("#cheque_no").show();
						$("#neft_acc_no").hide();
						$("#card_no").hide();
						$("#cash_and_card").hide();
						$("#card_without_cash").hide();
						$("#upi_withaout_cash").hide();
						$("#cash_and_upi").hide();
					}
					else if($(this).attr("paymentMode")=="card")
					{
						$("#card_without_cash").show();
						$("#cash_and_card").hide();
						$("#card_no").hide();
						$("#neft_acc_no").hide();
						$("#cheque_no").hide();
						$("#upi_withaout_cash").hide();
						$("#cash_and_upi").hide();
						//document.getElementById("cashCard_cashAmount").value = v.oldCashAmount;
						document.getElementById("cashCard_cardAmount").value = v.oldCardAmount;
					}
					else if($(this).attr("paymentMode")=="neft")
					{
						$("#neft_acc_no").show();
						$("#card_no").hide();
						$("#cheque_no").hide();
						$("#card_without_cash").hide();
						$("#cash_and_card").hide();
						$("#upi_withaout_cash").hide();
						$("#cash_and_upi").hide();
					}
					else if($(this).attr("paymentMode")=="cash")
					{
						$("#neft_acc_no").hide();
						$("#cheque_no").hide();
						$("#card_no").hide();
						$("#card_without_cash").hide();
						$("#cash_and_card").hide();
						$("#upi_withaout_cash").hide();
						$("#cash_and_upi").hide();
					}
					else if($(this).attr("paymentMode")=="cashAndCard")
					{
						$("#cash_and_card").show();
						$("#card_without_cash").hide();
						$("#neft_acc_no").hide();
						$("#cheque_no").hide();
						$("#card_no").hide();
						$("#cash_and_upi").hide();
						document.getElementById("cashCard_cashAmount").value = v.oldCashAmount;
						document.getElementById("cashAndCard_cardAmount").value = v.oldCardAmount;
					}
					else if($(this).attr("paymentMode")=="cashAndupi")
					{
						$("#cash_and_upi").show();
						$("#upi_withaout_cash").hide();
						$("#card_without_cash").hide();
						$("#cash_and_card").hide();
						$("#neft_acc_no").hide();
						$("#cheque_no").hide();
						$("#card_no").hide();
						document.getElementById("cashCard_cashAmount1").value = v.oldUpiCashAmount;
						document.getElementById("cashAndCard_upiAmount").value = v.oldUpiAmount;
					}
					else if($(this).attr("paymentMode")=="Upi")
					{
						$("#upi_withaout_cash").show();
						$("#cash_and_upi").hide();
						$("#card_without_cash").hide();
						$("#cash_and_card").hide();
						$("#card_no").hide();
						$("#neft_acc_no").hide();
						$("#cheque_no").hide();
						//document.getElementById("cashCard_cashAmount1").value = v.oldUpiCashAmount;
						document.getElementById("cashCard_upiAmount").value = v.oldUpiAmount;
					}
					/* });
					}).change();
					});*/
					
					//document.getElementById("paymentMode").value = v.paymentMode;
					//document.getElementById("oldCashAmount").value = v.oldCashAmount;
					//document.getElementById("oldCardAmount").value = v.oldCardAmount;
					//document.getElementById("oldUpidAmount").value = v.oldUpiAmount;
					//document.getElementById("oldUPIAmount").value = v.oldUpiCashAmount;
					document.getElementById("creditCustomer1").value = v.creditCustomerName;
					document.getElementById("CustGst").value = v.customerGstNo;
					if(v.customerMobileNo == "0")
					{
						document.getElementById("mobileNo").value = "";
					} else {
						document.getElementById("mobileNo").value = v.customerMobileNo;
					}
					document.getElementById("grossTotal").value = v.grossTotal;
					//document.getElementById("finalCreditAmount").value = v.totalSaleReturnAmt;
					
					/*document.getElementById("billNo").value = v.billNo;
			      	document.getElementById("supplierId").value = v.supplierDetails;
			      	document.getElementById("pDate").value = v.purchaseDate;*/
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});

}

function getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBillingValidation()
{
	var billNo = $('#billNoBW').val();
	
	if(billNo == "" ||billNo == " " ||billNo == undefined || billNo == null)
	{
		myAlert("Please Enter Bill Number !!!");
		document.getElementById("key").value = "";
		document.getElementById("itemName").value = "";
		return false;
	}
	getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBilling();
}

//getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBilling
function getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBilling()
{
	var rowDelete = 0;
	var params= {};
	document.getElementById("discount").value = "";
	/* document.getElementById("discount1").value = ""; */
	
	var billNo = $('#billNoBW').val();
	
	var value = document.getElementById("key").value;
	var carNo = $('#carNo').val();
	// getEmpName();
	
	
	if(value == null || value == "" || value == " " || value == undefined)
	{
		var input = document.getElementById('itemName'), list = document
		.getElementById('itemId_drop'), i,barcodeNo, catName, itemName, hsnsacno, productId, size;
		for (i = 0; i < list.options.length; ++i)
		{
			if (list.options[i].value === input.value)
			{
				catName = list.options[i].getAttribute('data-value');
				itemName = list.options[i].getAttribute('myvalue');
				subcatId = list.options[i].getAttribute('myvalue1');
				productId = list.options[i].getAttribute('myvalue2');
				size = list.options[i].getAttribute('myvalue4');
				fkCatId = list.options[i].getAttribute('myvalue5');
				barcodeNo = list.options[i].getAttribute('myvalue6');
			}
		}
		params["productId"] = productId;
		params["barcodeNo"] = barcodeNo;
		
		var billNoSetEmpty = "Empty";
		if(productId != undefined)
		{
			billNo = billNoSetEmpty;
		}
	} else {
		params["key"]=value;
		
		var billNoSetEmpty = "Empty";
		if(value != null || value != "" || value != " " || value != undefined)
		{
			billNo = billNoSetEmpty;
		}
	}
	
	params["billNo"] = billNo;
	params["methodName"] = "getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBilling";
	document.getElementById('key').value = null;
	document.getElementById('itemName').value = null;
	
	
	var count=0;
	var newrow;
	var rowId;
	var vatAmt = 0;
	var totAmt = 0;
	var totalWithoutTax = document.getElementById("totalAmount").value;
	var totalWithTax = 0;
	var tot = 0;
	var afterDelete;
	
	//var count=0;
	//var newrow;
	//var rowId;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		var result = data.length;
		if(result <= "0")
		{
			myAlertFocusToKey("STOCK NOT AVAILABLE FOR "+value+" !!!");
			return true;
		}

		$.each(jsonData,function(i,v)
		{
			count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
			var rowdata =$("#list4").jqGrid('getGridParam','data');
			var ids = jQuery("#list4").jqGrid('getDataIDs');
			
			function sumFmatter (cellvalue, options, rowObject)
			{					
				var totalWithoutTax = document.getElementById("totalAmount").value;
				var count = jQuery("#list4").jqGrid('getGridParam', 'records');
				var allRowsInGrid1 = $('#list4').getGridParam('data');
				var rowId =$("#list4").jqGrid('getGridParam','selrow');
				// var rowData = jQuery("#list4").getRowData(rowId);
				var AllRows=JSON.stringify(allRowsInGrid1);
				// var grossTotal = 0;
									
				var total = 0;				
				
				var tota = 0;
				var vatAmt = 0;
				var disAmt = 0;
				var finalSP = 0;
				var newTaxAmt = 0;
				var newSalePrice = 0;
				var newFinalSP = 0;
				var disPer = 0;
				var gst = 0;
				var salePrice = 0;
				var quantity = 0;				
				var grossTotal = 0;
				var grossDisTotal = 0;
				var disAmt = 0;
				
				if(rowDelete > 0)
				{
					for(var a = 0; a <= count-1; a++)
					{							
						if(a == count)
						{break;}
						else
						{
							if(a == count)
							{break;}
							
							total = allRowsInGrid1[a].total;
			        		grossTotal = +grossTotal + +total;				        							 
						}
					}
					document.getElementById("totalAmount").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
					document.getElementById("grossTotal").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
				}
				
				if(+rowDelete == 0)
				{
		        	for (var a = 0; a <= count; a++)
					{
						total = allRowsInGrid1[a].total;
		        		grossTotal = +grossTotal + +total;
		        		
		        		disAmt = allRowsInGrid1[a].disAmount;
					    grossDisTotal = +grossDisTotal + +disAmt
		        	}
					document.getElementById("totalAmount").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
					document.getElementById("grossTotal").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
					document.getElementById("discount").value = grossDisTotal.toFixed(2);// Math.round(totalWithoutTax);
				}
				return total;
			}
			
			getEmpName();
			var empname = first;
			
			
			
			 var prodName,com,packing,unit;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].ItemName;
				  
				
				 var rowId = ids[j];
				 var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				 newrow = true;
				/*
				if (prodName == jsonData.offer.ItemName ) {
			    	
			    	newrow=false;
					alert("Product Name Already Inserted !!!");
					var grid = jQuery("#jqGrid");
				    grid.trigger("reloadGrid");
			    	break;
				}
				else
				{
					newrow = true;
				}*/
			 }
			
			if(newrow == true)
			{
				//document.getElementById("totalQuantity1").value = totalQty+1;
				$("#list4").addRowData(count,jsonData.offer);			
			}			
			
			$("#list4").jqGrid({
				
				datatype: "local",
				
				colNames:[	'Bill No','pk_temp_id','item_id','Barcode<br>Number','fkProductId','Product<br>Name','fkCategoryId','Category',
							'fkSubCatId','Sub<br>Category', 'HSN/<br>SAC','Roll<br>Size','Size','Style','Good Receive<br>Quantity',
							'Available<br>Quantity', 'old Sale Quantity<br>To Update Stock', 'Quantity','S.P./<br>Unit','fixedSalePrice','S.P.<br>W/O Tax',
							'Discount<br>%','Discount<br>Amount','S.P.<br>After Dis','GST<br>%','IGST<br>%','Tax Amount',
							'Tax Amount<br>After Dis','Total<br>Amount','Employee<br>Name','forTotal','fkSuppId'
				],
				//autoheight: true,
				colModel:[
							{
								name:'billNo',
								width:100,
								//hidden:true,
							},
							{
								name:'pk_temp_id',
								hidden:true,
							},
							{
								name:'item_id',
								hidden:true,
							},
							{
								name:'barcodeNo',
								width:100,
								sortable: false,
							},
							{
								name:'fkProductId',
								//width:40,
								hidden:true,
							},
							{
								name:'itemName',
								width:200,
								sortable: false,
							},
							{
								name:'fkCategoryId',
								//width:40,
								hidden:true,
							},
							{
								name:'categoryName',
								width:150,
								sortable: false,
							},
							{
								name:'fkSubCatId',
								//width:40,
								hidden:true,
							},
							{
								name:'subCategoryName',
								width:150,
								sortable: false,
							},
							{
								name:'hsnSacNo',
								width:100,
								sortable: false,
							},
							{
								name:  "rollSize",
								hidden:true,
							},
							{
								id:'size1',
								name:'size1',
								width:100,
								//editable: true,
								sortable: false,
							},
							{
								name:'style',
								width:100,
							},
							{
								name:'goodReceiveQuantity',
								width:80,
								hidden:true,
							},
							{
								name:'stockQuantity',
								width:100,
								editable: false,
								//hidden:true,
							},
							{
								name:'oldSaleQuantityToUpdateStock',
								width:100,
								editable: false,
								hidden:true,
							},
							{
								name:'quantity',
								width:100,
								editable: true,
								sortable: false,
								classes: 'myBackGroundColor',
								editoptions:{
									dataInit: function(element)
									{
										$(element).keypress(function(e)
										{
											var charCode = (e.which) ? e.which : e.keyCode;
											if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57)))
											{
												return false;
											}
										});
									}
								}
							},
							{
								name:'salePrice',
								width:130,
								sortable: false,
								editable: true,
								classes: 'myBackGroundColor',
								editoptions:{
									dataInit: function(element)
									{
										$(element).keypress(function(e)
										{
											var charCode = (e.which) ? e.which : e.keyCode;
											if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57)))
											{
												return false;
											}
										});
									}
								}
							},
							{
								name:'fixedSalePrice',
								//width:100,
								sortable: false,
								hidden: true,
							},
							{
								name:'sPWithoutTax',
								width:130,
								sortable: false,
								//hidden:true
							},
							{
								name:'disPerForBill',
								width:80,
								sortable: false,
								editable: true,
								classes: 'myBackGroundColor',
								editoptions:{
									dataInit: function(element)
									{
										$(element).keypress(function(e)
										{
											var charCode = (e.which) ? e.which : e.keyCode;
											if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57)))
											{
												return false;
											}
										});
									}
								}
								//hidden:true
							},
							{
								name:'disAmount',
								width:120,
								sortable: false,
							},
							{
								name:'spAfterDis',
								width:120,
								sortable: false,
								//hidden:true,
								//editable: true
							},
							{
								name:'vat',
								width:80,
								sortable: false,
								editable: true
							},
							{
								name:'igst',
								//width:80,
								sortable: false,
								//editable: true,
								hidden:true,
							},
							{
								name:'taxAmount',
								width:105,
								sortable: false,
								//hidden: true,
							},
							{
								name:'taxAmountAfterDis',
								width:120,
								sortable: false,
								hidden: true,
							},
							{
								name:'total',
								width:150,
								sortable: false,
								//formatter: sumFmatter,
								classes: 'myBackGroundColor',
							},
							{
								name:'employeeName1',//this is for take drop down in grid
								width:200,
								align:'center',
								sortable: false,
								editable:true,
								edittype: 'select',
								editoptions: { value:empname}
							},
							{
								name:  "forTotal",
								sortable: false,
								//formatter: sumFmatter,
								hidden:true,
							},
							{
								name:  "fkSuppId",
								sortable: false,
								hidden:true,
							},
				],
				
				sortorder : 'desc',
				loadonce: false,
				viewrecords: true,
				width: 2000,
				/*height: 350,
				rowheight: 300,*/
				shrinkToFit: true,
				hoverrows: true,
				rownumbers: true,
				rowNum: 30,
				'cellEdit':true,
				
				afterSaveCell: function ()
				{
					//var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
					
					document.getElementById("discount").value = "";
					//document.getElementById("discount1").value = "";
					var rowId =$("#list4").jqGrid('getGridParam','selrow');
					var rowData = jQuery("#list4").getRowData(rowId);
					
					var stockQuantity = rowData['stockQuantity'];
					var quantity = rowData['quantity'];
					var salePrice = rowData['salePrice'];
					var fixedSalePrice = rowData['fixedSalePrice'];
					var gst = rowData['vat'];
					var barcodeNo = rowData['barcodeNo'];
					var size1 = rowData['size1'];
					var sPWithoutTax = rowData['sPWithoutTax'];
					var disPer = rowData['disPerForBill'];
					var disAmount = rowData['disAmount'];
					var taxAmountAfterDis = rowData['taxAmountAfterDis'];
					var total = rowData['total'];
					var tota = 0;
					var vatAmt = 0;
					var totAmt = 0;
					var roundOfftota = 0;
					var roundOffvatAmt = 0;
					var totSPWtax = 0;
					var disAmt = 0;
					var finalSP = 0;
					var spWDis = 0;
					var newTaxAmt = 0;
					var newSalePriceAfterDiscount = 0;
					var newSalePriceForOneItem = 0;
					var newSalePrice = 0;
					var newFinalSP = 0;
					var finalSalePrice = salePrice;
					var finalSpWithoutTax = sPWithoutTax;
					var spForOneItemAfterDisCal = 0;
						spForOneItemAfterDisCal = salePrice;
					var newSalePriceWithoutTax = 0;
					var taxAmountForOneItem = 0;
					var salePriceForOneItemWithaoutTax = 0;
					var checkValue = /^[0-9]+\.?[0-9]*$/;
					var setQty = 1;
					var setZero = "0";
					
					var sizeUp = size1.toUpperCase();
					//alert("quantity :- "+quantity);
					//alert("stockQuantity :- "+stockQuantity);
					
					if(quantity != "" || quantity != '0' || quantity != null || quantity != undefined)
					{
						if(quantity.match(checkValue))
						{
							if(Number(quantity) > Number(stockQuantity))
							{
								myAlert("Quantity should be less than or equal to Available Quantity");
								$("#list4").jqGrid("setCell", rowId, "quantity", setQty);
								quantity = setQty;
							}
						} else {
							alert("Please Enter Valid Quantity 1111 :- "+quantity+" Stock Quantity :- "+stockQuantity);
							$("#list4").jqGrid("setCell", rowId, "quantity", setQty);
							//quantity = setQty;
						}
					}
					
					if(salePrice == "" || salePrice == '0' || salePrice == null || salePrice == undefined)
					{} else {
						if(salePrice.match(checkValue))
						{}
						else
						{
							myAlert("Please Enter Valid S,P./Unit");
							$("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
							salePrice = setZero;
						}
					}
					
					//Calcutale Total Amount
					tota = quantity * salePrice;
					totAmt = quantity * salePrice;
					newSalePriceForOneItem = salePrice;
					spForOneItemAfterDisCal  = salePrice;
					salePriceForOneItemWithaoutTax = salePrice;
					finalSP = tota;
					
					var checkSp = /^[0-9]+\.?[0-9]*$/;
					if(salePrice.match(checkSp))
					{
						if(Number(salePrice) > 0)
						{
							//spwTax = (salePrice/(1+(gst/100)));
							spwTax = salePrice;
							$("#list4").jqGrid("setCell", rowId, "fixedSalePrice", salePrice);
							$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", spwTax);
							$("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
						} else {
							var setZero = 0;
							$("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
							$("#list4").jqGrid("setCell", rowId, "fixedSalePrice", setZero);
							$("#list4").jqGrid("setCell", rowId, "sPWithoutTax",setZero);
							$("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
							$("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
							$("#list4").jqGrid("setCell", rowId, "total", setZero);
							$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
							return false;
						}
					} else {
						var setZero = 0;
						myAlert("Pleae Enter Valid Sale Price");
						$("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
						$("#list4").jqGrid("setCell", rowId, "fixedSalePrice", setZero);
						$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);
						$("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						$("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
						$("#list4").jqGrid("setCell", rowId, "total", setZero);
						$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						return false;
					}
					
					if(disPer == "" || disPer == '0' || disPer == null || disPer == undefined)
					{
						$("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
						$("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						$("#list4").jqGrid("setCell", rowId, "spAfterDis", spForOneItemAfterDisCal);
							
						//spForOneItemAfterDisCal  = tota;
						//finalSP = tota;
					} else {
						if(disPer.match(checkValue))
						{
							if(Number(disPer) >= 100)
							{
								var setZero = 0;
								myAlert("Discount Percentage Must Be Less Than 100");
								$("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
								$("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
								$("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
								$("#list4").jqGrid("setCell", rowId, "spAfterDis", spForOneItemAfterDisCal);
								$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
								//totalCalC();
								//totalDisC();
								return false; 
							}
							else
							{
								if(Number(disPer) > 0)
								{
									//disAmt = (spwTax*(disPer/100));
									disAmt = (tota/100)*disPer;
									newSalePriceAfterDiscount = tota - disAmt;
									spForOneItemAfterDisCal = newSalePriceAfterDiscount/quantity;
									//$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", spwTax);
									$("#list4").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2));
									$("#list4").jqGrid("setCell", rowId, "spAfterDis", spForOneItemAfterDisCal.toFixed(2));
									$("#list4").jqGrid("setCell", rowId, "total", newSalePriceAfterDiscount.toFixed(2));
								} else {
									newSalePriceAfterDiscount = tota;
									var setZero = 0;
									$("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									$("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
									$("#list4").jqGrid("setCell", rowId, "spAfterDis", spForOneItemAfterDisCal);
									$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									//spForOneItemAfterDisCal  = tota;
									//spForOneItemAfterDisCal  = salePrice;
								}
							}
						} else {
							newSalePriceAfterDiscount = tota;
							myAlert("Please Enter Valid Discount %");
							$("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
							$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", spForOneItemAfterDisCal.toFixed(2));
							disPer = setZero;
							//spForOneItemAfterDisCal  = tota;
						}
					}
					
					if(Number(spForOneItemAfterDisCal) > 0)
					{
						if(Number(gst == 0) && Number(spForOneItemAfterDisCal) > 0 && Number(spForOneItemAfterDisCal) <= 1000)
						{
							gst = 5;
							$("#list4").jqGrid("setCell", rowId, "vat", gst);
							if(newSalePriceAfterDiscount > 0)
							{
								//(sp-(sp/(1+(gstPer/100))));
								newTaxAmt = (newSalePriceAfterDiscount/100)*gst;
								//finalSP = newSalePrice + newTaxAmt;
								finalSP = newSalePriceAfterDiscount;
								taxAmountForOneItem = newTaxAmt/quantity;
								newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
							} else {
								newTaxAmt = (finalSP/100)*gst;
								//finalSP = finalSP + newTaxAmt;
								taxAmountForOneItem = newTaxAmt/quantity;
								newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
							}
							$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newSalePriceWithoutTax.toFixed(2));
							$("#list4").jqGrid("setCell", rowId, "taxAmount", newTaxAmt.toFixed(2));
							$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2));
							$("#list4").jqGrid("setCell", rowId, "total", finalSP.toFixed(2));
							
						} else if(Number(gst == 0) && Number(spForOneItemAfterDisCal) > 0 && Number(spForOneItemAfterDisCal) > 1000) {
							gst = 12;
							$("#list4").jqGrid("setCell", rowId, "vat", gst);
							if(newSalePriceAfterDiscount > 0)
							{
								newTaxAmt = (newSalePriceAfterDiscount/100)*gst;
								//finalSP = newSalePriceAfterDiscount + newTaxAmt;
								finalSP = newSalePriceAfterDiscount;
								taxAmountForOneItem = newTaxAmt/quantity;
								newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
							} else {
								newTaxAmt = (finalSP/100)*gst;
								//finalSP = finalSP + newTaxAmt;
								taxAmountForOneItem = newTaxAmt/quantity;
								newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
							}
							$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newSalePriceWithoutTax.toFixed(2));
							$("#list4").jqGrid("setCell", rowId, "taxAmount", newTaxAmt.toFixed(2));
							$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2));
							$("#list4").jqGrid("setCell", rowId, "total", finalSP.toFixed(2));
						} else {
							if(newSalePriceAfterDiscount > 0)
							{
								newTaxAmt = (newSalePriceAfterDiscount/100)*gst;
								//finalSP = newSalePriceAfterDiscount + newTaxAmt;
								finalSP = newSalePriceAfterDiscount;
								taxAmountForOneItem = newTaxAmt/quantity;
								newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
							} else {
								newTaxAmt = (finalSP/100)*gst;
								//finalSP = finalSP + newTaxAmt;
								taxAmountForOneItem = newTaxAmt/quantity;
								newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
							}
							$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newSalePriceWithoutTax.toFixed(2));
							$("#list4").jqGrid("setCell", rowId, "taxAmount", newTaxAmt.toFixed(2));
							$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2));
							$("#list4").jqGrid("setCell", rowId, "total", finalSP.toFixed(2));
						}
					}
					//Calculate Total Amount And Discount
					totalCalC();
					totalDisC();
		        	 
					/////functtions
		        	function totalCalC()
			        {
		        	  var Total = 0;
		        	  var totAmtWithTax = 0;
		        	  var totCreditAmt = document.getElementById("totalCreditAmt").value;
		        	  if(totCreditAmt == "")
		        	  {
		        		  totCreditAmt = 0;
		        	  }else{}				        	  
		        	  var grossTotal = document.getElementById("grossTotal").value;
		        	  var count = jQuery("#list4").jqGrid('getGridParam', 'records');
		        	  var allRowsInGrid1 = $('#list4').getGridParam('data');
		        	  var AllRows=JSON.stringify(allRowsInGrid1);
		        	  
		        	  for (var k = 0; k < count; k++)
		        	  {
		        		  var Total1 = allRowsInGrid1[k].total;
		        		  if(Total1 != undefined)
		        		  {
		        			  Total = +Total + +Total1;
		        		  }
		        	  }
		        	  
		        	  document.getElementById("totalAmount").value = Total.toFixed(2);// Math.round(Total);
		        	  var updateGT = (+Total - +totCreditAmt).toFixed(2);
		        	  var totAmt  = document.getElementById("totalAmount").value;
		        	  
		        	  document.getElementById("grossTotal").value = updateGT;
		        	  var totAmount = Total.toFixed(2);// Math.round(Total);
			        }
		        	  
		        	function totalDisC()
			        {
			        	  // TOTAL DISCOUNT AMOUNT
			        	  var TotalDisAmt = 0;
			        	  var TotalSPAmt = 0;
			        	  var disPer = 0;
			        	  var totCreditAmt = document.getElementById("totalCreditAmt").value;
			        	  var totalAmount = document.getElementById("totalAmount").value;
			        	  if(totCreditAmt == "")
			        	  {
			        		  totCreditAmt = 0
			        	  }else{}
			        	  var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			        	  var allRowsInGrid1 = $('#list4').getGridParam('data');
			        	  var AllRows=JSON.stringify(allRowsInGrid1);
			        	  for (var l = 0; l < count; l++)
			        	  {
			        		  var TotalDisAmt1 = allRowsInGrid1[l].disAmount;
			        		  var TotalSPAmt1 = allRowsInGrid1[l].sPWithoutTax;
			        		  
			        		  if(TotalSPAmt1 != undefined)
			        		  {
			        			  TotalSPAmt = (+TotalSPAmt + +TotalSPAmt1).toFixed(2);
			        		  }
			        		  if(TotalDisAmt1 != undefined)
			        		  {
			        			  TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
			        			  disPer = ((TotalDisAmt/TotalSPAmt)*100).toFixed(2);
			        		  }
			        	  }
			        	  var updateGT = (+totalAmount - +totCreditAmt).toFixed(2);
			        	 
			        	  document.getElementById("grossTotal").value = updateGT;
			        	  document.getElementById("discount").value = TotalDisAmt;
		        	 }
		        	
		        	 function rangeGst(checkPrice)
		        	 {
		        		 if(+checkPrice > 0 && +checkPrice <= 1000)
	        			  {
	        				  gst = 5;
	        				  $("#list4").jqGrid("setCell", rowId, "vat", gst);
	        			  }
	        			  else if(+checkPrice > 1000)
	        			  {
	        				  gst = 12;
	        				  $("#list4").jqGrid("setCell", rowId, "vat", gst);
	        			  }
	        			  else
	        			  {
	        				  gst = 0;
	        				  $("#list4").jqGrid("setCell", rowId, "vat", gst);
	        			  }
		        	 }
				},
				
				gridComplete: function()
				{
					var totalAmount = document.getElementById("totalAmount").value;
					var totCreditAmt = document.getElementById("totalCreditAmt").value;
					if(totCreditAmt == "")
					{
						document.getElementById("grossTotal").value = totalAmount;
					}
					else if(totCreditAmt > 0)
					{
						var gtUpdated = +totalAmount - +totCreditAmt;
						if(+gtUpdated < 0)
						{
							myAlert("Total Amount Is Less Than Total Credit Amount");
							document.getElementById("grossTotal").value = gtUpdated;
						} else {
							document.getElementById("grossTotal").value = gtUpdated;
						}
					}
				},
				
				pager: "#jqGridPager",
			});
			
			if(count==0 || count==null)
			{
				$("#list4").addRowData(0,jsonData.offer);
				document.getElementById("totalQuantity").value = 1;
			}
			
			$('#list4').navGrid('#jqGridPager',
				{ edit: true, add: false, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
					{
						editCaption: "The Edit Dialog",
						afterSubmit: function()
						{
							$('#list4').trigger( 'reloadGrid' );
							var grid = $("#list4"), intervalId = setInterval(function() {
							         grid.trigger("reloadGrid",[{current:true}]);
							   },
							   500);
						},
						recreateForm: true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						closeAfterEdit: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					},
					{
						afterSubmit: function()
						{
							$('#list4').trigger('reloadGrid');
						},
						closeAfterAdd: true,
						recreateForm: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					},
					{
						closeAfterdel : true,
	                	checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
						afterComplete: function()
						{
							rowDelete++;
							
							document.getElementById("discount").value = "";	
							document.getElementById("totalQuantity").value = (+document.getElementById("totalQuantity").value - +1);
							$('#list4').trigger('reloadGrid');
							
							rowDelete = 0;
							
							totalCalC();
				        	totalDisC();
				        	  
				        function totalCalC()
					    {	
			        	  var Total = 0;
			        	  var totAmtWithTax = 0;
			        	  var totalCreditAmt = document.getElementById("totalCreditAmt").value;
			        	  if(totalCreditAmt == "")
			        	  {
			        		  totalCreditAmt = 0;
			        	  }
			        	  var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			        	  var allRowsInGrid1 = $('#list4').getGridParam('data');
			        	  var AllRows=JSON.stringify(allRowsInGrid1);
			        	  
			        	  for (var k = 0; k < count; k++)
			        	  {
			        		  var Total1 = allRowsInGrid1[k].total;
			        		  if(Total1 != undefined)
			        		  {
			        			  Total = +Total + +Total1;
			        		  }
			        	  }
			        	  for (var j = 0; j < count; j++)
			        	  {
			        		  var Total2 = allRowsInGrid1[j].taxAmount;
			        		  var Total3 = allRowsInGrid1[j].total;
			        		  if(Total2 != undefined)
			        		  {
			        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
			        		  }
			        	  }
			        	  document.getElementById("totalAmount").value = Total.toFixed(2);// Math.round(Total);
			        	  var gtUpdate = (+Total - +totalCreditAmt).toFixed(2);
			        	  if(+gtUpdate < 0)
			        	  {
			        		  myAlert("Total Credit Amount is Greater Than Total Bill Amount");
			        		  document.getElementById("grossTotal").value = gtUpdate;
			        	  }
			        	  else
			        	  {
				        	  document.getElementById("grossTotal").value = gtUpdate;		        		  
			        	  }

			        	  var totAmount = Total.toFixed(2);// Math.round(Total);
					    }
				        	  
			        	function totalDisC()
				        {
			        	  // TOTAL DISCOUNT AMOUNT
			        	  var TotalDisAmt = 0;
			        	  var TotalSPAmt = 0;
			        	  var disPer = 0;
			        	  var count = jQuery("#list4").jqGrid('getGridParam', 'records');
			        	  var allRowsInGrid1 = $('#list4').getGridParam('data');
			        	  var AllRows=JSON.stringify(allRowsInGrid1);
			        	  for (var l = 0; l < count; l++)
			        	  {
			        		  var TotalDisAmt1 = allRowsInGrid1[l].disAmount;
			        		  var TotalSPAmt1 = allRowsInGrid1[l].sPWithoutTax;
			        		  
			        		  if(TotalSPAmt1 != undefined)
			        		  {
			        			  TotalSPAmt = (+TotalSPAmt + +TotalSPAmt1).toFixed(2);
			        		  }
			        		  if(TotalDisAmt1 != undefined)
			        		  {
			        			  TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
			        			  disPer = ((TotalDisAmt/TotalSPAmt)*100).toFixed(2);
			        		  }						        	 
			        	  }
			        	  document.getElementById("discount").value = TotalDisAmt;
				        }

					},
						/*closeAfterdel:true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,*/
						reloadAftersubmit:true, 
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					});
				});
			})
}


function editSaleInvoceBillingValidation()
{
	var billNo = $('#billNoBW').val();
	
	var mobileno = $('#mobileNo').val();
	var key = $('#key').val();
	var monoPattern = /^\d{10}$/;
	var monoPatternRes = monoPattern.test(mobileno);
	cashupi_cashAmount = $('#cashupi_cashAmount').val();
	cashCard_upiAmount = $('#cashCard_upiAmount').val();
	
	if(billNo == "" ||billNo == " " ||billNo == undefined || billNo == null)
	{
		myAlert("Please Enter Bill Number !!!");
		//document.getElementById("key").value = "";
		//document.getElementById("itemName").value = "";
		return false;
	}
	
	//alert(cashupi_cashAmount+cashCard_upiAmount);
	/*
	 * if (document.custord.employee1.value == "") { myAlert("Select Employee
	 * Name."); return false; }
	 */
	/*
	 * if (document.custord.creditCustomer1.value == "") { myAlert("Please Enter
	 * Customer Name."); return false; }
	 */
	if(mobileno == null || mobileno == "" || mobileno == " ")
	{
		editSaleInvoceBilling();
	}
	else
	{
		if(monoPatternRes)
		{
			editSaleInvoceBilling();
		}
		else
		{
			myAlert("Enter Valid 10 Digit Moible Number");
		}
	}
		/*
		 * } else { myAlert("Please Enter mobile number !"); }
		 */
}

function editSaleInvoceBilling()
{
	/* document.getElementById("btnSubmit").disabled = true; */
	document.custord.btnSubmit.disabled = true;
	var params= {};
	
	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	if(count == "0" || count == null || count == undefined || count == "")
	{
		myAlert("Please Enter Barcode");
		document.custord.btnSubmit.disabled = false;
		return false;
	}
	var allRowsInGrid1 = $('#list4').getGridParam('data');
	var AllRows=JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++)
	{
		var barcodeNo = allRowsInGrid1[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
				
		var pk_temp_id = allRowsInGrid1[i].pk_temp_id;
		params["pk_temp_id"+i] = pk_temp_id;

		var item_id = allRowsInGrid1[i].item_id;
		params["item_id"+i] = item_id;

		var fkProductId = allRowsInGrid1[i].fkProductId;
		params["fkProductId" + i] = fkProductId;

		var itemName = allRowsInGrid1[i].itemName;
		params["itemName"+i] = itemName;
		
		var fkCategoryId = allRowsInGrid1[i].fkCategoryId;
		params["fkCategoryId" + i] = fkCategoryId;
		
		var categoryName = allRowsInGrid1[i].categoryName;
		params["categoryName"+i] = categoryName;
		
		var fkSubCatId = allRowsInGrid1[i].fkSubCatId;
		params["fkSubCatId" + i] = fkSubCatId;
		
		var subCategoryName = allRowsInGrid1[i].subCategoryName;
		params["subCategoryName" + i] = subCategoryName;
		
		var hsnSacNo = allRowsInGrid1[i].hsnSacNo;
		params["hsnSacNo"+i] = hsnSacNo;
		
		var oldSaleQuantityToUpdateStock = allRowsInGrid1[i].oldSaleQuantityToUpdateStock;
		params["oldSaleQuantityToUpdateStock"+i] = oldSaleQuantityToUpdateStock;
		
		var quantity = allRowsInGrid1[i].quantity;
		params["quantity"+i] = quantity;

		var salePrice = allRowsInGrid1[i].salePrice;
		if(+salePrice > 0)
  	  	{
			params["salePrice"+i] = salePrice;
  	  	}
		else
		{
			myAlert("Please Enter Sale Price For ="+(i+1)+" "+itemName);
  		  	document.custord.btnSubmit.disabled = false;
  		  	return false;
		}

		var vat = allRowsInGrid1[i].vat;
		params["vat"+i] = vat;

		var igst = allRowsInGrid1[i].igst;
		params["igst"+i] = igst;

		var taxAmount = allRowsInGrid1[i].taxAmount;
		params["taxAmount"+i] = taxAmount;

		var total = allRowsInGrid1[i].total;
		params["total"+i] = total;

		var employeeName1 = allRowsInGrid1[i].employeeName1;
		if( employeeName1 == null || employeeName1 == undefined || employeeName1 == "" || employeeName1 == " ")
		{
			var saleEmpId = 0;
			var saleEmpName = null
			params["saleEmpId"+i] = saleEmpId;
			params["saleEmpName"+i] = saleEmpName;
		}
		else
		{			
			var res = employeeName1.split(" ");
			var saleEmpId = res[0];
			params["saleEmpId"+i] = saleEmpId;
			var saleEmpName = res[1]+" "+res[2];
			params["saleEmpName"+i] = saleEmpName;
		}
		
		// rollSize
		var rollSize = allRowsInGrid1[i].rollSize;
		params["rollSize"+i] = rollSize;
		
		var goodReceiveQuantity = allRowsInGrid1[i].goodReceiveQuantity
		params["goodReceiveQuantity"+i] = goodReceiveQuantity;
		
		if(rollSize != "0")
		{			
			var sMeter = goodReceiveQuantity*rollSize;
			if(Number(quantity) > Number(sMeter))
      	  	{
      		  	myAlert("Available Stock ="+sMeter);
      		  	document.custord.btnSubmit.disabled = false;
      		  	return false;
      	  	}
		}
		else
		{
			if(+barcodeNo > 0)
			{
				if(Number(quantity) > Number(goodReceiveQuantity))
			   	  {
			   		  myAlert("Available Stock ="+goodReceiveQuantity);
			   		  document.custord.btnSubmit.disabled = false;
			   		  return false;
			   	  }
			}
   	  	}
		
		var perProductdisPer = allRowsInGrid1[i].disPerForBill;
		params["perProductdisPer" + i] = perProductdisPer;
		
		var perProductdisAmount = allRowsInGrid1[i].disAmount;
		params["perProductdisAmount"+i] = perProductdisAmount;
		
		var taxAmountAfterDis = allRowsInGrid1[i].taxAmountAfterDis;
		params["taxAmountAfterDis"+i] = taxAmountAfterDis;	
		
		var size1 = allRowsInGrid1[i].size1;
		params["size1" + i] = size1;	
		
		var size1 = allRowsInGrid1[i].size1;
		params["size1" + i] = size1;
		
		var sPWithoutTax = allRowsInGrid1[i].sPWithoutTax;
		params["sPWithoutTax" + i] = sPWithoutTax;
		
		var style = allRowsInGrid1[i].style;
		params["style" + i] = style;
		
		var fkSuppId = allRowsInGrid1[i].fkSuppId;
		params["fkSuppId" + i] = fkSuppId;
	}	
	
	var count1 = jQuery("#srCreditAmtGrid").jqGrid('getGridParam', 'records');
	if(count1 == "0" || count1 == null || count1 == undefined || count1 == "")
	{
	}
	else
	{		
		var allRowsInGrid = $('#srCreditAmtGrid').getGridParam('data');
		var AllRows=JSON.stringify(allRowsInGrid);
		for (var j = 0; j < count1; j++)
		{
			var pkBillId = allRowsInGrid[j].pkBillId;
			params["pkBillId"+j] = pkBillId;
			
			var transactionId = allRowsInGrid[j].transactionId;
			params["transactionId"+j] = transactionId;
			
			var returnTotal = allRowsInGrid[j].returnTotal;
			params["returnTotal"+j] = returnTotal;
		}
	}
	
	var totalAmount=$('#totalAmount').val();
	var discount=$('#discount').val();
	if(discount == "")
	{
		discount = 0;
	}
	var grossTotal=$('#grossTotal').val();
	if(grossTotal < 0)
	{
		myAlert("Please Check Gross Total");
		document.custord.btnSubmit.disabled = false;
		return false;
	}
	
	/* var employee1 = $('#employee1').val(); */
	var billNoBW = $('#billNoBW').val();
	var creditCustomer1 = $('#creditCustomer1').val();
	var mobileNo = $('#mobileNo').val();
	var paymentMode = $('#paymentMode').val();		
	var chequeNum = $('#chequeNum').val();
	var nameOnCheck = $('#nameOnCheck').val();
	var bankName = $('#bankName').val();
	var cardNum = $('#cardNum').val();
	var accNum = $('#accNum').val();
	var totalCreditAmt = $('#totalCreditAmt').val();
	var custGst = $('#CustGst').val();
	var cashCard_cashAmount = "";
	var cashCard_cardAmount = "";
	var cashAmount = "";
	var cardAmount = "";
	var UpiAmount = "";
	if(paymentMode == "cashAndCard")
	{
		cashCard_cashAmount = $('#cashCard_cashAmount').val();
		cashCard_cardAmount = $('#cashAndCard_cardAmount').val();
		if(cashCard_cashAmount == undefined || cashCard_cashAmount == null || cashCard_cashAmount == "" || cashCard_cashAmount == " ")
		{
			myAlert("Please Enter Cash Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cashAmount.match(checkCashAmt))
			{
				params["cashCard_cashAmount"] = cashCard_cashAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		if(cashCard_cardAmount == undefined || cashCard_cardAmount == null || cashCard_cardAmount == "" || cashCard_cardAmount == " ")
		{
			myAlert("Please Enter Card Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCardAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cardAmount.match(checkCardAmt))
			{
				params["cashCard_cardAmount"] = cashCard_cardAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		
		if((+cashCard_cashAmount + +cashCard_cardAmount) > +grossTotal)
		{
			myAlert("Cash Amount + Card Amount is Greater Than Total Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else if((+cashCard_cashAmount + +cashCard_cardAmount) < +grossTotal)
		{
			myAlert("Cash Amount + Card Amount is Less Than Total Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
	}
	else if(paymentMode == "cash")
	{
		if(+totalCreditAmt > 0)
		{
			cashAmount = +totalAmount - +totalCreditAmt;
		}			 
	}
	else if(paymentMode == "card")
	{
		if(+totalCreditAmt > 0)
		{
			cardAmount = +totalAmount - +totalCreditAmt;
		}			 
	}
	
	else if(paymentMode == "Upi")
	{
		if(+totalCreditAmt > 0)
		{
			UpiAmount = +totalAmount - +totalCreditAmt;
		}			 
	}
	
	
	
	if(paymentMode == "cashAndupi")
	{
		cashCard_cashAmount1 = $('#cashCard_cashAmount1').val();
		cashCard_upiAmount = $('#cashAndCard_upiAmount').val();
		if(cashCard_cashAmount1 == undefined || cashCard_cashAmount1 == null || cashCard_cashAmount1 == "" || cashCard_cashAmount1 == " ")
		{
			myAlert("Please Enter Cash Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cashAmount1.match(checkCashAmt))
			{
				
				
				//alert(cashupi_cashAmount+"in if");
				params["cashCard_cashAmount1"] = cashCard_cashAmount1;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		if(cashCard_upiAmount == undefined || cashCard_upiAmount == null || cashCard_upiAmount == "" || cashCard_upiAmount == " ")
		{
			myAlert("Please Enter Card Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCardAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_upiAmount.match(checkCardAmt))
			{
				params["cashCard_upiAmount"] = cashCard_upiAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		
		if((+cashCard_cashAmount1 + +cashCard_upiAmount) > +grossTotal)
		{
			myAlert("Cash Amount + Card Amount is Greater Than Total Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else if((+cashCard_cashAmount1 + +cashCard_upiAmount) < +grossTotal)
		{
			myAlert("Cash Amount + Card Amount is Less Than Total Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
	}
	
	
	
	var newBill = $('#newBill').val();
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	
	if((+totalAmount - +totalCreditAmt) == +grossTotal)
	{}
	else if(+totalCreditAmt > +totalAmount)
	{
		myAlert("Please Check Total Credit Amount");
		document.custord.btnSubmit.disabled = false;
		return false;
	}
	var billtype = "Permanent";
	params["billtype"] = billtype;
	params["billNoBW"] = billNoBW;
	params["count"] = count;
	params["totalAmount"] = totalAmount;
	params["discount"] = discount;
	params["grossTotal"] = totalAmount;
	//params["grossTotal"] = grossTotal;
	/* params["employee1"] = employee1; */
	params["creditCustomer1"] = creditCustomer1;
	params["mobileNo"] = mobileNo;
	params ["paymentMode"] = paymentMode;
	params ["chequeNum"] = chequeNum;
	params ["nameOnCheck"] = nameOnCheck;
	params ["bankName"] = bankName;
	params ["cardNum"] = cardNum;
	params ["accNum"] = accNum;
	params["userType"] = userType;
	params["userName"] = userName;
	params["count1"] = count1;	
	params["totalCreditAmt"] = totalCreditAmt;
	params["cashAmount"] = cashAmount;
	params["cardAmount"] = cardAmount;
	params["UpiAmount"] = UpiAmount;
	params["UpiAmount"] = UpiAmount;
	params["custGst"] = custGst;
	params["methodName"] = "editSaleInvoceBilling";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		successAlert("Bill Added Successfully");
		
		if(newBill == "newBill")
		{
			// alert(data);
			//window.open("ghantalwarMensWearOtherBillPDF.jsp");
			//window.open("pehenavaOtherBillPDF.jsp");
			window.open("Other_Bill_PDF_SM.jsp");
			//location.reload(true);
			window.close();
		}
		else	
		{
			//alert(data);
			//window.open("ghantalwarMensWearOtherBillPDF.jsp");
			//window.open("pehenavaOtherBillPDF.jsp");
			window.open("Other_Bill_PDF_SM.jsp");
			//location.reload(true);
		}
		
	}).error(function(jqXHR, textStatus, errorThrown)
	{
		if(textStatus==="timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}














