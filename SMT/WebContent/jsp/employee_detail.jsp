<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%boolean isHome = false;%>
<%@include file="y_commons/header1.jsp"%>
<head>
<meta charset="utf-8">
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">	
<script type="text/javascript"	src="/SMT/staticContent/js/employeeDetails.js"></script>

<script type="text/javascript">
	 function employeelist()
	 {
	 	window.location = "employeeList.jsp";
	 }
	 function editEmployee()
	 {
	 	window.location = "editEmployeeDetails.jsp";
 	 }
</script>
<script type="text/javascript">	
		function cheakForEmployee(){
			<%
			EmployeeDetailsDao catHelper1 = new EmployeeDetailsDao();
	   		List catList1 = catHelper1.getAllMainEmployee();
			%>
			var subCategoryName = $('#firstName').val();
    		var UpSubCatName = subCategoryName.toUpperCase();
    		var duplicate;
			<%
			for(int i=0;i< catList1.size();i++){
				EmployeeDetailsBean subcategory = (EmployeeDetailsBean)catList1.get(i);
			%>
			var subCat = "<%=subcategory.getFirstName()%>";
			var cat = "<%=subcategory.getLastName()%>";
			var subcatName=document.getElementById("firstName").value;
			var catName=document.getElementById("lastName").value;
			var UpValue = subCat.toUpperCase();
			if(UpSubCatName == UpValue && cat == catName)
			{
					duplicate = "found";
			}
			if(subcatName == subCat && cat == catName){
				myAlert("Employee already exist...Duplicate Not allowed");
				//location.reload();
				return false;
			}
			<%
			}
			%>
			if(duplicate == "found"){
    			document.empd.btn.disabled = true;	
    			myAlert("Employee Name Already Exist..!!!");
				//location.reload();
				document.empd.btn.disabled = false;
    			return false;
    		}
		}
	</script>
	
	<script type="text/javascript">
		document.empd.btn.disabled = true;
		employeedetails();
		document.empd.btn.disabled = false;
	
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
	font-size: 16px !important;
	padding: 10px !important;
    width: 130px !important;
}
</style>
	
</head>
<body class="vColor">

<div class="row">
	<div align="center" id="categorydetailsh2">
		<h2 class="form-name style_heading">Employee Details</h2>
	</div>
</div>
<div class="row">
	<div class="col-md-12" align="center">
		<hr style="border-top-color: #c1b1b1;">
	</div>
</div>
<div class="container" id="custdetal">

