<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.smt.hibernate.SubCategory"%>
<%@page import="com.smt.dao.SubCategoryDao"%>
<%@page import="com.smt.bean.GoodreciveBillBean"%>
<%@page import="com.smt.dao.GoodReciveDao"%>
<%@page import="com.smt.hibernate.VatEntry"%>
<%@page import="com.smt.dao.VatEntryDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.bean.ProductNameBean"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>

<%
       Long voucherNo = 1l;
%>
<%
    GoodReciveDao data = new GoodReciveDao();
	List voucherList  = data.getLastVoucherNo();
	for(int i=0;i<voucherList.size();i++)
	{
		GoodreciveBillBean st = (GoodreciveBillBean)voucherList.get(i);
		voucherNo = st.getVoucherNo();
		voucherNo++;
	}      
%>

<%
    String pattern = "yyyy-MM-dd";
  	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
  	String todayDate = simpleDateFormat.format(new Date());
  	System.out.println(todayDate);
%>

<head>

<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/gdr1.css">
<style>
body {
	width: 100%;
	overflow-x: hidden;
}
.popup {
	margin:0;
}
.form-group1 {
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

<script type="text/javascript">

		// CATEGORY 
	    function cheakForAvailableCategory()
	    {		    
	        <%
				CategoryHelper catHelper = new CategoryHelper();
		   		List catList = catHelper.getAllMainCategories();
			%>
			var catName = $('#categoryName').val();
    		var UpCatName = catName.toUpperCase();
    		var duplicate;
			<%
				for(int i=0;i<catList.size();i++){
				Category category = (Category)catList.get(i);
    		%>
    		
    		    var value ="<%=category.getCategoryName()%>";
    		    var UpValue = value.toUpperCase();
				if(UpCatName == UpValue)
				{
					duplicate = "found";
				}
		    <%
				}
    		%>
    		if(duplicate == "found")
        	{	
    			myAlert("Category Name Already Exist..!!!\nPLEASE ENTER OTHER CATEGORY");
    			return false;
    		}
    		else
        	{
    			valAddMainCat();
    		}
		}    
	    
	    // SUB CATEGORY 
	    function cheakForSubCat()
	    {
	    	<%
	    		SubCategoryDao catHelper1 = new SubCategoryDao();
	      		List catList1 = catHelper1.getAllSubCategories();
	    	%>
	    		var subCategoryName = $('#subcategoryName').val();
	      		var UpSubCatName = subCategoryName.toUpperCase();
	      		var duplicate;
	    	<%
	    		for(int i=0;i< catList1.size();i++)
	    		{
	    			SubCategory subcategory = (SubCategory)catList1.get(i);
	    	%>
	    	var subCat = "<%=subcategory.getSubcatName()%>";
	    	var cat = "<%=subcategory.getCatName()%>";
	    	var subcatName=document.getElementById("subcategoryName").value;
	    	var catName=document.getElementById("fkRootcatId").value;
	    	var UpValue = subCat.toUpperCase();
	    	if(UpSubCatName == UpValue && cat == catName)
	    	{
	    			duplicate = "found";
	    	}
	    	if(subcatName == subCat && cat == catName){
	    		myAlert("subcategory already exist...Duplicate Not allowed");
	    		return false;
	    	}
	    	<%
	    	}
	    	%>
	    	if(duplicate == "found")
	    	{
	    		myAlert("Sub Category Name Already Exist..!!!");
	      		return false;
	      	}
	    }	    
</script>

<script type="text/javascript">
	function grasstotal1()
	{
		var total = document.getElementById("resolution1").value;
		var extraDiscount = document.getElementById("extraDiscount").value;
		extraDiscount = 0;
		var disAmount = (extraDiscount / 100) * total;
		var gross = +total - +disAmount;
		document.getElementById("resolution").value = gross.toFixed(2);
	}
	function grasstotal()
	{
		var extraDiscount = document.getElementById("extraDiscount").value;
		extraDiscount = 0;
		var total = document.getElementById("resolution1").value;
		if(extraDiscount != "")
		{
			var disAmount = (extraDiscount / 100) * total;
			var gross = +total - +disAmount;
			var total = gross.toFixed(2);;
			var expence = document.getElementById("expence").value;
			var gross = +total + +expence;
			document.getElementById("resolution").value = gross;
		} else {
			var expence = document.getElementById("expence").value;
			var gross = +total + +expence;
			document.getElementById("resolution").value = gross;
		}
	}
	 function otherExpenceAmountTotal()
     {
     	var total=$('#resolution1').val();

     	var otherExpenceAmount=$('#transaportExpense').val();
     	
     	var otherExpenceAmount1=$('#labourExpense').val();
     		TotalOtherExpenceAmount=otherExpenceAmount;
     		TotalOtherExpenceAmount1=otherExpenceAmount1;
     		var grossTotalAmt=+total+ +TotalOtherExpenceAmount+ +TotalOtherExpenceAmount1;
     		document.getElementById("transaportExpense").value =  Math.round(TotalOtherExpenceAmount * 100) / 100;
     		document.getElementById("resolution").value =  Math.round(grossTotalAmt * 100) / 100;
     }
	 function otherExpenceAmountTotal1()
     {
     	var total=$('#resolution1').val();

     	var otherExpenceAmount=$('#labourExpense').val();
     	var otherExpenceAmount1=$('#transaportExpense').val();
     	
     		TotalOtherExpenceAmount=otherExpenceAmount;
     		TotalOtherExpenceAmount1=otherExpenceAmount1;
     		var grossTotalAmt=+total+ +TotalOtherExpenceAmount+ +TotalOtherExpenceAmount1;
     		document.getElementById("labourExpense").value =  Math.round(TotalOtherExpenceAmount * 100) / 100;
     		document.getElementById("resolution").value =  Math.round(grossTotalAmt * 100) / 100;
     }
</script>

<script>
	function getValidateRegGoodReceive()
	{
		document.good.btnSubmit.disabled = true;
		validateRegGoodReceive();
	}
	
	function getValidateRegGoodReceive1()
	{
		document.good.btnSubmit1.disabled = true;
		validateRegGoodReceive1();
	}
</script>

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
<!-- <script type="text/javascript" src="/SMT/staticContent/js/bootstrap.min.js"></script> -->
<script src="/SMT/staticContent/y_js/newgoodsreceived.js"></script>
<script src="/SMT/staticContent/y_js/supplier.js"></script>
<script src="/SMT/staticContent/y_js/category.js"></script>
<script src="/SMT/staticContent/y_js/subcategory.js"></script>
<script src="/SMT/staticContent/y_js/productDetail.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">

<script>
</script>
<style>
li a {
	font-weight: 700;
	text-decoration: none;
	padding: 16px 25px;
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
    width: 50%;
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
    width: 80%;
    margin-left: 10%;
}
.col-md-4.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 90%;
    margin-left: 5%;
}
#subCategoryDialogDiv {
    height: 260px !important;
}
#productDetailsDialogDiv {
   /*  height: auto !important; */
}	
/* span {
    font-size: 11px;
} */
#gdrcv_grid {
    margin-left: 0px;
    width: 100% !important;
    margin-bottom: 20px;
}
tbody tr:hover {
    background: none !important;
    color: #000 !important;
}
/* span {
    font-size: 15px;
} */
#goodreceiveh2 {
    margin-top: 0px;
}
.categoryheading {
    margin-top: 0px;
}
.row.prdt_grid {
    margin: 20px 0;
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
		font-size: 12px;
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
.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-resizable {
    position: absolute !important;
    height: auto !important;
    width: 90% !important;
    left: 5% !important;
	z-index: 1px;
}
.col-md-3.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 60%;
    margin-left: 20%;
}
.col-md-4.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 60%;
    margin-left: 20%;
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
   	 	width: 50%;
    	margin-left: 0;
	}	
	.col-md-2.col-lg-4 {
    	margin-right: -26px;
	}
	/* .col-md-3.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    	width: 90%;
    	margin-left: 0%;
	} */
