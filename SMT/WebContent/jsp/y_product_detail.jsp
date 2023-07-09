<!-- this is product details jsp -->
<%@page import="com.smt.dao.SubCategoryDao"%>
<%@page import="com.smt.hibernate.SubCategory"%>
<%@page import="com.smt.bean.ItemList"%>
<%@page import="com.smt.bean.ProductDetailBean"%>
<%@page import="com.smt.dao.ProductDetailDao"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.ProductRegister"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.helper.SupplierDetailHelper"%>
<%@page import="com.smt.helper.ProductDetailHelper"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>

<head>
<script type="text/javascript" src="/SMT/staticContent/js/jquery.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script> -->
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/product_detail.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/popupwindow.css">
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery-ui.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script> -->
<script type="text/javascript" src="/SMT/staticContent/js/jquery-ui.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/jquery.popupwindow.js"></script>
<!-- 
	<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
	<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
	<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
	<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
	<script src="/SMT/staticContent/js/jquery.min.js"></script>
	<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
-->
<script src="/SMT/staticContent/y_js/productDetail.js"></script>
<script src="/SMT/staticContent/y_js/category.js"></script>
<script src="/SMT/staticContent/y_js/subcategory.js"></script>

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
				myAlert("Category Name Already Exist..!!!");
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
	    	<%for (int i = 0; i < catList1.size(); i++)
	    	{
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
	    	if(subcatName == subCat && cat == catName)
	    	{
	    		myAlert("subcategory already exist...Duplicate Not allowed");
	    		return false;
	    	}
	    	<%}%>
	    	if(duplicate == "found")
	    	{
	    		myAlert("Sub Category Name Already Exist..!!!");
	      		return false;
	      	}
	    }	    
</script>

<script type="text/javascript">
	function validateProductDetail() {
		var catId = $('#catId').val();
		var itemName = $('#itemName').val();
		var vat = $('#vat').val();
		var hsnsacno = $('#hsnsacno').val();
		if (catId != null && catId != "" && catId != " ") {
			if (itemName != null && itemName != "" && itemName != " ") {
				if (vat != null && vat != "" && vat != " ") {
					if (hsnsacno != null && hsnsacno != "" && hsnsacno != " ") {
						ChooseContact();
					} else {
						myAlert("Please Enter HSN/SAC No ! ");
					}
				} else {
					myAlert("Please Enter Vat Percentage ! if Not than enter zero");
				}
			} else {
				myAlert("Please Enter Product name");
			}
		} else {
			myAlert("Please Select Category name");
		}

	}
	function editProduct() {
		window.location = "Edit_y_product_detail.jsp";
	}
	function goodReceive() {
		window.location = "goodReceive.jsp";
	}
	function productList() {
		window.location = "s_item_list.jsp";
	}
</script>
<script type="text/javascript">
	function editProduct() {
		window.location = "Edit_y_product_detail.jsp";
	}

	function clearField() {
		document.getElementById("catId_dropPD").value = "";
	}
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
#categoryDialogDiv {
    height: auto !important;
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

.col-lg-offset-1 {
	margin-left: 9.333333%;
}

.col-md-offset-1 {
	margin-left: 4.333333%;
}

.btn_pur {
	margin-left: 47px;
}

.col-md-2.col-lg-2 {
	display: inline-block;
	width:auto;
}
.col-md-4.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 46%;
}
.col-md-3.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    width: 90%;
}
.subbtn {
    margin-left: 102px;
}
input[type="file"] {
    outline: none !important;
}
tbody tr:hover {
    background: none !important;
    color: #000 !important;
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
	.col-lg-offset-1 {
		margin-left: 9.333333%;
	}
	.col-md-3.col-sm-12.col-xs-12.col-xl-3.col-lg-3 {
    	width: 90%;
	}
	.btn_pur {
    	margin-left: 53px;
	}
}
@media screen and (max-width: 580px) {
#categoryListOfProductDetails {
	margin-left: 0% !important;
}
}

.btnwidth {
	width: 130px !important;
}

#categoryName, #fkRootcatId, #subcategoryName {
	background: #f0f0f0;
}
#productSizePD {
	 margin-bottom: 8px;
}
#cancelSubCatDBtn {
	padding-bottom: 30px;
}
</style>

