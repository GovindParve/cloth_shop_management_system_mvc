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

// CATEGORY DETAILS DIALOG
function categoryDetailsDivAction(a)
{	
	if(a==1)
    {
		// $( "#suppDetailsDiv" ).dialog({height: 420, width:1000});
		$( "#categoryDialogDiv" ).dialog({
			height: 240,
			width: 600,
			
			// autoOpen: false,
			// modal: false,
			resizable: true,
			draggable: false,
			position:
			{
				my: "center",
				at: "center",
				of: window,
				// collision: "none",
			}
		});
		
		document.getElementById("popupblur").style.filter="blur(20px)";
    }
    else
    {
    	$( "#categoryDialogDiv" ).dialog('close');
    	
		document.getElementById("popupblur").style.filter="none";
       	// document.getElementById("suppDetailsDiv").style.display="none";
    }

	$('#catListDiv').load(document.URL +  ' #catListDiv');
}

	
// SUB-CATEGORY DETAILS DIALOG
function subCategoryDetailsDivAction(a)
{	
	if(a==1)
    {
		// $( "#suppDetailsDiv" ).dialog({height: 420, width:1000});
		$("#subCategoryDialogDiv").dialog({
			height: 240,
			width: 600,
			// autoOpen: false,
			// modal: false,
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
		
		document.getElementById("popupblur").style.filter="blur(20px)";
    }
    else
    {
    	$("#subCategoryDialogDiv").dialog('close');
    	document.getElementById("popupblur").style.filter="none";
    }	
	
}

function valProductDetail()
{
	
	
	
	var catId = $("#catIdPD").val();
	var fkSubCatId = $("#fkSubCatId").val();
	var itemName = $("#itemNamePD").val();
	//var vat = $('#vat').val();
	var hsnsacno = $("#hsnsacno").val();
	var vatPattern = /^[0-9]{1,50}$/;
	var isBarcodeProduct = $("#isBarcodeProduct").val();
	//var vatPatternRes = vatPattern.test(vat);

	
	var image= $("#image").val();
	//alert(image);
	
	if (catId != null && catId != "" && catId != " ") {
		if (fkSubCatId != null && fkSubCatId != "" && fkSubCatId != " ") {
			if (itemName != null && itemName != "" && itemName != " ") {
				if (isBarcodeProduct != "selectOption")
				{
					/*if (vatPatternRes)
					{*/
						productDetails();
					/*} else {
						myAlert(" Please Enter Only Numbers In GST % !");
					}
					*/
				}
				else
				{
					myAlert("Please Select Is Barcode Product ?");
				}
			}
			else {
				myAlert("Please Enter Brand Name !");
			}
		} else {
			myAlert("Please Select Sub Category Name !");
		}
	} else {
		myAlert("Please Select Category Name !");
	}
}

function productDetails()
{
	document.getElementById("btn").disabled = true;	
	
	
	var params= {};
	var count = jQuery("#jqGridPD").jqGrid('getGridParam', 'records');
	var allRowsInGrid = $('#jqGridPD').getGridParam('data');
	
	if(count == null || count == "undefined" || count == "" || count == " ")
	{
		count = "0";
	}else{}
	
	var colorFinal = ".";
	var sizeFinal = "."; 
	
	var fff = JSON.stringify(allRowsInGrid);
	if(count == 0)
	{
		var colorFinal = ".";
		var sizeFinal = ".";
		params["colorFinal"] = colorFinal;
		params["sizeFinal"] = sizeFinal;
	}
	else
	{
		for (var i = 0; i < count; i++)
		{
			var colorFinal = allRowsInGrid[i].productColor;
			params["colorFinal" + i] = colorFinal;
			
			var sizeFinal = allRowsInGrid[i].productSize;
			params["sizeFinal" + i] = sizeFinal;
		}
	}
	
	var shopId = $('#shopId').val();
	var itemName= $('#itemNamePD').val();

	var input = document.getElementById('catIdPD'),
	list = document.getElementById('catId_dropPD'),
	i,catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');
		}
	}

	var fkSubCatId = $("#fkSubCatId").val();
	var vat = $("#vat").val();
	var hsnsacno = $("#hsnsacno").val();
	var modelName = $("#modelName").val();
	var popUpProductJspId = $("#popUpProductJspId").val();
	var isBarcodeProduct = $("#isBarcodeProduct").val();
	var image= $('#image').val();
	//alert(image);
	params ["shopId"] = shopId;
	params["itemName"] = itemName;
	params["hsnsacno"] = hsnsacno;
	params["vat"] = vat;
	params["modelName"] = modelName;
	params["catId"] =catId;
	params["fkSubCatId"] =fkSubCatId;
	params["count"] = count;
	params["isBarcodeProduct"] = isBarcodeProduct;
	params["image"] = image;
	
	params["methodName"] = "doProductDetail";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{		
		if(!document.prod) 
		{
			if(popUpProductJspId == "POPUPPRODUCTDATAILS")
			{
				successAlert("Product Added Successfully");
				productDetailsDivAction(0);
				document.getElementById("catIdPD").value = "";
				document.getElementById("fkSubCatId").value = "";
				document.getElementById("itemNamePD").value = "";
				document.getElementById("hsnsacno").value = "";
				document.getElementById("modelName").value = "";
				document.getElementById("productSizePD").value = "";
				//RELOADING ALL ITEMLIST OF GOOD RECEIVE
				$('#itemListDiv').load(document.URL +  ' #itemListDiv');
			}
		}
		else if(document.prod)
		{
			successAlert(data)
		}
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function emptyProductsFields()
{
	document.getElementById("catId").value = "";
	document.getElementById("fkSubCatId").value = "";
	document.getElementById("itemNamePD").value = "";
	document.getElementById("hsnsacno").value = "";
	document.getElementById("modelName").value = "";
	document.getElementById("productSizePD").value = "";
}

/*
$(document).ready(function () {
	var lastsel;
	rownumbers: true,
	$("#jqGrid").jqGrid({
		editurl: 'clientArray',
		colNames:["Color","Size"],
		colModel: [
		           {
		        	   label: 'Color',
		        	   name:  "color",
		        	   width: 150,
		        	   editable: true
		           },
		           {
		        	   label: 'Size',
		        	   name: "size",
		        	   idth: 150,
		        	   editable: true 
		           },
		           ],

		           data:[],
		           sortorder : 'desc',
		           loadonce: true,
		           viewrecords: true,
		           width: 600,
		           shrinkToFit: true,
		           rowNum: 10,
		           pager: "#jqGridPager",
		           'cellEdit':true
	});

	$('#jqGrid').navGrid('#jqGridPager',
			// the buttons to appear on the toolbar of the grid
			{ edit: true, add: true, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
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
*/
function modifypRODUCT()
{
	var pkProductId= $('#pkProductId').val();
	var itemName= $('#itemName').val();
	var commision=$('#commision').val();
	var isVat=$('#isVat').val();
	var vatPercentage=$('#vatPercentage').val();
	var isalternateprod=$('#isalternateprod').val();
	var isItem=$('#isItem').val();

	var params= {};
	params["pkProductId"] = pkProductId;
	params["itemName"] = itemName;
	params["isVat"] = isVat;
	params["vatPercentage"] = vatPercentage;
	params["isalternateprod"] = isalternateprod;
	params["commision"] = commision;
	params["isItem"] = isItem;

	params["methodName"] = "modifyProductDetail";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		successAlert(data);
		document.getElementById("btn").disabled = false;
		document.prod.reset();
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function POHelper()
{
	this.getSubCategories = getSubCategories;
	this.fillItemList = fillItemList;

	function fillItemList()
	{
		var mainCat = $("#catIdPD").val();
		var subcat = $("#fkSubCatId").val();
	}
	function getSubCategories()
	{
		var input = document.getElementById('catIdPD'),
		list = document.getElementById('catId_dropPD'),
		i,catId;
		for (i = 0; i < list.options.length; ++i) {
			if (list.options[i].value === input.value) {
				catId = list.options[i].getAttribute('data-value');
			}

			var mainCat = catId;
		}
		$("#fkSubCatId").empty();
		$("#fkSubCatId").append($("<option></option>").attr("value","").text("Select subcategory"));
		var params= {};
		params["methodName"] = "getSubCategoriesByRootcategory";
		params["catId"]= mainCat;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			$.each(jsonData,function(i,v)
					{
				$("#fkSubCatId").append($("<option></option>").attr("value",i).text(v.subCatName)); 
					});
				}).error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
					}
				});
	}
}
function disable(){
	if(document.itemdel.itemName.value !== "")
	{
		document.itemdel.itemName.disabled = true;
		return false;
	}	
}

