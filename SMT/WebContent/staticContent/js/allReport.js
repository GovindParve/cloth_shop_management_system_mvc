var shopNameSD = "SHOPNAME";
var shopAddressSD = "Shop Address";
var shopContactNoSD = "Contact No";
var shopGstNoSD = "shop GST no";
var shopEmailSD = "Shop Email Id";


function myAlertCB(msg)
{
	var dialog = bootbox.dialog({
    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
    closeButton: false
   });

   setTimeout(function() {
	dialog.modal('hide');
   }, 1500);
}

//current stock report
function CurrentStock()
{
	var params = {};

	params["methodName"] = "getAllStock1";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data)
					{
						$('#currStock1').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document).ready(function()
								{
									// Setup - add a text input to each
									// footer cell
											$('#currStock1 thead th').each(
															function() {
																var title = $(
																		this)
																		.text();
																$(this)
																		.html(
																				'<label>'
																						+ title
																						+ '</label><input type="text" size=16 placeholder="Search '
																						+ title
																						+ '" />');
															});

											var total = $('#currStock1').DataTable({
												fnRowCallback : function(nRow, aData, iDisplayIndex)
												{		
													$("th:first", nRow).html(iDisplayIndex +1);
													return nRow;
												},
												  
														"columnDefs": [ {
													    "targets": 3,
													    "createdCell": function (td, cellData, rowData, row, col)
													    {
													      if(cellData < 10)
													      {
													    	$(td).css('color', 'red')
													        $(td).css('font-weight', '700')
													      }
													    }
													  } ],			
													
													 "footerCallback": function ( row, data, start, end, display ) {
												            var api = this.api(), data;
												            // Remove the formatting to get integer data for summation
												            var intVal = function ( i ) {
												                return typeof i === 'string' ?
												                    i.replace(/[\$,]/g, '')*1 :
												                    typeof i === 'number' ?
												                        i : 0;
												            };
														
														// Total over this page
												            pageTotal = api
												                .column( 2 )
												                .data()
												                .reduce( function (a, b) {
												                    return intVal(a) + intVal(b);
												                }, 0 );
												 
												         
												            // Update footer
												            $( api.column( 2 ).footer() ).html(
												            		 str = pageTotal.toFixed(2)
												            );
												            console.log( pageTotal);
												            
												         /*// Total over this page
												            pageTotal = api
												                .column( 4 )
												                .data()
												                .reduce( function (a, b, c) {
												                    return intVal(a) + intVal(b) + intVal(b);
												                }, 0 );
												 
												         
												            // Update footer
												            $( api.column( 4 ).footer() ).html(
												            		 str = pageTotal.toFixed(3)
												            );
												            console.log( pageTotal);
												            // Total over this page
												            pageTotal = api
												                .column( 5 )
												                .data()
												                .reduce( function (a, b) {
												                    return intVal(a) + intVal(b);
												                }, 0 );
												 
												         
												            // Update footer
												            $( api.column( 5 ).footer() ).html(
												            		 str = pageTotal.toFixed(2)
												            );
												            console.log( pageTotal);
															
															// Total over this page
												            pageTotal = api
												                .column( 6 )
												                .data()
												                .reduce( function (a, b) {
												                    return intVal(a) + intVal(b);
												                }, 0 );
												 
												         
												            // Update footer
												            $( api.column( 6 ).footer() ).html(
												            		 str = pageTotal.toFixed(2)
												            );
												            console.log( pageTotal);
															
															// Total over this page
												            pageTotal = api
												                .column( 7 )
												                .data()
												                .reduce( function (a, b) {
												                    return intVal(a) + intVal(b);
												                }, 0 );
												 
												         
												            // Update footer
												            $( api.column( 7 ).footer() ).html(
												            		 str = pageTotal.toFixed(2)
												            );
												            console.log( pageTotal);*/

												        },
										
																"sPaginationType" : "full_numbers",
																destroy : true,
																searching : true,
																
																"columnDefs" : [
																		{
																			"orderable" : false,
																			"targets" : '_all'
																		},
																		
																/*
																 * {
																 * "orderable":
																 * false,
																 * "targets": 1 }, {
																 * "orderable":
																 * false,
																 * "targets": 2 }, {
																 * "orderable":
																 * false,
																 * "targets": 3 }, {
																 * "orderable":
																 * false,
																 * "targets": 4 }, {
																 * "orderable":
																 * false,
																 * "targets": 5 },
																 */
																],																
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},*/
																		/*{
																			"data" : "size",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{
																			"data" : "color",
																			"width" : "5%",
																			"defaultContent" : ""
																		},*/
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalBuyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalSalePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},*/
																		
																		],
																		
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'copy'
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'excel'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ],
																		
																"scrollY": 300,
															    "scrollX": true,
																"scrollCollapse" : true,
																//"paging" : false,
															});

											$('#currStock1').css('display', '');
											total.columns.adjust().draw();

											total.columns().every(
															function() {
																var that = this;

																$(
																		'input',
																		this
																				.header())
																		.on(
																				'keyup change',
																				function() {
																					if (that
																							.search() !== this.value) {
																						that
																								.search(
																										this.value)
																								.draw();
																					}
																				});
															});
										});
						var mydata = catmap;
						$('#currStock1').dataTable().fnAddData(mydata);
					});
}

//Current Stock Barcode Number Wise
//getCurrentStockBarcodeNumberWise
function getCurrentStockBarcodeNumberWise()
{
	var params = {};

	params["methodName"] = "getCurrentStockBarcodeNumberWise";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data)
					{
						$('#currStock1').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document).ready(function()
								{
									// Setup - add a text input to each
									// footer cell
											$('#currStock1 thead th').each(
															function() {
																var title = $(
																		this)
																		.text();
																$(this)
																		.html(
																				'<label>'
																						+ title
																						+ '</label><input type="text" size=16 placeholder="Search '
																						+ title
																						+ '" />');
															});

											var total = $('#currStock1').DataTable({
												fnRowCallback : function(nRow, aData, iDisplayIndex)
												{		
													$("th:first", nRow).html(iDisplayIndex +1);
													return nRow;
												},
												  
														"columnDefs": [ {
													    "targets": 3,
													    "createdCell": function (td, cellData, rowData, row, col)
													    {
													      if(cellData < 10)
													      {
													    	$(td).css('color', 'red')
													        $(td).css('font-weight', '700')
													      }
													    }
													  } ],			
													
													 "footerCallback": function ( row, data, start, end, display ) {
												            var api = this.api(), data;
												            // Remove the formatting to get integer data for summation
												            var intVal = function ( i ) {
												                return typeof i === 'string' ?
												                    i.replace(/[\$,]/g, '')*1 :
												                    typeof i === 'number' ?
												                        i : 0;
												            };
														
														// Total over this page
												            pageTotal = api
												                .column( 3 )
												                .data()
												                .reduce( function (a, b) {
												                    return intVal(a) + intVal(b);
												                }, 0 );
												         
												            // Update footer
												            $( api.column( 3 ).footer() ).html(
												            		 str = pageTotal.toFixed(2)
												            );
												            console.log( pageTotal);
												            
												         /*// Total over this page
												            pageTotal = api
												                .column( 4 )
												                .data()
												                .reduce( function (a, b) {
												                    return intVal(a) + intVal(b);
												                }, 0 );
												 
												         
												            // Update footer
												            $( api.column( 4 ).footer() ).html(
												            		 str = pageTotal.toFixed(2)
												            );
												            console.log( pageTotal);*/
												            
															// Total over this page
												            pageTotal = api
												                .column( 5 )
												                .data()
												                .reduce( function (a, b) {
												                    return intVal(a) + intVal(b);
												                }, 0 );
												         
												            // Update footer
												            $( api.column( 5 ).footer() ).html(
												            		 str = pageTotal.toFixed(2)
												            );
												            console.log( pageTotal);
															
															/*// Total over this page
												            pageTotal = api
												                .column( 6 )
												                .data()
												                .reduce( function (a, b) {
												                    return intVal(a) + intVal(b);
												                }, 0 );
												 
												         
												            // Update footer
												            $( api.column( 6 ).footer() ).html(
												            		 str = pageTotal.toFixed(2)
												            );
												            console.log( pageTotal);*/
															
															// Total over this page
												            pageTotal = api
												                .column( 7 )
												                .data()
												                .reduce( function (a, b) {
												                    return intVal(a) + intVal(b);
												                }, 0 );
												         
												            // Update footer
												            $( api.column( 7 ).footer() ).html(
												            		 str = pageTotal.toFixed(2)
												            );
												            console.log( pageTotal);

												        },
										
																"sPaginationType" : "full_numbers",
																destroy : true,
																searching : true,
																
																"columnDefs" : [
																		{
																			"orderable" : false,
																			"targets" : '_all'
																		},
																		
																/*
																 * {
																 * "orderable":
																 * false,
																 * "targets": 1 }, {
																 * "orderable":
																 * false,
																 * "targets": 2 }, {
																 * "orderable":
																 * false,
																 * "targets": 3 }, {
																 * "orderable":
																 * false,
																 * "targets": 4 }, {
																 * "orderable":
																 * false,
																 * "targets": 5 },
																 */
																],																
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*{
																			"data" : "size",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{
																			"data" : "color",
																			"width" : "5%",
																			"defaultContent" : ""
																		},*/
																		{
																			"data" : "barcodeNumberWiseStockQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalBuyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalSalePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		],
																		
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'copy'
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'excel'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ],
																		
																"scrollY": 300,
															    "scrollX": true,
																"scrollCollapse" : true,
																//"paging" : false,
															});

											$('#currStock1').css('display', '');
											total.columns.adjust().draw();

											total.columns().every(
															function() {
																var that = this;

																$(
																		'input',
																		this
																				.header())
																		.on(
																				'keyup change',
																				function() {
																					if (that
																							.search() !== this.value) {
																						that
																								.search(
																										this.value)
																								.draw();
																					}
																				});
															});
										});
						var mydata = catmap;
						$('#currStock1').dataTable().fnAddData(mydata);
					});
}




function getTodayDate()
{	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	
	var yyyy = today.getFullYear();
	if (dd < 10) {
	  dd = '0' + dd;
	} 
	if (mm < 10) {
	  mm = '0' + mm;
	} 
	var today = dd + '-' + mm + '-' + yyyy;
	return today;
}


