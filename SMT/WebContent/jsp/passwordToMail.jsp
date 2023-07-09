<!-- this is product details jsp -->
<%@page import="com.smt.hibernate.UserDetail"%>
<%@page import="com.smt.helper.UserDetailHelper"%>
<%@page import="com.smt.dao.SubCategoryDao"%>
<%@page import="com.smt.hibernate.SubCategory"%>
<%@page import="com.smt.bean.ItemList"%>
<%@page import="com.smt.bean.ProductDetailBean"%>
<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.ProductRegister"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<% boolean isHome = false;%>
<head>
<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script> -->
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/product_detail.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/popupwindow.css">
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.popupwindow.js"></script>
<script src="/SMT/staticContent/js/logout.js"></script>
<script type="text/javascript" src="/SMT/staticContent/guru/js/jquery.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/bootstrap.min.css">
<title>Embel Technology</title>
<link rel="stylesheet" href="/SMT/staticContent/y_css/bootstrap.min.css">
<%-- <%
	if (isHome) {
%> --%>
<link rel="stylesheet" href="staticContent/y_css/style.css" />
<%-- <%
	} else {
%> --%>
<link rel="stylesheet" href="../staticContent/y_css/style.css" />
<%-- <%
	}
%> --%>
<script src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<%-- <%
	if (isHome) {
%> --%>
<link rel="stylesheet" href="staticContent/y_css/style.css" />
<%-- <%
	} else {
%> --%>
<link rel="stylesheet" href="../staticContent/y_css/style.css" />
<%-- <%
	}
%> --%>
<meta name="viewport" content="width=device-width,initial-scale=1">

<!--  Guru fonts-->

<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script> 
<script type="text/javascript"	src="/SMT/staticContent/guru/js/jquery.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/guru/js/bootstrap.js"></script>
<script type="text/javascript"	src="/SMT/staticContent/guru/js/bootstrap.min.js"></script>
<!-- <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script> -->
<link href="/SMT/staticContent/guru/css/bootstrap.css" rel="stylesheet"/>
<link href="/SMT/staticContent/guru/css/bootstrap.min.css" rel="stylesheet"/>
<link href="/SMT/staticContent/guru/css/bootstrap-theme.css" rel="stylesheet"/>
<link href="/SMT/staticContent/guru/css/bootstrap-theme.min.css" rel="stylesheet"/>
<!-- Font awesome (social icon) -->
<link href="/SMT/staticContent/guru/css/font-awesome.css" rel="stylesheet"/>
<link href="/SMT/staticContent/guru/css/font-awesome.min.css" rel="stylesheet"/>
<script type="text/javascript" src="/SMT/staticContent/guru/js/npm.js"></script>
<script type="text/javascript" src="/SMT/staticContent/guru/js/tooltip.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/shortcut.js"></script>
<!-- Fonts -->
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/fontawesome-webfont.eot" />
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/fontawesome-webfont.svg" />
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/fontawesome-webfont.ttf" />
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/fontawesome-webfont.woff" />
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/fontawesome-webfont.woff2" />
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/FontAwesome.otf" />
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/glyphicons-halflings-regular.eot" />
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/glyphicons-halflings-regular.svg" />
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/glyphicons-halflings-regular.ttf" />
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/glyphicons-halflings-regular.woff" />
<link rel="stylesheet" href="/SMT/staticContent/guru/fonts/glyphicons-halflings-regular.woff2" />
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">

<!--y_temporaryStockReport.jsp-->
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/bootstrap.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/bootbox.min.js"></script> -->
<link href="/SMT/staticContent/css/bootstrap.css" rel="stylesheet">
<link href="/SMT/staticContent/css/bootstrap.min.css" rel="stylesheet">
<link href="/SMT/staticContent/y_css/bootstrap-theme.css" rel="stylesheet">
<link href="/SMT/staticContent/y_css/bgChange.css" rel="stylesheet">
<link href="/SMT/staticContent/css/bootstrap-theme.min.css" rel="stylesheet">
<script src="/SMT/staticContent/y_js/prefixfree.min.js"></script>