</head>
<body class="vColor">
	<div class="container" id="popupblur">
		<div class="row">
			<div align="center" id="categorylisth2">
				<h2 class="form-name style_heading">Product Detail</h2>
			</div>
		<!-- </div> -->

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

		<div class="row">
			<div class="col-md-12" align="center">			
				<hr style="border-top-color: #c1b1b1;">			
			</div>
		</div>
 

		<div class="product_detail">
			<form action="pro" method="post" name="prod" class="form-horizontal">
				<div class="container" id="categoryListOfProductDetails">
					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<%
								CategoryHelper helper = new CategoryHelper();
								List mainCategoryList = helper.getAllActiveCategories();
							%>
							<input list="catId_dropPD" id="catIdPD" onchange="pohelper.getSubCategories();" onclick="clearField();"	required>
							<datalist id="catId_dropPD">
								<%
									for (int i = 0; i < mainCategoryList.size(); i++) {
										Category category = (Category) mainCategoryList.get(i);
								%>
								<option data-value="<%=category.getPkCategoryId()%>" value="<%=category.getCategoryName()%>">
									<%
										}
									%>
								
							</datalist>
							<label>Category<sup style="color: red;">*</sup></label> <span class="godbtn">
								<button type="button" onclick="categoryDetailsDivAction(1);">
									<i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i>
								</button>
							</span>
						</div>

						<div class="col-md-1"></div>

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 subcategoryname" id="subCategoryListOfProductDetails">
							<select id='fkSubCatId' name="fkSubCatId"></select> 
							<span class="sub">Sub Category Name<sup style="color: red;">*</sup></span> 
							<span class="godbtn">
								<button type="button" onclick="subCategoryDetailsDivAction(1);">
									<i class="glyphicon glyphicon-plus" style="color: #0078ae;"></i>
								</button>
							</span>
						</div>
					</div>

<!-- ============================================================== Add CATEGORY Starts Here ======================================================================= -->

					<div id="categoryDialogDiv" style="display: none;">
						<div class="popup">

							<div class="row">
								<h2>Add Category</h2>
							</div>
							<div class="container" style="width:auto; margin: 0;">
								<div class="row">
									<div class="popup_label_up">
										<div class="col-md-3 col-sm-12 col-xs-12 col-xl-3 col-lg-3">
											<input type="hidden" value="POPUPCATDATAILS" id="popUpCatJspId" /> 
											<input list="catId_drop" id="categoryName" name="categoryName" required> 
											<datalist id="catId_drop">
											<input type="text" id="testField" readonly="readonly" />
												<%
													for (int i = 0; i < catList.size(); i++) {
														Category cat = (Category) catList.get(i);
												%>
												<option data-value="<%=cat.getPkCategoryId()%>" value="<%=cat.getCategoryName()%>">
													<%
														}
													%>												
											</datalist>
											<label>Category <sup style="color: red">*</sup></label>
										</div>
									</div>
								</div>

								<div class="row">
									<!-- <div class="btn_pur"> -->
										<!-- <div class="col-md-2 col-lg-2"> -->
										<div id="btnrow" align="center">
						<div class="invoice_button">
											<input type="button" name="subCatBtn" id="subCatBtn"
												onclick="cheakForAvailableCategory();" value="Save"
												class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
										<!-- </div> -->
										<!-- <div class="col-md-2 col-lg-2"> -->
											<input type="button" value="Cancel" name="cancelCatDBtn" id="cancelCatDBtn"
												onclick="categoryDetailsDivAction(0); emptyCatFields();"
												class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth" />
										</div>
										</div>
										<!-- </div> -->
									<!-- </div> -->
								</div>
							</div>
						</div>
					</div>
<!-- ============================================================== Add CATEGORY Ends Here ======================================================================= -->


