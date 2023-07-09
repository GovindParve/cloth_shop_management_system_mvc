<%@page import="com.smt.bean.allSubCategories"%>
<%@page import="com.smt.dao.CategoryDao"%>
<%@page import="com.smt.helper.CreditCustomerBillHelper"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.bean.ItemList"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%@page import="com.smt.bean.userDetaile"%>
<%@page import="com.smt.helper.EmployeeDetailsHelper"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.bean.CategoryDetails"%>
<%@page import="com.smt.bean.BillCopy"%>
<%@page import="com.smt.dao.CarEntryDao"%>
<%@page import="com.smt.dao.OtherBillDao"%>
<%@page import="com.smt.dao.CreditCustBillDao"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/highcharts.js"></script>
<!-- <script src="http://code.highcharts.com/highcharts.js"></script> -->
<script type="text/javascript"
	src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"
	type="text/javascript"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
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
<script data-main="scripts/main" src="/SMT/staticContent/js/r.js"></script>
<script src="/SMT/staticContent/js/json2xml.js"></script>
<script src="/SMT/staticContent/js/shopDetails.js"></script>
<script src="/SMT/staticContent/js/allReport.js"></script>
<script src="/SMT/staticContent/js/allGraphJs.js"></script>
<script src="/SMT/staticContent/js/currentStock.js"></script>
<script>
	function closePopUpReport() {
		$('#saleBillWise').dataTable().fnClearTable();
		$("#popUpReport").dialog('close');
	}
</script>

<style>
.left-tab-new {
	width: 192px;
	background: #ba0707;
	color: white;
	border-radius: 0px;
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
    z-index:-1;
    opacity: 0.6;
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
		margin: 25;
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
}
</style>
<body class="vColor" onload="shopDetailsJsFn()">
	<div class="row"  style="min-height: 300px; margin-left:40px;">
		

			<hr />
		

					<div class="tab-pane active" id="advanceBookingReport">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Age Wise Reports</h2>
							</div>
<div class="col-md-12" style="padding-top: 3%">
<div class="row">
	<div class="col-md-12">
				
		</div>	
							
	<div class="row">
		
		<div class="col-md-12">
				<hr style="border-top-color: #c1b1b1;">
		</div>
		
   </div>
							
