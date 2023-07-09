
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
<script src="/SMT/staticContent/y_js/supplier.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script>
	$(document).ready(function() {
		getAllMAinSupp();
	});
</script>
<script type="text/javascript">
	function Back() {
		window.location = "s_supplier_detail.jsp";
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
.table-responsive {
    width: 95%;
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
		width: 56px;
		font-size: 8px;
		position: fixed;
		top: 15px;
		right: 20%;
		height: 3%;
	}
	#currentUser {
		color: blue;
		font-weight: 600;
		font-size: 13px;
		position: fixed;
		top: 1px;
		right: 20%;
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

#suppName {
	/* border: 1px solid black;  */
	border-collapse: collapse;
	border: none;
}
table.dataTable.no-footer {
    border-bottom: none;
}
.btnwidth {
	 border-radius: 10px; 
	 padding: 10px;
}
/* .dataTables_wrapper .dataTables_paginate .paginate_button */
.dataTables_wrapper .dataTables_paginate .paginate_button:hover {
    color: white !important;
    border: 1px solid #111;
    background-color: #a94442;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #de1717), color-stop(100%, blue));
    background: -webkit-linear-gradient(top, #de1717 0%, blue 100%);
    background: -moz-linear-gradient(top, #de1717 0%, blue 100%);
    background: -ms-linear-gradient(top, #de1717 0%, blue 100%);
    background: -o-linear-gradient(top, #de1717 0%, blue 100%);
    background: linear-gradient(to right, #de1717 0%, blue 100%);
}
.table-responsive {
	min-height: .01%; 
	overflow-x: auto; 
	margin-left: 6px; 
	margin-top: 0%;
	margin-bottom: 3%;
	border: none !important;
}
.dataTables_wrapper {
   	border: none !important;
}
@media screen and (max-width: 480px) {
button.dt-button, div.dt-button, a.dt-button {
    margin-bottom: 10px;
}
}
</style>

<body id="dt_example" class="vColor">
	<div class="container-fluid" id="supplierlist">
		<div class="row">
			<div align="center">
				<h2 class="form-name style_heading">Supplier List</h2>
			</div>
		</div>
		<div class="row" hidden="true">
			<div class="form-group" align="right">
				<div class="col-sm-offset-8 col-md-4 control-label">
					<div id="date">
						<label id="demo"></label>
						<script>
							var date = new Date();
							document.getElementById("demo").innerHTML = date
									.toDateString();
						</script>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		<div class="row" align="center">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-condensed cf" id="suppName" class="display">
					<thead>
						<tr>
							<th>Sr No</th>
							<th>Supplier Type</th>
							<th>Supplier Name</th>
							<th>Address</th>
							<th>City</th>
							<th>Mobile No</th>
							<th>Contact Person</th>
							<th>Email</th>
							<th>GSTTIN/UIN No</th>
							<th>Pin Code</th>
							<th>Supplier Account<br> Name</th>
							<th>Account Number</th>
							<th>Ifsc Code</th>
							<th>Upi Id</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>

		<!-- <div class="wrapper" align="center"> -->
		<div class="row" id="btnrow">
		<div class="invoice_button">	
			<input type="button" value="Back" id="listBtn" class="btn btn-primary btnwidth"	onclick="Back()" />
			</div>
			</div>
		<!-- </div> -->
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>
