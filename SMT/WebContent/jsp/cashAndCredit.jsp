<%@page import="com.smt.dao.CreditCustBillDao"%>
<%@page import="com.smt.hibernate.Stock"%>
<%@page import="com.smt.dao.StockDao"%>
<%@page import="com.smt.hibernate.OtherBill"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="java.util.List"%>
<% boolean isHome=false; %>
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
     <script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
	 <script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
     <script src="/SMT/staticContent/js/otherOrder.js"></script>   
     <script src="/SMT/staticContent/js/creditCustBill.js"></script>
	 <script src="/SMT/staticContent/js/customerDetails.js"></script>
     
     
           
<style type="text/css">
.godbtn{
	position: absolute;
	margin-top: 15px;
    margin-left: -10px;
}
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
		List stkList  = data.getLastBillNo();
		for(int i=0;i<stkList.size();i++)
		{
			BillBean st = (BillBean)stkList.get(i);
			BillNo = Long.parseLong(st.getBillNo());
			BillNo++;
		}      
     %>
      
<script type="text/javascript">
function isNumber(evt)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function CreditCustDetailsDivAction(a)
{	
	if(a==1)
    {
		$( "#creditCustomerDetailsDiv" ).dialog({height: 390, width:1000});
       	//document.getElementById("creditCustomerDetailsDiv").style.display="block";
    }
    else
    {
    	$( "#creditCustomerDetailsDiv" ).dialog('close');
       	//document.getElementById("creditCustomerDetailsDiv").style.display="none";
    }
	
	$('#crditCustListDiv').load(document.URL +  ' #crditCustListDiv');
}

</script>
<%
    Long cBillNo = 1l;
%>
<%
    CreditCustBillDao ccbd = new CreditCustBillDao();
	List cBList  = ccbd.getBillNo(request, response);
	
	for(int i=0;i<cBList.size();i++){
		BillBean st = (BillBean)cBList.get(i);
		cBillNo = st.getCreditCustBillNo();
		cBillNo++;
	}
%>
      
      
      
    <!-- <script>
    function showcontent(x){
    	if(x==0){
    		document.getElementById("taxid").style.display='block';
    		
    	}
    	else{
    		document.getElementById("custid").style.display='block';
    	}
    }
    
    </script>   -->
    
    
    <script type="text/javascript">
    function mypopup(url)
    {
        /* width = window.screen.width;
        height = window.screen.height; */
        width ='1050px';
        height = '600px';
        mywindow = window.open(url, "Title",
            "location=0,status=1,scrollbars=1,resizable=1,menubar=0,toolbar=no,width="
                        + width + ",height=" + height);
        mywindow.moveTo(140, 50);
        mywindow.focus();
    }
    function showcont(){
    	$("#taxid").show();
    	$("#custid").hide();
    }
    
    function showcontent(){
    	$("#custid").show();
    	$("#taxid").hide();
    }
    	
    
    
</script>

</head>
   <body class="purchase_form_img vColor" onload="getEmpName(); getEmpName(); getEmpName();showcont()">

  <div class="tabcontent">
     <div class="container" style="margin-top: 6%;">
   <div class="row">
   <div class="col-lg-5"></div>
   <div class="col-lg-4">
    <input type="radio" name="rad1" onclick="showcont()"checked>Tax invoice
   <input type="radio" name="rad1"  onclick="showcontent()">credit customer invoice
   </div>
   <div class="col-lg-3"></div>
   </div>
   </div>
   <div id="taxid" class="tab-pane active">
	<div class="container-fluid">

		<div class="row header_margin_top">
			<div class="col-md-2 col-md-offset-5 align" align="center">
				<span class="form-name style_heading" style="font-size: 27px;">Tax Invoice</span>
			</div>
			<div  class="col-md-2 col-md-offset-3 align">	
					<span align="right" style="color: red;margin-right: 10px;font-size: 27px;">Bill No :: <%out.println(BillNo); %></span>
					<input type="hidden" readonly="readonly" id="billNo" name="billNo" value=<%=BillNo%>>
			</div>
		</div>

		<div class="row">
		
		</div>

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
</div>



