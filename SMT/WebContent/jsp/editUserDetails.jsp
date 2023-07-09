<%@page import="org.hibernate.Session"%>
<%@page import="com.smt.utility.HibernateUtility"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.UserDetailHelper"%>
<%@page import="com.smt.hibernate.UserDetail"%>
<!DOCTYPE html>
<html lang="en">

<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/js/userlogin.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<style>
</style>
<script type="text/javascript">
	function gpToEditUserDetails() {
		window.location = "editUserDetails.jsp";
	}

	function gpToCreateUser() {
		window.location = "create_user.jsp";
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


.col-md-offset-4 {
    margin-left: 23.66667%;
}
@media only screen and (max-width: 1180px) {
.row.col-lg-offset-1 {
    margin-left: 13%;
}
}
@media only screen and (max-width: 991px) {
.row.col-lg-offset-1 {
    margin-left: 6%;
}
.col-md-offset-4 {
    margin-left: 3.66667%;
}
}
@media only screen and (max-width: 767px) {
.row.col-lg-offset-1 {
    margin-left: -2%;
}
}
</style>
</head>

<body class="vColor">
	<div class="container">



		<div class="row">

			<div class="" align="center" id="categorydetailsh2">
				<h2 style="font-weight: bold;">Update User</h2>
			</div>
			<div class="row">
				<div class="col-md-12" align="center">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
		</div>





		<div class="miscellaneous">
			<form action="" method="post" name="createusr" name="createuser">
				<div class="" id="custdetal">
					<div class="row">
						<!-- 								<div class="col-md-2"></div> -->
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<select class="form" id="updateTypeId"
								onchange="getAllUsersToEdit()">
								<option value="select">SELECT</option>
								<option value="admin">Admin</option>
								<option value="cashier">Cashier</option>
								<option value="salesman">Salesman</option>
							</select> <label>Type<sup>*</sup></label>
						</div>
					<!-- </div> -->


					<!-- <div class="row"> -->
						<!-- 							<div class="col-md-2"></div> -->
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<select id="userNameList" onchange="getUsersAllInfo()"></select>
							<label>Username<sup>*</sup></label>
						</div>
						<!-- <div class="col-md-1"></div> -->
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="text" id="uEmail" required> <label>User
									Email<sup>*</sup>
								</label>
							</div>
						</div>
					<!-- </div> -->

					<!-- <div class="row"> -->
						<!-- 								<div class="col-md-2"></div> -->
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="password" id="updatePassword" required> <label>Password<sup>*</sup></label>
							</div>
						</div>
						<!-- <div class="col-md-1"></div> -->
						<div class="invoice_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
								<input type="password" id="UpdateRePassword" required> <label>Re-Password<sup>*</sup></label>
							</div>
						</div>
					</div>

				<div class="row" id="btnrow">
					<div class="invoice_button">
					<!-- <div class="col-lg-2" style="display: inline-block;"> -->

						<input type="button" name="btn" value="Update"
							class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth"
							onclick="updateUserDetails()">

					<!-- </div> -->


					<!-- <div class="col-lg-2" style="display: inline-block;"> -->

						<input type="reset" value="Reset" class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth">

					<!-- </div> -->

					<!-- <div class="col-lg-2" style="display: inline-block;"> -->

						<input type="button" name="btn" onclick="gpToCreateUser();" value="Back" class="btn btn-large btn-primary btn-md button_hw button_margin_right btnwidth">

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
</html>
<%-- <%
      }else
            {
    	  out.println("<span class=\"myspan\">You Can Not view This Page</span>");
          }
    	%> --%>