function advanceBookingrangeWise()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var aBFisDate = $("#aBFisDate").val();
	var aBEndDate = $("#aBEndDate").val();
	
	
	
	if(aBFisDate == null || aBFisDate == "" || aBFisDate == " " || aBFisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
	if(aBEndDate == null || aBEndDate == "" || aBEndDate == " " || aBEndDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}

	params["aBFisDate"] = aBFisDate;
	params["aBEndDate"] = aBEndDate;

	params["methodName"] = "advanceBookingRangeController";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#advanceBookingRangeWiseReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							alert("No data available for selected dates");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#advanceBookingRangeWiseReport')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(row, data,
																		start,
																		end,
																		display)
																		{
																			var api = this.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);																	
																},
																destroy : true,
																searching : true,
																"scrollY": 300,
															    "scrollX": true,
															    "bInfo" : false,
															    "bPaginate": false,														
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "bookingDateAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "bookingNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "productNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "sizeAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "colorAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSizeAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantityAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "purchaseBillNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		}
																	],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRand Wise Advance Booking Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRand Wise Advance Booking Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRand Wise Advance Booking Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRand Wise Advance Booking Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#advanceBookingRangeWiseReport').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

function advanceBookingSupplierAndRangeWise()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};

	var input = document.getElementById('supplierAB'), 
	list = document.getElementById('sup_dropAB'), i, supplierAB;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			supplierAB = list.options[i].getAttribute('data-value');
		}
	}
	
	var aBFisDateSuppWise = $("#aBFisDateSuppWise").val();
	var aBEndDateSuppWise = $("#aBEndDateSuppWise").val();
	
	if(supplierAB == null || supplierAB == undefined || supplierAB == "" || supplierAB == " ")
	{
		myAlertCB("Please Select Supplier");
		return false;
	}
	
	if(aBFisDateSuppWise == null || aBFisDateSuppWise == undefined || aBFisDateSuppWise == "" || aBFisDateSuppWise == " ")
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
	
	if(aBEndDateSuppWise == null || aBEndDateSuppWise == undefined || aBEndDateSuppWise == "" || aBEndDateSuppWise == " ")
	{
		myAlertCB("Please Select End Date");
		return false;
	}

	params["supplierAB"] = supplierAB;
	params["aBFisDateSuppWise"] = aBFisDateSuppWise;
	params["aBEndDateSuppWise"] = aBEndDateSuppWise;

	params["methodName"] = "advanceBookingSupplierAndRangeController";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#advanceBookigSuppAndRangeWise').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							alert("No data available for selected dates");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#advanceBookigSuppAndRangeWise')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);																	
																},

																destroy : true,
																searching : true,
																"scrollY": 300,
															    "scrollX": true,
															    "bInfo" : false,
															    "bPaginate": false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "bookingDateAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "bookingNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "productNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "sizeAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "colorAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSizeAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantityAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "purchaseBillNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		}
																	],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Advance Booking Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Advance Booking Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Advance Booking Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Advance Booking Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#advanceBookigSuppAndRangeWise').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}


function advanceBookingBookingNoWise()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	
	var bookingNoAB = $("#bookingNoAB").val();
	
	if(bookingNoAB == null || bookingNoAB == undefined || bookingNoAB == "" || bookingNoAB == " ")
	{
		myAlertCB("Please Enter Booking Number");
		return false;
	}

	params["bookingNoAB"] = bookingNoAB;

	params["methodName"] = "advanceBooking_BookingNoController";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#advanceBooking_BookingNoWise').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							alert("No data available for selected Booking No.");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#advanceBooking_BookingNoWise')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);																	
																},

																destroy : true,
																searching : true,
																"scrollY": 300,
															    "scrollX": true,
															    "bInfo" : false,
															    "bPaginate": false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "bookingDateAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "bookingNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "productNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "sizeAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "colorAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSizeAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantityAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierNameAB",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "purchaseBillNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		}
																	],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBooking No. Wise Advance Booking Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBooking No. Wise Advance Booking Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBooking No. Wise Advance Booking Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBooking No. Wise Advance Booking Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#advanceBooking_BookingNoWise').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

//For Current Stock
function currentStock()
{
	var params = {};

	params["methodName"] = "getAllCurrentStock";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {

		$('#currStock').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total = $('#currStock').DataTable({

				fnRowCallback : function(nRow, aData, iDisplayIndex) {
					$("th:first", nRow).html(iDisplayIndex + 1);
					return nRow;
				},

				destroy : true,
				searching : true,
				"scrollY": 300,
				"scrollX": true,
				/*"scrollCollapse" : true,*/
				//"paging" : false,
				"orderable" : true,				

				columns : [ {
					"data" : "barcode",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "catName",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "subCatName",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "itemName",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "size",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "rollSize",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "quantity",
					"width" : "5%",
					"defaultContent" : ""
				},
				/* {"data": "date", "width": "5%", "defaultContent": ""}, */
				],

				dom : 'Bfrtip',
				buttons : [
					{
						extend : 'copyHtml5',
						footer : true,
						title : function()
						{
							return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCurrent Stock Report";
						},
					},
					{
						extend : 'excelHtml5',
						footer : true,
						title : function()
						{
							return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCurrent Stock Report";
						},
					},
					{
						extend : 'csvHtml5',
						footer : true,
						title : function()
						{
							return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCurrent Stock Report";
						},
					},
					{
						extend : 'pdfHtml5',
						footer : true,
						title : function()
						{
							return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCurrent Stock Report";
						},
					orientation : 'landscape',
					pageSize : 'LEGAL',
					titleAttr : 'PDF'
				} ]
			});
		});
		var mydata = catmap;
		$('#currStock').dataTable().fnAddData(mydata);
	});
}
// for all report

function allWayReport()
{
	var params = {};

	params["methodName"] = "getAllStock";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data)
					{
						$('#currStock1').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document).ready(function()
								{
									// Setup - add a text input to each
									// footer cell
											$('#currStock1 thead th').each(
															function() {
																var title = $(
																		this)
																		.text();
																$(this)
																		.html(
																				'<label>'
																						+ title
																						+ '</label><input type="text" size=15 placeholder="Search '
																						+ title
																						+ '" />');
															});

											var total = $('#currStock1').DataTable(
															{	
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$("th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																
																"sPaginationType" : "full_numbers",
																destroy : true,
																searching : true,
																
																"columnDefs" : [
																		{
																			"orderable" : false,
																			"targets" : '_all'
																		},
																		
																/*
																 * {
																 * "orderable":
																 * false,
																 * "targets": 1 }, {
																 * "orderable":
																 * false,
																 * "targets": 2 }, {
																 * "orderable":
																 * false,
																 * "targets": 3 }, {
																 * "orderable":
																 * false,
																 * "targets": 4 }, {
																 * "orderable":
																 * false,
																 * "targets": 5 },
																 */
																],																
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "avQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : "",
																			"visible":false,
																		},
																		{
																			"data" : "qtyInMeter",
																			"width" : "5%",
																			"defaultContent" : "",
																			"visible":false,
																		},
																		{
																			"data" : "size",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "color",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																		
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'copy'
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'excel'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n "+shopAddressSD+" \n "+shopContactNoSD+" \n "+shopGstNoSD+" \n "+shopEmailSD+" \n\nALL WAY STOCK REPORT";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ],
																		
																/*"scrollY": 300,
															    "scrollX": true,*/
																/*"scrollCollapse" : true,*/
																//"paging" : false,
															});

											$('#currStock1').css('display', '');
											total.columns.adjust().draw();

											total.columns().every(
															function() {
																var that = this;

																$(
																		'input',
																		this
																				.header())
																		.on(
																				'keyup change',
																				function() {
																					if (that
																							.search() !== this.value) {
																						that
																								.search(
																										this.value)
																								.draw();
																					}
																				});
															});
										});
						var mydata = catmap;
						$('#currStock1').dataTable().fnAddData(mydata);
					});
}

// Category Wise Current Stock

function getCategoryWiseStock()
{
document.getElementById('exitLoad').style.display="block";
var supplier = $("#catId123").val();
	
	
	if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
	{
		myAlertCB("Please Select Category");
		return false;
	}
	var input = document.getElementById('catId123'), list = document
			.getElementById('catId_drop123'), i, catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');

		}
	}
	var params = {};
	params["methodName"] = "getCategoryWiseStock";
	params["catId"] = catId;

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#catWiseStock').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);

						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for Entered Barcode No.");
							return false;
						}
						
						$(document)
								.ready(
										function() {
											$('#catWiseStock')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																},
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#catWiseStock').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {s
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}
// Barcode Wise Current Stock
function barcodewisestock()
{
document.getElementById('exitload').style.display="block";
	var barcodeNo = $("#barcode10").val();
	var userType = $("#userType").val();
	var userName = $("#userName").val();

	if(barcodeNo == null || barcodeNo == "" || barcodeNo == " " || barcodeNo == undefined)
	{
		myAlertCB("Please Select Barcode No.");
		return false;
	}
	var params = {};
	params["barcodeNo"] = barcodeNo;
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "stockBarcodeWise";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data)
					{
						$('#barcodeWiseCurrentStock').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for Entered Barcode No.");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#barcodeWiseCurrentStock')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																},
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{"data":
																		"buyPrice",
																		"width":
																		"5%",
																		"defaultContent":
																		""},
																		 
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode Wise Stock";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode Wise Stock";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode Wise Stock";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode Wise Stock";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#barcodeWiseCurrentStock').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

// Single Date Sale
function singleDateSaleReport()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fisDate = $("#fDate1").val();
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	if(fisDate == null || fisDate == "" || fisDate == " " || fisDate == undefined)
	{
		myAlertCB("Please Select Date");
		return false;
	}
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	params["fisDate"] = fisDate;
	params["methodName"] = "singleDateSale";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleSingleDate').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected date");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#saleSingleDate')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																},
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{	"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grBuyPriceExTax",
																			"width" : "5%",
																			"defaultContent" : "",
																			"visible":false,
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "afterDisTaxAmt", 
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "grossamt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */
																],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Sale Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Sale Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Sale Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#saleSingleDate').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

