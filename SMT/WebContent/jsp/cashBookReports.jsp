<%@page import="com.smt.hibernate.BankDetailsH"%>
<%@page import="com.smt.dao.BankDetailsDao"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.ExpenditureDetailsDao"%>
<%@page import="com.smt.hibernate.ExpenditureDetailsBean"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>

<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js" type="text/javascript"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js" type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">		
<script src="/SMT/staticContent/js/cashbankbook.js"></script>

<style>
.left-tab-new{
    width: 192px;
    background: #ba0707;
    color:  white;
    border-radius: 0px;

}
</style>
<style>
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
    right: 2%;
    opacity: 0.6;
    z-index:-1;
 }
#graphcolumnwidth {
    width: 50%;
}
.supplierfields {
	width: 50%;
	margin-left: 25%;
}
.suppliertra ul {
    border: none;
    display: flex;
    justify-content: center;
}
.suppliertra a {
    outline: none !important;
    border: none !important;
    border-radius: 10px !important;
    color: #fff;
    background-color: #087cea85;
    font-size: 16px;
    font-weight: 600;
}
.suppliertra li {
    width: 20%;
    text-align: center;
    margin: 10px;
}
.suppliertra li a:hover {
    background-color: #087cea !important;
    color: #fff !important;
}
#tables {
    width: 95%;
}
.miscellaneous input {
    width: 99%;
}
.dataTables_scrollHeadInner {
    width: 100% !important;
}
#bankNameWiseTable {
    width: 100% !important;
}
.dataTables_scrollBody {
    height: 300px;
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
    z-index: -1;
    right: 2%;
    opacity: 0.6;
}
}
.btnwidth {
	padding-bottom: 32px !important;
}
#supplierNameWiseTable, #supplierBillWiseData, #supplierSingleDatetable, 
#supplierBetweenTwoDatestable, #customerNameWiseData2, #customerNameWiseData, 
#customerSingleDatetable, #customerBetweenTwoDates, #employeeSingleDatetable, 
#empBetweenTwoDates, #expenseSingleDatetable, #expenseBetweenTwoDates, 
#creditDebitReport, #bankNameWiseTable, #bankBetweenTwoDatesTable {
	border: none; 
	border-collapse: collapse !important;
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
<body class="vColor">
<div class="container-fluid" style="min-height: 300px;">
<div class="allreport"></div>
	<div class="">
		
		<div class="financialtranr">
			<ul class="nav nav-tabs tabs-left">
				<li class="active" id="li"><a href="#home" data-toggle="tab"  class="left-tab-new">Supplier	Transaction Reports</a></li>
				<li id="li"><a href="#profile" data-toggle="tab"  class="left-tab-new">Customer Transaction	Reports</a></li>
				<li id="li"><a href="#messages" data-toggle="tab"  class="left-tab-new">Employee Transaction Reports</a></li>
				<li id="li"><a href="#settings" data-toggle="tab"  class="left-tab-new">Expenditure Transaction Reports</a></li>
				<li id="li"><a href="#creditAndDebitReports" data-toggle="tab"  class="left-tab-new">Credit Debit Transaction Report</a></li>
				<li id="li"><a href="#bankTransactionReports" data-toggle="tab"  class="left-tab-new">Bank Transaction (BankBook) Reports</a></li>
			</ul>
		</div>
		<div class="" >
		<!-- id="suppliertransaction"> -->
			<!-- Tab panes -->
			<div class="tab-content">

<!-------------------------------------------------- Supplier Transaction Reports Starts Here -------------------------------------------------->
				<div class="tab-pane active" id="home">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Supplier Transaction Reports</h2>
						</div>
						<div class="row">
							<div class="col-md-12" align="center">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

				<div class="suppliertra">	
					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab" href="#supplierNAme">Supplier Name Wise</a></li>
						<!-- <li><a data-toggle="tab" href="#supplierBillWise"><h4
									style="color: blue">Bill Number Wise</h4></a></li> -->
						<li><a data-toggle="tab" href="#supplierSingleDate">Datewise</a></li>
						<li><a data-toggle="tab" href="#supplierBetweenTwoDate">Range</a></li>
						<li><a data-toggle="tab" href="#supplierBillWise">Bill No Wise</a></li>
					</ul>
				</div>

					<div class="tab-content" id="tabname">
					
