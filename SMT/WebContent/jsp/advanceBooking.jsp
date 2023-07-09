<%@page import="com.smt.hibernate.SubCategory"%>
<%@page import="com.smt.dao.SubCategoryDao"%>
<%@page import="com.smt.bean.AdvanceBookingBean"%>
<%@page import="com.smt.dao.AdvanceBookingDao"%>
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
	Long bookingNo = 1l;
%>
<%
	AdvanceBookingDao data = new AdvanceBookingDao();
	List bookingList = data.getLastBookingNo();
	for (int i = 0; i < bookingList.size(); i++) {
		AdvanceBookingBean st = (AdvanceBookingBean) bookingList.get(i);
		bookingNo = Long.parseLong(st.getBookingNoAB());
		bookingNo++;
	}
%>
<head>
<style>
.popup {
	margin:;
}

.form-group1 {
	margin-bottom: 40px;
}
</style>

<script>
	
	function getValidateRegGoodReceive()
	{
		document.good.btnSubmit.disabled = true;
		registerAdvanceBooking();
	}	
</script>
<!-- 
<script type="text/javascript">
	function suppDetailsDivAction(a)
	{	
		if(a==1)
	    {
			//$( "#suppDetailsDiv" ).dialog({height: 420, width:1000});
			$( "#suppDetailsDiv" ).dialog({
				height: 420,
				width: 1000,
				//autoOpen: false,
				//modal: false,
				resizable: true,
				draggable: false,
				position:
				{
					my: "center",
					at: "center",
					of: window,
					collision: "none",
				}
			});
	    }
	    else
	    {
	    	$( "#suppDetailsDiv" ).dialog('close');
	       	//document.getElementById("suppDetailsDiv").style.display="none";
	    }
		
		$('#suppListDiv').load(document.URL +  ' #suppListDiv');
	}
	
	function formActionsSH(a)
	{
	    if(a==1)
	    {
	       	document.getElementById("good").style.display="none";
	    }
	    else
	    {
	       	document.getElementById("good").style.display="block";
	    }
	}
	
	function isNumber(evt)
	{
	    evt = (evt) ? evt : window.event;
	    var charCode = (evt.which) ? evt.which : evt.keyCode;
	    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	        return false;
	    }
	    return true;
	}
</script>

 -->
<script type="text/javascript">

		// CATEGORY 
	    function cheakForAvailableCategory()
	    {		    
	        <%CategoryHelper catHelper = new CategoryHelper();
			List catList = catHelper.getAllMainCategories();%>
			var catName = $('#categoryName').val();
    		var UpCatName = catName.toUpperCase();
    		var duplicate;
			<%for (int i = 0; i < catList.size(); i++) {
				Category category = (Category) catList.get(i);%>
    		
    		    var value ="<%=category.getCategoryName()%>";
    		    var UpValue = value.toUpperCase();
				if(UpCatName == UpValue)
				{
					duplicate = "found";
				}
		    <%}%>
    		if(duplicate == "found")
        	{
    			//document.cat.btn.disabled = true;	
    			myAlert("Category Name Already Exist..!!!");
 				//document.cat.reset();
				//document.cat.btn.disabled = false;
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
	    	<%SubCategoryDao catHelper1 = new SubCategoryDao();
			List catList1 = catHelper1.getAllSubCategories();%>
	    		var subCategoryName = $('#subcategoryName').val();
	      		var UpSubCatName = subCategoryName.toUpperCase();
	      		var duplicate;
	    	<%for (int i = 0; i < catList1.size(); i++) {
				SubCategory subcategory = (SubCategory) catList1.get(i);%>
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
	    		//location.reload();
	    		return false;
	    	}
	    	<%}%>
	    	if(duplicate == "found")
	    	{
	      		//document.subCat.btn1.disabled = true;	
	      		myAlert("Sub Category Name Already Exist..!!!");
	    		//location.reload();
	    		//document.subCat.btn1.disabled = false;
	      		return false;
	      	}
	    }	    
	    
	    // Sub Cat / Cat Check
	    function cheakForAvailableCat()
	    {
	        <%CategoryHelper catHelper2 = new CategoryHelper();
			List catList2 = catHelper2.getAllMainCategories();%>
			var catName = $('#categoryName').val();
    		var UpCatName = catName.toUpperCase();
    		var duplicate;
			<%for (int i = 0; i < catList2.size(); i++) {
				Category category2 = (Category) catList2.get(i);%>
    		    var value ="<%=category2.getCategoryName()%>";
		var UpValue = value.toUpperCase();
		if (UpCatName == UpValue) {
			duplicate = "found";
		}
<%}%>
	if (duplicate == "found") {
			//document.cat.btn.disabled = true;
			myAlert("Category Name Already Exist..!!!");
			//document.cat.reset();
			//document.cat.btn.disabled = false;
			return false;
		}
	}
