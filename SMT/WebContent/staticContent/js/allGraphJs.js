function categoryWiseSaleGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	
	var params = {};
	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "categoryWiseSaleGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#categoryWiseSaleGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document)
				.ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].saleQty);
				            	 headingArray.push(catmap[i].saleCatName);
				             }
				          
				             // draw chart
				             $('#categoryWiseSaleGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL CATEGORY WISE SALE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "SOLD QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}

function pie_categoryWiseSaleGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	
	var params = {};
	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "categoryWiseSaleGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#pie_categoryWiseSaleGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document)
				.ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].saleQty);
				            	 headingArray.push(catmap[i].saleCatName);
				             }
				          
				             // draw chart
				             $('#pie_categoryWiseSaleGraph').highcharts({
				             chart:
				             {
				                 type: "pie"
				             },
				             title:
				             {
				                 text: "TOTAL CATEGORY WISE SALE"
				             },
				            
/*				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
				            	 categories: headingArray,
					             allowDecimals: true,
					             title:
					             {
					            	 text: "SOLD QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
*/				         
				             
				             
				             
				             tooltip: {
				                 //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				                 pointFormat: headingArray+': <b>{point.percentage:.1f}%</b>'				            	 
				             },
				             plotOptions: {
				                 pie: {
				                     allowPointSelect: true,
				                     cursor: 'pointer',
				                     dataLabels: {
				                         enabled: true,
				                         format: '<b>{point.name}</b>: {point.percentage:.1f} %'
				                     }
				                 }
				             },
				             series: [{
				                 //name: 'Brands',
				                 colorByPoint: true,
				                 data:processed_json
				             }]
	             }); 							
								
			});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}


function todaysCategoryWiseSaleGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	var today = getTodayDate();
	
	var params = {};
	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "todaysCategoryWiseSaleGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#todayCategoryWiseSaleGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].todaySaleQty);
				            	 headingArray.push(catmap[i].todaySaleCatName);
				             }
				          
				             // draw chart (DIV ID)
				             $('#todaysCategoryWiseSaleGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TODAYS TOTAL CATEGORY WISE SALE ("+today+")",
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "SOLD QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}

function supplierWiseTotalSaleGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	
	var params = {};
	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "supplierWiseSaleTotalGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#supplierWiseTotalSaleGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].supplierTotalSaleQty);
				            	 headingArray.push(catmap[i].supplierTotalSaleCatName);
				             }
				          
				             // draw chart
				             $('#supplierWiseTotalSaleGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL SUPPLIER WISE SALE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "SOLD QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}

function subCategoryWiseSaleGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	
	var params = {};
	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "subCategoryWiseSaleGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#subCategoryWiseTotalSaleGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document)
				.ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].subCatTotalSaleQty);
				            	 headingArray.push(catmap[i].subCatTotalSaleCatName);
				             }
				          
				             // draw chart
				             $('#subCategoryWiseTotalSaleGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL SUB CATEGORY WISE SALE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "SOLD QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}

function categoryWisePurchaseGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	
	var params = {};
	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "categoryWisePurchaseGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#categoryWisePurchaseGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document)
				.ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].purchaseQty);
				            	 headingArray.push(catmap[i].purchaseCatName);
				             }
				          
				             // draw chart
				             $('#categoryWisePurchaseGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL CATEGORY WISE PURCHASE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "PURCHASE QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}

function TodaysCategoryWisePurchaseGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	var today = getTodayDate();
	
	var params = {};
	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "todaysCategoryWisePurchaseGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#todaysCategoryWisePurchaseGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].todayPurchaseQty);
				            	 headingArray.push(catmap[i].todayPurchaseCatName);
				             }
				          
				             // draw chart
				             $('#todaysCategoryWisePurchaseGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TODAYS TOTAL CATEGORY WISE PURCHASE("+today+")",
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "PURCHASE QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});	
}

function supplierWiseTotalPurchaseGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	
	var params = {};
	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "supplierWiseTotalPurchaseGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#supplierWiseTotalPurchaseGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].supplierTotalPurchaseQty);
				            	 headingArray.push(catmap[i].supplierTotalPurchaseCatName);
				             }
				          
				             // draw chart
				             $('#supplierWiseTotalPurchaseGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL SUPPLIER WISE PURCHASE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "PURCHASE QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}

function subCategoryWisePurchaseGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	
	var params = {};
	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "subCategoryWisePurchaseGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#subCategoryWiseTotalPurchaseGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].subCatTotalPurchaseQty);
				            	 headingArray.push(catmap[i].subCatTotalPurchaseCatName);
				             }
				          
				             // draw chart
				             $('#subCategoryWiseTotalPurchaseGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL SUB CATEGORY WISE PURCHASE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "PURCHASE QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}

function rangeWiseSaleGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	var startDateRangeGraph = $("#startDateRangeGraph").val();
	var endDateRangeGraph = $("#endDateRangeGraph").val();
	
	var params = {};
	
	params["startDateRangeGraph"] = startDateRangeGraph;
	params["endDateRangeGraph"] = endDateRangeGraph;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "rangeWiseSaleGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#rangeWiseSaleGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		if(catmap == "" || catmap == null || catmap == undefined){
			myAlertCB("No data available for selected dates");
			return false;
		}
		$(document).ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].rangeSaleQty);
				            	 headingArray.push(catmap[i].rangeSaleCatName);
				             }
				          
				             // draw chart
				             $('#rangeWiseSaleGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL CATEGORY WISE SALE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "SOLD QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}

function rangeWisePurchaseGraph()
{	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	var startDateRangeGraph = $("#startDateRangeGraph").val();
	var endDateRangeGraph = $("#endDateRangeGraph").val();
	if(startDateRangeGraph == null || startDateRangeGraph == "" || startDateRangeGraph == " " || startDateRangeGraph == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(endDateRangeGraph == null || endDateRangeGraph == "" || endDateRangeGraph == " " || endDateRangeGraph == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}
	
	var params = {};
	
	params["startDateRangeGraph"] = startDateRangeGraph;
	params["endDateRangeGraph"] = endDateRangeGraph;	
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "rangeWisePurchaseGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#rangeWisePurchaseGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		if(catmap == "" || catmap == null || catmap == undefined){
			alert("No data available for selected dates");
			return false;
		}
		$(document)
				.ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].rangePurchaseQty);
				            	 headingArray.push(catmap[i].rangePurchaseCatName);
				             }
				          
				             // draw chart
				             $('#rangeWisePurchaseGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL CATEGORY WISE PURCHASE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "PURCHASE QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}


function supplierWiseSaleGraph()
{	
	var startDateSuppGraph = $("#startDateSuppGraph").val();
	var endDateSuppGraph = $("#endDateSuppGraph").val();
	
	if(startDateSuppGraph == null || startDateSuppGraph == "" || startDateSuppGraph == " " || startDateSuppGraph == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(endDateSuppGraph == null || endDateSuppGraph == "" || endDateSuppGraph == " " || endDateSuppGraph == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}
var supplier = $("#supplierSpGraph").val();


if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
{
	myAlertCB("Please Select Supplier Name 1");
	return false;
}

	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	var input = document.getElementById('supplierSpGraph'), list = document.getElementById('sup_dropSpGraph'), i, supplierId;
	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input.value) {
		supplierId = list.options[i].getAttribute('data-value');
		}
	}
	
	var params = {};
	
	params["startDateSuppGraph"] = startDateSuppGraph;
	params["endDateSuppGraph"] = endDateSuppGraph;		
	params["supplierId"] = supplierId;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "supplierWiseSaleGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#supplierWiseSaleGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].supplierSaleQty);
				            	 headingArray.push(catmap[i].supplierSaleCatName);
				             }
				          
				             // draw chart
				             $('#supplierWiseSaleGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL CATEGORY WISE SALE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "SOLD QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}

function supplierWisePurchaseGraph()
{		
	var startDateSuppGraph = $("#startDateSuppGraph").val();
	var endDateSuppGraph = $("#endDateSuppGraph").val();	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	
	if(startDateSuppGraph == null || startDateSuppGraph == "" || startDateSuppGraph == " " || startDateSuppGraph == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(endDateSuppGraph == null || endDateSuppGraph == "" || endDateSuppGraph == " " || endDateSuppGraph == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}
var supplier = $("#supplierSpGraph").val();


if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
{
	myAlertCB("Please Select Supplier Name 2");
	return false;
}
	
	var input = document.getElementById('supplierSpGraph'), list = document.getElementById('sup_dropSpGraph'), i, supplierId;
	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input.value) {
		supplierId = list.options[i].getAttribute('data-value');
		}
	}
	
	var params = {};
	
	params["startDateSuppGraph"] = startDateSuppGraph;
	params["endDateSuppGraph"] = endDateSuppGraph;	
	params["supplierId"] = supplierId;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "supplierWisePurchaseGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#supplierWisePurchaseGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document)
				.ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();   
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].supplierPurchaseQty);
				            	 headingArray.push(catmap[i].supplierSaleCatName);
				             }
				          
				             // draw chart
				             $('#supplierWisePurchaseGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL CATEGORY WISE PURCHASE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "PURCHASE QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}



function subCatRangeWisePurchaseGraph()
{
	var startDateSubCatGraph = $("#startDateSubCatGraph").val();
	var endDateSubCatGraph = $("#endDateSubCatGraph").val();	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	if(startDateSubCatGraph == null || startDateSubCatGraph == "" || startDateSubCatGraph == " " || startDateSubCatGraph == undefined)
	{
		myAlertCB("Please Select Start Date");
		return false;
	}
if(endDateSubCatGraph == null || endDateSubCatGraph == "" || endDateSubCatGraph == " " || endDateSubCatGraph == undefined)
	{
		myAlertCB("Please Select End Date ");
		return false;
	}
var supplier = $("#subCatSpGraph").val();


if(supplier == null || supplier == "" || supplier == " " || supplier == undefined)
{
	myAlertCB("Please Select Sub Category");
	return false;
}
	var input = document.getElementById('subCatSpGraph'), 
	list = document.getElementById('subCatdropSpGraph'), i, subcatId;
	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input.value) {
		subcatId = list.options[i].getAttribute('data-value');
		}
	}
	
	var params = {};
	
	params["startDateSubCatGraph"] = startDateSubCatGraph;
	params["endDateSubCatGraph"] = endDateSubCatGraph;	
	params["subcatId"] = subcatId;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "subCatWisePurchaseGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#subCatRangeWisePurchaseGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		if(catmap == "" || catmap == null || catmap == undefined){
			alert("No data available for selected dates");
			return false;
		}
		$(document).ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].subCatRangePurchaseQty);
				            	 headingArray.push(catmap[i].subCatRangePurchaseCatName);
				             }
				          
				             // draw chart
				             $('#subCatRangeWisePurchaseGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL CATEGORY WISE PURCHASE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "PURCHASE QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}


function subCatRangeWiseSaleGraph()
{
	var startDateSubCatGraph = $("#startDateSubCatGraph").val();
	var endDateSubCatGraph = $("#endDateSubCatGraph").val();	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	
	var input = document.getElementById('subCatSpGraph'), 
	list = document.getElementById('subCatdropSpGraph'), i, subcatId;
	for (i = 0; i < list.options.length; ++i) {
	if (list.options[i].value === input.value) {
		subcatId = list.options[i].getAttribute('data-value');
		}
	}
	
	var params = {};
	
	params["startDateSubCatGraph"] = startDateSubCatGraph;
	params["endDateSubCatGraph"] = endDateSubCatGraph;	
	params["subcatId"] = subcatId;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["methodName"] = "subCatWiseSaleGraphController";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,
	function(data)
	{		
		$('#subCatRangeWiseSaleGraphTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(
						function()
						{							
							var processed_json = new Array();   
							var headingArray = new Array();
				             // Populate series
				             for (i = 0; i < catmap.length; i++)
				             {   
				            	 processed_json.push(catmap[i].subCatRangeSaleQty);
				            	 headingArray.push(catmap[i].subCatRangeSaleCatName);
				             }
				          
				             // draw chart
				             $('#subCatRangeWiseSaleGraph').highcharts({
				             chart:
				             {
				                 type: "column"
				             },
				             title:
				             {
				                 text: "TOTAL CATEGORY WISE PURCHASE"
				             },
				            
				            xAxis:
				             {   	
				                categories: headingArray,
				                title:
					             {
					            	 text: "CATEGORIES",
					             }
				             },
				           
				             yAxis:
				             {
					             allowDecimals: true,
					             title:
					             {
					            	 text: "PURCHASE QUANTITY",
					             }
				             },
				             
				             series:
				            	 [{
				            		 name: 'Categories',
				            		 data: processed_json
				            	 }]
				         }); 							
											
						});		
		
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});		
}