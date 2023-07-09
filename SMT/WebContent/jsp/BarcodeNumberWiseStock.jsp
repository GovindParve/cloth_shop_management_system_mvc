<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
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
<script src="/SMT/staticContent/js/allReport.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script>
	$(document).ready(function() {
		getCurrentStockBarcodeNumberWise();
	});
</script>
<head>
<style>
#billheading {
	/* padding-top: 3% !important; 
	position: absolute !important; 
	width: auto !important; */
}
#currStock1 {
	border: none; 
	border-collapse: collapse !important;
}
.table-responsive {
	overflow: hidden !important; 
	width: 95% !important; 
	/* margin-left: 7px !important; */
}
input[type="text"] {
    outline: none;
    color: #000 !important;
    padding: 5px 0;
    border-radius: 22px !important;
    outline: none;
    border: none;
    padding-left: 10px;
    /* width: 200px; */
}
table.table.table-bordered.table-striped.table-condensed.cf.no-footer.dataTable {
    border: none;
}
#date {
    padding-top: 15px;
}
#allwayreporth2 {
    margin-top: 0px;
}

@media screen and (max-width: 480px) {
.table-responsive {
    width: 90% !important;
}
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
							document.getElementById("demo").innerHTML = date
									.toDateString();
						</script>
					</div>
				</div>
			</div>

			<div align="center" id="allwayreporth2">
				<h2 class="form-name style_heading">Barcode Number Wise Current Stock</h2>
			</div>
		</div>


		<div id="allWayReport" class="tab-pane">
			<div class="row">
				<div class="col-md-12" align="center">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
			<form class="form-horizontal" method="post" action=""
				name="allWayReportForm" id="allWayReportForm">
				<fieldset>
					<div class="row" align="center">
						<div class="table table-responsive">
							<table
								class="table table-bordered table-striped table-condensed cf display" id="currStock1" style="border-collapse: collapse;">

								<thead>
									<tr>
										<th>Item Name</th>
										<th>Category</th>
										<th>Barcode Number</th>
										<!-- <th>Size</th>
										<th>Color </th> -->
										<th>Quantity</th>
										<th>Buy Price</th>
										<th>Total Buy Price</th>
										<th>Sale Price</th>
										<th>Total Sale Price</th>
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
						</tr>
					</tfoot>
					</table>
				</div>
			</div>
				</fieldset>
			</form>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>