</div>

		<ul class="nav nav-tabs"  >
							<li class="active"><a data-toggle="tab"
								href="#advanceBookingRangeWise"><h4 style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab"
								href="#advanceBookingRangeAndSupplierWise"><h4
										style="color: blue">Supplier Wise</h4></a></li>
							<li><a data-toggle="tab" href="#advanceBookingBookingNoWise"><h4
										style="color: blue">Age In Days</h4></a></li>
		</ul>

						<div class="tab-content" id="tabname" align="center">

							<!---------- ADVANCE BOOKING REPORT between Two dates ------->

							<div id="advanceBookingRangeWise" class="tab-pane fade in active">

								<div class="miscellaneous">
									<form class="form-horizontal" method="post" action="">
										<div class="row">
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
												id="graphcolumnwidth">
												<input type="date" id="aBFisDate" placeholder="Start Date"
													type="text"> <label for="aBFisDate">From<sup style="color: red;">*</sup></label>
											</div>

											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
												id="graphcolumnwidth">
												<input type="date" id="aBEndDate" placeholder="End Date"
													type="text"> <label for="aBEndDate">To<sup style="color: red;">*</sup></label>
											</div>

											<div class="col-lg-2 col-md-2 col-xs-2 col-xl-2" id="btnsub">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="AgewisebetweenrangeWise()" value="Search"
													style="padding-bottom: 31px;" />
											</div>
										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive" id="tables" style="margin-left:-300">
										<table id="example"
					class="table table-bordered table-striped table-condensed cf"
					class="display"
					style="border: 2px solid black; border-collapse: collapse;">
					<thead>
						<tr>
						<th>Sr No</th>
							<th>Barcode No</th>
							<th>Category Name</th>
							<th>Sub Category Name</th>
							<th>Item Name</th>
							<th>Size</th>
							<th>Quantity</th>
							<th>Buy Price</th>
							<th>Sale Price</th>
							<th>Item Age(In Days)</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th colspan="7" style="text-align: right">Total:</th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
				</table>
									</div>
								</div>


							</div>

							<!-- SUPPLIER WISE ADVANCE BOOKING REPORT ------->


							<div id="advanceBookingRangeAndSupplierWise" class="tab-pane">
								<div class="miscellaneous">
									<form class="form-horizontal" method="post" action="">

										<div class="row">
											<div class="invoice_label_up">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<%
														SupplierDetailDao sddAB = new SupplierDetailDao();
														List sListAB = sddAB.getAllSupplier();
													%>
													<input list="sup_dropAB" id="supplierAB"
														onchange="getAllBillsforPurchaseReturn();" required>
													<datalist id="sup_dropAB">
														<%
															for (int i = 0; i < sListAB.size(); i++) {
																SupplierDetail supAB = (SupplierDetail) sListAB.get(i);
														%>
														<option data-value="<%=supAB.getSupplierId()%>"
															value="<%=supAB.getSupplierName()%>">
															<%
																}
															%>
														
													</datalist>
													<label for="supplierAB">Supplier Name<sup style="color: red;">*</sup></label>
												</div>
											</div>


											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
												id="graphcolumnwidth">
												<input type="date" id="aBFisDateSuppWise"
													placeholder="Start Date" type="text"> <label
													for="aBFisDateSuppWise">From<sup style="color: red;">*</sup></label>
											</div>


										</div>

										<div class="row">
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
												id="graphcolumnwidth">
												<label for="aBEndDateSuppWise">To<sup style="color: red;">*</sup></label> <input type="date"
													id="aBEndDateSuppWise" placeholder="End Date" type="text">
											</div>





											<div class="col-md-2" id="btnsub">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="agewiseSupplierAndRangeWise()"
													value="Search" style="padding-bottom: 31px;" />
											</div>

										</div>

									</form>
								</div>
								<div class="container">
										<div class="container">
									<div class="table-responsive" id="tables" style="margin-left:-300">
										<table id="example1"
					class="table table-bordered table-striped table-condensed cf"
					class="display"
					style="border: 2px solid black; border-collapse: collapse;">
					<thead>
						<tr>
						<th>Sr No</th>
							<th>Barcode No</th>
							<th>Supplier Name</th>
							<th>Category Name</th>
							<th>Sub Category Name</th>
							<th>Item Name</th>
							<th>Size</th>
							<th>Quantity</th>
							<th>Buy Price</th>
							<th>Sale Price</th>
							
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th colspan="7" style="text-align: right">Total:</th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
				</table>
									</div>
								</div>
								</div>


							</div>

							<!---------- ADVANCE BOOKING REPORT BOOKING NO WISE ------->

							<div id="advanceBookingBookingNoWise" class="tab-pane">

								<div class="miscellaneous">
									<form class="form-horizontal" method="post" action="">

										<div class="row">
											<div class="invoice_label_up">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													
													<%
													CategoryHelper hb=new CategoryHelper();
													List list=hb.getAllActiveCategoriesShopWise(request, response);
													
													%>
													
													<input list="catId_drop" id="catId"
								onchange="getCategoryWiseItemName()" required>
							<datalist id="catId_drop">
							<%
							
							for (int i = 0; i < list.size(); i++) {
								Category category = (Category)list.get(i);
							
							%>
							<option data-value="<%=category.getPkCategoryId()%>"
									value="<%=category.getCategoryName()%>">
									<%
										}
									%>
							
							</datalist>
													<label for="category">Category Name<sup style="color: red;">*</sup> </label>
												</div>
											</div>

<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
						id="invoicebaseinvent">
						<select id='itemId' name="itemId"></select> <label>Item
							Name</label>
					</div>
											<div class="col-md-2" id="btnsub">

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="invoicebaseinvent"
						style="width: auto;">
						<div align="center">
							<input type="button" value="Search" id="btn"
								onclick="getCategoryWiseItemnameStock();"
								style="padding-bottom: 30px; width: 124; border-radius: 10px;"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
						</div>
					</div>


				</div>
			</div>
		</div>
<!-- 
		<br> <br> <br> <br>
 -->		<div class="row" align="center">
			<div class="table-responsive">
				<table id="example2"
					class="table table-bordered table-striped table-condensed cf"
					class="display"
					style="border: 2px solid black; border-collapse: collapse;">
					<thead>
						<tr>
							<th>Category Name</th>
							<th>Category Name</th>
							<th>Sub Category Name</th>
							<th>Item Name</th>
							<th>Size</th>
							<th>Quantity</th>
							<th>Buy Price</th>
							<th>Sale Price</th>
							<th>Item Age(In Days)</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th colspan="6" style="text-align: right">Total:</th>
							<th></th>
							<th></th>
							<th></th>
						</tr>
				</table>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>