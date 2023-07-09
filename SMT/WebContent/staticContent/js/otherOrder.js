



function myAlertFocusToKey(msg)
{
	var dialog = bootbox.dialog({
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
	   });

	   setTimeout(function() {
		dialog.modal('hide');
		document.getElementById("key").focus();		
	   }, 1500);
}

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

function reset1()
{
	document.itemdel.reset();
}
// this function for set value to EmployeeName to Grid Drop Down
var first;
function getEmpName()
{
	var params= {};
	
	params["methodName"] = "getEmpNameforGrid";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)	
	{  
		var jsonData = $.parseJSON(data);
		first = jsonData;
		// myAlert("get Data from DataBase****"+first);
		var catmap = jsonData.list;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}
function getEmpName111()
{
	var params= {};
	
	params["methodName"] = "getEmpNameforGrid";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)	
	{  
		var jsonData = $.parseJSON(data);
		first = jsonData;
		// myAlert("get Data from DataBase****"+first);
		var catmap = jsonData.list;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

//currently not in use
function getitemData1()
{
	var rowDelete = 0;
	var params= {};	
	document.getElementById("discount").value = "";
	/* document.getElementById("discount1").value = ""; */
	
	var value = document.getElementById("key").value;
	var carNo = $('#carNo').val();
	// getEmpName();
	
	if(value == null || value == "" || value == " " || value == undefined)
	{
		var input = document.getElementById('itemName'), list = document
		.getElementById('itemId_drop'), i,barcodeNo, catName, itemName, hsnsacno, productId, size;
		for (i = 0; i < list.options.length; ++i)
		{
			if (list.options[i].value === input.value) {
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
		
	}
	else
	{
		params["key"]=value;
	}

	params["methodName"] ="fetchCust1";
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
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		var jsonData = $.parseJSON(data);
		var result = data.length;
		if(result <= "0")
		{
			myAlertFocusToKey("STOCK NOT AVAILABLE FOR "+value+" !!!");
			return true;
		}
		//code comment by GP
		/*if(result <= "20")
		{
			myAlertFocusToKey("STOCK NOT AVAILABLE FOR "+value+" !!!");
			return true;
		}*/

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
			
			/*getEmpName();
			var empname = first;
			
			getEmpName();
			var empname = first;*/
			
			// myAlert("in grid++++"+empname);
			
			var prodName,com,bar,subCat,size,rollSize;
			var sameRowCount = 1;
			for (var j = 0; j < count; j++) 
			{
				var totalQty = count;
				prodName = rowdata[j].itemName;
				com = rowdata[j].categoryName;
				bar = rowdata[j].barcodeNo;
				subCat = rowdata[j].subCategoryName;
				availQty = rowdata[j].goodReceiveQuantity;
				size = rowdata[j].size1;
				rollSize = rowdata[j].rollSize;
				var rowId = ids[j];
				var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				
				// if (prodName == jsonData.offer.itemName && com ==
				// jsonData.offer.categoryName && bar ==
				// jsonData.offer.barcodeNo && subCat ==
				// jsonData.offer.subCategoryName)
				
				if(+bar > 0)
				{	
					if(bar == jsonData.offer.barcodeNo)
					{					
						sameRowCount++;
						
						if(size == "meter"
							|| size == "Meter"
							|| size == "METER"
							|| size == "MTR"
							|| size == "mtr"
							|| size == "Mtr")
							{
								availQty=availQty*rollSize;
							}
						
						if(Number(sameRowCount) > Number(availQty))
						{					
							myAlert("Available Stock for "+(j+1)+"=>"+bar+"=>"+prodName+"=> "+availQty);
							newrow = false;
							return false;
						}
						else
						{	
							newrow = true;
						}
					}
					else
					{
						newrow = true;
					}
				}
				else
				{
					newrow = true;
				}
			}

			if(newrow == true)
			{
				document.getElementById("totalQuantity").value = totalQty+1;
				$("#list4").addRowData(count,jsonData.offer);			
			}			
			
			$("#list4").jqGrid({
				
				datatype: "local",

				colNames:[	'pk_temp_id',
							'item_id',
							'Barcode<br>Number',
							'Category',
							'fkCategoryId',
							'Sub<br>Category',
							'fkSubCatId',
							'Product',
							'fkProductId',
							'Roll<br>Size',
							'Style',
							'HSN/<br>SAC',
							'Available<br>Quantity',
							'Qty',
							'Size',
							'Good Receive Quantity',
							'S.P./<br>Unit',
							'fixedSalePrice',
							'S.P.<br>W/O Tax',
							'Discount<br>%',
							'Discount<br>Amount',
							'S.P.<br>After Dis',
							'GST<br>%',
							'IGST<br>%',
							'Tax Amt',
							'Tax Amt<br>After Dis',
							'Total<br>Amount',
							'Employee<br>Name',
							'forTotal',
							'fkSuppId'
							
							],
				colModel:[ 
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
				        	  name:'categoryName',
				        	  width:150,
				        	  sortable: false,
				          },
				          {	
				        	  name:'fkCategoryId',
				        	  //width:40,
				        	  hidden:true,
				          },
				          {	
				        	  name:'subCategoryName',
				        	  width:150,
				        	  sortable: false,
				          },
				          {	
				        	  name:'fkSubCatId',
				        	  //width:40,
				        	  hidden:true,
				          },
				          {	
				        	  name:'itemName',
				        	  width:200,
				        	  sortable: false,
				          },
				          {	
				        	  name:'fkProductId',
				        	  //width:40,
				        	  hidden:true,
				          },
				          { 
				        	  name:  "rollSize",
				        	  hidden:true,
				          },
				          {	
				        	  name:'style',
				        	  width:100,				        	  
				          },				          
				          {	
				        	  name:'hsnSacNo',
				        	  width:100,
				        	  sortable: false,
				          },
				          {
				        	  name:'stockQuantity',
				        	  width:100,
				        	  editable: false,
				        	  //hidden:true,
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
				        	  id:'size1',
				        	  name:'size1',
				        	  width:100,
				        	  // editable: true,
				        	  sortable: false,				          
				          },
				          {
				        	  name:'goodReceiveQuantity',
				        	  //width:80,
				        	 hidden:true,
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
				        	//  width:100,
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
				        	  editable: true,
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
				        	 // width:80,
				        	  sortable: false,
				        	  // editable: true,
				        	  hidden:true,
				          },
				          /*{	
				        	  name:'igst',
				        	  width:80,
				        	  // editable: true,
				        	  sortable: false,
				        	  hidden:true,
				          },	*/
				          {	  name:'taxAmount',
				        	  width:105,
				        	  sortable: false,
				        	  //hidden: true,
				          },      
				          {	  
				        	  name:'taxAmountAfterDis',
				        	  width:120,
				        	  sortable: false,
				          },		          
				          {	
				        	  name:'total',
				        	  width:150,
				        	  sortable: false,
				        	  // formatter: sumFmatter
				        	  classes: 'myBackGroundColor',
				          },
				         /*
							 * { name: "employeeName1", width:250,
							 * align:'center', editable:true,
							 * 
							 * edittype: 'select', editoptions: { ladies
							 * //value: "1:Pratiksha Shendage;2:Tabbu
							 * Sayyad;3:Meenakshi Chauhan;4:Gosiya
							 * Shaikh;5:Afreen Mulani;6:yogesh durgude;7:Akshay
							 * Gaikwad;8:Swati Sapkal" value: "1:haridas
							 * gophane;2:Dinesh Navsare;3:Ujjwala Devart;4:sagar
							 * kharat;5:Anjali Lalbhige;6:nitesh dhumal;7:VICKY
							 * MANE" } }
							 */
				          {	
				        	  name:'employeeName1',// this is for take drop // down in grid
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
				        	   formatter: sumFmatter,
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
				          shrinkToFit: true,
				          hoverrows: true,
				          rownumbers: true,
				          rowNum: 30,
				          
				          'cellEdit':true,
				          			          			          
				          afterSaveCell: function ()
				          {  
				        	  document.getElementById("discount").value = "";
				        	  /*
								  document.getElementById("discount1").value = "";
							  */				        	  
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
				        	  var totSPWtax = 0
				        	  var disAmt = 0;
				        	  var finalSP = 0;
				        	  var spWDis = 0;
				        	  var newTaxAmt = 0;
				        	  var newSalePrice = 0;
				        	  var newFinalSP = 0;
				        	  var finalSalePrice = salePrice;
				        	  var finalSpWithoutTax = sPWithoutTax;	
				        	  var checkValue = /^[0-9]+\.?[0-9]*$/;
				        	  var setQty = 1;
				        	  var setZero = "0"; 
				        	  
				        	  var sizeUp = size1.toUpperCase();
				        	  if(sizeUp == "MTR" || sizeUp == "METER")
				        	  {				        		  
				      			if(quantity.match(checkValue))
				      			{	
									if(quantity > stockQuantity) {
										//success
									} else {
					      				myAlert("Quantity should be less than or equal to Available Quantity");
					        			$("#list4").jqGrid("setCell", rowId, "quantity", setQty);
					        			quantity = setQty;
				      				}
								} else {
					      			myAlert("Please Enter Valid Quantity");
					        		$("#list4").jqGrid("setCell", rowId, "quantity", setQty);
					        		quantity = setQty;
				      			}
				        	  }
				        	  
				      		  if(salePrice == "" || salePrice == '0' || salePrice == null || salePrice == undefined)
				      		  {}
				      		  else
				      		  {
				      			if(salePrice.match(checkValue))
				      			{}
				      			else
				      			{
				      				myAlert("Please Enter Valid S,P./Unit");
					        		$("#list4").jqGrid("setCell", rowId, "salePrice", fixedSalePrice);
					        		salePrice = fixedSalePrice;
				      			}
				      		  }
							
							if(salePrice != "" || salePrice != '0' || salePrice != null || salePrice != undefined)
							{
								var gstPer = 0;
								if(salePrice > 0 && salePrice <= 1000) {
									gstPer = 5;
								} else {
									if(salePrice > 1000) {
										gstPer =  12;
									}
								}
								$("#list4").jqGrid("setCell", rowId, "vat", gstPer);
							}
				      		  
				      		if(disPer == "" || disPer == '0' || disPer == null || disPer == undefined)
				      		  {}
				      		  else
				      		  {
				      			if(disPer.match(checkValue))
				      			{
									
								}
				      			else
				      			{
				      				myAlert("Please Enter Valid Dis %");
					        		$("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		disPer = setZero;
				      			}
				      		  } 
				        	  
				        	  var goodReceiveQuantity = rowData['goodReceiveQuantity'];
				        	  var rSizeForStock = rowData['rollSize'];
				        	  var sMeter = goodReceiveQuantity*rSizeForStock;
				        	  
				        	  if(rSizeForStock!="0")
				        	  {  
					        	  if(Number(quantity) > Number(sMeter))
					        	  {					        		  
					        		  myAlert("Available Stock ="+sMeter);
					        		  $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
					        		  quantity=setQty;
					        	  }
				        	  }
				        	  else
			        		  {
				        		 // quantity = ;
				        		  
/*				        		  if(Number(quantity) > Number(goodReceiveQuantity))
					        	  {
					        		  myAlert("Available Stock ="+goodReceiveQuantity);
					        		  $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
					        		  quantity=setQty;
					        	  }*/
				        		 // $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
				        	  }
								
								//Calcutale Total Amount
				        	  tota = quantity * salePrice;
				        	  totAmt = quantity * salePrice;
							
							//Calculate Discount Amount
							var checkDisPer = /^[0-9]+\.?[0-9]*$/;
							 if(disPer.match(checkDisPer) || disPer != "" || disPer!= null)
							 { 								
								 if(Number(disPer) >= 100)
								 {
									 var disP = 0;
									 disAmount = 0;
									 myAlert("Discount Percentage Must Be Less Than 100");
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP);
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 totalCalC(); 
									 totalDisC(); 
									 return false; 
								 }
								 else if(disPer == "0")
								 { 
									 var disP = 0;
									 disAmount = 0; $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP)
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "total", salePrice);
								 }
							}
							else
							{ 
								var setZero = 0;
								var disP = 0;
								if(disPer == "" || disPer == "0")
								{
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP)
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
								}
								else
								{
									 myAlert("Pleaee Enter Valid Discount value");
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero); 
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero); 
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "total", salePrice); totalCalC();
									 totalDisC(); return false;
								}
							}
							
							 var checkSp = /^[0-9]+\.?[0-9]*$/;
							 if(salePrice.match(checkSp))
							 {
								 if(Number(salePrice) > 0)
								 { 
									 spwTax = (salePrice/(1+(gst/100)));
									 $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", spwTax.toFixed(2));
									 
									// rangeGst(salePriceembel);
									 
									 	if(Number(disPer) > 0)
									 	{ 
									 		if(Number(gst) > 0)
									 		{ 
									 			disAmt = (spwTax*(disPer/100)); 
									 			finalSP = spwTax - disAmt; 
									 			
									 			// rangeGst(finalSP);
									 			
									 			newTaxAmt = (((finalSP*quantity)*gst)/100);
									 			var oneProTax = (((finalSP)*gst)/100); 
									 			newFinalSP = finalSP + oneProTax; tota = newFinalSP * quantity;
									 			disAmt = disAmt * quantity; 
									 			vatAmt = vatAmt * quantity;
							 
									 			//$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2));
									 			$("#list4").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
									 			totalCalC(); 
									 			totalDisC(); 
									 		}
									 		else if(Number(gst) == 0)
									 		{
									 			var setZero = 0;
									 			spwTax = salePrice - 0;
									 			disAmt = (spwTax*(disPer/100));
									 		
									 			finalSP = spwTax - disAmt;
									 			newTaxAmt = (((finalSP*quantity)*gst)/100); 
									 			var oneProTax = (((finalSP)*gst)/100); 
									 			newFinalSP = finalSP + oneProTax; 
									 			tota = newFinalSP * quantity; 
									 			disAmt = disAmt * quantity; 
									 			vatAmt = vatAmt * quantity;
									 			// $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
									 			totalCalC(); 
									 			totalDisC(); 
									 		} 
									 	}
/*									 	else if(disAmount > 0)
									 	{
									 		var disP = " "; 
									 		$("#list4").jqGrid("setCell", rowId, "disPerForBill", disP);
							 
											 var checkDisAmt = /^[0-9]+\.?[0-9]*$/; 
											 if(disAmount.match(checkDisAmt))
											 {
												 if(Number(disAmount) >= Number(sPWithoutTax))
												 {
													 var setZero = 0;
													 myAlert("Discount Amount Must Be Less Than Sale Price Withount Tax");
													 $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
													 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
													 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
													 totalCalC();
													 totalDisC(); 
													 return false;
												 }
												 if(Number(disAmount) == 0 || disAmount == "" || disAmount == undefined || disAmount == null)
												 {
													 var setZero = 0; 
													 $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
													 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
													 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
													 totalCalC();
													 totalDisC();
											  }
												 else if(Number(disPer) > 0)
												 {
													 var disA = 0; $("#list4").jqGrid("setCell",rowId, "disAmount", disA);											 
													 if(Number(gst) > 0) 
													 { 
														 disAmt = (spwTax*(disPer/100));
														 finalSP = spwTax - disAmt;
														 newTaxAmt = (((finalSP*quantity)*gst)/100);
														 var oneProTax = (((finalSP)*gst)/100); 
														 newFinalSP = finalSP + oneProTax; tota = newFinalSP * quantity; 
														 disAmt = disAmt * quantity; 
														 vatAmt = vatAmt * quantity;
											 
											 		//	 $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2)); 
														 $("#list4").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
														 $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
														 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
														 totalCalC(); 
														 totalDisC();
													}
													else if(Number(gst) == 0)
													{
														var setZero = 0; spwTax = salePrice - 0;											 
														if(spwTax > 0 && spwTax <= 1000)
														{
															gst = 5; $("#list4").jqGrid("setCell", rowId, "vat", gst);
														} 
														else if(spwTax > 1000) 
														{
															gst = 12;
															$("#list4").jqGrid("setCell", rowId, "vat", gst);
														}
											 
														disAmt = (spwTax*(disPer/100));
														finalSP = spwTax - disAmt; 
														newTaxAmt = (((finalSP*quantity)*gst)/100); 
														var oneProTax = (((finalSP)*gst)/100);
														newFinalSP = finalSP + oneProTax;
														tota = newFinalSP * quantity; 
														disAmt = disAmt * quantity;
														vatAmt = vatAmt * quantity;
											  // $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2)); 
											 $("#list4").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
											 $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
											 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
											 totalCalC(); 
											 totalDisC(); 
											 }
													 }
												 }
											 }
*/									 	else 
									 	{
									 		 var setZero = 0; 
									 		 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
											 $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
											 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
											 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
											 }
									 	}
								 else
								 {
									 var setZero = 0; $("#list4").jqGrid("setCell", rowId, "sPWithoutTax",
									 setZero); $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "total", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero); return
									 false;
									 }
								 }
											 
											
								 else 
								{
									 var setZero = 0; myAlert("Pleae Enter Valid Sale Price");
								 $("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
								 $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);
								 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
								 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
								 $("#list4").jqGrid("setCell", rowId, "total", setZero);
								 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero); return
								 false;
								 
								 }
							
							totalCalC();
				        	totalDisC();
				        	   
				        	  if(gst != "0")
				        	  {
				        		  //vatAmt =  (tota - (tota/(1+(gst/100))));
				        		  //totAmt = +tota + +vatAmt;
									
									vatAmt = (tota/100)*gst;
									totAmt = +tota + +vatAmt;
									roundOffvatAmt = vatAmt.toFixed(2);
									//alert("roundOffvatAmt :- "+roundOffvatAmt);
				        	  }
				        	  
				        	  $("#list4").jqGrid("setCell", rowId, "taxAmount", roundOffvatAmt);
				        	 // $("#list4").jqGrid("setCell", rowId, "total",
								// roundOfftota);
				        	 
				        	  
