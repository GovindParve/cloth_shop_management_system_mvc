<%@page import="com.smt.hibernate.Stock"%>
<%@page import="com.smt.dao.StockDao"%>
<%@page import="java.util.List"%>
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js" type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">






<script type="text/javascript"> 
		$(document).ready(function () {
	         var table=$("#itemName").dataTable({
	        	 scrollX: true,
	        	 scrollY: 300,
	         });
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
.salereturn ul {
    border: none;
    display: flex;
    justify-content: center;
    border: none;
}
.salereturn a {
    outline: none !important;
    border: none !important;
    border-radius: 10px !important;
    color: #fff;
    background-color: #BA0707;
    font-size: 16px;
}
.salereturn li {
    width: 20%;
    text-align: center;
    margin: 10px;
}
.salereturn li a:hover {
    background-color: #fff !important;
    color: #555 !important;
}
.table-responsive {
    min-height: .01%;
    overflow-x: auto;
    width: 95%;
    /* margin-left: 25px; */
    /* margin-top: 1%; */
    margin: 20px 0;
}
table.table.table-bordered.table-striped.table-condensed.cf.display.dataTable.no-footer {
    width: 100% !important;
}
.dataTables_scrollHeadInner {
    width: 100% !important;
}
table.dataTable.no-footer {
    border-bottom: none !important;
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
.salereturn li {
    width: 25%;
}
#itemName_length {
    float: left;
}
}

@media screen and (max-width: 580px) {
.salereturn li {
    width: 30%;
}
}

@media screen and (max-width: 480px) {
.salereturn ul {
    /* border: none; */
    display: inline-block;
    justify-content: center;
    border: none;
    width: 100%;
}
.salereturn li {
    width: 100%;
    margin: 5px;
    display: flex;
    justify-content: center;
}
.salereturn a {
    font-size: 16px;
    width: 60%;
}
}

#billheading {
	padding-top: 3% !important; 
	position: absolute !important; 
	width: auto !important;
}
#itemName, #itemName1, #itemName2 {
	border: none; 
	border-collapse: collapse !important;
}
</style>
<body id="dt_example" class="vColor">
	<div class="container-fluid">

		<div class="row">
				<div class="form-group" align="left">
				<div class=" col-md-3 control-label" id="billheading">
				</div>
			</div>

			<div align="center" id="allwayreporth2">
				<h2 class="form-name style_heading">Low Stock Inventory Category Wise</h2>
			</div>
		</div>
		<%
		StockDao productForNotification = new StockDao();
			List<Stock> notificationProducts =productForNotification.getAllProductForNotification3(request, response);
	%>
	
	<%
		StockDao productForNotification1 = new StockDao();
			List<Stock> notificationProducts1 =productForNotification1.getAllProductForNotification1(request, response);
	%>
	<%
		StockDao productForNotification2 = new StockDao();
			List<Stock> notificationProducts2 =productForNotification2.getAllProductForNotification2(request, response);
	%>
		

		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		
		<div class="salereturn">
		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab"	href="#below10">Below 10 Qty</a></li>
			<li><a data-toggle="tab" onclick="second()" href="#below20">Below 20 Qty</a></li>
			<li><a data-toggle="tab" href="#below40">Below 40 Qty</a></li>
		</ul>
		</div>
		
		<div class="tab-content" id="tabname" align="center">
		
<!------------------------------------------------ Below 10 Quantity Starts Here ------------------------------------------------>		
		<div id="below10" class="tab-pane fade in active">
		<div class="row" align="center">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-condensed cf display" id="itemName">
					<thead>
						<tr>
						    <th>Category Name</th>
							<th>Barcode No</th>
							<th>Item Name</th>
							<th>Quantity</th>
							<th>Size</th>
							<th>Color</th>
							
							<th>Update Date</th>
						</tr>
					</thead>
					<tbody>
						<%
   			   for(int i=0;i<notificationProducts.size();i++){
	        	   Stock goodsForNotification =(Stock)notificationProducts.get(i);
				%>
						<tr>
							<td><%=goodsForNotification.getCatName()%></td>
							<td><%=goodsForNotification.getBarcodeNo()%></td>
							<td><%=goodsForNotification.getItemName() %></td>
							<td><%=goodsForNotification.getQuantity()%></td>
							<td><%=goodsForNotification.getSize()%></td>
							<td><%=goodsForNotification.getColor()%></td>
							<td><%=goodsForNotification.getDate()%></td>
						</tr>
						<%
					}
				%>
					</tbody>
				</table>
			</div>
		</div>
		</div>
<!------------------------------------------------ Below 10 Quantity Ends Here ------------------------------------------------>

<!------------------------------------------------ Below 20 Quantity Starts Here ------------------------------------------------>		
		<div id="below20" class="tab-pane">
		<div class="row" align="center">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-condensed cf display" id="itemName1">
					<thead>
						<tr>
							<th>Barcode No</th>
							<th>Category Name</th>
							<th>Item Name</th>
							<th>Quantity</th>
							<th>Size</th>
							<th>Color</th>
							
							<th>Update Date</th>
						</tr>
					</thead>
					<tbody>
						<%
   			   for(int i=0;i<notificationProducts1.size();i++){
	        	   Stock goodsForNotification =(Stock)notificationProducts1.get(i);
				%>
						<tr>
							<td><%=goodsForNotification.getBarcodeNo()%></td>
							<td><%=goodsForNotification.getCatName()%></td>
							<td><%=goodsForNotification.getItemName() %></td>
							<td><%=goodsForNotification.getQuantity()%></td>
							<td><%=goodsForNotification.getSize()%></td>
							<td><%=goodsForNotification.getColor()%></td>
							<td><%=goodsForNotification.getDate()%></td>
						</tr>
						<%
					}
				%>
					</tbody>
				</table>
			</div>
		</div>
	</div>
<!------------------------------------------------ Below 20 Quantity Ends Here ------------------------------------------------>	

<!------------------------------------------------ Below 40 Quantity Starts Here ------------------------------------------------>
	<div id="below40" class="tab-pane">
		<div class="row" align="center">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-condensed cf display" id="itemName2">
					<thead>
						<tr>
							<th>Barcode No</th>
							<th>Category Name</th>
							<th>Item Name</th>
							<th>Quantity</th>
							<th>Size</th>
							<th>Color</th>
							<th>Update Date</th>
						</tr>
					</thead>
					<tbody>
						<%
   			   for(int i=0;i<notificationProducts2.size();i++){
	        	   Stock goodsForNotification =(Stock)notificationProducts2.get(i);
				%>
						<tr>
							<td><%=goodsForNotification.getBarcodeNo()%></td>
							<td><%=goodsForNotification.getCatName()%></td>
							<td><%=goodsForNotification.getItemName() %></td>
							<td><%=goodsForNotification.getQuantity()%></td>
							<td><%=goodsForNotification.getSize()%></td>
							<td><%=goodsForNotification.getColor()%></td>
							<td><%=goodsForNotification.getDate()%></td>
						</tr>
						<%
					}
				%>
					</tbody>
				</table>
			</div>
		</div>	
	</div>
<!------------------------------------------------ Below 40 Quantity Ends Here ------------------------------------------------>
		
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
	
	</div>
</body>
</html>
