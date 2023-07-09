<!-- EditSaleInvoiceBill.jsp -->
<%@page import="com.smt.bean.ProductNameBean"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%@page import="com.smt.hibernate.Stock"%>
<%@page import="com.smt.dao.StockDao"%>
<%@page import="com.smt.hibernate.OtherBill"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%@page import="com.smt.bean.SaleInvoiceBillEditBean"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>

<%@page import="com.smt.helper.CarEntryHelper"%>
<%@page import="com.smt.hibernate.CarEntry"%>
<%@page import="com.smt.helper.OtherBillHelper"%>
<%@page import="com.smt.bean.BillBean"%>
<%@page import="com.smt.dao.OtherBillDao"%>
<%@page import="java.util.List"%>
<%
	 boolean isHome = false; 
%>
<%@include file="y_commons/header1.jsp"%>


<%-- <!-- user id for cashiar accountant use -->

<% 
					 String type2= "";
                     String name2 = "";
		             if (session != null) {
			         if (session.getAttribute("user") != null) {
				     name2 = (String) session.getAttribute("user");
				     System.out.println(" hi this sis sonal Please Login +++++++++++++++++++++++++++++++"+name2);
		              HibernateUtility hbu1=HibernateUtility.getInstance();
		              Session session2=hbu1.getHibernateSession();
		   
		              org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
		              query1.setParameter("name2", name2);
		              UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
		              type2 = userDetail1.getTypeId();
		              System.out.println(" hi this sis sonal Please Login +++++++++++++++++++++++++++++++"+type2);
		              session.setAttribute("uType", type2);
					  Long uid = userDetail1.getPkUserId();
					  session.setAttribute("uId", uid);
					  System.out.println(" hi this sis sonal Please Login +++++++++++++++++++++++++++++++"+uid);
			         } 
			         else {
					     response.sendRedirect("/SMT/jsp/login.jsp");
					     out.println("Please Login ");
				        }
		           }
		             else {
					     response.sendRedirect("/SMT/jsp/login.jsp");
					     out.println("Please Login ");
				        }
 %> --%>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Edit Invoice Bill</title>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<!-- <link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/popupwindow.css"> -->
<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/y_js/jquery.popupwindow.js"></script> -->
<script src="/SMT/staticContent/js/otherOrder.js"></script>
<script src="/SMT/staticContent/y_js/editBill.js"></script>
<style type="text/css">
</style>

<script type="text/javascript">
	function taxInvoiceHoldBillEditAndPrint() {
		window.location = "TaxInvoiceHoldBillEditAndPrint.jsp";
}
</script>

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
		alert("Discount % must be less than 100");
		document.getElementById("discount1").value = "";
		document.getElementById("discount").value = "";
		return false;
	}
	if(discount == "")
	{
		document.getElementById("discount").value = "";
		document.getElementById("discount").value = "";
		document.getElementById("grossTotal").value = total;
	}
	else
	{
	if(discount != "")
	{
		var gross1 = (+total * +discount)/ 100;
		var gross = +total - +gross1;
		
		document.getElementById("discount").value = gross1.toFixed(2);
		if(discount != "0")
		{
			document.getElementById("grossTotal").value = gross.toFixed(2);
		}
		else
		{
			document.getElementById("grossTotal").value = total;
		}
	}
	else
	{
		var gross = +total - +discountt;
		//var gross = +total - +gross1;
		
		//document.getElementById("discount").value = gross1;
		if(discount != "0")
		{
			document.getElementById("grossTotal").value = gross.toFixed(2);
		}else{
			document.getElementById("grossTotal").value = total;//.toFixed(2);
		}
		}
	}
} */