/*				        	  var checkDisAmt = /^[0-9]+\.?[0-9]*$/;
				        	  if(disAmount.match(checkDisAmt))
				        	  {
				        		  if(Number(disAmount) >= Number(sPWithoutTax))
					        	  {
					        		  var setZero = 0;
					        		  myAlert("Discount Amount Must Be Less Than Sale Price Withount Tax");
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  totalCalC();
						        	  totalDisC();
						        	  return false;
					        	  }
				        		  if(Number(disAmount) == 0)
				        		  {
				        			  var setZero = 0;
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "total", sPWithoutTax);
						        	  totalCalC();
						        	  totalDisC();						        	  
				        		  }
				        		  else
				        		  {
				        			  var setDisPer = ((disAmount/sPWithoutTax)*100);
				        			  // disPer = setDisPer;
				        			  var spwtAfterDis = sPWithoutTax - disAmount;
				        			  var setTaxAmtAftDis = 0;
				        			  if(Number(gst) > 0)
				        			  {
				        				  setTaxAmtAftDis = (spwtAfterDis - (spwtAfterDis/(1+(gst/100))));
				        				  
				        			  }
				        			  else
				        			  {  
				        				  setTaxAmtAftDis = 0;
				        			  }				        			  
				        			  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setDisPer.toFixed(2));
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setTaxAmtAftDis.toFixed(2));
						        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", spwtAfterDis.toFixed(2));
						        	  $("#list4").jqGrid("setCell", rowId, "total", spwtAfterDis.toFixed(2));
				        		  }
				        	  }
				        	  else
				        	  {
				        		  var setZero = 0;
				        		  myAlert("Please Enter valid Discount Amount");
				        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
				        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", sPWithoutTax);
					        	  $("#list4").jqGrid("setCell", rowId, "total", sPWithoutTax);
				        		  return false;
				        	  }
*/				        	  				        	 

							 /*var checkDisPer = /^[0-9]+\.?[0-9]*$/;
							 if(disPer.match(checkDisPer) || disPer != "" || disPer!= null)
							 { 								
								 if(Number(disPer) >= 100)
								 {
									 var disP = 0;
									 disAmount = 0;
									 myAlert("Discount Percentage Must Be Less Than 100");
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP);
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 totalCalC(); 
									 totalDisC(); 
									 return false; 
								 }
								 else if(disPer == "0")
								 { 
									 var disP = 0;
									 disAmount = 0; $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP)
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "total", salePrice);
								 }
							}
							else
							{ 
								var setZero = 0;
								var disP = 0;
								if(disPer == "" || disPer == "0")
								{
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP)
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
								}
								else
								{
									 myAlert("Pleaee Enter Valid Discount value");
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero); 
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero); 
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "total", salePrice); totalCalC();
									 totalDisC(); return false;
								}
							}*/
							 				        	  
							
							
							
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
					        	 }
					        	 else
					        	 {
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
			        	  /*
							 * document.getElementById("discount1").value =
							 * disPer;
							 */
			        	  document.getElementById("discount").value = TotalDisAmt;
				        }							
						},
						closeAfterdel:true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
						reloadAftersubmit:true,	
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					});
				});
			})
}
//Old getitemData1() End
//New getitemData1New Start  Method in Use
function getitemData1New()
{
	var rowDelete = 0;
	var params= {};	
	document.getElementById("discount").value = "";
	/* document.getElementById("discount1").value = ""; */
	
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
	} else {
		params["key"]=value;
	}

	params["methodName"] ="fetchCust1";
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
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		var jsonData = $.parseJSON(data);
		var result = data.length;
		if(result <= "0")
		{
			myAlertFocusToKey("STOCK NOT AVAILABLE FOR 1111"+value+" !!!");
			return true;
		}
		//code comment by GP
		/*if(result <= "20")
		{
			myAlertFocusToKey("STOCK NOT AVAILABLE FOR "+value+" !!!");
			return true;
		}*/

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
			
			/*getEmpName();
			var empname = first;
			
			getEmpName();
			var empname = first;*/
			
			// myAlert("in grid++++"+empname);
			
			var prodName,com,bar,subCat,size,rollSize;
			var sameRowCount = 1;
			for (var j = 0; j < count; j++) 
			{
				var totalQty = count;
				prodName = rowdata[j].itemName;
				com = rowdata[j].categoryName;
				bar = rowdata[j].barcodeNo;
				subCat = rowdata[j].subCategoryName;
				availQty = rowdata[j].goodReceiveQuantity;
				size = rowdata[j].size1;
				rollSize = rowdata[j].rollSize;
				var rowId = ids[j];
				var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				
				// if (prodName == jsonData.offer.itemName && com ==
				// jsonData.offer.categoryName && bar ==
				// jsonData.offer.barcodeNo && subCat ==
				// jsonData.offer.subCategoryName)
				
				if(+bar > 0)
				{	
					if(bar == jsonData.offer.barcodeNo)
					{					
						sameRowCount++;
						
						if(size == "meter"
							|| size == "Meter"
							|| size == "METER"
							|| size == "MTR"
							|| size == "mtr"
							|| size == "Mtr")
							{
								availQty=availQty*rollSize;
							}
						
						if(Number(sameRowCount) > Number(availQty))
						{					
							myAlert("Available Stock for "+(j+1)+"=>"+bar+"=>"+prodName+"=> "+availQty);
							newrow = false;
							return false;
						}
						else
						{	
							newrow = true;
						}
					}
					else
					{
						newrow = true;
					}
				}
				else
				{
					newrow = true;
				}
			}
			if(newrow == true)
			{
				document.getElementById("totalQuantity").value = totalQty+1;
				$("#list4").addRowData(count,jsonData.offer);
			}
			
			$("#list4").jqGrid({
				
				datatype: "local",
				colNames:[	'pk_temp_id','item_id','Barcode<br>Number','Category','fkCategoryId','Sub<br>Category',
							'fkSubCatId','Product','fkProductId','Roll<br>Size','Style','HSN/<br>SAC','Available<br>Quantity',
							'Quantity','Size','Good Receive Quantity','S.P./<br>Unit','fixedSalePrice','S.P.<br>W/O Tax',
							'Discount<br>%','Discount<br>Amount','S.P.<br>After Dis','GST<br>%','IGST<br>%','Tax Amount',
							'Tax Amount<br>After Dis','Total<br>Amount','Employee<br>Name','forTotal','fkSuppId'
						],
				colModel:[
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
								name:'categoryName',
								width:150,
								sortable: false,
							},
							{
								name:'fkCategoryId',
								//width:40,
								hidden:true,
							},
							{
								name:'subCategoryName',
								width:150,
								sortable: false,
							},
							{
								name:'fkSubCatId',
								//width:40,
								hidden:true,
							},
							{
								name:'itemName',
								width:200,
								sortable: false,
							},
							{
								name:'fkProductId',
								//width:40,
								hidden:true,
							},
							{
								name:  "rollSize",
								hidden:true,
							},
							{
								name:'style',
								width:100,
							},
							{
								name:'hsnSacNo',
								width:100,
								sortable: false,
							},
							{
								name:'stockQuantity',
								width:100,
								editable: false,
								//hidden:true,
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
								id:'size1',
								name:'size1',
								width:100,
								//editable: true,
								sortable: false,
							},
							{
								name:'goodReceiveQuantity',
								//width:80,
								hidden:true,
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
								width:100,
								sortable: false,
								//hidden: true,
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
							/*{
								name:'igst',
								width:80,
								//editable: true,
								sortable: false,
								hidden:true,
							},*/
							{
								name:'taxAmount',
								width:105,
								sortable: false,
							},
							{
								name:'taxAmountAfterDis',
								width:120,
								sortable: false,
								//hidden: true,
							},
							{
								name:'total',
								width:150,
								sortable: false,
								//formatter: sumFmatter
								classes: 'myBackGroundColor',
							},
							/*{
								name: "employeeName1", width:250,
								align:'center',
								editable:true,
								edittype: 'select',
								editoptions: {
									ladies
									//value: "1:Pratiksha Shendage;2:Tabbu Sayyad;3:Meenakshi Chauhan;
									4:Gosiya Shaikh;5:Afreen Mulani;6:yogesh durgude;7:Akshay Gaikwad;
									8:Swati Sapkal" value: "1:haridasgophane;
									2:Dinesh Navsare;3:Ujjwala Devart;4:sagar kharat;
									5:Anjali Lalbhige;6:nitesh dhumal;7:VICKY MANE"
								}
							}*/
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
								formatter: sumFmatter,
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
					shrinkToFit: true,
					hoverrows: true,
					rownumbers: true,
					rowNum: 30,
					'cellEdit':true,
					afterSaveCell: function ()
					{
						document.getElementById("discount").value = "";
						/* document.getElementById("discount1").value = "";*/
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
								myAlert("Please Enter Valid Quantity");
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
						//alert("newSalePriceForOneItem 1 :- "+newSalePriceForOneItem);
						spForOneItemAfterDisCal  = salePrice;
						salePriceForOneItemWithaoutTax = salePrice;
						finalSP = tota;
						//alert("spForOneItemAfterDisCal 2 :- "+spForOneItemAfterDisCal);
						//alert("finalSP 1 :- "+finalSP);
						
						var checkSp = /^[0-9]+\.?[0-9]*$/;
						if(salePrice.match(checkSp))
						{
							if(Number(salePrice) > 0)
							{
								//spwTax = (salePrice/(1+(gst/100)));
								spwTax = salePrice;
								salePriceForOneItemWithaoutTax = salePrice;
								$("#list4").jqGrid("setCell", rowId, "fixedSalePrice", salePrice);
								$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", salePriceForOneItemWithaoutTax);
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
							var setZero = 0; myAlert("Pleae Enter Valid Sale Price");
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
							$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", salePriceForOneItemWithaoutTax);
							$("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
							$("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
							$("#list4").jqGrid("setCell", rowId, "spAfterDis", spForOneItemAfterDisCal);
							//spForOneItemAfterDisCal  = tota;
							//finalSP = tota;
							//alert("spForOneItemAfterDisCal in dsp :- "+spForOneItemAfterDisCal);
							//alert("finalSP 1 in dsp :- "+finalSP);
						} else {
							if(disPer.match(checkValue))
							{
								if(Number(disPer) >= 100)
								{
									//var disP = 0;
									//disAmount = 0;
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
										//alert("newSalePriceAfterDiscount After Discount 2 :- "+newSalePriceAfterDiscount);
										spForOneItemAfterDisCal = newSalePriceAfterDiscount/quantity;
										//salePriceForOneItemWithaoutTax = salePriceForOneItemWithaoutTax - spForOneItemAfterDisCal;
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
										//alert("spForOneItemAfterDisCal 1 :- "+spForOneItemAfterDisCal);
									}
								}
							} else {
								newSalePriceAfterDiscount = tota;
								myAlert("Please Enter Valid Discount %");
								$("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
								$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", spForOneItemAfterDisCal.toFixed(2));
								disPer = setZero;
								//spForOneItemAfterDisCal  = tota;
								//spForOneItemAfterDisCal  = salePrice;
								//alert("spForOneItemAfterDisCal 2 :- "+spForOneItemAfterDisCal);
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
									//alert("finalSP In GST 5 3 :- "+finalSP);
									taxAmountForOneItem = newTaxAmt/quantity;
									newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
									//alert("newSalePriceWithoutTax 4 :- "+newSalePriceWithoutTax);
								} else {
									newTaxAmt = (finalSP/100)*gst;
									//finalSP = finalSP + newTaxAmt;
									//finalSP = newSalePrice;
									taxAmountForOneItem = newTaxAmt/quantity;
									newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
									//alert("newSalePriceWithoutTax 5 :- "+newSalePriceWithoutTax);
								}
								//alert("finalSP After GST 5 6 :- "+finalSP);
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
									//alert("finalSP In GST 12 7 :- "+finalSP);
									taxAmountForOneItem = newTaxAmt/quantity;
									newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
									//alert("newSalePriceWithoutTax 8 :- "+newSalePriceWithoutTax);
								} else {
									newTaxAmt = (finalSP/100)*gst;
									//finalSP = finalSP + newTaxAmt;
									taxAmountForOneItem = newTaxAmt/quantity;
									newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
									//alert("newSalePriceWithoutTax 9 :- "+newSalePriceWithoutTax);
								}
								//alert("finalSP After GST 12 10 :- "+finalSP);
								$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newSalePriceWithoutTax.toFixed(2));
								$("#list4").jqGrid("setCell", rowId, "taxAmount", newTaxAmt.toFixed(2));
								$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2));
								$("#list4").jqGrid("setCell", rowId, "total", finalSP.toFixed(2));
							} else {
								//$("#list4").jqGrid("setCell", rowId, "vat", gst);
								if(newSalePriceAfterDiscount > 0)
								{
									newTaxAmt = (newSalePriceAfterDiscount/100)*gst;
									//finalSP = newSalePriceAfterDiscount + newTaxAmt;
									finalSP = newSalePriceAfterDiscount;
									//alert("finalSP In else GST is already inserted 11 :- "+finalSP);
									taxAmountForOneItem = newTaxAmt/quantity;
									newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
									//alert("newSalePriceWithoutTax 12 :- "+newSalePriceWithoutTax);
								} else {
									newTaxAmt = (finalSP/100)*gst;
									//finalSP = finalSP + newTaxAmt;
									taxAmountForOneItem = newTaxAmt/quantity;
									newSalePriceWithoutTax = salePriceForOneItemWithaoutTax - taxAmountForOneItem;
								}
								//alert("finalSP If GST is already inserted 13 :- "+finalSP);
								$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newSalePriceWithoutTax.toFixed(2));
								$("#list4").jqGrid("setCell", rowId, "taxAmount", newTaxAmt.toFixed(2));
								$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2));
								$("#list4").jqGrid("setCell", rowId, "total", finalSP.toFixed(2));
							}
						}
						//Calculate Total Amount And Discount
						totalCalC();
						totalDisC();
						
						/*var goodReceiveQuantity = rowData['goodReceiveQuantity'];
						var rSizeForStock = rowData['rollSize'];
						var sMeter = goodReceiveQuantity*rSizeForStock;
						
						if(rSizeForStock!="0")
						{
							if(Number(quantity) > Number(sMeter))
							{
								myAlert("Available Stock ="+sMeter);
								$("#list4").jqGrid("setCell", rowId, "quantity", setQty);
								quantity=setQty;
							}
						} else {*/
							// quantity = ;
							/*if(Number(quantity) > Number(goodReceiveQuantity))
							{
								myAlert("Available Stock ="+goodReceiveQuantity);
								$("#list4").jqGrid("setCell", rowId, "quantity", setQty);
								quantity=setQty;
							}*/
							// $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
						//}
						
						//Calculate Discount Amount
						/*var checkDisPer = /^[0-9]+\.?[0-9]*$/;
						if(disPer.match(checkDisPer) || disPer != "" || disPer!= null)
						{
								if(Number(disPer) >= 100)
								{
									var disP = 0;
									disAmount = 0;
									myAlert("Discount Percentage Must Be Less Than 100");
									$("#list4").jqGrid("setCell", rowId, "disPerForBill", disP);
									$("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									$("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									totalCalC();
									totalDisC();
									return false; 
								 }
								 else if(disPer == "0")
								 {
									var disP = 0;
									disAmount = 0; 
									$("#list4").jqGrid("setCell", rowId, "disPerForBill", disP);
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "total", salePrice);
								 }
							}
							else
							{ 
								var setZero = 0;
								var disP = 0;
								if(disPer == "" || disPer == "0")
								{
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP)
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
								}
								else
								{
									myAlert("Pleaee Enter Valid Discount value");
									$("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero); 
									$("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									$("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero); 
									$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									$("#list4").jqGrid("setCell", rowId, "total", salePrice);
									totalCalC();
									totalDisC();
									return false;
								}
							}*/
							
							/*var checkSp = /^[0-9]+\.?[0-9]*$/;
							if(salePrice.match(checkSp))
							{
								if(Number(salePrice) > 0)
								{
									spwTax = (salePrice/(1+(gst/100)));
									$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", spwTax.toFixed(2));
									 
									// rangeGst(salePriceembel);
									 
									 	if(Number(disPer) > 0)
									 	{ 
									 		if(Number(gst) > 0)
									 		{ 
									 			//disAmt = (spwTax*(disPer/100));
												disAmt = (tota/100)*discount;
									 			finalSP = spwTax - disAmt; 
									 			
									 			// rangeGst(finalSP);
									 			
									 			newTaxAmt = (((finalSP*quantity)*gst)/100);
									 			var oneProTax = (((finalSP)*gst)/100); 
									 			newFinalSP = finalSP + oneProTax; tota = newFinalSP * quantity;
									 			disAmt = disAmt * quantity; 
									 			vatAmt = vatAmt * quantity;
							 
									 			//$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2));
									 			$("#list4").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
									 			totalCalC(); 
									 			totalDisC(); 
									 		}
									 		else if(Number(gst) == 0)
									 		{
									 			var setZero = 0;
									 			spwTax = salePrice - 0;
									 			disAmt = (spwTax*(disPer/100));
									 		
									 			finalSP = spwTax - disAmt;
									 			newTaxAmt = (((finalSP*quantity)*gst)/100); 
									 			var oneProTax = (((finalSP)*gst)/100); 
									 			newFinalSP = finalSP + oneProTax; 
									 			tota = newFinalSP * quantity; 
									 			disAmt = disAmt * quantity; 
									 			vatAmt = vatAmt * quantity;
									 			// $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
									 			$("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
									 			totalCalC(); 
									 			totalDisC(); 
									 		} 
									 	} else {
										
									 		 var setZero = 0; 
									 		 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
											 $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
											 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
											 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
											 }
									 	}
								 else
								 {
									 var setZero = 0; $("#list4").jqGrid("setCell", rowId, "sPWithoutTax",
									 setZero); $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "total", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero); return
									 false;
									 }
								 }		
								 else 
								{
									 var setZero = 0; myAlert("Pleae Enter Valid Sale Price");
								 $("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
								 $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);
								 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
								 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
								 $("#list4").jqGrid("setCell", rowId, "total", setZero);
								 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
								 return false;
								 }
							
							totalCalC();
				        	totalDisC();*/
				        	   
				        	 /* if(gst != "0")
				        	  {
				        		  //vatAmt =  (tota - (tota/(1+(gst/100))));
				        		  //totAmt = +tota + +vatAmt;
									
									vatAmt = (tota/100)*gst;
									totAmt = +tota + +vatAmt;
									roundOffvatAmt = vatAmt.toFixed(2);
									//alert("roundOffvatAmt :- "+roundOffvatAmt);
				        	  }*/
				        	  
				        	 // $("#list4").jqGrid("setCell", rowId, "taxAmount", roundOffvatAmt);
				        	 // $("#list4").jqGrid("setCell", rowId, "total",
								// roundOfftota);
				        	 
				        	  
