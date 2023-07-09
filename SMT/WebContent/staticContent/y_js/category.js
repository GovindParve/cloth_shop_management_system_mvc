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

function goEditCatagoryFrom()
{
	window.location = "EditCategory.jsp";
}

function valAddMainCat()
{	
	var categoryName= $('#categoryName').val();
	var patt = /^[a-zA-Z ]+$/;
	var t = patt.test(categoryName);

	if(categoryName != null && categoryName != "" && categoryName != " ")
	{
		if(categoryName.match(patt))
		{
			categoryd();
		}
		else{
			myAlert("Enter only Alphabets.");
		}
	}
	else
	{
		myAlert("Please Enter Category name");
	}
}

function categoryd()
{
	category();
}

function category()
{	
	if(document.cat)
	{
		document.cat.btn.disabled = true;
	}	
	
	var categoryName = $('#categoryName').val();
	var popUpCatJspId = $('#popUpCatJspId').val();
	var activeYn = $('#activeYn').val();
	var isleafCat = $('#isleafCat').val();
	var isrootCat = $('#isrootCat').val();
	var shopId = $('#shopId').val();
	var params= {};
	params ["categoryName"] = categoryName;
	params ["activeYn"] = activeYn;
	params ["isleafCat"] = isleafCat;
	params ["isrootCat"] = isrootCat;
	params ["shopId"] = shopId;
	params["methodName"] = "regCategory";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{ 
		if(!document.cat)
		{	
			if(popUpCatJspId == "POPUPCATDATAILS")
			{
				successAlert("Category Added Successfully");
				categoryDetailsDivAction(0);
				document.getElementById("categoryName").value = "";
				//RELOADING ALL DIV WHEREVER NEEDED AFTER ADDING CATEGORY
				
				$('#categoryListForSubCat').load(document.URL +  ' #categoryListForSubCat');
				$('#categoryListOfProductDetails').load(document.URL +  ' #categoryListOfProductDetails');
			}
		}
		else if(document.cat)
		{
			successAlert(data);
		}
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function emptyCatFields()
{
	document.getElementById("categoryName").value = "";
}

function catkHelper()
{
	var offerList="";
	this.getAllCategory = getAllCategory;
	this.fillCategoryList = fillCategoryList;
	function fillCategoryList()
	{
		var categoryName = $("#categoryName").val();
	}
	function getAllCategory()
	{
		var params= {};
		params["methodName"] = "getAllCategoryReport";
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			successAlert(data)
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$.each(jsonData,function(i,v)
					{
				var categoryName =v.categoryName;
				jsonData[jsonData]={categoryName:""};
				$("#list4").jqGrid({
					datatype: "local",
					height: 100,
					colNames:['categoryName', ],
					colModel:[
					          {name:'categoryName',
					        	  width:140  
					          }
					          ],

					          sortname: 'ID',
					          sortorder : 'desc',
					          loadonce: true,
					          viewrecords: true,
					          caption: "Category table",
				});
				$("#list4").addRowData(i,jsonData[i]);
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
						$(loaderObj).hide();
						$(loaderObj).find('#errorDiv').show();
					}
				});
	}
}
var category11 = new catkHelper();

function getAllMAinCaregory()
{
	var params= {};
	params["methodName"] = "getAllMAinCaregoryShopWise";
	//params["methodName"] = "getAllMAinCaregory";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		$('#catName').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			var total =   $('#catName').DataTable( {
				
				 fnRowCallback : function(nRow, aData, iDisplayIndex){
		        	  $("th:first", nRow).html(iDisplayIndex +1);
		        	  return nRow;
		        	 },
				         
				         "sPaginationType": "full_numbers",
				          destroy: true,
				          searching: true,
				          //orderable: true,
				          "paging":  true,
				          "ordering": false,
				          "info":     true,
				          "scrollY": 300,
				          "scrollX": true,
				        
			       
				          columns: [
				                    {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				                    {"data": "categoryName", "width": "5%", "defaultContent": ""},
				                   ],
				                   
				                   dom: 'Bfrtip',
				   				buttons: [
				   				          /*'copy', 'csv', 'excel', 'pdf', 'print',*/
				   					 
				   	                     {
				   	                    	 extend: 'copyHtml5', footer: true, 
				   	                    	 title : function()
				   	                    	 {
				   	                    		 return "Category List";
				   	                    	 },
				   	                    	 orientation : 'landscape',
				   	                    	 pageSize : 'LEGAL',
				   	                    	 titleAttr : 'PDF'
				   	                     },
				   	                     {
				   	                    	 extend: 'excelHtml5', footer: true, 
				   	                    	 title : function()
				   	                    	 {
				   	                    		 return "Category List";
				   	                    	 },
				   	                    	 orientation : 'landscape',
				   	                    	 pageSize : 'LEGAL',
				   	                    	 titleAttr : 'excel',
				   	                    },
				   	                    {
				   	                    	extend: 'csvHtml5', footer: true, 
				   	                    	 title : function()
				   	                    	 {
				   	                    		 return "Category List";
				   	                    	 },
				   	                    	 orientation : 'landscape',
				   	                    	 pageSize : 'LEGAL',
				   	                    	 titleAttr : 'csv', 
				   	                    },
				   	                     { extend : 'pdfHtml5', footer: true,
				   	                    	 title : function()
				   	                    	 {
				   	                    		 return "Category List";
				   	                    	 },
				   	                    	 orientation : 'landscape',
				   	                    	 pageSize : 'LEGAL',
				   	                    	 titleAttr : 'PDF', 
				   	                     } ]
			} );
		} );

		var mydata = catmap;
		$('#catName').dataTable().fnAddData(mydata);
			}
	);
}	

