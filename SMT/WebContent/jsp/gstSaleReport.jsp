<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"
	type="text/javascript"></script>
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
	
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">		
	
<script src="/SMT/staticContent/js/report.js"></script>
<body class="vColor">
	<div class="container-fluid">
		<div class="row">
			<div align="center" style="margin-top: 75px">
				<h2 class="form-name style_heading">Gst Wise Sale Reports</h2>
			</div>
			<div class="row">
				<div class="col-sm-offset-1 col-md-10">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
		</div>


 <div class="miscellaneous" style="left: 10%;">	
		<form class="form-horizontal" method="post" action="" name="fertiBill">
		     <div class="container">
				<div class="row">
					  <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">	
					 <input type="date" id="firstDate" placeholder="Start Date" type="text">
					 <label> Start Sale Date<sup>*</sup></label>
					</div>
					

					 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">	
					<input type="date" id="secondDate" placeholder="End Date" type="text">
					<label>End Sale Date:<sup>*</sup></label>
					</div>
					
					
					
				<div class="col-lg-2">		
			<input type="button" id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw" onclick="gstsaleReportBetweenTwoDates()" value="Search" style="padding-bottom: 35px;" />
					</div>
				</div>
            </div>
		</form>
</div>
				<div class="table-responsive" style="margin-left: 31px;">
					<table
						class="table table-bordered table-striped table-condensed cf"
						id="example4" class="display"
						style="border: 2px solid black; border-collapse: collapse;">
						<thead>
							<tr>
								<th>Sr No</th>
								<th>Date</th>
								<th>Bill No</th>
								<th>Item Name</th>
								<th>HSN Code</th>
								<th>Item Rate</th>
								<th>Quantity</th>
								<th>Amount</th>
								<th>GST %</th>
								<th>IGST %</th>
								<!-- <th>IGST 5% Amount</th>
								<th>IGST 12% Amount</th>
								<th>IGST 18% Amount</th>
								<th>IGST 28% Amount</th> -->
								<th>Total Tax Amount</th>
								<th>Discount<br>Amount</th>
								<th>Total Amount</th>
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
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>