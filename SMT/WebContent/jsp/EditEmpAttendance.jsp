<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.EmployeeDetailsBean"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<head>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<meta charset="utf-8">
<script type="text/javascript"
	src="/SMT/staticContent/js/employeeDetails.js"></script>
<script type="text/javascript">
	function Back()
	{
		window.location = "EmpAttendence.jsp";
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
	z-index: -1;
	opacity: 0.6;
}
#custdetal {
    margin-bottom: 0%;
}
.btnwidth {
    width: 130px !important;
    /* padding: 10px !important; */
    border-radius: 10px;
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
.sub{
 	position: absolute; 
	top: -12px;
	left: 25px;
	font-size: 12px;
	padding: 2px 4px;
	background-color: #f0f0f0;
	font-size: 16px;
	font-weight:bold;
	}
</style>
</head>
<body class="vColor">
	<div class="row">
		<div align="center" id="categorydetailsh2">
			<h2 class="form-name style_heading">Edit Employee Attendance</h2>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12" align="center">
			<hr style="border-top-color: #c1b1b1;">
		</div>
	</div>
	<div class="container" id="custdetal">
		<div class="miscellaneous" style="left:">
			<form class="form-horizontal" method="post" action="" name="empd1">
				<!-- Value of 'name' attribute is used in employeeDetails.js  -->

				<div class="row">

					<div class="invoice_label_up">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">

							<%
								EmployeeDetailsDao eedd = new EmployeeDetailsDao();
								List mList = eedd.getAllMainEmployeeShopWise1(request, response);
							%>
							<input list="emp_drop" id="employee"
								 required>
							<datalist id="emp_drop">
								<%
									for (int i = 0; i < mList.size(); i++) {
										EmployeeDetailsBean detailsBean = (EmployeeDetailsBean) mList.get(i);
								%>
								<option data-value="<%=detailsBean.getEmpId()%>" value="<%=detailsBean.getFirstName()%> <%=detailsBean.getLastName()%>"
									myvalue="<%=detailsBean.getFirstName()%>"
									myvalue1="<%=detailsBean.getMiddleName()%>"
									myvalue2="<%=detailsBean.getLastName()%>"
								>
								
								<%
									}
								%>
							</datalist>
							<label for="employeename">Employee Name <sup style="color: red;">*</sup></label>
						</div>
					</div>

				<!-- </div> -->
				
		<!-- <div class="row"> -->

					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
						id="dayreport">
						<input id="date" name="joiningDate" type="date">
						<label for="Date">Select Date <sup style="color: red;">*</sup></label>
					</div>

					<!-- <div class="col-md-1"></div> -->

					<div class="invoice_label_up">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">

							<select class="" id="type" name="type" name="Select Type" style="padding: 14px;">
				<option value="selectoption" >Select Attendance Type </option>
				<option value="present">Present</option>
				<option value="absent">Absent</option>
				<option value="halfday">Half-Day</option>
			</select><span class="sub">Attendance Type<sup style="color: red;">*</sup></span>
			
						</div>
					</div>


		</div>
</div>
	</div>
				<div class="row editcustmerdetails">
					<div id="btnrow" align="center">
						<div class="invoice_button">
					<!-- <div class="col-md-2"  style="display:inline-block;"> -->
						<input type="button" id="save" name="btn"
							class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth"
							onclick="EditEmpAttendance()" value="Update">
					<!-- </div> -->
					<!-- <div class="col-md-2" style="display:inline-block;"> -->
						<input id="save" name="btn"
							class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth"
							type="reset" onclick="reset()" value="Cancel">
					<!-- </div> -->
					<!-- <div class="col-md-2" style="display:inline-block;"> -->
						<input type="button" value="Back"
							id="listBtn" class="btn btn-large btn-primary btn-md button_hw button_margin_right btnwidth" onclick="Back()" />
					<!-- </div> -->
					</div>
					</div>

				</div>

			</form>
		
</body>