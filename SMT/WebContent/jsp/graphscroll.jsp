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
</style>
<body class="vColor" onload="shopDetailsJsFn()">
	<div class="row" style="min-height: 300px;">
		<div class="col-md-12">
			<h3>Left Tabs</h3>
			<hr />
			<div class="col-md-2">
				<ul class="nav nav-tabs tabs-left">
					<li class="active"><a href="#advanceBookingReport"
						data-toggle="tab" class="left-tab-new">Advance Booking Reports</a></li>
					<li><a href="#purchase" data-toggle="tab" class="left-tab-new">Purchase
							Reports</a></li>
					<li><a href="#purchaseReturn" data-toggle="tab"
						class="left-tab-new">Purchase Return Reports</a></li>
					<li><a href="#sell" data-toggle="tab" class="left-tab-new">Sale
							Reports</a></li>
					<li><a href="#miscellaneous" data-toggle="tab"
						class="left-tab-new">Sale Return Reports</a></li>
					<li><a href="#stock" data-toggle="tab" class="left-tab-new">Stock
							Reports</a></li>
					<li><a href="#credit" data-toggle="tab" class="left-tab-new">Credit
							Customer Sale Reports</a></li>
					<li><a href="#creditSaleReturn" data-toggle="tab"
						class="left-tab-new">Credit Customer Sale Return Reports</a></li>
					<li><a href="#allGraphsReports" data-toggle="tab"
						class="left-tab-new"
						onclick="categoryWiseSaleGraph(); todaysCategoryWiseSaleGraph(); supplierWiseTotalSaleGraph(); categoryWisePurchaseGraph(); TodaysCategoryWisePurchaseGraph(); supplierWiseTotalPurchaseGraph(); pie_categoryWiseSaleGraph(); subCategoryWiseSaleGraph(); subCategoryWisePurchaseGraph()">All
							Graphs</a></li>
				</ul>
			</div>
			<div class="col-xs-9">
				<!-- Tab panes -->
				<div class="tab-content">

					<div class="tab-pane active" id="advanceBookingReport">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Advance Booking Reports</h2>
							</div>

							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab"
								href="#advanceBookingRangeWise"><h4 style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab"
								href="#advanceBookingRangeAndSupplierWise"><h4
										style="color: blue">Supplier Wise</h4></a></li>
							<li><a data-toggle="tab" href="#advanceBookingBookingNoWise"><h4
										style="color: blue">Booking No Wise</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!---------- ADVANCE BOOKING REPORT between Two dates ------->

							<div id="advanceBookingRangeWise" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>

								<div class="miscellaneous" style="left: 10%;">
									<form class="form-horizontal" method="post" action="">
										<div class="row">
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
												<input type="date" id="aBFisDate" placeholder="Start Date"
													type="text"> <label for="aBFisDate">From</label>
											</div>

											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
												<input type="date" id="aBEndDate" placeholder="End Date"
													type="text"> <label for="aBEndDate">To</label>
											</div>

											<div class="col-lg-2 col-md-2 col-xs-2 col-xl-2">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="advanceBookingrangeWise()" value="Search"
													style="padding-bottom: 31px;" />
											</div>
										</div>
									</form>
								</div>
								<div class="table-responsive">
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="advanceBookingRangeWiseReport" class="display"
										style="border: 1px solid black; border-collapse: collapse;">
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

							<!-- SUPPLIER WISE ADVANCE BOOKING REPORT ------->


							<div id="advanceBookingRangeAndSupplierWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left: 10%;">
									<form class="form-horizontal" method="post" action="">

										<div class="row">
											<div class="invoice_label_up">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
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
													<label for="supplierAB">Supplier Name</label>
												</div>
											</div>


											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
												<input type="date" id="aBFisDateSuppWise"
													placeholder="Start Date" type="text"> <label
													for="aBFisDateSuppWise">From</label>
											</div>


										</div>

										<div class="row">
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
												<label for="aBEndDateSuppWise">To</label> <input type="date"
													id="aBEndDateSuppWise" placeholder="End Date" type="text">
											</div>





											<div class="col-lg-2 col-md-2 col-xs-2 col-xl-2">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="advanceBookingSupplierAndRangeWise()"
													value="Search" style="padding-bottom: 31px;" />
											</div>

										</div>

									</form>
								</div>

								<div class="table-responsive">
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="advanceBookigSuppAndRangeWise" class="display"
										style="border: 1px solid black; border-collapse: collapse;">
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

							<!---------- ADVANCE BOOKING REPORT BOOKING NO WISE ------->

							<div id="advanceBookingBookingNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left: 10%;">
									<form class="form-horizontal" method="post" action="">

										<div class="row">
											<div class="invoice_label_up">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="text" id="bookingNoAB" type="text" required>
													<label for="bookingNoAB">Booking No </label>
												</div>
											</div>


											<div class="col-lg-2">

												<input type="button" id="btnBN" name="btnBN"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="advanceBookingBookingNoWise()" value="Search"
													style="padding-bottom: 31px;'" />
											</div>

										</div>
									</form>
								</div>
								<div class="table-responsive">
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="advanceBooking_BookingNoWise" class="display"
										style="border: 1px solid black; border-collapse: collapse;">
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
					</div>


					<!---------- 	PURCHASE reports -------------->

					<div class="tab-pane" id="purchase">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Purchase Reports</h2>
							</div>
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#supplierName"><h4
										style="color: blue">Supplier Name Wise</h4></a></li>
							<li><a data-toggle="tab" href="#singleDatePurchase"><h4
										style="color: blue">Single Date</h4></a></li>
							<li><a data-toggle="tab" href="#twoDatePurchase"><h4
										style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#categoryWise"><h4
										style="color: blue">Category Wise</h4></a></li>
							<li><a data-toggle="tab" href="#productWise"><h4
										style="color: blue">Product Wise</h4></a></li>
							<li><a data-toggle="tab" href="#voucherWise"><h4
										style="color: blue">Voucher Wise</h4></a></li>
							<li><a data-toggle="tab" href="#supplierBillWise"><h4
										style="color: blue">Bill Number Wise</h4></a></li>
							<li><a data-toggle="tab" href="#barcodeNoWise"><h4
										style="color: blue">Barcode No Wise</h4></a></li>
							<li><a data-toggle="tab" href="#paymentDueDateWise"><h4
										style="color: blue">Payment Due Date Wise</h4></a></li>
							<li><a data-toggle="tab" href="#PurchasegstReturn"><h4
										style="color: blue">Gst Return</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!-- Supplier Name Wise -->
							<div id="supplierName" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left: 10%;">
									<form class="form-horizontal" method="post" action=""
										name="supReportBill">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

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
														<label for="supplier">Supplier Name</label>
													</div>
												</div>


												<div class="col-lg-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="supplierAllPurchase()" value="Search"
														style="padding-bottom: 28px;" />
												</div>

											</div>
										</div>
									</form>
								</div>
								<div class="table-responsive">
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="supplierNameWiseTable1" class="display"
										style="border: 2px solid black; border-collapse: collapse;">
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
												<th>Style</th>
												<th>HsnSac No</th>
												<th>Quantity</th>
												<th>Roll Size</th>
												<th>Qty (Mtr)</th>
												<th>Buy Price</th>
												<th>Discount<br>(%)
												</th>
												<th>Discount<br>Amt
												</th>
												<th>GST<br>(%)
												</th>
												<th>IGST<br>(%)
												</th>
												<th>Tax<br>Amount
												</th>
												<th>Total<br>Amount
												</th>
												<!-- <th>Total<br>Discount(%)</th>
														<th>Expenses</th> -->
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
											</tr>
										</tfoot>
									</table>
								</div>
							</div>


							<!-- Bill number wise -->

							<div id="supplierBillWise" class="tab-pane ">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReportBill">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

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
														<label for="supplier">Supplier Name</label>
													</div>
												</div>




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<select id='billNo' name="billNo"></select> <label
														for="bill_no">Bill No </label>
												</div>



												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="supplierBillWisePurchaseReport()" value="Search"
														style="padding-bottom: 28px;" />

												</div>
											</div>
										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierBillWiseData" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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
													<!-- <th>Total Discount(%)</th>
														<th>Expenses</th>
														<th>Expenses Tax</th>
														<th>Total Expenses</th> -->
													<th>Gross Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="15" style="text-align: right">Total:</th>
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

							<!--    Category Wise Purchase -->

							<div id="categoryWise" class="tab-pane">
								<div class="row">
									<div class="col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReport">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
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

												<div class="col-lg-2">
													<input type="button" id="btn45" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="categoryWisePurchaseReport()" value="Search"
														style="padding-bottom: 28px;" />
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierCategoryWise" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Voucher No</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
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
													<!-- <th>Total Discount(%)</th> -->
													<th>Barcode No</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="14" style="text-align: right">Total:</th>
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


							<!-- PRODUCT WISE PURCHASE REPORT -->


							<div id="productWise" class="tab-pane">
								<div class="row">
									<div class="col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReport">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
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


												<div class="col-lg-2 col-md-2">
													<input type="button" id="btn45" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="productWisePurchaseReport()" value="Search"
														style="padding-bottom: 28px;" />

												</div>
											</div>
										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="supplierProductWise" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Date</th>
													<th>Bill No</th>
													<th>Voucher No</th>
													<th>Supplier Name</th>
													<th>Category</th>
													<th>Sub Category</th>
													<th>Item Name</th>
													<th>HsnSac No</th>
													<th>Quantity</th>
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
													<!-- <th>Total Discount(%)</th> -->
													<th>Barcode No</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="14" style="text-align: right">Total:</th>
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

							<!----------------------------------- VOUCHER NUMBER WISE ------------------------------------->

							<div id="voucherWise" class="tab-pane ">
								<div class="row">
									<div class="col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="voucherNoWise">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

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


												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="VoucherNoWisePurchaseReport()" value="Search"
														style="padding-bottom: 28px;" />

												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="voucherNoWiseData" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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
													<!-- <th>Total Discount(%)</th>
														<th>Expenses</th>
														<th>Expenses Tax</th>
														<th>Total Expenses</th> -->
													<th>Gross Amount</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="14" style="text-align: right">Total:</th>
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

							<!------ 	Barcode No wise Purchase  ----->

							<div id="barcodeNoWise" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReport1">
										<div class="container">

											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
														<input type="text" id="barcodeNoOurchase" type="text"
															required> <label for="startDate">Enter
															Barcode No:<sup>*</sup>
														</label>
													</div>
												</div>

												<div class="col-md-2 col-lg-2 ">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="barcodeWisePurchaseReport()" value="Search"
														style="padding-bottom: 28px;" />

												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="barcodeWisePurchaseReport" class="display"
										style="border: 2px solid black; border-collapse: collapse;">
										<thead>
											<tr>
												<th>Sr No</th>
												<th>Date</th>
												<th>Bill No</th>
												<th>Voucher No</th>
												<th>Supplier Name</th>
												<th>Category</th>
												<th>Sub Category</th>
												<th>Item Name</th>
												<th>HsnSac No</th>
												<th>Quantity</th>
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
												<!-- <th>Total Discount(%)</th> -->
												<th>Barcode No</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th colspan="14" style="text-align: right">Total:</th>
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

							<!------ 	Single Date Purchase  ----->


							<div id="singleDatePurchase" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left: 10%;">
									<form class="form-horizontal" method="post" action=""
										name="supReport1">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="purDate" placeholder="Start Date"
														type="text"> <label for="startDate">Start
														Date<sup>*</sup>
													</label>
												</div>


												<div class="col-md-2 col-lg-2 ">
													<div class="input-group">
														<input type="button" id="btn" name="save"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right"
															onclick="singleDatePurchase45()" value="Search"
															style="padding-bottom: 28px;" />
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>

								<table
									class="table table-bordered table-striped table-condensed cf"
									id="singleDatePurchase50" class="display"
									style="border: 2px solid black; border-collapse: collapse;">
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
											<!--<th>Total Discount(%)</th>
													<th>Expenses</th>
													<th>Expenses Tax</th>
													<th>Total Expenses</th> -->
											<th>Gross Amount</th>
										</tr>
									</thead>
									<tfoot>
										<tr>
											<th colspan="15" style="text-align: right">Total:</th>
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

							<!------ 	Between Two Dates Purchase ----->

							<div id="twoDatePurchase" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left: 2%">
									<div class="container">
										<form class="form-horizontal" method="post" action=""
											name="supReport1">

											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="pFisDate" type="text"> <label
														for="startDate">From</label>
												</div>



												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="pEndDate" placeholder="End Date"
														type="text"> <label for="endDate">To</label>
												</div>




												<div class="col-md-2 col-lg-2 ">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="twoDatePurchase45()" value="Search"
														style="padding-bottom: 28px;" />
												</div>


											</div>
										</form>
									</div>

								</div>

								<div class="container">
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="twoDatePurchase50" class="display"
										style="border: 2px solid black; border-collapse: collapse;">
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
												<!-- <th>Total Discount(%)</th>
													<th>Expenses</th>
													<th>Expenses Tax</th>
													<th>Total Expenses</th> -->
												<th>Gross Amount</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th colspan="15" style="text-align: right">Total:</th>
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

							<!------ 	PAYMENT DUE DATE WISE Purchase ----->

							<div id="paymentDueDateWise" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="paymentDueDateWise">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="pddwFisDate" type="text"> <label
														for="pddwFisDate">From</label>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="pddwEndDate" placeholder="End Date"
														type="text"> <label for="pddwEndDate">To</label>
												</div>


												<div class="col-md-2 col-lg-2 ">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="paymentDueDateWiseFn()" value="Search"
														style="padding-bottom: 28px;" />

												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="paymentDueDateWiseTable" class="display"
										style="border: 2px solid black; border-collapse: collapse;">
										<thead>
											<tr>
												<th>Sr No</th>
												<th>Date</th>
												<th>Bill No</th>
												<th>Supplier Name</th>
												<th>Payment Due Date</th>
												<th>Voucher No</th>
												<th>Contact Person</th>
												<th>Category</th>
												<th>Sub Category</th>
												<th>Item Name</th>
												<th>HsnSac No</th>
												<th>Quantity</th>
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
												<!-- <th>Total Discount(%)</th>
													<th>Expenses</th>
													<th>Expenses Tax</th>
													<th>Total Expenses</th> -->
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

							<!--  purchase gst return report -->

							<div id="PurchasegstReturn" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="startDatepgst" type="text">
													<label for="startDate">From</label>
												</div>




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="lastDatepgst" type="text"> <label
														for="village">To</label>
												</div>



												<div class="col-lg-2 col-md-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="purchasegstReturn(); gstIgstReturnAmt()"
														value="Search" style="padding-bottom: 28px;" />
												</div>


											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="twoDateGstReturnPurchase" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

						</div>
					</div>


					<!---------- PURCHASE RETURN REPORT ------->

					<div class="tab-pane" id="purchaseReturn">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Purchase Return Reports</h2>
							</div>

							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab"
								href="#purchaseReturnSingleDate"><h4 style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#purchaseReturnRangeWise"><h4
										style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#purchaseReturnBillNoWise"><h4
										style="color: blue">Bill No Wise</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!--  Miscellaneos Sale for single date -->
							<div id="purchaseReturnSingleDate"
								class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>


								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="pRDate" type="text"> <label
														for="">From<sup>*</sup></label>
												</div>


												<div class="col-lg-2 col-md-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="purchaseReturnSingleDate()" value="Search"
														style="padding-bottom: 28px;" />
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="purchaseReturnSingleDateReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!---------- PURCHASE RETURN REPORT between Two dates ------->

							<div id="purchaseReturnRangeWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

													<input type="date" id="pRFisDate" type="text"> <label
														for="startDate">From</label>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<label for="endDate">To</label> <input type="date"
														id="pREndDate" type="text">
												</div>



												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="purchaseReturnTwoDate()" value="Search"
														style="padding-bottom: 28px;'" />

												</div>
											</div>
										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="purchaseReturnRangeReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-- Bill No wise PURCHASE RETURN REPORT ------->


							<div id="purchaseReturnBillNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">


											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

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
														<label for="supplierpR">Supplier Name</label>
													</div>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<select id='pRBillNo' name="pRBillNo">
													</select> <label for="pRBillNo">Bill No </label>
												</div>


												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="purchaseReturnBillNoWise()" value="Search"
														style="padding-bottom: 28px;" />

												</div>


											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="billNoWisePurRetReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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
						</div>
					</div>

					<!---------   Sell Reports--------->

					<div class="tab-pane" id="sell">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Sale Reports</h2>
							</div>
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab"
								href="#categorySaleWise"><h4 style="color: blue">Category
										wise</h4></a></li>
							<li><a data-toggle="tab" href="#productSaleWise"><h4
										style="color: blue">Product wise</h4></a></li>
							<li><a data-toggle="tab" href="#singleDateSale"><h4
										style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#twoDateSale"><h4
										style="color: blue" onclick="categoryWiseSaleGraph()">Range</h4></a></li>
							<li><a data-toggle="tab" href="#userWise"><h4
										style="color: blue">User Wise</h4></a></li>
							<li><a data-toggle="tab" href="#BillWise"><h4
										style="color: blue">Bill Wise</h4></a></li>
							<li><a data-toggle="tab" href="#caReturns"><h4
										style="color: blue">GST Return</h4></a></li>
							<li><a data-toggle="tab" href="#paymentModeWiseReport"><h4
										style="color: blue">
										Payment Mode<br>Wise
									</h4></a></li>
							<!-- <li><a data-toggle="tab" href="#paymentModeRangeWiseReport"><h4 style="color: blue">Payment Mode<br>Range Wise</h4></a></li> -->
						</ul>

						<div class="tab-content" style="float: left">

							<!-- 	CATEGORY Name wise -->

							<div id="categorySaleWise" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReportBill">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
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

												<div class="col-md-2 col-lg-2 col-xs-2 col-xl-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="categorySaleWise()" value="Search"
														style="padding-bottom: 28px;" />

												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="container-fluid">

									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleCategoryWise" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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




								<!-- CATEGORY WISE GOOGLE CHART  -->

								<div id="chart_div" style="width: 1100px; height: 750px;"></div>

								<!-- /CATEGORY WISE GOOGLE CHART  -->

							</div>

							<!-- PRODUCT WISE SALE REPORT -->


							<!-- 	Customer Name wise -->

							<div id="productSaleWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReportBill">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">


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


												<div class="col-md-2 col-lg-2 col-xs-2 col-xl-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="productSaleWise()" value="Search"
														style="padding-bottom: 31px;" />
												</div>

											</div>
										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleProductWise" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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





							<!--    for single date sale -->

							<div id="singleDateSale" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="fDate1" type="text"> <label
														for="">From<sup>*</sup></label>
												</div>

												<div class="col-md-2 col-lg-2 col-xs-2 col-xl-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="singleDateSaleReport()" value="Search"
														style="padding-bottom: 31px;" />

												</div>
											</div>
										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleSingleDate" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!------ 	Between Two Dates Sale  ----->

							<div id="twoDateSale" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="fisDate" type="text"> <label
														for="startDate">From</label>
												</div>

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="endDate" placeholder="End Date"
														type="text"> <label for="village">To</label>
												</div>

												<div class="col-lg-2 col-md-2 col-xl-2 col-xs-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="twoDateSaleReport();" value="Search"
														style="padding-bottom: 31px;" />
												</div>

											</div>
										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleTwoDate" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-- User Wise Report -->

							<div id="userWise" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">

										<div class="row">
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

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


											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
												<select id="userName123" name="userName123"></select> <label
													for="userName123">User Name</label>
											</div>


										</div>

										<div class="row">
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
												<input type="date" id="startDate" type="text"> <label
													for="startDate">From</label>
											</div>



											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
												<input type="date" id="lastDate" type="text"> <label
													for="village">To</label>
											</div>




										</div>
										<div class="row col-lg-offset-3">
											<div class="col-md-2 col-lg-2 col-xs-2 col-xl-2">

												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="twoDate_UserSaleReport()" value="Search"
													style="padding-bottom: 31px;" />

											</div>

										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleTwoDate_userWise" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-- Bill No Wise And Between Two Date Report -->

							<div id="BillWise" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="startDate1" type="text"> <label
														for="startDate">From</label>
												</div>



												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="lastDate1" type="text"> <label
														for="village">To</label>
												</div>

												<div class="col-lg-2 col-md-2 col-xs-2 col-xl-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="twoDateAndBillNo()" value="Search"
														style="padding-bottom: 31px;" />
												</div>



											</div>
										</div>
									</form>
								</div>




								<div class="container">

									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleTwoDateBillNo" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

								<div class="row" align="center" style="display: none"
									id="popUpReport">

									<h2 align="center">
										Bill No Details <input type="button" name="closeD" id="closeD"
											value="close" onclick="closePopUpReport()" />
									</h2>

									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="saleBillWise" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
											<thead>
												<tr>
													<th style="font-size: 12px">Sr No</th>
													<th style="font-size: 12px">Bill No</th>
													<th style="font-size: 12px">Barcode No</th>
													<th style="font-size: 12px">Item Name</th>
													<th style="font-size: 12px">Category</th>
													<th style="font-size: 12px">Sub Category</th>
													<th style="font-size: 12px">Quantity</th>
													<th style="font-size: 12px">Buy Price<br>Excl.
														Tax
													</th>
													<th style="font-size: 12px">Sale Price</th>
													<th style="font-size: 12px">GST<br>%
													</th>
													<th style="font-size: 12px">Sale Price<br>Without
														Tax
													</th>
													<th style="font-size: 12px">Discount<br>%
													</th>
													<th style="font-size: 12px">Discount<br>Amount
													</th>
													<th style="font-size: 12px">Tax Amount<br>After
														Discount
													</th>
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

							<!-- GST Return Reports  -->

							<div id="caReturns" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="startDategst" type="text"> <label
														for="startDate">From</label>
												</div>




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="lastDategst" type="text"> <label
														for="village">To</label>
												</div>



												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="gstReturn()" value="Search"
														style="padding-bottom: 31px;" />

												</div>

											</div>

										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="twoDateGstReturn" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-- payment Mode Wise Reports  -->

							<div id="paymentModeWiseReport" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">

										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="pmDate" type="text"> <label
														for="pmDate">From</label>
												</div>


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="pmDate22" type="text"> <label
														for="pmDate">To</label>
												</div>


											</div>

											<div class="row">


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<select id="paymentMode">
														<option value="cash">Cash</option>
														<option value="card">Card</option>
														<option value="cashAndCard">Cash And Card</option>
													</select> <label for="paymentMode">Payment Mode</label>
												</div>





												<div class="col-lg-2 col-md-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="paymentModeWiseReport()" value="Search"
														style="padding-bottom: 31px;" />
												</div>


											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="paymentModeWiseReportTable" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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
						</div>
					</div>

					<!----- 	Currnt Stock reports ------>

					<div class="tab-pane" id="stock">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Stock Reports</h2>
							</div>

							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab"
								href="#categoryWiseStock"><h4 style="color: blue">Category
										Wise Stock</h4></a></li>
							<li><a data-toggle="tab" href="#currentStock"
								onclick="currentStock()"><h4 style="color: blue">Current
										Stock</h4></a></li>
							<li><a data-toggle="tab" href="#barcodeNoWiseStock"><h4
										style="color: blue">Barcode Wise Stock</h4></a></li>
							<li><a data-toggle="tab" href="#allWayReport"
								onclick="allWayReport()"><h4 style="color: blue">All
										way Reports</h4></a></li>
						</ul>
						<div class="tab-content" style="float: left">

							<!--    for Current Stock -->
							<div id="currentStock" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row">
											<div class="table-responsive">
												<table
													class="table table-bordered table-striped table-condensed cf"
													id="currStock" class="display"
													style="border: 2px solid black; border-collapse: collapse;">
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

							<!-------- 	Category Wise Stock	 -------->

							<div id="categoryWiseStock" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">


												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

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
														<label>Category Name</label>
													</div>
												</div>


												<div class="col-md-2 col-lg-2 ">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="getCategoryWiseStock();" value="Search"
														style="padding-bottom: 31px;" />

												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<table id="catWiseStock"
										class="table table-bordered table-striped table-condensed cf"
										class="display"
										style="border: 2px solid black; border-collapse: collapse;">
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

							<!--    Barcode Wise Current Stock -->

							<div id="barcodeNoWiseStock" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>

								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
														<input type="text" id="barcode" type="text" required>
														<label for="">Barcode No<sup>*</sup></label>
													</div>
												</div>



												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="barcodewisestock()" value="Search"
														style="padding-bottom: 31px;" />

												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="row">
										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="barcodeWiseCurrentStock" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
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

							<!-- All way Reports -->

							<div id="allWayReport" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row">
											<div class="table table-responsive" style="overflow: hidden">


												<table
													class="table table-bordered table-striped table-condensed cf"
													id="currStock1" class="display"
													style="border: 2px solid black; border-collapse: collapse;">

													<thead style="background-color: orange;">
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
						</div>
					</div>

					<!---------- Miscellaneous Bill Reports ------->

					<div class="tab-pane" id="miscellaneous">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Sale Return Reports</h2>
							</div>

							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#SingleDate"><h4
										style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#miscellaneousTwoDate"><h4
										style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#miscellaneousCategoryWise"><h4
										style="color: blue">Category Wise</h4></a></li>
							<li><a data-toggle="tab" href="#miscellaneousBillNoWise"><h4
										style="color: blue">Bill No Wise</h4></a></li>
							<li><a data-toggle="tab" href="#miscellaneousBarcodeNoWise"><h4
										style="color: blue">Barcode No Wise</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!--  Miscellaneos Sale for single date -->
							<!-- <div id="miscellaneousSingleDate" class="tab-pane fade in active"> -->
							<div id="SingleDate" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="msDate" type="text"> <label
														for="">From<sup>*</sup></label>
												</div>



												<div class="col-md-2 col-lg-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="miscellaneousSingleDate()" value="Search"
														style="padding-bottom: 31px;" />
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="miscellaneousSingleDateReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-------Miscellaneos Sale between Two dates ------->

							<div id="miscellaneousTwoDate" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="msfisDate" type="text"> <label
														for="startDate">From</label>
												</div>





												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="msendDate" type="text"> <label
														for="endDate">To</label>
												</div>



												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="miscellaneousTwoDate()" value="Search"
														style="padding-bottom: 31px;" />

												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="miscellaneousTwoDateReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-- 	Category Name wise Miscellaneos Sale Reports -->

							<div id="miscellaneousCategoryWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

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

												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="miscellaneousSaleWiseCustomer()" value="Search"
														style="padding-bottom: 31px;" />

												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="table-responsive">
									<table
										class="table table-bordered table-striped table-condensed cf"
										id="miscellaneousSaleWiseCustomerReport" class="display"
										style="border: 2px solid black; border-collapse: collapse;">
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

							<!-- 	Bill No wise Miscellaneos Sale Reports -->

							<div id="miscellaneousBillNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
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

												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="billnowiseMiscellaneoussell()" value="Search"
														style="padding-bottom: 31px;" />

												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="billnowiseMiscellaneous" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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
													<!--<th></th>-->
												</tr>
											</tfoot>
										</table>
									</div>
								</div>


							</div>

							<!-- Barcode No wise Miscellaneos Sale Reports -->

							<div id="miscellaneousBarcodeNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">

										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

														<input type="text" id="barcodeMiscellaneous" type="text"
															required> <label for="">Barcode No<sup>*</sup></label>
													</div>

													<div class="col-md-2 col-lg-2">

														<input type="button" id="btn" name="save"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right"
															onclick="barcodenowiseMiscellaneoussell()" value="Search"
															style="padding-bottom: 31px;" />

													</div>
												</div>

											</div>
										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="barcodewiseMiscellaneous" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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


						</div>
					</div>

					<!---------- Credit Customer Bill Reports ------->

					<div class="tab-pane" id="credit">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Credit Customer Sale
									Reports</h2>
							</div>
							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab"
								href="#creditSingleDate"><h4 style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#creditTwoDate"><h4
										style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#creditCategoryWise"><h4
										style="color: blue">Category Wise</h4></a></li>
							<li><a data-toggle="tab" href="#creditProductWise"><h4
										style="color: blue">Product Wise</h4></a></li>
							<li><a data-toggle="tab" href="#creditBillNoWise"><h4
										style="color: blue">Bill No Wise</h4></a></li>
							<li><a data-toggle="tab" href="#creditBarcodeNoWise"><h4
										style="color: blue">Barcode No Wise</h4></a></li>
							<li><a data-toggle="tab" href="#paymentModeWiseReportForCC"><h4
										style="color: blue">Payment Mode Wise</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!--  Credit Customer Sale for single date -->

							<div id="creditSingleDate" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="csDate" type="text"> <label
														for="">From<sup>*</sup></label>
												</div>


												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="creditSingleDate()" value="Search"
														style="padding-bottom: 31px;" />

												</div>
											</div>
										</div>
									</form>
								</div>
								<div class="container">

									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="creditSingleDateReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-------Credit Customer Sale between Two dates ------->

							<div id="creditTwoDate" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="csfisDate" type="text"> <label
														for="startDate">From</label>
												</div>




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="csendDate" type="text"> <label
														for="endDate">To</label>
												</div>



												<div class="col-md-2 col-lg-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="creditTwoDate()" value="Search"
														style="padding-bottom: 31px;" />
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="container">

									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="creditTwoDateReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-- 	Category Name wise Credit Customer Sale Reports -->

							<div id="creditCategoryWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">

										<div class="row">
											<div class="invoice_label_up">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
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
													<label for="">select Category<sup>*</sup></label>
												</div>
											</div>


											<div class="col-md-2 col-lg-2">
												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="creditSaleWiseCustomer()" value="Search"
													style="padding-bottom: 31px;" />
											</div>

										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="creditSaleWiseCustomerReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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


							<!----------------------------------------- 	PAYMENT MODE WISE Credit Customer Sale Reports --------------------------------------------------->

							<div id="paymentModeWiseReportForCC" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:;">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">


												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="startDateForCC" type="text">
													<label for="startDateForCC">From</label>
												</div>




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="endDateForCC" type="text"> <label
														for="endDateForCC">To</label>
												</div>



											</div>

											<div class="row">




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<select id="paymentModeForCC">
														<option value="cash">Cash</option>
														<option value="card">Card</option>
														<option value="cashAndCard">Cash And Card</option>
													</select> <label for="paymentModeForCC">Payment Mode</label>
												</div>

												<div class="col-lg-2 col-md-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="paymentModeWiseReportForCC()" value="Search"
														style="padding-bottom: 28px;" />
												</div>


											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="paymentModeWiseReportTableForCC" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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



							<!----------------------------------------- 	PRODUCT Name wise Credit Customer Sale Reports --------------------------------------------------->

							<div id="creditProductWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

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

												<div class="col-md-2 col-lg-2 ">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="prtoductWiserCreditCustomerSaleReport()"
														value="Search" style="padding-bottom: 31px;" />

												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="creditSaleProductWiseReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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
							<!-- ==============================================- 	Bill No wise Credit Customer Sale Reports =============================================================-->

							<div id="creditBillNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

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
														<label for=""> Select BillNo<sup>*</sup></label>
													</div>
												</div>



												<div class="col-lg-2 col-md-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="billnowiseCreditsell()" value="Search"
														style="padding-bottom: 31px;" />
												</div>

											</div>
										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="billnowiseCredit" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!------------------------------------------------------ Barcode No wise Credit Customer Sale Reports -------------------------------------------------------------->

							<div id="creditBarcodeNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">

														<input type="text" id="barcodeCredit" type="text" required>
														<label for=""> Barcode No:<sup>*</sup>
														</label>
													</div>
												</div>



												<div class="col-md-2 col-lg-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="barcodenowiseCredit()" value="Search"
														style="padding-bottom: 31px;" />
												</div>



											</div>
										</div>
									</form>
								</div>
								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="barcodewiseCredit" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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


							<!----------------------------------------------------------------- payment Mode Wise Reports FOR CC ------------------------------------------------------>



							<div id="paymentModeWiseReportForCC" class="tab-pane fade">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<form class="form-horizontal" method="post" action="">
									<fieldset>
										<div class="row form-group">
											<label class="col-md-2 control-label" for="pmDateForCC">
												Start Date:</label>
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
												End Date:</label>
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


										<div class="table-responsive">
											<table
												class="table table-bordered table-striped table-condensed cf"
												id="paymentModeWiseReportTable" class="display"
												style="border: 2px solid black; border-collapse: collapse;">
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
									</fieldset>
								</form>
							</div>









						</div>
					</div>


					<!--  Credit Customer Sale Return Report -->

					<div class="tab-pane" id="creditSaleReturn">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">Credit Customer Sale
									Return Reports</h2>
							</div>

							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>
						</div>

						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab"
								href="#SingleDateCCSR"><h4 style="color: blue">Datewise</h4></a></li>
							<li><a data-toggle="tab" href="#CCSRTwoDate"><h4
										style="color: blue">Range</h4></a></li>
							<li><a data-toggle="tab" href="#CCSRCategoryWise"><h4
										style="color: blue">Category Wise</h4></a></li>
							<li><a data-toggle="tab" href="#CCSRBillNoWise"><h4
										style="color: blue">Bill No Wise</h4></a></li>
							<li><a data-toggle="tab" href="#CCSRBarcodeNoWise"><h4
										style="color: blue">Barcode No Wise</h4></a></li>
						</ul>

						<div class="tab-content" style="float: left">

							<!--  Credit customer Sale Return Report for single date -->

							<div id="SingleDateCCSR" class="tab-pane fade in active">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="crdDate" type="text"> <label
														for=""> From<sup>*</sup></label>
												</div>


												<div class="col-md-2 col-lg-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="CSRSingleDate()" value="Search"
														style="padding-bottom: 31px;" />
												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="CSR1SingleDateReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-------Credit customer Sale Return Report between Two dates ------->

							<div id="CCSRTwoDate" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="csrfisDate" type="text"> <label
														for="startDate">From</label>
												</div>



												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
													<input type="date" id="csrendDate" type="text"> <label
														for="endDate">To</label>
												</div>

												<div class="col-md-2 col-lg-2">
													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="CSRTwoDate()" value="Search"
														style="padding-bottom: 31px;" />
												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="CSR2TwoDateReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">

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

							<!-- 	Category Name wise Credit customer Sale return Reports -->

							<div id="CCSRCategoryWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
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

												<div class="col-md-2 col-lg-2 ">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="CSRSaleWiseCustomer()" value="Search"
														style="padding-bottom: 31px;" />

												</div>
											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="CSR3SaleWiseCustomerReport" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-- 	Bill No wise Credit customer Sale Return Reports -->

							<div id="CCSRBillNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">

										<div class="row">
											<div class="invoice_label_up">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
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

											<div class="col-md-2 col-lg-2 ">

												<input type="button" id="btn" name="save"
													class="btn btn-lg btn-success btn-md button_hw button_margin_right"
													onclick="billnowiseCCSR()" value="Search"
													style="padding-bottom: 31px;" />

											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="billnowiseCCSR" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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

							<!-- Barcode No wise Credot Customer Sale Return Reports -->

							<div id="CCSRBarcodeNoWise" class="tab-pane">
								<div class="row">
									<div class="col-sm-offset-1 col-md-10">
										<hr style="border-top-color: #c1b1b1;">
									</div>
								</div>
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action="">
										<div class="container">
											<div class="row">

												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
														<input type="text" id="barcodecsr" type="text" required>
														<label for="">Barcode No:<sup>*</sup></label>
													</div>
												</div>


												<div class="col-md-2 col-lg-2">

													<input type="button" id="btn" name="save"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right"
														onclick="barcodenowiseCSR()" value="Search"
														style="padding-bottom: 31px;" />

												</div>

											</div>
										</div>
									</form>
								</div>

								<div class="container">
									<div class="table-responsive">
										<table
											class="table table-bordered table-striped table-condensed cf"
											id="barcodewiseCCSR" class="display"
											style="border: 2px solid black; border-collapse: collapse;">
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
						</div>
					</div>

					<div class="tab-pane" id="allGraphsReports" align="left">
						<div class="row">
							<div align="center">
								<h2 class="form-name style_heading">All Graph Reports</h2>
							</div>

							<div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div>

							<ul class="nav nav-tabs">
								<li class="active"><a data-toggle="tab"
									href="#graphReports"><h4 style="color: blue">All Graph</h4></a></li>
								<li><a data-toggle="tab" href="#rangeWiseAllGraphReport"><h4
											style="color: blue">Range Wise</h4></a></li>
								<li><a data-toggle="tab"
									href="#supplierWiseAllGraphReports"><h4 style="color: blue">Supplier
											Wise</h4></a></li>
								<li><a data-toggle="tab"
									href="#subcategoryWiseAllGraphReports"><h4
											style="color: blue">Sub Category Wise</h4></a></li>
							</ul>

							<div class="tab-content" style="float: left">

								<!----------------------------------------------------- ALL GRAPH ------------------------------------------------------>
								<div id="graphReports"
									class="tab-pane fade in active col-md-offset-1">

									<div>
										<h2 class="form-name style_heading" align="center">Sale
											Graph</h2>
										<div class="col-sm-offset-1 col-md-10">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>

									<div class="container-fluid">
										<div class="row">
											<div class="col-md-6 col-lg-6">
												<div id="categoryWiseSaleGraph"
													style="width: 400px; height: 400px; margin: 0 auto;">
													<div class="table-responsive">
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

											<div class="col-md-6 col-lg-6">
												<div id="todaysCategoryWiseSaleGraph"
													style="width: 400px; height: 400px; margin: 0 auto">
													<div class="table-responsive">
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

											<div class="col-md-6 col-lg-6">
												<div id="supplierWiseTotalSaleGraph"
													style="width: 400px; height: 400px; margin: 0 auto">
													<div class="table-responsive">
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

											<div class="col-md-6 col-lg-6">
												<div id="subCategoryWiseTotalSaleGraph"
													style="width: 400px; height: 400px; margin: 0 auto">
													<div class="table-responsive">
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


									<div class="container-fluid">
										<div class="row" style="margin-top: 10px;">

											<div>
												<div class="col-sm-offset-1 col-md-10">
													<hr style="border-top-color: #c1b1b1;">
												</div>
												<h2 class="form-name style_heading" align="center">Purchase
													Graph</h2>
												<div class="col-sm-offset-1 col-md-10">
													<hr style="border-top-color: #c1b1b1;">
												</div>
											</div>

											<div class="col-md-6 col-lg-6">
												<div id="categoryWisePurchaseGraph"
													style="width: 400px; height:; margin: 0 auto">
													<div class="table-responsive">
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

											<div class="col-md-6 col-lg-6">
												<div id="todaysCategoryWisePurchaseGraph"
													style="width: 400px; height: 400px; margin: 0 auto">
													<div class="table-responsive">
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


											<div class="col-md-6 col-lg-6">
												<div id="supplierWiseTotalPurchaseGraph"
													style="width: 400px; height: 400px; margin: 0 auto">
													<div class="table-responsive">
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

											<div class="col-md-6 col-lg-6">
												<div id="subCategoryWiseTotalPurchaseGraph"
													style="width: 400px; height: 400px; margin: 0 auto">
													<div class="table-responsive">
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


									<div class="container-fluid">
										<div class="row" style="margin-top: 29px;">


											<div class="col-md-6 col-lg-6">

												<div id="pie_categoryWiseSaleGraph"
													style="width: 400px; height: 400px; margin: 0 auto;"
													hidden="true">
													<div class="table-responsive">
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

								<!--------------------------------------------------------------------------- /ALL GRAPH ------------------------------------------------------>

								<!---------------------------------------------------------------- RANGE WISE GRAPH ----------------------------------------------------------------------->

								<div id="rangeWiseAllGraphReport" class="tab-pane">
									<div class="row">
										<div class="col-sm-offset-1 col-md-10">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>
									<div class="miscellaneous" style="left:">
										<form class="form-horizontal" method="post" action="">
											<div class="container">
												<div class="row">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
														<input type="date" id="startDateRangeGraph" type="text">
														<label for="startDateRangeGraph">From</label>
													</div>



													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
														<input type="date" id="endDateRangeGraph" type="text">
														<label for="endDateRangeGraph">To</label>
													</div>

													<div class="col-md-2 col-lg-2">
														<input type="button" id="btn" name="save"
															class="btn btn-lg btn-success btn-md button_hw button_margin_right"
															onclick="rangeWiseSaleGraph(); rangeWisePurchaseGraph();"
															value="Search" style="padding-bottom: 31px;" />
													</div>
												</div>
											</div>
										</form>
									</div>

									<div class="container-fluid">
										<div class="row">
											<div class="col-md-6 col-lg-6">

												<div>
													<h2 class="form-name style_heading" align="center">Sale
														Graph</h2>
													<div class="col-sm-offset-1 col-md-10">
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
													<div class="col-sm-offset-1 col-md-10">
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

								<!----------------------------------------------------------- /CATEGORY WISE GRAPH --------------------------------------------------------->

								<!----------------------------------------------------------- /SUPPLIER RANGE GRAPH --------------------------------------------------------->

								<div id="supplierWiseAllGraphReports" class="tab-pane">
									<div class="row">
										<div class="col-sm-offset-1 col-md-10">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>
								
										<div class="miscellaneous" style="left: 10%;">
											<form class="form-horizontal" method="post" action=""
												name="supReportBill">
												<div class="container">
													<div class="row">
														
														

															<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
														
																<div>
																	<input type="date" id="startDateSuppGraph" type="text">
																	<label for="startDateSuppGraph">From</label>
																</div>

															</div>
															
																<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
																<div>
																	<input type="date" id="endDateSuppGraph" type="text">
																	<label for="endDateSuppGraph">To</label>
																</div>
																</div>
															
                                                        </div>
                                                   	<div class="row">
                                                        <div class="invoice_label_up">
															<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
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
																<label for="supplierSpGraph">Supplier Name</label>
															</div>
														</div>


														<div class="col-lg-2">
															<input type="button" id="btn" name="save"
																class="btn btn-lg btn-success btn-md button_hw button_margin_right"
																onclick="supplierWiseSaleGraph(); supplierWisePurchaseGraph();"
																value="Search" style="padding-bottom: 28px;" />
														</div>

													
												</div>
												</div>
											</form>
										</div>
									


									<div class="container-fluid">
										<div class="row">
											<div class="col-md-6 col-lg-6">

												<div>
													<h2 class="form-name style_heading" align="center">Sale
														Graph</h2>
													<div class="col-sm-offset-1 col-md-10">
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

											<div class="col-md-6 col-lg-6">

												<div>
													<h2 class="form-name style_heading" align="center">Purchase	Graph</h2>
													<div class="col-sm-offset-1 col-md-10">
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

								<!----------------------------------------------------------- /SUPPLIER RANGE GRAPH --------------------------------------------------------->



								<!----------------------------------------------------------- SUB CATEGORY RANGE GRAPH --------------------------------------------------------->

								<div id="subcategoryWiseAllGraphReports" class="tab-pane">
									<div class="row">
										<div class="col-sm-offset-1 col-md-10">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>
									
										<div class="miscellaneous" style="left: 10%;">
											<form class="form-horizontal" method="post" action=""
												name="supReportBill">
												<div class="container">
													<div class="row">
														
														

															<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
															
																<div>
																	<input type="date" id="startDateSubCatGraph" type="text">
																	<label for="startDateSubCatGraph">From</label>
																</div>
															</div>

																<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
																<div>
																	<input type="date" id="endDateSubCatGraph" type="text">
																	<label for="endDateSubCatGraph">To</label>
																</div>
																</div>
																</div>
															<div class="row">
                                         <div class="invoice_label_up">
															<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
																<%
																	CategoryDao catD = new CategoryDao() ;
																	List SubCGraph = catD.getAllMainSubCategoryForGraph();
																%>
																<input list="subCatdropSpGraph" id="subCatSpGraph"
																	required>
																<datalist id="subCatdropSpGraph">
																	<%
																		for (int i = 0; i < SubCGraph.size(); i++)
																		{
																			allSubCategories subCatlist = (allSubCategories) SubCGraph.get(i);
																	%>
																	<option data-value="<%=subCatlist.getPkSubcatId()%>" value="<%=subCatlist.getSubcatName()%>">
																	<%
																		}
																	%>
																	
																</datalist>
																<label for="subCatdropSpGraph">Sub Category</label>
															</div>
														</div>


														<div class="col-lg-2">
															<input type="button" id="btn" name="save"
																class="btn btn-lg btn-success btn-md button_hw button_margin_right"
																onclick="subCatRangeWiseSaleGraph(); subCatRangeWisePurchaseGraph();"
																value="Search" style="padding-bottom: 28px;" />
														</div>

												
												</div>
												</div>
											</form>
										</div>
									


									<div class="container-fluid">
										<div class="row">
											<div class="col-md-6 col-lg-6">

												<div>
													<h2 class="form-name style_heading" align="center">Sale
														Graph</h2>
													<div class="col-sm-offset-1 col-md-10">
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

											<div class="col-md-6 col-lg-6">

												<div>
													<h2 class="form-name style_heading" align="center">Purchase
														Graph</h2>
													<div class="col-sm-offset-1 col-md-10">
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

								<!----------------------------------------------------------- /SUB CATEGORY RANGE GRAPH --------------------------------------------------------->


                       </div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- </div>
		</div> -->

		<div class="row footer_margin_top" align="center"><%@include
				file="y_commons/footer.jsp"%></div>
</body>