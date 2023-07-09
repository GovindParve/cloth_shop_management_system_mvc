<%@page import="com.smt.bean.BillCopy"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.OtherBillDao"%>
<% boolean isHome=false; %>
<%@include file="y_commons/header1.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">	
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script src="/SMT/staticContent/js/billCopy.js"></script>
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
    top: 20px;
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
    z-index:-1;
    opacity: 0.6;
 }
 .col-md-offset-4 {
    margin-left: 20.66667%;
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
.col-md-offset-4 {
    margin-left: 23.66667%;
}
}
@media ( max-width : 991px) {

.col-md-offset-4 {
    margin-left: 7.66667%;
}
}
@media ( min-width : 768px) and (max-width: 979px)
{
	.mainWrap {
		width: 768px;
	}
	/* .menu ul {
		top: 37px;
	} */
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
    right: 1%;
    z-index: -1;
    opacity: 0.6;
}
.container {
    width: 100%;
    margin-left: 0%;
}
}

@media screen and (max-width: 480px) {
.container {
    width: 100% !important;
}
}
.btnwidth {
	border-radius: 10px !important;
}
</style>
</head>
<body class="vColor">
	<div class="container" style="float: center;" align="center">
		<div class="row">
			<div class="" align="center" id="categorydetailsh2">
				<h2 class="form-name style_heading">Tax Invoice Copy</h2>
			</div>
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		<div class="miscellaneous">
		<form action="" method="post" name="genIn" >
			<%
			    OtherBillDao fd = new OtherBillDao();
				List list = fd.getBillNo(request, response);
			%>
		<div class="container">				
			<div class="row">
		<!-- 	<div class="col-md-4"></div> -->
				<div class="invoice_label_up">
						 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="invoicereprintcol">	
					
						<input list="seedBillNo" id="BillNo" required>
						<datalist id="seedBillNo"> <%
					               		for(int i=0;i<list.size();i++){
					               			BillCopy billList=(BillCopy)list.get(i);
									%>
						<option data-value="<%=billList.getBillNo()%>"
							value="<%=billList.getBillNo()%>">
							<%
										}
									%>
						
						</datalist>
						<label> Bill Number <sup style="color: red;">*</sup></label>
						
						<div class="row" id="btnrow">
					<div class="invoice_button">
						<button type="button" onclick="validateGenerateBillCOPYForOtherBill()" name="btn"
							class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth">Print
						</button>
						</div>
						</div>
						
						</div>
						</div>
				
				
		<!-- 
			 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" align="center" id="invoicereprintcol">	
						<button type="button"
							onclick="validateGenerateBillCOPYForOtherBill()" name="btn"
							class="btn btn-large btn-success btn-md button_hw button_margin_right" style="border-radius:10px;">Print
						</button>
					</div> -->
				
				
			</div>
			</div>
		</form>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>