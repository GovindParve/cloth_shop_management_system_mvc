<%-- <%@page import="com.smt.bean.GetTransactionId"%> --%>
<%@page import="com.smt.bean.allTransactionId"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%@page import="com.smt.bean.SupplierEditBean"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<!--
	<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
	<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
	<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
	<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
	<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
	<script src="/SMT/staticContent/js/jquery-ui.js"></script>
	<script src="/SMT/staticContent/js/jqueryUi.js"></script>
	<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
-->
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">

<link rel="stylesheet" href="/SMT/staticContent/css/purchase_return.css">

<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/js/goodsReturn.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<style type="text/css">
</style>
<%
	Long transactionId = 1l;

	GoodReciveDao data = new GoodReciveDao();
	List trList = data.getLastTransactionNo();

	for (int i = 0; i < trList.size(); i++) {
		allTransactionId st = (allTransactionId) trList.get(i);
		transactionId = st.getPurchaseReturnTransactoinId();
		transactionId++;
	}
	System.out.println("transactionId =========> " + transactionId);
%>
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

#taxcol {
	width: 33%;
	/*     margin-left: -4%; */
}

.table-responsive {
	min-height: .01%;
	overflow-x: auto;
	/* width: 90%; */
	/* margin-left: 25px; */
	margin-top: 1%;
	margin-bottom: 0%;
}
tbody tr:hover {
    background: none !important;
    color: #000 !important;
}
.ui-widget-content.footrow.footrow-ltr td {
    font-size: 14px;
}
#saleinvceh2 {
    margin-top: 0px;
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
		right: 2%;
		z-index: -1;
		opacity: 0.6;
	}
	.table-responsive {
		width: 100%;
		overflow-y: hidden;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		border: none;
		margin-bottom: 0;
		/* margin-left: 6px; */
	}
}
.btnwidth {
	width: 130px !important;
	padding: 10px !important;
}
</style>


<body class="vColor">
	<div class="container-fluid">
		<div class="row">
			<!-- <div class="" id="purchasereturnheading"> -->
			<div class="" id="billheading">
			<div class="vouch">
				<span class="vouchspan">Transaction
					ID :: <%
					out.println(transactionId);
				%>
				</span>
				 <input type="hidden" id="transactionId" name="transactionId"
					value="<%=transactionId%>">
					</div>
					</div>
			<!-- </div> -->
			<div class="" align="center" id="saleinvceh2">
				<h2 class="form-name style_heading">Purchase Return</h2>
			</div>
		</div>
			<div class="row">
				<div class="col-md-12" align="center">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
		
	

	<div class="row">
		<div class="form-group" align="right">
			<div class="col-sm-offset-6 col-md-5 control-label">
				<div id="date" hidden="true">
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

	<div class="purchase_return">
		<form action="supplier" name="supd" method="post">
			<div class="container" id="custdetal">
				<div class="row">
					<div class="purchase_return_up">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">
							<%
								/* SupplierDetailHelper poHelper = new SupplierDetailHelper();
								List supplierList = poHelper.getAllSuppliers(); */

								SupplierDetailDao sdo = new SupplierDetailDao();
								List supplierList = sdo.getSuppAndItemToPReturnDao(request, response);
								System.out.println(supplierList.size());
							%>

							<!-- <input list="supplierId_drop" id="supplierId" onchange="getAllBills();getitems()" required> -->
							<input list="supplierId_drop" id="supplierId" onchange="getitems()" required>
							<datalist id="supplierId_drop">
								<%
									for (int i = 0; i < supplierList.size(); i++) {
										/* SupplierDetail supplier = (SupplierDetail) supplierList.get(i);*/
										SupplierEditBean supplier = (SupplierEditBean) supplierList.get(i);
								%>
								<%-- <option data-value="<%=supplier.getSuppCode()%>" --%>
								<option data-value="<%=supplier.getgRBarcode()%>"
									value="<%=supplier.getSupplierName()%>=><%=supplier.getgRItemName()%>=><%=supplier.getgRSize()%>=><%=supplier.getgRBarcode()%>">
									<%
										}
									%>
								
							</datalist>
							<label>Product<sup style="color: red;">*</sup></label>
						</div>
					</div>
					<div class="col-md-1"></div>
					<div class="purchase_return_up">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-6"
							id="dayreport">
							<textarea style="width: 100%;" id="reasonForPReturn"
								name="reasonForPReturn" required></textarea>
							<label>Purchase Return Reason</label>
						</div>
					</div>
				</div>

				<div class="purchase_return_grid">
					<div class="table-responsive">
						<table id="jqGrid"></table>
						<div id="jqGridPager"></div>
					</div>
				</div>

				<!-- <div class="col-sm-2" align="center">
						<label class="control-label"> Bill No:</label>
					</div>
					<div class="col-sm-3">

						<div class="input-group">
							<span class="input-group-addon"> No </span> <select
								class="form-control input-md" id='billNo' name="billNo"
								onchange="getitems()">
							</select>
						</div>
					</div> -->

				<!-- <div class="row" style="margin-top:10px;padding-bottom: 10px;">
							<div class="col-md-offset-5 col-md-3" align="right">
								<label class="control-label" style="font-size: 22px;"> Gross Total: </label>
							</div>
							<div class="col-md-2">
							 <div class="input-group">
							    <span class="input-group-addon">
							      Rs
						        </span>
								<input type="text" class="form-control" id="returnGrossTotal" style="font-size:25px;height:55px;background-color: #fab787;" readonly="readonly">
							 </div> 
							</div> 
						</div> -->
				<div class="row">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
						id="dayreport"></div>
					<div class="col-md-1"></div>
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
						id="dayreport">
						<input type="text" id="returnGrossTotal"
							style="background-color: #fab787;" readonly="readonly"> <label>
							Gross Total </label>
					</div>
				</div>

				<div class="row" id="btnrow">
					<!-- <div class="col-lg-2 col-lg-offset-4"> -->
					<div class="invoice_button">
						<input type="button" value="Submit" id="btn" onclick="purchasereturn()" class="btn btn-large btn-success btn-md btnwidth" />
					<!-- </div> -->
					</div>
				</div>
			</div>
		</form>

	</div>
	


	<div class="row footer_margin_top" align="center">
		<%@include file="y_commons/footer.jsp"%>
	</div>
</div>
</body>
</html>
