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

//SUPPLIER DETAILS DIALOG 
function suppDetailsDivAction(a)
{	
	if(a==1)
    {
		//$( "#suppDetailsDiv" ).dialog({height: 420, width:1000});
		$( "#suppDetailsDiv" ).dialog({
			height: 540,
			width: 1000,
			//autoOpen: false,
			//modal: false,
			resizable: false,
			draggable: false,
			position:
			{
				my: "center",
				at: "center",
				of: window,
				collision: "none",
			}
		});
		document.getElementById("popupblur").style.filter="blur(20px)";
    }
    else
    {
    	$( "#suppDetailsDiv" ).dialog('close');
       	//document.getElementById("suppDetailsDiv").style.display="none";
    	document.getElementById("popupblur").style.filter="none";
    }
	
	$('#suppListDiv').load(document.URL +  ' #suppListDiv');
}	
	
//CATEGORY DETAILS DIALOG 
function categoryDetailsDivAction(a)
{	
	if(a==1)
    {
		//$( "#suppDetailsDiv" ).dialog({height: 420, width:1000});
		$( "#categoryDialogDiv" ).dialog({
			height: 240,
			width: 600,
			//autoOpen: false,
			//modal: false,
			resizable: true,
			draggable: false,
			position:
			{
				my: "center",
				at: "center",
				of: window,
				//collision: "none",
			}
		});
    }
    else
    {
    	$( "#categoryDialogDiv" ).dialog('close');
       	//document.getElementById("suppDetailsDiv").style.display="none";
    }
}
	
//SUB-CATEGORY DETAILS DIALOG 
function subCategoryDetailsDivAction(a)
{	
	if(a==1)
    {
		//$( "#suppDetailsDiv" ).dialog({height: 420, width:1000});
		$("#subCategoryDialogDiv").dialog({
			height: 240,
			width: 600,
			//autoOpen: false,
			//modal: false,
			resizable: true,
			draggable: false,
			position:
			{
				my: "center",
				at: "center",
				of: window,
				collision: "none",
			}
		});
    }
    else
    {
    	$("#subCategoryDialogDiv").dialog('close');
    }	
}
	
//PRODUCT DETAILS DIALOG 
function productDetailsDivAction(a)
{		
	if(a==1)
    {
		//$( "#suppDetailsDiv" ).dialog({height: 420, width:1000});
		$("#productDetailsDialogDiv").dialog({
			height: 575,
			width: 1000,
			//autoOpen: false,
			//modal: false,
			resizable: true,
			draggable: false,
			position:
			{
				my: "center",
				at: "center",
				of: window,
				collision: "none",
			}
		});
    }
    else
    {
    	$("#productDetailsDialogDiv").dialog('close');
    }	
}

function formActionsSH(a)
{
    if(a==1)
    {
       	document.getElementById("good").style.display="none";
    }
    else
    {
       	document.getElementById("good").style.display="block";
    }
}

function isNumber(evt)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
        return false;
    }
    return true;
}


