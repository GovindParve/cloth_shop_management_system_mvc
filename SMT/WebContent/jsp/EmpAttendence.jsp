<%@page import="com.smt.hibernate.EmpAttendenceBean"%>
<%@page import="com.smt.helper.EmployeeDetailsHelper"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.bean.GetEmployeeDetails"%>
<%@page import="com.smt.dao.EmployeeDetailsDao"%>
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootstrap.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/y_js/bootbox.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js" type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" media="all">
<link rel="stylesheet" href="/SMT/staticContent/css/invoice.css">
	
	<script type="text/javascript" src="/SMT/staticContent/js/employeeDetails.js"></script>
<html>
<%
String pattern = "yyyy-MM-dd";
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
	String todayDate = simpleDateFormat.format(new Date());
	System.out.println(todayDate);
%>

<head>
<title>Credit Customer List</title>
<script type="text/javascript">
	function Back() {
		window.location = "employee_detail.jsp";
	}
	function update() {
		window.location = "EditEmpAttendance.jsp";
	}
	function List() {
		window.location = "AttendanceList.jsp";
	}
</script>

</head>


<script type="text/javascript">
 
<%-- $(document).ready(function(){
 	 $("#list").on('click','.pbtn',function(){
        
		var attendance = $(this).val();
		
        var currentRow=$(this).closest("tr");
        var id=currentRow.find("td:eq(0)").text();
        alert(JSON.stringify("id--->"+id+"attendace type----->"+attendance));
   });  
 
   
  
	<%
	   EmployeeDetailsHelper catHelper = new EmployeeDetailsHelper();
		  List catList = catHelper.getAllMainTableNo(request,response);
  %>
  <%
	    for(int i=0;i<catList.size();i++){
		EmpAttendenceBean category = (EmpAttendenceBean)catList.get(i);
  %>

      var type ="<%=category.getEmpAttendence()%>";
    var id1="<%=category.getEmpId() %>";

   
 <%
	  }
 %>
});  
  --%>
$(document)
		.ready(
				function() {
					var table = $("#list").dataTable({
						scrollX: true,
						scrollY: 300,
					});
					var tableTools = new $.fn.dataTable.TableTools(
							table,
							{
								'sSwfPath' : '//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf',
								'aButtons' : [ 'copy', 'print', 'csv', {
									'sExtends' : 'xls',
									'sFileName' : 'Data.xls',
									'sButtonText' : 'Save to Excel'
								} ],
								dom : 'Bfrtip',
								buttons : [ 'copy', 'csv', 'excel', 'pdf',
										'print' ],
							});
					$(tableTools.fnContainer()).insertBefore(
							'#list_wrapper');
				});
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
input#date {
    color: #000 !important;
}
.table-responsive {
    width: 97%;
    margin-bottom: 20px;
}
table.display.dataTable.no-footer {
    width: 100% !important;
}
.dataTables_scrollHeadInner {
    width: 100% !important;
}
#date {
    padding-top: 15px;
}
#employeelisth2 {
    margin-top: 0px;
}
#list {
    border: none;
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
		top: 19;
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
}

#billheading {
	/* padding-top: 3% !important; 
	position: absolute !important; 
	width: auto !important; */
}
#save {
	border-radius: 10px !important; 
	padding: 10px !important; 
	/* margin-bottom: 4% !important;
	margin-left: 250% !important; */
}
#listBtn {
	border-radius: 10px !important; 
	padding: 10px !important; 
	/* margin-bottom: 4% !important;
	margin-left: 200% !important; */
}
.tdinput {
    /* margin-left: 25px; */
    font-size: 20px;
    /* border: none; */
    padding: 2px 5px;
}

