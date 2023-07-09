<%@page import="com.smt.bean.ProductNameBean"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%@page import="com.smt.hibernate.Stock"%>
<%@page import="com.smt.dao.StockDao"%>
<%@page import="com.smt.hibernate.OtherBill"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="java.util.List"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>


<%-- <!-- user id for cashiar accountant use -->

<% 
					 String type2= "";
                     String name2 = "";
		             if (session != null) {
			         if (session.getAttribute("user") != null) {
				     name2 = (String) session.getAttribute("user");
				     System.out.println(" hi this sis vikas Please Login +++++++++++++++++++++++++++++++"+name2);
		              HibernateUtility hbu1=HibernateUtility.getInstance();
		              Session session2=hbu1.getHibernateSession();
		   
		              org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
		              query1.setParameter("name2", name2);
		              UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
		              type2 = userDetail1.getTypeId();
		              System.out.println(" hi this sis vikas Please Login +++++++++++++++++++++++++++++++"+type2);
		              session.setAttribute("uType", type2);
					  Long uid = userDetail1.getPkUserId();
					  session.setAttribute("uId", uid);
					  System.out.println(" hi this sis vikas Please Login +++++++++++++++++++++++++++++++"+uid);
			         } 
			         else {
					     response.sendRedirect("/SMT/jsp/login.jsp");
					     out.println("Please Login ");
				        }
		           }
		             else {
					     response.sendRedirect("/SMT/jsp/login.jsp");
					     out.println("Please Login ");
				        }
 %> --%>
<%@page import="com.smt.helper.CarEntryHelper"%>
<%@page import="com.smt.hibernate.CarEntry"%>
<%@page import="com.smt.helper.OtherBillHelper"%>
<%@page import="com.smt.bean.BillBean"%>
<%@page import="com.smt.dao.OtherBillDao"%>
<%@page import="java.util.List"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Order Bill</title>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">

<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">

<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript"
	src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/js/otherOrder.js"></script>
<style type="text/css">
</style>
<script type="text/javascript">

/* function grasstotal()
{
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount1").value;
	var discountt = document.getElementById("discount").value;
	var regex = /^[0-9\b]+$/;
	
	if(discount.match(regex))
	{}
	else
	{
		myAlert("Enter valid Discount");
		document.getElementById("discount").value = "";
		document.getElementById("discount1").value = "";
		document.getElementById("grossTotal").value = total;
		return false;
	}
	
	if(Number(discount) >= 100)
	{
		alert("Discount % must be less than 100");
		document.getElementById("discount1").value = "";
		document.getElementById("discount").value = "";
		return false;
	}
	if(discount == "")
	{
		document.getElementById("discount").value = "";
		document.getElementById("discount").value = "";
		document.getElementById("grossTotal").value = total;
	}
	else
	{
	if(discount != "")
	{
		var gross1 = (+total * +discount)/ 100;
		var gross = +total - +gross1;
		
		document.getElementById("discount").value = gross1.toFixed(2);
		if(discount != "0")
		{
			document.getElementById("grossTotal").value = gross.toFixed(2);
		}
		else
		{
			document.getElementById("grossTotal").value = total;
		}
	}
	else
	{
		var gross = +total - +discountt;
		//var gross = +total - +gross1;
		
		//document.getElementById("discount").value = gross1;
		if(discount != "0")
		{
			document.getElementById("grossTotal").value = gross.toFixed(2);
		}else{
			document.getElementById("grossTotal").value = total;//.toFixed(2);
		}
		}
	}
} */

