package com.smt.dao;

import java.math.BigInteger;
import java.text.DecimalFormat;
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
import org.jfree.util.Log;

import com.smt.bean.BillBean;
import com.smt.bean.BillCopy;
import com.smt.bean.CustomerBean;
import com.smt.bean.GoodReceiveEditBean;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.SaleInvoiceBillEditBean;
import com.smt.bean.SaleReport;
import com.smt.hibernate.BarcodeNumberWiseStockDetailsHibernate;
import com.smt.hibernate.BillEdit;
import com.smt.hibernate.BillNumberGenratorHibernate;
import com.smt.hibernate.OtherBill;
import com.smt.hibernate.Stock;
import com.smt.utility.HibernateUtility;

public class OtherBillDao {
	
	
	
	public BillNumberGenratorHibernate getBillNumberGenratorDetails()
	{
		HibernateUtility hbu = null;
		Session session = null;
		//Transaction transaction = null;
		List<BillNumberGenratorHibernate> billList = null;
		
		try 
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			//Query query = session.createSQLQuery("SELECT bill_number_genrator_pk, bill_no_countor FROM bill_number_genrator_details ORDER BY BillNo desc LIMIT 1");
			
			Query query = session.createSQLQuery("SELECT bill_number_genrator_pk, bill_no_countor, updated_date FROM bill_number_genrator_details");
			
			List<Object[]> list = query.list();
			System.out.println("IN METHOD getBillNumberGenratorDetails List Size :-"+list.size());
			//billList = new ArrayList<BillNumberGenratorHibernate>(0);
			
			for(Object[] objects : list)
			{
				BillNumberGenratorHibernate bean = new BillNumberGenratorHibernate();
				
				bean.setBillNnumberGgenratorPk(Long.parseLong(objects[0].toString()));
				bean.setBillNoCountor(Long.parseLong(objects[1].toString()));
				bean.setUpdatedDate((Date)objects[2]);
				System.out.println("IN METHOD getBillNumberGenratorDetails Last ResourceLastBillNo : "+bean.getBillNoCountor());
				
				
				//billList.add(bean);
				
				return bean;
			}			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception in getLastResourceBillNo :-"+e);
		}
		
