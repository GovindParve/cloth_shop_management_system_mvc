<%-- <%@page import="com.smt.bean.getLastTransactionNo"%> --%>
<%@page import="com.smt.hibernate.GoodReceive"%>
<%@page import="com.smt.bean.GoodreciveBillBean"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%@page import="com.smt.bean.SupplierEditBean"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.VatEntry"%>
<%@page import="com.smt.dao.VatEntryDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.bean.ProductNameBean"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" href="/SMT/staticContent/css/editGoodRecive.css">
<script src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script src="/SMT/staticContent/js/jquery-ui.js"></script>
<script src="/SMT/staticContent/js/jqueryUi.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/editGoodReceive.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<style type="text/css">
</style>
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
    z-index:-1;
    opacity: 0.6;
 }
 #taxcol{
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
    z-index: -1;
    opacity: 0.6;
}
.table-responsive {
    width: 100%;
    overflow-y: hidden;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    border: none;
    margin-bottom: 0;
   /*  margin-left: 6px; */
}
	}
}
#billheading {
	padding-top: 20px !important;
}
.btnwidth {
	width: 130px !important;
	padding: 10px !important
}

@media screen and (max-width: 580px) {
.container-fluid {
    width: 113%;
}
}
</style>
      

<body class="vColor">
	<div class="container-fluid">
		<div class="row">
				<div class="form-group" align="center">
				<div class="control-label" id="billheading">
				</div>
			</div>
		
			<div class="editpurchaseheading" align="center" id="saleinvceh2">
				<h2 class="form-name style_heading">Edit Purchase</h2>
			</div>
<%-- 			<div  class="col-md-3 col-md-offset-2 align">	
					<span align="right" style="color: red;margin-right: 180px;font-size: 27px;">Transaction ID :: <%out.println(transactionId); %></span>
			</div> --%>
		</div>

		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

<div class="editgdrcv">

		<form action="supplier" name="supd" method="post" class="form-horizontal">
		<div class="container" id="custdetal">
		<div class="row">
		<div class="edit_purches_labelup">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
			
						<input id='voucherNo' autofocus="autofocus" name="voucherNo" onchange="getItemsFromVoucherNo()" required/>
					    <label>Voucher No<sup style="color: red">*</sup></label>
					</div>
		</div>			
					<!-- <div class="col-md-1"></div> -->
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"  id="dayreport">
                            <input type="text" id="supplierId"  readonly="readonly">
							<input type="hidden" id="supplierId123" class="form-control" readonly="readonly">
							<label>Supplier Name<sup style="color: red">*</sup></label>
				   </div>
						
			</div>
		
			<div class="row">
				<div class="edit_purches_labelup">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
						 <input type="text" id="billNo" name="billNo" required/>
							 <label>Bill No<sup style="color: red">*</sup></label>
						</div>
			    </div>
					
				<!-- <div class="col-md-1"></div>	 -->
					<div class="col-sm-2" align="center" hidden="true">
						<label class="control-label" style="padding-right:31px">Update Supplier Name:<sup
							style="color: red;"><sup style="color: red">*</sup></sup>
						</label>
					</div>
					<div class="col-sm-3" hidden="true">
						<%
							SupplierDetailHelper poHelper = new SupplierDetailHelper();
							List supplierList = poHelper.getAllSuppliers();
						%>
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-user"></i>
							</span> <input list="updateSupplierId_drop" id="updateSupplierId" class="form-control" placeholder="Update Supplier Name" onchange="getCurrentNewSupplierData()">
							<datalist id="updateSupplierId_drop">
								<%
									for (int i = 0; i < supplierList.size(); i++)
									{
										SupplierDetail supplier = (SupplierDetail) supplierList.get(i);
								%>
								<option data-value="<%=supplier.getSupplierId()%>" value="<%=supplier.getSupplierName()%>,<%=supplier.getSuppCode()%>">
								<%
									}
								%>
								
							</datalist>
						</div>
					</div>
			
			<!-- </div> -->
			
			
			<!-- <div class="row"> -->
				<div class="edit_purches_labelup">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					<input id='contactPerson' name="contactPerson" required/>
						<label>Contact Person</label>
				</div>
				</div>
						
					<!-- <div class="col-md-1"></div> -->
						
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
					 <input type="date" id='pEDate' name="pEDate"  id="jander"  />
						 	<label>Purchase Date<sup style="color: red">*</sup></label>
				</div>
					
				</div>
				
<!-- grid -->
	
			<div class="edit_good_rcv_grid">
				<div class="table-responsive">
					<table id="jqGrid"></table>
					<div id="jqGridPager"></div>
				</div>
			</div>
	
<!--grid end  -->
	
				<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
						<input type="text" id='totalQuantity' name="totalQuantity"  id="jander" value="0" readonly="readonly" />
						<label>Total Quantity:</label>
						</div>
						<!-- <div class="col-md-1"></div> -->
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<input type="text" id="editGrossTotal" readonly="readonly">
								<input type="hidden" id="finalGrossTotalHidden"  readonly="readonly">
								<input type="hidden"  id="pendingBillpaymentHidden"  readonly="readonly">
								<label >Gross Total</label>
						</div>
						

						 <div class="col-sm-1" align="center" hidden="true">
							<label class="control-label">Total GST:</label>
						</div>

						<div class="col-sm-2" hidden="true">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> <input type="text" id='totalGst' name="totalGst"
									class="text-border form-control" placeholder="Total Gst"
									style="background-color: rgba(251, 243, 0, 0.27)" id="jander"
									value="0" readonly="readonly" />
							</div>
						</div>

						<div class="col-sm-2" align="center" hidden="true">
							<label class="control-label">Total IGST:</label>
						</div>
						<div class="col-sm-2" hidden="true">
							<div class="input-group">
								<span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> <input type="text" id='totalIgst' name="totalIgst"
									class="text-border form-control" placeholder="Total Igst"
									style="background-color: rgba(251, 243, 0, 0.27)" id="jander"
									value="0" readonly="readonly" />
							</div>
						</div>
				</div>

	<div class="row row_margin" hidden="true">
		<div class="form-group">
			<div class="col-sm-1 col-sm-offset-1" align="center">
				<label class="control-label">new supp pendingAmount:</label>
			</div>

			<div class="col-sm-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="glyphicon glyphicon-hand-right"></i>
					</span> <input type="text" id='newSuppPendingAmount' name="newSuppPendingAmount" class="text-border form-control" style="background-color: rgba(251, 243, 0, 0.27)" id="jander" value="0" readonly="readonly"/>
				</div>
			</div>
		</div>
	</div>

<!-- 	<div class="row"> -->						
	<!-- </div> -->	
	
		<div class="editgdrcv_button">
		<div class="row" id="btnrow">
		<!-- <div class="col-md-2 col-lg-offset-4"> -->
		<div class="invoice_button">
			<input type="button" value="Submit" id="btn" onclick="validateEditPurchaseGrid()" class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
		<!-- </div> -->
		</div>
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
