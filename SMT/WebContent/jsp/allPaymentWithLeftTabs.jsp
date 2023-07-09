<%@page import="com.smt.hibernate.BankDetailsH"%>
<%@page import="com.smt.dao.BankDetailsDao"%>
<%@page import="com.smt.hibernate.SaleReturn"%>
<%@page import="com.smt.dao.SaleReturnDao"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.smt.bean.allTransactionId"%>
<%@page import="com.smt.dao.CustomerPaymentDao"%>
<%@page import="com.smt.dao.SupplierPaymentDao"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.ExpenditureDetailsDao"%>
<%@page import="com.smt.hibernate.ExpenditureDetailsBean"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="/SMT/staticContent/css/tabDemo.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/cashbankbook.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/sale_return.js"></script>
<style>
.left-tab-new
{
	width: 192px;
	background: #ba0707;
	color: white;
	border-radius: 0px;
}
</style>

	<%
	 	Long transactionIdSupp = 1l;
		SupplierPaymentDao data = new SupplierPaymentDao();
		List trIdListSupp = data.getLastTransactionNo();
		for(int i=0;i<trIdListSupp.size();i++)
		{
			allTransactionId st = (allTransactionId)trIdListSupp.get(i);
			transactionIdSupp = st.getSuppTransactionId();
			transactionIdSupp++;
		}      
     %>
     
     <%
	 	Long transactionIdCust = 1l;
		CustomerPaymentDao data2 = new CustomerPaymentDao();
		List trIdListCust = data2.getCustPayLastTransactionNo();
		for(int i=0;i<trIdListCust.size();i++)
		{
			allTransactionId st = (allTransactionId)trIdListCust.get(i);
			transactionIdCust = st.getCustTransactionId();
			transactionIdCust++;
			System.out.println("transactionIdCust ====> 12313213 "+transactionIdCust);
		}      
     %>
     
     <%
	 	Long transactionIdEmp = 1l;
		EmployeeDetailsDao data3 = new EmployeeDetailsDao();
		List trIdListEmp  = data3.getEmpLastTransactionNo();
		for(int i=0;i<trIdListEmp.size();i++)
		{
			allTransactionId st = (allTransactionId)trIdListEmp.get(i);
			transactionIdEmp = st.getEmpTransactionId();
			transactionIdEmp++;
		}      
     %>
     
     <%
	 	Long transactionIdExp = 1l;
		ExpenditureDetailsDao data4 = new ExpenditureDetailsDao();
		List trIdListExp  = data4.getExpenditureLastTransactionNo();
		for(int i=0;i<trIdListExp.size();i++)
		{
			allTransactionId st = (allTransactionId)trIdListExp.get(i);
			transactionIdExp = st.getExpTransactionId();
			transactionIdExp++;
		}      
     %>
     
      <%
	 	Long transactionIdBank = 1l;
		BankDetailsDao data5 = new BankDetailsDao();
		List trIdListBank = data5.getLastBankTransactionId();
		for(int i=0;i<trIdListBank.size();i++)
		{
			allTransactionId st = (allTransactionId)trIdListBank.get(i);
			transactionIdBank = st.getBankPaymentTransactoinId();
			transactionIdBank++;
		}      
     %>
     
     <%
     	String pattern = "yyyy-MM-dd";
	  	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
	  	String todayDate = simpleDateFormat.format(new Date());
	  	System.out.println(todayDate);
	%>


<script type="text/javascript">

function myAlertCB(msg)
{
	var dialog = bootbox.dialog({
    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
    closeButton: false
   });

   setTimeout(function() {
	dialog.modal('hide');
   }, 1500);
}


function cheakForAvailableExpd()
{
    <%ExpenditureDetailsDao expdDao = new ExpenditureDetailsDao();
			List expList = expdDao.getAllExpenseName();%>
	var expenseName = $('#expenseName').val();
	var UpExpenseName = expenseName.toUpperCase();
	var duplicate;
	<%for (int i = 0; i < expList.size(); i++)
	{
		ExpenditureDetailsBean expbean = (ExpenditureDetailsBean) expList.get(i);%>
	
    	var value ="<%=expbean.getExpenseName()%>";
		var UpValue = value.toUpperCase();

		if (UpExpenseName == UpValue)
		{
			duplicate = "found";
		}
<%}%>
	if (duplicate == "found")
	{
		expensePaymentValidation();
	}
	else
	{
		document.exp.save.disabled = true;
		myAlertCB("Please Register Expenditure Name");
		document.exp.reset();
		document.exp.save.disabled = false;
		return false;
	}
}

function cheakForValidTransactionId()
{
    <%
    SaleReturnDao saleRDao = new SaleReturnDao();
	List saleReturnList = saleRDao.getAllTransactionId();%>
	var sRTransactionId = $('#sRTransactionId').val();
	if(sRTransactionId == null || sRTransactionId == "" || sRTransactionId == undefined || sRTransactionId == " ")
	{
		myAlertCB("Please Enter Transaction Id");
		return false;		
	}
	else
	{
		var duplicate;
		<%for (int i = 0; i < saleReturnList.size(); i++)
		{
			SaleReturn saleRBean = (SaleReturn) saleReturnList.get(i);%>
		
	    	var dbSRTvalue ="<%=saleRBean.getTransactionId()%>";
			
			if (dbSRTvalue == sRTransactionId)
			{
				duplicate = "found";
			}
	<%}%>
		if(duplicate == "found")
		{
			validateCreditNoteTrId();
		}
		else
		{
			document.creditNote.save.disabled = true;
			myAlertCB("Invalid Transaction Id");
			document.creditNote.reset();
			document.creditNote.save.disabled = false;
			return false;
		}
	}
}	
</script>
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
    z-index:-1;
    opacity: 0.6;
 }
 #taxcol{
     width: 33%;