function taxAmountCalc()
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
	
	if(Number(discountt) >= Number(total))
	{
		alert("Discount Amount must be less Than Total Amount");
		document.getElementById("discount1").value = "";
		document.getElementById("discount").value = "";
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
}
function taxAmountCalc1()
{
	var total = document.getElementById("totalAmount1").value;           
	var discount = document.getElementById("discount11").value;
	var discountt = document.getElementById("discount1").value;
	var regex = /^[0-9\b]+$/;
	
	if(discountt.match(regex))
	{}
	else
	{
		myAlert("Enter valid Discount");
		document.getElementById("discount1").value = "";
		document.getElementById("discount11").value = "";
		document.getElementById("grossTotal1").value = total;
		return false;
	}
	
	if(Number(discountt) >= Number(total))
	{
		alert("Discount Amount must be less Than Total Amount");
		document.getElementById("discount11").value = "";
		document.getElementById("discount1").value = "";
		return false;
	}
	
	if(discountt != "")
	{
		var disPer = ((discountt/total)*100);
		document.getElementById("discount11").value = disPer.toFixed(2);
		var gTotal = total - discountt;
		document.getElementById("grossTotal1").value = gTotal;		
	}
	if(discountt == "")
	{
		document.getElementById("discount11").value = "";
		document.getElementById("grossTotal1").value = total;		
	}
}
function isNumber(evt)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function Returncash() {
	var grossTotal=document.getElementById("grossTotal").value;
	var Cashbycust=document.getElementById("Cashbycust").value; 
	
	if(Cashbycust=="" || Cashbycust==null )
		{
		//duty= document.getElementById("RetCash").value=0;
		var rate=(Cashbycust-grossTotal);
    	document.getElementById("RetCash").value = Math.round(rate);
		}
	else {
		var rate=(Cashbycust-grossTotal);
    	document.getElementById("RetCash").value = Math.round(rate);
	}
}
function Returncash1() {
	var grossTotal=document.getElementById("grossTotal1").value;
	var Cashbycust=document.getElementById("Cashbycust1").value; 
	
	if(Cashbycust=="" || Cashbycust==null )
		{
		//duty= document.getElementById("RetCash").value=0;
		var rate=(Cashbycust-grossTotal);
    	document.getElementById("RetCash1").value = Math.round(rate);
		}
	else {
		var rate=(Cashbycust-grossTotal);
    	document.getElementById("RetCash1").value = Math.round(rate);
	}
}
function upicash() {''
	var grossTotal=document.getElementById("grossTotal").value;
	var cashAmount=document.getElementById("cashCard_cashAmount1").value; 
	
	if(cashAmount=="" || cashAmount==null )
		{
		//duty= document.getElementById("RetCash").value=0;
		var rate=(grossTotal-cashAmount);
    	document.getElementById("cashCard_upiAmount").value = Math.round(rate);
		}
	else {
		var rate=(grossTotal-cashAmount);
    	document.getElementById("cashCard_upiAmount").value = Math.round(rate);
	}
}
function upicash1() {
	var grossTotal=document.getElementById("grossTotal1").value;
	var cashAmount=document.getElementById("cashCard_cashAmount11").value; 
	
	if(cashAmount=="" || cashAmount==null )
		{
		//duty= document.getElementById("RetCash").value=0;
		var rate=(grossTotal-cashAmount);
    	document.getElementById("cashCard_upiAmount1").value = Math.round(rate);
		}
	else {
		var rate=(grossTotal-cashAmount);
    	document.getElementById("cashCard_upiAmount1").value = Math.round(rate);
	}
}

</script>
<%
	/*Long BillNo = 1l;
	OtherBillDao data = new OtherBillDao();
	List stkList = data.getLastBillNo();
	for (int i = 0; i < stkList.size(); i++) {
		BillBean st = (BillBean) stkList.get(i);
		BillNo = st.getBillNo();
		BillNo++;
	}*/
%>
<style>

/* .popup {
    top: 100px !important;
    
    
} */

#logoutButton {
	height: 35px;
	width: 80px;
	background: #353535;
	border: 2px solid #353535;
	color: white;
	font-weight: bolder;
	font-size: 12px;
	position: fixed;
	top: 15px;
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

.table-responsive {
	min-height: .01%;
	overflow-x: auto;
	width: 100%;
	/* margin-left: 25px; */
	margin-top: 1%;
	margin-bottom: 0%;
}
.btnwidth {
    width: 130px !important;
    padding: 10px !important;
}
.close {
    float: right;
    margin-top: 10px;
    font-size: 40px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity = 20);
    opacity: .2;
}
.modal-content1 {
    background-color: #f3f3f3;
    margin: 10%;
    border: 1px solid #4f77e9;
    width: 80%;
    height: auto;
}
#taxcolpopup {
    width: 50%;
    /* margin-left: -4%; */
}
tbody tr:hover {
    background: none !important;
    color: #000 !important;
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
/* .modal-content1 {
    margin: 5%;
    width: 90%;
} */
}
@media screen and (max-width: 1180px) {
.modal-content1 {
    margin: 5%;
    width: 90%;
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

@media ( max-width : 992px) {
	/* #goodrcvcol {
    	margin-left: 2% !important;
	} */
#taxcolpopup {
    width: 47%;
    /* margin-left: 0%; */
    /* margin-left: -3%; */
    /* margin-right: 29px; */
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
    	width: 109%;
    	overflow-y: hidden;
    	-ms-overflow-style: -ms-autohiding-scrollbar;
    	border: none;
    	margin-bottom: 3%;
    	margin-left: 21px;
	}
	#goodrcvcol {
	    width: 50% !important;
    	/* margin-left: -4% !important; */
	}
#taxcolpopup {
    width: 50%;
    /* margin-left: 0%; */
    /* margin-left: -3%; */
    /* margin-right: 29px; */
}
}