/*				        	  var checkDisAmt = /^[0-9]+\.?[0-9]*$/;
				        	  if(disAmount.match(checkDisAmt))
				        	  {
				        		  if(Number(disAmount) >= Number(sPWithoutTax))
					        	  {
					        		  var setZero = 0;
					        		  myAlert("Discount Amount Must Be Less Than Sale Price Withount Tax");
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  totalCalC();
						        	  totalDisC();
						        	  return false;
					        	  }
				        		  if(Number(disAmount) == 0)
				        		  {
				        			  var setZero = 0;
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "total", sPWithoutTax);
						        	  totalCalC();
						        	  totalDisC();						        	  
				        		  }
				        		  else
				        		  {
				        			  var setDisPer = ((disAmount/sPWithoutTax)*100);
				        			  // disPer = setDisPer;
				        			  var spwtAfterDis = sPWithoutTax - disAmount;
				        			  var setTaxAmtAftDis = 0;
				        			  if(Number(gst) > 0)
				        			  {
				        				  setTaxAmtAftDis = (spwtAfterDis - (spwtAfterDis/(1+(gst/100))));
				        				  
				        			  }
				        			  else
				        			  {  
				        				  setTaxAmtAftDis = 0;
				        			  }				        			  
				        			  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setDisPer.toFixed(2));
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setTaxAmtAftDis.toFixed(2));
						        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", spwtAfterDis.toFixed(2));
						        	  $("#list4").jqGrid("setCell", rowId, "total", spwtAfterDis.toFixed(2));
				        		  }
				        	  }
				        	  else
				        	  {
				        		  var setZero = 0;
				        		  myAlert("Please Enter valid Discount Amount");
				        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
				        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", sPWithoutTax);
					        	  $("#list4").jqGrid("setCell", rowId, "total", sPWithoutTax);
				        		  return false;
				        	  }*/  				        	 

							 /*var checkDisPer = /^[0-9]+\.?[0-9]*$/;
							 if(disPer.match(checkDisPer) || disPer != "" || disPer!= null)
							 { 								
								 if(Number(disPer) >= 100)
								 {
									 var disP = 0;
									 disAmount = 0;
									 myAlert("Discount Percentage Must Be Less Than 100");
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP);
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 totalCalC(); 
									 totalDisC(); 
									 return false; 
								 }
								 else if(disPer == "0")
								 { 
									 var disP = 0;
									 disAmount = 0; $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP)
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "total", salePrice);
								 }
							}
							else
							{ 
								var setZero = 0;
								var disP = 0;
								if(disPer == "" || disPer == "0")
								{
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP)
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
								}
								else
								{
									 myAlert("Pleaee Enter Valid Discount value");
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero); 
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero); 
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "total", salePrice); totalCalC();
									 totalDisC(); return false;
								}
							}*/
							
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
					        	 }
					        	 else
					        	 {
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
			        	  /*
							 * document.getElementById("discount1").value =
							 * disPer;
							 */
			        	  document.getElementById("discount").value = TotalDisAmt;
				        }							
						},
						closeAfterdel:true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
						reloadAftersubmit:true,	
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					});
				});
			})
}