function taxAmountCalc()
{
	var total = document.getElementById("totalAmount").value;           
	var discount = document.getElementById("discount1").value;
	var discountt = document.getElementById("discount").value;
	var regex = /^[0-9\b]+$/;
	
	if(discountt.match(regex))
	{}
	else
	{
		myAlert("Enter valid Discount");
		document.getElementById("discount").value = "";
		document.getElementById("discount1").value = "";
		document.getElementById("grossTotal").value = total;
		return false;
	}
	
	if(Number(discountt) >= Number(total))
	{
		alert("Discount Amount must be less Than Total Amount");
		document.getElementById("discount1").value = "";
		document.getElementById("discount").value = "";
		return false;
	}
	
	if(discountt != "")
	{
		var disPer = ((discountt/total)*100);
		document.getElementById("discount1").value = disPer.toFixed(2);
		var gTotal = total - discountt;
		document.getElementById("grossTotal").value = gTotal;		
	}
	if(discountt == "")
	{
		document.getElementById("discount1").value = "";
		document.getElementById("grossTotal").value = total;		
	}
}


function isNumber(evt)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

</script>
<%
	Long BillNo = 1l;
%>
<%
	OtherBillDao data = new OtherBillDao();
	List stkList = data.getLastBillNo();
	for (int i = 0; i < stkList.size(); i++) {
		BillBean st = (BillBean) stkList.get(i);
		BillNo = Long.parseLong(st.getBillNo());
		BillNo++;
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

.table-responsive {
	min-height: .01%;
	overflow-x: auto;
	width: 100%;
	margin-left: 25px;
	margin-top: 0%;
	margin-bottom: 0%;
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
		right: 1%;
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
		right: 2%;
		z-index: -1;
		opacity: 0.6;
	}
	.table-responsive {
		width: 109%;
		overflow-y: hidden;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		border: none;
		margin-bottom: 3%;
		margin-left: 21px;
	}
}
</style>
</head>
<body class="purchase_form_img vColor"
	onload="getEmpName();">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-2 align" id="billheading">
				<span align="left"
					style="color: red; margin-right: 10px; font-size: 27px;">Bill
					No :: <%
					out.println(BillNo);
				%>
				</span> <input type="hidden" readonly="readonly" id="billNo" name="billNo"
					value=<%=BillNo%>> <input type="hidden" readonly="readonly"
					id="newBill" name="newBill" value="newBill">
			</div>
			<div class="col-md-4 col-md-offset-2 align" style="width: auto;" align="center"
				id="saleinvceh2">
				<span class="form-name style_heading" style="font-size: 27px;">New
					Tax Invoice</span>
			</div>
			</div>

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		<div class="miscellaneous">
			<form class="form-horizontal" action="" method="post" name="custord">
				<div class="container" id="custdetal">
					
					<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcol">
								<input type="text" id="key" autofocus="key"
									onchange="getEmpName(),getitemData1();" required /> <label>Barcode
									No</label>
							</div>
						</div>
					<div class="col-md-1"></div>
					
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcol">
								<%
								ProductDetailHelper item = new ProductDetailHelper();
								List itemList = item.getAllItemListWithoutBarcodeForBilling(request, response);
							%>
						
							<input list="itemId_drop" id="itemName" class="" onchange="getEmpName(), getitemData1();" style="background-color: #f0f0f0" required>
							
							<datalist id="itemId_drop">
								<%
									for (int j = 0; j < itemList.size(); j++) {
										ProductNameBean itm = (ProductNameBean) itemList.get(j);
								%>
								<option data-value="<%=itm.getCaregoryName()%>"
									value="<%=itm.getItemName()%> :: <%=itm.getCaregoryName()%> :: <%=itm.getSubCat()%>"
									myvalue="<%=itm.getItemName()%>"
									myvalue1="<%=itm.getSubCatid()%>"
									myvalue2="<%=itm.getProductid()%>"
									myvalue3="<%=itm.getColor()%>" 
									myvalue4="<%=itm.getSize()%>"
									myvalue5="<%=itm.getFkCatId()%>"									
									>										
									<%
										}
									%>
								
							</datalist>
							<label>Item List</label>
							</div>
						</div>
					</div>

					<!----------------------------------------------- grid -------------------------------------->
					<div class="invoice_grid">
						<div class="row">
							<div class="table-responsive"
								style="margin-left: 2%; overflow-x: hidden;">
								<table id="list4"></table>
								<div id="jqGridPager"></div>
							</div>
						</div>
					</div>
					<!------------------------------- grid end ------------------------------------------------------->


					<div class="row">

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">
							<input type="text" id="totalQuantity" readonly="readonly" /> <label
								for="totalQuantity">Total Quantity<!-- <sup>*</sup> --></label>
						</div>


						<div class="col-md-1"></div>

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">
							<input type="text" id="totalAmount" readonly="readonly" /> <label>Total
								Amount</label>
						</div>

					</div>

					<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcol">
								<input type="text" id="srTransactionId"
									onkeypress="return isNumber(event)"
									onchange="getSrCreditAmount()" required /> <label
									for="srTransactionId">SR Transaction Id </label>
							</div>
						</div>


						<div class="col-md-1"></div>

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">
							<input type="text" readonly="readonly" id="discount"
								onchange="taxAmountCalc(); callAfterSave()" /> <label>Discount</label>
						</div>

					</div>

					<div class="row">
						<div class="sm_grid">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcol">
								<div class="table-responsive"
								style="height: 17vh;margin-bottom: 8%;margin-left: 0%;width: 100%;margin-top: -16px;">
									<table id="srCreditAmtGrid"></table>
									<div id="srJqGridPager"></div>
								</div>
							</div>
						</div>
						 <div class="col-md-1"></div>

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="taxcol">

							<select id="paymentMode">
								<option value="cash">Cash</option>
								<option value="card">Card</option>
								<option value="cashAndCard">Cash And Card</option>
								<option value="Upi">Upi</option>
								<option value="cashAndupi">Cash And Upi</option>
							</select> <label for="paymentMode">Payment Mode:</label>
							<div class="row ">
								<div id="cheque_no">
									<div class="col-md-3 col-md-offset-5 first">
										<input class="form-control" type="text" name="chequeNum"
											id="chequeNum" placeholder="Cheque No." />
									</div>
									<div class="col-md-3  first">
										<input class="form-control" type="text" name="nameOnCheck"
											id="nameOnCheck" placeholder="Name On Cheque" />
									</div>
								</div>

								<div id="card_no" class="form-group">
									<div class="col-md-3 col-md-offset-8 first">
										<input class="form-control" type="text" name="cardNum"
											id="cardNum" placeholder="Card No." />
									</div>
								</div>

								<div id="neft_acc_no" class="form-group">
									<div class="col-md-3 col-md-offset-5 first">
										<input class="form-control" type="text" name="accNum"
											id="accNum" placeholder="Account No." />
									</div>
									<div class="col-md-3 first">
										<input class="form-control" type="text" name="bankName"
											id="bankName" placeholder="Name Of Bank" />
									</div>
								</div>
							</div>

							<div id="cash_and_card">
								<div class="col-md-4"></div>

								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">


											<input type="text" name="cashCard_cashAmount"
												id="cashCard_cashAmount" required /> <label>Cash
												Amount</label>
										</div>
									</div>
								</div>

								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">
											<input type="text" name="cashCard_cardAmount"
												id="cashCard_cardAmount" required /> <label>Card
												Amount</label>
										</div>
									</div>
								</div>
							</div>
							
							<div id="cash_and_upi">
								<div class="col-md-4"></div>

								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">


											<input type="text" name="cashCard_cashAmount1"
												id="cashCard_cashAmount1" required  onkeyup="upicash();" /> <label>Cash
												Amount</label>
										</div>
									</div>
								</div>

								<div class="col-md-4"></div>
								<div class="row">
									<div class="invoice_label_up">
										<div
											class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"
											id="cashcol">
											<input type="text" name="cashCard_upiAmount"
												id="cashCard_upiAmount" required /> <label>Upi
												Amount</label>
										</div>
									</div>
								</div>
							</div>

						</div>

							

						<script>
		$(document).ready(function(){
	  		 $("#paymentMode").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque")
		        {
		           	$("#cheque_no").show(); 
		           	$("#neft_acc_no").hide(); 
		           	$("#card_no").hide();
		           	$("#cash_and_card").hide();
		           	$("#cash_and_upi").hide();
	           	}
	          	 else if($(this).attr("value")=="card")
		        {
	          		$("#card_no").hide(); 	
	          		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
		           	$("#cash_and_card").hide();
		           	$("#cash_and_upi").hide();
	            }
	          	else if($(this).attr("value")=="neft")
		        {
	           		$("#neft_acc_no").show(); 	
	           		$("#card_no").hide(); 
	        		$("#cheque_no").hide();
		           	$("#cash_and_card").hide();
		           	$("#cash_and_upi").hide();
	            }
	          	else if($(this).attr("value")=="cash")
		        {
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide();
		           	$("#cash_and_card").hide();
		           	$("#cash_and_upi").hide();
	            }
	          	else if($(this).attr("value")=="cashAndCard")
		        {
	          		$("#cash_and_card").show();
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide(); 
            		$("#cash_and_upi").hide();
	             }
	          	else if($(this).attr("value")=="cashAndupi")
		        {
	         		$("#cash_and_card").hide();
	          		$("#cash_and_upi").show();
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide(); 
	             }
	         	else if($(this).attr("value")=="Upi"){
	          		$("#cash_and_card").hide();
	          		$("#cash_and_upi").hide();
	          		$("#card_no").hide(); 	
	          		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
	           }
	       });
	   }).change();
		});	
		</script>

					</div>