function getProductListForAdvanceBooking()
{
		var dotCount = 0;
	
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

		itemparams = {};

		var forAdvanceBooking = $("#forAdvanceBooking").val();
		
		itemparams["itemName"] = itemName;
		itemparams["catName"] = catName;
		itemparams["productId"] = productId;
		itemparams["size"] = size;
		itemparams["fkCatId"] = fkCatId;
		itemparams["subcatId"] = subcatId;
		itemparams["forAdvanceBooking"] = forAdvanceBooking;

		document.getElementById('itemName').value = null;
		var count = 0;
		var newrow;
		var rowId;
		itemparams["methodName"] = "getMultipleProductInGridForAdvanvceBookingCntrl";
		$.post('/SMT/jsp/utility/controller.jsp',itemparams,function(data)
		{
			var jsonData = $.parseJSON(data);
							$.each(jsonData, function(i, v){
												count = jQuery("#jqGrid").jqGrid('getGridParam','records');
												var rowdata = $("#jqGrid")
														.jqGrid('getGridParam',
																'data');
												var ids = jQuery("#jqGrid")
														.jqGrid('getDataIDs');

												var ori_quantity, offerId;
												for (var j = 0; j < count; j++) {
													offerId = rowdata[j].itemName;

													var rowId = ids[j];
													var rowData = jQuery(
															'#jqGrid')
															.jqGrid(
																	'getRowData',
																	rowId);

													if (offerId == jsonData.offer.itemName) {
														ori_quantity = +rowdata[j].quantity + 1;

														$("#jqGrid").jqGrid(
																"setCell",
																rowId,
																"quantity",
																ori_quantity);
														var grid = jQuery("#jqGrid");
														grid
																.trigger("reloadGrid");
														newrow = false;
														break;
													} else {
														newrow = true;
													}
												}

												var prodName, com;
												for (var j = 0; j < count; j++) {
													prodName = rowdata[j].itemName;
													com = rowdata[j].catName;

													var rowId = ids[j];
													var rowData = jQuery(
															'#jqGrid')
															.jqGrid(
																	'getRowData',
																	rowId);
													newrow = true;
												}
												if (newrow == true) {
													$("#jqGrid").addRowData(
															count,
															jsonData.offer);
												}

												$("#jqGrid")
														.jqGrid(
																{
																	datatype : "local",
																	editurl : 'clientArray',
																	colNames : [
																			"ProductId",
																			"ItemName",
																			"Category Name",
																			"Category Id",
																			"Sub Category Name",
																			"subCatId",
																			"HSN/SAC",
																			"Color",
																			"Roll Size",
																			"Size",
																			"SizeFIXED",
																			"Style",
																			"Quantity",
																			"fkShopId",
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
																				name : "hsnsacno",
																				width : 10,
																				hidden:true,
																			},
																			{
																				name : "color",
																				width : 10,
																				editable : true,
																			},
																			{
																				id : "rollSize",
																				name : "rollSize",
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
																				//hidden : true,
																			},
																			{
																				id : "size",
																				name : "size",
																				width : 10,
																				//editable : true,
																			},
																			{
																				id : "sizeFixed",
																				name : "sizeFixed",
																				width : 10,
																				hidden:true,
																			},
																			{
																				id : "style",
																				name : "style",
																				width : 10,
																				editable : true,
																			},
																			{
																				name : "quantity",
																				width : 10,
																				editable : true,
																				edittype:"text",
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
																				id : "fkShopId",
																				name : "fkShopId",
																				width : 10,
																				hidden: true,
																			},
																			],
																			
																	sortorder : 'desc',
																	multiselect : false,
																	loadonce : false,
																	viewrecords : true,
																	width : 1200,
																	shrinkToFit : true,
																	rowheight : 300,
																	rownumbers : true,
																	onSelectRow : editRow,
																	rowNum : 30,

																	'cellEdit' : true,																	

																	afterSaveCell : function()
																	{
																		/*var gstRangePer = document.getElementById('gstRangePer').value;
																		var startPrice = document.getElementById('startPrice').value;
																		var endPrice = document.getElementById('endPrice').value;
																		var taxType = document.getElementById('taxType').value;*/
																		
																		//myAlert("gstRangePer ===> "+gstRangePer+"\nstartPrice ===> "+startPrice+"\nendPrice ====> "+endPrice);
																		
																		var rowId = $("#jqGrid").jqGrid('getGridParam','selrow');
																		var rowData = jQuery("#jqGrid").getRowData(rowId);
																		var count1 = jQuery("#jqGrid").jqGrid('getGridParam','records');
																		var itemName = rowData['itemName'];
																		var unit = rowData['size'];
																		var checkUnit = unit.toUpperCase(); 
																		var sizeFixed = rowData['sizeFixed'];
																		var rollSize = rowData['rollSize'];
																		var quantity = rowData['quantity'];
																		var subCatId = rowData['subCatId'];
																		var ids = jQuery("#jqGrid").jqGrid('getDataIDs');
																		var setZero = 0;
																		var totalQty = 0;
																		
																		for (var j = 0; j < count1; j++)
																		{
																			var rowId = ids[j];
																			var rowData = jQuery("#jqGrid").getRowData(rowId);
																			var quantity = rowData['quantity'];
																			totalQty = +totalQty + +quantity;
																			document.getElementById("totalQuantity").value = totalQty;
																		}
																	},

																	pager : "#jqGridPager",
																});

												var lastSelection;

												function editRow(id)
												{
													if (id && id !== lastSelection)
													{
														var grid = $("#jqGrid");
														grid.jqGrid('restoreRow',lastSelection);
														grid.jqGrid('editRow',id,
														{
															keys : true
														});
														lastSelection = id;
													}
												}

												if (count == 0 || count == null)
												{
													$("#jqGrid").addRowData(0, jsonData.offer);
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
																	errorTextFormat : function(data)
																	{
																		return 'Error: '+ data.responseText
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
																		var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
																		var AllRows = JSON.stringify(allRowsInGrid1);
																		
																		var ids = jQuery("#jqGrid").jqGrid('getDataIDs');																

																		var totalQty = 0;
																		
																		for (var j = 0; j < count; j++)
																		{
																			var quantity = allRowsInGrid1[j].quantity;
																			totalQty = +totalQty + +quantity;
																		}
																		
																		document.getElementById("totalQuantity").value = totalQty;
																		
																	},
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

function registerAdvanceBooking()
{
	var checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var checkValue = /^[0-9]+\.?[0-9]*$/;	
	
	var input = document.getElementById('supplierId'), 
	list = document .getElementById('supplierId_drop'), k, supplierId, supcode;
	for (k = 0; k < list.options.length; ++k)
	{
		if (list.options[k].value === input.value)
		{
			supplierId = list.options[k].getAttribute('data-value');
		}
	}
	
	if(supplierId == "" || supplierId == null || supplierId == undefined || supplierId == " ")
	{
		myAlert("Please Select a Valid Supplier Name");
		document.good.btnSubmit.disabled = false;
		return false;
	}
	
	var supplierEmailId = $("#supplierEmailId").val();
	
	if(supplierEmailId == "" || supplierEmailId == null || supplierEmailId == undefined || supplierEmailId == " ")
	{
		myAlert("Please Enter a Supplier Email Address");
		document.good.btnSubmit.disabled = false;
		return false;
	}
	else
	{
		if(supplierEmailId.match(checkEmail))
		{}
		else
		{
			myAlert("Please Enter a Valid Email Address");
			document.good.btnSubmit.disabled = false;
			return false;
		}
	}
	
	var sPWithoutTax = 0;
	
	var params = {};
	var count = jQuery("#jqGrid").jqGrid('getGridParam', 'records');
	var allRowsInGrid1 = $('#jqGrid').getGridParam('data');
	var AllSubRowsValue = JSON.stringify(allRowsInGrid1);
	
	if(count < 1)
	{
		myAlert("Please Select Product For Booking");
		document.good.btnSubmit.disabled = false;
		return false;
	}
	
	for (var i = 0; i < count; i++)
	{
		var color = allRowsInGrid1[i].color;
		params["color" + i] = color;

		var size = allRowsInGrid1[i].size;
		params["size" + i] = size;
		
		var sizeUp = size.toUpperCase(); 

		var itemName = allRowsInGrid1[i].itemName;
		params["itemName" + i] = itemName;
		
		var rollSize = allRowsInGrid1[i].rollSize;
		if (sizeUp == "METER" || sizeUp == "MTR")
		{
				if (rollSize == "0" || rollSize == "" || rollSize == null || rollSize == undefined)
				{
					myAlert("Please Enter RollSize for = "+itemName);
					document.good.btnSubmit.disabled = false;
					return false;
				}
				else if(+rollSize > 0)
				{
					if(rollSize.match(checkValue))
					{
						params["rollSize" + i] = rollSize;
					}
					else
					{
						myAlert("Please Enter Valid RollSize for => "+(i+1)+" "+itemName);
						document.good.btnSubmit.disabled = false;
						return false;
					}
				}
				else
				{
					params["rollSize" + i] = rollSize;
				}
			}
		else
		{
			params["rollSize" + i] = 0;
		}
		
		var quantity = allRowsInGrid1[i].quantity;
		if(quantity == "" || quantity == '0' || quantity == null || quantity == undefined)
		{
			myAlert("Please Enter Quantity for => "+(i+1)+" "+itemName);
			document.good.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			params["quantity" + i] = quantity;
		}

		var catName = allRowsInGrid1[i].catName;
		params["catName" + i] = catName;
				var purcode = allRowsInGrid1[i].purcode;
		params["purcode" + i] = purcode;
		
		var subCatId = allRowsInGrid1[i].subCatId;
		params["subCatId" + i] = subCatId;
		
		var productId = allRowsInGrid1[i].productId;
		params["productId" + i] = productId;
		
		var categoryId = allRowsInGrid1[i].categoryId;
		params["categoryId" + i] = categoryId;
		
		var style = allRowsInGrid1[i].style;
		params["style" + i] = style;
		
		var subCatName = allRowsInGrid1[i].subCatName;
		params["subCatName" + i] = subCatName;
		
		var shopId = allRowsInGrid1[i].fkShopId;
		params["shopId" + i] = shopId;
		
	}
	
	var supcode = $('#supplierId').val();
	var splitText = supcode.split(",");

	var supName = splitText[0];
	var supCode = splitText[1];
	var bookingNo = $("#bookingNo").val();
	
	params["count"] = count;
	params["bookingNo"] = bookingNo;
	params["supplierId"] = supplierId;
	params["supplierEmailId"] = supplierEmailId;
	params["supcode"] = supCode;
	params["methodName"] = "regAdvanceBooking";

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

function getSuppDetailsForAdvanceBooking()
{
	var input = document.getElementById('supplierId'), 
	list = document .getElementById('supplierId_drop'), k, supplierName, supcode;
	for (k = 0; k < list.options.length; ++k)
	{
		if (list.options[k].value === input.value)
		{
			supplierName = list.options[k].getAttribute('data-value');
		}
	}
	$("#supplierEmailId").append($("<input/>").attr("value","").text());
	
	if(supplierName == "" || supplierName == null || supplierName == undefined || supplierName == " ")
	{
		document.good.btnSubmit.disabled = false;
		return false;
	}
	
	var params= {};
	params["supplierName"]= supplierName;
	params["methodName"] = "getSupplier";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("supplierEmailId").value = v.email;
		});
	}).error(function(jqXHR, textStatus, errorThrown)
		{
			if(textStatus==="timeout") {
		}
		});
	
}