.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-resizable {
    position: absolute !important;
    height: auto !important;
    width: 90% !important;
    left: 5% !important;
	z-index: 1px;
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

@media screen and (max-width:580px) {
.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-resizable {
    position: absolute !important;
    height: auto !important;
    width: 100% !important;
    left: 5% !important;
    z-index: 1px;
}
.container-fluid {
    width: 113%;
}
}

@media screen and (max-width: 480px) {
.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-resizable {
    position: absolute !important;
    height: auto !important;
    width: 90% !important;
    left: 5% !important;
    z-index: 1px;
}
#popupcreditcol {
    width: 100%;
}
.col-md-3.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 90%;
    margin-left: 5%;
}
#productDetailsDialogDiv {
    height: 950px !important;
}
.size {
    margin-bottom: 30px;
}
.godbtn .dropdown-menu {
    left: -120px;
}
}

#suppDetailsDiv {
    height: 50% !important;
}
.sub{
 	position: absolute; 
	top: -12px;
	left: 25px;
	font-size: 12px;
	padding: 2px 4px;
	background-color: #f0f0f0;
	font-size: 16px;
	font-weight:bold;
}

.btnwidth {
	width: 130px !important;
} 
#popupcreditcol2 {
	padding-top: 10px;
}
#productSizePD {
	margin-bottom: 10px;
}
</style>
<script type="text/javascript">
	function isNumberForExpense(evt)
	{
		
		var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        {
           return false;
        }
        return true;	
	}
