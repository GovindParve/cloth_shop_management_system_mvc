package com.smt.helper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.bean.AllGraphBean;
import com.smt.bean.SaleReport;
import com.smt.dao.AllGraphDao;

public class AllGraphHelper
{
	public List categoryWiseSaleGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.categoryWiseSaleGraphDao(userTypeRole, userName);
		return exp1List;
	}
	
	
	public List SaleGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.SaleGraphDao(userTypeRole, userName);
		return exp1List;
	}
	
	public List supplierWiseTotalSaleGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.supplierWiseTotalSaleGraphDao(userTypeRole, userName);
		return exp1List;
	}
	
	public List todaysCategoryWiseSaleGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.todaysCategoryWiseSaleGraphDao(userTypeRole, userName);
		return exp1List;
	}
	
	public List categoryWiseTodaySaleGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.categoryWiseSaleGraphDao(userTypeRole, userName);
		return exp1List;
	}
	
	public List subCategoryWiseSaleGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.subCategoryategoryWiseSaleGraphDao(userTypeRole, userName);
		return exp1List;
	}
	
	public List categoryWisePurchaseGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.categoryWisePurchaseGraphDao(userTypeRole, userName);
		return exp1List;
	}
	
	public List supplierWiseTotalPurchaseGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== supplierWisePurchaseGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.supplierWiseTotalPurchaseGraphDao(userTypeRole, userName);
		return exp1List;
	}
	
	public List todaysCategoryWisePurchaseGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.todaysCategoryWisePurchaseGraphDao(userTypeRole, userName);
		return exp1List;
	}
	
	public List subCategoryWisePurchaseGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.subCategoryWisePurchaseGraphDao(userTypeRole, userName);
		return exp1List;
	}	
	
	public List rangeWiseSaleGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== rangeWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		String startDateRangeGraph = request.getParameter("startDateRangeGraph");
		String endDateRangeGraph = request.getParameter("endDateRangeGraph");
		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.rangeWiseSaleGraphDao(userTypeRole, userName, startDateRangeGraph, endDateRangeGraph);
		return exp1List;
	}
	
	public List rangeWisePurchaseGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		String startDateRangeGraph = request.getParameter("startDateRangeGraph");
		String endDateRangeGraph = request.getParameter("endDateRangeGraph");
		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.rangeWisePurchaseGraphDao(userTypeRole, userName, startDateRangeGraph, endDateRangeGraph);
		return exp1List;
	}
	
	public List supplierWiseSaleGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== rangeWiseSaleGraph HELPER ===");
		
		String startDateSuppGraph = request.getParameter("startDateSuppGraph");
		String endDateSuppGraph = request.getParameter("endDateSuppGraph");
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		String supplierId = request.getParameter("supplierId");
		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.supplierWiseSaleGraphDao(startDateSuppGraph, endDateSuppGraph, userTypeRole, userName, supplierId);
		return exp1List;
	}
	
	public List supplierWisePurchaseGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String startDateSuppGraph = request.getParameter("startDateSuppGraph");
		String endDateSuppGraph = request.getParameter("endDateSuppGraph");		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		String supplierId = request.getParameter("supplierId");
		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.supplierWisePurchaseGraphDao(startDateSuppGraph, endDateSuppGraph, userTypeRole, userName, supplierId);
		return exp1List;
	}
	
	public List subCatWiseSaleGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String startDateSubCatGraph = request.getParameter("startDateSubCatGraph");
		String endDateSubCatGraph = request.getParameter("endDateSubCatGraph");		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		String subcatId = request.getParameter("subcatId");
		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.subCatWiseSaleGraphDao(startDateSubCatGraph, endDateSubCatGraph, userTypeRole, userName, subcatId);
		return exp1List;
	}
	
	public List subCatWisePurchaseGraphHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		
		System.out.println("=== categoryWiseSaleGraph HELPER ===");
		
		String startDateSubCatGraph = request.getParameter("startDateSubCatGraph");
		String endDateSubCatGraph = request.getParameter("endDateSubCatGraph");		
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		String subcatId = request.getParameter("subcatId");
		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		AllGraphDao dao = new AllGraphDao();
		List<AllGraphBean> exp1List = dao.subCatWisePurchaseGraphDao(startDateSubCatGraph, endDateSubCatGraph, userTypeRole, userName, subcatId);
		return exp1List;
	}
}