<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<style>
@import
	url(http://fonts.googleapis.com/css?family=roboto:400,400italic,600,700,800)
	;

*, html, body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre,
	form, label, fieldset, input, p, blockquote, th, td {
	margin: 0;
	padding: 0;
}

article, aside, figure, footer, header, hgroup, nav, section {
	display: block;
}
*{
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

html {
	-webkit-font-smoothing: antialiased;
}

a {
	color: #BA0707;
	text-decoration: none;
}

a:hover {
	color: #BA0707;
}

body {
	color: #000000;
	font: 14px "roboto", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	line-height: 1;
	width: 100%;
}

nav {
	display: block;
	background: #8c7674
}

.menu {
	display: block;
}

.menu li {
	display: inline-block;
	position: relative;
	z-index: 100;
}

.menu li:first-child {
	margin-left: 0;
}

.menu {
	background: #353535;
}

li a {
	font-weight: 600;
	text-decoration: none;
	padding: 15px 20px;
	display: block;
	color: #fff;
	transition: all 0.2s ease-in-out 0s;
}

.menu li a:hover, .menu li:hover>a {
	color: #fff;
	background: #BA0707;
	text-decoration: none;
}

.menu ul {
	visibility: hidden;
	opacity: 0;
	margin: 0;
	padding: 0;
	width: 250px;
	position: absolute;
	left: 0px;
	background: #fff;
	z-index: 99;
	transform: translate(0, 20px);
	transition: all 0.2s ease-out;
}
.menu .ul {
	visibility: hidden;
	opacity: 0;
	margin: 0;
	padding: 0;
	width: 150px;
	position: absolute;
	left: 0px;
	background: #fff;
	z-index: 99;
	transform: translate(0, 20px);
	transition: all 0.2s ease-out;
}

.menu ul:after {
	bottom: 100%;
	left: 20%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(255, 255, 255, 0);
	border-bottom-color: #fff;
	border-width: 6px;
	margin-left: -6px;
}

.menu ul li {
	display: block;
	float: none;
	background: none;
	margin: 0;
	padding: 0;
}

.menu ul li a {
	font-size: 15px;
	font-weight: bold;
	display: block;
	color: #797979;
	text-decoration: none;
	background: #fff;
}

.menu ul li a:hover, .menu ul li:hover>a {
	background: #BA0707;
	color: #fff;	
}

.dropdown-height
{
overflow-y: scroll;
height: 80vh;
}

.menu li:hover>ul {
	visibility: visible;
	opacity: 1;
	transform: translate(0, 0);
}

.menu ul ul {
	left: 150px;
	top: 0px;
	visibility: hidden;
	opacity: 0;
	transform: translate(20px, 20px);
	transition: all 0.2s ease-out;
}

.menu ul ul:after {
	left: -6px;
	top: 10%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(255, 255, 255, 0);
	border-right-color: #fff;
	border-width: 6px;
	margin-top: -6px;
}

.menu li>ul ul:hover {
	visibility: visible;
	opacity: 1;
	transform: translate(0, 0);
}

.responsive-menu {
	display: none;
	width: 100%;
	padding: 10px 8px;
	background: #E95546;
	color: #fff;
	text-transform: uppercase;
	font-weight: 600;
}

.responsive-menu:hover {
	background: #E95546;
	color: #fff;
	text-decoration: none;
}

a.homer {
	background: #BA0707;
}
#forpass {
    width: 50%;
    margin-left: 25%;
}
.btnwidth {
    width: 150px !important;
    /* padding: 10px !important; */
}

@media screen and (max-width: 992px) {
#forpass {
    width: 60%;
    margin-left: 20%;
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
		font-size: 12px;
	}
	a.homer {
		background: #E95546;
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
#forpass {
    width: 70%;
    margin-left: 15%;
}	
}

@media screen and (max-width: 480px) {
#forpass {
    width: 90%;
    margin-left: 5%;
}
}
</style>

<script type="text/javascript">

// CHECK USER 
   function checkUserName()
   {		    
       <%
			UserDetailHelper uHelper = new UserDetailHelper();
	   		List uList = uHelper.getAlluserName();
		%>
		var userName = $('#userNameFP').val();
	  		
	  		var duplicate;
		<%
			for(int i=0;i<uList.size();i++){
				UserDetail uDetails = (UserDetail)uList.get(i);
  		%>
  		
  		var dbValue ="<%=uDetails.getUserName()%>";
  		if(userName == dbValue)
		{
			duplicate = "found";
		}
    	<%
		}
  		%>
  		if(duplicate == "found")
      	{	
  		}
  		else
      	{
  			document.forgotPass.btn.disabled = true;
			alert("User Is Not Is Registered");
			document.forgotPass.btn.disabled = false;
  			return false;
  		}
}	    
</script>

<script type="text/javascript">
function back()
{
	window.location = "login.jsp";
}
 </script>
</head>
<body class="vColor">
	<div class="container">
		<div class="row">
			<div align="center" id="categorylisth2">
				<h2 class="form-name style_heading">Forget Password</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

	<div class="product_detail">
		<form action="pro" method="post" name="forgotPass" class="form-horizontal">
	      <div class="container" id="categoryListOfProductDetails">	
	
			<div class="row">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="forpass">
					<input type="text" input-sm" id='userNameFP' name="userNameFP" onchange="checkUserName()">
					<label>User Name<sup style="color: red;">*</sup></label>
				</div>
			</div>
			
			<div class="prd_det_btn">
			<div class="row" id="btnrow">
				<!-- <h3 align="center" style="color: red; font-size: 17px;">Please Give Size 'mtr' for fabric Type of Products</h3> -->
				<div class="invoice_button" align="center">
					<div style="">
						<input type="button" onclick="sendPassToMail()" name="btn" style="width: 160px;" id="btn" value="Recover Password" class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
						<input type="reset" value="Cancel" onclick="window.location.reload()" style="width: 140px;" class="btn btn-lg btn-danger btn-md button_hw button_margin_right btnwidth" />
						<input type="button" onclick="back()" id="btn" value="Back" style="width: 140px;" class="btn btn-lg btn-primary btn-md button_hw button_margin_right btnwidth" />
						<!-- <input type="button" onclick="goodReceive()" id="btn" value="Good Receive" style="width: 140px;background:#585858;" class="btn btn-lg btn-primary btn-md button_hw button_margin_right" />
						<input type="button" onclick="productList()" id="btn" value="List" style="width: 140px;" class="btn btn-lg btn-info btn-md button_hw button_margin_right" /> -->
					</div>	
				</div>
			</div>
			</div>
		</div>
		</form>
		
     </div>
     
		<div class="row footer_margin_top" align="center">
		</div>
	</div>
</body>
</html>