<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/buttom.js"></script>
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/js/jquery.dataTables.js" type="text/javascript"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<link href="/SMT/staticContent/css/dataTa.css" rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/css/dataTables.jqueryui.min.css" rel="stylesheet" type="text/css" media="all">
<link href="/SMT/staticContent/css/select.css" rel="stylesheet" type="text/css" media="all">
<link href="/SMT/staticContent/css/button.css" rel="stylesheet"	type="text/css" media="all">
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link href="/SMT/staticContent/css/jquery.dataTables.tableTools.css" rel="stylesheet" type="text/css" media="all" />
	
	
	
<script src="/SMT/staticContent/js/jquery.dataTables.tableTools.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/js/profitAndLoss.js"></script>

<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">

<style>
.left-tab-new {
	width: 192px;
	background: #ba0707;
	color: white;
	border-radius: 0px;
}
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
    opacity: 0.6;
    right: 1%;
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
    opacity: 0.6;
    z-index: -1;
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
    opacity: 0.6;
    z-index: -1;
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
 	padding-bottom: 30px !important;
}

@media screen and (max-width: 480px) {
.dataTables_wrapper .dataTables_filter input {
    width: 70%;
}
}

</style>


<body class="vColor">
	<div class="container" id="reportheight">
		<div class="row">
			<div align="center" id="prolossheading">
				<h2 class="form-name style_heading">Profit And Loss</h2>
			</div>
			<div class="row">
				<div class="col-md-12" align="center">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
		</div>
		
		 <div class="miscellaneous">
			<form class="form-horizontal" method="post" action="" name="profitLoss">
				 <div class="">
					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="profitreport">	
						<input type="date" id="fisDateExpense" type="text">
						<label  for="">From<sup>*</sup></label>
						</div>								

					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="profitreport">	
					 <input type="date" id="endDateExpense" type="text">
					 	<label  for="">To<sup>*</sup></label>
						</div>						
					</div>
						
					<!-- <div class="col-md-2" id="btnsub"> -->
					<div id="btnrow" align="center">
					<div class="invoice_button">
						<input type="button" id="btn" name="save" class="btn btn-lg btn-success btn-md button_hw btnwidth"
							onclick="validateProfitAndLoss();" value="Search" />
							</div>
							</div>
					<!-- </div> -->	
					
					</div>
		      </form>                   
           </div>
		
		<div>
		<div class="row">
			<div class="col-lg-12" style="margin-bottom: 30px">
				<table id="example1" class="display" style="width: 100%;">
					<thead align="center">
						<tr>
							<th>EXPENSES</th>
							<th></th>
						</tr>
						<tr>
							<th>Name</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th></th>
							<th></th>
						</tr>
					</tfoot>
				</table>
				
				<div hidden="true">
					Total Income Amount = <input type="text" id="totalExpenseAmount" readonly="readonly">
				</div>
			</div>
		 <div class="col-md-1"></div> 
			<div class="col-lg-12" style="margin-bottom: 40px">
				<table id="example2" class="display" style="width: 100%;">
					<thead align="center">
						<tr>
							<th>INCOME</th>
							<th></th>
						</tr>
						<tr>
							<th>Name</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th></th>
							<th></th>
						</tr>
					</tfoot>
				</table>
				<div hidden="true">
					Total Income Amount = <input type="text" id="totalIncomeAmount" readonly="readonly">
				</div>
			</div>
		</div>
		</div>
		<div hidden="true">
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">	
				<input id="totalProfit" type="text">
				<label for="totalProfit">Profit</label>
			</div>								

			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4">	
				<input id="totalLoss" type="text">
				<label for="totalLoss">Loss</label>
			</div>		
		
		</div>
		
		</div>
		
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
		</body>
		</html>