<!------------------------------ Supplier Transaction Reports [Supplier Name Wise] Starts Here ------------------------------>
										
						<div id="supplierNAme" class="tab-pane fade in active">
							
						 <div class="miscellaneous">		
							<form class="form-horizontal" method="post" action="" name="supReportBill">
								<div class="container">
									<div class="row">
										<div class="invoice_label_up">
										 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">	
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
										
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										<div id="btnrow" align="center">
						<div class="invoice_button">		
												<input type="button" id="btn" name="save" onclick="getSupNameWiseReport()" value="Search" 
													class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"/>
											</div>
											</div>
											</div>
										
										</div>		
									
									</div>
									</form>
								</div>
									
									<div align="center">
									<div class="table-responsive" id="tables">
										<table class="table table-bordered table-striped table-condensed cf display" id="supplierNameWiseTable">
											<thead>
												<tr>
													<th>Date</th>
													<th>Supplier Name</th>
													<!-- <th>Bill Number</th> -->
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>
													<th>Return Amount</th>
													<th>Balance Amount</th>
													<th>Description</th>
													<th>Account No</th>
													<th>Bank Name</th>
													<th>Accountant Name</th>
												</tr>
											</thead>
										</table>
									</div>
									</div>
								
							
						</div>
<!------------------------------ Supplier Transaction Reports [Supplier Name Wise] Ends Here ------------------------------>						
		

<!------------------------------ Supplier Transaction Reports [Date Wise] Starts Here ------------------------------>						
						<div id="supplierSingleDate" class="tab-pane">
						 <div class="miscellaneous">			
							<form class="form-horizontal" method="post" action=""
								name="supReport">
								<div class="container">
									<div class="row">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										<input type="date" id="fDate11" placeholder="Start Date" type="text">
										<label  for=""> Enter Date<sup>*</sup></label>
									</div>
									
								
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
								<!-- <div class="col-md-2" id="btnsub"> -->
								<div id="btnrow" align="center">
						<div class="invoice_button">					
									<input type="button" id="btn" name="save" onclick="supplierReportForSingleDate()" value="Search" 
										class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
								</div>
								</div>			
								</div>
								</div>		
								</div>
									
								</form>	
						   </div>		
									<div class="table-responsive" style="margin-bottom: 2%;">
										<table class="table table-bordered table-striped table-condensed cf display"
											id="supplierSingleDatetable" style="margin-left:0;">
											<thead>
												<tr>
													<th>Supplier Name</th>
													<th>Date</th>
													<!-- <th>Bill Number</th> -->
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>													
													<th>Return Amount</th>
													<th>Balance Amount</th>
													<th>Description</th>
													<th>Account No</th>
													<th>Bank Name</th>
													<th>Accountant Name</th>
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
<!------------------------------ Supplier Transaction Reports [Date Wise] Ends Here ------------------------------>	
						
						
<!------------------------------ Supplier Transaction Reports [Range] Starts Here ------------------------------>
						
						<div id="supplierBetweenTwoDate" class="tab-pane fade">
							
							
						 <div class="miscellaneous">		
							<form class="form-horizontal" method="post" action=""
								name="supReport1">
								<div class="container">
									<div class="row">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
									<input type="date" id="fisDate1" placeholder="Start Date" type="text">
										<label for="startDate">Start Date<sup>*</sup></label>
									</div>	
									

									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										<input type="date" id="endDate1" placeholder="End Date" type="text">
										<label for="endDate">End Date<sup>*</sup></label>
									</div>	
									</div>	
								</div>

					
								<!-- <div class="col-md-2" id="btnsub"> -->
								<div id="btnrow" align="center">
						<div class="invoice_button">
											<input type="button" id="btn" name="save" onclick="getSupplierDetailsBetweenTwoDates()" 
												value="Search" class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
								</div>
								</div>
									
								
                               </form>
                             </div>  '
                             <div class="row" align="center">
                             <div class="table-responsive" id="tables">
								<table class="table table-bordered table-striped table-condensed cf display" id="supplierBetweenTwoDatestable" >
										<thead>
											<tr>
												<th>Date</th>
												<th>Supplier Name</th>
												<!-- <th>Bill Number</th> -->
												<th>Payment Type</th>
												<th>Payment Mode</th>
												<th>Total Amount</th>
												<th>Payment Amount</th>
												<th>Return Amount</th>
												<th>Balance Amount</th>												
												<th>Description</th>
												<th>Account No</th>
												<th>Bank Name</th>
												<th>Accountant Name</th>
											</tr>
										</thead>
									</table>
									</div>
									</div>
							
							
						</div>