<div class="miscellaneous">
<form class="form-horizontal" action="" method="post" name  ="custord">
<div class="container">
				<div class="row">
			     <div class="invoice_label_up"> 
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
          					
								
							<%
								System.out.println("LOGIN TYPE ===> "+type1);
								CustomerDetailsDao cdd = new CustomerDetailsDao();
           						List cList =cdd.getAllMiscellaneousCustomer(request, response);
							%>
						<input list="cust_drop" id="creditCustomer1" required>
				         <datalist id="cust_drop">
							<%
					           for(int i=0;i<cList.size();i++){
					        	   OtherBill cust =(OtherBill)cList.get(i);
							%>
						<option data-value="<%=cust.getPkBillId()%>" value="<%=cust.getCreditCustomer1()%>">
							<%
				      			}
				    		%>
						</datalist> 
							<label>Customer Name</label>  
				    </div>
				    </div>
				    
				     <div class="invoice_label_up"> 
           		        <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">
						    <input type="text" id="mobileNo" maxlength="10" required/>
					        <label>Mobile No</label>
					    </div>
					</div>
				</div>
	
			      <div class="row">
			      <div class="invoice_label_up"> 
			       	<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
			         <input type="text" id="key" autofocus = "key"onchange="getEmpName(),getitemData1();" style="margin-bottom: 6px;" required/>
					        <label>Barcode No</label>
					        </div>
					        </div>
					  
					     <%-- <div class="col-sm-2" align="center">
					     <label class=" control-label" style="font-size:22px;">Employee Name<sup>*</sup></label> 
					     </div>
          					  <div class="col-md-3">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="glyphicon glyphicon-user"></i>
									</span>
							<%
							EmployeeDetailsDao edd = new EmployeeDetailsDao();
           						List eList =edd.getAllMainEmployee();
							%>
						<input list="emp_drop" id="employee1"  class="form-control" >
				         <datalist id="emp_drop">
							<%
					           for(int i=0;i<eList.size();i++){
					        	   EmployeeDetailsBean emp =(EmployeeDetailsBean)eList.get(i);
							%>
						<option data-value="<%=emp.getEmpId()%>" value="<%=emp.getFirstName() %> <%=emp.getLastName() %>">
							<%
				      			}
				    		%>
						</datalist> 
				    </div>
           			</div> --%>
					
				</div>	
		
				
				  
					<div class="invoice_grid">
						<div class="row">
							<div class="table-responsive">
								<table id="list4"></table>
								<div id="jqGridPager"></div>
							</div>
						</div>
					</div>
				
					
			
				
				<div class="row">
			       	<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
						<input type="text" id="totalQuantity" readonly="readonly"/>
				        <label for="totalQuantity">Total Quantity</label>  
           			</div>
					     	<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">
								<input type="text" id="totalAmount"readonly="readonly"/>
							    <label>Total Amount: </label>
							</div>
				</div>		
						
		<div class="row">
			<div class="invoice_label_up"> 
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
						<input type="text" id="srTransactionId" onkeypress="return isNumber(event)" onchange="getSrCreditAmount()" required/>
						<label for="srTransactionId">SR Transaction Id </label>		
				</div>
			</div>		
								
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">
			   <input type="text" readonly="readonly" id="discount" onchange="taxAmountCalc(); callAfterSave()"/>
			   <label>Discount</label>
			</div>			
	   </div>	   
	  
	   	<div class="row">
	   <div class="sm_grid">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
						 <div class="table-responsive" style="height: 15vh;">
								<table id="srCreditAmtGrid"></table>
								<div id="srJqGridPager"></div>
							</div>
					
					</div>
		</div>
	  		
			
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">
							
	           					<select id="paymentMode">
										<option value="cash">Cash</option>
										<option value="card">Card</option>
										<option value="cashAndCard">Cash And Card</option>
								</select>	
	           				<label for="paymentMode">Payment Mode:</label>
					
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
	           	}
	          	 else if($(this).attr("value")=="card")
		        {
	          		$("#card_no").hide(); 	
	          		$("#neft_acc_no").hide(); 
	        		$("#cheque_no").hide();
		           	$("#cash_and_card").hide();
	            }
	          	else if($(this).attr("value")=="neft")
		        {
	           		$("#neft_acc_no").show(); 	
	           		$("#card_no").hide(); 
	        		$("#cheque_no").hide();
		           	$("#cash_and_card").hide();
	            }
	          	else if($(this).attr("value")=="cash")
		        {
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide();
		           	$("#cash_and_card").hide();
	            }
	          	else if($(this).attr("value")=="cashAndCard")
		        {
	          		$("#cash_and_card").show();
            		$("#neft_acc_no").hide(); 
            		$("#cheque_no").hide();
            		$("#card_no").hide(); 
	             }
	       });
	   }).change();
		});	
		</script>

