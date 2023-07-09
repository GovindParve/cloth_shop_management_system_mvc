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

<head>
<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script> -->
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/product_detail.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/popupwindow.css">
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script> -->
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.popupwindow.js"></script>
<!-- 
	<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
	<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
	<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
	<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
	<script src="/SMT/staticContent/js/jquery.min.js"></script>
	<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
-->
<script src="/SMT/staticContent/y_js/productDetail.js"></script>

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
				
				
				<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
</body>
<!--  --></html>