package com.smt.dao;

import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.AdvanceBookingBean;
import com.smt.bean.ClientDetails;
import com.smt.bean.GoodreciveBillBean;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.StocktemNameBean;
import com.smt.hibernate.AdvanceBookingH;
import com.smt.utility.HibernateUtility;

public class AdvanceBookingDao
{
	public void registerGoodReceive(AdvanceBookingH ab)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(ab);
			transaction.commit();
		}
		catch (Exception e)
		{
			try
			{
				transaction.rollback();
			}
			catch (RuntimeException ede)
			{}
		}

		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}
	}
	
	
	
	public List getLastBookingNo()
	{
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<AdvanceBookingBean> listAbid = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("SELECT ab.pkAdvanceBookingId, ab.bookingNo FROM advancebooking ab ORDER BY ab.bookingNo DESC LIMIT 1;");
			list = query.list();				
			listAbid = new ArrayList<AdvanceBookingBean>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				AdvanceBookingBean reports = new AdvanceBookingBean();
				reports.setBookingNoAB(object[1].toString());
				System.out.println("getSaleReturnTransactoinId =============> "+reports.getBookingNoAB());
				listAbid.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return listAbid;
	}
	
	public void updateAdvanceBooking(String bookingNoAB, String purchaseBillNo)
	{
		System.out.println("updateAdvanceBooking bookingNoAB  ===>  "+bookingNoAB);
		HibernateUtility hbu = null;
		Session session = null;
		Transaction tx = null;
		
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			tx = session.beginTransaction();
			
			Query updateAdvanceBooking = session.createSQLQuery("update advancebooking set goodReceiveBillNo = '"+purchaseBillNo+"' where bookingNo = "+bookingNoAB);
			updateAdvanceBooking.executeUpdate();
			tx.commit();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	
	public void sendAdvanceBooking(Long bookingNo)
	{
		// TODO Auto-generated method stub
		
		System.out.println("sendTodayPurchaseReturnReport bookingNo  ===>  "+bookingNo);
		HibernateUtility hbu = null;
		Session session = null;
		Date todayDate = new Date();

		List<PurchaseReportBean> catList = null;
		try
		{
			PrintWriter pw = new PrintWriter(new File("E:\\databackup\\advanceBooking.xlsx"));
			StringBuilder sb = new StringBuilder();			
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			Double totalTodayPurchaseReturnAmt = 0.0;
			
			Query query2 = session.createSQLQuery("select pr.ProductName, ct.category_name, sb.subcat_name, ab.color, ab.rollSize, ab.size, ab.style, ab.quantity, ab.bookingNo, sd.supplier_name FROM advancebooking ab JOIN product_reg pr ON ab.fkProductId = pr.pkProductNameId JOIN categories ct ON pr.FkCatId = ct.pk_category_id JOIN sub_categories sb ON ab.fkSubcatId = sb.pk_subcat_id JOIN supplier_details sd ON ab.fkSupplierId = sd.supplier_id WHERE ab.bookingNo=:bookingNo");
			query2.setParameter("bookingNo", bookingNo);
			
			List<Object[]> list = query2.list();			
			System.out.println("TODAY PURCHASE RETURN LIST ========> "+list.size());
			
			sb.append("Onrdered On Date "+todayDate);
			sb.append(",");
			sb.append("\r\n");
			sb.append("ADVANCE BOOKING FROM "+ClientDetails.getShopName());
			sb.append(",");
			sb.append("\r\n");
			sb.append("Sr. No.");
			sb.append(",");
			sb.append("Item Name");
			sb.append(",");
			sb.append("Category Name");
			sb.append(",");
			sb.append("Sub Category Name");
			sb.append(",");
			sb.append("Color");
			sb.append(",");
			sb.append("Roll Size");
			sb.append(",");
			sb.append("Size");
			sb.append(",");
			sb.append("Style");
			sb.append(",");			
			sb.append("Quantity");
			sb.append(",");
			sb.append("\r\n");

			for (Object[] object : list)
			{
				PurchaseReportBean reports = new PurchaseReportBean();
				
				sb.append(k);
				sb.append(",");	
				sb.append(object[0].toString());
				sb.append(",");	
				sb.append(object[1].toString());
				sb.append(",");	
				sb.append(object[2].toString());
				sb.append(",");	
				sb.append(object[3].toString());
				sb.append(",");	
				sb.append(object[4].toString());
				sb.append(",");	
				sb.append(object[5].toString());
				sb.append(",");	
				sb.append(object[6].toString());
				sb.append(",");					
				sb.append(object[7].toString());
				sb.append(",");			
				sb.append("\r\n");				
				k++;		
			}
			
			sb.append(",");
			pw.write(sb.toString());
			pw.close();
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
	
	
	public List<AdvanceBookingBean> advanceBookingRangeDao(String aBFisDate, String aBEndDate)
	{
		// TODO Auto-generated method stub
		
		System.out.println("aBFisDate in DAO "+aBFisDate);
		System.out.println("aBEndDate in DAO "+aBEndDate);
		HibernateUtility hbu = null;
		Session session = null;

		List<AdvanceBookingBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String qty="1";
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			Query query2 = session.createSQLQuery("select pr.ProductName, c.category_name, sb.subcat_name, ab.size, ab.color, ab.rollSize, ab.quantity, sd.supplier_name, ab.bookingDate, ab.bookingNo, ab.goodReceiveBillNo from advancebooking ab JOIN categories c ON ab.fkCategoryId = c.pk_category_id JOIN sub_categories sb ON ab.fkSubcatId = sb.pk_subcat_id JOIN product_reg pr ON ab.fkProductId = pr.pkProductNameId JOIN supplier_details sd ON ab.fkSupplierId = sd.supplier_id WHERE (ab.bookingDate BETWEEN :aBFisDate AND :aBEndDate)");
			query2.setParameter("aBFisDate", aBFisDate);
			query2.setParameter("aBEndDate", aBEndDate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<AdvanceBookingBean>(0);

			for (Object[] object : list)
			{
				AdvanceBookingBean reports = new AdvanceBookingBean();
				
				reports.setSrNo(k);
				reports.setProductNameAB(object[0].toString());
				reports.setCategoryNameAB(object[1].toString());
				reports.setSubCatNameAB(object[2].toString());
				reports.setSizeAB(object[3].toString());
				reports.setColorAB(object[4].toString());
				reports.setRollSizeAB(object[5].toString());
				reports.setQuantityAB(object[6].toString());
				reports.setSupplierNameAB(object[7].toString());
				reports.setBookingDateAB(object[8].toString());
				reports.setBookingNo(object[9].toString());
				if(object[10] == null)
				{
					reports.setPurchaseBillNo("GOODS NOT RECEIVED YET");
				}
				else
				{
					reports.setPurchaseBillNo(object[10].toString());
				}

				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	public List<AdvanceBookingBean> advanceBookingSupplierAndRangeDao(String supplierAB, String aBFisDateSuppWise, String aBEndDateSuppWise)
	{
		// TODO Auto-generated method stub
		
		System.out.println("aBFisDateSuppWise in DAO "+aBFisDateSuppWise);
		System.out.println("aBEndDateSuppWise in DAO "+aBEndDateSuppWise);
		HibernateUtility hbu = null;
		Session session = null;

		List<AdvanceBookingBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String qty="1";
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			Query query2 = session.createSQLQuery("select pr.ProductName, c.category_name, sb.subcat_name, ab.size, ab.color, ab.rollSize, ab.quantity, sd.supplier_name, ab.bookingDate, ab.bookingNo, ab.goodReceiveBillNo from advancebooking ab JOIN categories c ON ab.fkCategoryId = c.pk_category_id JOIN sub_categories sb ON ab.fkSubcatId = sb.pk_subcat_id JOIN product_reg pr ON ab.fkProductId = pr.pkProductNameId JOIN supplier_details sd ON ab.fkSupplierId = sd.supplier_id WHERE (ab.bookingDate BETWEEN :aBFisDateSuppWise AND :aBEndDateSuppWise) AND  ab.fkSupplierId=:supplierAB");
			query2.setParameter("supplierAB", supplierAB);
			query2.setParameter("aBFisDateSuppWise", aBFisDateSuppWise);
			query2.setParameter("aBEndDateSuppWise", aBEndDateSuppWise);
			List<Object[]> list = query2.list();
			catList = new ArrayList<AdvanceBookingBean>(0);

			for (Object[] object : list)
			{
				AdvanceBookingBean reports = new AdvanceBookingBean();
				
				reports.setSrNo(k);
				reports.setProductNameAB(object[0].toString());
				reports.setCategoryNameAB(object[1].toString());
				reports.setSubCatNameAB(object[2].toString());
				reports.setSizeAB(object[3].toString());
				reports.setColorAB(object[4].toString());
				reports.setRollSizeAB(object[5].toString());
				reports.setQuantityAB(object[6].toString());
				reports.setSupplierNameAB(object[7].toString());
				reports.setBookingDateAB(object[8].toString());
				reports.setBookingNo(object[9].toString());
				if(object[10] == null)
				{
					reports.setPurchaseBillNo("GOODS NOT RECEIVED YET");
				}
				else
				{
					reports.setPurchaseBillNo(object[10].toString());
				}
				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	public List<AdvanceBookingBean> advanceBooking_BookingNoDao(String bookingNoAB)
	{
		// TODO Auto-generated method stub
		
		System.out.println("bookingNoAB in DAO "+bookingNoAB);
		HibernateUtility hbu = null;
		Session session = null;

		List<AdvanceBookingBean> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String qty="1";
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			Query query2 = session.createSQLQuery("select pr.ProductName, c.category_name, sb.subcat_name, ab.size, ab.color, ab.rollSize, ab.quantity, sd.supplier_name, ab.bookingDate, ab.bookingNo, ab.goodReceiveBillNo from advancebooking ab JOIN categories c ON ab.fkCategoryId = c.pk_category_id JOIN sub_categories sb ON ab.fkSubcatId = sb.pk_subcat_id JOIN product_reg pr ON ab.fkProductId = pr.pkProductNameId JOIN supplier_details sd ON ab.fkSupplierId = sd.supplier_id WHERE ab.bookingNo=:bookingNoAB");
			query2.setParameter("bookingNoAB", bookingNoAB);
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<AdvanceBookingBean>(0);

			for (Object[] object : list)
			{
				AdvanceBookingBean reports = new AdvanceBookingBean();
				
				reports.setSrNo(k);
				reports.setProductNameAB(object[0].toString());
				reports.setCategoryNameAB(object[1].toString());
				reports.setSubCatNameAB(object[2].toString());
				reports.setSizeAB(object[3].toString());
				reports.setColorAB(object[4].toString());
				reports.setRollSizeAB(object[5].toString());
				reports.setQuantityAB(object[6].toString());
				reports.setSupplierNameAB(object[7].toString());
				reports.setBookingDateAB(object[8].toString());
				reports.setBookingNo(object[9].toString());
				if(object[10] == null)
				{
					reports.setPurchaseBillNo("GOODS NOT RECEIVED YET");
				}
				else
				{
					reports.setPurchaseBillNo(object[10].toString());
				}
				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	public List<StocktemNameBean> agewiseSupplierAndRangeDao(String supplierAB, String aBFisDateSuppWise, String aBEndDateSuppWise) {
		HibernateUtility hbu = null;
		Session session = null;
		List<StocktemNameBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query2 = session.createSQLQuery("select  pr.ProductName, ct.Category_Name, gr.Date, sb.subcat_name, gr.size, gr.Quantity, gr.BarcodeNo, gr.BuyPrice, gr.SalePricee from goodreceive gr join sub_categories sb on gr.fkSubCatId=sb.pk_subcat_id join categories ct on  gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId JOIN supplier_details sp on sp.supplier_id=gr.FksuppId WHERE gr. gr.FksuppId=: supplierAB AND (gr.purchaseEntryDate BETWEEN :aBFisDateSuppWise AND :aBEndDateSuppWise)");
			
			Query query2 = session.createSQLQuery("select  pr.ProductName, ct.Category_Name, gr.Date, sb.subcat_name, gr.size, gr.Quantity, gr.BarcodeNo, gr.BuyPrice, gr.SalePrice, sp.supplier_name from goodreceive gr join sub_categories sb on gr.fkSubCatId=sb.pk_subcat_id join categories ct on  gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId JOIN supplier_details sp on sp.supplier_id=gr.FksuppId WHERE gr.FksuppId = "+supplierAB+" AND (gr.purchaseEntryDate BETWEEN :aBFisDateSuppWise AND :aBEndDateSuppWise)");
			
			//Query query2 = session.createSQLQuery("select  pr.ProductName, ct.Category_Name, gr.Date, sb.subcat_name, gr.size, gr.Quantity, gr.BarcodeNo, gr.BuyPrice, gr.SalePrice, sp.supplier_name from goodreceive gr join sub_categories sb on gr.fkSubCatId=sb.pk_subcat_id join categories ct on  gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId JOIN supplier_details sp on sp.supplier_id=gr.FksuppId WHERE gr.FksuppId =: SupplierAB AND (gr.purchaseEntryDate BETWEEN :aBFisDateSuppWise AND :aBEndDateSuppWise)");
			
			//query2.setParameter("SupplierAB", supplierAB);
			query2.setParameter("aBFisDateSuppWise", aBFisDateSuppWise);
			query2.setParameter("aBEndDateSuppWise", aBEndDateSuppWise);
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<StocktemNameBean>(0);
				int i=0;
			for (Object[] object : list)
			{
				
				 //pr.ProductName, ct.Category_Name, gr.Date, sb.subcat_name,
				 //gr.size, gr.Quantity, gr.BarcodeNo, gr.BuyPrice, gr.SalePrice
				
				
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
				reports.setSupplierName(object[9].toString());
				System.out.println("Date" + diffInDays);
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}
	

	//barcode wise range
	public List<StocktemNameBean> agewiseBarcodeDao(String barcodeNoOurchase)
	{
		System.out.println("On Dao  agewiseBarcodeDao");
		
		System.out.println("On Dao barcodeNoOurchase :- "+barcodeNoOurchase);
		
		HibernateUtility hbu = null;
		Session session = null;
		List<StocktemNameBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			//Query query2 = session.createSQLQuery("select  pr.ProductName, ct.Category_Name, gr.Date, sb.subcat_name, gr.size, gr.Quantity, gr.BarcodeNo, gr.BuyPrice, gr.SalePricee from goodreceive gr join sub_categories sb on gr.fkSubCatId=sb.pk_subcat_id join categories ct on  gr.fkCatId = ct.pk_category_id JOIN product_reg pr on gr.fkProductId = pr.pkProductNameId JOIN supplier_details sp on sp.supplier_id=gr.FksuppId WHERE gr. gr.BarcodeNo=: barcodeNo AND (gr.purchaseEntryDate BETWEEN :aBFisDateSuppWise AND :aBEndDateSuppWise)");
			
			Query query2 = session.createSQLQuery("SELECT DISTINCT  pr.ProductName, ct.Category_Name, sb.subcat_name, gr.size, gr.Quantity, gr.BarcodeNo, gr.BuyPrice, gr.SalePrice, gr.Date FROM goodreceive gr JOIN sub_categories sb ON gr.fkSubCatId=sb.pk_subcat_id JOIN categories ct ON  gr.fkCatId = ct.pk_category_id JOIN product_reg pr ON gr.fkProductId = pr.pkProductNameId JOIN supplier_details sp  WHERE gr.BarcodeNo = "+barcodeNoOurchase);
			
			//query2.setParameter("BarcodeNoOurchase", barcodeNoOurchase);
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<StocktemNameBean>(0);
			int i=0;
			for (Object[] objects : list)
			{
				System.out.println("Query StocktemNameBean :- "+Arrays.toString(objects));

				StocktemNameBean reports = new StocktemNameBean();
				
				i++;
				
				//pr.ProductName, ct.Category_Name, sb.subcat_name, gr.size,
				//gr.Quantity, gr.BarcodeNo, gr.BuyPrice, gr.SalePrice, gr.Date
				
				
				reports.setSrno(i);
				
				reports.setItemName(objects[0].toString());
				reports.setCatName(objects[1].toString());
				reports.setSubCatName(objects[2].toString());
				reports.setSize(objects[3].toString());
				reports.setQty2(objects[4].toString());
				reports.setBarcodeNo(objects[5].toString());
				reports.setBuyPrice(objects[6].toString());
				reports.setSalePrice(objects[7].toString());
				
				//Calculate Differance Days
				Date dt2 = new Date();
				Date dt1 = (Date) objects[8];
				long diff = dt2.getTime() - dt1.getTime();
				Long diffInDays = (Long) ((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24));
				
				System.out.println("diffInDays" + diffInDays);
				reports.setDatediff((diffInDays));

				
				
				/*reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				
				reports.setSubCatName(object[3].toString());
				reports.setSize(object[4].toString());
				reports.setQty2(object[5].toString());
				reports.setBarcodeNo(object[6].toString());
				reports.setBuyPrice(object[7].toString());
				reports.setSalePrice(object[8].toString());
				reports.setSupplierName(object[9].toString());
				System.out.println("Date" + diffInDays);*/
				
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;

	}

}