</script>
</head>
<body class="purchase_form_img vColor">
	<div class="container-fluid" id="popupblur" >
		<div class="row">
<!-- 			<div class="voucher"> -->
			<div class="" id="billheading">
			<div class="vouch">	
				<span class="vouchspan">Voucher No :: <%out.println(voucherNo);%></span>
				<input type="hidden" readonly="readonly" id="voucherNo" name="voucherNo" value=<%=voucherNo%>>
			</div>	
			</div>
<!-- 		</div> -->
			<div class="categoryheading" align="center" id="goodreceiveh2">
				<h2 class="form-name style_heading">Purchase</h2>
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
					
				</div>
			</div>
		</div>
		
<!-- popup Dialog box -->

		<div id="myDialogBox" title="My Dialog Box">
			<div id="myContentLayer">
				<p></p>
			</div>
		</div>
		
<!--End popup Dialog box  -->

	<!-- 	<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div> -->
		

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
						<%
							SupplierDetailHelper poHelper = new SupplierDetailHelper();
							List supplierList = poHelper.getAllSuppliers();
						%>					
						<input list="supplierId_drop" id="supplierId" class="" onchange="getTaxType()" style="background-color: #f0f0f0" required>
							<span class="godbtn">	
								<button type="button" onclick="suppDetailsDivAction(1);">
									 <i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i>
								</button>
							</span>
							<datalist id="supplierId_drop">
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
							<label>Supplier Name<sup style="color: red">*</sup></label>
					</div>						
					</div>
				</div>	
				</div>
				<!-- </div> -->
	<!-- 		</div> -->
								
<!-- ====================================================================== SUPPLIER DETAILS Starts Here ================================================================ -->
					
	<!-- <div class="container-fluid" style="border: 3px solid; padding-bottom: 20px; display: none; margin-bottom:35px;" id="suppDetailsDiv"> -->
	<div class="container-fluid" id="suppDetailsDiv" style="display: none;">
		<div class="row" style="padding-top: 10px">
		
			<div align="center">
				<h2 class="form-name style_heading">Supplier Details</h2>
			</div>
		</div>
			
		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #000000;">
			</div>
		</div>
		<div class="popup">
		<div class="miscellaneous">
			<div class="container" style="width: auto;" id="custdetal">
			
			<div class="row form-group">		
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="dayreport" >
			<select class="" id="type" name="type" name="Select Type">
			<option value="selectoption" >Select Supplier Type </option>
			<option value="registered">Registered</option>
			<option value="unregistered">Unregistered</option>
			<option value="registeredcomposite">Registered Composite</option>
			</select> <span class="sub">Supplier Type<sup style="color: red;">*</sup></span> 
			</div>
			<!-- </div> -->
			
			<!-- <div class="row form-group"> -->	
						
				<div class="popup_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">
					<input type="text" name="supplierName" id="supplierName" required />
					<label>Supplier Name<sup style="color: red;">*</sup></label>
					</div>
					</div>
										
			<!-- 			  <div class="col-md-1"></div> -->
					
					<div class="popup_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">
					 <input type="text" id="address" name="address" required />
					 <label>Address</label>
					 </div>
					 </div>				
			<!-- </div> -->			
			
			<!-- <div class="row form-group">	 -->		
				
				<div class="popup_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">		
				<input type="text" name="supplierCode" id="supplierCode" required />
				<label>Supplier Code</label>
				</div>
				</div>
			<!-- </div> -->
			
			<!-- <div class="row form-group"> -->				
				
					<div class="popup_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">	
					 <input type="text" id="city" name="city" required/>
					 <label>City<sup style="color: red;">*</sup></label>
					 </div>
					 </div>
					
			<!-- 	  <div class="col-md-1"></div> -->
				
					<div class="popup_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">	
					<input type="text" id="pin" name="pin" maxlength="6" required/>
					<label>Pin Code</label>
					</div>
					</div>				
			<!-- </div> -->

			<!-- <div class="row form-group"> -->
				
					<div class="popup_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">	
				 <input type="text" id="contactPerson" name="contactPersonSupp" required/>
				 <label>Contact Person</label>
					</div>
					</div>	
					
            <!-- <div class="col-md-1"></div> -->					
					<div class="popup_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">
					 <input type="text" id="email" name="email" required/>
					 <label>E-mail</label>
					 </div>
					 </div>
			<!-- </div> -->

			<!-- <div class="row form-group"> -->
				
				<div class="popup_label_up">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">	
				<input type="text" id="mobileno" name="mobileno" onkeypress="return isNumber(event)" maxlength="10" required/>
				<label>Mobile No<sup style="color: red;">*</sup></label>
				</div>
				</div>
				