function getSrCreditAmount()
{ 
	 var grossTot= document.getElementById("grossTotal").value;
	 if(grossTot == null || grossTot == "" || grossTot == undefined || grossTot == " " || grossTot === 0)
	 {
		 myAlert("Please Enter Barcode Number");
		 document.getElementById("srTransactionId").value = "";
		 return false;
	 }
	
	var srTransactionId = document.getElementById("srTransactionId").value;
	var params= {};

	params["srTransactionId"]=srTransactionId;
	params["methodName"] ="getSrCreditAmountController";
	document.getElementById("srTransactionId").value = "";

	var count=0;
	var newrow = false;
	var rowId;
	var vatAmt = 0;
	var totAmt = 0;
	var totalWithTax = 0;
	var tot = 0;
	var afterDelete;
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		var jsonData = $.parseJSON(data);
		var result = data.length;
		if(result <= "20")
		{
			myAlert("Invalid Transaction ID "+srTransactionId+" !!!");
			document.getElementById("srTransactionId").focus();
			return true;
		}		
		
		$.each(jsonData,function(i,v)
		{
			count = jQuery("#srCreditAmtGrid").jqGrid('getGridParam', 'records'); 
			var rowdata =$("#srCreditAmtGrid").jqGrid('getGridParam','data');
			var ids = jQuery("#srCreditAmtGrid").jqGrid('getDataIDs');
			
			/*
			 * if(count > 0) {
			 * $("#srCreditAmtGrid").addRowData(count,jsonData.offer); }
			 */
			for (var j = 0; j < count; j++) 
			{
				var tId = rowdata[j].transactionId;
				if(srTransactionId == tId)
				{
					 myAlert("Duplicate Transaction ID");
					 return false;
				}
				else
				{
					newrow = true;
				}
			}
			if(newrow == true)
			{
				$("#srCreditAmtGrid").addRowData(count,jsonData.offer);
			}
			
			$("#srCreditAmtGrid").jqGrid({
				
				datatype: "local",

				colNames:[	'pkId',
							'Transaction ID',
							'Amount',
							],
				colModel:[ 
				          {
				        	  name:'pkBillId',
				        	  width:25,
				        	  hidden:true,
				          },    
				          {
				        	  name:'transactionId',
				        	  width:50,
				        	  // hidden:true,
				          },
				          {
				        	  name:'returnTotal',
				        	  width:100,
				        	  sortable: false,				        	  
				          },
				          ],

				          sortorder : 'desc',
				          loadonce: false,
				          viewrecords: true,
				          width: 280,
				          /*height: 100,*/
				          shrinkToFit: true,
				          hoverrows: true,
				          rownumbers: true,
				          rowNum: 10,
				          
				          'cellEdit':true,

				          afterSaveCell: function ()
				          {  
				        	  document.getElementById("discount").value = "";
				        	  /*
								 * document.getElementById("discount1").value =
								 * "";
								 */
				        	  
				        	  var rowId =$("#srCreditAmtGrid").jqGrid('getGridParam','selrow');  
				        	  var rowData = jQuery("#srCreditAmtGrid").getRowData(rowId);
				        	  var pkBillId = rowData['pkBillId'];
				        	  var transactionId = rowData['transactionId'];
				        	  var returnTotal = rowData['returnTotal'];				        	  
				        	},				        	
				        	
				        	 gridComplete: function()
				             {
				            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');				            	 
				            	 document.getElementById("totalCreditAmt").value = parseTotal.toFixed(2);
					        	 var totalAmount = document.getElementById("totalAmount").value;
					         	 var gtUpdate = +totalAmount - +parseTotal;
					        	 if(gtUpdate > 0)
					        	 {
					        		 document.getElementById("grossTotal").value = gtUpdate.toFixed(2);
					        	 }
					        	 else
					        	 { 
					        		 myAlert("Total Amount Is Less Than Total Credit Amount");
					        		 document.getElementById("grossTotal").value = gtUpdate.toFixed(2);
					        	 }				            	 
				             },
				        	
				          pager: "#srJqGridPager",
			});
			if(count==0 || count==null)
			{
				$("#srCreditAmtGrid").addRowData(0,jsonData.offer);
			}
			$('#srCreditAmtGrid').navGrid('#srJqGridPager',

				{ del: true, edit: false, add: false,  search: false, refresh: false, view: false, position: "left", cloneToTop: false },
					{
						editCaption: "The Edit Dialog",
						afterSubmit: function()
						{
							$('#srCreditAmtGrid').trigger('reloadGrid');
						},
						closeAfterdel:true,
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
							$('#srCreditAmtGrid').trigger('reloadGrid');
						},
						closeAfterAdd: true,
						recreateForm: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					},

					{
						afterComplete: function()
						{	
							$('#srCreditAmtGrid').trigger('reloadGrid');
							
							totalCalC();
				        	  
				        	function totalCalC()
					        {	
				        	  var Total = 0;
				        	  var totAmtWithTax = 0;
				        	  var totaAmount = document.getElementById("totalAmount").value;
				        	  var discount = document.getElementById("discount").value;
				        	  var totalCreditAmt = document.getElementById("totalCreditAmt").value;
				        	  
				        	  document.getElementById("totalCreditAmt").value = Total.toFixed(2);
				        	  if(totalCreditAmt == "")
				        	  {
				        		  totalCreditAmt = 0;
				        	  }
				        	  
				        	  var totCAmt = 0;
				        	  var count = jQuery("#srCreditAmtGrid").jqGrid('getGridParam', 'records');
				        	  var allRowsInGrid1 = $('#srCreditAmtGrid').getGridParam('data');
				        	  var AllRows=JSON.stringify(allRowsInGrid1);
				        	  for (var l = 0; l < count; l++)
				        	  {
				        		  creditAmt = allRowsInGrid1[l].returnTotal;
				        		  totCAmt = (+totCAmt + +creditAmt);				        		  
				        	  }
				        	  
				        	  document.getElementById("totalCreditAmt").value = totCAmt;
				        	  var updateGt = (+totaAmount - +totCAmt).toFixed(2);
				        	  if(updateGt > 0)
				        	  {
				        		  document.getElementById("grossTotal").value = updateGt.toFixed(2);
				        	 }
				        	 else
				        	 {
				        		  myAlert("Total Amount Is Less Than Total Credit Amount");
				        		  document.getElementById("grossTotal").value = gtUpdate.toFixed(2);
				        	 }
					        }
						},
						closeAfterdel:true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
						reloadAftersubmit:true,	
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					});
				});
			})
}

function resotherbill()
{
	var mobileno = $('#mobileNo').val();
	var key = $('#key').val();
	var monoPattern = /^\d{10}$/;
	var monoPatternRes = monoPattern.test(mobileno);
	//cashupi_cashAmount = $('#cashupi_cashAmount').val();
	//cashCard_upiAmount = $('#cashCard_upiAmount').val();
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
		resOtherBill();
	} else {
		if(monoPatternRes)
		{
			resOtherBill();
		} else {
			myAlert("Enter Valid 10 Digit Moible Number");
		}
	}
		/*
		 * } else { myAlert("Please Enter mobile number !"); }
		 */
}

