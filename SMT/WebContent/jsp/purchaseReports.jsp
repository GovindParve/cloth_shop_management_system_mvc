<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
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
	
<!-- 	<link href="/SMT/staticContent/css/fields.css"
	rel="stylesheet" type="text/css" media="all"> -->
	
<script data-main="scripts/main" src="/SMT/staticContent/js/r.js"></script>
<script src="/SMT/staticContent/js/report.js"></script>
<body style="height: 863px;" class="vColor">
	<div class="container-fluid">
		<div class="row">
			<div align="center" style="margin-top: 75px">
				<h2 class="form-name style_heading">GST Wise Purchase Reports</h2>
			</div>
			<div class="row">
				<div class="col-sm-offset-1 col-md-10">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
		</div>
		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home"><h4 style="color: blue">Single Date</h4></a></li>
			<li><a data-toggle="tab" href="#twoDates"><h4 style="color: blue">Between Two Dates</h4></a></li>
			<li><a data-toggle="tab" href="#suppGstReportBetweenTwoDates"><h4 style="color: blue">Supplier Wise</h4></a></li>
			<!-- <li><a data-toggle="tab" href="#caReports"><h4	style="color: blue">CA Report</h4></a></li> -->
		</ul>

		<div class="tab-content" style="float: left">
			<!-------- Single Date ---------->
			<div id="home" class="tab-pane fade in active">
				<div class="row"></div>
				 <div class="miscellaneous" style="left: 19%;">	
				<form class="form-horizontal" method="post" action="" name="abc">
				<div class="container">
						<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">	
						<input type="date" id="fDate" type="text">
							<label for=""> Enter Date:<sup>*</sup></label>
						</div>
				
						
					<div class="col-lg-2">			
			<input type="button" id="btn" name="save" class="btn btn-lg btn-success btn-md" onclick="return singleDatePurchase();" value="Search" style="padding-bottom: 35px;"/>
				    </div>				
					</div>		
						</div>
						
					</form>	
				</div>		
					<fieldset>

						<div class="table-responsive">
							<table
								class="table table-bordered table-striped table-condensed cf"
								id="example" class="display"
								style="border: 2px solid black; border-collapse: collapse;">
								<thead>
									<tr>
										<th>Sr No</th>
										<th>Date</th>
										<th>Supplier Name</th>
										<th>Bill No</th>
										<th>Item Name</th>
										<th>HSN/SAC No</th>
										<th>Item Rate</th>
										<th>Quantity</th>
										<th>Roll Size</th>
										<th>Amount</th>
										<th>Discount<br>Amount</th>
										<th>GST (%)</th>
										<th>IGST (%)</th>
										<!-- <th>GST& SGST 12% Amount</th>
										<th>GST& SGST 18% Amount</th>
										<th>GST& SGST 28% Amount</th> -->
										<!-- <th>IGST 12% Amount</th>
										<th>IGST 18% Amount</th>
										<th>IGST 28% Amount</th> -->
										<!-- <th>Discount Amount</th> -->
										<th>Total Tax Amount</th>
										<th>Total Amount</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th colspan="7" style="text-align: right">Total:</th>
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
					</fieldset>
				
			</div>

			<!-- ---	Between Two Dates	---- -->
			
			
			<div id="twoDates" class="tab-pane ">
				<div class="row"></div>
				<fieldset>
				 <div class="miscellaneous" style="left: 19%;">
				
				<form class="form-horizontal" method="post" action=""
					name="fertiBill">
					 <div class="container">
						<div class="row">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">	
							<input type="date" id="fisDate" type="text">
							<label  for="">From<sup>*</sup></label>
							</div>	
							

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">	
						 <input type="date" id="endDate" type="text">
						 	<label  for="">To<sup>*</sup></label>
							</div>
						
							
						<div class="col-lg-2">

								<input type="button" id="btn" name="save" style="padding-bottom: 35px;"
									class="btn btn-lg btn-success btn-md button_hw"
									onclick="purchaseReportBetweenTwoDates()" value="Search" />

						</div>	
						</div>
						</div>
			      </form>
                   
                    </div>
					
						<div class="table-responsive">
							<table
								class="table table-bordered table-striped table-condensed cf"
								id="example1" class="display"
								style="border: 2px solid black; border-collapse: collapse;">
								<thead>
									<tr>
										<th>Sr No</th>
										<th>Date</th>
										<th>Supplier Name</th>
										<th>Bill No</th>
										<th>Item Name</th>
										<th>Hsn/Sac No</th>
										<th>Item Rate</th>
										<th>Quantity</th>
										<th>Roll Size</th>
										<th>Discount<br>Amount</th>
										<th>GST (%)</th>
										<th>IGST (%)</th>
										<th>Amount</th>
										<!-- <th>Discount Amount</th> -->
										<th>Total Tax Amount</th>
										<th>Total Amount</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th colspan="7" style="text-align: right">Total:</th>
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
					</fieldset>
				
			</div>
			
			
			<!--------------------------------------------------------------- / BETWEEN TWO DATES -------------------------------------------------------->
			
			
			<!----------------------------------------------------------- SUPPLIER GST BETWEEN 2 DATES --------------------------------------------------->
			
			<div id="suppGstReportBetweenTwoDates" class="tab-pane ">
				<!-- <div class="row"></div> -->
				
					
					<div class="miscellaneous" style="left: ;">
					
					<form class="form-horizontal" method="post" action="" name="suppGstReportBetweenTwoDatesForm">
					<div class="container">
						<div class="row">
						
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">	
								
								
										<%
											SupplierDetailDao sdd88 = new SupplierDetailDao();
											List sList88 = sdd88.getAllSupplier();
										%>
										<input list="sup_drop7" id="supplier7">
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
										<label  for="supplier">Supplier Name<sup>*</sup></label>
									</div>
							
						
							
							
							
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
									<input type="date" id="fisDateSupp" placeholder="Start Date" type="text">
									<label  for="" >From<sup>*</sup></label>
						</div>		
							
							
							
							
						</div>	
					
					 	
                         <div class="row">
							
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
								<input type="date" id="endDateSupp" type="text">
								<label for="">To<sup>*</sup></label>
								</div>
								
							
							
							<div class=""></div>
							
							
                           <div class="col-lg-2 col-md-2">
								<input type="button" id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw" onclick="suppGstReportBetweenTwoDates()" value="Search" style="padding-bottom: 32px;"/>
                           </div>
							
					      </div>
					      </div>
				     	</form>
				     	
				</div>
				

						<fieldset>
						<div class="table-responsive">
							<table
								class="table table-bordered table-striped table-condensed cf"
								id="suppGstReportBetweenTwoDatesDataTable" class="display"
								style="border: 2px solid black; border-collapse: collapse;">
								<thead>
									<tr>
										<th>Sr No</th>
										<th>Date</th>
										<th>Supplier Name</th>
										<th>Bill No</th>
										<th>Item Name</th>
										<th>Hsn/Sac No</th>
										<th>Item Rate</th>
										<th>Quantity</th>
										<th>Roll Size</th>
										<th>Discount<br>Amount</th>
										<th>GST (%)</th>
										<th>IGST (%)</th>
										<th>Amount</th>
										<!-- <th>Discount Amount</th> -->
										<th>Total Tax Amount</th>
										<th>Total Amount</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th colspan="7" style="text-align: right">Total:</th>
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
					
			
			</fieldset>	
		</div>
			
			<!----------------------------------------------------------- / SUPPLIER GST BETWEEN 2 DATES --------------------------------------------------->
			
			<!------------------------------------------------------------------	CA Reports	------------------------------------------------------------>
			<div id="caReports" class="tab-pane ">
				<div class="row"></div>
				<form class="form-horizontal" method="post" action=""
					name="fertiBill">
					<fieldset>
						<div class="row form-group" style="margin-top: 20px">
							<label class="col-md-2 control-label" for=""> Start
								Purchase Date:<sup>*</sup>
							</label>
							<div class="col-md-2">
								<div class="input-group">
									<span class="input-group-addon"> <i
										class="glyphicon glyphicon-calendar"></i>
									</span> <input type="date" id="fisDate1" placeholder="Start Date"
										class="form-control input-md" type="text">
								</div>
							</div>

							<label class="col-md-2 control-label" for="">End Purchase
								Date:<sup>*</sup>
							</label>
							<div class="col-md-2">
								<div class="input-group">
									<span class="input-group-addon"> <i
										class="glyphicon glyphicon-calendar"></i>
									</span> <input type="date" id="endDate1" placeholder="End Date"
										class="form-control input-md ac_district" type="text">
								</div>
							</div>
							<div align="center">
								<input type="button" id="btn" name="save" style="margin-right: 206px;"
									class="btn btn-lg btn-success btn-md button_hw button_margin_right"
									onclick="caReportBetweenTwoDates()" value="Search" />
							</div>
						</div>
						
						<p id="demo12"></p>
						<div class="table-responsive">
							<table
								class="table table-bordered table-striped table-condensed cf"
								id="careport" class="display"
								style="border: 2px solid black; border-collapse: collapse;">
								<thead>
									<tr>
										<th>Sr No</th>
										<th>Category Name</th>
										<th>Item Name</th>
										<th>Hsn/Sac No</th>
										<th>Quantity</th>
										<th>Gst</th>
										<th>Igst</th>
									</tr>
								</thead>
								<tfoot>
									<tr>
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
					</fieldset>
				</form>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>