/*     margin-left: -4%; */
 }
 .table-responsive {
    min-height: .01%;
    overflow-x: auto;
    /* width: 90%; */
    margin-left: 25px;
    margin-top: 1%;
    margin-bottom: 0%;
}
/* span{
	color: red;
    float: left;
    margin-top: -24px;
    position: absolute;
    margin-left: 67px;
    font-size:20px;
	} */
.nav-tabs {
    border-bottom: none;
}
.Finance {
    margin-top: 30px;
    /* align-items: center; */
    /* text-align: center !important; */
}
.Finance a {
    border-radius: 10px !important;
    /* color: #fff; */
    padding: 10px;
    width: 90%;
    /* text-align: center !important; */
    border: none !important;
    font-size: 16px;
    display: inline-block !important;
    height: 62px;
    font-weight: 700;
    background-color: #087cea85;
}
.Finance .nav-tabs li a:hover, .Finance .nav-tabs li a:active {
	background-color: #087cea !important;
	color: #fff !important;
}
.Finance li {
    /* margin-bottom: -1px; */
    /* display: inline-block; */
    margin: 10px;
    width: 15%;
    float: none !important;
}
.Finance ul {
    margin-bottom: 0;
    list-style: none;
    justify-content: space-around;
    display: flex;
    /* display: inline-block; */
    text-align: center !important;
}
.transpan {
    font-size: 20px;
    color: red;
    padding: 15px;
}
.tran {
    margin-left: 20px;
}
#categorylisth2 {
    margin-top: 20px;
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
/* span{
	color: red;
    float: left;
    margin-top: 0;
    position: absolute;
    margin-left: 19px;
    font-size:17px;
	} */
.Finance a {
    width: 86%;
    height: auto;
}
.Finance li {
    /* margin-bottom: -1px; */
    display: inline-block;
    margin: 10px;
    width: 20%;
    float: none !important;
}
.Finance ul {
    display: inline-block;
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
/* span{
	color: red;
    float: left;
    margin-top: 0;
    position: absolute;
    margin-left: 19px;
    font-size:17px;
	} */
.Finance li {
    /* margin-bottom: -1px; */
    /* display: inline-block; */
    /* margin: 10px; */
    width: 47%;
    float: left !important;
    display: flex;
    justify-content: center;
}
.Finance a {
    width: 80% !important;
    height: auto;
    /* margin: 5px 10px; */
    /* display: inline-block !important; */
}
.Finance ul {
    /* display: flex; */
    display: inline-block;
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
    top: -7%;
    right: 2%;
    z-index: -1;
    opacity: 0.6;
}
.table-responsive {
		width: 100%;
		overflow-y: hidden;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		border: none;
		margin-bottom: 0%;
		margin-left: 6px;
	}
	/* span{
	color: red;
    float: left;
    margin-top: 0;
    position: absolute;
    margin-left: 19px;
    font-size:17px;
	} */
	
.Finance {
    margin-top: 45px;
}
.Finance a {
    width: 95%;
    margin: 5px !important;
    height: auto;
}
.Finance li {
    /* margin-bottom: -1px; */
    /* display: inline-block; */
    margin: 0px;
    width: 50%;
    float: left !important;
}
.Finance ul {
    display: inline-block;
}
}
@media screen and (max-width: 580px) {
.Finance a {
    width: 100%;
    /* margin: 5px !important; */
    font-size: 14px;
}
.Finance li {
    /* margin-bottom: -1px; */
    /* display: inline-block; */
    margin: 0px;
    width: 50%;
    float: left !important;
    display: flex;
    height: 70px;
    justify-content: center;
}	
}
@media screen and (max-width: 480px) {
.Finance a {
    width: 95%;
    height: auto;
}
.suppliertranlast {
	margin-top: 25px;
}
}
</style>
<body class="vColor">
	<div class="container-fluid">
		<div class="" style="">
			<div class="">
				<!-- <hr /> -->
				<div class="" style="">
					<!-- required for floating -->
					<!-- Nav tabs -->
					<div class="Finance">
					<ul class="nav nav-tabs">
						<li id="li" class="active"><a href="#home" data-toggle="tab" class="left-tab-new">Supplier Transaction</a></li>
						<li id="li"><a href="#profile" data-toggle="tab" class="left-tab-new">Credit Customer Transaction</a></li>
						<li id="li"><a href="#creditNoteGeneration" data-toggle="tab" class="left-tab-new">Credit Note Generation</a></li>
						<li id="li"><a href="#messages" data-toggle="tab" class="left-tab-new">Employee Transaction</a></li>
						<li id="li"><a href="#settings" data-toggle="tab" class="left-tab-new">Expenditure Transaction</a></li>
						<li id="li"><a href="#bankBook" data-toggle="tab" class="left-tab-new">Bank Transaction (BankBook)</a></li>
					</ul>
					</div>
				</div>
				<div class="" id="">
					<!-- Tab panes -->
					<div class="tab-content">

