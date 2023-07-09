<!-- this is product details jsp -->
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>

<head>
<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script> -->
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/product_detail.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/popupwindow.css">
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.popupwindow.js"></script>
<script src="/SMT/staticContent/js/shopDetails.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">

<script type="text/javascript">
	function shopList() {
		window.location = "shopDetailsList.jsp";
	}
</script>
</head>
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
#dayreport {
    margin-left: 30%;
    width: 40%;
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
@media screen and (max-width: 992px) {
#dayreport {
    margin-left: 20%;
    width: 60%;
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
#dayreport {
    margin-left: 10%;
    width: 80%;
}	
}
.btnwidth {
	width: 130px !important; 
	padding-top: 10px !important;
}
@media screen and (max-width: 580px) {
#categoryListOfProductDetails {
    margin-left: 0%;
}	
}

@media screen and (max-width: 480px) {
#dayreport {
    margin-left: 5%;
    width: 90%;
}
}
</style>
<body class="vColor">
	<div class="container-fluid">
		<div class="row">
<div class="form-group" align="left">
				<div class="control-label" style="padding-top: 3%;">
				</div>
				</div>

			<div class="" align="center" id="">
				<h2 class="form-name style_heading">Bill Cancel</h2>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		
		<div class="miscellaneous">
			<form action="pro" method="post" name="prod" class="form-horizontal">
				<div class="" id="">
					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"	id="dayreport">
							<input type="text"  id='billno' name='billno'>
							<label>Bill No<sup style="color: red;">*</sup></label>
						</div>						
					</div>

					
					<div class="row" id="btnrow">
						<!-- 	<h3 align="center" style="color: red; font-size: 17px;">Please Give Size 'mtr' for fabric Type of Products</h3> -->
						<!-- <div align="center"> -->
						<div class="invoice_button">
							<!-- <div class="col-lg-2" style="display: inline-block;"> -->
								<input type="button" onclick="billcancel();" name="btn" id="btn" value="Save" 
									class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
								<!-- <input type="button" onclick="shopList()" name="btn" style="width: 140px;" value="List" class="btn btn-lg btn-primary btn-md button_hw button_margin_right" /> -->
							<!-- </div> -->
							<!-- <div class="col-lg-2" style="display: inline-block;"> -->
								<input type="reset" value="Cancel" onclick="window.location.reload()"
									class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth" />
							<!-- </div> -->
							</div>
						<!-- </div> -->
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