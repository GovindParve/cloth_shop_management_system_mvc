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

function valSaleReturn()
{
	if(document.supd.creditCustomer5.value == "")
	{
		myAlert("Select Customer Name.");
		return false;
	}	
	if(document.supd.billNo.value == "")
	{
		myAlert("Select Bill No.");
		return false;
	}
	saleReturn();
}

function saleReturn()
{
	var params = {};
	var input = document.getElementById('creditCustomer5'),
	list = document.getElementById('cust_drop5'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');
	var totalAmount = 0;
	var checkQuantity = 0;
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {
		
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId" + i] = pkBillId;
		
		var fkgoodreciveid = allRowsInGrid[i].fkgoodreciveid;
		params["fkgoodreciveid" + i] = fkgoodreciveid;

		var carNo = allRowsInGrid[i].carNo;
		params["carNo" + i] = carNo;

		var Date = allRowsInGrid[i].Date;
		params["Date"+i] = Date;

		var contactNo = allRowsInGrid[i].contactNo;
		params["contactNo" + i] = contactNo;

		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var productId = allRowsInGrid[i].productId;
		params["productId"+i] = productId;
		
		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;
		
		var catId = allRowsInGrid[i].catId;
		params["catId"+i] = catId;

		var categoryName = allRowsInGrid[i].categoryName;
		params["categoryName" + i] = categoryName;
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId"+i] = subCatId;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;

		var editQuantity = allRowsInGrid[i].editQuantity;
		if(editQuantity > 0)
		{
			checkQuantity++;
		}
		params["editQuantity" + i] = editQuantity;
		/*
		if(editQuantity == 0)
		{
			myAlert("Enter Return Quantity.");
			location.reload();
			return false;
		}*/
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;
		
		var discountPercent = allRowsInGrid[i].discountPercent;
		params["discountPercent"+i] = discountPercent;
		
		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;

		var grossamt = allRowsInGrid[i].grossamt;
		params["grossamt"+i] = grossamt;
		
		var gst = allRowsInGrid[i].gst;
		params["gst"+i] = gst;
		
		var iGst = allRowsInGrid[i].iGst;
		params["iGst"+i] = iGst;
		
		var taxAmt = allRowsInGrid[i].taxAmt;
		params["taxAmt"+i] = taxAmt;
		
		var returnTotalAmt = allRowsInGrid[i].returnTotalAmt;
		if(returnTotalAmt == "" || returnTotalAmt == undefined || returnTotalAmt == null)
		{
			returnTotalAmt = 0;
		}
		params["returnTotalAmt"+i] = returnTotalAmt;

		var totalAmt = allRowsInGrid[i].totalAmt;
		params["totalAmt"+i] = totalAmt;
		
		var finalTotalPerProduct = allRowsInGrid[i].finalTotalPerProduct;
		params["finalTotalPerProduct"+i] = finalTotalPerProduct;
		
		var shopId = allRowsInGrid[i].fkShopId;
		params["shopId"+i] = shopId;
	}
	if(checkQuantity > 0){}
	else
	{
		myAlert("Please Enter Return Quantity");
		return false;
	}

	var billNo = $('#billNo').val();
	var transactionIdSr = $('#transactionIdSr').val();
	var reasonForSReturn1 = $('#reasonForSReturn1').val();
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	var returnGrossTotal = $('#returnGrossTotal2').val();
	var grossTotalAmount = $('#grossTotalAmount2').val();
	
	params["billNo"] = billNo;
	params["count"] = count;
	params["creditCustomer1"] = creditCustomer1;
	params["transactionIdSr"] = transactionIdSr;
	params["reasonForSReturn1"] = reasonForSReturn1;
	params["userType"] = userType;
	params["userName"] = userName;
	params["returnGrossTotal"] = returnGrossTotal;
	params["grossTotalAmount"] = grossTotalAmount;
	
	params["methodName"] = "returnSale";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		successAlert(data);
		//location.reload();
		window.open("PDFSaleReturn.jsp");
		//window.open("PDFSaleReturn.jsp");
		//window.open("ghantalwarMensWearPDFSaleReturn.jsp");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function valSaleReturn2()
{	
	var billNo = $('#billNoBW').val();
		
	if(billNo == "")
	{
		myAlert("Enter Bill No.");
		return false;
	}	
	saleReturn2();
}

function saleReturn2()
{
	var params = {};
	/*var input = document.getElementById('creditCustomer5'),
	list = document.getElementById('cust_drop5'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}*/
	var count = jQuery("#jqGrid2").jqGrid('getGridParam', 'records')
	var allRowsInGrid = $('#jqGrid2').getGridParam('data');
	var totalAmount = 0;
	var checkCount = 0;
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{		
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId" + i] = pkBillId;
		
		var fkgoodreciveid = allRowsInGrid[i].fkgoodreciveid;
		params["fkgoodreciveid" + i] = fkgoodreciveid;
		
		var carNo = allRowsInGrid[i].carNo;
		params["carNo" + i] = carNo;
		
		var Date = allRowsInGrid[i].Date;
		params["Date"+i] = Date;
		
		var contactNo = allRowsInGrid[i].contactNo;
		params["contactNo" + i] = contactNo;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var productId = allRowsInGrid[i].productId;
		params["productId"+i] = productId;

		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;
		
		var catId = allRowsInGrid[i].catId;
		params["catId"+i] = catId;
		
		var categoryName = allRowsInGrid[i].categoryName;
		params["categoryName" + i] = categoryName;
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId"+i] = subCatId;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;
		
		var editQuantity = allRowsInGrid[i].editQuantity;
		if(Number(editQuantity) > 0)
		{
			checkCount++;
		}
		params["editQuantity" + i] = editQuantity;
					
		/*	if(editQuantity == 0)
		{
			myAlert("Enter Return Quantity.");
			location.reload();
			return false;
		}*/

		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;

		var discountPercent = allRowsInGrid[i].discountPercent;
		params["discountPercent"+i] = discountPercent;

		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;
		
		var gst = allRowsInGrid[i].gst;
		params["gst"+i] = gst;
		
		var iGst = allRowsInGrid[i].iGst;
		params["iGst"+i] = iGst;
		
		var taxAmt = allRowsInGrid[i].taxAmt;
		params["taxAmt"+i] = taxAmt;
		
		var totalAmt = allRowsInGrid[i].totalAmt;
		params["totalAmt"+i] = totalAmt;

		var grossamt = allRowsInGrid[i].grossamt;
		params["grossamt"+i] = grossamt;
		
		var returnTotalAmt = allRowsInGrid[i].returnTotalAmt;
		if(returnTotalAmt == "" || returnTotalAmt == null || returnTotalAmt == undefined)
		{
			returnTotalAmt = 0;
		}
		params["returnTotalAmt"+i] = returnTotalAmt;
		
		var finalTotalPerProduct = allRowsInGrid[i].finalTotalPerProduct;
		params["finalTotalPerProduct"+i] = finalTotalPerProduct;
		
		var shopId = allRowsInGrid[i].fkShopId;
		params["shopId"+i] = shopId;
	}
		
	if(checkCount > 0){}
	else
	{
		myAlert("Please Entre Return Quantity");
		return false;
	}
	
	creditCustomer1 = "";
	var billNo = $('#billNoBW').val();
	var transactionIdSr = $('#transactionIdSr').val();
	var reasonForSReturn2 = $('#reasonForSReturn2').val();
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	var returnGrossTotal = $('#returnGrossTotal').val();
	var grossTotalAmount = $('#grossTotalAmount').val();
	
	
	params["billNo"] = billNo;
	params["creditCustomer1"] = creditCustomer1;
	params["count"] = count;
	params["transactionIdSr"] = transactionIdSr;
	params["reasonForSReturn2"] = reasonForSReturn2;
	params["userType"] = userType;
	params["userName"] = userName;
	params["returnGrossTotal"] = returnGrossTotal;
	params["grossTotalAmount"] = grossTotalAmount;
	
	params["methodName"] = "returnSaleBillno";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) 
	{
		successAlert(data);
		//location.reload();
		window.open("PDFSaleReturn.jsp");
		//window.open("ghantalwarMensWearPDFSaleReturn.jsp");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function valSaleReturn1()
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
	saleReturn1();
}

function saleReturn1()
{
	var params = {};
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}

	var count = jQuery("#jqGrid1").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid1').getGridParam('data');
	var totalAmount = 0;
	var returnTotalAmount = 0;
	var checkQuantity = 0
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++)
	{
		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId" + i] = pkBillId;

		var carNo = allRowsInGrid[i].carNo;
		params["carNo" + i] = carNo;
		
		var Date = allRowsInGrid[i].Date;
		params["Date"+i] = Date;
		
		var contactNo = allRowsInGrid[i].contactNo;
		params["contactNo" + i] = contactNo;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var productId = allRowsInGrid[i].productId;
		params["productId"+i] = productId;
		
		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;
		
		var catId = allRowsInGrid[i].catId;
		params["catId"+i] = catId;

		var categoryName = allRowsInGrid[i].categoryName;
		params["categoryName" + i] = categoryName;
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId"+i] = subCatId;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;

		var editQuantity = allRowsInGrid[i].editQuantity;
		if(editQuantity > 0)
		{
			checkQuantity++;
		}
		params["editQuantity" + i] = editQuantity;

		/*if(editQuantity == 0)
		{
			myAlert("Enter Return Quantity.");
			location.reload();
			return false;
		}*/

		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;

		var discountPercent = allRowsInGrid[i].discountPercent;
		params["discountPercent"+i] = discountPercent;
		
		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;
		
		var gst = allRowsInGrid[i].gst;
		params["gst"+i] = gst;
		
		var iGst = allRowsInGrid[i].iGst;
		params["iGst"+i] = iGst;
		
		var taxAmt = allRowsInGrid[i].taxAmt;
		params["taxAmt"+i] = taxAmt;

		var returnTotalAmt = allRowsInGrid[i].returnTotalAmt;
		if(returnTotalAmt == "" || returnTotalAmt == undefined || returnTotalAmt == null)
		{
			returnTotalAmt = 0;
		}
		params["returnTotalAmt"+i] = returnTotalAmt;

		var totalAmt = allRowsInGrid[i].totalAmt;
		params["totalAmt"+i] = totalAmt;
		
		var finalTotalPerProduct = allRowsInGrid[i].finalTotalPerProduct;
		params["finalTotalPerProduct"+i] = finalTotalPerProduct;
		
		var fkCreditCustId = allRowsInGrid[i].fkCreditCustId;
		params["fkCreditCustId"+i] = fkCreditCustId;
		
		var shopId = allRowsInGrid[i].fkShopId;
		params["shopId"+i] = shopId;
		
		totalAmount = Number(totalAmount) + Number(totalAmt);
		returnTotalAmount = Number(returnTotalAmount) + Number(returnTotalAmt);
	}

	if(checkQuantity > 0)
	{}
	else
	{
		myAlert("Please Enter Return Quantity");
		return false;
	}
	
	var billNo = $('#billNo2').val();
	var transactionIdSr = $('#transactionIdSr').val();
	var reasonForSReturn3 = $('#reasonForSReturn3').val();
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	var returnGrossTotal = $('#returnGrossTotal4').val();
	var grossTotalAmount = $('#grossTotalAmount4').val();
	
	params["totalAmount"] = totalAmount;
	params["returnTotalAmount"] = returnTotalAmount;
	params["billNo"] = billNo;
	params["count"] = count;
	params["transactionIdSr"] = transactionIdSr;	
	params["creditCustomer1"] = creditCustomer1;
	params["reasonForSReturn3"] = reasonForSReturn3;
	params["userType"] = userType;
	params["userName"] = userName;
	params["returnGrossTotal"] = returnGrossTotal;
	params["grossTotalAmount"] = grossTotalAmount;
	
	params["methodName"] = "returnSale1";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		//successAlert(data);
		//location.reload();
		window.open("PDFSaleReturn.jsp");
		//window.open("ghantalwarMensWearPDFSaleReturn.jsp");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function getSaleItems2Old()
{
	var billNo = $('#billNoBW').val();
	var params = {};
	params["methodName"] = "getSaleItemByBillNo2";
	params["billNo"] = billNo;

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
			{
				$("#jqGrid2").jqGrid("clearGridData");
				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				$.each(jsonData, function(i, v)
				{
					$("#jqGrid2").jqGrid(
							{
								datatype : "local",

								colNames : [ "Date", "itemID", "CatId", "Category<br>Name", "SubCatId", "Sub Cat<br>Name", "productId", "Item Name", "Barcode<br>No", "Quantity", 
											 "Return<br>Quantity", "SalePrice", "Contact<br>No", "Return<br>Total", "Discount", "Size", "gst", "igst", "Tax<br>Amount", "Total", 
											 "Total<br>Per<br>Product", "fkShopId"],
								             colModel : [ 								            	 
							            	 {
								            	 name : 'Date',
								            	 width : 140,

								             },
								             {
								            	 name : "pkBillId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "catId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "categoryName",
								            	 width : 140,
								             },
								             {
								            	 name : "subCatId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "subCatName",
								            	 width : 100,
								            	 //hidden : true
								             },			
								             {
								            	 name : "productId",
								            	 hidden : true
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
								            	 editoptions: { defaultValue: '00'},
								            	 width : 70,
								            	 editable : true,
								            	 classes: 'myBackGroundColor'
								             },
								             {
								            	 name : "salePrice",
								            	 width : 100,
								             },
								             {
								            	 name : "contactNo",
								            	 width : 120,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },								            
								             {
								            	 name : 'discount',
								            	 width : 80,
								             },
								             {
								            	 name : 'size',
								            	 width : 140,
								            	 hidden : true
								             },
								             {
								            	 name : 'gst',
								            	 width : 100,
								             },
								             {
								            	 name : 'iGst',
								            	 width : 140,
								            	 hidden: true,
								             },
								             {
								            	 name : 'taxAmt',
								            	 width : 150,
								             },
								             {
								            	 name : "totalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },					           
								             {
								            	 name : 'finalTotalPerProduct',
								            	 width : 140,
								            	 formatter: 'number',
								            	 //hidden: true,
								             },
								             {
								            	 name : "fkShopId",
								            	 width : 150,
								            	 hidden: true,
								             },
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
								            	
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
								            	 {
							            		 	editQuantity = 0;
							            		 	var setZero = "0";
						                    		$("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", setZero);
						                    		return false;
								            	 }
								            	 
								            	 if(editQuantity == "0" || editQuantity == "")
								            	 { 
								            		 var edit = "0";
							            		 	 $("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", edit);
								            	 }
								            	 
								            	 if(Number(editQuantity) > Number(quantity))
								            	 {
								            		 myAlert("Return Quantity Is Greater Than Quantity");
								            		 var totalAmt = rowData['finalTotalPerProduct'];
								            		 var rtota = 0.00;
								            		 var edit = "0";
							            		 	 $("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", rtota);
						                    		 $("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", totalAmt);
						                    		 $("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", edit);
								            		 
								            		 return false;
								            	 }

								            	 var afterquantity = quantity - editQuantity;
								            	/*if(editQuantity > 0)
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

								            	 var tota = afterquantity * finalTotalPerProduct;

								            	// var tota1 = (editQuantity * salePrice)-(editQuantity*discount);
								            	 var tota1 = (editQuantity * totalAmt);// (editQuantity * salePrice);
								            	/*myAlert("Return Amount of"+pName+"is"+tota1);*/

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
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3});
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },
								             footerrow: true, // set a footer row

								             gridComplete: function()
								             {
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
								             },

								             pager : "#jqGridPager2",

							});

					$("#jqGrid2").addRowData(i, jsonData[i]);

					$('#jqGrid2').navGrid('#jqGridPager2',
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
									$('#jqGrid2').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGrid2").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid2").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var salePrice = rowData['salePrice'];
					            	 var discount = rowData['discount'];

					            	 if(Number(editQuantity) > Number(quantity))
					            	 {
					            		 myAlert("Return Quantity Is Greater Than Quantity");
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


function getSaleItems2()
{
	var billNo = $('#billNoBW').val();
	var params = {};
	params["methodName"] = "getSaleItemByBillNo2";
	params["billNo"] = billNo;

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
	{
		$("#jqGrid2").jqGrid("clearGridData");
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData, function(i, v)
		{
			$("#jqGrid2").jqGrid(
				{
					datatype : "local",
					colNames : [  "itemID","fkgoodreciveid", "Date", "Contact<br>No", "CatId", "Category<br>Name", "SubCatId", "Sub Cat<br>Name", "productId", "Item Name",
								"Barcode<br>No", "Quantity","Return<br>Quantity", "SalePrice", "Return<br>Total","Discount<br>%",
								 "Discount<br>Amount", "Size", "gst", "igst", "Tax<br>Amount", "Total", "Total<br>Per<br>Product", "fkShopId"
					],
					colModel : [
						
						{
							name : "pkBillId",
							hidden : true
						},
						{
							name : "fkgoodreciveid",
							hidden : true
						},
						{
							name : 'Date',
							width : 140,
						},
						{
							name : "contactNo",
							width : 120,
						},
						{
							name : "catId",
							hidden : true
						},
						{
							name : "categoryName",
							width : 140,
						},
						{
							name : "subCatId",
							hidden : true
						},
						{
							name : "subCatName",
							width : 100,
							//hidden : true
						},
						{
							name : "productId",
							hidden : true
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
							width : 100,
						},
						{
							name : 'editQuantity',
							editoptions: { defaultValue: '00'},
							width : 100,
							editable : true,
							classes: 'myBackGroundColor'
						},
						{
							name : "salePrice",
							width : 100,
						},
						{
							name : "returnTotalAmt",
							width : 150,
							formatter: 'number',
						},
						{
							name : 'discountPercent',
							width : 80,
						},
						{
							name : 'discount',
							width : 80,
						},
						{
							name : 'size',
							width : 140,
							hidden : true
						},
						{
							name : 'gst',
							width : 100,
						},
						{
							name : 'iGst',
							width : 140,
							hidden: true,
						},
						{
							name : 'taxAmt',
							width : 150,
						},
						{
							name : "totalAmt",
							width : 150,
							formatter: 'number',
						},
						{
							name : 'finalTotalPerProduct',
							width : 140,
							formatter: 'number',
							//hidden: true,
						},
						{
							name : "fkShopId",
							width : 150,
							hidden: true,
						},
					],
					
					loadonce: false,
					viewrecords: true,
					width: 1800,
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
						var discountPercent = rowData['discountPercent'];
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
						var setZero = 0;
						var checkValue = /^[0-9]+\.?[0-9]*$/;
						var newSalePrice = 0;
						var disAmt = 0;
						var newTaxAmt = 0;
						var finalSP = 0;
						
						
						if (unit == "meter" || unit == "Meter" || unit == "METER" || unit == "MTR" || unit == "mtr" || unit == "Mtr")
						{
							editQuantity = 0;
							var setZero = "0";
							$("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", setZero);
							return false;
						}
						if(editQuantity == "0" || editQuantity == "")
						{
							var edit = "0";
							$("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", edit);
						}
						if(Number(editQuantity) > Number(quantity))
						{
							myAlert("Return Quantity Is Greater Than Quantity");
							var totalAmt = rowData['finalTotalPerProduct'];
							var rtota = 0.00;
							var edit = "0";
							$("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", rtota);
							$("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", totalAmt);
							$("#jqGrid2").jqGrid("setCell", rowId, "editQuantity", edit);
							return false;
						}
						
						var afterquantity = quantity - editQuantity;
						
						var tota = afterquantity * finalTotalPerProduct;
						//var tota = editQuantity * salePrice;
						//var tota1 = (editQuantity * salePrice)-(editQuantity*discount);
						var tota1 = (editQuantity * salePrice);// (editQuantity * salePrice);
						newSalePrice = tota1;
						finalSP = tota1;
						$("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", tota1);
						
						
						if(discountPercent == "" || discountPercent == '0' || discountPercent == null || discountPercent == undefined)
						{
							$("#jqGrid2").jqGrid("setCell", rowId, "discountPercent", setZero);
							$("#jqGrid2").jqGrid("setCell", rowId, "discount", setZero);
						} else {
							if(discountPercent.match(checkValue))
							{
								if(Number(discountPercent) > 0)
								{
									disAmt = (tota1/100)*discountPercent;
									newSalePrice = tota1 - disAmt;
									finalSP = newSalePrice;
									//spForOneItemAfterDisCal = newSalePrice/quantity;
									$("#jqGrid2").jqGrid("setCell", rowId, "discount", disAmt.toFixed(2));
									$("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", newSalePrice.toFixed(2));
									$("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", newSalePrice.toFixed(2));
								} else {
									//newSalePrice = tota;
									var setZero = 0;
									$("#jqGrid2").jqGrid("setCell", rowId, "discount", setZero);
									$("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", tota1.toFixed(2));
									$("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", tota1.toFixed(2));
									//spForOneItemAfterDisCal  = tota;
									//alert("spForOneItemAfterDisCal 1 :- "+spForOneItemAfterDisCal);
								}
							}/* else {
								myAlert("Please Enter Valid Discount %");
								$("#jqGrid2").jqGrid("setCell", rowId, "disPerForBill", setZero);
								disPer = setZero;
							}*/
						}
						
						//if(Number(spForOneItemAfterDisCal) > 0)
					//{
						//if(Number(gst == 0) && Number(spForOneItemAfterDisCal) > 0 && Number(spForOneItemAfterDisCal) <= 1000)
						if(Number(gst) > 0)
						{
							newTaxAmt = (newSalePrice/100)*gst;
							//finalSP = newSalePrice + newTaxAmt;
							finalSP = newSalePrice;
							//gst = 5;
							//$("#list4").jqGrid("setCell", rowId, "gst", gst);
							/*if(newSalePrice > 0)
							{
								newTaxAmt = (newSalePrice/100)*gst;
								finalSP = newSalePrice + newTaxAmt;
							} else {
								newTaxAmt = (finalSP/100)*gst;
								finalSP = finalSP + newTaxAmt;
							}*/
							$("#jqGrid2").jqGrid("setCell", rowId, "taxAmt", newTaxAmt.toFixed(2));
							$("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", finalSP.toFixed(2));
							$("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", finalSP.toFixed(2));
						}
					//}
						
						
						if(tota == 0)
						{
							$("#jqGrid2").jqGrid("setCell", rowId, "grossamt", tota);
						} else {
							var gross = ((discount/100)*tota) + tota;
							$("#jqGrid2").jqGrid("setCell", rowId, "grossamt", gross);
						}
						$("#jqGrid2").jqGrid("setCell", rowId, "totalAmt", tota);
						var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
						var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
						var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
						var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
						$(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
						$(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
						$(this).jqGrid('footerData', 'set', { discount: parseTotal3});
						$(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
						$(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
						$(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
						document.getElementById("returnGrossTotal").value = parseTotal2.toFixed(2);
						document.getElementById("grossTotalAmount").value = parseTotal.toFixed(2);
					},
					footerrow: true, // set a footer row
					gridComplete: function()
					{
						var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
						var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
						var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
						var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
						$(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
						$(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
						$(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
						$(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
						$(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
						$(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
						document.getElementById("returnGrossTotal").value = parseTotal2.toFixed(2);
						document.getElementById("grossTotalAmount").value = parseTotal.toFixed(2);
					},
					pager : "#jqGridPager2",
				});
				
				$("#jqGrid2").addRowData(i, jsonData[i]);
				$('#jqGrid2').navGrid('#jqGridPager2',
				// the buttons to appear on the toolbar of the grid
				{ edit: true, add: true, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
				//options for the Edit Dialog
				{
					editCaption : "The Edit Dialog",
					recreateForm : true,
					checkOnUpdate : true,
					checkOnSubmit : true,
					closeAfteredit : true,
					errorTextFormat : function(data) {
						return 'Error: '+ data.responseText
					}
				},
				{},
				// options for the Delete Dailog
				{
					closeAfterdel:true,
					recreateForm: true,
					afterComplete: function()
					{
						$('#jqGrid2').trigger( 'reloadGrid' );
						var rowId =$("#jqGrid2").jqGrid('getGridParam','selrow');
						var rowData = jQuery("#jqGrid2").getRowData(rowId);
						var quantity = rowData['quantity'];
						var editQuantity = rowData['editQuantity'];
						var salePrice = rowData['salePrice'];
						var discount = rowData['discount'];
						
						if(Number(editQuantity) > Number(quantity)){
							myAlert("Return Quantity Is Greater Than Quantity");
						}
						
						var afterquantity = quantity - editQuantity;
						var tota = afterquantity * salePrice;
						var tota1 = editQuantity * salePrice;
						
						$("#jqGrid2").jqGrid("setCell", rowId, "returnTotalAmt", tota1);
						
						if(tota == 0){
							$("#jqGrid2").jqGrid("setCell", rowId, "grossamt", tota);
						} else {
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
						document.getElementById("returnGrossTotal").value = parseTotal2.toFixed(2);
						document.getElementById("grossTotalAmount").value = parseTotal.toFixed(2);
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




function getSaleItems()
{
	var billNo = $('#billNo').val();
	var params = {};
	params["methodName"] = "getSaleItemByBillNo";
	params["billNo"] = billNo;

	$.post('/SMT/jsp/utility/controller.jsp',
			params,
			function(data) {

				$("#jqGrid").jqGrid("clearGridData");

				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				$.each(jsonData, function(i, v) {
					$("#jqGrid").jqGrid(
							{
								datatype : "local",

								colNames : [ "Date", "Contact No","itemID","fkgoodreciveid", "CatId", "Category Name", "productId", "Item Name", "SubCatId", "Barcode No",
								             "Quantity", "Return Quant", "SalePrice", "Return Total", "Discount<br>%", "Discount<br>Amount", "Size", 
								              "gst", "Igst", "Tax amount", "Total", "finalTotalPerProduct","fkShopId"],

								             colModel : [
								             {
								            	 name : 'Date',
								            	 width : 140,
								             },
								             {
								            	 name : "contactNo",
								            	 width : 120,
								             },
								             {
								            	 name : "pkBillId",
								            	 hidden : true
								             },
								             {
								            	 name : "fkgoodreciveid",
								            	 hidden : true
								             },
								             {
								            	 name : "catId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "categoryName",
								            	 width : 140,
								             },
								             {
								            	 name : "productId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "itemName",
								            	 width : 100,
								             },
								             {
								            	 name : "subCatId",
								            	 hidden : true
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
								            	 classes: 'myBackGroundColor'
								             },
								             {
								            	 name : "salePrice",
								            	 width : 100,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },							            
								             {
								            	 name : 'discountPercent',
								            	 width : 70,
								             },							            
								             {
								            	 name : 'discount',
								            	 width : 100,
								             },
								             {
								            	 name : 'size',
								            	 width : 140,
								            	 hidden : true,								            	 
								             },
								             {
								            	 name : 'gst',
								            	 width : 140,
								             },
								             {
								            	 name : 'iGst',
								            	 width : 140,
								            	 hidden: true,
								             },
								             {
								            	 name : 'taxAmt',
								            	 width : 140,
								             },	
								             {
								            	 name : "totalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },
								             {
								            	 name : 'finalTotalPerProduct',
								            	 width : 140,
								            	 formatter: 'number',
								            	 //hidden: true,
								             },
								             {
								            	 name : 'fkShopId',
								            	 width : 140,
								            	 hidden: true,
								             },

								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1300,
								             shrinkToFit: true,
								             rowList : [10,20,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             afterSaveCell: function()
								             {
								            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
								            	 var quantity = rowData['quantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var salePrice = rowData['salePrice'];
								            	 var discountPercent = rowData['discountPercent'];
								            	 var discount = rowData['discount'];
								            	 var pName = rowData['itemName'];
								            	 var unit = rowData['size'];
								            	 var taxAmt = rowData['taxAmt'];
								            	 var gst = rowData['gst'];
								            	 var iGst = rowData['iGst'];
								            	 var finalTotalPerProduct = rowData['finalTotalPerProduct'];
								            	var totalAmt = rowData['totalAmt'];
												//var finalTotalPerProduct = rowData['finalTotalPerProduct'];
												var setZero = 0;
												var checkValue = /^[0-9]+\.?[0-9]*$/;
												var newSalePrice = 0;
												var disAmt = 0;
												var newTaxAmt = 0;
												var finalSP = 0;

 
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
								            	 {
								            		 	editQuantity = 0;
								            		 	var setZero = 0;
							                    		$("#jqGrid").jqGrid("setCell", rowId, "editQuantity", setZero);
							                    		return false;
								            	 }
								            	 
								            	 if(editQuantity == "0" || editQuantity == "")
								            	 {
								            		 var edit = "0";
								            		 $("#jqGrid").jqGrid("setCell", rowId, "editQuantity", edit);
								            	 }
								            	 
								            	 if(Number(editQuantity) > Number(quantity))
								            	 {
								            		 myAlert("Return Quantity Is Greater Than Quantity");
								            		 var totalAmt = rowData['finalTotalPerProduct'];
								            		 var rtota = 0.00;
								            		 var edit = "00";
								            		 	$("#jqGrid").jqGrid("setCell", rowId, "returnTotalAmt", rtota);
							                    		$("#jqGrid").jqGrid("setCell", rowId, "totalAmt", totalAmt);
							                    		$("#jqGrid").jqGrid("setCell", rowId, "editQuantity", edit);							                    		
								            		 
								            		 return false;
								            	 }

								            	 var afterquantity = quantity - editQuantity;

								            	 var tota = afterquantity * finalTotalPerProduct;//salePrice;

								            	 //var tota1 = (editQuantity * finalTotalPerProduct);//salePrice)
								            	/* var tota1 = (editQuantity * salePrice)-(editQuantity*discount);*/
								            	/*myAlert("Return Amount of"+pName+"is"+tota1);*/
												
												var tota1 = (editQuantity * salePrice);
												newSalePrice = tota1;
												finalSP = tota1;
								            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotalAmt", tota1);
												
						if(discountPercent == "" || discountPercent == '0' || discountPercent == null || discountPercent == undefined)
						{
							$("#jqGrid").jqGrid("setCell", rowId, "discountPercent", setZero);
							$("#jqGrid").jqGrid("setCell", rowId, "discount", setZero);
						} else {
							if(discountPercent.match(checkValue))
							{
								if(Number(discountPercent) > 0)
								{
									disAmt = (tota1/100)*discountPercent;
									newSalePrice = tota1 - disAmt;
									finalSP = newSalePrice;
									//spForOneItemAfterDisCal = newSalePrice/quantity;
									$("#jqGrid").jqGrid("setCell", rowId, "discount", disAmt.toFixed(2));
									$("#jqGrid").jqGrid("setCell", rowId, "returnTotalAmt", newSalePrice.toFixed(2));
									$("#jqGrid").jqGrid("setCell", rowId, "totalAmt", newSalePrice.toFixed(2));
								} else {
									//newSalePrice = tota;
									var setZero = 0;
									$("#jqGrid").jqGrid("setCell", rowId, "discount", setZero);
									$("#jqGrid").jqGrid("setCell", rowId, "returnTotalAmt", tota1.toFixed(2));
									$("#jqGrid").jqGrid("setCell", rowId, "totalAmt", tota1.toFixed(2));
									//spForOneItemAfterDisCal  = tota;
									//alert("spForOneItemAfterDisCal 1 :- "+spForOneItemAfterDisCal);
								}
							}/* else {
								myAlert("Please Enter Valid Discount %");
								$("#jqGrid2").jqGrid("setCell", rowId, "disPerForBill", setZero);
								disPer = setZero;
							}*/
						}
						
						if(Number(gst) > 0)
						{
							newTaxAmt = (newSalePrice/100)*gst;
							//finalSP = newSalePrice + newTaxAmt;
							finalSP = newSalePrice;
							$("#jqGrid").jqGrid("setCell", rowId, "taxAmt", newTaxAmt.toFixed(2));
							$("#jqGrid").jqGrid("setCell", rowId, "returnTotalAmt", finalSP.toFixed(2));
							$("#jqGrid").jqGrid("setCell", rowId, "totalAmt", finalSP.toFixed(2));
						}

								            	 if(tota == 0)
								            	 {

								            		 $("#jqGrid").jqGrid("setCell", rowId, "grossamt", tota);
								            	 } else {
								            		 var gross = ((discount/100)*tota) + tota;
								            		 $("#jqGrid").jqGrid("setCell", rowId, "grossamt", gross);
								            	 }

								            	 $("#jqGrid").jqGrid("setCell", rowId, "totalAmt", tota);
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3});
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
												document.getElementById("returnGrossTotal2").value = parseTotal2.toFixed(2);
												document.getElementById("grossTotalAmount2").value = parseTotal.toFixed(2);
								             },
								             footerrow: true, // set a footer row

								             gridComplete: function() {

								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
												document.getElementById("returnGrossTotal2").value = parseTotal2.toFixed(2);
												document.getElementById("grossTotalAmount2").value = parseTotal.toFixed(2);
								             },

								             pager : "#jqGridPager",

							});

					$("#jqGrid").addRowData(i, jsonData[i]);

					$('#jqGrid')
					.navGrid(
							'#jqGridPager',
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
									$('#jqGrid').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var salePrice = rowData['salePrice'];
					            	 var discount = rowData['discount'];

					            	 if(Number(editQuantity) > Number(quantity))
					            	 {
					            		 myAlert("Return Quantity Is Greater Than Quantity");
					            	 }

					            	 var afterquantity = quantity - editQuantity;

					            	 var tota = afterquantity * salePrice;

					            	 var tota1 = editQuantity * salePrice;

					            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotalAmt", tota1);

					            	 if(tota == 0){

					            		 $("#jqGrid").jqGrid("setCell", rowId, "grossamt", tota);
					            	 }
					            	 else{
					            		 var gross = ((discount/100)*tota) + tota;
					            		 $("#jqGrid").jqGrid("setCell", rowId, "grossamt", gross);

					            	 }

					            	 $("#jqGrid").jqGrid("setCell", rowId, "totalAmt", tota);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
					            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
									document.getElementById("returnGrossTotal2").value = parseTotal2.toFixed(2);
									document.getElementById("grossTotalAmount2").value = parseTotal.toFixed(2);
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
	
	params["methodName"] = "getSaleItemByBillNo1";
	
	params["creditCustomer1"] = "creditCustomer1";
	params["billNo"] = billNo;
	$.post('/SMT/jsp/utility/controller.jsp',params, function(data) {

		$("#jqGrid1").jqGrid("clearGridData");
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData, function(i, v)
		{					
			$("#jqGrid1").jqGrid(
					{
						datatype : "local",
	
						colNames : [ "itemID", "Bill No", "Date", "Contact No", "Barcode<br>No", "CatId", "Category<br>Name", "productId", "Item Name",
						              "SubCatId", "Quantity", "Return<br>Quantity", "Sale Price", "Return Total","Discount<br>%","Discount<br>Amount",
						              "Size", "creditCustId","GST", "iGst", "Tax<br>Amount", "Total", "Final Total<br>Per Product", "fkShopId"],
	
						             colModel : [
										
						             {
						            	 name : "pkBillId",
						            	 hidden : true
						             },
						             {
						            	 name : 'billNo',
						            	 width : 140,
						            	 hidden : true
						             },
						             {
						            	 name : 'Date',
						            	 width : 140,
						             },
						             {
						            	 name : "contactNo",
						            	 width : 100,
						             },
						             {
						            	 name : "barcodeNo",
						            	 width : 100,
						             },
						             {
						            	 name : "catId",
						            	 hidden : true
						             }, 
						             {
						            	 name : "categoryName",
						            	 width : 100,
						             },
						             {
						            	 name : "productId",
						            	 hidden : true
						             }, 
						             {
						            	 name : "itemName",
						            	 width : 100,
						             },
						             {
						            	 name : "subCatId",
						            	 hidden : true
						             },
						             {
						            	 name : 'quantity',
						            	 width : 70,
						             },								
						             {
						            	 name : 'editQuantity',
						            	 width : 70,
						            	 editable : true,
						            	 classes: 'myBackGroundColor'
						             },
						             {
						            	 name : "salePrice",
						            	 width : 100,
						             },
						             {
						            	 name : "returnTotalAmt",
						            	 width : 150,
						            	 formatter: 'number',
						             },
						             {
						            	 name : 'discountPercent',
						            	 width : 90,
						             },
						             {
						            	 name : 'discount',
						            	 width : 90,
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
						            	 name : 'gst',
						            	 width : 80,
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
						            	 name : "totalAmt",
						            	 width : 150,
						            	 formatter: 'number',
						             },
						             {
						            	 name : "finalTotalPerProduct",
						            	 width : 150,
						            	 formatter: 'number',
						            	 //hidden : true
						             },
						             {
						            	 name : "fkShopId",
						            	 width : 150,
						            	 hidden : true
						             },
						             ],
	
						             loadonce: false,
						             viewrecords: true,
						             width: 1800,
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
						            	 var discountPercent = rowData['discountPercent'];
						            	 var discount = rowData['discount'];
						            	 var unit = rowData['size'];
						            	 var fkCreditCustId = rowData['fkCreditCustId'];
						            	 var returnTotalAmt = rowData['returnTotalAmt'];
						            	 var billNo = rowData['billNo'];
						            	 var gst = rowData['gst'];
						            	 var iGst = rowData['iGst'];
						            	 var taxAmt = rowData['taxAmt'];
						            	 var finalTotalPerProduct = rowData['finalTotalPerProduct'];
										var totalAmt = rowData['totalAmt'];
										var setZero = 0;
										var checkValue = /^[0-9]+\.?[0-9]*$/;
										var newSalePrice = 0;
										var disAmt = 0;
										var newTaxAmt = 0;
										var finalSP = 0;
						            	 
						            	 if(editQuantity == "" || editQuantity == "0")
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
						            		 myAlert("Return Quantity Is Greater Than Quantity");
						            		 var setZero = "00";
					                    	 $("#jqGrid1").jqGrid("setCell", rowId, "editQuantity", setZero)
						            		 return false;
						            	 }
						            	 var afterquantity = quantity - editQuantity;
						            	 var tota = afterquantity * finalTotalPerProduct;//salePrice;
						            	//var total1 = editQuantity * finalTotalPerProduct;//salePrice;
										var total1 = (editQuantity * salePrice);
										newSalePrice = total1;
										finalSP = total1;
							            $("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", total1);
						
						if(discountPercent == "" || discountPercent == '0' || discountPercent == null || discountPercent == undefined)
						{
							$("#jqGrid1").jqGrid("setCell", rowId, "discountPercent", setZero);
							$("#jqGrid1").jqGrid("setCell", rowId, "discount", setZero);
						} else {
							if(discountPercent.match(checkValue))
							{
								if(Number(discountPercent) > 0)
								{
									disAmt = (total1/100)*discountPercent;
									newSalePrice = total1 - disAmt;
									finalSP = newSalePrice;
									//spForOneItemAfterDisCal = newSalePrice/quantity;
									$("#jqGrid1").jqGrid("setCell", rowId, "discount", disAmt.toFixed(2));
									$("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", newSalePrice.toFixed(2));
									$("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", newSalePrice.toFixed(2));
								} else {
									//newSalePrice = tota;
									var setZero = 0;
									$("#jqGrid1").jqGrid("setCell", rowId, "discount", setZero);
									$("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", tota1.toFixed(2));
									$("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", tota1.toFixed(2));
									//spForOneItemAfterDisCal  = tota;
									//alert("spForOneItemAfterDisCal 1 :- "+spForOneItemAfterDisCal);
								}
							}/* else {
								myAlert("Please Enter Valid Discount %");
								$("#jqGrid2").jqGrid("setCell", rowId, "disPerForBill", setZero);
								disPer = setZero;
							}*/
						}
						
						if(Number(gst) > 0)
						{
							newTaxAmt = (newSalePrice/100)*gst;
							//finalSP = newSalePrice + newTaxAmt;
							finalSP = newSalePrice;
							$("#jqGrid1").jqGrid("setCell", rowId, "taxAmt", newTaxAmt.toFixed(2));
							$("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", finalSP.toFixed(2));
							$("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", finalSP.toFixed(2));
						}
	
						            	 if(tota == 0)
						            	 {
						            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", tota);
						            	 } else {
						            		 var gross = ((discount/100)*tota) + tota;
						            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", gross);
						            	 }
	
						            	 $("#jqGrid1").jqGrid("setCell", rowId, "totalAmt", tota);
						            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
						            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
						            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
						            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
						            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
						            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
						            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
						            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
						            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
						            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
						            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
										document.getElementById("returnGrossTotal4").value = parseTotal2.toFixed(2);
										document.getElementById("grossTotalAmount4").value = parseTotal.toFixed(2);
						             },
						             footerrow: true, // set a footer row
	
						             gridComplete: function() {
	
						            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
						            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
						            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
						            	 var parseTotalDis=  $(this).jqGrid('getCol', 'discount', false, 'sum');
						            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
						            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
						            	 $(this).jqGrid('footerData', 'set', { discount: parseTotalDis });
						            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
						            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
						            	 //$(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
						            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
										document.getElementById("returnGrossTotal4").value = parseTotal2.toFixed(2);
										document.getElementById("grossTotalAmount4").value = parseTotal.toFixed(2);
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
			            		 myAlert("Return Quantity Is Greater Than Quantity");
			            	 }
			            	 var afterquantity = quantity - editQuantity;
			            	 var tota = afterquantity * salePrice;
			            	 var total1 = editQuantity * salePrice;

			            	 $("#jqGrid1").jqGrid("setCell", rowId, "returnTotalAmt", total1);

			            	 if(tota == 0){

			            		 $("#jqGrid1").jqGrid("setCell", rowId, "grossamt", tota);
			            	 } else {
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
							document.getElementById("returnGrossTotal4").value = parseTotal2.toFixed(2);
							document.getElementById("grossTotalAmount4").value = parseTotal.toFixed(2);
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
		successAlert(data);
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

function getBillByCustomer1()
{
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,creditCustomer;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
		}
	}
	var creditCustomer = creditCustomer;
	$("#billNo2").empty();
	$("#billNo2").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};
	params["creditCustomer"]= creditCustomer;
	params["methodName"] = "getAllBillByCustomer2";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
	var jsonData = $.parseJSON(data);
	$.each(jsonData,function(i,v)
	{
		$("#billNo2").append($("<option></option>").attr("value",i).text(v.billNo)); 
	});
	})
}

function validateCreditNoteTrId()
{
	var sRTrId = $("#sRTransactionId").val();
	if(sRTrId == null || sRTrId == "" || sRTrId == undefined || sRTrId == " ")
	{
		myAlert("Please Enter Sale Return Trasansaction Id");
		return false;
	}
	else
	{
		getCreditNoteForSaleReturn();
	}
}

function getCreditNoteForSaleReturn()
{
	var sRTransactionId = $("#sRTransactionId").val();
	var params = {};
	params["sRTransactionId"] = sRTransactionId;
	params["methodName"] = "saleReturnCreditNote";

	$.post('/SMT/jsp/utility/controller.jsp', params,
			function(data) {
		location.reload(true);
		//window.open("Other_Bill_CopyPDF_GHANTALWAR.jsp");
		window.open("PDFSaleReturn.jsp");
		//window.open("ghantalwarMensWearPDFSaleReturn.jsp");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}



// JS Code Sale Return By Mobile Number

//var items = new getItemDetails();
function getBillNoListByMobileNoForSaleReturnByMobileNo()
{
	var input = document.getElementById('mobileNo'),
	list = document.getElementById('mobileNoList_Drop'),
	i,pkBillId,ContactNo;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			pkBillId = list.options[i].getAttribute('data-value');
			ContactNo = list.options[i].getAttribute('value');
		}
	}
	
	if(pkBillId == null){
		alert("Select Mobile Number, Do Not Enter!!!"+pkBillId);
	}
	var contactNumber = ContactNo;
	$("#billNoMob").empty();
	$("#billNoMob").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};
	
	params["contactNumber"]= contactNumber;
	params["methodName"] = "getBillNoListByMobileNoForSaleReturnByMobileNo";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			$("#billNoMob").append($("<option></option>").attr("value",v.billNo).text(v.billNo)); 
				});
			})
}

function getSaleItemsGridForSaleReturnByMobileNo()
{
	var billNo = $('#billNoMob').val();
	
	var params = {};
	
	params["methodName"] = "getSaleItemsGridForSaleReturnByMobileNo";
	params["billNo"] = billNo;

	$.post('/SMT/jsp/utility/controller.jsp',
			params,
			function(data) {

				$("#jqGridForMobileNoWise").jqGrid("clearGridData");

				var jsonData = $.parseJSON(data);
				var catmap = jsonData.list;
				$.each(jsonData, function(i, v) {
					$("#jqGridForMobileNoWise").jqGrid(
							{
								datatype : "local",

								colNames : [ "itemID","fkgoodreciveid", "Date", "Contact No", "CatId", "Category<br>Name", "productId", "Item Name", "SubCatId", "Barcode No",
								             "Quantity", "Return<br>Quantity", "SalePrice", "Return<br>Total", "Discount<br>%", "Discount<br>Amount", "Size", 
								              "gst", "Igst", "Tax amount", "Total", "finalTotalPerProduct","fkShopId"],

								             colModel : [
								             
								             {
								            	 name : "pkBillId",
								            	 hidden : true
								             },
								             {
								            	 name : "fkgoodreciveid",
								            	 hidden : true
								             },
											 {
								            	 name : 'Date',
								            	 width : 140,
								             },
								             {
								            	 name : "contactNo",
								            	 width : 120,
								             },
								             {
								            	 name : "catId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "categoryName",
								            	 width : 140,
								             },
								             {
								            	 name : "productId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "itemName",
								            	 width : 150,
								             },
								             {
								            	 name : "subCatId",
								            	 hidden : true
								             }, 
								             {
								            	 name : "barcodeNo",
								            	 width : 100,
								             },
								             {
								            	 name : 'quantity',
								            	 width : 100,
								             },								
								             {
								            	 name : 'editQuantity',
								            	 width : 100,
								            	 editable : true,
								            	 classes: 'myBackGroundColor'
								             },
								             {
								            	 name : "salePrice",
								            	 width : 100,
								             },
								             {
								            	 name : "returnTotalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },
								             {
								            	 name : 'discountPercent',
								            	 width : 100,
								             },
								             {
								            	 name : 'discount',
								            	 width : 100,
								             },
								             {
								            	 name : 'size',
								            	 width : 140,
								            	 hidden : true,								            	 
								             },
								             {
								            	 name : 'gst',
								            	 width : 140,
								             },
								             {
								            	 name : 'iGst',
								            	 width : 140,
								            	 hidden: true,
								             },
								             {
								            	 name : 'taxAmt',
								            	 width : 140,
								             },	
								             {
								            	 name : "totalAmt",
								            	 width : 150,
								            	 formatter: 'number',
								             },
								             {
								            	 name : 'finalTotalPerProduct',
								            	 width : 140,
								            	 formatter: 'number',
								            	 //hidden: true,
								             },
								             {
								            	 name : 'fkShopId',
								            	 width : 140,
								            	 hidden: true,
								             },

								             ],

								             loadonce: false,
								             viewrecords: true,
								             width: 1800,
								             shrinkToFit: true,
								             rowList : [10,20,50],
								             rownumbers: true,
								             rowNum: 10,
								             'cellEdit':true,
								             afterSaveCell: function()
								             {
								            	 var rowId =$("#jqGridForMobileNoWise").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGridForMobileNoWise").getRowData(rowId);
								            	 var quantity = rowData['quantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var salePrice = rowData['salePrice'];
								            	 var discountPercent = rowData['discountPercent'];
								            	 var discount = rowData['discount'];
								            	 var pName = rowData['itemName'];
								            	 var unit = rowData['size'];
								            	 var taxAmt = rowData['taxAmt'];
								            	 var gst = rowData['gst'];
								            	 var iGst = rowData['iGst'];
								            	 var finalTotalPerProduct = rowData['finalTotalPerProduct'];
												var totalAmt = rowData['totalAmt'];
												//var finalTotalPerProduct = rowData['finalTotalPerProduct'];
												var setZero = 0;
												var checkValue = /^[0-9]+\.?[0-9]*$/;
												var newSalePrice = 0;
												var disAmt = 0;
												var newTaxAmt = 0;
												var finalSP = 0;
								            	 
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
								            	 {
								            		 	editQuantity = 0;
								            		 	var setZero = 0;
							                    		$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "editQuantity", setZero);
							                    		return false;
								            	 }
								            	 
								            	 if(editQuantity == "0" || editQuantity == "")
								            	 {
								            		 var edit = "00";
								            		 $("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "editQuantity", edit);
								            	 }
								            	 
								            	 if(Number(editQuantity) > Number(quantity))
								            	 {
								            		 myAlert("Return Quantity Is Greater Than Quantity");
								            		 var totalAmt = rowData['finalTotalPerProduct'];
								            		 var rtota = 0.00;
								            		 var edit = "00";
								            		 	$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "returnTotalAmt", rtota);
							                    		$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "totalAmt", totalAmt);
							                    		$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "editQuantity", edit);							                    		
								            		 
								            		 return false;
								            	 }

								            	 var afterquantity = quantity - editQuantity;

								            	 var tota = afterquantity * finalTotalPerProduct;
												var tota1 = (editQuantity * salePrice);
												newSalePrice = tota1;
												finalSP = tota1;
												$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "returnTotalAmt", tota1);
												
						if(discountPercent == "" || discountPercent == '0' || discountPercent == null || discountPercent == undefined)
						{
							$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "discountPercent", setZero);
							$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "discount", setZero);
						} else {
							if(discountPercent.match(checkValue))
							{
								if(Number(discountPercent) > 0)
								{
									disAmt = (tota1/100)*discountPercent;
									newSalePrice = tota1 - disAmt;
									finalSP = newSalePrice;
									//spForOneItemAfterDisCal = newSalePrice/quantity;
									$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "discount", disAmt.toFixed(2));
									$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "returnTotalAmt", newSalePrice.toFixed(2));
									$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "totalAmt", newSalePrice.toFixed(2));
								} else {
									//newSalePrice = tota;
									var setZero = 0;
									$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "discount", setZero);
									$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "returnTotalAmt", tota1.toFixed(2));
									$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "totalAmt", tota1.toFixed(2));
									//spForOneItemAfterDisCal  = tota;
									//alert("spForOneItemAfterDisCal 1 :- "+spForOneItemAfterDisCal);
								}
							}/* else {
								myAlert("Please Enter Valid Discount %");
								$("#jqGrid2").jqGrid("setCell", rowId, "disPerForBill", setZero);
								disPer = setZero;
							}*/
						}
						
						if(Number(gst) > 0)
						{
							newTaxAmt = (newSalePrice/100)*gst;
							//finalSP = newSalePrice + newTaxAmt;
							finalSP = newSalePrice;
							$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "taxAmt", newTaxAmt.toFixed(2));
							$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "returnTotalAmt", finalSP.toFixed(2));
							$("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "totalAmt", finalSP.toFixed(2));
						}

								            	 if(tota == 0)
								            	 {

								            		 $("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "grossamt", tota);
								            	 } else {
								            		 var gross = ((discount/100)*tota) + tota;
								            		 $("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "grossamt", gross);
								            	 }

								            	 $("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "totalAmt", tota);
								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3});
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
												document.getElementById("returnGrossTotal3").value = parseTotal2.toFixed(2);
												document.getElementById("grossTotalAmount3").value = parseTotal.toFixed(2);
								             },
								             footerrow: true, // set a footer row

								             gridComplete: function() {

								            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
								            	 var parseTotal3=  $(this).jqGrid('getCol', 'discount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { discount: parseTotal3 });
								            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
												document.getElementById("returnGrossTotal3").value = parseTotal2.toFixed(2);
												document.getElementById("grossTotalAmount3").value = parseTotal.toFixed(2);
								             },

								             pager : "#jqGridPagerForMobileNoWise",

							});

					$("#jqGridForMobileNoWise").addRowData(i, jsonData[i]);

					$('#jqGridForMobileNoWise')
					.navGrid(
							'#jqGridPagerForMobileNoWise',
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
									$('#jqGridForMobileNoWise').trigger( 'reloadGrid' );
									

					            	 var rowId =$("#jqGridForMobileNoWise").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGridForMobileNoWise").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var salePrice = rowData['salePrice'];
					            	 var discount = rowData['discount'];

					            	 if(Number(editQuantity) > Number(quantity))
					            	 {
					            		 myAlert("Return Quantity Is Greater Than Quantity");
					            	 }

					            	 var afterquantity = quantity - editQuantity;

					            	 var tota = afterquantity * salePrice;

					            	 var tota1 = editQuantity * salePrice;

					            	 $("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "returnTotalAmt", tota1);

					            	 if(tota == 0){

					            		 $("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "grossamt", tota);
					            	 }
					            	 else{
					            		 var gross = ((discount/100)*tota) + tota;
					            		 $("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "grossamt", gross);

					            	 }

					            	 $("#jqGridForMobileNoWise").jqGrid("setCell", rowId, "totalAmt", tota);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'totalAmt', false, 'sum');
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'grossamt', false, 'sum');
					            	 var parseTotal2=  $(this).jqGrid('getCol', 'returnTotalAmt', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { contactNo: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { totalAmt: parseTotal});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { grossamt: parseTotal1});
					            	 $(this).jqGrid('footerData', 'set', { discount: "Final Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotalAmt: parseTotal2});
									document.getElementById("returnGrossTotal3").value = parseTotal2.toFixed(2);
									document.getElementById("grossTotalAmount3").value = parseTotal.toFixed(2);
					             
								},
								errorTextFormat: function (data) {
									return 'Error: ' + data.responseText
								},
								onSelectRow: function(id) {
									if (id && id !== lastSel) {
										jQuery("#jqGridForMobileNoWise").saveRow(lastSel, true, 'clientArray');
										jQuery("#jqGridForMobileNoWise").editRow(id, true);
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



function salReturnByMobNoValidation()
{
	var input = document.getElementById('mobileNo'),
	list = document.getElementById('mobileNoList_Drop'),
	i,pkBillId,ContactNo;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			pkBillId = list.options[i].getAttribute('data-value');
			ContactNo = list.options[i].getAttribute('value');
		}
	}
	
	if(pkBillId == null){
		alert("Please Select Mobile Number Only, Do Not Enter!!!"+pkBillId);
		return false;
	}
	
	var mobileNo = $('#mobileNo').val();
	var billNoMob = $('#billNoMob').val();
	
	if(mobileNo == "" || mobileNo == undefined || mobileNo == null){
		alert("Please Select Mobile Number...!!!");
		return false;
	}
	
	if(billNoMob == "" || billNoMob == undefined || billNoMob == null){
		alert("Please Select Bill Number Only, Do Not Enter...!!!");
		return false;
	}
	
	salReturnByMobNo();
}

function salReturnByMobNo()
{
	var params = {};
	
	
	var input = document.getElementById('mobileNo'),
	list = document.getElementById('mobileNoList_Drop'),
	i,pkBillId,ContactNo;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			pkBillId = list.options[i].getAttribute('data-value');
			ContactNo = list.options[i].getAttribute('value');
		}
	}
	
	/*var input = document.getElementById('creditCustomer5'),
	list = document.getElementById('cust_drop5'),
	i,creditCustomer,creditCustomer1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			creditCustomer = list.options[i].getAttribute('data-value');
			creditCustomer1 = list.options[i].getAttribute('value');
		}
	}*/
	
	var count = jQuery("#jqGridForMobileNoWise").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGridForMobileNoWise').getGridParam('data');
	var totalAmount = 0;
	var checkQuantity = 0;
	var AllRows = JSON.stringify(allRowsInGrid);
	for (var i = 0; i < count; i++) {

		var pkBillId = allRowsInGrid[i].pkBillId;
		params["pkBillId" + i] = pkBillId;
		
		var fkgoodreciveid = allRowsInGrid[i].fkgoodreciveid;
		params["fkgoodreciveid" + i] = fkgoodreciveid;

		var carNo = allRowsInGrid[i].carNo;
		params["carNo" + i] = carNo;
		
		var contactNo = allRowsInGrid[i].contactNo;
		params["contactNo" + i] = contactNo;
		
		var Date = allRowsInGrid[i].Date;
		params["Date"+i] = Date;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
		
		var productId = allRowsInGrid[i].productId;
		params["productId"+i] = productId;
		
		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;
		
		var catId = allRowsInGrid[i].catId;
		params["catId"+i] = catId;

		var categoryName = allRowsInGrid[i].categoryName;
		params["categoryName" + i] = categoryName;
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId"+i] = subCatId;

		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;

		var editQuantity = allRowsInGrid[i].editQuantity;
		if(editQuantity > 0)
		{
			checkQuantity++;
		}
		params["editQuantity" + i] = editQuantity;
		/*
		if(editQuantity == 0)
		{
			myAlert("Enter Return Quantity.");
			location.reload();
			return false;
		}*/
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;

		var discountPercent = allRowsInGrid[i].discountPercent;
		params["discountPercent"+i] = discountPercent;
		
		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;
		
		var gst = allRowsInGrid[i].gst;
		params["gst"+i] = gst;
		
		var iGst = allRowsInGrid[i].iGst;
		params["iGst"+i] = iGst;
		
		var taxAmt = allRowsInGrid[i].taxAmt;
		params["taxAmt"+i] = taxAmt;
		
		var returnTotalAmt = allRowsInGrid[i].returnTotalAmt;
		if(returnTotalAmt == "" || returnTotalAmt == undefined || returnTotalAmt == null)
		{
			returnTotalAmt = 0;
		}
		params["returnTotalAmt"+i] = returnTotalAmt;

		var totalAmt = allRowsInGrid[i].totalAmt;
		params["totalAmt"+i] = totalAmt;
		
		var finalTotalPerProduct = allRowsInGrid[i].finalTotalPerProduct;
		params["finalTotalPerProduct"+i] = finalTotalPerProduct;
		
		var grossamt = allRowsInGrid[i].grossamt;
		params["grossamt"+i] = grossamt;
		
		var shopId = allRowsInGrid[i].fkShopId;
		params["shopId"+i] = shopId;
	}
	if(checkQuantity > 0){}
	else {
	 	myAlert("Please Enter Return Quantity");
		return false;
	}
	
	var creditCustomer1 = "";
	var billNo = $('#billNoMob').val();
	var transactionIdSr = $('#transactionIdSr').val();
	var reasonForSReturn1 = $('#reasonForSReturn1Mob').val();
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	var returnGrossTotal = $('#returnGrossTotal3').val();
	var grossTotalAmount = $('#grossTotalAmount3').val();
	
	params["billNo"] = billNo;
	params["count"] = count;
	params["creditCustomer1"] = creditCustomer1;
	params["ContactNo"] = ContactNo;
	params["transactionIdSr"] = transactionIdSr;
	params["reasonForSReturn1"] = reasonForSReturn1;
	params["userType"] = userType;
	params["userName"] = userName;
	params["returnGrossTotal"] = returnGrossTotal;
	params["grossTotalAmount"] = grossTotalAmount;
	
	params["methodName"] = "salReturnByMobNo";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		successAlert(data);
		//location.reload();
		window.open("PDFSaleReturn.jsp");
		//window.open("PDFSaleReturn.jsp");
		//window.open("ghantalwarMensWearPDFSaleReturn.jsp");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}










