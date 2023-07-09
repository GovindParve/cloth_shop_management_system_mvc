<%@page import="com.smt.helper.SubCategoryHelper"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.helper.CategoryHelper"%>
<%@page import="com.smt.hibernate.Category"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<link href="/SMT/staticContent/y_js/bootstrap-select.min.css" />
<script src="/SMT/staticContent/y_css/1.11.4-jquery-ui.min.css">
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/y_js/1.12.4-jquery.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>
<link href="/SMT/staticContent/y_css/adi.css" rel="stylesheet" />
<link href="/SMT/staticContent/y_css/4.13.3-ui.jqgrid.min.css" />
<script src="/SMT/staticContent/y_js/uppercase.js"></script>
<script src="/SMT/staticContent/y_js/subcategory.js"></script>
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/subcategory.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
<script type="text/javascript">

function Back()
{
	window.location="subCategory.jsp";
}

   		function isEmplty()
   		{
			var categoryName= $('#reNameCat').val();
			var catId= $('#catId').val();
			var subcatId= $('#subcatId').val();
	    	var patt = /^[a-zA-Z ]+$/;
	    	var t = patt.test(categoryName);
	    if(catId != null && catId != "" && catId != " ")
    	{
	    	if(subcatId != null && subcatId != "" && subcatId != " ")
    		{	
	    		if(categoryName != null && categoryName != "" && categoryName != " ")
	    		{
	    			if(t)
	    			{
	    				ChooseContact();
	    			}
	    			else
	    			{
	    				myAlert("Enter only Alphabets.");
	    		 	}
	    		}
	    		else
	    		{
	    			myAlert("Please Enter ReName Category name.");
	    		}
			}
	    	else
	    	{
	    		myAlert("Please Select Sub Category.");
	    	}
	    }
	    else
	    {
	    	myAlert("Please Select Category.");
	    }		
}
	    function ChooseContact(){
	        <%CategoryHelper catReName = new CategoryHelper();
			List catName = catReName.getAllMainCategories();%>
			var categoryName= $('#reNameCat').val();
			var UpCaseCategoryName= categoryName.toUpperCase();
			<%for (int i = 0; i < catName.size(); i++) {
				Category categName = (Category) catName.get(i);%>
    		    var value ="<%=categName.getCategoryName()%>";
		var UpValue = value.toUpperCase();
		if (UpCaseCategoryName == UpValue) {
			document.getElementById("btn").disabled = true;
			myAlert("Category Name Already Exist..!!!");
			location.reload();
			return false;
		}
<%}%>
	reNameSubcategory();
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
    z-index:-1;
    opacity: 0.6;
 }
#addcatgry {
    /* width: 40%; */
    margin-left: 33%;
    height: 60px;
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
#addcatgry {
    margin-left: 30%;
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
#addcatgry {
    /* width: 40%; */
    margin-left: 25%;
    height: 60px;
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
#addcatgry {
    margin-left: 20%;
}
}

#billheading {
	padding-top: 38px;
}
.add-catgry {
	margin-top: 20px;
}
#catId, #subcatId, #reNameCat {
	background: #f0f0f0;
}
.p-style {
	 font-size: 15; 
	 color: #ff8000; 
	 margin-top: -23px;
}
.btn-width {
	width: 124px;
}

@media screen and (max-width: 580px) {
#addcatgry {
    margin-left: 15%;
}
}

@media screen and (max-width: 480px) {
#addcatgry {
    margin-left: 5%;
}
}

</style>
<body class="vColor">
	<div class="container-fluid">
		<div class="row" id="billheading" align="left">
			<div class="form-group">
				<div class="col-md-3 control-label control-label">
				</div>
			</div>
		</div>
		<div class="container">
			<div class="subcategory">
				<div align="center" class="">
					<h2 align="center" class="form-heading">Edit Sub Category</h2>
				</div>
				<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
			</div>
				<div class="tab-content">
					<div id="home" class="tab-pane fade in active">
						<form action="cate" method="post" name="cat"
							class="form-horizontal">
							<div class="row">
								<div class="form-group">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4 add-catgry" id="addcatgry">
										<%
											CategoryHelper catHelper = new CategoryHelper();
											List catList = catHelper.getAllMainCategoriesShopWise(request, response);
										%>
										<input list="catId_drop" id="catId" onchange="getsubCategory()" required>
										<datalist id="catId_drop">
											<%
												for (int i = 0; i < catList.size(); i++)
												{
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
								</div>

								<div class="form-group">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="addcatgry">
										<select name="subcatId" id="subcatId"></select> 
											<label>Sub Category <sup style="color: red">*</sup></label>
									</div>
								</div>

								<div class="form-group">
									<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="addcatgry">
										<input type="text" name="reNameCat" id="reNameCat"
											data-toggle="tooltip" required>
										<span>Rename Sub Category <sup style="color: red">*</sup></span>
										<p class="p-style">*Enter
											Alphabets only.</p>
									</div>
								</div>
								<div class="row buttons_margin_top" id="btnrow">
									<div align="center">
									<div class="invoice_button">
										<!-- <div class="col-lg-2" style="display: inline-block;"> -->
											<input type="button" name="btn" id="btn" onclick="isEmplty();" value="Update"
												class="btn btn-success btn-md button_hw btn-width" />
										<!-- </div> -->
										<!-- <div class="col-lg-2" style="display: inline-block;"> -->
											<input type="reset" value="Cancel"
												class="btn btn-danger btn-md button_hw btn-width" />
										<!-- </div> -->
										<!-- <input type="button" value="Back" id="listBtn" class="btn btn-lg btn-primary btn-md button_hw button_margin_right" onclick="Back()" /> -->
										<!-- <div class="col-lg-2" style="display: inline-block;"> -->
											<input type="button" value="Back" id="listBtn" onclick="Back()" 
												class="btn btn-primary btn-md button_hw btn-width" />
										<!-- </div> -->
										</div>
									</div>
								</div>
							</div>

						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>