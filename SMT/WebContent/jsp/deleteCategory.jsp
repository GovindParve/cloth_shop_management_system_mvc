
<%@page import="com.smt.dao.SubCategoryDao"%>
<%@page import="com.smt.hibernate.SubCategory"%>
<%@page import="com.smt.helper.SubCategoryHelper"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>

<!DOCTYPE html>
<html lang="en">
<head>
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<!-- <script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script> -->
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/addCategory.css">
<!-- <script src="/SMT/staticContent/js/jquery.min.js"></script> -->
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/y_js/uppercase.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/y_js/category.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script type="text/javascript">

	function goToAddCategory()
	{
		window.location="y_category_subcategory.jsp";
	}

	    function cheakForAvailableCategory()
	    {		    
	        <%CategoryHelper catHelper = new CategoryHelper();
			List catList = catHelper.getAllMainCategories();%>
			var catName = $('#categoryName').val();
    		var UpCatName = catName.toUpperCase();
    		var duplicate;
			<%for (int i = 0; i < catList.size(); i++) {
				Category category = (Category) catList.get(i);%>
    		    var value = "<%=category.getCategoryName()%>";
		var UpValue = value.toUpperCase();
		if (UpCatName == UpValue) {
			duplicate = "found";
		}
<%}%>
	if (duplicate == "found") {
			document.cat.btn.disabled = true;
			alert("Category Name Already Exist..!!!");
			document.cat.reset();
			document.cat.btn.disabled = false;
			return false;
		} else {
			valAddMainCat();
		}
	}
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
.col-md-2 {
    margin-left: 19px;
    margin-right: 54px;
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

@media ( max-width : 991px) {
.col-md-2 {
    margin-left: -15px;
    margin-right: -31px;
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

.btn_width {
	width: 124px;
	padding-top: 8px;
}
#categoryName {
	background-color: f0f0f0;
}
#addcatgry {
	margin-top: 42px;
}

@media screen and (max-width: 480px) {
.container {
	width: 100%;
    /* margin-left: -5%; */
}
/* #addcatgry {
    width: 90%;
    margin-left: 5%;
} */
}

</style>

</head>

<body>
	<div class="container">
		<div class="box">
			<div align="center" class="categoryheading">
				<h2>Delete Category</h2>
			</div>
			<div class="row">
				<div class="col-md-12" align="center">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
			<form id="cat" name="cat">
				<!-- <div class="invoice_label_up"> -->
				<div class="container">
					<div class="row">
					<!-- <div class="invoice_label_up"> -->
						<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="addcatgry">
							<input list="catId_drop" id="categoryName" name="categoryName">
							<datalist id="catId_drop">						
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
							<span>Category  <sup style="color: red">*</sup></span>

							<%-- <input list="catId_drop" id="categoryName" name="categoryName"style="background-color: f0f0f0;"required>
				<datalist id="catId_drop">
				  <input type="text" id="testField" readonly="readonly"/>
					
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
				<label>Category</label> --%>
						</div>
						<!-- </div> -->
						</div>
						
						<div class="" id="btnrow" align="center">
							<div class="invoice_button">
							<!-- <div class="col-md-2" style="display:inline-block;"> -->
								<input type="button" name="btn" onclick="deleteCategory();" value="Delete" id="deleteCatBtn" 
								class="btn btn-large btn-danger btn-md button_hw button_margin_right" />
							<!-- </div> -->
						
							<!-- <div class="col-md-2" style="display:inline-block;"> -->
								<input type="button" name="btn" onclick="goToAddCategory();" value="Back"
								class="btn btn-large btn-primary btn-md button_hw button_margin_right" />
							<!-- </div> -->
							</div>						
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
<!-- </body>
</html> -->