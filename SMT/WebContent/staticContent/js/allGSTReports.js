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

function singleDatePurchase()
{
	var params= {};
	var fDate = $("#fDate").val();
	
	
	if(fDate == "" || fDate == undefined || fDate == " " || fDate == null)
	{
		myAlert("Please Select  Date");
		return false;
	}
	
	
	
	params["fDate"]= fDate;
	params["methodName"] = "singleDatePurchase";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		$('#example').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		if(catmap == "" || catmap == null || catmap == undefined){
			myAlert("No data available for selected date");
			return false;
		}

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

					// Total over this page
					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 7 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);

					// Total over this page
					pageTotal = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 8 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 10 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 11 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
/*					$( api.column( 11 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 12 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 12 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
					// Total over this page
					pageTotal = api
					.column( 13 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 13 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 14 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 14 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					/*pageTotal = api
					.column( 15 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 15 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
					// Total over this page
					/*pageTotal = api
					.column( 16 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 16 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 17 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 17 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 18 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 18 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 19 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 19 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					
					// Total over this page
					pageTotal = api
					.column( 20 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 20 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					
					pageTotal = api
					.column( 21 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 21 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					*/

				},

				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,
				/*scrollY: '50vh',*/
				scrollX: true,
				scrollY: 300,

				columns: [  
				          {"data": "serialnumber", "width": "5%" ,"defaultContent": ""},
				          {"data": "fetchDate", "width": "5%" , "defaultContent": ""},
				          {"data": "supplierName", "width": "5%" , "defaultContent": ""},
				          {"data": "billNo", "width": "5%" , "defaultContent": ""},
				          /*{data: "GstTinNo", "width": "5%", "defaultContent": ""},*/
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "rollSize", "width": "5%", "defaultContent": ""},
				          {"data": "total", "width": "5%", "defaultContent": ""},
				          {"data": "discountAmount", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "igst", "width": "5%", "defaultContent": ""},
				          /*{"data": "fivePercentageGST", "width": "5%", "defaultContent": ""},
				          {"data": "twelwePercentageGST", "width": "5%", "defaultContent": ""},
				          {"data": "eighteenPercentageGST" , "width": "5%", "defaultContent": ""},
				          {"data": "twentyEightPercentageGST", "width": "5%", "defaultContent": ""},
				          {"data": "iGSTFivePercentage", "width": "5%", "defaultContent": ""},
				          {"data": "iGSTTwelwePercentage" , "width": "5%", "defaultContent": ""},
				          {"data": "iGSTEighteenPercentage", "width": "5%", "defaultContent": ""},
				          {"data": "iGSTTwentyeightPercentage", "width": "5%", "defaultContent": ""},*/
				          /*{"data": "discountAmount" , "width": "5%", "defaultContent": ""},*/
				          {"data": "totalTaxAmount" , "width": "5%", "defaultContent": ""},
				          {"data": "netAmount" , "width": "5%", "defaultContent": ""}
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true,
				                    	 
				                    	 title : function() {
				                    		 return "DateWise GST Purchase Reports";
				                    	 },},
				                     { extend: 'excelHtml5', footer: true,				                    		 
					                    	 title : function() {
					                    		 return "DateWise GST Purchase Reports";
					                    	 },},
				                     { extend: 'csvHtml5', footer: true,
						                    	 title : function() {
						                    		 return "DateWise GST Purchase Reports";
						                    	 }, },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "DateWise GST Purchase Reports";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example').dataTable().fnAddData(mydata);
			});
}

