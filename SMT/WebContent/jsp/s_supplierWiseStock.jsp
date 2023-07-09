<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>

<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">

<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">

<script src="/SMT/staticContent/y_js/newReport.js"></script>
<head>
<style>
#billheading {
	padding-top: 6px !important; 
	position: absolute !important; 
	width: auto !important;
}
#example {
	border: none; 
	border-collapse: collapse !important;
}
.btnwidth {
	padding-bottom: 30px !important; 
	width: 130px !important;
}
.dataTables_scrollBody {
    height: 300px !important;
}
.dataTables_scrollHeadInner {
    width: 100% !important;
}
.dataTables_scrollFootInner {
    width: 100% !important;
}
.table-responsive {
    width: 97%;
}
@media screen and (max-width: 767px) {
.table-responsive {
    width: 95%;
}
}
</style>
</head>
<body class="account_form_img vColor">
	<div class="container-fluid">
		<div class="row">
			<div class="form-group" align="">
				<div class="control-label" id="billheading">
				</div>
			</div>

			<div align="center" id="categorydetailsh2">
				<h2 class="form-name style_heading">Supplier Based Inventory</h2>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		
		<div class="container">
		<div class="miscellaneous" style="left: 0%;">

			<form action="goodsReturn" method="post" class="form-horizontal">
				<div class="" id="custdetal" style="margin-bottom: 0;">
					<div class="row">
						<div class="invoice_label_up ">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="dayreport">

								<%
									SupplierDetailHelper suppHelper = new SupplierDetailHelper();
									List suppList = suppHelper.getAllSuppliers();
								%>

								<input list="fkSupplierId_drop" id="key" required>
								<datalist id="fkSupplierId_drop">
									<%
										for (int i = 0; i < suppList.size(); i++) {
											SupplierDetail supplier = (SupplierDetail) suppList.get(i);
									%>
									<option data-value="<%=supplier.getSupplierId()%>"
										value="<%=supplier.getSupplierName()%>">
										<%
											}
										%>
									
								</datalist>
								<label>Supplier Name:<sup>*</sup></label>
							</div>
						</div>
						<div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">
							<input type="Date" id="fDate"> <label>Start Date:<sup>*</sup></label>
						</div>



					</div>

					<div class="row">


						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">
							<input type="Date" id="eDate"> <label>End Date:<sup>*</sup></label>
						</div>
						</div>
						<!-- <div class="col-md-1"></div> -->
						<!-- <div class="invoice_button_allPaymentWithLeftTabs">	 -->
						<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport" align="left"> -->
							
						<div id="btnrow">	
						<div class="invoice_button">	
							<input type="button" class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
								name="btn" value="Search" onclick="valSupplierWiseStockBetweenTwoDate();" />
						</div>
						</div>
						<!-- </div> -->
						<!-- </div> -->
					<!-- </div> -->
				</div>
			</form>
		</div>
		</div>
		<br>

		<div class="row" align="center">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-condensed cf display" id="example">
					<thead>
						<tr>
							<th>Barcode No</th>
							<th>Category Name</th>
							<th>Item Name</th>
							<th>Purchased<br>Quantity
							</th>
							<th>Sold Quantity</th>
							<th>Return<br>Quantity
							</th>
							<th>Available<br>Quantity
							</th>
							<th>Buy Price</th>
							<th>Available Qty<br>Total<br>Buy Price
							</th>
							<th>Sale Price</th>
							<th>Available Qty<br>Total<br>Sale Price
							</th>
							<th>Tax Percentage</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th colspan="3" style="text-align: right">Total:</th>
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
				</table>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>