#goodrcvcol {
    width: 50%;
  /*  margin-left: -4%; */
}
 #suppDetailsDiv {
    height: 40% !important;  
} 
.modal1 {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgb(255 255 255 / 40%); /* Black w/ opacity */
  padding-top: 60px;
}

@media screen and (max-width: 480px) {
.modal-content1 {
    margin: 10%;
    width: 80%;
}
#taxcolpopup {
    width: 100%;
}
}

/* Modal Content/Box */
/* .modal-content1 {
  background-color: #f3f3f3;
  margin: 0% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
/*   border: 1px solid #4f77e9;
  width: 96%; /* Could be more or less, depending on screen size */
 /*  height: auto;
}  */


/* The Close Button (x) */
/* .modal1 .close {
  position: absolute;
    right: 5px;
    top: 0;
    color: #000;
    font-size: 1px;
    font-weight: bold;
    overflow: hidden;
    background-color: #000000 !important;
    width: 99%;
    padding: 14px 3px;
    margin-top: 7px;
    border-radius: 6px;
}
.btnclose {
    margin: 43px 4px;
} */


/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)} 
  to {-webkit-transform: scale(1)}
}
  
/* @keyframes animatezoom {
  from {transform: scale(0)} 
  to {transform: scale(1)}
}
*/
/* Change styles for span and cancel button on extra small screens */
/* @media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}  */
.style_heading {
    color: black;
    /* text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; */
    font-weight: bold;
   /*  margin-left: -157px; */
    /* margin: 0px -14px; */
}

marquee {
    font-size: 23px;
    background: white;
    color: #e82020;
    font-weight: 600;
}

#saleinvceh2 span {
	font-size: 30px; 
	margin-left: 3px;
}

/* #billheading span {
	color: red; 
	margin-right: 10px; 
	font-size: 25px;
} */

.invoice_button input[type=button], input[type=reset] {
	width: 120px;
}

#taxcol .table-responsive {
	height: 17vh;
	margin-bottom: 8%;
	margin-left: 0%;
	width: 100%;
	margin-top: -16px;
}

@media screen and (max-width: 480px) {
#goodrcvcol {
    width: 100% !important;
}
#taxcol {
    width: 100%;
}
}
</style>

</head>
<body class="purchase_form_img vColor"
	onload="getEmpName();">
	<div class="container-fluid">

		<div class="row" style="padding-top: 20px">
		<div id="billheading">
			<!-- <div class="vouch"> -->