<!-- ============================================================== Add SUB-CATEGORY Starts Here ======================================================================= -->


					<div class="container" id="subCategoryDialogDiv"
						style="display: none;">
						<div class="popup">
							<div class="row">
								<h2>Add Sub Category</h2>
							</div>
							<div class="container" style="width:auto; margin: 0;">
								<div class="row">
									<div class="popup_label_up">
										<div class="col-md-4 col-sm-12 col-xs-12 col-xl-3 col-lg-3">
											<div id="categoryListForSubCat">
												<input list="fkRootcatId_drop" id="fkRootcatId" name="fkRootcatId" required>
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
												<label>Category<sup style="color: red">*</sup></label>
											</div>
										</div>
									</div>
									<div class="popup_label_up">
										<div class="col-md-4 col-sm-12 col-xs-12 col-xl-3 col-lg-3">

											<input list="catId_drop1" id="subcategoryName" name="subcategoryName" onchange="cheakForSubCat()" required>
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
											<label>Sub Category<sup style="color: red">*</sup></label>
										</div>
									</div>
								</div>
								<input type="hidden" value="POPUPSUBCATDATAILS"
									id="popUpSubCatJspId" />
								<!-- <div class="row subbtn"> -->
									<!-- <div class="col-md-2 col-sm-3 col-xs-3 col-lg-2 col-xl-3"> -->
									<div class="row">
									<div id="btnrow" align="center">
						<div class="invoice_button">
										<input type="button" name="subCatBtn1" id="subCatBtn1"
											onclick="valsubCat();" value="Save" class="btn btn-success btnwidth" />
									<!-- </div> -->
									<!-- <div class="col-md-2 col-lg-2"> -->
										<input type="button" value="Cancel" name="cancelSubCatDBtn" id="cancelSubCatDBtn" 
											onclick="subCategoryDetailsDivAction(0); emptySubCatFields();"
											class="btn btn-large btn-danger btn-md button_hw button_margin_right btnwidth"/>
									</div>
									</div>
									</div>
									<!-- </div> -->
								<!-- </div> -->
							</div>
						</div>
					</div>

<!-- ============================================================== Add SUB-CATEGORY Starts Here ======================================================================= -->

					<div class="row margin">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">
							<input type="text" id='itemNamePD' name="itemNamePD" required>
							<label>Item Name<sup style="color: red;">*</sup></label>
						</div>
						<div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">
							<input type="text" id='hsnsacno' name="hsnsacno" required>
							<label>HSN/SAC No</label>
						</div>
					</div>

					<div class="row">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"
							id="dayreport">
							<input type="text" id='modelName' name="modelName" required>
							<label>Model Name</label>
						</div>

						<div class="col-md-1"></div>

						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<select id='isBarcodeProduct' name="isBarcodeProduct">
								<option value="selectOption">Select Product Type </option>
								<option value="Y">Yes</option>
								<option value="N">No</option>
							</select> <span class="sub">Is Barcode Product ?<sup style="color: red;">*</sup></span>
						</div>
					</div>
					
					<div class="row margin">
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="dayreport">
							<input type="text" id='productSizePD' name="productSizePD" onchange="getSizeInGrid()" required>
							<span style="color: red; font-weight: bold;">*Can Assign Multiple Sizes For Single Products</span>
							<br /> <br />
							<span style="color: red; font-weight: bold;">*Please Give Size 'mtr' for fabric Type of Products</span> <label>Size </label>
						</div>
						
						<div class="col-md-1"></div>
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 topspace"
							id="dayreport">
							<input type="file" id="image" name="image" value="Image"  >
							<span class="sub">Add Image<sup style="color: red;"></sup></span>
						</div>
					</div>

					<div class="row prdt_grid" align="center">
						<div class="col-lg-12">
							<table id="jqGridPD"></table>
							<div id="jqGridPagerPD"></div>
						</div>
					</div>

					<div class="prd_det_btn">
						<div class="row buttons_margin_top" id="prodlist">
							<!-- <h3 align="center" style="color: red; font-size: 17px;">Please Give Size 'mtr' for fabric Type of Products</h3> -->
							<div align="center">
								<div class="invoice_button">
									<input type="button" onclick="valProductDetail()" name="btn" id="btn"  
										value="Save Product" class="btn btn-lg btn-success btn-md button_hw button_margin_right btnwidth" />
									<input type="reset" value="Cancel" onclick="window.location.reload()"
										class="btn btn-lg btn-danger btn-md button_hw button_margin_right btnwidth" />
									<input type="button" onclick="editProduct()" id="btn"
										value="Edit Product" class="btn btn-lg btn-primary btn-md button_hw button_margin_right btnwidth" />
									<input type="button" onclick="goodReceive()" id="btn" style="background: #585858;"
										value="Good Receive" class="btn btn-lg btn-primary btn-md button_hw button_margin_right btnwidth" />
									<input type="button" onclick="productList()" id="btn"
										value="List" class="btn btn-lg btn-info btn-md button_hw button_margin_right btnwidth" />
								</div>
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