function purchaseReportBetweenTwoDates()
{
	var params= {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();
	
	
	
	
	if(fisDate == "" || fisDate == undefined || fisDate == " " || fisDate == null)
	{
		myAlert("Please Select Start Date");
		return false;
	}
	
	if(endDate == "" || endDate == undefined || endDate == " " || endDate == null)
	{
		myAlert("Please Select End Date");
		return false;
	}

	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "purchaseReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		$('#example1').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		if(catmap == "" || catmap == null || catmap == undefined){
			myAlert("No data available for selected dates");
			return false;
		}

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

					// Total over this page
					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 7 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);

					// Total over this page
					pageTotal = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 8 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					/*pageTotal = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 10 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 11 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 11 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
					// Total over this page
					pageTotal = api
					.column( 12 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 12 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 13 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 13 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 14 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 14 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					/*pageTotal = api
					.column( 15 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 15 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
					// Total over this page
					/*pageTotal = api
					.column( 15 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 15 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 16 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 16 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 17 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 17 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 18 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 18 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 19 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 19 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					
					// Total over this page
					pageTotal = api
					.column( 20 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 20 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);*/
				},
				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,
				/*scrollY: '50vh',*/
				scrollX: true,
				scrollY: 300,
				
				columns: [  
				          {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				          {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				          {"data": "supplierName", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "rollSize", "width": "5%", "defaultContent": ""},
				          {"data": "discountAmount", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "igst", "width": "5%", "defaultContent": ""},
				          {"data": "total", "width": "5%", "defaultContent": ""},
				         /* {"data": "discountAmount" , "width": "5%", "defaultContent": ""},*/
				          {"data": "totalTaxAmount" , "width": "5%", "defaultContent": ""},
				          {"data": "netAmount" , "width": "5%", "defaultContent": ""}
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "Range Wise GST Purchase Report";
				                    	 }, },
				                     { extend: 'excelHtml5', footer: true,
					                    	 title : function()
					                    	 {
					                    		 return "Range Wise GST Purchase Report";
					                    	 }, },
				                     { extend: 'csvHtml5', footer: true,
						                    	 title : function()
						                    	 {
						                    		 return "Range Wise GST Purchase Report";
						                    	 }, },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function()
			                    	 {
			                    		 return "Range Wise GST Purchase Report";
			                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example1').dataTable().fnAddData(mydata);
			});
}

function suppGstReportBetweenTwoDates()
{
	var params= {};
	
	
	var input = document.getElementById('supplier7'), list = document.getElementById('sup_drop7'), i, supplier;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			supplier = list.options[i].getAttribute('data-value');
		}
	}	
	
	var fisDate = $("#fisDateSupp").val();
	var endDate = $("#endDateSupp").val();

	if(supplier == "" || supplier == undefined || supplier == " " || supplier == null)
	{
		myAlert("Please Select Supplier");
		return false;
	}
	
	if(fisDate == "" || fisDate == undefined || fisDate == " " || fisDate == null)
	{
		myAlert("Please Select Start Date");
		return false;
	}
	
	if(endDate == "" || endDate == undefined || endDate == " " || endDate == null)
	{
		myAlert("Please Select End Date");
		return false;
	}
	
	
	params["fisDate"] = fisDate;
	params["endDate"] = endDate;
	params["supplier"] = supplier;
	params["methodName"] = "suppGstReportBetweenTwoDatesC";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#suppGstReportBetweenTwoDatesDataTable').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		if(catmap == "" || catmap == null || catmap == undefined){
			myAlert("No data available for selected dates");
			return false;
		}

		$(document).ready(function() {
			$('#suppGstReportBetweenTwoDatesDataTable').DataTable( {
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

					// Total over this page
					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 7 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);

					// Total over this page
					pageTotal = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 8 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					/*pageTotal = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 10 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 11 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 11 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
					// Total over this page
					pageTotal = api
					.column( 12 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 12 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 13 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 13 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 14 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 14 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					/*pageTotal = api
					.column( 15 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 15 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
					// Total over this page
					/*pageTotal = api
					.column( 15 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 15 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 16 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 16 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 17 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 17 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 18 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 18 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 19 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 19 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					
					// Total over this page
					pageTotal = api
					.column( 20 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 20 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);*/
				},
				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,
				/*scrollY: '50vh',*/
				
				
				columns: [  
				          {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				          {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				          {"data": "supplierName", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "rollSize", "width": "5%", "defaultContent": ""},
				          {"data": "discountAmount", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "igst", "width": "5%", "defaultContent": ""},
				          {"data": "total", "width": "5%", "defaultContent": ""},
				         /* {"data": "discountAmount" , "width": "5%", "defaultContent": ""},*/
				          {"data": "totalTaxAmount" , "width": "5%", "defaultContent": ""},
				          {"data": "netAmount" , "width": "5%", "defaultContent": ""}
				          ],
				          dom : 'Bfrtip',
				          scrollX: true,
						  scrollY: 300,
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "Supplier Wise GST Purchase Report";
				                    	 }, },
				                     { extend: 'excelHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "Supplier Wise GST Purchase Report";
				                    	 }, },
				                     { extend: 'csvHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "Supplier Wise GST Purchase Report";
				                    	 }, },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function()
			                    	 {
			                    		 return "Supplier Wise GST Purchase Report";
			                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#suppGstReportBetweenTwoDatesDataTable').dataTable().fnAddData(mydata);
			});
}

