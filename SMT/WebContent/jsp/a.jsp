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
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/js/highcharts.js"></script>
<!-- <script src="http://code.highcharts.com/highcharts.js"></script> -->
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js" type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
<script data-main="scripts/main" src="/SMT/staticContent/js/r.js"></script>
<script src="/SMT/staticContent/js/json2xml.js"></script>
<script src="/SMT/staticContent/js/shopDetails.js"></script>
<script src="/SMT/staticContent/js/allReport.js"></script>
<script src="/SMT/staticContent/js/allGraphJs.js"></script>

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
#tables {
    width: 95%;
    overflow-y: hidden;
    margin-bottom: 10%;
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
.dataTables_scrollHeadInner {
    width: 100% !important;
}
table.table.table-bordered.table-striped.table-condensed.cf.no-footer.dataTable {
    width: 100% !important;
}
#advanceBookingRangeWiseReport, #advanceBookigSuppAndRangeWise, #advanceBooking_BookingNoWise,
#supplierNameWiseTable1, #singleDatePurchase50, #supplierBillWiseData, #supplierCategoryWise,
#supplierProductWise, #voucherNoWiseData, #barcodeWisePurchaseReport, #twoDatePurchase50,
#paymentDueDateWiseTable, #twoDateGstReturnPurchase, #expenseRangeReport, #purchaseReturnSingleDateReport,
#purchaseReturnRangeReport, #billNoWisePurRetReport, #saleCategoryWise, #saleProductWise,
#saleSingleDate, #saleTwoDate, #saleTwoDate_userWise, #saleTwoDateBillNo, #twoDateGstReturn, 
#paymentModeWiseReportTable, #saleTaxWise, #currStock, #catWiseStock, #barcodeWiseCurrentStock, 
#currStock1, #miscellaneousSingleDateReport, #miscellaneousTwoDateReport, #miscellaneousSaleWiseCustomerReport,
#billnowiseMiscellaneous, #barcodewiseMiscellaneous, #creditSingleDateReport, #creditTwoDateReport,
#creditSaleWiseCustomerReport, #paymentModeWiseReportTableForCC, #creditSaleProductWiseReport,
#billnowiseCredit, #barcodewiseCredit, #paymentModeWiseReportTable, #CSR1SingleDateReport,
#CSR2TwoDateReport, #CSR3SaleWiseCustomerReport, #billnowiseCCSR, #barcodewiseCCSR {
    border: none;
    border-collapse: collapse !important;
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
}

@media screen and (max-width: 580px) {
.container-fluid {
    width: 113%;
}
}

@media screen and (max-width: 480px) {
#graphcolumnwidth {
    width: 100%;
}
#tables {
    width: 90%;
}
}
</style>
<body class="vColor" onload="shopDetailsJsFn()">
	<!-- <div class="" style="min-height: 300px;"> -->
		<div class="container-fluid">
			<div class="allreport"></div>
			
			<div class="allreports">
				<ul class="nav nav-tabs tabs-left">
				
					<li id="li"><a href="#allGraphsReports" data-toggle="tab" class="left-tab-new"
						onclick="categoryWiseSaleGraph(); todaysCategoryWiseSaleGraph(); supplierWiseTotalSaleGraph(); categoryWisePurchaseGraph(); TodaysCategoryWisePurchaseGraph(); supplierWiseTotalPurchaseGraph(); pie_categoryWiseSaleGraph(); subCategoryWiseSaleGraph(); subCategoryWisePurchaseGraph()">All
							Graphs</a></li>
				</ul>
			</div>
			<div class="" id="">
				<!-- Tab panes -->
				<div class="tab-content">

!---------------------------------- Stock REPORT [Barcode Wise Stock] Starts Here ---------------------------------->

							<div id="barcodeNoWiseStock" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<input type="text" id="barcode10" type="text" required>
														<label for="">Barcode No<sup>*</sup></label>
													</div>
												</div>



												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="barcodewisestock()" value="Search" />
													</div>
													</div>
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="">
									<div class="row" align="center">
										<div class="table-responsive" id="tables">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="barcodeWiseCurrentStock" class="display">
												<thead>
													<tr>
														<th>Category Name</th>
														<th>Item Name</th>
														<th>Available Quantity</th>
														<th>Buy Price</th>
														<th>Tax (%)</th>
														<th>Bill No</th>
														<th>Barcode No</th>
													</tr>
												</thead>
											</table>
										</div>
									</div>
								</div>


							</div>