		return null;
	}
	
	public List getResourceLastBillNo()
	{
		HibernateUtility hbu = null;
		Session session = null;
		//Transaction transaction = null;
		List<BillBean> billList = null;
		
		try 
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT pkOtherBillId, BillNo FROM otherbill ORDER BY BillNo desc LIMIT 1");
			List<Object[]> list = query.list();
			System.out.println("IN METHOD getResourceLastBillNo List Size :-"+list.size());
			billList = new ArrayList<BillBean>(0);
			
			for(Object[] objects : list)
			{
				BillBean bean = new BillBean();
				
				bean.setPkBillId(Long.parseLong(objects[0].toString()));
				//bean.setBillType(objects[0].toString());
				bean.setBillNo(objects[1].toString());
				System.out.println("IN METHOD getResourceLastBillNo Last ResourceLastBillNo : "+bean.getBillNo());
				billList.add(bean);			
			}			
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception in getLastResourceBillNo :-"+e);
		}
		
		return billList;		
	}
	
	
	
	public void updateBillNumberGenratorDetails(BillNumberGenratorHibernate cust)
	{
		// TODO Auto-generated method stub
		System.out.println("hi this is Sonal in other bill DAO ************");
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			session.update(cust);
			transaction.commit();

		} catch (Exception e) {
			try {
				transaction.rollback();
			} catch (RuntimeException ede) {

			}
		} finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
	}

	public void registerBill(OtherBill cust) {
		// TODO Auto-generated method stub
		System.out.println("hi this is Sonal in other bill DAO ************");
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(cust);
			transaction.commit();

		} catch (Exception e) {
			try {
				transaction.rollback();
			} catch (RuntimeException ede) {

			}
		} finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
	}
	
	//Update Borcode Number Wise Stock Add Old Quantity In Stock
	public void updateBarcodeNoWiseStockAddOldQuantityInBarcodeNoWiseStockEditSaleTaxInvoce(Long barcodeNo, Double oldSaleQuantityToUpdateStock, Long shopId)
	{
		System.out.println("Sell Invoice barcodeNo :- "+barcodeNo);
		System.out.println("Sell Invoice quantity :- "+oldSaleQuantityToUpdateStock);		
		HibernateUtility hbu=null;
		Session session=null;
		Transaction transaction=null;
		Long pk=null;
		try{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			Query query2 = session.createQuery("from BarcodeNumberWiseStockDetailsHibernate where barcode_no="+barcodeNo+" AND fk_shop_id= "+shopId);
			
			BarcodeNumberWiseStockDetailsHibernate uniqueResult = (BarcodeNumberWiseStockDetailsHibernate) query2.uniqueResult();
			Long pkBarcodeNoWiseStockId = uniqueResult.getPkBarcodeNoWiseStockId();
			BarcodeNumberWiseStockDetailsHibernate gReceipt = (BarcodeNumberWiseStockDetailsHibernate) session.get(BarcodeNumberWiseStockDetailsHibernate.class, pkBarcodeNoWiseStockId);
			
			Double quantityDB = gReceipt.getBarcodeNumberWiseStockQuantity();
			System.out.println("STOCK Quantity :- "+quantityDB);
			Double  updatedQuantity = quantityDB+oldSaleQuantityToUpdateStock;
			System.out.println("Update Quantity :- "+updatedQuantity);
			gReceipt.setBarcodeNumberWiseStockQuantity(updatedQuantity);
			session.update(gReceipt);
			
			transaction.commit();
			
		}catch(Exception e){
			System.out.println("Exception In removeOddPurchaseQTYFromStockAfterEditPurchaseBillByBillNo");
			e.printStackTrace();
		} finally {
			if(session!=null) {
				hbu.closeSession(session);
			}
		}
		
	}
	
	//Update Borcode Number Wise Stock
	public void updateBarcodeNoWiseStockSaleInvoce(Long barcodeNo, Double quantity, Long shopId)
	{
		System.out.println("Sell Invoice barcodeNo :- "+barcodeNo);
		System.out.println("Sell Invoice quantity :- "+quantity);		
		HibernateUtility hbu=null;
		Session session=null;
		Transaction transaction=null;
		Long pk=null;
		try{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			Query query2 = session.createQuery("from BarcodeNumberWiseStockDetailsHibernate where barcode_no="+barcodeNo+" AND fk_shop_id= "+shopId);
			
			BarcodeNumberWiseStockDetailsHibernate uniqueResult = (BarcodeNumberWiseStockDetailsHibernate) query2.uniqueResult();
			Long pkBarcodeNoWiseStockId = uniqueResult.getPkBarcodeNoWiseStockId();
			BarcodeNumberWiseStockDetailsHibernate gReceipt = (BarcodeNumberWiseStockDetailsHibernate) session.get(BarcodeNumberWiseStockDetailsHibernate.class, pkBarcodeNoWiseStockId);
			
			Double quantityDB = gReceipt.getBarcodeNumberWiseStockQuantity();
			System.out.println("STOCK Quantity :- "+quantityDB);
			Double  updatedQuantity = quantityDB-quantity;
			System.out.println("Update Quantity :- "+updatedQuantity);
			gReceipt.setBarcodeNumberWiseStockQuantity(updatedQuantity);
			session.update(gReceipt);
			
			transaction.commit();
			
		}catch(Exception e){
			System.out.println("Exception In removeOddPurchaseQTYFromStockAfterEditPurchaseBillByBillNo");
			e.printStackTrace();
		} finally {
			if(session!=null) {
				hbu.closeSession(session);
			}
		}
		
	}

	// get Last Bill No
	public List getLastBillNo()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<BillBean> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT BillNo, pkOtherBillId FROM otherbill ORDER BY BillNo DESC LIMIT 1");

			List<Object[]> list = query.list();
			saleList = new ArrayList<BillBean>(0);
			for (Object[] objects : list) {
				System.out.println(Arrays.toString(objects));
				BillBean bean = new BillBean();
				bean.setBillNo(objects[0].toString());
				//reports.setBillNo(Long.parseLong(object[0].toString()));
				saleList.add(bean);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return saleList;
	}
	
	
	
	public void deletebill(String shopid,String billno) {
		
		Transaction tx = null;
			HibernateUtility hbu = null ;
			 Session session = null;
			 List list  = null;
			 System.out.println("``````````` `````````````` in  deleing bill no  -  "+billno+"  , "+shopid);
			 try {
				 hbu = HibernateUtility.getInstance();
				 session = hbu.getHibernateSession();
				tx = session.beginTransaction();	
				 Query query = session.createSQLQuery("DELETE from otherbill WHERE BillNo = '"+billno+"' AND fkShopId = '"+shopid+"'");
					int seletedRecords = query.executeUpdate();
					
					System.out.println("Number of credit Cusr deleted == + =   "+seletedRecords);
					//list = query.list();
					tx.commit();
					
			} catch (Exception e) {
				e.printStackTrace();
				// TODO: handle exception
			}
				
			 finally
			 {
				 if (session!=null) {
					hbu.closeSession(session);
				}
			 }
			
		}	
	

	// get bill no to get Bill copy

	public List getBillNo(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		HibernateUtility hbu = null;
		Session session = null;

		List<BillCopy> billList = null;
		List<Object[]> list = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			Query query = session.createSQLQuery("select BillNo, pkOtherBillId from otherbill WHERE fkShopId = "+shopId+" group by BillNo order by BillNo desc;");
			
			//Query query = session.createSQLQuery("select BillNo, pkOtherBillId from otherbill WHERE fkShopId = "+shopId+" group by BillNo;");
			
			
			list = query.list();
			billList = new ArrayList<BillCopy>(0);

			for (Object[] objects : list) {
				BillCopy bean = new BillCopy();

				bean.setBillNo(objects[0].toString());
				billList.add(bean);
			}
		} catch (RuntimeException e) {

		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return billList;
	}

	// get single date Miscellaneos customer Sale
	public List<SaleReport> miscellaneousSingleDate(String adate) {
		// TODO Auto-generated method stub
		
		System.out.println("Date in DAO "+adate);
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			DecimalFormat df = new DecimalFormat("#.##");
			Long k = 1l;
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.Date =:adate AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))) from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.BillReturnDate =:adate AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.total_amount_per_item, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))) from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.BillReturnDate =:adate AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			
			query2.setParameter("adate", adate);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				double disAmount = Double.parseDouble(object[5].toString());
				reports.setDiscount(disAmount);
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				
				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount((Double)object[7]);//(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
				
				k++;
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	//Credit Sale return report
	
	public List<SaleReport> CSRSingleDate(String adate) {
		// TODO Auto-generated method stub
		
		System.out.println("Date in DAO "+adate);
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			DecimalFormat df = new DecimalFormat("#.##");
			Long k = 1l;
			String qty="0";
			String custType = "Credit Customer";
			
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.Date =:adate AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, pr.ProductName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))) from salereturn sr join categories ct on sr.catId = ct.pk_category_id join product_reg pr on sr.productId = pr.pkProductNameId WHERE sr.BillReturnDate=:adate AND sr.ReturnQuantuty >:qty AND Customer_Type=:custType");
			query2.setParameter("adate", adate);
			query2.setParameter("qty", qty);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				reports.setDiscount((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				/*reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));*/

				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount((Double)object[7]);
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
				
				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	
	// get Two date Miscellaneos customer Sale
	public List<SaleReport> miscellaneousTwoDate(String adate, String bdate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String custType = "Tax Invoice";
			System.out.println("hi vikas your in Tax invoice sale return ");
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where (s.Date BETWEEN :adate AND :bdate) AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where (sr.BillReturnDate BETWEEN :adate AND :bdate) AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.total_amount_per_item, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where (sr.BillReturnDate BETWEEN :adate AND :bdate) AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list)
			{
				SaleReport reports = new SaleReport();
			
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				double disAmount = Double.parseDouble(object[5].toString());
				reports.setDiscount(disAmount);
				reports.setQuantity(Double.parseDouble(object[6].toString()));				

				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount((Double)object[7]);//(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);				
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
				reports.setSaleReturnDate(object[11].toString());
				k++;
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	
	
	// get Two date Credit customer Sale Return
		public List<SaleReport> CCSRTwoDate(String adate, String bdate) {
			// TODO Auto-generated method stub
			DecimalFormat df = new DecimalFormat("#.##");
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Long k = 1l;
				String qty1="1";
				String custType = "Credit Customer";
				//String otQtyy = "0";
				//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where (s.Date BETWEEN :adate AND :bdate) AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
				Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, sr.Discount, sr.ReturnQuantuty, sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))) from salereturn sr where (sr.BillReturnDate BETWEEN :adate AND :bdate) AND sr.ReturnQuantuty =:qty AND Customer_Type=:custType");
				
				query2.setParameter("adate", adate);
				query2.setParameter("bdate", bdate);
				query2.setParameter("qty", qty1);
				query2.setParameter("custType", custType);
				//query2.setParameter("otQtyy", otQtyy);
				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);

				for (Object[] object : list) {

					SaleReport reports = new SaleReport();
				
					reports.setSrNo(k);
					reports.setBillNo(object[0].toString());
					reports.setBarcodeNo(Long.parseLong(object[1].toString()));
					reports.setItemName(object[2].toString());
					reports.setCategoryName(object[3].toString());
					reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setGst(Double.parseDouble(object[8].toString()));
					reports.setTaxAmount(Double.parseDouble(object[9].toString()));
					reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
					/*double quan = Double.parseDouble(object[7].toString());
					double saleP = Double.parseDouble(object[4].toString());
					double taxAmt = Double.parseDouble(object[9].toString());
					double saleTotal = quan * saleP;
					double totalAmt = saleTotal + taxAmt;
					reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
					reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
					reports.setReturnAmount(Double.parseDouble(object[7].toString()));
					k++;
					catList.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}
	
	
	// get category wise Miscellaneos customer Sale
	public List<SaleReport> miscellaneousSaleWiseCustomer(String mscatId) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String custType = "Tax Invoice";

			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.CategoryName =:mscatId AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.category_name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.catId =:mscatId AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.category_name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.catId ="+mscatId+" AND sr.ReturnQuantuty > 0");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.category_name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.total_amount_per_item, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.catId ="+mscatId+" AND sr.ReturnQuantuty > 0");


			List<Object[]> list = query2.list();
			System.out.println("list.size() ===> "+list.size());
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list)
			{
				SaleReport reports = new SaleReport();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				double disAmount = Double.parseDouble(object[5].toString());
				reports.setDiscount(disAmount);
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				
				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				reports.setReturnAmount((Double)object[7]);//(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
				reports.setSaleReturnDate(object[11].toString());
				
				k++;
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	
	// get category wise Credit customer Sale return
		public List<SaleReport> CCSRSaleWiseCustomer(String mscatId) {
			// TODO Auto-generated method stub
			
			DecimalFormat df = new DecimalFormat("#.##");
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				System.out.println("hi vikas your in dao");
				Long k = 1l;
				String qty = "1";
				String custType = "Credit Customer";
				//String otQtyy = "0";
				//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.CategoryName =:mscatId AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
				Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, sr.Discount, sr.ReturnQuantuty, sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr where sr.catId =:mscatId AND sr.ReturnQuantuty =:qty AND Customer_Type=:custType");
				
				query2.setParameter("mscatId", mscatId);
				query2.setParameter("qty", qty);
				query2.setParameter("custType", custType);
				//query2.setParameter("otQtyy", otQtyy);

				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);

				for (Object[] object : list) {

					SaleReport reports = new SaleReport();
					
					reports.setSrNo(k);
					reports.setBillNo(object[0].toString());
					reports.setBarcodeNo(Long.parseLong(object[1].toString()));
					reports.setItemName(object[2].toString());
					reports.setCategoryName(object[3].toString());
					reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setGst(Double.parseDouble(object[8].toString()));
					reports.setTaxAmount(Double.parseDouble(object[9].toString()));
					reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
					reports.setSaleReturnDate(object[11].toString());
					/*double quan = Double.parseDouble(object[7].toString());
					double saleP = Double.parseDouble(object[4].toString());
					double taxAmt = Double.parseDouble(object[9].toString());
					double saleTotal = quan * saleP;
					double totalAmt = saleTotal + taxAmt;
					reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
					reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
					reports.setReturnAmount(Double.parseDouble(object[7].toString()));
					k++;
					catList.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}	
	
	// get Bill no wise Miscellaneos customer Sale
	public List<SaleReport> billnowiseMiscellaneoussell(String msBillNocust) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.BillNo =:msBillNocust AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.category_name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.BillNo =:msBillNocust AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.category_name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.total_amount_per_item, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.BillNo =:msBillNocust AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			
			
			query2.setParameter("msBillNocust", msBillNocust);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);
			

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				double disAmount = Double.parseDouble(object[5].toString());
				reports.setDiscount(disAmount);
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				
				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				
				reports.setReturnAmount((Double)object[7]);//(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
				reports.setSaleReturnDate(object[11].toString());
				k++;
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	// get Bill no wise Credit customer Sale return report
		public List<SaleReport> billnowiseCCSR(long msBillNocust) {
			// TODO Auto-generated method stub
			DecimalFormat df = new DecimalFormat("#.##");
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Long k = 1l;
				//String qty = "0";
				String custType = "Credit Customer";
				//String otQtyy = "0";
				//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.BillNo =:msBillNocust AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
				Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, sr.Discount, sr.ReturnQuantuty, sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from  salereturn sr where sr.BillNo =:msBillNocust AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
				query2.setParameter("msBillNocust", msBillNocust);
				//query2.setParameter("qty", qty);
				query2.setParameter("custType", custType);
				//query2.setParameter("otQtyy", otQtyy);
				

				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);

				for (Object[] object : list) {

					SaleReport reports = new SaleReport();
					
					reports.setSrNo(k);
					reports.setBillNo(object[0].toString());
					reports.setBarcodeNo(Long.parseLong(object[1].toString()));
					reports.setItemName(object[2].toString());
					reports.setCategoryName(object[3].toString());
					reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setGst(Double.parseDouble(object[8].toString()));
					reports.setTaxAmount(Double.parseDouble(object[9].toString()));
					reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
					reports.setSaleReturnDate(object[11].toString());		

					/*double quan = Double.parseDouble(object[7].toString());
					double saleP = Double.parseDouble(object[4].toString());
					double taxAmt = Double.parseDouble(object[9].toString());
					double saleTotal = quan * saleP;
					double totalAmt = saleTotal + taxAmt;
					reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
					reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
					reports.setReturnAmount(Double.parseDouble(object[7].toString()));
					reports.setCustomerName(object[8].toString());
					k++;
					catList.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}

	// Barcode No Wise Miscellaneos Sale Report
	public List<SaleReport> barcodenowiseMiscellaneoussell(long barcodeMiscellaneous) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.BarcodeNo =:barcodeMiscellaneous AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.BarcodeNo =:barcodeMiscellaneous AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, ct.Category_Name, sr.SalePrice, sr.Discount, sr.ReturnQuantuty,sr.total_amount_per_item, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr join categories ct on sr.catId = ct.pk_category_id where sr.BarcodeNo =:barcodeMiscellaneous AND sr.ReturnQuantuty > 0 AND Customer_Type=:custType");
			
			query2.setParameter("barcodeMiscellaneous", barcodeMiscellaneous);
			query2.setParameter("custType", custType);
			//query2.setParameter("otQtyy", otQtyy);			

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
				double disAmount = Double.parseDouble(object[5].toString());
				reports.setDiscount(Double.parseDouble(object[5].toString()));
				reports.setQuantity(Double.parseDouble(object[6].toString()));
				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				reports.setReturnAmount((Double)object[7]);//(((double) Math.round(Double.parseDouble(object[7].toString())*100.0)/100.0) - disAmount);
				reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));	
				reports.setSaleReturnDate(object[11].toString());
				k++;
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	// Barcode No Wise Miscellaneos Sale Report
		public List<SaleReport> barcodenowiseCCSR(long barcodeMiscellaneous) {
			// TODO Auto-generated method stub
			DecimalFormat df = new DecimalFormat("#.##");
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Long k = 1l;
				String qty = "1";
				String custType = "Credit Customer";
				//String otQtyy = "0";
				//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.BarcodeNo =:barcodeMiscellaneous AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
				
				Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, sr.Discount, sr.ReturnQuantuty, sr.Return_Total, sr.gst, sr.taxAmount, (sr.SalePrice/(1+(sr.gst/100))), sr.BillReturnDate from salereturn sr where sr.BarcodeNo =:barcodeMiscellaneous AND sr.ReturnQuantuty =:qty AND Customer_Type=:custType");
				query2.setParameter("barcodeMiscellaneous", barcodeMiscellaneous);
				query2.setParameter("qty", qty);
				query2.setParameter("custType", custType);
				//query2.setParameter("otQtyy", otQtyy);
				

				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);

				for (Object[] object : list) {

					SaleReport reports = new SaleReport();
					
					reports.setSrNo(k);
					reports.setBillNo(object[0].toString());
					reports.setBarcodeNo(Long.parseLong(object[1].toString()));
					reports.setItemName(object[2].toString());
					reports.setCategoryName(object[3].toString());
					reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setGst(Double.parseDouble(object[8].toString()));
					reports.setTaxAmount(Double.parseDouble(object[9].toString()));
					reports.setSpWithoutTax(df.format(Double.parseDouble(object[10].toString())));
					reports.setSaleReturnDate(object[11].toString());

					/*double quan = Double.parseDouble(object[7].toString());
					double saleP = Double.parseDouble(object[4].toString());
					double taxAmt = Double.parseDouble(object[9].toString());
					double saleTotal = quan * saleP;
					double totalAmt = saleTotal + taxAmt;
					reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
					reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
					reports.setReturnAmount(Double.parseDouble(object[7].toString()));
					k++;
					catList.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
		}
	
	//this dao for get Emp Details
	
	public List getEmployeeNameforGrid() {

		HibernateUtility hbu = null;
		Session session = null;
		List list = null;	
		try
		{
			hbu = HibernateUtility.getInstance();
			System.out.println("grid emp in Dao befor Query ");
			session = hbu.getHibernateSession();
			System.out.println("grid emp in after Query");
			Query query = session.createSQLQuery("SELECT CONCAT(pk_empoyee_id,' ',first_name,' ',last_name) FROM employee_details WHERE ISNULL(resignDate);");
			list = query.list();
			
		} 
		catch (RuntimeException e) 
		{
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	public List<PurchaseReportBean> purchaseReturnSingleDateDao(String adate)
	{
		// TODO Auto-generated method stub
		
		System.out.println("Date in DAO "+adate);
		HibernateUtility hbu = null;
		Session session = null;

		List<PurchaseReportBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String qty="1";
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.Date =:adate AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select pr.BillNo, pr.BarcodeNo, ct.Category_name, pr.ItemName, pr.ReturnQuantity, pr.BuyPrice, pr.vat, pr.Return_Total, pr.discount, pr.rollsize, pr.ReturnDate, pr.igst, pr.discountAmount, pr.taxAmount from purchasereturn pr join categories ct on pr.fkcatId=ct.pk_category_id where pr.ReturnDate =:adate AND pr.ReturnQuantity>0");
			query2.setParameter("adate", adate);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);

			for (Object[] object : list)
			{
				PurchaseReportBean reports = new PurchaseReportBean();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setReturnQuantity(Double.parseDouble(object[4].toString()));
				reports.setBuyPrice(Double.parseDouble(object[5].toString()));
				if(Double.parseDouble(object[6].toString()) > 0)
				{
					reports.setVat(Double.parseDouble(object[6].toString()));
				}
				else
				{
					reports.setVat(Double.parseDouble(object[11].toString()));
				}
				reports.setReturnAmount(object[7].toString());
				reports.setDisPer(object[8].toString());
				reports.setRollSize(Double.parseDouble(object[9].toString()));
				reports.setOndate(object[10].toString());
				reports.setDiscountAmount(object[12].toString());
				reports.setTaxAmount(Double.parseDouble(object[13].toString()));
				
				/*reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));*/

				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<PurchaseReportBean> purchaseReturnRangeWiseDao(String pRFisDate, String pREndDate)
	{
		// TODO Auto-generated method stub
		
		System.out.println("Date in DAO "+pRFisDate+" "+pREndDate);
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String qty="1";
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.Date =:adate AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, ct.Category_name, sr.ItemName, sr.ReturnQuantity, sr.BuyPrice, sr.vat, sr.Return_Total, sr.discount, sr.rollsize, sr.ReturnDate, sr.igst, sr.discountAmount, sr.taxAmount from purchasereturn sr join categories ct on sr.fkcatId=ct.pk_category_id where sr.ReturnDate between :pRFisDate AND :pREndDate AND sr.ReturnQuantity>0");
			query2.setParameter("pRFisDate", pRFisDate);
			query2.setParameter("pREndDate", pREndDate);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);

			for (Object[] object : list) {

				PurchaseReportBean reports = new PurchaseReportBean();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setReturnQuantity(Double.parseDouble(object[4].toString()));
				reports.setBuyPrice(Double.parseDouble(object[5].toString()));
				if(Double.parseDouble(object[6].toString()) > 0)
				{
					reports.setVat(Double.parseDouble(object[6].toString()));
				}
				else
				{
					reports.setVat(Double.parseDouble(object[11].toString()));
				}
				reports.setReturnAmount(object[7].toString());
				reports.setDisPer(object[8].toString());
				reports.setRollSize(Double.parseDouble(object[9].toString()));
				reports.setOndate(object[10].toString());
				reports.setDiscountAmount(object[12].toString());
				reports.setTaxAmount(Double.parseDouble(object[13].toString()));
				
				/*reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));*/

				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<PurchaseReportBean> purchaseReturnBillNoWiseDao(String pRBillNo, String suppName, String suppId)
	{
		// TODO Auto-generated method stub
		
		System.out.println("Date in DAO "+pRBillNo);
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 1l;
			String qty="1";
			String custType = "Tax Invoice";
			//String otQtyy = "0";
			//Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, sr.ItemName, sr.CategoryNane, sr.SalePrice, s.TotalAmount, sr.Discount, sr.ReturnQuantuty, s.Gst, s.TaxAmount,sr.Return_Total from otherbill s JOIN salereturn sr ON s.BillNo = sr.BillNo AND s.BarcodeNo = sr.BarcodeNo where s.Date =:adate AND sr.ReturnQuantuty =:qty AND s.Quantity =:otQtyy");
			Query query2 = session.createSQLQuery("select sr.BillNo, sr.BarcodeNo, ct.Category_name, sr.ItemName, sr.ReturnQuantity, sr.BuyPrice, sr.vat, sr.Return_Total, sr.discount, sr.rollsize, sr.ReturnDate, sr.igst, sr.discountAmount, sr.taxAmount from purchasereturn sr join categories ct on sr.fkcatId=ct.pk_category_id where sr.BillNo=:pRBillNo AND supplierName=:suppName AND fkSuppId=:suppId AND sr.ReturnQuantity>0");
			query2.setParameter("pRBillNo", pRBillNo);
			query2.setParameter("suppName", suppName);
			query2.setParameter("suppId", suppId);
			System.out.println("suppName ==========> "+suppName);
			//query2.setParameter("otQtyy", otQtyy);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);

			for (Object[] object : list)
			{
				PurchaseReportBean reports = new PurchaseReportBean();
				
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setCatName(object[2].toString());
				reports.setItemName(object[3].toString());
				reports.setReturnQuantity(Double.parseDouble(object[4].toString()));
				reports.setBuyPrice(Double.parseDouble(object[5].toString()));
				if(Double.parseDouble(object[6].toString()) > 0)
				{
					reports.setVat(Double.parseDouble(object[6].toString()));
				}
				else
				{
					reports.setVat(Double.parseDouble(object[11].toString()));
				}
				reports.setReturnAmount(object[7].toString());
				reports.setDisPer(object[8].toString());
				reports.setRollSize(Double.parseDouble(object[9].toString()));
				reports.setOndate(object[10].toString());
				reports.setDiscountAmount(object[12].toString());
				reports.setTaxAmount(Double.parseDouble(object[13].toString()));
				/*reports.setGst(Double.parseDouble(object[8].toString()));
				reports.setTaxAmount(Double.parseDouble(object[9].toString()));*/

				/*double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[9].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal* 100) / 100);
				reports.setTotalAmt((double) Math.round(totalAmt* 100) / 100);*/
				k++;
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public void updateBill(OtherBill cust)
	{
		System.out.println("BILL EDIT DAO");
		
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.update(cust);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}

	}
	
	public void updateBarcodeNoWiseStockEditSaleBillInvoice(Long barcodeNo, Double oldQuantity, Double newQuantity, Long shopId)
	{
		System.out.println("Sell Edit Sale Invoce barcodeNo :- "+barcodeNo);
		System.out.println("Sell Edit Sale Invoce oldQuantity :- "+oldQuantity);
		System.out.println("Sell Edit Sale Invoce newQuantity :- "+newQuantity);
		System.out.println("Sell Edit Sale Invoce shopId :- "+shopId);
		HibernateUtility hbu=null;
		Session session=null;
		Transaction transaction=null;
		Long pk=null;
		try{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			//Query query2 = session.createQuery("SELECT quantity FROM barcode_number_wise_stock_details WHERE barcode_no ="+barcodeNo);
			
			Query query2 = session.createQuery("from BarcodeNumberWiseStockDetailsHibernate where barcode_no="+barcodeNo+" AND fk_shop_id= "+shopId);
			
			//int zise = query2.uniqueResult();
			
			BarcodeNumberWiseStockDetailsHibernate uniqueResult = (BarcodeNumberWiseStockDetailsHibernate) query2.uniqueResult();
			Long pkBarcodeNoWiseStockId = uniqueResult.getPkBarcodeNoWiseStockId();
			BarcodeNumberWiseStockDetailsHibernate gReceipt = (BarcodeNumberWiseStockDetailsHibernate) session.get(BarcodeNumberWiseStockDetailsHibernate.class, pkBarcodeNoWiseStockId);
			
			Double stockQuantity = gReceipt.getBarcodeNumberWiseStockQuantity();
			Double stockOriginalQuantity = gReceipt.getOriginalQuantity();
			System.out.println("STOCK stockQuantity :- "+stockQuantity);
			System.out.println("STOCK stockOriginalQuantity :- "+stockOriginalQuantity);
			//Double  updatedQuantity = quantity2-quantity;
			
			//Calculation to Update Quantity
			Double addOldQuantityToStockQuantity = stockQuantity+oldQuantity;
			Double  updatedQuantity = addOldQuantityToStockQuantity-newQuantity;
			System.out.println("Update Original Quantity :- "+updatedQuantity);
			System.out.println("Updated Quantity :- "+updatedQuantity);
			gReceipt.setBarcodeNumberWiseStockQuantity(updatedQuantity);
			session.update(gReceipt);
			
			transaction.commit();
			
		}catch(Exception e){
			System.out.println("Exception In removeOddPurchaseQTYFromStockAfterEditPurchaseBillByBillNo");
			e.printStackTrace();
		} finally {
			if(session!=null) {
				hbu.closeSession(session);
			}
		}
		
	}
	
	
	
	public List<SaleReport> Taxinvoicewisesalereport(String TaxvoiceId, String userTypeRole, String userName, String BillFirstDate, String BillEndDate)
	{
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<SaleReport> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long k = 1l;
			Double total = 0.0;
			Double discount = 0.0;
			Double grossAmt = 0.0;
			
			if(userTypeRole.equalsIgnoreCase("admin"))
			{
				System.out.println("TaxvoiceId ===> "+TaxvoiceId);
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, pr.productName, ct.category_name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId where o.BillNo=:TaxvoiceId AND o.Quantity>0 AND o.BarcodeNo=0 AND o.Date BETWEEN :BillFirstDate AND :BillEndDate");
			}
			else if(userTypeRole != "admin")
			{
				System.out.println("TaxvoiceId ===> "+TaxvoiceId);
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, pr.productName, ct.category_name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId where o.BillNo=:TaxvoiceId AND o.Quantity>0 AND o.BarcodeNo=0 AND o.EmpType != 'admin' AND o.Date BETWEEN :BillFirstDate AND :BillEndDate");
			}
			
			query2.setParameter("TaxvoiceId", TaxvoiceId);
			query2.setParameter("BillFirstDate", BillFirstDate);
			query2.setParameter("BillEndDate", BillEndDate);
			
			
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list)
			{
				SaleReport reports = new SaleReport();
				
				
				Double quantity = Double.parseDouble(object[10].toString());
				
				
				/*String quantity = object[10].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{*/
					reports.setSrNo(k);
					reports.setBillNo(object[0].toString());
					reports.setCarNo(object[1].toString());
					reports.setBarcodeNo(Long.parseLong(object[2].toString()));
					reports.setItemName(object[3].toString());
					reports.setCategoryName(object[4].toString());
					DecimalFormat f = new DecimalFormat("##.00");
					String sp = f.format(object[5]);
					reports.setSalePrice(Double.parseDouble(sp));
					reports.setOwnerName(object[6].toString());
					reports.setContactNo(Long.parseLong(object[7].toString()));
					/*reports.setTotalAmt((double) Math.round(Double.parseDouble(object[8].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);*/
					
					total = (Double) object[8];
					discount = (Double) object[9];
					if(quantity == 0)
					{
						reports.setDiscount(0.0);
						reports.setTotalAmt(Double.parseDouble(sp));
					}
					else
					{
						reports.setTotalAmt(total);
						//reports.setTotalAmt(Double.parseDouble(df.format((quantity * Double.parseDouble(sp)) - discount)));
						reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);
					}
					
					reports.setQuantity(Double.parseDouble(object[10].toString()));
					grossAmt = total - discount;
					reports.setGrossamt(Double.parseDouble(object[8].toString()));
					reports.setSpWithoutTax(object[11].toString());
					reports.setPerProductDisPer(object[12].toString());
					reports.setAfterDisTaxAmt(object[13].toString());
					reports.setGst(Double.parseDouble(object[14].toString()));
					if(userTypeRole.equals("admin"))
					{
						reports.setGrBuyPriceExTax("N/A");
					}
					else
					{
						reports.setGrBuyPriceExTax("0");
					}
					reports.setSaleDate(object[15].toString());;
					reports.setSubCatName(object[16].toString());
					k++;
				/*}*/
				catList.add(reports);
			 } 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List HOldBills()
	{
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		List<OtherBill> stockList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select BillNo, pkOtherBillId,credit_Customer_Name FROM otherbill WHERE BillType='Temporay' group by BillNo ");
			List<Object[]> list = query.list();
			stockList=new ArrayList<OtherBill>(0);
			
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));

				OtherBill StockBean = new OtherBill();

				//StockBean.setBillNo(Long.parseLong(object[0].toString()));
				StockBean.setBillNo(object[0].toString());
				StockBean.setPkBillId(Long.parseLong(object[1].toString()));
				StockBean.setCreditCustomer1(object[2].toString());
				stockList.add(StockBean);		
			}
			
		} catch (Exception e) {
			Log.error("Error in getAllProductListWhoseStockLessThanTen", e);
		}

		finally
		{
			if (session!=null) {
				hbu.closeSession(session);
			}
		}
		return stockList;
	}
	
	
	//Tax Invoice Hold Bill Edit And Print Code Start Here
	
	public List getSaleInvoceBillNonGridDetailsByBillNoForTaxInvoiceHoldBillEditAndPrintBilling(String billNo, String shopId)
	{
		System.out.println("Dao 0 Start getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling");
		System.out.println("In Dao billNo : "+billNo);
		System.out.println("In Dao shopId : "+shopId);
		
		String billType = "Temporay";
		
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			//query = session.createSQLQuery("SELECT ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.TotalAmount, ob.payment_mode, ob.cashCard_cashAmount, ob.cashCard_cardAmount, ob.cashupi_cashAmount, ob.cashupi_upiAmount, ob.credit_Customer_Name, ob.CustGst, mobile_No, ob.GrossTotal, ob.fkShopId FROM otherbill ob WHERE ob.BillNo =:BillNo AND ob.fkShopId =:ShopId limit 1");
			
			query = session.createSQLQuery("SELECT ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.TotalAmount, ob.payment_mode, ob.cashCard_cashAmount, ob.cashCard_cardAmount, ob.cashupi_cashAmount, ob.cashupi_upiAmount, ob.credit_Customer_Name, ob.CustGst, mobile_No, ob.GrossTotal, ob.fkShopId FROM otherbill ob WHERE ob.BillNo =:BillNo  AND ob.BillType =:BillType AND ob.fkShopId =:ShopId limit 1");
			
			query.setParameter("BillNo", billNo);
			query.setParameter("BillType", billType);
			query.setParameter("ShopId", shopId);
			
			//pkOtherBillId, BillType, BillNo, TotalAmount, payment_mode, cashCard_cashAmount, cashCard_cardAmount,
			//cashupi_cashAmount, cashupi_upiAmount, credit_Customer_Name, CustGst, mobile_No, GrossTotal, fkShopId
			
			list = query.list();
			
			List<Object[]> listObject = query.list();
			for (Object[] objects : listObject)
			{	
				System.out.println(Arrays.toString(objects));
				
				/*SaleInvoiceBillEditBean bean = new SaleInvoiceBillEditBean();
				
				
				bean.setPkOtherBillId(Long.parseLong(objects[0].toString()));
				System.out.println("setPkOtherBillId :- "+bean.getPkOtherBillId());
				bean.setBillType(objects[1].toString());
				System.out.println("setBillType :- "+bean.getBillType());
				bean.setBillNo(Long.parseLong(objects[2].toString()));
				System.out.println("setBillNo :- "+bean.getBillNo());
				bean.setTotalAmount(Double.parseDouble(objects[3].toString()));
				System.out.println("setTotalAmount :- "+bean.getTotalAmount());
				bean.setPaymentMode(objects[4].toString());
				System.out.println("setPaymentMode :- "+bean.getPaymentMode());
				bean.setOldCashAmount(Double.parseDouble(objects[5].toString()));
				System.out.println("setOldCashAmount :- "+bean.getOldCashAmount());
				bean.setOldCardAmount(Double.parseDouble(objects[6].toString()));
				System.out.println("setOldCardAmount :- "+bean.getOldCardAmount());
				bean.setOldUpiCashAmount(Double.parseDouble(objects[7].toString()));
				System.out.println("setOldUpiCashAmount :- "+bean.getOldUpiCashAmount());
				bean.setOldUpiAmount(Double.parseDouble(objects[8].toString()));
				System.out.println("setOldUpiAmount :- "+bean.getOldUpiAmount());
				bean.setCreditCustomerName(objects[9].toString());
				System.out.println("setCreditCustomerName :- "+bean.getCreditCustomerName());
				bean.setCustomerGstNo(objects[10].toString());
				System.out.println("setCustomerGstNo :- "+bean.getCustomerGstNo());
				bean.setCustomerMobileNo(objects[11].toString());
				System.out.println("setCustomerMobileNo :- "+bean.getCustomerMobileNo());
				bean.setGrossTotal(Double.parseDouble(objects[12].toString()));
				System.out.println("setGrossTotal :- "+bean.getGrossTotal());*/
				
				/*bean.setPkOtherBillId(Long.parseLong(objects[0].toString()));
				bean.setBillType(objects[1].toString());
				bean.setBillNo(Long.parseLong(objects[2].toString()));
				bean.setTotalAmount(Double.parseDouble(objects[3].toString()));
				bean.setPaymentMode(objects[4].toString());
				bean.setOldCashAmount(Double.parseDouble(objects[5].toString()));
				bean.setOldCardAmount(Double.parseDouble(objects[6].toString()));
				bean.setOldUpiCashAmount(Double.parseDouble(objects[7].toString()));
				bean.setOldUpiAmount(Double.parseDouble(objects[8].toString()));
				bean.setCreditCustomerName(objects[9].toString());
				bean.setCustomerGstNo(objects[10].toString());
				bean.setCustomerMobileNo(objects[11].toString());
				bean.setGrossTotal(Double.parseDouble(objects[12].toString()));*/
			}
			
		} catch(RuntimeException e){
			Log.error("Error in getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling",e);
		}finally{
			if(session!=null){
				hbu.closeSession(session);
			}
		}
		System.out.println("Out of Dao - return getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling list : "+list);
		System.out.println("Dao End 1");
		
		return list;
	}
	
	
	public List<SaleInvoiceBillEditBean> getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForTaxInvoiceHoldBillEditAndPrintBilling(String billNo, String key, String productId, String barcodeNo, String shopId)
	{
		System.out.println("In Dao getAllItemDetails1 Method for Get Grid 0");
		System.out.println("BillNo ====> " + billNo);
		System.out.println("key ====> "+key);
		System.out.println("productId ====> "+productId);
		System.out.println("barcode No Form List ====> "+barcodeNo);
		System.out.println("shopId ====> "+shopId);
		
		System.out.println("Success 00");
		
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleInvoiceBillEditBean> itemlist = null;
		//List<GoodReceiveEditBean> itemlist = null;
		
		double spWTax = 0d;
		double disPer = 0d;
		double spAfterDis = 0d;
		DecimalFormat df = new DecimalFormat("#.##");
		
		try
		{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = null;
				
				if(key != null)
				{
					System.out.println("Success 01 In If 1");
					System.out.println("In First If Block if Key is Not Nill :- "+key);
					String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId, bns.barcode_no, bns.barcode_number_wise_stock_quantity FROM barcode_number_wise_stock_details bns JOIN goodreceive gr ON bns.barcode_no = gr.BarcodeNo JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE bns.barcode_number_wise_stock_quantity > 0 AND barcode_no = "+key+" AND bns.fk_shop_id = "+shopId;
					query = session.createSQLQuery(sqlQuery);
					
					System.out.println("Success 02 In If 1");
					
					
					List<Object[]> list = query.list();

					itemlist = new ArrayList<SaleInvoiceBillEditBean>(0);
					for (Object[] objects : list)
					{	
						Double sp = (Double.parseDouble(objects[9].toString()));
						
						System.out.println("Selling Sprice :- "+sp);
						
						
						disPer = Double.parseDouble(objects[14].toString());
						
						System.out.println("Size :"+Arrays.toString(objects));
						
						//pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity,
						//gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling,
						//gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId, bns.barcode_no, bns.quantity
						
						SaleInvoiceBillEditBean bean = new SaleInvoiceBillEditBean();
						
						bean.setBillNo("0");
						bean.setItemName(objects[0].toString());
						bean.setItem_id(Long.parseLong(objects[1].toString()));
						bean.setCategoryName(objects[2].toString());

						bean.setBarcodeNo(Long.parseLong(objects[21].toString()));
						System.out.println("StockQuantity 1 :- "+objects[22].toString());
						bean.setStockQuantity(Double.parseDouble(objects[22].toString()));
						System.out.println("getStockQuantity :- "+bean.getStockQuantity());
						bean.setHsnSacNo(objects[4].toString());
						System.out.println(objects[4].toString());
						bean.setOldSaleQuantityToUpdateStock(0d);
						bean.setQuantity(1d);
						bean.setSalePrice(Double.parseDouble(objects[9].toString()));
						bean.setFixedSalePrice(Double.parseDouble(objects[9].toString()));
						//spWTax = Double.parseDouble(objects[13].toString());
						//bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						//bean.setsPWithoutTax(Double.parseDouble(objects[9].toString()));

						//Double gstPer = Double.parseDouble(objects[5].toString());
						Double iGstPer = Double.parseDouble(objects[6].toString());
						System.out.println("iGstPer :- "+iGstPer);
						
						
						bean.setDisAmount(0d);
						
						bean.setSpAfterDis(sp);
						System.out.println("In Dao getSpAfterDis() :- "+bean.getSpAfterDis());
						
						Double quantityTocalculateTax =  0d;
						quantityTocalculateTax = bean.getQuantity();
						Double sellingPriceToCalculateTax = quantityTocalculateTax * sp;
						Double gstPer = 0d;
						Double taxCalcute = 0d;
						Double finalSP = 0d;
						if(sp > 0d && sp <= 1000d) {
							gstPer = 5d;
							/*taxCalcute = (sellingPriceToCalculateTax/100)*gstPer;
							finalSP = sellingPriceToCalculateTax + taxCalcute;
							bean.setVat(gstPer);
							bean.setTaxAmount(taxCalcute);*/
							
							
							bean.setsPWithoutTax(Double.parseDouble(df.format(sp/(1+(gstPer/100)))));
							bean.setVat(gstPer);
							bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
						} else {
							if(sp > 1000d) {
								gstPer =  12d;
								/*taxCalcute = (sellingPriceToCalculateTax/100)*gstPer;
								finalSP = sellingPriceToCalculateTax + taxCalcute;
								bean.setVat(gstPer);
								bean.setTaxAmount(taxCalcute);*/
								
								bean.setsPWithoutTax(Double.parseDouble(df.format(sp/(1+(gstPer/100)))));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
								bean.setTaxAmountAfterDis(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}
						System.out.println("In Dao gstPer :- "+gstPer);
						System.out.println("In Dao taxCalcute :- "+taxCalcute);
						System.out.println("In Dao finalSP :- "+finalSP);
						
						//bean.setTaxAmountAfterDis(taxCalcute);
						//bean.setTotal(finalSP);
						bean.setTotal(sp);
						
						bean.setSize1(objects[7].toString());
						
						bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
							
						bean.setRollSize(Double.parseDouble(objects[10].toString()));
						bean.setSubCategoryName(objects[11].toString());
						bean.setMtrQuantity(Double.parseDouble(objects[12].toString()));
						//bean.setsPWithoutTax(Double.parseDouble((objects[13].toString())));
						//bean.setDisPerForBill(0.0);
						bean.setDisPerForBill(Double.parseDouble(objects[14].toString()));
						
						//bean.setSpAfterDis(df.format(spAfterDis));
						double quantity = bean.getQuantity();
						Double total = quantity * sp;
						
						bean.setFkCategoryId(Long.parseLong(objects[15].toString()));
						bean.setFkSubCatId(Long.parseLong(objects[16].toString()));
						bean.setFkProductId(Long.parseLong(objects[17].toString()));
						bean.setStyle(objects[18].toString());
						bean.setFkSuppId(objects[19].toString());
						bean.setFkShopId(Long.parseLong(objects[20].toString()));
						
						//bean.setTotal(total);
						itemlist.add(bean);
					}
				}
				else if(productId != null)
				{
					System.out.println("Success 03 In else  If  2");
					System.out.println("In else Block if Key is Null :- "+key);
					System.out.println("called === PRODUCT BY PRODUCT INFO "+productId);
					
					//String sqlQuery = "SELECT pr.ProductName, pr.pkProductNameId, ct.category_name, sb.subcat_name, pr.FkCatId, pr.fkSubCategoryId, pr.fkShopId FROM product_reg pr JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id WHERE pr.pkProductNameId = "+productId+" AND pr.fkShopId = "+shopId;
					
					String sqlQuery = "SELECT bns.barcode_no, bns.barcode_number_wise_stock_quantity, pr.pkProductNameId, pr.ProductName, pr.FkCatId, ct.category_name, pr.fkSubCategoryId, sb.subcat_name, gr.Quantity, gr.PkGoodRecId, pr.fkShopId  FROM barcode_number_wise_stock_details bns JOIN product_reg pr ON bns.fk_Product_Id = pr.pkProductNameId JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id JOIN goodreceive gr on bns.barcode_no = gr.BarcodeNo  WHERE bns.barcode_no = "+barcodeNo+" AND bns.fk_shop_id = "+shopId;
					
					//bns.barcode_no, bns.quantity, pr.pkProductNameId, pr.ProductName, pr.FkCatId,
					//ct.category_name, pr.fkSubCategoryId, sb.subcat_name, pr.fkShopId
					
					//barcodeNo
					query = session.createSQLQuery(sqlQuery);
					List<Object[]> list = query.list();

					itemlist = new ArrayList<SaleInvoiceBillEditBean>(0);
					for (Object[] objects : list)
					{
						SaleInvoiceBillEditBean bean = new SaleInvoiceBillEditBean();
						
						bean.setBillNo("0");
						bean.setBarcodeNo(Long.parseLong(objects[0].toString()));
						bean.setStockQuantity(Double.parseDouble(objects[1].toString()));
						bean.setFkProductId(Long.parseLong(objects[2].toString()));
						bean.setItemName(objects[3].toString());
						bean.setFkCategoryId(Long.parseLong(objects[4].toString()));
						bean.setCategoryName(objects[5].toString());
						bean.setFkSubCatId(Long.parseLong(objects[6].toString()));
						bean.setSubCategoryName(objects[7].toString());
						bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
						bean.setItem_id(Long.parseLong(objects[9].toString()));
						
						//bean.setBarcodeNo(0l);
						bean.setHsnSacNo("NA");
						bean.setOldSaleQuantityToUpdateStock(0d);
						bean.setQuantity(1d);
						bean.setSalePrice(0d);
						bean.setFixedSalePrice(0d);
						
						bean.setSize1("NA");
												
						bean.setRollSize(0d);
						bean.setMtrQuantity(0d);
						bean.setDisPerForBill(0d);
						bean.setTaxAmount(0d);
						bean.setVat(0d);
						bean.setsPWithoutTax(0d);
						bean.setDisAmount(0d);
						bean.setTaxAmountAfterDis(0d);
						bean.setTotal(0d);
						bean.setSpAfterDis(0d);
						bean.setStyle("NA");
						bean.setFkSuppId("0");
						bean.setFkShopId(Long.parseLong(objects[10].toString()));
						
						itemlist.add(bean);
					}
				}
				//s1.equalsIgnoreCase(s2)
				//else if(!"Empty".equals(billNo) || billNo != null)
				else if(!"Empty".equals(billNo) || billNo != null || key == null || productId == null)
				{
					System.out.println("Success 04 In If 3");
					System.out.println("In if Block if Bill is Null Not Empty :- "+billNo);
					
					String billType = "Temporay";
					Long k = 0l;
					Double totalProductAmount = 0.0;
					Double totalDiscount = 0.0;
					System.out.println("Success 1");
					
					//String sqlQuery = "SELECT DISTINCT ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.fkgoodreciveid, ob.BarcodeNo, ob.fkProductId, pr.ProductName, ob.fkCatId, ct.category_name, ob.fkSubCatId, sbc.subcat_name, ob.HsnSacNo, ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.barcode_number_wise_stock_quantity, ob.SalePrice, ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst, ob.TaxAmount, ob.taxAmtAfterDiscount, ob.totalperitem, CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name), ob.GrossTotal, ob.fkSuppId, ob.fkShopId FROM otherbill ob JOIN product_reg pr ON ob.fkProductId = pr.pkProductNameId JOIN categories ct ON ob.fkCatId = ct.pk_category_id JOIN sub_categories sbc ON ob.fkSubCatId = sbc.pk_subcat_id JOIN goodreceive gr ON ob.BarcodeNo = gr.BarcodeNo INNER JOIN barcode_number_wise_stock_details bns ON ob.BarcodeNo = bns.barcode_no WHERE ob.BillNo = "+billNo+" AND ob.fkShopId = "+shopId;
					
					String sqlQuery = "SELECT ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.fkgoodreciveid, ob.BarcodeNo, ob.fkProductId, pr.ProductName, ob.fkCatId, ct.category_name, ob.fkSubCatId, sbc.subcat_name, ob.HsnSacNo, ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.barcode_number_wise_stock_quantity, ob.SalePrice, ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst, ob.TaxAmount, ob.taxAmtAfterDiscount, ob.totalperitem, CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name), ob.GrossTotal, ob.fkSuppId, ob.fkShopId FROM otherbill ob JOIN product_reg pr ON ob.fkProductId = pr.pkProductNameId JOIN categories ct ON ob.fkCatId = ct.pk_category_id JOIN sub_categories sbc ON ob.fkSubCatId = sbc.pk_subcat_id JOIN goodreceive gr ON ob.BarcodeNo = gr.BarcodeNo INNER JOIN barcode_number_wise_stock_details bns ON ob.BarcodeNo = bns.barcode_no WHERE ob.BillNo = '"+billNo+"' AND ob.BillType = '"+billType+"' AND ob.fkShopId = "+shopId;
					
					
					//ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.fkgoodreciveid, ob.BarcodeNo, ob.fkProductId,
					//pr.ProductName, ob.fkCatId, ct.category_name, ob.fkSubCatId, sbc.subcat_name, ob.HsnSacNo,
					//ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.quantity, gr.Quantity, ob.SalePrice,
					//ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst, ob.TaxAmount,
					//ob.taxAmtAfterDiscount, ob.totalperitem, CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name),
					//ob.GrossTotal, ob.fkSuppId, ob.fkShopId
					
					//ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.fkgoodreciveid, ob.BarcodeNo, ob.fkProductId,
					//pr.ProductName, ob.fkCatId, ct.category_name, ob.fkSubCatId, sbc.subcat_name, ob.HsnSacNo,
					//ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.barcode_number_wise_stock_quantity,
					//ob.SalePrice, ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst,
					//ob.TaxAmount, ob.taxAmtAfterDiscount, ob.totalperitem,CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name),
					//ob.GrossTotal, ob.fkSuppId, ob.fkShopId
					
					query = session.createSQLQuery(sqlQuery); 
					List<Object[]> list = query.list();
					
					itemlist = new ArrayList<SaleInvoiceBillEditBean>(0);
					for (Object[] objects : list)
					{
						System.out.println(Arrays.toString(objects));
						
						System.out.println("Success 4");
						//BillEdit bean = new BillEdit();
						SaleInvoiceBillEditBean bean = new SaleInvoiceBillEditBean();
						System.out.println("Success 5");
						
						//ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.fkgoodreciveid, ob.BarcodeNo, ob.fkProductId, 5
						//bean.setBillNo(Long.parseLong(objects[2].toString()));
						bean.setBillNo(objects[2].toString());
						bean.setItem_id(Long.parseLong(objects[3].toString()));
						bean.setBarcodeNo(Long.parseLong(objects[4].toString()));
						bean.setFkProductId(Long.parseLong(objects[5].toString()));
						
						//pr.ProductName, ob.fkCatId, ct.category_name, ob.fkSubCatId, sbc.subcat_name, ob.HsnSacNo, 11
						bean.setItemName(objects[6].toString());
						bean.setFkCategoryId(Long.parseLong(objects[7].toString()));
						bean.setCategoryName(objects[8].toString());
						bean.setFkSubCatId(Long.parseLong(objects[9].toString()));
						bean.setSubCategoryName(objects[10].toString());
						bean.setHsnSacNo(objects[11].toString());
						System.out.println("Success 6");
						
						//ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.quantity, gr.Quantity, ob.SalePrice, 18
						//ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.barcode_number_wise_stock_quantity, 16
						bean.setRollSize(Double.parseDouble(objects[12].toString()));
						bean.setSize1(objects[13].toString());
						bean.setStyle(objects[14].toString());
						
						bean.setOldSaleQuantityToUpdateStock(Double.parseDouble(objects[15].toString()));
						bean.setQuantity(Double.parseDouble(objects[15].toString()));
						System.out.println("getQuantity :- "+bean.getQuantity());
						
						Double oldSaleQuantityToUpdateStock = bean.getOldSaleQuantityToUpdateStock();
						Double barcodeNumberWiseStockQuantity = Double.parseDouble(objects[16].toString());
						Double addOldSaleQuantityToStockQuantity = 0d;
						addOldSaleQuantityToStockQuantity = oldSaleQuantityToUpdateStock+barcodeNumberWiseStockQuantity;
						
						
						//bean.setStockQuantity(Double.parseDouble(objects[16].toString()));
						bean.setStockQuantity(addOldSaleQuantityToStockQuantity);
						System.out.println("getStockQuantity :- "+bean.getStockQuantity());
						
						//bean.setGoodReceiveQuantity(Double.parseDouble(objects[16].toString()));
						bean.setGoodReceiveQuantity(addOldSaleQuantityToStockQuantity);
						System.out.println("getGoodReceiveQuantity :- "+bean.getGoodReceiveQuantity());
						
						//ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst, ob.TaxAmount, 22
						//ob.SalePrice, ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst, 22
						bean.setSalePrice(Double.parseDouble(objects[17].toString()));
						bean.setFixedSalePrice(Double.parseDouble(objects[17].toString()));
						bean.setsPWithoutTax(Double.parseDouble(objects[18].toString()));//Same as Sale Price
						bean.setDisPerForBill(Double.parseDouble(objects[19].toString()));
						bean.setDisAmount(Double.parseDouble(objects[20].toString()));
						Double spAfterDis1 = 0d;
						System.out.println("Success 7");
						spAfterDis1 = bean.getSalePrice() - bean.getDisAmount();
						bean.setSpAfterDis(spAfterDis1);
						bean.setVat(Double.parseDouble(objects[21].toString()));
						bean.setIgst(Double.parseDouble(objects[22].toString()));
						
						//ob.taxAmtAfterDiscount, ob.totalperitem, CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name), 27
						//ob.TaxAmount, ob.taxAmtAfterDiscount, ob.totalperitem,CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name), 26
						bean.setTaxAmount(Double.parseDouble(objects[23].toString()));
						bean.setTaxAmountAfterDis(Double.parseDouble(objects[24].toString()));
						bean.setTotal(Double.parseDouble(objects[25].toString()));
						bean.setEmployeeName1(objects[26].toString());
						
						//ob.GrossTotal, ob.fkSuppId, ob.fkShopId 30
						//ob.GrossTotal, ob.fkSuppId, ob.fkShopId 29
						bean.setGrossTotal(Double.parseDouble(objects[27].toString()));
						bean.setFkSuppId(objects[28].toString());
						bean.setFkShopId(Long.parseLong(objects[29].toString()));
						System.out.println("Success 8");
						//bean.setMtrQuantity(0d);
						//bean.setMtrQuantity(Double.parseDouble(objects[12].toString()));
						
						System.out.println("bean.toString() :- "+bean.toString());
						
						itemlist.add(bean);
						System.out.println("Success 9");
					}	
				}
		}
		catch (RuntimeException e)
		{
			Log.error("Error in getPurchaseDetailsToEditPurchase(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		System.out.println("Success 10");
		return itemlist;
	}
	
	
	
	
	
	
	
	
	//Edit Sale Invoice Bill Code Start Here
	
	public List getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling(String billNo, String shopId)
	{
		System.out.println("Dao 0 Start getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling");
		System.out.println("In Dao billNo : "+billNo);
		System.out.println("In Dao shopId : "+shopId);
		
		String billType = "Permanent";
		
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			
			//query = session.createSQLQuery("SELECT ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.TotalAmount, ob.payment_mode, ob.cashCard_cashAmount, ob.cashCard_cardAmount, ob.cashupi_cashAmount, ob.cashupi_upiAmount, ob.credit_Customer_Name, ob.CustGst, mobile_No, ob.GrossTotal, ob.fkShopId FROM otherbill ob WHERE ob.BillNo =:BillNo AND ob.fkShopId =:ShopId limit 1");
			
			query = session.createSQLQuery("SELECT ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.TotalAmount, ob.payment_mode, ob.cashCard_cashAmount, ob.cashCard_cardAmount, ob.cashupi_cashAmount, ob.cashupi_upiAmount, ob.credit_Customer_Name, ob.CustGst, mobile_No, ob.GrossTotal, ob.fkShopId FROM otherbill ob WHERE ob.BillNo =:BillNo  AND ob.BillType =:BillType AND ob.fkShopId =:ShopId limit 1");
			
			query.setParameter("BillNo", billNo);
			query.setParameter("BillType", billType);
			query.setParameter("ShopId", shopId);
			
			//ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.TotalAmount, ob.payment_mode, ob.cashCard_cashAmount, ob.cashCard_cardAmount,
			//ob.cashupi_cashAmount, ob.cashupi_upiAmount, ob.credit_Customer_Name, ob.CustGst, mobile_No, ob.GrossTotal, ob.fkShopId
			
			list = query.list();
			
			List<Object[]> listObject = query.list();
			for (Object[] objects : listObject)
			{	
				System.out.println(Arrays.toString(objects));
				
				SaleInvoiceBillEditBean bean = new SaleInvoiceBillEditBean();
				
				
				/*bean.setPkOtherBillId(Long.parseLong(objects[0].toString()));
				System.out.println("setPkOtherBillId :- "+bean.getPkOtherBillId());
				bean.setBillType(objects[1].toString());
				System.out.println("setBillType :- "+bean.getBillType());
				bean.setBillNo(Long.parseLong(objects[2].toString()));
				System.out.println("setBillNo :- "+bean.getBillNo());
				bean.setTotalAmount(Double.parseDouble(objects[3].toString()));
				System.out.println("setTotalAmount :- "+bean.getTotalAmount());
				bean.setPaymentMode(objects[4].toString());
				System.out.println("setPaymentMode :- "+bean.getPaymentMode());
				bean.setOldCashAmount(Double.parseDouble(objects[5].toString()));
				System.out.println("setOldCashAmount :- "+bean.getOldCashAmount());
				bean.setOldCardAmount(Double.parseDouble(objects[6].toString()));
				System.out.println("setOldCardAmount :- "+bean.getOldCardAmount());
				bean.setOldUpiCashAmount(Double.parseDouble(objects[7].toString()));
				System.out.println("setOldUpiCashAmount :- "+bean.getOldUpiCashAmount());
				bean.setOldUpiAmount(Double.parseDouble(objects[8].toString()));
				System.out.println("setOldUpiAmount :- "+bean.getOldUpiAmount());
				bean.setCreditCustomerName(objects[9].toString());
				System.out.println("setCreditCustomerName :- "+bean.getCreditCustomerName());
				bean.setCustomerGstNo(objects[10].toString());
				System.out.println("setCustomerGstNo :- "+bean.getCustomerGstNo());
				bean.setCustomerMobileNo(objects[11].toString());
				System.out.println("setCustomerMobileNo :- "+bean.getCustomerMobileNo());
				bean.setGrossTotal(Double.parseDouble(objects[12].toString()));
				System.out.println("setGrossTotal :- "+bean.getGrossTotal());*/
				
				/*bean.setPkOtherBillId(Long.parseLong(objects[0].toString()));
				bean.setBillType(objects[1].toString());
				bean.setBillNo(Long.parseLong(objects[2].toString()));
				bean.setTotalAmount(Double.parseDouble(objects[3].toString()));
				bean.setPaymentMode(objects[4].toString());
				bean.setOldCashAmount(Double.parseDouble(objects[5].toString()));
				bean.setOldCardAmount(Double.parseDouble(objects[6].toString()));
				bean.setOldUpiCashAmount(Double.parseDouble(objects[7].toString()));
				bean.setOldUpiAmount(Double.parseDouble(objects[8].toString()));
				bean.setCreditCustomerName(objects[9].toString());
				bean.setCustomerGstNo(objects[10].toString());
				bean.setCustomerMobileNo(objects[11].toString());
				bean.setGrossTotal(Double.parseDouble(objects[12].toString()));*/
				if(objects[0] == null)
				{
					bean.setPkOtherBillId(0l);
				} else {
					bean.setPkOtherBillId(Long.parseLong(objects[0].toString()));
				}
				if(objects[1] == null)
				{
					bean.setBillType("");
				} else {
					bean.setBillType(objects[1].toString());
				}
				if(objects[2] == null)
				{
					bean.setBillNo("");
				} else {
					bean.setBillNo(objects[2].toString());
				}
				if(objects[3] == null)
				{
					bean.setTotalAmount(0d);
				} else {
					bean.setTotalAmount(Double.parseDouble(objects[3].toString()));
				}
				if(objects[4] == null)
				{
					bean.setPaymentMode("");
				} else {
					bean.setPaymentMode(objects[4].toString());
				}
				if(objects[5] == null)
				{
					bean.setOldCashAmount(0d);
				} else {
					bean.setOldCashAmount(Double.parseDouble(objects[5].toString()));
				}
				if(objects[6] == null)
				{
					bean.setOldCardAmount(0d);
				} else {
					bean.setOldCardAmount(Double.parseDouble(objects[6].toString()));
				}
				if(objects[7] == null)
				{
					bean.setOldUpiCashAmount(0d);
				} else {
					bean.setOldUpiCashAmount(Double.parseDouble(objects[7].toString()));
				}
				if(objects[8] == null)
				{
					bean.setOldUpiAmount(0d);
				} else {
					bean.setOldUpiAmount(Double.parseDouble(objects[8].toString()));
				}
				
				if(objects[9] == null)
				{
					bean.setCreditCustomerName("");
				} else {
					bean.setCreditCustomerName(objects[9].toString());
					
				}
				if(objects[10] == null)
				{
					bean.setCustomerGstNo("");
				} else {
					bean.setCustomerGstNo(objects[10].toString());
				}
				if(objects[11] == null)
				{
					bean.setCustomerMobileNo("");
				} else {
					bean.setCustomerMobileNo(objects[11].toString());
				}
				if(objects[12] == null)
				{
					bean.setGrossTotal(0d);
				} else {
					bean.setGrossTotal(Double.parseDouble(objects[12].toString()));
				}
			}
			
		} catch(RuntimeException e){
			Log.error("Error in getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling",e);
		}finally{
			if(session!=null){
				hbu.closeSession(session);
			}
		}
		System.out.println("Out of Dao - return getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling list : "+list);
		System.out.println("Dao End 1");
		
		return list;
	}
	
	public List<SaleInvoiceBillEditBean> getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBilling(String billNo, String key, String productId, String barcodeNo, String shopId)
	{
		System.out.println("In Dao getAllItemDetails1 Method for Get Grid 0");
		System.out.println("BillNo ====> " + billNo);
		System.out.println("key ====> "+key);
		System.out.println("productId ====> "+productId);
		System.out.println("barcode No Form List ====> "+barcodeNo);
		System.out.println("shopId ====> "+shopId);
		
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleInvoiceBillEditBean> itemlist = null;
		//List<GoodReceiveEditBean> itemlist = null;
		
		double spWTax = 0d;
		double disPer = 0d;
		double spAfterDis = 0d;
		DecimalFormat df = new DecimalFormat("#.##");
		
		try
		{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = null;
				
				if(key != null)
				{
					System.out.println("In First If Block if Key is Not Nill :- "+key);
					System.out.println("Success 0");
					String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId, bns.barcode_no, bns.barcode_number_wise_stock_quantity FROM barcode_number_wise_stock_details bns JOIN goodreceive gr ON bns.barcode_no = gr.BarcodeNo JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE bns.barcode_number_wise_stock_quantity > 0 AND barcode_no = "+key+" AND bns.fk_shop_id = "+shopId;
					query = session.createSQLQuery(sqlQuery);
					
					System.out.println("Success 1");
					
					
					List<Object[]> list = query.list();

					itemlist = new ArrayList<SaleInvoiceBillEditBean>(0);
					for (Object[] objects : list)
					{	
						Double sp = (Double.parseDouble(objects[9].toString()));
						
						System.out.println("Selling Sprice :- "+sp);
						
						
						disPer = Double.parseDouble(objects[14].toString());
						
						System.out.println("Size :"+Arrays.toString(objects));
						
						//pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity,
						//gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling,
						//gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId, bns.barcode_no, bns.quantity
						
						SaleInvoiceBillEditBean bean = new SaleInvoiceBillEditBean();
						
						bean.setBillNo("0");
						bean.setItemName(objects[0].toString());
						bean.setItem_id(Long.parseLong(objects[1].toString()));
						bean.setCategoryName(objects[2].toString());

						bean.setBarcodeNo(Long.parseLong(objects[21].toString()));
						System.out.println("StockQuantity 1 :- "+objects[22].toString());
						bean.setStockQuantity(Double.parseDouble(objects[22].toString()));
						System.out.println("getStockQuantity :- "+bean.getStockQuantity());
						bean.setHsnSacNo(objects[4].toString());
						System.out.println(objects[4].toString());
						bean.setOldSaleQuantityToUpdateStock(0d);
						bean.setQuantity(1d);
						bean.setSalePrice(Double.parseDouble(objects[9].toString()));
						bean.setFixedSalePrice(Double.parseDouble(objects[9].toString()));
						//spWTax = Double.parseDouble(objects[13].toString());
						//bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						//bean.setsPWithoutTax(Double.parseDouble(objects[9].toString()));

						//Double gstPer = Double.parseDouble(objects[5].toString());
						Double iGstPer = Double.parseDouble(objects[6].toString());
						System.out.println("iGstPer :- "+iGstPer);
						
						
						bean.setDisAmount(0d);
						
						bean.setSpAfterDis(sp);
						System.out.println("In Dao getSpAfterDis() :- "+bean.getSpAfterDis());
						
						Double quantityTocalculateTax =  0d;
						quantityTocalculateTax = bean.getQuantity();
						Double sellingPriceToCalculateTax = quantityTocalculateTax * sp;
						Double gstPer = 0d;
						Double taxCalcute = 0d;
						Double finalSP = 0d;
						if(sp > 0d && sp <= 1000d) {
							gstPer = 5d;
							/*taxCalcute = (sellingPriceToCalculateTax/100)*gstPer;
							finalSP = sellingPriceToCalculateTax + taxCalcute;
							bean.setVat(gstPer);
							bean.setTaxAmount(taxCalcute);*/
							
							bean.setsPWithoutTax(Double.parseDouble(df.format(sp/(1+(gstPer/100)))));
							bean.setVat(gstPer);
							bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
						} else {
							if(sp > 1000d) {
								gstPer =  12d;
								/*taxCalcute = (sellingPriceToCalculateTax/100)*gstPer;
								finalSP = sellingPriceToCalculateTax + taxCalcute;
								bean.setVat(gstPer);
								bean.setTaxAmount(taxCalcute);*/
								
								bean.setsPWithoutTax(Double.parseDouble(df.format(sp/(1+(gstPer/100)))));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
								bean.setTaxAmountAfterDis(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}
						System.out.println("In Dao gstPer :- "+gstPer);
						System.out.println("In Dao taxCalcute :- "+taxCalcute);
						System.out.println("In Dao finalSP :- "+finalSP);
						
						//bean.setTaxAmountAfterDis(taxCalcute);
						//bean.setTotal(finalSP);
						bean.setTotal(sp);
						
						bean.setSize1(objects[7].toString());
						
						bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
							
						bean.setRollSize(Double.parseDouble(objects[10].toString()));
						bean.setSubCategoryName(objects[11].toString());
						bean.setMtrQuantity(Double.parseDouble(objects[12].toString()));
						//bean.setsPWithoutTax(Double.parseDouble((objects[13].toString())));
						//bean.setDisPerForBill(0.0);
						bean.setDisPerForBill(Double.parseDouble(objects[14].toString()));
						
						//bean.setSpAfterDis(df.format(spAfterDis));
						double quantity = bean.getQuantity();
						Double total = quantity * sp;
						
						bean.setFkCategoryId(Long.parseLong(objects[15].toString()));
						bean.setFkSubCatId(Long.parseLong(objects[16].toString()));
						bean.setFkProductId(Long.parseLong(objects[17].toString()));
						bean.setStyle(objects[18].toString());
						bean.setFkSuppId(objects[19].toString());
						bean.setFkShopId(Long.parseLong(objects[20].toString()));
						
						//bean.setTotal(total);
						itemlist.add(bean);
					}
				}
				else if(productId != null)
				{
					System.out.println("In else Block if Key is Null :- "+key);
					System.out.println("called === PRODUCT BY PRODUCT INFO "+productId);
					
					//String sqlQuery = "SELECT pr.ProductName, pr.pkProductNameId, ct.category_name, sb.subcat_name, pr.FkCatId, pr.fkSubCategoryId, pr.fkShopId FROM product_reg pr JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id WHERE pr.pkProductNameId = "+productId+" AND pr.fkShopId = "+shopId;
					
					String sqlQuery = "SELECT bns.barcode_no, bns.barcode_number_wise_stock_quantity, pr.pkProductNameId, pr.ProductName, pr.FkCatId, ct.category_name, pr.fkSubCategoryId, sb.subcat_name, gr.Quantity, gr.PkGoodRecId, pr.fkShopId  FROM barcode_number_wise_stock_details bns JOIN product_reg pr ON bns.fk_Product_Id = pr.pkProductNameId JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id JOIN goodreceive gr on bns.barcode_no = gr.BarcodeNo  WHERE bns.barcode_no = "+barcodeNo+" AND bns.fk_shop_id = "+shopId;
					
					//bns.barcode_no, bns.quantity, pr.pkProductNameId, pr.ProductName, pr.FkCatId,
					//ct.category_name, pr.fkSubCategoryId, sb.subcat_name, pr.fkShopId
					
					//barcodeNo
					query = session.createSQLQuery(sqlQuery);
					List<Object[]> list = query.list();

					itemlist = new ArrayList<SaleInvoiceBillEditBean>(0);
					for (Object[] objects : list)
					{
						SaleInvoiceBillEditBean bean = new SaleInvoiceBillEditBean();
						
						bean.setBillNo("0");
						bean.setBarcodeNo(Long.parseLong(objects[0].toString()));
						bean.setStockQuantity(Double.parseDouble(objects[1].toString()));
						bean.setFkProductId(Long.parseLong(objects[2].toString()));
						bean.setItemName(objects[3].toString());
						bean.setFkCategoryId(Long.parseLong(objects[4].toString()));
						bean.setCategoryName(objects[5].toString());
						bean.setFkSubCatId(Long.parseLong(objects[6].toString()));
						bean.setSubCategoryName(objects[7].toString());
						bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
						bean.setItem_id(Long.parseLong(objects[9].toString()));
						
						//bean.setBarcodeNo(0l);
						bean.setHsnSacNo("NA");
						bean.setOldSaleQuantityToUpdateStock(0d);
						bean.setQuantity(1d);
						bean.setSalePrice(0d);
						bean.setFixedSalePrice(0d);
						
						bean.setSize1("NA");
												
						bean.setRollSize(0d);
						bean.setMtrQuantity(0d);
						bean.setDisPerForBill(0d);
						bean.setTaxAmount(0d);
						bean.setVat(0d);
						bean.setsPWithoutTax(0d);
						bean.setDisAmount(0d);
						bean.setTaxAmountAfterDis(0d);
						bean.setTotal(0d);
						bean.setSpAfterDis(0d);
						bean.setStyle("NA");
						bean.setFkSuppId("0");
						bean.setFkShopId(Long.parseLong(objects[10].toString()));
						
						itemlist.add(bean);
					}
				}
				//s1.equalsIgnoreCase(s2)
				//else if(!"Empty".equals(billNo) || billNo != null)
				else if(!"Empty".equals(billNo) || billNo != null || key == null || productId == null)
				{
					System.out.println("Success 0");
					System.out.println("In if Block if Bill is Null Not Empty :- "+billNo);
					
					String billType = "Permanent";
					Long k = 0l;
					Double totalProductAmount = 0.0;
					Double totalDiscount = 0.0;
					System.out.println("Success 1");
					
					//String sqlQuery = "SELECT DISTINCT ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.fkgoodreciveid, ob.BarcodeNo, ob.fkProductId, pr.ProductName, ob.fkCatId, ct.category_name, ob.fkSubCatId, sbc.subcat_name, ob.HsnSacNo, ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.barcode_number_wise_stock_quantity, ob.SalePrice, ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst, ob.TaxAmount, ob.taxAmtAfterDiscount, ob.totalperitem, CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name), ob.GrossTotal, ob.fkSuppId, ob.fkShopId FROM otherbill ob JOIN product_reg pr ON ob.fkProductId = pr.pkProductNameId JOIN categories ct ON ob.fkCatId = ct.pk_category_id JOIN sub_categories sbc ON ob.fkSubCatId = sbc.pk_subcat_id JOIN goodreceive gr ON ob.BarcodeNo = gr.BarcodeNo INNER JOIN barcode_number_wise_stock_details bns ON ob.BarcodeNo = bns.barcode_no WHERE ob.BillNo = "+billNo+" AND ob.fkShopId = "+shopId;
					
					String sqlQuery = "SELECT ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.fkgoodreciveid, ob.BarcodeNo, ob.fkProductId, pr.ProductName, ob.fkCatId, ct.category_name, ob.fkSubCatId, sbc.subcat_name, ob.HsnSacNo, ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.barcode_number_wise_stock_quantity, ob.SalePrice, ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst, ob.TaxAmount, ob.taxAmtAfterDiscount, ob.totalperitem, CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name), ob.GrossTotal, ob.fkSuppId, ob.fkShopId FROM otherbill ob JOIN product_reg pr ON ob.fkProductId = pr.pkProductNameId JOIN categories ct ON ob.fkCatId = ct.pk_category_id JOIN sub_categories sbc ON ob.fkSubCatId = sbc.pk_subcat_id JOIN goodreceive gr ON ob.BarcodeNo = gr.BarcodeNo INNER JOIN barcode_number_wise_stock_details bns ON ob.BarcodeNo = bns.barcode_no WHERE ob.BillNo = '"+billNo+"' AND ob.BillType = '"+billType+"' AND ob.fkShopId = "+shopId;
					
					
					//ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.fkgoodreciveid, ob.BarcodeNo, ob.fkProductId,
					//pr.ProductName, ob.fkCatId, ct.category_name, ob.fkSubCatId, sbc.subcat_name, ob.HsnSacNo,
					//ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.quantity, gr.Quantity, ob.SalePrice,
					//ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst, ob.TaxAmount,
					//ob.taxAmtAfterDiscount, ob.totalperitem, CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name),
					//ob.GrossTotal, ob.fkSuppId, ob.fkShopId
					
					//ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.fkgoodreciveid, ob.BarcodeNo, ob.fkProductId,
					//pr.ProductName, ob.fkCatId, ct.category_name, ob.fkSubCatId, sbc.subcat_name, ob.HsnSacNo,
					//ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.barcode_number_wise_stock_quantity,
					//ob.SalePrice, ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst,
					//ob.TaxAmount, ob.taxAmtAfterDiscount, ob.totalperitem,CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name),
					//ob.GrossTotal, ob.fkSuppId, ob.fkShopId
					
					query = session.createSQLQuery(sqlQuery); 
					List<Object[]> list = query.list();
					
					itemlist = new ArrayList<SaleInvoiceBillEditBean>(0);
					for (Object[] objects : list)
					{
						System.out.println(Arrays.toString(objects));
						
						System.out.println("Success 4");
						//BillEdit bean = new BillEdit();
						SaleInvoiceBillEditBean bean = new SaleInvoiceBillEditBean();
						System.out.println("Success 5");
						
						//ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.fkgoodreciveid, ob.BarcodeNo, ob.fkProductId, 5
						bean.setBillNo(objects[2].toString());
						bean.setItem_id(Long.parseLong(objects[3].toString()));
						bean.setBarcodeNo(Long.parseLong(objects[4].toString()));
						bean.setFkProductId(Long.parseLong(objects[5].toString()));
						
						//pr.ProductName, ob.fkCatId, ct.category_name, ob.fkSubCatId, sbc.subcat_name, ob.HsnSacNo, 11
						bean.setItemName(objects[6].toString());
						bean.setFkCategoryId(Long.parseLong(objects[7].toString()));
						bean.setCategoryName(objects[8].toString());
						bean.setFkSubCatId(Long.parseLong(objects[9].toString()));
						bean.setSubCategoryName(objects[10].toString());
						bean.setHsnSacNo(objects[11].toString());
						System.out.println("Success 6");
						
						//ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.quantity, gr.Quantity, ob.SalePrice, 18
						//ob.Rollsize, ob.size, ob.style, ob.Quantity, bns.barcode_number_wise_stock_quantity, 16
						bean.setRollSize(Double.parseDouble(objects[12].toString()));
						bean.setSize1(objects[13].toString());
						bean.setStyle(objects[14].toString());
						
						bean.setOldSaleQuantityToUpdateStock(Double.parseDouble(objects[15].toString()));
						bean.setQuantity(Double.parseDouble(objects[15].toString()));
						System.out.println("getQuantity :- "+bean.getQuantity());
						
						Double oldSaleQuantityToUpdateStock = bean.getOldSaleQuantityToUpdateStock();
						Double barcodeNumberWiseStockQuantity = Double.parseDouble(objects[16].toString());
						Double addOldSaleQuantityToStockQuantity = 0d;
						addOldSaleQuantityToStockQuantity = oldSaleQuantityToUpdateStock+barcodeNumberWiseStockQuantity;
						
						
						//bean.setStockQuantity(Double.parseDouble(objects[16].toString()));
						bean.setStockQuantity(addOldSaleQuantityToStockQuantity);
						System.out.println("getStockQuantity :- "+bean.getStockQuantity());
						
						//bean.setGoodReceiveQuantity(Double.parseDouble(objects[16].toString()));
						bean.setGoodReceiveQuantity(addOldSaleQuantityToStockQuantity);
						System.out.println("getGoodReceiveQuantity :- "+bean.getGoodReceiveQuantity());
						
						//ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst, ob.TaxAmount, 22
						//ob.SalePrice, ob.SalePWithoutTax, ob.perProductdisPer, ob.Discount, ob.Gst, ob.Igst, 22
						bean.setSalePrice(Double.parseDouble(objects[17].toString()));
						bean.setFixedSalePrice(Double.parseDouble(objects[17].toString()));
						bean.setsPWithoutTax(Double.parseDouble(objects[18].toString()));//Same as Sale Price
						bean.setDisPerForBill(Double.parseDouble(objects[19].toString()));
						bean.setDisAmount(Double.parseDouble(objects[20].toString()));
						Double spAfterDis1 = 0d;
						System.out.println("Success 7");
						spAfterDis1 = bean.getSalePrice() - bean.getDisAmount();
						bean.setSpAfterDis(spAfterDis1);
						bean.setVat(Double.parseDouble(objects[21].toString()));
						bean.setIgst(Double.parseDouble(objects[22].toString()));
						
						//ob.taxAmtAfterDiscount, ob.totalperitem, CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name), 27
						//ob.TaxAmount, ob.taxAmtAfterDiscount, ob.totalperitem,CONCAT(ob.FkSaleEmployeeId, ' ', ob.employee_Name), 26
						bean.setTaxAmount(Double.parseDouble(objects[23].toString()));
						bean.setTaxAmountAfterDis(Double.parseDouble(objects[24].toString()));
						bean.setTotal(Double.parseDouble(objects[25].toString()));
						bean.setEmployeeName1(objects[26].toString());
						
						//ob.GrossTotal, ob.fkSuppId, ob.fkShopId 30
						//ob.GrossTotal, ob.fkSuppId, ob.fkShopId 29
						bean.setGrossTotal(Double.parseDouble(objects[27].toString()));
						bean.setFkSuppId(objects[28].toString());
						bean.setFkShopId(Long.parseLong(objects[29].toString()));
						System.out.println("Success 8");
						//bean.setMtrQuantity(0d);
						//bean.setMtrQuantity(Double.parseDouble(objects[12].toString()));
						
						System.out.println("bean.toString() :- "+bean.toString());
						
						itemlist.add(bean);
						System.out.println("Success 9");
					}
				}
		}
		catch (RuntimeException e)
		{
			Log.error("Error in getPurchaseDetailsToEditPurchase(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		System.out.println("Success 10");
		return itemlist;
	}
	
	public void addOldTaxInvoiceBillSaleQTYInStockToEditTaxInvoiceBillRecordByBillNo(String billNo, String fkShopId)//(String shopid,Long billNo)
	{
		OtherBillDao dao=new OtherBillDao();
		List list12 = dao.getSaleBillItemListToUpdateStockQTYForSaleInvoiceBillEdit(billNo, fkShopId);
		
		for(int i=0; i<list12.size(); i++)
		{
			SaleInvoiceBillEditBean bean =(SaleInvoiceBillEditBean)list12.get(i);
			
			long PkPurchaseBill = bean.getPkOtherBillId();
			String billNoDB = bean.getBillNo();
			Long fkProductIdDB = bean.getFkProductId();
			Double saleBillQuantityDB = bean.getQuantity();
			String itemNameDB = bean.getItemName();
			Long fkCategoryIdDB = bean.getFkCategoryId();
			String categoryNameDB = bean.getCategoryName();
			Long fkShopIdDB = bean.getFkShopId();
			
			System.out.println("PkPurchaseBill in Tax Voice to add STOCK Table"+PkPurchaseBill);
			System.out.println("billNoDB in Tax Voice to add STOCK Table"+billNoDB);
			System.out.println("fkProductIdDB in Tax Voice to add STOCK Table"+fkProductIdDB);
			System.out.println("Quantity in Tax Voice to add STOCK Table"+saleBillQuantityDB);
			System.out.println("itemNameDB in Tax Voice to add STOCK Table"+itemNameDB);
			System.out.println("fkCategoryIdDB in Tax Voice to add STOCK Table"+fkCategoryIdDB);
			System.out.println("categoryNameDB in Tax Voice to add STOCK Table"+categoryNameDB);
			System.out.println("fkShopIdDB in Tax Voice to add STOCK Table"+fkShopIdDB);
			
			//Code to Update Stock
			HibernateUtility hbu=null;
			Session session=null;
			Transaction transaction=null;
			Long pk=null;
			try{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				transaction = session.beginTransaction();
				
				Query query = session.createSQLQuery("SELECT COUNT(*) FROM stock_details WHERE fk_Product_Id="+fkProductIdDB+" AND fk_Cat_Id="+fkCategoryIdDB+" AND fkShopId="+fkShopIdDB);
				
				BigInteger uniqueResult2 =  (BigInteger) query.uniqueResult();
				int intVal = uniqueResult2.intValue();
				//System.out.println(intVal);
				// if product is not available in Stock table
				if(intVal==0)
				{
					Stock stock = new Stock();
					stock.setFkProductId(fkProductIdDB);
					stock.setQuantity(saleBillQuantityDB);
					session.save(stock);
				} else if(intVal==1) {
					//if product is available in Stock table then update its quantity
					Query query2 = session.createQuery("from Stock where fk_Product_Id="+fkProductIdDB+" AND fk_Cat_Id="+fkCategoryIdDB+" AND fkShopId="+fkShopIdDB);
					Stock uniqueResult = (Stock) query2.uniqueResult();
					
					Long pkItemStockId = uniqueResult.getPkStockId();
					
					Stock gReceipt = (Stock) session.get(Stock.class, pkItemStockId);
					
					Double quantity2 = gReceipt.getQuantity();
					System.out.println("STOCK Quantity :- "+quantity2);
					Double  updatedQuantity = quantity2+saleBillQuantityDB;
					System.out.println("Update Quantity :- "+quantity2);
					gReceipt.setQuantity(updatedQuantity);
					session.update(gReceipt);
				}
				transaction.commit();
			}catch(Exception e){
				System.out.println("Exception addOldTaxInvoiceBillSaleQTYInStockToEditTaxInvoiceBillRecordByBillNo");
				e.printStackTrace();
			} finally {
				if(session!=null) {
					hbu.closeSession(session);
				}
			}
			PkPurchaseBill = 0l;
			billNoDB = "0";
			fkProductIdDB =0l;
			saleBillQuantityDB = 0d;
		}
	}
	
	public List getSaleBillItemListToUpdateStockQTYForSaleInvoiceBillEdit(String billNo, String fkShopId)
	{
		HibernateUtility hbu=null;
		Session session=null;
		List<SaleInvoiceBillEditBean> shopDetailsList=null;
		try{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query=session.createSQLQuery("SELECT pkOtherBillId, BillNo, fkProductId, Quantity, ItemName, fkCatId, CategoryName, fkShopId FROM otherbill WHERE BillNo = '"+billNo+"' AND fkShopId = "+fkShopId);
			
			List<Object[]> list = query.list();
			
			shopDetailsList= new ArrayList<SaleInvoiceBillEditBean>(0);

			for (Object[] o : list) {
				SaleInvoiceBillEditBean bean = new SaleInvoiceBillEditBean();
				
				bean.setPkOtherBillId(Long.parseLong(o[0].toString()));
				bean.setBillNo(o[1].toString());
				bean.setFkProductId(Long.parseLong(o[2].toString()));
				bean.setQuantity(Double.parseDouble(o[3].toString()));
				bean.setItemName((o[4].toString()));
				bean.setFkCategoryId(Long.parseLong(o[5].toString()));
				bean.setCategoryName((o[6].toString()));
				bean.setFkShopId(Long.parseLong(o[7].toString()));
				
				shopDetailsList.add(bean);
			}
		} catch (RuntimeException e) {
			e.printStackTrace();
		} finally {
			hbu.closeSession(session);	
		}
		return shopDetailsList;
	}
	
	public void deleteTaxInvoiceBillRecordByBillNo(String billNo,String shopId)//(Long billNo,String shopId)
	{
		Transaction tx = null;
		HibernateUtility hbu = null ;
		Session session = null;
		List list  = null;
		System.out.println("In Dao deleteTaxInvoiceBillRecordByBillNo Bill No  -  "+billNo);
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			tx = session.beginTransaction();
			Query query = session.createSQLQuery("DELETE FROM otherbill WHERE BillNo = '"+billNo+"'");
			int seletedRecords = query.executeUpdate();
			
			System.out.println("Number of records by BillNo deleted :- "+seletedRecords);
			//list = query.list();
			tx.commit();	
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session!=null) {
					hbu.closeSession(session);
			}
		}
	}
	
	
}