<!--             <div class="col-md-1"></div> -->
				
				 <div class="popup_label_up">
				 <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">	
				 <input type="text" id="panNo" name="panNo" required />
				 <label>GST/TIN/UIN No</label>
				 </div>
				 </div>
				 
			       </div>
						<input type="hidden" value="POPUPSUPPDATAILS" id="popJspId" />

			<div class="row" id="btnrow">
				<div class="invoice_button">
			<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="popupcreditcol2"> -->
				<!-- <div class="col-md-2 col-lg-4" style="display:inline-block;"> -->
					<input type="button" value="Save" name="saveSuppDBtn" id="saveSuppDBtn" onclick="validateSupplierDetails();" class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth"/>
				<!-- </div> -->
				<!-- <div class="col-md-2 col-lg-4" style="display:inline-block;"> -->
					<input type="button" value="Cancel" name="cancelSuppDBtn" id="cancelSuppDBtn" onclick="suppDetailsDivAction(0); emptyFields();" class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth"/>
				<!-- </div> -->
				<!-- </div> -->
				</div>
				</div>
			</div>
				
		</div>	
		</div>
		</div>	
			
					
<!-- ============================================================== /SUPPLIER DETAILS Ends Here ======================================================================= -->					

			<div class="row">
			
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
	                    <input type="date" id='pDate' name="pDate" class="" id="jander" placeholder="Purchase Date" value="<%=todayDate%>" />
						<label>Purchase Date<sup style="color: red">*</sup></label>
			</div>
			
			<div class="col-md-1"></div>
			
		<div class="good_rcv_label_up">
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
					    <input type="text" id='contactPerson1' name="contactPerson" class="" required/>
						<label>Contact Person</label>
			</div>
						
		</div>		
			</div>
			
			<div class="row">
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">	
							 <input type="date" id='purchaseDueDate' name='purchaseDueDate' class="" id="jander" style="background-color: #fab787" />
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
			
<!-- 		
			<div class="row" hidden="true">
			
			<%/* 
				VatEntryDao tax = new VatEntryDao();
				List taxList = tax.getTaxDetailsList();
				VatEntry taxRange = null;
					for (int i = 0; i < taxList.size(); i++)
					{
						if(i > 0)
						{
							break;
						}
						else
						{
							taxRange = (VatEntry) taxList.get(i);
						}
						System.out.println("taxRange.getVatPercentage() =====> "+taxRange.getVatPercentage());
						System.out.println("taxRange.getStartPrice() =====> "+taxRange.getStartPrice());
						System.out.println("taxRange.getEndPrice() =====> "+taxRange.getEndPrice());
						
					} */
			%>
			
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Bill No:<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="billNo" id="jander" name="billNo"
								autofocus="autofocus" class="form-control" placeholder="Bill No" />
						</div>
					</div>
				</div>
				<div></div>
			</div>
					
			
			
				<div class="form-group">
				
				<div class="col-sm-1 col-sm-offset-2" align="center">
						<label class="control-label">GST%:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<input type="text" id='gstRangePer' name="gstRangePer" readonly="readonly" value="" class="form-control"/>
						</div>
					</div>
				
					<div class="col-sm-1" align="center">
						<label class="control-label">StartPrice:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							 <input type="text" id='startPrice' name="startPrice" readonly="readonly" value="" class="form-control"/>
						</div>
					</div>

					<div class="col-sm-1" align="center">
						<label class="control-label">EndPrice</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<input type="text" id='endPrice' name="endPrice" readonly="readonly" value="" class="form-control"/>
						</div>
					</div>
				</div>
			</div>
			