<%-- 				<span class="vouchspan" align="left"> Bill No :: <% out.println(BillNo); %></span> --%>
<%-- 				<input type="hidden" readonly="readonly" id="billNo" name="billNo" value=<%=BillNo%>> --%>
					<!-- </div> -->
			</div>
			<div align="center" id="saleinvceh2">
				<span class="form-name style_heading">Edit Tax Invoice</span>
			</div>
			
		</div>

		<div class="row"></div>

		<!-- <div class="row">
			<div class="col-sm-offset-1 col-md-10"> -->
			<div align="center"> 
				<hr style="border-top-color: #c1b1b1;">
			</div>
			<!-- </div>
		</div> -->


		<div class="miscellaneous">

			<form class="form-horizontal" action="" method="post" name="custord">
				<div class="container" id="custdetal">
					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">
							<!-- <input type="text" id="totalQuantity" required />
							<label for="totalQuantity">Total Quantity<sup>*</sup></label> -->
							 <!-- <input type="text" id="billNoBW" autofocus="autofocus" onchange="getEmpName(), getEmpName(), getSaleInvoiceBillDetialsByBillNoOldForRefrance();" required/> -->
							 <input type="text" id="billNoBW" autofocus="autofocus" onchange="getEmpName(); getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling(); getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBillingValidation()" required/>
					        <label class="control-label">Enter Bill No<sup style="color: red;">*</sup></label>
						</div>
					</div>
					<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="taxcol">
								<!-- <input type="text" id="key" autofocus="key" onchange="getEmpName(),getitemData1NewByItemDetailsOldForReferance();" required /> -->
								<input type="text" id="key" autofocus="key" onchange="getEmpName(); getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBillingValidation()" required />
								<label>Barcode No</label>
							</div>
						</div>
						
							<div class="col-md-1"></div>
						
				<div class="invoice_label_up">
					<div class="good_rcv_label_up">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="goodrcvcol" >
						<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"> -->
							<%
								ProductDetailHelper item = new ProductDetailHelper();
								List itemList = item.getAllItemListWithoutBarcodeForBilling(request, response);
							%>
						
							<!-- <input list="itemId_drop" id="itemName" class="" onchange="getEmpName(), getitemData1NewByItemDetailsOldForReferance()" required> -->
							<input list="itemId_drop" id="itemName" class="" onchange="getEmpName(); getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBillingValidation()" required>
							<datalist id="itemId_drop">
								<%
									for (int j = 0; j < itemList.size(); j++) {
										ProductNameBean itm = (ProductNameBean) itemList.get(j);
								%>
								<option data-value="<%=itm.getCaregoryName()%>"
									value="<%=itm.getBarcodeNo()%> ::<%=itm.getItemName()%> :: <%=itm.getSubCat()%> :: <%=itm.getCaregoryName()%>"
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
							<label>Item List<sup>*</sup></label>
				</div>	   
					</div>
						</div>

						<%-- <div class="col-sm-2" align="center">
					     <label class=" control-label" style="font-size:22px;">Employee Name<sup>*</sup></label> 
					     </div>
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
							<%
							EmployeeDetailsDao edd = new EmployeeDetailsDao();
           						List eList =edd.getAllMainEmployee();
							%>
						<input list="emp_drop" id="employee1"  class="form-control" >
				         <datalist id="emp_drop">
							<%
					           for(int i=0;i<eList.size();i++){
					        	   EmployeeDetailsBean emp =(EmployeeDetailsBean)eList.get(i);
							%>
						<option data-value="<%=emp.getEmpId()%>" value="<%=emp.getFirstName() %> <%=emp.getLastName() %>">
							<%
				      			}
				    		%>
						</datalist> 
				    </div>
           			</div> --%>
            			
					</div>

					<div class="invoice_grid">
						<div class="row">
							<div class="table-responsive">
								<!-- <table id="list4"></table> -->
								<table id="list4"></table>
								<div id="jqGridPager"></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">
							<input type="text" id="totalQuantity" required /> <label
								for="totalQuantity">Total Quantity</label>
						</div>
						 <div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">
							<input type="text" id="totalAmount" readonly="readonly" /> <label>Total
								Amount: </label>
						</div>
					</div>

					<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcol">
								<input type="text" id="srTransactionId"
									onkeypress="return isNumber(event)"
									onchange="getSrCreditAmount()" required /> <label
									for="srTransactionId">SR Transaction Id </label>
							</div>
						</div>
						<div class="col-md-1"></div>

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">
							<input type="text" readonly="readonly" id="discount"
								onchange="taxAmountCalc(); callAfterSave()" /> <label>Discount</label>
						</div>
					</div>

					<div class="row">
						<div class="sm_grid">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcol">
								<div class="table-responsive">
									<table id="srCreditAmtGrid"></table>
									<div id="srJqGridPager"></div>
								</div>
							</div>
						</div>
						 <div class="col-md-1"></div>

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">

							<select id="paymentMode">
								<option value="cash">Cash</option>
								<option value="card">Card</option>
								<option value="cashAndCard">Cash And Card</option>
								<option value="Upi">Upi</option>
								<option value="cashAndupi">Cash And Upi</option>
							</select> <label for="paymentMode">Payment Mode:</label>
							<div class="row ">
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
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
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
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
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
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">
											<input type="text" name="cashCard_cashAmount"
												id="cashCard_cashAmount" required /> <label>Cash
												Amount11</label>
										</div>
									</div>
								</div>

								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">
											<input type="text" name="cashCard_cardAmount"
												id="cashAndCard_cardAmount" required /> <label>Card
												Amount22</label>
										</div>
									</div>
								</div>
							</div>
							
							<div id="upi_withaout_cash">
								<div class="col-md-4"></div>
								<!-- <div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">


											<input type="text" name="cashCard_cashAmount1"
												id="cashCard_cashAmount1" required  onkeyup="upicash();" /> <label>Cash
												Amount</label>
										</div>
									</div>
								</div> -->

								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
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
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">


											<input type="text" name="cashCard_cashAmount1"
												id="cashCard_cashAmount1" required  onkeyup="upicash();" /> <label>Cash
												Amount</label>
										</div>
									</div>
								</div>

								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
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
	  		 $("#paymentMode").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque")
		        {
		           	$("#cheque_no").show(); 
		           	$("#neft_acc_no").hide(); 
		           	$("#card_no").hide();
		           	$("#card_without_cash").hide();
		           	$("#cash_and_card").hide();
		           	$("#upi_withaout_cash").hide();
		           	$("#cash_and_upi").hide();
	           	}
	          	 else if($(this).attr("value")=="card")
		        {
			        $("#card_without_cash").show();
		           	$("#cash_and_card").hide();
	          		$("#card_no").hide(); 	
	          		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
		           	$("#upi_withaout_cash").hide();
		           	$("#cash_and_upi").hide();
	            }
	          	else if($(this).attr("value")=="neft")
		        {
	           		$("#neft_acc_no").show(); 	
	           		$("#card_no").hide(); 
	        		$("#cheque_no").hide();
		           	$("#card_without_cash").hide();
		           	$("#cash_and_card").hide();
		           	$("#upi_withaout_cash").hide();
		           	$("#cash_and_upi").hide();
	            }
	          	else if($(this).attr("value")=="cash")
		        {
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide();
		           	$("#card_without_cash").hide();
		           	$("#cash_and_card").hide();
		           	$("#upi_withaout_cash").hide();
		           	$("#cash_and_upi").hide();
	            }
	          	else if($(this).attr("value")=="cashAndCard")
		        {
	          		$("#cash_and_card").show();
		           	$("#card_without_cash").hide();
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide(); 
		           	$("#upi_withaout_cash").hide();
            		$("#cash_and_upi").hide();
	             }
	          	else if($(this).attr("value")=="cashAndupi")
		        {
	          		$("#cash_and_upi").show();
		           	$("#upi_withaout_cash").hide();
		           	$("#card_without_cash").hide();
	         		$("#cash_and_card").hide();
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide(); 
	             }
	         	else if($(this).attr("value")=="Upi")
	         	{
		           	$("#upi_withaout_cash").show();
	          		$("#cash_and_upi").hide();
		           	$("#card_without_cash").hide();
	          		$("#cash_and_card").hide();
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
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcol">
								<%
									System.out.println("LOGIN TYPE ===> " + type1);
									CustomerDetailsDao cdd = new CustomerDetailsDao();
									List cList = cdd.getAllMiscellaneousCustomer(request,response);
								%>
								<input list="cust_drop" id="creditCustomer1" required>
								<datalist id="cust_drop"> <%
								 	for (int i = 0; i < cList.size(); i++) {
								 		OtherBill cust = (OtherBill) cList.get(i);
								 %>
								<option data-value="<%=cust.getPkBillId()%>"
									value="<%=cust.getPkBillId()%>,<%=cust.getCreditCustomer1()%>">
									<%
										}
									%>
								
								</datalist>
								<label>Customer Name</label>
							</div>
						</div>
				  <div class="col-md-1"></div>
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcol">
							<input type="text"  id="CustGst" /> <label
								for="Cashbycust">Customer Gst No.</label>
						</div>
						</div>
					</div>
					

					<div class="row">

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
							id="taxcol">
							<input type="text" readonly="readonly" id="totalCreditAmt" /> <label
								for="totalCreditAmt">Total Credit Amount</label>
						</div>
						 <div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">

							<input type="text" id="grossTotal" readonly="readonly"
								style="background-color: #fab787;" />
								<label class="newlabelback"> Gross Total</label>
						</div>
					</div>

					<div class="row">

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
							id="taxcol">
							<input type="text"  id="Cashbycust" onkeyup="Returncash()" /> <label
								for="Cashbycust">Cash Given By Customer </label>
						</div>
						 <div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">

							<input type="text" id="RetCash" readonly="readonly"
								style="background-color: red;"/>
								<label class="newlabelback">Return Cash</label>
						</div>
					</div>
					
					  <div class="row">

						<div class=  "col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
								id="taxcol">
								<input type="text" id="mobileNo" maxlength="10" required />
								<label>Mobile No</label>
									
							</div>
						</div>
					</div>

					<div class="row" id="btnrow">
					<div class="invoice_button">
						
							<!-- <div class="col-md-2" style="display: inline-block;"> -->
								<input type='button'
									class="btn btn-success btn-lg bottomButtons btnwidth" id="btnSubmit"
									value="Print Bill111" onclick="editSaleInvoceBillingValidation();">
							<!-- </div> -->

							<!-- <div class="col-md-2" style="display: inline-block;"> -->
								<!-- <input type='button' class="btn btn-primary btn-lg bottomButtons btnwidth" id="newBill"
									value="New Bill" onclick="window.open('newBillTaxInvoice.jsp')"> -->
							<!-- </div> -->
							
							<!-- <div class="col-md-2" style="display: inline-block;"> -->
								<input type="reset" value="Cancel" onclick="window.location.reload()"
									class="btn btn-lg btn-danger btn-md btnwidth" />
							<!-- </div> -->

 							<!-- <div class="col-md-2" style="display: inline-block;"> -->
								<!-- <input type='button' class="btn btn-success btn-lg bottomButtons btnwidth"
								id="btnSubmit1" value="Hold Bill" onclick="resotherbill1();"> -->
								
							<!-- </div> -->

							<!-- <div class="col-md-2" style="display: inline-block;"> -->
								<!-- <input type='button' class="btn btn-primary btn-lg bottomButtons btnwidth" id="newBill"
									value="Edit Bill" onclick="document.getElementById('id01').style.display='block'"> -->
						<!-- 	</div>  -->
							<input type='button' class="btn btn-primary btn-lg bottomButtons btnwidth" id="btnHoldBillPrint"
							 value="Hold Bill Print" onclick="taxInvoiceHoldBillEditAndPrint();">
						</div>
					</div>



				</div>
			</form>
		</div>
	</div>
<!-- ==================================================================== TAX INVoice Starts Here ================================================================ -->
					
	<!-- <div class="container-fluid" style="border: 3px solid; padding-bottom: 20px; display: none; margin-bottom:35px;" id="suppDetailsDiv"> -->
     <div id="id01" class="modal1">
		
		
		<form class="modal-content1 animate" action="" name="custord1">
		<div class="container" style="" id="custdetal">
		<!-- <div class="btnclose">
		 <span onclick="window.location.reload()" class="close" title="Close Modal">&times;</span>
		</div> -->
				
		<div class="row">
			<div id="categorydetailsh2" align="center">
				<h2 class="form-name style_heading">Tax Invoice</h2>
			</div>
		</div>
		 
		<div class="row">
			<div class=" col-md-12" align="center">
				<hr style="border-top-color: #000000;">
			</div>
		</div>
		<div class="miscellaneous">
			<div class="row form-group">
			<div class="invoice_label_up">
			
			
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcolpopup">
								<%
											CustomerDetailsDao sdd88 = new CustomerDetailsDao();
											List sList88 = sdd88.getAllMiscellaneousCustomerBillNo(request, response);
										%>
								<input  list="Bill_drop5" id="TempBillNo" onchange="getEmpName(), getitemData111();"
									style="margin-bottom: 6px;" required /> <label>Bill
									No</label>
							</div>
							<datalist id="Bill_drop5">
											<%
												for (int i = 0; i < sList88.size(); i++) {
													OtherBill sup88 = (OtherBill) sList88.get(i);
											%>
											<option data-value="<%=sup88.getPkBillId()%>>"
												value="<%=sup88.getBillNo()%>"></option>
											<%
												}
											%>
										</datalist>
							
							
						</div>
							<div class="col-md-1"></div>
			
			</div>
			<div class="row form-group">
		
							<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 size"
								id="taxcolpopup">
								<input type="text" id="key1" autofocus="key1"
									onchange="getEmpName111(),getitemData111();"
									style="margin-bottom: 6px;" required /> <label>Barcode
									No</label>
							</div>
						</div>
							<div class="col-md-1"></div>
									
				<div class="invoice_label_up">
					<div class="good_rcv_label_up">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-9" id="taxcolpopup" >
						<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"> -->
							<%
								ProductDetailHelper item1 = new ProductDetailHelper();
								List itemList1 = item1.getAllItemListWithoutBarcodeForBilling(request, response);
							%>
						
							<input list="itemId_drop1" id="itemName1" class="" onchange="getEmpName(), getitemData111();" style="background-color: #f0f0f0" >
							
							<datalist id="itemId_drop1">
								<%
									for (int j = 0; j < itemList1.size(); j++) {
										ProductNameBean itm1 = (ProductNameBean) itemList1.get(j);
								%>
								<option data-value="<%=itm1.getCaregoryName()%>"
									value="<%=itm1.getItemName()%> :: <%=itm1.getCaregoryName()%> :: <%=itm1.getSubCat()%>"
									myvalue="<%=itm1.getItemName()%>"
									myvalue1="<%=itm1.getSubCatid()%>"
									myvalue2="<%=itm1.getProductid()%>"
									myvalue3="<%=itm1.getColor()%>" 
									myvalue4="<%=itm1.getSize()%>"
									myvalue5="<%=itm1.getFkCatId()%>"									
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
		<div class="invoice_grid">
			<div class="row" >
				<div class="table-responsive" style="margin-left: 4%;">
					<table id="list5"></table>
						<div id="jqGridPager1"></div>
				</div>
			</div>
		</div>
					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcolpopup">
							<input type="text" id="totalQuantity1" readonly="readonly" /> <label
								for="totalQuantity">Total Quantity</label>
						</div>
						 <div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcolpopup">
							<input type="text" id="totalAmount1" readonly="readonly" /> <label>Total
								Amount: </label>
						</div>
					</div>
				
					<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcolpopup">
								<input type="text" id="srTransactionId1"
									onkeypress="return isNumber(event)"
									onchange="getSrCreditAmount111()" required /> <label
									for="srTransactionId">SR Transaction Id </label>
							</div>
						</div>
						 <div class="col-md-1"></div>

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcolpopup">
							<input type="text" readonly="readonly" id="discount1"
								onchange="taxAmountCalc1(); callAfterSave()" /> <label>Discount</label>
						</div>
					</div>

					<div class="row">
						<div class="sm_grid">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcolpopup">
								<div class="table-responsive">
									<table id="srCreditAmtGrid1"></table>
									<div id="srJqGridPager1"></div>
								</div>
							</div>
						</div>
						 <div class="col-md-1"></div>

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcolpopup">

							<select id="paymentMode1">
								<option value="cash">Cash</option>
								<option value="card">Card</option>
								<option value="cashAndCard">Cash And Card</option>
								<option value="Upi">Upi</option>
								<option value="cashAndupi">Cash And Upi</option>
							</select> <label for="paymentMode">Payment Mode:</label>
							<div class="row ">
								<div id="cheque_no1">
									<div class="col-md-3 col-md-offset-5 first">
										<input class="form-control" type="text" name="chequeNum"
											id="chequeNum1" placeholder="Cheque No." />
									</div>
									<div class="col-md-3  first">
										<input class="form-control" type="text" name="nameOnCheck"
											id="nameOnCheck1" placeholder="Name On Cheque" />
									</div>
								</div>

								<div id="card_no1" class="form-group">
									<div class="col-md-3 col-md-offset-8 first">
										<input class="form-control" type="text" name="cardNum"
											id="cardNum1" placeholder="Card No." />
									</div>
								</div>

								<div id="neft_acc_no1" class="form-group">
									<div class="col-md-3 col-md-offset-5 first">
										<input class="form-control" type="text" name="accNum"
											id="accNum1" placeholder="Account No." />
									</div>
									<div class="col-md-3 first">
										<input class="form-control" type="text" name="bankName"
											id="bankName1" placeholder="Name Of Bank" />
									</div>
								</div>
							</div>

							<div id="cash_and_card1">
								<div class="col-md-4"></div>

								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">


											<input type="text" name="cashCard_cashAmount"
												id="cashCard_cashAmount1" required /> <label>Cash
												Amount3EE</label>
										</div>
									</div>
								</div>

								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">
											<input type="text" name="cashCard_cardAmount"
												id="cashCard_cardAmount1" required /> <label>Card
												Amount3FF</label>
										</div>
									</div>
								</div>
							</div>
							
							<div id="cash_and_upi1">
								<div class="col-md-4"></div>

								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">


											<input type="text" name="cashCard_cashAmount1"
												id="cashCard_cashAmount11" required  onkeyup="upicash1();" /> <label>Cash
												Amount4GG</label>
										</div>
									</div>
								</div>

								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">
											<input type="text" name="cashCard_upiAmount"
												id="cashCard_upiAmount1" required /> <label>Upi
												Amount4HH</label>
										</div>
									</div>
								</div>
							</div>
						</div>

							

						<script>
		$(document).ready(function(){
	  		 $("#paymentMode1").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque")
		        {
		           	$("#cheque_no1").show(); 
		           	$("#neft_acc_no1").hide(); 
		           	$("#card_no1").hide();
		           	$("#cash_and_card1").hide();
		           	$("#cash_and_upi1").hide();
	           	}
	          	 else if($(this).attr("value")=="card")
		        {
	          		$("#card_no1").hide(); 	
	          		$("#neft_acc_no1").hide(); 
	        		$("#cheque_no1").hide();
		           	$("#cash_and_card1").hide();
		           	$("#cash_and_upi1").hide();
	            }
	          	else if($(this).attr("value")=="neft")
		        {
	           		$("#neft_acc_no1").show(); 	
	           		$("#card_no1").hide(); 
	        		$("#cheque_no1").hide();
		           	$("#cash_and_card1").hide();
		           	$("#cash_and_upi1").hide();
	            }
	          	else if($(this).attr("value")=="cash")
		        {
            		$("#neft_acc_no1").hide(); 
            		$("#cheque_no1").hide();
            		$("#card_no1").hide();
		           	$("#cash_and_card1").hide();
		           	$("#cash_and_upi1").hide();
	            }
	          	else if($(this).attr("value")=="cashAndCard")
		        {
	          		$("#cash_and_card1").show();
            		$("#neft_acc_no1").hide(); 
            		$("#cheque_no1").hide();
            		$("#card_no1").hide(); 
            		$("#cash_and_upi1").hide();
	             }
	          	else if($(this).attr("value")=="cashAndupi")
		        {
	         		$("#cash_and_card1").hide();
	          		$("#cash_and_upi1").show();
            		$("#neft_acc_no1").hide(); 
            		$("#cheque_no1").hide();
            		$("#card_no1").hide(); 
	             }
	         	else if($(this).attr("value")=="Upi"){
	          		$("#cash_and_card1").hide();
	          		$("#cash_and_upi1").hide();
	          		$("#card_no1").hide(); 	
	          		$("#neft_acc_no1").hide(); 
	        		$("#cheque_no1").hide();
	           }
	       });
	   }).change();
		});	
		</script>
	</div>		