// Two Date Sale
function twoDateSaleReport()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();
	if(fisDate == null || fisDate == "" || fisDate == " " || fisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(endDate == null || endDate == "" || endDate == " " || endDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}

	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val(); 

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;

	params["fisDate"] = fisDate;
	params["endDate"] = endDate;

	params["methodName"] = "getSaleDetailsBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data)
					{	
						$('#saleTwoDate').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#saleTwoDate')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	//console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	//console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	//console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	//console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	//console.log(pageTotal);

																	// Total
																	// over this
																	// page
															/*			
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
														*/
																	//console.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																
																	pageTotal = api
																			.column(12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	
																	
																	//console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	//console.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	//console.log(pageTotal);

																},
																"paging": false,
																destroy : true,
																searching : true,
																"scrollY": 300,
														        "scrollX": true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grBuyPriceExTax",
																			"width" : "5%",
																			"defaultContent" : "",
																			"visible":false,
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data":"perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{
																			"data": "afterDisTaxAmt",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Sale Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Sale Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Sale Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						
						
						var mydata = catmap;
						$('#saleTwoDate').dataTable().fnAddData(mydata);
						
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

// Two Date And Bill NO
function twoDateAndBillNo()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fisDate = $("#startDate1").val();
	var endDate = $("#lastDate1").val();
	
	if(fisDate == null || fisDate == "" || fisDate == " " || fisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(endDate == null || endDate == "" || endDate == " " || endDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}

	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val(); 

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["fisDate"] = fisDate;
	params["endDate"] = endDate;

	params["methodName"] = "getSaleDetailsBetweenTwoDatesBillNo";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleTwoDateBillNo').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#saleTwoDateBillNo')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																},
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "CustomerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossamt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
											
											
											
											var table = $('#saleTwoDateBillNo').DataTable();
											/*		
													$('#saleTwoDateBillNo tbody').on( 'click', 'tr', function ()
													{
													    console.log( table.row( this ).data() );	
													    var arr=$('#saleTwoDateBillNo').dataTable().fnGetData($(this)); 
													    var rowData = table.row( this ).data();
													    var id = table.column( this ).id();
													    
													    alert( 'Clicked row id '+id );
													    //alert( 'Clicked on cell in visible column: '+table.cell( this ).index().columnVisible );
													    //alert("rowData.billNo ::::: "+ rowData.billNo+"\nrowData.itemName ::::: "+ rowData.itemName);
													});
												*/													
													
													$('#saleTwoDateBillNo tbody').on( 'click', 'td', function ()
													{
													    console.log( table.cell( this ).data() );
													    var arr=$('#saleTwoDateBillNo').dataTable().fnGetData($(this)); 
													    //alert( table.cell( this ).data() );						    
													    var rowCell =  table.cell( this ).data();
													    
													    var columnName = $('#saleTwoDateBillNo thead tr th').eq($(this).index()).html().trim();
													    var rowData = table.row( this ).data();
													    
													    $('#saleTwoDateBillNo tbody').on( 'click', 'button', function () {
													        var data = table.row( $(this).parents('tr') ).data();
													        alert( data[0] +"'s salary is: "+ data[ 5 ] );
													    } );
													       
												    	var billNo = rowData.billNo;
												    	billSaleWiseForPopUpReport(billNo);
													    
													    /*if(columnName == 'Bill No')
													    {     
													    	var billNo = rowData.billNo;
													    	billSaleWiseForPopUpReport(billNo);													    	
													    }
													    else
													    {}*/
													    
													    //mypopup("popUp_s_supplier_detail.jsp");	
													});						
											/*		
													$('#saleTwoDateBillNo tbody').on( 'click', 'td', function ()
													{
													   /*
													       alert('1 Data:'+$(this).html().trim());
													       alert('2 Clicked on cell in visible column: '+table.cell( this ).index().columnVisible );
													       alert('3 Row:'+$(this).parent().find('td').html().trim());
													       alert('4 Column:'+$('#saleTwoDateBillNo thead tr th').eq($(this).index()).html().trim());
													  /*  
													});
													
											*/		
										});
						var mydata = catmap;
						$('#saleTwoDateBillNo').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}


//billSaleWiseForPopUpReport Wise Sale
function billSaleWiseForPopUpReport(billNo)
{
	var params = {};

	/*
	
		var input = document.getElementById('catId'), list = document
				.getElementById('catId_drop'), i, catId;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				catId = list.options[i].getAttribute('data-value');
	
			}
		}
	
	*/

	var billNo = billNo;
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	params["billNo"] = billNo;
	
	params["methodName"] = "billSaleWiseForPopUpReportController";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data)
					{
						$('#saleBillWise').dataTable().fnClearTable();
						$( "#popUpReport" ).dialog({height: 480, width:1200});
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#saleBillWise')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};																

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 7 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 7
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 */

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 */

																	// Total
																	// over this
																	// page
/*																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
*/																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(13).data().reduce(
																					function(a,b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console.log(pageTotal);
																	
																},

																destroy : true,
																searching : true,
																"scrollY": 300,
															    "scrollX": 800,
															    "bInfo" : false,
															    "bPaginate": false,
															    
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : "",
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : "",
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grBuyPriceExTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data": "perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "afterDisTaxAmt",
																		    "width": "5%",
																		    "defaultContent": ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		]
															});
										});
						
						var mydata = catmap;
						$('#saleBillWise').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});	
}


// gst retun report for sale

function gstReturn()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fisDate = $("#startDategst").val();
	var endDate = $("#lastDategst").val();
	if(fisDate == null || fisDate == "" || fisDate == " " || fisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(endDate == null || endDate == "" || endDate == " " || endDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}



	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val(); 

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["fisDate"] = fisDate;
	params["endDate"] = endDate;

	params["methodName"] = "gstReturn";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#twoDateGstReturn').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#twoDateGstReturn')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 2
																	pageTotal = api
																			.column(
																					1)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							1)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 3
																	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																},
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "gstpersent",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "tValue",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "sgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#twoDateGstReturn').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});

}

// gst return report for purchase

function purchasegstReturn()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fisDate = $("#startDatepgst").val();
	var endDate = $("#lastDatepgst").val();
	if(fisDate == null || fisDate == "" || fisDate == " " || fisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(endDate == null || endDate == "" || endDate == " " || endDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}
	params["fisDate"] = fisDate;
	params["endDate"] = endDate;

	params["methodName"] = "purchasegstReturn";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#twoDateGstReturnPurchase').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#twoDateGstReturnPurchase')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 3
																	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 6
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 7
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "gstpersent",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "tValue",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "sgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalIgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nGST Return Report of Purchase";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nGST Return Report of Purchase";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nGST Return Report of Purchase";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nGST Return Report of Purchase";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#twoDateGstReturnPurchase').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});

}

// Two Date wise and user wise report
function twoDate_UserSaleReport()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fisDate = $("#startDate").val();
	var endDate = $("#lastDate").val();
	var utypes = $("#utype").val();	
	var userType = $("#userType").val();
	var userName = $("#userName").val();
	var userName1 = $("#userName123").val();
	if(utypes == null || utypes == "" || utypes == " " || utypes == undefined)
	{
		myAlertCB("Please Select User Type");
		return false;
	}
	
	if(userName1 == null || userName1 == "" || userName1 == " " || userName1 == undefined)
	{
		myAlertCB("Please Select User Name");
		return false;
	}
	
	if(fisDate == null || fisDate == "" || fisDate == " " || fisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(endDate == null || endDate == "" || endDate == " " || endDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}

	
	

	$("#userName123 option:selected").each(function() {
		selectedVal = $(this).text();
	});

	var splitText = selectedVal.split(",");

	var name = splitText[0];
	var id = splitText[1];

	params["fisDate"] = fisDate;
	params["endDate"] = endDate;
	params["userId"] = id;
	params["utypes"] = utypes;
	
	params["userType"] = userType;
	params["userName"] = userName;

	params["methodName"] = "getSaleDetailsBetweenTwoDates_users";

			$.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleTwoDate_userWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#saleTwoDate_userWise')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	// over this
																	// page
																	pageTotal = api.column(12).data().reduce(
																		function(a,b)
																		{
																			return intVal(a) + intVal(b);
																		},
																		0);

																	// Update
																	// footer
																	$(api.column(12).footer()).html(str = pageTotal.toFixed(2));
																	console.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(13).data().reduce(
																					function(a,b)
																					{
																						return intVal(a) + intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "afterDisTaxAmt",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																/*
																 * "scrollY":
																 * "400px",
																 * "scrollCollapse":
																 * true,
																 * "paging":
																 * false,
																 */
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nUser Wise Sale Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nUser Wise Sale Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nUser Wise Sale Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nUser Wise Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#saleTwoDate_userWise').dataTable()
								.fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

// Category Wise Sale
function categorySaleWise()
{
    document.getElementById('exitLoad').style.display = "block"; 
	var params = {};

	var input = document.getElementById('catId'), list = document
			.getElementById('catId_drop'), i, catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');
		}
	}

	var userTypeRole = $("#userType").val();
	
	var userName = $("#userName").val();
	var catFirstDate = $("#catFirstDate").val();
	var catEndDate = $("#catEndDate").val();
	
	if(catId == null || catId == "" || catId == " " || catId == undefined)
	{
		myAlertCB("Please Select Category");
		return false;
	}
	
	if(catFirstDate == null || catFirstDate == "" || catFirstDate == " " || catFirstDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
	
	if(catEndDate == null || catEndDate == "" || catEndDate == " " || catEndDate == undefined)
	{
		myAlertCB("Please Select End Date");
		return false;
	}

	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	params["catId"] = catId;
	params["catFirstDate"] = catFirstDate;
	params["catEndDate"] = catEndDate;
	params["methodName"] = "CategoryWiseSaleReport";
	
	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleCategoryWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#saleCategoryWise')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};																

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 7 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 7
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 */

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 */

																	// Total
																	// over this
																	// page
/*																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
*/																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(13).data().reduce(
																					function(a,b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console.log(pageTotal);
																	
																},
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																////"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : "",
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : "",
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grBuyPriceExTax",
																			"width" : "5%",
																			"defaultContent" : "",
																			"visible":false,
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data": "perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "afterDisTaxAmt",
																		    "width": "5%",
																		    "defaultContent": ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Category Wise Sale Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Category Wise Sale Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Category Wise Sale Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Category Wise Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		]
															});
										});
						
						var mydata = catmap;
						$('#saleCategoryWise').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});	
}


function mypopup(url)
{
    /* width = window.screen.width;
    height = window.screen.height; */
    width ='1050px';
    height = '600px';
    mywindow = window.open(url, "Title",
        "location=0,status=1,scrollbars=1,resizable=1,menubar=0,toolbar=no,width="
                    + width + ",height=" + height);
    mywindow.moveTo(140, 50);
    mywindow.focus();
}


/********************   PRODUCT WISE SALE REPORT   ***********************/