function resOtherBill()
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

		var categoryName = allRowsInGrid1[i].categoryName;
		params["categoryName"+i] = categoryName;

		var itemName = allRowsInGrid1[i].itemName;
		params["itemName"+i] = itemName;

		var hsnSacNo = allRowsInGrid1[i].hsnSacNo;
		params["hsnSacNo"+i] = hsnSacNo;

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
		
		var fkProductId = allRowsInGrid1[i].fkProductId;
		params["fkProductId" + i] = fkProductId;	
		
		var fkSubCatId = allRowsInGrid1[i].fkSubCatId;
		params["fkSubCatId" + i] = fkSubCatId;	
		
		var fkCategoryId = allRowsInGrid1[i].fkCategoryId;
		params["fkCategoryId" + i] = fkCategoryId;	
		
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
	
	var billNo=$('#billNo').val();
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
			myAlert("Please Enter Card Amount111");
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
		
		if((+cashCard_upiAmount + +cashCard_cashAmount1) > +grossTotal)
		{
			myAlert("Cash Amount + Card Amount is Greater Than Total Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else if((+cashCard_upiAmount + +cashCard_cashAmount1) < +grossTotal)
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
	params["billNo"] = billNo;
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
	params["methodName"] = "registerOtherBill";

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




function resotherbill1()
{	
	var mobileno = $('#mobileNo').val();
	var key = $('#key').val();
	var monoPattern = /^\d{10}$/;
	var monoPatternRes = monoPattern.test(mobileno);
	cashupi_cashAmount = $('#cashupi_cashAmount').val();
	cashCard_upiAmount = $('#cashCard_upiAmount').val();
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
		resOtherBill1();
	}
	else
	{
		if(monoPatternRes)
		{
			resOtherBill1();
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

function resOtherBill1()
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
		
		var itemName = allRowsInGrid1[i].itemName;
		params["itemName"+i] = itemName;

		var categoryName = allRowsInGrid1[i].categoryName;
		params["categoryName"+i] = categoryName;

		

		var hsnSacNo = allRowsInGrid1[i].hsnSacNo;
		params["hsnSacNo"+i] = hsnSacNo;

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
		
		var fkProductId = allRowsInGrid1[i].fkProductId;
		params["fkProductId" + i] = fkProductId;	
		
		var fkSubCatId = allRowsInGrid1[i].fkSubCatId;
		params["fkSubCatId" + i] = fkSubCatId;	
		
		var fkCategoryId = allRowsInGrid1[i].fkCategoryId;
		params["fkCategoryId" + i] = fkCategoryId;	
		
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
	
	var billNo=$('#billNo').val();
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
	var creditCustomer1 = $('#creditCustomer1').val();
	var CustGst = $('#CustGst').val();
	var mobileNo = $('#mobileNo').val();
	var paymentMode = $('#paymentMode').val();		
	var chequeNum = $('#chequeNum').val();
	var nameOnCheck = $('#nameOnCheck').val();
	var bankName = $('#bankName').val();
	var cardNum = $('#cardNum').val();
	var accNum = $('#accNum').val();
	var totalCreditAmt = $('#totalCreditAmt').val();
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
	var billtype = "Temporay";
	if((+totalAmount - +totalCreditAmt) == +grossTotal)
	{}
	else if(+totalCreditAmt > +totalAmount)
	{
		myAlert("Please Check Total Credit Amount");
		document.custord.btnSubmit.disabled = false;
		return false;
	}
	
	params["billtype"] = billtype;
	params["billNo"] = billNo;
	params["count"] = count;
	params["totalAmount"] = totalAmount;
	params["discount"] = discount;
	params["grossTotal"] = totalAmount;
	//params["grossTotal"] = grossTotal;
	/* params["employee1"] = employee1; */
	params["creditCustomer1"] = creditCustomer1;
	params["CustGst"] = CustGst;
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
	params["methodName"] = "registerOtherBill";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		successAlert("Bill Hold Successfully");
		
		/*if(newBill == "newBill")
		{
			// alert(data);
			//window.open("ghantalwarMensWearOtherBillPDF.jsp");
			//window.open("pehenavaOtherBillPDF.jsp");
			//window.open("Other_Bill_PDF_SM.jsp");
			//location.reload(true);
			window.close();
		}
		else	
		{
			//alert(data);
			//window.open("ghantalwarMensWearOtherBillPDF.jsp");
			//window.open("pehenavaOtherBillPDF.jsp");
			//window.open("Other_Bill_PDF_SM.jsp");
			//location.reload(true);
		}*/
		
	}).error(function(jqXHR, textStatus, errorThrown)
	{
		if(textStatus==="timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}


function getitemData111()
{ 
	var rowDelete = 0;
	var params= {};	
	
	var input = document.getElementById('TempBillNo'),
	list = document.getElementById('Bill_drop5'),
	i,creditCustomer,creditCustomer1;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			Billnoid = list.options[i].getAttribute('data-value');
			tempbillNo = list.options[i].getAttribute('value');
		}
	}
	var tempbillNo = tempbillNo;
	var value = document.getElementById("key1").value;
	//alert(tempbillNo);
	document.getElementById("discount").value = "";
	/* document.getElementById("discount1").value = ""; */
	
	
	var carNo = $('#carNo').val();
	// getEmpName();
	/*if(tempbillNo == null || tempbillNo == "" || tempbillNo == " " || tempbillNo == undefined)
		{
	if(value == null || value == "" || value == " " || value == undefined)
	{*/
		var input = document.getElementById('itemName1'), list = document
		.getElementById('itemId_drop1'), i, catName, itemName, hsnsacno, productId, size;
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
		
		//params["productId"] = productId;
		
	//}}
	
	/*else
	{
		params["key1"]=value;
	}
		}
	else
	{
		params["tempbillNo"]=tempbillNo;
	}*/
	var productid=productId;
	
	if( tempbillNo != undefined  && value == "" && productid == undefined)
		{
		params["tempbillNo"]=tempbillNo;
	//	document.getElementById("TempBillNo").disabled = true;
		}

	if( tempbillNo != undefined  && value != "" && productid == undefined)
		{
		params["key1"]=value;
		//document.getElementById("TempBillNo").disabled = false;
		}

	if( tempbillNo != undefined  && value == "" && productid != undefined)
		{
		params["productId"] = productId;
		//document.getElementById("TempBillNo").disabled = false;
		}

	params["methodName"] ="fetchCust123";
	document.getElementById('key1').value = null;
	document.getElementById('itemName1').value = null;
	
	 document.getElementById("TempBillNo").disabled = true;

	//document.getElementById('TempBillNo').value = null;
	var count=0;
	var newrow;
	var rowId;
	var vatAmt = 0;
	var totAmt = 0;
	var totalWithoutTax = document.getElementById("totalAmount1").value;
	var totalWithTax = 0;
	var tot = 0;
	var afterDelete;
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		var jsonData = $.parseJSON(data);
		var result = data.length;

		if( tempbillNo == undefined)
		{
			myAlertFocusToKey("Please Select Bill First");
			document.getElementById("TempBillNo").disabled = false;
			return false;
		}
		else if(result <= "22" )	
		{
			myAlertFocusToKey(" STOCK NOT AVAILABLE FOR "+value+" !!!");
			return true;
		}

		$.each(jsonData,function(i,v)
		{
			count = jQuery("#list5").jqGrid('getGridParam', 'records'); 
			var rowdata =$("#list5").jqGrid('getGridParam','data');
			var ids = jQuery("#list5").jqGrid('getDataIDs');
			
			function sumFmatter (cellvalue, options, rowObject)
			{						
				var totalWithoutTax = document.getElementById("totalAmount1").value;
				var count = jQuery("#list5").jqGrid('getGridParam', 'records');
				var allRowsInGrid1 = $('#list5').getGridParam('data');
				var rowId =$("#list5").jqGrid('getGridParam','selrow');
				// var rowData = jQuery("#list5").getRowData(rowId);
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
					
					document.getElementById("totalAmount1").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
					document.getElementById("grossTotal1").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
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
		        	
					document.getElementById("totalAmount1").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
					document.getElementById("grossTotal1").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
					document.getElementById("discount1").value = grossDisTotal.toFixed(2);// Math.round(totalWithoutTax);
				}
				
				return total;
			}
			
			getEmpName();
			var empname = first;
			
			getEmpName();
			var empname = first;
			
			getEmpName();
			var empname = first;
			
			// myAlert("in grid++++"+empname);
			
			var prodName,com,bar,subCat,size,rollSize;
			var sameRowCount = 1;
			for (var j = 0; j < count; j++) 
			{
				var totalQty = count;
				prodName = rowdata[j].itemName;
				com = rowdata[j].categoryName;
				bar = rowdata[j].barcodeNo;
				subCat = rowdata[j].subCategoryName;
				availQty = rowdata[j].goodReceiveQuantity;
				size = rowdata[j].size1;
				rollSize = rowdata[j].rollSize;
				var rowId = ids[j];
				var rowData = jQuery('#list5').jqGrid ('getRowData', rowId);
				
				// if (prodName == jsonData.offer.itemName && com ==
				// jsonData.offer.categoryName && bar ==
				// jsonData.offer.barcodeNo && subCat ==
				// jsonData.offer.subCategoryName)
				
				if(+bar > 0)
				{	
					if(bar == jsonData.offer.barcodeNo)
					{					
						sameRowCount++;
						
						if(size == "meter"
							|| size == "Meter"
							|| size == "METER"
							|| size == "MTR"
							|| size == "mtr"
							|| size == "Mtr")
							{
								availQty=availQty*rollSize;
							}
						
						if(Number(sameRowCount) > Number(availQty))
						{					
							myAlert("Available Stock for "+(j+1)+"=>"+bar+"=>"+prodName+"=> "+availQty);
							newrow = false;
							return false;
						}
						else
						{	
							newrow = true;
						}
					}
					else
					{
						newrow = true;
					}
				}
				else
				{
					newrow = true;
				}
			}

			if(newrow == true)
			{
				document.getElementById("totalQuantity1").value = totalQty+1;
				$("#list5").addRowData(count,jsonData.offer);			
			}			
			
			$("#list5").jqGrid({
				
				datatype: "local",

				colNames:[	'pk_temp_id',
							'item_id',
							'Barcode<br>NO',
							'Category',
							'fkCategoryId',
							'Sub<br>Category',
							'fkSubCatId',
							'Product',
							'fkProductId',
							'Roll Size',
							'Style',
							'HSN/SAC',
							'Qty',
							'Size',
							'Good Receive Quantity',
							'S.P./Unit',
							'fixedSalePrice',
							'S.P.<br>W/O<br>Tax',
							'Dis<br>%',
							'Dis<br>Amt',
							'S.P.<br>After<br>Dis',
							'GST<br>%',
							'IGST%',
							'Tax<br>Amt',
							'Tax Amt<br>Aft<br>Dis',
							'Total<br>Amt',
							'Employee<br>Name',
							'forTotal',
							'fkSuppId'
							
							],
				colModel:[ 
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
				        	  width:70,
				        	  sortable: false,				        	  
				          },
				          {	
				        	  name:'categoryName',
				        	  width:170,
				        	  sortable: false,
				          },
				          {	
				        	  name:'fkCategoryId',
				        	  width:40,
				        	  hidden:true,
				          },
				          {	
				        	  name:'subCategoryName',
				        	  width:170,
				        	  sortable: false,
				          },
				          {	
				        	  name:'fkSubCatId',
				        	  width:40,
				        	  hidden:true,
				          },
				          {	
				        	  name:'itemName',
				        	  width:170,
				        	  sortable: false,
				          },
				          {	
				        	  name:'fkProductId',
				        	  width:40,
				        	  hidden:true,
				          },
				          { 
				        	  name:  "rollSize",
				        	  hidden:true,
				          },
				          {	
				        	  name:'style',
				        	  width:100,				        	  
				          },				          
				          {	
				        	  name:'hsnSacNo',
				        	  width:100,
				        	  sortable: false,
				          },
				          {	
				        	  name:'quantity',
				        	  width:70,
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
				        	  id:'size1',
				        	  name:'size1',
				        	  width:80,
				        	  // editable: true,
				        	  sortable: false,				          
				          },
				          {
				        	  name:'goodReceiveQuantity',
				        	  hidden:true,
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
				        	  width:100,
				        	  sortable: false,
				        	  hidden: true,
				          },
				          {	
				        	  name:'sPWithoutTax',
				        	  width:120,
				        	  sortable: false,
				        	  //hidden:true
				        	  classes: 'myBackGroundColor',
				          },
				          {	
				        	  name:'disPerForBill',
				        	  width:100,
				        	  sortable: false,
				        	  editable: true,
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
				        	  width:115,
				        	  sortable: false,
				        	  //editable: true,
				          },
				          {	
				        	  name:'spAfterDis',
				        	  width:120,
				        	  sortable: false,
				        	  hidden:true,
				        	  // editable: true
				          },
				          {	  
				        	  name:'vat',
				        	  width:80,
				        	  sortable: false,
				        	  //editable: true
				          },
				          {	
				        	  name:'igst',
				        	  width:80,
				        	  sortable: false,
				        	  // editable: true,
				        	  hidden:true,
				          },
				          /*{	
				        	  name:'igst',
				        	  width:80,
				        	  // editable: true,
				        	  sortable: false,
				        	  hidden:true,
				          },	*/
				          {	  name:'taxAmount',
				        	  width:105,
				        	  sortable: false,
				        	  // hidden: true,
				          },				          
				          {	  
				        	  name:'taxAmountAfterDis',
				        	  width:110,
				        	  sortable: false,
				          },		          
				          {	
				        	  name:'total',
				        	  width:140,
				        	  sortable: false,
				        	  // formatter: sumFmatter
				        	  classes: 'myBackGroundColor',
				          },
				         /*
							 * { name: "employeeName1", width:250,
							 * align:'center', editable:true,
							 * 
							 * edittype: 'select', editoptions: { ladies
							 * //value: "1:Pratiksha Shendage;2:Tabbu
							 * Sayyad;3:Meenakshi Chauhan;4:Gosiya
							 * Shaikh;5:Afreen Mulani;6:yogesh durgude;7:Akshay
							 * Gaikwad;8:Swati Sapkal" value: "1:haridas
							 * gophane;2:Dinesh Navsare;3:Ujjwala Devart;4:sagar
							 * kharat;5:Anjali Lalbhige;6:nitesh dhumal;7:VICKY
							 * MANE" } }
							 */
				          {	
				        	  name:'employeeName1',// this is for take drop // down in grid
				        	  width:250,
				        	  align:'center',
				        	  sortable: false,
                              editable:true,
                              edittype: 'select', 
                              editoptions: { value:empname}
				          },
				          { 
				        	   name:  "forTotal",
				        	   sortable: false,
				        	   formatter: sumFmatter,
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
				          width: 1300,
				          shrinkToFit: true,
				          hoverrows: true,
				          rownumbers: true,
				          rowNum: 10,
				          
				          'cellEdit':true,
				          			          			          
				          afterSaveCell: function ()
				          {  
				        	  document.getElementById("discount1").value = "";
				        	  /*
								  document.getElementById("discount1").value = "";
							  */				        	  
				        	  var rowId =$("#list5").jqGrid('getGridParam','selrow');  
				        	  var rowData = jQuery("#list5").getRowData(rowId);
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
				        	  var totSPWtax = 0
				        	  var disAmt = 0;
				        	  var finalSP = 0;
				        	  var spWDis = 0;
				        	  var newTaxAmt = 0;
				        	  var newSalePrice = 0;
				        	  var newFinalSP = 0;
				        	  var finalSalePrice = salePrice;
				        	  var finalSpWithoutTax = sPWithoutTax;	
				        	  var checkValue = /^[0-9]+\.?[0-9]*$/;
				        	  var setQty = 1;
				        	  var setZero = "0"; 
				        	  
				        	  var sizeUp = size1.toUpperCase();
				        	  if(sizeUp == "MTR" || sizeUp == "METER")
				        	  {				        		  
				      			if(quantity.match(checkValue))
				      			{}
				      			else
				      			{
					      			myAlert("Please Enter Valid Quantity");
					        		$("#list5").jqGrid("setCell", rowId, "quantity", setQty);
					        		quantity = setQty;
				      			}
				        	  }
				        	  
				      		  if(salePrice == "" || salePrice == '0' || salePrice == null || salePrice == undefined)
				      		  {}
				      		  else
				      		  {
				      			if(salePrice.match(checkValue))
				      			{}
				      			else
				      			{
				      				myAlert("Please Enter Valid S,P./Unit");
					        		$("#list5").jqGrid("setCell", rowId, "salePrice", fixedSalePrice);
					        		salePrice = fixedSalePrice;
				      			}
				      		  }
				      		  
				      		if(disPer == "" || disPer == '0' || disPer == null || disPer == undefined)
				      		  {}
				      		  else
				      		  {
				      			if(disPer.match(checkValue))
				      			{}
				      			else
				      			{
				      				myAlert("Please Enter Valid Dis %");
					        		$("#list5").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		disPer = setZero;
				      			}
				      		  } 
				        	  
				        	  var goodReceiveQuantity = rowData['goodReceiveQuantity'];
				        	  var rSizeForStock = rowData['rollSize'];
				        	  var sMeter = goodReceiveQuantity*rSizeForStock;
				        	  
				        	  if(rSizeForStock!="0")
				        	  {  
					        	  if(Number(quantity) > Number(sMeter))
					        	  {					        		  
					        		  myAlert("Available Stock ="+sMeter);
					        		  $("#list5").jqGrid("setCell", rowId, "quantity", setQty);
					        		  quantity=setQty;
					        	  }
				        	  }
				        	  else
			        		  {
				        		  quantity = 1;
				        		  
/*				        		  if(Number(quantity) > Number(goodReceiveQuantity))
					        	  {
					        		  myAlert("Available Stock ="+goodReceiveQuantity);
					        		  $("#list5").jqGrid("setCell", rowId, "quantity", setQty);
					        		  quantity=setQty;
					        	  }*/
				        		  $("#list5").jqGrid("setCell", rowId, "quantity", setQty);
				        	  }
				        	  tota = quantity * salePrice;
				        	  totAmt = quantity * salePrice;
				        	   
				        	  if(gst != "0")
				        	  {
				        		  vatAmt =  (tota - (tota/(1+(gst/100))));
				        		  totAmt = +tota + +vatAmt;
				        		  roundOffvatAmt = vatAmt.toFixed(2);
				        	  }
				        	  
				        	  $("#list5").jqGrid("setCell", rowId, "taxAmount", roundOffvatAmt);
				        	 // $("#list5").jqGrid("setCell", rowId, "total",
								// roundOfftota);
				        	 
				        	  
/*				        	  var checkDisAmt = /^[0-9]+\.?[0-9]*$/;
				        	  if(disAmount.match(checkDisAmt))
				        	  {
				        		  if(Number(disAmount) >= Number(sPWithoutTax))
					        	  {
					        		  var setZero = 0;
					        		  myAlert("Discount Amount Must Be Less Than Sale Price Withount Tax");
					        		  $("#list5").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  totalCalC();
						        	  totalDisC();
						        	  return false;
					        	  }
				        		  if(Number(disAmount) == 0)
				        		  {
				        			  var setZero = 0;
					        		  $("#list5").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  $("#list5").jqGrid("setCell", rowId, "total", sPWithoutTax);
						        	  totalCalC();
						        	  totalDisC();						        	  
				        		  }
				        		  else
				        		  {
				        			  var setDisPer = ((disAmount/sPWithoutTax)*100);
				        			  // disPer = setDisPer;
				        			  var spwtAfterDis = sPWithoutTax - disAmount;
				        			  var setTaxAmtAftDis = 0;
				        			  if(Number(gst) > 0)
				        			  {
				        				  setTaxAmtAftDis = (spwtAfterDis - (spwtAfterDis/(1+(gst/100))));
				        				  
				        			  }
				        			  else
				        			  {  
				        				  setTaxAmtAftDis = 0;
				        			  }				        			  
				        			  $("#list5").jqGrid("setCell", rowId, "disPerForBill", setDisPer.toFixed(2));
						        	  $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setTaxAmtAftDis.toFixed(2));
						        	  $("#list5").jqGrid("setCell", rowId, "spAfterDis", spwtAfterDis.toFixed(2));
						        	  $("#list5").jqGrid("setCell", rowId, "total", spwtAfterDis.toFixed(2));
				        		  }
				        	  }
				        	  else
				        	  {
				        		  var setZero = 0;
				        		  myAlert("Please Enter valid Discount Amount");
				        		  $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
				        		  $("#list5").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        	  $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
					        	  $("#list5").jqGrid("setCell", rowId, "spAfterDis", sPWithoutTax);
					        	  $("#list5").jqGrid("setCell", rowId, "total", sPWithoutTax);
				        		  return false;
				        	  }
*/				        	  				        	 

							 var checkDisPer = /^[0-9]+\.?[0-9]*$/;
							 if(disPer.match(checkDisPer) || disPer != "" || disPer!= null)
							 { 								
								 if(Number(disPer) >= 100)
								 {
									 var disP = 0;
									 disAmount = 0;
									 myAlert("Discount Percentage Must Be Less Than 100");
									 $("#list5").jqGrid("setCell", rowId, "disPerForBill", disP);
									 $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list5").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 totalCalC(); 
									 totalDisC(); 
									 return false; 
								 }
								 else if(disPer == "0")
								 { 
									 var disP = 0;
									 disAmount = 0; $("#list5").jqGrid("setCell", rowId, "disPerForBill", disP)
									 $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list5").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 $("#list5").jqGrid("setCell", rowId, "total", salePrice);
								 }
							}
							else
							{ 
								var setZero = 0;
								var disP = 0;
								if(disPer == "" || disPer == "0")
								{
									 $("#list5").jqGrid("setCell", rowId, "disPerForBill", disP)
									 $("#list5").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
								}
								else
								{
									 myAlert("Pleaee Enter Valid Discount value");
									 $("#list5").jqGrid("setCell", rowId, "disPerForBill", setZero); 
									 $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list5").jqGrid("setCell", rowId, "spAfterDis", setZero); 
									 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 $("#list5").jqGrid("setCell", rowId, "total", salePrice); totalCalC();
									 totalDisC(); return false;
								}
							}
							 				        	  
							
							 var checkSp = /^[0-9]+\.?[0-9]*$/;
							 if(salePrice.match(checkSp))
							 {
								 if(Number(salePrice) > 0)
								 { 
									 spwTax = (salePrice/(1+(gst/100)));
									 $("#list5").jqGrid("setCell", rowId, "sPWithoutTax", spwTax.toFixed(2));
									 
									// rangeGst(salePriceembel);
									 
									 	if(Number(disPer) > 0)
									 	{ 
									 		if(Number(gst) > 0)
									 		{ 
									 			disAmt = (spwTax*(disPer/100)); 
									 			finalSP = spwTax - disAmt; 
									 			
									 			// rangeGst(finalSP);
									 			
									 			newTaxAmt = (((finalSP*quantity)*gst)/100);
									 			var oneProTax = (((finalSP)*gst)/100); 
									 			newFinalSP = finalSP + oneProTax; tota = newFinalSP * quantity;
									 			disAmt = disAmt * quantity; 
									 			vatAmt = vatAmt * quantity;
							 
									 			//$("#list5").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2));
									 			$("#list5").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
									 			$("#list5").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2)); 
									 			$("#list5").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
									 			$("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
									 			totalCalC(); 
									 			totalDisC(); 
									 		}
									 		else if(Number(gst) == 0)
									 		{
									 			var setZero = 0;
									 			spwTax = salePrice - 0;
									 			disAmt = (spwTax*(disPer/100));
									 		
									 			finalSP = spwTax - disAmt;
									 			newTaxAmt = (((finalSP*quantity)*gst)/100); 
									 			var oneProTax = (((finalSP)*gst)/100); 
									 			newFinalSP = finalSP + oneProTax; 
									 			tota = newFinalSP * quantity; 
									 			disAmt = disAmt * quantity; 
									 			vatAmt = vatAmt * quantity;
									 			// $("#list5").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2)); 
									 			$("#list5").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
									 			$("#list5").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2)); 
									 			$("#list5").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
									 			$("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
									 			totalCalC(); 
									 			totalDisC(); 
									 		} 
									 	}
/*									 	else if(disAmount > 0)
									 	{
									 		var disP = " "; 
									 		$("#list5").jqGrid("setCell", rowId, "disPerForBill", disP);
							 
											 var checkDisAmt = /^[0-9]+\.?[0-9]*$/; 
											 if(disAmount.match(checkDisAmt))
											 {
												 if(Number(disAmount) >= Number(sPWithoutTax))
												 {
													 var setZero = 0;
													 myAlert("Discount Amount Must Be Less Than Sale Price Withount Tax");
													 $("#list5").jqGrid("setCell", rowId, "disPerForBill", setZero);
													 $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
													 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
													 totalCalC();
													 totalDisC(); 
													 return false;
												 }
												 if(Number(disAmount) == 0 || disAmount == "" || disAmount == undefined || disAmount == null)
												 {
													 var setZero = 0; 
													 $("#list5").jqGrid("setCell", rowId, "disPerForBill", setZero);
													 $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
													 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
													 totalCalC();
													 totalDisC();
											  }
												 else if(Number(disPer) > 0)
												 {
													 var disA = 0; $("#list5").jqGrid("setCell",rowId, "disAmount", disA);											 
													 if(Number(gst) > 0) 
													 { 
														 disAmt = (spwTax*(disPer/100));
														 finalSP = spwTax - disAmt;
														 newTaxAmt = (((finalSP*quantity)*gst)/100);
														 var oneProTax = (((finalSP)*gst)/100); 
														 newFinalSP = finalSP + oneProTax; tota = newFinalSP * quantity; 
														 disAmt = disAmt * quantity; 
														 vatAmt = vatAmt * quantity;
											 
											 		//	 $("#list5").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2)); 
														 $("#list5").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
														 $("#list5").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
														 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
														 totalCalC(); 
														 totalDisC();
													}
													else if(Number(gst) == 0)
													{
														var setZero = 0; spwTax = salePrice - 0;											 
														if(spwTax > 0 && spwTax <= 1000)
														{
															gst = 5; $("#list5").jqGrid("setCell", rowId, "vat", gst);
														} 
														else if(spwTax > 1000) 
														{
															gst = 12;
															$("#list5").jqGrid("setCell", rowId, "vat", gst);
														}
											 
														disAmt = (spwTax*(disPer/100));
														finalSP = spwTax - disAmt; 
														newTaxAmt = (((finalSP*quantity)*gst)/100); 
														var oneProTax = (((finalSP)*gst)/100);
														newFinalSP = finalSP + oneProTax;
														tota = newFinalSP * quantity; 
														disAmt = disAmt * quantity;
														vatAmt = vatAmt * quantity;
											  // $("#list5").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2)); 
											 $("#list5").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
											 $("#list5").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
											 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
											 totalCalC(); 
											 totalDisC(); 
											 }
													 }
												 }
											 }
*/									 	else 
									 	{
									 		 var setZero = 0; 
									 		 $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
											 $("#list5").jqGrid("setCell", rowId, "total", tota.toFixed(2));
											 $("#list5").jqGrid("setCell", rowId, "spAfterDis", setZero);
											 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
											 }
									 	}
								 else
								 {
									 var setZero = 0; $("#list5").jqGrid("setCell", rowId, "sPWithoutTax",
									 setZero); $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list5").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list5").jqGrid("setCell", rowId, "total", setZero);
									 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero); return
									 false;
									 }
								 }
											 
											
								 else { var setZero = 0; myAlert("Pleae Enter Valid Sale Price");
								 $("#list5").jqGrid("setCell", rowId, "salePrice", setZero);
								 $("#list5").jqGrid("setCell", rowId, "sPWithoutTax", setZero);
								 $("#list5").jqGrid("setCell", rowId, "disAmount", setZero);
								 $("#list5").jqGrid("setCell", rowId, "spAfterDis", setZero);
								 $("#list5").jqGrid("setCell", rowId, "total", setZero);
								 $("#list5").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero); return
								 false;
								 
								 }
				 				        	  
				        	 totalCalC();
				        	 totalDisC();
				        	  
				        	 function totalCalC()
					        {	
				        	  var Total = 0;
				        	  var totAmtWithTax = 0;
				        	  var totCreditAmt = document.getElementById("totalCreditAmt1").value;
				        	  if(totCreditAmt == "")
				        	  {
				        		  totCreditAmt = 0;
				        	  }else{}				        	  
				        	  var grossTotal = document.getElementById("grossTotal1").value;
				        	  var count = jQuery("#list5").jqGrid('getGridParam', 'records');
				        	  var allRowsInGrid1 = $('#list5').getGridParam('data');
				        	  var AllRows=JSON.stringify(allRowsInGrid1);
				        	  
				        	  for (var k = 0; k < count; k++)
				        	  {
				        		  var Total1 = allRowsInGrid1[k].total;

				        		  if(Total1 != undefined)
				        		  {
				        			  Total = +Total + +Total1;
				        		  }
				        	  }
				        	  
				        	  document.getElementById("totalAmount1").value = Total.toFixed(2);// Math.round(Total);
				        	  var updateGT = (+Total - +totCreditAmt).toFixed(2);
				        	  var totAmt  = document.getElementById("totalAmount1").value;
				        	  
				        	  document.getElementById("grossTotal1").value = updateGT;
				        	  var totAmount = Total.toFixed(2);// Math.round(Total);
					        }
				        	  
				        	function totalDisC()
					        {
					        	  // TOTAL DISCOUNT AMOUNT
					        	  var TotalDisAmt = 0;
					        	  var TotalSPAmt = 0;
					        	  var disPer = 0;
					        	  var totCreditAmt = document.getElementById("totalCreditAmt1").value;
					        	  var totalAmount = document.getElementById("totalAmount1").value;
					        	  if(totCreditAmt == "")
					        	  {
					        		  totCreditAmt = 0
					        	  }else{}
					        	  var count = jQuery("#list5").jqGrid('getGridParam', 'records');
					        	  var allRowsInGrid1 = $('#list5').getGridParam('data');
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
					        	 
					        	  document.getElementById("grossTotal1").value = updateGT;
					        	  document.getElementById("discount1").value = TotalDisAmt;
				        	 }
				        	
				        	 function rangeGst(checkPrice)
				        	 {
				        		 if(+checkPrice > 0 && +checkPrice <= 1000)
			        			  {
			        				  gst = 5;
			        				  $("#list5").jqGrid("setCell", rowId, "vat", gst);
			        			  }
			        			  else if(+checkPrice > 1000)
			        			  {
			        				  gst = 12;
			        				  $("#list5").jqGrid("setCell", rowId, "vat", gst);
			        			  }
			        			  else
			        			  {
			        				  gst = 0;
			        				  $("#list5").jqGrid("setCell", rowId, "vat", gst);
			        			  }
				        	 }
				          },
				          
				          
				          gridComplete: function()
				          {
			            	 var totalAmount = document.getElementById("totalAmount1").value;
			            	 var totCreditAmt = document.getElementById("totalCreditAmt1").value;
			            	 if(totCreditAmt == "")
			            	 {
			            		 document.getElementById("grossTotal1").value = totalAmount;
			            	 }
			            	 else if(totCreditAmt > 0)
			            	 {
			            		 var gtUpdated = +totalAmount - +totCreditAmt;
			            		 
					        	 if(+gtUpdated < 0)
					        	 {
					        		myAlert("Total Amount Is Less Than Total Credit Amount");
					        		document.getElementById("grossTotal1").value = gtUpdated;
					        	 }
					        	 else
					        	 {
					        		 document.getElementById("grossTotal1").value = gtUpdated;
					        	 }
			            	 }
				          },
				          
				          
				          pager: "#jqGridPager1",
			});
			if(count==0 || count==null)
			{
				$("#list5").addRowData(0,jsonData.offer);
				document.getElementById("totalQuantity1").value = 1;
			}
			$('#list5').navGrid('#jqGridPager1',

				{ edit: true, add: false, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
					{
						editCaption: "The Edit Dialog",
						afterSubmit: function()
						{
							$('#list5').trigger( 'reloadGrid' );
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
							$('#list5').trigger('reloadGrid');
						},
						closeAfterAdd: true,
						recreateForm: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					},

					{
						afterComplete: function()
						{
							rowDelete++;
							
							document.getElementById("discount").value = "";	
							document.getElementById("totalQuantity").value = (+document.getElementById("totalQuantity1").value - +1);
							$('#list5').trigger('reloadGrid');
							
							rowDelete = 0;
							
							totalCalC();
				        	totalDisC();
				        	  
				        function totalCalC()
					    {	
			        	  var Total = 0;
			        	  var totAmtWithTax = 0;
			        	  var totalCreditAmt = document.getElementById("totalCreditAmt1").value;
			        	  if(totalCreditAmt == "")
			        	  {
			        		  totalCreditAmt = 0;
			        	  }
			        	  var count = jQuery("#list5").jqGrid('getGridParam', 'records');
			        	  var allRowsInGrid1 = $('#list5').getGridParam('data');
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
			        	  document.getElementById("totalAmount1").value = Total.toFixed(2);// Math.round(Total);
			        	  var gtUpdate = (+Total - +totalCreditAmt).toFixed(2);
			        	  if(+gtUpdate < 0)
			        	  {
			        		  myAlert("Total Credit Amount is Greater Than Total Bill Amount");
			        		  document.getElementById("grossTotal1").value = gtUpdate;
			        	  }
			        	  else
			        	  {
				        	  document.getElementById("grossTotal1").value = gtUpdate;		        		  
			        	  }

			        	  var totAmount = Total.toFixed(2);// Math.round(Total);
					    }
				        	  
			        	function totalDisC()
				        {
			        	  // TOTAL DISCOUNT AMOUNT
			        	  var TotalDisAmt = 0;
			        	  var TotalSPAmt = 0;
			        	  var disPer = 0;
			        	  var count = jQuery("#list5").jqGrid('getGridParam', 'records');
			        	  var allRowsInGrid1 = $('#list5').getGridParam('data');
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
			        	  /*
							 * document.getElementById("discount1").value =
							 * disPer;
							 */
			        	  document.getElementById("discount1").value = TotalDisAmt;
				        }							
						},
						closeAfterdel:true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
						reloadAftersubmit:true,	
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					});
				});
			})
}

