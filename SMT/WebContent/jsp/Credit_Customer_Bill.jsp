<%@page import="com.smt.bean.ProductNameBean"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%@page import="com.smt.dao.StockDao"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.helper.CarEntryHelper"%>
<%@page import="com.smt.hibernate.CarEntry"%>
<%@page import="com.smt.helper.OtherBillHelper"%>
<%@page import="com.smt.bean.BillBean"%>
<%@page import="com.smt.dao.CreditCustBillDao"%>
<%@page import="java.util.List"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Order Bill</title>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript"	src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript"	src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/js/creditCustBill.js"></script>
<script src="/SMT/staticContent/js/customerDetails.js"></script>

<style type="text/css">

#goodrcvcol {
    width: 40%;
    margin-left: -4%;
}

.control-label {
	font-size: 20px;
}

.godbtn {
	position: absolute;
	margin-top: 15px;
	margin-left: -10px;
}
</style>
<script type="text/javascript">
/* function grasstotal()
{
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount1").value;
	var discountt = document.getElementById("discount").value;
	var regex = /^[0-9\b]+$/;
	
	if(discount.match(regex))
	{}
	else
	{
		myAlert("Enter valid Discount");
		document.getElementById("discount").value = "";
		document.getElementById("discount1").value = "";
		document.getElementById("grossTotal").value = total;
		return false;
	}
	
	if(Number(discount) >= 100)
	{
		myAlert("Discount % must be less than 100");
		document.getElementById("discount1").value = "";
		document.getElementById("discount").value = "";
		return false;
	}

	if(discount == "")
	{
		document.getElementById("discount").value = "";
		document.getElementById("grossTotal").value = total;
	}
	else{
	
	if(discount!="")
		{
		var gross1 = (+total * +discount)/ 100;
		var gross = +total - +gross1;
		
		document.getElementById("discount").value = gross1;
		if(discount != "0"){
			document.getElementById("grossTotal").value = gross;
		}else{
			document.getElementById("grossTotal").value = total;
		}
		}
	else
		{
		var gross = +total - +discountt;
		//var gross = +total - +gross1;
		
		//document.getElementById("discount").value = gross1;
		if(discount != "0"){
			document.getElementById("grossTotal").value = gross;
		}else{
			document.getElementById("grossTotal").value = total;
		}
		}
	}
} */

/* function taxAmountCalc()
{
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount1").value;
	var discountt = document.getElementById("discount").value;
	var regex = /^[0-9\b]+$/;
	
	if(discountt.match(regex))
	{}
	else
	{
		myAlert("Enter valid Discount");
		document.getElementById("discount").value = "";
		document.getElementById("discount1").value = "";
		document.getElementById("grossTotal").value = total;
		return false;
	}
	
	if(discountt != "")
	{
		var disPer = ((discountt/total)*100);
		document.getElementById("discount1").value = disPer.toFixed(2);
		var gTotal = total - discountt;
		document.getElementById("grossTotal").value = gTotal;		
	}
	if(discountt == "")
	{
		document.getElementById("discount1").value = "";
		document.getElementById("grossTotal").value = total;		
	}
} */


<%--
<% List custList = null; %>


function refreshCustomerList()
{
    <%
    	CustomerDetailsDao custCdo = new CustomerDetailsDao();
   		custList = custCdo.getAllCustomerForBilling();
	%>
}



function cheakForCustomer()
{ <%
    	CustomerDetailsDao custCdo = new CustomerDetailsDao();
   		List custList = custCdo.getAllCustomerForBilling();
	%> 
	var creditCustomer = $('#creditCustomer').val();
	if(creditCustomer == null || creditCustomer == "")
	{regcreditcustomerbill();}
	else
	{
		var UpCreditCustomer = creditCustomer.toUpperCase();
		var duplicate;
		<%
			for(int i=0;i<custList.size();i++){
			CustomerDetailsBean cdb = (CustomerDetailsBean)custList.get(i);
		%>		
		    var fName ="<%=cdb.getFirstName()%>";
		    var lName ="<%=cdb.getLastName()%>";
		    var name = fName+" "+lName;
		    var UpName = name.toUpperCase();
			if(UpCreditCustomer == UpName)
			{
				duplicate = "found";
			}
	    <%
			}
		%>
		if(duplicate == "found")
		{regcreditcustomerbill();}
		else
		{
			document.custord.btnSubmit.disabled = true;	
			myAlert("Customer Is Not Registered");			   
			document.custord.btnSubmit.disabled = false;
			return false;
		}
	}
}