function productSaleWise()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
var supplier = $("#productIdTinv").val();
	
	
	if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
	{
		myAlertCB("Please Select Product Name");
		return false;
	}

	var input = document.getElementById('productIdTinv'), list = document
			.getElementById('productId_dropTinv'), i, productId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			productId = list.options[i].getAttribute('data-value');

		}
	}

	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	params["productId"] = productId;
	params["methodName"] = "productWiseSaleReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleProductWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No Data Available For Selected Dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#saleProductWise')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};																

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grBuyPriceExTax",
																			"width" : "5%",
																			"defaultContent" : "",
																			"visible":false,
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{
																			"data":"perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{
																			"data": "afterDisTaxAmt",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nProduct Wise Sale Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nProduct Wise Sale Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nProduct Wise Sale Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nProduct Wise Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#saleProductWise').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}


// Single Date Customer Sale Report
function vehicleSingleDate() {

	var params = {};
	var fDate = $("#vsDate").val();
	params["fDate"] = fDate;
	params["methodName"] = "vehicleSingleDate";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#vehicleSingleDateReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#vehicleSingleDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);
																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "carNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ownerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Single Date Customer Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#vehicleSingleDateReport').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

// Between Two Date Customer Sale Report
function vehicleTwoDate() {

	var params = {};
	var fDate = $("#fisDate4").val();
	var eDate = $("#endDate4").val();

	params["fDate"] = fDate;
	params["eDate"] = eDate;

	params["methodName"] = "vehicleTwoDate";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#vehicleTwoDateReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#vehicleTwoDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "carNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ownerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Double Date Customer Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#vehicleTwoDateReport').dataTable()
								.fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Category Wise Customer Sale Report
function categorySaleWiseCustomer() {

	var input = document.getElementById('catId12'), list = document
			.getElementById('catId_drop12'), i, catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["catId"] = catId;
	params["methodName"] = "categorySaleWiseCustomer";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#categorySaleWiseCustomerReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#categorySaleWiseCustomerReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "carNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ownerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Customer Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#categorySaleWiseCustomerReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Bill No Wise Customer Sale Report
function billnowiseVehiclesell() {

	var input = document.getElementById('BillNocust'), list = document
			.getElementById('seedBillNocust'), i, BillNocust;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			BillNocust = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["BillNocust"] = BillNocust;
	params["methodName"] = "billnowiseVehiclesell";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#billnowiseVehicle').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#billnowiseVehicle')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "carNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ownerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Bill No Wise Customer Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#billnowiseVehicle').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Barcode No Wise Customer Sale Report
function barcodenowiseVehiclesell() {

	var barcodeVehicle = $("#barcodeVehicle").val();
	var params = {};
	params["barcodeVehicle"] = barcodeVehicle;
	params["methodName"] = "barcodewiseVehicleSale";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#barcodewiseVehicle').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#barcodewiseVehicle')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "carNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ownerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Barcode No Wise Customer Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]

															});
										});

						var mydata = catmap;
						$('#barcodewiseVehicle').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Single Date Miscellaneos Sale Report
function miscellaneousSingleDate()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fDate = $("#msDate").val();

	if(fDate == null || fDate == "" || fDate == " " || fDate == undefined)
	{
		myAlertCB("Please Select Date");
		return false;
	}
	params["fDate"] = fDate;

	params["methodName"] = "miscellaneousSingleDate";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#miscellaneousSingleDateReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected date");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#miscellaneousSingleDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Sale Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#miscellaneousSingleDateReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Credit Sale Return Sale Report

function CSRSingleDate()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fDate = $("#crdDate").val();
	if(fDate == null || fDate == "" || fDate == " " || fDate == undefined)
	{
		myAlertCB("Please Select Date");
		return false;
	}

	params["fDate"] = fDate;

	params["methodName"] = "CSRSingleDate";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#CSR1SingleDateReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#CSR1SingleDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 11 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 11
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 12 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 12
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDateWise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDateWise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDateWise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDateWise Credit Customer Sale Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#CSR1SingleDateReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Two Date Miscellaneos Sale Report
function miscellaneousTwoDate()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fDate = $("#msfisDate").val();
	var eDate = $("#msendDate").val();
	if(fDate == null || fDate == "" || fDate == " " || fDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(eDate == null || eDate == "" || eDate == " " || eDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}

	params["fDate"] = fDate;
	params["eDate"] = eDate;

	params["methodName"] = "miscellaneousTwoDate";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#miscellaneousTwoDateReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#miscellaneousTwoDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Sale Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#miscellaneousTwoDateReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// credit customer Two Date sale return Report

function CSRTwoDate()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fDate = $("#csrfisDate").val();
	var eDate = $("#csrendDate").val();
	
	if(fDate == null || fDate == "" || fDate == " " || fDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(eDate == null || eDate == "" || eDate == " " || eDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}

	params["fDate"] = fDate;
	params["eDate"] = eDate;

	params["methodName"] = "CCSRTwoDate";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#CSR2TwoDateReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#CSR2TwoDateReport')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$("th:first", nRow).html(iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display)
																		{
																			var api = this.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(5)
																			.data()
																			.reduce(function(a,b)
																					{
																						return intVal(a) + intVal(b);
																					},
																		0);

																	// Update
																	// footer
																	$(api.column(5).footer()).html(parseFloat(pageTotal).toFixed(2)
																			);
																	console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api.column(6).data().reduce(
																					function(a,b)
																					{
																						return intVal(a) + intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(6).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api.column(7).data().reduce(
																					function(a,b)
																					{
																						return intVal(a) + intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(7).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api.column(8).data().reduce(function(a,b)
																	{
																		return intVal(a) + intVal(b);
																	},0);

																	// Update
																	// footer
																	$(api.column(8).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(9).data().reduce(function(a,b)
																	{
																		return intVal(a) + intVal(b);
																	},0);

																	// Update
																	// footer
																	$(api.column(9).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(10).data().reduce(function(a,b)
																	{
																		return intVal(a) + intVal(b);
																	},0);

																	// Update
																	// footer
																	$(api.column(10).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);
																	
																	},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "gst",
																			"width": "5%",
																			"defaultContent": ""
																		},
																		{
																			"data": "spWithoutTax",
																			"width": "5%",
																			"defaultContent": "",
																			//"class":"hidden"
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "taxAmount",
																			"width": "5%",
																			"defaultContent": ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																	],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Credit Customer Sale Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#CSR2TwoDateReport').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Category Wise Miscellaneos Sale Report
function miscellaneousSaleWiseCustomer()
{
document.getelementById('exitLoad').style.display="block";
var supplier = $("#mscatId").val();
	
	
	if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
	{
		myAlertCB("Please Select Category");
		return false;
	}


	
	var input = document.getElementById('mscatId'), list = document
			.getElementById('mscatId_drop'), i, mscatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			mscatId = list.options[i].getAttribute('data-value');
		}
	}
	
	var params = {};
	params["mscatId"] = mscatId;
	params["methodName"] = "miscellaneousSaleWiseCustomer";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#miscellaneousSaleWiseCustomerReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$(
													'#miscellaneousSaleWiseCustomerReport')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Sale Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#miscellaneousSaleWiseCustomerReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Category Wise credit customer Sale return Report
function CSRSaleWiseCustomer()
{
document.getElementById('exitLoad').style.display="block";
var supplier = $("#csrcatId").val();
	
	
	if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
	{
		myAlertCB("Please Select Category");
		return false;
	}
	var input = document.getElementById('csrcatId'), list = document
			.getElementById('csrcatId_drop'), i, csrcatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			csrcatId = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["mscatId"] = csrcatId;
	params["methodName"] = "CCSRSaleWiseCustomer";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#CSR3SaleWiseCustomerReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected Category");
							return false;
						}

						$(document).ready(
										function() {
											$('#CSR3SaleWiseCustomerReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 11 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 11
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 12 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 12
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Credit Customer Sale Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#CSR3SaleWiseCustomerReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Bill No Wise Miscellaneos Sale Report
function billnowiseMiscellaneoussell()
{
document.getElementById('exitLoad').style.display="block";
	var billNo = $("#msBillNocust").val();
	if(billNo == null || billNo == "" || billNo == " " || billNo == undefined)
	{
		myAlertCB("Please Select Bill No.");
		return false;
	}
	var input = document.getElementById('msBillNocust'), list = document
			.getElementById('msBillNocust_id'), i, msBillNocust;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			msBillNocust = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["msBillNocust"] = msBillNocust;
	params["methodName"] = "billnowiseMiscellaneoussell";

	$.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#billnowiseMiscellaneous').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected bill no.");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#billnowiseMiscellaneous')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Sale Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]

															});
										});

						var mydata = catmap;
						$('#billnowiseMiscellaneous').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Bill No Wise Credit customer Sale return Report
function billnowiseCCSR()
{
document.getElementById('exitlLoad').style.display="block";
	var billNo = $("#csrBillNocust").val();
	if(billNo == null || billNo == "" || billNo == " " || billNo == undefined)
	{
		myAlertCB("Please Select Bill No.");
		return false;
	}
	var input = document.getElementById('csrBillNocust'), list = document
			.getElementById('csrBillNocust_id'), i, csrBillNocust;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			csrBillNocust = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["msBillNocust"] = csrBillNocust;
	params["methodName"] = "billnowiseCCSR";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#billnowiseCCSR').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected Bill No.");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#billnowiseCCSR')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 11 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 11
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 12 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 12
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "CustomerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Credit Customer Sale Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]

															});
										});

						var mydata = catmap;
						$('#billnowiseCCSR').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Barcode No Wise Miscellaneos Sale Report
function barcodenowiseMiscellaneoussell()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var barcodeMiscellaneous = $("#barcodeMiscellaneous").val();
	if(barcodeMiscellaneous == null || barcodeMiscellaneous == "" || barcodeMiscellaneous == " " || barcodeMiscellaneous == undefined)
	{
		myAlertCB("Please Enter BarCode No.");
		return false;
	}

	params["barcodeMiscellaneous"] = barcodeMiscellaneous;

	params["methodName"] = "barcodenowiseMiscellaneoussell";

	$.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#barcodewiseMiscellaneous').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for Entered Barcode No.");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#barcodewiseMiscellaneous')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise Sale Return Report";																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise Sale Return Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise Sale Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#barcodewiseMiscellaneous').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Barcode No Wise Credit customer Sale Return Report
function barcodenowiseCSR()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var barcodeMiscellaneous = $("#barcodecsr").val();
	
	if(barcodeMiscellaneous == null || barcodeMiscellaneous == "" || barcodeMiscellaneous == " " || barcodeMiscellaneous == undefined)
	{
		myAlertCB("Please Enter Barcode No");
		return false;
	}

	params["barcodeMiscellaneous"] = barcodeMiscellaneous;

	params["methodName"] = "barcodenowiseCCSR";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#barcodewiseCCSR').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for Entered Barcode No.");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#barcodewiseCCSR')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 11 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 11
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 12 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 12
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No. Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No. Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No. Wise Credit Customer Sale Return Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No. Wise Credit Customer Sale Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]

															});
										});

						var mydata = catmap;
						$('#barcodewiseCCSR').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Single Date Credit Sale Report
