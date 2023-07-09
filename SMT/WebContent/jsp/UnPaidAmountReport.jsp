<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"
	type="text/javascript"></script>
	
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
	
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
	
<script src="/SMT/staticContent/js/cashbankbook.js"></script>
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
    opacity: 0.6;
    z-index:-1;
    right: 1%;
 }
#profitreport {
    width: 50%;
    margin-left: 25%;
}
.miscellaneous {
    position: relative;
    margin-top: 0px !important;
    /* left: 1%; */
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
    opacity: 0.6;
    z-index: -1;
}
#profitreport {
    width: 70%;
    margin-left: 15%;
}
}
.btnwidth {
	padding-bottom: 32px !important;
}

@media screen and (max-width: 480px) {
#profitreport {
    width: 100%;
    margin-left: 0%;
}
.dataTables_wrapper .dataTables_filter input {
    width: 70%;
}
button.dt-button, div.dt-button, a.dt-button {
    margin: 5px;
}
}
</style>

<body class="stock_form_img vColor">
	<div class="container" id="reportheight">
		<div class="row">
			<div align="center" id="prolossheading">
				<h2 class="form-name style_heading">Supplier Balance Report</h2>
			</div>
		</div>
		<div class="row" hidden="true">
			<div class="form-group" align="right">
				<div class="col-sm-offset-8 col-md-4 control-label">
					<div id="date">
						<label id="demo"></label>
						<script>
							   var date = new Date();
							   document.getElementById("demo").innerHTML = date.toDateString();
							</script>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		
		 <div class="miscellaneous">		
		<form action="cashAmount" method="post" class="form-horizontal">
			<div class="invoice_label_up">
				<div class="row">
					<div class="container">
						 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="profitreport">	
					
							<%
								SupplierDetailDao sdd88 = new SupplierDetailDao();
           						List sList88 =sdd88.getAllSupplier();
							%>
							<input list="sup_drop" id="supplier" required>
							<datalist id="sup_drop">
								<%
					           for(int i=0;i<sList88.size();i++){
					        	   SupplierDetail sup88 =(SupplierDetail)sList88.get(i);
							%>
								<option data-value="<%=sup88.getSupplierId()%>"
									value="<%=sup88.getSupplierName() %>">
									<%
				      			}
				    		%>
								
							</datalist>
							<label for="supplier">Supplier Name <sup style="color: red">*</sup></label>
					</div>
					</div>
				
					<!-- <div class="col-md-2" id="btnblnc"> -->
						<div id="btnrow" align="center">
					<div class="invoice_button">
							<input type="button" id="btn" name="save" onclick="getUnBillnoTotalAmount()" value="Search" 
								class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
						</div>
						</div>
					<!-- </div> -->
					</div>
					
				</div>
			
		</form>	
		</div>
			
			<br>
			<div class="row" align="center">
				<div class="col-lg-12" style="width: 100%">
					<table class="table table-bordered table-striped table-condensed cf"
						id="unPaidAmt" class="display"
						style="border: 1px solid #fff; border-collapse: collapse;">
						<thead>
							<tr>
								<th>Supplier Name</th>
								<th>UnPaid Amount</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="1" style="text-align: right">Total:</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
</body>
</html>
