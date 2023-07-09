<%@page import="com.smt.bean.allTransactionId"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.CreditCustomerBill"%>
<%@page import="com.smt.hibernate.OtherBill"%>
<%@page import="com.smt.helper.CustomerOrderHelper"%>
<%@page import="com.smt.hibernate.CustomerBill"%>
<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/js/sale_return.js"></script>
<style>
</style>
<%
	Long transactionId = 1l;
%>
<%
	CustomerDetailsDao data = new CustomerDetailsDao();
	List trIdList = data.getLastTransactionIdForSaleReturn();
	for (int i = 0; i < trIdList.size(); i++) {
		allTransactionId st = (allTransactionId) trIdList.get(i);
		transactionId = st.getSaleReturnTransactoinId();
		transactionId++;
	}
%>
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
	top: 5px;
	right: 1%;
}

#logo {
	width: 110px;
	height: auto;
	position: fixed;
	top: 9%;
	right: 1%;
	z-index: -1;
	opacity: 0.6;
}

#taxcol {
	width: 33%;
	/*     margin-left: -4%; */
}

.table-responsive {
	min-height: .01%;
	overflow-x: auto;
	/* width: 90%; */
	margin-left: 25px;
	margin-top: 1%;
	margin-bottom: 1%;
}

span {
	color: red;
	margin-right: 10px;
	font-size: 27px;
}
.col-md-2.col-md-offset-2.align {
    margin-top: 33;
    margin-left: 19%;
}
h3{
 font-size: 16px;
 }

@media ( min-width : 980px) and (max-width:1180px) {
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
	#logoutButton {
		width: 70px;
		position: fixed;
		top: 3%;
		right: 2%;
		font-size: 12px
	}
	#currentUser {
		color: orange;
		font-weight: 600;
		font-size: 14px;
		position: fixed;
		top: 1%;
		right: 2%;
	}
	#logo {
		width: 110px;
		height: auto;
		position: fixed;
		top: 10%;
		right: 2%;
		z-index: -1;
		opacity: 0.6;
	}
	.table-responsive {
		min-height: .01%;
		overflow-x: auto;
		width: 96%;
		margin-left: 61px;
		margin-top: 1%;
		margin-bottom: 0%;
	}
	.invoice_grid_1 {
		margin-left: -290px;
		padding-top: 18px;
		width: 140%;
	}
	span {
		color: red;
		margin-right: 10px;
		font-size: 25px;
	}
	.col-md-2.col-md-offset-2.align {
    margin-top: 33;
    margin-left: 26%;
}
}
@media ( max-width : 991px) {

.col-md-2.col-md-offset-2.align {
    margin-top: 33;
    margin-left: 0%;
}
h3 {
    font-size: 13px;
}
}
@media ( min-width : 768px) and (max-width: 979px) {
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
	#logoutButton {
		width: 70px;
		font-size: 11px;
		position: fixed;
		top: 12px;
		right: 44px;
	}
	#currentUser {
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
	.invoice_grid_1 {
		margin-left: -255px;
		padding-top: 18px;
		width: 139%;
	}
	span {
		color: red;
		margin-right: 10px;
		font-size: 23px;
		"
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
		right: 2%;
		z-index: -1;
		opacity: 0.6;
	}
	.invoice_grid_1 {
		margin-left: -170px;
		padding-top: 18px;
		width: 140%;
	}
	.table-responsive {
		width: 100%;
		overflow-y: hidden;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		border: none;
		margin-bottom: 0%;
		margin-left: 6px;
	}
	h3 {
    font-size: 12px;
}
	span {
		color: red;
		margin-right: 10px;
		font-size: 20px;
	}
}
</style>


