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

function getCurrentNewSupplierData()
{
	var input = document.getElementById('updateSupplierId'),
	list = document.getElementById('updateSupplierId_drop'),
	i,newSupplierId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			newSupplierId = list.options[i].getAttribute('data-value');
		}
	}
	var newSupplierId = newSupplierId;
	var lastSupplier = $("#supplierId").val();
	var splitLastSupplier  = lastSupplier.split(",");
	var lastSuppId = splitLastSupplier[0];
	
	if(lastSuppId == null || lastSuppId == "" || lastSuppId == undefined || lastSuppId == " ")
	{
		myAlert("Please Enter Voucher Number");
		document.getElementById("newSuppPendingAmount").value = "";
		document.getElementById("updateSupplierId").value = "";
		
		return false;
	}
	else{}
	
	if(lastSuppId == newSupplierId)
	{
		myAlert("You Can't Select Same Supplier");
		document.getElementById("newSuppPendingAmount").value = "";
		document.getElementById("updateSupplierId").value = "";
		
		return false;
	}
	else{}	
	
	document.getElementById("newSuppPendingAmount").value = "";
	
	var params= {};
	params["newSupplierId"]= newSupplierId;
	params["methodName"] = "getCurrentNewSupplierPendingAmountController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){

	var jsonData = $.parseJSON(data);
	var catmap = jsonData.list;
	$.each(jsonData,function(i,v)
	{
		document.getElementById("newSuppPendingAmount").value = v.pendingSuppBalance;
	});
	})
}

function getAllBillsForEditPurchase()
{
	var input = document.getElementById('supplierId'),
	list = document.getElementById('supplierId_drop'),
	i,supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}
	var supplier = supplier;
	
	$("#billNo").empty();
	$("#billNo").append($("<option></option>").attr("value","").text("Select bill"));
	var params= {};

	params["methodName"] = "getAllBillBySuppliers";//"getAllBillBySuppliers";
	params["supplier"]= supplier;
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			$("#billNo").append($("<option></option>").attr("value",i).text(v.billNo));
		});
	})
}

