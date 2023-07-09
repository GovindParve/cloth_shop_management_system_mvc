<%@page import="com.smt.hibernate.GoodReceive"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"
	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all">
<script src="/SMT/staticContent/js/currentStock.js"></script>

<script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#example").dataTable();
			 var tableTools = new $.fn.dataTable.TableTools(table, {
				 'sSwfPath':'//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
				 	'aButtons':['copy','print','csv',{
					 'sExtends':'xls',
					 'sFileName':'Data.xls',
					 'sButtonText': 'Save to Excel'
						}
					],
					 dom: 'Bfrtip',
			         buttons: [
			             'copy', 'csv', 'excel', 'pdf', 'print'
			         ],
				});
					$(tableTools.fnContainer()).insertBefore('#itemName_wrapper');
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
    top: 5px;
    right: 1%;
}
#logo {
    width: 110px;
    height: auto;
    position: fixed;
    top: 9%;
    right: 1%;
    z-index:-1;
    opacity: 0.6;
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
    z-index: -1;
    opacity: 0.6;
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
    opacity: 0.6;
    z-index: -1;
}
}
</style>
<body class="stock_form_img vColor">
	<div class="container-fluid">
		<div class="row">
			<div class="form-group" align="left">
				<div class=" col-md-3 control-label" id="billheading"
					style="padding-top: 3%; position: absolute; width: auto;">
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

			<div align="center" id="allwayreporth2">
				<h2 class="form-name style_heading">Barcode Based Inventory</h2>
			</div>
		</div>
		<%
			GoodReciveDao barCWiseStock = new GoodReciveDao();
			List<GoodReceive> notificationProducts=barCWiseStock.getCategoryWiseStock();
		%>

		<div class="row">
			<div class="col-md-12">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<form action="goodsReturn" method="post" class="form-horizontal">
			<!-- <div class="row">
				<div class="row form-group" style="margin-top: 20px">
					<label class="col-md-3 control-label col-md-offset-2" for=""> Barcode No:<sup>*</sup>
					</label>
					<div class="col-md-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-barcode"></i>
							</span> <input type="text" id="barcode" placeholder="Barcode No"
								class="form-control input-md" type="text">
						</div>
					</div>
					<div class="col-md-3">
						<div class="input-group">
							<input type="button" id="btn" name="save"
								class="btn btn-lg btn-success btn-md button_hw button_margin_right"
								onclick="barcodewisestock()" value="Search" />
						</div>
					</div>
				</div>
										<input type="text" style="background: #f0f0f0; border: 2px;" id="testField" readonly="readonly">
			</div> 
			<br> <br>
			-->

			<div class="row">
				<div class="table-responsive">
					<table
						class="table table-bordered table-striped table-condensed cf"
						id="example" class="display"
						style="border: 2px solid black; border-collapse: collapse;">
						<thead>
							<tr>
								<th>Bill No</th>
								<th>Supplier<br>Name
								<th>Barcode No</th>
								<th>Category Name</th>
								<th>Item Name</th>
								<th>Available Quantity</th>
								<th>Sale Price</th>
								<th>Tax Percentage</th>
								
							</tr>
						</thead>
						
						<tbody>
						<%
   			   for(int i=0;i<notificationProducts.size();i++){
   				GoodReceive barcodeStock =(GoodReceive)notificationProducts.get(i);
				%>
						<tr>
							<td><%=barcodeStock.getBillNo()%></td>
							<td><%=barcodeStock.getSuppName()%>
							<td><%=barcodeStock.getBarcodeNo()%></td>
							<td><%=barcodeStock.getCatName()%></td>
							<td><%=barcodeStock.getItemName() %></td>
							<td><%=barcodeStock.getQuantity()%></td>
							<td><%=barcodeStock.getSalePrice()%></td>
							<td><%=barcodeStock.getVat()%></td>
							
						</tr>
						<%
					}
				%>
					</tbody>
						
					</table>
				</div>
			</div>

		</form>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>