<!------------------------------ Supplier Transaction Reports [Range] Ends Here ------------------------------>		

<!------------------------------ Supplier Transaction Reports [Bill No Wise] Starts Here ------------------------------>
						
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
													onchange="getAllBills1()">
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
											

												<div id="btnrow" align="center">
						<div class="invoice_button">
													<input type="button" id="btn" name="save" onclick="getBillWiseReport()" value="Search"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
												</div>
												</div>
											
										</div>
									</form>
								</div>
								
								<div class="row" align="center">
									<div class="table-responsive" id="tables">
										<table class="table table-bordered table-striped table-condensed cf display" id="supplierBillWiseData">
											<thead>
												<tr>
													<th>Date</th>
													<th>Supplier Name</th>
													<th>Bill Number</th>
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>
													<th>Balance Amount</th>
													<th>Account No</th>
													<th>Bank Name</th>
													<th>Accountant Name</th>
												</tr>
											</thead>
										</table>
									</div>	
									</div>						
							
						</div>
<!------------------------------ Supplier Transaction Reports [Bill No Wise] Ends Here ------------------------------>				
						
					</div>
				</div>
	
<!-------------------------------------------------- Supplier Transaction Reports Ends Here -------------------------------------------------->


<!-------------------------------------------------- Customer Transaction Reports Starts Here -------------------------------------------------->

				<div class="tab-pane" id="profile">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Credit Customer Transaction Reports</h2>
						</div>
						<div class="row">
							<div class="col-md-12" align="center">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

				<div class="customertra">	
					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"	href="#customerNameWise">Customer Name wise</a></li>
						<!-- <li><a data-toggle="tab" href="#customerBillWise"><h4
									style="color: blue">Bill Number Wise</h4></a></li> -->
						<li><a data-toggle="tab" href="#customerSingleDate">Datewise</a></li>
						<li><a data-toggle="tab" href="#customerBetweenTwoDate">Range</a></li>
						<li><a data-toggle="tab" href="#customerBillWise">Bill No Wise</a></li>
					</ul>
				</div>

					<div class="tab-content" id="tabname">

<!-------------------------------------------------- Customer Transaction Reports [Customer Name Wise] Starts Here -------------------------------------------------->
						
						<div id="customerNameWise" class="tab-pane fade in active">
							 <div class="miscellaneous">		
							<form class="form-horizontal" method="post" action=""
								name="supReportBill">
									<div class="container">
									<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
									
												<%
													CustomerDetailsDao dao = new CustomerDetailsDao();
													List custList = dao.getAllCustomer();
												%>
												<input list="cust_drop5" id="creditCustomer5" required>
												<datalist id="cust_drop5">
													<%
														for (int i = 0; i < custList.size(); i++) {
															CustomerDetailsBean cust2 = (CustomerDetailsBean) custList
																	.get(i);
													%>
													<option data-value="<%=cust2.getCustId()%>"><%=cust2.getFirstName()%>
														<%=cust2.getLastName()%>
													</option>
													<%
														}
													%>
												</datalist>
												<label for="customerName">Customer Name<sup style="color: red;">*</sup></label>
											</div>
											</div>
										
									
											<!-- <div class="col-md-2" id="btnsub"> -->
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">	
										<div id="btnrow" align="center">
						<div class="invoice_button">	
												<input type="button" id="btn" name="save" onclick="getCreditCustomerReportNameWise()" value="Search" 
													class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
											</div>
											</div>
											</div>
									</div>
									</div>
									
								</form>	
								</div>
								
								<div class="row" align="center">
									<div class="table-responsive" id="tables">
										<table class="table table-bordered table-striped table-condensed cf display" id="customerNameWiseData2">
											<thead>
												<tr>
													<th>Date</th>
													<th>Customer Name</th>
													<!-- <th>Bill Number</th> -->
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>
													<th>Return Amount</th>
													<th>Balance Amount</th>
													<th>Description</th>
													<th>Account Number</th>
													<th>Bank Name</th>
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
												</tr>
											</tfoot>
										</table>
									</div>
									</div>
								
							
						</div>
<!-------------------------------------------------- Customer Transaction Reports [Customer Name Wise] Ends Here -------------------------------------------------->