function creditSingleDate()
{
document.getElementById("exitLoad").style.display="block";
	var params = {};
	var fDate = $("#csDate").val();
	

	
	
	if(fDate == null || fDate == "" || fDate == " " || fDate == undefined)
	{
		myAlertCB("Please Select Date");
		return false;
	}

	params["fDate"] = fDate;

	params["methodName"] = "creditSingleDate";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#creditSingleDateReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected date");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#creditSingleDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */
																/*
																 * {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n"+shopAddressSD+" \n"+shopContactNoSD+" \n"+shopGstNoSD+" \n"+shopEmailSD+" \n\n Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n"+shopAddressSD+" \n"+shopContactNoSD+" \n"+shopGstNoSD+" \n"+shopEmailSD+" \n\n Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n"+shopAddressSD+" \n"+shopContactNoSD+" \n"+shopGstNoSD+" \n"+shopEmailSD+" \n\n Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n"+shopAddressSD+" \n"+shopContactNoSD+" \n"+shopGstNoSD+" \n"+shopEmailSD+" \n\n Credit Customer Sale Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#creditSingleDateReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Two Date Credit Sale Report
function creditTwoDate()
{
display.getElementById("exitLoad").style.display="block";
	var params = {};
	var fDate = $("#csfisDate").val();
	var eDate = $("#csendDate").val();
	if(fDate == null || fDate == "" || fDate == " " || fDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
	if(eDate == null || eDate == "" || eDate == " " || eDate == undefined)
	{
		myAlertCB("Please Select End Date");
		return false;
	}
	
	params["fDate"] = fDate;
	params["eDate"] = eDate;

	params["methodName"] = "creditTwoDate";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#creditTwoDateReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#creditTwoDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);


																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n"+shopAddressSD+" \n"+shopContactNoSD+" \n"+shopGstNoSD+" \n"+shopEmailSD+" \n\nRange Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n"+shopAddressSD+" \n"+shopContactNoSD+" \n"+shopGstNoSD+" \n"+shopEmailSD+" \n\nRange Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n"+shopAddressSD+" \n"+shopContactNoSD+" \n"+shopGstNoSD+" \n"+shopEmailSD+" \n\nRange Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+" \n"+shopAddressSD+" \n"+shopContactNoSD+" \n"+shopGstNoSD+" \n"+shopEmailSD+" \n\nRange Wise Credit Customer Sale Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#creditTwoDateReport').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Category Wise Credit Sale Report
function creditSaleWiseCustomer()
{
document.getElementById('exitLoad').style.display="block";
var supplier = $("#cscatId").val();
	
	
	if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
	{
		myAlertCB("Please Select Category");
		return false;
	}


	
	
	var input = document.getElementById('cscatId'), list = document
			.getElementById('cscatId_drop'), i, cscatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			cscatId = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["cscatId"] = cscatId;

	params["methodName"] = "creditSaleWiseCustomer";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#creditSaleWiseCustomerReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#creditSaleWiseCustomerReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(10).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);


																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nCategory Wise Credit Customer Sale Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#creditSaleWiseCustomerReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}








//PRODUCT Wise Credit Sale Report
function prtoductWiserCreditCustomerSaleReport()
{
document.getElementById('exitLoad').style.display="block";
var supplier = $("#csproductId").val();
	
	
	if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
	{
		myAlertCB("Please Select Product Name");
		return false;
	}

	
	var input = document.getElementById('csproductId'), list = document.getElementById('csproductId_drop'), i, cscatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			csProductId = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["csProductId"] = csProductId;

	params["methodName"] = "creditProductWiseSaleController";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#creditSaleProductWiseReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document).ready(function()
						{ 
							$('#creditSaleProductWiseReport').DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);


																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nProduct Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nProduct Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nProduct Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nProduct Wise Credit Customer Sale Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#creditSaleProductWiseReport').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}


















// Bill No Wise Credit Sale Report
function billnowiseCreditsell()
{
document.getElementById('exitLoad').style.display="block";
	var billNo = $("#csBillNocust").val();
	if(billNo == null || billNo == "" || billNo == " " || billNo == undefined)
	{
		myAlertCB("Please Select Bill No.");
		return false;
	}
	
	var input = document.getElementById('csBillNocust'), list = document
			.getElementById('csBillNocust_id'), i, csBillNocust;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			csBillNocust = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["csBillNocust"] = csBillNocust;

	params["methodName"] = "billnowiseCreditsell";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#billnowiseCredit').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#billnowiseCredit')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Credit Customer Sale Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#billnowiseCredit').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});

}

// Barcode No Wise Credit Sale Report
function barcodenowiseCredit()
{
document.getElementById('exitLoad').style.display="block";
	var barcodeCredit = $("#barcodeCredit").val();
	
	
	if(barcodeCredit == null || barcodeCredit == "" || barcodeCredit == " " || barcodeCredit == undefined)
	{
		myAlertCB("Please Select BarCode No.");
		return false;
	}

	var params = {};
	params["barcodeCredit"] = barcodeCredit;

	params["methodName"] = "barcodenowiseCredit";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#barcodewiseCredit').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#barcodewiseCredit')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise Credit Customer Sale Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise Credit Customer Sale Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#barcodewiseCredit').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Purchase Report Supplier Wise
function supplierAllPurchase()
{
document.getElementById('exitLoad').style.display="block";
	var supplier = $("#supplier7").val();
		
		
		if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
		{
			myAlertCB("Please Select Supplier Name");
			return false;
		}
	var input = document.getElementById('supplier7'), list = document
			.getElementById('sup_drop7'), i, supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["supplier"] = supplier;

	params["methodName"] = "supplierAllPurchase";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#supplierNameWiseTable1').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#supplierNameWiseTable1').DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	
																	//COLUMN TOTAL 

																	pageTotal = api
																			.column(18)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);
																	// Update
																	// footer
																	$(
																			api
																					.column(18)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	
																	
																	//COLUMN TOTAL
																	pageTotal = api
																	.column(20)
																	.data()
																	.reduce(
																			function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);
															// Update
															// footer
															$(
																	api
																			.column(20)
																			.footer())
																	.html(

																			parseFloat(
																					pageTotal)
																					.toFixed(
																							2)
																	);
																	console
																			.log(pageTotal);
																					 
																	//COLUMN TOTAL
																	pageTotal = api
																	.column(23)
																	.data()
																	.reduce(
																			function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);
															// Update
															// footer
															$(
																	api
																			.column(23)
																			.footer())
																	.html(

																			parseFloat(
																					pageTotal)
																					.toFixed(2));
															console.log(pageTotal);
															
																	 },

																	 destroy : true,
																		searching : true,
																		"scrollY": 300,
																		"scrollX": true,
																		/*"scrollCollapse" : true,*/
																		//"paging" : false,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "style",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "soldQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "availableQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "rollSize",
																			"width": "5%",
																			"defaultContent": "",
																			"visible":false, 
																		},
																		{
																			"data": "QuantityMeter",
																			"width": "5%",
																			"defaultContent": "",
																			"visible":false,
																		},																		 
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "Discount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "extraDiscount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "expence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nSupplier Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#supplierNameWiseTable1').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

function getAllBills() {
	var input = document.getElementById('supplier'), list = document
			.getElementById('sup_drop'), i, supplier;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}

	var supplier = supplier;
	$("#billNo").empty();
	$("#billNo").append(
			$("<option></option>").attr("value", "").text("Select bill"));

	var params = {};
	params["supplier"] = supplier;
	params["methodName"] = "getAllBillBySuppliers";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v) {
			$("#billNo").append(
					$("<option></option>").attr("value", i).text(v.billNo));
		});
	})
}

// get all user name on user type
// USED FOR 2 REPORTS 
function getAlluser()
{
	var utype = $("#utype").val();
	
	$("#userName123").empty();
	$("#userName123").append($("<option></option>").attr("value", "").text("Select User Name"));
	
	var params = {};
	params["utype"] = utype;
	params["methodName"] = "getAllUserName";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v)
		{
			$("#userName123").append($("<option></option>").attr("value", i).text(v.userName + "," + v.pkUserId));
		});
	})
}

// Purchase Report Supplier Bill No Wise
function supplierBillWisePurchaseReport()
{
document.getElementById('exitLoad').style.display="block";
var supplier = $("#supplier").val();
	
	
	if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
	{
		myAlertCB("Please Select Supplier Name");
		return false;
	}
	
	var billNo = $("#billNo").val();
	if(billNo == null || billNo == "" || billNo == " " || billNo == undefined)
	{
		myAlertCB("Please Select Bill No.");
		return false;
	}
	var input = document.getElementById('supplier'), list = document
			.getElementById('sup_drop'), i, supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["supplier"] = supplier;
	params["billNo"] = billNo;

	params["methodName"] = "supplierBillWisePurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#supplierBillWiseData').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected bill No.");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#supplierBillWiseData')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	
																	// Total
																	// over this
																	// page
																	
																	pageTotal = api
																	.column(17)
																	.data()
																	.reduce(function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);

															// Update
															// footer
															$(api.column(17).footer())
																	.html(
																			parseFloat(
																					pageTotal)
																					.toFixed(
																							2)

																	);
															console.log(pageTotal);


																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(20)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(20)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					22)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							22)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "soldQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"visible":false,
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"visible":false,
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "extraDiscount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "expence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "txPerexpence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "finalExpenses",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBill No Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#supplierBillWiseData').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}







/********************************  VOUCHER NUMBER WISE PURCHASE REPORT **********************/


function VoucherNoWisePurchaseReport()
{
document.getElementById('exitLoad').style.display="block";
var supplier = $("#voucherDrop").val();
	
	
	if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
	{
		myAlertCB("Please Select voucher No");
		return false;
	}
	var input = document.getElementById('voucherDrop'), list = document
			.getElementById('voucherNo_drop'), i, voucherNo;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			voucherNo = list.options[i].getAttribute('data-value');

		}
	}
	var params = {};
	params["voucherNo"] = voucherNo;

	params["methodName"] = "voucherNoWisePurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#voucherNoWiseData').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							alert("No data available for selected Voucher No.");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#voucherNoWiseData')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(16)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(16).footer())
																			.html(parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console.log(pageTotal);
																	
																	pageTotal = api
																			.column(
																					19)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(19).footer())
																			.html(parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(21).data().reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(21).footer()).html(parseFloat(pageTotal).toFixed(2)
																			);
																	console.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : "",
																			"hidden" : "true",
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "soldQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"visible":false,
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"visible":false,
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nVoucher No Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nVoucher No Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nVoucher No Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nVoucher No Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#voucherNoWiseData').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Purchase Report Category Wise
function categoryWisePurchaseReport()
{
document.getElementById('exitLoad').style.display="block";
var supplier = $("#catId45").val();
	
	
	if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
	{
		myAlertCB("Please Select Category");
		return false;
	}
	var input = document.getElementById('catId45'), list = document
			.getElementById('catId_drop45'), i, catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');
		}
	}

	var params = {};
	params["catId"] = catId;

	params["methodName"] = "categoryWisePurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#supplierCategoryWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected Category");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#supplierCategoryWise')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					17)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							17)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					19)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							19)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					21)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							21)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "soldQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : "",
																			//"visible":false,
																			//hidden:true
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"defaultContent" : ""
																			//"visible":false,
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#supplierCategoryWise').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Purchase Report BarCode No Wise
function barcodeWisePurchaseReport()
{
document.getElementById('exitLoad').style.display="block";
	var barcodeNoOurchase = $("#barcodeNoOurchase").val();
	if(barcodeNoOurchase == null || barcodeNoOurchase == "" || barcodeNoOurchase == " " || barcodeNoOurchase == undefined)
	{
		myAlertCB("Please Enter Barcode Number");
		return false;
	}
	var params = {};
	params["barcodeNoOurchase"] = barcodeNoOurchase;

	params["methodName"] = "barcodeWisePurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data)
					{
						$('#barcodeWisePurchaseReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for Entered Barcode No.");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#barcodeWisePurchaseReport')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					17)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							17)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					20)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							20)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					22)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							22)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "soldQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise of Purchase Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise of Purchase Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise of Purchase Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nBarcode No Wise of Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#barcodeWisePurchaseReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Purchase Report Single Date
