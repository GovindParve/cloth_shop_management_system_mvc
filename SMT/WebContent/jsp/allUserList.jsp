<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"
	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all">
<script src="/SMT/staticContent/js/userlogin.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">

<script>
	     $(document).ready(function(){
	    	 getAllUserList();
	}); 
	</script>
<script type="text/javascript">
  			function Back()
  			{
  				window.location = "create_user.jsp" ;
  			}
  		</script>
<style>
}

/* #userDetails {
    width: 100%;
} */

.dataTables_scrollHeadInner {
    width: 100% !important;
}
table.table.table-bordered.table-striped.table-condensed.cf.no-footer.dataTable {
    width: 100% !important;
}
.dataTables_scrollBody {
	height: 250px;
}
.table-responsive {
    margin-bottom: 20px;
    width: 95%;
}
.dataTables_wrapper.no-footer .dataTables_scrollBody {
    border-bottom: none;
}

@media screen and (max-width: 480px) {
.table-responsive {
    width: 90%;
}
}
</style>  		
<body id="dt_example" class="vColor">
	<div class="container-fluid">
		<div class="row">
			<div align="center" style="width:auto;" id="allwayreporth2">
				<h2 class="form-name style_heading">User List</h2>
			</div>
		</div>

		<div class="row" hidden="true">
			<div class="form-group" align="right">
				<div class="col-sm-offset-8 col-md-4 control-label">
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

		<div class="row" align="center">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-condensed cf"
					id="userDetails" class="display" style="border-collapse: collapse;">
					<thead>
						<tr>
							<th>Sr No</th>
							<th>Role</th>
							<th>User Name</th>
							<th>Password</th>
							<th>Email</th>
						</tr>
					</thead>
				</table>
				
			</div>
		</div>
		
		<div class="row" id="btnrow">
			<!-- <div class="wrapper" align="center"> -->
			<div class="invoice_button">
				<input type="button" value="Back" id="listBtn" style="border-radius: 10px;"
					class="btn btn-large btn-primary btn-md button_hw button_margin_right btnwidth" onclick="Back()" />
					</div>
			<!-- </div> -->
		</div>
	
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html> 