<!-------------------------------------------------- Customer Transaction Reports [Date Wise] Starts Here -------------------------------------------------->
										
						<div id="customerSingleDate" class="tab-pane">
						
							 <div class="miscellaneous">		
							<form class="form-horizontal" method="post" action="" name="custReport">
								<div class="container">
									<div class="row">
									
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										<input type="date" id="fDate1" placeholder="Start Date" type="text">
									   <label for=""> Enter Date<sup>*</sup></label>
									   </div>
												
										
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
									<!-- <div class="col-md-2" id="btnsub"> -->
									<div id="btnrow" align="center">
						<div class="invoice_button">
										<input type="button" id="btn" name="save" onclick="creditCustReportForSingleDate()" value="Search" 
											class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
									</div>
									</div>
									</div>
								</div>
								</div>
									
									</form>
									</div>
									
									<div class="row" align="center">
									<div class="table-responsive" id="tables">
										<table class="table table-bordered table-striped table-condensed cf display" id="customerSingleDatetable">
											<thead>
												<tr>
													<th>Date</th>
													<th>Customer Name</th>
													<!-- <th>Bill Number</th> -->
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>
													<th>Return Amount</th>
													<th>Balance Amount</th>
													<th>Description</th>
													<th>Account Number</th>
													<th>Bank Name</th>
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
												</tr>
											</tfoot>
										</table>
									</div>	
									</div>			
						</div>
<!-------------------------------------------------- Customer Transaction Reports [Date Wise] Ends Here -------------------------------------------------->						


<!-------------------------------------------------- Customer Transaction Reports [Range] Ends Here -------------------------------------------------->
								
						<div id="customerBetweenTwoDate" class="tab-pane fade">
							   <div class="miscellaneous">	
							<form class="form-horizontal" method="post" action="" name="custReport1">
								<div class="container">
									<div class="row">
									  <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
									<input type="date" id="fisDate" placeholder="Start Date" type="text">
									<label  for="startDate">From<sup>*</sup></label>
									</div>		
										

										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										 <input type="date" id="endDate" placeholder="End Date" type="text">
										 <label  for="village">To<sup>*</sup></label>
										 </div>
									</div>	
										<!-- <div class="col-md-2" id="btnsub"> -->
										
										<div id="btnrow" align="center">
						<div class="invoice_button">
											<input type="button" id="btn" name="save" value="Search" 
												class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth"
												onclick="getCreditCustomerDetailsBetweenTwoDates()" />
												</div>
										</div>
										</div>
									
                               </form>	
					   </div>
					    <div class="row" align="center">
                             <div class="table-responsive" id="tables">
								<table class="table table-bordered table-striped table-condensed cf display" id="customerBetweenTwoDates">
										<thead>
											<tr>
												<th>Date</th>
												<th>First Name</th>
												<th>Last Name</th>
												<!-- <th>Bill Number</th> -->
												<th>Payment Type</th>
												<th>Payment Mode</th>
												<th>Total Amount</th>
												<th>Payment Amount</th>
												<th>Return Amount</th>												
												<th>Balance Amount</th>
												<th>Description</th>
												<th>Account Number</th>
												<th>Bank Name</th>
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
											</tr>
										</tfoot>
									</table>
									</div>
									</div>		
					
							
						</div>
<!-------------------------------------------------- Customer Transaction Reports [Range] Ends Here -------------------------------------------------->						


<!-------------------------------------------------- Customer Transaction Reports [Bill No Wise] Starts Here -------------------------------------------------->						
						<div id="customerBillWise"  class="tab-pane">
								<div class="miscellaneous" style="left:">
									<form class="form-horizontal" method="post" action=""
										name="supReportBill">
										<div class="container">
											<div class="row">
												<div class="invoice_label_up">
													<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
														id="graphcolumnwidth">

														<%
													CustomerDetailsDao cdd = new CustomerDetailsDao();
													List cList = cdd.getAllCustomer();
												%>
														<input list="cust_drop" id="creditCustomer"
													onchange="getBillByCustomer1()">
												<datalist id="cust_drop">
													<%
														for (int i = 0; i < cList.size(); i++) {
															CustomerDetailsBean cust = (CustomerDetailsBean) cList.get(i);
													%>
													<option data-value="<%=cust.getCustId()%>"><%=cust.getFirstName()%>
														<%=cust.getLastName()%>
													</option>
													<%
														}
													%>
												</datalist>
														<label for="supplier">Customer Name<sup style="color: red;">*</sup></label>
													</div>
												</div>




												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
													id="graphcolumnwidth">
													<select id='billNo1' name="billNo"></select> <label
														for="bill_no">Bill No <sup style="color: red;">*</sup></label>
												</div>



												<!-- <div class="col-md-2" id="btnsub"> -->
												<div id="btnrow" align="center">
									<div class="invoice_button">
													<input type="button" id="btn" name="save" onclick="getBillWiseCreditReport()" value="Search"
														class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
												</div>
												</div>
											</div>
										</div>
									</form>			
								</div>
								
								<div class="row" align="center">
									<div class="table-responsive" id="tables">
										<table class="table table-bordered table-striped table-condensed cf display" id="customerNameWiseData">
											<thead>
												<tr>
													<th>Date</th>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Bill Number</th>
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Total Amount</th>
													<th>Payment Amount</th>
													<th>Balance Amount</th>
												</tr>
											</thead>
											<!-- <tfoot>
												<tr>
													<th colspan="6" style="text-align: right">Total:</th>
													<th></th>
													<th></th>
													<th></th>
												</tr>
											</tfoot> -->
										</table>
									</div>
									</div>
								</fieldset>
							</form>
						</div>
