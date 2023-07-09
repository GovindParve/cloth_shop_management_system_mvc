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
function myAlert(msg)
{
	var dialog = bootbox.dialog({
    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
    closeButton: false
   });

   setTimeout(function() {
	dialog.modal('hide');
   }, 1500);
}
		
		
		function cheakForExpenditure()
		{
			<%
				ExpenditureDetailsDao exp = new ExpenditureDetailsDao();
				List cList1 =exp.getAllExpenseNames();
			%>
			var expenditureName = $('#expenseName').val();
    		var upExpenditureName = expenditureName.toUpperCase();
    		var duplicate;
			<%
			for(int i=0;i< cList1.size();i++)
			{
				ExpenditureDetailsBean cat=(ExpenditureDetailsBean)cList1.get(i);
			%>
			var subCat = "<%=cat.getExpenseName()%>";
			var subcatName=document.getElementById("expenseName").value;
			var UpValue = subCat.toUpperCase();
			if(upExpenditureName == UpValue)
			{
					duplicate = "found";
			}
			if(subcatName == subCat){
				myAlert("Expenditure already exist...Duplicate Not allowed");
				//location.reload();
				return false;
			}
			<%
			}
			%>
			if(duplicate == "found"){
    			document.expenseDetails.btn.disabled = true;	
    			myAlert("Expenditure Name Already Exist..!!!");
				//location.reload();
				document.expenseDetails.btn.disabled = false;
    			return false;
    		}
		}
	</script>
	
	
<script type="text/javascript">
	function getAllExpenditure()
	{	
		window.location = "expenditureList.jsp";
	}
	
	function deleteExpd()
	{
		window.location = "expenditureDelete.jsp";
	}
</script>	
	
<style>
.btnwidth {
	padding: 10px !important;
	width: 130px !important;
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
}

</style>	
</head>
<body class="vColor">
 	<div class="expenditure">
		<h2>Expenditure Management</h2>
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
           						List cList =cdd.getAllExpenseNames();
							%>
						
						<%
           					List eTList =cdd.getAllExpenseType();
						%>
						<input list="expType_drop" id="expTypeName" class="" required>
						<datalist id="expType_drop">
							<%
					           for(int i=0;i<eTList.size();i++)
					           {
					        	   ExpenditureTypeBeanH etb=(ExpenditureTypeBeanH)eTList.get(i);
							%>
							<option data-value="<%=etb.getPk_expenseType_Id()%>" value="<%=etb.getExpenseTypeName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
						<span>Expenditure Type <sup style="color: red">*</sup></span>
						</div>
			</div>
			
			<div class="row">
			
<!-- 			<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 col-xl-2"></div> -->
			<!-- <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 col-xl-1"></div> -->
				<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="expenditurecol">
				
						
						
						<input list="cat_drop" id="expenseName" class="" onchange="cheakForExpenditure()" required>
						<datalist id="cat_drop">
							<%
					           for(int i=0;i<cList.size();i++)
					           {
					        	   ExpenditureDetailsBean cat=(ExpenditureDetailsBean)cList.get(i);
							%>
							<option data-value="<%=cat.getPkExpenseDetailsId()%>"
								value="<%=cat.getExpenseName()%>">
								<%
				      			}
				    		%>
							
						</datalist>
						<span>Expenditure Name <sup style="color: red">*</sup></span>
						</div>
						
			</div>
			<!-- <div class="row">
			<div class="col-md-6 col-sm-12 col-xs-12 col-xl-4 col-lg-4" id="">
			 <input type="file" id="" name="" required>
			 <span>Upload File</span>
			</div>
			</div> -->
			
			<div class="">
			<div class="row" id="btnrow">
				<div class="invoice_button" align="center">
			<!-- <div class="col-lg-12 col-md-12 col-sm-12 col-12"> -->
				<!-- <div class="col-md-2" id="expenditurebtn"> -->
					<input type="button" id="save" name="btn" class="btn btn-large btn-success btnwidth" onclick="addExpenseDetails()" value="Submit" />
				<!-- </div> -->	
				<!-- <div class="col-md-2" id="expenditurebtn"> -->
					<input id="save" name="btn" class="btn btn-large btn-danger btnwidth" type="reset" onclick="reset()" value="Cancel" />
				<!-- </div> -->
				<!-- <div class="col-md-2" id="expenditurebtn"> -->
					<input id="list" name="btn" class="btn btn-large btn-info btnwidth" type="button" onclick="getAllExpenditure()" value="List" />
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