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
					<li class="active" id="li"><a href="#advanceBookingReport" data-toggle="tab" class="left-tab-new">Advance Booking Reports</a></li>
					<li id="li"><a href="#purchase" data-toggle="tab" class="left-tab-new">Purchase Reports</a></li>
					<li id="li"><a href="#purchaseReturn" data-toggle="tab" class="left-tab-new">Purchase Return Reports</a></li>
					<li id="li"><a href="#sell" data-toggle="tab" class="left-tab-new">Sale Reports</a></li>
					<li id="li"><a href="#miscellaneous" data-toggle="tab" class="left-tab-new">Sale Return Reports</a></li>
					<li id="li"><a href="#stock" data-toggle="tab" class="left-tab-new">Stock Reports</a></li>
					<li id="li"><a href="#credit" data-toggle="tab" class="left-tab-new">Credit Customer Sale Reports</a></li>
					<li id="li"><a href="#creditSaleReturn" data-toggle="tab" class="left-tab-new">Credit Customer Sale Return Reports</a></li>
					<li id="li"><a href="#allGraphsReports" data-toggle="tab" class="left-tab-new"
						onclick="categoryWiseSaleGraph(); todaysCategoryWiseSaleGraph(); supplierWiseTotalSaleGraph(); categoryWisePurchaseGraph(); TodaysCategoryWisePurchaseGraph(); supplierWiseTotalPurchaseGraph(); pie_categoryWiseSaleGraph(); subCategoryWiseSaleGraph(); subCategoryWisePurchaseGraph()">All
							Graphs</a></li>
				</ul>
			</div>
			<div class="" id="">
				<!-- Tab panes -->
				<div class="tab-content">
				
<!--++++++++++++++++++++++++++++++++++++++++++ Advance Booking Reports Starts Here ++++++++++++++++++++++++++++++++++++++++++-->
					<div class="tab-pane active" id="advanceBookingReport">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Advance Booking Reports</h2>
							</div>
						</div>

							<div class="row">
								<div class="col-md-12" align="center">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						

					<div class="advancebook">
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#advanceBookingRangeWise">Range</a></li>
							<li><a data-toggle="tab" href="#advanceBookingRangeAndSupplierWise">Supplier Wise</a></li>
							<li><a data-toggle="tab" href="#advanceBookingBookingNoWise">Booking No Wise</a></li>
						</ul>
					</div>

						<div class="tab-content" id="tabname">

<!--------------------------------- ADVANCEd BOOKING REPORT [Range Wise] Starts Here --------------------------------->
							<div id="advanceBookingRangeWise" class="tab-pane fade in active">

								<div class="miscellaneous">
								<div class="container">
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
										</div>
										
											<!-- <div class="col-lg-2 col-md-2 col-xs-2 col-xl-2" id="btnsub"> -->
											<div id="btnrow">
												<div class="invoice_button">	
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
													onclick="advanceBookingrangeWise()" value="Search" />
											</div>
											</div>
											<!-- </div> -->
											
										
									</form>
									</div>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="advanceBookingRangeWiseReport" class="display" style="border-collapse: collapse;">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Booking Date</th>
													<th>Booking No</th>
													<th>Item Name</th>
													<th>Category Name</th>
													<th>Sub Category Name</th>
													<th>Size</th>
													<th>Color</th>
													<th>RollSize</th>
													<th>Quantity</th>
													<th>Supplier Name</th>
													<th>Purchase Bill No</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="9" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!--------------------------------- ADVANCEd BOOKING REPORT [Range Wise] Ends Here --------------------------------->


<!---------------------------------- ADVANCEd BOOKING REPORT [Supplier Wise] Starts Here ---------------------------------->

							<div id="advanceBookingRangeAndSupplierWise" class="tab-pane">
								<div class="miscellaneous">
								<div class="container">
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





											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
												id="graphcolumnwidth">
												<div id="btnrow">
														<div class="invoice_button">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
													onclick="advanceBookingSupplierAndRangeWise()"
													value="Search" />
												</div>
												</div>
											</div>

										</div>

									</form>
									</div>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="advanceBookigSuppAndRangeWise" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Booking Date</th>
													<th>Booking No</th>
													<th>Item Name</th>
													<th>Category Name</th>
													<th>Sub Category Name</th>
													<th>Size</th>
													<th>Color</th>
													<th>RollSize</th>
													<th>Quantity</th>
													<th>Supplier Name</th>
													<th>Purchase Bill No</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="9" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- ADVANCEd BOOKING REPORT [Supplier Wise] Ends Here ---------------------------------->


<!---------------------------------- ADVANCEd BOOKING REPORT [Booking No Wise] Starts Here ---------------------------------->
							<div id="advanceBookingBookingNoWise" class="tab-pane">

								<div class="miscellaneous">
								<div class="container">
									<form class="form-horizontal" method="post" action="">

										<div class="row">
											<div class="invoice_label_up">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="text" id="bookingNoAB" type="text" required>
													<label for="bookingNoAB">Booking No<sup style="color: red;">*</sup> </label>
												</div>
											</div>


											<!-- <div class="col-md-2" id="btnsub"> -->
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
												<div id="btnrow">
													<div class="invoice_button">
												<input type="button" id="btnBN" name="btnBN"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
													onclick="advanceBookingBookingNoWise()" value="Search" />
													</div>
													</div>
											</div>
											<!-- </div> -->

										</div>
									</form>
								</div>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table class="table table-bordered table-striped table-condensed cf"
											id="advanceBooking_BookingNoWise" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Booking Date</th>
													<th>Booking No</th>
													<th>Item Name</th>
													<th>Category Name</th>
													<th>Sub Category Name</th>
													<th>Size</th>
													<th>Color</th>
													<th>RollSize</th>
													<th>Quantity</th>
													<th>Supplier Name</th>
													<th>Purchase Bill No</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="9" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- ADVANCEd BOOKING REPORT [Booking No Wise] Ends Here ---------------------------------->							
						</div>
					</div>
<!--++++++++++++++++++++++++++++++++++++++++++ Advance Booking Reports Ends Here ++++++++++++++++++++++++++++++++++++++++++-->


<!--++++++++++++++++++++++++++++++++++++++++++ Purchase Reports Starts Here ++++++++++++++++++++++++++++++++++++++++++-->
					<div class="tab-pane" id="purchase">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Purchase Reports</h2>
							</div>
							<div class="row">
								<div class="col-md-12" align="center">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

					<div class="purchaser">
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#supplierName">Supplier Name Wise</a></li>
							<li><a data-toggle="tab" href="#singleDatePurchase">Single Date</a></li>
							<li><a data-toggle="tab" href="#twoDatePurchase">Range</a></li>
							<li><a data-toggle="tab" href="#categoryWise">Category Wise</a></li>
							<li><a data-toggle="tab" href="#productWise">Product Wise</a></li>
							<li><a data-toggle="tab" href="#voucherWise">Voucher Wise</a></li>
							<li><a data-toggle="tab" href="#supplierBillWise">Bill Number Wise</a></li>
							<li><a data-toggle="tab" href="#barcodeNoWise">Barcode No Wise</a></li>
							<li><a data-toggle="tab" href="#paymentDueDateWise">Payment Due Date Wise</a></li>
							<li><a data-toggle="tab" href="#PurchasegstReturn">Gst Return</a></li>
							<li><a data-toggle="tab" href="#expenseRangeWise">Expense Wise</a></li>
						</ul>
					</div>

						<div class="tab-content">

<!---------------------------------- Purchase REPORT [Supplier Name Wise] Starts Here ---------------------------------->
							<div id="supplierName" class="tab-pane fade in active">

								<div class="miscellaneous">
									<form class="form-horizontal" method="post" action=""
										name="supReportBill">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<%
															SupplierDetailDao sdd88 = new SupplierDetailDao();
															List sList88 = sdd88.getAllSupplier();
														%>
														<input list="sup_drop7" id="supplier7" required>
														<datalist id="sup_drop7">
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
														<label for="supplier">Supplier Name<sup style="color: red;">*</sup></label>
													</div>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<div class="row" id="btnrow">
													<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="supplierAllPurchase()" value="Search" />
														</div>
														</div>
												</div>

											</div>
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierNameWiseTable1" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Voucher No</th>
													<th>Contact Person</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>Barcode No</th>
													<th>Style</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Returned<br>Quantity</th>
													<th>Sold<br>Quantity</th>
													<th>Available<br>Quantity</th>
													<th>Roll Size</th>
													<th>Qty (Mtr)</th>
													<th>Buy Price</th>
													<th>Discount<br>(%)</th>
													<th>Discount<br>Amt</th>
													<th>GST<br>(%)</th>
													<th>IGST<br>(%)</th>
													<th>Tax<br>Amount</th>
													<th>Total<br>Amount</th>
													<!-- <th>Total<br>Discount(%)</th><th>Expenses</th> -->
													<th>Gross Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="18" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
<!---------------------------------- Purchase REPORT [Supplier Name Wise] Ends Here ---------------------------------->

<!---------------------------------- Purchase REPORT [Single Date] Starts Here ---------------------------------->
							<div id="singleDatePurchase" class="tab-pane fade">

								<div class="miscellaneous">
									<form class="form-horizontal" method="post" action=""
										name="supReport1">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="purDate" placeholder="Start Date" type="text"> 
													<label for="startDate">Select Date<sup>*</sup>
													</label>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<!-- <div class="input-group"> -->
													<div id="btnrow">
														<div class="invoice_button">
														<input type="button" id="btn" name="save"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
															onclick="singleDatePurchase45()" value="Search" />
													<!-- </div> -->
													</div>
													</div>
												</div>
												
											</div>
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="singleDatePurchase50" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Voucher No</th>
													<th>Contact Person</th>
													<th>Supplier Name</th>
													<th>Category Name</th>
													<th>Sub Category Name</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Returned<br>Quantity
													</th>
													<th>Sold<br>Quantity
													</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Discount(%)</th>
													<th>Discount<br>Amt
													</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
													<th>Gross Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="17" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
<!---------------------------------- Purchase REPORT [Single Date] Ends Here ---------------------------------->