<!-------------------------------------------------- Supplier Transaction Starts Here -------------------------------------------------->													
						<div class="tab-pane fade in active" id="home">

	                          	<div class="row">
									
									<div align="center" id="categorylisth2">																	
										<h2 class="form-name style_heading">Supplier Transaction </h2>										
									</div>
									
									<div class="row">
									<div class="tran">
									<span class="transpan">
												Transaction Id: <%=transactionIdSupp%></span>
									</div>
									</div>

									<div class="">
										<div class="col-md-12" align="center">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>
								</div>
						<div class="miscellaneous" style="left:0 ;">	
							<form class="form-horizontal" method="post" action="" name="spmt">
 						<div class="container" id="financemanagementtab">
								
									<div class="row">
								<div class="invoice_label_up ">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<%
												SupplierDetailDao sdd = new SupplierDetailDao();
												List sList = sdd.getAllSupplierForCashBook(request, response);
												//List sList = sdd.getAllSupplier();
											%>
											<!-- <input list="sup_drop" id="supplier" onchange="bill.getAllBills(); bill.getTotalAmtByBills();" class="form-control"> -->
											<input list="sup_drop" id="supplier"
												onchange="bill.getAllBills();" required >
											<datalist id="sup_drop">
												<%
													for (int i = 0; i < sList.size(); i++) {
														SupplierDetail sup = (SupplierDetail) sList.get(i);
												%>
												<option data-value="<%=sup.getSupplierId()%>" value="<%=sup.getSupplierName()%>">
													<%
														}
													%>
												
											</datalist>
										<label for="supplier">Supplier Name<sup>*</sup></label>
										</div>
										</div>
								
									<div class="col-md-1"></div>
									
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									 <select id="billNo" name="billNo" type="text" required onchange="bill.getTotalAmtByBills()"  ></select>
									<label for="billNo">Select Bill No</label>
								
									
									</div>
										
										<!-- </div> -->
									
								

<!-- <div class="row"> -->
								<div class="invoice_label_up ">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<input type="date"
												id="suppPayDate" name="suppPayDate" value="<%=todayDate%>">
												<label for="suppPayDate">Date</label>
												</div>
									</div>
									
									<!-- <div class="col-md-1"></div> -->
									
										
									
								<!-- </div> -->


								<!-- <div class="row"> -->
								<div class="invoice_label_up ">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									 <input id="personname" name="personname" type="text" required>
									<label for="personname">Accountant Name </label>
								
									
									</div>
									</div>
									
									<!-- <div class="col-md-1"></div> -->
									
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											 <input readonly="readonly" id="totalAmount" name="totalAmount">
										     <label for="totalAmt">Total Amount</label>
										     </div>
									
								<!-- </div> -->

								<!-- <div class="row"> -->
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									
									       <select  id="paymentType">
												<!-- <option value="selected7">-Select Type--</option> -->
												<option value="credit">Credit</option>
												<option value="debit">Debit</option>
											</select>
											<label for="paymentMode">
										Payment Type<sup>*</sup></label>
									</div>	
									
                                <!-- <div class="col-md-1"></div> -->
                                
                              <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input
												type="text" readonly="readonly" id="balanceAmount"
												name="balanceAmount">
											<label for="balanceAmt">Balance Amount</label>
								</div>	
								</div>


								<div class="row">
									 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									 <select id="paymentMode">
												<option value="cash">Cash</option>
												<option value="cheque">Cheque</option>
												<option value="card">Card</option>
												<option value="neft">NEFT</option>
											</select>
									<label for="paymentMode"> Payment Mode<sup>*</sup></label>
									</div>
									<script>
										$(document)
												.ready(
														function() {
															$("#paymentMode")
																	.change(
																			function() {
																				$(
																						this)
																						.find(
																								"option:selected")
																						.each(
																								function() {
																									if ($(
																											this)
																											.attr(
																													"value") == "cheque") {
																										$(
																												"#cheque_no")
																												.show();
																										$(
																												"#neft_acc_no")
																												.hide();
																										$(
																												"#card_no")
																												.hide();
																									} else if ($(
																											this)
																											.attr(
																													"value") == "card") {
																										$(
																												"#card_no")
																												.show();
																										$(
																												"#neft_acc_no")
																												.hide();
																										$(
																												"#cheque_no")
																												.hide();
																									} else if ($(
																											this)
																											.attr(
																													"value") == "neft") {
																										$(
																												"#neft_acc_no")
																												.show();
																										$(
																												"#card_no")
																												.hide();
																										$(
																												"#cheque_no")
																												.hide();
																									} else if ($(
																											this)
																											.attr(
																													"value") == "cash") {
																										$(
																												"#neft_acc_no")
																												.hide();
																										$(
																												"#cheque_no")
																												.hide();
																										$(
																												"#card_no")
																												.hide();
																									}
																								});
																			})
																	.change();
														});
									</script>
                             
									<div class="col-md-1"></div>
									
									<div class="invoice_label_up ">
										 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											 <input type="text" id="supPay" name="supPay" required>
											 <label for="supPay">Payment
										Amount</label>
										</div>
									</div>
									  </div>
									
									<div class="row">
									<div class="col-lg-12">
										<div id="cheque_no" style="display: contents;">
										
										
										
										<div class="row">
										<div class="invoice_label_up ">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
										
												<input  type="text" name="chequeNum"
													id="chequeNum" required/>
													<label>Cheque No</label>
											
											</div>
										</div>
										
											<div class="col-md-1"></div>
											
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<div class="invoice_label_up ">
												<input type="text" name="nameOnCheck"
													id="nameOnCheck" required/>
													<label>Name on Cheque</label>
									          </div>
										  </div>
											
											</div>
										</div>
											
										<div class="row">
										<div id="card_no" style="display: contents;">
										<div class="invoice_label_up ">
												<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
												<input type="text" name="cardNum"
													id="cardNum" required />
										          <label>Card No</label>
										          </div>
										          </div>
										</div>
                                        </div>  
                                         
                                          
										<div id="neft_acc_no" class="form-group" style="display: contents;">
										<div class="row">
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<div class="invoice_label_up ">
												<input type="text" name="accNum"
													id="accNum" required/>
											<label>Account No</label>
											</div>
											</div>
											
											 <div class="col-md-1"></div>
											 
											<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<div class="invoice_label_up ">
												<input type="text" name="bankName"
													id="bankName" required/>
											<label>Name Of Bank</label>
											</div>
											</div>
										</div>
										</div>
										</div>
									</div>

									<div class="row">
										 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
										
												<textarea style="width: 100%;"
													id="supPaymentDescription" name="supPaymentDescription"></textarea>
										
									<label for="description">Description</label>
									</div>
                                <div class="col-md-1"></div>
                                
										<div class="invoice_label_up ">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 suppliertranlast" id="dayreport">
												 <input
													type="text" id="receiptNo" name="receiptNo" required>
													<label for="receiptNo">Receipt No</label>
											
											</div>
											</div>
											
										
									</div>
									
									<div class="invoice_button_allPaymentWithLeftTabs">	
									
									
								<div class="row" id="btnrow">
									<div class="invoice_button">
								<!-- <div class="col-lg-2" style="display: inline-block;"> -->
										<input type="button" id="btn1" name="btn1"
											class="btn btn-large btn-success button-height-width btnwidth"
											onclick="supplierPayment(); return false;"
											value="Submit">
									<!-- </div> -->
									
										<!-- <div class="col-lg-2" style="display: inline-block;"> -->	
											<input type="reset" id="btn1r"
											class="btn btn-large btn-danger button-height-width btnwidth"
											name="btn1r" value="Cancel">
										<!-- </div> -->
										</div>
									</div>
									</div>
								
                          <!--  <div class="invoice_button_allPaymentWithLeftTabs">	
								<div class="row col-lg-offset-3">
								<div class="col-lg-2" style="display: inline-block;">
									
										<input type="button" id="btn1" name="btn1" class="btn btn-large btn-success" onclick="supplierPayment(); return false;" value="Submit">
								</div>
											<div class="col-lg-2" style="display: inline-block;">
										<input type="reset" id="btn1"
											class="btn btn-large btn-danger"
											name="btn1" value="Cancel">
											</div>
									
								</div>
								</div> -->
								</div>
							</form>
							</div>
						</div>