</script>
<!-- abcd -->

<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script> -->
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">

<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/advbookingcss.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/popupwindow.css">

<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<!--  -->
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.popupwindow.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/bootstrap.min.js"></script> -->
<script src="/SMT/staticContent/js/advanceBooking.js"></script>
<script src="/SMT/staticContent/y_js/supplier.js"></script>
<script src="/SMT/staticContent/y_js/category.js"></script>
<script src="/SMT/staticContent/y_js/subcategory.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script src="/SMT/staticContent/y_js/productDetail.js"></script>


<script>
	
</script>
<style>
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
	margin-left: 0;
	margin-top: 0%;
	margin-bottom: 1%;
}
#productDetailsDialogDiv {
    height: auto !important;
}
tbody tr:hover {
    background: none !important;
    color: #000 !important;
}
#goodreceiveh2 {
    margin-top: 0px;
}

/* #productDetailsDialogDiv {
   height: auto !important;
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
		/* margin-left: 6px; */
	}
}
</style>
<style>
/* #popupcreditcol {
	width: 33%;
	height: 60px;
} */
.col-lg-5.col-lg-offset-2 {
    margin-left: 14%;
}
#popupcreditcol2 {
	width: auto;
	margin-left: 12%;
}

.form-group {
	margin-bottom: 0;
}

.col-md-2.col-lg-4 {
	margin-right: 15px;
}

.col-lg-offset-1 {
	margin-left: 3.333333%;
}

.btn_pur {
	margin-left: 103px;
}

.col-md-2.col-lg-3 {
	margin-right: 19px;
}

.row.col-lg-offset-2 {
	margin-left: 18%;
}

.col-md-2.col-lg-2 {
	width: auto;
	margin-right: -30px;
}

/* .col-md-4.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
	width: 46%;
}

.col-md-3.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
	width: 90%;
} */

.col-lg-offset-4 {
	margin-left: 4.333333%;
}
.row.prdt_grid {
    margin: 20px 0;
}

@media ( max-width : 1180px) {
	.row.col-lg-offset-2 {
		margin-left: 22%;
	}
	.col-lg-offset-4 {
		margin-left: 10.333333%;
	}
	.col-md-2.col-lg-3 {
		margin-right: 51px;
	}
	/* .col-md-4.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
		width: 50%;
		margin: 0;
	} */
	.col-md-offset-2 {
		margin-left: 22.666667%;
	}
	.col-md-2.col-lg-4 {
		margin-right: 51px;
	}
}

@media ( max-width : 991px) {
	.col-md-2.col-lg-2 {
		margin-right: -26px;
		width: auto;
		display: inline-block;
	}
	.col-md-offset-2 {
		margin-left: -0.333333%;
	}
	/* #popupcreditcol {
		width: 33%;
		height: 60px;
		margin: 0;
	} */
	.col-lg-offset-4 {
		margin-left: -1.666667%;
	}
	.row.col-lg-offset-2 {
		margin-left: 10%;
	}
	.col-md-2.col-lg-3 {
		margin-right: -42px;
		display: inline-block;
		margin-left: 63px;
	}
	.btn_pur {
		margin-left: 19%;
	}
	/* .col-md-3.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
		width: 90%;
		margin-left: 14px;
	} */
}

@media ( max-width : 767px) {
	/* .col-md-4.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
		width: 44%;
		margin-left: 30px;
		margin-right: -38px;
	} */
	.col-lg-offset-1 {
		margin-left: 9.333333%;
	}
	/* .col-md-3.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
		width: 90%;
	} */
	.col-md-2.col-lg-4 {
		margin-right: 25px;
	}
	.row.col-lg-offset-2 {
		margin-left: 8%;
	}
	.col-md-2.col-lg-3 {
		margin-right: -95px;
		display: inline-block;
		margin-left: 75px;
	}
	.btn_pur {
		margin-left: 80px;
	}
}

@media screen and (max-width: 480px) {
.dropdown-menu {
    left: -130px;
}
}

#suppDetailsDiv {
    height: 50% !important;
}
.btnwidth {
	width: 130px !important; 
	padding: 10px !important;
}
</style>