function getSrCreditAmount11()
{ 
	 var grossTot= document.getElementById("grossTotal").value;
	 if(grossTot == null || grossTot == "" || grossTot == undefined || grossTot == " " || grossTot === 0)
	 {
		 myAlert("Please Enter Barcode Number");
		 document.getElementById("srTransactionId").value = "";
		 return false;
	 }
	
	var srTransactionId = document.getElementById("srTransactionId1").value;
	var params= {};

	params["srTransactionId1"]=srTransactionId;
	params["methodName"] ="getSrCreditAmountController";
	document.getElementById("srTransactionId1").value = "";

	var count=0;
	var newrow = false;
	var rowId;
	var vatAmt = 0;
	var totAmt = 0;
	var totalWithTax = 0;
	var tot = 0;
	var afterDelete;
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		var jsonData = $.parseJSON(data);
		var result = data.length;
		if(result <= "20")
		{
			myAlert("Invalid Transaction ID "+srTransactionId+" !!!");
			document.getElementById("srTransactionId1").focus();
			return true;
		}		
		
		$.each(jsonData,function(i,v)
		{
			count = jQuery("#srCreditAmtGrid1").jqGrid('getGridParam', 'records'); 
			var rowdata =$("#srCreditAmtGrid1").jqGrid('getGridParam','data');
			var ids = jQuery("#srCreditAmtGrid1").jqGrid('getDataIDs');
			
			/*
			 * if(count > 0) {
			 * $("#srCreditAmtGrid").addRowData(count,jsonData.offer); }
			 */
			for (var j = 0; j < count; j++) 
			{
				var tId = rowdata[j].transactionId;
				if(srTransactionId == tId)
				{
					 myAlert("Duplicate Transaction ID");
					 return false;
				}
				else
				{
					newrow = true;
				}
			}
			if(newrow == true)
			{
				$("#srCreditAmtGrid1").addRowData(count,jsonData.offer);
			}
			
			$("#srCreditAmtGrid1").jqGrid({
				
				datatype: "local",

				colNames:[	'pkId',
							'Transaction ID',
							'Amount',
							],
				colModel:[ 
				          {
				        	  name:'pkBillId',
				        	  width:25,
				        	  hidden:true,
				          },    
				          {
				        	  name:'transactionId',
				        	  width:50,
				        	  // hidden:true,
				          },
				          {
				        	  name:'returnTotal',
				        	  width:100,
				        	  sortable: false,				        	  
				          },
				          ],

				          sortorder : 'desc',
				          loadonce: false,
				          viewrecords: true,
				          width: 280,
				          /*height: 100,*/
				          shrinkToFit: true,
				          hoverrows: true,
				          rownumbers: true,
				          rowNum: 10,
				          
				          'cellEdit':true,

				          afterSaveCell: function ()
				          {  
				        	  document.getElementById("discount1").value = "";
				        	  /*
								 * document.getElementById("discount1").value =
								 * "";
								 */
				        	  
				        	  var rowId =$("#srCreditAmtGrid1").jqGrid('getGridParam','selrow');  
				        	  var rowData = jQuery("#srCreditAmtGrid1").getRowData(rowId);
				        	  var pkBillId = rowData['pkBillId'];
				        	  var transactionId = rowData['transactionId'];
				        	  var returnTotal = rowData['returnTotal'];				        	  
				        	},				        	
				        	
				        	 gridComplete: function()
				             {
				            	 var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');				            	 
				            	 document.getElementById("totalCreditAmt1").value = parseTotal.toFixed(2);
					        	 var totalAmount = document.getElementById("totalAmount1").value;
					         	 var gtUpdate = +totalAmount - +parseTotal;
					        	 if(gtUpdate > 0)
					        	 {
					        		 document.getElementById("grossTotal1").value = gtUpdate.toFixed(2);
					        	 }
					        	 else
					        	 { 
					        		 myAlert("Total Amount Is Less Than Total Credit Amount");
					        		 document.getElementById("grossTotal1").value = gtUpdate.toFixed(2);
					        	 }				            	 
				             },
				        	
				          pager: "#srJqGridPager1",
			});
			if(count==0 || count==null)
			{
				$("#srCreditAmtGrid1").addRowData(0,jsonData.offer);
			}
			$('#srCreditAmtGrid1').navGrid('#srJqGridPager',

				{ del: true, edit: false, add: false,  search: false, refresh: false, view: false, position: "left", cloneToTop: false },
					{
						editCaption: "The Edit Dialog",
						afterSubmit: function()
						{
							$('#srCreditAmtGrid1').trigger('reloadGrid');
						},
						closeAfterdel:true,
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
							$('#srCreditAmtGrid1').trigger('reloadGrid');
						},
						closeAfterAdd: true,
						recreateForm: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					},

					{
						afterComplete: function()
						{	
							$('#srCreditAmtGrid1').trigger('reloadGrid');
							
							totalCalC();
				        	  
				        	function totalCalC()
					        {	
				        	  var Total = 0;
				        	  var totAmtWithTax = 0;
				        	  var totaAmount = document.getElementById("totalAmount1").value;
				        	  var discount = document.getElementById("discount1").value;
				        	  var totalCreditAmt = document.getElementById("totalCreditAmt1").value;
				        	  
				        	  document.getElementById("totalCreditAmt1").value = Total.toFixed(2);
				        	  if(totalCreditAmt == "")
				        	  {
				        		  totalCreditAmt = 0;
				        	  }
				        	  
				        	  var totCAmt = 0;
				        	  var count = jQuery("#srCreditAmtGrid1").jqGrid('getGridParam', 'records');
				        	  var allRowsInGrid1 = $('#srCreditAmtGrid1').getGridParam('data');
				        	  var AllRows=JSON.stringify(allRowsInGrid1);
				        	  for (var l = 0; l < count; l++)
				        	  {
				        		  creditAmt = allRowsInGrid1[l].returnTotal;
				        		  totCAmt = (+totCAmt + +creditAmt);				        		  
				        	  }
				        	  
				        	  document.getElementById("totalCreditAmt1").value = totCAmt;
				        	  var updateGt = (+totaAmount - +totCAmt).toFixed(2);
				        	  if(updateGt > 0)
				        	  {
				        		  document.getElementById("grossTotal1").value = updateGt.toFixed(2);
				        	 }
				        	 else
				        	 {
				        		  myAlert("Total Amount Is Less Than Total Credit Amount");
				        		  document.getElementById("grossTotal1").value = gtUpdate.toFixed(2);
				        	 }
					        }
						},
						closeAfterdel:true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
						reloadAftersubmit:true,	
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					});
				});
			})
}


