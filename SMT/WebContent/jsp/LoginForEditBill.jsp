<!-- LoginForEditBill.jsp -->
<!DOCTYPE html>
<%@page import="com.smt.hibernate.LoginEditBillHibernate"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.LoginDetailsDao"%>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<title>Bill Edit Login</title>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link href="/SMT/staticContent/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/login.css">
<link href="/SMT/staticContent/css/metisMenu.min.css" rel="stylesheet">
<link href="/SMT/staticContent/css/sb-admin-2.css" rel="stylesheet"> 
<link href="/SMT/staticContent/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/bootstrap.min.js"></script>
<script src="/SMT/staticContent/js/metisMenu.min.js"></script>
<script src="/SMT/staticContent/js/sb-admin-2.js"></script>
<!-- <script src="/SMT/staticContent/js/logout.js"></script> -->
<script src="/SMT/staticContent/js/LoginForEditBill.js"></script>

<style>
.btn-success:focus {
	box-shadow: none !important;
}
</style>

</head>

<body background="" >
<section class="background">
	<div class="container">
	<div class="">
	<div class="login">
	<div class="col-lg-6 my-auto">
	<div class="logincontent">
					<h2>Please Enter Password</h2>
					<div>
						<form action="login" method="post">
						<div align="center">
								<div class="control">
								    <input name="pass" id="pass" type="password" class="mui-textfield mui-textfield--float-label" required>
								    <label>Password</label>
								</div>
						</div>
								<!-- Change this to a button or input when using this as a form -->
								
								<div class="row" align="center">
						            <div class="col-md-6 col-sm-6 col-xs-6 col-lg-6 ">
										<button type="button" onclick="editBillLogin();" class="btn btn-md btn-lg btn-success" style="width:80%;">Login</button>
									</div>
									
									
									<div class="col-md-6 col-sm-6 col-xs-6 col-lg-6  forgotpass"  id="forgotpassword">
								<a onclick="location.href='/SMT/jsp/Miscellaneous.jsp';">
									    		<b>Home Page</b>
								</a>
							</div>
									
									
							<!-- <div class="col-md-4 col-sm-4 col-xs-4 col-lg-4">
								<button type="reset" class="btn btn-md btn-lg btn-danger">Reset</button>
							</div> -->
							  </div>
							<br/>						  
					</form>		
				</div>
	        </div>
	        </div>
	        </div>
	        </div>
        </div>
        </section>
      <!-- <script type="text/javascript">
		const labels = document.querySelectorAll(".control label");
			labels.forEach((label) => {
				label.innerHTML = label.innerText.split("")
				.map((letter, idx) => `<span style="transition-delay:${idx * 60}ms">${letter}</span>`).join("");
			});
	</script> -->
</body>
</html>