</div>	 



	 <div class="row ">
            					<div id="cheque_no" >
									<div class="col-md-3 col-md-offset-5 first">	
										<input class="form-control" type="text" name="chequeNum" id="chequeNum" placeholder="Cheque No." />  
									</div>
									<div class="col-md-3  first">	
										<input class="form-control" type="text" name="nameOnCheck" id="nameOnCheck" placeholder="Name On Cheque" />  
									</div>
								</div>
											
											<div id="card_no" class="form-group">
												<div class="col-md-3 col-md-offset-8 first">	
													<input class="form-control" type="text" name="cardNum" id="cardNum" placeholder="Card No." />  
												</div>
											</div>
											
											<div id="neft_acc_no" class="form-group">
												<div class="col-md-3 col-md-offset-5 first">	
													<input class="form-control" type="text" name="accNum" id="accNum" placeholder="Account No." />  
												</div>
												<div class="col-md-3 first">	
													<input class="form-control" type="text" name="bankName" id="bankName" placeholder="Name Of Bank" />  
												</div>
											</div>
										</div>	
								
							<div id="cash_and_card">
							<div class="col-md-4"></div>
							
								<div class="row">
								 <div class="invoice_label_up"> 				
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">		
										
										
											<input type="text" name="cashCard_cashAmount" id="cashCard_cashAmount" required/>  
											        <label>Cash Amount</label>  
									</div>		
									</div>	 	
								</div>	
								
								<div class="col-md-4"></div>			
									<div class="row">
									  <div class="invoice_label_up"> 	
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">			
										<input type="text" name="cashCard_cardAmount" id="cashCard_cardAmount" required/>  
										 <label>Card Amount</label>  
									 </div>
									 </div>
								</div>		
								</div>																						
							
								
					
						<div class="col-md-4"></div>	
					<div class="row">		
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">			
								<input type="text" readonly="readonly" id="totalCreditAmt"/>
								<label for="totalCreditAmt">Total Credit Amount</label>
							</div>
							
						</div>	
					
					
				     <div class="col-md-4"></div>
				          
					<div class="row">	
							
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">	
						
								<input type="text" id="grossTotal"readonly="readonly" style="background-color: #fab787;"/>
								<label> Gross Total</label>
						</div>
					</div>	
					
						
			<div class="invoice_button col-md-offset-1">	
				<div class="row">
				<div class="col-lg-2">
				        <input type='button' class="btn btn-success btn-lg bottomButtons" id="btnSubmit" value="Print Bill" onclick="resotherbill();" style="width:150px;">
				</div>
				
				<div class="col-lg-2">
						<input type='button' class="btn btn-primary btn-lg bottomButtons" id="newBill" value="New Bill" onclick="window.open('newBillTaxInvoice.jsp')" style="width:150px;">
					</div>	
					
					<div class="col-lg-2">
						<input type="reset" value="Cancel" onclick="window.location.reload()" class="btn btn-lg btn-danger btn-md"/>
				</div>
				
				
				</div> 
				</div>
			
				</div>
				</form>	
				</div>	
			</div>	
			</div>
		
		<div id="custid">
		<div class="container-fluid">

		<div class="row header_margin_top">
			<div class="col-md-3 col-md-offset-4 align" align="center" style="margin-left: 36.333333%;">
				<span class="form-name style_heading" style="font-size: 25px;">Credit Customer Invoice</span>
			</div>
			<div  class="col-md-2 col-md-offset-2 align"    style=" margin-left: 21.666667%;">	
					<span align="right" style="color: red;font-size: 27px;">Bill No :: <%out.println(cBillNo); %></span>
					<input type="hidden" readonly="readonly" id="billNo" name="billNo" value=<%=cBillNo%>>
			</div>
		</div>
			
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>