-->
	
			<div class="row" hidden="true">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Tax Type:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<input type="text" id='taxType' name="taxType" class="form-control" readonly="readonly" placeholder="Select Supplier"/>
						</div>
					</div>
					<div>
					</div>
				</div>
			</div>


<!-- 			<div class="row"></div> -->
				<!-- <div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label" for="billType">Type:<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-4">
						<div class="col-md-4 col-xs-6 ">
							<label class="radio-inline"> <input type="radio"
								name="car" value="Gst" id="gst" checked>
							<h4 style="margin-top: 0px;">GST</h4>
							</label>
						</div>
						<div class="col-md-6 col-xs-6 col-md-ffset-1 ">
							<label class="radio-inline"> <input type="radio"
								name="car" value="noGst" id="nogst">
							<h4 style="margin-top: 0px;">No GST</h4>
							</label>
						</div>
					</div>
				</div> -->				

				<div class="row">
					<div class="good_rcv_label_up">
					<div id="itemListDiv">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-9" id="goodrcvcol">
							<%
								ProductDetailHelper item = new ProductDetailHelper();
								List itemList = item.getAllItemName(request, response);
							%>
						
								<input list="itemId_drop" id="itemName" class="" onchange="getProductList1()" style="background-color: #f0f0f0" required>
								
								<datalist id="itemId_drop">
									<%
										for (int j = 0; j < itemList.size(); j++) {
											ProductNameBean itm = (ProductNameBean) itemList.get(j);
									%>
									<option data-value="<%=itm.getCaregoryName()%>"
										value="<%=itm.getItemName()%> :::>>> <%=itm.getCaregoryName()%> :::>>> <%=itm.getSubCat()%>"
										myvalue="<%=itm.getItemName()%>"
										myvalue1="<%=itm.getSubCatid()%>"
										myvalue2="<%=itm.getProductid()%>"
										myvalue3="<%=itm.getColor()%>" 
										myvalue4="<%=itm.getSize()%>"
										myvalue5="<%=itm.getFkCatId()%>"									
										>										
										<%
											}
										%>
									
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
	                       				<li><a onclick="subCategoryDetailsDivAction(1)">Add subcategory<i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i> </a></li>
	                       				<li><a onclick="productDetailsDivAction(1)">Add product<i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i> </a></li>
	                       			</ul>
	                        </div>
                        </span>
					</div>
			
			<div class="table-responsive gdrcv_grid" id="gdrcv_grid">
				<div class="">
					<table id="jqGrid" ></table>
					<div id="jqGridPager"></div>
				</div>
			</div>
						
<!-- ============================================================== CATEGORY DETAILS Starts Here ======================================================================= -->
			<div id="categoryDialogDiv" style="display: none;">
			<div class="popup">
			
	    	<div class="row">
			<h2> Add Category</h2>
			</div>
			<div class="container" style="width:auto;margin: 0;">
			
			<div class="row">
			
			<div class="popup_label_up">
			<div class="col-md-3 col-sm-12 col-xs-12 col-xl-3 col-lg-3">
			<input type="hidden" value="POPUPCATDATAILS" id="popUpCatJspId" />
			<input list="catId_drop" id="categoryName" name="categoryName"style="background-color: f0f0f0;" required>
			<datalist id="catId_drop">
			  <input type="text" id="testField" readonly="readonly" />
				
				 <%
                      for(int i =0 ;i<catList.size();i++)
	                        {
                                Category cat = (Category)catList.get(i);
                  %>
                  <option data-value="<%=cat.getPkCategoryId()%>"value="<%=cat.getCategoryName()%>">
			     <%
							}
				 %>
										
			</datalist>
			<label>Category <sup style="color: red;">*</sup></label>

			</div>
			</div>
			</div>
			
	<div class="row" id="btnrow">
		<!-- <div class="btn_pur"> -->
		<div class="invoice_button">
		<!-- <div class="col-md-2 col-lg-2" style="display:inline-block;"> -->
		<input type="button" name="subCatBtn" id="subCatBtn" onclick="cheakForAvailableCategory();" value="Save" class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
			 <!-- </div> -->
			 
			 <!-- <div class="col-md-2 col-lg-2"  style="display:inline-block;"> --> 
		<input type="button" value="Cancel" name="cancelCatDBtn" id="cancelCatDBtn" onclick="categoryDetailsDivAction(0); emptyCatFields();" class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth"/>
			 <!-- </div> -->
			 </div>
		<!-- </div> -->	
	</div>
			</div>
			</div>
			</div>