<body class="vColor">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-3 align" id="billheading" style="width: auto;">
				<span align="left">Transaction ID :: <%
					out.println(transactionId);
				%>
				</span> <input type="hidden" id="transactionIdSr" name="transactionIdSr"
					value="<%=transactionId%>">
			</div>
			<div class="col-md-2 col-md-offset-2 align" align="center" style="width:auto;">
				<span class="form-name style_heading" style="font-size: 30px;">Sale
					Return</span>
				<!-- <h3 style="color: red; font-size: 12px;">"Enter '00' in other Product Return Quantity"</h3> -->
			</div>
			<div class="row">
				<div class="col-sm-offset-1 col-md-10">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>

		</div>
		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-6 col-md-5 control-label">
					<!-- 	<div id="date" hidden="true">
						<label id="demoSr"></label>
						<script>
							var date = new Date();
							document.getElementById("demo").innerHTML = date
									.toDateString();
						</script>
					</div> -->
				</div>
			</div>
		</div>

		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home2"><h4 style="color: blue">Bill No Wise</h4></a></li>
			<li><a data-toggle="tab" href="#home"><h4 style="color: blue">Tax Invoice</h4></a></li>
			<li><a data-toggle="tab" href="#customerBill"><h4 style="color: blue">Credit Customer Bill</h4></a></li>
		</ul>

		<div class="tab-content" style="float: left; padding-top: 20px;">

			<!------------------------------------------ Miscellaneous Bill ----------------------------------------------------->

			<div id="home" class="tab-pane">
				<div class="row"></div>
				<div class="container" id="editbilltab">
					<div class="miscellaneous" style="left: 0%;">
						<form action="supplier" name="supd" method="post">

							<div class="row">
								<div class="invoice_label_up ">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
										id="dayreport">

										<%
											CustomerDetailsDao sdd88 = new CustomerDetailsDao();
											List sList88 = sdd88.getAllMiscellaneousCustomer(request, response);
										%>
										<input list="cust_drop5" id="creditCustomer5"
											onchange="getBillByMiscellaneousCustomer1()" required>
										<datalist id="cust_drop5">
											<%
												for (int i = 0; i < sList88.size(); i++) {
													OtherBill sup88 = (OtherBill) sList88.get(i);
											%>
											<option data-value="<%=sup88.getPkBillId()%>>"
												value="<%=sup88.getCreditCustomer1()%>"></option>
											<%
												}
											%>
										</datalist>
										<label for="creditCustomer5">Customer Name</label> <input
											type="text" disabled="disabled" hidden="true" />
									</div>
								</div>


								<div class="col-md-1"></div>
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport">
									<select id='billNo' name="billNo" onchange="getSaleItems()">
									</select> <label for="bill_no"> Bill No: </label>
									<h3 align="center"
										style="color: red; font-weight: bold; margin-top: -8%;">"Use
										Tab key for get Bill Information"</h3>
								</div>
							</div>

							<div class="row">

								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport">
									<textarea style="width: 100%;" id="reasonForSReturn1"
										name="reasonForSReturn1"></textarea>
									<label for="reasonForSReturn1">Reason </label>
								</div>
								<div class="col-md-1"></div>
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport" align="left">
										<input type="button" value="Submit" id="btn"
											onclick="valSaleReturn()"
											class="btn btn-large btn-success btn-md"
											style="width:124px;padding: 10;display:none;" />


										<!-- <input type="reset" value="Reset"   class="btn btn-large btn-danger btn-md button_hw button_margin_right"/> -->
									</div>
								</div>
								<div class="row">
								<div class="invoice_grid_1">
								<div class="table-responsive">
									<table id="jqGrid"></table>
									<div id="jqGridPager"></div>
								</div>
							</div>
                          <div class="invoice_button_allPaymentWithLeftTabs">
								<div class="row">
								
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport" align="left">
										<input type="button" value="Submit" id="btn"
											onclick="valSaleReturn()"
											class="btn btn-large btn-success btn-md"
											style="width:124px;padding: 10;" />


										<!-- <input type="reset" value="Reset"   class="btn btn-large btn-danger btn-md button_hw button_margin_right"/> -->
									</div>
								</div>
								</div>
							</div>

							

						</form>

					</div>
				</div>
			</div>

			<!----------------------------------------------- tax invoice bill no wise sale return  --------------------------------------------------------->

			<div id="home2" class="tab-pane fade in active">
				<div class="row"></div>

				<div class="miscellaneous" style="left: 0%;">
					<div class="container" id="editbilltab">
						<form action="supplier" name="supbwsr" method="post"
							class="form-horizontal">

							<div class="row">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport">
									<!-- <h3 align="center" style="color: red; font-size: 12px;">"Use Tab key for get data"</h3> -->


									<input type="text" id="billNoBW" onfocusout="getSaleItems2()">
									<label for="billnowsr"> Bill No </label>
									<h3 align="center"
										style="color: red;font-weight: bold; margin-top: -8%;">"Use
										Tab key for get Bill Information"</h3>
									<input type="text" disabled="disabled" hidden="true" />
								</div>

								<div class="col-md-1"></div>


								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport">
									<textarea style="width: 100%;" id="reasonForSReturn2"
										name="reasonForSReturn2"></textarea>
									<label for="reasonForSReturn2"> Reason </label>
								</div>
							</div>
							<div class="invoice_grid_1">
								<div class="table-responsive">
									<table id="jqGrid2"></table>
									<div id="jqGridPager2"></div>
								</div>
							</div>
                             	<div class="invoice_button_allPaymentWithLeftTabs">
								<div class="row">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport" align="right">

										<input type="button" value="Submit" id="btn"
											onclick="valSaleReturn2()"
											class="btn btn-large btn-success btn-md button_hw button_margin_right"
											style="padding: 9px;" />
									</div>
								</div>
							</div>
							<!-- 	<div class="container-fluid" style="margin-left: 0px;"> -->
							
							<!-- </div> -->


						</form>
					</div>
				</div>
			</div>

			<!--------------------------------------------------------------	Credit Customer Bill	--------------------------------- -->

			<div id="customerBill" class="tab-pane ">
				<div class="row"></div>

				<div class="miscellaneous" style="left: 0%;">
					<div class="container" id="editbilltab">
						<form action="supplier" name="supd1" method="post"
							class="form-horizontal">
							<div class="row">
								<div class="invoice_label_up ">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
										id="dayreport">

										<%
											CustomerDetailsDao cdd = new CustomerDetailsDao();
											List cList = cdd.getAllCustomerForBillingShopWise(request, response);
										%>
										<input list="cust_drop" id="creditCustomer"
											onchange="getBillByCustomer1()" required>
										<datalist id="cust_drop">
											<%
												for (int i = 0; i < cList.size(); i++) {
													CustomerDetailsBean cust = (CustomerDetailsBean) cList.get(i);
											%>
											<option data-value="<%=cust.getCustId()%>"
												value="<%=cust.getFirstName()%> <%=cust.getLastName()%>">
											</option>
											<%
												}
											%>
										</datalist>
										<label for="customerName">Customer Name</label> <input
											type="text" disabled="disabled" hidden="true" />
									</div>
								</div>

								<div class="col-md-1"></div>

								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport">
									<select id='billNo2' name="billNo2" onchange="getSaleItems1()">
									</select> <label for="bill_no"> Bill No</label>
									<h3 align="center"
										style="color: red;font-weight: bold; margin-top: -8%;">"Use
										Tab key for get Bill Information"</h3>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport">
									<textarea style="width: 100%;" id="reasonForSReturn3"
										name="reasonForSReturn3"></textarea>
									<label for="reasonForSReturn3">Reason </label>
								</div>
								</div>
								<div class="row">
							<!-------------------------------------------- grid -------------------------------------------------------------------------------------->

							<div class="invoice_grid_1">


								<div class="table-responsive">
									<table id="jqGrid1"></table>
									<div id="jqGridPager1"></div>
								</div>
							</div>

							<!-----------------------------------------------grid end  ------------------------------------------------------------------------------->

							 
							 <div class="invoice_button_allPaymentWithLeftTabs">
								<div class="row">	
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport" align="left">
										<input type="button" value="Submit" id="btn"
											onclick="valSaleReturn1()"
											class="btn btn-large btn-success btn-md"
											style="width:124px;padding: 10;" />
									</div>
									</div>
									</div>
								
	

							</div>
													</form>
					</div>
				</div>
			</div>
		</div>

		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>