<div class="miscellaneous">
	<form class="form-horizontal" action="" method="post" name="custord">
		<div class="container">
			<%-- <h2 align="center" class="form-heading style_heading"
				style="margin-top: 50px;">Credit Customer Bill</h2>
			<h3 align="right" style="color: red; margin-right: 50px;">
				Bill No ::
				<%out.println(BillNo); %>
			</h3> --%>
			
	
			
		
			<div class="row">
				  <div class="invoice_label_up"> 
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
					<input type="text" id="key" onchange="getEmpName(),getitemData1();" autofocus="key" required/>
				    <label>Barcode no</label>
				</div>
                 </div>
				
				<div id="crditCustListDiv">
					  <div class="invoice_label_up">
					  	<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1"> 
								<%
									CustomerDetailsDao cdd2 = new CustomerDetailsDao();
	           						List cList2 = cdd2.getAllCustomerForBilling();
								%>
							<input list="cust_drop" id="creditCustomer" required>
							<span class="godbtn">
									<button type="button" onclick="CreditCustDetailsDivAction(1);">
										 <span class="glyphicon glyphicon-plus"  style="color: #0078ae;"></span>
									</button>
								</span>
							
							<datalist id="cust_drop"> <%
						           for(int i=0;i<cList2.size();i++){
						        	   CustomerDetailsBean cust =(CustomerDetailsBean)cList2.get(i);
								%>
	
							<option data-value="<%=cust.getCustId()%>"
								value="<%=cust.getFirstName() %> <%=cust.getLastName() %>"
								myvalue="<%=cust.getAadhar()%>">
								<%
					      			}
					    		%>
							</datalist>
							<label>Customer Name<sup>*</sup></label>
							</div>
					</div>
				</div>
			</div>
		
			
		<!------------------------------------------------------------------- ADD CREDIT CUSTOMER DETAILS --------------------------------------------------------------->
			
		<div class="container-fluid" style="display: none;" id="creditCustomerDetailsDiv">
					<div class="row" style="padding-top: 10px">
			<div align="center">
				<h2 class="form-name style_heading">Credit Customer Details</h2>
			</div>
		</div>	
		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #000000;">
			</div>
		</div>
		
			<div class="row form-group">
				<div class="col-md-6"></div>
			</div>
			<div class="row form-group">
				<!-- <label class="col-md-2 lablename" for="firstName">First Name:<sup>*</sup>
				</label> -->
				<div class="col-md-3" align="right">
				<label class="lablename" for="firstName" style="margin: 0px 10px;">First Name:<sup>*</sup></label>
				</div>
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i>
						</span>
						<%
							CustomerDetailsDao dao1 = new CustomerDetailsDao();
           						List unitList =dao1.getAllCustomer();
							%>
						<input list="firstName_drop" id="firstName" placeholder="First Name" class="form-control">
						<datalist id="firstName_drop">
							<%
					           for(int i=0;i<unitList.size();i++){
					        	   CustomerDetailsBean bean1 =(CustomerDetailsBean)unitList.get(i);
							%>
							<option data-value="<%=bean1.getCustId()%>"
								value="<%=bean1.getFirstName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
					</div>
				</div>
				<!-- <label class="col-md-2 lablename" for="middleName">Middle
					Name:<sup>*</sup>
				</label> -->
				
				<div class="col-md-3" align="right">
				<label class="lablename" for="middleName" style="margin: 0px 10px;">Middle Name:<sup>*</sup></label>
				</div>
				
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i></span>
						<%
							CustomerDetailsDao dao2 = new CustomerDetailsDao();
           						List middleList =dao2.getAllCustomer();
							%>
						<input list="middleName_drop"  placeholder="Middle Name" id="middleName" class="form-control">
						<datalist id="middleName_drop">
							<%
					           for(int i=0;i<middleList.size();i++){
					        	   CustomerDetailsBean bean2 =(CustomerDetailsBean)middleList.get(i);
							%>
							<option data-value="<%=bean2.getCustId()%>"
								value="<%=bean2.getMiddleName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
					</div>
				</div>
			</div>
			
			

			<div class="row form-group">
			
			<div class="col-md-3" align="right">
				<label class="lablename" for="lastName" style="margin: 0px 10px;">Last Name:<sup>*</sup></label>
				</div>
			
				<!-- <label class="col-md-2 lablename" for="lastName">Last
					Name:<sup>*</sup>
				</label> -->
				<div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-user"></i></span>
						<%
							CustomerDetailsDao dao3 = new CustomerDetailsDao();
           						List lastList =dao3.getAllCustomer();
							%>
						<input list="lastName_drop" id="lastName"  placeholder="Last Name" class="form-control">
						<datalist id="lastName_drop">
							<%
					           for(int i=0;i<lastList.size();i++){
					        	   CustomerDetailsBean bean3 =(CustomerDetailsBean)lastList.get(i);
							%>
							<option data-value="<%=bean3.getCustId()%>"
								value="<%=bean3.getLastName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
					</div>
				</div>
				<!-- <label class="col-md-2 lablename" for="address">Address:<sup>*</sup></label> -->
				
				<div class="col-md-3" align="right">
				<label class="lablename" for="address" style="margin: 0px 12px;">Address:<sup>*</sup></label>
				</div>
				
				<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-map-marker"></i>
						</span> <input id="address" name="address " placeholder="Address"
							class="form-control input-md" type="text">
					</div>
				</div>
			</div>
			<div class="row form-group">
				<!-- <label class="col-md-2 lablename" for="contactNo">Contact
					No:<sup>*</sup>
				</label> -->
				
				<div class="col-md-3" align="right">
				<label class="lablename" for="contactNo" style="margin: 0px 10px;">Contact No:<sup>*</sup></label>
				</div>
				
				<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-earphone"></i>
						</span> <input id="contactNo" name="contactNo" placeholder="10 Digit Contact No." maxlength="10" class="form-control input-md"
							type="text">
					</div>
				</div>
				<!-- <div class="col-md-2" align="right">
				<label class="lablename" for="aadharNo" style="margin: 0px 10px;">GSTTIN/UIN No:</label>
					</div>
				 <div class="col-md-3">
					<div class="input-group">
						<span class="input-group-addon"> No. </span> <input id="aadharNo"
							name="aadharNo" placeholder="GSTTIN/UIN No:"
							class="form-control input-md" type="text">
					</div> 
				</div> -->
				
				<div class="row form-group">
				 <div class="col-md-3" align="right">
			<!-- <label class="lablename" for="emailId" style="margin: 0px 10px;">Email ID:</label> -->
			
			    <!-- <div class="col-md-2" align="right"> -->
				<label class="lablename" for="emailId" style="margin: 0px 17px;">Email Id:<sup>*</sup></label>
				</div>
			
			
				
				<div class="col-md-3 ">
					<div class="input-group" style="margin-left: -6px;margin-right: 13px;">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-envelope"></i>
						</span> <input id="emailId" name="emailId " placeholder="Email ID"
							class="form-control input-md" type="text">
					</div>
				</div>
			</div>
			

			<div class="row form-group">
			<!-- <div class="col-sm-2" align="right">
			<label class="lablename" for="emailId" style="margin: 0px 10px;">Email ID:</label>
				</div>
				<div class="col-md-3 ">
					<div class="input-group">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-envelope"></i>
						</span> <input id="emailId" name="emailId " placeholder="Email ID"
							class="form-control input-md" type="text">
					</div>
				</div> -->
				<div class="col-md-3" align="right">
				<label class="lablename" for="zipCode" style="margin: 0px 10px;" >Zip Code:</label>
				</div>
				<div class="col-md-3">
					<div class="input-group" style="margin-left: 9px;">
						<span class="input-group-addon"> <i
							class="	glyphicon glyphicon-envelope"></i>
						</span> <input id="zipCode" name="zipCode" placeholder="6 Digit Zip code" maxlength="6"
							class="form-control input-md" type="text">
					</div>
				</div>
			</div>

			<div class="form-group row">
				<div class="col-md-11 text-center">
					<input type="button" id="save" name="btn" style="font-size: 19px;height: 40px;" 
						class="btn btn-large btn-success btn-md button_hw button_margin_right"
						onclick="customerDetails();" value="Submit">
					<input type="button" id="save" name="btn" style="font-size: 19px;height: 40px;" 
						class="btn btn-large btn-danger btn-md button_hw button_margin_right" onclick="CreditCustDetailsDivAction(0);resetDivFields();refreshCustomerList();" value="Cancel">
				</div>
			</div>
		</div>
			</div>
			
			<!------------------------------------------------------------ /ADD CREDIT CUSTOMER DETAILS ------------------------------------------------------------->
							
				<div class="col-md-4"></div>
	           		<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">
							        <input type="date" id="cPaymentDueDate" name="cPaymentDueDate" style="margin-bottom: 8px;"/>
									<label>Payment Due Date</label>
						</div>								
					</div>
									
				<div class="invoice_grid">
					<div class="row">
						<div class="table-responsive">
							<table id="list4"></table>
							<div id="jqGridPager"></div>
						</div>
					</div>
				</div>
					<!-- <div class="row" style="margin-top: 15px"> -->
							
	          			<div class="row">	 
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 ">	
							<input type="text" id="totalQtyCredit" readonly="readonly"/>
							<label  for="totalQuantity">Total Quantity</label>  
							</div>
						
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">
						    <input type="text" id="totalAmount" readonly="readonly" />
							<label>Total Amount</label>
							</div>
					 </div>
					 
			<div class="row">
				<div class="invoice_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">		
						<input type="text" id="srTransactionId" onkeypress="return isNumber(event)" onchange="getSrCreditAmountForCredit()" required/>
						<label for="srTransactionId">SR Transaction Id </label>		
					</div>	
				</div>				
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">
					<input type="text" readonly="readonly"  id="discount" onchange="taxAmountCalc()"/>
					<label>Discount</label>
				</div> 
		</div>
		
		<div class="row">
				
           <!--grid table  -->
             <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">
						<div class="table-responsive" style="height: 15vh;">
							<table id="srCreditAmtGrid"></table>
							<div id="srJqGridPager"></div>
						</div>
						</div>
			<!--grid table end  -->	
						
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">
							<input type="text" readonly="readonly" id="totalCreditAmt"/>
							<label for="totalCreditAmt">Total Credit Amount</label>
			    </div>
		</div>
			
				<div class="col-md-4"></div>
					<div class="row">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-4 col-lg-offset-1">
						<input type="text"  id="grossTotal" style="background-color: #fab787;" readonly="readonly"/>
					    <label>Gross Total</label>	
					    </div>
							
					</div>
			
			<div class="col-md-4"></div>
				<div class="row">					
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-4 col-lg-offset-1">		
						<input type="text" id="paidAmt"/>
						<label>Net Paid Amount</label>
					</div>						
		  	 </div>				
			
                   <div class="col-md-4"></div>
					<div class="row">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-4 col-lg-offset-1">
						<select id="creditPaymentMode">
								<option value="cash">Cash</option>
								<option value="card">Card</option>
								<option value="cashAndCard">Cash And Card</option>
							</select>	
							<label for="creditPaymentMode">Payment Mode</label> 
           				</div>
				
	<script>
		$(document).ready(function(){
	  		 $("#creditPaymentMode").change(function(){
	       	$(this).find("option:selected").each(function(){
	           	if($(this).attr("value")=="cheque"){
	           		$("#cash_and_card1").hide();
	           	$("#cheque_no1").hide(); 
	           	$("#neft_acc_no1").hide(); 
	           	$("#card_no1").hide();
	           	}
	          	 else if($(this).attr("value")=="card"){
	          		$("#cash_and_card1").hide();
	          		$("#card_no1").hide(); 	
	          		$("#neft_acc_no1").hide(); 
	        		$("#cheque_no1").hide();
	           }
	          	 else if($(this).attr("value")=="neft"){
	          		$("#cash_and_card1").hide();
	           		$("#neft_acc_no1").hide(); 	
	           		$("#card_no1").hide(); 
	        		$("#cheque_no1").hide();
	            }
	          	 else if($(this).attr("value")=="cash"){
	          		$("#cash_and_card1").hide();
	            		$("#neft_acc_no1").hide(); 
	            		$("#cheque_no1").hide();
	            		$("#card_no1").hide(); 
	             }
	         	else if($(this).attr("value")=="cashAndCard")
		        {
	          		$("#cash_and_card1").show();
            		$("#neft_acc_no1").hide(); 
            		$("#cheque_no1").hide();
            		$("#card_no1").hide(); 
	             }
	       });
	   }).change();
		});	
		</script>
	
	 </div>
	 
 <div class="row" style="margin-top:10px;">

       		<div id="cheque_no1">
				<div class="col-md-3 col-md-offset-5 first">	
					<input class="form-control" type="text" name="chequeNum" id="chequeNum" placeholder="Cheque No." />  
				</div>
				<div class="col-md-3  first">	
					<input class="form-control" type="text" name="nameOnCheck" id="nameOnCheck" placeholder="Name On Cheque" />  
				</div>
			</div>
						
			<div id="card_no1" class="form-group">
				<div class="col-md-3 col-md-offset-8 first">	
					<input class="form-control" type="text" name="cardNum" id="cardNum" placeholder="Card No." />  
				</div>
			</div>
				
			<div id="neft_acc_no1" class="form-group">
				<div class="col-md-3 col-md-offset-5 first">	
					<input class="form-control" type="text" name="accNum" id="accNum" placeholder="Account No." />  
				</div>
				<div class="col-md-3 first">	
					<input class="form-control" type="text" name="bankName" id="bankName" placeholder="Name Of Bank" />  
				</div>
			</div>
	</div>			
			<div id="cash_and_card1">
			<div class="col-md-4"></div>
					<div class="row">
					  <div class="invoice_label_up"> 
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1 ">		
				    <input type="text" name="cashCard_cashAmount" id="cashCard_cashAmount" required/>  
					<label>Cash Amount</label>  
				 	</div>
				 	</div>
				</div>
					
				
			<div class="col-md-4"></div>
					<div class="row">
					  <div class="invoice_label_up"> 
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 col-lg-offset-1">		
					<input type="text" name="cashCard_cardAmount" id="cashCard_cardAmount" required/>  
					<label>Card Amount</label> 
					</div> 
					</div>
					</div>																					
			</div>		
		

					
					
				<!-- 	<div class="row">					
					<div class="col-md-6">
						 <div class="form-group">
				    <div class="row" style="margin-left: 168px;">
					
							<div class="table-responsive"style="width:50%; height: 100px">
								<table id="srCreditAmtGrid"></table>
								<div id="srJqGridPager"></div>
							</div>
						</div>
					</div>
				</div>
					</div> -->
					<!-- </div> -->
		
			<div class="invoice_button col-lg-offset-3">
			<div class="row">
			   <div class="col-lg-2">
					<input type='button' class="btn btn-success btn-lg bottomButtons" id="btnSubmit" value="Print Bill" onclick="regcreditcustomerbill();">
				</div>	
				
				<div class="col-lg-2">
					<input type="reset" value="Cancel" onclick="window.location.reload()" class="btn btn-lg btn-danger btn-md button_hw button_margin_right" />
				</div>
			</div>
		</div>
		
		</div>
	</form>
	</div>
	</div>
		</div>
	
	</div>
	
		
  </body>
        <div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div> 
</html>