</head>
<body class="purchase_form_img vColor">
		<div class="container" id="popupblur"> 
	<div class="row">
		<div class="" id="billheading">
		<div class="vouch">
			<span align="left" class="vouchspan">Booking
				No :: <%
				out.println(bookingNo);
			%>
			</span> <input type="hidden" readonly="readonly" id="bookingNo"
				name="bookingNo" value=<%=bookingNo%>> <input type="hidden"
				readonly="readonly" id="forAdvanceBooking" name="forAdvanceBooking"
				value="ADVANCEBOOKING">
				</div>
		</div>
		<div class="" align="center" id="goodreceiveh2">
			<h2 class="form-name style_heading">Advance Booking</h2>
		</div>
		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
	</div>
	<div class="row" hidden="true">
		<div class="form-group" align="right">
			<div class="col-sm-offset-6 col-md-5 control-label">
				<div id="date">
					<label id="demo"></label>
					<script>
						var date = new Date();
						document.getElementById("demo").innerHTML = date.toDateString();
					</script>
				</div>
			</div>
		</div>
	</div>

	<div id="myDialogBox" title="My Dialog Box">
		<div id="myContentLayer">
			<p></p>
		</div>
	</div>

	<div class="advbook">
		<form action="goods" method="post" name="good" class="form-horizontal" id="good">
			<div class="container" id="custdetal">
				<div class="row">

					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"	id="dayreport">
						<div id="suppListDiv"  >

							<%
								SupplierDetailHelper poHelper = new SupplierDetailHelper();
								List supplierList = poHelper.getAllSuppliers();
							%>

							<input list="supplierId_drop" id="supplierId"
								onchange="getSuppDetailsForAdvanceBooking();" required>
							<datalist id="supplierId_drop">
								<%
									for (int i = 0; i < supplierList.size(); i++) {
										SupplierDetail supplier = (SupplierDetail) supplierList.get(i);
								%>
								<option data-value="<%=supplier.getSupplierId()%>"
									value="<%=supplier.getSupplierName()%>,<%=supplier.getSuppCode()%>">
									<%
										}
									%>
								
							</datalist>
							<label>Supplier Name<sup style="color: red">*</sup></label> <span
								class="adv_sup_btn">

								<button type="button" onclick="suppDetailsDivAction(1);">
									<span class="glyphicon glyphicon-plus" style="color: #0078ae;"></span>
								</button>
							</span>

						</div>
					</div>
					<!-- <div class="col-md-1"></div> -->
					<div
						class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
						id="dayreport">

						<input type="text" name="supplierEmailId" id="supplierEmailId"
							required /> <label>Supplier Email Id<sup
							style="color: red">*</sup></label>
					</div>

				</div>

