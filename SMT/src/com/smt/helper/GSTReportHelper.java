package com.smt.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.SaleB2CReportBean;
import com.smt.bean.SaleReport;
import com.smt.dao.GSTReportDAO;

public class GSTReportHelper
{
	public List getSaleDetailsBetweenTwoDatesB2CGSTReport(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String fisDateB2CGST = request.getParameter("fisDateB2CGST");
		String endDateB2CGST = request.getParameter("endDateB2CGST");
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try
		{
			adate = format.parse(fisDateB2CGST);
			bdate = format.parse(endDateB2CGST);
		}
		catch (ParseException e1)
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		GSTReportDAO dao = new GSTReportDAO();
		List<SaleB2CReportBean> exp1List = dao.getSaleDetailsBetweenTwoDatesB2CGSTReport(fisDateB2CGST, endDateB2CGST, userTypeRole, userName);

		return exp1List;		
	}
	
	// two dates purchase
	public List purchaseReportBetweenTwoDatesB2BPurchaseReport(HttpServletRequest request, HttpServletResponse response)
	{
		String fisDateB2bP = request.getParameter("fisDateB2bP");
		String endDateB2bP = request.getParameter("endDateB2bP");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		System.out.println("fisDateB2bP ===> "+fisDateB2bP);
		System.out.println("endDateB2bP ===> "+endDateB2bP);
		
		try
		{
			adate = format.parse(fisDateB2bP);
			bdate = format.parse(endDateB2bP);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, PurchaseReportBean> map = new HashMap<Long, PurchaseReportBean>();

		GSTReportDAO dao = new GSTReportDAO();
		List<PurchaseReportBean> exp1List = dao.purchaseReportBetweenTwoDatesB2CGSTReport(adate, bdate);

		return exp1List;
	}
	
}
