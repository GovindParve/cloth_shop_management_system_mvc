<%@page import="com.smt.bean.expenditureList"%>
<%@page import="com.smt.dao.ExpenditureDetailsDao"%>
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
<script src="/SMT/staticContent/shree/buttons.html5.min.js"	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script type="text/javascript">
	$(document)
			.ready(
					function() {
						var table = $("#itemName").dataTable({
							"scorllX": true,
							"scrollY": 300
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
		window.location = "expenditureDetails.jsp";
	}
</script>
<head>
<style>

#billheading {
	/* padding-top: 3% !important;  */
	width: auto !important;
}
.table-responsive {
	width: 100% !important;
	margin-bottom: 20px;
	border: none !important;
}
#itemName {
	/* border: 1px solid black !important;  */
	border-collapse: collapse !important; 
	text-align: center !important;
}
.wrapper {
	margin-top: 15px !important;
}
.btnwidth {
	padding: 10px !important; 
	border-radius: 10px !important;
}
#itemName_length, #list_length {
    float: left;
}
#expenditurelisth2 {
    margin-top: 0px;
}
#date {
    padding-top: 15px;
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

@media screen and (max-width: 480px) {
.dataTables_wrapper .dataTables_filter input {
    width: 75%;
}
}
</style>
</head>
<body id="dt_example" class="vColor">
	<div class="container">
		<div class="row">
			<div class="form-group" align="left">
				<div class="control-label" id="billheading">
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
			<div class="" align="center" id="expenditurelisth2">
				<h2 class="form-name style_heading">Expenditure List</h2>
			</div>
		</div>
		<%
			ExpenditureDetailsDao dao = new ExpenditureDetailsDao();
			List list12 = dao.getAllExpedName();
		%>

		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<div class="row" align="center">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-condensed cf"
					id="itemName" class="display">
					<thead>
						<tr>
							<th style="text-align: center; width: 25;">Sr No</th>
							<th style="text-align: center;">Expenditure<br>Name
							</th>
						</tr>
					</thead>
					<tbody>
						<%
							for (int i = 0; i < list12.size(); i++) {
								expenditureList sr = (expenditureList) list12.get(i);
						%>
						<tr>
							<td class="align"><%=sr.getSerialNo()%></td>
							<td class="align"><%=sr.getExpenditureName()%></td>
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
			<input type="button" value="Back" id="listBtn" class="btn btn-primary btnwidth" onclick="Back()" />
			</div>
			</div>
				<!-- </div> -->
		
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>