function ok()
{	
	
	//alert("ok");
	var mobileno = $('#mobileNo1').val();
	var CustGst = $('#CustGst').val();
	var key = $('#key1').val();
	var monoPattern = /^\d{10}$/;
	var monoPatternRes = monoPattern.test(mobileno);
	cashupi_cashAmount = $('#cashupi_cashAmount1').val();
	cashCard_upiAmount = $('#cashCard_upiAmount1').val();
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
		resOtherBill123();
	}
	else
	{
		if(monoPatternRes)
		{
			resOtherBill123();
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

function resOtherBill123()
{
	/* document.getElementById("btnSubmit").disabled = true; */
	document.custord1.btnSubmit1.disabled = true;
	var params= {};
	
	
	var input = document.getElementById('TempBillNo'),
	list = document.getElementById('Bill_drop5'),
	i,creditCustomer,creditCustomer1;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			Billnoid = list.options[i].getAttribute('data-value');
			TempBillNo = list.options[i].getAttribute('value');
		}
	}
	var TempBillNo = TempBillNo;
	//alert(TempBillNo);
	var count = jQuery("#list5").jqGrid('getGridParam', 'records');
	if(count == "0" || count == null || count == undefined || count == "")
	{
		myAlert("Please Enter Barcode");
		document.custord1.btnSubmit1.disabled = false;
		return false;
	}
	var allRowsInGrid1 = $('#list5').getGridParam('data');
	var AllRows=JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++)
	{
		var barcodeNo = allRowsInGrid1[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
				
		var pk_temp_id = allRowsInGrid1[i].pk_temp_id;
		params["pk_temp_id"+i] = pk_temp_id;

		var item_id = allRowsInGrid1[i].item_id;
		params["item_id"+i] = item_id;

		var categoryName = allRowsInGrid1[i].categoryName;
		params["categoryName"+i] = categoryName;

		var itemName = allRowsInGrid1[i].itemName;
		params["itemName"+i] = itemName;

		var hsnSacNo = allRowsInGrid1[i].hsnSacNo;
		params["hsnSacNo"+i] = hsnSacNo;

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
  		  	document.custord1.btnSubmit1.disabled = false;
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
      		  	document.custord1.btnSubmit1.disabled = false;
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
			   		  document.custord1.btnSubmit1.disabled = false;
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
		
		var fkProductId = allRowsInGrid1[i].fkProductId;
		params["fkProductId" + i] = fkProductId;	
		
		var fkSubCatId = allRowsInGrid1[i].fkSubCatId;
		params["fkSubCatId" + i] = fkSubCatId;	
		
		var fkCategoryId = allRowsInGrid1[i].fkCategoryId;
		params["fkCategoryId" + i] = fkCategoryId;	
		
		var style = allRowsInGrid1[i].style;
		params["style" + i] = style;
		
		var fkSuppId = allRowsInGrid1[i].fkSuppId;
		params["fkSuppId" + i] = fkSuppId;
	}	
	
	var count1 = jQuery("#srCreditAmtGrid1").jqGrid('getGridParam', 'records');
	if(count1 == "0" || count1 == null || count1 == undefined || count1 == "")
	{
	}
	else
	{		
		var allRowsInGrid = $('#srCreditAmtGrid1').getGridParam('data');
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
	
	//var billNo=$('#billNo1').val();
	var totalAmount=$('#totalAmount1').val();
	var discount=$('#discount1').val();
	if(discount == "")
	{
		discount = 0;
	}
	var grossTotal=$('#grossTotal1').val();
	if(grossTotal < 0)
	{
		myAlert("Please Check Gross Total");
		document.custord1.btnSubmit1.disabled = false;
		return false;
	}
	
	/* var employee1 = $('#employee1').val(); */
	var creditCustomer1 = $('#creditCustomer11').val();
	var mobileNo = $('#mobileNo1').val();
	var paymentMode = $('#paymentMode1').val();		
	var chequeNum = $('#chequeNum1').val();
	var nameOnCheck = $('#nameOnCheck1').val();
	var bankName = $('#bankName1').val();
	var cardNum = $('#cardNum1').val();
	var accNum = $('#accNum1').val();
	var CustGst = $('#CustGst').val();
	var totalCreditAmt = $('#totalCreditAmt1').val();
	var cashCard_cashAmount = "";
	var cashCard_cardAmount = "";
	var cashAmount = "";
	var cardAmount = "";
	var UpiAmount = "";
	if(paymentMode == "cashAndCard")
	{
		cashCard_cashAmount = $('#cashCard_cashAmount1').val();
		cashCard_cardAmount = $('#cashCard_cardAmount1').val();
		if(cashCard_cashAmount == undefined || cashCard_cashAmount == null || cashCard_cashAmount == "" || cashCard_cashAmount == " ")
		{
			myAlert("Please Enter Cash Amount");
			document.custord1.btnSubmit1.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cashAmount.match(checkCashAmt))
			{
				params["cashCard_cashAmount1"] = cashCard_cashAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord1.btnSubmit1.disabled = false;
				return false;
			}
		}
		if(cashCard_cardAmount == undefined || cashCard_cardAmount == null || cashCard_cardAmount == "" || cashCard_cardAmount == " ")
		{
			myAlert("Please Enter Card Amount");
			document.custord1.btnSubmit1.disabled = false;
			return false;
		}
		else
		{
			var checkCardAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cardAmount.match(checkCardAmt))
			{
				params["cashCard_cardAmount1"] = cashCard_cardAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord1.btnSubmit1.disabled = false;
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
		cashCard_cashAmount1 = $('#cashCard_cashAmount11').val();
		cashCard_upiAmount = $('#cashCard_upiAmount1').val();
		if(cashCard_cashAmount1 == undefined || cashCard_cashAmount1 == null || cashCard_cashAmount1 == "" || cashCard_cashAmount1 == " ")
		{
			myAlert("Please Enter Cash Amount");
			document.custord1.btnSubmit1.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cashAmount1.match(checkCashAmt))
			{
				
				
				//alert(cashupi_cashAmount+"in if");
				params["cashCard_cashAmount11"] = cashCard_cashAmount1;
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
				params["cashCard_upiAmount1"] = cashCard_upiAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord1.btnSubmit1.disabled = false;
				return false;
			}
		}
		
		if((+cashupi_cashAmount + +cashCard_upiAmount) > +grossTotal)
		{
			myAlert("Cash Amount + Card Amount is Greater Than Total Amount");
			document.custord1.btnSubmit1.disabled = false;
			return false;
		}
		else if((+cashupi_cashAmount + +cashCard_upiAmount) < +grossTotal)
		{
			myAlert("Cash Amount + Card Amount is Less Than Total Amount");
			document.custord1.btnSubmit1.disabled = false;
			return false;
		}
	}
	
	
	
	
	
	
	//var TempBillNo = $('#TempBillNo').val();
	
	var newBill = $('#newBill').val();
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	
	if((+totalAmount - +totalCreditAmt) == +grossTotal)
	{}
	else if(+totalCreditAmt > +totalAmount)
	{
		myAlert("Please Check Total Credit Amount");
		document.custord1.btnSubmit1.disabled = false;
		return false;
	}
	var billtype = "Permanent";
	params["TempBillNo"] = TempBillNo;
	params["billtype"] = billtype;
	//params["billNo1"] = billNo;
	params["count"] = count;
	params["totalAmount1"] = totalAmount;
	params["discount1"] = discount;
	params["grossTotal1"] = totalAmount;
	//params["grossTotal"] = grossTotal;
	/* params["employee1"] = employee1; */
	params["creditCustomer11"] = creditCustomer1;
	params["mobileNo1"] = mobileNo;
	params ["paymentMode1"] = paymentMode;
	params ["chequeNum1"] = chequeNum;
	params ["nameOnCheck1"] = nameOnCheck;
	params ["bankName1"] = bankName;
	params ["cardNum1"] = cardNum;
	params ["accNum1"] = accNum;
	params["userType"] = userType;
	params["userName"] = userName;
	params["count1"] = count1;	
	params["totalCreditAmt1"] = totalCreditAmt;
	params["cashAmount1"] = cashAmount;
	params["cardAmount1"] = cardAmount;
	params["UpiAmount1"] = UpiAmount;
	params["CustGst"] = CustGst;
	params["methodName"] = "registerOtherBill123";

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




//************************ Edit Sale Invoce New Code *************************/


function getSaleInvoceBillNonGridDetailsByBillNoForTaxInvoiceHoldBillEditAndPrintBilling()
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
	params["methodName"] = "getSaleInvoceBillNonGridDetailsByBillNoForTaxInvoiceHoldBillEditAndPrintBilling";
	
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
					
					/*$(document).ready(function(){
						$("#paymentMode").change(function(){
							$(this).find("option:selected").each(function(){*/
					if($(this).attr("paymentMode")=="cheque")
					{
						$("#cheque_no").show();
						$("#neft_acc_no").hide();
						$("#card_no").hide();
						$("#card_without_cash").hide();
						$("#cash_and_card").hide();
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
						$("#upi_withaout_cash").hide();
						$("#cash_and_upi").hide();
						document.getElementById("cashCard_cashAmount").value = v.oldCashAmount;
						document.getElementById("cashAndCard_cardAmount").value = v.oldCardAmount;
					}
					else if($(this).attr("paymentMode")=="cashAndupi")
					{
						$("#cash_and_upi").show();
						$("#card_without_cash").hide();
						$("#cash_and_card").hide();
						$("#upi_withaout_cash").hide();
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


function getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForTaxInvoiceHoldBillEditAndPrintBillingValidation()
{
	var billNo = $('#billNoBW').val();
	
	if(billNo == "" ||billNo == " " ||billNo == undefined || billNo == null)
	{
		myAlert("Please Enter Bill Number !!!");
		document.getElementById("key").value = "";
		document.getElementById("itemName").value = "";
		return false;
	}
	getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForTaxInvoiceHoldBillEditAndPrintBilling();
}


function getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForTaxInvoiceHoldBillEditAndPrintBilling()
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
	params["methodName"] = "getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForTaxInvoiceHoldBillEditAndPrintBilling";
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
					//alert("finalSP :- "+finalSP);
					
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
						var setZero = 0; myAlert("Pleae Enter Valid Sale Price");
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
						//alert("spForOneItemAfterDisCal in dsp :- "+spForOneItemAfterDisCal);
						//alert("finalSP 1 in dsp :- "+finalSP);
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
							//alert("spForOneItemAfterDisCal 2 :- "+spForOneItemAfterDisCal);
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


function taxInvoiceHoldBillEditAndPrintBillingSaveValidation()
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
	
	if(mobileno == null || mobileno == "" || mobileno == " ")
	{
		taxInvoiceHoldBillEditAndPrintBillingSave();
	} else {
		if(monoPatternRes)
		{
			taxInvoiceHoldBillEditAndPrintBillingSave();
		} else {
			myAlert("Enter Valid 10 Digit Moible Number");
		}
	}
}

function taxInvoiceHoldBillEditAndPrintBillingSave()
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
  	  	} else {
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
		} else {			
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
		} else {
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
	params["methodName"] = "taxInvoiceHoldBillEditAndPrintBillingSave";

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



