function reset()
{
	document.itemdel.reset();
}

var pohelper = new POHelper();
function getAllMAinItem()
{
	var params= {};
	params["methodName"] = "getAllMAinItem";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#itemName').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			var total =   $('#itemName').DataTable( {

				dom: 'Bfrtip',
				buttons: [
				          'copy', 'csv', 'excel', 'pdf', 'print'
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
				                    {"data": "categoryName", "width": "5%", "defaultContent": ""},
				                    {"data": "item_name", "width": "5%", "defaultContent": ""},
				                    {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				                    ],
			} );
		} );
		var mydata = catmap;
		$('#itemName').dataTable().fnAddData(mydata);
			}
	);
}	

function valEditProductDetail()
{
	var itemNameFixed = $('#hiddenItemName').val();
	var dropDownName = $('#product').val();
	
	var itemName = $('#product').val();
	var vat = $('#vat').val();
	var size = $('#size').val();
	var vatPattern = /^[0-9]{1,50}$/;
	var vatPatternRes = vatPattern.test(vat);
	
	if (itemName != null && itemName != "" && itemName != " ")
	{
		/*if (vat != null && vat != "" && vat != " ")
		{
			if (vatPatternRes)
			{
				if (size != null && size != "" && size != " ")
				{*/
					updateProduct();
				/*}
				else
				{
					myAlert("Pleae Enter Size");
					return false;
				}
			}
			else
			{
				myAlert(" Please Enter Only Numbers In GST % !");
				return false;
			}
		}
		else
		{
			myAlert("Please Enter GST % !");
			return false;
		}
*/	}
	else
	{
		myAlert("Please Select Product Name !");
		return false;
	}
}