--%>

<%Long BillNo = 1l;%>
<%CreditCustBillDao data = new CreditCustBillDao();
			List stkList = data.getCreditLastBillNo();

			for (int i = 0; i < stkList.size(); i++) {
				BillBean st = (BillBean) stkList.get(i);
				BillNo = st.getCreditCustBillNo();
				BillNo++;
			}%>

function isNumber(evt)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}



</script>
<style>
#logoutButton {
	height: 35px;
	width: 80px;
	background: #353535;
	border: 2px solid #353535;
	color: white;
	font-weight: bolder;
	font-size: 12px;
	position: fixed;
	top: 3%;
	right: 2%;
}

#currentUser {
	color: orange;
	font-weight: 600;
	font-size: 17px;
	position: fixed;
	top: 5px;
	right: 1%;
}

#logo {
	width: 110px;
	height: auto;
	position: fixed;
	top: 9%;
	right: 1%;
	z-index: -1;
	opacity: 0.6;
}

#taxcol {
	width: 33%;
	/*     margin-left: -4%; */
}

.table-responsive {
	min-height: .01%;
	overflow-x: auto;
	/* width: 90%; */
	/* margin-left: 25px; */
	margin-top: 1%;
	margin-bottom: 0%;
}

tbody tr:hover {
    background: none !important;
    color: #000 !important;
}
/* #popupcreditcol {
	width: 33%;
} */

#popupcreditcol2 {
width: auto;
    margin-left: 14%;
    margin-top: -4%;
}
.col-md-2.col-lg-4 {
 margin-right: 10px; 
  }
 tbody tr:hover {
    background: none !important;
    color: #000 !important;
}
#categorydetailsh2 {
    margin-top: 0px;
}
    
@media ( min-width : 980px) and (max-width:1180px) {
	.mainWrap {
		width: 768px;
	}
	.menu ul {
		top: 37px;
	}
	.menu li a {
		font-size: 11px;
	}
	a.homer {
		background: #E95546;
	}
	li a {
		padding: 15px 11px;
	}
	#logoutButton {
		width: 70px;
		position: fixed;
		top: 3%;
		right: 2%;
		font-size: 12px
	}
	#currentUser {
		color: orange;
		font-weight: 600;
		font-size: 14px;
		position: fixed;
		top: 1%;
		right: 2%;
	}
	#logo {
		width: 110px;
		height: auto;
		position: fixed;
		top: 10%;
		right: 2%;
		z-index: -1;
		opacity: 0.6;
	}
.col-md-2.col-lg-4 {
    margin-right: 57px;
}
}

@media ( min-width : 768px) and (max-width: 979px) {
	.mainWrap {
		width: 768px;
	}
	.menu ul {
		top: 37px;
	}
	.menu li a {
		font-size: 9px;
	}
	a.homer {
		background: #E95546;
	}
	li a {
		padding: 15px 8px;
	}
	#logoutButton {
		width: 70px;
		font-size: 11px;
		position: fixed;
		top: 12px;
		right: 44px;
	}
	#currentUser {
		color: orange;
		font-weight: 600;
		font-size: 13px;
		position: fixed;
		top: 4px;
		right: 45px;
	}
	#logo {
		width: 110px;
		height: auto;
		position: fixed;
		top: 9%;
		right: 1%;
		z-index: -1;
		opacity: 0.6;
	}
}
@media ( max-width : 991px) {
.col-md-2.col-lg-4 {
    margin-right: -24px;
}

}
@media ( max-width : 767px) {
	.mainWrap {
		width: auto;
		padding: 30px 20px;
	}
	.menu {
		display: none;
	}
	.responsive-menu {
		display: block;
	}
	nav {
		margin: 0;
		background: none;
	}
	.menu li {
		display: block;
		margin: 0;
	}
	.menu li a {
		background: #fff;
		color: #797979;
	}
	.menu li a:hover, .menu li:hover>a {
		background: #8c7674;
		color: #fff;
	}
	.menu ul {
		visibility: hidden;
		opacity: 0;
		top: 0;
		left: 0;
		width: 100%;
		transform: initial;
	}
	.menu li:hover>ul {
		visibility: visible;
		opacity: 1;
		position: relative;
		transform: initial;
	}
	.menu ul ul {
		left: 0;
		transform: initial;
	}
	.menu li>ul ul:hover {
		transform: initial;
	}
	#logoutButton {
		width: 94px;
		font-size: 14px;
		position: relative;
		top: 0;
		right: 0;
		height: 15%;
	}
	#currentUser {
		color: yellow;
		font-weight: 600;
		font-size: 16px;
		position: fixed;
		top: 5px;
		right: 7%;
	}
	#logo {
		width: 110px;
		height: auto;
		position: fixed;
		top: 7%;
		right: 2%;
		z-index: -1;
		opacity: 0.6;
	}
	.table-responsive {
		/* width: 110%; */
		overflow-y: hidden;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		border: none;
		margin-bottom: 0;
		/* margin-left: 6px; */
	}
}
.btnwidth {
	/* width: 124px !important; 
	padding-top: 8px !important; */
}