function getAllMainSubCategory(){
	var params= {};
	params["methodName"] = "getAllMainSubCategory";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		$('#catName').dataTable().fnClearTable();
		
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			var total =   $('#catName').DataTable( {
			
				"sPaginationType": "full_numbers",
				          destroy: true,
				          searching: true,
				          //orderable: true,
				          "paging":   true,
				          "ordering": false,
				          "info":     true,
				          "scrollY": 300,
				          "scrollX": true,
			
				dom: 'Bfrtip',
				/*buttons: [
				          'copy', 'csv', 'excel', 'pdf', 'print'
				          ],*/
				
				buttons: [			          
			          	{
			                extend: 'copyHtml5',
			                title: 'Sub Category List',
			            },
			            {
			                extend: 'csvHtml5',
			                title: 'Sub Category List',
			            },
			            {
			                extend: 'excelHtml5',
			                title: 'Sub Category List',
			            },
			            {
			                extend: 'pdfHtml5',
			                title: 'Sub Category List',
			            }, /*'print',*/				          
			            {
			                extend: 'print',
			                title: 'Sub Category List',
			            },
			          ],
			          
				          fnRowCallback : function(nRow, aData, iDisplayIndex){
				        	  $("th:first", nRow).html(iDisplayIndex +1);
				        	  return nRow;
				          },
				          "sPaginationType": "full_numbers",
				          destroy: true,
				          searching: true,
				          orderable: true,
				          columns: [
				                    {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				                    {"data": "subcatName", "width": "5%", "defaultContent": ""},
				                    {"data": "catName", "width": "5%", "defaultContent": ""},
				                    ],
			} );
		} );
		var mydata = catmap;
		$('#catName').dataTable().fnAddData(mydata);
			}
	);
}

function reNamecategory()
{
	document.getElementById("btn").disabled = true;
	var input = document.getElementById('catId'),
	list = document.getElementById('catId_drop'),
	i,pk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			pk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	var reNameCat= $('#reNameCat').val();
	var activeYn = $('#activeYn').val();
	var params= {};

	params ["reNameCat"] = reNameCat;
	params ["pk_cat_id"] = pk_cat_id;
	params["methodName"] = "reNameCategory";

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

function deleteCategory()
{
	
	var categoeryname=$('#categoryName').val();
	if(categoeryname == null || categoeryname == "" || categoeryname == " " || categoeryname == undefined)
	{
		myAlert("Please Select Category.");
		return false;
	}
	document.cat.deleteCatBtn.disabled = true;
	//document.getElementById("deleteCatBtn").disabled = true;
	var input = document.getElementById('categoryName'),
	list = document.getElementById('catId_drop'),
	i,pk_cat_id;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			pk_cat_id = list.options[i].getAttribute('data-value');
		}
	}
	
	var params= {};

	params ["pk_cat_id"] = pk_cat_id;
	params["methodName"] = "deleteCategory";

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