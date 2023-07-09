//SHOP DETAILS
function shopDetailsJsFn()
{	
	var shopNameSD = "SHOPNAME";
	var shopAddressSD = "Shop Address";
	var shopContactNoSD = "Contact No";
	var shopGstNoSD = "shop GST no";
	var shopEmailSD = "Shop Email Id";
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


function addShop()
{	
	var checkNumber = /^[0-9]+$/;
	var shopName = $("#shopNameSd").val();
	var contactNumber = $("#contactNumber").val();
	var gstNo = $("#gstNo").val();
	var shopAddress = $("#shopAddress").val();
	var cityName = $("#cityName").val();
	
	if(shopName == null || shopName == "" || shopName == " " || shopName == undefined)
	{
		myAlert("Please Enter Shop Name");
		return false;
	}
	
	if(contactNumber == null || contactNumber == "" || contactNumber == " " || contactNumber == undefined)
	{
		myAlert("Please Enter Contact Number");
		return false;
	}
	else if(contactNumber.length == 10)
	{
		if(contactNumber.match(checkNumber))
		{}
		else
		{
			myAlert("Please Enter valid Contact Number");
			return false;
		}
	}
	else
	{
		myAlert("Please Enter Valid 10 Digit Cotact Number");
		return false;
	}
	
	if(gstNo == null || gstNo == "" || gstNo == " " || gstNo == undefined)
	{
		myAlert("Please Enter GST Number");
		return false;
	}
	
	if(shopAddress == null || shopAddress == "" || shopAddress == " " || shopAddress == undefined)
	{
		myAlert("Please Enter Shop Address");
		return false;
	}
	
	if(shopAddress == null || shopAddress == "" || shopAddress == " " || shopAddress == undefined)
	{
		shopAddress = "N/A";
	}
	
	if(cityName == null || cityName == "" || cityName == " " || cityName == undefined)
	{
		myAlert("Please Enter City");
		return false;
	}
	
	var params= {};
	
	params["shopName"] = shopName;
	params["contactNumber"] = contactNumber;
	params["gstNo"] = gstNo;
	params["shopAddress"] = shopAddress;
	params["cityName"] = cityName;
	params["methodName"] = "addShopDetails";

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


function billcancel() {

	//alert("ok");
	var params= {};
	
	var billno = $("#billno").val();
	
	var BillNOOO = $("#BillNOOO").val();
	//var billNo=$('#billno').val;
	
	//var billNoo= $('#BillNOOO').val;
	if(billno == "" || billno ==null || billno==undefined || billno == " " )
    {
		myAlert("Please Enter Bill No");
		return false;
    }
	
	
	if(billno == "" || billno ==null || billno==undefined)
    {
	params["billno"] = BillNOOO;
    }
    
    else if(BillNOOO == "" || BillNOOO ==null || BillNOOO==undefined)
  //  else
    {
	params["billno"] = billno;
    }
    
	
    params["methodName"] = "billreturn";
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

