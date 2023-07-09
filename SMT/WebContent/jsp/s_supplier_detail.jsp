<%@page import="com.smt.bean.TaxDetailsList"%>
<%@page import="com.smt.dao.VatEntryDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>

<!DOCTYPE html>
<html lang="en">
<head>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
	 <script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
    <!--  <script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script> -->
     <script src="/SMT/staticContent/y_js/supplier.js"></script>
	 <link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/supplierDetails.css">
	 <link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">

<script type="text/javascript">
function suppList()
{
	window.location = "s_supplier_list.jsp";
}
function editSupp()
{
	window.location = "s_SupplierEdit.jsp";
}
function deleteSupp()
{
	window.location = "s_SupplierDelete.jsp";
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
    top: 1%;
    right: 2%;
}
#logo {
    width: 110px;
    height: auto;
    position: fixed;
    top: 9%;
    right: 1%;
    z-index:-1;
    opacity: 0.6;
 }
.supplier_details select {
	width: 99%; 
} 

@media ( min-width : 980px) and (max-width:1180px)
{
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
#logoutButton{
width: 70px;
position: fixed;
top: 3%;
right: 2%;
font-size: 12px
}

.span {
	position: absolute;
	top: 3px;
	left: 18px;
	padding: 10px 0;
	font-size: 16px;
	color: #000;
	pointer-events: none;
	transition: .5s;
	font-weight: bold;
}
#currentUser{
 color: orange; 
 font-weight: 600;
 font-size: 14px;
position: fixed;
    top:1%;
    right: 2%;
}
#logo{
width: 110px;
    height: auto;
    position: fixed;
    top: 10%;
    right: 2%;
    z-index: -1;
    opacity: 0.6;
}
.supplier_details select {
	width: 100%;
}
}

@media ( min-width : 768px) and (max-width: 979px)
{
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
#logoutButton{
width: 70px;
font-size:11px;
position: fixed;
top: 12px;
right: 44px;
}
#currentUser{
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
    right: 2%;
    z-index: -1;
    opacity: 0.6;
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
}
.btnwidth {
	border-radius: 10px;
	width: 130px !important;
}
</style>

</head>
<body class="vColor">

<!-- 	<div class="container col-md-offset-5">  -->
		<div class="supplier_details">
			
			<div align="center" class="">
				<h2>Supplier Details</h2>
			</div>	
					<!-- <div class="row"> -->
				<div class="col-md-12" align="center">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			<!-- </div> -->
			
			
	<form action="supplier" name="supd" method="post">
		<div class="supplierfields">
			<div class="container">
	
		<div class="row">		
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport" >
		
			<select id="type" name="type" name="Select Type">
			<option value="selectoption" >Select Supplier Type </option>
			<option value="registered">Registered</option>
			<option value="unregistered">Unregistered</option>
			<option value="registeredcomposite">Registered Composite</option>
			
			</select> <span class="sub">Supplier Type<sup style="color: red;">*</sup></span>
			
			
			
			 
			</div>
			<!-- </div> -->
		<!-- <div class="row"> -->
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
			
					<input type="text" class="" name="supplierName" id="supplierName" autocomplete="off" required/>
						<span>Supplier Name<sup style="color: red">*</sup></span>
				</div>	
				 <!-- <div class="col-lg-1 col-md-1"></div> --> 
					
			    <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input class="" type="text" id="address" name="address" autocomplete="off" required/>
						<span>Address</span>
				</div>			
	
		<!-- </div> -->
		
						<!-- <div class="row"> -->
					<div class="col-md-6  col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					     <input type="text" class="" name="supplierCode" id="supplierCode" autocomplete="off" required/> 
						<span>Supplier Code</span>
					</div>
                        <!--  <div class="col-lg-1 col-md-1"></div>  -->
					
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					    	<select class="" id="vatName" name="vatName">
							<option value="GST">GST</option>
							<option value="IGST">IGST</option>
						</select>
					<!-- 	<span>Tax Type</span> -->
						
					</div>
			<!-- </div> -->
						
			<!-- <div class="row"> -->
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
	
					<input class="" type="text" id="city" name="city" autocomplete="off" required />
						<span>City<sup style="color: red">*</sup></span>
			</div>
			      <!-- <div class="col-lg-1 col-md-1"></div> -->

					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input type="text" id="pin" name="pin" maxlength="6" class="" autocomplete="off" required />
					<span>Pin Code</span>
					</div>	
			<!-- </div> -->

			<!-- <div class="row"> -->
		
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input type="text" id="contactPerson" name="contactPersonSupp" class="" autocomplete="off" required />
					 <span>Person Name</span>
				</div>
			<!-- <div class="col-lg-1 col-md-1"></div> -->
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input type="text" id="mobileno" name="mobileno" maxlength="10" class="" autocomplete="off" required />
					 <span>Mobile No<sup style="color: red">*</sup></span>
				</div>	
			<!-- </div> -->

			<!-- <div class="row"> -->
			
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input type="text" id="email" name="email" class="" autocomplete="off" required/>
					 <span>E-mail</span>
				</div>
				<!-- <div class="col-lg-1 col-md-1"></div> -->

				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input type="text" id="panNo" name="panNo" class="" autocomplete="off" required/>
					 <span>GST/TIN/UIN No</span>
				</div>
			<!-- </div>
			<div class="row"> -->
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input type="text" id="accountname" name="" class="" autocomplete="off" required/>
					 <span>Supplier Account Name</span>
				</div>
				<!-- <div class="col-lg-1 col-md-1"></div> -->
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input type="text" id="account" name="" class="" autocomplete="off" required/>
					 <span>Account Number</span>
				</div>
				
			<!-- </div> -->
			
			<!-- <div class="row"> -->
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input type="text" id="ifsc" name="" class="" autocomplete="off" required/>
					 <span>IFSC Code</span>
				</div>
				<!-- <div class="col-lg-1 col-md-1"></div> -->
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input type="text" id="upiid" name="" class="" autocomplete="off" required/>
					 <span>UPI ID</span>
				</div>
				
			<!-- </div> -->
			
		</div>
			<div class="row" id="btnrow">
			
			<div class="invoice_button">
					<!-- <div class="col-md-1" id="supplierbtn"> -->
					    <input type="button" value="Save" id="btn" onclick="validateSupplierDetails()" class="btn btn-large btn-success btn-md btnwidth" />
					<!-- </div> -->
					
					<!-- <div class="col-md-1" id="supplierbtn"> -->
					    <input type="reset" value="Cancel" class="btn btn-large btn-danger btn-md btnwidth" />
					<!-- </div> -->
					
					<!-- <div class="col-md-1" id="supplierbtn"> -->
					    <input type="button" name="btn" onclick="suppList();" value="List" class="btn btn-large btn-info btn-md btnwidth" />
					<!-- </div> -->
					
					<!-- <div class="col-md-1" id="supplierbtn"> -->
					    <input type="button" value="Edit" onclick="editSupp()" class="btn btn-large btn-primary btn-md btnwidth" />
				    <!-- </div> -->

					<!-- <div class="col-md-1" id="supplierbtn"> -->
					    <input type="button" value="Delete" onclick="deleteSupp()" class="btn btn-large btn-danger btn-md btnwidth" />
				   <!-- </div> -->	
				   
				   </div>			
			</div>
		
		</div>
		</form>
	
	</div>
	
<!-- </div> -->
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	
</body>
</html>