<!-------------------------------------------------- Customer Transaction Reports [Bill No Wise] Ends Here -------------------------------------------------->

						
					</div>
				</div>
<!-------------------------------------------------- Customer Transaction Reports Ends Here -------------------------------------------------->


<!-------------------------------------------------- Employee Transaction Reports Starts Here -------------------------------------------------->
				<div class="tab-pane" id="messages">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Employee Transaction Reports</h2>
						</div>
						<div class="row">
							<div class="col-md-12" align="center">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>
					
				<div class="emplexpentran">	
					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"	href="#employeeSingleDate">Datewise</a></li>
						<li><a data-toggle="tab" href="#empBetweenTwoDate">Range</a></li>
					</ul>
				</div>	
					
					<div class="tab-content" id="tabname">

<!-------------------------------------------------- Employee Transaction Reports [Date Wise] Starts Here -------------------------------------------------->
						<div id="employeeSingleDate" class="tab-pane fade in active">
							
							
						   <div class="miscellaneous">		
							<form class="form-horizontal" method="post" action=""
								name="empReport">
							<div class="container">
									<div class="row">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										<input type="date" id="fDate2" placeholder="Start Date" type="text">
										<label for=""> Enter Date<sup>*</sup></label>
										</div>	
										
										<!-- <div class="col-md-2" id="btnsub"> -->
										<div id="btnrow" align="center">
						<div class="invoice_button">
											<input type="button" id="btn" name="save" onclick="employeePaymentReportForSingleDate()"
												value="Search" class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
										</div>
										</div>
									
										</div>
										</div>
										</form>
						  </div>
						  
						  <div align="center">
									<div class="table-responsive" id="tables">
										<table class="table table-bordered table-striped table-condensed cf display" id="employeeSingleDatetable">
											<thead>
												<tr>
													<th>Payment Date</th>
													<th>First Name</th>
													<th>Last Name</th>
													<th>Payment Type</th>
													<th>Payment Mode</th>
													<th>Payment Amount</th>
													<th>Cheque Number</th>
													<th>Accountant Name</th>
													<th>Reason</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="5" style="text-align: right">Total:</th>
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
<!-------------------------------------------------- Employee Transaction Reports [Date Wise] Ends Here -------------------------------------------------->					
		