function singleDatePurchase45()
{
document.getElementById('exitLoad').style.display="block";
	var purDate = $("#purDate").val();
	if(purDate == null || purDate == "" || purDate == " " || purDate == undefined)
	{
		myAlertCB("Please Select Date");
		return false;
	}
	var params = {};
	params["purDate"] = purDate;

	params["methodName"] = "singleDatePurchase45";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#singleDatePurchase50').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected date");
							return false;
						}
						
						if(catmap.length == 0)
						{}
						else if(catmap.length > 0)
						{
						$(document).ready(function() {
											$('#singleDatePurchase50')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};															

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(17)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(17)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page																	
																	pageTotal = api
																			.column(
																					20)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							20)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	pageTotal = api
																	.column(
																			22)
																	.data()
																	.reduce(
																			function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);

															// Update
															// footer
															$(api.column(22).footer())
																	.html(parseFloat(
																					pageTotal)
																					.toFixed(
																							2)

																	);
															console
																	.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns :[
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "soldQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"visible" : false,
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"visible" : false,
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,

																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,

																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,

																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,

																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#singleDatePurchase50').dataTable()
								.fnAddData(mydata);

					}}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Purchase Report Two Date
function twoDatePurchase45()
{
document.getElementById('exitLoad').style.display="block";
	var pFisDate = $("#pFisDate").val();
	var pEndDate = $("#pEndDate").val();
	if(pFisDate == null || pFisDate == "" || pFisDate == " " || pFisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(pEndDate == null || pEndDate == "" || pEndDate == " " || pEndDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}
	var params = {};
	params["pFisDate"] = pFisDate;
	params["pEndDate"] = pEndDate;

	params["methodName"] = "twoDatePurchase45";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#twoDatePurchase50').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#twoDatePurchase50')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					17)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							17)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					20)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							20)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					22)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							22)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);																	

																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "soldQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"visible":false,
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"visible":false,
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,

																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,

																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,

																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,

																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nRange Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#twoDatePurchase50').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Single Date Miscellaneos Sale Report
function purchaseReturnSingleDate()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var pRDate = $("#pRDate").val();
	if(pRDate == null || pRDate == "" || pRDate == " " || pRDate == undefined)
	{
		myAlertCB("Please Select Date");
		return false;
	}
	params["pRDate"] = pRDate;

	params["methodName"] = "purchaseReturnSingleDate";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#purchaseReturnSingleDateReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected date");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#purchaseReturnSingleDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 * 
																	 */

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 7 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 7
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 13 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 13
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */
																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ondate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "rollSize",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "disPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#purchaseReturnSingleDateReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

function purchaseReturnTwoDate()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var pRFisDate = $("#pRFisDate").val();
	var pREndDate = $("#pREndDate").val();
	if(pRFisDate == null || pRFisDate == "" || pRFisDate == " " || pRFisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(pREndDate == null || pREndDate == "" || pREndDate == " " || pREndDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}

	params["pRFisDate"] = pRFisDate;
	params["pREndDate"] = pREndDate;

	params["methodName"] = "purchaseReturnRangeWise";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#purchaseReturnRangeReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#purchaseReturnRangeReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 7 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 7
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 13 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 13
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */
																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ondate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "rollSize",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "disPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Range Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Range Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Range Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nDate Range Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#purchaseReturnRangeReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

function purchaseReturnBillNoWise()
{
document.getElementById('exitLoad').style.display="none";
	var params = {};
	var supplierpR = $("#supplierpR").val();
	var pRBillNo = $("#pRBillNo").val();


	
	
	if(supplierpR == null || supplierpR == "" || supplierpR == " " || supplierpR == undefined)
	{
		myAlertCB("Please Select Supplier Name");
		return false;
	}



	if(pRBillNo == null || pRBillNo == "" || pRBillNo == " " || pRBillNo == undefined)
	{
		myAlertCB("Please Select Bill No.");
		return false;
	}
	
	
	var input = document.getElementById('supplierpR'), list = document
			.getElementById('sup_drop2'), i, suppId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			suppId = list.options[i].getAttribute('data-value');

		}
	}

	params["suppId"] = suppId;
	params["supplierpR"] = supplierpR;
	params["pRBillNo"] = pRBillNo;
	params["methodName"] = "purchaseReturnBillNoWise";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#billNoWisePurRetReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected Bill No.");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#billNoWisePurRetReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 7 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 7
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 * 
																	 */

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 13 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 13
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */
																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ondate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "rollSize",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "disPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */
																],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\Bill No. Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\Bill No. Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\Bill No. Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\Bill No. Wise Purchase Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#billNoWisePurRetReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

function getAllBillsforPurchaseReturn() {
	var input = document.getElementById('supplierpR'), list = document
			.getElementById('sup_drop2'), i, supplier;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}

	var supplier = supplier;

	$("#pRBillNo").empty();
	$("#pRBillNo").append(
			$("<option></option>").attr("value", "").text("Select bill"));

	var params = {};
	params["supplier"] = supplier;
	params["methodName"] = "getAllBillBySuppliers";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v) {
			$("#pRBillNo").append(
					$("<option></option>").attr("value", i).text(v.billNo));
		});
	})
}

function gstIgstReturnAmt() {

}

function paymentModeWiseReport()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var pmDate = $("#pmDate").val();
	var pmDate22 = $("#pmDate22").val();
	var paymentMode = $("#paymentMode").val();
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	
	if(pmDate == null || pmDate == "" || pmDate == " " || pmDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(pmDate22 == null || pmDate22 == "" || pmDate22 == " " || pmDate22 == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}

	

	params["pmDate"] = pmDate;
	params["pmDate22"] = pmDate22;
	params["paymentMode"] = paymentMode;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;

	params["methodName"] = "paymentModeWiseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#paymentModeWiseReportTable').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#paymentModeWiseReportTable')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 3
																	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	
															pageTotal = api.column(5).data().reduce(function(a,b)
															{
																return intVal(a) + intVal(b);
															},
															0);

															// Update
															// footer
															$(api.column(5).footer()).html(str = pageTotal.toFixed(2));
															console.log(pageTotal);

																},
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "CustomerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cashAndCard_cashAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cashAndCard_cardAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalSaleReturnAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossamt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nPayment Mode Wise Sale Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nPayment Mode Wise Sale Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nPayment Mode Wise Sale Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nPayment Mode Wise Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#paymentModeWiseReportTable').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

/*
function paymentModeWiseReportForCC()
{
	var params = {};
	var pmDate = $("#pmDate").val();
	var pmDate22 = $("#pmDate22").val();
	var paymentMode = $("#paymentMode").val();
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	params["pmDate"] = pmDate;
	params["pmDate22"] = pmDate22;
	params["paymentMode"] = paymentMode;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;

	params["methodName"] = "paymentModeWiseReport";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#paymentModeWiseReportTable').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							alert("No data available for selected dates");
							return false;
						}
						
						$(document)
								.ready(
										function() {
											$('#paymentModeWiseReportTable')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 3
																	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	
															pageTotal = api.column(5).data().reduce(function(a,b)
															{
																return intVal(a) + intVal(b);
															},
															0);

															// Update
															// footer
															$(api.column(5).footer()).html(str = pageTotal.toFixed(2));
															console.log(pageTotal);

																},
																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "CustomerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cashAndCard_cashAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cashAndCard_cardAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalSaleReturnAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossamt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : 'Gst Return Report of sale'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Gst Return Report of sale";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#paymentModeWiseReportTable').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

*/


function paymentModeRangeWiseReport() {
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var startDateRP = $("#startDateRP").val();
	var endDateRP = $("#endDateRP").val();

	params["startDateRP"] = startDateRP;
	params["endDateRP"] = endDateRP;

	params["methodName"] = "paymentModeRangeWiseReport";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#paymentModeRangeWiseReportTable').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$(
													'#paymentModeRangeWiseReportTable')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	/*
																	 * // Total
																	 * columan 3
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 2 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 2
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * columan 4
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 3 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 3
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal); //
																	 * Total
																	 * columan 5
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 4 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 4
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 */
																},
																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "totalCashAndCard_cashAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalCashAndCard_cardAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : 'Cash And Card Amount'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Cash And Card Amount";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#paymentModeRangeWiseReportTable').dataTable()
								.fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
	
}


//Purchase Report Category Wise
function productWisePurchaseReport()
{
document.getElementById('exitLoad').style.display="block";
var supplier = $("#prodIdDrop").val();
	
	
	if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
	{
		myAlertCB("Please Select Product Name");
		return false;
	}
	var input = document.getElementById('prodIdDrop'), 
	list = document.getElementById('productId_drop'), i, productId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			productId = list.options[i].getAttribute('data-value');
		}
	}
	
	var params = {};
	params["productId"] = productId;
	params["methodName"] = "productWisePurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#supplierProductWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#supplierProductWise')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(17)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							17)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					20)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							20)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																	.column(
																			22)
																	.data()
																	.reduce(
																			function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);

															// Update
															// footer
															$(
																	api
																			.column(
																					22)
																			.footer())
																	.html(

																			parseFloat(
																					pageTotal)
																					.toFixed(
																							2)

																	);
															console
																	.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																//"paging" : false,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "soldQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"visible":false,
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"visible":false,
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		 ],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Product Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Product Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Product Wise Purchase Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Product Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#supplierProductWise').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}