<!-------------------------------------------------- Supplier Transaction Ends Here -------------------------------------------------->
	
<!---------------------------------------- Credit Customer Transaction Starts Here --------------------------------------------->

						<div class="tab-pane" id="profile">
						
								<div class="row">
									
									<div align="center" id="categorylisth2">
										<h2 class="form-name style_heading">Credit Customer Transaction</h2>
											</div>
									<div class="row">
									<div class="tran">
									<span class="transpan">
											
												Transaction Id: <%=transactionIdCust%></span>
										</div>
									</div>		

									<div class="">
										<div class="col-md-12" align="center">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>
								</div>
						<div class="miscellaneous" style="left: 0% ;">	
							<form class="form-horizontal" method="post" action="" name="cust">
							<div class="container" id="financemanagementtab">
                                <div class="row">
								<div class="invoice_label_up ">
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								
											<%
												CustomerDetailsDao cdd = new CustomerDetailsDao();
												List cList = cdd.getAllCustomerShopWise(request, response);
											%>
											<!-- <input list="cust_drop" id="creditCustomer"  class="form-control"  onchange="getBillByCustomer(); getTotalAmountByBill();"> -->
											<input list="cust_drop" id="creditCustomer"
												 onchange="getBillByCustomer();" required>
											<datalist id="cust_drop">
												<%
													for (int i = 0; i < cList.size(); i++) {
														CustomerDetailsBean cust = (CustomerDetailsBean) cList.get(i);
												%>
												<option data-value="<%=cust.getCustId()%>"><%=cust.getCustId()%>
													<%=cust.getFirstName()%>
													<%=cust.getLastName()%>
												</option>
												<%
													}
												%>
											</datalist>
										   <label for="customerName">Customer Name<sup>*</sup></label>
										   </div>
										  </div>
										  
									<!-- <div class="col-md-1"></div> -->
									
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									 <select id="billNo1" name="billNo" type="text" required onchange="getTotalAmountByBill()"  ></select>
										<label for="billNo1">Select Bill No</label>
								
									
									</div>
									 
									
								 <!-- </div> -->
