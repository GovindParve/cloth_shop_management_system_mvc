<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/js/bootbox.min.js"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script src="/SMT/staticContent/js/currentStock.js"></script>
<body class="stock_form_img vColor">
	<div class="container-fluid">
		<div class="row">
			<div class="form-group" align="left">
				<div class=" col-md-3 control-label" id="billheading"
					style="padding-top: 6px; position: absolute; width: auto;">
				</div>
			</div>

			<div align="center" id="categorydetailsh2">
				<h2 class="form-name style_heading">Agewise Inventory</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>


		<div class="miscellaneous" style="left:;">
		<div class="container" id="custdetal" style="margin-bottom: 0;">
				<div class="row">

					<div class="invoice_label_up ">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="invoicebaseinvent">
							<%
								CategoryHelper helper = new CategoryHelper();
								List mainCategoryList = helper.getAllMainCategoriesShopWise(request, response);
							%>
							<input list="catId_drop" id="catId"
								onchange="getCategoryWiseItemName()" required>
							<datalist id="catId_drop">
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
					<!-- <div class="col-md-1"></div> -->


					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
						id="invoicebaseinvent">
						<select id='itemId' name="itemId"></select> <label>Item
							Name</label>
					</div>

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