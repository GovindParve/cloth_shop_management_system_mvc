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
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/editBill.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/y_js/editBill.js"></script>

<script type="text/javascript">
function isNumber(evt)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
        return false;
    }
    return true;
}
</script>

<style>
form{
/* PADDING-BOTTOM: 100px; */
}
</style>
<%
   	Long transactionId = 1l;
%>
<%
	CustomerDetailsDao data = new CustomerDetailsDao();
	List trList  = data.getLastTransactionIdForSaleReturn();
	for(int i=0;i<trList.size();i++)
	{
		allTransactionId st = (allTransactionId)trList.get(i);
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
    /* margin-left: 25px; */
    margin-top: 1%;
    margin-bottom: 0%;
}
.editbill ul {
    border: none;
    display: flex;
    justify-content: center;
}
.editbill a {
    width: 100%;
    text-align: center;
    border: none !important;
    border-radius: 10px !important;
    background-color: #BA0707;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background-color: #087cea85;
}
.editbill a:hover{
    background-color: #087cea !important;
	color: #fff !important;
}
/* .editbill ul li .active {
    background-color: #fff !important;
	color: #555 !important;
} */
.editbill li {
    width: 20%;
    border: none !important;
    margin: 0 10px;
}
tbody tr:hover {
    background: none !important;
    color: #000 !important;
}
.invoice_grid1 {
    margin-bottom: 20px !important;
    margin-top: 0px;
    width: 100%;
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
.editbill li {
    width: 26%;
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
.editbill li {
    width: 35%;
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
		/* margin-left: 6px; */
	}
.editbill li {
    width: 46%;
}
}

@media screen and (max-width: 580px) {
.table-responsive {
    width: 95%;
}
.container-fluid {
    width: 113%;
}
}

@media screen and (max-width: 480px) {
.editbill li {
    width: 100%;
    margin: 0 10px;
    display: flex;
    justify-content: center;
}
.editbill a {
    width: 60%;
    display: inline-block;
    margin: 10px 0;
}
.editbill ul {
    border: none;
    /* display: flex; */
    justify-content: center;
    display: inline-block;
    width: 100%;
}
}
/* .btnwidth {
	width: 130px !important;
    padding-top: 10px !important;
} */
</style>
      

<body class="vColor">
	<div class="container-fluid">
		<div class="row">
			<div class="form-group" align="left">
				<div class="control-label" id="billheading">
				</div>
			</div>

			<div class="" id="categorydetailsh2" align="center">
				<h2 class="form-name style_heading">Edit Bill</h2>
			</div>
		</div>
		

	
		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
	
	<div class="editbill">
		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#home2">Edit Invoice</a></li>
			<li><a data-toggle="tab" href="#customerBill">Edit Credit Customer Invoice</a></li>
		</ul>
	</div>

		<div class="tab-content">

			<!-- tax invoice bill no wise sale return  -->

<!-------------------------------------------------- Edit Invoice Bill Starts Here -------------------------------------------------->
			<div id="home2" class="tab-pane fade in active">
			<!-- <div class="row"></div> -->		

<div class="miscellaneous">			
	<form class="form-horizontal" action="" method="post" name  ="custord">
	<div class="container" id="">
				<div class="row">
		 
		 <div class="subheadingedit" align="center">
				<h2 class="form-name style_heading">Edit Invoice</h2>
			</div>
		 
				<div class="invoice_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
			                <input type="text" id="billNoBW" autofocus="autofocus" onchange="getEmpName(), getEmpName(), getSaleItems2();" required/>
					        <label class="control-label">Bill No<sup style="color: red;">*</sup></label>
				</div>	  
				</div>
					     
					<div class="col-md-1"></div>  
			
					<div class="invoice_label_up ">		
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
						    <input type="text" id="mobileNo" maxlength="10" onkeypress="return isNumber(event)" required/>
						    <label>Mobile No</label>
					 </div>  
					 </div>
					 
				<!-- </div> -->
	
			      <!-- <div class="row"> -->
                 <div class="invoice_label_up ">
			      <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
			            <input type="text" id="creditCustomer1" required>
						<label for="customerName">Customer Name</label>  
				  </div>

				  </div>
				
				  </div>

					

						<div class="row" align="center">
						<div class="invoice_grid1">
							<div class="table-responsive">
								<table id="jqGrid2"></table>
								<div id="jqGridPager2"></div>
							</div>
						</div>

						</div>

					<div class="row"></div>
				<div class="row">
			       <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					<input type="text" id="totalQuantity" readonly="readonly"/>
							<label  for="totalQuantity">Total Quantity</label>  
				  </div>			     
					   
						<div class="col-md-1"></div>  
							
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
						<input type="text" id="totalAmount" readonly="readonly"/>
				    	<label>Total Amount: </label>
				</div>				
				
				<!-- </div>	 -->	
						
				<!-- <div class="row"> -->
								
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<input type="text" readonly="readonly"  id="discount"  onchange="taxAmountCalc(); callAfterSave()"/>
						    <label>Discount</label>
				</div>					
				<!-- </div> --> 					
						
					<!-- <div class="row"> -->
			               <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="text" readonly="readonly" id="lastPaymentMode"/>
								<label>Payment Mode </label>
								</div>					
					 	
							<!-- <div class="col-md-1"></div> -->  					
						
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
	           					<select id="paymentMode">
	           							<option value="none">Select</option>
										<option value="cash">Cash</option>
										<option value="card">Card</option>
										<option value="cashAndCard">Cash And Card</option>
										<option value="Upi">Upi</option>
										<option value="cashAndupi">Cash And Upi</option>
								</select>	
									<label for="paymentMode">Edit Payment Mode:</label> 
									</div>
	           			
					
						
	 
	<script>
		$(document).ready(function(){
	  		 $("#paymentMode").change(function(){
	       	$(this).find("option:selected").each(function()
	       	{
	       		
	       		if($(this).attr("value")=="none")
		        {
	          		$("#cash_and_card").hide();
	          		$("#cashAmountDiv").hide();
	          		$("#cardAmountDiv").hide();
	          		$("#upicashAmountDiv").hide();
	          		$("#upiAmountDiv").hide();
            	}
	       		else if($(this).attr("value")=="cash")
		        {
	          		$("#cash_and_card").hide();
	          		$("#cashAmountDiv").hide();
	          		$("#cardAmountDiv").hide();
	          		$("#upicashAmountDiv").hide();
	          		$("#upiAmountDiv").hide();
	            }
	       		else if($(this).attr("value")=="card")
		        {
	          		$("#cash_and_card").hide();
	          		$("#cashAmountDiv").hide();
	          		$("#cardAmountDiv").hide();
	          		$("#upicashAmountDiv").hide();
	          		$("#upiAmountDiv").hide();
	            }
	       		else if($(this).attr("value")=="Upi")
		        {
	          		$("#cash_and_card").hide();
	          		$("#cashAmountDiv").hide();
	          		$("#cardAmountDiv").hide();
	          		$("#upicashAmountDiv").hide();
	          		$("#upiAmountDiv").hide();
	            }
	          	else if($(this).attr("value")=="cashAndCard")
		        {
	          		//$("#cash_and_card").show();
	          		$("#cashAmountDiv").show();
	          		$("#cardAmountDiv").show();
	          		$("#upicashAmountDiv").hide();
	          		$("#upiAmountDiv").hide();
	            }
	          	else if($(this).attr("value")=="cashAndupi")
		        {
	          		//$("#cash_and_card").show();
	          		$("#upicashAmountDiv").show();
	          		$("#upiAmountDiv").show();
	          		$("#cashAmountDiv").hide();
	          		$("#cardAmountDiv").hide();
	            }
	       });
	   }).change();
		});	
		</script>
	
	
	 </div>
	 
	 
	
	<div class="row">
	
	<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
       <div class="row">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
					<input type="text" readonly="readonly" id="oldCashAmount" />
					<label>Cash Amount </label>
					</div>
					
					<div class="col-md-1"></div> 
					
					
	   </div>	
				
				
				<div class="row">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12 " id="editbillcol">
				  	<input type="text" readonly="readonly" id="oldUPIAmount"/>
				    <label>Upi Cash Amount </label>
				    </div>
					
				
			
				</div>
				<div class="row">
		<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
		<input type="text" readonly="readonly" id="finalCreditAmount"/>
					<label>Credit Amount </label>
		</div>
		</div>
			</div>
					<div class="col-md-1"></div>  
		
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 
		
		
		<div class="row">
		<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12 " id="editbillcol">
				  	<input type="text" readonly="readonly" id="oldCardAmount"/>
				    <label>Card Amount </label>
				    </div>
				    
		</div>		    
		
		<div class="row">
		
				    
				    
				    <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12 " id="editbillcol">
				  	<input type="text" readonly="readonly" id="oldUpidAmount"/>
				    <label>Upi Amount </label>
				    </div>
				    
				    
		</div>	
		
		 <div class="row">
				<div class="invoice_label_up ">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
				<div  id="cardAmountDiv">
						<input type="text" name="cashCard_cardAmount" id="cashCard_cardAmount" required/>  
						<label>Card Amount</label> 
						</div>	
				</div>
				</div>
		</div>
		
		
		
		
		<div class="row">	
		<div class="invoice_label_up ">
				<div  id="cashAmountDiv">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
						<input type="text" name="cashCard_cashAmount" id="cashCard_cashAmount" required/>  
						<label>Cash Amount</label>  
				</div>
				</div>
				</div>
		</div>
		
		<div class="row">
				<div class="invoice_label_up ">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
				<div  id="upiAmountDiv">
						<input type="text" name="cashupi_upiAmount" id="cashupi_cashAmount" required/>  
						<label>Cash Amount</label> 
						</div>	
				</div>
				</div>
		</div>
		
		
		
		
		<div class="row">	
		<div class="invoice_label_up ">
				<div  id="upicashAmountDiv">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
						<input type="text" name="cashupi_cashAmount" id="cashupi_upiAmount" required/>  
						<label>Upi Amount</label>  
				</div>
				</div>
				</div>
		</div>
		
		<div class="row">
		<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">		
		 <div class="col-md-1"></div>
				<input type="text" id="grossTotal" style="background-color: #fab787;" readonly="readonly"/>
				<label> Gross Total</label>
				</div>
        </div>

	</div>
	
</div>	 
	
	
			<div class="row" id="btnrow">
			<div class="invoice_button">
									<!-- <div class="col-lg-2" style="display: inline-block;"> -->
					<input type="button" value="Submit" id="btn" onclick="editBill1();"  
					class="btn btn-large btn-success button_hw button_margin_right btnwidth" />

			<!-- </div> -->	
		

								<!-- <div class="col-lg-2" style="display: inline-block;"> -->		
					<input type="reset" value="Cancel" onclick="window.location.reload()"  
					class="btn btn-large btn-danger button_hw button_margin_right btnwidth" />
			<!-- </div> -->
			</div>
			</div>		 

		
			</div>
		</form>	
		
	</div>	
</div>				
<!-------------------------------------------------- Edit Invoice Bill Ends Here -------------------------------------------------->				
		<!-- </div> -->
		
<!------------------------------------------------ Edit CREDIT CUSTOMER Invoice Starts Here ---------------------------------------------->
			
			<div id="customerBill" class="tab-pane">
				<div class="row"></div>
				
				
		<div class="miscellaneous" style="left:0">			
				<form action="" name="ccEdit" method="post">
		            <div class="container" id="">
		
			
			<div class="row">
			
			<div class="subheadingedit" align="center">
				<h2 class="form-name style_heading">Edit Credit Customer Invoice</h2>
			</div>
			
				 <div class="invoice_label_up ">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<%
								CustomerDetailsDao cdd = new CustomerDetailsDao();
           						List cList = cdd.getAllCustomerForBilling();
							%>
						<input list="creditcust_drop" id="creditcustCustomer" onchange="getBillByCustomer1()" required>
						<datalist id="creditcust_drop"> <%
					           for(int i=0;i<cList.size();i++){
					        	   CustomerDetailsBean cust =(CustomerDetailsBean)cList.get(i);
							%>

						<option data-value="<%=cust.getCustId()%>"
							value="<%=cust.getFirstName() %> <%=cust.getLastName() %>">
							<%
				      			}
				    		%>
						</datalist>
						<label for="customerName">Customer Name<sup style="color: red;">*</sup></label>
				</div>
				</div>
				
				
			<div class="col-md-1"></div>  
				
			
                  <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				
					<select id='creditCustBillNo' name="creditCustBillNo" onchange="getEmpName(); getEmpName(); getEmpName(); getCreditCustEditBill();"></select>
					<label>Bill No<sup style="color: red;">*</sup></label>
			     </div>
			</div>
			
			
				<div class="col-md-12">
					<div class="row" align="center">
					<div class="invoice_grid1">
						<div class="table-responsive">
							<table id="jqGrid1"></table>
							<div id="jqGridPager1"></div>
						</div>
					</div>
				<div class="row">
					
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
	          			<input type="text" id="totalQuantityCC" readonly="readonly"/>
	          			<label for="totalQuantity">Total Quantity</label>  
	          			</div>
					   
	           				<div class="col-md-1"></div> 
	           				
	           			<!-- <div class="row"> -->
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<input type="text" id="totalAmountCC" readonly="readonly" />
							<label>Total Amount</label>
							</div>
										
					<!-- </div> -->
					
				</div>				
				
					<div class="row">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">		
					<input type="text" readonly="readonly"  id="discountCC"  onchange="taxAmountCalc()" />
						       <label>Discount</label>
		          </div>
		       
		       	<div class="col-md-1"></div> 
		       
			         <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">		
								<input type="text"  id="netPaymentAmountCC" readonly="readonly"/>
								<label>Net Payment Amount</label>
							</div>	
		               </div>

					<div class="row">
			       
						 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
							<input type="text" readonly="readonly" id="oldPaymentModeCC"/>
								<label>Payment Mode </label>
								</div>
						
					
					 	
					
								<div class="col-md-1"></div> 
							
						 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
	           					<select id="paymentModeCC">
	           							<option value="none">Select</option>
										<option value="cash">Cash</option>
								<option value="card">Card</option>
								<option value="cashAndCard">Cash And Card</option>
								<option value="Upi">Upi</option>
								<option value="cashAndupi">Cash And Upi</option>
								</select>	
								<label for="paymentModeCC">Edit Payment Mode</label> 
								</div>
	           			
						
						
	 
	<script>
		$(document).ready(function(){
	  		 $("#paymentModeCC").change(function(){
	       	$(this).find("option:selected").each(function()
	       	{
	       		
	       		if($(this).attr("value")=="none")
		        {
	          		$("#cash_and_cardCC").hide();
	          		$("#cashAmountDivCC").hide();
	          		$("#cardAmountDivCC").hide();
	          		$("#upicashAmountDivCC").hide();
	          		$("#upiAmountDivCC").hide();
            	}
	       		else if($(this).attr("value")=="cash")
		        {
	          		$("#cash_and_cardCC").hide();
	          		$("#cashAmountDivCC").hide();
	          		$("#cardAmountDivCC").hide();
	          		$("#upicashAmountDivCC").hide();
	          		$("#upiAmountDivCC").hide();
	            }
	       		else if($(this).attr("value")=="card")
		        {
	          		$("#cash_and_cardCC").hide();
	          		$("#cashAmountDivCC").hide();
	          		$("#cardAmountDivCC").hide();
	          		$("#upicashAmountDivCC").hide();
	          		$("#upiAmountDivCC").hide();
	            }
	       		else if($(this).attr("value")=="Upi")
		        {
	          		$("#cash_and_cardCC").hide();
	          		$("#cashAmountDivCC").hide();
	          		$("#cardAmountDivCC").hide();
	          		$("#upicashAmountDivCC").hide();
	          		$("#upiAmountDivCC").hide();
	            }
	          	else if($(this).attr("value")=="cashAndCard")
		        {
	          		//$("#cash_and_card").show();
	          		$("#cashAmountDivCC").show();
	          		$("#cardAmountDivCC").show();
	          		$("#upicashAmountDivCC").hide();
	          		$("#upiAmountDivCC").hide();
	            }
	          	else if($(this).attr("value")=="cashAndupi")
		        {
	          		//$("#cash_and_card").show();
	          		$("#upicashAmountDivCC").show();
	          		$("#upiAmountDivCC").show();
	          		$("#cashAmountDivCC").hide();
	          		$("#cardAmountDivCC").hide();
	            }
	       });
	   }).change();
		});	
		</script>
	 </div>
	 
	
	<div class="row">
	
	<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
       <div class="row">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
					<input type="text" readonly="readonly" id="oldCashAmountCC" />
					<label>Cash Amount </label>
					</div>
					
					<div class="col-md-1"></div> 
					
					
	   </div>	
				
				
				<div class="row">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12 " id="editbillcol">
				  	<input type="text" readonly="readonly" id="oldUPIAmountCC"/>
				    <label>Upi Cash Amount </label>
				    </div>
					
				
			
				</div>
				<div class="row">
		<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
		<input type="text" readonly="readonly" id="finalCreditAmountCC"/>
					<label>Credit Amount </label>
		</div>
		</div>
			</div>
					<div class="col-md-1"></div>  
		
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 
		
		
		<div class="row">
		<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12 " id="editbillcol">
				  	<input type="text" readonly="readonly" id="oldCardAmountCC"/>
				    <label>Card Amount </label>
				    </div>
				    
		</div>		    
		
		<div class="row">
		
				    
				    
				    <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12 " id="editbillcol">
				  	<input type="text" readonly="readonly" id="oldUpidAmountCC"/>
				    <label>Upi Amount </label>
				    </div>
				    
				    
		</div>	
		
		 <div class="row">
				<div class="invoice_label_up ">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
				<div  id="cardAmountDivCC">
						<input type="text" name="cashCard_cardAmount" id="cashCard_cardAmountCC" required/>  
						<label>Card Amount</label> 
						</div>	
				</div>
				</div>
		</div>
		
		
		
		
		<div class="row">	
		<div class="invoice_label_up ">
				<div  id="cashAmountDivCC">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
						<input type="text" name="cashCard_cashAmount" id="cashCard_cashAmountCC" required/>  
						<label>Cash Amount</label>  
				</div>
				</div>
				</div>
		</div>
		
		<div class="row">
				<div class="invoice_label_up ">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
				<div  id="upiAmountDivCC">
						<input type="text" name="cashupi_upiAmount" id="cashupi_cashAmountCC" required/>  
						<label>Cash Amount</label> 
						</div>	
				</div>
				</div>
		</div>
		
		
		
		
		<div class="row">	
		<div class="invoice_label_up ">
				<div  id="upicashAmountDivCC">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">
						<input type="text" name="cashupi_cashAmountCC" id="cashupi_upiAmountCC" required/>  
						<label>Upi Amount</label>  
				</div>
				</div>
				</div>
		</div>
		
		<div class="row">
		<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-12" id="editbillcol">		
		 <div class="col-md-1"></div>
				<input type="text" id="grossTotalCC" style="background-color: #fab787;" readonly="readonly"/>
				<label> Gross Total</label>
				</div>
        </div>

	</div>
	
</div>	 		
		</div>
	   	
			<div class="row" id="btnrow">
			<div class="invoice_button">
								<!-- <div class="col-lg-2" style="display: inline-block;"> -->
					<input type='button'  class="btn btn-large btn-success button_hw button_margin_right btnwidth" 
						id="creditBtn" value="Submit" onclick="editCreditCustBillValidate();">
			<!-- </div> -->
							<!-- <div class="col-lg-2" style="display: inline-block;"> -->		
					<input type="reset" value="Cancel" onclick="window.location.reload()"  
						class="btn btn-large btn-danger button_hw button_margin_right btnwidth" />
		
			<!-- </div> -->
			</div>
			</div>
</div>
</div>
</form>
</div>
				
				</div>
<!------------------------------------------------ Edit CREDIT CUSTOMER Invoice Ends Here ---------------------------------------------->				
				
				</div>
			
</div>


		

		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
</body>
<!--  --></html>