function paymentModeWiseReportForCC()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var startDateForCC = $("#startDateForCC").val();
	var endDateForCC = $("#endDateForCC").val();
	var paymentModeForCC = $("#paymentModeForCC").val();
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	if(startDateForCC == null || startDateForCC == "" || startDateForCC == " " || startDateForCC == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(endDateForCC == null || endDateForCC == "" || endDateForCC == " " || endDateForCC == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}

	params["startDateForCC"] = startDateForCC;
	params["endDateForCC"] = endDateForCC;
	params["paymentModeForCC"] = paymentModeForCC;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "paymentModeWiseReportForCreditCust";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#paymentModeWiseReportTableForCC').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						
						$(document)
								.ready(
										function() {
											$('#paymentModeWiseReportTableForCC')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 3
																	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	
															pageTotal = api.column(5).data().reduce(function(a,b)
															{
																return intVal(a) + intVal(b);
															},
															0);

															// Update
															// footer
															$(api.column(5).footer()).html(str = pageTotal.toFixed(2));
															console.log(pageTotal);
														},
													destroy : true,
													searching : true,
													scrollX: true,
													scrollY: 300,
													columns : [
															{
																"data" : "billNo",
																"width" : "5%",
																"defaultContent" : ""
															},
															{
																"data" : "CustomerName",
																"width" : "5%",
																"defaultContent" : ""
															},
															{
																"data" : "cashAndCard_cashAmount",
																"width" : "5%",
																"defaultContent" : ""
															},
															{
																"data" : "cashAndCard_cardAmount",
																"width" : "5%",
																"defaultContent" : ""
															},
															{
																"data" : "totalSaleReturnAmt",
																"width" : "5%",
																"defaultContent" : ""
															},
															{
																"data" : "grossamt",
																"width" : "5%",
																"defaultContent" : ""
															},
															{
																"data" : "paymentMode",
																"width" : "5%",
																"defaultContent" : ""
															},
															{
																"data" : "saleDate",
																"width" : "5%",
																"defaultContent" : ""
															}, ],
													
															dom : 'Bfrtip',
															buttons : [
															{
																extend : 'copyHtml5',
																footer : true,
																title : function()
																{	
																	//Payment M<ode Wise Credit Customer Sale Reports 
																	return "Payment M<ode Wise Credit Customer Sale Reports\n"+shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD;
																},
															},
															{
																extend : 'excelHtml5',
																footer : true,
																title : function()
																{	
																	//Payment M<ode Wise Credit Customer Sale Reports 
																	return "Payment M<ode Wise Credit Customer Sale Reports\n"+shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD;
																},
															},
															{
																extend : 'csvHtml5',
																footer : true,
																title : function()
																{	
																	//Payment M<ode Wise Credit Customer Sale Reports 
																	return "Payment M<ode Wise Credit Customer Sale Reports\n"+shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD;
																},
															},
															{
																extend : 'pdfHtml5',
																footer : true,
																title : function()
																{																				
																	//Payment M<ode Wise Credit Customer Sale Reports 
																	return "Payment M<ode Wise Credit Customer Sale Reports\n"+shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD;
																},
																orientation : 'landscape',
																pageSize : 'LEGAL',
																titleAttr : 'PDF'
															} ]
													});
										});
						var mydata = catmap;
						$('#paymentModeWiseReportTableForCC').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

//Purchase Report Two DUE Date
function paymentDueDateWiseFn()
{
document.getElementById('exitLoad').style.display="block";
	var pddwFisDate = $("#pddwFisDate").val();
	var pddwEndDate = $("#pddwEndDate").val();
	if(pddwFisDate == null || pddwFisDate == "" || pddwFisDate == " " || pddwFisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(pddwEndDate == null || pddwEndDate == "" || pddwEndDate == " " || pddwEndDate == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}
	var params = {};
	params["pddwFisDate"] = pddwFisDate;
	params["pddwEndDate"] = pddwEndDate;

	params["methodName"] = "paymentDueDateWiseController";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#paymentDueDateWiseTable').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == null || catmap == "" || catmap == " " || catmap == undefined)
						{
							myAlertCB("NO Data");
							return false;
						}

						$(document)
								.ready(
										function() {
											$('#paymentDueDateWiseTable')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	
																	

																	pageTotal = api
																			.column(
																					19)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							19)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					22)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							22)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	pageTotal = api
																	.column(
																			24)
																	.data()
																	.reduce(
																			function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);

															// Update
															// footer
															$(
																	api
																			.column(
																					24)
																			.footer())
																	.html(

																			parseFloat(
																					pageTotal)
																					.toFixed(
																							2)

																	);
															console
															.log(pageTotal);

																},

																destroy : true,
																searching : true,
																"scrollX": true,
																"scrollY": 300,															
																/*"scrollCollapse" : true,*/
																/*"paging" : false,*/
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentDueDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "soldQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"visible":false,
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"visible":false,
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],
																
																/*scrollX: true,
																scrollY: 300,*/

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nPayment Due Date Wise Purchase Reports";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nPayment Due Date Wise Purchase Reports";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nPayment Due Date Wise Purchase Reports";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nPayment Due Date Wise Purchase Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#paymentDueDateWiseTable').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}






function taxinvoice()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};

	var input = document.getElementById('BillnoId11'), list = document
			.getElementById('BillnoList'), i, TaxvoiceId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			TaxvoiceId = list.options[i].getAttribute('data-value');
		}
	}

	var userTypeRole = $("#userType").val();
	
	var userName = $("#userName").val();
	var BillFirstDate = $("#BillFirstDate").val();
	var BillEndDate = $("#BillEndDate").val();
	
	if(TaxvoiceId == null || TaxvoiceId == "" || TaxvoiceId == " " || TaxvoiceId == undefined)
	{
		myAlertCB("Please Select Bill no");
		return false;
	}
	
	if(BillFirstDate == null || BillFirstDate == "" || BillFirstDate == " " || BillFirstDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
	
	if(BillEndDate == null || BillEndDate == "" || BillEndDate == " " || BillEndDate == undefined)
	{
		myAlertCB("Please Select End Date");
		return false;
	}

	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	params["TaxvoiceId"] = TaxvoiceId;
	params["BillFirstDate"] = BillFirstDate;
	params["BillEndDate"] = BillEndDate;
	params["methodName"] = "TaxWiseSaleReport";
	
	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleTaxWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#saleTaxWise')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};																

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 7 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 7
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 */

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 */

																	// Total
																	// over this
																	// page
/*																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
*/																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(13).data().reduce(
																					function(a,b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console.log(pageTotal);
																	
																},
																destroy : true,
																searching : true,
																"scrollY": 300,
																"scrollX": true,
																/*"scrollCollapse" : true,*/
																////"paging" : false,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : "",
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : "",
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grBuyPriceExTax",
																			"width" : "5%",
																			"defaultContent" : "",
																			"visible":false,
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data": "perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "afterDisTaxAmt",
																		    "width": "5%",
																		    "defaultContent": ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Tax Invoice W/O Barcode Wise Sale Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Tax Invoice W/O Barcode Wise Sale Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Tax Invoice W/O Barcode Wise Sale Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\n Tax Invoice W/O Barcode Wise Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		},
																		]
															});
										});
						
						var mydata = catmap;
						$('#saleTaxWise').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});	
}




function AgewisebetweenrangeWise()
{
	var params = {};
	var aBFisDate = $("#aBFisDate").val();
	var aBEndDate = $("#aBEndDate").val();
	//alert(aBFisDate+aBEndDate);
	if(aBFisDate == null || aBFisDate == "" || aBFisDate == " " || aBFisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
	
	if(aBEndDate == null || aBEndDate == "" || aBEndDate == " " || aBEndDate == undefined)
	{
		myAlertCB("Please Select End Date");
		return false;
	}
	params["aBFisDate"] = aBFisDate;
	params["aBEndDate"] = aBEndDate;

	params["methodName"] = "agewiseRangeController";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
		$('#example').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			$('#example').DataTable( {
				fnRowCallback : function(nRow, aData, iDisplayIndex){
					$("th:first", nRow).html(iDisplayIndex +1);
					return nRow;
				},

				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;
					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
								i.replace(/[\$,]/g, '')*1 :
									typeof i === 'number' ?
											i : 0;
					};
					
					
					
					
					// Total
					// over this
					// page
					pageTotal = api
							.column(
									7)
							.data()
							.reduce(
									function(
											a,
											b) {
										return intVal(a)
												+ intVal(b);
									},
									0);

					// Update
					// footer
					$(
							api
									.column(
											7)
									.footer())
							.html(

									parseFloat(
											pageTotal)
											.toFixed(
													2)

							);
					console
							.log(pageTotal);																	
			
					
					// Total
					// over this
					// page
					pageTotal = api
							.column(
									8)
							.data()
							.reduce(
									function(
											a,
											b) {
										return intVal(a)
												+ intVal(b);
									},
									0);

					// Update
					// footer
					$(
							api
									.column(
											8)
									.footer())
							.html(

									parseFloat(
											pageTotal)
											.toFixed(
													2)

							);
					console
							.log(pageTotal);	
					
				},
																destroy: true,
																searching: true,
																"scrollY": 300,
															    "scrollX": true,
																columns: [  
																	{"data": "Srno", "width": "5%", "defaultContent": ""},
															          	  {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
																          {"data": "catName", "width": "5%", "defaultContent": ""},
																          {"data": "subCatName", "width": "5%", "defaultContent": ""},
																          {"data": "itemName", "width": "5%", "defaultContent": ""},
																          {"data": "size", "width": "5%", "defaultContent": ""},
																          {"data": "qty2", "width": "5%", "defaultContent": ""},
																          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
																          {"data": "salePrice", "width": "5%", "defaultContent": ""},
																          {"data": "datediff", "width": "5%", "defaultContent": ""}, 
																          ],
																          dom : 'Bfrtip',
																          buttons : [ 
																                     { extend: 'copyHtml5', footer: true,
																                    	 title : function() {
																                    		 return "Agewise Inventory Item Stock Report";
																                    	 },
																                    	 orientation : 'landscape',
																                    	 pageSize : 'LEGAL',
																                    	 titleAttr : 'PDF' 
																                      },
																                     { extend: 'excelHtml5', footer: true,
																	                    	 title : function() {
																	                    		 return "Agewise Inventory Item Stock Report";
																	                    	 },
																	                    	 orientation : 'landscape',
																	                    	 pageSize : 'LEGAL',
																	                    	 titleAttr : 'PDF' },
																                     { extend: 'csvHtml5', footer: true,
																		                    	 title : function() {
																		                    		 return "Agewise Inventory Item Stock Report";
																		                    	 },
																		                    	 orientation : 'landscape',
																		                    	 pageSize : 'LEGAL',
																		                    	 titleAttr : 'PDF' },
																                     { extend : 'pdfHtml5', footer: true,
																                    	 title : function() {
																                    		 return "Agewise Inventory Item Stock Report";
																                    	 },
																                    	 orientation : 'landscape',
																                    	 pageSize : 'LEGAL',
																                    	 titleAttr : 'PDF' 
																                     } ]
															} );
														} );
														var mydata = catmap;
														$('#example').dataTable().fnAddData(mydata);
															}).error(function(jqXHR, textStatus, errorThrown){
																if(textStatus==="timeout") {
																	$(loaderObj).hide();
																	$(loaderObj).find('#errorDiv').show();
																}
															});
												}





