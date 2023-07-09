
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/buttom.js"></script>
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/js/jquery.dataTables.js"
	type="text/javascript"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<link href="/SMT/staticContent/css/dataTa.css" rel="stylesheet"
	type="text/css" media="all" />
<link href="/SMT/staticContent/css/dataTables.jqueryui.min.css"
	rel="stylesheet" type="text/css" media="all">
<link href="/SMT/staticContent/css/select.css" rel="stylesheet"
	type="text/css" media="all">
<link href="/SMT/staticContent/css/button.css" rel="stylesheet"
	type="text/css" media="all">
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link href="/SMT/staticContent/css/jquery.dataTables.tableTools.css"
	rel="stylesheet" type="text/css" media="all" />
<script src="/SMT/staticContent/js/jquery.dataTables.tableTools.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/js/cashbankbook.js"></script>
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
	top: 5px;
	right: 1%;
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
	width: 100%;
	margin-left: 25px;
	margin-top: 1%;
	margin-bottom: 0%;
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
		right: 1%;
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
		width: 109%;
		overflow-y: hidden;
		-ms-overflow-style: -ms-autohiding-scrollbar;
		border: none;
		margin-bottom: 3%;
		margin-left: 21px;
	}
	.container {
		width: 530px;
		margin-left: 17%;
	}
}
</style>
<body class="vColor"
	onload="getYesterdarTotalAmount(); getTodayCreditDebitReport(); getTodayCreditDebitReport1(); getTodaySaleTotalAmount1(); getTodayPurchaseTotalAmount(); getTodaySaleReturnTotalAmount(); getTodayPurchaseReturnTotalAmount(); getTodayCreditTotalAmount(); getTodayCreditReturnTotalAmount(); getTodayExpdCreditAmount(); getTodayExpdDebitAmount();getTodayCashAmount();getTodayCardAmount();getTodayChequeAmount();getTodayNEFTAmount();">
	<div class="container" align="center" style="margin-bottom: 10%;">
		<div class="row">
			<div align="center" id="allwayreporth2">
				<h2 class="form-name style_heading">Day Closure Report</h2>
			</div>
			<div class="row">
				<div class="col-md-10">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
		</div>
		<div class="table-responsive" hidden="true">
			<div class="col-md-5">
				<table id="example1" class="display	">
					<thead>
						<tr>
							<th>Name</th>
							<th>Credit</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th></th>
							<th></th>
						</tr>
					</tfoot>
				</table>
			</div>

			<div class="col-md-5">
				<table id="example2" class="display	">
					<thead>
						<tr>
							<th>Name</th>
							<th>Debit</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th></th>
							<th></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>

		<div class="row form-group" style="margin-top: 25px;" hidden="true">

			<!-- <label class="col-md-2 col-md-offset-1 control-label" for="village">Yesterday
				Amount:<sup>*</sup>
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="glyphicon glyphicon-map-marker"></i>
					</span> <input type="text" readonly="readonly" name="yesAmt" id="yesAmt"
						placeholder="YesterDay Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div> -->

			<label class="col-md-2 control-label" for="village"> Credit
				Amount: </label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="creAmt" id="creAmt"
						placeholder="Credit Amount"
						class="form-control input-md ac_district" value="0"> <input
						readonly="readonly" id="dupsaletotal" name="dupsaletotal"
						class="form-control input-md" type="hidden">
				</div>
			</div>

			<label class="col-md-2 control-label" for="village"> Debit
				Amount: </label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="debAmt" id="debAmt"
						placeholder="YesterDay Amount"
						class="form-control input-md ac_district" value="0"> <input
						readonly="readonly" id="dupsaletotal1" name="dupsaletotal1"
						class="form-control input-md" type="hidden">
				</div>
			</div>

		</div>

		<div class="row form-group" style="margin-top: 25px;">
			<label class="col-md-2 control-label col-sm-offset-1" for="village">
				Sale Amount: </label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="totsaleAmt"
						id="totsaleAmt" placeholder="Credit Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>

			<label class="col-md-2 control-label col-sm-offset-1" for="village">
				Sale Return Amount: </label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="saleReturnAmt"
						id="saleReturnAmt" placeholder="Sale Return Amount"
						class="form-control input-md ac_district" value="0"> <input
						readonly="readonly" id="saleReturnAmt" name="saleReturnAmt"
						class="form-control input-md" type="hidden">
				</div>
			</div>
		</div>

		<div class="row form-group" style="margin-top: 25px;">
			<label class="col-md-2 control-label col-sm-offset-1"
				for="todayCashAmount"> Cash Amount: </label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="todayCashAmount"
						id="todayCashAmount" class="form-control input-md ac_district"
						value="0">
				</div>
			</div>

			<label class="col-md-2 control-label col-sm-offset-1"
				for="todayCardAmount"> Card Amount: </label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="todayCardAmount"
						id="todayCardAmount" class="form-control input-md ac_district"
						value="0"> <input readonly="readonly"
						class="form-control input-md" type="hidden">
				</div>
			</div>
		</div>

		<div class="row form-group" style="margin-top: 25px;" hidden="true">
			<label class="col-md-2 control-label" for="todayChequeAmount">
				Cheque Amount: </label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="todayChequeAmount"
						id="todayChequeAmount" placeholder="Credit Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>

			<label class="col-md- control-label" for="todayNeftAmount">
				NEFT Amount: </label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="todayNeftAmount"
						id="todayNeftAmount" class="form-control input-md ac_district"
						value="0"> <input readonly="readonly" id="saleReturnAmt"
						name="saleReturnAmt" class="form-control input-md" type="hidden">
				</div>
			</div>
		</div>

		<!-- CREDIT CUSTOMER DAY CLOSURE -->
		<div class="row form-group" style="margin-top: 25px;" hidden="true">

			<label class="col-md-2 control-label" for="village"> Credit
				Sale Amount: </label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="creditSaleAmount"
						id="creditSaleAmount" placeholder="YesterDay Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>

			<label class="col-md-2 control-label" for="village"> Credit
				Return Amount: </label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="creditReturnAmount"
						id="creditReturnAmount" placeholder="Purchase Return Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>

		</div>
		<!--
 		<div class="row form-group" style="margin-top: 25px;">


			<label class="col-md-2 col-md-offset-1 control-label" for="village">
				Purchase Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span>
					 <input type="text" readonly="readonly" name="totpurchaseAmt"
						id="totpurchaseAmt" placeholder="Purchase Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>

			<label class="col-md-2 col-md-offset-1 control-label" for="village">
				Purchase Return Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="purchaseReturnAmt"
						id="purchaseReturnAmt" placeholder="Purchase Return Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 25px;">

			<label class="col-md-2 col-md-offset-1 control-label" for="village">
				Expenditure Credit Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span>
					 <input type="text" readonly="readonly" name="exCreditAmount"
						id="exCreditAmount" placeholder="Expenditure Credit Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>

			<label class="col-md-2 col-md-offset-1 control-label" for="village">
				Expenditure Debit Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="exDebitAmount"
						id="exDebitAmount" placeholder="Expenditure Debit Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>
		</div>
-->
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>