<!-- ============================================================== /CATEGORY DETAILS Ends Here ======================================================================= -->
			
			
<!-- ============================================================== SUB-CATEGORY DETAILS Starts Here ======================================================================= -->
   <div class="container" id="subCategoryDialogDiv" style="display: none;">
   <div class="popup">
		   <div class="row">
    			<h2>Add Sub Category</h2>	
    			</div>
    			<div class="container" style="width:auto;margin: 0;">
    			<div class="row">
    			<div class="popup_label_up">			
    			<div class="col-md-4 col-sm-12 col-xs-12 col-xl-3 col-lg-3">		      	
							<div id="categoryListForSubCat">														
							<input list="fkRootcatId_drop" id="fkRootcatId" name="fkRootcatId" style="background: #f0f0f0" required>
						            <datalist id="fkRootcatId_drop">
						                 <%
							                  for(int i =0 ;i<catList.size();i++)
								                   {
							                           Category cat = (Category)catList.get(i);
						                 %>
							        <option data-value="<%=cat.getPkCategoryId()%>" value="<%=cat.getCategoryName()%>"> 
						                 <%   	
								                   }	
						                 %>
						             </datalist>
						            
						            <label>Category<sup style="color: red;">*</sup></label>
						   </div>
						   </div>
					</div>
						  
						  <div class="popup_label_up">
						    <div class="col-md-4 col-sm-12 col-xs-12 col-xl-3 col-lg-3">	          
		
						         <input list="catId_drop1" id="subcategoryName" name="subcategoryName" onchange="cheakForSubCat()" style="background: #f0f0f0" required>
						             <datalist id="catId_drop1">
						                 <%
							                  for(int i =0 ;i<catList1.size();i++)
								                    {
							                            SubCategory cat1 = (SubCategory)catList1.get(i);
						                 %>
							        <option data-value="<%=cat1.getPkSubcatId()%>" value="<%=cat1.getSubcatName()%>"> 
						                 <%   	
								                    }	
						                 %>
						            </datalist>
						           
						            <label>Sub Category<sup style="color: red;">*</sup></label>
                            </div> 
                         </div>
                         </div>	     
                            	<input type="hidden" value="POPUPSUBCATDATAILS" id="popUpSubCatJspId" />
                			<div class="row" id="btnrow">
                			<!-- <div class="btn_pur"> -->
                			<div class="invoice_button">
											<!-- <div class="col-md-2 col-lg-2"> -->
											    <input type="button" name="subCatBtn1" id="subCatBtn1" onclick="valsubCat();" value="Save"  class="btn btn-success btnwidth"/> 
											<!-- </div> -->
											
											<!-- <div class="col-md-2 col-lg-2"> -->
												<input type="button" value="Cancel" name="cancelSubCatDBtn" id="cancelSubCatDBtn" onclick="subCategoryDetailsDivAction(0); emptySubCatFields();" class="btn btn-danger btnwidth"/>
			 								<!-- </div> -->
			 								</div>
				<!-- </div> -->		
				</div>
       </div>
         </div>
       </div>
			