<!-- <div class="row"> -->
								<div class="invoice_label_up ">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<input type="date"
												id="ccPayDate" name="ccPayDate" value="<%=todayDate%>">
												<label for="ccPayDate">Date</label>
												</div>
									</div>
									
									<!-- <div class="col-md-1"></div> -->
									
										
									
								<!-- </div> -->
									
								
								<!-- <div class="row"> -->
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									<div class="invoice_label_up ">
									 <input id="personname1" name="personname" type="text" required>
									 <label for="personname">Accountant Name </label>
									 </div>
									 </div>
										<!-- <div class="col-md-1"></div> -->
										
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">			
							        <input readonly="readonly" id="totalAmount1" name="totalAmount1">
							        <label for="totalAmount1">Total Amount</label>
							        </div>
										
					           </div>

								<div class="row">

									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">		
									<select id="paymentType1">
												<!-- <option value="selected">-Select Type--</option> -->
												<option value="credit">Credit</option>
												<option value="debit">Debit</option>
											</select>
											<label for="paymentMode">Payment Type<sup>*</sup></label>
									</div>
									
                               <div class="col-md-1"></div>
									
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
										<input readonly="readonly" id="balanceAmount1" name="balanceAmount1">
										<label for="balanceAmount1">Balance Amount</label>									
							    </div>										
									
								</div>
								<div class="row form-group">

									<script>
										$(document)
												.ready(
														function() {
															$("#paymentMode1")
																	.change(
																			function() {
																				$(
																						this)
																						.find(
																								"option:selected")
																						.each(
																								function() {
																									if ($(
																											this)
																											.attr(
																													"value") == "cheque") {
																										$(
																												"#cheque_no1")
																												.show();
																										$(
																												"#neft_acc_no1")
																												.hide();
																										$(
																												"#card_no1")
																												.hide();
																									} else if ($(
																											this)
																											.attr(
																													"value") == "card") {
																										$(
																												"#card_no1")
																												.show();
																										$(
																												"#neft_acc_no1")
																												.hide();
																										$(
																												"#cheque_no1")
																												.hide();
																									} else if ($(
																											this)
																											.attr(
																													"value") == "neft") {
																										$(
																												"#neft_acc_no1")
																												.show();
																										$(
																												"#card_no1")
																												.hide();
																										$(
																												"#cheque_no1")
																												.hide();
																									} else if ($(
																											this)
																											.attr(
																													"value") == "cash") {
																										$(
																												"#neft_acc_no1")
																												.hide();
																										$(
																												"#cheque_no1")
																												.hide();
																										$(
																												"#card_no1")
																												.hide();
																									}
																								});
																			})
																	.change();
														});
									</script>
								</div>
								<div class="row">
                                 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									<label for="paymentMode">Payment Mode<sup>*</sup></label>
									<select id="paymentMode1">
												<option value="cash">Cash</option>
												<option value="cheque">Cheque</option>
												<option value="card">Card</option>
												<option value="neft">NEFT</option>
											</select>
											</div>
									<div class="col-md-1"></div>
									
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
								 <div class="invoice_label_up ">
									 <input	type="text" id="custPay" name="custPay" required>
									 <label  for="custPay">Payment Amount</label>
									 </div>
									 </div>
							</div>
								<div class="row">
								<div class="col-lg-12">
								
									<div id="cheque_no1" style="display: contents;">
									<div class="row">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
										<div class="invoice_label_up ">
											<input type="text" name="chequeNum"
												id="chequeNum1" required/>
												 <label>Cheque No</label>
												 </div>
								</div>
								
								<div class="col-md-1"></div>
																		
									     <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									     <div class="invoice_label_up ">
											<input type="text" name="nameOnCheck"
												id="nameOnCheck1" required/>
												 <label>Name on Cheque</label>
										 </div>
										
									</div>
									</div>
									</div>	
									<div class="row">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									<div id="card_no1" style="display: contents;">
									<div class="invoice_label_up ">
											<input type="text" name="cardNum"
												id="cardNum1" required/>
												 <label>Card No</label>
												 </div>
										
									</div>
									</div>
									</div>
									
									
								<div class="row">	
								<div id="neft_acc_no1" style="display: contents;">
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									
										<div class="invoice_label_up ">
											<input  type="text" name="accNum"
												id="accNum1" required/>
												 <label>Account No</label>
												 </div>
									</div>	
									<div class="col-md-1"></div>
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
										<div class="invoice_label_up ">
											<input type="text" name="bankName"
												id="bankName1" required/>
												 <label>Name Of Bank</label>
												 </div>
												 </div>
									</div>										
									</div>
									
								</div>
							</div>	

								<div class="row">									
									 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<textarea style="width: 100%;"
												id="creditCustPaymentDescription"
												name="creditCustPaymentDescription"></textarea>
												<label for="description">Description</label>								
									</div>

									<div class="col-md-1"></div>
									
									 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 suppliertranlast" id="dayreport">	
									 <div class="invoice_label_up ">
											<input type="text" id="creditReceiptNo" name="creditReceiptNo" required>
											<label for="receiptNo">Receipt No</label>
											</div>
										</div>
								</div>

								
									 <div class="invoice_button_allPaymentWithLeftTabs">	
									 
									 <!-- <div class="col-md-3"></div> -->
									 
								<div class="row" id="btnrow">
								<div class="invoice_button">
								<!-- <div class="col-lg-2" style="display: inline-block;"> -->
										<input type="button" id="btn2" name="btn2"
											class="btn btn-large btn-success button-height-width btnwidth"
											onclick="customerPaymentValidation(); return false;"
											value="Submit"> 
								<!-- </div> -->
											<!-- <div class="col-lg-2" style="display: inline-block;"> -->	
											<input type="reset" id="btn2"
											class="btn btn-large btn-danger button-height-width btnwidth"
											name="btn2" value="Cancel">
									<!-- </div> -->
									</div>
									</div>
									</div>
								</div>
							</form>
							</div>
						</div>
<!-------------------------------------------------- Credit Customer Transaction Ends Here -------------------------------------------------->						
						