@media screen and (max-width: 480px) {
.table-responsive {
    width: 90%;
}
}
</style>
<body id="dt_example" style="min-height: 300px;" class="vColor">
<div class="container-fluid">
	<div class="row">
		<div class="form-group" align="left">
			<div class="control-label" id="billheading">
				<div id="date">
					<label id="demo"></label>
					<script>
						var date = new Date();
						document.getElementById("demo").innerHTML = date
								.toDateString();
					</script>
				</div>
			</div>
		</div>


		<div align="center" id="employeelisth2">
			<h2 class="form-name style_heading">Employee Attendance List</h2>
		</div>
		</div>
		<div class="row">
			<div class="col-md-12" align="center">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>
	
	<%
		EmployeeDetailsDao dao = new EmployeeDetailsDao();
		List list12 = dao.getEmployeeList2(request, response);
	%>

	<div id="demo_jui">
	<div class="row" align="center">
	<div class="table-responsive">
		<table id="list" class="display" border="1">
			<thead>
				<tr>
					<th style="display: none;">Id</th> 
					<th>First Name</th>
					<th style="display: none;">Middle Name</th>
					<th style="text-align: center;">Last Name</th>
					<th style="text-align: center;">Date</th>
					<th style="text-align: center;">Present</th>
					<th style="text-align: center;">Absent</th>
					<th style="text-align: center;">HalfDay</th>
					<th style="text-align: center;">HoliDay</th>
					<th style="text-align: center;">PaidLeave</th>
					<th style="text-align: center;">Today's<br>attendance</th>
				</tr>
			</thead>
			<tbody>
				<%
					for (int i = 0; i < list12.size(); i++) {
						EmpAttendenceBean sr = (EmpAttendenceBean) list12.get(i);
						
				%>
				
				 <%
					if(sr.getEmpAttendence().equalsIgnoreCase("present"))
					{
						%> 
				<tr >
				
					<td class="align" style="display: none;"><%=sr.getEmpId()%></td>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align" style="display: none;"><%=sr.getMiddleName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					
					<td class="align" ><input type="date" id="date" value="<%=todayDate%>" ></td>
					<td class="align "><input type="button" class="pbtn tdinput" value="Present" style="background-color: green; color:white;" ></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="Absent" name="p" style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HalfDay" name="p"<%-- id="<%=sr.getEmpPkId()%>,<%=sr.getFirstName()%>,<%=sr.getMiddleName()%>,<%=sr.getLastName()%>,halfday" onclick="EmpAttendance(this)" --%> style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HoliDay" name="p"<%-- id="<%=sr.getEmpPkId()%>,<%=sr.getFirstName()%>,<%=sr.getMiddleName()%>,<%=sr.getLastName()%>,absent" onclick="EmpAttendance(this)"  --%> style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="PaidLeave" name="p"<%-- id="<%=sr.getEmpPkId()%>,<%=sr.getFirstName()%>,<%=sr.getMiddleName()%>,<%=sr.getLastName()%>,absent" onclick="EmpAttendance(this)"  --%> style="color: blue;"></td>
				<td class="align" id="dataAttendance"><%=sr.getEmpAttendence()%></td>
				</tr>
				<% }
					else if(sr.getEmpAttendence().equalsIgnoreCase("HalfDay"))
					{
						%> 
				<tr >
				
					<td class="align" style="display: none;"><%=sr.getEmpId()%></td>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align" style="display: none;"><%=sr.getMiddleName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					
					<td class="align" ><input type="date" id="date" value="<%=todayDate%>" ></td>
					<td class="align "><input type="button" class="pbtn tdinput" value="Present" style="color:blue;" ></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="Absent" name="p" style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HalfDay" name="p" style="background-color: orange; color:white;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HoliDay" name="p"  style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="PaidLeave" name="p" style="color: blue;"></td>
				<td class="align" id="dataAttendance"><%=sr.getEmpAttendence()%></td>
				</tr>
					<% }
					else if(sr.getEmpAttendence().equalsIgnoreCase("Absent"))
					{
						%> 
				<tr >
				
					<td class="align" style="display: none;"><%=sr.getEmpId()%></td>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align" style="display: none;"><%=sr.getMiddleName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					
					<td class="align" ><input type="date" id="date" value="<%=todayDate%>" ></td>
					<td class="align "><input type="button" class="pbtn tdinput" value="Present" style="color:blue;" ></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="Absent" name="p" style=" background-color: red; color: white;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HalfDay" name="p" style="color:blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HoliDay" name="p" style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="PaidLeave" name="p" style="color: blue;"></td>
				<td class="align" id="dataAttendance"><%=sr.getEmpAttendence()%></td>
				</tr>
					<% }
					else if(sr.getEmpAttendence().equalsIgnoreCase("NA"))
					{
						%> 
				<tr >
				
					<td class="align" style="display: none;"><%=sr.getEmpId()%></td>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align" style="display: none;"><%=sr.getMiddleName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					
					<td class="align" ><input type="date" id="date" value="<%=todayDate%>" ></td>
					<td class="align "><input type="button" class="pbtn tdinput" value="Present" style="color:blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="Absent" name="p" style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HalfDay" name="p" style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HoliDay" name="p" style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="PaidLeave" name="p" style="color: blue;"></td>
				<td class="align" id="dataAttendance"><%=sr.getEmpAttendence()%></td>
				</tr>
					<% }
					else if(sr.getEmpAttendence().equalsIgnoreCase("HoliDay"))
					{
						%> 
				<tr >
				
					<td class="align" style="display: none;"><%=sr.getEmpId()%></td>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align" style="display: none;"><%=sr.getMiddleName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					
					<td class="align" ><input type="date" id="date" value="<%=todayDate%>" ></td>
					<td class="align "><input type="button" class="pbtn tdinput" value="Present" style="color:blue;" ></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="Absent" name="p" style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HalfDay" name="p" style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HoliDay" name="p" style="background-color: #8B0000; color: white;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="PaidLeave" name="p" style="color: blue;"></td>
				<td class="align" id="dataAttendance"><%=sr.getEmpAttendence()%></td>
				</tr>
					<% }
					else if(sr.getEmpAttendence().equalsIgnoreCase("PaidLeave"))
					{
						%> 
				<tr >
				
					<td class="align" style="display: none;"><%=sr.getEmpId()%></td>
					<td class="align"><%=sr.getFirstName()%></td>
					<td class="align" style="display: none;"><%=sr.getMiddleName()%></td>
					<td class="align"><%=sr.getLastName()%></td>
					
					<td class="align" ><input type="date" id="date" value="<%=todayDate%>" ></td>
					<td class="align "><input type="button" class="pbtn tdinput" value="Present" style="color:blue;" ></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="Absent" name="p" style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HalfDay" name="p" style="color:blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="HoliDay" name="p" style="color: blue;"></td>
					<td class="align"><input type="button" class="pbtn tdinput" value="PaidLeave" name="p" style="background-color:navy; color:white;"></td>
				<td class="align" id="dataAttendance"><%=sr.getEmpAttendence()%></td>
				</tr>
				<% 
					}
					}
				%>
			</tbody>
		</table>
		</div>
		</div>
		</div>

		<div class="row editcustmerdetails" align="center">

				<div id="btnrow" align="center">
						<div class="invoice_button">
					<!-- <div class="col-md-2"  style="display:inline-block;"> -->
						<input type="button" id="save" name="btn" onclick="update()" value="Update"
							class="btn btn-large btn-success btn-md button_hw button_margin_right btnwidth" />
					<!-- </div> -->
					<!-- <div class="col-md-2"  style="display:inline-block;">
							<input type="button" value="Back"
							style="border-radius: 10px; padding: 10px; margin-bottom: 4%;margin-left: 200%;"
							id="listBtn" class="btn btn-large btn-primary btn-md button_hw button_margin_right" onclick="Back()" />
					</div> -->
					
					<!-- <div class="col-md-2"  style="display:inline-block;"> -->
							<input type="button" value="List" id="listBtn" onclick="List()"
							class="btn btn-large btn-primary btn-md button_hw button_margin_right btnwidth" />
					<!-- </div> -->
					</div>
					</div>

				</div>
	</div>

</body>
</html>