//Update product Details

function updateProduct()
{
	document.UpdateProd.btn.disabled = true;
	var input = document.getElementById('product'),
	list = document.getElementById('sup_drop'),
	i,fkRootSupId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootSupId = list.options[i].getAttribute('data-value');
		}
	}

	var hiddenItemName = $('#hiddenItemName').val();
	var itemName = $('#itemName').val();
	//var vat = $('#vat').val();
	var hsnsacno = $('#hsnsacno').val();
	var modelName = $('#modelName').val();
	var size = $('#size').val();
	var colorP = $('#colorP').val();
	
	var params = {};
	params["productId"] = fkRootSupId;
	params["itemName"] = itemName;
	params["hsnsacno"] = hsnsacno;
	//params["vat"] = vat;
	params["modelName"] = modelName;
	params["size"] = size;
	params["colorP"] = colorP;
	
	params["methodName"] = "updateProductDetails";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		successAlert(data);
		if(document.UpdateProd)
		{
			document.UpdateProd.reset();
		}	
		document.UpdateProd.btn.disabled =false;
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}



/********* get Product Details ************/
/*
$(document).ready(function ()
{
	var lastsel;
	rownumbers: true,
	$("#jqGrid").jqGrid({
		editurl: 'clientArray',
		colNames:["Color","Size"],
		colModel: [
		           {
		        	   label: 'Color',
		        	   name:  "color",
		        	   width: 150,
		        	   editable: true
		           },
		           {
		        	   label: 'Size',
		        	   name: "size",
		        	   idth: 150,
		        	   editable: true 
		           },
		           ],

		           data:[],
		           sortorder : 'desc',
		           loadonce: true,
		           viewrecords: true,
		           width: 600,
		           shrinkToFit: true,
		           rowNum: 10,
		           pager: "#jqGridPager",
		           'cellEdit':true
	});

	$('#jqGrid').navGrid('#jqGridPager',
			// the buttons to appear on the toolbar of the grid
			{ edit: true, add: true, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },
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
*/

