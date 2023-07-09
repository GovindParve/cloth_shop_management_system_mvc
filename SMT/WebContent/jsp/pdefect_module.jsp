
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<head>

<style>
body{
width: 100%;
overflow-x: hidden;
}
.popup{
margin:0;
}
.form-group1{
margin-bottom: 40px;
}
.btn_pur {
    margin-left: 21%;
}
.col-md-2.col-lg-2 {
    margin-right: 63px;
}
.col-lg-offset-1 {
    margin-left: 3.333333%;
}
.col-md-4.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 46%;
}

@media ( max-width : 1180px) {

.col-md-4.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 50%;
    margin: 0;
}
}
@media ( max-width : 991px) {
.col-md-2.col-lg-2 {
    margin-right: -26px;
    width: auto;
    display: inline-block;
}
.btn_pur {
    margin-left: 19%;
}
}
@media (max-width: 767px){
.col-md-4.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 44%;
    margin-left: 30px;
    margin-right: -38px;
}
}
</style>
<style>
li a {
    font-weight: 600;
    text-decoration: none;
    padding: 15px 14px;
    display: block;
    color: #fff;
    transition: all 0.2s ease-in-out 0s;
    font-size: 13px;
}
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
	z-index: -1;
	opacity: 0.6;
}

.table-responsive {
    min-height: .01%;
    overflow-x: auto;
    /* width: 90%; */
    margin-left: 25px;
    margin-top: 0%;
    margin-bottom: 1%;
}
#popupcreditcol {
    width: 33%;
}
#popupcreditcol2 {
    width: auto;
    margin-left: 18%;
}
.form-group {
    margin-bottom: 0;
}
.col-md-2.col-lg-4 {
    margin-right: 15px;
}
.col-md-3.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 90%;
}	
span {
    font-size: 11px;
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
#logo {
	width: 110px;
	height: auto;
	position: fixed;
	top: 10%;
	right: 2%;
	z-index: -1;
	opacity: 0.6;
}
#popupcreditcol2 {
    width: auto;
    margin-left: 23%;
}
.col-md-2.col-lg-4 {
    margin-right: 58px;
}
}
@media ( max-width : 991px) {
#popupcreditcol2 {
    width: auto;
    margin-left: 10%;
}
.col-md-2.col-lg-4 {
    margin-right: 58px;
}
#popupcreditcol {
    width: 33%;
    margin-left: 0;
}
.col-md-2.col-lg-4 {
    margin-right: -26px;
}
.col-md-3.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 90%;
    margin-left: 0%;
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
		top: 10%;
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
		margin-bottom: 1%;
		margin-left: 6px;
	}
}
</style>
<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script> -->
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/goodRecive.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/popupwindow.css">
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.popupwindow.js"></script>
</head>
<body>
<div class="col-md-3 col-md-offset-2 align" align="center" id="goodreceiveh2">
				<h2 class="form-name style_heading" style="font-size:33px;">Defect module for Purchase</h2>
			</div>
			
		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-6 col-md-5 control-label">
					
				</div>
			</div>
		</div>
	
   <div class="goodRecive">
		<form action="goods" method="post" name="good" class="" id="good">
			<!-- <div class="row"> -->
				<!-- <div class="form-group"> -->
		<div class="container" id="custdetal">
		
			<div class="row">
			<div class="good_rcv_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
					<input type="text" id="billNo" id="jander" name="billNo" autofocus="autofocus" required/>
						    <label>Bill No<sup style="color: red">*</sup></label>
				    </div>
				    </div>
				    
					<div class="col-md-1"></div>
					
			<div class="good_rcv_label_up">		
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
					<div id="suppListDiv">						
											
						<input list="supplierId_drop" id="supplierId" class="" onchange="getTaxType()" style="background-color: #f0f0f0" required>
							<span class="godbtn">	
								<button type="button" onclick="suppDetailsDivAction(1);">
									 <i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i>
								</button>
							</span>
							<datalist id="supplierId_drop">
															
							</datalist>
							<label>Supplier Name<sup style="color: red">*</sup></label>
					</div>						
					</div>
				</div>
			</div>
			<div class="row">
			
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
	                    <input type="date" id='pDate' name="pDate" class="" id="jander" placeholder="Purchase Date" value="<%=todayDate1%>" />
						<label>Purchase Date<sup style="color: red">*</sup></label>
			</div>
			
			<div class="col-md-1"></div>
			
		<div class="good_rcv_label_up">
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
					    <input type="text" id='contactPerson' name="contactPerson" class="" required/>
						<label>Contact Person</label>
			</div>
						
		</div>		
			</div>
			
			<div class="row">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
							 <input type="date" id='purchaseDueDate' name='purchaseDueDate' class="" id="jander" />
						     <label>Payment Due Date:<!-- <sup style="color: red">*</sup> --></label>
			    </div>	
			    		     
						<div class="col-md-1"></div>
						
			<div class="good_rcv_label_up">	
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
						 <input type="text" id='bookingNo' name="bookingNo" onkeypress="return isNumber(event)" onchange="getProductList1()" required/>
						<label>Booking No</label>
			    </div>
			    
			</div>
			
		</div>
		<div class="row">
					<div class="good_rcv_label_up">
					<div id="itemListDiv">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-9" id="goodrcvcol">
							
						
								<input list="itemId_drop" id="itemName" class="" onchange="getProductList1()" style="background-color: #f0f0f0" required>
								
								<datalist id="itemId_drop">
									
									
								</datalist>
								<label>Item List<sup style="color: red">*</sup></label>
				</div>
				</div>
				</div>
				
					   <span class="godbtn" style="margin-left: -26px;">
						   <div class="dropdown">
	                       		<button class=" dropdown-toggle" type="button" data-toggle="dropdown">
	                       		<i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i></button>
	                       			<ul class="dropdown-menu">
	                       				<li><a onclick="categoryDetailsDivAction(1)">Add category<i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i> </a></li>
	                       				<li><a onclick="subCategoryDetailsDivAction(1)">Add sub-category<i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i> </a></li>
	                       				<li><a onclick="productDetailsDivAction(1)">Add product<i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i> </a></li>
	                       			</ul>
	                        </div>
                        </span>
					</div>
			
			<div class="table-responsive gdrcv_grid" id="" style="margin-left: -307px; width: 143%;">
				<div class="table-responsive">
					<table id="jqGrid" ></table>
					<div id="jqGridPager"></div>
				</div>
			</div>
				<div class="row" >
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="goodrcvtotalcol">
							<input type="text" id='totalQuantity' name="totalQuantity" id="jander" value="0" readonly="readonly" />
							<label>Total Quantity</label>
				 </div>	
							
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"id="goodrcvtotalcol">
								 <input type="text" id='totalGst' name="totalGst" id="jander" value="0" readonly="readonly"  />
						         <label>Total GST</label>
						     </div>
			   
							
						
				<!-- <div class="row"> -->
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"id="goodrcvtotalcol">
							<input type="text" id='totalIgst' name="totalIgst" id="jander" value="0" readonly="readonly" />
						    <label>Total IGST</label>
					   </div> 
							
			
				<!-- </div> -->
				 </div>
				 
				<div class="row" >
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="goodrcvtotalcol">
								<input type="text" id='totalSgst' name="totalSgst" id="jander" value="0" readonly="readonly" />
								<label>SGST</label>
					</div>	
								
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"id="goodrcvtotalcol">
						 <input type="text" id='totalCgst' name="totalCgst" id="jander" value="0" readonly="readonly"  />
				         <label>CGST</label>
				    </div>							
				</div>
				
				<div class="row" >
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="goodrcvtotalcol">
						<input type="text" id='transaportExpense' name="transaportExpense" value="0" onkeypress="return isNumberForExpense(event)">
						<label>Transaport Expense</label>
					</div>	
								
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"id="goodrcvtotalcol">
						 <input type="text" id='labourExpense' name="labourExpense" value="0" onkeypress="return isNumberForExpense(event)"/>
				         <label>Labour Expense</label>
				    </div>
				   
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"id="goodrcvtotalcol">
						<input type="text" name="resolution" id="resolution" readonly="readonly" value="0" style="background-color: #fab787; font-size: 20px;"/>
						<input type="hidden" id='resolution1' name="resolution1"/>
					    <label>Gross Total</label>
				    </div>							
				</div>	
			</div>
			</form>
			</div>
</body>
</html>