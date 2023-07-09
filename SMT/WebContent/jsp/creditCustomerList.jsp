<%@page import="com.smt.bean.GetCreditCustomerDetails"%>
<%@page import="com.smt.dao.CustomerDetailsDao"%>
<%@page import="java.util.List"%>
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
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">	
<html>
<head>
<title>Credit Customer List</title>
<script type="text/javascript">
	function Back() {
		window.location = "customer_detail.jsp";
	}
</script>
</head>
<script type="text/javascript">
	$(document)
			.ready(
					function() {
						var table = $("#list").dataTable({
							
							 "sPaginationType": "full_numbers",
					          "destroy": true,
					          "searching": true,
					          //orderable: true,
					          "paging":   true,
					          "ordering": false,
					          "info":     true,
					          "scrollY": 300,
					          "scrollX": true,
 
							dom : 'Bfrtip',
							buttons : [ {
								extend : 'copyHtml5',
								title : 'Credit Customer List'
							}, {
								extend : 'csvHtml5',
								title : 'Credit Customer List'
							}, {
								extend : 'excelHtml5',
								title : 'Credit Customer List'
							}, {
								extend : 'pdfHtml5',
								title : 'Credit Customer List'
							}, /*'print',*/
							{
								extend : 'print',
								title : 'Credit Customer List'
							}, ],

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
								/* dom: 'Bfrtip',
								buttons: [
								     	{
								           extend: 'copyHtml5',
								           title: 'Supplier List'
								       },
								       {
								           extend: 'csvHtml5',
								           title: 'Supplier List'
								       },
								       {
								           extend: 'excelHtml5',
								           title: 'Supplier List'
								       },
								       {
								           extend: 'pdfHtml5',
								           title: 'Supplier List',
								       }, /*'print',*/
								/*{
								    extend: 'print',
								    title: 'Supplier List',
								},
								], */
								});
						$(tableTools.fnContainer()).insertBefore(
								'#list_wrapper');
					});
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
table.display.dataTable.no-footer {
    width: 100% !important;
}
#date {
    padding-top: 15px;
}
#categorylisth2 {
    margin-top: 0px;
}
#list {
    border: none;
}

/* label#demo {
    font-size: 18px;
    position: absolute;
    top: 20%;
    left: 5%;
    font-weight: 600;
} */

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
/* label#demo {
    font-size: 18px;
    position: absolute;
    top: 18%;
    left: 2%;
    font-weight: 600;
} */
}
.btnwidth {
	border-radius: 10px !important; 
	padding: 10px !important;
}
.wrapper {
	margin-top: 5% !important;
}
/* .dataTables_wrapper {
    margin: 0 20px;
} */
.table-responsive {
    margin-bottom: 20px;
    border: none !important;
    width: 95%;
}
.dataTables_wrapper {
	/* border: none !important; */
}
@media screen and (max-width: 480px) {
button.dt-button, div.dt-button, a.dt-button {
    margin-bottom: 10px;
}
.table-responsive {
    margin-left: 20px;
}
/* label#demo {
    font-size: 14px;
    top: 17%;
    left: 2%;
} */
}
</style>

<body id="dt_example" style="min-height: 300px;" class="vColor">
<div class="container-fluid">
	<div class="row">
		
		<div class="form-group" align="left">
			<div class="control-label" id="billheading">
		<div id="date">
		<label id="demo"></label>
		<script>
			var date = new Date();
			document.getElementById("demo").innerHTML = date.toDateString();
		</script>
	</div>
	</div>
	</div>	
	
		<div align="center" id="categorylisth2">
			<h2 class="form-name style_heading">Credit Customer List</h2>
		</div>
	</div>	
		
	
		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
	
	<%
		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list12 = dao.getCreditCustomerList();
	%>
	

<div class="row" align="center">
	<div id="demo_jui">
	<div class="table-responsive">
		<table id="list" class="display" border="1">
			<thead>
				<tr>
					<th>First Name</th>
					<th>Middle Name</th>
					<th>Last Name</th>
					<!-- <th>GSTTIN/UIN No</th> -->
					<th>Contact No</th>
					<th>Email Id</th>
					<th>Address</th>
					<th>Pin Code</th>
				</tr>
			</thead>

			<tbody>
				<%
					for (int i = 0; i < list12.size(); i++) {
						GetCreditCustomerDetails sr = (GetCreditCustomerDetails) list12.get(i);
				%>
				<tr>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align"><%=sr.getMiddleName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					<%-- <td class="align"><%=sr.getAadhar()%></td> --%>
					<td class="align"><%=sr.getContactNo()%></td>
					<td class="align"><%=sr.getEmail()%></td>
					<td class="align"><%=sr.getAddress()%></td>
					<td class="align"><%=sr.getZipCode()%></td>
				</tr>
				<%
					}
				%>
			</tbody>
		</table>
		</div>
	</div>
	</div>
	
	<!-- <div class="wrapper" align="center"> -->
		<div class="row" id="btnrow">
		<div class="invoice_button">
		<input type="button" value="Back" id="listBtn" class="btn btn-primary btnwidth" onclick="Back()" />
		</div>
		</div>
	<!-- </div> -->
	
	</div>
</body>
</html>
