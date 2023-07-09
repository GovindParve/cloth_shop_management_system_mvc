<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%@page import="com.smt.dao.SubCategoryDao"%>
<%@page import="com.smt.hibernate.SubCategory"%>
<%@page import="com.smt.helper.SubCategoryHelper"%>
<%@page import="java.util.List"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/subcategory.css">
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/uppercase.js"></script>
<script src="/SMT/staticContent/y_js/subcategory.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script type="text/javascript">	

function subCatList()
{
	window.location="subCategoryList.jsp";
}

function goToDeleteSubCatagory()
{
	window.location = "deleteSubCategory.jsp"
}

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
		return false;
	}
	<%}%>
	if(duplicate == "found"){
  			document.subCat.btn1.disabled = true;	
		myAlert("Sub Category Name Already Exist..!!!");
		document.subCat.btn1.disabled = false;
  			return false;
  		}
}
</script>
<script type="text/javascript">
	    function cheakForAvailableCat(){
	        <%CategoryHelper catHelper = new CategoryHelper();
			List catList = catHelper.getAllActiveCategories();%>
			var catName = $('#categoryName').val();
    		var UpCatName = catName.toUpperCase();
    		var duplicate;
			<%for (int i = 0; i < catList.size(); i++) {
				Category category = (Category) catList.get(i);%>
    		    var value ="<%=category.getCategoryName()%>";
		var UpValue = value.toUpperCase();
		if (UpCatName == UpValue) {
			duplicate = "found";
		}
<%}%>
	if (duplicate == "found") {
			document.cat.btn.disabled = true;
			myAlert("Category Name Already Exist..!!!");
			document.cat.reset();
			document.cat.btn.disabled = false;
			return false;
		}
	}
</script>
<!-- subcategory -->
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
}
#addcatgry {
	margin-top: 10px;
	height:auto;
}
#fkRootcatId, #subcategoryName {
	background: #f0f0f0;	
}
</style>

<body class="vColor">
	<!--   <h2 align="center" class="form-heading" style="margin-top: 10px; margin-bottom: 40px;">Add Sub Category</h2> -->

	<!-- SubCategory -->
	<!--  <div  class="tab-pane"> -->
	<div class="container-fluid">
		<div class="subcategory">
			<div align="center" class="categoryheading">
				<h2>Add Sub Category</h2>
			</div>	
			
			<div class="row">
				<div class="col-md-12" align="center">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
			
			<form method="post" name="subCat">
				<div class="row">
					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="addcatgry">
						<input list="fkRootcatId_drop" id="fkRootcatId" name="categoryName" required>
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

						<span>Category <sup style="color: red">*</sup></span>
					</div>


					<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4"	id="addcatgry">
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

						<span>Sub Category <sup style="color: red">*</sup></span>
					</div>
				</div>
				<div class="row" id="btnrow">
				<div class="invoice_button">
					<!-- <div class="col-md-2" id="addcatbtn"> -->
						<input type="button" name="subCatBtn1" id="subCatBtn1"
							onclick="valsubCat();" value="Save" class="btn btn-success" />
					<!-- </div> -->

					<!-- <div class="col-md-2" id="addcatbtn"> -->
						<input type="reset" value="Cancel" class="btn btn-danger" />

					<!-- </div> -->

					<!-- <div class="col-md-2" id="addcatbtn"> -->
						<input type="button" name="btn" onclick="subCatList();"
							value="List" class="btn  btn-info" />
					<!-- </div> -->

					<!-- <div class="col-md-2" id="addcatbtn"> -->
						<input type="button" name="btn" onclick="goEditSubCatagoryFrom();"
							value="Edit" class="btn btn-primary" /><a
							href="EditSubcategory.jsp"></a>
					<!-- </div> -->
					
					<!-- <div class="col-md-2" id="addcatbtn"> -->
						<input type="button" name="btn" onclick="goToDeleteSubCatagory();"
							value="Delete" class="btn btn-danger" />
					<!-- </div> -->
					</div>
				</div>
			</form>
		</div>
	</div>

	<div class="row footer_margin_top" align="center">
		<%@include file="y_commons/footer.jsp"%>
	</div>
</body>
</html>

</body>
</html>