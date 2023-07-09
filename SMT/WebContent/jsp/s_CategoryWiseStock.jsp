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
<head>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js" type="text/javascript"></script>
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
	
<script src="/SMT/staticContent/js/currentStock.js"></script>

<style>
#billheading {
	/* padding-top: 6px !important; 
	position: absolute !important; 
	width: auto !important; */
}
#example {
	border: none; 
	border-collapse: collapse !important;
}
.table-responsive {
	width: 95% !important;
	border: none !important;
}
.btnwidth {
	padding-bottom: 30px !important; 
	width: 130px !important;
}
#example {
    width: 100% !important;
}
#date {
    padding-top: 15px;
}
#categorydetailsh2 {
    margin-top: 0px;
}

@media screen and (max-width: 767px) {
#categorybaseinvent {
    width: 70%;
    margin-left: 15%;
}
}

@media screen and (max-width: 480px) {
button.dt-button, div.dt-button, a.dt-button {
    margin-bottom: 10px;
}
#categorybaseinvent {
    width: 90% !important;
    margin-left: 5% !important;
}
.dataTables_wrapper .dataTables_filter input {
    width: 75%;
}
}
</style>
</head>
<body class="stock_form_img vColor">
	<div class="container">
		<div class="row">
			<div class="form-group" align="left">
			<div class="control-label" id="billheading">
					<div id="date">
						<label id="demo"></label>
						<script>
							   var date = new Date();
							   document.getElementById("demo").innerHTML = date.toDateString();
							</script>
					</div>
				</div>			
		</div>

			<div align="center"  id="categorydetailsh2">
				<h2 class="form-name style_heading">Category Based Inventory</h2>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		
		
	<div class="miscellaneous" style="left: 0%;">		
		<div class="row">
		<div class="container">
		<div class="row">
		<div class="invoice_label_up ">
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="categorybaseinvent">
			<%
					CategoryHelper helper = new CategoryHelper();
					List mainCategoryList = helper.getAllMainCategoriesShopWise(request, response);
				%>
				
				
						 <input list="catId_drop" id="catId" required>
						<datalist id="catId_drop">
							<%
								for (int i = 0; i < mainCategoryList.size(); i++) {
									Category category = (Category) mainCategoryList.get(i);
							%>
							<option data-value="<%=category.getPkCategoryId()%>" value="<%=category.getCategoryName()%>">
								<%
									}
								%>
							
						</datalist>
							<label>Category Name<sup>*</sup></label>
					</div>
				</div>
				</div>
					<div class="invoice_button_categorybasedinventory">	
								<div class="row" id="btnrow">
								<div class="invoice_button">
								<!-- <div class="col-lg-2"> -->
				<input type="button" value="Search" id="btn" onclick="getCategoryWiseStock();"
				class="btn btn-lg btn-success btnwidth" />
				</div>
			<!-- </div> -->
			</div>
			</div>
		
			</div>
		</div>		
		
			
		</div>

		
<!-- 		<br> <br> <br> <br>
 -->
		<div class="row" align="center">
			<div class="table table-responsive">
				<table id="example" class="table table-bordered table-striped table-condensed cf display">					
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
		
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>