@media screen and (max-width: 580px) {
.container-fluid {
    width: 113%;
}
.table-responsive {
    width: 95%;
}
.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-resizable {
    width: 100% !important;
}
}

@media screen and (max-width: 480px) {
.container-fluid {
    width: 100%;
}
#creditCustomerDetailsDiv {
    height: auto !important;
}
/* .barcodemargin {
	margin-top: 25px;
} */
}
</style>
</head>
<body onload="getEmpName(); <!-- getCustomers(); -->" class="vColor">
	<div class="container-fluid">

		<div class="row">
			<div class="" id="billheading">
			<div class="vouch">
				<span class="vouchspan">Bill
					No :: <%
					out.println(BillNo);
				%>
				</span> <input type="hidden" readonly="readonly" id="billNo" name="billNo"
					value=<%=BillNo%>>
					</div>
			</div>
			<div class="" id="categorydetailsh2" align="center">
				<h2 class="form-name style_heading">Credit Customer Invoice</h2>
			</div>
			</div>
			
		<!-- <div class="row"> -->	
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		<!-- </div> -->

		<div class="miscellaneous">
			<form class="form-horizontal" action="" method="post" name="custord">
				<div class="container" id="custdetal">
					<%-- <h2 align="center" class="form-heading style_heading"
				style="margin-top: 50px;">Credit Customer Bill</h2>
			<h3 align="right" style="color: red; margin-right: 50px;">
				Bill No ::
				<%out.println(BillNo); %>
			</h3> --%>

					<div class="row">
						<div class="invoice_label_up">
						
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									<%
										CustomerDetailsDao cdd = new CustomerDetailsDao();
										List cList = cdd.getAllCustomerForBilling();
									%>
									<input list="cust_drop" id="creditCustomer"  autofocus="creditCustomer" required> <span
										class="godbtn">
										<button type="button" onclick="CreditCustDetailsDivAction(1);">
											<span class="glyphicon glyphicon-plus"
												style="color: #0078ae;"></span>
										</button>
									</span>

									<datalist id="cust_drop">
									<% for (int i = 0; i < cList.size(); i++) {
 										CustomerDetailsBean cust = (CustomerDetailsBean) cList.get(i);
 									%>
									<option data-value="<%=cust.getCustId()%>"
										value="<%=cust.getFirstName()%> <%=cust.getLastName()%>"
										myvalue="<%=cust.getAadhar()%>">
										<%
											}
										%>
									</datalist>
									<label>Customer Name<sup>*</sup></label>
								</div>
						</div>
						<!-- <div class="col-md-1"></div> -->
						<div id="crditCustListDiv">
							<div class="invoice_label_up">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="text" id="Tempbillid" onchange="getEmpName(),getitemData1();" required />
								<label>Temp. Invoice no</label>
							</div>
							</div>
						</div>
					</div>

