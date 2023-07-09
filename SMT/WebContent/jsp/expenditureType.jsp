<%@page import="com.smt.hibernate.ExpenditureTypeBeanH"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.ExpenditureDetailsBean"%>
<%@page import="com.smt.dao.ExpenditureDetailsDao"%>
<%boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<head>
<meta charset="utf-8">
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/expenditureDetails.js"></script>
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/expenditure.css">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">	
	
<script type="text/javascript">	
		function cheakForExpenditureType()
		{
			<%
				ExpenditureDetailsDao expT = new ExpenditureDetailsDao();
				List cList1 = expT.getAllExpenseType();
			%>
			var expenditureType = $('#expTypeName').val();
    		var upExpenditureType = expenditureType.toUpperCase();
    		var duplicate;
			<%
			for(int i=0;i< cList1.size();i++)
			{
				ExpenditureTypeBeanH expTh = (ExpenditureTypeBeanH)cList1.get(i);
			%>
			var dbExpdName = "<%=expTh.getExpenseTypeName()%>";
			var UpDbExpdName = dbExpdName.toUpperCase();
			if(upExpenditureType == UpDbExpdName)
			{
					duplicate = "found";
			}
			<%
			}
			%>
			if(duplicate == "found"){
    			document.expenseDetails.btn.disabled = true;	
				alert("Expenditure Type Name Already Exist..!!!");
				location.reload();
				return false;
    		}
		}
	</script>
	
	
<script type="text/javascript">
	function getAllExpenditure()
	{	
		window.location = "expenditureList.jsp";
	}
</script>	
	<style>
	.col-md-2 {
    margin-left: 40px;
}
	@media only screen and (max-width: 991px) {
.col-md-2 {
    margin-left: 58px;
    margin-right: -86px;
}
}
@media only screen and (max-width: 767px) {
.col-md-2 {
    margin-left: 58px;
    margin-right: -86px;
}
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
}

.btnwidth {
    width: 130px !important;
    padding: 10px !important;
}	
#expenditurecol {
	margin-top: 20px;
}
</style>
</head>
<body class="vColor">
	<div class="expenditure">
		<h2>Expenditure Type</h2>
	<div class="row">
		<div class="col-md-12" align="center">
			<hr style="border-top-color: #c1b1b1;">
		</div>
	</div>
<!-- <div class="expenditure"> -->
	<form class="" method="post" action="" name="expenseDetails">
		<div class="">
	
		<!-- Value of 'name' attribute is used in customerDetails.js  -->
		
			<div class="row">
			
<!-- 			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-xl-2"></div> -->
			<!-- <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 col-xl-1"></div> -->
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="expenditurecol">
						
						<%
							ExpenditureDetailsDao cdd = new ExpenditureDetailsDao();
           					List cList =cdd.getAllExpenseType();
						%>
						<input list="expType_drop" id="expTypeName" class="" onchange="cheakForExpenditureType()" required>
						<datalist id="expType_drop">
							<%
					           for(int i=0;i<cList.size();i++)
					           {
					        	   ExpenditureTypeBeanH cat=(ExpenditureTypeBeanH)cList.get(i);
							%>
							<option data-value="<%=cat.getPk_expenseType_Id()%>"
								value="<%=cat.getExpenseTypeName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
						<!-- <span>Expenditure Type</span> -->
						<span>Expenditure Type <sup style="color: red">*</sup></span>
						</div>
			</div>
			
			<div class="">
				<div class="row" id="btnrow">
				<div class="invoice_button">
					<!-- <div class="col-lg-12 col-md-12 col-sm-12 col-12 col-sm-offset-1"> -->
						<!-- <div class="col-md-2" style="display: inline-block;"> -->
							<input type="button" id="save" name="btn" class="btn btn-large btn-success btnwidth" onclick="addExpenseType()" value="Submit" />
						<!-- </div> -->	
						<!-- <div class="col-md-2" style="display: inline-block;"> -->
							<input type="reset" id="save" name="btn" class="btn btn-large btn-danger btnwidth" onclick="reset()" value="Cancel" />
						<!-- </div> -->
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
</body>