<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcolpopup">
								<%
									System.out.println("LOGIN TYPE ===> " + type1);
									CustomerDetailsDao cdd1 = new CustomerDetailsDao();
									List cList1 = cdd1.getAllMiscellaneousCustomer(request,response);
								%>
								<input list="cust_drop1" id="creditCustomer11" required>
								<datalist id="cust_drop1"> <%
								 	for (int i = 0; i < cList1.size(); i++) {
								 		OtherBill cust1 = (OtherBill) cList1.get(i);
								 %>
								<option data-value="<%=cust1.getPkBillId()%>"
									value="<%=cust1.getCreditCustomer1()%>">
									<%
										}
									%>
								
								</datalist>
								<label>Customer Name</label>
							</div>
						</div>
				  <div class="col-md-1"></div>
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcolpopup">
								<input type="text" id="mobileNo1" maxlength="10" required /> <label>Mobile
									No</label>
							</div>
						</div>
					</div>
					

					<div class="row">

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
							id="taxcolpopup">
							<input type="text" readonly="readonly" id="totalCreditAmt1" /> <label
								for="totalCreditAmt">Total Credit Amount</label>
						</div>
						 <div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcolpopup">

							<input type="text" id="grossTotal1" readonly="readonly"
								style="background-color: #fab787;" /> <label> Gross
								Total</label>
						</div>
					</div>