<div class="row">
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcol">

								<%
									System.out.println("LOGIN TYPE ===> " + type1);
									CustomerDetailsDao cdd = new CustomerDetailsDao();
									List cList = cdd.getAllMiscellaneousCustomer(request, response);
								%>
								<input list="cust_drop" id="creditCustomer1" required>
								<datalist id="cust_drop"> <%
								 	for (int i = 0; i < cList.size(); i++) {
								 		OtherBill cust = (OtherBill) cList.get(i);
								 %>
								<option data-value="<%=cust.getPkBillId()%>"
									value="<%=cust.getCreditCustomer1()%>">
									<%
										}
									%>
								
								</datalist>
								<label for="customerName">Customer Name<!-- <sup>*</sup> --></label>
							</div>
						</div>

						<div class="col-md-1"></div>

						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="taxcol">
								<input type="text" id="mobileNo" maxlength="10" required /> <label>Mobile
									No</label>
							</div>
						</div>


					</div>


					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
							id="taxcol">
							<input type="text" readonly="readonly" id="totalCreditAmt" /> <label
								for="totalCreditAmt">Total Credit Amount</label>
						</div>
						<div class="col-md-1"></div>

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
							id="taxcol">
							<input type="text" id="grossTotal" readonly="readonly"
								style="background-color: #fab787;" /> <label> Gross
								Total</label>
						</div>
					</div>

					
						<div class="row" id="newtaxbutn">
							<div class="col-md-2" style="display: inline-block;">
								<input type='button'
									class="btn btn-large btn-success btn-md button_hw button_margin_right" id="btnSubmit"
									style="width: 124;padding-top: 8px;" onclick="resotherbill();"
									value="Print Bill">
							</div>

							<div class="col-md-2" style="display: inline-block;">
								<input type="reset" value="Cancel"
									onclick="window.location.reload()" style="width: 124;padding-top: 8px;"
									class="btn btn-large btn-danger btn-md button_hw button_margin_right" />
							</div>
						</div>
					
				</div>
			</form>
		</div>
	</div>

</body>
<div class="row footer_margin_top" align="center">
	<%@include file="y_commons/footer.jsp"%>
</div>
</html>