function getItemsFromVoucherNo()
{
	var voucherNo = $('#voucherNo').val();
	
	var params = {};
	params["voucherNo"] = voucherNo;
	params["methodName"] = "getTotalItemByVoucherNoForEditGR";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		$("#jqGrid").jqGrid("clearGridData");

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;				
		
		$.each(jsonData, function(i, v)
		{					
			document.getElementById("supplierId").value = v.supplierName2+","+v.suppCode;
			document.getElementById("supplierId123").value = v.pkSuppId;
			document.getElementById("billNo").value = v.billNo;
			document.getElementById("pEDate").value = v.ondate; 
			document.getElementById("totalQuantity").value = v.totalQuantity;
			document.getElementById("editGrossTotal").value = v.finalGrossTotal;
			document.getElementById("contactPerson").value = v.contactPerson;
			document.getElementById("finalGrossTotalHidden").value = v.finalGrossTotal;
			document.getElementById("pendingBillpaymentHidden").value = v.pendingBillPayment;
			
			$("#jqGrid").jqGrid(
					{
						datatype : "local",

						colNames : [
										"itemID", "Barcode<br>No", "productId", "Item Name", "catId", "Category", "subCatId", "Sub<br>Category","HSN/<br>SAC", "Color", 
										"Roll<br>Size", "Size", "Style", "oriQTY", "Original<br>Quantity", "Returned<br>Quantity", "Quantity", "Sold<br>Quantity", "Available<br>Quantity", 
										"final Buy Price Ex. Tax", "Buy Price<br>Ex. Tax", "Final Sale Price Inc. Tax", "Sale Price<br>Inc. Tax", "Purchase Code", 
										"Final Discount", "Discount", "GST", "IGST", "finalGST", "finalIGST", "Return Total", "Tax<br>Amount", 
										"Total","Contact Person", "Supplier Id", "Gross Total", "fkShopId"
									],
						             autoheight: true,
						             
						             colModel : [ 
						             {
						            	 name : "PkGoodRecId",
						            	 hidden : true
						             },
						             {
						            	 name : 'barcodeNo',
						            	 width : 100,
						             },
						             {
						            	 name : "productId",
						            	 hidden : true
						             },
						             {
						            	 name : "itemName",
						            	 width : 200,
						             },
						             {
						            	 name : "catId",
						            	 hidden : true
						             },
						             {
						            	 name : "catName",
						            	 width : 120,
						             },
						             {
						            	 name : "subCatId",
						            	 hidden : true
						             },
						             {
						            	 name : "subcatName",
						            	 width : 120,
						             },
						             {
						            	 name : 'hsnSac',
						            	 width : 70,
						            	// hidden: true,
						            	 editable : true
						             },
						             {
						            	 name : 'color',
						            	 width : 70,
						            	// hidden: true,
						            	 editable : true
						             },
						             {
						            	 name : 'rollsize',
						            	 width : 80,
						            	 //editable : true,
						            	 //hidden:true,
						             },
						             {
						            	 name : 'size',
						            	 width : 50,
						            	// hidden: true,
						            	//editable : true
						             },
						             {
						            	 name : 'style',
						            	 width : 70,
						            	// hidden: true,
						            	 editable : true
						             },								             
						             {
						            	 name : "oriQuantity",
						            	 width : 80,
						            	 hidden:true,
						            	 // must set editable to true if you want to make the field editable
						             },
						             {
						            	 name : "barQtyTotalPuchaseQty",
						            	 width : 80,
						            	 //hidden:true,
						            	 // must set editable to true if you want to make the field editable
						             },
						             { 
						            	 name : 'returnedQty',
						            	 width : 70,
						            	 //hidden:true,
						             },	
						             {
						            	 name : "quantity",
						            	 width : 80,
						            	 editable : true,
						            	 //classes: 'myBackGroundColor',
						            	 // must set editable to true if you want to make the field editable
						            	 editoptions:{
												dataInit: function(element)
											    {																						
											        $(element).keypress(function(e)
											        {
											             if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57))
											             {
											                return false;
											             }
											        });																				        
											    }
								            }
						             },								             
						             { 
						            	 name : 'soldQty',
						            	 width : 70,
						            	 //hidden:true,
						             },	
						             {
						            	 name : "availquantity",
						            	 width : 100,
						            	// editable : true
						            	 // must set editable to true if you want to make the field editable
						             },
						             {
						            	 name : 'finalBuyPrice',
						            	 width : 100,
						            	 hidden : true
						             },
						             {
						            	 name : 'buyPrice',
						            	 width : 100,
						            	 editable : true,
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
						            	 name : 'finalSalePrice',
						            	 width : 100,
						            	 hidden : true
						             },
						             {
						            	 name : 'salePrice',
						            	 width : 100,
						            	 editable : true,
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
						            	 name : 'purchaseCode',
						            	 width : 70,
						            	 editable : true,
						            	 hidden : true
						             },
						             {
						            	 name : 'finalDisPer',
						            	 width : 70,								            	 
						            	 hidden : true
						             },
						             {
						            	 name : 'discount',
						            	 width : 70,
						            	 editable : true,
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
						            	 //hidden : true
						             },
						             {
						            	 name : 'vat',
						            	 width : 60,
						            	 editable : true,
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
						            	 name : 'igst',
						            	 width : 60,
						            	 editable : true,
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
						            	 name : 'finalVat',
						            	 width : 70,
						            	 hidden:true,
						             },
						             {
						            	 name : 'finalIgst',
						            	 width : 70,
						            	 hidden:true,
						             },
						             {
						            	 name : "returnTotal",
						            	 width : 150,
						            	 hidden:true,
						             },
						             {
						            	 name : "taxAmount",
						            	 width : 90,
						            	 //formatter: 'integer',
						             },
						             {
						            	 name : "total",
						            	 width : 120,
						            	 //formatter: 'integer',
						             },
						             {
						            	 name : 'contactPerson',
						            	 width : 160,
						            	 hidden : true
						             },
						             {
						            	 name : 'supplierId',
						            	 width : 150,
						            	 hidden: true,
						             },
						             {
						            	 name : 'grossTotal',
						            	 width : 150,
						            	 hidden:true,
						             },
						             {
						            	 name : 'fkShopId',
						            	 width : 150,
						            	 hidden:true,
						             },
						             ],
						            
						             loadonce: false,
						             viewrecords: true,
						             width: 1800,
						             shrinkToFit: true,
						             rowList : [20,30,50],
						             rownumbers: true,
						             rowNum: 10,
						             'cellEdit':true,
								             
								             afterSaveCell: function ()
								             {
								            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
								            	 var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
								            	 var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
								            	 var barQtyTotalPuchaseQty = rowData['barQtyTotalPuchaseQty'];
								            	 var oriQuantity = rowData['oriQuantity'];
								            	 var quantity = rowData['quantity'];
								            	 var availquantity = rowData['availquantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var finalBuyPrice = rowData['finalBuyPrice'];
								            	 var buyPrice = rowData['buyPrice'];								            	 
								            	 var finalSalePrice = rowData['finalSalePrice'];
								            	 var salePrice = rowData['salePrice'];
								            	 var vat = rowData['vat'];
								            	 var igst = rowData['igst'];
								            	 var finalVat = rowData['finalVat'];
									             var finalIgst = rowData['finalIgst'];
								            	 var dis = rowData['discount'];
								            	 var returnTotal = rowData['returnTotal'];
								            	 var total = rowData['total'];
								            	 var rollS = rowData['rollsize'];
								            	 var unit = rowData['size'];
								            	 var finalDisPer = rowData['finalDisPer'];
								            	 var discount = rowData['discount'];
								            	 var billNo = rowData['billNo'];
								            	 var supplierName2 = rowData['supplierName2'];
								            	 var grossTotal = rowData['grossTotal'];
								            	 var taxAmount = rowData['taxAmount'];
								            	 var soldQty = rowData['soldQty'];
								            	 var returnedQty = rowData['returnedQty'];
								            	 var totAmt = 0;
								            	 var totalAmt = 0;
								            	 var totAmt1 = 0;
								            	 var totalAmt1 = 0;
								            	 var totadis = 0;
								            	 var setZero = 0;
								            	 var checkQty = /^[0-9]+$/;
								            	 var checkValue = /^[0-9]+\.?[0-9]*$/;
								            	 
								            	 if(quantity != "" || quantity != null || quantity != undefined || quantity != "")
								            	 {
								            		 if(quantity.match(checkQty))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid Quantity");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter Quantity");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
								            		 return false;
								            	 }
								            	 
								            	 if(buyPrice != "" || buyPrice != null || buyPrice != undefined || buyPrice != "")
								            	 {
								            		 if(buyPrice.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid Buy Price");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "buyPrice", finalBuyPrice);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter Buy Price");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "buyPrice", finalBuyPrice);
								            		 return false;
								            	 }
								            	 
								            	 if(salePrice != "" || salePrice != null || salePrice != undefined || salePrice != "")
								            	 {
								            		 if(salePrice.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid Sale Price");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "salePrice", finalSalePrice);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter Sale Price");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "salePrice", finalSalePrice);
								            		 return false;
								            	 }
								            	 
								            	 if(discount != "" || discount != null || discount != undefined || discount != "")
								            	 {
								            		 if(discount.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid Discount Percentage");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "discount", finalDisPer);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter Discount Percentage");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "discount", finalDisPer);
								            		 return false;
								            	 }		
								            	 
								            	 if(discount != "" || discount != null || discount != undefined || discount != "")
								            	 {
								            		 if(discount.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid Discount Percentage");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "discount", finalDisPer);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter Discount Percentage");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "discount", finalDisPer);
								            		 return false;
								            	 }		
								            	 
								            	 if(vat != "" || vat != null || vat != undefined || vat != "")
								            	 {
								            		 if(vat.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid GST");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "vat", finalVat);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter GST");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "vat", finalVat);
								            		 return false;
								            	 }		
								            	 
								            	 if(igst != "" || igst != null || igst != undefined || igst != "")
								            	 {
								            		 if(igst.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid IGST");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "igst", finalIgst);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter IGST");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "igst", finalIgst);
								            		 return false;
								            	 }		

								            	/*if(Number(editQuantity) > Number(availquantity))
								            	 {myAlert("Return Quantity Is Greater Than Availabel Quantity");								            		 
								            		 var rtota = 0.00;
								            		 var maiTota = total;
								            		 var edit = 0;
							            		 	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", rtota);
						                    		 $("#jqGrid").jqGrid("setCell", rowId, "total", maiTota);
						                    		 $("#jqGrid").jqGrid("setCell", rowId, "editQuantity", edit);
								            		 return false;}*/
								            	 
								            	 if(availquantity > 0)
								            	 {								            		 
								            		if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
													{
								            			var mtrInSoldQty = (soldQty/rollS);
								            			if((+mtrInSoldQty + +returnedQty) > quantity)
										            	{
										            		myAlert("Sold Quantity + Return Quantity is Greater Than Entered Purchase Quantity");
										            		$("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
										            		return false;
										            	}
								            		}
								            		else
								            		{
										            	if((+soldQty + +returnedQty) > quantity)
										            	{
										            		myAlert("Sold Quantity + Return Quantity is Greater Than Entered Purchase Quantity");
										            		$("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
										            		return false;
										            	}
								            		}
								            	 }
								            	 else{}
								            	 
								            	 
								            	 	var afterquantity = quantity;// - editQuantity;
								            	 	var tota = 0;
								            	 	if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
													{
								            	 		tota = (afterquantity*rollS) * buyPrice;
													}
								            	 	else
													{
														tota = afterquantity * buyPrice;
														var rollSize = 0;
														$("#jqGrid").jqGrid("setCell", rowId, "rollsize", rollSize);
													}								            	 	
								            	 	
								            	 	if(vat == "" || vat == " ")
								            	 	{
								            	 		$("#jqGrid").jqGrid("setCell", rowId, "vat", setZero);
								            	 	}
								            	 	if(igst == "" || igst == " ")
								            	 	{
								            	 		$("#jqGrid").jqGrid("setCell", rowId, "igst", setZero);
								            	 	}
								            	 	
								            	 	if(vat > 0 && igst > 0)
								            	 	{
								            	 		myAlert("Please Enter Either GST OR IGST");
								            	 		
										            	if(finalVat > 0)
										            	{
										            		vat = finalVat;
										            		$("#jqGrid").jqGrid("setCell", rowId, "vat", finalVat);
										            		$("#jqGrid").jqGrid("setCell", rowId, "igst", "0");
										            	}
										            	else if(finalIgst > 0)
										            	{
										            		igst = finalIgst;
										            		$("#jqGrid").jqGrid("setCell", rowId, "igst", finalIgst);
										            		$("#jqGrid").jqGrid("setCell", rowId, "vat", "0");
										            	}
								            	 		return false;
								            	 	}								            	 	
								            	 	
								            	 	for (var r = 0; r < count1; r++)
													{
														if(vat > 0 )
														{	
															var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
															for (var s = 0; s < count1; s++)
															{
																var rowId1 = ids[s];
																var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																var currentIgst = rowData1['igst'];
																if(currentIgst > 0)
																{
																	var setZero = 0;
																	var totalBuyP = 0;
																	var taxAmt = 0;
																	if(finalVat > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																			var taxAmt = (totalBuyP*(finalVat/100));
																	}
																	else if(finalIgst > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																			var taxAmt = (totalBuyP*(finalIgst/100));
																	}
																	else{taxAmt = 0;}
																	
																	myAlert("Please Ener Either GST OR IGST");
																	$("#jqGrid").jqGrid("setCell",rowId,"vat",finalVat);
																	$("#jqGrid").jqGrid("setCell",rowId,"igst",finalIgst);
																	$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt.toFixed(2));	
																	return false;
																}
															}
														}
														else{}
														if(igst > 0 )
														{	
															var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
															for (var s = 0; s < count1; s++)
															{
																var rowId1 = ids[s];
																var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																var currentGst = rowData1['vat'];
																if(currentGst > 0)
																{
																	var setZero = 0;
																	var totalBuyP = 0;
																	var taxAmt = 0;
																	
																	if(finalVat > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																		var taxAmt = (totalBuyP*(finalVat/100));
																	}
																	else if(finalIgst > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																			var taxAmt = (totalBuyP*(finalIgst/100));
																	}
																	else{taxAmt = 0;}													
																	
																	myAlert("Please Ener Either GST OR IGST");
																	$("#jqGrid").jqGrid("setCell",rowId,"vat",finalVat);
																	$("#jqGrid").jqGrid("setCell",rowId,"igst",finalIgst);
																	$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt);
																	return false;
																}
															}
														}
														else
														{
															var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
															var gstPer = 0;
															var iGstPer = 0;
															var totalTaxAmount = 0;
															for (var s = 0; s < count1; s++)
															{
																var rowId1 = ids[s];
																var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																var currentTaxAmt = rowData1['taxAmount'];
																gstPer = rowData1['vat'];
																iGstPer = rowData1['igst'];
																totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
																if(gstPer > 0)
																{
																	document.getElementById("totalGst").value = totalTaxAmount;	
																}
																else if(iGstPer > 0)
																{
																	document.getElementById("totalIgst").value = totalTaxAmount;	
																}																	
															}			
															
														}																		
													}
								            	 	
								            	 	if(vat > 0)
													{
								            	 		var totalTaxAmount = 0
														totalBuyP = quantity * buyPrice;
														if(dis > 0)
														{
															totalBuyP = (totalBuyP*(dis/100));
														}
															var taxAmt = (totalBuyP*(finalVat/100));
														
														$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt);
														var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
														for (var s = 0; s < count1; s++)
														{
															var rowId1 = ids[s];
															var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
															var currentTaxAmt = rowData1['taxAmount'];
															totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
														}
								             		}
												
								            	 	else if(igst > 0)
													{
														totalBuyP = quantity * buyPrice;
														if(dis > 0)
														{
															totalBuyP = (totalBuyP*(dis/100));
														}
														var taxAmt = (totalBuyP*(finalVat/100));
														
														$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt);
														
														var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
														for (var s = 0; s < count1; s++)
														{
															var rowId1 = ids[s];
															var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
															var currentTaxAmt = rowData1['taxAmount'];
															totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
														}														
														 document.getElementById("totalIgst").value = totalTaxAmount;			
													}								            	 	
								            	 	
													if (dis > 0) 
													{
														totadis = (((buyPrice*quantity) * (dis)) / 100);

														if(vat > 0 || igst > 0)
														{
															if (vat > 0) 
															{
																totAmt = (((tota - totadis) * (vat)) / 100);
															} 
															else if (igst > 0) 
															{
																totAmt = (((tota - totadis) * (igst)) / 100);
															}
															$("#jqGrid").jqGrid("setCell", rowId, "taxAmount", totAmt);
														}
														else
														{
															$("#jqGrid").jqGrid("setCell", rowId, "taxAmount", "0");
														}
														totalAmt = +(tota-totadis) + +totAmt;
														totalAmt = totalAmt.toFixed(2);
													}
													else 
													{																		
														if (vat > 0) 
														{
															totAmt = ((tota * (vat)) / 100);
														} 
														else if (igst > 0) 
														{
															totAmt = ((tota * (igst)) / 100);
														}
														
														$("#jqGrid").jqGrid("setCell", rowId, "taxAmount", totAmt);
														
														 totalAmt = +tota + +totAmt;
														 totalAmt = totalAmt.toFixed(2);
													}
													
													var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
													for (var s = 0; s < count1; s++)
													{
														var gstCount = 0;
														var iGstCount = 0;
														var totalTaxAmount = 0;
														var rowId1 = ids[s];
														var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
														var currentTaxAmt = rowData1['taxAmount'];
														
														totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
														for (var s = 0; s < count1; s++)
														{
															var rowId12 = ids[s];
															var rowData12 = jQuery("#jqGrid").getRowData(rowId12);
															var currentGst = rowData12['vat'];
															var currentiGst = rowData12['igst'];
															if(currentGst > 0)
															{
																gstCount++;
															}
															else if(currentiGst > 0)
															{
																iGstCount++;
															}
														}
														
														if(gstCount > 0)
														{
															document.getElementById("totalGst").value = totalTaxAmount;
														}
														else if(iGstCount > 0)
														{
															document.getElementById("totalIgst").value = totalTaxAmount;
														}
														
													}														
													//document.getElementById("totalGst").value = gstTotalTaxAmount;
													
								            	 
								            	 $("#jqGrid").jqGrid("setCell", rowId, "total", totalAmt);
								            	 var dist = 0;
								            	 var total1 = 0;
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
												{
								            		total1 = (editQuantity*rollS) * buyPrice;
												}
								            	else
								            	{
								            		total1 = editQuantity * buyPrice;
								            	}
								            	 if (dis > 0) 
													{
								            	 dist = (total1*dis)/100;
								            	 if (vat > 0) 
								            	 {
									            	 totAmt1 =  (((total1-dist)*(vat))/100);
									            	 }
									            	 else if (igst > 0) 
									            	 {
									            		 totAmt1 =  (((total1-dist)*(igst))/100);
									            	 }
									            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
												 }
								            	 else
								            		{
								            		 if (vat > 0) 
													{
								            			totAmt1 = (((total1)*(vat))/100);
									            	}
								            		 	else if (igst > 0) 
													{
									            		totAmt1 = (((total1)*(igst))/100);
									            	}
									            	 	totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
								            		}
								            	 
								            	// document.getElementById("editGrossTotal").value = totalAmt1;								            	 
								            	 
								            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", totalAmt1);
								            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
								            	 parseTotal = parseTotal.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { igst: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'total', false, 'sum');
								            	 parseTotal1 = parseTotal1.toFixed(2);
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'taxAmount', false, 'sum');
								            	 parseTotal2 = parseTotal2.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { taxAmount: parseTotal2});
								            	 if(parseTotal == null || parseTotal == "" || parseTotal == undefined)
								            	 {
								            		 document.getElementById("editGrossTotal").value = "0.0";
								            	 }
								            	 else
								            	 {
								            		 total1 = editQuantity * buyPrice;
								            		 
									            	 if (dis > 0) 
													 {
									            	  dist = (total1*dis)/100;
									            	  if (vat > 0) 
													 {
									            	  totAmt1 =  (((total1-dist)*(vat))/100);
									            	 }
									            	  else if (igst > 0) 
													 {
									            	  	 totAmt1 =  (((total1-dist)*(igst))/100);
									            	 }
									            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
														}
									            	 else
									            		 {
									            		 if (vat > 0) 
															{
										            	 totAmt1 =  (((total1)*(vat))/100);
										            	 }
										            	 else if (igst > 0) 
															{
										            		 totAmt1 =  (((total1)*(igst))/100);
										            		 }
										            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
									            		 
									            		 document.getElementById("editGrossTotal").value = totalAmt1;
									            	 } 
								            	 }
								            	 document.getElementById("editGrossTotal").value = parseTotal1;
								             },
								             
								              // set a footer row
								             //	footerrow: true, 
								             								             
								             gridComplete: function()
								             {								            	 
								            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
								            	 parseTotal = parseTotal.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { igst: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
								            	 var parseTotal1 = $(this).jqGrid('getCol', 'total', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
								            	 var totalTaxAmount = $(this).jqGrid('getCol', 'taxAmount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', {taxAmount: totalTaxAmount});
								            	 var gstTotalTaxAmount = 0;
								            	 var iGstTotalTaxAmount = 0;
								            	 var vat = $(this).jqGrid('getCol', 'vat', false, 'sum');
								            	 var igst = $(this).jqGrid('getCol','igst', false, 'sum');
								            	 parseTotal1 = parseTotal1.toFixed(2);
								            	 if(vat > 0)
								            	 {
								            		 gstTotalTaxAmount = (+gstTotalTaxAmount + +totalTaxAmount).toFixed(2);;
								            	 }
								            	 if(igst > 0)
								            	 {
								            		 iGstTotalTaxAmount = (+iGstTotalTaxAmount + +totalTaxAmount).toFixed(2);;
								            	 }
								            	 
								            	 if(parseTotal == null || parseTotal == "" || parseTotal == undefined)
								            	 {
								            		 document.getElementById("editGrossTotal").value = "0.0";
								            	 }
								            	 else
								            	 {}
								            	 if(vat > 0)
								            	 {
								            		 document.getElementById("totalGst").value = gstTotalTaxAmount;
								            		 document.getElementById("totalIgst").value = "0.0";								            		
								            	 }
								            	 if(igst > 0)
								            	 {
								            		 document.getElementById("totalGst").value = "0.0";
								            		 document.getElementById("totalIgst").value = iGstTotalTaxAmount;
								            	 }
								            	 if((vat == 0 && igst == 0) || (vat == "" && igst == "") || (vat == null && igst == null))
								            	 {
								            		 document.getElementById("totalGst").value = "0.0";
								            		 document.getElementById("totalIgst").value = "0.0";
								            	 }								            		 
								            	 
								            	 document.getElementById("editGrossTotal").value = parseTotal1;
								            	 
								             },
								             pager : "#jqGridPager",
							});
					
					$("#jqGrid").addRowData(i, jsonData[i]);					
					
					$('#jqGrid').navGrid('#jqGridPager',
							// the buttons to appear on the toolbar of the grid
							{ edit: true, add: true, del: false, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
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

							// options for the Delete Dailog
							{
								closeAfterdel:true,
								recreateForm: true,
								afterComplete : function() {
									$('#jqGrid').trigger( 'reloadGrid' );									

					            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var availquantity = rowData['availquantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var buyPrice = rowData['buyPrice'];
					            	 var vat = rowData['vat'];
					            	 var totAmt = 0;
					            	 var totalAmt = 0;
					            	 var totAmt1 = 0;
					            	 var totalAmt1 = 0;

					            	 if(Number(editQuantity) > Number(availquantity))
					            	 {
					            		 myAlert("Return Quantity Is Greater Than Availabel Quantity");
					            	 }
					            	 var afterquantity = quantity - editQuantity;
					            	 var tota = afterquantity * buyPrice;
					            	 totAmt =  ((tota*(vat))/100);
					            	 totalAmt = +tota + +totAmt;
					            	 $("#jqGrid").jqGrid("setCell", rowId, "total", totalAmt);
					            	 var total1 = editQuantity * buyPrice;
					            	 totAmt1 =  ((total1*(vat))/100);
					            	 totalAmt1 = +total1 + +totAmt1;
					            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", totalAmt1);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { vat: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'total', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
					            	 document.getElementById("editGrossTotal").value = totalAmt1;
					             
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
				if (textStatus === "timeout")
				{
				}
			});
}








jhfjkhsdkjhkfjfhggds/////////////************* */

function validateEditPurchaseGrid()
{
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var gstCount = 0;
	for (var i = 0; i < count; i++)
	{
		var allRowsInGrid = $('#jqGrid').getGridParam('data');
		var AllRows = JSON.stringify(allRowsInGrid);
		
		var igst = allRowsInGrid[i].igst;
		
		for(var j = 0; j < count; j++)
		{
			var vat = allRowsInGrid[j].vat;
			if(vat > 0 && igst > 0)
			{
				gstCount++;
			}
		}		
	}
	if(gstCount > 0)
	{
		myAlert("Please Enter GST OR IGST on Row "+count);
		return false;
	}
	else
	{
		editPurchase();
	}
}

function editPurchase()
{
	var params = {};
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGrid').getGridParam('data');
	var AllRows = JSON.stringify(allRowsInGrid);
	
	if(count < 1)
	{
		myAlert("Please Enter Voucher Number");
		return false;
	}
	
	for (var i = 0; i < count; i++)
	{
		var shopId = allRowsInGrid[i].fkShopId;
		params["shopId" + i] = shopId;
		
		var PkGoodRecId = allRowsInGrid[i].PkGoodRecId;
		params["PkGoodRecId" + i] = PkGoodRecId;

		var itemName = allRowsInGrid[i].itemName;
		params["itemName" + i] = itemName;		
		
		var catName = allRowsInGrid[i].catName;
		params["catName" + i] = catName;
		
		var subcatName = allRowsInGrid[i].subcatName;
		params["subcatName" + i] = subcatName;		
		
		var hsnSac = allRowsInGrid[i].hsnSac;
		params["hsnSac" + i] = hsnSac;
		
		var color = allRowsInGrid[i].color;
		params["color" + i] = color;
		
		var size = allRowsInGrid[i].size;
		params["size" + i] = size;
		
		var style = allRowsInGrid[i].style;
		params["style" + i] = style;
		
		var rollsize = allRowsInGrid[i].rollsize;
		params["rollsize" + i] = rollsize;
		
		var oriQuantity = allRowsInGrid[i].oriQuantity;
		params["oriQuantity" + i] = oriQuantity;
		
		var quantity = allRowsInGrid[i].quantity;
		params["quantity" + i] = quantity;
		
		var soldQty = allRowsInGrid[i].soldQty;
		params["soldQty" + i] = soldQty;
		
		var returnedQty = allRowsInGrid[i].returnedQty;
		params["returnedQty" + i] = returnedQty;
		
		var availquantity = allRowsInGrid[i].availquantity;
		params["availquantity" + i] = availquantity;		

		var buyPrice = allRowsInGrid[i].buyPrice;
		params["buyPrice" + i] = buyPrice;
		
		var salePrice = allRowsInGrid[i].salePrice;
		params["salePrice" + i] = salePrice;
		
		var purchaseCode = allRowsInGrid[i].purchaseCode;
		params["purchaseCode" + i] = purchaseCode;
		
		var discount = allRowsInGrid[i].discount;
		params["discount"+i] = discount;
		
		var vat = allRowsInGrid[i].vat;
		params["vat" + i] = vat;
		
		var igst = allRowsInGrid[i].igst ;
		params["igst" + i] = igst;

		var total = allRowsInGrid[i].total;
		params["total" + i] = total;
		
		var barcodeNo = allRowsInGrid[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
			
		var rollsize = allRowsInGrid[i].rollsize;
		params["rollsize"+i] = rollsize;
		
		var productId = allRowsInGrid[i].productId;
		params["productId"+i] = productId;
		
		var catId = allRowsInGrid[i].catId;
		params["catId"+i] = catId;
		
		var subCatId = allRowsInGrid[i].subCatId;
		params["subCatId"+i] = subCatId;
		
		var taxAmount = allRowsInGrid[i].taxAmount;
		params["taxAmount"+i] = taxAmount;
		
		var total = allRowsInGrid[i].total;
		params["total"+i] = total;		
	}

	var voucherNo = $("#voucherNo").val();
	var billNo = $('#billNo').val();
	
	var input = document.getElementById('updateSupplierId'), 
	list = document.getElementById('updateSupplierId_drop'), k, supplierId, supcode;
	for (k = 0; k < list.options.length; ++k)
	{
		if (list.options[k].value === input.value)
		{
			supplierId = list.options[k].getAttribute('data-value');
		}
	}
	if(supplierId == null || supplierId == undefined || supplierId == "" || supplierId == " ")
	{
		var suppName = $("#supplierId").val();
		supplierId = $("#supplierId123").val();
	}	

	var contactPerson = $('#contactPerson').val();
	var pEDate = $('#pEDate').val();
	var editGrossTotal = $("#editGrossTotal").val();
	var finalGrossTotalHidden = $("#finalGrossTotalHidden").val();
	var pendingBillpaymentHidden = $("#pendingBillpaymentHidden").val();
	var grossTotalDiff = ((Number(editGrossTotal)) - (Number(finalGrossTotalHidden)));
	
	if(+grossTotalDiff == 0)
	{}
	else if(grossTotalDiff > 0)
	{
		pendingBillpaymentHidden = ((+pendingBillpaymentHidden) + (+grossTotalDiff));
	}
	else if(grossTotalDiff < 0)
	{
		pendingBillpaymentHidden = (+pendingBillpaymentHidden + (+grossTotalDiff));
	}
	
	params["billNo"] = billNo;
	params["supplierId"] = supplierId;
	params["contactPerson"] = contactPerson;
	params["pEDate"] = pEDate;
	params["editGrossTotal"] = editGrossTotal;
	params["pendingBillpaymentHidden"] = pendingBillpaymentHidden;	
	params["grossTotalDiff"] = grossTotalDiff;
	
	params["count"] = count;
	params["methodName"] = "updatePurchaseReturn";
	
	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
	{
		successAlert(data);
	}).error(function(jqXHR, textStatus, errorThrown)
	{
		if (textStatus === "timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}






//************************ Purchase Edit New Code *************************/

function getAllNonGridPurchaseBillDetailsForPurchaseEditBilling()
{
	
	var voucherNo = $('#voucherNo').val();
	
	$("#billNo").append($("<input/>").attr("value","").text());
	$("#supplierId").append($("<input/>").attr("value","").text());
	$("#pDate").append($("<input/>").attr("value","").text());
	$("#contactPerson1").append($("<input/>").attr("value","").text());
	$("#purchaseDueDate").append($("<input/>").attr("value","").text());
	//$("#totalQuantity").append($("<input/>").attr("value","").text());
	$("#resolution").append($("<input/>").attr("value","").text());
	$("#resolution1").append($("<input/>").attr("value","").text());
	$("#pendingBillpaymentHidden").append($("<input/>").attr("value","").text());
	
	//alert(billNo);
	//alert(partyId);
	
	var params= {};
	params["voucherNo"]= voucherNo;
	params["methodName"] = "getAllNonGridPurchaseBillDetailsForPurchaseEditBilling";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	//$.post('/embel/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
					document.getElementById("billNo").value = v.billNo;
			      	document.getElementById("supplierId").value = v.supplierDetails;
			      	document.getElementById("pDate").value = v.purchaseDate;
			      	document.getElementById("contactPerson1").value = v.contactPerson;
			      	document.getElementById("purchaseDueDate").value = v.purchasePaymentDueDate;
			      	//document.getElementById("totalQuantity").value = v.totalQuantity;
			      	document.getElementById("resolution").value = v.grossTotal;
			      	document.getElementById("resolution1").value = v.grossTotal;
				  	document.getElementById("pendingBillpaymentHidden").value = v.pendigBillPayment;
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {

				}
			});

}

//New in Use
function getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetailsValidation()
{
	var voucherNo = $('#voucherNo').val();
	
	if(voucherNo == "" ||voucherNo == " " ||voucherNo == undefined || voucherNo == null)
	{
		myAlert("Please Enter Voucher Number");
		return false;
	}
	getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetails();
}

function getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetails()
{
	var voucherNo = $('#voucherNo').val();
	
	var params= {};
	
	var productId1;
	
	if(itemName != "" ||itemName != " " ||itemName != undefined || itemName != null)
	{
		var bookingNo = $("#bookingNo").val();
		
		if(bookingNo == null || bookingNo == "" || bookingNo == " " || bookingNo == undefined)
		{
			var input = document.getElementById('itemName'), list = document.getElementById('itemId_drop'),
			i, catName, itemName, hsnsacno, productId, size, fkCatId, subcatId;
			for (i = 0; i < list.options.length; ++i)
			{
				if(list.options[i].value === input.value)
				{
					catName = list.options[i].getAttribute('data-value');
					itemName = list.options[i].getAttribute('myvalue');
					subcatId = list.options[i].getAttribute('myvalue1');
					productId = list.options[i].getAttribute('myvalue2');
					productId1 = productId;
					size = list.options[i].getAttribute('myvalue4');
					fkCatId = list.options[i].getAttribute('myvalue5');
				}
			}
			params["itemName"] = itemName;
			params["catName"] = catName;
			params["productId"] = productId;
			params["size"] = size;
			params["fkCatId"] = fkCatId;
			params["subcatId"] = subcatId;
			document.getElementById('itemName').value = null;
		} else {
			params["bookingNo"] = bookingNo;
			document.getElementById('bookingNo').value = null;
		}
	}
	
	var voucherNoSetEmpty = "Empty";
	if(productId1 != undefined)
	{
		voucherNo = voucherNoSetEmpty;
	}
	
	params["voucherNo"] = voucherNo;
	//params["methodName"] = "getItemsGridAndNonGridGoodReceiveDetailsByVoucherNo";
	//document.getElementById('empId').value ="";
	params["methodName"] = "getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetails";
	
	var count=0;
	var newrow;
	var rowId;
	//var vatAmt = 0;
	//var totAmt = 0;
	
	//var totalWithTax = 0;
	//var tot = 0;
	//var afterDelete;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		var result = data.length;
		
		if(jsonData.offer == null || jsonData.offer == "" || jsonData.offer == " " || jsonData.offer == undefined)
		{
			myAlert("Invalid Advance Booking No.");
			return false;
		}

		$.each(jsonData,function(i,v)
		{
			count = jQuery("#jqGrid").jqGrid('getGridParam', 'records'); 
			var rowdata =$("#jqGrid").jqGrid('getGridParam','data');
			var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
			
			for (var j = 0; j < count; j++)
			{
				var gridBookingNoAB = rowdata[j].bookingNoAB;
				if(gridBookingNoAB == bookingNo)
				{
					newrow=false;
					myAlert("Booking Number Already Inserted !!!");
					var grid = jQuery("#jqGrid");
					grid.trigger("reloadGrid");
					break;
				}
			}
			
			/*function sumFmatter (cellvalue, options, rowObject)
			{
				var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
				var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
				var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');
				var AllRows=JSON.stringify(allRowsInGrid1);
									
				var total = 0;				
				
				var tota = 0;
				var vatAmt = 0;
				var disAmt = 0;
				var finalSP = 0;
				
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
					//document.getElementById("totalAmount1").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
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
					//document.getElementById("discount1").value = grossDisTotal.toFixed(2);// Math.round(totalWithoutTax);
				}
				
				return total;
			}*/
			
			 var prodName,com,packing,unit;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].ItemName;
				  
				
				 var rowId = ids[j];
				 var rowData = jQuery('#jqGrid').jqGrid ('getRowData', rowId);
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
				$("#jqGrid").addRowData(count,jsonData.offer);			
			}			
			
			$("#jqGrid").jqGrid({
				
				datatype: "local",
				
				colNames : [
								"pkGoodRecId", "Barcode<br>No", "fkProductId", "Item Name", "fkcategoryId", "Category<br>Name", "fksubCategoryId", "Sub Category<br>Name","Adv.<br>Booking No","HSN/<br>SAC",
								"Color", "Roll<br>Size", "Size", "Size Fixed", "Style", "Original<br>Quantity", "Barcode<br>Quantity", "Returned<br>Quantity", "Sold<br>Quantity",
								"Available<br>Quantity", "Quantity", "Buy Price<br>Ex. Tax",
								"Sale Price<br>Inc. Tax", "Purchase Code", "Discount<br>%", "Discount<br>Amount", "GST<br>%", "IGST<br>%",
								"Tax<br>Amount", "Total", "fkShopId"
				],
				//autoheight: true,
				
				colModel : [
					{
						name : "pkGoodRecId",
						hidden : true
					},
					{
						name : 'barcodeNo',
						width : 100,
					},
						             {
						            	 name : "fkProductId",
						            	 hidden : true
						             },
						             {
						            	 name : "itemName",
						            	 width : 200,
						             },
						             {
						            	 name : "fkcategoryId",
						            	 hidden : true
						             },
						             {
						            	 name : "categoryName",
						            	 width : 120,
						             },
						             {
						            	 name : "fksubCategoryId",
						            	 hidden : true
						             },
						             {
						            	 name : "subCategoryName",
						            	 width : 120,
						             },
						             {
						            	 name : "bookingNoAB",
						            	 width : 70,
						             },
						             {
						            	 name : 'hsnSacno',
						            	 width : 70,
						            	// hidden: true,
						            	 editable : true
						             },
						             {
						            	 name : 'color',
						            	 width : 70,
						            	// hidden: true,
						            	 editable : true
						             },
						             {
						            	 name : 'rollSize',
						            	 width : 80,
						            	 //editable : true,
						            	 //hidden:true,
						             },
						             {
						            	 name : 'size',
						            	 width : 50,
						            	// hidden: true,
						            	//editable : true
						             },
						             {
						            	id : "sizeFixed",
						            	name : "sizeFixed",
						          		width : 10,
						            	//hidden:true,
						             },
						             {
						            	 name : 'style',
						            	 width : 70,
						            	// hidden: true,
						            	 editable : true
						             },								             
						             {
						            	 name : "originalQuantity",
						            	 width : 80,
						            	 editable : false
						            	 //hidden:true,
						            	 // must set editable to true if you want to make the field editable
						             },
						             {
						            	 name : "barQtyTotalPuchaseQty",
						            	 width : 80,
						            	 editable : false
						            	 //hidden:true,
						            	 // must set editable to true if you want to make the field editable
						             },
						             { 
						            	 name : 'returnQuantity',
						            	 width : 70,
						            	 editable : false
						            	 //hidden:true,
						             },								             
						             { 
						            	 name : 'soldQuantity',
						            	 width : 70,
						            	 editable : false
						            	 //hidden:true,
						             },
						             {
						            	 name : "availableQuantity",
						            	 width : 100,
						            	 editable : false
						            	// editable : true
						            	 // must set editable to true if you want to make the field editable
						             },	
						             {
						            	 name : "quantity",
						            	 width : 80,
						            	 editable : true,
						            	 //classes: 'myBackGroundColor',
						            	 // must set editable to true if you want to make the field editable
						            	 editoptions:{
												dataInit: function(element)
											    {																						
											        $(element).keypress(function(e)
											        {
											             if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57))
											             {
											                return false;
											             }
											        });																				        
											    }
								            }
						             },
						             {
						            	 name : 'buyPrice',
						            	 width : 100,
						            	 editable : true,
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
						            	 name : 'salePrice',
						            	 width : 100,
						            	 editable : true,
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
						            	 name : 'purchaseCode',
						            	 width : 70,
						            	 editable : true,
						            	//hidden : true
						             },
						             {
						            	 name : 'discountPercent',
						            	 width : 70,
						            	 editable : true,								            	 
						            	//hidden : true
						             },
						             {
						            	 name : 'discountAmount',
						            	 width : 70,
						            	 editable : true,
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
						            	 //hidden : true
						             },
						             {
						            	 name : 'gst',
						            	 width : 60,
						            	 editable : true,
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
						            	 name : 'igst',
						            	 width : 60,
						            	 editable : true,
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
						            	 name : "taxAmount",
						            	 width : 90,
						            	 //formatter: 'integer',
						             },
						             {
						            	 name : "totalAmount",
						            	 width : 120,
						            	 //formatter: 'integer',
						             },
						             {
						            	 name : 'fkShopId',
						            	 width : 150,
						            	 hidden:true,
						             },
							],
							/*loadonce: false,
						             viewrecords: true,
						             width: 2000,
						             shrinkToFit: true,
						             rowList : [20,30,50],
						             rownumbers: true,
						             rowNum: 10,
						             'cellEdit':true,*/

				sortorder : 'desc',
				loadonce: false,
				viewrecords: true,
				width: 2000,
				/*height: 350,
				rowheight: 300,*/
				shrinkToFit: true,
				hoverrows: true,
				rownumbers: true,
				rowNum: 10,
				
				'cellEdit':true,
				
				afterSaveCell: function ()
				{
					var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
					var rowData = jQuery("#jqGrid").getRowData(rowId);
					var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
					var itemName = rowData['itemName'];
					var quantity = rowData['quantity'];
					var buyPrice = rowData['buyPrice'];
					var discountPercent = rowData['discountPercent'];
					var unit = rowData['size'];
					var checkUnit = unit.toUpperCase(); 
					var sizeFixed = rowData['sizeFixed'];
					var rollSize = rowData['rollSize'];
					var gst = rowData['gst'];
					var igst = rowData['igst'];														
					var subCatId = rowData['fksubCategoryId'];
					var bookingNoAB = rowData['bookingNoAB'];
					var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
					
					if (sizeFixed == "meter"
						|| sizeFixed == "Meter"
						|| sizeFixed == "METER"
						|| sizeFixed == "MTR"
						|| sizeFixed == "mtr"
						|| sizeFixed == "Mtr")
					{
						$("#jqGrid").jqGrid("setCell",rowId,"size",sizeFixed);
					}
					
					if(gst == "")
					{
						gst = 0;
						var setZero = 0;
						$("#jqGrid").jqGrid("setCell",rowId,"gst",setZero);
					}
					
					if(igst == "")
					{
						igst = 0;
						var setZero = 0;
						$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
					}
					if(Number(gst) > 0)
					{
						igst = 0;
						var setZero = 0;
						$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
					}
					else
					{
						document.getElementById("totalGst").value = 0;
						document.getElementById("totalCgst").value = 0;
						document.getElementById("totalSgst").value = 0;
					}
					
					if(Number(igst) > 0)
					{
						gst = 0;
						var setZero = 0;
						$("#jqGrid").jqGrid("setCell",rowId,"gst",setZero);
					}
					else
					{
						document.getElementById("totalIgst").value = 0;
					}
					for (var r = 0; r < count1; r++)
					{
						if(gst > 0 )
						{
							var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
							for (var s = 0; s < count1; s++)
							{
								var rowId1 = ids[s];
								var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
								var currentIgst = rowData1['igst'];
								if(currentIgst > 0)
								{
									var setZero = 0;
									myAlert("Please Ener Either GST OR IGST");
									$("#jqGrid").jqGrid("setCell",rowId,"gst",setZero);
									$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
									$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",setZero);
									document.good.btnSubmit.disabled = false;
									document.good.btnSubmit1.disabled = false;
									return false;
								}
							}
						}else{}
						if(igst > 0 )
						{
							var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
							for (var s = 0; s < count1; s++)
							{
								var rowId1 = ids[s];
								var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
								var currentGst = rowData1['gst'];
								if(currentGst > 0)
								{
									var setZero = 0;
									myAlert("Please Ener Either GST OR IGST");
									$("#jqGrid").jqGrid("setCell",rowId,"gst",setZero);
									$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
									$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",setZero);
									document.good.btnSubmit.disabled = false;
									document.good.btnSubmit1.disabled = false;
									return false;
								}
							}
						}else{}
					}
					if (unit == "meter"
						|| unit == "Meter"
						|| unit == "METER"
						|| unit == "MTR"
						|| unit == "mtr"
						|| unit == "Mtr")
					{
						if(rollSize == "0" || rollSize == "" || rollSize == undefined || rollSize == null)
						{
							myAlert("please Enter RollSize For = "+itemName);
							document.good.btnSubmit.disabled = false;
							document.good.btnSubmit1.disabled = false;
							return false;
						}
					}
					else
					{
						rollSize = 0;
						var setZero = 0;
						$("#jqGrid").jqGrid("setCell",rowId,"rollSize",setZero);
					}
					if (rollSize != "0")
					{
						rs = rollSize;
					}
					else
					{
						rs = 1;
					}
					
					var taxamt = rowData['taxAmount']
					var vatAmt = 0;
					var discount = 0;
					var tota = 0;
					var totAmt = 0;
					var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
					var gst1 = 0;
					var iGst1 = 0;
					// for calculation of gst and total after change in quantity and buy price in resp to itemname to display gst total and igst total
					var TotalGst = 0;
					var TotalIgst = 0;
					for (var r = 0; r < count1; r++)
					{
						tota = quantity * rs * buyPrice;
						totAmt = quantity * rs * buyPrice;
						// calculation for total roll calculation and price per meter
						if (discountPercent != "0")
						{
							discount = ((tota * discountPercent) / 100);
							tota = (+tota - +discount);
							totAmt = +tota;
						}
						if (gst > 0)
						{
							vatAmt = ((tota * (gst)) / 100).toFixed(2);
							totAmt = +tota + +vatAmt;
							TotalGst = +TotalGst + +vatAmt;
						}
						if (igst > 0){
							vatAmt = ((tota * igst) / 100).toFixed(2);
							totAmt = +tota + +vatAmt;
							TotalIgst = +TotalIgst + +vatAmt;
						}
						$("#jqGrid").jqGrid("setCell",rowId,"discountAmount",discount);
						$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",vatAmt);
						$("#jqGrid").jqGrid("setCell",rowId,"totalAmount",totAmt);
					}
					for (var x = 0; x < count1; x++)
					{
						var rowId = ids[x];
						var rowData = jQuery("#jqGrid").getRowData(rowId);
						var vat = rowData['gst'];
						var igst = rowData['igst'];
						var gstamt1 = rowData['taxAmount'];
						if (vat > 0)
						{
							gst1 = (+gst1 + +gstamt1).toFixed(2);
							document.getElementById("totalGst").value = gst1;
							document.getElementById("totalCgst").value = (gst1/2).toFixed(2);
							document.getElementById("totalSgst").value = (gst1/2).toFixed(2);
						}
						else if (igst > 0)
						{
							iGst1 = (+iGst1 + +gstamt1).toFixed(2);
							document.getElementById("totalIgst").value = iGst1;
							document.getElementById("totalCgst").value = 0;
							document.getElementById("totalSgst").value = 0;
						}
					}
					
					var Total = 0;
					var TotalQuantity = 0;
					var TotalGst = 0;
					var TotalIgst = 0;
					var count2 = jQuery("#jqGrid").jqGrid('getGridParam','records');
					var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
					var AllRows = JSON.stringify(allRowsInGrid1);
					for (var k = 0; k < count2; k++)
					{
						var Total1 = allRowsInGrid1[k].totalAmount;
						if (Total1 != undefined) {
							Total = +Total + +Total1;
						}
					}
					
					for (var n = 0; n < count2; n++) {
						var TotalQuantity1 = allRowsInGrid1[n].quantity;
						if (Total1 != undefined) {
							TotalQuantity = +TotalQuantity + +TotalQuantity1;
						}
					}
					document.getElementById("resolution").value = Total.toFixed(2);
					document.getElementById("resolution1").value = Total.toFixed(2);
					document.getElementById("totalQuantity").value = TotalQuantity;
					var totAmount = Total.toFixed(2);
					var extraDiscount = document.getElementById("extraDiscount").value;
					if (extraDiscount != "0")
					{
						document.getElementById("resolution").value = totAmount;
					}
					else
					{
						var disAmount = (extraDiscount / 100) * totAmount;
						var gross = +totAmount - +disAmount;
						document.getElementById("resolution").value = gross.toFixed(2);
					}
					var expence = document.getElementById("expence").value;
					if (expence != "0")
					{
						document.getElementById("resolution").value = totAmount;
					}
					else
					{
						document.getElementById("resolution").value = (+totAmount + +expence);
					}
				},
				
				pager: "#jqGridPager",
			});
			
			if(count==0 || count==null)
			{
				$("#jqGrid").addRowData(0,jsonData.offer);
				//document.getElementById("totalQuantity1").value = 1;
			}
			
			$('#jqGrid').navGrid('#jqGridPager',
				{ edit: true, add: false, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
					{
						editCaption: "The Edit Dialog",
						afterSubmit: function()
						{
							$('#jqGrid').trigger( 'reloadGrid' );
							var grid = $("#jqGrid"), intervalId = setInterval(function() {
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
							$('#jqGrid').trigger('reloadGrid');
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
							$('#jqGrid').trigger('reloadGrid');
							
							var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
							var rowData = jQuery("#jqGrid").getRowData(rowId);
							var count = jQuery("#jqGrid").jqGrid('getGridParam','records');
							var itemName = rowData['itemName'];
							var quantity = rowData['quantity'];
							var buyPrice = rowData['buyPrice'];
							var discountPercent = rowData['discountPercent'];
							var gst = rowData['gst'];
							var igst = rowData['igst'];
							var taxamt = rowData['taxAmount'];
							var vatAmt = 0;
							var discount = 0;
							var tota = 0;
							var totAmt = 0;
							var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
							var gst1 = 0;
							var iGst1 = 0;
							var TotalGst = 0;
							var TotalIgst = 0;
							var count1 = count - 1;
							
							for (var r = 0; r < count; r++)
							{
								tota = quantity * buyPrice;
								totAmt = quantity * buyPrice;
								
								if (discountPercent != "0") {
									discount = ((tota * discountPercent) / 100);
									tota = +tota - +discount;
									totAmt = +tota;
								}
								if (gst != "0") {
									vatAmt = ((tota * (gst)) / 100);
									totAmt = +tota + +vatAmt;
									TotalGst = +TotalGst + +vatAmt;
								}
								if (igst != "0") {
									vatAmt = ((tota * igst) / 100);
									totAmt = +tota + +vatAmt;
									TotalIgst = +TotalIgst + +vatAmt;
								}
								$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",vatAmt);
								$("#jqGrid").jqGrid("setCell",rowId,"totalAmount",totAmt);
							}
							
							for (var x = 0; x < count; x++)
							{
								var rowId = ids[x];
								var rowData = jQuery("#jqGrid").getRowData(rowId);
								var vat = rowData['gst'];
								var igst = rowData['igst'];
								var gstamt1 = rowData['taxAmount'];
								if (vat > 0)
								{
									gst1 = (+gst1 + +gstamt1).toFixed(2);
									document.getElementById("totalGst").value = gst1;
									document.getElementById("totalCgst").value = (gst1/2).toFixed(2);
									document.getElementById("totalSgst").value = (gst1/2).toFixed(2);
								}
								else if (igst > 0)
								{
									iGst1 = (+iGst1 + +gstamt1).toFixed(2);
									document.getElementById("totalIgst").value = iGst1;
								}
							}
							
							var Total = 0;
							var TotalQuantity = 0;
							var TotalGst = 0;
							var TotalIgst = 0;
							var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
							var AllRows = JSON.stringify(allRowsInGrid1);
							var count2 = count - 1;
							for (var k = 0; k < count; k++)
							{
								var Total1 = allRowsInGrid1[k].Total;
								if (Total1 != undefined)
								{
									Total = +Total + +Total1;
								}
							}
							
							for (var n = 0; n < count; n++)
							{
								var TotalQuantity1 = allRowsInGrid1[n].quantity;
								if (Total1 != undefined)
								{
									TotalQuantity = +TotalQuantity + +TotalQuantity1;
								}
							}
							document.getElementById("resolution").value = Total.toFixed(2);
							document.getElementById("resolution1").value = Total.toFixed(2);
							document.getElementById("totalQuantity").value = TotalQuantity;
							var totAmount = Total.toFixed(2);
							var extraDiscount = document.getElementById("extraDiscount").value;
							if (extraDiscount != "0")
							{
								document.getElementById("resolution").value = totAmount.toFixed(2);
							}
							else
							{
								var disAmount = (extraDiscount / 100) * totAmount;
								var gross = +totAmount - +disAmount;
								document.getElementById("resolution").value = gross.toFixed(2);
							}
							var expence = document.getElementById("expence").value;
							if (expence != "0")
							{
								document.getElementById("resolution").value = totAmount.toFixed(2);
							} else {
								document.getElementById("resolution").value = (+totAmount + +expence).toFixed(2);
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
//getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetails End

function editGoodReceiveDetailsValidtion()
{	alert("Sucess 0");
	var voucherNo = $('#voucherNo').val();
	var billNo = $('#billNo').val();
	var supplierId = $('#supplierId').val();
	var pDate = $('#pDate').val();
	/*if(checkDate(pDate))
	{
		myAlert("Please Select Correct Date");
		document.good.btnSubmit.disabled = false;
        return false;
	}*/
	var expence = $('#expence').val();
	var totalAmount = $('#resolution').val();

	var contactPerson = $('#contactPerson1').val();
	var contactPersonNamePattern = /^[a-zA-Z ]{2,50}$/;
	var contactPersonNamePatternRes = contactPersonNamePattern.test(contactPerson);
	var expencePattern = /^\d+$/;
	var expencePatternRes = expencePattern.test(expence);
	
	if(voucherNo == null || voucherNo == "" || voucherNo == " " || voucherNo == undefined)
	{
		myAlert("Please Enter Voucher Number");
		document.good.btnSubmit.disabled = false;
		return false;
	}
	
	if (billNo != null && billNo != "" && billNo != " ")
	{
		if (supplierId != null && supplierId != "" && supplierId != " ")
			{
				if(contactPerson == null || contactPerson == "" || contactPerson == undefined)
				{}
				else
				{
					if(contactPersonNamePatternRes)
					{}else
					{
						myAlert("Please Enter Valid Contact Person Name");
						document.good.btnSubmit.disabled = false;
						return false;
					}				
				}				
				if (pDate != null && pDate != "" && pDate != " ")
				{
					if (expencePatternRes)
					{
						if (totalAmount != null && totalAmount != "" && totalAmount != " " && totalAmount != expence)
						{
							// If validation is success than controller will go
							// to
							// regGoodReceive()
							editGoodReceiveDetails();
						}
						else
						{
							myAlert("Please Select Item From Item List\nCHECK TOTAL AMOUNT");
							document.good.btnSubmit.disabled = false;
							return false;
						}
					}
					else
					{
						myAlert("Enter Expenses");
						document.good.btnSubmit.disabled = false;
						return false;
					}
				}	
				else
				{
					myAlert("Please select purchase date !");
					document.good.btnSubmit.disabled = false;
					return false;
				}
			}
			/*
			 * else { myAlert("Please Enter Valid Contact Person Name"); return
			 * false; }
			 * 
			 *  }
			 */
		else
		{
			myAlert("Please select supplier name !");
			document.good.btnSubmit.disabled = false;
			return false;
		}
	}
	else
	{
		myAlert("Please Enter Bill No");
		document.good.btnSubmit.disabled = false;
		return false;	
	}
}

function editGoodReceiveDetails()
{alert("Sucess 1");
	var checkNumAndDec = /^\d+(\.\d{1,2})?$/;
	var sPWithoutTax = 0;
	var params = {};
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
	var AllSubRowsValue = JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++)
	{
		var barcodeNo = allRowsInGrid1[i].barcodeNo;
		params["barcodeNo" + i] = barcodeNo;
		
		var fkProductId = allRowsInGrid1[i].fkProductId;
		params["fkProductId" + i] = fkProductId;
		
		var itemName = allRowsInGrid1[i].itemName;
		params["itemName" + i] = itemName;
		
		var fkcategoryId = allRowsInGrid1[i].fkcategoryId;
		params["fkcategoryId" + i] = fkcategoryId;
		
		var categoryName = allRowsInGrid1[i].categoryName;
		params["categoryName" + i] = categoryName;
		
		var fksubCategoryId = allRowsInGrid1[i].fksubCategoryId;
		params["fksubCategoryId" + i] = fksubCategoryId;
		
		var subCategoryName = allRowsInGrid1[i].subCategoryName;
		params["subCategoryName" + i] = subCategoryName;
		
		var bookingNoAB = allRowsInGrid1[i].bookingNoAB;
		params["bookingNoAB" + i] = bookingNoAB;
		
		var hsnSacno = allRowsInGrid1[i].hsnSacno;
		params["hsnSacno" + i] = hsnSacno;
		
		var color = allRowsInGrid1[i].color;
		params["color" + i] = color;

		var size = allRowsInGrid1[i].size;
		params["size" + i] = size;
		
		var rollSize = allRowsInGrid1[i].rollSize;
		if (size == "meter" || size == "Meter" || size == "METER" || size == "MTR" || size == "mtr" || size == "Mtr")
		{
				if (rollSize == "0" || rollSize == "" || rollSize == null || rollSize == undefined)
				{
					myAlert("Please Enter RollSize for = "+(i+1)+" "+itemName);
					document.good.btnSubmit.disabled = false;
					return false;
					// params["rollSize" + i] = 1.0;
				}
		}		
		params["rollSize" + i] = rollSize;
		
		var style = allRowsInGrid1[i].style;
		params["style" + i] = style;
		
		var originalQuantity = allRowsInGrid1[i].originalQuantity;
		params["originalQuantity" + i] = originalQuantity;
		
		var barQtyTotalPuchaseQty = allRowsInGrid1[i].barQtyTotalPuchaseQty;
		params["barQtyTotalPuchaseQty" + i] = barQtyTotalPuchaseQty;
		
		var returnQuantity = allRowsInGrid1[i].returnQuantity;
		params["returnQuantity" + i] = returnQuantity;
		
		var soldQuantity = allRowsInGrid1[i].soldQuantity;
		params["soldQuantity" + i] = soldQuantity;
		
		var availableQuantity = allRowsInGrid1[i].availableQuantity;
		params["availableQuantity" + i] = availableQuantity;
		
		var quantity = allRowsInGrid1[i].quantity;
		params["quantity" + i] = quantity;
		
		var buyPrice = allRowsInGrid1[i].buyPrice;
		params["buyPrice" + i] = buyPrice;
		
		var salePrice = allRowsInGrid1[i].salePrice;
		if(salePrice == "" || salePrice == '0' || salePrice == null || salePrice == undefined)
		{
			myAlert("Please Enter Sale Price for => "+(i+1)+" "+itemName);
			document.good.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			params["salePrice" + i] = salePrice;
		}
		
		var discountPercent = allRowsInGrid1[i].discountPercent;
		if(discountPercent == "" || discountPercent == '0' || discountPercent == null || discountPercent == undefined)
		{
			discountPercent = 0;
		}
		else
		{	
			if(discountPercent != "")
			{	
				if(discountPercent.match(checkNumAndDec))
				{
					if(discountPercent > 99.99)
					{
						myAlert("Enter Discount Less Than 100% ==> "+(i+1)+" "+itemName);
						document.good.btnSubmit.disabled = false;
						return false;
					}
				}
				else
				{
					myAlert("Please Enter valid Discount (%) Percentage ==> "+(i+1)+" "+itemName);
					document.good.btnSubmit.disabled = false;
					return false;
				}
			}
		}
		params["discountPercent" + i] = discountPercent;
		
		var discountAmount = allRowsInGrid1[i].discountAmount;
		params["discountAmount" + i] = discountAmount;
		
		var gst = allRowsInGrid1[i].gst;
		if (gst == undefined || gst == null || gst == "0")
		{
			params["gst" + i] = 0.0;
		}
		else if (gst != undefined || gst != null || Number(gst) > 0)
		{
			params["gst" + i] = gst;			
			sPWithoutTax = (salePrice/(1+(gst/100)));					
			params["sPWithoutTax" + i] = sPWithoutTax.toFixed(2);
		}

		var igst = allRowsInGrid1[i].igst;
		if (igst == undefined || igst == null || igst == "0")
		{
			params["igst" + i] = 0.0;
		}
		else if (igst != undefined || igst != null || Number(igst) > 0)
		{
			params["igst" + i] = igst;			
			sPWithoutTax = (salePrice/(1+(igst/100)));					
			params["sPWithoutTax" + i] = sPWithoutTax.toFixed(2);
		}

		if((igst == undefined || igst == null || igst == "0") && (gst == undefined || gst == null || gst == "0"))
		{
			params["sPWithoutTax" + i] = salePrice;
		}
		
		var taxAmount = allRowsInGrid1[i].taxAmount;
		if (taxAmount == undefined || taxAmount == null)
		{
			params["taxAmount" + i] = 0.0;
		}
		else if (taxAmount != undefined || taxAmount != null)
		{
			params["taxAmount" + i] = taxAmount;
		}

		var purchaseCode = allRowsInGrid1[i].purchaseCode;
		params["purchaseCode" + i] = purchaseCode;
		
		var totalAmount = allRowsInGrid1[i].totalAmount;
		params["totalAmount" + i] = totalAmount;
		
		var fkShopId = allRowsInGrid1[i].fkShopId;
		params["fkShopId" + i] = fkShopId;
		
	}
	var input = document.getElementById('supplierId'), list = document
			.getElementById('supplierId_drop'), k, supplierId, supcode;
	for (k = 0; k < list.options.length; ++k)
	{
		if (list.options[k].value === input.value)
		{
			supplierId = list.options[k].getAttribute('data-value');
		}
	}
	var supplierDetails = $('#supplierId').val();
	var supplierDetailsSplitText = supplierDetails.split(",");
	
	var supplierId1 = supplierDetailsSplitText[0];
	var supName = supplierDetailsSplitText[1];
	var supCode = supplierDetailsSplitText[2];
	
	if (supplierId == "" || supplierId == undefined || supplierId == null)
	{
		supplierId = supplierId1;
	}
	
	var voucherNo = $('#voucherNo').val();
	var billNo = $('#billNo').val();
	var contactPerson = $('#contactPerson1').val();
	var vat = $('#vat').val();
	var pDate = $('#pDate').val();
	var purchaseDueDate = $('#purchaseDueDate').val();
	var extraDiscount = $('#extraDiscount').val();
	if (extraDiscount == "" || extraDiscount == undefined || extraDiscount == null)
	{
		extraDiscount = 0;
	}
	
	var transaportExpense = $('#transaportExpense').val();
	var labourExpense = $('#labourExpense').val();
	var totalAmountwithoutexpense = $('#resolution1').val();	
	var expence = +transaportExpense + +labourExpense;
	
	if (expence == "" || expence == undefined || expence == null)
	{
		expence = 0;
	}
	var resolution = $('#resolution').val();

	params["voucherNo"] = voucherNo;
	params["billNo"] = billNo;
	params["contactPerson"] = contactPerson;
	params["vat"] = vat;
	params["pDate"] = pDate;
	params["purchaseDueDate"] = purchaseDueDate;
	params["count"] = count;
	params["extraDiscount"] = extraDiscount;
	params["expence"] = expence;
	params["resolution"] = resolution;
	params["supplierId"] = supplierId;
	params["supName"] = supName;
	params["supCode"] = supCode;
	params["transaportExpense"] = transaportExpense;
	params["labourExpense"] = labourExpense;
	params["resolution1"] = totalAmountwithoutexpense;
	
	params["methodName"] = "editGoodReceiveDetails";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
	successAlert("Purchase Done Successfully");
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}








// End Purchase Cash Edit Grid not in Use 1
function getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetailsOld()
{
	var voucherNo = $('#voucherNo').val();
	//alert("voucherNo 01 :-"+voucherNo);
	
	var params = {};
	//var itemName = $("#itemName").val();
	//alert("itemName :-"+itemName);
	var productId1;
	//alert("productId1 01 :-"+productId1);
	
	if(itemName != "" ||itemName != " " ||itemName != undefined || itemName != null)
	{//alert("itemName1 :-"+itemName);
	//alert("Success 1 :-");
		var bookingNo = $("#bookingNo").val();
		
		if(bookingNo == null || bookingNo == "" || bookingNo == " " || bookingNo == undefined)
		{//alert("Success 2 :-");
			var input = document.getElementById('itemName'), list = document.getElementById('itemId_drop'),
			i, catName, itemName, hsnsacno, productId, size, fkCatId, subcatId;
			for (i = 0; i < list.options.length; ++i)
			{//alert("Success 3 :-");
				if(list.options[i].value === input.value)
				{//alert("Success 4 :-");
					catName = list.options[i].getAttribute('data-value');
					itemName = list.options[i].getAttribute('myvalue');
					subcatId = list.options[i].getAttribute('myvalue1');
					productId = list.options[i].getAttribute('myvalue2');
					productId1 = productId;
					//alert("productId1 02 :-"+productId1);
					size = list.options[i].getAttribute('myvalue4');
					fkCatId = list.options[i].getAttribute('myvalue5');
				}
			}
			params["itemName"] = itemName;
			params["catName"] = catName;
			params["productId"] = productId;
			params["size"] = size;
			params["fkCatId"] = fkCatId;
			params["subcatId"] = subcatId;
			document.getElementById('itemName').value = null;
		} else {
			//alert("Success 5 :-");
			itemparams["bookingNo"] = bookingNo;
			alert("In Else 1 productId1 02 :-"+productId1);
			document.getElementById('bookingNo').value = null;
		}
	}
	//alert("Success 6 :-");
	//alert("productId1 03 :-"+productId1);
	//return false;
	
	var voucherNoSetEmpty = "Empty";
	//if(productId1 != undefined || productId1 == "One" || productId1 == null)
	if(productId1 != undefined)
	{
		alert("Success 7 :-");
		voucherNo = voucherNoSetEmpty;
	} else {
		alert("Success 8 :-");
	}
	alert("voucherNo 02 :-"+voucherNo);
	alert("Success 9 :-");
	//return false;
	
	/*var billNo = $('#billNo').val();
	var ItemIdValue = $('#empId').val();
	customerType = "Cash";
	ItemIdTemp = "0";null
	
	var voucherNoSetEmpty = "Empty";
	if(billNo == "" && ItemId != undefined)
	{
		billNo = billNoSetEmpty;
	}
	var itemIdSetEmpty = "Empty";
	if(billNo != "" && ItemIdValue == "")
	{
		ItemId = itemIdSetEmpty;
	}
	var billNoSetEmpty1 = "Empty";
	if(billNo != "" && ItemIdValue != "")
	{
		billNo = billNoSetEmpty1;
	}*/
	
	//var params = {};
	params["voucherNo"] = voucherNo;
	//params["methodName"] = "getItemsGridAndNonGridGoodReceiveDetailsByVoucherNo";
	params["methodName"] = "getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetails";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		$("#jqGrid").jqGrid("clearGridData");

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;				
		
		$.each(jsonData, function(i, v)
		{
			
			document.getElementById("resolution").value = v.grossTotal;
			document.getElementById("resolution1").value = v.grossTotal;
			/*var totalQuantity = 0;
			totalQuantity = totalQuantity + v.quantity;
			document.getElementById("totalQuantity").value = totalQuantity;*/
			
			//var qty =  v.totalQuantity;
			//alert("totalQuantity :- "+totalQuantity);
			
			/*document.getElementById("billNo").value = v.billNo;
			//document.getElementById("supplierId").value = v.supplierName2+","+v.suppCode;
			document.getElementById("supplierId").value = v.supplierDetails;
			//document.getElementById("supplierId123").value = v.pkSuppId;
			// 1 document.getElementById("pDate").value = v.purchaseDate;
			document.getElementById("contactPerson1").value = v.contactPerson;
			// 1 document.getElementById("purchaseDueDate").value = v.purchasePaymentDueDate;
			document.getElementById("totalQuantity").value = v.totalQuantity;
			document.getElementById("resolution").value = v.grossTotal;
			document.getElementById("resolution1").value = v.grossTotal;
			//document.getElementById("editGrossTotal").value = v.finalGrossTotal;
			//document.getElementById("finalGrossTotalHidden").value = v.finalGrossTotal;
			document.getElementById("pendingBillpaymentHidden").value = v.pendigBillPayment;*/
			
			$("#jqGrid").jqGrid(
					{
						datatype : "local",

						colNames : [
										"pkGoodRecId", "Barcode<br>No", "fkProductId", "Item Name", "fkcategoryId", "Category<br>Name", "fksubCategoryId", "Sub Category<br>Name","HSN/<br>SAC",
										"Color", "Roll<br>Size", "Size", "Style", "Original<br>Quantity", "Barcode<br>Quantity", "Returned<br>Quantity", "Sold<br>Quantity",
										"Available<br>Quantity", "Quantity", "final Buy Price Ex. Tax", "Buy Price<br>Ex. Tax", "Final Sale Price Inc. Tax",
										"Sale Price<br>Inc. Tax", "Purchase Code", "Discount<br>%", "Discount<br>Amount", "GST<br>%", "IGST<br>%", "finalGST", "finalIGST",
										"Return Total", "Tax<br>Amount", "Total","Contact Person", "Supplier Id", "Gross Total", "fkShopId"
									],
						             autoheight: true,
						             
						             colModel : [ 
						             {
						            	 name : "pkGoodRecId",
						            	 hidden : true
						             },
						             {
						            	 name : 'barcodeNo',
						            	 width : 100,
						             },
						             {
						            	 name : "fkProductId",
						            	 hidden : true
						             },
						             {
						            	 name : "itemName",
						            	 width : 200,
						             },
						             {
						            	 name : "fkcategoryId",
						            	 hidden : true
						             },
						             {
						            	 name : "categoryName",
						            	 width : 120,
						             },
						             {
						            	 name : "fksubCategoryId",
						            	 hidden : true
						             },
						             {
						            	 name : "subCategoryName",
						            	 width : 120,
						             },
						             {
						            	 name : 'hsnSacno',
						            	 width : 70,
						            	// hidden: true,
						            	 editable : true
						             },
						             {
						            	 name : 'color',
						            	 width : 70,
						            	// hidden: true,
						            	 editable : true
						             },
						             {
						            	 name : 'rollSize',
						            	 width : 80,
						            	 //editable : true,
						            	 //hidden:true,
						             },
						             {
						            	 name : 'size',
						            	 width : 50,
						            	// hidden: true,
						            	//editable : true
						             },
						             {
						            	 name : 'style',
						            	 width : 70,
						            	// hidden: true,
						            	 editable : true
						             },								             
						             {
						            	 name : "originalQuantity",
						            	 width : 80,
						            	 editable : false
						            	 //hidden:true,
						            	 // must set editable to true if you want to make the field editable
						             },
						             {
						            	 name : "barQtyTotalPuchaseQty",
						            	 width : 80,
						            	 editable : false
						            	 //hidden:true,
						            	 // must set editable to true if you want to make the field editable
						             },
						             { 
						            	 name : 'returnQuantity',
						            	 width : 70,
						            	 editable : false
						            	 //hidden:true,
						             },								             
						             { 
						            	 name : 'soldQuantity',
						            	 width : 70,
						            	 editable : false
						            	 //hidden:true,
						             },
						             {
						            	 name : "availableQuantity",
						            	 width : 100,
						            	 editable : false
						            	// editable : true
						            	 // must set editable to true if you want to make the field editable
						             },	
						             {
						            	 name : "quantity",
						            	 width : 80,
						            	 editable : true,
						            	 //classes: 'myBackGroundColor',
						            	 // must set editable to true if you want to make the field editable
						            	 editoptions:{
												dataInit: function(element)
											    {																						
											        $(element).keypress(function(e)
											        {
											             if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57))
											             {
											                return false;
											             }
											        });																				        
											    }
								            }
						             },
						             {
						            	 name : 'finalBuyPrice',
						            	 width : 100,
						            	// hidden : true
						             },
						             {
						            	 name : 'buyPrice',
						            	 width : 100,
						            	 editable : true,
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
						            	 name : 'finalSalePrice',
						            	 width : 100,
						            	 //hidden : true
						             },
						             {
						            	 name : 'salePrice',
						            	 width : 100,
						            	 editable : true,
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
						            	 name : 'purchaseCode',
						            	 width : 70,
						            	 editable : true,
						            	// hidden : true
						             },
						             {
						            	 name : 'discountPercent',
						            	 width : 70,								            	 
						            	// hidden : true
						             },
						             {
						            	 name : 'discountAmount',
						            	 width : 70,
						            	 editable : true,
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
						            	 //hidden : true
						             },
						             {
						            	 name : 'gst',
						            	 width : 60,
						            	 editable : true,
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
						            	 name : 'igst',
						            	 width : 60,
						            	 editable : true,
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
						            	 name : 'finalVat',
						            	 width : 70,
						            	 hidden:true,
						             },
						             {
						            	 name : 'finalIgst',
						            	 width : 70,
						            	 hidden:true,
						             },
						             {
						            	 name : "returnTotal",
						            	 width : 150,
						            	 hidden:true,
						             },
						             {
						            	 name : "taxAmount",
						            	 width : 90,
						            	 //formatter: 'integer',
						             },
						             {
						            	 name : "totalAmount",
						            	 width : 120,
						            	 //formatter: 'integer',
						             },
						             {
						            	 name : 'contactPerson',
						            	 width : 160,
						            	 hidden : true
						             },
						             {
						            	 name : 'fksupplierId',
						            	 width : 150,
						            	 hidden: true,
						             },
						             {
						            	 name : 'grossTotal',
						            	 width : 150,
						            	 hidden:true,
						             },
						             {
						            	 name : 'fkShopId',
						            	 width : 150,
						            	 hidden:true,
						             },
							],
						            
						             loadonce: false,
						             viewrecords: true,
						             width: 2000,
						             shrinkToFit: true,
						             rowList : [20,30,50],
						             rownumbers: true,
						             rowNum: 10,
						             'cellEdit':true,
								             
								             afterSaveCell: function ()
								             {
								            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
								            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
								            	 var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
								            	 var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
								            	 var barQtyTotalPuchaseQty = rowData['barQtyTotalPuchaseQty'];
								            	 var oriQuantity = rowData['oriQuantity'];
								            	 var quantity = rowData['quantity'];
								            	 var availquantity = rowData['availquantity'];
								            	 var editQuantity = rowData['editQuantity'];
								            	 var finalBuyPrice = rowData['finalBuyPrice'];
								            	 var buyPrice = rowData['buyPrice'];								            	 
								            	 var finalSalePrice = rowData['finalSalePrice'];
								            	 var salePrice = rowData['salePrice'];
								            	 var vat = rowData['vat'];
								            	 var igst = rowData['igst'];
								            	 var finalVat = rowData['finalVat'];
									             var finalIgst = rowData['finalIgst'];
								            	 var dis = rowData['discount'];
								            	 var returnTotal = rowData['returnTotal'];
								            	 var total = rowData['total'];
								            	 var rollS = rowData['rollsize'];
								            	 var unit = rowData['size'];
								            	 var finalDisPer = rowData['finalDisPer'];
								            	 var discount = rowData['discount'];
								            	 var billNo = rowData['billNo'];
								            	 var supplierName2 = rowData['supplierName2'];
								            	 var grossTotal = rowData['grossTotal'];
								            	 var taxAmount = rowData['taxAmount'];
								            	 var soldQty = rowData['soldQty'];
								            	 var returnedQty = rowData['returnedQty'];
								            	 var totAmt = 0;
								            	 var totalAmt = 0;
								            	 var totAmt1 = 0;
								            	 var totalAmt1 = 0;
								            	 var totadis = 0;
								            	 var setZero = 0;
								            	 var checkQty = /^[0-9]+$/;
								            	 var checkValue = /^[0-9]+\.?[0-9]*$/;
								            	 
								            	 if(quantity != "" || quantity != null || quantity != undefined || quantity != "")
								            	 {
								            		 if(quantity.match(checkQty))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid Quantity");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter Quantity");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
								            		 return false;
								            	 }
								            	 
								            	 if(buyPrice != "" || buyPrice != null || buyPrice != undefined || buyPrice != "")
								            	 {
								            		 if(buyPrice.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid Buy Price");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "buyPrice", finalBuyPrice);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter Buy Price");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "buyPrice", finalBuyPrice);
								            		 return false;
								            	 }
								            	 
								            	 if(salePrice != "" || salePrice != null || salePrice != undefined || salePrice != "")
								            	 {
								            		 if(salePrice.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid Sale Price");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "salePrice", finalSalePrice);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter Sale Price");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "salePrice", finalSalePrice);
								            		 return false;
								            	 }
								            	 
								            	 if(discount != "" || discount != null || discount != undefined || discount != "")
								            	 {
								            		 if(discount.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid Discount Percentage");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "discount", finalDisPer);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter Discount Percentage");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "discount", finalDisPer);
								            		 return false;
								            	 }		
								            	 
								            	 if(discount != "" || discount != null || discount != undefined || discount != "")
								            	 {
								            		 if(discount.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid Discount Percentage");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "discount", finalDisPer);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter Discount Percentage");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "discount", finalDisPer);
								            		 return false;
								            	 }		
								            	 
								            	 if(vat != "" || vat != null || vat != undefined || vat != "")
								            	 {
								            		 if(vat.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid GST");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "vat", finalVat);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter GST");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "vat", finalVat);
								            		 return false;
								            	 }		
								            	 
								            	 if(igst != "" || igst != null || igst != undefined || igst != "")
								            	 {
								            		 if(igst.match(checkValue))
								            		 {}
								            		 else
								            		 {
								            			 myAlert("Please Enter Valid IGST");
									            		 $("#jqGrid").jqGrid("setCell", rowId, "igst", finalIgst);
									            		 return false;
								            		 }
								            	 }
								            	 else
								            	 {
								            		 myAlert("Please Enter IGST");
								            		 $("#jqGrid").jqGrid("setCell", rowId, "igst", finalIgst);
								            		 return false;
								            	 }		

								            	/*if(Number(editQuantity) > Number(availquantity))
								            	 {myAlert("Return Quantity Is Greater Than Availabel Quantity");								            		 
								            		 var rtota = 0.00;
								            		 var maiTota = total;
								            		 var edit = 0;
							            		 	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", rtota);
						                    		 $("#jqGrid").jqGrid("setCell", rowId, "total", maiTota);
						                    		 $("#jqGrid").jqGrid("setCell", rowId, "editQuantity", edit);
								            		 return false;}*/
								            	 
								            	 if(availquantity > 0)
								            	 {								            		 
								            		if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
													{
								            			var mtrInSoldQty = (soldQty/rollS);
								            			if((+mtrInSoldQty + +returnedQty) > quantity)
										            	{
										            		myAlert("Sold Quantity + Return Quantity is Greater Than Entered Purchase Quantity");
										            		$("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
										            		return false;
										            	}
								            		}
								            		else
								            		{
										            	if((+soldQty + +returnedQty) > quantity)
										            	{
										            		myAlert("Sold Quantity + Return Quantity is Greater Than Entered Purchase Quantity");
										            		$("#jqGrid").jqGrid("setCell", rowId, "quantity", oriQuantity);
										            		return false;
										            	}
								            		}
								            	 }
								            	 else{}
								            	 
								            	 
								            	 	var afterquantity = quantity;// - editQuantity;
								            	 	var tota = 0;
								            	 	if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
													{
								            	 		tota = (afterquantity*rollS) * buyPrice;
													}
								            	 	else
													{
														tota = afterquantity * buyPrice;
														var rollSize = 0;
														$("#jqGrid").jqGrid("setCell", rowId, "rollsize", rollSize);
													}								            	 	
								            	 	
								            	 	if(vat == "" || vat == " ")
								            	 	{
								            	 		$("#jqGrid").jqGrid("setCell", rowId, "vat", setZero);
								            	 	}
								            	 	if(igst == "" || igst == " ")
								            	 	{
								            	 		$("#jqGrid").jqGrid("setCell", rowId, "igst", setZero);
								            	 	}
								            	 	
								            	 	if(vat > 0 && igst > 0)
								            	 	{
								            	 		myAlert("Please Enter Either GST OR IGST");
								            	 		
										            	if(finalVat > 0)
										            	{
										            		vat = finalVat;
										            		$("#jqGrid").jqGrid("setCell", rowId, "vat", finalVat);
										            		$("#jqGrid").jqGrid("setCell", rowId, "igst", "0");
										            	}
										            	else if(finalIgst > 0)
										            	{
										            		igst = finalIgst;
										            		$("#jqGrid").jqGrid("setCell", rowId, "igst", finalIgst);
										            		$("#jqGrid").jqGrid("setCell", rowId, "vat", "0");
										            	}
								            	 		return false;
								            	 	}								            	 	
								            	 	
								            	 	for (var r = 0; r < count1; r++)
													{
														if(vat > 0 )
														{	
															var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
															for (var s = 0; s < count1; s++)
															{
																var rowId1 = ids[s];
																var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																var currentIgst = rowData1['igst'];
																if(currentIgst > 0)
																{
																	var setZero = 0;
																	var totalBuyP = 0;
																	var taxAmt = 0;
																	if(finalVat > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																			var taxAmt = (totalBuyP*(finalVat/100));
																	}
																	else if(finalIgst > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																			var taxAmt = (totalBuyP*(finalIgst/100));
																	}
																	else{taxAmt = 0;}
																	
																	myAlert("Please Ener Either GST OR IGST");
																	$("#jqGrid").jqGrid("setCell",rowId,"vat",finalVat);
																	$("#jqGrid").jqGrid("setCell",rowId,"igst",finalIgst);
																	$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt.toFixed(2));	
																	return false;
																}
															}
														}
														else{}
														if(igst > 0 )
														{	
															var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
															for (var s = 0; s < count1; s++)
															{
																var rowId1 = ids[s];
																var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																var currentGst = rowData1['vat'];
																if(currentGst > 0)
																{
																	var setZero = 0;
																	var totalBuyP = 0;
																	var taxAmt = 0;
																	
																	if(finalVat > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																		var taxAmt = (totalBuyP*(finalVat/100));
																	}
																	else if(finalIgst > 0)
																	{
																		totalBuyP = quantity * buyPrice;
																		if(dis > 0)
																		{
																			totalBuyP = (totalBuyP - (totalBuyP*(dis/100)));
																		}
																			var taxAmt = (totalBuyP*(finalIgst/100));
																	}
																	else{taxAmt = 0;}													
																	
																	myAlert("Please Ener Either GST OR IGST");
																	$("#jqGrid").jqGrid("setCell",rowId,"vat",finalVat);
																	$("#jqGrid").jqGrid("setCell",rowId,"igst",finalIgst);
																	$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt);
																	return false;
																}
															}
														}
														else
														{
															var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
															var gstPer = 0;
															var iGstPer = 0;
															var totalTaxAmount = 0;
															for (var s = 0; s < count1; s++)
															{
																var rowId1 = ids[s];
																var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																var currentTaxAmt = rowData1['taxAmount'];
																gstPer = rowData1['vat'];
																iGstPer = rowData1['igst'];
																totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
																if(gstPer > 0)
																{
																	document.getElementById("totalGst").value = totalTaxAmount;
																}
																else if(iGstPer > 0)
																{
																	document.getElementById("totalIgst").value = totalTaxAmount;	
																}																	
															}			
															
														}																		
													}
								            	 	
								            	 	if(vat > 0)
													{
								            	 		var totalTaxAmount = 0
														totalBuyP = quantity * buyPrice;
														if(dis > 0)
														{
															totalBuyP = (totalBuyP*(dis/100));
														}
															var taxAmt = (totalBuyP*(finalVat/100));
														
														$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt);
														var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
														for (var s = 0; s < count1; s++)
														{
															var rowId1 = ids[s];
															var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
															var currentTaxAmt = rowData1['taxAmount'];
															totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
														}
								             		}
												
								            	 	else if(igst > 0)
													{
														totalBuyP = quantity * buyPrice;
														if(dis > 0)
														{
															totalBuyP = (totalBuyP*(dis/100));
														}
														var taxAmt = (totalBuyP*(finalVat/100));
														
														$("#jqGrid").jqGrid("setCell",rowId,"taxAmount",taxAmt);
														
														var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
														for (var s = 0; s < count1; s++)
														{
															var rowId1 = ids[s];
															var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
															var currentTaxAmt = rowData1['taxAmount'];
															totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
														}														
														 document.getElementById("totalIgst").value = totalTaxAmount;			
													}								            	 	
								            	 	
													if (dis > 0) 
													{
														totadis = (((buyPrice*quantity) * (dis)) / 100);

														if(vat > 0 || igst > 0)
														{
															if (vat > 0) 
															{
																totAmt = (((tota - totadis) * (vat)) / 100);
															} 
															else if (igst > 0) 
															{
																totAmt = (((tota - totadis) * (igst)) / 100);
															}
															$("#jqGrid").jqGrid("setCell", rowId, "taxAmount", totAmt);
														}
														else
														{
															$("#jqGrid").jqGrid("setCell", rowId, "taxAmount", "0");
														}
														totalAmt = +(tota-totadis) + +totAmt;
														totalAmt = totalAmt.toFixed(2);
													}
													else 
													{																		
														if (vat > 0) 
														{
															totAmt = ((tota * (vat)) / 100);
														} 
														else if (igst > 0) 
														{
															totAmt = ((tota * (igst)) / 100);
														}
														
														$("#jqGrid").jqGrid("setCell", rowId, "taxAmount", totAmt);
														
														 totalAmt = +tota + +totAmt;
														 totalAmt = totalAmt.toFixed(2);
													}
													
													var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
													for (var s = 0; s < count1; s++)
													{
														var gstCount = 0;
														var iGstCount = 0;
														var totalTaxAmount = 0;
														var rowId1 = ids[s];
														var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
														var currentTaxAmt = rowData1['taxAmount'];
														
														totalTaxAmount  = (+totalTaxAmount + +currentTaxAmt).toFixed(2);
														for (var s = 0; s < count1; s++)
														{
															var rowId12 = ids[s];
															var rowData12 = jQuery("#jqGrid").getRowData(rowId12);
															var currentGst = rowData12['vat'];
															var currentiGst = rowData12['igst'];
															if(currentGst > 0)
															{
																gstCount++;
															}
															else if(currentiGst > 0)
															{
																iGstCount++;
															}
														}
														
														if(gstCount > 0)
														{
															document.getElementById("totalGst").value = totalTaxAmount;
														}
														else if(iGstCount > 0)
														{
															document.getElementById("totalIgst").value = totalTaxAmount;
														}
														
													}														
													//document.getElementById("totalGst").value = gstTotalTaxAmount;
													
								            	 
								            	 $("#jqGrid").jqGrid("setCell", rowId, "total", totalAmt);
								            	 var dist = 0;
								            	 var total1 = 0;
								            	 if (unit == "meter"
														|| unit == "Meter"
														|| unit == "METER"
														|| unit == "MTR"
														|| unit == "mtr"
														|| unit == "Mtr")
												{
								            		total1 = (editQuantity*rollS) * buyPrice;
												}
								            	else
								            	{
								            		total1 = editQuantity * buyPrice;
								            	}
								            	 if (dis > 0) 
													{
								            	 dist = (total1*dis)/100;
								            	 if (vat > 0) 
								            	 {
									            	 totAmt1 =  (((total1-dist)*(vat))/100);
									            	 }
									            	 else if (igst > 0) 
									            	 {
									            		 totAmt1 =  (((total1-dist)*(igst))/100);
									            	 }
									            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
												 }
								            	 else
								            		{
								            		 if (vat > 0) 
													{
								            			totAmt1 = (((total1)*(vat))/100);
									            	}
								            		 	else if (igst > 0) 
													{
									            		totAmt1 = (((total1)*(igst))/100);
									            	}
									            	 	totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
								            		}
								            	 
								            	// document.getElementById("editGrossTotal").value = totalAmt1;								            	 
								            	 
								            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", totalAmt1);
								            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
								            	 parseTotal = parseTotal.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { igst: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
								            	 var parseTotal1=  $(this).jqGrid('getCol', 'total', false, 'sum');
								            	 parseTotal1 = parseTotal1.toFixed(2);
								            	 var parseTotal2=  $(this).jqGrid('getCol', 'taxAmount', false, 'sum');
								            	 parseTotal2 = parseTotal2.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
								            	 $(this).jqGrid('footerData', 'set', { taxAmount: parseTotal2});
								            	 if(parseTotal == null || parseTotal == "" || parseTotal == undefined)
								            	 {
								            		 document.getElementById("resolution").value = "0.0";
								            	 }
								            	 else
								            	 {
								            		 total1 = editQuantity * buyPrice;
								            		 
									            	 if (dis > 0) 
													 {
									            	  dist = (total1*dis)/100;
									            	  if (vat > 0) 
													 {
									            	  totAmt1 =  (((total1-dist)*(vat))/100);
									            	 }
									            	  else if (igst > 0) 
													 {
									            	  	 totAmt1 =  (((total1-dist)*(igst))/100);
									            	 }
									            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
														}
									            	 else
									            		 {
									            		 if (vat > 0) 
															{
										            	 totAmt1 =  (((total1)*(vat))/100);
										            	 }
										            	 else if (igst > 0) 
															{
										            		 totAmt1 =  (((total1)*(igst))/100);
										            		 }
										            	 totalAmt1 = (+(total1-dist) + +totAmt1).toFixed(2);
									            		 
									            		 document.getElementById("resolution").value = totalAmt1;
									            	 } 
								            	 }
								            	 document.getElementById("resolution").value = parseTotal1;
								             },
								             
								              // set a footer row
								             //	footerrow: true, 
								             								             
								             gridComplete: function()
								             {								            	 
								            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
								            	 parseTotal = parseTotal.toFixed(2);
								            	 $(this).jqGrid('footerData', 'set', { igst: "Total :" });
								            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
								            	 var parseTotal1 = $(this).jqGrid('getCol', 'total', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
								            	 var totalTaxAmount = $(this).jqGrid('getCol', 'taxAmount', false, 'sum');
								            	 $(this).jqGrid('footerData', 'set', {taxAmount: totalTaxAmount});
								            	 var gstTotalTaxAmount = 0;
								            	 var iGstTotalTaxAmount = 0;
								            	 var vat = $(this).jqGrid('getCol', 'vat', false, 'sum');
								            	 var igst = $(this).jqGrid('getCol','igst', false, 'sum');
								            	 // 1 parseTotal1 = parseTotal1.toFixed(2);
								            	 if(vat > 0)
								            	 {
								            		 gstTotalTaxAmount = (+gstTotalTaxAmount + +totalTaxAmount).toFixed(2);;
								            	 }
								            	 if(igst > 0)
								            	 {
								            		 iGstTotalTaxAmount = (+iGstTotalTaxAmount + +totalTaxAmount).toFixed(2);;
								            	 }
								            	 
								            	 if(parseTotal == null || parseTotal == "" || parseTotal == undefined)
								            	 {
								            		 document.getElementById("resolution").value = "0.0";
								            	 }
								            	 else
								            	 {}
								            	 if(vat > 0)
								            	 {
								            		 document.getElementById("totalGst").value = gstTotalTaxAmount;
								            		 document.getElementById("totalIgst").value = "0.0";								            		
								            	 }
								            	 if(igst > 0)
								            	 {
								            		 document.getElementById("totalGst").value = "0.0";
								            		 document.getElementById("totalIgst").value = iGstTotalTaxAmount;
								            	 }
								            	 if((vat == 0 && igst == 0) || (vat == "" && igst == "") || (vat == null && igst == null))
								            	 {
								            		 document.getElementById("totalGst").value = "0.0";
								            		 document.getElementById("totalIgst").value = "0.0";
								            	 }								            		 
								            	 
								            	 document.getElementById("resolution").value = parseTotal1;
								            	 
								             },
								             pager : "#jqGridPager",
							});
					
					$("#jqGrid").addRowData(i, jsonData[i]);					
					
					$('#jqGrid').navGrid('#jqGridPager',
							// the buttons to appear on the toolbar of the grid
							{ edit: true, add: true, del: false, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
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

							// options for the Delete Dailog
							{
								closeAfterdel:true,
								recreateForm: true,
								afterComplete : function() {
									$('#jqGrid').trigger( 'reloadGrid' );									

					            	 var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');  
					            	 var rowData = jQuery("#jqGrid").getRowData(rowId);
					            	 var quantity = rowData['quantity'];
					            	 var availquantity = rowData['availquantity'];
					            	 var editQuantity = rowData['editQuantity'];
					            	 var buyPrice = rowData['buyPrice'];
					            	 var vat = rowData['vat'];
					            	 var totAmt = 0;
					            	 var totalAmt = 0;
					            	 var totAmt1 = 0;
					            	 var totalAmt1 = 0;

					            	 if(Number(editQuantity) > Number(availquantity))
					            	 {
					            		 myAlert("Return Quantity Is Greater Than Availabel Quantity");
					            	 }
					            	 var afterquantity = quantity - editQuantity;
					            	 var tota = afterquantity * buyPrice;
					            	 totAmt =  ((tota*(vat))/100);
					            	 totalAmt = +tota + +totAmt;
					            	 $("#jqGrid").jqGrid("setCell", rowId, "total", totalAmt);
					            	 var total1 = editQuantity * buyPrice;
					            	 totAmt1 =  ((total1*(vat))/100);
					            	 totalAmt1 = +total1 + +totAmt1;
					            	 $("#jqGrid").jqGrid("setCell", rowId, "returnTotal", totalAmt1);
					            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { vat: "Total :" });
					            	 $(this).jqGrid('footerData', 'set', { returnTotal: parseTotal});
					            	 var parseTotal1=  $(this).jqGrid('getCol', 'total', false, 'sum');
					            	 $(this).jqGrid('footerData', 'set', { total: parseTotal1});
					            	 document.getElementById("resolution").value = totalAmt1;
					             
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
				if (textStatus === "timeout")
				{
				}
			});
}


function getAllGridBillDetailsForPurchaseCashEditBilling()
{
	var params= {};
	
	
	var input = document.getElementById('partyName'),
    list = document.getElementById('invoiceBill_drop'),
    i,partyId;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
				partyId = list.options[i].getAttribute('data-value');
		}
	}
	
	var input1 = document.getElementById('empId'),
    list1 = document.getElementById('empId_drop'),
    i,ItemId;
	for (i = 0; i < list1.options.length; ++i)
	{
		if (list1.options[i].value === input1.value)
		{
				ItemId = list1.options[i].getAttribute('data-value');
		}
	}
	
	var billNo = $('#billNo').val();
	var ItemIdValue = $('#empId').val();
	customerType = "Cash";
	ItemIdTemp = "0";
	
	var billNoSetEmpty = "Empty";
	if(billNo == "" && ItemId != undefined)
	{
		billNo = billNoSetEmpty;
	}
	var itemIdSetEmpty = "Empty";
	if(billNo != "" && ItemIdValue == "")
	{
		ItemId = itemIdSetEmpty;
	}
	var billNoSetEmpty1 = "Empty";
	if(billNo != "" && ItemIdValue != "")
	{
		billNo = billNoSetEmpty1;
	}
	
//	alert("billNo :- "+billNo);
//	alert("partyId :- "+partyId);
//	alert("ItemIdValue :- "+ItemIdValue);
//	alert("input1 :- "+input1);
//	alert("ItemId :- "+ItemId);
	
	
	params["billNo"]= billNo;
	params["partyId"]= partyId;
	params["customerType"]= customerType;
	params["ItemId"]= ItemId;
	
	document.getElementById('empId').value ="";
	
	params["methodName"] ="getAllGridBillDetailsForPurchaseCashEditBilling";
	
	var count=0;
	var newrow;
	var rowId;
	//var vatAmt = 0;
	//var totAmt = 0;
	
	//var totalWithTax = 0;
	//var tot = 0;
	//var afterDelete;
	
	$.post('/embel/jsp/utility/controller.jsp',params,function(data)
	{	
		var jsonData = $.parseJSON(data);
		var result = data.length;

		$.each(jsonData,function(i,v)
		{
			count = jQuery("#jqGrid").jqGrid('getGridParam', 'records'); 
			var rowdata =$("#jqGrid").jqGrid('getGridParam','data');
			var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
			
			/*function sumFmatter (cellvalue, options, rowObject)
			{
				var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
				var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
				var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');
				var AllRows=JSON.stringify(allRowsInGrid1);
									
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
					//document.getElementById("totalAmount1").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
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
					//document.getElementById("discount1").value = grossDisTotal.toFixed(2);// Math.round(totalWithoutTax);
				}
				
				return total;
			}*/
			
			 var prodName,com,packing,unit;
			  for (var j = 0; j < count; j++) 
			  {
				  prodName = rowdata[j].ItemName;
				  
				
				 var rowId = ids[j];
				 var rowData = jQuery('#jqGrid').jqGrid ('getRowData', rowId);
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
				$("#jqGrid").addRowData(count,jsonData.offer);			
			}			
			
			$("#jqGrid").jqGrid({
				
				datatype: "local",
				
				colNames: ["PkProNameId","PARTICULARS","Quantity(Quintal)","Total Weight(Kg)","Bags","Packing(Kg)","Rate Per Quintal","Total" ],
				colModel:[						           
						   { 
							  name: "ProNameId",//PARTICULARS
							  hidden:true
						   },
				           { 	
				        	   name: "ItemName",//PARTICULARS
				        	   width:120,
				           },
				           /*{ 	
				        	   name: "hsnsacNo",//hsnsacNo
				        	   width:120,
				           },*/
				           { 
								  name: "availabelQuantity",//Available Quantity(Quintal)
								  width:120,
								  editable: true
				           },
				         /*  {
				        	   name: "quantityOdToDelete",//Available Stock
				        	   width: 250,
				           },*/	
				           {
				        	   name: "TotelWeight",
				        	   width: 120,
				        	   //formatter: WeightTotal,
				        	   //editable: true, // must set editable to true if you want to make the field editable
				           },
				           {
				        	   name:  "bags",
				        	   width: 120,
				        	   editable: true
				           },
				           {
				        	   name: "packing",
				        	   width: 120,
				        	   //editable: true
				           },
				           {
				        	   name:'priceperunit',
				        	   width: 120,
				        	   editable: true
				           },
				           {
				        	   name : 'GrossTotal',
				        	   //formatter: sumGrandTotal,
				        	   width: 140,
								//formatter: calculateTotal,
	  			           }
				],

				sortorder : 'desc',
				loadonce: false,
				viewrecords: true,
				width: 1300,
				/*height: 350,
				rowheight: 300,*/
				shrinkToFit: true,
				hoverrows: true,
				rownumbers: true,
				rowNum: 10,
				
				'cellEdit':true,
				
				afterSaveCell: function ()
				{
					//document.getElementById("discount1").value = "";
					
					var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');
					var rowData = jQuery("#jqGrid").getRowData(rowId);
					
					var GrossTotal =0;
					var Total=11;
					var TotelWeight = rowData['TotelWeight'];
					var bags = rowData['bags'];
					var packing = rowData['packing'];
					var priceperunit = rowData['priceperunit'];
					var quantity = rowData['availabelQuantity'];
					
					//Validation for quantity
					if(quantity != "")
					{
						var checkQuantity = /^[0-9]+\.?[0-9]*$/;
						if (quantity.match(checkQuantity))
						{
							
						}else{
							
							alert("Please Enter Valid Quantity ...!!!");
							var setOne = 1;
							$("#jqGrid").jqGrid("setCell",rowId,"availabelQuantity",setOne);
							return false;
						}
					}
					
					//Validation for bags
					if(bags !="")
					{
						var Bagsnew = /^\d{0,10}(?:\.\d{0,2})?$/;
						if(bags.match(Bagsnew)){
							
						} else {
							var buy ="0";
							alert("Please Enter Only Number In Bags ");
							$("#jqGrid").jqGrid("setCell",rowId, "bags", buy);
							//location.reload();
							return false;
						}
					}
					
					//Validation for packing
					/*if(packing !="")
					{
						var Pack = /^\d{0,10}(?:\.\d{0,2})?$/;
						if(packing.match(Pack)){
							
						} else {
							var PackingNew ="0";
							alert("Please Enter Only Number In Packing ");
							$("#jqGrid").jqGrid("setCell",rowId, "packing", PackingNew);
							//location.reload();
							return false;
						}
					}*/
					
					//Validation for priceperunit
					if(priceperunit !="")
					{
						var Rate = /^\d{0,10}(?:\.\d{0,2})?$/;
						if(priceperunit.match(Rate)){
							
						} else {
							var RatePer ="0";
							alert("Please Enter Only Number In Rate Per Quintal ");
							$("#jqGrid").jqGrid("setCell",rowId, "priceperunit", RatePer);
							//location.reload();
							return false;
						}
					}
					
					//Validation for Discount
					/*if(Discount != "")
					{
						var checkDiscount = /^[0-9]+\.?[0-9]*$/;
						if (Discount.match(checkDiscount))
						{
							
						} else {
							alert("Please Enter Valid Discount ...!!!");
							var setEmpty;
							$("#jqGrid").jqGrid("setCell",rowId,"discount",setEmpty);
							//location.reload();
							return false;
						}
					}*/
					/*if(Vat != "")
					{
						var IDecs = /^[0-9]+$/;
						if(Vat.match(IDecs))
						{
							(Vat > Number(0))
							{
//								var abc ="0";
//								alert(" Please Enter GST Number OR IGST Number");
//								$("#jqGrid").jqGrid("setCell",rowId, "IGst", abc);
//								$("#jqGrid").jqGrid("setCell",rowId, "Gst", abc);
								return false;
							}
						} else {
							var abc ="0";
							var pqr ="0";
							alert(" Please Enter GST Number OR IGST Number ");
							$("#jqGrid").jqGrid("setCell",rowId, "iGst", abc);
							$("#jqGrid").jqGrid("setCell",rowId, "Vat", abc);
							$("#jqGrid").jqGrid("setCell",rowId, "TaxAmount", pqr);
							return false;
						}
					}*/
					
					/*if(iGst != "")
					{
						var IDecs1 = /^[0-9]+$/;
						if(iGst.match(IDecs1))
						{
							(iGst > Number(0))
							{
//								var abc ="0";
//								alert(" Please Enter GST Number OR IGST Number");
//								$("#jqGrid").jqGrid("setCell",rowId, "IGst", abc);
//								$("#jqGrid").jqGrid("setCell",rowId, "Gst", abc);
//								return false;
							}
						} else {
							var abc ="0";
							var pqr ="0";
							alert(" Please Enter GST Number OR IGST Number ");
							$("#jqGrid").jqGrid("setCell",rowId, "iGst", abc);
							$("#jqGrid").jqGrid("setCell",rowId, "Vat", abc);
							$("#jqGrid").jqGrid("setCell",rowId, "TaxAmount", pqr);
							return false;
						}
					}*/
					
					/*if(iGst >0 && Vat > 0 )
					{
						var abc ="0";
						alert(" Please Enter GST Number OR IGST Number");
						$("#jqGrid").jqGrid("setCell",rowId, "iGst", abc);
						$("#jqGrid").jqGrid("setCell",rowId, "Vat", abc);
						$("#jqGrid").jqGrid("setCell",rowId, "TaxAmount", pqr);
						$("#jqGrid").jqGrid("setCell", rowId, "Total", pqr);
						$("#jqGrid").jqGrid("setCell", rowId, "GrossTotal", pqr);
						document.getElementById("grossTotal").value = pqr;
						return false;
					}*/
					
					var tota = bags * packing;
					
					/*if(tota != "")
					{
						var availableQuan = quantity * 100;
						if(availableQuan > tota){
							
						} else {
							alert("total quantity is greater than available quantity");
							return false;
						}
					}*/
					
					var quantityQuintal = quantity * 100;
					var totaroundoff= Math.round(quantityQuintal * 100.0) / 100.0;
					$("#jqGrid").jqGrid("setCell", rowId, "TotelWeight", totaroundoff.toFixed(2));
					
					
					var packing=TotelWeight/bags;
					var packing1= Math.round(packing * 100.0) / 100.0;
					$("#jqGrid").jqGrid("setCell", rowId, "packing", packing1.toFixed(2));
					
					
					var Total=quantity*priceperunit
					var totaroundoff1= Math.round(Total * 100.0) / 100.0;
					
					//var DiscountAmountTotal= Math.round(DiscountAmount * 100) / 100;
					//DiscountAmount= (Total*(Discount/100));
					//var DiscountAmountTotal= Math.round(DiscountAmount * 100.0) / 100.0;
					//var finalTotal= Total-DiscountAmount;
					//var finalTotal= Total;
					
					//$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmt", DiscountAmountTotal);
					//$("#jqGrid").jqGrid("setCell", rowId, "Total", totaroundoff1);
					$("#jqGrid").jqGrid("setCell", rowId, "GrossTotal", totaroundoff1);
					
					//var Total = (tota/100)* priceperunit;
					
					/*if(iGst ==null || iGst==0 || iGst=="")
					{
						//var calculateVatTotal = (Vat / 100)*Total;
						var calculateVatTotal = (Vat / 100)*finalTotal;
						var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal);
						var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
					} else if(iGst !=null || iGst!=0|| iGst!="")
					{
						var calculateVatTotal = (iGst / 100)*finalTotal;
						var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal);
						var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
					}
					//calculate GST Amount
					var calculateGSTAmout = totalWithVatAmtTot-finalTotal;
					var finalGSTAmout= Math.round(calculateGSTAmout * 100.0) / 100.0;
					$("#jqGrid").jqGrid("setCell", rowId, "GSTAmount", finalGSTAmout);*/
					
					
					//$("#jqGrid").jqGrid("setCell", rowId, "TotelWeight", tota);
					//$("#jqGrid").jqGrid("setCell", rowId, "Total", Total);
					//$("#jqGrid").jqGrid("setCell", rowId, "GrossTotal", totalWithVatAmtTot);
					//$("#jqGrid").jqGrid("setCell", rowId, "grossTotalWithExpense", totalWithVatAmtTot);
					
					var TotelWeight2 = 0.0;
					var count = jQuery('#jqGrid').jqGrid('getGridParam', 'records');
					var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
					var AllRows=JSON.stringify(allRowsInGrid1);
					
					for (var k = 0; k < count; k++)
					{
						var GrossTotal1 =allRowsInGrid1[k].GrossTotal;
						if(GrossTotal1 != undefined)
						{
							GrossTotal = GrossTotal + GrossTotal1;
						}
					}
					document.getElementById("grossTotal").value = GrossTotal.toFixed(2);
					
					
					document.getElementById("varai").value = "";
					document.getElementById("hamali").value ="";
					document.getElementById("tolai").value ="";
					document.getElementById("ladiesHamali").value ="";
					document.getElementById("levhy").value ="";
					document.getElementById("motarBhade").value ="";
					document.getElementById("rokhUchal").value ="";
					document.getElementById("vasuli").value ="";
					document.getElementById("etc").value ="";
					document.getElementById("tolalMinusAmount").value ="";
					
					document.getElementById("extraDis").value ="";
					document.getElementById("extraExpence").value ="";
					document.getElementById("extraExpenseName2Cash").value ="";
					document.getElementById("extraExpence2").value ="";
					document.getElementById("extraExpenseName3Cash").value ="";
					document.getElementById("extraExpence3").value ="";
					
					document.getElementById("grossTotalWithExpense").value = GrossTotal.toFixed(2);
				},
				
				pager: "#jqGridPager",
			});
			
			if(count==0 || count==null)
			{
				$("#jqGrid").addRowData(0,jsonData.offer);
				//document.getElementById("totalQuantity1").value = 1;
			}
			
			$('#jqGrid').navGrid('#jqGridPager',
				{ edit: true, add: false, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
					{
						editCaption: "The Edit Dialog",
						afterSubmit: function()
						{
							$('#jqGrid').trigger( 'reloadGrid' );
							var grid = $("#jqGrid"), intervalId = setInterval(function() {
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
							$('#jqGrid').trigger('reloadGrid');
						},
						closeAfterAdd: true,
						recreateForm: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					},

					{//ujiofdjhghdnkvghfdigbhfd
						closeAfterdel : true,
	                	checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
						afterComplete: function()
						{
							//rowDelete++;
							$('#jqGrid').trigger('reloadGrid');
							//rowDelete = 0;
							
							
							//document.getElementById("discount1").value = "";
					
					var rowId =$("#jqGrid").jqGrid('getGridParam','selrow');
					var rowData = jQuery("#jqGrid").getRowData(rowId);
					
					var GrossTotal =0;
					var Total=11;
					var TotelWeight = rowData['TotelWeight'];
					var bags = rowData['bags'];
					var packing = rowData['packing'];
					var priceperunit = rowData['priceperunit'];
					var quantity = rowData['availabelQuantity'];
					
					//Validation for quantity
					if(quantity != "")
					{
						var checkQuantity = /^[0-9]+\.?[0-9]*$/;
						if (quantity.match(checkQuantity))
						{
							
						}else{
							
							alert("Please Enter Valid Quantity ...!!!");
							var setOne = 1;
							$("#jqGrid").jqGrid("setCell",rowId,"availabelQuantity",setOne);
							return false;
						}
					}
					
					//Validation for bags
					if(bags !="")
					{
						var Bagsnew = /^\d{0,10}(?:\.\d{0,2})?$/;
						if(bags.match(Bagsnew)){
							
						} else {
							var buy ="0";
							alert("Please Enter Only Number In Bags ");
							$("#jqGrid").jqGrid("setCell",rowId, "bags", buy);
							//location.reload();
							return false;
						}
					}
					
					//Validation for packing
					/*if(packing !="")
					{
						var Pack = /^\d{0,10}(?:\.\d{0,2})?$/;
						if(packing.match(Pack)){
							
						} else {
							var PackingNew ="0";
							alert("Please Enter Only Number In Packing ");
							$("#jqGrid").jqGrid("setCell",rowId, "packing", PackingNew);
							//location.reload();
							return false;
						}
					}*/
					
					//Validation for priceperunit
					if(priceperunit !="")
					{
						var Rate = /^\d{0,10}(?:\.\d{0,2})?$/;
						if(priceperunit.match(Rate)){
							
						} else {
							var RatePer ="0";
							alert("Please Enter Only Number In Rate Per Quintal ");
							$("#jqGrid").jqGrid("setCell",rowId, "priceperunit", RatePer);
							//location.reload();
							return false;
						}
					}
					
					//Validation for Discount
					/*if(Discount != "")
					{
						var checkDiscount = /^[0-9]+\.?[0-9]*$/;
						if (Discount.match(checkDiscount))
						{
							
						} else {
							alert("Please Enter Valid Discount ...!!!");
							var setEmpty;
							$("#jqGrid").jqGrid("setCell",rowId,"discount",setEmpty);
							//location.reload();
							return false;
						}
					}*/
					/*if(Vat != "")
					{
						var IDecs = /^[0-9]+$/;
						if(Vat.match(IDecs))
						{
							(Vat > Number(0))
							{
//								var abc ="0";
//								alert(" Please Enter GST Number OR IGST Number");
//								$("#jqGrid").jqGrid("setCell",rowId, "IGst", abc);
//								$("#jqGrid").jqGrid("setCell",rowId, "Gst", abc);
								return false;
							}
						} else {
							var abc ="0";
							var pqr ="0";
							alert(" Please Enter GST Number OR IGST Number ");
							$("#jqGrid").jqGrid("setCell",rowId, "iGst", abc);
							$("#jqGrid").jqGrid("setCell",rowId, "Vat", abc);
							$("#jqGrid").jqGrid("setCell",rowId, "TaxAmount", pqr);
							return false;
						}
					}*/
					
					/*if(iGst != "")
					{
						var IDecs1 = /^[0-9]+$/;
						if(iGst.match(IDecs1))
						{
							(iGst > Number(0))
							{
//								var abc ="0";
//								alert(" Please Enter GST Number OR IGST Number");
//								$("#jqGrid").jqGrid("setCell",rowId, "IGst", abc);
//								$("#jqGrid").jqGrid("setCell",rowId, "Gst", abc);
//								return false;
							}
						} else {
							var abc ="0";
							var pqr ="0";
							alert(" Please Enter GST Number OR IGST Number ");
							$("#jqGrid").jqGrid("setCell",rowId, "iGst", abc);
							$("#jqGrid").jqGrid("setCell",rowId, "Vat", abc);
							$("#jqGrid").jqGrid("setCell",rowId, "TaxAmount", pqr);
							return false;
						}
					}*/
					
					/*if(iGst >0 && Vat > 0 )
					{
						var abc ="0";
						alert(" Please Enter GST Number OR IGST Number");
						$("#jqGrid").jqGrid("setCell",rowId, "iGst", abc);
						$("#jqGrid").jqGrid("setCell",rowId, "Vat", abc);
						$("#jqGrid").jqGrid("setCell",rowId, "TaxAmount", pqr);
						$("#jqGrid").jqGrid("setCell", rowId, "Total", pqr);
						$("#jqGrid").jqGrid("setCell", rowId, "GrossTotal", pqr);
						document.getElementById("grossTotal").value = pqr;
						return false;
					}*/
					
					var tota = bags * packing;
					
					/*if(tota != "")
					{
						var availableQuan = availabelQuantity * 100;
						if(availableQuan > tota){
							
						} else {
							alert("total quantity is greater than available quantity");
							return false;
						}
					}*/
					
					var quantityQuintal = quantity * 100;
					var totaroundoff= Math.round(quantityQuintal * 100.0) / 100.0;
					$("#jqGrid").jqGrid("setCell", rowId, "TotelWeight", totaroundoff.toFixed(2));
					
					
					var packing=TotelWeight/bags;
					var packing1= Math.round(packing * 100.0) / 100.0;
					$("#jqGrid").jqGrid("setCell", rowId, "packing", packing1.toFixed(2));
					
					
					var Total=quantity*priceperunit
					var totaroundoff1= Math.round(Total * 100.0) / 100.0;
					
					//var DiscountAmountTotal= Math.round(DiscountAmount * 100) / 100;
					//DiscountAmount= (Total*(Discount/100));
					//var DiscountAmountTotal= Math.round(DiscountAmount * 100.0) / 100.0;
					//var finalTotal= Total-DiscountAmount;
					//var finalTotal= Total;
					
					//$("#jqGrid").jqGrid("setCell", rowId, "DiscountAmt", DiscountAmountTotal);
					//$("#jqGrid").jqGrid("setCell", rowId, "Total", totaroundoff1);
					$("#jqGrid").jqGrid("setCell", rowId, "GrossTotal", totaroundoff1);
					
					//var Total = (tota/100)* priceperunit;
					
					/*if(iGst ==null || iGst==0 || iGst=="")
					{
						//var calculateVatTotal = (Vat / 100)*Total;
						var calculateVatTotal = (Vat / 100)*finalTotal;
						var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal);
						var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
					} else if(iGst !=null || iGst!=0|| iGst!="")
					{
						var calculateVatTotal = (iGst / 100)*finalTotal;
						var totalWithVatAmt = Number(finalTotal)+Number(calculateVatTotal);
						var totalWithVatAmtTot= Math.round(totalWithVatAmt * 100.0) / 100.0;
					}
					//calculate GST Amount
					var calculateGSTAmout = totalWithVatAmtTot-finalTotal;
					var finalGSTAmout= Math.round(calculateGSTAmout * 100.0) / 100.0;
					$("#jqGrid").jqGrid("setCell", rowId, "GSTAmount", finalGSTAmout);*/
					
					
					//$("#jqGrid").jqGrid("setCell", rowId, "TotelWeight", tota);
					//$("#jqGrid").jqGrid("setCell", rowId, "Total", Total);
					//$("#jqGrid").jqGrid("setCell", rowId, "GrossTotal", totalWithVatAmtTot);
					//$("#jqGrid").jqGrid("setCell", rowId, "grossTotalWithExpense", totalWithVatAmtTot);
					
					var TotelWeight2 = 0.0;
					var count = jQuery('#jqGrid').jqGrid('getGridParam', 'records');
					var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
					var AllRows=JSON.stringify(allRowsInGrid1);
					
					for (var k = 0; k < count; k++)
					{
						var GrossTotal1 =allRowsInGrid1[k].GrossTotal;
						if(GrossTotal1 != undefined)
						{
							GrossTotal = GrossTotal + GrossTotal1;
						}
					}
					document.getElementById("grossTotal").value = GrossTotal.toFixed(2);
					
					
					document.getElementById("varai").value = "";
					document.getElementById("hamali").value ="";
					document.getElementById("tolai").value ="";
					document.getElementById("ladiesHamali").value ="";
					document.getElementById("levhy").value ="";
					document.getElementById("motarBhade").value ="";
					document.getElementById("rokhUchal").value ="";
					document.getElementById("vasuli").value ="";
					document.getElementById("etc").value ="";
					document.getElementById("tolalMinusAmount").value ="";
					
					document.getElementById("extraDis").value ="";
					document.getElementById("extraExpence").value ="";
					document.getElementById("extraExpenseName2Cash").value ="";
					document.getElementById("extraExpence2").value ="";
					document.getElementById("extraExpenseName3Cash").value ="";
					document.getElementById("extraExpence3").value ="";
					
					document.getElementById("grossTotalWithExpense").value = GrossTotal.toFixed(2);
							
													
						},//fkiopgiopdfigkopgkopfd
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

function getProductDetailsListForEditPurchase()
{
	itemparams = {};
	
	var bookingNo = $("#bookingNo").val();
	
	if(bookingNo == null || bookingNo == "" || bookingNo == " " || bookingNo == undefined)
	{
		var input = document.getElementById('itemName'), list = document
		.getElementById('itemId_drop'), i, catName, itemName, hsnsacno, productId, size;
		for (i = 0; i < list.options.length; ++i)
		{
			if (list.options[i].value === input.value) {
				catName = list.options[i].getAttribute('data-value');
				itemName = list.options[i].getAttribute('myvalue');
				subcatId = list.options[i].getAttribute('myvalue1');
				productId = list.options[i].getAttribute('myvalue2');
				size = list.options[i].getAttribute('myvalue4');
				fkCatId = list.options[i].getAttribute('myvalue5');
			}
		}
		
		itemparams["itemName"] = itemName;
		itemparams["catName"] = catName;
		itemparams["productId"] = productId;
		itemparams["size"] = size;
		itemparams["fkCatId"] = fkCatId;
		itemparams["subcatId"] = subcatId;
		
		document.getElementById('itemName').value = null;
	}
	else
	{
		itemparams["bookingNo"] = bookingNo;
		document.getElementById('bookingNo').value = null;
	}	
		var count = 0;
		var newrow;
		var rowId;
		itemparams["methodName"] = "getProductInGrid";
		$.post('/SMT/jsp/utility/controller.jsp',itemparams,function(data)
		{
			var jsonData = $.parseJSON(data);
			if(jsonData.offer == null || jsonData.offer == "" || jsonData.offer == " " || jsonData.offer == undefined)
			{
				myAlert("Invalid Advance Booking No.");
				return false;
			}
			else
			{}
			$.each(jsonData, function(i, v)
			{
					count = jQuery("#jqGrid").jqGrid('getGridParam','records');
					var rowdata = $("#jqGrid").jqGrid('getGridParam', 'data');
					var ids = jQuery("#jqGrid").jqGrid('getDataIDs');												
						
						var ori_quantity, offerId;
						for (var j = 0; j < count; j++)
						{
							offerId = rowdata[j].itemName;
							var rowId = ids[j];
							var rowData = jQuery('#jqGrid').jqGrid('getRowData',rowId);													
							
							if (offerId == jsonData.offer.itemName)
							{
								ori_quantity = +rowdata[j].quantity + 1;

								$("#jqGrid").jqGrid("setCell",rowId,"quantity",ori_quantity);
								var grid = jQuery("#jqGrid");
								grid.trigger("reloadGrid");
								newrow = false;
								break;
							}
							else
							{
								newrow = true;
							}
						}
						
						for (var j = 0; j < count; j++)
						{
							var gridBookingNoAB = rowdata[j].bookingNoAB;
							
							if(gridBookingNoAB == bookingNo)
							{
								newrow=false;
								myAlert("Booking Number Already Inserted !!!");
								var grid = jQuery("#jqGrid");
								grid.trigger("reloadGrid");
								break;
							}
						}
						if (newrow == true)
						{	
							$("#jqGrid").addRowData(count,jsonData.offer);
						}

								$("#jqGrid").jqGrid(
												{
													datatype : "local",
													editurl : 'clientArray',
													colNames : [
															"ProductId",
															"ItemName",
															"Category<br>Name",
															"Category Id",
															"Sub<br>Category<br>Name",
															"subCatId",
															"Adv.<br>Booking No.",
															
															"RollSize",
															"Size",
															"SizeFIXED",
															
															"Quantity",
															"BuyPrice<br>Ex Tax",
															"Purchase Code",
															"Sale Price<br>Inc Tax",
															"Discount %",
															"GST %",
															"IGST %",
															"TAX AMT",
															"Total",
															"HSN/SAC",
															"Color",
															"Style",
															"fkShopId"
															],
													colModel : [
															{
																name : "productId",// PARTICULARS
																width : 20,
																hidden : true,
															},
															{
																name : "itemName",// PARTICULARS
																width : 10,
															},
															{
																name : "catName",
																width : 10,
															},
															{
																name : "categoryId",
																width : 10,
																hidden : true,
															},
															{
																name : "subCatName",
																width : 10,
															},
															{
																name : "subCatId",
																width : 10,
																hidden : true,
															},
															{
																name : "bookingNoAB",
																width : 10,
															},
															
															{
																id : "rollSize",
																name : "rollSize",
																width : 10,
																editable : true,
																// hidden
																// :
																// true,
															},
															{
																id : "size",
																name : "size",
																width : 10,
																editable : true,
															},
															{
																id : "sizeFixed",
																name : "sizeFixed",
																width : 10,
																hidden:true,
															},
															
															{
																name : "quantity",
																width : 10,
																editable : true,
																edittype:"text",
																classes: 'myBackGroundColor',
																editoptions:{
																	 maxlengh: 30,
																    dataInit: function(element)
																    {
																        $(element).keypress(function(e){
																             if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57))
																             {
																                return false;
																             }
																        });
																    }
													            }
															},
															{
																name : "buyPrice",
																width : 10,
																editable : true,
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
												        	  },
																classes: 'myBackGroundColor',
															},
															{
																name : "purcode",
																width : 15,
																// editable
																// :
																// true,
																hidden:true,
															},
															{
																name : "actualprice",
																width : 10,
																editable : true,
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
												        	  },
																classes: 'myBackGroundColor',
															},
															{
																name : "disPer",
																width : 10,
																editable : true,
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
																name : "vat",// PARTICULARS
																width : 10,
																editable : true,
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
																name : "igst",// PARTICULARS
																width : 10,
																editable : true,
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
																name : "gstamt",// PARTICULARS
																width : 10,
															},
															{
																name : "Total",
																width : 10,
																formatter : 'number',
																classes: 'myBackGroundColor',
															},
															
															{
																name : "hsnsacno",
																width : 10,
															},
															{
																name : "color",
																width : 10,
																editable : true,
															},
															{
																id : "style",
																name : "style",
																width : 10,
																editable : true,
															},
															{
																name : "fkShopId",
																width : 10,
																hidden : true,
															}
															],
															
													sortorder : 'desc',
													multiselect : false,
													loadonce : false,
													viewrecords : true,
													width : 1310,
													shrinkToFit : true,
													rowheight : 300,
													rownumbers : true,
													onSelectRow : editRow,
													rowNum : 30,

													'cellEdit' : true,																	

													afterSaveCell : function()
													{
														var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
														var rowData = jQuery("#jqGrid").getRowData(rowId);
														var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
														var itemName = rowData['itemName'];
														var quantity = rowData['quantity'];
														var buyPrice = rowData['buyPrice'];
														var disPer = rowData['disPer'];
														var unit = rowData['size'];
														var checkUnit = unit.toUpperCase(); 
														var sizeFixed = rowData['sizeFixed'];
														var rollSize = rowData['rollSize'];
														var gst = rowData['vat'];
														var igst = rowData['igst'];																		
														var subCatId = rowData['subCatId'];
														var bookingNoAB = rowData['bookingNoAB'];
														var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
														
														
														if (sizeFixed == "meter"
															|| sizeFixed == "Meter"
															|| sizeFixed == "METER"
															|| sizeFixed == "MTR"
															|| sizeFixed == "mtr"
															|| sizeFixed == "Mtr")
														{
															$("#jqGrid").jqGrid("setCell",rowId,"size",sizeFixed);
														}
														
														if(gst == "")
														{
															gst = 0;
															var setZero = 0;
															$("#jqGrid").jqGrid("setCell",rowId,"vat",setZero);
														}
														
														if(igst == "")
														{
															igst = 0;
															var setZero = 0;
															$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
														}
														
														if(Number(gst) > 0)
														{
															igst = 0;
															var setZero = 0;
															$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
														}
														else
														{
															document.getElementById("totalGst").value = 0;
															document.getElementById("totalCgst").value = 0;
															document.getElementById("totalSgst").value = 0;
														}
														
														if(Number(igst) > 0)
														{
															gst = 0;
															var setZero = 0;
															$("#jqGrid").jqGrid("setCell",rowId,"vat",setZero);
														}
														else
														{
															document.getElementById("totalIgst").value = 0;
														}																		
																											
														
														for (var r = 0; r < count1; r++)
														{
															if(gst > 0 )
															{	
																var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
																for (var s = 0; s < count1; s++)
																{
																	var rowId1 = ids[s];
																	var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																	var currentIgst = rowData1['igst'];
																	if(currentIgst > 0)
																	{
																		var setZero = 0;
																		myAlert("Please Ener Either GST OR IGST");
																		$("#jqGrid").jqGrid("setCell",rowId,"vat",setZero);
																		$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
																		document.good.btnSubmit.disabled = false;
																		document.good.btnSubmit1.disabled = false;
																		return false;
																	}
																}
															}
															else{}
															if(igst > 0 )
															{	
																var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
																for (var s = 0; s < count1; s++)
																{
																	var rowId1 = ids[s];
																	var rowData1 = jQuery("#jqGrid").getRowData(rowId1);
																	var currentGst = rowData1['vat'];
																	if(currentGst > 0)
																	{
																		var setZero = 0;
																		myAlert("Please Ener Either GST OR IGST");
																		$("#jqGrid").jqGrid("setCell",rowId,"vat",setZero);
																		$("#jqGrid").jqGrid("setCell",rowId,"igst",setZero);
																		document.good.btnSubmit.disabled = false;
																		document.good.btnSubmit1.disabled = false;
																		return false;
																	}
																}
															}
															else{}																		
														}
														
														
														if (unit == "meter"
															|| unit == "Meter"
															|| unit == "METER"
															|| unit == "MTR"
															|| unit == "mtr"
															|| unit == "Mtr")
														{
															if(rollSize == "0" || rollSize == "" || rollSize == undefined || rollSize == null)
															{
																myAlert("please Enter RollSize For = "+itemName);
																document.good.btnSubmit.disabled = false;
																document.good.btnSubmit1.disabled = false;
																return false;
															}
														}
														else
														{
															rollSize = 0;
															var setZero = 0;
															$("#jqGrid").jqGrid("setCell",rowId,"rollSize",setZero);
														}
														
														if (rollSize != "0")
														{
															rs = rollSize;
														}
														else
														{
															rs = 1;
														}

														/*
														 * var
														 * gst =
														 * rowData['vat'];
														 * var
														 * igst =
														 * rowData['igst'];
														 */
														var taxamt = rowData['gstamt']
														var vatAmt = 0;
														var discount = 0;
														var tota = 0;
														var totAmt = 0;
														var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
														var gst1 = 0;
														var iGst1 = 0;
														var TotalGst = 0;
														var TotalIgst = 0;

														for (var r = 0; r < count1; r++)
														{
															tota = quantity * rs * buyPrice;
															totAmt = quantity * rs * buyPrice;
															if (disPer != "0")
															{
																discount = ((tota * disPer) / 100);
																tota = (+tota - +discount);
																totAmt = +tota;
															}
															if (gst > 0)
															{
																vatAmt = ((tota * (gst)) / 100).toFixed(2);
																totAmt = +tota + +vatAmt;
																TotalGst = +TotalGst + +vatAmt;
															}
															if (igst > 0)
															{
																vatAmt = ((tota * igst) / 100).toFixed(2);
																totAmt = +tota + +vatAmt;
																TotalIgst = +TotalIgst + +vatAmt;
															}
															
															$("#jqGrid").jqGrid("setCell",rowId,"gstamt",vatAmt);
															$("#jqGrid").jqGrid("setCell",rowId,"Total",totAmt);
														}

														for (var x = 0; x < count1; x++)
														{
															var rowId = ids[x];
															var rowData = jQuery("#jqGrid").getRowData(rowId);
															var vat = rowData['vat'];
															var igst = rowData['igst'];
															var gstamt1 = rowData['gstamt'];
															if (vat > 0)
															{
																gst1 = (+gst1 + +gstamt1).toFixed(2);
																document.getElementById("totalGst").value = gst1;
																document.getElementById("totalCgst").value = (gst1/2).toFixed(2);
																document.getElementById("totalSgst").value = (gst1/2).toFixed(2);
																
															}
															else if (igst > 0)
															{
																iGst1 = (+iGst1 + +gstamt1).toFixed(2);
																document.getElementById("totalIgst").value = iGst1;
																document.getElementById("totalCgst").value = 0;
																document.getElementById("totalSgst").value = 0;
															}
														}

														var Total = 0;
														var TotalQuantity = 0;
														var TotalGst = 0;
														var TotalIgst = 0;

														var count2 = jQuery("#jqGrid").jqGrid('getGridParam','records');
														var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
														var AllRows = JSON.stringify(allRowsInGrid1);
														for (var k = 0; k < count2; k++)
														{
															var Total1 = allRowsInGrid1[k].Total;
															if (Total1 != undefined) {
																Total = +Total + +Total1;
															}
														}
														for (var n = 0; n < count2; n++) {
															var TotalQuantity1 = allRowsInGrid1[n].quantity;
															if (Total1 != undefined) {
																TotalQuantity = +TotalQuantity + +TotalQuantity1;
															}
														}
														/*
														 * document.getElementById("resolution").value =
														 * Math.round(Total);
														 */
														document.getElementById("resolution").value = Total.toFixed(2);
														/*
														 * document.getElementById("resolution1").value =
														 * Math.round(Total);
														 */
														document.getElementById("resolution1").value = Total.toFixed(2);
														document.getElementById("totalQuantity").value = TotalQuantity;
														var totAmount = Total.toFixed(2);
														;
														var extraDiscount = document.getElementById("extraDiscount").value;
														if (extraDiscount != "0")
														{
															document.getElementById("resolution").value = totAmount;
														}
														else
														{
															var disAmount = (extraDiscount / 100) * totAmount;
															var gross = +totAmount - +disAmount;
															document.getElementById("resolution").value = gross.toFixed(2);/* Math.round(gross) */
														}

														var expence = document.getElementById("expence").value;
														if (expence != "0")
														{
															document.getElementById("resolution").value = totAmount;
														}
														else
														{
															document.getElementById("resolution").value = (+totAmount + +expence);
														}
													},

													pager : "#jqGridPager",
												});

								var lastSelection;

								function editRow(id)
								{
									if (id
											&& id !== lastSelection) {
										var grid = $("#jqGrid");
										grid.jqGrid('restoreRow',lastSelection);
										grid.jqGrid('editRow',id,
												{
													keys : true
												});
										lastSelection = id;
									}
								}

								if (count == 0 || count == null) {
									$("#jqGrid").addRowData(0,
											jsonData.offer);
								}

								$('#jqGrid').navGrid(
												'#jqGridPager',
												// the buttons to appear on the toolbar of the grid
												{
													edit : true,
													add : false,
													del : true,
													search : true,
													refresh : false,
													view : true,
													position : "left",
													cloneToTop : false
												},
												// options for the Edit Dialog
												{
													editCaption : "The Edit Dialog",
													reloadAfterSubmit : true,
													closeAfterEdit : true,
													recreateForm : true,
													errorTextFormat : function(
															data) {
														return 'Error: '
																+ data.responseText
													}
												},

												{},

												{
													errorTextFormat : function(data)
													{
														return 'Error: '+ data.responseText
													},
													afterComplete : function()
													{
														$('#jqGrid').trigger('reloadGrid');

														var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
														var rowData = jQuery("#jqGrid").getRowData(rowId);
														var count = jQuery("#jqGrid").jqGrid('getGridParam','records');

														var itemName = rowData['itemName'];
														var quantity = rowData['quantity'];
														var buyPrice = rowData['buyPrice'];
														var disPer = rowData['disPer'];
														var gst = rowData['vat'];
														var igst = rowData['igst'];
														var taxamt = rowData['gstamt']
														var vatAmt = 0;
														var discount = 0;
														var tota = 0;
														var totAmt = 0;
														var ids = jQuery("#jqGrid").jqGrid('getDataIDs');

														var gst1 = 0;
														var iGst1 = 0;
														var TotalGst = 0;
														var TotalIgst = 0;
														var count1 = count - 1;
														for (var r = 0; r < count; r++) {

															tota = quantity
																	* buyPrice;
															totAmt = quantity
																	* buyPrice;
															if (disPer != "0") {
																discount = ((tota * disPer) / 100);
																tota = +tota
																		- +discount;
																totAmt = +tota;
															}
															if (gst != "0") {
																vatAmt = ((tota * (gst)) / 100);
																totAmt = +tota
																		+ +vatAmt;
																TotalGst = +TotalGst
																		+ +vatAmt;

															}
															if (igst != "0") {
																vatAmt = ((tota * igst) / 100);
																totAmt = +tota
																		+ +vatAmt;
																TotalIgst = +TotalIgst
																		+ +vatAmt;

															}
															$("#jqGrid").jqGrid("setCell",rowId,"gstamt",vatAmt);
															$("#jqGrid").jqGrid("setCell",rowId,"Total",totAmt);
														}

														for (var x = 0; x < count; x++) {
															var rowId = ids[x];
															var rowData = jQuery("#jqGrid").getRowData(rowId);
															var vat = rowData['vat'];
															var igst = rowData['igst'];
															var gstamt1 = rowData['gstamt'];
															if (vat > 0)
															{																			
																gst1 = (+gst1 + +gstamt1).toFixed(2);
																document.getElementById("totalGst").value = gst1;
																document.getElementById("totalCgst").value = (gst1/2).toFixed(2);
																document.getElementById("totalSgst").value = (gst1/2).toFixed(2);
															}
															else if (igst > 0)
															{
																iGst1 = (+iGst1 + +gstamt1).toFixed(2);
																document.getElementById("totalIgst").value = iGst1;
															}
														}
														var Total = 0;
														var TotalQuantity = 0;
														var TotalGst = 0;
														var TotalIgst = 0;

														var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
														var AllRows = JSON.stringify(allRowsInGrid1);
														var count2 = count - 1;
														for (var k = 0; k < count; k++) {
															var Total1 = allRowsInGrid1[k].Total;
															if (Total1 != undefined) {
																Total = +Total + +Total1;
															}
														}

														for (var n = 0; n < count; n++)
														{
															var TotalQuantity1 = allRowsInGrid1[n].quantity;
															if (Total1 != undefined)
															{
																TotalQuantity = +TotalQuantity + +TotalQuantity1;
															}
														}
														document.getElementById("resolution").value = Total.toFixed(2);
														document.getElementById("resolution1").value = Total.toFixed(2);
														document.getElementById("totalQuantity").value = TotalQuantity;
														var totAmount = Total.toFixed(2);

														var extraDiscount = document.getElementById("extraDiscount").value;
														if (extraDiscount != "0")
														{
															document.getElementById("resolution").value = totAmount.toFixed(2);
														}
														else
														{
															var disAmount = (extraDiscount / 100) * totAmount;
															var gross = +totAmount - +disAmount;
															document.getElementById("resolution").value = gross.toFixed(2);
														}

														var expence = document.getElementById("expence").value;
														if (expence != "0")
														{
															document.getElementById("resolution").value = totAmount.toFixed(2);
														} else {
															document.getElementById("resolution").value = (+totAmount + +expence).toFixed(2);
														}
													},

													onSelectRow : function(id)
													{
														if (id && id !== lastSel) {
															jQuery("#jqGrid").saveRow(lastSel,true,'clientArray');
															jQuery("#jqGrid").editRow(id,true);
															lastSel = id;
															console.log(id);
														}
													}

												});
							}).error(function(jqXHR, textStatus,
									errorThrown) {
								if (textStatus === "timeout") {
									$(loaderObj).hide();
									$(loaderObj).find(
											'#errorDiv').show();
								}
							})
						});
}















































