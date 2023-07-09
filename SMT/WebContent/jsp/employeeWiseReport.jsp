<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>
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
<script src="/SMT/staticContent/shree/buttons.html5.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">	
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">	
	
<script src="/SMT/staticContent/js/report.js"></script>
<head>
<style>
.btnwidth {
	padding-bottom: 32px !important;
}
#example4 {
	border: none; 
	border-collapse: collapse !important;
}
.table-responsive {
    width: 95%;
    margin-bottom: 10%;
}

@media screen and (max-width: 480px) {
.table-responsive {
    width: 90%;
    margin-bottom: 10%;
}
}
</style>
</head>
<body class="vColor">
	<div class="container" id="reportheight">
		<div class="row">
			<div align="center" id="prolossheading">
				<h2 class="form-name style_heading">Employee Report</h2>
			</div>
			<div class="row">
				<div class="col-md-12" align="center">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
		</div>
		 <div class="miscellaneous">	
		<form class="form-horizontal" method="post" action="" name="fertiBill">
			<!-- <div class=""> -->
				<div class="row">
				
					<div class="invoice_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="profitreport">	
				
				
							<%
							EmployeeDetailsDao sdd88 = new EmployeeDetailsDao();
           						List sList88 =sdd88.getAllMainEmployeeForEmpReport();
							%>
							<input list="sup_drop7" id="supplier7" required>
							<datalist id="sup_drop7">
								<%
					           for(int i=0;i<sList88.size();i++){
					        	   EmployeeDetailsBean sup88 =(EmployeeDetailsBean)sList88.get(i);
							%>
								<option data-value="<%=sup88.getEmpId()%>" value="<%=sup88.getFirstName() %> <%=sup88.getLastName() %>">
									<%
				      			}
				    		%>
								
							</datalist>
							<label  for="supplier">Employee Name<sup style="color: red;">*</sup></label>
							</div>
							</div>
						
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="profitreport">	
					<input type="date" id="firstDate" placeholder="Start Date" type="text">
					<label for=""> From<sup>*</sup></label>
				</div>
				
				</div>
					
				
				<div class="row">	
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="profitreport">	
				<input type="date" id="secondDate" placeholder="End Date" type="text">
				<label for="">To<sup>*</sup></label>
				</div>
					
				
				
					<!-- <div class="col-md-2" id="btnsub"> -->
					<div id="btnrow" align="center">
						<div class="invoice_button">
						<input type="button" id="btn" name="save" onclick="employeeNameWiseAndBetweenTwoDates()" value="Search" 
							class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
					</div>
					</div>
				      <!-- </div> -->
			      	
			      <!-- </div> -->
			      </div>
			      
				</form>
			</div>	
			</div>
				
				<div class="container-fluid">
				<div class="row" align="center">
				<div class="table-responsive">
					<table class="table table-bordered table-striped table-condensed cf display" id="example4">
						<thead>
							<tr>
								<th>Sr No</th>
								<th>Sale Date</th>
								<th>Employee Name</th>
								<th>Bill No</th>
								<th>Barcode No</th>
								<th>Category Name</th>
								<th>Item Name</th>
								<th>Quantity</th>
								<th>Sale Price</th>
								<th>Total Amount</th>
								<!-- <th>Discount</th>
								<th>Gross Amount</th> -->
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th colspan="8" style="text-align: right">Total:</th>
								<th></th>
								<th></th>
								<!-- <th></th>
								<th></th> -->
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
			</div>
		
	<!-- dfsdfsdf -->
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	
</body>
</html>