<div class="row">

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
							id="taxcolpopup">
							<input type="text"  id="Cashbycust1" onkeyup="Returncash1()" /> <label
								for="Cashbycust">Cash Given By Customer </label>
						</div>
						 <div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcolpopup">

							<input type="text" id="RetCash1" readonly="readonly"
								style="background-color: red;"/> <label> Return Cash
								</label>
						</div>
</div>						


					<!-- <div class="invoice_button"> -->
						<div class="row" id="btnrow">
						<div class="invoice_button">
							<!-- <div class="col-md-2" style="display: inline-block;"> -->
								<input type='button'
									class="btn btn-success btn-lg bottomButtons btnwidth" id="btnSubmit1"
									value="Print Bill" onclick="ok();">
							<!-- </div> -->

							<!-- <div class="col-md-2" style="display: inline-block;">
								<input type='button'
									class="btn btn-primary btn-lg bottomButtons" id="newBill"
									value="New Bill" onclick="window.open('newBillTaxInvoice.jsp')"
									style="width: 120px;">
							</div> -->

							<!-- <div class="col-md-2" style="display: inline-block;"> -->
								<input type="reset" value="Cancel"
									onclick="window.location.reload()"
									class="btn btn-lg btn-danger btn-md btnwidth"/>
							<!-- </div> -->
							</div>
 
				</div>
			
				
<!-- </div> -->	
</div>
</div>
</form>

</div>	
			
					
<!-- ============================================================== /TAXINVOICE ===================================================-->


</body>
<script>
// Get the modal
var modal1 = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
/* window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    } */
//}
</script>
 <%
								OtherBillDao stockProductDao=new OtherBillDao();
								List ProductList=stockProductDao.HOldBills(); 
								
				    		%>
<div class="marquee">
	 <marquee scrollamount="15">
	 
	 <%
	 	 	if(ProductList.size()!=0)
	 	 	{
	 	 		for (int i = 0; i < ProductList.size(); i++) {

	 	 			OtherBill bean = (OtherBill) ProductList.get(i);
	 	 			out.println("Customer Name :=> " + bean.getCreditCustomer1() + " | ");
	 	 			out.println("HOLD BILL NO :=> " + bean.getBillNo() + " , ");
	 	 			

	 	 		}
	 	 	}
	 	 	else
	 	 	{
	 	 		out.println("No Bill Are In Hold");
	 	 	}
	 	 %>
	 
	    </marquee> 
	</div>
<div class="row footer_margin_top" align="center">
	<%@include file="y_commons/footer.jsp"%>
</div>
</html>