<!-- ============================================================== /SUB-CATEGORY DETAILS Ends Here ======================================================================= -->
			
			
<!-- ============================================================== PRODUCT DETAILS Starts Here ======================================================================= -->			
       
 		<div class="container" id="productDetailsDialogDiv" style="display: none; margin-top: 20px;">
		<div class="popup">
		
		<div class="row">
    			<h2>Product Details</h2>	
    			</div>
    		
    		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>	
		
    			<div class="container" id="custdetal" style="width:auto;">
			<div class="row">
		         <div class="popup_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">
						<%-- <%
						    CategoryHelper helper = new CategoryHelper();
						    List mainCategoryList = helper.getAllMainCategories();
					    %> --%>
						<div id="catgoryDivOfProductDetails">

								 <input list="catId_dropPD" id="catIdPD" onchange="pohelper.getSubCategories();" required>
								<datalist id="catId_dropPD">
								<%									
									CategoryHelper catHelper22 = new CategoryHelper();
							   		List catList22 = catHelper22.getAllMainCategories();
									
									for(int i=0;i<catList22.size();i++)
										{
											Category category = (Category)catList22.get(i);
									%>
										<option data-value="<%=category.getPkCategoryId()%>" value="<%=category.getCategoryName()%>">
									<%
										}
									%>									
								</datalist>
							<label>Category<sup style="color: red;">*</sup></label>
						</div>				
					</div>
					</div>
				
				<!-- <div class="col-md-1"></div> -->
				
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">
					    <select id='fkSubCatId' name="fkSubCatId"></select>
						<label>Sub Category Name<sup style="color: red;">*</sup></label>
					</div>
			    </div>
			 
			<div class="row">
                 <div class="popup_label_up">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">
							<input type="text" id='itemNamePD' name="itemNamePD" required >
							<label>Brand Name<sup>*</sup></label>
						</div>
					<!-- <div class="col-md-1"></div> -->
					
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">
						 <input type="text" id='hsnsacno' name="hsnsacno" required >
						 <label>HSN/SAC No</label>
				    </div>				
				    </div>	
				   </div>	
			
			<div class="row">
			       <div class="popup_label_up">
			            <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">
							<input type="text"  id='modelName' name="modelName" required >
						   <label>Model Name</label>
						</div>
					</div>
				
				<!-- 		<div class="col-md-1"></div> -->
				  <div class="popup_label_up">	
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">
					<select id='isBarcodeProduct' name="isBarcodeProduct">
								<option value="selectOption">Select Product Type </option>
								<option value="Y">Yes</option>
								<option value="N">No</option>
							</select> <span class="sub">Is Barcode Product ?<sup style="color: red;">*</sup></span>
				</div>
				</div>
			</div>
			
			
			<div class="row">
			       <div class="popup_label_up">
			            <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3 size" id="popupcreditcol">
					<input type="text" id='productSizePD' name="productSizePD" onchange="getSizeInGrid()" required>
					<span style="color: red; font-weight: bold;">*Can Assign Multiple Sizes For Single Products</span><br/><br/>
					<span style="color: red; font-weight: bold;">*Please Give Size 'mtr' for fabric Type of Products</span>	
					<label>Size </label>
				</div>
					</div>
					
						 <div class="popup_label_up">
			            <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="popupcreditcol">
							<input type="file" id="image" name="image" value="Image"  >
							<span class="sub">Add Image<sup style="color: red;"></sup></span>
						</div>
				</div>
				
			</div>
			
			<div class="row prdt_grid" align="center">
				<div class="col-lg-12">
					<div class="table-responsive">
						<table id="jqGridPD"></table>
						<div id="jqGridPagerPD"></div>
					</div>
				</div>
			</div>

			<input type="hidden" value="POPUPPRODUCTDATAILS" id="popUpProductJspId" />
			<div class="row" id="btnrow">
				<div class="invoice_button">
				<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"	id="popupcreditcol2"> -->
					<!-- <div class="col-md-2 col-lg-4" style="display:inline-block;"> -->
						<input type="button" onclick="valProductDetail()" name="btn" id="btn" value="Save Product" class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
					<!-- </div> -->
					<!-- <div class="col-md-2 col-lg-4" style="display:inline-block;"> -->
						<input type="button" value="Cancel" onclick="productDetailsDivAction(0); emptyProductsFields()" class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth" />
					<!-- </div> -->
				<!-- </div> -->
				</div>
			</div>
			
			
		
		</div>
		</div>	
			</div>
		
