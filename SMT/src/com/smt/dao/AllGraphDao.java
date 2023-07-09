package com.smt.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.hibernate.Query;
import org.hibernate.Session;
import com.smt.bean.AllGraphBean;
import com.smt.bean.ClientDetails;
import com.smt.utility.HibernateUtility;

public class AllGraphDao
{
	
	String pattern = "yyyy-MM-dd";
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
	String todayDate = simpleDateFormat.format(new Date());	
	
	public List<AllGraphBean> categoryWiseSaleGraphDao(String userTypeRole, String userName)
	{
		System.out.println("=== categoryWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT category_name, sum(Quantity) total FROM(SELECT ct.category_name, ob.fkCatId, ob.Quantity FROM otherbill ob JOIN categories ct on ob.fkCatId=ct.pk_category_id UNION ALL SELECT ct.category_name, ccb.fkCatId, ccb.Quantity FROM creditcustomerbill ccb JOIN categories ct on ccb.fkCatId=ct.pk_category_id ) t GROUP BY fkCatId");
				
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSaleCatName(object[0].toString());
					reports.setSaleQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	
	public List<AllGraphBean> SaleGraphDao(String userTypeRole, String userName)
	{
		System.out.println("=== categoryWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT category_name, sum(Quantity) total FROM(SELECT ct.category_name, ob.fkCatId, ob.Quantity FROM otherbill ob JOIN categories ct on ob.fkCatId=ct.pk_category_id UNION ALL SELECT ct.category_name, ccb.fkCatId, ccb.Quantity FROM creditcustomerbill ccb JOIN categories ct on ccb.fkCatId=ct.pk_category_id ) t GROUP BY fkCatId");
				
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSaleCatName(object[0].toString());
					reports.setSaleQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	
	

	
	
	
	
	public List<AllGraphBean> supplierWiseTotalSaleGraphDao(String userTypeRole, String userName)
	{
		System.out.println("=== categoryWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT supplier_name, sum(Quantity), fkSuppId FROM(SELECT sd.supplier_name, ob.Quantity, ob.fkSuppId FROM otherbill ob	JOIN supplier_details sd ON ob.fkSuppId = sd.supplier_id UNION ALL SELECT sd.supplier_name, ccb.Quantity, ccb.fkSuppId FROM creditcustomerbill ccb JOIN supplier_details sd ON ccb.fkSuppId = sd.supplier_id) t GROUP BY fkSuppId");
				
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSupplierTotalSaleCatName(object[0].toString());
					reports.setSupplierTotalSaleQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	public List<AllGraphBean> todaysCategoryWiseSaleGraphDao(String userTypeRole, String userName)
	{
		System.out.println("=== categoryWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT category_name, sum(Quantity) total FROM(SELECT ct.category_name, ob.fkCatId, ob.Quantity FROM otherbill ob JOIN categories ct on ob.fkCatId=ct.pk_category_id WHERE ob.Date='"+todayDate+"' UNION ALL SELECT ct.category_name, ccb.fkCatId, ccb.Quantity FROM creditcustomerbill ccb JOIN categories ct on ccb.fkCatId=ct.pk_category_id WHERE ccb.Date='"+todayDate+"') t GROUP BY fkCatId");
				
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setTodaySaleCatName(object[0].toString());
					reports.setTodaySaleQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	public List<AllGraphBean> categoryWiseTodaySaleGraphDao(String userTypeRole, String userName)
	{
		System.out.println("=== categoryWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			query2 = session.createSQLQuery("select ct.category_name, SUM(o.Quantity) from otherbill o join goodreceive gr on o.BarcodeNo=gr.BarcodeNo JOIN categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId GROUP BY o.fkCatId");
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSaleCatName(object[0].toString());
					reports.setSaleQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	
	public List<AllGraphBean> subCategoryategoryWiseSaleGraphDao(String userTypeRole, String userName)
	{
		System.out.println("=== categoryWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
	
			query2 = session.createSQLQuery("SELECT sb.subcat_name, ct.category_name, SUM(o.Quantity) FROM otherbill o JOIN sub_categories sb ON o.fkSubCatId = sb.pk_subcat_id JOIN categories ct ON o.fkCatId = ct.pk_category_id GROUP BY o.fkSubCatId");			

			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[2].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSubCatTotalSaleCatName(object[0].toString()+"\n("+object[1].toString()+")");
					reports.setSubCatTotalSaleQty(Double.parseDouble(object[2].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	public List<AllGraphBean> categoryWisePurchaseGraphDao(String userTypeRole, String userName)
	{
		System.out.println("=== categoryWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("select ct.category_name, SUM(gr.OrignalQuantity) from goodreceive gr join categories ct on gr.fkCatId = ct.pk_category_id GROUP BY gr.fkCatId");
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setPurchaseCatName(object[0].toString());
					reports.setPurchaseQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	public List<AllGraphBean> supplierWiseTotalPurchaseGraphDao(String userTypeRole, String userName)
	{
		System.out.println("=== supplierWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("select sd.supplier_name, SUM(gr.OrignalQuantity) from goodreceive gr join supplier_details sd ON gr.FksuppId=sd.supplier_id GROUP BY gr.FksuppId");
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSupplierTotalPurchaseCatName(object[0].toString());
					reports.setSupplierTotalPurchaseQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<AllGraphBean> todaysCategoryWisePurchaseGraphDao(String userTypeRole, String userName)
	{
		System.out.println("=== categoryWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("select ct.category_name, SUM(gr.OrignalQuantity) from goodreceive gr join categories ct on gr.fkCatId = ct.pk_category_id WHERE purchaseEntryDate = '"+todayDate+"' GROUP BY gr.fkCatId");
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setTodayPurchaseCatName(object[0].toString());
					reports.setTodayPurchaseQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}
	
	
	public List<AllGraphBean> subCategoryWisePurchaseGraphDao(String userTypeRole, String userName)
	{
		System.out.println("=== categoryWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT sb.subcat_name, ct.category_name, SUM(gr.OrignalQuantity) FROM goodreceive gr JOIN sub_categories sb ON gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct ON gr.fkCatId = ct.pk_category_id GROUP BY gr.fkSubCatId");
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[2].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSubCatTotalPurchaseCatName(object[0].toString()+"\n("+object[1].toString()+")");
					reports.setSubCatTotalPurchaseQty(Double.parseDouble(object[2].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	
	public List<AllGraphBean> rangeWiseSaleGraphDao(String userTypeRole, String userName, String startDateRangeGraph, String endDateRangeGraph)
	{
		System.out.println("=== rangeWiseSaleGraph DAO ===");
		
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT category_name, sum(Quantity) total FROM(SELECT ct.category_name, ob.fkCatId, ob.Quantity FROM otherbill ob JOIN categories ct on ob.fkCatId=ct.pk_category_id where ob.Date BETWEEN '"+startDateRangeGraph+"'AND'"+endDateRangeGraph+"' UNION ALL SELECT ct.category_name, ccb.fkCatId, ccb.Quantity FROM creditcustomerbill ccb JOIN categories ct on ccb.fkCatId=ct.pk_category_id where ccb.Date BETWEEN '"+startDateRangeGraph+"'AND'"+endDateRangeGraph+"') t GROUP BY fkCatId");
				
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setRangeSaleCatName(object[0].toString());
					reports.setRangeSaleQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	
	public List<AllGraphBean> rangeWisePurchaseGraphDao(String userTypeRole, String userName, String startDateRangeGraph, String endDateRangeGraph)
	{
		System.out.println("=== categoryWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT ct.category_name, SUM(gr.OrignalQuantity) FROM goodreceive gr JOIN categories ct ON gr.fkCatId = ct.pk_category_id WHERE gr.purchaseEntryDate BETWEEN '"+startDateRangeGraph+"' AND '"+endDateRangeGraph+"' GROUP BY gr.fkCatId");
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setRangePurchaseCatName(object[0].toString());
					reports.setRangePurchaseQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<AllGraphBean> supplierWiseSaleGraphDao(String startDateSuppGraph, String endDateSuppGraph, String userTypeRole, String userName, String supplierId)
	{
		System.out.println("=== supplierWiseSaleGraph DAO ===");
		
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT supplier_name, sum(Quantity), fkSuppId FROM(SELECT sd.supplier_name, ob.Quantity, ob.fkSuppId FROM otherbill ob JOIN supplier_details sd ON ob.fkSuppId = sd.supplier_id WHERE ob.fkSuppId ="+supplierId+" AND ob.Date BETWEEN '"+startDateSuppGraph+"' AND '"+endDateSuppGraph+"' UNION ALL SELECT sd.supplier_name, ccb.Quantity, ccb.fkSuppId FROM creditcustomerbill ccb JOIN supplier_details sd ON ccb.fkSuppId = sd.supplier_id WHERE ccb.fkSuppId ="+supplierId+" AND ccb.Date BETWEEN '"+startDateSuppGraph+"' AND '"+endDateSuppGraph+"') t GROUP BY fkSuppId");
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSupplierSaleCatName(object[0].toString());
					reports.setSupplierSaleQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	public List<AllGraphBean> supplierWisePurchaseGraphDao(String startDateSuppGraph, String endDateSuppGraph, String userTypeRole, String userName, String supplierId)
	{
		System.out.println("=== supplierWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT sd.supplier_name, SUM(gr.OrignalQuantity) FROM goodreceive gr JOIN supplier_details sd ON gr.FksuppId=sd.supplier_id WHERE gr.FksuppId="+supplierId+" AND gr.purchaseEntryDate BETWEEN '"+startDateSuppGraph+"' AND '"+endDateSuppGraph+"' GROUP BY FksuppId");
		
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[1].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSupplierSaleCatName(object[0].toString());
					reports.setSupplierPurchaseQty(Double.parseDouble(object[1].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<AllGraphBean> subCatWisePurchaseGraphDao(  String startDateSubCatGraph, String endDateSubCatGraph, String userTypeRole, String userName, String subcatId)
	{
		System.out.println("=== supplierWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT sb.subcat_name, ct.category_name, SUM(gr.OrignalQuantity), gr.fkSubCatId FROM goodreceive gr JOIN sub_categories sb ON gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct ON gr.fkCatId = ct.pk_category_id WHERE gr.fkSubCatId="+subcatId+" AND gr.purchaseEntryDate BETWEEN '"+startDateSubCatGraph+"' AND '"+endDateSubCatGraph+"' GROUP BY gr.fkSubCatId");
		
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[2].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSubCatRangePurchaseCatName(object[0].toString()+"\n("+object[1].toString()+")");
					reports.setSubCatRangePurchaseQty(Double.parseDouble(object[2].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}	
	
	public List<AllGraphBean> subCatWiseSaleGraphDao(String startDateSubCatGraph, String endDateSubCatGraph, String userTypeRole, String userName, String subcatId)
	{
		System.out.println("=== supplierWiseSaleGraph DAO ===");
		
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<AllGraphBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query2 = session.createSQLQuery("SELECT subcat_name, category_name, sum(Quantity),	fkSubCatId FROM (SELECT	sub.subcat_name, ct.category_name, ob.fkSubCatId, ob.Quantity FROM otherbill ob	JOIN categories ct ON ob.fkCatId = ct.pk_category_id JOIN sub_categories sub ON ob.fkSubCatId = sub.pk_subcat_id WHERE ob.fkSubCatId ="+subcatId+" AND ob.Date BETWEEN '"+startDateSubCatGraph+"' AND '"+endDateSubCatGraph+"' UNION ALL SELECT sub.subcat_name, ct.category_name, ccb.fkCatId, ccb.Quantity	FROM creditcustomerbill ccb	JOIN categories ct ON ccb.fkCatId = ct.pk_category_id JOIN sub_categories sub ON ccb.fkSubCatId = sub.pk_subcat_id WHERE ccb.fkSubCatId ="+subcatId+" AND ccb.Date BETWEEN '"+startDateSubCatGraph+"' AND '"+endDateSubCatGraph+"') t GROUP BY fkSubCatId ");
		
			List<Object[]> list = query2.list();
			catList = new ArrayList<AllGraphBean>(0);

			for (Object[] object : list)
			{
				AllGraphBean reports = new AllGraphBean();
				
				String quantity = object[2].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSubCatRangeSaleCatName(object[0].toString()+"\n("+object[1].toString()+")");
					reports.setSubCatRangeSaleQty(Double.parseDouble(object[2].toString()));
				}
				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}
	
}