<!------------------------------------------------------------------ CREDIT NOTE GENERATION Starts Here --------------------------------------------------------------------------->
									
						<div class="tab-pane" id="creditNoteGeneration">
								<div align="center" id="categorylisth2">
											<h2 class="form-name style_heading">Credit Note Generation</h2>
										</div>
	
										<div class="">
											<div class="col-md-12" align="center">
												<hr style="border-top-color: #c1b1b1;">
											</div>
										</div>
						   <div class="miscellaneous" style="left: 0% ;">	
							<form method="post" action="" name="creditNote">	
							<div class="container" id="financemanagementtab">						
								<div class="row">
							 <div class="invoice_label_up ">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-3" id="transid">	
										
												<input id="sRTransactionId" name="sRTransactionId" type="text" required/>
									         	<label for="sRTransactionId">Transaction Id<sup>*</sup></label>
									         	</div>
										
										<input type="text" hidden="true" readonly="readonly">
								</div>
								</div>						
									<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport"></div> -->
									 <div class="invoice_button_allPaymentWithLeftTabs">	
								<div class="row" id="btnrow">
								<div class="invoice_button">
								<!-- <div class="col-lg-2" style="display: inline-block;"> -->
										<input type="button" id="save" name="btn4"  class="btn btn-large btn-success button-height-width btnwidth" onclick="cheakForValidTransactionId(); return false;" value="Submit" style=" "/>
						<!-- </div> -->
							<!-- <div class="col-lg-2" style="display: inline-block;"> -->
								<input type="reset" id="btn2" class="btn btn-large btn-danger button-height-width btnwidth" name="btn4" value="Cancel" style=""/>
						<!-- </div> -->
						</div>
									</div>
							  </div>
							</div>	
							</form>
							
							</div>
						</div>	
<!-------------------------------------------------- Credit Note Generation Ends Here -------------------------------------------------->						
						
<!---------------------------------------------------------------- Employee Transaction Starts Here --------------------------------------------------------------------->
						
						<div class="tab-pane" id="messages">
						
							<div class="row">
									<div align="center" id="categorylisth2">
										<h2 class="form-name style_heading">
											Employee Transaction</h2>
											</div>
											<div class="row">
											<div class="tran">
									<span class="transpan">
											
												Transaction Id: <%=transactionIdEmp%></span>
										</div>
									</div>

									<div class="">
										<div class="col-md-12" align="center">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>
								</div>
								<div class="miscellaneous" style="left: 0% ;">	
							<form class="form-horizontal" method="post" action="" name="emp">
							<div class="container" id="financemanagementtab">
						
							
								<div class="row">
								 <div class="invoice_label_up ">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									
											<%
												EmployeeDetailsDao eedd = new EmployeeDetailsDao();
												List mList = eedd.getAllMainEmployeeShopWise(request, response);
											%>
											<input list="emp_drop" id="employee" required>
											<datalist id="emp_drop">
												<%
													for (int i = 0; i < mList.size(); i++) {
														EmployeeDetailsBean detailsBean = (EmployeeDetailsBean) mList.get(i);
												%>
												<option data-value="<%=detailsBean.getEmpId()%>"><%=detailsBean.getFirstName()%>
													<%=detailsBean.getLastName()%></option>
												<%
													}
												%>
											</datalist>
											<label for="employeename">Employee Name<sup>*</sup></label>
									</div>
									</div>
									
									<div class="col-md-1"></div>
									
                              <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									
									<input type="date" id="empPayDate" name="empPayDate" value="<%=todayDate%>" type="text">
									<label for="empPayDate">Date</label>
									</div>
										
								
								</div>
								
								<div class="row">
								 <div class="invoice_label_up ">
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input id="reason2" name="reason2" type="text" required>
									<label  for="reason2">Reason<sup>*</sup></label>
									</div>
								</div>
								
									
									<div class="col-md-1"></div>

								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									<select id="paymentMode2">
												<option value="cash">Cash</option>
												<option value="cheque">Cheque</option>
												<option value="card">Card</option>
												<option value="neft">NEFT</option>
											</select>
										<label for="paymentMode">Payment Mode<sup>*</sup></label>
									
								</div>
								<script>
									$(document)
											.ready(
													function() {
														$("#paymentMode2")
																.change(
																		function() {
																			$(
																					this)
																					.find(
																							"option:selected")
																					.each(
																							function() {
																								if ($(
																										this)
																										.attr(
																												"value") == "cheque") {
																									$(
																											"#cheque_no2")
																											.show();
																									$(
																											"#neft_acc_no2")
																											.hide();
																									$(
																											"#card_no2")
																											.hide();
																								} else if ($(
																										this)
																										.attr(
																												"value") == "card") {
																									$(
																											"#card_no2")
																											.show();
																									$(
																											"#neft_acc_no2")
																											.hide();
																									$(
																											"#cheque_no2")
																											.hide();
																								} else if ($(
																										this)
																										.attr(
																												"value") == "neft") {
																									$(
																											"#neft_acc_no2")
																											.show();
																									$(
																											"#card_no2")
																											.hide();
																									$(
																											"#cheque_no2")
																											.hide();
																								} else if ($(
																										this)
																										.attr(
																												"value") == "cash") {
																									$(
																											"#neft_acc_no2")
																											.hide();
																									$(
																											"#cheque_no2")
																											.hide();
																									$(
																											"#card_no2")
																											.hide();
																								}
																							});
																		})
																.change();
													});
								</script>
								</div>
								<div class="row">
									 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									
									<select id="paymentType2">
												<!-- <option value="selected">-Select Type--</option> -->
												<option value="credit">Credit</option>
												<option value="debit">Debit</option>

											</select>
											<label for="paymentMode">Payment Type<sup>*</sup></label>
											</div>
										<div class="col-md-1"></div>
									 
									 <div class="invoice_label_up ">
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
										
										 <input
												id="empPay" name="empPay" required>
												<label>Enter Amt</label>
									</div>		
							</div>
										
									
								</div>
							<div class="row">
								<div class="col-lg-12">
									<div id="cheque_no2">
										<div class="row">
										 <div class="invoice_label_up ">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<input  type="text" name="chequeNum"
												id="chequeNum2" required/>
										    <label>Cheque No</label>
										</div>
										</div>
										
										<div class="col-md-1"></div>
										
										 <div class="invoice_label_up ">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<input type="text" name="nameOnCheck"
												id="nameOnCheck2" required/>
										    <label>Name on Cheque</label>
									
									</div>
									</div>
									</div>
									</div>
									
									
									<div id="card_no2">
										<div class="row">
										 <div class="invoice_label_up ">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<input type="text" name="cardNum"
												id="cardNum2" required/>
												<label>Card No</label>
										</div>
										</div>
										</div>
									</div>
									
									
									
								<div id="neft_acc_no2">
									<div class="row">
									 <div class="invoice_label_up ">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<input type="text" name="accNum"
												id="accNum2" required/>
										   <label>Account No</label>
										 </div>  
									</div>	 
										 <div class="col-md-1"></div>
										 
										 
										  <div class="invoice_label_up ">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<input type="text" name="bankName"
												id="bankName2" required/>
												<label>Name Of Bank</label>
								     	</div>
								     	</div>
									
									</div>
								</div>
								</div>
								</div>
								
								
								<div class="row">
								 <div class="invoice_label_up ">
									 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
									 <input id="personName2" name="personName" type="text" required>
												<label for="personName">Accountant Name </label>
										</div>		
										</div>
							   </div>
								
								<!-- <div class="col-lg-3"></div> -->
									 <div class="invoice_button_allPaymentWithLeftTabs">	
								<div class="row" id="btnrow">
								<div class="invoice_button">								
								<!-- <div class="col-lg-2" style="display: inline-block;"> -->
										<input type="button" id="btn3" name="btn3"
											class="btn btn-large btn-success button-height-width btnwidth"
									onclick="EmployeeValidation(); return false;" value="Submit">
									<!-- </div> -->			
									
									<!-- <div class="col-lg-2" style="display: inline-block;"> -->	
										<input type="reset" id="btn2"
											class="btn btn-large btn-danger button-height-width btnwidth"
											name="btn2" value="Cancel">
											<!-- </div> -->
											</div>
									
								</div>
								</div>
								</div>
							</form>
							</div>
						</div>