<!-- ============================================================== /PRODUCT DETAILS Ends Here ======================================================================= -->			
				
			<!-- 	
				<div class="row">
				<div class=col-md-12></div>
				</div> -->

				<!-- <div class="row row_margin " style="padding-left:268px"> -->
				<!-- <div class="container"> -->
				
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
				<!--  </div> -->
				 
				<!-- <div class="row" > -->
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="goodrcvtotalcol">
								<input type="text" id='totalSgst' name="totalSgst" id="jander" value="0" readonly="readonly" />
								<label>SGST</label>
					</div>	
								
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"id="goodrcvtotalcol">
						 <input type="text" id='totalCgst' name="totalCgst" id="jander" value="0" readonly="readonly"  />
				         <label>CGST</label>
				    </div>							
				<!-- </div> -->
				
				<!-- <div class="row" > -->
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3" id="goodrcvtotalcol">
						<input type="text" id='transaportExpense' name="transaportExpense" value="0" onkeypress="return isNumberForExpense(event) " onchange="otherExpenceAmountTotal();">
						<label>Transaport Expense</label>
					</div>	
								
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"id="goodrcvtotalcol">
						 <input type="text" id='labourExpense' name="labourExpense" value="0" onkeypress="return isNumberForExpense(event)" onchange="otherExpenceAmountTotal1();"/>
				         <label>Labour Expense</label>
				    </div>
				   
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"id="goodrcvtotalcol">
						<input type="text" name="resolution" id="resolution" readonly="readonly" value="0" style="background-color: #fab787; font-size: 20px;"/>
						<input type="hidden" id='resolution1' name="resolution1"/>
					    <label>Gross Total</label>
				    </div>							
				</div>
				
				 <!-- <div class="row">
				 <div class="col-md-6"></div>
				 	<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3">
						<input type="text" name="resolution" id="resolution" readonly="readonly" value="0" style="background-color: #fab787; font-size: 20px;"/>
						<input type="hidden" id='resolution1' name="resolution1"/>
					    <label>Gross Total:</label>
				    </div> 
				 </div> -->
				
				

				<div class="row row_margin">
					<div class="form-group">
						<div class="col-sm-1 col-sm-offset-1" align="center">
							<!-- <label class="control-label">Total Discount (%):</label> -->
						</div>

						<div class="col-sm-2">
							<div class="input-group">
								<!-- <span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> -->
								<input type="hidden" id='extraDiscount' name="extraDiscount"
									class="text-border form-control" placeholder="In %" autofocus
									onkeyup="grasstotal1(); return false;"
									style="background-color: rgba(251, 243, 0, 0.27)" id="jander"
									value="0" />
							</div>
						</div>

						<div class="col-sm-1" align="center">
							<!-- <label class="control-label">Expenses:</label> -->
						</div>

						<div class="col-sm-2">
							<div class="input-group">
								<!-- <span class="input-group-addon"> <i
									class="glyphicon glyphicon-hand-right"></i>
								</span> -->
								 <input type="hidden" id='expence' name="expence"
									class="text-border form-control" placeholder="Expenses"
									autofocus onchange="grasstotal(); return false;"
									style="background-color: rgba(251, 243, 0, 0.27)" id="jander"
									value="0" />
							</div>  
						</div>

					

					</div>
				</div>

				<div class="goodrecivebutton">
				<div class="row" id="btnrow">
				<div class="invoice_button">
				<!-- <div class="col-md-2" id="goodreceivebtn"> -->
					<input type="button" class="btn btn-lg btn-md button_hw button_margin_right btnwidth" name="btnSubmit" id="btnSubmit" onclick="getValidateRegGoodReceive()" style="background-color: #74DAA0;" value="Save & Print" />
				<!-- </div> -->
				<!-- <div class="col-md-2" id="goodreceivebtn"> -->
					<input type="button"  class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" name="btnSubmit1" id="btnSubmit1" onclick="getValidateRegGoodReceive1()" value="Save" />
				<!-- </div> -->
				<!-- <div class="col-md-2" id="goodreceivebtn"> -->
					<input type="reset"  value="Cancel" onclick="window.location.reload()" name="btn1" class="btn btn-lg btn-danger btn-md button_hw button_margin_right btnwidth" />
				<!-- </div> -->
					<input type="button" onclick="backToProductDetails()" id="btn" value="Back" class="btn btn-lg btn-primary btn-md button-hw button_margin_right btnwidth"/>
				</div>		
					</div>
				</div>
				</div>
				</form>
			
				
		</div>
		
		
		</div>
		
		
			
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
<script>
function backToProductDetails() {
	window.location= "y_product_detail.jsp";
}
</script>
</body>
</html>