<div class="miscellaneous">	
	<form class="form-horizontal" method="post" action="" name="empd">
		
			<div class="row">
			
				<div class="invoice_label_up">
					 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<%
								EmployeeDetailsDao cdd = new EmployeeDetailsDao();
           						List cList =cdd.getAllMainEmployee();
							%>
						<input list="firstName_drop" id="firstName" required>
						<datalist id="firstName_drop">
							<%
					           for(int i=0;i<cList.size();i++)
					           {
					        	   EmployeeDetailsBean cat=(EmployeeDetailsBean)cList.get(i);
							%>
							<option data-value="<%=cat.getEmpId()%>"
								value="<%=cat.getFirstName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
						<label for="firstName">First Name<sup>*</sup></label>
						</div>
						</div>
					
						<div class="col-md-1"></div>

				<div class="invoice_label_up">
					 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				
						<%
							EmployeeDetailsDao cdd1 = new EmployeeDetailsDao();
           						List cList1 =cdd1.getAllMainEmployee();
							%>
						<input list="middleName_drop" id="middleName" required>
						<datalist id="middleName_drop">
							<%
					           for(int i=0;i<cList1.size();i++){
					        	   EmployeeDetailsBean cat1=(EmployeeDetailsBean)cList1.get(i);
							%>
							<option data-value="<%=cat1.getEmpId()%>"
								value="<%=cat1.getMiddleName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
							<label for="middleName">Middle Name<sup>*</sup></label>
					
				</div>
			</div>
			</div>

			<div class="row">
				<div class="invoice_label_up">
					 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				
						<%
							EmployeeDetailsDao cdd11 = new EmployeeDetailsDao();
           						List cList11 =cdd11.getAllMainEmployee();
							%>
						<input list="lastName_drop" id="lastName" 
							onchange="cheakForEmployee()" required>
						<datalist id="lastName_drop">
							<%
					           for(int i=0;i<cList11.size();i++){
					        	   EmployeeDetailsBean cat11=(EmployeeDetailsBean)cList11.get(i);
							%>
							<option data-value="<%=cat11.getEmpId()%>"
								value="<%=cat11.getLastName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
						<label for="lastName">Last Name<sup>*</sup></label>
						</div>
						</div>
					
						<div class="col-md-1"></div>

				<div class="invoice_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				<input id="joiningDate" name="joiningDate" type="date">
				<label  for="joiningDate">Joining Date<sup>*</sup></label>
				</div>
				</div>
					
				
			</div>

			<div class="row">
			<div class="invoice_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
			<input id="emailId" name="emailId "  type="text" required>
			<label  for="emailId"> Email ID</label>
			</div>
			</div>
				
							<div class="col-md-1"></div>

				
				<div class="invoice_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				<input id="salary" name="salary"  type="text" required>
				<label  for="salary">Salary<sup>*</sup></label>
				</div>
				</div>
					
			
			</div>

			<div class="row">
				
				<div class="invoice_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				<input id="contactNo" name="contactNo" maxlength="10" type="text" required>
				<label  for="contactNo">Contact No<sup>*</sup></label>
				</div>
				</div>
			<div class="col-md-1"></div>
				<div class="invoice_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
			    <input id="address" name="address "  type="text" required>
			    <label  for="address">Address<sup>*</sup></label>
			    </div>
			    </div>		
			
			</div>
			
			<div class="row">
			<div class="">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				<input id="" name=""   type="file" required>
				<label for="idproof">ID Proof</label>
				</div>
				</div>
				<div class="col-md-1"></div>
				<div class="">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
			    <input id="" name=" "  type="file" required>
			    <label  for="Ephoto">Employee Image</label>
			    </div>
			    </div>
			</div>
			
			<div class="row">
				
				<div class="invoice_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				<input id="zipCode" name="zipCode"   maxlength="6" type="text" required>
				<label for="zipCode">Pin code<sup>*</sup></label>
				</div>
				</div>
				<div class="col-md-1"></div>
				<div class="invoice_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
			    <input id="EmpidNo" name="EmpidNo"  type="text" required>
			    <label  for="Ephoto">Employee Id No</label>
			    </div>
			    </div>
			</div>
			
			<div class="row">
				<div class="invoice_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
				<input id="resignDate" name="resignDate" type="date">
				<label  for="resignDate">Resign Date</label>
				</div>
				</div>
			</div>

			<div class="row" id="btnrow">
				<div class="invoice_button">
			<!-- <div class="col-md-2" id="customerdetailbutton"> -->
					<input type="button" id="btn" name="btn" class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" onclick="employeedetails()" value="Submit">
			<!-- </div> -->		
			<!-- <div class="col-md-2" id="customerdetailbutton"> -->
					<input id="save" name="btn" class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth" type="reset" onclick="reset()" value="Cancel">
		    <!-- </div> -->
		    <!-- <div class="col-md-2" id="customerdetailbutton"> -->			
					<input type="button" value="Edit" id="listBtn" class="btn btn-primary btn-md button_hw button_margin_right btnwidth" onclick="editEmployee()" />
			<!-- </div> -->
			<!-- <div class="col-md-2" id="customerdetailbutton"> -->		
					<input type="button" value="List" id="listBtn" class="btn btn-large btn-info btn-md button_hw button_margin_right btnwidth" onclick="employeelist()"/>
				<!-- </div> -->
				</div>
			</div>
		
	</form>
	</div>
</div>


<div class="row footer_margin_top" align="center">
	<%@include file="y_commons/footer.jsp"%>
</div>
</body>