package com.smt.dao;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.SaleReport;
import com.smt.bean.StocktemNameBean;
import com.smt.bean.currentStock;
import com.smt.hibernate.BarcodeNumberWiseStockDetailsHibernate;
import com.smt.hibernate.Category;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.Stock;
import com.smt.utility.HibernateUtility;
//import com.sun.xml.internal.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

public class StockDao
{
	//To Fetch ItemName From Stock Table
	public List getAllStockEntry()
	{
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from Stock");
			list = query.list();
		} catch (Exception e) {			
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	
	public List getAllStockEntry115()
	{
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from Stock");
			list = query.list();
			
			System.out.println("hi ankit inside stock dao"+list.toString());
		}
		catch (Exception e)
		{			
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}

		return list;
	}
	
	
	public List getAllStockEntry112()
	{
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from Stock");
			list = query.list();
			
			System.out.println("hi ankit inside stock dao"+list.toString());
		}
		catch (Exception e)
		{			
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}

		return list;
	}
	
	
	public List getTotalQuantityByCatIdAndProductId(String categoryId, String productId, String shopId)
	{
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT gr.PkGoodRecId, SUM(gr.Quantity) FROM goodreceive gr where gr.fkCatId = "+categoryId+" AND gr.fkProductId = "+productId+" AND gr.fkShopId = "+shopId);
			list = query.list();
		}
		catch (Exception e)
		{			
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}

		return list;
	}
	
	public List updateTotalQuantityInStock(String categoryId, String productId, Double totalStock)
	{
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			Query query = session.createSQLQuery("Update stock_details sd set sd.Quantity = "+totalStock+" where sd.fk_Cat_Id = "+categoryId+" AND sd.fk_Product_Id = "+productId);
			query.executeUpdate();
			transaction.commit();
		}
		catch (Exception e)
		{			
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}

		return list;
	}
	

	/* To register New ItemName In Stock Table */
	public void registerStock(Stock newEntry) {

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			Date date = new Date();

			newEntry.setUpdateDate(date);

			session.save(newEntry);
			transaction.commit();
		}

		catch (RuntimeException e) {
			try {
				transaction.rollback();
			} catch (Exception rbe) {
				rbe.printStackTrace();
			}
		} finally {
			hbu.closeSession(session);
		}

	}
	
	public void saveBarcodeNumberWiseStockDetails(BarcodeNumberWiseStockDetailsHibernate newEntry)
	{
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(newEntry);
			transaction.commit();
		} catch (RuntimeException e) {
			try {
				transaction.rollback();
			} catch (Exception rbe) {
				rbe.printStackTrace();
			}
		} finally {
			hbu.closeSession(session);
		}
	}

	/* To Fetch ItemName And Quantity from Stack Table */

	public List getItemNameAndQuantity() {

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<StocktemNameBean> sbean = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select ItemName, Quntity, PkStockId , CategoryName from stock_details");
			list = query.list();
			
			sbean = new ArrayList<StocktemNameBean>(0);
			for (Object[] object : list)
			{
				StocktemNameBean scBean = new StocktemNameBean();
				scBean.setItemName(object[0].toString());
				scBean.setQuantity(Long.parseLong(object[1].toString()));
				scBean.setPkStockId(Long.parseLong(object[2].toString()));
				scBean.setCatName(object[3].toString());

				sbean.add(scBean);

			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}
		}

		return sbean;
	}

	// get current Stock
	public List<currentStock> getAllCurrentStock(String shopId)
	{
		DecimalFormat df = new DecimalFormat("#.##");
		DecimalFormat df2 = new DecimalFormat("#.###");
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<currentStock> catList = null;
		long difference;
		int daysBetween;
		double sp = 0.0;
		double qty = 0.0;
		double total = 0.0;
		double rollSize = 0.0;
		double rolltota = 0.0;
		String D1 = null;
		String SZ = null;
		
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			String q = "0";
			Query query2 = session.createSQLQuery("select pr.ProductName, gr.BarcodeNo, gr.Quantity, gr.SalePrice, gr.Date, ct.Category_Name, gr.RollSize, gr.size, sb.subcat_name, gr.returnQuantity from goodreceive gr JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE gr.fkShopId = "+shopId+" AND gr.Quantity > "+q);

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-d");
			Date date = new Date();
			String Date1 = formatter.format(date); 
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<currentStock>(0);
			
			for (Object[] object : list)
			{			
				currentStock reports = new currentStock();
				
				SZ = object[6].toString();
				D1 = object[4].toString();
				rollSize = Double.parseDouble((object[6].toString()));
				
					Date dateBefore = formatter.parse(Date1);
					Date dateAfter = formatter.parse(D1);
			        difference = dateBefore.getTime()- dateAfter.getTime();
			        daysBetween = (int) (difference / (1000*60*60*24));			        
			       
			    	if(rollSize > 0.0)
					{
			    		sp = Double.parseDouble(object[3].toString());
				        qty = Double.parseDouble(object[2].toString());
				        rolltota = qty * rollSize;
				        System.out.println("QTY IN METER ------> "+rolltota);
				        total = (Double.parseDouble((df.format(rolltota)))*sp);
				        double mtrQtyAvailable = (rolltota/rollSize);
				       // reports.setQuantity(Double.parseDouble(df2.format(rolltota)));
				        reports.setQuantity(Double.parseDouble(df2.format(mtrQtyAvailable)));
					}
					else
					{
						sp = Double.parseDouble(object[3].toString());			    		
				        qty = Double.parseDouble(object[2].toString());
				        total = qty*sp;
				        reports.setQuantity(qty);
					}
			    //System.out.println("String "+SZ);
			        
				reports.setItemName(object[0].toString());
				reports.setBarcode(object[1].toString());
				
				//reports.setQuantity(Double.valueOf(df2.format(Double.parseDouble(object[2].toString()))));
				reports.setSalePrice(Double.parseDouble(object[3].toString()));
				reports.setCatName(object[5].toString());
				reports.setSubCatName(object[8].toString());
				reports.setReturnquantity(Double.parseDouble(object[9].toString()));
				reports.setSize(object[7].toString());
				
				if(SZ.equals("0.0") || SZ.equals("1.0"))
				{
					reports.setRollSize("0.0");
				}
				else
				{
					reports.setRollSize(object[6].toString());
					
				}
				
				reports.setTotal(Double.valueOf(df.format(total)));
				reports.setAge(String.valueOf(daysBetween));
				
				if(SZ.equals("0.0") || SZ.equals("1.0"))
				{
		    		reports.setStockinmeter(0.0);
				}
				else
				{
					sp = Double.parseDouble(object[3].toString());
			        qty = Double.parseDouble(object[2].toString());
			        rolltota = qty * rollSize;
			        /*total = rolltota*sp;*/
			        reports.setStockinmeter(Double.valueOf(df.format(rolltota)));					
				}
				catList.add(reports);
			}
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		return catList;
	}

	//get all stock getAllStock
	
	public List<GoodReceiveItemBean> getAllStock(String shopId)
	{
		System.out.println("DAO CALLED ============ ");
		
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		DecimalFormat df = new DecimalFormat("#.###");
		List<GoodReceiveItemBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query allreportquery = session.createSQLQuery("select BarcodeNo,ItemName, ct.Category_Name, Quantity, color, size, RollSize from goodreceive gr join categories ct on gr.fkCatId=ct.pk_category_id WHERE gr.fkShopId = "+shopId+" AND Quantity > 0;");

			List<Object[]> list = allreportquery.list();
			catList = new ArrayList<GoodReceiveItemBean>(0);

			for (Object[] object : list) {

				GoodReceiveItemBean reports = new GoodReceiveItemBean();

				reports.setBarcodeNo(object[0].toString());
				reports.setItemName(object[1].toString());
				reports.setCatName(object[2].toString());
				reports.setAvQuantity(object[3].toString());
				if(object[4] == null || object[4].toString().equalsIgnoreCase(""))
				{
					reports.setColor("N/A");
				}
				else
				{	
					reports.setColor(object[4].toString());
				}
				reports.setSize(object[5].toString());
				reports.setRollSize(Double.parseDouble(object[6].toString()));
				reports.setQtyInMeter(df.format(Double.parseDouble(object[3].toString())*(Double.parseDouble(object[6].toString()))));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	

	// category wise stock
	public List<Stock> getCategoryWiseStock(String catId) {
		HibernateUtility hbu = null;
		Session session = null;
		List<Stock> catList = null;
		Long catIdLong = Long.parseLong(catId);
		DecimalFormat df = new DecimalFormat("#.###");
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select pr.ProductName, ct.category_Name, st.quantity, st.UpdateDate from stock_details st JOIN categories ct on st.fk_Cat_Id=ct.pk_category_id JOIN product_reg pr ON st.fk_Product_Id=pr.pkProductNameId where st.fk_Cat_Id=:catIdLong");
			query2.setParameter("catIdLong", catIdLong);
			List<Object[]> list = query2.list();
			catList = new ArrayList<Stock>(0);

			for (Object[] object : list)
			{
				Stock reports = new Stock();
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setQuantity(Double.parseDouble(df.format(Double.parseDouble(object[2].toString()))));
				reports.setDate(object[3].toString());
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}

	// category wise Item stock
	public List<Stock> getCategoryWiseItemnameStock(String catId, String itemId) {
		HibernateUtility hbu = null;
		Session session = null;
		List<Stock> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select pr.ProductName, ct.Category_Name, gr.Date, sb.subcat_name, gr.size, gr.Quantity, gr.BarcodeNo, gr.BuyPrice, gr.SalePrice from goodreceive gr join sub_categories sb on gr.fkSubCatId=sb.pk_subcat_id join categories ct on gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId where gr.fkCatId=:catId and gr.fkProductId=:itemId and gr.Quantity > 0 ORDER BY gr.BarcodeNo ASC");
			query2.setParameter("catId", catId);
			query2.setParameter("itemId", itemId);
			List<Object[]> list = query2.list();
			catList = new ArrayList<Stock>(0);

			for (Object[] object : list) {

				Stock reports = new Stock();

				Date dt2 = new Date();

				Date dt1 = (Date) object[2];

				long diff = dt2.getTime() - dt1.getTime();

				Long diffInDays = (Long) ((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));

				System.out.println("diffInDays" + diffInDays);

				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setDatediff((diffInDays));
				reports.setSubCatName(object[3].toString());
				reports.setSize(object[4].toString());
				reports.setQty2(object[5].toString());
				reports.setBarcodeNo(object[6].toString());
				reports.setBuyPrice(object[7].toString());
				reports.setSalePrice(object[8].toString());
				System.out.println("Date" + diffInDays);
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}

	// Most Selling Item
	public List<SaleReport> getMostSellingProduct(String catId) {
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		Long count1 = 0l;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select pr.ProductName, ct.category_name, count(c.fkProductId), s.Quantity, sub.subcat_name from creditcustomerbill c JOIN stock_details s on s.fk_Product_Id = c.fkProductId JOIN categories ct on c.fkCatId = ct.pk_category_id JOIN sub_categories sub on c.fkSubCatId = sub.pk_subcat_id JOIN product_reg pr on c.fkProductId = pr.pkProductNameId where c.fkCatId = :catId group by c.fkProductId Union select pr.ProductName, ct.category_name, count(o.fkProductId), s.Quantity, sub.subcat_name from otherbill o JOIN stock_details s on s.fk_Product_Id = o.fkProductId JOIN categories ct on o.fkCatId = ct.pk_category_id JOIN sub_categories sub on o.fkSubCatId = sub.pk_subcat_id JOIN product_reg pr on O.fkProductId = pr.pkProductNameId where o.fkCatId = :catId group by o.fkProductId");
			query2.setParameter("catId", catId);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();

				reports.setItemName(object[0].toString());
				reports.setCategoryName(object[1].toString());
				Long count = Long.parseLong(object[2].toString());
				count1 = count1 + count;
				reports.setTotalCount(Long.parseLong(object[2].toString()));
				
				if(object[3] == null)
				{
					reports.setQuantity(0.0);
				}
				else if(Double.parseDouble(object[3].toString()) > 0)
				{
					reports.setQuantity(Double.parseDouble(object[3].toString()));
				}
				else
				{
					reports.setQuantity(0.0);
				}
				catList.add(reports);
				System.out.println("Size" + catList.size());

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}

	/* To Fetch ItemName From Stock Table */
	public List getAllProductForNotification(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		DecimalFormat df = new DecimalFormat("#.##");
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List<Stock> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("select ItemName,CategoryName,Quantity,UpdateDate from stock_details where quantity < 10");
			Query query = session.createSQLQuery("select pr.ProductName, ct.Category_Name, gr.Quantity, gr.Date, gr.RollSize, gr.size, gr.BarcodeNo, gr.BuyPrice, gr.SalePrice from goodreceive gr join categories ct on gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId where gr.fkShopId = "+shopId+" AND gr.Quantity > 0 AND gr.Quantity < 10");
			List<Object[]> list = query.list();
			catList = new ArrayList<Stock>(0);
			System.out.println("List Size" + list.size());

			for (Object[] object : list)
			{
				Stock reports = new Stock();
				Double rollSize = Double.parseDouble(object[4].toString());
				if(rollSize > 0.0)
				{
					double qty = ((Double.parseDouble(object[4].toString()))*(Double.parseDouble(object[2].toString())));
					if(qty < 10)
					{
						reports.setQty2(df.format(qty)+" mtr");
					}
					else
					{
						continue;
					}
				}
				else if(rollSize < 0.1)
				{
					reports.setQty2(object[2].toString());
				}
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setDate(object[3].toString());
				reports.setSize(object[5].toString());
				reports.setBarcodeNo(object[6].toString());
				reports.setBuyPrice(object[7].toString());
				reports.setSalePrice(object[8].toString());
				
				catList.add(reports);
				//System.out.println(reports.getItemName()+" "+reports.getCatName()+" "+reports.getQty2()+" "+reports.getSize()+" "+reports.getDate());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return catList;  
	}
	
	/* To Fetch Category wise From Stock Table */
	public List getAllProductForNotifications(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		DecimalFormat df = new DecimalFormat("#.##");
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List<Stock> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("select ItemName,CategoryName,Quantity,UpdateDate from stock_details where quantity < 10");
			Query query = session.createSQLQuery("select pr.ProductName, ct.Category_Name, gr.Quantity, gr.Date, gr.RollSize, gr.size, gr.BarcodeNo, gr.BuyPrice, gr.SalePrice from goodreceive gr join categories ct on gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId where gr.fkShopId = "+shopId+" AND gr.Quantity > 0 AND gr.Quantity < 10");
			List<Object[]> list = query.list();
			catList = new ArrayList<Stock>(0);
			System.out.println("List Size" + list.size());

			for (Object[] object : list)
			{
				Stock reports = new Stock();
				Double rollSize = Double.parseDouble(object[4].toString());
				if(rollSize > 0.0)
				{
					double qty = ((Double.parseDouble(object[4].toString()))*(Double.parseDouble(object[2].toString())));
					if(qty < 10)
					{
						reports.setQty2(df.format(qty)+" mtr");
					}
					else
					{
						continue;
					}
				}
				else if(rollSize < 0.1)
				{
					reports.setQty2(object[2].toString());
				}
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setDate(object[3].toString());
				reports.setSize(object[5].toString());
				reports.setBarcodeNo(object[6].toString());
				reports.setBuyPrice(object[7].toString());
				reports.setSalePrice(object[8].toString());
				
				catList.add(reports);
				//System.out.println(reports.getItemName()+" "+reports.getCatName()+" "+reports.getQty2()+" "+reports.getSize()+" "+reports.getDate());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return catList;  
	}
	
	
	
	public List getAllProductForNotification1(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		DecimalFormat df = new DecimalFormat("#.##");
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List<Stock> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("select ItemName,CategoryName,Quantity,UpdateDate from stock_details where quantity < 10");
			Query query = session.createSQLQuery("select pr.ProductName,ct.category_name, sd.Quantity,gr.Date,gr.size,gr.BarcodeNo,gr.color from stock_details sd JOIN categories ct ON sd.fk_Cat_Id=ct.pk_category_id JOIN product_reg pr ON sd.fk_Product_Id=pr.pkProductNameId JOIN goodreceive gr on gr.fkProductId=pr.pkProductNameId where gr.fkShopId = "+shopId+" AND sd.Quantity > 10 AND sd.Quantity <= 20 GROUP BY gr.fkProductId");
			List<Object[]> list = query.list();
			catList = new ArrayList<Stock>(0);
			System.out.println("List Size" + list.size());

			for (Object[] object : list)
			{
				Stock reports = new Stock();
				
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setQuantity(Double.parseDouble(object[2].toString()));
				
				reports.setDate(object[3].toString());
				reports.setSize(object[4].toString());
				reports.setBarcodeNo(object[5].toString());
				reports.setColor(object[6].toString());
				catList.add(reports);
				System.out.println(reports.getItemName()+" "+reports.getCatName()+" "+reports.getQuantity()+" "+reports.getSize()+" "+reports.getDate());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return catList;  
	}
	
	
	public List getAllProductForNotification3(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		DecimalFormat df = new DecimalFormat("#.##");
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List<Stock> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("select ItemName,CategoryName,Quantity,UpdateDate from stock_details where quantity < 10");
			Query query = session.createSQLQuery("select pr.ProductName,ct.category_name, sd.Quantity,gr.Date,gr.size,gr.BarcodeNo,gr.color from stock_details sd JOIN categories ct ON sd.fk_Cat_Id=ct.pk_category_id JOIN product_reg pr ON sd.fk_Product_Id=pr.pkProductNameId JOIN goodreceive gr on gr.fkProductId=pr.pkProductNameId where gr.fkShopId = "+shopId+" AND sd.Quantity > 0 AND sd.Quantity <= 10 GROUP BY gr.fkProductId");
			List<Object[]> list = query.list();
			catList = new ArrayList<Stock>(0);
			System.out.println("List Size" + list.size());

			for (Object[] object : list)
			{
				Stock reports = new Stock();
				
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setQuantity(Double.parseDouble(object[2].toString()));
				
				reports.setDate(object[3].toString());
				reports.setSize(object[4].toString());
				reports.setBarcodeNo(object[5].toString());
				reports.setColor(object[6].toString());
				catList.add(reports);
				System.out.println(reports.getItemName()+" "+reports.getCatName()+" "+reports.getQuantity()+" "+reports.getSize()+" "+reports.getDate());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return catList;  
	}
	
	
	public List getAllProductForNotification2(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		DecimalFormat df = new DecimalFormat("#.##");
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List<Stock> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("select ItemName,CategoryName,Quantity,UpdateDate from stock_details where quantity < 10");
			Query query = session.createSQLQuery("select pr.ProductName,ct.category_name, sd.Quantity,gr.Date,gr.size,gr.BarcodeNo,gr.color from stock_details sd JOIN categories ct ON sd.fk_Cat_Id=ct.pk_category_id JOIN product_reg pr ON sd.fk_Product_Id=pr.pkProductNameId JOIN goodreceive gr on gr.fkProductId=pr.pkProductNameId where gr.fkShopId = "+shopId+" AND sd.Quantity > 20 AND sd.Quantity <= 40 GROUP BY gr.fkProductId");
			List<Object[]> list = query.list();
			catList = new ArrayList<Stock>(0);
			System.out.println("List Size" + list.size());

			for (Object[] object : list)
			{
				Stock reports = new Stock();
				
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setQuantity(Double.parseDouble(object[2].toString()));
				
				reports.setDate(object[3].toString());
				reports.setSize(object[4].toString());
				reports.setBarcodeNo(object[5].toString());
				reports.setColor(object[6].toString());
				catList.add(reports);
				System.out.println(reports.getItemName()+" "+reports.getCatName()+" "+reports.getQuantity()+" "+reports.getSize()+" "+reports.getDate());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return catList;  
 
	}
	
	public List<GoodReceive> getBarcodeBasedStockDao(String shopId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<GoodReceive> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("Select pr.ProductName, ct.Category_Name, gr.quantity, gr.buyPrice, gr.billNo, gr.barcodeNo, gr.vat, gr.igst, gr.salePrice, sd.supplier_name from GoodReceive gr JOIN supplier_details sd ON gr.FksuppId=sd.supplier_id join categories ct on gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId where gr.fkShopId = "+shopId+" AND gr.Quantity > 0 ORDER BY gr.BarcodeNo ASC");
			List<Object[]> list = query2.list();
			catList = new ArrayList<GoodReceive>(0);

			for (Object[] object : list)
			{
				GoodReceive reports = new GoodReceive();
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setQuantity(Double.parseDouble(object[2].toString()));
				reports.setBuyPrice(Double.parseDouble(object[3].toString()));
				reports.setBillNo(object[4].toString());
				reports.setBarcodeNo(Long.parseLong(object[5].toString()));
				String gst = object[6].toString();
				String igst = object[7].toString();
				reports.setSalePrice(Double.parseDouble(object[8].toString()));
				if (gst.equals("0.0"))
				{
					reports.setVat(Double.parseDouble(igst));
				}
				if (igst.equals("0.0"))
				{
					reports.setVat(Double.parseDouble(gst));
				}
				reports.setSuppName(object[9].toString());

				catList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return catList;
	}
	
	
	public List<StocktemNameBean> getbetweenageWiseItemnameStock(String aBFisDate, String aBEndDate) {
		HibernateUtility hbu = null;
		Session session = null;
		List<StocktemNameBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select pr.ProductName, ct.Category_Name, gr.Date, sb.subcat_name, gr.size, gr.Quantity, gr.BarcodeNo, gr.BuyPrice, gr.SalePrice from goodreceive gr join sub_categories sb on gr.fkSubCatId=sb.pk_subcat_id join categories ct on gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId WHERE (gr.purchaseEntryDate BETWEEN :aBFisDate AND :aBEndDate)");
			query2.setParameter("aBFisDate", aBFisDate);
			query2.setParameter("aBEndDate", aBEndDate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<StocktemNameBean>(0);
				int i=0;
			for (Object[] object : list) {

				StocktemNameBean reports = new StocktemNameBean();
						i++;
				Date dt2 = new Date();

				Date dt1 = (Date) object[2];

				long diff = dt2.getTime() - dt1.getTime();

				Long diffInDays = (Long) ((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));

				System.out.println("diffInDays" + diffInDays);
				reports.setSrno(i);
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setDatediff((diffInDays));
				reports.setSubCatName(object[3].toString());
				reports.setSize(object[4].toString());
				reports.setQty2(object[5].toString());
				reports.setBarcodeNo(object[6].toString());
				reports.setBuyPrice(object[7].toString());
				reports.setSalePrice(object[8].toString());
				System.out.println("Date" + diffInDays);
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}
	
	
	public List<GoodReceiveItemBean> getCurrentStock(String shopId)
	{
		System.out.println("DAO CALLED ============ ");
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		DecimalFormat df = new DecimalFormat("#.###");
		List<GoodReceiveItemBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query allreportquery = session.createSQLQuery("select distinct sd.ItemName, ct.Category_Name, sd.Quantity, pr.color, pr.size, gr.BuyPrice, gr.SalePrice, gr.BarcodeNo from stock_details sd join categories ct on(sd.fk_Cat_Id=ct.pk_category_id)JOIN product_reg pr on(sd.fk_Product_Id=pr.pkProductNameId) JOIN goodreceive gr on(gr.fkProductId = pr.pkProductNameId) WHERE sd.fkShopId = "+shopId+" AND sd.Quantity > 0");
			
			//Query allreportquery = session.createSQLQuery("SELECT distinct sd.ItemName, ct.Category_Name, sd.Quantity, gr.BuyPrice, gr.SalePrice, gr.BarcodeNo from stock_details sd join categories ct on(sd.fk_Cat_Id=ct.pk_category_id)JOIN product_reg pr on(sd.fk_Product_Id=pr.pkProductNameId) JOIN goodreceive gr on(gr.fkProductId = pr.pkProductNameId) WHERE sd.fkShopId = "+shopId+" AND sd.Quantity > 0");
			
			Query allreportquery = session.createSQLQuery("SELECT p.ProductName, c.category_name, sd.Quantity FROM stock_details sd JOIN product_reg p on(sd.fk_Product_Id=p.pkProductNameId) JOIN categories c ON sd.fk_Cat_Id = c.pk_category_id WHERE sd.Quantity > 0 AND sd.fkShopId = "+shopId);
			
			//Query allreportquery = session.createSQLQuery("SELECT distinct sd.ItemName, ct.Category_Name, sd.Quantity, gr.BuyPrice, gr.SalePrice, gr.BarcodeNo from stock_details sd join categories ct on(sd.fk_Cat_Id=ct.pk_category_id)JOIN product_reg pr on(sd.fk_Product_Id=pr.pkProductNameId) JOIN goodreceive gr on(gr.fkProductId = pr.pkProductNameId) WHERE sd.fkShopId = "+shopId+" AND sd.Quantity > 0");
			
			//sd.ItemName, ct.Category_Name, sd.Quantity, gr.BuyPrice, gr.SalePrice, gr.BarcodeNo
			List<Object[]> list = allreportquery.list();
			catList = new ArrayList<GoodReceiveItemBean>(0);

			for (Object[] object : list) {
				
				GoodReceiveItemBean reports = new GoodReceiveItemBean();
				
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				//reports.setAvQuantity(object[4].toString());
				//reports.setColor(object[3].toString());
				/*
				 * if(object[2] == null || object[2].toString().equalsIgnoreCase("")) {
				 * reports.setColor("N/A"); } else { reports.setColor(object[2].toString()); }
				 */
				//reports.setColor(object[2].toString());
				reports.setQuantity(Double.parseDouble(object[2].toString()));
				//reports.setSize(object[4].toString());
				/*reports.setBuyPrice(Double.parseDouble(object[3].toString()));
				
				double quantity = 0d;
				double buyPrice = 0d;
				double salePrice = 0d;
				quantity = Double.parseDouble(object[2].toString());
				buyPrice = Double.parseDouble(object[3].toString());
				salePrice = Double.parseDouble(object[4].toString());
				
				double totalBuyPrice = 0d;
				totalBuyPrice = quantity*buyPrice;
				reports.setTotalBuyPrice(totalBuyPrice);
				
				reports.setSalePrice(Double.parseDouble(object[4].toString()));
				
				double totalSalePrice = 0d;
				totalSalePrice = quantity*salePrice;
				reports.setTotalSalePrice(totalSalePrice);
				
				reports.setBarcodeNo(object[5].toString());*/
				
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<BarcodeNumberWiseStockDetailsHibernate> getCurrentStockBarcodeNumberWise(String shopId)
	{
		System.out.println("DAO CALLED ============ ");
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		DecimalFormat df = new DecimalFormat("#.###");
		List<BarcodeNumberWiseStockDetailsHibernate> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query allreportquery = session.createSQLQuery("select distinct sd.ItemName, ct.Category_Name, sd.Quantity, pr.color, pr.size, gr.BuyPrice, gr.SalePrice, gr.BarcodeNo from stock_details sd join categories ct on(sd.fk_Cat_Id=ct.pk_category_id)JOIN product_reg pr on(sd.fk_Product_Id=pr.pkProductNameId) JOIN goodreceive gr on(gr.fkProductId = pr.pkProductNameId) WHERE sd.fkShopId = "+shopId+" AND sd.Quantity > 0");
			
			//Query allreportquery = session.createSQLQuery("SELECT distinct sd.ItemName, ct.Category_Name, sd.Quantity, gr.BuyPrice, gr.SalePrice, gr.BarcodeNo from stock_details sd join categories ct on(sd.fk_Cat_Id=ct.pk_category_id)JOIN product_reg pr on(sd.fk_Product_Id=pr.pkProductNameId) JOIN goodreceive gr on(gr.fkProductId = pr.pkProductNameId) WHERE sd.fkShopId = "+shopId+" AND sd.Quantity > 0");
			
			Query allreportquery = session.createSQLQuery("SELECT item_name, category_name, barcode_no, barcode_number_wise_stock_quantity, buy_price, sale_price, update_date FROM barcode_number_wise_stock_details WHERE fk_shop_id = "+shopId+" AND barcode_number_wise_stock_quantity > 0");
			
			//sd.ItemName, ct.Category_Name, sd.Quantity, gr.BuyPrice, gr.SalePrice, gr.BarcodeNo
			List<Object[]> list = allreportquery.list();
			catList = new ArrayList<BarcodeNumberWiseStockDetailsHibernate>(0);

			for (Object[] object : list) {
				
				BarcodeNumberWiseStockDetailsHibernate reports = new BarcodeNumberWiseStockDetailsHibernate();
				
				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setBarcodeNo(object[2].toString());
				reports.setBarcodeNumberWiseStockQuantity(Double.parseDouble(object[3].toString()));
				reports.setBuyPrice(Double.parseDouble(object[4].toString()));
				
				double quantity = 0d;
				double buyPrice = 0d;
				double salePrice = 0d;
				quantity = Double.parseDouble(object[3].toString());
				buyPrice = Double.parseDouble(object[4].toString());
				salePrice = Double.parseDouble(object[5].toString());
				double totalBuyPrice = 0d;
				totalBuyPrice = quantity*buyPrice;
				reports.setTotalBuyPrice(totalBuyPrice);
				
				reports.setSalePrice(Double.parseDouble(object[5].toString()));
				double totalSalePrice = 0d;
				totalSalePrice = quantity*salePrice;
				reports.setTotalSalePrice(totalSalePrice);
				
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	
	public List getAllProductForNotification5(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		DecimalFormat df = new DecimalFormat("#.##");
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List<Stock> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createSQLQuery("select ItemName,CategoryName,Quantity,UpdateDate from stock_details where quantity < 10");
			Query query = session.createSQLQuery("select sd.pk_stock_details_id,sd.ItemName,sd.CategoryName,ct.color,sd.Quantity from stock_details sd  JOIN product_reg ct on sd.fk_Product_Id=ct.pkProductNameId where  sd.Quantity < 10 ");
			List<Object[]> list = query.list();
			catList = new ArrayList<Stock>(0);
			System.out.println("List Size" + list.size());

			for (Object[] object : list) {
				Stock reports = new Stock();	

				String aa = object[1].toString();
				reports.setPkStockId(Long.parseLong(object[0].toString()));
				reports.setItemName(object[1].toString());
				reports.setCatName(object[2].toString());

				reports.setColor(object[3].toString());
				reports.setQuantity(Double.parseDouble(object[4].toString()));
				
				
				//	reports.setGrossTotal(Double.parseDouble(object[1].toString()));
//				System.out.println("set sale return  -  "+reports.getGrossTotal());	
				catList.add(reports);
				
				//System.out.println(reports.getItemName()+" "+reports.getCatName()+" "+reports.getQty2()+" "+reports.getSize()+" "+reports.getDate());
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return catList;  
	}
}


