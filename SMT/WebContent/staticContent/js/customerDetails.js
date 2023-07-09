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

function customerDetails()
{	
	var firstName = $('#firstName').val();
	var middleName = $('#middleName').val();
	var lastName = $('#lastName').val();
	var address = $('#address').val();
	var contactNo  = $('#contactNo').val();
	var emailId = $('#emailId').val();
	var zipCode = $('#zipCode').val();
	var aadhar = $('#aadharNo').val();
	
	if(firstName == "")
	{
		myAlert("Enter Customer First Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z, ]+$/;
	if(firstName.match(letterNumber))
	{
		/*if(document.cstd.middleName.value == "")
		{
			myAlert("Enter Customer Middle Name.");
			return false;
		}*/	
		var letterNumber = /^[a-zA-Z, ]+$/;
		/*if(document.cstd.middleName.value.match(letterNumber))
		{*/
			if(lastName == "")
			{
				myAlert("Enter Customer Last Name.");
				return false;
			}	
			var letterNumber = /^[a-zA-Z, ]+$/;
			if(lastName.match(letterNumber))
			{
				if(address == "")
				{
					myAlert("Please Enter Customer Address.");
					return false;
				}	
				/*var letterNumber = /^[a-zA-Z0-9, ]+$/;
				if(address.match(letterNumber))
				{*/
					if (contactNo == "" )
					{
						myAlert("Please Enter Contact Number");
						return false;
					}
					var letterNumber = /^[0-9]{10}$/;
					if(contactNo.match(letterNumber) && contactNo != "0000000000")
					{						
						var checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						if(emailId == "" || emailId == null || emailId == " " || emailId == undefined)
						{}
						else
						{
							if(emailId.match(checkEmail))
							{}
							else
							{
								myAlert("Please Enter valid Email Id");
								return false;
							}
						}
						
						if(zipCode == "" || zipCode == null || zipCode == " ")
						{}
						else if(zipCode.length == 6)
						{
							var checkPin = /^[0-9]+$/;
							if(zipCode.match(checkPin))
							{}
							else
							{
								myAlert("Enter valid Pin Code");
								return false;
							}
						}	
						else
						{
							myAlert("Enter valid Pin Code");
							return false;
						}
						
						custDetails();
					}
					else
					{
						myAlert("Enter 10 Digits Only In Contact Number Field And All 0's Is invalid..!!");
						return false;
					}	
				/*}
				else
				{
					myAlert("Enter Alphabates Only in address field..!!");
					return false;
				}*/	
			}
			else
			{
				myAlert("Enter Alphabets Only in last name field..!!");
				return false;
			}
		/*}
		else
		{
			myAlert("Enter Alphabets Only in middle name field..!!");
			return false;
		}*/
	}
	else
	{
		myAlert("Enter Alphabets Only in first name field..!!");
		return false;
	}
}	

function custDetails()
{	
	if(document.cstd)
	{
		document.cstd.btn.disabled = true;
	}
	var shopId = $('#shopId').val();
	var firstName = $('#firstName').val();
	var middleName = $('#middleName').val();
	var lastName = $('#lastName').val();
	var address = $('#address').val();
	var contactNo  = $('#contactNo').val();
	var emailId = $('#emailId').val();
	var zipCode = $('#zipCode').val();
	var aadhar = $('#aadharNo').val();
	if(aadhar == "" || aadhar == null || aadhar == undefined || aadhar == " ")
	{
		aadhar = "N/A";
	}
	
	
	var params = {};

	params ["shopId"] = shopId;
	params["firstName"] =firstName;
	params["middleName"] =middleName;
	params["lastName"] =lastName;
	params["address"] = address;
	params["contactNo"] =contactNo;
	params["emailId"] = emailId;
	params["zipCode"] = zipCode;
	params["aadhar"] = aadhar;
	params["methodName"] = "customerDetails";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		if(document.custord)
		{
			successAlert("Customer Added Successfully");
			
			document.getElementById("firstName").value = "";
			document.getElementById("middleName").value = "";
			document.getElementById("lastName").value = "";
			document.getElementById("address").value = "";
			document.getElementById("contactNo").value = "";
			//document.getElementById("aadharNo").value = "";
			document.getElementById("emailId").value = "";
			document.getElementById("zipCode").value = "";
			CreditCustDetailsDivAction(0);
		}
		else if(document.cstd)
		{
			successAlert(data);
		}
		
	}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}

function resetDivFields()
{
	document.getElementById("firstName").value = "";
	document.getElementById("middleName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("address").value = "";
	document.getElementById("contactNo").value = "";
	//document.getElementById("aadharNo").value = "";
	document.getElementById("emailId").value = "";
	document.getElementById("zipCode").value = "";
}

function reset()
{
	document.cstd.reset();	
}

/*************** Edit Credit Customer Details **********/
function getCustomerDetails(){
	var params= {};
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,fkRootCustId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootCustId = list.options[i].getAttribute('data-value');
		}
	}
	$("#firstName").append($("<input/>").attr("value","").text());
	$("#middleName").append($("<input/>").attr("value","").text());
	$("#lastName").append($("<input/>").attr("value","").text());
	$("#address").append($("<input/>").attr("value","").text());
	$("#contactNo").append($("<input/>").attr("value","").text());
	$("#aadharNo").append($("<input/>").attr("value","").text());
	$("#emailId").append($("<input/>").attr("value","").text());
	$("#zipCode").append($("<input/>").attr("value","").text());

	params["creditCustomer"]= fkRootCustId;
	params["methodName"] = "getCreditCustomerDetailsToEdit";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data){
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
		{
			document.getElementById("firstName").value = v.firstName;
			document.getElementById("middleName").value = v.middleName;
			document.getElementById("lastName").value = v.lastName;
			document.getElementById("address").value = v.address;
			document.getElementById("contactNo").value = v.contactNo;
			document.getElementById("aadharNo").value = v.aadhar;
			document.getElementById("emailId").value = v.email;
			document.getElementById("zipCode").value = v.zipCode;
		});
	}).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
		}
	});
}

