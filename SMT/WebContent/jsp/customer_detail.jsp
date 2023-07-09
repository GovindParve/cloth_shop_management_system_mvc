<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.CustomerDetailsBean"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<head>
<style>
.lablename{
    font-size: 18px;
    text-align: right;
}
</style>
<meta charset="utf-8">

<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/js/customerDetails.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">

<script type="text/javascript">
	function Customerlist()
	{
		window.location = "creditCustomerList.jsp";
	}
	function editCustomer()
	{
		window.location = "editCreditCustomerDetails.jsp";
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
    right: 2%;
    z-index: -1;
    opacity: 0.6;
}
}
.btnwidth {
	padding-bottom: 10px !important;
	width: 130px !important;
}
</style>
</head>
<body class="vColor">
<div class="container-fluid">
		<div class="row">
			<div align="center" id="categorydetailsh2">
				<h2 class="form-name style_heading">Credit Customer Details</h2>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		
<div class="miscellaneous">		
	<form method="post" action="" name="cstd">
	<div class="container" id="custdetal">
			
			<div class="row">
				
			<div class="invoice_label_up">
					 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
						
						<%
							CustomerDetailsDao dao1 = new CustomerDetailsDao();
           						List unitList =dao1.getAllCustomer();
							%>
						<input list="firstName_drop" id="firstName" required>
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
						<label>First Name<sup style="color: red">*</sup></label>
					</div>
				</div>
					<div class="col-md-1"></div>
					<div class="invoice_label_up">				
					 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
						
						<%
							CustomerDetailsDao dao2 = new CustomerDetailsDao();
           						List middleList =dao2.getAllCustomer();
							%>
						<input list="middleName_drop" id="middleName" required>
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
						<label>Middle Name</label>
					</div>				
					</div>
			</div>
			
		<div class="row">
		<div class="invoice_label_up">
                  <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					
						<%
							CustomerDetailsDao dao3 = new CustomerDetailsDao();
           						List lastList =dao3.getAllCustomer();
							%>
						<input list="lastName_drop" id="lastName" required>
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
						<label>Last Name<sup style="color: red">*</sup></label>
				   </div>	
				   </div>			
			<div class="col-md-1"></div>
				 <div class="invoice_label_up">
				 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
						 <input id="address" name="address " type="text" required>
				        <label>Address<sup style="color: red">*</sup></label>	
			    </div>
			    </div>
	</div>		

	<div class="row">
				<div class="invoice_label_up">
				 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					<input id="contactNo" name="contactNo" maxlength="10" type="text" required>
				    <label>Contact No<sup style="color: red">*</sup></label>
		        </div>
		        </div>
		     
		     <div class="col-md-1"></div>
		<div class="invoice_label_up">        				
		 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				
				 <input id="emailId" name="emailId " type="text" required>
				 	<label>Email ID</label>
		</div>
		</div>
</div>
			<div class="row">	
			<div class="invoice_label_up">		
				 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				<input id="zipCode" name="zipCode" maxlength="6" type="text" required>
					<label>Zip Code</label>
				</div>
				</div>
			</div>

 
			<div class="row" id="btnrow">
				<div class="invoice_button">
				<!-- <div class="col-md-2" id="customerdetailbutton"> -->
					<input type="button" id="save" name="btn" class="btn btn-large btn-success btnwidth" onclick="customerDetails()" value="Submit" />
				<!-- </div> -->	
				
				<!-- <div class="col-md-2" id="customerdetailbutton"> -->
					<input type="button" id="save" name="btn" class="btn btn-large btn-danger btnwidth" type="reset" onclick="reset()" value="Cancel" /> 
				<!-- </div> -->	
				
				<!-- <div class="col-md-2" id="customerdetailbutton"> -->
					<input type="button" value="Edit" id="listBtn" class="btn btn-primary btnwidth" onclick="editCustomer()" />
				<!-- </div> -->	
			
				<!-- <div class="col-md-2" id="customerdetailbutton"> -->
					<input type="button" value="List" id="listBtn" class="btn btn-large btn-info btnwidth" onclick="Customerlist()" />				
				<!-- </div> -->
				</div>
			</div>		
		
		</div>
	</form>
	</div>
</div>


<div class="row footer_margin_top" align="center">
	<%@include file="y_commons/footer.jsp"%>
</div>
</body>
