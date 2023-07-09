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

function goEditSubCatagoryFrom()
{
	window.location = "EditSubcategory.jsp";
}

function valsubCat()
{
	var fkRootcatId = $("#fkRootcatId").val();
	var subcategoryName = $("#subcategoryName").val();
	
	if (fkRootcatId == "")
	{
		myAlert("Please Select Category Name.");
		return false;
	}
	if (subcategoryName == "" )
	{
		myAlert("Please Enter Sub Category Name.");
		return false;
	}
	var letterNumber = /^[a-zA-Z ]+$/;  
	if(subcategoryName.match(letterNumber))   
	{  
		subcate();
	}  
	else  
	{   
		myAlert( "Enter Alphabets only.");
		return false;   
	}  
}

function subcate()
{
	if(document.subCat)
	{
		document.subCat.subCatBtn1.disabled = true;
	}
	
	var shopId = $('#shopId').val();
	var subcatName= $('#subcategoryName').val();
	var popUpSubCatJspId = $('#popUpSubCatJspId').val();
	var activeYn = $('#activeYn').val();
	var isLeafCatId=$('#isLeafCatId').val();
	var isrootCat =$('#isrootCat').val();
	var input = document.getElementById('fkRootcatId'),
	list = document.getElementById('fkRootcatId_drop'),
	i,fkRootcatId;
	for(i = 0; i < list.options.length; ++i)
	{
		if (list.options[i].value === input.value)
		{
			fkRootcatId = list.options[i].getAttribute('data-value');
		}
	}
	
	if(fkRootcatId == null || fkRootcatId == "" || fkRootcatId == " " || fkRootcatId == undefined)
	{
		myAlert("Category Is Not Registered");
		return false;
	}
	
	var params= {};

	params ["shopId"] = shopId;
	params ["subcatName"] = subcatName;
	params ["activeYn"] = activeYn;
	params ["isLeafCatId"] = isLeafCatId;
	params ["isrootCat"] = isrootCat;
	params ["fkRootcatId"] = fkRootcatId;
	params["methodName"] = "regSubCategory";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		if(!document.subCat) 
		{
			if(popUpSubCatJspId == "POPUPSUBCATDATAILS")
			{
				successAlert("Sub Category Added Successfully");
				subCategoryDetailsDivAction(0);
				document.getElementById("fkRootcatId").value = "";
				document.getElementById("subcategoryName").value = "";
				$('#catgoryDivOfProductDetails').load(document.URL +  ' #catgoryDivOfProductDetails');
				//$('#subCategoryDialogDiv').load(document.URL +  ' #subCategoryDialogDiv');
			}
		}
		else
		{
			successAlert("Sub Category Added Successfully");
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

function emptySubCatFields()
{
	document.getElementById("fkRootcatId").value = "";
	document.getElementById("subcategoryName").value = "";
}

function getsubCategory()
{
	var input = document.getElementById('catId'),
	list1 = document.getElementById('catId_drop'),
	i,catId;
	for (i = 0; i < list1.options.length; ++i) {
		if (list1.options[i].value === input.value) {
			catId = list1.options[i].getAttribute('data-value');
		}
	}
	$("#subcatId").empty();
	$("#subcatId").append($("<option></option>").attr("value","").text("Select Sub Category"));
	var params = {};
	params["catId"] =catId;
	params["methodName"] = "getSubCategoriesByRootcategory";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var count = 1;
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			$("#subcatId").append($("<option></option>").attr("value",v.subCatId).text(v.subCatName+","+v.subCatId));
			count++;
		});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
				}
			});
}

function reNameSubcategory()
{
	document.getElementById("btn").disabled = true;
	var selectedSubCatId = $('#subcatId').val();
	
	//var subcatId = selectedSubCatId.value;
	var reNameCat= $('#reNameCat').val();
	var params= {};
	params ["reNameCat"] = reNameCat;
	params ["subcatId"] = selectedSubCatId;

	params["methodName"] = "reNameSubCategory";

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
function deleteSubCatagory()
{	
	
	
	
	var addcatgry = $("#catId").val();
	var subcatId = $("#subcatId").val();
	
	var subcatId = document.getElementById('subcatId');
	var pk_SubCat_id = subcatId.value;
	//var pk_Cat_id = addcatgry.value;
	if(addcatgry == null || addcatgry == "" || addcatgry == " " || addcatgry == undefined)
	{
		myAlert("Please Select Category");
		return false;
	}
	
	var subcatId = document.getElementById('subcatId');
	var pk_SubCat_id = subcatId.value;
	if(pk_SubCat_id == null || pk_SubCat_id == "" || pk_SubCat_id == " " || pk_SubCat_id == undefined)
	{
		myAlert("Please Select Sub-Category");
		return false;
	}
	
	
	
	var params= {};

	params ["pk_SubCat_id"] = pk_SubCat_id;
	params["methodName"] = "deleteSubCategory";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{   
		//alert(data);
		successAlert(data);
	
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