function getSizeInGrid()
{	
	var productSizePD = document.getElementById("productSizePD").value;	
	var params= {};

	params["productSizePD"] = productSizePD;
	params["methodName"] = "setProductSizeController";
	document.getElementById("productSizePD").value = "";

	var count=0;
	var newrow = false;
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		var jsonData = $.parseJSON(data);
		var result = data.length;	
	
			count = jQuery("#jqGridPD").jqGrid('getGridParam', 'records'); 
			var rowdata =$("#jqGridPD").jqGrid('getGridParam','data');
			var ids = jQuery("#jqGridPD").jqGrid('getDataIDs');
			
			for(var j = 0; j < count; j++) 
			{	
				var productSize = rowdata[j].productSize;
				newrow = true;
				/*if(productSizePD == productSize)
				{
					 myAlert("Duplicate Size\nSize Already Entered");
					 return false;
				}
				else
				{
					newrow = true;
				}*/
			}
			if(newrow == true)
			{
				$("#jqGridPD").addRowData(count,jsonData.offer);
			}
			
			$("#jqGridPD").jqGrid({
				
			datatype: "local",

			colNames:[	'Color',
						'Size',
					 ],
			colModel:[ 
			          {
			        	  name:'productColor',
			        	  width:100,
			        	  editable: true,
			          },    
			          {
			        	  name:'productSize',
			        	  width:100,
			          },
			         ],

			          sortorder : 'desc',
			          loadonce: false,
			          viewrecords: true,
			          
			          width: 700,
			          /*width: 200,
			          height: 75,*/
			          shrinkToFit: true,
			          hoverrows: true,
			          rownumbers: true,
			          rowNum: 20,
			          
			          'cellEdit':true,
			          			          			          
			          afterSaveCell: function ()
			          {  
			        	  var rowId =$("#jqGridPD").jqGrid('getGridParam','selrow');  
			        	  var rowData = jQuery("#jqGridPD").getRowData(rowId);
			        	  var productColor = rowData['productColor'];
			        	  var productSize = rowData['productSize'];
			          },
			        	
			          pager: "#jqGridPagerPD",
			});
			if(count==0 || count==null)
			{
				$("#jqGridPD").addRowData(0,jsonData.offer);
			}
			$('#jqGridPD').navGrid('#jqGridPagerPD',
			// the buttons to appear on the toolbar of the grid
			{
				del : true,
				edit : false,						
				add : false,
				search : false,
				refresh : false,
				view : false,
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
			{
				errorTextFormat : function(data)
				{
					return 'Error: '+ data.responseText
				},
				afterComplete : function()
				{							
					$('#jqGridPD').trigger('reloadGrid');
	
					var rowId = $("#jqGridPD").jqGrid('getGridParam','selrow');
					var rowData = jQuery("#jqGridPD").getRowData(rowId);
					var count = jQuery("#jqGridPD").jqGrid('getGridParam','records');
					var allRowsInGrid1 = $('#jqGridPD').getGridParam('data');
					var AllRows = JSON.stringify(allRowsInGrid1);
					
					var ids = jQuery("#jqGridPD").jqGrid('getDataIDs');
					
					var pColor = allRowsInGrid1[j].productColor;
					var pSize = allRowsInGrid1[j].productSize;
				},
			});
	});
			
}

function getProductDetails()
{
	var params= {};

	var input = document.getElementById('product'),
	list = document.getElementById('sup_drop'),
	i,fkRootSupId;
	for (i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			fkRootSupId = list.options[i].getAttribute('data-value');
		}
	}

	$("#itemName").append($("<input/>").attr("value","").text());
	$("#modelName").append($("<input/>").attr("value","").text());
	$("#hsnsacno").append($("<input/>").attr("value","").text());
	$("#size").append($("<input/>").attr("value","").text());
	$("#colorP").append($("<input/>").attr("value","").text());
	$("#catName").append($("<input/>").attr("value","").text());
	$("#subCatName").append($("<input/>").attr("value","").text());

	params["productId"]= fkRootSupId;
	params["methodName"] = "getProductDetailsToEdit";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("itemName").value = v.ProName;
			document.getElementById("modelName").value = v.ModelName;
			document.getElementById("hsnsacno").value = v.hsnsacno;
			document.getElementById("size").value = v.size;
			document.getElementById("colorP").value = v.color;
			document.getElementById("catName").value = v.catName;
			document.getElementById("subCatName").value = v.subCatName;
		});
	}).error(function(jqXHR, textStatus, errorThrown)
	{
		if(textStatus==="timeout")
		{}
	});
}
