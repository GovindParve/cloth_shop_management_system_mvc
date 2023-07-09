
<%@page import="java.util.Calendar"%>
<%@page import="com.smt.hibernate.UserDetail"%>
<%@page import="org.hibernate.Session"%>
<%@page import="com.smt.utility.HibernateUtility"%>
<%@page import="com.smt.hibernate.Stock"%>
<%@page import="java.util.List"%>
<%@page import="com.smt.dao.StockDao"%>
<%@page import="java.util.List"%>
<%
	boolean isHome = false;
%>

<%@include file="y_commons/header1.jsp"%>
<head>
 <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
 
 <!----------------------------------------->

<script type="text/javascript" >
jQuery(document).ready( function() {
	Mostsell();
	return false;
	}); 
	
</script>
<!----------------------------------------->

    <script type="text/javascript">
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540],
          ['2006',  660,       1120],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540],
          ['2006',  660,       1120],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540],
          ['2007',  1030,      540]
        ]);
        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };
        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        chart.draw(data, options);
      }
    </script>
    <script type="text/javascript">
      google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Day');
      data.addColumn('number', 'Guardians of the Galaxy');
      data.addColumn('number', 'The Avengers');
      data.addColumn('number', 'Transformers: Age of Extinction');
      data.addRows([
        [1,  37.8, 80.8, 41.8],
        [2,  30.9, 69.5, 32.4],
        [3,  25.4,   57, 25.7],
        [4,  11.7, 18.8, 10.5],
        [5,  11.9, 17.6, 10.4],
        [6,   8.8, 13.6,  7.7],
        [7,   7.6, 12.3,  9.6],
        [8,  12.3, 29.2, 10.6],
        [9,  16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11,  5.3,  7.9,  4.7],
        [12,  6.6,  8.4,  5.2],
        [13,  4.8,  6.3,  3.6],
        [14,  4.2,  6.2,  3.4]
      ]);
      var options = {
        chart: {
          title: 'Box Office Earnings in First Two Weeks of Opening',
          subtitle: 'in millions of dollars (USD)'
        },
        width: 900,
        height: 500,
        axes: {
          x: {
            0: {side: 'top'}
          }
        }
      };
      var chart = new google.charts.Line(document.getElementById('line_top_x'));
      chart.draw(data, google.charts.Line.convertOptions(options));
    }
  </script>

	<style>
	.graph{
	 width: 500px;
  height: 500px;
  overflow: scroll;
	</style>
</head>
<body onload="notifyMe()">
		
				<div class="row">
                        <div class="col-lg-6 ">
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">LOW STOCK(BELOW 10 PICS)</h3>
                            <div class="row form-group">
							<div class="col-lg-7" >
								<select input id="lowstock" class="form-control" ></select>
							</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 ">
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">MOST SELL(10PICS DAILY)</h3>
                            <div class="row form-group" >
									<div class="col-lg-7" >
									<select input id="Mostsell"  class="form-control"  ></select>
									</div>
                                </div>
                        </div>
                    </div>
                  
                </div>
				
               <div class="row">
               <div class="total-headning">
                    <h4>FERTILIZER</h4>
                    </div>
                    <div class="col-lg-4 ">
                    
                        <div class="white-box analytics-info">
                            <h3 class="box-title" align="center">TOTAL PURCHASE</h3>
                                <div class="row form-group">
                                <label class="control-label col-md-2 " for="contactNo1">Daily Purchase</label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailypurchase" readonly="readonly" name="dailypurchase"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                                <label class="control-label col-md-2 " for="contactNo1">Monthly Purchase</label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlypurchase" readonly="readonly" name="monthlypurchase"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
             
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-xs-12">
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL SALE(CASH)</h3>
                              <div class="row form-group" >
                                <label class="control-label col-md-2 " for="contactNo1">Daily </label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailysalecash" readonly="readonly" name="dailysalecash"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                                <label class="control-label col-md-2 " for="contactNo1" >Monthly </label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlysalecash" readonly="readonly" name="monthlysalecash"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-xs-12">
                   
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL SALE(CREDIT)</h3>
                             <div class="row form-group" >
                                <label class="control-label col-md-2 " for="contactNo1" >Daily </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailysalecredit" readonly="readonly" name="dailysalecredit"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1">Monthly </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlysalecredit" readonly="readonly" name="monthlysalecredit"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
                 <div class="row">
                 <div class="total-headning">
                        <h4>Cloth</h4>
                    </div>
                    <div class="col-lg-4 ">
                    
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL PURCHASE</h3>
                                <div class="row form-group" >
                                <label class="control-label col-md-2 " for="contactNo1" >Daily Purchase</label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailypurchaseseed" readonly="readonly" name="dailypurchaseseed"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                                <label class="control-label col-md-2 " for="contactNo1" >Monthly Purchase</label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlypurchaseseed" readonly="readonly" name="monthlypurchaseseed"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-xs-12">
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL SALE(CASH)</h3>
                              <div class="row form-group" >
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1" >Daily </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailysaleseed" readonly="readonly" name="dailysaleseed"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1">Monthly </label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlysaleseed" readonly="readonly" name="monthlysaleseed"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-xs-12">
                   
                        <div class="white-box analytics-info">
                            <h3 class="box-title" align="center">TOTAL SALE(CREDIT)</h3>
                             <div class="row form-group" >
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1">Daily </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailysaleseedcredit" readonly="readonly" name="dailysaleseedcredit"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1">Monthly </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlysaleseedcredit" readonly="readonly" name="monthlysaleseedcredit"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
                
                 <div class="row">
                  <div class="total-headning">
                    <h4>PESTICIDE</h4>
                    </div>
                    <div class="col-lg-4 ">
                   
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL PURCHASE</h3>
                                <div class="row form-group" >
                                <label class="control-label col-md-2 " for="contactNo1" >Daily Purchase</label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailypurchasepesticide" readonly="readonly" name="dailypurchasepesticide"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1" style="font-size: 15px;font-weight: 500;">Monthly Purchase</label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlypurchasepesticide" readonly="readonly" name="monthlypurchasepesticide"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-xs-12">
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL SALE(CASH)</h3>
                              <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1">Daily </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailysalepesticide" readonly="readonly" name="dailysalepesticide"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1">Monthly </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlysalepesticide" readonly="readonly" name="monthlysalepesticide"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-xs-12">
                   
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL SALE(CREDIT)</h3>
                             <div class="row form-group" >
                                <label class="control-label col-md-2 " for="contactNo1">Daily </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailysalepesticidecredit" readonly="readonly" name="dailysalepesticidecredit"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1" >Monthly </label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlysalepesticidecredit" readonly="readonly" name="monthlysalepesticidecredit"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
                      <div class="row">
                  <div class="total-headning">
                    <h4>PGR</h4>
                    </div>
                    <div class="col-lg-4 ">
                   
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL PURCHASE</h3>
                                <div class="row form-group" >
                                <label class="control-label col-md-2 " for="contactNo1" >Daily Purchase</label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailypurchasePGR" readonly="readonly" name="dailypurchasePGR"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1" style="font-size: 15px;font-weight: 500;">Monthly Purchase</label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlypurchasePGR" readonly="readonly" name="monthlypurchasePGR"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-xs-12">
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL SALE(CASH)</h3>
                              <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1">Daily </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailysalePGR" readonly="readonly" name="dailysalePGR"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1">Monthly </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlysalePGR" readonly="readonly" name="monthlysalePGR"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-xs-12">
                   
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL SALE(CREDIT)</h3>
                             <div class="row form-group" >
                                <label class="control-label col-md-2 " for="contactNo1">Daily </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailysalePGRcredit" readonly="readonly" name="dailysalePGRcredit"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1" >Monthly </label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlysalePGRcredit" readonly="readonly" name="monthlysalePGRcredit"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
                      <div class="row">
                  <div class="total-headning">
                    <h4>MICRONUTRIENTS</h4>
                    </div>
                    <div class="col-lg-4 ">
                   
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL PURCHASE</h3>
                                <div class="row form-group" >
                                <label class="control-label col-md-2 " for="contactNo1" >Daily Purchase</label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailypurchaseMicronutrients" readonly="readonly" name="dailypurchaseMicronutrients"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1" style="font-size: 15px;font-weight: 500;">Monthly Purchase</label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlypurchaseMicronutrients" readonly="readonly" name="monthlypurchaseMicronutrients"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-xs-12">
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL SALE(CASH)</h3>
                              <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1">Daily </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailysaleMicronutrients" readonly="readonly" name="dailysaleMicronutrients"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1">Monthly </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlysaleMicronutrients" readonly="readonly" name="monthlysaleMicronutrients"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-xs-12">
                   
                        <div class="white-box analytics-info" >
                            <h3 class="box-title" align="center">TOTAL SALE(CREDIT)</h3>
                             <div class="row form-group" >
                                <label class="control-label col-md-2 " for="contactNo1">Daily </label>
                                <div class="input-field">
                                  <div class="input-group">
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="dailysaleMicronutrientscredit" readonly="readonly" name="dailysaleMicronutrientscredit"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                                <div class="row form-group">
                               <!--  <div class="col-md-5"></div> -->
                                <label class="control-label col-md-2 " for="contactNo1" >Monthly </label>
                                <div class="input-field">
                                  <div class="input-group" >
										<span class="input-group-addon"><i class="fa fa-rupee"></i>
									</span> <input id="monthlysaleMicronutrientscredit" readonly="readonly" name="monthlysaleMicronutrientscredit"
										class="form-control input-md" type="text">
									</div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
                
                
                <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div class="white-box">
                            <h3 class="box-title">Products Yearly Sales</h3>
                            <ul class="list-inline text-right">
                                <li>
                                    <h5><i class="fa fa-circle m-r-5 text-info"></i>Mac</h5> </li>
                                <li>
                                    <h5><i class="fa fa-circle m-r-5 text-inverse"></i>Windows</h5> </li>
                            </ul>
                            <div id="ct-visits" style="height: 405px;"></div>
                        </div>
                    </div>
                </div>
               <!--  ==============================================================
                table
                ============================================================== -->
                <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12">
                        <div class="white-box">
                            <div class="col-md-3 col-sm-4 col-xs-6 pull-right">
                                <select class="form-control pull-right row b-none">
                                    <option>March 2017</option>
                                    <option>April 2017</option>
                                    <option>May 2017</option>
                                    <option>June 2017</option>
                                    <option>July 2017</option>
                                </select>
                            </div>
                            <h3 class="box-title">Recent sales</h3>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>NAME</th>
                                            <th>STATUS</th>
                                            <th>DATE</th>
                                            <th>PRICE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td class="txt-oflo">Elite admin</td>
                                            <td>SALE</td>
                                            <td class="txt-oflo">April 18, 2017</td>
                                            <td><span class="text-success">$24</span></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td class="txt-oflo">Real Homes WP Theme</td>
                                            <td>EXTENDED</td>
                                            <td class="txt-oflo">April 19, 2017</td>
                                            <td><span class="text-info">$1250</span></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td class="txt-oflo">EMBEL Admin</td>
                                            <td>EXTENDED</td>
                                            <td class="txt-oflo">April 19, 2017</td>
                                            <td><span class="text-info">$1250</span></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td class="txt-oflo">Medical Pro WP Theme</td>
                                            <td>TAX</td>
                                            <td class="txt-oflo">April 20, 2017</td>
                                            <td><span class="text-danger">-$24</span></td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td class="txt-oflo">Hosting press html</td>
                                            <td>SALE</td>
                                            <td class="txt-oflo">April 21, 2017</td>
                                            <td><span class="text-success">$24</span></td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td class="txt-oflo">Digital Agency PSD</td>
                                            <td>SALE</td>
                                            <td class="txt-oflo">April 23, 2017</td>
                                            <td><span class="text-danger">-$14</span></td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td class="txt-oflo">Helping Hands WP Theme</td>
                                            <td>MEMBER</td>
                                            <td class="txt-oflo">April 22, 2017</td>
                                            <td><span class="text-success">$64</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
               <!--  ==============================================================
                chat-listing & recent comments
                ============================================================== -->
             <!--    <div class="row">
                    .col
                    <div class="col-md-12 col-lg-8 col-sm-12">
                        <div class="white-box">
                            <h3 class="box-title">Recent Comments</h3>
                            <div class="comment-center p-t-10">
                                <div class="comment-body">
                                    <div class="user-img"> <img src="../plugins/images/users/pawandeep.jpg" alt="user" class="img-circle">
                                    </div>
                                    <div class="mail-contnet">
                                        <h5>Pavan kumar</h5><span class="time">10:20 AM   20  may 2016</span>
                                        <br/><span class="mail-desc">Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat</span> <a href="javacript:void(0)" class="btn btn btn-rounded btn-default btn-outline m-r-5"><i class="ti-check text-success m-r-5"></i>Approve</a><a href="javacript:void(0)" class="btn-rounded btn btn-default btn-outline"><i class="ti-close text-danger m-r-5"></i> Reject</a>
                                    </div>
                                </div>
                                <div class="comment-body">
                                    <div class="user-img"> <img src="../plugins/images/users/sonu.jpg" alt="user" class="img-circle">
                                    </div>
                                    <div class="mail-contnet">
                                        <h5>Sonu Nigam</h5><span class="time">10:20 AM   20  may 2016</span>
                                        <br/><span class="mail-desc">Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat</span>
                                    </div>
                                </div>
                                <div class="comment-body b-none">
                                    <div class="user-img"> <img src="../plugins/images/users/arijit.jpg" alt="user" class="img-circle">
                                    </div>
                                    <div class="mail-contnet">
                                        <h5>Arijit singh</h5><span class="time">10:20 AM   20  may 2016</span>
                                        <br/><span class="mail-desc">Donec ac condimentum massa. Etiam pellentesque pretium lacus. Phasellus ultricies dictum suscipit. Aenean commodo dui pellentesque molestie feugiat. Aenean commodo dui pellentesque molestie feugiat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="panel">
                            <div class="sk-chat-widgets">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        CHAT LISTING
                                    </div>
                                    <div class="panel-body">
                                        <ul class="chatonline">
                                            <li>
                                                <div class="call-chat">
                                                    <button class="btn btn-success btn-circle btn-lg" type="button"><i class="fa fa-phone"></i></button>
                                                    <button class="btn btn-info btn-circle btn-lg" type="button"><i class="fa fa-comments-o"></i></button>
                                                </div>
                                                <a href="javascript:void(0)"><img src="../plugins/images/users/varun.jpg" alt="user-img" class="img-circle"> <span>Varun Dhavan <small class="text-success">online</small></span></a>
                                            </li>
                                            <li>
                                                <div class="call-chat">
                                                    <button class="btn btn-success btn-circle btn-lg" type="button"><i class="fa fa-phone"></i></button>
                                                    <button class="btn btn-info btn-circle btn-lg" type="button"><i class="fa fa-comments-o"></i></button>
                                                </div>
                                                <a href="javascript:void(0)"><img src="../plugins/images/users/genu.jpg" alt="user-img" class="img-circle"> <span>Genelia Deshmukh <small class="text-warning">Away</small></span></a>
                                            </li>
                                            <li>
                                                <div class="call-chat">
                                                    <button class="btn btn-success btn-circle btn-lg" type="button"><i class="fa fa-phone"></i></button>
                                                    <button class="btn btn-info btn-circle btn-lg" type="button"><i class="fa fa-comments-o"></i></button>
                                                </div>
                                                <a href="javascript:void(0)"><img src="../plugins/images/users/ritesh.jpg" alt="user-img" class="img-circle"> <span>Ritesh Deshmukh <small class="text-danger">Busy</small></span></a>
                                            </li>
                                            <li>
                                                <div class="call-chat">
                                                    <button class="btn btn-success btn-circle btn-lg" type="button"><i class="fa fa-phone"></i></button>
                                                    <button class="btn btn-info btn-circle btn-lg" type="button"><i class="fa fa-comments-o"></i></button>
                                                </div>
                                                <a href="javascript:void(0)"><img src="../plugins/images/users/arijit.jpg" alt="user-img" class="img-circle"> <span>Arijit Sinh <small class="text-muted">Offline</small></span></a>
                                            </li>
                                            <li>
                                                <div class="call-chat">
                                                    <button class="btn btn-success btn-circle btn-lg" type="button"><i class="fa fa-phone"></i></button>
                                                    <button class="btn btn-info btn-circle btn-lg" type="button"><i class="fa fa-comments-o"></i></button>
                                                </div>
                                                <a href="javascript:void(0)"><img src="../plugins/images/users/govinda.jpg" alt="user-img" class="img-circle"> <span>Govinda Star <small class="text-success">online</small></span></a>
                                            </li>
                                            <li>
                                                <div class="call-chat">
                                                    <button class="btn btn-success btn-circle btn-lg" type="button"><i class="fa fa-phone"></i></button>
                                                    <button class="btn btn-info btn-circle btn-lg" type="button"><i class="fa fa-comments-o"></i></button>
                                                </div>
                                                <a href="javascript:void(0)"><img src="../plugins/images/users/hritik.jpg" alt="user-img" class="img-circle"> <span>John Abraham<small class="text-success">online</small></span></a>
                                            </li>
                                            <li>
                                                <div class="call-chat">
                                                    <button class="btn btn-success btn-circle btn-lg" type="button"><i class="fa fa-phone"></i></button>
                                                    <button class="btn btn-info btn-circle btn-lg" type="button"><i class="fa fa-comments-o"></i></button>
                                                </div>
                                                <a href="javascript:void(0)"><img src="../plugins/images/users/varun.jpg" alt="user-img" class="img-circle"> <span>Varun Dhavan <small class="text-success">online</small></span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    /.col
                </div>
            </div> --> 
            <!-- /.container-fluid -->
            
        <!--     =================================================================
              Garph  section
            ================================================================= -->
         <!-- <div class="row">
          <div class="col-lg-6 col-sm-6 col-xs-12">
          <div class="graph"  style="margin-top: 42px;">
          <div class="analytics-info">
                            <h3 class="box-title">graph1</h3>
               <div id="curve_chart" style="width: 800px; height: 500px"></div>
             </div>
             </div>
           </div>
             <div class="col-lg-6 col-sm-6 col-xs-12">
          <div class="white-box analytics-info" style="margin-top: 42px;">
                            <h3 class="box-title">graph1</h3>
                     <div id="line_top_x"></div>
             </div>
             </div> 
      
           </div> -->
         <div class="row">
          <!-- <div class="col-lg-6 col-sm-6 col-xs-12">
          <div class="white-box analytics-info" style="margin-top: 42px;">
                            <h3 class="box-title">graph1</h3>
             </div>
             </div> -->
             <!-- <div class="col-lg-6 col-sm-6 col-xs-12">
          <div class="white-box analytics-info" style="margin-top: 42px;">
                            <h3 class="box-title">graph1</h3>
             </div>
             </div> -->
             
           </div> 
           <!--   <div class="row">
          <div class="col-lg-6 col-sm-6 col-xs-12">
          <div class="white-box analytics-info" style="margin-top: 42px;margin-bottom:76px">
                            <h3 class="box-title">graph1</h3>
             </div>
             </div>
             <div class="col-lg-6 col-sm-6 col-xs-12">
          <div class="white-box analytics-info" style="margin-top: 42px;margin-bottom:76px">
                            <h3 class="box-title">graph1</h3>
             </div>
             </div>
             
           </div> -->
           <div class="row" >
            <footer class="footer text-center"> 2017 &copy; Embel Admin brought to you by wrappixel.com </footer>
       </div>
        <!-- ============================================================== -->
        <!-- End Page Content -->
        <!-- ============================================================== -->
 
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <!-- ============================================================== -->
    <script src="/AgriSoft/staticContent/dashboard/plugins/bower_components/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="/AgriSoft/staticContent/dashboard/html/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- Menu Plugin JavaScript -->
    <script src="/AgriSoft/staticContent/dashboard/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.js"></script>
    <!--slimscroll JavaScript -->
    <script src="/AgriSoft/staticContent/dashboard/html/js/jquery.slimscroll.js"></script>
    <!--Wave Effects -->
    <script src="/AgriSoft/staticContent/dashboard/html/js/waves.js"></script>
    <!--Counter js -->
    <!-- <script src="/AgriSoft/staticContent/dashboard/plugins/bower_components/waypoints/lib/jquery.waypoints.js"></script> -->
    <script src="/AgriSoft/staticContent/js/jquery.waypoints.js"></script>
   
    
    <script src="/AgriSoft/staticContent/dashboard/plugins/bower_components/counterup/jquery.counterup.min.js"></script>
    <!-- chartist chart -->
    <script src="/AgriSoft/staticContent/dashboard/plugins/bower_components/chartist-js/dist/chartist.min.js"></script>
    <script src="/AgriSoft/staticContent/dashboard/plugins/bower_components/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.min.js"></script>
    <!-- Sparkline chart JavaScript -->
    <script src="/AgriSoft/staticContent/dashboard/plugins/bower_components/jquery-sparkline/jquery.sparkline.min.js"></script>
    <!-- Custom Theme JavaScript -->
    <script src="/AgriSoft/staticContent/dashboard/html/js/custom.min.js"></script>
    <script src="/AgriSoft/staticContent/dashboard/html/js/dashboard1.js"></script>
    <script src="/AgriSoft/staticContent/dashboard/plugins/bower_components/toast-master/js/jquery.toast.js"></script>
    
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});
function notifyMe() {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Low Stock', {
      icon: '/AgriSoft/staticContent/images/notification.png', 
      body: "Some Product Running on Low Stock!",
    });
    notification.onclick = function () {
      window.open("/AgriSoft/jsp/lowStockNotification.jsp");      
    };
  }
}
</script>
</body>
</html>