<!---------------------------------- Purchase REPORT [Bill Number Wise] Starts Here ---------------------------------->
							<div id="supplierBillWise" class="tab-pane ">
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReportBill">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<%
															SupplierDetailDao sdd = new SupplierDetailDao();
															List sList = sdd.getAllSupplier();
														%>
														<input list="sup_drop" id="supplier"
															onchange="getAllBills();" required>
														<datalist id="sup_drop">
															<%
																for (int i = 0; i < sList.size(); i++) {
																	SupplierDetail sup = (SupplierDetail) sList.get(i);
															%>
															<option data-value="<%=sup.getSupplierId()%>"
																value="<%=sup.getSupplierName()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for="supplier">Supplier Name<sup style="color: red;">*</sup></label>
													</div>
												</div>




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<select id='billNo' name="billNo"></select> <label
														for="bill_no">Bill No <sup style="color: red;">*</sup></label>
												</div>
												</div>



												<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth"> -->
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="supplierBillWisePurchaseReport()" value="Search" />
													</div>
													</div>
												<!-- </div> -->
											
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierBillWiseData" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Voucher No</th>
													<th>Contact Person</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Returned<br>Quantity
													</th>
													<th>Sold<br>Quantity
													</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Discount(%)</th>
													<th>Discount<br>Amt
													</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
													<th>Gross Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="17" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Purchase REPORT [Bill Number Wise] Ends Here ---------------------------------->


<!---------------------------------- Purchase REPORT [Category Wise] Starts Here ---------------------------------->

							<div id="categoryWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReport">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<%
															CategoryHelper ch45 = new CategoryHelper();
															List list45 = ch45.getCategorys();
														%>

														<input list="catId_drop45" id="catId45" required>
														<datalist id="catId_drop45">
															<%
																for (int i = 0; i < list45.size(); i++) {
																	CategoryDetails item45 = (CategoryDetails) list45.get(i);
															%>
															<option data-value="<%=item45.getCatId()%>"
																value="<%=item45.getCatName()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for=""> Select Category<sup>*</sup></label>

													</div>
												</div>

											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
												<div id="btnrow">
													<div class="invoice_button">
													<input type="button" id="btn45" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="categoryWisePurchaseReport()" value="Search" />
												</div>
												</div>
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierCategoryWise" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Voucher No</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Returned<br>Quantity
													</th>
													<th>Sold<br>Quantity
													</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Dis<br>(%)
													</th>
													<th>Discount<br>Amt
													</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="17" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Purchase REPORT [Category Wise] Ends Here ---------------------------------->

					
<!---------------------------------- Purchase REPORT [Product Wise] Starts Here ---------------------------------->
							<div id="productWise" class="tab-pane">
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReport">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<%
															GoodReciveDao proIdAndName = new GoodReciveDao();
															List proList = proIdAndName.getProductListGoodReceiveDao();
														%>

														<input list="productId_drop" id="prodIdDrop" required>
														<datalist id="productId_drop">
															<%
																for (int i = 0; i < proList.size(); i++) {
																	ItemList itemList = (ItemList) proList.get(i);
															%>
															<option data-value="<%=itemList.getPkProductId()%>"
																value="<%=itemList.getPkProductId()%> <%=itemList.getItem_name()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for=""> Select Product:<sup>*</sup></label>
													</div>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">	
													<input type="button" id="btn45" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="productWisePurchaseReport()" value="Search" />
													</div>
													</div>
												</div>
												
											</div>
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierProductWise" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Voucher No</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Returned<br>Quantity
													</th>
													<th>Sold<br>Quantity
													</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Discount(%)</th>
													<th>Discount<br>Amt
													</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="17" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Purchase REPORT [Product Wise] Ends Here ---------------------------------->

<!---------------------------------- Purchase REPORT [Voucher Wise] Starts Here ---------------------------------->
							<div id="voucherWise" class="tab-pane ">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="voucherNoWise">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<%
															GoodReciveDao grd12 = new GoodReciveDao();
															List vNoList = grd12.getAllVoucherNumber();
														%>

														<input list="voucherNo_drop" id="voucherDrop" required>
														<datalist id="voucherNo_drop">
															<%
																for (int i = 0; i < vNoList.size(); i++) {
																	ItemList itemVList = (ItemList) vNoList.get(i);
															%>
															<option data-value="<%=itemVList.getVoucherNo()%>"
																value="<%=itemVList.getVoucherNo()%> <%=itemVList.getSuppName()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for="voucherDrop">Voucher No:<sup>*</sup></label>
													</div>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="VoucherNoWisePurchaseReport()" value="Search" />
														</div>
														</div>
												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="voucherNoWiseData" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Contact Person</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Returned<br>Quantity
													</th>
													<th>Sold<br>Quantity
													</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Discount(%)</th>
													<th>Discount<br>Amount</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
													<th>Gross Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="16" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Purchase REPORT [Voucher Wise] Ends Here ---------------------------------->
						
						
<!---------------------------------- Purchase REPORT [Barcode No Wise] Starts Here ---------------------------------->

							<div id="barcodeNoWise" class="tab-pane fade">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReport1">
										<div class="container">

											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<input type="text" id="barcodeNoOurchase" type="text"
															required> <label for="startDate">Enter
															Barcode No:<sup>*</sup>
														</label>
													</div>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="barcodeWisePurchaseReport()" value="Search" />
														</div>
														</div>
												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="barcodeWisePurchaseReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Voucher No</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Returned<br>Quantity
													</th>
													<th>Sold<br>Quantity
													</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Discount(%)</th>
													<th>Discount<br>Amt
													</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="17" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Purchase REPORT [Barcode No Wise] Ends Here ---------------------------------->	
						

<!---------------------------------- Purchase REPORT [Range] Starts Here ---------------------------------->

							<div id="twoDatePurchase" class="tab-pane fade">

								<div class="miscellaneous">
									<div class="container">
										<form class="form-horizontal" method="post" action=""
											name="supReport1">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="pFisDate" type="text"> <label
														for="startDate">From<sup style="color: red;">*</sup></label>
												</div>
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="pEndDate" placeholder="End Date"
														type="text"> <label for="endDate">To<sup style="color: red;">*</sup></label>
												</div>
												
												<div class="row" id="btnrow">
													<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="twoDatePurchase45()" value="Search"/>
														</div>
												</div>


											</div>
										</form>
									</div>

								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="twoDatePurchase50" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Voucher No</th>
													<th>Contact Person</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Returned<br>Quantity
													</th>
													<th>Sold<br>Quantity
													</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Discount(%)</th>
													<th>Discount<br>Amt
													</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
													<th>Gross Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="17" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Purchase REPORT [Range] Ends Here ---------------------------------->

<!---------------------------------- Purchase REPORT [Payment Due Date Wise] Starts Here ---------------------------------->
							<div id="paymentDueDateWise" class="tab-pane fade">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="paymentDueDateWise">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="pddwFisDate" type="text"> <label
														for="pddwFisDate">From<sup style="color: red;">*</sup></label>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="pddwEndDate" placeholder="End Date"
														type="text"> <label for="pddwEndDate">To<sup style="color: red;">*</sup></label>
												</div>


												<div class="row" id="btnrow">
													<div class="invoice_button">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="paymentDueDateWiseFn()" value="Search" />
														</div>
												</div>
												
											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="paymentDueDateWiseTable" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Supplier Name</th>
													<th>Payment Due Date</th>
													<th>Voucher No</th>
													<th>Contact Person</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
													<th>Returned<br>Quantity
													</th>
													<th>Sold<br>Quantity
													</th>
													<th>Roll Size</th>
													<th>Qty In Meter</th>
													<th>Buy Price</th>
													<th>Discount(%)</th>
													<th>Discount<br>Amt
													</th>
													<th>GST (%)</th>
													<th>IGST (%)</th>
													<th>Tax Amount</th>
													<th>Sale Price</th>
													<th>Total Amount</th>
													<th>Gross Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="19" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
<!---------------------------------- Purchase REPORT [Payment Due Date Wise] Ends Here ---------------------------------->

<!---------------------------------- Purchase REPORT [Gst Return] Starts Here ---------------------------------->

							<div id="PurchasegstReturn" class="tab-pane fade">
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="startDatepgst" type="text">
													<label for="startDate">From<sup style="color: red;">*</sup></label>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="lastDatepgst" type="text"> <label
														for="village">To<sup style="color: red;">*</sup></label>
												</div>

												<div class="row" id="btnrow">
													<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="purchasegstReturn(); gstIgstReturnAmt()"
														value="Search" />
												</div>
												</div>
												
											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="twoDateGstReturnPurchase" class="display">
											<thead>
												<tr>
													<th>GST Taxable</th>
													<th>IGST Taxable</th>
													<th>Taxable Value</th>
													<th>Central Tax Amount</th>
													<th>State Tax Amount</th>
													<th>Total GST Amount</th>
													<th>Total IGST Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="2" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
<!---------------------------------- Purchase REPORT [Gst Return] Ends Here ---------------------------------->
							
<!---------------------------------- Purchase REPORT [Expense Wise] Starts Here ---------------------------------->							
							<div id="expenseRangeWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">

													<input type="date" id="pREndDate1" type="text"> <label
														for="pREndDate1">From<sup style="color: red;">*</sup></label>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<label for="lastDatepgst">To<sup style="color: red;">*</sup></label> <input type="date"
														id="pREndDate2" type="text">
												</div>



												<div class="row" id="btnrow">
												<div class="invoice_button">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="purchaseexpese()" value="Search" />
													</div>
												</div>
												
											</div>
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="expenseRangeReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Purchase<br> Date
													</th>
													<th>Bill No</th>
													<th>Transport Expense</th>
													<th>Labour Expense</th>
													<th>Gross Total<br>Without Expense</th>
													<th>Gross Total</th>
													
													

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="3" style="text-align: right">Total:</th>
													
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>

							</div>
<!---------------------------------- Purchase REPORT [Expense Wise] Ends Here ---------------------------------->							
							
							
						</div>
					</div>
<!--++++++++++++++++++++++++++++++++++++++++++ Purchase Reports Ends Here ++++++++++++++++++++++++++++++++++++++++++-->


<!--++++++++++++++++++++++++++++++++++++++++++ Purchase Return Reports Starts Here ++++++++++++++++++++++++++++++++++++++++++-->
					<div class="tab-pane" id="purchaseReturn">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Purchase Return Reports</h2>
							</div>

							<div class="row">
								<div class="col-md-12" align="center">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

					<div class="purchaseret">
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab"	href="#purchaseReturnSingleDate">Datewise</a></li>
							<li><a data-toggle="tab" href="#purchaseReturnRangeWise">Range</a></li>
							<li><a data-toggle="tab" href="#purchaseReturnBillNoWise">Bill No Wise</a></li>
						</ul>
					</div>

						<div class="tab-content" id="tabname">

<!---------------------------------- Purchase Return REPORT [Date Wise] Starts Here ---------------------------------->	
							<div id="purchaseReturnSingleDate"
								class="tab-pane fade in active">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="pRDate" type="text"> <label
														for="">From<sup>*</sup></label>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="purchaseReturnSingleDate()" value="Search" />
														</div>
														</div>
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table class="table table-bordered table-striped table-condensed cf"
											id="purchaseReturnSingleDateReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Purchase<br>Return Date
													</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<!-- <th>RollSize</th> -->
													<th>Buy Price</th>
													<th>Discount %</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax %</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<!-- <th class="hidden">Total Price</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<!-- <th></th> -->
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Purchase Return REPORT [Date Wise] Ends Here ---------------------------------->	

<!---------------------------------- Purchase Return REPORT [Range] Starts Here ---------------------------------->

							<div id="purchaseReturnRangeWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">

													<input type="date" id="pRFisDate" type="text"> <label
														for="startDate">From<sup style="color: red;">*</sup></label>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<label for="endDate">To<sup style="color: red;">*</sup></label> <input type="date"
														id="pREndDate" type="text">
												</div>
											</div>


												<div class="row" id="btnrow">
													<div class="invoice_button">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="purchaseReturnTwoDate()" value="Search" />
													</div>
												</div>
											
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="purchaseReturnRangeReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Purchase<br>Return Date
													</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<!-- <th>RollSize</th> -->
													<th>Buy Price</th>
													<th>Discount %</th>
													<th>Discount Amount</th>
													<th>Tax %</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<!-- <th class="hidden">Total Price</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<!-- <th></th> -->
												</tr>
											</tfoot>
										</table>
									</div>
								</div>

							</div>
<!---------------------------------- Purchase Return REPORT [Range] Ends Here ---------------------------------->							

<!---------------------------------- Purchase Return REPORT [Bill NO Wise] Starts Here ---------------------------------->
							<div id="purchaseReturnBillNoWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">


											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<%
															SupplierDetailDao sdd22 = new SupplierDetailDao();
															List sList2 = sdd22.getAllSupplier();
														%>
														<input list="sup_drop" id="supplierpR"
															onchange="getAllBillsforPurchaseReturn();" required>
														<datalist id="sup_drop2">
															<%
																for (int i = 0; i < sList2.size(); i++) {
																	SupplierDetail sup2 = (SupplierDetail) sList2.get(i);
															%>
															<option data-value="<%=sup2.getSupplierId()%>"
																value="<%=sup2.getSupplierName()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for="supplierpR">Supplier Name<sup style="color: red;">*</sup></label>
													</div>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<select id='pRBillNo' name="pRBillNo">
													</select> <label for="pRBillNo">Bill No<sup style="color: red;">*</sup> </label>
												</div>
											</div>

												<div class="row" id="btnrow">
											<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="purchaseReturnBillNoWise()" value="Search" />
												</div>
												</div>


											
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="billNoWisePurRetReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Purchase<br>Return Date
													</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<!-- <th>RollSize</th> -->
													<th>Buy Price</th>
													<th>Discount %</th>
													<th>Discount Amount</th>
													<th>Tax %</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<!-- <th class="hidden">Total Price</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<!-- <th></th> -->
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
<!---------------------------------- Purchase Return REPORT [Bill NO Wise] Ends Here ---------------------------------->							
						</div>
					</div>


<!--++++++++++++++++++++++++++++++++++++++++++ Sale Reports Starts Here ++++++++++++++++++++++++++++++++++++++++++-->
					<div class="tab-pane" id="sell">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Sale Reports</h2>
							</div>
						</div>
							<div class="row">
								<div class="col-md-12" align="center">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						

					<div class="salereport">
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#categorySaleWise">Category wise</a></li>
							<li><a data-toggle="tab" href="#productSaleWise">Product wise</a></li>
							<li><a data-toggle="tab" href="#singleDateSale">Datewise</a></li>
							<li><a data-toggle="tab" href="#twoDateSale" onclick="categoryWiseSaleGraph()">Range</a></li>
							<li><a data-toggle="tab" href="#userWise">User Wise</a></li>
							<li><a data-toggle="tab" href="#BillWise">Bill Wise</a></li>
							<li><a data-toggle="tab" href="#caReturns">GST Return</a></li>
							<li><a data-toggle="tab" href="#paymentModeWiseReport">Payment Mode Wise</a></li>
							<!-- <li><a data-toggle="tab" href="#barcode">Tax Invoice Without Barcode Wise</a></li> -->
							<!-- <li><a data-toggle="tab" href="#paymentModeRangeWiseReport"><h4 style="color: blue">Payment Mode<br>Range Wise</h4></a></li> -->
						</ul>
					</div>

						<div class="tab-content" id="tabname">

<!---------------------------------- Sale REPORT [Category Wise] Starts Here ---------------------------------->

							<div id="categorySaleWise" class="tab-pane fade in active">
								<div class="miscellaneous" id="miscellaneous1">
									<form class="form-horizontal" method="post" action=""
										name="supReportBill">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<%
															CategoryHelper ch = new CategoryHelper();
															List list = ch.getCategorys();
														%>

														<input list="catId_drop" id="catId" required>
														<datalist id="catId_drop">
															<%
																for (int i = 0; i < list.size(); i++) {
																	CategoryDetails item = (CategoryDetails) list.get(i);
															%>
															<option data-value="<%=item.getCatId()%>"
																value="<%=item.getCatName()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for=""> Select Category<sup>*</sup></label>
													</div>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="catFirstDate" type="text"> <label
														for="catFirstDate">From<sup style="color: red;">*</sup></label>
												</div>
												
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="catEndDate" placeholder="End Date"
														type="text"> <label for="catEndDate">To<sup style="color: red;">*</sup></label>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save" 
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="categorySaleWise()" value="Search" />
														</div>
														</div>
												</div>
												
												
												</div>
										</div>
									</form>
								</div>

								<div class="row" id="tableside" align="center">

									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div> 
									<!-- id="salecatwise"> -->
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleCategoryWise" class="display" >
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Item Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Quantity</th>
													<th>Buy Price<br>Excl. Tax
													</th>
													<th>Sale Price</th>
													<th>GST<br>%
													</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount<br>%
													</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Amount</th>
													<th>Date</th>
												</tr>
											</thead>											
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>

	<!-- <script>
	setTimeout(() => {
		document.querySelector('spinner').classList.remove('hide');
		document.qurySelctor('loadingContainer').classList.add('hide');
	}, 5000);
	</script>
 -->
 <script>
/* 
 	function hideMe(el) {
	  el.style.display = 'none';
	} */
 	/* document.onload = document.getElementById('saleCategoryWise').style.display = 'block'; */
 	/* 
 	function categorySaleWise() {
 		/*document.querySelector('.loading').style.display = "block";  */
 	/* document.getElementById('saleCategoryWise').style.display = 'block';
 	}  */
 
 </script>

								<!-- CATEGORY WISE GOOGLE CHART  -->

								<div id="chart_div"></div>

								<!-- /CATEGORY WISE GOOGLE CHART  -->

							</div>
<!---------------------------------- Sale REPORT [Category Wise] Ends Here ---------------------------------->


							<!-- PRODUCT WISE SALE REPORT -->


							<!-- 	Customer Name wise -->
<!---------------------------------- Sale REPORT [Product Wise] Starts Here ---------------------------------->
							<div id="productSaleWise" class="tab-pane">
								<div class="miscellaneous">
									<form class="form-horizontal" method="post" action=""
										name="supReportBill">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">


														<%
															ProductDetailHelper pdh = new ProductDetailHelper();
															List pList = pdh.getProductListHelper();
														%>

														<input list="productId_dropTinv" id="productIdTinv"
															required>
														<datalist id="productId_dropTinv">
															<%
																for (int i = 0; i < pList.size(); i++) {
																	ItemList itemL = (ItemList) pList.get(i);
															%>
															<option data-value="<%=itemL.getPkProductId()%>"
																value="<%=itemL.getItem_name()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for=""> Select Product:<sup>*</sup></label>
													</div>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<div class="row" id="btnrow">
															<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="productSaleWise()" value="Search" />
														</div>
														</div>
												</div>

											</div>
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<!-- style="margin-left: -3%;width: 116%;overflow-y:hidden;border:2px solid black;" -->
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleProductWise" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Item Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Quantity</th>
													<th>Buy Price<br>Excl. Tax
													</th>
													<th>Sale Price</th>
													<th>GST<br>%
													</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount<br>%
													</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Amount</th>
													<th>Date</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>

							</div>
<!---------------------------------- Sale REPORT [Product Wise] Ends Here ---------------------------------->


<!---------------------------------- Sale REPORT [Date Wise] Starts Here ---------------------------------->

							<div id="singleDateSale" class="tab-pane">
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="fDate1" type="text"> <label
														for="">From<sup>*</sup></label>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<div id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="singleDateSaleReport()" value="Search" />
														</div>
														</div>
												</div>
											</div>
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleSingleDate" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Item Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Quantity</th>
													<th>Buy Price<br>Excl. Tax
													</th>
													<th>SalePrice</th>
													<th>GST<br>%
													</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount<br>%
													</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Amount</th>
													<!-- <th>Gross Amount</th> -->
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Sale REPORT [Date Wise] Ends Here ---------------------------------->

<!---------------------------------- Sale REPORT [Range] Starts Here ---------------------------------->

							<div id="twoDateSale" class="tab-pane fade">

								<div class="miscellaneous">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="fisDate" type="text"> <label
														for="startDate">From<sup style="color: red;">*</sup></label>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="endDate" placeholder="End Date"
														type="text"> <label for="endDate">To<sup style="color: red;">*</sup></label>
												</div>
												</div>
												
												<!-- <div class="col-md-2" id="btnsub"> -->
												<div class="row" id="btnrow">
													<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="twoDateSaleReport();" value="Search"/>
														</div>
														</div>
												<!-- </div> -->

											
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleTwoDate" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Item Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Quantity</th>
													<th>Buy Price<br>Excl. Tax
													</th>
													<th>SalePrice</th>
													<th>GST<br>%
													</th>
													<th>Sale Price<br>Excl. Tax
													</th>
													<th>Discount<br>%
													</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Amount</th>
													<th>Date</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>

							</div>
<!---------------------------------- Sale REPORT [Range] Ends Here ---------------------------------->


<!---------------------------------- Sale REPORT [User Wise] Starts Here ---------------------------------->

							<div id="userWise" class="tab-pane fade">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
										<div class="row">
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
												id="graphcolumnwidth">

												<%
													EmployeeDetailsHelper edh = new EmployeeDetailsHelper();
													List edhlist = edh.getUserTypes();
												%>

												<input list="utype_drop" id="utype" onchange="getAlluser();">
												<datalist id="utype_drop">
													<%
														for (int i = 0; i < edhlist.size(); i++) {
															userDetaile ud = (userDetaile) edhlist.get(i);
													%>
													<option data-value="<%=ud.getPkUserId()%>"
														value="<%=ud.getTypeId()%>">
														<%
															}
														%>
													
												</datalist>
												<label for=""> User Type:<sup>*</sup></label>
											</div>


											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
												id="graphcolumnwidth">
												<select id="userName123" name="userName123"></select> <label
													for="userName123">User Name<sup style="color: red;">*</sup></label>
											</div>


										<!-- </div>

										<div class="row"> -->
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
												id="graphcolumnwidth">
												<input type="date" id="startDate" type="text"> <label
													for="startDate">From<sup style="color: red;">*</sup></label>
											</div>

											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
												id="graphcolumnwidth">
												<input type="date" id="lastDate" type="text"> <label
													for="village">To<sup style="color: red;">*</sup></label>
											</div>
										</div>
										</div>
										
										<div class="">
											<div class="row" id="btnrow">
												<div class="invoice_button">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
													onclick="twoDate_UserSaleReport()" value="Search" />
													</div>
											</div>
										</div>
										
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleTwoDate_userWise" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Item Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Quantity</th>
													<th>SalePrice</th>
													<th>GST<br>%
													</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount<br>%
													</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Amount</th>
													<th>Date</th>
												</tr>
											</thead>
											<tbody id="tBId">
											</tbody>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Sale REPORT [User Wise] Ends Here ---------------------------------->

<!---------------------------------- Sale REPORT [Bill Wise] Starts Here ---------------------------------->

							<div id="BillWise" class="tab-pane fade">

								<div class="miscellaneous">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
													<!-- id="salebillwise"> -->
													<input type="date" id="startDate1" type="text"> <label
														for="startDate">From<sup style="color: red;">*</sup></label>
												</div>



												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="lastDate1" type="text"> <label
														for="village">To<sup style="color: red;">*</sup></label>
												</div>
												</div>

												<div class="row" id="btnrow">
													<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="twoDateAndBillNo()" value="Search" />
														</div>
												</div>



											
										</div>
									</form>
								</div>




								<div class="row" align="center">

									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>	
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleTwoDateBillNo" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Customer Name</th>
													<th>Contact</th>
													<th>Amount</th>
													<th>Date</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="4" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>

								<div class="row" align="center" style="display: none; width: 200"
									id="popUpReport">

									<h2 align="center">
										Bill No Details <input type="button" name="closeD" id="closeD"
											value="close" onclick="closePopUpReport()" />
									</h2>

									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleBillWise" class="display"
											style="border: 1px solid black; border-collapse: collapse; width: ">
											<thead>
												<tr>
													<th style="font-size: 12px">Sr No</th>
													<th style="font-size: 12px">Bill No</th>
													<th style="font-size: 12px">Barcode No</th>
													<th style="font-size: 12px">Item Name</th>
													<th style="font-size: 12px">Category</th>
													<th style="font-size: 12px">Sub Category</th>
													<th style="font-size: 12px">Quantity</th>
													<th style="font-size: 12px">Buy Price<br>Excl. Tax</th>
													<th style="font-size: 12px">Sale Price</th>
													<th style="font-size: 12px">GST<br>%</th>
													<th style="font-size: 12px">Sale Price<br>Without Tax</th>
													<th style="font-size: 12px">Discount<br>%</th>
													<th style="font-size: 12px">Discount<br>Amount</th>
													<th style="font-size: 12px">Tax Amount<br>After Discount</th>
													<th style="font-size: 12px">Total Amount</th>
													<th style="font-size: 12px">Date</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
									<input type="button" name="closeD" id="closeD" value="close"
										onclick="closePopUpReport()" />
								</div>


							</div>
<!---------------------------------- Sale REPORT [Bill Wise] Ends Here ---------------------------------->

<!---------------------------------- Sale REPORT [GST Return] Starts Here ---------------------------------->
							<div id="caReturns" class="tab-pane fade">


								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
													<!-- id="salegstreturn"> -->
													<input type="date" id="startDategst" type="text"> <label
														for="startDate">From<sup style="color: red;">*</sup></label>
												</div>




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="lastDategst" type="text"> <label
														for="village">To<sup style="color: red;">*</sup></label>
												</div>



												<div class="row" id="btnrow">
													<div class="invoice_button">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="gstReturn()" value="Search" />
													</div>
												</div>

											</div>

										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="twoDateGstReturn" class="display">
											<thead>
												<tr>
													<th>Sales Taxable</th>
													<th>Taxable Value</th>
													<th>Central Tax Amount</th>
													<th>State Tax Amount</th>
													<th>Total Tax Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="1" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Sale REPORT [GST Return] Ends Here ---------------------------------->

<!---------------------------------- Sale REPORT [Payment Mode Wise] Starts Here ---------------------------------->

							<div id="paymentModeWiseReport" class="tab-pane fade">

								<div class="miscellaneous">
									<form class="form-horizontal" method="post" action="">

										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
													<!-- id="salepayment"> -->
													<input type="date" id="pmDate" type="text"> <label
														for="pmDate">From<sup style="color: red;">*</sup></label>
												</div>
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="pmDate22" type="text"> <label
														for="pmDate">To<sup style="color: red;">*</sup></label>
												</div>
											<!-- </div> -->

											<!-- <div class="row"> -->


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
													<!-- id="salepayment"> -->
													<select id="paymentMode">
														<option value="cash">Cash</option>
														<option value="card">Card</option>
														<option value="cashAndCard">Cash And Card</option><option value="Upi">Upi</option>
														<option value="cashAndupi">Cash And Upi</option>
													</select> <label for="paymentMode">Payment Mode</label>
												</div>
												
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="paymentModeWiseReport()" value="Search" />
														</div>
														</div>
												</div>


											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="paymentModeWiseReportTable" class="display">
											<thead>
												<tr>
													<th>Bill No</th>
													<th>Customer Name</th>
													<th>Cash Amount</th>
													<th>Card Amount</th>
													<th>Credit Amount</th>
													<th>Total</th>
													<th>Payment Mode</th>
													<th>Date</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="2" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
<!---------------------------------- Sale REPORT [Payment Mode Wise] Starts Here ---------------------------------->
	
<!---------------------------------- Sale REPORT [Tax Invoice Without Barcode Wise] Starts Here ---------------------------------->							
							<div id="barcode" class="tab-pane">
								<div class="miscellaneous">
									<form class="form-horizontal" method="post" action=""
										name="supReportBill">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">


														<%
															ProductDetailHelper pdh6 = new ProductDetailHelper();
															List pList1 = pdh6.getbillnumber();
														%>

														<input list="BillnoList" id="BillnoId11"
															required>
														<datalist id="BillnoList">
															<%
																for (int i = 0; i < pList1.size(); i++) {
																	ItemList itemL = (ItemList) pList1.get(i);
															%>
															<option data-value="<%=itemL.getBillNo()%>"
																value="<%=itemL.getBillNo()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for=""> Select Bill No:<sup>*</sup></label>
													</div>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="BillFirstDate" type="text"> <label
														for="catFirstDate">From<sup style="color: red;">*</sup></label>
												</div>
												
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="BillEndDate" placeholder="End Date"
														type="text"> <label for="catEndDate">To<sup style="color: red;">*</sup></label>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">													
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="taxinvoice()" value="Search" />
														</div>
														</div>
												</div>

											</div>
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<!-- style="margin-left: -3%;width: 116%;overflow-y:hidden;border:2px solid black;" -->
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleTaxWise" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Item Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Quantity</th>
													<th>Buy Price<br>Excl. Tax
													</th>
													<th>Sale Price</th>
													<th>GST<br>%
													</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount<br>%
													</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Amount</th>
													<th>Date</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>

							</div>
<!---------------------------------- Sale REPORT [Tax Invoice Without Barcode Wise] Ends Here ---------------------------------->						
							
						</div>
					</div>
<!--++++++++++++++++++++++++++++++++++++++++++ Sale Reports Ends Here ++++++++++++++++++++++++++++++++++++++++++-->



<!--++++++++++++++++++++++++++++++++++++++++++ Stock Reports Starts Here ++++++++++++++++++++++++++++++++++++++++++-->

					<div class="tab-pane" id="stock">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Stock Reports</h2>
							</div>

							<div class="row">
								<div class="col-md-12" align="center">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>
					
					<div class="stockreport">
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#categoryWiseStock">Category Wise Stock</a></li>
							<li><a data-toggle="tab" href="#currentStock" onclick="currentStock()">Current Stock</a></li>
							<li><a data-toggle="tab" href="#barcodeNoWiseStock">Barcode Wise Stock</a></li>
							<li><a data-toggle="tab" href="#allWayReport" onclick="allWayReport()">All way Reports</a></li>
						</ul>
					</div>
					
						<div class="tab-content" id="tabname">

<!---------------------------------- Stock REPORT [Current Stock] Starts Here ---------------------------------->
							<div id="currentStock" class="tab-pane">

								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row" align="center">
											<div class="table-responsive"  id="tables">
												<table
													class="table table-bordered table-striped table-condensed cf"
													id="currStock" class="display">
													<thead>
														<tr>
															<th>Barcode No.</th>
															<th>Category Name</th>
															<th>Sub Category<br>Name
															</th>
															<th>Item Name</th>
															<th>Size</th>
															<th>Roll Size</th>
															<th>Quantity</th>
															<!-- <th>Update Date</th> -->
														</tr>
													</thead>
												</table>
											</div>
										</div>
									</fieldset>
								</form>
							</div>
<!---------------------------------- Stock REPORT [Current Stock] Ends Here ---------------------------------->

<!---------------------------------- Stock REPORT [Category Wise Stock] Starts Here ---------------------------------->
							<div id="categoryWiseStock" class="tab-pane fade in active">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">


												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<%
															CategoryHelper helper = new CategoryHelper();
															List mainCategoryList = helper.getAllMainCategories();
														%>

														<input list="catId_drop123" id="catId123" required>
														<datalist id="catId_drop123">
															<%
																for (int i = 0; i < mainCategoryList.size(); i++) {
																	Category category = (Category) mainCategoryList.get(i);
															%>
															<option data-value="<%=category.getPkCategoryId()%>"
																value="<%=category.getCategoryName()%>">
																<%
																	}
																%>
															
														</datalist>
														<label>Category Name<sup style="color: red;">*</sup></label>
													</div>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="getCategoryWiseStock();" value="Search" />
													</div>
													</div>
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
								<div class="table-responsive wrapper" id="tables">
								<div class="loading" id="exitLoad" ></div>
									<table id="catWiseStock" class="table table-bordered table-striped table-condensed cf" class="display">
										<thead>
											<tr>
												<th>Category Name</th>
												<th>Item Name</th>
												<th>Available Quantity</th>
												<th>Update Date</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
											</tr>
									</table>
									</div>
								</div>

							</div>
<!---------------------------------- Stock REPORT [Category Wise Stock] Ends Here ---------------------------------->

<!---------------------------------- Stock REPORT [Barcode Wise Stock] Starts Here ---------------------------------->

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
										<div class="table-responsive wrapper" id="tables">
										<div class="loading" id="exitLoad" ></div>
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
<!---------------------------------- Stock REPORT [Barcode Wise Stock] Ends Here ---------------------------------->

<!---------------------------------- Stock REPORT [All Way Reports] Starts Here ---------------------------------->

							<div id="allWayReport" class="tab-pane">

								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row" align="center" id="stockallway">
											<div class="table-responsive" id="stockalwaytable">
												<table
													class="table table-bordered table-striped table-condensed cf"
													id="currStock1" class="display">

													<thead>
														<tr>
															<th>Barcode No</th>
															<th>Item Name</th>
															<th>Category</th>
															<th>Quantity</th>
															<th>Rollsize</th>
															<th>Quantity<br>In<br>Meter
															</th>
															<th>Size</th>
															<th>Color</th>
														</tr>
													</thead>



												</table>
											</div>
										</div>
									</fieldset>
								</form>
							</div>
<!---------------------------------- Stock REPORT [All Way Reports] Ends Here ---------------------------------->
							
						</div>
					</div>
<!--++++++++++++++++++++++++++++++++++++++++++ Stock Reports Ends Here ++++++++++++++++++++++++++++++++++++++++++-->					


<!--++++++++++++++++++++++++++++++++++++++++++ Sale Return Reports Starts Here ++++++++++++++++++++++++++++++++++++++++++-->
					<div class="tab-pane" id="miscellaneous">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Sale Return Reports</h2>
							</div>

							<div class="row">
								<div class="col-md-12" align="center">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>
					
					<div class="salereturn">
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#SingleDate">Datewise</a></li>
							<li><a data-toggle="tab" href="#miscellaneousTwoDate">Range</a></li>
							<li><a data-toggle="tab" href="#miscellaneousCategoryWise">Category Wise</a></li>
							<li><a data-toggle="tab" href="#miscellaneousBillNoWise">Bill No Wise</a></li>
							<li><a data-toggle="tab" href="#miscellaneousBarcodeNoWise">Barcode No Wise</a></li>
						</ul>
					</div>

						<div class="tab-content" id="tabname">

<!---------------------------------- Sale Return REPORTs [Date Wise] Starts Here ---------------------------------->
							<!--  Miscellaneos Sale for single date -->
							<!-- <div id="miscellaneousSingleDate" class="tab-pane fade in active"> -->
							<div id="SingleDate" class="tab-pane fade in active">
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="msDate" type="text"> <label
														for="">From<sup>*</sup></label>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
												<div class="row" id="btnrow">
													<div class="invoice_button">
												<!-- <div class="col-md-2" id="btnsub"> -->
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="miscellaneousSingleDate()" value="Search" />
												<!-- </div> -->
												</div>
												</div>
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="miscellaneousSingleDateReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<th>SalePrice</th>
													<th>GST</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<!-- <th class="hidden">Total Price</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<!-- <th></th>-->
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Sale Return REPORTs [Date Wise] Ends Here ---------------------------------->

<!---------------------------------- Sale Return REPORTs [Range] Starts Here ---------------------------------->

							<div id="miscellaneousTwoDate" class="tab-pane">
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
												<!-- 	id="salerange"> -->
													<input type="date" id="msfisDate" type="text"> <label
														for="startDate">From<sup style="color: red;">*</sup></label>
												</div>





												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="msendDate" type="text"> <label
														for="endDate">To<sup style="color: red;">*</sup></label>
												</div>
														</div>


												<div class="row" id="btnrow">
											<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="miscellaneousTwoDate()" value="Search" />

												</div>
												</div>

											
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="miscellaneousTwoDateReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<th>Sale Price</th>
													<th>GST</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<th>Return Date</th>
													<!-- <th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Sale Return REPORTs [Range] Ends Here ---------------------------------->

<!---------------------------------- Sale Return REPORTs [Category Wise] Starts Here ---------------------------------->
							<div id="miscellaneousCategoryWise" class="tab-pane">
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<%
															CategoryHelper ch2 = new CategoryHelper();
															List lis = ch2.getCategorys();
														%>

														<input list="mscatId_drop" id="mscatId" required>
														<datalist id="mscatId_drop">
															<%
																for (int i = 0; i < lis.size(); i++) {
																	CategoryDetails item2 = (CategoryDetails) lis.get(i);
															%>
															<option data-value="<%=item2.getCatId()%>"
																value="<%=item2.getCatName()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for=""> Select Category<sup>*</sup></label>
													</div>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="miscellaneousSaleWiseCustomer()" value="Search"/>
														</div>
														</div>
												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
								<div class="table-responsive wrapper" id="tables">
								<div class="loading" id="exitLoad" ></div>
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="miscellaneousSaleWiseCustomerReport" class="display">
										<thead>
											<tr>
												<th>Sr No</th>
												<th>Bill No</th>
												<th>Barcode No</th>
												<th>Category Name</th>
												<th>Item Name</th>
												<th>Return Quantity</th>
												<th>Sale Price</th>
												<th>GST</th>
												<th>Sale Price<br>Without Tax</th>
												<th>Discount</th>
												<th>Tax Amount</th>
												<th>Return Amount</th>
												<th>Return Date</th>
												<!-- <th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

											</tr>
										</thead>
										<tfoot>
											<tr>
												<th colspan="5" style="text-align: right">Total:</th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
												<th></th>
											</tr>
										</tfoot>
									</table>
									</div>
								</div>


							</div>
<!---------------------------------- Sale Return REPORTs [Category Wise] Ends Here ---------------------------------->


<!---------------------------------- Sale Return REPORTs [Bill No Wise] Starts Here ---------------------------------->

							<div id="miscellaneousBillNoWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<%
														OtherBillDao ms1 = new OtherBillDao();
														List lisms = ms1.getBillNo(request, response);
													%>

													<input list="msBillNocust_id" id="msBillNocust">
													<datalist id="msBillNocust_id">
														<%
															for (int i = 0; i < lisms.size(); i++) {
																BillCopy billList1 = (BillCopy) lisms.get(i);
														%>
														<option data-value="<%=billList1.getBillNo()%>"
															value="<%=billList1.getBillNo()%>">
															<%
																}
															%>
														
													</datalist>
													<label for="">BillNo<sup>*</sup></label>
												</div>

												<!-- <div class="col-md-2" id="btnsub"> -->
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<div class="row" id="btnrow">
					<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="billnowiseMiscellaneoussell()" value="Search" />
												</div> 
												</div>
												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="billnowiseMiscellaneous" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<th>Sale Price</th>
													<th>GST</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<th>Return Date</th>
													<!-- <th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
<!---------------------------------- Sale Return REPORTs [Bill No Wise] Ends Here ---------------------------------->

<!---------------------------------- Sale Return REPORTs [Barcode No Wise] Starts Here ---------------------------------->
							<div id="miscellaneousBarcodeNoWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">

										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<input type="text" id="barcodeMiscellaneous" type="text"
															required> <label for="">Barcode No<sup>*</sup></label>
													</div>

													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<!-- <div class="col-md-2" id="btnsub"> -->
														<div class="row" id="btnrow">
															<div class="invoice_button">
														<input type="button" id="btn" name="save"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
															onclick="barcodenowiseMiscellaneoussell()" value="Search"/>
													</div>				
													</div>
													</div>
												</div>

											</div>
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="barcodewiseMiscellaneous" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<th>SalePrice</th>
													<th>GST</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<th>Return Date</th>
													<!-- <th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
<!---------------------------------- Sale Return REPORTs [Barcode No Wise] Ends Here ---------------------------------->

						</div>
					</div>
<!--++++++++++++++++++++++++++++++++++++++++++ Sale Return Reports Ends Here ++++++++++++++++++++++++++++++++++++++++++-->


<!--++++++++++++++++++++++++++++++++++++++++++ Credit Customer Sale Reports Starts Here ++++++++++++++++++++++++++++++++++++++++++-->

					<div class="tab-pane" id="credit">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Credit Customer Sale
									Reports</h2>
							</div>
							<div class="row">
								<div class="col-md-12" align="center">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>
					
				<div class="creditcust">		
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#creditSingleDate">Datewise</a></li>
							<li><a data-toggle="tab" href="#creditTwoDate">Range</a></li>
							<li><a data-toggle="tab" href="#creditCategoryWise">Category Wise</a></li>
							<li><a data-toggle="tab" href="#creditProductWise">Product Wise</a></li>
							<li><a data-toggle="tab" href="#creditBillNoWise">Bill No Wise</a></li>
							<li><a data-toggle="tab" href="#creditBarcodeNoWise">Barcode No Wise</a></li>
							<li><a data-toggle="tab" href="#paymentModeWiseReportForCC">Payment Mode Wise</a></li>
						</ul>
				</div>

						<div class="tab-content">

<!---------------------------------- Credit Customer Sale Reports [Datewise] Starts Here ---------------------------------->

							<div id="creditSingleDate" class="tab-pane fade in active">
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="csDate" type="text"> <label
														for="">From<sup>*</sup></label>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
												<div class="row" id="btnrow">
													<div class="invoice_button">				
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="creditSingleDate()" value="Search" />
													</div>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
								
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="creditSingleDateReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Customer Name</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Quantity</th>
													<th>Sale Price</th>
													<th>Tax (%)</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount (%)</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Price</th>
													<!-- <th>Tax (%)</th>
														<th>Tax Amount</th> 
														<th>Gross Total</th>
														-->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<!-- <th></th> -->
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Credit Customer Sale Reports [Datewise] Ends Here ---------------------------------->


<!---------------------------------- Credit Customer Sale Reports [Range] Starts Here ---------------------------------->

							<div id="creditTwoDate" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="csfisDate" type="text"> <label
														for="startDate">From<sup style="color: red;">*</sup></label>
												</div>




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="csendDate" type="text"> <label
														for="endDate">To<sup style="color: red;">*</sup></label>
												</div>
											</div>


												<div class="row" id="btnrow">
													<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="creditTwoDate()" value="Search"/>
												</div>
												</div>

											
										</div>
									</form>
								</div>

								<div class="row" align="center">

									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="creditTwoDateReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Customer Name</th>
													<th>Barcode No</th>
													<th>CategoryName</th>
													<th>Item Name</th>
													<th>Quantity</th>
													<th>SalePrice</th>
													<th>Tax (%)</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount (%)</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Price</th>
													<th>Date</th>

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Credit Customer Sale Reports [Range] Ends Here ---------------------------------->

<!---------------------------------- Credit Customer Sale Reports [Category Wise] Starts Here ---------------------------------->
							<div id="creditCategoryWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
										<div class="row">
											<div class="invoice_label_up">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<%
														CategoryHelper ch3 = new CategoryHelper();
														List lis3 = ch3.getCategorys();
													%>

													<input list="cscatId_drop" id="cscatId" required>
													<datalist id="cscatId_drop">
														<%
															for (int i = 0; i < lis3.size(); i++) {
																CategoryDetails item3 = (CategoryDetails) lis3.get(i);
														%>
														<option data-value="<%=item3.getCatId()%>"
															value="<%=item3.getCatName()%>">
															<%
																}
															%>
														
													</datalist>
													<label for="">Select Category<sup>*</sup></label>
												</div>
											</div>


											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<div class="row" id="btnrow">
													<div class="invoice_button">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
													onclick="creditSaleWiseCustomer()" value="Search" />
													</div>
													</div>
											</div>

										</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="creditSaleWiseCustomerReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Customer Name</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Quantity</th>
													<th>Sale Price</th>
													<th>Tax (%)</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount (%)</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Price</th>
													<th>Sale Date</th>

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Credit Customer Sale Reports [Category Wise] Ends Here ---------------------------------->

<!---------------------------------- Credit Customer Sale Reports [Payment Mode Wise] Starts Here ---------------------------------->

							<div id="paymentModeWiseReportForCC" class="tab-pane fade">

								<div class="miscellaneous" style="left:;">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="startDateForCC" type="text">
													<label for="startDateForCC">From<sup style="color: red;">*</sup></label>
												</div>




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="endDateForCC" type="text"> <label
														for="endDateForCC">To<sup style="color: red;">*</sup></label>
												</div>
										<!-- </div> -->

											<!-- <div class="row"> -->

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<select id="paymentModeForCC">
														<option value="cash">Cash</option>
														<option value="card">Card</option>
														<option value="cashAndCard">Cash And Card</option>
														<option value="Upi">Upi</option>
														<option value="cashAndupi">Cash And Upi</option>
													</select> <label for="paymentModeForCC">Payment Mode</label>
												</div>

												
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="paymentModeWiseReportForCC()" value="Search" />
														</div>
														</div>
												</div>


											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="paymentModeWiseReportTableForCC" class="display">
											<thead>
												<tr>
													<th>Bill No</th>
													<th>Customer Name</th>
													<th>Cash Amount</th>
													<th>Card Amount</th>
													<th>Credit Amount</th>
													<th>Total</th>
													<th>Payment Mode</th>
													<th>Date</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="2" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Credit Customer Sale Reports [Payment Mode Wise] Ends Here ---------------------------------->


<!---------------------------------- Credit Customer Sale Reports [Product Wise] Starts Here ---------------------------------->

							<div id="creditProductWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<%
															CreditCustomerBillHelper ccbh = new CreditCustomerBillHelper();
															List ccbhList = ccbh.getCcbProductListHelper();
														%>

														<input list="csproductId_drop" id="csproductId" required>
														<datalist id="csproductId_drop">
															<%
																for (int i = 0; i < ccbhList.size(); i++) {
																	ItemList ccbProductList = (ItemList) ccbhList.get(i);
															%>
															<option data-value="<%=ccbProductList.getPkProductId()%>"
																value="<%=ccbProductList.getItem_name()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for=""> Select Product<sup>*</sup></label>

													</div>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="prtoductWiserCreditCustomerSaleReport()"
														value="Search" />
														</div>
														</div>

												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="creditSaleProductWiseReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Customer Name</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Quantity</th>
													<th>Sale Price</th>
													<th>Tax (%)</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount (%)</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Price</th>
													<th>Sale Date</th>

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>



							</div>
<!---------------------------------- Credit Customer Sale Reports [Product Wise] Ends Here ---------------------------------->							
						
<!---------------------------------- Credit Customer Sale Reports [Bill No Wise] Starts Here ---------------------------------->

							<div id="creditBillNoWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<%
															CreditCustBillDao cs1 = new CreditCustBillDao();
															List lrst4 = cs1.getBillNo(request, response);
														%>

														<input list="csBillNocust_id" id="csBillNocust" required>
														<datalist id="csBillNocust_id">
															<%
																for (int i = 0; i < lrst4.size(); i++) {
																	BillCopy bli = (BillCopy) lrst4.get(i);
															%>
															<option data-value="<%=bli.getBillNo()%>"
																value="<%=bli.getBillNo()%>    <%=bli.getCustName()%> <%=bli.getLastName()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for=""> Select Bill No<sup>*</sup></label>
													</div>
												</div>



												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">	
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="billnowiseCreditsell()" value="Search" />
														</div>
														</div>
												</div>

											</div>
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="billnowiseCredit" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Customer Name</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Quantity</th>
													<th>Sale Price</th>
													<th>Tax (%)</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount (%)</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Price</th>
													<th>Sale Date</th>

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Credit Customer Sale Reports [Bill No Wise] Starts Here ---------------------------------->

<!---------------------------------- Credit Customer Sale Reports [Barcode No Wise] Starts Here ---------------------------------->

							<div id="creditBarcodeNoWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<input type="text" id="barcodeCredit" type="text" required>
														<label for=""> Barcode No:<sup>*</sup>
														</label>
													</div>
												</div>



												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<div class="row" id="btnrow">
															<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="barcodenowiseCredit()" value="Search" />
														</div>
														</div>
												</div>



											</div>
										</div>
									</form>
								</div>
								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="barcodewiseCredit" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Customer Name</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Quantity</th>
													<th>Sale Price</th>
													<th>Tax (%)</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount (%)</th>
													<th>Discount<br>Amount
													</th>
													<th>Tax Amount<br>After Discount
													</th>
													<th>Total Price</th>
													<th>Date</th>


												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Credit Customer Sale Reports [Barcode No Wise] Ends Here ---------------------------------->

<!---------------------------------- Credit Customer Sale Reports [Payment Mode Wise] Starts Here ---------------------------------->



							<div id="paymentModeWiseReportForCC" class="tab-pane fade">

								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-2 control-label" for="pmDateForCC">
												Start Date:<sup style="color: red;">*</sup></label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pmDateForCC"
														placeholder="Start Date" class="form-control input-md"
														type="text">
												</div>
											</div>

											<label class="col-md-2 control-label" for="pmDate22ForCC">
												End Date:<sup style="color: red;">*</sup></label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <input type="date" id="pmDate22ForCC"
														placeholder="End Date" class="form-control input-md"
														type="text">
												</div>
											</div>
										</div>

										<div class="row form-group">


											<label class="col-md-2 control-label" for="paymentMode">Payment
												Mode:</label>
											<div class="col-md-3">
												<div class="input-group">
													<span class="input-group-addon"> <i
														class="glyphicon glyphicon-calendar"></i>
													</span> <select class="form-control" id="paymentModeForCC">
														<option value="cash">Cash</option>
														<option value="card">Card</option>
														<option value="cashAndCard">Cash And Card</option>
													</select>
												</div>
											</div>

											<div class="row form-group">
												<div class="col-md-1 col-sm-offset-1">
													<div class="input-group">
														<input type="button" id="btn" name="save"
															style="height: 27px; padding: 0px;"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right"
															onclick="paymentModeRangeWiseReport()" value="Search" />
													</div>
												</div>
											</div>
										</div>


										<div class="row" align="center">				
										<div class="table-responsive wrapper" id="tables">
										<div class="loading" id="exitLoad" ></div>
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="paymentModeWiseReportTable" class="display">
												<thead>
													<tr>
														<th>Bill No</th>
														<th>Customer Name</th>
														<th>Cash Amount</th>
														<th>Card Amount</th>
														<th>Credit Amount</th>
														<th>Total</th>
														<th>Payment Mode</th>
														<th>Date</th>
													</tr>
												</thead>
												<tfoot>
													<tr>
														<th colspan="2" style="text-align: right">Total:</th>
														<th></th>
														<th></th>
														<th></th>
														<th></th>
														<th></th>
														<th></th>
													</tr>
												</tfoot>
											</table>
										</div>
										</div>
									</fieldset>
								</form>
							</div>
<!---------------------------------- Credit Customer Sale Reports [Payment Mode Wise] Ends Here ---------------------------------->
						</div>
					</div>
<!--++++++++++++++++++++++++++++++++++++++++++ Credit Customer Sale Reports Ends Here ++++++++++++++++++++++++++++++++++++++++++-->



<!--++++++++++++++++++++++++++++++++++++++++++ Credit Customer Sale Return Reports Starts Here ++++++++++++++++++++++++++++++++++++++++++-->

					<div class="tab-pane" id="creditSaleReturn">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Credit Customer Sale
									Return Reports</h2>
							</div>

							<div class="row">
								<div class="col-md-12" align="center">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

					<div class="creditcussalereturn">
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#SingleDateCCSR">Datewise</a></li>
							<li><a data-toggle="tab" href="#CCSRTwoDate">Range</a></li>
							<li><a data-toggle="tab" href="#CCSRCategoryWise">Category Wise</a></li>
							<li><a data-toggle="tab" href="#CCSRBillNoWise">Bill No Wise</a></li>
							<li><a data-toggle="tab" href="#CCSRBarcodeNoWise">Barcode No Wise</a></li>
						</ul>
					</div>
					
						<div class="tab-content">

<!---------------------------------- Credit Customer Sale Return Reports [Date Wise] Starts Here ---------------------------------->
						
							<div id="SingleDateCCSR" class="tab-pane fade in active">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="crdDate" type="text"> <label for=""> From<sup>*</sup></label>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="CSRSingleDate()" value="Search" />
														</div>
														</div>
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="CSR1SingleDateReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<th>Sale Price</th>
													<th>GST</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<!-- <th class="hidden">Total Price</th>
													<th>Tax Percentage</th>
													<th>Tax Amount</th>
													<th>Total Amount</th> -->

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<!-- <th></th> -->
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Credit Customer Sale Return Reports [Date Wise] Ends Here ---------------------------------->


<!---------------------------------- Credit Customer Sale Return Reports [Range] Starts Here ---------------------------------->

							<div id="CCSRTwoDate" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="csrfisDate" type="text"> <label
														for="startDate">From<sup style="color: red;">*</sup></label>
												</div>



												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<input type="date" id="csrendDate" type="text"> <label
														for="endDate">To<sup style="color: red;">*</sup></label>
												</div>

												<!-- <div class="col-md-2" id="btnsub"> -->
												<div class="row" id="btnrow">
													<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right  btnwidth"
														onclick="CSRTwoDate()" value="Search" />
														</div>
														</div>
												<!-- </div> -->
											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="CSR2TwoDateReport" class="display">

											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<th>Sale Price</th>
													<th>GST</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Credit Customer Sale Return Reports [Range] Ends Here ---------------------------------->

<!---------------------------------- Credit Customer Sale Return Reports [Category Wise] Starts Here ---------------------------------->

							<div id="CCSRCategoryWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<%
															CategoryHelper chsaleReturn = new CategoryHelper();
															List lisaleReturn = chsaleReturn.getCategorys();
														%>

														<input list="csrcatId_drop" id="csrcatId" required>
														<datalist id="csrcatId_drop">
															<%
																for (int i = 0; i < lisaleReturn.size(); i++) {
																	CategoryDetails item2 = (CategoryDetails) lisaleReturn.get(i);
															%>
															<option data-value="<%=item2.getCatId()%>"
																value="<%=item2.getCatName()%>">
																<%
																	}
																%>
															
														</datalist>
														<label for="">Select Category<sup>*</sup></label>
													</div>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<div id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="CSRSaleWiseCustomer()" value="Search" />
														</div>
														</div>

												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="CSR3SaleWiseCustomerReport" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<th>Sale Price</th>
													<th>GST</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<th>Return Date</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Credit Customer Sale Return Reports [Category Wise] Ends Here ---------------------------------->

<!---------------------------------- Credit Customer Sale Return Reports [Bill No Wise] Starts Here ---------------------------------->

							<div id="CCSRBillNoWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
										<div class="row">
											<div class="invoice_label_up">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<%
														CreditCustBillDao ms12 = new CreditCustBillDao();
														List lisms2 = ms12.getBillNo(request, response);
													%>

													<input list="csrBillNocust_id" id="csrBillNocust" required>
													<datalist id="csrBillNocust_id">
														<%
															for (int i = 0; i < lisms2.size(); i++) {
																BillCopy billList1 = (BillCopy) lisms2.get(i);
														%>
														<option data-value="<%=billList1.getBillNo()%>"
															value="<%=billList1.getBillNo()%>">
															<%
																}
															%>
														
													</datalist>
													<label for=""> Select BillNo<sup>*</sup></label>
												</div>
											</div>

											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
												<div class="row" id="btnrow">
													<div class="invoice_button">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
													onclick="billnowiseCCSR()" value="Search" />
													</div>
													</div>
											</div>
										</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="billnowiseCCSR" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Customer Name</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<th>Sale Price</th>
													<th>GST</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<th>Return Date</th>

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>
<!---------------------------------- Credit Customer Sale Return Reports [Bill No Wise] Ends Here ---------------------------------->

<!---------------------------------- Credit Customer Sale Return Reports [Barcode No Wise] Starts Here ---------------------------------->

							<div id="CCSRBarcodeNoWise" class="tab-pane">

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<input type="text" id="barcodecsr" type="text" required>
														<label for="">Barcode No:<sup>*</sup></label>
													</div>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
													<div class="row" id="btnrow">
														<div class="invoice_button">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
														onclick="barcodenowiseCSR()" value="Search" />
													</div>
													</div>
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="row" align="center">
									<div class="table-responsive wrapper" id="tables">
									<div class="loading" id="exitLoad" ></div>
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="barcodewiseCCSR" class="display">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bill No</th>
													<th>Barcode No</th>
													<th>Category Name</th>
													<th>Item Name</th>
													<th>Return Quantity</th>
													<th>Sale Price</th>
													<th>GST</th>
													<th>Sale Price<br>Without Tax
													</th>
													<th>Discount</th>
													<th>Tax Amount</th>
													<th>Return Amount</th>
													<th>Return Date</th>

												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
								
							</div>
<!---------------------------------- Credit Customer Sale Return Reports [Barcode No Wise] Ends Here ---------------------------------->

						</div>
					</div>
<!--++++++++++++++++++++++++++++++++++++++++++ Credit Customer Sale Return Reports Starts Here ++++++++++++++++++++++++++++++++++++++++++-->


<!--++++++++++++++++++++++++++++++++++++++++++ All Graphs Starts Here ++++++++++++++++++++++++++++++++++++++++++-->
					<div class="tab-pane" id="allGraphsReports" align="left">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">All Graph Reports</h2>
							</div>

							<div class="row">
								<div class="col-md-12" align="center">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>

						<div class="allgraph">
							<ul class="nav nav-tabs" id="navtab">
								<li class="active"><a data-toggle="tab" href="#graphReports">All Graph</a></li>
								<li><a data-toggle="tab" href="#rangeWiseAllGraphReport">Range Wise</a></li>
								<li><a data-toggle="tab" href="#supplierWiseAllGraphReports">Supplier Wise</a></li>
								<li><a data-toggle="tab" href="#subcategoryWiseAllGraphReports">Sub Category Wise</a></li>
							</ul>
						</div>
						
							<div class="tab-content" id="tabcontent">

<!---------------------------------- Graphs [All Grphs] Starts Here ---------------------------------->
								<div id="graphReports" class="tab-pane fade in active">
									<!-- style="margin-left: -23px;"> -->
									<div>
										<h2 class="form-name style_heading" align="center"
											style="margin-top: 2%;">Sale Graph</h2>
										<div class="col-md-12" align="center">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>

									<div class="container-fluid"
										style="width: 100%; overflow: auto;">
										<div class="row" id="row">
											<div class="col-md-12 col-lg-12">
												<div class="col-md-3 col-lg-3" id="graphcolumn">
													<div id="categoryWiseSaleGraph" class="graphlength">
														<div class="table-responsive" id="tables">
															<table
																class="table table-bordered table-striped table-condensed cf"
																id="categoryWiseSaleGraphTable" class="display"
																style="border: 2px solid black; border-collapse: collapse;">
																<thead>
																	<tr>
																		<th>Category</th>
																		<th>Quantity</th>
																	</tr>
																</thead>
															</table>
														</div>
													</div>
												</div>

												<div class="col-md-3 col-lg-3" id="graphcolumn">
													<div id="todaysCategoryWiseSaleGraph" class="graphlength">
														<div class="table-responsive" id="tables">
															<table
																class="table table-bordered table-striped table-condensed cf"
																id="todayCategoryWiseSaleGraphTable" class="display"
																style="border: 2px solid black; border-collapse: collapse;">
																<thead>
																	<tr>
																		<th>Category</th>
																		<th>Quantity</th>
																	</tr>
																</thead>
															</table>
														</div>
													</div>
												</div>

												<div class="col-md-3 col-lg-3" id="graphcolumn">
													<div id="supplierWiseTotalSaleGraph" class="graphlength">
														<div class="table-responsive" id="tables">
															<table
																class="table table-bordered table-striped table-condensed cf"
																id="supplierWiseTotalSaleGraphTable" class="display"
																style="border: 2px solid black; border-collapse: collapse;">
																<thead>
																	<tr>
																		<th>Category</th>
																		<th>Quantity</th>
																	</tr>
																</thead>
															</table>
														</div>
													</div>
												</div>

												<div class="col-md-3 col-lg-3" id="graphcolumn">
													<div id="subCategoryWiseTotalSaleGraph" class="graphlength">
														<div class="table-responsive" id="tables">
															<table
																class="table table-bordered table-striped table-condensed cf"
																id="subCategoryWiseTotalSaleGraphTable" class="display"
																style="border: 2px solid black; border-collapse: collapse;">
																<thead>
																	<tr>
																		<th>Category</th>
																		<th>Quantity</th>
																	</tr>
																</thead>
															</table>
														</div>
													</div>
												</div>
											</div>

										</div>
									</div>

									<div>
										<div class="col-md-12" align="center">
											<hr style="border-top-color: #c1b1b1;">
										</div>
										<h2 class="form-name style_heading" align="center">Purchase
											Graph</h2>
										<div class="col-md-12" align="center">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>

									<div class="container-fluid"
										style="width: 100%; overflow: auto; margin-bottom: 10%;">
										<div class="row" id="row">
											<div class="col-md-12 col-lg-12">

												<div class="col-md-3 col-lg-3" id="graphcolumn">
													<div id="categoryWisePurchaseGraph" class="graphlength">
														<div class="table-responsive" id="tables">
															<table
																class="table table-bordered table-striped table-condensed cf"
																id="categoryWisePurchaseGraphTable" class="display"
																style="border: 2px solid black; border-collapse: collapse;">
																<thead>
																	<tr>
																		<th>Category</th>
																		<th>Quantity</th>
																	</tr>
																</thead>
															</table>
														</div>
													</div>
												</div>

												<div class="col-md-3 col-lg-3" id="graphcolumn">
													<div id="todaysCategoryWisePurchaseGraph"
														class="graphlength">
														<div class="table-responsive" id="tables">
															<table
																class="table table-bordered table-striped table-condensed cf"
																id="todaySategoryWisePurchaseGraphTable" class="display"
																style="border: 2px solid black; border-collapse: collapse;">
																<thead>
																	<tr>
																		<th>Category</th>
																		<th>Quantity</th>
																	</tr>
																</thead>
															</table>
														</div>
													</div>
												</div>


												<div class="col-md-3 col-lg-3" id="graphcolumn">
													<div id="supplierWiseTotalPurchaseGraph"
														class="graphlength">
														<div class="table-responsive" id="tables">
															<table
																class="table table-bordered table-striped table-condensed cf"
																id="supplierWiseTotalPurchaseGraphTable" class="display"
																style="border: 2px solid black; border-collapse: collapse;">
																<thead>
																	<tr>
																		<th>Category</th>
																		<th>Quantity</th>
																	</tr>
																</thead>
															</table>
														</div>
													</div>
												</div>

												<div class="col-md-3 col-lg-3" id="graphcolumn">
													<div id="subCategoryWiseTotalPurchaseGraph"
														class="graphlength">
														<div class="table-responsive" id="tables">
															<table
																class="table table-bordered table-striped table-condensed cf"
																id="subCategoryWiseTotalPurchaseGraphTable"
																class="display"
																style="border: 2px solid black; border-collapse: collapse;">
																<thead>
																	<tr>
																		<th>Category</th>
																		<th>Quantity</th>
																	</tr>
																</thead>
															</table>
														</div>
													</div>
												</div>
											</div>

										</div>
									</div>


									<div class="container-fluid">
										<div class="row" style="margin-top: 29px;">


											<div class="col-md-6 col-lg-6">

												<div id="pie_categoryWiseSaleGraph"
													style="width: 400px; height: 400px; margin: 0 auto;"
													hidden="true">
													<div class="table-responsive" id="tables">
														<table
															class="table table-bordered table-striped table-condensed cf"
															id="pie_categoryWiseSaleGraphTable" class="display"
															style="border: 2px solid black; border-collapse: collapse;">
															<thead>
																<tr>
																	<th>Category</th>
																	<th>Quantity</th>
																</tr>
															</thead>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

<!---------------------------------- Graphs [All Grphs] Ends Here ---------------------------------->

<!---------------------------------- Graphs [Range Wise] Starts Here ---------------------------------->

								<div id="rangeWiseAllGraphReport" class="tab-pane">

									<div class="miscellaneous" style="left:">
										<form class="form-horizontal" method="post" action="">
											<div class="container">
												<div class="row">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<input type="date" id="startDateRangeGraph" type="text">
														<label for="startDateRangeGraph">From<sup style="color: red;">*</sup></label>
													</div>



													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<input type="date" id="endDateRangeGraph" type="text">
														<label for="endDateRangeGraph">To<sup style="color: red;">*</sup></label>
													</div>
												</div>

													<!-- <div class="col-md-2 col-lg-2" id="btnsub"> -->
													<div class="row" id="btnrow">
														<div class="invoice_button">
														<input type="button" id="btn" name="save"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
															onclick="rangeWiseSaleGraph(); rangeWisePurchaseGraph();"
															value="Search" />
															</div>
															</div>
													<!-- </div> -->
												
											</div>
										</form>
									</div>

									<div class="container" style="margin-bottom: 10%;">
										<div class="row">
											<div class="col-md-6 col-lg-6">

												<div>
													<h2 class="form-name style_heading" align="center">Sale
														Graph</h2>
													<div class="col-md-12" align="center">
														<hr style="border-top-color: #c1b1b1;">
													</div>
												</div>

												<div id="rangeWiseSaleGraph"
													style="width: 400px; height: 400px; margin: 0 auto;">
													<div class="table-responsive">
														<table
															class="table table-bordered table-striped table-condensed cf"
															id="rangeWiseSaleGraphTable" class="display"
															style="border: 2px solid black; border-collapse: collapse;">
															<thead>
																<tr>
																	<th>Category</th>
																	<th>Quantity</th>
																</tr>
															</thead>
														</table>
													</div>
												</div>
											</div>

											<div class="col-md-6 col-lg-6">

												<div>
													<h2 class="form-name style_heading" align="center">Purchase
														Graph</h2>
													<div class="col-md-12" align="center">
														<hr style="border-top-color: #c1b1b1;">
													</div>
												</div>

												<div id="rangeWisePurchaseGraph"
													style="width: 400px; height: 400px; margin: 0 auto">
													<div class="table-responsive">
														<table
															class="table table-bordered table-striped table-condensed cf"
															id="rangeWisePurchaseGraphTable" class="display"
															style="border: 2px solid black; border-collapse: collapse;">
															<thead>
																<tr>
																	<th>Category</th>
																	<th>Quantity</th>
																</tr>
															</thead>
														</table>
													</div>
												</div>
											</div>

										</div>
									</div>

								</div>

<!---------------------------------- Graphs [Range Wise] Ends Here ---------------------------------->

<!---------------------------------- Graphs [Supplier Wise] Starts Here ---------------------------------->

								<div id="supplierWiseAllGraphReports" class="tab-pane">

									<div class="miscellaneous">
										<form class="form-horizontal" method="post" action=""
											name="supReportBill">
											<div class="container">
												<div class="row">



													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<div>
															<input type="date" id="startDateSuppGraph" type="text">
															<label for="startDateSuppGraph">From<sup style="color: red;">*</sup></label>
														</div>

													</div>

													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<div>
															<input type="date" id="endDateSuppGraph" type="text">
															<label for="endDateSuppGraph">To<sup style="color: red;">*</sup></label>
														</div>
													</div>

												</div>
												<div class="row">
													<div class="invoice_label_up">
														<div
															class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
															id="graphcolumnwidth">
															<%
																SupplierDetailDao suppGraph = new SupplierDetailDao();
																List sListGraph = suppGraph.getAllSupplier();
															%>
															<input list="sup_dropSpGraph" id="supplierSpGraph"
																required>
															<datalist id="sup_dropSpGraph">
																<%
																	for (int i = 0; i < sListGraph.size(); i++) {
																		SupplierDetail supGlist = (SupplierDetail) sListGraph.get(i);
																%>
																<option data-value="<%=supGlist.getSupplierId()%>"
																	value="<%=supGlist.getSupplierName()%>">
																	<%
																		}
																	%>
																
															</datalist>
															<label for="supplierSpGraph">Supplier Name<sup style="color: red;">*</sup></label>
														</div>
													</div>


													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
															id="graphcolumnwidth">
															<div class="row" id="btnrow">
															<div class="invoice_button">
														<input type="button" id="btn" name="save"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
															onclick="supplierWiseSaleGraph(); supplierWisePurchaseGraph();"
															value="Search" />
												</div>
												</div>
													</div>


												</div>
											</div>
										</form>
									</div>



									<div class="container-fluid" style="margin-bottom: 10%;">
										<div class="row">
											<div class="col-md-6 col-lg-6" id="wisesalegraph">

												<div>
													<h2 class="form-name style_heading" align="center">Sale
														Graph</h2>
													<div class="col-md-12" align="center">
														<hr style="border-top-color: #c1b1b1;">
													</div>
												</div>

												<div id="supplierWiseSaleGraph"
													style="width: 400px; height: 400px; margin: 0 auto;">
													<div class="table-responsive">
														<table
															class="table table-bordered table-striped table-condensed cf"
															id="supplierWiseSaleGraphTable" class="display"
															style="border: 2px solid black; border-collapse: collapse;">
															<thead>
																<tr>
																	<th>Category</th>
																	<th>Quantity</th>
																</tr>
															</thead>
														</table>
													</div>
												</div>
											</div>

											<div class="col-md-6 col-lg-6" id="wisepurchasegraph">

												<div>
													<h2 class="form-name style_heading" align="center">Purchase
														Graph</h2>
													<div class="col-md-12" align="center">
														<hr style="border-top-color: #c1b1b1;">
													</div>
												</div>

												<div id="supplierWisePurchaseGraph"
													style="width: 400px; height: 400px; margin: 0 auto">
													<div class="table-responsive">
														<table
															class="table table-bordered table-striped table-condensed cf"
															id="supplierWisePurchaseGraphTable" class="display"
															style="border: 2px solid black; border-collapse: collapse;">
															<thead>
																<tr>
																	<th>Category</th>
																	<th>Quantity</th>
																</tr>
															</thead>
														</table>
													</div>
												</div>
											</div>

										</div>
									</div>

								</div>
<!---------------------------------- Graphs [Supplier Wise] Ends Here ---------------------------------->
	



<!---------------------------------- Graphs [Sub Category Wise] Starts Here ---------------------------------->

								<div id="subcategoryWiseAllGraphReports" class="tab-pane">

									<div class="miscellaneous">
										<form class="form-horizontal" method="post" action=""
											name="supReportBill">
											<div class="container">
												<div class="row">



													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<div>
															<input type="date" id="startDateSubCatGraph" type="text">
															<label for="startDateSubCatGraph">From<sup style="color: red;">*</sup></label>
														</div>
													</div>

													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">
														<div>
															<input type="date" id="endDateSubCatGraph" type="text">
															<label for="endDateSubCatGraph">To<sup style="color: red;">*</sup></label>
														</div>
													</div>
												</div>
												<div class="row">
													<div class="invoice_label_up">
														<div
															class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
															id="graphcolumnwidth">
															<%
																CategoryDao catD = new CategoryDao();
																List SubCGraph = catD.getAllMainSubCategoryForGraph();
															%>
															<input list="subCatdropSpGraph" id="subCatSpGraph"
																required>
															<datalist id="subCatdropSpGraph">
																<%
																	for (int i = 0; i < SubCGraph.size(); i++) {
																		allSubCategories subCatlist = (allSubCategories) SubCGraph.get(i);
																%>
																<option data-value="<%=subCatlist.getPkSubcatId()%>"
																	value="<%=subCatlist.getSubcatName()%>">
																	<%
																		}
																	%>
																
															</datalist>
															<label for="subCatdropSpGraph">Sub Category<sup style="color: red;">*</sup></label>
														</div>
													</div>


													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
															id="graphcolumnwidth">
															<div class="row" id="btnrow">
																	<div class="invoice_button">
														<input type="button" id="btn" name="save"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
															onclick="subCatRangeWiseSaleGraph(); subCatRangeWisePurchaseGraph();"
															value="Search" />
															</div>
															</div>
													</div>


												</div>
											</div>
										</form>
									</div>



									<div class="container-fluid" style="margin-bottom: 10%;">
										<div class="row">
											<div class="col-md-6 col-lg-6" id="wisesalegraph">

												<div>
													<h2 class="form-name style_heading" align="center">Sale
														Graph</h2>
													<div class="col-md-12" align="center">
														<hr style="border-top-color: #c1b1b1;">
													</div>
												</div>

												<div id="subCatRangeWiseSaleGraph"
													style="width: 400px; height: 400px; margin: 0 auto;">
													<div class="table-responsive">
														<table
															class="table table-bordered table-striped table-condensed cf"
															id="subCatRangeWiseSaleGraphTable" class="display"
															style="border: 2px solid black; border-collapse: collapse;">
															<thead>
																<tr>
																	<th>Category</th>
																	<th>Quantity</th>
																</tr>
															</thead>
														</table>
													</div>
												</div>
											</div>

											<div class="col-md-6 col-lg-6" id="wisepurchasegraph">

												<div>
													<h2 class="form-name style_heading" align="center">Purchase
														Graph</h2>
													<div class="col-md-12" align="center">
														<hr style="border-top-color: #c1b1b1;">
													</div>
												</div>

												<div id="subCatRangeWisePurchaseGraph"
													style="width: 400px; height: 400px; margin: 0 auto">
													<div class="table-responsive">
														<table
															class="table table-bordered table-striped table-condensed cf"
															id="subCatRangeWisePurchaseGraphTable" class="display"
															style="border: 2px solid black; border-collapse: collapse;">
															<thead>
																<tr>
																	<th>Category</th>
																	<th>Quantity</th>
																</tr>
															</thead>
														</table>
													</div>
												</div>
											</div>

										</div>
									</div>

								</div>
<!---------------------------------- Graphs [Sub Category Wise] Starts Here ---------------------------------->
								




							</div>
						</div>
					</div>
<!--++++++++++++++++++++++++++++++++++++++++++ Graphs Starts Here ++++++++++++++++++++++++++++++++++++++++++-->

				</div>
			</div>
		<!-- </div> -->
		<!-- </div>
		</div> -->

		<div class="row footer_margin_top" align="center"><%@include
				file="y_commons/footer.jsp"%></div>
</body>