function agewiseSupplierAndRangeWise()
{
	var params = {};
	
	var input = document.getElementById('supplierAB'), 
	list = document.getElementById('sup_dropAB'), i, supplierAB;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			supplierAB = list.options[i].getAttribute('data-value');
		}
	}
	
	var aBFisDateSuppWise = $("#aBFisDateSuppWise").val();
	var aBEndDateSuppWise = $("#aBEndDateSuppWise").val();
	
	if(supplierAB == null || supplierAB == undefined || supplierAB == "" || supplierAB == " ")
	{
		myAlertCB("Please Select Supplier");
		return false;
	}
	
	if(aBFisDateSuppWise == null || aBFisDateSuppWise == undefined || aBFisDateSuppWise == "" || aBFisDateSuppWise == " ")
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
	
	if(aBEndDateSuppWise == null || aBEndDateSuppWise == undefined || aBEndDateSuppWise == "" || aBEndDateSuppWise == " ")
	{
		myAlertCB("Please Select End Date");
		return false;
	}

	params["supplierAB"] = supplierAB;
	params["aBFisDateSuppWise"] = aBFisDateSuppWise;
	params["aBEndDateSuppWise"] = aBEndDateSuppWise;

	params["methodName"] = "agewiseSupplierAndRangeController";

	$.post('/SMT/jsp/utility/controller.jsp',
			params,
			function(data) {
$('#example1').dataTable().fnClearTable();
var jsonData = $.parseJSON(data);
var catmap = jsonData.list;
$(document).ready(function() {
	$('#example1').DataTable( {
		fnRowCallback : function(nRow, aData, iDisplayIndex){
			$("th:first", nRow).html(iDisplayIndex +1);
			return nRow;
		},

		"footerCallback": function ( row, data, start, end, display ) {
			var api = this.api(), data;
			// Remove the formatting to get integer data for summation
			var intVal = function ( i ) {
				return typeof i === 'string' ?
						i.replace(/[\$,]/g, '')*1 :
							typeof i === 'number' ?
									i : 0;
			};
			
			
			
			
			// Total
			// over this
			// page
			pageTotal = api
					.column(
							8)
					.data()
					.reduce(
							function(
									a,
									b) {
								return intVal(a)
										+ intVal(b);
							},
							0);

			// Update
			// footer
			$(
					api
							.column(
									8)
							.footer())
					.html(

							parseFloat(
									pageTotal)
									.toFixed(
											2)

					);
			console
					.log(pageTotal);																	
	
			
			// Total
			// over this
			// page
			pageTotal = api
					.column(
							9)
					.data()
					.reduce(
							function(
									a,
									b) {
								return intVal(a)
										+ intVal(b);
							},
							0);

			// Update
			// footer
			$(
					api
							.column(
									9)
							.footer())
					.html(

							parseFloat(
									pageTotal)
									.toFixed(
											2)

					);
			console
					.log(pageTotal);	
			
		},
														destroy: true,
														searching: true,
														"scrollY": 300,
													    "scrollX": true,
														columns: [ 
															
																  {"data": "Srno", "width": "5%", "defaultContent": ""},
													          	  {"data": "SupplierName", "width": "5%", "defaultContent": ""},
													          	  {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
														          {"data": "catName", "width": "5%", "defaultContent": ""},
														          {"data": "subCatName", "width": "5%", "defaultContent": ""},
														          {"data": "itemName", "width": "5%", "defaultContent": ""},
														          {"data": "size", "width": "5%", "defaultContent": ""},
														          {"data": "qty2", "width": "5%", "defaultContent": ""},
														          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
														          {"data": "salePrice", "width": "5%", "defaultContent": ""},
														          {"data": "datediff", "width": "5%", "defaultContent": ""}, 
														          ],
														          dom : 'Bfrtip',
														          buttons : [ 
														                     { extend: 'copyHtml5', footer: true,
														                    	 title : function() {
														                    		 return "Agewise Inventory Item Stock Report";
														                    	 },
														                    	 orientation : 'landscape',
														                    	 pageSize : 'LEGAL',
														                    	 titleAttr : 'PDF' 
														                      },
														                     { extend: 'excelHtml5', footer: true,
															                    	 title : function() {
															                    		 return "Agewise Inventory Item Stock Report";
															                    	 },
															                    	 orientation : 'landscape',
															                    	 pageSize : 'LEGAL',
															                    	 titleAttr : 'PDF' },
														                     { extend: 'csvHtml5', footer: true,
																                    	 title : function() {
																                    		 return "Agewise Inventory Item Stock Report";
																                    	 },
																                    	 orientation : 'landscape',
																                    	 pageSize : 'LEGAL',
																                    	 titleAttr : 'PDF' },
														                     { extend : 'pdfHtml5', footer: true,
														                    	 title : function() {
														                    		 return "Agewise Inventory Item Stock Report";
														                    	 },
														                    	 orientation : 'landscape',
														                    	 pageSize : 'LEGAL',
														                    	 titleAttr : 'PDF' 
														                     } ]
													} );
												} );
												var mydata = catmap;
												$('#example1').dataTable().fnAddData(mydata);
													}).error(function(jqXHR, textStatus, errorThrown){
														if(textStatus==="timeout") {
															$(loaderObj).hide();
															$(loaderObj).find('#errorDiv').show();
														}
													});
										}


function purchaseexpese()
{
document.getElementById('exitLoad').style.display="block";
	var params = {};
	var fisDate = $("#pREndDate1").val();
	var endDate = $("#pREndDate2").val();
	if(fisDate == null || fisDate == "" || fisDate == " " || fisDate == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
	if(endDate == null || endDate == "" || endDate == " " || endDate == undefined)
	{
		myAlertCB("Please Select End Date");
		return false;
	}
	params["fisDate"] = fisDate;
	params["endDate"] = endDate;

	params["methodName"] = "expenseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#expenseRangeReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlertCB("No data available for selected dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#expenseRangeReport')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 3
																/*	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);*/

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 6
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 7
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																scrollX: true,
																scrollY: 300,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "transaportExpense",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "labourExpense",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Grosstotalwithoutexpese",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nGST Return Report of Purchase";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nGST Return Report of Purchase";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nGST Return Report of Purchase";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return shopNameSD+"\n"+shopAddressSD+"\n"+shopContactNoSD+"\n"+shopGstNoSD+"\n"+shopEmailSD+"\n\nGST Return Report of Purchase";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#expenseRangeReport').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});

}

//Barcode wise  age report by sonal
function BarcodeWise()
{
	var params = {};
	
	var barcodeNoOurchase = $("#barcodeNoOurchase").val();
	var aBEndDateSuppWise = $("#aBEndDateSuppWise").val();
	
	if(barcodeNoOurchase == null || barcodeNoOurchase == undefined || barcodeNoOurchase == "" || barcodeNoOurchase == " ")
	{
		myAlertCB("Please Select Supplier");
		return false;
	}
	
	params["barcodeNoOurchase"] = barcodeNoOurchase;

	params["methodName"] = "agewiseBarcodeController";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		
		$('#example3').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		$(document).ready(function() {
			
			$('#example3').DataTable( {fnRowCallback : function(nRow, aData, iDisplayIndex)
			{
				$("th:first", nRow).html(iDisplayIndex +1);
				return nRow;
			},
			"footerCallback": function ( row, data, start, end, display )
			{
				var api = this.api(), data;
				//Remove the formatting to get integer data for summation
				var intVal = function ( i ) {
					
					return typeof i === 'string' ?
					i.replace(/[\$,]/g, '')*1 :
					typeof i === 'number' ?
					i : 0;
				};
			
				// Total over this page
			
				pageTotal = api.column(8).data().reduce(function(a,b)
				{
					return intVal(a)+ intVal(b);
				},0);
				
				//Update footer
				$(api.column(8).footer()).html(parseFloat(pageTotal).toFixed(2));
				console.log(pageTotal);
				
				//Total over this page
				pageTotal = api.column(9).data().reduce(function(a,b)
				{
					return intVal(a)+ intVal(b);
				},0);
				
				// Update footer
				$(api.column(9).footer()).html(parseFloat(pageTotal).toFixed(2));
				console.log(pageTotal);
			},
			
			destroy: true,
			searching: true,
			"scrollY": 300,
			"scrollX": true,
			columns: [
				{"data": "Srno", "width": "5%", "defaultContent": ""},
				{"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				{"data": "catName", "width": "5%", "defaultContent": ""},
				{"data": "subCatName", "width": "5%", "defaultContent": ""},
				{"data": "itemName", "width": "5%", "defaultContent": ""},
				{"data": "size", "width": "5%", "defaultContent": ""},
				{"data": "qty2", "width": "5%", "defaultContent": ""},
				{"data": "buyPrice", "width": "5%", "defaultContent": ""},
				{"data": "salePrice", "width": "5%", "defaultContent": ""},
				{"data": "datediff", "width": "5%", "defaultContent": ""},
				
				//{"data": "SupplierName", "width": "5%", "defaultContent": ""}, 
			],
			dom : 'Bfrtip',
			buttons : [ 
				{
					extend: 'copyHtml5', footer: true, title :
					function() {
						return "Agewise Inventory Item Stock Report";
					},
					orientation : 'landscape',
					pageSize : 'LEGAL',
					titleAttr : 'PDF'
				},
				{
					extend: 'excelHtml5', footer: true, title :
					function() {
						return "Agewise Inventory Item Stock Report";
					},
					orientation : 'landscape',
					pageSize : 'LEGAL',
					titleAttr : 'PDF'
				},
				{
					extend: 'csvHtml5', footer: true, title :
					function() {
						return "Agewise Inventory Item Stock Report";
					},
					orientation : 'landscape',
					pageSize : 'LEGAL',
					titleAttr : 'PDF'
				},
				{
					extend : 'pdfHtml5', footer: true, title :
					function() {
						return "Agewise Inventory Item Stock Report";
					},
					orientation : 'landscape',
					pageSize : 'LEGAL',
					titleAttr : 'PDF'
				}
			]
			} );
		} );
		
		var mydata = catmap;
		$('#example3').dataTable().fnAddData(mydata);
		}).error(function(jqXHR, textStatus, errorThrown){
			if(textStatus==="timeout") {
				$(loaderObj).hide();
				$(loaderObj).find('#errorDiv').show();
			}
		});
	}