<!-------------------------------------------------- Employee Transaction Ends Here -------------------------------------------------->						
						
<!--------------------------------------------------Expenditure Transaction Starts Here ----------------------------------------------------->
						<div class="tab-pane" id="settings">
						
								<div class="row">
									<div align="center" id="categorylisth2">
										<h2 class="form-name style_heading">Expenditure Transaction
										
										</h2>
									</div>
									<div class="row">
									<div class="tran">
									<span class="transpan">
										Transaction Id: <%=transactionIdEmp%></span>
									</div>
									</div>
									<div class="">
										<div class="col-md-12" align="center">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>
								</div>
						<div class="miscellaneous" style="left: 0% ;">	
							<form method="post" action="" name="exp">
							<div class="container" id="financemanagementtab">
							<div class="row">
							<div class="nvoice_label_up ">
					 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<%
									ExpenditureDetailsDao exdd = new ExpenditureDetailsDao();
									List exList = exdd.getAllExpenseName();
								%>
								<input list="exp_drop" id="expenseName" onchange="getExpenseType();" required>
								<datalist id="exp_drop">
									<%
										for (int i = 0; i < exList.size(); i++)
										{
											ExpenditureDetailsBean expbean = (ExpenditureDetailsBean) exList.get(i);
									%>
									<option data-value="<%=expbean.getPkExpenseDetailsId()%>"
										value="<%=expbean.getExpenseName()%>">
									<%
										}
									%>												
								</datalist>
										<label for="expenditureName">Expenditure Name<sup>*</sup></label>
									</div>	
									</div>
								
								<div class="col-md-1"></div>
								
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
								 <input type="date" id="expdDate" name="expdDate" value="<%=todayDate%>" >
								<label for="expdDate">Date<sup>*</sup></label>
								</div>
							</div>		
								
							<div class="row">
								
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">		
									<select id="expenseTypeId" readonly="readonly"></select>
									<label for="expenseTypeId">Expense Type<sup>*</sup></label>
								</div>	
							
								
							<div class="col-md-1"></div>
									
							 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<select  id="paymentTypeExpd">
											<!-- <option value="selected7">-Select Type--</option> -->
											<option value="credit">Credit</option>
											<option value="debit">Debit</option>
										</select>
								<label for="paymentTypeExpd">Payment Type<sup>*</sup></label>
						   </div>
							</div>

								<div class="row">
								<div class="invoice_label_up ">	
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">		
								
									 <input id="serviceProvider" name="serviceProvider" type="text" required>
									 <label for="serviceProvider">Service Provider<sup>*</sup></label>
									 </div>
									 </div>
									
							<div class="col-md-1"></div>
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
										<input id="crDbAmount" name="crDbAmount" placeholder="Amount" type="text" value="0">
										<label  for="crDbAmount">Amount<sup>*</sup></label>
									</div>
							   </div>
								
								<div class="row">
								<div class="invoice_label_up ">	
								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">		
									 <input id="accountantName" name="personName" type="text" required>
									 <label for="personName">Accountant Name </label>
								 </div>
									</div>
								
								<div class="col-md-1"></div>
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<!-- <div class="invoice_label_up ">	
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport"> -->
									<input id="contactNumber" name="contactNumber" type="text" maxlength="10" required>
									<label for="contactNumber">Contact Number<sup>*</sup></label>
								</div>	
								</div>
								