function gstsaleReportBetweenTwoDates()
{
	var params= {};
	var fisDate = $("#firstDate").val();
	var endDate = $("#secondDate").val();
	if(fisDate == "" || fisDate == undefined || fisDate == " " || fisDate == null)
	{
		myAlert("Please Select Start Date");
		return false;
	}
	
	if(endDate == "" || endDate == undefined || endDate == " " || endDate == null)
	{
		myAlert("Please Select End Date");
		return false;
	}
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "gstSaleReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example4').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		if(catmap == "" || catmap == null || catmap == undefined){
			myAlert("No data available for selected dates");
			return false;
		}

		$(document).ready(function() {
			$('#example4').DataTable( {

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

					// Total over this page
					pageTotal = api
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 5 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);

					// Total over this page
					pageTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 6 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 7 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 8 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 10 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 11 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 11 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 12 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 12 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					/*pageTotal = api
					.column( 13 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 13 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 14 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 14 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 15 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 15 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);*/

					// Total over this page
/*					pageTotal = api
					.column( 12 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 12 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 13 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 13 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					
					// Total over this page
					pageTotal = api
					.column( 14 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 14 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);*/

				},
				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,
				scrollX: true,
				scrollY: 300,

				columns: [  

				          {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				          {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "total", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "igst", "width": "5%", "defaultContent": ""},
				          {"data": "totalTaxAmount" , "width": "5%", "defaultContent": ""},
				          {"data": "discountAmt" , "width": "5%", "defaultContent": ""},
				          {"data": "netAmount" , "width": "5%", "defaultContent": ""}

				          ],

				          dom : 'Bfrtip',
				          buttons : [ 

				                     {
				                    	 extend: 'copyHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "GST wise Sale Report";
				                    	 },
				                     },
				                     { extend: 'excelHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "GST wise Sale Report";
				                    	 },
				                     },
				                     {
				                    	 extend: 'csvHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "GST wise Sale Report";
				                    	 },
				                     },
				                     {
				                    	 extend : 'pdfHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "GST wise Sale Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example4').dataTable().fnAddData(mydata);
			});
}

function purchaseReportBetweenTwoDatesNonGst()
{
	var params= {};
	var fisDate = $("#fisDateNoGst").val();
	var endDate = $("#endDateNoGst").val();
	
	if(fisDate == "" || fisDate == undefined || fisDate == " " || fisDate == null)
	{
		myAlert("Please Select Start Date");
		return false;
	}
	
	if(endDate == "" || endDate == undefined || endDate == " " || endDate == null)
	{
		myAlert("Please Select End Date");
		return false;
	}
	
	
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;

	params["methodName"] = "purchaseReportBetweenTwoDatesNonGst";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		$('#purchaseNoGstWise').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		if(catmap == "" || catmap == null || catmap == undefined){
			myAlert("No Data Available For Selected Dates");
			return false;
		}

		$(document).ready(function() {
			$('#purchaseNoGstWise').DataTable({
				dom: 'Bfrtip',
				buttons: [
				          'copy', {
				        	  extend : 'csv',
				        	  footer:true,
				        	  title :"NON GST Purchase Report",
				          },{
				        	  extend : 'excel',
				        	  footer:true,
				        	  title :"NON GST Purchase Report",
				          } , {
				        	  extend : 'pdfHtml5',
				        	  title : function() {
				        		  return "NON GST Purchase Report";
				        	  },
				        	  orientation : 'landscape',
				        	  pageSize : 'LEGAL',
				        	  /* text : '<i class="fa fa-file-pdf-o"> PDF</i>',*/
				        	  titleAttr : 'PDF',
				        	  footer:true
				          },{
				        	  extend : 'print',
				        	  footer:true,
				        	  title :"NON GST Purchase Report",
				          }
				          ],

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
				        	  // Total over this page
				        	  pageTotal = api
				        	  .column( 9 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );
				        	  // Update footer
				        	  $( api.column( 9 ).footer() ).html(
				        			  parseFloat(pageTotal).toFixed(2)
				        	  );
				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 10 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );
				        	  // Update footer
				        	  $( api.column( 10 ).footer() ).html(
				        			  parseFloat(pageTotal).toFixed(2)
				        	  );
				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 11 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );
				        	  // Update footer
				        	  $( api.column( 11 ).footer() ).html(
				        			  parseFloat(pageTotal).toFixed(2)
				        	  );
				          },

				          "sPaginationType": "full_numbers",
				          destroy: true,
				          searching: true,
				          orderable: true,
				          scrollY: 300,
				          scrollX: true,

				          columns: [  
				                    {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				                    {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				                    {"data": "supplierName", "width": "5%", "defaultContent": ""},
				                    {"data": "billNo", "width": "5%", "defaultContent": ""},
				                    {"data": "GstTinNo", "width": "5%", "defaultContent": ""},
				                    {"data": "itemName", "width": "5%", "defaultContent": ""},
				                    {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				                    {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				                    {"data": "quantity", "width": "5%", "defaultContent": ""},
				                    {"data": "rollSize", "width": "5%", "defaultContent": ""},
				                    {"data": "QuantityMeter", "width": "5%", "defaultContent": ""},
				                    {"data": "disPer", "width": "5%", "defaultContent": ""},
				                    {"data": "discountAmount", "width": "5%", "defaultContent": ""},
				                    {"data": "total", "width": "5%", "defaultContent": ""},
				                    ]
			} );
		} );
		var mydata = catmap;
		$('#purchaseNoGstWise').dataTable().fnAddData(mydata);
			});
}