<!-------------------------------------------------- Employee Transaction Reports [Range] Starts Here -------------------------------------------------->
						<div id="empBetweenTwoDate" class="tab-pane">
						
                    <div class="miscellaneous" style="left: 3%;">	
							<form class="form-horizontal" method="post" action=""
								name="empReport1">
								<div class="container">
									<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
												<%
													EmployeeDetailsDao eedd = new EmployeeDetailsDao();
													List mList = eedd.getAllMainEmployee();
												%>
												<input list="emp_drop" id="employee" required>
												<datalist id="emp_drop">
													<%
														for (int i = 0; i < mList.size(); i++) {
															EmployeeDetailsBean detailsBean = (EmployeeDetailsBean) mList
																	.get(i);
													%>
													<option data-value="<%=detailsBean.getEmpId()%>"><%=detailsBean.getFirstName()%>
														<%=detailsBean.getLastName()%></option>
													<%
														}
													%>
												</datalist>
											<label for="employeename">Employee Name<sup style="color: red;">*</sup></label>
									</div>
									</div>

										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										<input type="date" id="fisDate2" placeholder="Start Date" type="text">
											<label  for="startDate">From<sup style="color: red;">*</sup></label>
											</div>
											
										
									</div>

									<div class="row">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										<input type="date" id="endDate2" placeholder="End Date" type="text">
										<label for="village">To<sup style="color: red;">*</sup></label>
										</div>
										
										
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
									<div id="btnrow" align="center">
						<div class="invoice_button">
											<input type="button" id="btn" name="save" onclick="getEmpPaymentDetailsBetTwoDays()" 
												value="Search" class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
										</div>
										</div>
										</div>
										</div>
										</div>
									
									</form>
									</div>
                             <div class="row" align="center">
                             <div class="table-responsive" style="overflow-x: hidden;" id="tables">
								<table class="table table-bordered table-striped table-condensed cf display" id="empBetweenTwoDates" >
										<thead>
											<tr>
												<th>Payment Date</th>
												<th>First Name</th>
												<th>Last Name</th>
												<th>Payment Type</th>
												<th>Payment Mode</th>
												<th>Payment Amount</th>
												<th>Cheque Number</th>
												<th>Accountant Name</th>
												<th>Reason</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th colspan="5" style="text-align: right">Total:</th>
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
<!-------------------------------------------------- Employee Transaction Reports [Range] Ends Here -------------------------------------------------->						
						
					</div>
				</div>
<!-------------------------------------------------- Employee Transaction Reports Ends Here -------------------------------------------------->


<!------------------------------------------------------------- Expenditure Transaction Reports Starts Here--------------------------------------------------------------------------------->

				<div class="tab-pane" id="settings">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Expenditure Transaction
								Reports</h2>
						</div>

						<div class="row">
							<div class="col-md-12" align="center">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

				<div class="emplexpentran">
					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab"
							href="#expenseSingleDate">Datewise</a></li>
						<li><a data-toggle="tab" href="#expenseBetweenTwoDate">Range</a></li>
					</ul>
				</div>	

					<div class="tab-content" id="tabname">
					
					
<!-------------------------------------------------- Expenditure Transaction Reports [DateWise] Starts Here -------------------------------------------------->
						
						
						<div id="expenseSingleDate" class="tab-pane fade in active">
							
						<div class="miscellaneous" style="left:">	
							<form method="post" action="" name="expnsReport">
								<div class="container">
									<div class="row">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										<input type="date" id="fDate4" placeholder="Start Date" type="text">
										<label for=""> Enter Date<sup>*</sup></label>
										</div>	
										
										
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										<!-- <div class="col-md-2" id="btnsub"> -->
										<div id="btnrow" align="center">
						<div class="invoice_button">
											<input type="button" id="btn" name="save" onclick="expensePaymentReportForSingleDate()"
												value="Search" class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
										</div>
										</div>
										</div>
										</div>
									
									</div>
							       </form>
						</div>
									
									<div align="center">
									<div class="table-responsive" id="tables">
										<table class="table table-bordered table-striped table-condensed cf display" id="expenseSingleDatetable">
											<thead>
												<tr>
													<th>Payment Date</th>
													<th>Expense Name</th>
													<th>Service Provider</th>
													<th>Payment Mode</th>
													<th>payment</th>
													<th>Accountant Name</th>
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
					</div>
						
<!-------------------------------------------------- Expenditure Transaction Reports [DateWise] Ends Here -------------------------------------------------->
						
