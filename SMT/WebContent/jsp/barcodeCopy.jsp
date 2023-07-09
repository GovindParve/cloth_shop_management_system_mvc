<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.GoodReceive"%>
<%@page import="com.smt.helper.GoodReceiveHelper"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js" type="text/javascript"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
<script src="/SMT/staticContent/js/jquery.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/y_js/modernizr.js" type="text/javascript"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/y_js/barcodeDetail.js" type="text/javascript"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">

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
	z-index: -1;
	opacity: 0.6;
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
}
.btnwidth {
	width: 130px !important; 
	border-radius: 10px !important; 
	padding: 10px !important;
}
</style>
<body class="vColor">
	<div class="container-fluid">
		<div class="row">
			<!-- <div class="form-group" align="left">
				<div class="col-md-3 control-label" style="padding-top: 3%;">
				</div>
			</div> -->

			<div class="" align="center" id="categorydetailsh2">
				<h2 class="form-name style_heading">Barcode Management</h2>
			</div>

		</div>

		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		<div class="miscellaneous">
			<form action="bsrcode" method="post" name="barcodeCopy" class="form-horizontal"> 
				<div class="container" id="custdetal">
					<div class="row">
						<div class="form-group">
							<%
								GoodReceiveHelper helper = new GoodReceiveHelper();
								List mainCategoryList = helper.getAllMainBarcodeNo();
							%>
							<div class="invoice_label_up">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">

									<input list="barcodeId_drop" id="barcodeId" required>
									<datalist id="barcodeId_drop">
										<%
											for (int i = 0; i < mainCategoryList.size(); i++) {
												GoodReceive category = (GoodReceive) mainCategoryList.get(i);
										%>
										<option data-value="<%=category.getBarcodeNo()%>"
											value="<%=category.getBarcodeNo()%>::>><%=category.getCatName()%>:><%=category.getItemName()%>::>><%=category.getColor()%>::>><%=category.getSize()%>::>><%=category.getQuantity()%>">
											<%
												}
											%>
										
									</datalist>
									<label>Enter Barcode No <sup style="color: red">*</sup></label>

								</div>
							</div>
							<div class="col-md-1"></div>
							<div class="invoice_label_up">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									<input type="text" id='quantity' name="quantity">
									<label>Quantity <sup style="color: red;">*</sup></label>
								</div>
							</div>
						</div>
					</div>

					<div class="row" id="btnrow">
						<div class="invoice_button" align="center">
							<!-- <div class="col-lg-2" style="display: inline-block;"> -->
								<input type="button" onclick="return printbarcode();" name="btn" id="btn" value="Print Barcode"
									class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
							<!-- </div> -->
							<!-- <div class="col-lg-2" style="display: inline-block;"> -->
								<input type="reset" value="Cancel"
									class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth" />
							<!-- </div> -->
						</div>
					</div>
				</div>
			</form>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>