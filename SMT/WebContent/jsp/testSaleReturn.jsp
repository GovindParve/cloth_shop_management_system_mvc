<%@page import="com.smt.bean.allTransactionId"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.dao.SaleReturnDao"%>
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
	top: 1%;
	right: 2%;
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
	/* margin-left: 25px; */
	margin-top: 1%;
	margin-bottom: 1%;
}

/* span {
	/* color: red; */
	margin-right: 10px;
	font-size: 16px;
} */
.col-md-2.col-md-offset-2.align {
    margin-top: 33;
    margin-left: 19%;
}
h3{
 font-size: 16px;
 }
.salereturn ul {
    border: none;
    display: flex;
    justify-content: center;
}
.salereturn a {
    outline: none !important;
    border: none !important;
    border-radius: 10px !important;
    color: #fff;
    background-color: #BA0707;
    font-size: 16px;
}
.salereturn li {
    width: 20%;
    text-align: center;
    margin: 10px;
}
.salereturn li a:hover {
    background-color: #fff !important;
    color: #555 !important;
}
tbody tr:hover {
    background: none !important;
    color: #000 !important;
}
.ui-jqgrid-jquery-ui.ui-jqgrid tr.footrow td {
/*     border-top-color: inherit;
    border-bottom-color: inherit; */
    text-align: center !important;
    background-color: #f0f0f0;
}
#categorydetailsh2 {
    margin-top: 0px;
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
    width: 100%;
    /* margin-left: 61px; */
    margin-top: 1%;
    margin-bottom: 0%;
}
.invoice_grid_1 {
    /* margin-left: -290px; */
    padding-top: 18px;
    width: 100%;
}
/* 	span {
		color: red;
		margin-right: 10px;
		font-size: 25px;
	} */
	.col-md-2.col-md-offset-2.align {
    margin-top: 33;
    margin-left: 26%;
}
.salereturn li {
    width: 22%;
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
/* 	.invoice_grid_1 {
		margin-left: -255px;
		padding-top: 18px;
		width: 139%;
	} */
/* 	span {
		color: red;
		margin-right: 10px;
		font-size: 23px;
		"
	} */
.salereturn li {
    width: 26%;
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
    /* margin-left: -170px; */
    padding-top: 18px;
    width: 100%;
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
/* 	span {
		color: red;
		margin-right: 10px;
		font-size: 20px;
	} */
.salereturn li {
    width: 28%;
    text-align: center;
    margin: 10px;
    /* display: inline-block; */
    display: flex;
}
.salereturn a {
    outline: none !important;
    border: none !important;
    border-radius: 10px !important;
    color: #fff;
    background-color: #BA0707;
    font-size: 14px;
    width: 100%;
    display: inline-block !important;
}
.salereturn ul {
    border: none;
    display: flex;
    justify-content: center;
    /* display: inline-block; */
    /* flex-wrap: wrap; */
    /* width: 92%; */
}
}

@media screen and (max-width: 480px) {
.salereturn a {
    outline: none !important;
    border: none !important;
    border-radius: 10px !important;
    color: #fff;
    background-color: #BA0707;
    font-size: 14px;
    width: 65%;
    display: inline-block !important;
}
.salereturn li {
    width: 100%;
    text-align: center;
    margin: 10px;
    /* display: inline-block; */
    display: flex;
    justify-content: center;
}
.salereturn ul {
    border: none;
    /* display: flex; */
    /* justify-content: center; */
    display: inline-block;
    /* flex-wrap: wrap; */
    /* width: 92%; */
}
}

.btnwidth {
	width:130px !important;
	padding: 10px !important;
}
</style>


<body class="vColor">
	<div class="container">
		<div class="row">
			<div class="" id="billheading" style="width: auto;">
			<div class="vouch">
				<span class="vouchspan">Transaction ID :: <%
					out.println(transactionId);
				%>
				</span> <input type="hidden" id="transactionIdSr" name="transactionIdSr"
					value="<%=transactionId%>">
					</div>
			</div>
			<div class="" align="center" id="categorydetailsh2">
				<h2 class="form-name style_heading">Sale Return</h2>
				<!-- <h3 style="color: red; font-size: 12px;">"Enter '00' in other Product Return Quantity"</h3> -->
			</div>
			
			<div class="row">
				<div class="col-md-12" align="center">
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

	<div class="salereturn">	
		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home2">Bill No Wise</a></li>
			<li><a data-toggle="tab" href="#home">Tax Invoice</a></li>
			<li><a data-toggle="tab" href="#mobileNoWise">Mobile No Wise</a></li>
			<li><a data-toggle="tab" href="#customerBill">Credit Customer Bill</a></li>
		</ul>
	</div>

		<div class="tab-content">

<!----------------------------------------------- Bill No Wise Starts Here --------------------------------------------------------->

			<div id="home2" class="tab-pane fade in active">
				<div class="row"></div>
				
				<div class="subheadingedit" align="center">
				<h2 class="form-name style_heading">Bill No Wise</h2>
			</div>

				<div class="miscellaneous" style="left: 0%;">
					<div class="" id="editbilltab">
						<form action="supplier" name="supbwsr" method="post" class="form-horizontal">

							<div class="row">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 size"
									id="dayreport">
									<!-- <h3 align="center" style="color: red; font-size: 12px;">"Use Tab key for get data"</h3> -->
									<input type="text" id="billNoBW" onfocusout="getSaleItems2()">
									<label for="billnowsr"> Bill No <sup style="color: red">*</sup></label>
									<h3 align="center" style="color: red;font-weight: bold; margin-top: -5%;">"Use
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
							
							<div class="row" style="padding-top: 30px">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="taxcol">
									<input type="text" id="returnGrossTotal" readonly="readonly" style="background-color: #fab787;" />
									<label class="newlabelback">Return Gross Total</label>
								</div>
								<div class="col-md-1"></div>
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="taxcol">
									<input type="text" id="grossTotalAmount" readonly="readonly" style="background-color: #fab787;" />
									<label class="newlabelback">Gross Total</label>
								</div>
							</div>
							
                             	<div class="invoice_button_allPaymentWithLeftTabs">
								<div class="row" id="btnrow">
									<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport" align="right"> -->
										<div class="invoice_button">
										<input type="button" value="Submit" id="btn" onclick="valSaleReturn2()"
											class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
									<!-- </div> -->
									</div>
								</div>
							</div>
							<!-- 	<div class="container-fluid" style="margin-left: 0px;"> -->
							
							<!-- </div> -->


						</form>
					</div>
				</div>
			</div>
<!----------------------------------------------- Bill No Wise Ends Here --------------------------------------------------------->

<!------------------------------------------ Tax Invoice Starts Here ----------------------------------------------------->
			<div id="home" class="tab-pane">
				<div class="row"></div>
				<div class="" id="editbilltab">
				
				<div class="subheadingedit" align="center">
				<h2 class="form-name style_heading">Tax Invoice</h2>
			</div>
								
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
										<label for="creditCustomer5">Customer Name<sup style="color: red">*</sup></label>
										 <input type="text" disabled="disabled" hidden="true" />
									</div>
								</div>


								<div class="col-md-1"></div>
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 size"
									id="dayreport">
									<select id='billNo' name="billNo" onchange="getSaleItems()">
									</select> <label for="bill_no"> Bill No:<sup style="color: red">*</sup> </label>
									<h3 align="center" style="color: red; font-weight: bold; margin-top: -5%;">"Use
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
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport" align="left">
									<input type="button" value="Submit" id="btn" onclick="valSaleReturn()"
										class="btn btn-large btn-success btn-md btnwidth" style="display:none;" />
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
								</div>
							
							<div class="row" style="padding-top: 30px">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="taxcol">
									<input type="text" id="returnGrossTotal2" readonly="readonly" style="background-color: #fab787;" />
									<label class="newlabelback">Return Gross Total</label>
								</div>
								<div class="col-md-1"></div>
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="taxcol">
									<input type="text" id="grossTotalAmount2" readonly="readonly" style="background-color: #fab787;" />
									<label class="newlabelback">Gross Total</label>
								</div>
							</div>
							<div class="row">
                         	<div class="invoice_button_allPaymentWithLeftTabs">
								<div class="row" id="btnrow">								
									<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport" align="left"> -->
									<div class="invoice_button">
										<input type="button" value="Submit" id="btn" onclick="valSaleReturn()"
											class="btn btn-large btn-success btn-md btnwidth" />
									</div>

										<!-- <input type="reset" value="Reset"   class="btn btn-large btn-danger btn-md button_hw button_margin_right"/> -->
									<!-- </div> -->
								</div>
								</div>
							</div>
						</form>

					</div>
				</div>
			</div>
<!----------------------------------------------- Tax Invoice Ends Here --------------------------------------------------------->
			
<!------------------------------------------ Mobile Number Wise Starts Here ----------------------------------------------------->			
			<div id="mobileNoWise" class="tab-pane">
				<div class="row"></div>
				<div class="" id="editbilltab">
				
				<div class="subheadingedit" align="center">
				<h2 class="form-name style_heading">Mobile Number Wise</h2>
			</div>
								
					<div class="miscellaneous" style="left: 0%;">
						<form action="supplier" name="mobileNoWise" method="post">

							<div class="row">
								<div class="invoice_label_up ">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
										id="dayreport">
										<%
										SaleReturnDao srDao = new SaleReturnDao();
											List mobNoList = srDao.getAllBillNoList(request, response);
										%>
										<input list="mobileNoList_Drop" id="mobileNo" onchange="getBillNoListByMobileNoForSaleReturnByMobileNo()" required>
										<datalist id="mobileNoList_Drop">
											<%
												for (int i = 0; i < mobNoList.size(); i++) {
													OtherBill bean = (OtherBill) mobNoList.get(i);
											%>
											<option data-value="<%=bean.getPkBillId()%>>"
												value="<%=bean.getContactNo()%>"></option>
											<%
												}
											%>
										</datalist>
										<label for="mobileNo">Select Mobile No<sup style="color: red">*</sup></label>
<!-- 										 <input type="text" disabled="disabled" hidden="true" /> -->
									</div>
								</div>

								<div class="col-md-1"></div>
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 size"
									id="dayreport">
									<select id='billNoMob' name="billNoMob" onchange="getSaleItemsGridForSaleReturnByMobileNo()">
									</select> <label for="bill_no"> Bill No:<sup style="color: red">*</sup> </label>
									<h3 align="center"
										style="color: red; font-weight: bold; margin-top: -5%;">"Use
										Tab key for get Bill Information"</h3>
								</div>
							</div>

							<div class="row">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport">
									<textarea style="width: 100%;" id="reasonForSReturn1Mob"
										name="reasonForSReturn1Mob"></textarea>
									<label for="reasonForSReturn1Mob">Reason </label>
								</div>
								<div class="col-md-1"></div>
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport" align="left">
										<input type="button" value="Submit" id="btn" onclick="valSaleReturn()"
											class="btn btn-large btn-success btn-md btnwidth" style="display:none;" />
										<!-- <input type="reset" value="Reset"   class="btn btn-large btn-danger btn-md button_hw button_margin_right"/> -->
									</div>
								</div>
								<div class="row">
								<div class="invoice_grid_1">
								<div class="table-responsive">
									<table id="jqGridForMobileNoWise"></table>
									<div id="jqGridPagerForMobileNoWise"></div>
								</div>
								</div>
								</div>
							<div class="row" style="padding-top: 30px">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="taxcol">
									<input type="text" id="returnGrossTotal3" readonly="readonly" style="background-color: #fab787;" />
									<label class="newlabelback">Return Gross Total</label>
								</div>
								<div class="col-md-1"></div>
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="taxcol">
									<input type="text" id="grossTotalAmount3" readonly="readonly" style="background-color: #fab787;" />
									<label class="newlabelback">Gross Total</label>
								</div>
							</div>
						<div class="row">
                          <div class="invoice_button_allPaymentWithLeftTabs">
								<div class="row" id="btnrow">								
									<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport" align="left"> -->
									<div class="invoice_button">
										<input type="button" value="Submit" id="btn" onclick="salReturnByMobNoValidation()"
											class="btn btn-large btn-success btn-md btnwidth" />
									</div>
										<!-- <input type="reset" value="Reset"   class="btn btn-large btn-danger btn-md button_hw button_margin_right"/> -->
									<!-- </div> -->
								</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
<!----------------------------------------------- Mobile Number Wise Ends Here --------------------------------------------------------->			

<!--------------------------------------------------------- Credit Customer Bill Starts Here --------------------------------------->
			<div id="customerBill" class="tab-pane ">
				<div class="row"></div>
				
				<div class="subheadingedit" align="center">
					<h2 class="form-name style_heading">Credit Customer Bill</h2>
				</div>

				<div class="miscellaneous" style="left: 0%;">
					<div class="" id="editbilltab">
						<form action="supplier" name="supd1" method="post"
							class="form-horizontal">
							<div class="row">
								<div class="invoice_label_up ">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
										id="dayreport">
									
										<%
											CustomerDetailsDao cdd = new CustomerDetailsDao();
											List<CustomerDetailsBean> cList = cdd.getAllCustomerForBillingShopWise(request, response);
										%>
										<input list="cust_drop" id="creditCustomer"
											onchange="getBillByCustomer1()" required>
										<datalist id="cust_drop">
											 <%
												System.out.println("cList.size() ===> "+cList.size());
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
										<label for="customerName">Customer Name <sup style="color: red">*</sup></label> <input
											type="text" disabled="disabled" hidden="true" />
									</div>
								</div>

								<div class="col-md-1"></div>

								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 size"
									id="dayreport">
									<select id='billNo2' name="billNo2" onchange="getSaleItems1()">
									</select> <label for="bill_no"> Bill No<sup style="color: red">*</sup></label>
									<h3 align="center"
										style="color: red;margin-top:-5%;font-weight:bold">"Use
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

<!-------------------------------------------- Grid Starts Here -------------------------------------------------------------------------------------->
							<div class="invoice_grid_1">
								<div class="table-responsive">
									<table id="jqGrid1"></table>
									<div id="jqGridPager1"></div>
								</div>
							</div>
<!----------------------------------------------- Grid Ends Here ------------------------------------------------------------------------------->

							 <div class="row" style="padding-top: 30px">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="taxcol">
									<input type="text" id="returnGrossTotal4" readonly="readonly" style="background-color: #fab787;" />
									<label class="newlabelback">Return Gross Total</label>
								</div>
								<div class="col-md-1"></div>
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="taxcol">
									<input type="text" id="grossTotalAmount4" readonly="readonly" style="background-color: #fab787;" />
									<label class="newlabelback">Gross Total</label>
								</div>
							</div>
							 
							 <div class="invoice_button_allPaymentWithLeftTabs">
								<div class="row" id="btnrow">
									<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="dayreport" align="left"> -->
									<div class="invoice_button">
										<input type="button" value="Submit" id="btn" onclick="valSaleReturn1()"
											class="btn btn-large btn-success btn-md btnwidth" />
									</div>
									<!-- </div>-->
									</div>
									</div>
							</div>
						</form>
					</div>
				</div>
			</div>
<!--------------------------------------------------------- Credit Customer Bill Ends Here --------------------------------------->			
			
		</div>

		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>