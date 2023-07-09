<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"
	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all">
<script type="text/javascript"
	src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script src="/SMT/staticContent/y_js/supplier.js"></script>
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/supplierDetails.css">

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
.btnwidth {
	width: 130px !important;
    padding: 10px !important;
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
	z-index: -1;
	right: 1%;
}

#supdltcol {
    width: 50%;
    margin-left: 25%;
}
.col-md-2 {
    margin-right: 65px;
}
#supdeltbtn {
    margin-left: 9%;
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
@media ( max-width : 991px) {
#supdltcol {
	width: 50%;
    margin-left: 25%;
}
#supdeltbtn {
    margin-left: 5%;
}
.col-md-2 {
    margin-right: -28px;
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
		right: 2%;
		opacity: 0.6;
		z-index: -1;
	}

#supdltcol {
    width: 70%;
    margin-left: 15%;
}
#supdeltbtn {
    /* margin-left: 22%; */
}
}

#supdeltbtn {
	width: auto;
}
@media screen and (max-width: 480px) {
#supdltcol {
    width: 90%;
    margin-left: 5%;
}
}
</style>

<script type="text/javascript">
	function backToSupplierDetails() {
		window.location = "s_supplier_detail.jsp";
	}
</script>

<body class="stock_form_img vColor">
	<div class="container" id="allwayreporth2">
		<div class="row">
			<div align="center" class="categoryheading">
				<h2 class="form-name style_heading">Delete Supplier</h2>
			</div>
		</div>
		<!-- <div class="row"> -->
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		<!-- </div> -->

		<div class="miscellaneous">
			<form action="cashAmount" method="post" class="form-horizontal">
				<div class="invoice_label_up">
					<div class="row">
						<div class="container">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="supdltcol">
								<%
									SupplierDetailDao sdd88 = new SupplierDetailDao();
									List sList88 = sdd88.getAllSupplier();
								%>
								<input list="sup_drop" id="supplier" required>
								<datalist id="sup_drop">
									<%
										for (int i = 0; i < sList88.size(); i++) {
											SupplierDetail sup88 = (SupplierDetail) sList88.get(i);
									%>
									<option data-value="<%=sup88.getSupplierId()%>"
										value="<%=sup88.getSupplierName()%>">
										<%
											}
										%>
									
								</datalist>
								<label for="supplier">Supplier Name <sup style="color: red">*</sup></label>
							</div>
						</div>

						<div class="row" id="btnrow">
						<div class="invoice_button">
							<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="supdeltbtn" align="center"> -->
								<!-- <div class="col-md-2" style="display: inline-block;"> -->
									<input type="button" value="Delete" onclick="deleteSupp()"
										class="btn btn-large btn-danger btn-md btnwidth" />
								<!-- </div> -->

								<!-- <div class="col-md-2" style="display: inline-block;"> -->
									<input type="button" value="Back" onclick="backToSupplierDetails()" 
										class="btn btn-large btn-primary btn-md btnwidth" />
							<!-- 	</div> -->
							<!-- </div> -->
							</div>
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