<!------------------------------------------------------------------- ADD CREDIT CUSTOMER DETAILS Starts Here --------------------------------------------------------------->

					<div class="container-fluid" style="display: none;" id="creditCustomerDetailsDiv">
						<div class="row" style="padding-top: 10px">
							<div align="center">
								<h2 class="form-name style_heading">Credit Customer Details</h2>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12" align="center">
								<hr style="border-top-color: #000000;">	
							</div>
						</div>

						<div class="miscellaneous">
							<div class="container" style="width: auto;" id="custdetal">
								<div class="row">
									<!-- <label class="col-md-2 lablename" for="firstName">First Name:<sup>*</sup>
				</label> -->
	<!-- 						<div class="col-md-3" align="right">
								
							</div>
	 -->						<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
									<%
										CustomerDetailsDao dao1 = new CustomerDetailsDao();
										List unitList = dao1.getAllCustomer();
									%>
									<input list="firstName_drop" id="firstName"
										required>
									<datalist id="firstName_drop"> <%
 									for (int i = 0; i < unitList.size(); i++) {
 									CustomerDetailsBean bean1 = (CustomerDetailsBean) unitList.get(i);
 									%>
									<option data-value="<%=bean1.getCustId()%>"
										value="<%=bean1.getFirstName()%>">
										<%
											}
										%>
									
									</datalist>
								<label for="firstName">First Name:<sup>*</sup></label>
								</div>
							</div>
							<!-- <label class="col-md-2 lablename" for="middleName">Middle

									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">

<%-- 											<%
												CustomerDetailsDao dao1 = new CustomerDetailsDao();
												List unitList = dao1.getAllCustomer();
											%> --%>
											<input list="firstName_drop" id="firstName"
												placeholder="First Name" required>
											<datalist id="firstName_drop"> <%
											 	for (int i = 0; i < unitList.size(); i++) {
											 		CustomerDetailsBean bean1 = (CustomerDetailsBean) unitList.get(i);
											 %>
											<option data-value="<%=bean1.getCustId()%>"
												value="<%=bean1.getFirstName()%>">
												<%
													}
												%>
											
											</datalist>
											<label for="firstName">First Name:<sup>*</sup></label>
										</div>
									</div>
									<!-- <label class="col-md-2 lablename" for="middleName">Middle
					Name:<sup>*</sup>
				</label> -->



									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<%
												CustomerDetailsDao dao2 = new CustomerDetailsDao();
												List middleList = dao2.getAllCustomer();
											%>
											<input list="middleName_drop"
												id="middleName" required>
											<datalist id="middleName_drop"> <%
											 	for (int i = 0; i < middleList.size(); i++) {
											 		CustomerDetailsBean bean2 = (CustomerDetailsBean) middleList.get(i);
											 %>
											<option data-value="<%=bean2.getCustId()%>"
												value="<%=bean2.getMiddleName()%>">
												<%
													}
												%>
											
											</datalist>
											<label for="middleName">Middle Name:<sup></sup></label>
										</div>
									</div>
								</div>



								<div class="row">
								
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<%
												CustomerDetailsDao dao3 = new CustomerDetailsDao();
												List lastList = dao3.getAllCustomer();
											%>
											<input list="lastName_drop" id="lastName"
												required>
											<datalist id="lastName_drop"> <%
											 	for (int i = 0; i < lastList.size(); i++) {
											 		CustomerDetailsBean bean3 = (CustomerDetailsBean) lastList.get(i);
											 %>
											<option data-value="<%=bean3.getCustId()%>"
												value="<%=bean3.getLastName()%>">
												<%
													}
												%>
											
											</datalist>
											<label for="lastName">Last Name:<sup>*</sup></label>
										</div>
									</div>
								
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input id="address" name="address "
												required type="text"> <label for="address">Address:<sup>*</sup></label>
										</div>
									</div>
									</div>
									<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input id="contactNo" name="contactNo"
												placeholder="10 Digit Contact No." maxlength="10"
												type="text"> <label for="contactNo">Contact
												No:<sup>*</sup>
											</label>
										</div>
									</div>
																		<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input id="emailId" name="emailId " required
												type="text"> <label for="emailId">Email Id:<sup></sup></label>
										</div>
									</div>

									
								</div>
								
								<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input id="zipCode" name="zipCode"
												placeholder="6 Digit Zip code" maxlength="6" type="text">
											<label for="zipCode">Zip Code:</label>
										</div>
									</div>
								</div>
								<div class="row" id="btnrow">
									<div class="invoice_button">
									<!-- <div class="popupbtn row"> -->
									<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol2"> -->
										<!-- <div class="col-md-2 col-lg-4" style="display:inline-block;"> -->
											<input type="button" id="save" name="btn" style="font-size: 17px;"
												class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth"
												onclick="customerDetails();" value="Submit">
										<!-- </div> -->
										<!-- <div class="col-md-2 col-lg-4" style="display:inline-block;"> -->
											<input type="button" id="save" name="btn" style="font-size: 17px;"
												class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth"
												onclick="CreditCustDetailsDivAction(0);resetDivFields();refreshCustomerList();"
												value="Cancel">
										<!-- </div> -->
										<!-- </div> -->
									<!-- </div> -->
									</div>
								</div>
							</div>
						</div>
					</div>