<!-- 								<div class="col-lg-3"></div> -->
									 <div class="invoice_button_allPaymentWithLeftTabs">	
								<div class="row" id="btnrow">
								<div class="invoice_button">
									<!-- <div class="col-lg-2" style="display: inline-block;"> -->
										<input type="button" id="save" name="btn4"  class="btn btn-large btn-success button-height-width btnwidth" onclick="cheakForAvailableExpd(); return false;" value="Submit"/>
									<!-- </div> -->
									
									<!-- <div class="col-lg-2" style="display: inline-block;"> -->
										<input type="reset" id="btn2"  class="btn btn-large btn-danger button-height-width btnwidth" name="btn4" value="Cancel"/>
									<!-- </div> -->
									</div>
							</div>
							</div>
							</div>
							</form>
						</div>
						</div>
<!------------------------------------------------ /EXPENDITURE TRANSACTION Ends Here ----------------------------------->
						
						
<!-------------------------------------------------- BANKBOOK Transaction (BankBook) Starts Here -------------------------------------------------->
						
						<div class="tab-pane" id="bankBook">
						
								<div class="row">
									<div align="center" id="categorylisth2">
										<h2 class="form-name style_heading" align="center">Bank Transaction (BankBook)
																				</h2>
									</div>
	<div class="row">
	<div class="tran">
									<span class="transpan">
											Transaction Id: <%=transactionIdEmp%></span>
										</div>
									</div>
									<div class="">
										<div class="col-md-12" align="center">
											<hr style="border-top-color: #c1b1b1;">
										</div>
									</div>
								</div>
						<div class="miscellaneous" style="left: 0% ;">	
							<form method="post" name="bank">
							<div class="container" id="financemanagementtab">
							<div class="row">
							<div class="invoice_label_up ">
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
											<%
												BankDetailsDao bankObj = new BankDetailsDao();
												List bankList = bankObj.getAllBankNameShopWise(request, response);
											%>
											<input list="bank_dropBB" id="bankNameBB" onchange="getBankTransactionDetails();" required>
											<datalist id="bank_dropBB">
												<%
													for (int i = 0; i < bankList.size(); i++)
													{
														BankDetailsH bankBean = (BankDetailsH) bankList.get(i);
												%>
												<option data-value="<%=bankBean.getPkBankId()%>" value="<%=bankBean.getBankName()%>">
												<%
													}
												%>												
											</datalist>
												<label for="expenditureName">Bank Name<sup>*</sup></label>
									</div>	
								</div>
								
								<div class="col-md-1"></div>
								
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
								 <input type="date" id="bankTrDate" name="bankTrDate" value="<%=todayDate%>" >
								<label for="bankTrDate">Date<sup>*</sup></label>
								</div>
								
							</div>		
								
							<div class="row">
							<div class="invoice_label_up ">	
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">		
									<input id="bankTrContactNumber" name="bankTrContactNumber" type="text" maxlength="10" required>
									<label for="bankTrContactNumber">Contact Number</label>
								</div>	
								</div>	
									<div class="col-md-1"></div>
									
								 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
									<select  id="paymentTypeBankTr">
												<!-- <option value="selected7">-Select Type--</option> -->
												<option value="credit">Credit</option>
												<option value="debit">Debit</option>
											</select>
									<label for="paymentMode">Payment Type<sup>*</sup></label>
							   </div>
							</div>

							<div class="row">
								<div class="invoice_label_up ">
								 	<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
										 <input id="bankTrAccountantName" name="bankTrAccountantName" type="text" required>
									 	<label for="bankTrAccountantName">Accountant Name<sup>*</sup></label>
									 </div>
								</div>
							<div class="col-md-1"></div>
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">		
										<input id="crDbBankTrAmount" name="crDbBankTrAmount" placeholder="Amount" type="text" value="0">
										<label for="crDbBankTrAmount">Amount<sup>*</sup></label>
									</div>
							   </div>
							   
							   <div class="row" hidden="true">
									<div class="invoice_label_up">
									 	<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
											 <input id="totalAmountBank" name="totalAmountBank" type="text" required readonly="readonly">
										 	<label for="bankTrAccountantName">Total Amount<sup>*</sup></label>
										 </div>
									</div>
							   </div>

								<!-- <div class="col-lg-3"></div> -->
									 <div class="invoice_button_allPaymentWithLeftTabs">	
								<div class="row" id="btnrow">
								<div class="invoice_button">
									<!-- <div class="col-lg-2" style="display: inline-block;"> -->
										<input type="button" id="bankSave" name="bankSave" class="btn btn-large btn-success button-height-width" onclick="validateRegbankTransaction();" value="Submit"/>
									<!-- </div> -->
									
									<!-- <div class="col-lg-2" style="display: inline-block;"> -->
										<input type="reset" id="bankBtn2" class="btn btn-large btn-danger button-height-width" name="bankBtn2" value="Cancel"/>
									<!-- </div> -->
									</div>
								</div>
							</div>
							</div>
							</form>
						</div>
						</div>
<!-------------------------------------------------- /BANKBOOK Transaction (BankBook) Ends Here ------------------------------------------------->

					</div>
				</div>
			</div>
		</div>
		
		<!-- footer -->
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
		<!--end footer  -->
	</div>
</body>
</html>