<!-------------------------------------------------- Expenditure Transaction Reports [Range] Starts Here -------------------------------------------------->
						<div id="expenseBetweenTwoDate" class="tab-pane">
							
						<div class="miscellaneous" >	
							<form class="form-horizontal" method="post" action=""
								name="expReport1">
							<div class="container">
									<div class="row">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										
												<%
													ExpenditureDetailsDao exdd = new ExpenditureDetailsDao();
													List exList = exdd.getAllExpenseName();
												%>
												<input list="exp_drop" id="expenseName" style="padding-bottom: 18px;" required>
												<datalist id="exp_drop">
													<%
														for (int i = 0; i < exList.size(); i++) {
															ExpenditureDetailsBean expbean = (ExpenditureDetailsBean) exList
																	.get(i);
													%>
													<option data-value="<%=expbean.getPkExpenseDetailsId()%>"
														value="<%=expbean.getExpenseName()%>">
														<%
															}
														%>
													
												</datalist>
												<label for="expenditureName">Expenditure Name<sup style="color: red;">*</sup></label>
												</div>
											</div>
										
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
										<input type="date" id="fisDate4" placeholder="Start Date" type="text">
										<label  for="startDate">Start Date<sup style="color: red;">*</sup></label>
										</div>
											
									</div>
 									<div class="row">
                             <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">		
									<input type="date" id="endDate4" placeholder="End Date" type="text">
										<label  for="endDate">End Date<sup style="color: red;">*</sup></label>
										</div>
										
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
									<div id="btnrow" align="center">
						<div class="invoice_button">
											<input type="button" id="btn" name="save" onclick="getExpensePaymentDetailsBetTwoDays()"
												class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" value="Search" />
										</div>
										</div>
										</div>
										</div>
										
									</div>
									</form>
								
									</div>
                        <div class="row" align="center">
                             <div class="table-responsive" id="tables">
								<table class="table table-bordered table-striped table-condensed cf display" id="expenseBetweenTwoDates">
										<thead>
											<tr>
												<th>Payment Date</th>
												<th>Expense Name</th>
												<th>Service Provider</th>
												<th>payment Mode</th>
												<th>payment</th>
												<th>Accountant Name</th>
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
					          </div>
<!-------------------------------------------------- Expenditure Transaction Reports [Range] Ends Here -------------------------------------------------->
					</div>
				</div>
<!------------------------------------------------------------- Expenditure Transaction Reports Ends Here--------------------------------------------------------------------------------->

						
<!----------------------------------------------------- CREDIT AND DEBIT REPORT Starts Here -------------------------------------------------------------------------->
						

				<div class="tab-pane" id="creditAndDebitReports">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Credit Debit Transaction Report</h2>
						</div>

						<div class="row">
							<div class="col-md-12" align="center">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

					<!-- <ul class="nav nav-tabs">
						<li><a data-toggle="tab" href="#creditDebitRange"><h4 style="color: blue">Range</h4></a></li>
					</ul>
 -->
					<div class="tab-content" id="tabname">
						<!--    for single date -->
						<div id="creditDebitRange" class="tab-pane fade in active">
							<!-- <div class="row">
								<div class="col-sm-offset-1 col-md-10">
									<hr style="border-top-color: #c1b1b1;">
								</div>
							</div> -->
							
						<div class="miscellaneous">		
							<form class="form-horizontal" method="post" action=""
								name="expnsReport">
								<div class="container">
									<div class="row">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth"> 		
									<input type="date" id="startDateCD" placeholder="Start Date" type="text">
									<label for="startDateCD">From<sup>*</sup></label>
									</div>		
										
										
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">			
									 <input type="date" id="endDateCD" placeholder="End Date" type="text">
									 <label for="endDateCD">To<sup>*</sup></label>
									 </div>
											
									
									</div>
									<!-- <div class="col-md-2" id="btnsub"> -->
										<div id="btnrow" align="center">
						<div class="invoice_button">	
										<input type="button" id="btn" name="save" onclick="creditDebitReportRangeWise()" 
											class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" value="Search" />
											
										</div>
										</div>
										</div>
								</form>	
							</div>
									<!-- <div class="table-responsive"> -->
									 <div class="row" align="center">
                             <div class="table-responsive" id="tables">
										<table class="table table-bordered table-striped table-condensed cf display" id="creditDebitReport">
											<thead>
												<tr>
													<th>Transaction Id/Bill No</th>
													<th>Discription</th>
													<th>Date</th>
													<th>Credit</th>
													<th>Debit</th>
												</tr>
											</thead>
											<tfoot>
												<tr>
													<th colspan="3" style="text-align: right">Total:</th>
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
<!---------------------------------------------------------- CREDIT DEBIT REPORTS Ends Here ------------------------------------------------------>
				

<!----------------------------------------------------------- BANK Transaction (Bank Book) REPORTS Starts Here -------------------------------------------------------->
				
				<div class="tab-pane" id="bankTransactionReports">
					<div class="row">
						<div align="center">
							<h2 class="form-name style_heading">Bank Transaction (BankBook) Reports</h2>
						</div>
						<div class="row">
							<div class="col-md-12" align="center">
								<hr style="border-top-color: #c1b1b1;">
							</div>
						</div>
					</div>

				<div class="banktrans">
					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab" href="#bankNameWise">Bank Name Wise</a></li>
						<li><a data-toggle="tab" href="#bankBetweenTwoDate">Range</a></li>
					</ul>

				</div>
					<div class="tab-content" id="tabname">
					