<!------------------------------------------------------------ /ADD CREDIT CUSTOMER DETAILS Ends Here ------------------------------------------------------------->
					
					<%-- <div class="row">
					<div class="invoice_label_up">
					<div class="good_rcv_label_up">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-9" id="goodrcvcol" >
							<%
								ProductDetailHelper item = new ProductDetailHelper();
								List itemList = item.getAllItemListWithoutBarcodeForBilling(request, response);
							%>
						
							<input list="itemId_drop" id="itemName" class="" onchange="getEmpName(), getitemData1();" style="background-color: #f0f0f0" required>
							
							<datalist id="itemId_drop">
								<%
									for (int j = 0; j < itemList.size(); j++) {
										ProductNameBean itm = (ProductNameBean) itemList.get(j);
								%>
								<option data-value="<%=itm.getCaregoryName()%>"
									value="<%=itm.getItemName()%> :: <%=itm.getCaregoryName()%> :: <%=itm.getSubCat()%>"
									myvalue="<%=itm.getItemName()%>"
									myvalue1="<%=itm.getSubCatid()%>"
									myvalue2="<%=itm.getProductid()%>"
									myvalue3="<%=itm.getColor()%>" 
									myvalue4="<%=itm.getSize()%>"
									myvalue5="<%=itm.getFkCatId()%>"									
									>										
									<%
										}
									%>
								
							</datalist>
							<label>Item List</label>
				</div>	   
					</div>
							
						</div>
					</div> --%>
					
					
					<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="text" id="key"
									onchange="getEmpName(),getitemData1();"
									required /> <label>Barcode no</label>
							</div>
						</div>
						<!-- <div class="col-md-1"></div> -->
						<div id="crditCustListDiv">
							<div class="invoice_label_up">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport">
					<%
								ProductDetailHelper item = new ProductDetailHelper();
								List itemList = item.getAllItemListWithoutBarcodeForBilling(request, response);
							%>
						
							<input list="itemId_drop" id="itemName" class="" onchange="getEmpName(), getitemData1();" style="background-color: #f0f0f0" required>
							
							<datalist id="itemId_drop">
								<%
									for (int j = 0; j < itemList.size(); j++) {
										ProductNameBean itm = (ProductNameBean) itemList.get(j);
								%>
								<option data-value="<%=itm.getCaregoryName()%>"
									value="<%=itm.getBarcodeNo()%> :: <%=itm.getItemName()%> :: <%=itm.getSubCat()%> :: <%=itm.getCaregoryName()%>"
									myvalue="<%=itm.getItemName()%>"
									myvalue1="<%=itm.getSubCatid()%>"
									myvalue2="<%=itm.getProductid()%>"
									myvalue3="<%=itm.getColor()%>" 
									myvalue4="<%=itm.getSize()%>"
									myvalue5="<%=itm.getFkCatId()%>"
									myvalue6="<%=itm.getBarcodeNo()%>"							
									>										
									<%
										}
									%>
								
							</datalist>
							<label>Item List</label>
								</div>
							</div>
						</div>
					</div>
					


					<div class="row">
						<!-- <div class="col-md-5"></div> -->
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
						<!-- 	id="creditcustinvc"> -->
							<input type="date" id="cPaymentDueDate" name="cPaymentDueDate"
								style="margin-bottom: 8px;" /> <label>Payment Due Date</label>
						</div>
					</div>

					<div class="invoice_grid">
						<div class="row" align="center">
							<div class="table-responsive">
								<table id="list4"></table>
								<div id="jqGridPager"></div>
							</div>
						</div>
					</div>
					<!-- <div class="row" style="margin-top: 15px"> -->

					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">
							<input type="text" id="totalQtyCredit" readonly="readonly" /> <label
								for="totalQuantity">Total Quantity</label>
						</div>
						<div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">
							<input type="text" id="totalAmount" readonly="readonly" /> <label>Total
								Amount</label>
						</div>
					</div>

					<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="dayreport">
								<input type="text" id="srTransactionId"
									onkeypress="return isNumber(event)"
									onchange="getSrCreditAmountForCredit()" required /> <label
									for="srTransactionId">SR Transaction Id </label>
							</div>
						</div>
						<div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">
							<input type="text" readonly="readonly" id="discount"
								onchange="taxAmountCalc()" /> <label>Discount</label>
						</div>
					</div>


					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">

							<div class="table-responsive"
								style="height: 17vh; margin-bottom: 6%; margin-left: 0%;">
								<table id="srCreditAmtGrid"></table>
								<div id="srJqGridPager"></div>
							</div>
						</div>

						<div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">
							<select id="creditPaymentMode">
								<option value="cash">Cash</option>
								<option value="card">Card</option>
								<option value="cashAndCard">Cash And Card</option>
								<option value="Upi">Upi</option>
								<option value="cashAndupi">Cash And Upi</option>
							</select> <label for="creditPaymentMode">Payment Mode</label>
							<div class="row " style="margin-top: 10px;">

								<div id="cheque_no">
									<div class="col-md-3 col-md-offset-5 first">
										<input class="form-control" type="text" name="chequeNum"
											id="chequeNum" placeholder="Cheque No." />
									</div>
									<div class="col-md-3  first">
										<input class="form-control" type="text" name="nameOnCheck"
											id="nameOnCheck" placeholder="Name On Cheque" />
									</div>
								</div>

								<div id="card_no" class="form-group">
									<div class="col-md-3 col-md-offset-8 first">
										<input class="form-control" type="text" name="cardNum"
											id="cardNum" placeholder="Card No." />
									</div>
								</div>

								<div id="neft_acc_no" class="form-group">
									<div class="col-md-3 col-md-offset-5 first">
										<input class="form-control" type="text" name="accNum"
											id="accNum" placeholder="Account No." />
									</div>
									<div class="col-md-3 first">
										<input class="form-control" type="text" name="bankName"
											id="bankName" placeholder="Name Of Bank" />
									</div>
								</div>
							</div>
							
							<div id="card_without_cash">
								<div class="col-md-4"></div>
								<!-- <div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
											id="cashcol">
											<input type="text" name="cashCard_cashAmount"
												id="cashCard_cashAmount" required /> <label>Cash
												Amount</label>
										</div>
									</div>
								</div> -->

								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
											id="cashcol">
											<input type="text" name="cashCard_cardAmount"
												id="cashCard_cardAmount" required /> <label>Card
												Amount</label>
										</div>
									</div>
								</div>
							</div>
							
							<div id="cash_and_card">
								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
											id="cashcol">
											<input type="text" name="cashCard_cashAmount"
												id="cashCard_cashAmount" required /> <label>Cash
												Amount</label>
										</div>
									</div>
								</div>


								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
											id="cashcol">
											<input type="text" name="cashCard_cardAmount"
												id="cashAndCard_cardAmount" required /> <label>Card
												Amount</label>
										</div>
									</div>
								</div>
							</div>
							
							<div id="upi_without_cash">
								<div class="col-md-4"></div>
								<!-- <div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
											id="cashcol">
											<input type="text" name="cashupi_cashAmount1"
												id="cashupi_cashAmount1" required /> <label>Cash
												Amount</label>
										</div>
									</div>
								</div> -->
								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
											id="cashcol">
											<input type="text" name="cashCard_upiAmount"
												id="cashCard_upiAmount" required /> <label>Upi
												Amount</label>
										</div>
									</div>
								</div>
							</div>

                 			<div id="cash_and_upi">
								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
											id="cashcol">
											<input type="text" name="cashupi_cashAmount1"
												id="cashupi_cashAmount1" required /> <label>Cash
												Amount</label>
										</div>
									</div>
								</div>
								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
											id="cashcol">
											<input type="text" name="cashCard_upiAmount"
												id="cashAndCard_upiAmount" required /> <label>Upi
												Amount</label>
										</div>
									</div>
								</div>
							</div>



						</div>

						<script>
		$(document).ready(function(){
	  		 $("#creditPaymentMode").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque")
	           	{
	           		$("#cash_and_card").hide();
	           		$("#cheque_no").hide(); 
	           		$("#neft_acc_no").hide(); 
	           		$("#card_no").hide();
	           		$("#cash_and_upi").hide();
	           		$("#upi_without_cash").hide();
	           	}
	          	 else if($(this).attr("value")=="card")
	          	 {
	          		$("#card_without_cash").show();
	          		$("#cash_and_card").hide();
	          		$("#cash_and_upi").hide();
	           		$("#upi_without_cash").hide();
	          		$("#card_no").hide(); 	
	          		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
	           }
	          	 else if($(this).attr("value")=="neft")
	          	 {
	          		$("#card_without_cash").hide();
	          		$("#cash_and_card").hide();
	          		$("#cash_and_upi").hide();
	           		$("#upi_without_cash").hide();
	           		$("#neft_acc_no").hide(); 	
	           		$("#card_no").hide(); 
	        		$("#cheque_no").hide();
	            }
	          	 else if($(this).attr("value")=="cash")
	          	 {
	          		$("#card_without_cash").hide();
	          		$("#cash_and_card").hide();
	          		$("#cash_and_upi").hide();
	          		$("#upi_without_cash").hide();
	            	$("#neft_acc_no").hide(); 
	            	$("#cheque_no").hide();
	            	$("#card_no").hide(); 
	             }
	         	else if($(this).attr("value")=="cashAndCard")
		        {
	          		$("#cash_and_card").show();
	          		$("#card_without_cash").hide();
	         		$("#cash_and_upi").hide();
	          		$("#upi_without_cash").hide();
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide(); 
	             }
	           	
	         	else if($(this).attr("value")=="cashAndupi")
		        {
	          		$("#cash_and_upi").show();
	          		$("#card_without_cash").hide();
	         		$("#cash_and_card").hide();
	          		$("#cash_and_upi").show();
	          		$("#upi_without_cash").hide();
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide(); 
	             }
	         	else if($(this).attr("value")=="Upi")
	         	{
	          		$("#upi_without_cash").show();
	          		$("#card_without_cash").hide();
	          		$("#cash_and_card").hide();
	          		$("#cash_and_upi").hide();
	          		$("#card_no").hide(); 	
	          		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
	           }
	           	
	       });
	   }).change();
		});	
		</script>

					</div>
					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
							id="dayreport">
							<input type="text" readonly="readonly" id="totalCreditAmt" /> <label
								for="totalCreditAmt">Total Credit Amount</label>
						</div>
						<div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
							id="dayreport">
							<input type="text" id="paidAmt" /> <label>Net Paid
								Amount</label>
						</div>
					</div>

					<div class="row">
						<!-- <div class="col-md-5"></div> -->
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="dayreport"> 
					<!-- 		id="creditcustinvc"> -->
							<input type="text" id="grossTotal"
								style="background-color: #fab787;" readonly="readonly" /> <label>Gross Total</label>
						</div>

					</div>




					<!-- 	<div class="row">					
					<div class="col-md-6">
						 <div class="form-group">
				    <div class="row" style="margin-left: 168px;">
					
							<div class="table-responsive"style="width:50%; height: 100px">
								<table id="srCreditAmtGrid"></table>
								<div id="srJqGridPager"></div>
							</div>
						</div>
					</div>
				</div>
					</div> -->
					<!-- </div> -->


					<div class="row" id="btnrow">
						<div class="invoice_button">
						<!-- <div class="col-lg-2" style="display: inline-block;"> -->
							<input type='button' class="btn btn-large btn-success button_hw button_margin_right btnwidth"
								id="btnSubmit" value="Print Bill" onclick="regcreditcustomerbill();">
						<!-- </div> -->

						<!-- <div class="col-lg-2" style="display: inline-block;"> -->
							<input type="reset" value="Cancel"
								onclick="window.location.reload()"
								class="btn btn-large btn-danger button_hw button_margin_right btnwidth" />
						<!-- </div> -->
						</div>
					</div>

				</div>
			</form>
		</div>
	</div>
	<div class="row footer_margin_top" align="center">
		<%@include file="y_commons/footer.jsp"%>
	</div>
</body>
</html>