function editcustomerDetails()
{
	if(document.cstd1.creditCustomer.value == "")
	{
		myAlert("Select Customer Name.");
		return false;
	}
	if(document.cstd1.firstName.value == "")
	{
		myAlert("Enter Customer First Name.");
		return false;
	}	
	var letterNumber = /^[a-zA-Z, ]+$/;
	if(document.cstd1.firstName.value.match(letterNumber))
	{
		if(document.cstd1.middleName.value == "")
		{}
		else
		{
			var letterNumber = /^[a-zA-Z, ]+$/;
			if(document.cstd1.middleName.value.match(letterNumber))
			{}
			else
			{
				myAlert("Please Enter Valid Middle Name");
				return false;
			}
		}
		
			if(document.cstd1.lastName.value == "")
			{
				myAlert("Enter Customer Last Name.");
				return false;
			}	
			var letterNumber = /^[a-zA-Z, ]+$/;
			if(document.cstd1.lastName.value.match(letterNumber))
			{
				if(document.cstd1.address.value == "")
				{
					myAlert("Please Enter Employee Address.");
					return false;
				}	
				var letterNumber = /^[a-zA-Z0-9, ]+$/;
				if(document.cstd1.address.value.match(letterNumber))
				{
					if ( document.cstd1.contactNo.value == "" )
					{
						myAlert("Please Enter Contact Number");
						return false;
					}
					var letterNumber = /^[0-9]{10}$/;
					if(document.cstd1.contactNo.value.match(letterNumber) && document.cstd1.contactNo.value != "0000000000")
					{
						updateCustomerDetails();
					}
					else
					{
						myAlert("Enter 10 Digits Only In Contact Number Field And All 0's Is invalid..!!");
						return false;
					}	
				}
				else
				{
					myAlert("Enter Alphabates Only in address field..!!");
					return false;
				}	
			}
			else
			{
				myAlert("Enter Alphabets Only in last name field..!!");
				return false;
			}
		}
		/*else
		{
			myAlert("Enter Alphabets Only in middle name field..!!");
			return false;
		}
	}*/
	else
	{
		myAlert("Enter Alphabets Only in first name field..!!");
		return false;
	}
}

function updateCustomerDetails()
{
	document.cstd1.btn.disabled =true;
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,fkRootCustId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootCustId = list.options[i].getAttribute('data-value');
		}
	}
	var firstName = $('#firstName').val();
	var middleName = $('#middleName').val();
	var lastName = $('#lastName').val();				
	var address = $('#address').val();
	var contactNo = $('#contactNo').val();
	var aadharNo = $('#aadharNo').val();
	var emailId = $('#emailId').val();
	var zipCode = $('#zipCode').val();

	/*if(emailId.length > 0)
	{
		var checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(emailId.match(checkEmail))
		{}
		else
		{
			myAlert("Please Enter Valid Email Address");
			return false;
		}
	}
	
	if(zipCode.length > 0)
	{
		var checkPin = /^[0-9]{6}$/;
		if(zipCode.match(checkPin))
		{}
		else
		{
			myAlert("Please Enter Valid Pin Code");
			return false;
		}
	}*/
	var params = {};
	params["customerId"] = fkRootCustId;
	params["firstName"] = firstName;	
	params["middleName"] = middleName;
	params["lastName"] = lastName;
	params["address"] = address;
	params["contactNo"] =contactNo;
	params["aadharNo"] = aadharNo;
	params["emailId"] = emailId;
	params["zipCode"] = zipCode;

	params["methodName"] = "updateCreditCustomerDetails";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		successAlert(data);	
		if(document.cstd1)
		{
			document.cstd1.reset();
		}	
		document.cstd1.btn.disabled =false;
	}
	).error(function(jqXHR, textStatus, errorThrown)
	{
		if(textStatus==="timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