<!----------------------------------------------------------- BANK Transaction (Bank Book) REPORTS [Bank Name Wise] Starts Here ---------------------------------------------------------------------------------------------------->
						
						<div id="bankNameWise" class="tab-pane fade in active">
							
						 <div class="miscellaneous">		
							<form class="form-horizontal" method="post" action="" name="bankNameWiseReport">
								<div class="container">
									<div class="row">
										<div class="invoice_label_up">
										 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">	
												
												<input list="bank_drop7" id="bankName1" required>
												<datalist id="bank_drop7">												
													<%
														BankDetailsDao bdd = new BankDetailsDao();
														List bankList = bdd.getAllBankName();
													%>
													<%
														for (int i = 0; i < bankList.size(); i++) {
															BankDetailsH bankD = (BankDetailsH) bankList.get(i);
													%>
													<option data-value="<%=bankD.getPkBankId()%>" value="<%=bankD.getBankName()%>">
														<%
															}
														%>
													
												</datalist>
												<label for="bankName1">Bank Name<sup style="color: red;">*</sup></label>
											</div>
										</div>	
										
										
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">	
										<!-- <div class="col-md-2" id="btnsub"> -->
												<div id="btnrow" align="center">
						<div class="invoice_button">
												<input type="button" id="btn" name="save" onclick="bankNameWiseReport11()" value="Search" 
													class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
											</div>
											</div>
											</div>
											</div>
										
									</div>
									</form>
								</div>
									
									<div align="center">
									<div class="table-responsive" id="tables">
										<table class="table table-bordered table-striped table-condensed cf display" id="bankNameWiseTable">
											<thead>
												<tr>
													<th>Sr No</th>
													<th>Bank Name</th>
													<th>Accountant Name</th>
													<th>Payment Date</th>
													<th>Contact Number</th>
													<th>Payment Amount</th>
													<th>Payment Type</th>
													<th>Total Amount</th>
												</tr>
											</thead>
										</table>
									</div>
									</div>
						</div>
						
						
<!----------------------------------------------------------- BANK Transaction (Bank Book) REPORTS [Bank Name Wise] Ends Here ---------------------------------------------------------------------------------------------------->

							
						
<!----------------------------------------------------------- BANK Transaction (Bank Book) REPORTS [Range] Starts Here ---------------------------------------------------------------------------------------------------->
						
						<div id="bankBetweenTwoDate" class="tab-pane fade">
						
							
						 <div class="miscellaneous">		
							<form class="form-horizontal" method="post" action=""
								name="supReport1">
								<div class="container">
								<div class="row">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
									<input type="date" id="bankStartDate1" placeholder="Start Date">
										<label for="startDate">Start Date<sup>*</sup></label>
								</div>	
									

								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="graphcolumnwidth">
									<input type="date" id="bankEndDate1" placeholder="End Date">
									<label for="endDate">End Date<sup>*</sup></label>
								</div>
								</div>
					
								<!-- <div class="col-md-2" id="btnsub"> -->
								<div id="btnrow" align="center">
						<div class="invoice_button">	
									<input type="button" id="btn" name="save" onclick="getBankTransactionBetweenTwoDates()" value="Search"
										class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
							</div>
							</div>	
								<!-- </div> -->
								
								</div>
									
								
                               </form>
                             </div>  
                              <div class="row" align="center">
                             <div class="table-responsive" id="tables">
									<table class="table table-bordered table-striped table-condensed cf display" id="bankBetweenTwoDatesTable">
										<thead>
											<tr>
												<th>Sr No</th>
												<th>Bank Name</th>
												<th>Accountant Name</th>
												<th>Payment Date</th>
												<th>Contact Number</th>
												<th>Payment Amount</th>
												<th>Payment Type</th>
												<th>Total Amount</th>
											</tr>
										</thead>
									</table>
									</div>
									</div>
						</div>						
<!------------------------------------------------- BANK Transaction (Bank Book) REPORTS [Range] Ends Here ---------------------------------------------------------------------------------->
					</div>
				</div>
<!----------------------------------------------------------- BANK Transaction (Bank Book) REPORTS Ends Here -------------------------------------------------------->
		
			</div>
		</div>
	</div>
</div>

<div class="row footer_margin_top" align="center">
	<%@include file="y_commons/footer.jsp"%>
</div>
</body>