<!-- ==================================================================== SUPPLIER DETAILS Starts Here ================================================================ -->

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
					<div class="miscellaneous">
						<div class="container" style="width: auto;" id="custdetal">

					
			<div class="row form-group">
		<!-- <div class="col-md-1"></div>
		<div class="col-md-1"></div>
		<div class="col-md-1"></div> -->
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport" >
			<select class="" id="type" name="type" name="Select Type">
			<option value="selectoption" >Select Supplier Type </option>
			<option value="registered">Registered</option>
			<option value="unregistered">Unregistered</option>
			<option value="registeredcomposite">Registered Composite</option>
			</select> <span class="sub">Supplier Type<sup style="color: red;">*</sup></span>
			
			
			
			 
			</div>
			<!-- </div> -->
							<!-- <div class="row"> -->
								<!-- <div class="form-group1"> -->
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input type="text" name="supplierName" id="supplierName"
												required /> <label>Supplier Name:<sup
												style="color: red;">*</sup></label>
										</div>
									</div>
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input type="text" id="address" name="address" required /> <label>Address:</label>
										</div>
									</div>
								<!-- </div> -->
							<!-- </div> -->


							<!-- <div class="row"> -->
								<div class="form-group1">
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input type="text" name="supplierCode" id="supplierCode"
												required /> <label>Supplier Code:</label>
										</div>
									</div>

								</div>
							<!-- </div> -->


							<!-- <div class="row"> -->
								<!-- <div class="form-group1"> -->
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input type="text" id="city" name="city" required /> <label>City:<sup
												style="color: red;">*</sup></label>
										</div>
									</div>
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input type="text" id="pin" name="pin" required /> <label>Pin
												Code:</label>
										</div>
									</div>

								<!-- </div> -->
							<!-- </div> -->

							<!-- <div class="row"> -->
								<!-- <div class="form-group1"> -->
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input type="text" id="contactPerson"
												name="contactPersonSupp" required /> <label>Contact
												Person:</label>
										</div>
									</div>
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input type="text" id="email" name="email" required /> <label>E-mail:</label>
										</div>
									</div>
								<!-- </div> -->
							<!-- </div> -->

							<!-- <div class="row"> -->
								<!-- <div class="form-group1"> -->
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input type="text" id="mobileno" name="mobileno" required
												onkeypress="return isNumber(event)" maxlength="10" /> <label>Mobile
												No:<sup style="color: red;">*</sup>
											</label>
										</div>
									</div>
									<div class="invoice_label_up">
										<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
											id="popupcreditcol">
											<input type="text" id="panNo" name="panNo" required /> <label>GST/TIN/UIN
												No:</label>
										</div>
									</div>
								<!-- </div> -->
							</div>
							
							
							<input type="hidden" value="POPUPSUPPDATAILS" id="popJspId" />

						<div class="row" id="btnrow">
							<div class="invoice_button">
							<!-- <div class="row buttons_margin_top" style="padding-bottom: 10px"> -->
								<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
									id="popupcreditcol2"> -->
									<!-- <div class="col-md-2 col-lg-4" style="display: inline-block;"> -->
										<input type="button" value="Save" name="saveSuppDBtn"
											id="saveSuppDBtn" onclick="validateSupplierDetails();"
											class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
									<!-- </div> -->
									<!-- <div class="col-md-2 col-lg-4" style="display: inline-block;"> -->
										<input type="button" value="Cancel" name="cancelSuppDBtn"
											id="cancelSuppDBtn"
											onclick="suppDetailsDivAction(0); emptyFields();"
											class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth" />
									<!-- </div> -->
								<!-- </div> -->
							<!-- </div> -->
							</div>
							</div>
						</div>
					</div>
				</div>