//Two Date Sale REPORT FOR GST
function twoDateSaleReportForGSTReport()
{
	var params = {};
	var fisDateB2CGST = $("#fisDateB2CGST").val();
	var endDateB2CGST = $("#endDateB2CGST").val();

	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();
	
	if(fisDateB2CGST == "" || fisDateB2CGST == null || fisDateB2CGST == " " || fisDateB2CGST == "undefined")
	{
		myAlert("Please Select Start Date");
		return false;
	}
	else
	{}
	if(endDateB2CGST == "" || endDateB2CGST == null || endDateB2CGST == " " || endDateB2CGST == "undefined")
	{
		myAlert("Please Select End Date");
		return false;		
	}
	else
	{}

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;

	params["fisDateB2CGST"] = fisDateB2CGST;
	params["endDateB2CGST"] = endDateB2CGST;

	params["methodName"] = "saleDetailsBetweenTwoDatesB2CGSTReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data)
					{	
						$('#saleB2CGSTReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						if(catmap == "" || catmap == null || catmap == undefined){
							myAlert("No Data Available For Selected Dates");
							return false;
						}
						$(document)
								.ready(
										function() {
											$('#saleB2CGSTReport')
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

																destroy: true,
																searching: true,
																
																
																/*"sScrollX": "100%",
														        "sScrollXInner": "110%",
														        "bScrollCollapse": true,
														        scrollY:        '50vh',*/
														        
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
																scrollX: true,
																scrollY: 300,
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : function()
																			{
																				return "Date Range Wise Sale GST B2C Report";
																			},
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : function()
																			{
																				return "Date Range Wise Sale GST B2C Report";
																			},
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : function()
																			{
																				return "Date Range Wise Sale GST B2C Report";
																			},
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function()
																			{
																				return "Date Range Wise Sale GST B2C Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						
						var mydata = catmap;
						$('#saleB2CGSTReport').dataTable().fnAddData(mydata);
						
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}


function twoDateExportToGstB2CSaleReport()
{
	var fisDateB2CGST = $('#fisDateB2CGST').val();
	var endDateB2CGST = $('#endDateB2CGST').val();
	
	if(fisDateB2CGST == "" || fisDateB2CGST == null || fisDateB2CGST == " " || fisDateB2CGST == "undefined")
	{
		myAlert("Please Select Start Date");
		return false;
	}
	else
	{}
	if(endDateB2CGST == "" || endDateB2CGST == null || endDateB2CGST == " " || endDateB2CGST == "undefined")
	{
		myAlert("Please Select End Date");
		return false;		
	}
	else
	{}
	
	var table = $('#saleB2CGSTReport').DataTable();
	if( ! table.data().any() )
	{
		myAlert('SALE GST B2C Data Table Is Empty');
	    return false;
	}
	else
	{}
	
	var params = {};
	
	params["fisDateB2CGST"] = fisDateB2CGST;
	params["endDateB2CGST"] = endDateB2CGST;
	
	params["methodName"] = "saleDetailsBetweenTwoDatesB2CGSTReportExportToExcel";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		alert("Data Added Successfully\nFILE EXPORTED TO E:\databackup FOLDER");
		document.UpdateProd.reset();
		location.reload();
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

//Two Date PURCHASE REPORT FOR GST
function purchaseB2BGSTReport()
{
	var params= {};
	var fisDateB2bP = $("#fisDateB2bP").val();
	var endDateB2bP = $("#endDateB2bP").val();

	if(fisDateB2bP == "" || fisDateB2bP == undefined || fisDateB2bP == " " || fisDateB2bP == null)
	{
		myAlert("Please Select Start Date");
		return false;
	}
	
	if(endDateB2bP == "" || endDateB2bP == undefined || endDateB2bP == " " || endDateB2bP == null)
	{
		myAlert("Please Select End Date");
		return false;
	}
	
	params["fisDateB2bP"]= fisDateB2bP;
	params["endDateB2bP"]= endDateB2bP;
	params["methodName"] = "purchaseReportBetweenTwoDatesB2BPurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		$('#purchaseB2BGSTReport').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		if(catmap == "" || catmap == null || catmap == undefined){
			myAlert("No Data Available For Selected Dates");
			return false;
		}

		$(document).ready(function() {
			$('#purchaseB2BGSTReport').DataTable( {
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

					// Total over this page
					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 7 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);

					// Total over this page
					pageTotal = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 8 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);					
					// Total over this page
					pageTotal = api
					.column( 12 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 12 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 13 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 13 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 14 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 14 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					
				},
				
				
				destroy: true,
				searching: true,
				scrollX: true,
				scrollY: 300,
				
				
				/*"sPaginationType": "full_numbers",
		          destroy: true,
		          searching: true,
		          orderable: true,
		          "scrollY": 300,
				  "scrollX": 600,*/
				
/*				destroy : true,
				searching : true,
				"scrollY": 300,
			    "scrollX": true,
			    "bInfo" : false,
			    "bPaginate": false,
*/				
				columns: [
				          {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				          {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				          {"data": "supplierName", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "rollSize", "width": "5%", "defaultContent": ""},
				          {"data": "discountAmount", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "igst", "width": "5%", "defaultContent": ""},
				          {"data": "total", "width": "5%", "defaultContent": ""},
				         /* {"data": "discountAmount" , "width": "5%", "defaultContent": ""},*/
				          {"data": "totalTaxAmount" , "width": "5%", "defaultContent": ""},
				          {"data": "netAmount" , "width": "5%", "defaultContent": ""}
				        ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true,
				                    	 title : function()
				                    	 {
				                    		 return "Date Range Wise Purchase GST B2B Report";
				                    	 }, },
				                     { extend: 'excelHtml5', footer: true,
					                    	 title : function()
					                    	 {
					                    		 return "Date Range Wise Purchase GST B2B Report";
					                    	 }, },
				                     { extend: 'csvHtml5', footer: true,
						                    	 title : function()
						                    	 {
						                    		 return "Date Range Wise Purchase GST B2B Report";
						                    	 }, },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function()
			                    	 {
			                    		 return "Date Range Wise Purchase GST B2B Report";
			                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     }]
			} );
		} );
		var mydata = catmap;
		$('#purchaseB2BGSTReport').dataTable().fnAddData(mydata);
			});
}

function twoDateExportToGstB2BPurchaseReport()
{
	var fisDateB2bP = $('#fisDateB2bP').val();
	var endDateB2bP = $('#endDateB2bP').val();
	
	if(fisDateB2bP == "" || fisDateB2bP == null || fisDateB2bP == " " || fisDateB2bP == "undefined")
	{
		myAlert("Please Select Start Date");
		return false;
	}
	else
	{}
	if(endDateB2bP == "" || endDateB2bP == null || endDateB2bP == " " || endDateB2bP == "undefined")
	{
		myAlert("Please Select End Date");
		return false;		
	}
	else
	{}
	
	var table = $('#purchaseB2BGSTReport').DataTable();
	if( ! table.data().any() )
	{
		myAlert('PURCHASE GST B2B Report Data Table Is Empty');
	    return false;
	}
	else
	{}
	
	var params = {};
	
	params["fisDateB2bP"] = fisDateB2bP;
	params["endDateB2bP"] = endDateB2bP;
	
	params["methodName"] = "purchaseDetailsBetweenTwoDatesB2BGSTReportExportToExcel";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		alert("Data Added Successfully\nFILE EXPORTED TO E:\databackup FOLDER");
		document.UpdateProd.reset();
		location.reload();
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}