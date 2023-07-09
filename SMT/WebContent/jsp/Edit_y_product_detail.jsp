<%@page import="com.smt.bean.ItemList"%>
<%@page import="com.smt.bean.ProductDetailBean"%>
<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.ProductRegister"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/productDetail.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script type="text/javascript">

function backToProductDetails()
{
	window.location = "y_product_detail.jsp";
}

</script>
<style>
.btnwidth {
    width: 130px !important;
}
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
</style>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="form-group" align="left">
				<div class="col-md-2 control-label" style="padding-top: 27px;">
					<div id="date" hidden="true">
						<label id="demo"></label>
						<script>
							var date = new Date();
							document.getElementById("demo").innerHTML = date
									.toDateString();
						</script>
					</div>
				</div>
			</div>

			<!-- <div class="col-md-3 col-md-offset-4 align" align="center" style="padding-top: 10px;width: auto;"> -->
			<div align="center" class="categoryheading">	
				<h2 class="form-name style_heading">Edit Product Detail</h2>
			</div>
			<!-- </div> -->
		</div>

		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<div class="miscellaneous" style="left:">
			<form action="pro" method="post" name="UpdateProd"
				class="form-horizontal">
				<div class="container" id="custdetal">
					<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<%
									ProductDetailDao sdd = new ProductDetailDao();
									List sList = sdd.getProductNamesShopWise(request, response);
								%>
								<input list="sup_drop" id="product"
									onchange="getProductDetails()" required>
								<datalist id="sup_drop">
									<%
										for (int i = 0; i < sList.size(); i++) {
											ProductRegister sup = (ProductRegister) sList.get(i);
									%>
									<option data-value="<%=sup.getPkProductId()%>"
										value="<%=sup.getItemName()%>, <%=sup.getSize()%>"
										value1="<%=sup.getHsnsacno()%>"
										value2="<%=sup.getModelName()%>">
										<%
											}
										%>
									
								</datalist>
								<label>Product Name<sup style="color: red">*</sup></label>
							</div>
						</div>

						<div class="col-md-1"></div>

						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="text" id='itemName' name="itemName" required>

								<input type="hidden" id='hiddenItemName' name="hiddenItemName"
									readonly="readonly" /> <label>New Product Name</label>
							</div>
						</div>

					</div>

				<div class="row">


					<div class="invoice_label_up">	
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<input type="text" id='catName' name="catName"
								readonly="readonly" required> <label>Category<sup
								style="color: red"></sup></label>
						</div>
					</div>

					<div class="col-md-1"></div>
					<div class="invoice_label_up">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<input type="text" id='subCatName' name="subCatName"
								readonly="readonly" required> <label>Sub
								Category</label>
						</div>
					</div>
				</div>

					<div class="row">


						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="text" id='hsnsacno' name="hsnsacno" required>
								<label>HSN/SAC No<sup style="color: red"></sup></label>
							</div>
						</div>

						<div class="col-md-1"></div>

						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="text" id='modelName' name="modelName" required>
								<label>Brand Name</label>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="text" id='size' name="size" required> <label>Size</label>
							</div>
						</div>

						<div class="col-md-1"></div>


						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="text" id='colorP' name="colorP" required> <label>Color</label>
							</div>
						</div>
					</div>

					<div class="row" align="center" id="btnrow">

						<!-- <div class="col-lg-2 col-md-4 col-xs-4 col-xl-4"> -->
						<div class="invoice_button">
							<input type="button" onclick="valEditProductDetail()" id="btn" value="Update" class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"/>
						<!-- </div> -->

						<!-- <div class="col-lg-2 col-md-4 col-xs-4 col-xl-4"> -->
							<input type="reset" value="Reset" class="btn btn-lg btn-danger btn-md button_hw button_margin_right btnwidth" />
						<!-- </div> -->
						<!-- <div class="col-lg-2 col-md-4 col-xs-4 col-xl-4"> -->
							<input type="button" onclick="backToProductDetails()" id="btn" value="Back" class="btn btn-lg btn-primary btn-md button-hw button_margin_right btnwidth"/>
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