<!-- ============================================================== /SUPPLIER DETAILS Ends Here ======================================================================= -->

				<!-- 		
			<div class="row" hidden="true">
			
	/* 
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
						<label >Bill No:<sup
							style="color: red;">*</sup></label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="billNo" id="jander" name="billNo"
								autofocus="autofocus"  placeholder="Bill No" />
						</div>
					</div>
				</div>
				<div></div>
			</div>
					
			
			
				<div class="form-group">
				
				<div class="col-sm-1 col-sm-offset-2" align="center">
						<label >GST%:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<input type="text" id='gstRangePer' name="gstRangePer" readonly="readonly" value="" />
						</div>
					</div>
				
					<div class="col-sm-1" align="center">
						<label >StartPrice:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							 <input type="text" id='startPrice' name="startPrice" readonly="readonly" value="" />
						</div>
					</div>

					<div class="col-sm-1" align="center">
						<label >EndPrice</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<input type="text" id='endPrice' name="endPrice" readonly="readonly" value="" />
						</div>
					</div>
				</div>
			</div>
			
-->

				<div class="row" hidden="true">
					<div class="form-group">
						<div class="col-sm-2 col-sm-offset-1" align="center">
							<label>Tax Type:</label>
						</div>
						<div class="col-sm-2">
							<div class="input-group">
								<input type="text" id='taxType' name="taxType"
									readonly="readonly" placeholder="Select Supplier" />
							</div>
						</div>
						<div></div>
					</div>
				</div>


				<div class="row"></div>
				<!-- <div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label  for="billType">Type:<sup
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

					<div id="itemListDiv">
						<div class="good_rcv_label_up">
							<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-9"	id="dayreport">
								<%
									ProductDetailHelper item = new ProductDetailHelper();
									List itemList = item.getAllItemName(request, response);
								%>
								<input list="itemId_drop" id="itemName"
									onchange="getProductListForAdvanceBooking()" required>
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
										myvalue3="<%=itm.getColor()%>" myvalue4="<%=itm.getSize()%>"
										myvalue5="<%=itm.getFkCatId()%>">
										<%
											}
										%>
									
								</datalist>
								<label>Item List<sup style="color: red">*</sup></label>
							</div>
							<span class="godbtn1">
								<div class="dropdown">
									<button class=" dropdown-toggle" type="button"
										data-toggle="dropdown">
										<i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i>
									</button>
									<ul class="dropdown-menu">
										<li><a onclick="categoryDetailsDivAction(1)">Add
												category<i class="glyphicon glyphicon-plus"
												style="color: #0078ae;"></i>
										</a></li>
										<li><a onclick="subCategoryDetailsDivAction(1)">Add
												subcategory<i class="glyphicon glyphicon-plus"
												style="color: #0078ae;"></i>
										</a></li>
										<li><a onclick="productDetailsDivAction(1)">Add
												product<i class="glyphicon glyphicon-plus"
												style="color: #0078ae;"></i>
										</a></li>
									</ul>
								</div>
							</span>
						</div>


					</div>
				</div>

				<div class="adv_book_grid">
					<div class="table-responsive">
						<table id="jqGrid"></table>
						<div id="jqGridPager"></div>
					</div>
				</div>

<!-- ============================================================== CATEGORY DETAILS Starts Here ======================================================================= -->

				<div id="categoryDialogDiv" style="display: none;">
					<div class="popup">

						<div class="row">
							<h2>Add Category</h2>
						</div>
						<div class="container" style="width: auto; margin: 0;">

							<div class="row">

								<div class="popup_label_up">
									<div class="col-md-3 col-sm-12 col-xs-12 col-xl-3 col-lg-3">
										<input type="hidden" value="POPUPCATDATAILS"
											id="popUpCatJspId" /> <input list="catId_drop"
											id="categoryName" name="categoryName"
											style="background-color: f0f0f0;" required>
										<datalist id="catId_drop">
											<input type="text" id="testField" readonly="readonly" />

											<%
												for (int i = 0; i < catList.size(); i++) {
													Category cat = (Category) catList.get(i);
											%>
											<option data-value="<%=cat.getPkCategoryId()%>"
												value="<%=cat.getCategoryName()%>">
												<%
													}
												%>
											
										</datalist>
										<label>Category<sup style="color: red;">*</sup></label>

									</div>
								</div>
							</div>

							<div class="row" id="btnrow">
								<div class="invoice_button">
								<!-- <div class="btn_pur"> -->
									<!-- <div class="col-md-2 col-lg-2" style="display: inline-block;"> -->
										<input type="button" name="subCatBtn" id="subCatBtn"
											onclick="cheakForAvailableCategory();" value="Save"
											class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
									<!-- </div> -->

									<!-- <div class="col-md-2 col-lg-2" style="display: inline-block;"> -->
										<input type="button" value="Cancel" name="cancelCatDBtn"
											id="cancelCatDBtn"
											onclick="categoryDetailsDivAction(0); emptyCatFields();"
											class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth" />
									<!-- </div> -->
								<!-- </div> -->
								</div>
							</div>

						</div>

					</div>
				</div>
<!-- ============================================================== /CATEGORY DETAILS Ends Here ======================================================================= -->

<!-- ============================================================== SUB-CATEGORY DETAILS Starts Here ======================================================================= -->


				<div class="container" id="subCategoryDialogDiv"
					style="display: none;">
					<div class="popup">
						<div class="row">
							<h2>Add Sub Category</h2>
						</div>
						<div class="container" style="width: auto; margin: 0;">
							<div class="row">
								<div class="popup_label_up">
									<div class="col-md-4 col-sm-12 col-xs-12 col-xl-3 col-lg-3">
										<div id="categoryListForSubCat">
											<input list="fkRootcatId_drop" id="fkRootcatId"
												name="fkRootcatId" style="background: #f0f0f0" required>
											<datalist id="fkRootcatId_drop">
												<%
													for (int i = 0; i < catList.size(); i++) {
														Category cat = (Category) catList.get(i);
												%>
												<option data-value="<%=cat.getPkCategoryId()%>"
													value="<%=cat.getCategoryName()%>">
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

										<input list="catId_drop1" id="subcategoryName"
											name="subcategoryName" onchange="cheakForSubCat()"
											style="background: #f0f0f0" required>
										<datalist id="catId_drop1">
											<%
												for (int i = 0; i < catList1.size(); i++) {
													SubCategory cat1 = (SubCategory) catList1.get(i);
											%>
											<option data-value="<%=cat1.getPkSubcatId()%>"
												value="<%=cat1.getSubcatName()%>">
												<%
													}
												%>
											
										</datalist>

										<label>Sub Category<sup style="color: red;">*</sup></label>
									</div>
								</div>
							</div>
							<input type="hidden" value="POPUPSUBCATDATAILS"	id="popUpSubCatJspId" />
							<div class="row" id="btnrow">
							<div class="invoice_button">
								<!-- <div class="col-md-2 col-lg-3"> -->
									<input type="button" name="subCatBtn1" id="subCatBtn1"
										onclick="valsubCat();" value="Save" class="btn btn-success btnwidth" />
								<!-- </div> -->

								<!-- <div class="col-md-2 col-lg-3"> -->
									<input type="button" value="Cancel" name="cancelSubCatDBtn" id="cancelSubCatDBtn"
										onclick="subCategoryDetailsDivAction(0); emptySubCatFields();"
										class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth" />
								<!-- </div> -->
								</div>
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
								<hr style="border-top-color: #c1b1b1; margin-top: 0;">
							</div>
						</div>

						<div class="container" id="custdetal" style="width: auto;">
							<div class="row">
								<div class="popup_label_up">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
										id="popupcreditcol">
										<%-- <%
						    CategoryHelper helper = new CategoryHelper();
						    List mainCategoryList = helper.getAllMainCategories();
					    %> --%>
										<div id="catgoryDivOfProductDetails">

											<input list="catId_dropPD" id="catIdPD"
												onchange="pohelper.getSubCategories();" required>
											<datalist id="catId_dropPD">
												<%
													CategoryHelper catHelper22 = new CategoryHelper();
													List catList22 = catHelper22.getAllMainCategories();

													for (int i = 0; i < catList22.size(); i++) {
														Category category = (Category) catList22.get(i);
												%>
												<option data-value="<%=category.getPkCategoryId()%>"
													value="<%=category.getCategoryName()%>">
													<%
														}
													%>
												
											</datalist>
											<label>Category<sup style="color: red;">*</sup></label>
										</div>
									</div>
								</div>

								<!-- <div class="col-md-1"></div> -->

								<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
									id="popupcreditcol">
									<select id='fkSubCatId' name="fkSubCatId"></select> <label>Sub
										Category Name<sup style="color: red;">*</sup></label>
								</div>
							</div>

							<div class="row">
								<div class="popup_label_up">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
										id="popupcreditcol">
										<input type="text" id='itemNamePD' name="itemNamePD" required>
										<label>Brand Name<sup style="color: red;">*</sup></label>
									</div>
									<!-- <div class="col-md-1"></div> -->

									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"
										id="popupcreditcol">
										<input type="text" id='hsnsacno' name="hsnsacno" required>
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
					<input type="text" id='productSizePD' name="productSizePD" onchange="getSizeInGrid()" required style="margin-bottom: 8px;">
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
							<!-- <div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
								id="popupcreditcol2" style="margin-top: 10px;"> -->
								<!-- <div class="col-md-2 col-lg-4" style="display: inline-block;"> -->
									<input type="button" onclick="valProductDetail()" name="btn" id="btn" value="Save Product"
										class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
								<!-- </div> -->
								<!-- <div class="col-md-2 col-lg-4" style="display: inline-block;"> -->
									<input type="button" value="Cancel"
										onclick="productDetailsDivAction(0); emptyProductsFields()"
										class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth" />
								<!-- </div> -->
							<!-- </div> -->
							</div>
							</div>
						</div>
					</div>



				</div>

<!-- ============================================================== /PRODUCT DETAILS Ends Here ======================================================================= -->

				<div class="row">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-3"	id="dayreport">

						<input type="text" id='totalQuantity' name="totalQuantity"
							id="jander" value="0" readonly="readonly" /> <span class="sub">Total Quantity</span>

						<!-- <input type="text" id='totalQuantity' name="totalQuantity" id="jander" readonly="readonly" />
						<label>Total Quantity</label> -->
					</div>
				</div>

				<div class="row row_margin">
					<div class="form-group">
						<div class="col-sm-1 col-sm-offset-1" align="center">
							<!-- <label >Total Discount (%):</label> -->
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
							<!-- <label >Expenses:</label> -->
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

				<div class="">
					<div class="row" id="btnrow">
					<div class="invoice_button">
						<!-- <div class="col-md-2" style="display: inline-block;"> -->
							<input type="button" class="btn btn-lg btn-success btn-md btnwidth"	name="btn" id="btnSubmit" onclick="getValidateRegGoodReceive()" value="Save" />
						<!-- </div> -->
						<!-- <div class="col-md-2" style="display: inline-block;"> -->
							<input type="reset" value="Cancel" onclick="window.location.reload()" name="btn1" class="btn btn-lg btn-danger btn-md btnwidth" />
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
