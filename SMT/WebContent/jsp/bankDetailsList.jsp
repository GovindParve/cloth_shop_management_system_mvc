<%@page import="com.smt.bean.BankDetailsBean"%>
<%@page import="com.smt.dao.BankDetailsDao"%>
<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.bean.ItemList"%>
<%@page import="java.util.List"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script type="text/javascript">
	$(document)
			.ready(
					function() {
						var table = $("#itemName").dataTable({
							/* "sPaginationType": "full_numbers", */
					          "destroy": true,
					          "searching": true,
					         "orderable": true,
					          "paging":   true,
					          "ordering": false,
					          "info":     true,
					          "scrollY": 300,
					          "scrollX": true,
						});
						var tableTools = new $.fn.dataTable.TableTools(
								table,
								{
									'sSwfPath' : '//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
									'aButtons' : [ 'copy', 'print', 'csv', {
										'sExtends' : 'xls',
										'sFileName' : 'Data.xls',
										'sButtonText' : 'Save to Excel'
									} ],
									dom : 'Bfrtip',
									buttons : [ 'copy', 'csv', 'excel', 'pdf',
											'print' ],
								});
						$(tableTools.fnContainer()).insertBefore(
								'#itemName_wrapper');
					});
</script>
<script type="text/javascript">
	function Back() {
		window.location = "bankDetails.jsp";
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
#itemName_length, #list_length {
    float: left;
}
.table-responsive {
    width: 97%;
	border: none !important;
	margin-bottom: 20px;
}
btnwidth {
	width: 130px;
	border-radius: 10px !important;
}
.dataTables_scrollHeadInner {
    width: 100% !important;
}
table.table.table-bordered.table-striped.table-condensed.cf.dataTable.no-footer {
    width: 100% !important;
}
#itemName {
    border: none;
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
		right: 1%;
		z-index: -1;
		opacity: 0.6;
	}
	
	.table-responsive {
		width: 95%;
		overflow-y: hidden;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		border: none;
		margin-bottom: 10%;
		margin-left: 6px;
	}
}
@media screen and (max-width: 480px) {
	.table-responsive {
		width: 90%;
	}
}
</style>
<body id="dt_example" class="vColor">
	<div class="container-fluid">
		<div class="row">
			<div align="center" id="categorylisth2">
				<h2 class="form-name style_heading">Bank List</h2>
			</div>
		</div>
		<%
			BankDetailsDao dao = new BankDetailsDao();
			List list12 = dao.getAllBankList();
		%>
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
				<table class="table table-bordered table-striped table-condensed cf" id="itemName" class="display" style="border-collapse: collapse;">
					<thead>
						<tr>
							<th>Sr No</th>
							<th>Bank Name</th>
							<th>Account Number</th>
							<th>IFSC Number</th>
							<th>Contact Number</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
						<%
							for (int i = 0; i < list12.size(); i++) {
								BankDetailsBean sr = (BankDetailsBean) list12.get(i);
						%>
						<tr>
							<td class="align"><%=sr.getSrNo()%></td>
							<td class="align"><%=sr.getBankName()%></td>
							<td class="align"><%=sr.getAccountNumber()%></td>
							<td class="align"><%=sr.getBankIfscCode()%></td>
							<td class="align"><%=sr.getContactNo()%></td>
							<td class="align"><%=sr.getAddress()%></td>
						</tr>
						<%
							}
						%>
					</tbody>
				</table>
			</div>
		</div>
		
		<!-- <div class="wrapper" align="center"> -->
			<div class="row" id="btnrow">
		<div class="invoice_button">
			<input type="button" value="Back" id="listBtn" class="btn btn-primary btn-md button_hw button_margin_right btnwidth"	onclick="Back()" />
				</div>
				</div>
		<!-- </div> -->
		
	</div>	
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	
</body>
</html>
