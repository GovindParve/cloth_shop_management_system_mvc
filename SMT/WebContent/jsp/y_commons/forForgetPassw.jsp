<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="com.smt.hibernate.UserDetail"%>
<%@page import="org.hibernate.Session"%>
<%@page import="com.smt.utility.HibernateUtility"%>
<%@ page contentType="text/html; charset=utf-8" language="java"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="" />
<script src="/SMT/staticContent/js/logout.js"></script>
<%
	String type1 = "";
	String name1 = "";
	if (session != null) {
		if (session.getAttribute("user") != null)
		{
			name1 = (String) session.getAttribute("user");
			System.out.println("Login "+name1);
			HibernateUtility hbu1 = HibernateUtility.getInstance();
			Session session2 = hbu1.getHibernateSession();

			org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:usr");
			query1.setParameter("usr", name1);
			UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
			type1 = userDetail1.getTypeId();
			//isHome = true;
		} else {
			response.sendRedirect("/SMT/jsp/login.jsp");
			out.println("Please Login ");
		}
	} else {
		response.sendRedirect("/SMT/jsp/login.jsp");
		out.println("Please Login ");
	}
%>

<%
	String contextPath = request.getContextPath();
%>

<%
	String path = "";
	if(isHome)
		path = "jsp\\";
%>

<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript" src="/SMT/staticContent/guru/js/jquery.min.js">
	
</script>
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


<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.js">
	
</script>
<script type="text/javascript" src="/SMT/staticContent/js/bootstrap.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/bootbox.min.js"></script> -->
<link href="/SMT/staticContent/css/bootstrap.css" rel="stylesheet">
<link href="/SMT/staticContent/css/bootstrap.min.css" rel="stylesheet">
<link href="/SMT/staticContent/y_css/bootstrap-theme.css" rel="stylesheet">
<link href="/SMT/staticContent/y_css/bgChange.css" rel="stylesheet">
<link href="/SMT/staticContent/css/bootstrap-theme.min.css" rel="stylesheet">

<!-- All shortcut key's code here -->

<script type="text/javascript">
	/* Master Moudule keys */
	//Category Entry
	shortcut.add("alt+c", function() {
		window.location.href = "y_category_subcategory.jsp";
	});
	//Category list
	shortcut.add("ctrl+alt+c", function() {
		window.location.href = "s_category_list.jsp";
	});
	//product Entry
	shortcut.add("alt+p", function() {
		window.location.href = "y_product_detail.jsp";
	});
	//product list
	shortcut.add("ctrl+alt+p", function() {
		window.location.href = "s_item_list.jsp";
	});
	//Supplier Entry
	shortcut.add("alt+s", function() {
		window.location.href = "s_supplier_detail.jsp";
	});
	//Supplier List
	shortcut.add("ctrl+alt+s", function() {
		window.location.href = "s_supplier_list.jsp";
	});
	//Customer Entry
	shortcut.add("alt+r", function() {
		window.location.href = "customer_detail.jsp";
	});
	//Customer List
	/* shortcut.add("ctrl+r", function() {
		window.location.href = "creditCustomerList.jsp";
	});*/
</script>
<!-- header start-->
<script src="/SMT/staticContent/y_js/prefixfree.min.js"></script>
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

* {
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
}
</style>
</head>
<body>
	<input type="text" hidden="true" readonly="readonly" id="userType" name="usrerType" value="<%=type1%>">
	<input type="text" hidden="true" readonly="readonly" id="userName" name="userName" value="<%=name1%>">	
</body>
</html>
	