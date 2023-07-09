<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
<script src="/SMT/staticContent/js/currentStock.js"></script>


<!-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap4.min.css">
<script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script> -->
<!-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/fixedheader/3.1.9/css/fixedHeader.bootstrap.min.css"> -->
<!-- <script src="https://cdn.datatables.net/fixedheader/3.1.9/js/dataTables.fixedHeader.min.js"></script> -->
<!-- <script src="https://cdn.datatables.net/responsive/2.2.9/js/responsive.bootstrap4.min.js"></script> -->
<!-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/dataTables.bootstrap4.min.css"> -->

<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script>
	$(document).ready(function()
	{
		currentStock();
	}); 	
</script>
<head>
<style>
#billheading {
	/* padding-top: 42px !important; 
	position: absolute !important; 
	width: auto !important; */
}
#currStock {
	border: none; 
	border-collapse: collapse !important;
}
.dataTables_scrollBody {
    background: #fff;
}
.table-responsive {
    margin-bottom: 20px;
}
#date {
    padding-top: 15px;
}
#allwayreporth2 {
    margin-top: 0px;
}
</style>
</head>
<body id="dt_example" class="vColor">
	<div class="container-fluid">
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

			<div align="center"  id="allwayreporth2">
				<h2 class="form-name style_heading">Live Inventory</h2>
			</div>
		</div>
		

		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<div class="">
		<div class="" align="center">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-condensed cf" id="currStock" class="display">
					<thead>
						<tr>
							<th>Category Name</th>
							<th>Sub Category Name</th>
							<th>Item Name</th>
							<th>Barcode</th>
							<th>RollSize</th>
							<th>Quantity</th>
							<th>Return<br>Qauntity</th>
							<th>Qty (MTR)</th>							
							<th>Sale Price</th>
							<th>Total</th>
							<th>Age(Days)</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th colspan="4" style="text-align: right">Total:</th>
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
		<%-- <div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div> --%>
	
	<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
</body>
</html>