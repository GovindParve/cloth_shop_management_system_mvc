<%@page import="java.util.List"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.hibernate.GoodReceive"%>

<%boolean isHome = false;%>
<%@include file="y_commons/header1.jsp"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Set Offer Discount</title>

</head>
<!--  <script type="text/javascript" src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>-->
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/newgoodsreceived.js"></script>
<script>

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
	padding-bottom: 10px !important;
	width: 130px !important;
}
</style>
<body>
<div class="container-fluid">
<div class="row">
		<div class="form-group" align="left">
			<div class="control-label">
				</div>
			</div>
			
			<div class="" align="center" id="" style="padding-top: 20px;">
		<h2 class="form-name style_heading">Set Discount Offer</h2>
	</div>

</div>
<div class="row">
	<div class="col-md-12" align="center">
		<hr style="border-top-color: #c1b1b1;">
	</div>
</div>
<div class="miscellaneous">
	<form class="form-horizontal" method="post" action="" name="setDisOffer">
		
		<div class="container" id="">
			<div class="row">
<!-- 
		 <div class="col-md-4 col-lg-4"></div>


		<div class="row">
			<div class="col-md-4 col-lg-4"></div>

			</div> -->
			
			 <div class="invoice_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				<input id="fromBarC" name="fromBarC" type="text" autocomplete="off" required>
				<label for="firstName">Barcode No From<sup>*</sup></label>
				<!-- <div class="bar"></div> -->
				</div>
			</div>
				
				
				
			<div class="col-md-1"></div>
			
			
        <div class="invoice_label_up">
		   <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				 <input id="toC" name="toBarC" type="text" autocomplete="off" required>
				 <label for="middleName">Barcode No To<sup>*</sup></label>
				 	<!-- <div class="bar"></div> -->
		   </div>
		</div>
		</div>
		<div class="row">
		<div class="invoice_label_up">
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
						<input id="disPercentage" name="disPercentage" type="text" autocomplete="off" required>
						</datalist>
			        	<label for="employeename">Discount (%)</label>
			        	<!-- <div class="bar"></div> -->
			        	
				</div>
				</div>
			
			<div class="col-md-1"></div>
		
		<div class="invoice_label_up">
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
						<input id="disPercentage" name="disPercentage" type="text" autocomplete="off" required>
						</datalist>
			        	<label for="employeename">Discount (%)</label>
			        	<!-- <div class="bar"></div> -->
			        	
				</div>
				</div>

				
				</div>	
				
			
			
			
		
			<div class="row">
			<div class="invoice_button">
				<!-- <div class="col-lg-2" style="display: inline-block;"> -->
						
						<input type="button" id="save" name="btn" onclick="setOfferDiscount()" value="Submit" 
						class="btn btn-large btn-success btnwidth" >
						<!-- </div> -->
             			<!-- <div class="col-lg-2" style="display: inline-block;"> -->
						<input id="save" name="btn" type="reset" onclick="reset()" value="Cancel" 
						class="btn btn-large btn-danger btnwidth" >	
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