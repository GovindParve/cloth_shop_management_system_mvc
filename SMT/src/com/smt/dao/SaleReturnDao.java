package com.smt.dao;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

/*
import org.jfree.util.Log;
import com.itextpdf.text.pdf.PdfStructTreeController.returnType;
*/
import com.smt.bean.BillBean;
import com.smt.bean.CategoryWisePurchase;
import com.smt.bean.CustomerBean;
import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.SaleInvoiceBillEditBean;
import com.smt.bean.SaleReturnBean;
import com.smt.hibernate.BarcodeNumberWiseStockDetailsHibernate;
import com.smt.hibernate.CreditCustomerBill;
import com.smt.hibernate.CustomerBill;
import com.smt.hibernate.CustomerPaymentBean;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.OtherBill;
import com.smt.hibernate.SaleReturn;
import com.smt.hibernate.Stock;
import com.smt.utility.HibernateUtility;

public class SaleReturnDao {

	public void registerSaleReturn(SaleReturn cust)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		System.out.println("hi this is in salereturn Dao ");
		try {
			hbu = HibernateUtility.getInstance();
			
			session = hbu.getHibernateSession();
			
			transaction = session.beginTransaction();
			
			System.out.println("salreturn values       "   +cust);

			session.save(cust);
			
			System.out.println("hi data save in sale rerurn table");
			
			transaction.commit();

		} catch (Exception e) {
			try {
				transaction.rollback();
			} catch (RuntimeException ede) {

			}
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
	}
	
	public void updateBarcodeNoWiseStockQuantitySaleReturn(Long barcodeNo,Double editQuantity, Long shopId)
	{
		System.out.println("Sell Invoice barcodeNo :- "+barcodeNo);
		System.out.println("Sell Invoice editQuantity :- "+editQuantity);		
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
			
			BarcodeNumberWiseStockDetailsHibernate uniqueResult = (BarcodeNumberWiseStockDetailsHibernate) query2.uniqueResult();
			Long pkBarcodeNoWiseStockId = uniqueResult.getPkBarcodeNoWiseStockId();
			BarcodeNumberWiseStockDetailsHibernate gReceipt = (BarcodeNumberWiseStockDetailsHibernate) session.get(BarcodeNumberWiseStockDetailsHibernate.class, pkBarcodeNoWiseStockId);
			
			Double quantity2 = gReceipt.getBarcodeNumberWiseStockQuantity();
			System.out.println("STOCK Quantity :- "+quantity2);
			Double  updatedQuantity = quantity2+editQuantity;
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

	public void updateOtherBillQuantity(Long pkBillId, String editQuantity, String discount, String taxAmount, String returnTotalAmt, String totalAmt, String returnGrossTotal)
	{
		System.out.println("In Dao  updateOtherBillQuantity Method editQuantity :-"+editQuantity);
		System.out.println("In Dao  updateOtherBillQuantity Method discount :-"+discount);
		System.out.println("In Dao  updateOtherBillQuantity Method taxAmount :-"+taxAmount);
		System.out.println("In Dao  updateOtherBillQuantity Method returnTotalAmt :-"+returnTotalAmt);
		System.out.println("In Dao  updateOtherBillQuantity Method totalAmt :-"+totalAmt);
		System.out.println("In Dao  updateOtherBillQuantity Method returnGrossTotal :-"+returnGrossTotal);
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			org.hibernate.Query query = session.createQuery("from OtherBill where pkBillId = :pkBillId ");
			query.setParameter("pkBillId", pkBillId);

			OtherBill uniqueResult = (OtherBill) query.uniqueResult();
			Double quant =  uniqueResult.getQuantity();
			Double discountDB = uniqueResult.getDiscount();
			Double taxAmountDB = uniqueResult.getTaxAmount();
			Double taxAmtAfterDiscountDB = uniqueResult.getTaxAmtAfterDiscount();
			Double totalperItemDB = uniqueResult.getTotalperItem();
			//Double totalAmtDB = uniqueResult.getTotalAmt();
			//Double grossAmountDB = uniqueResult.getGrossamt();
			
			//updates data
			Double updatequnty = (quant - Double.parseDouble(editQuantity));
			Double UpdateDiscountDB = (discountDB - Double.parseDouble(discount));
			Double UpdateTaxAmountDB = (taxAmountDB - Double.parseDouble(taxAmount));
			Double UpdateTaxAmtAfterDiscountDB = (taxAmtAfterDiscountDB - Double.parseDouble(taxAmount));
			Double UpdateTotalperItemDB = (totalperItemDB - Double.parseDouble(returnTotalAmt));
			//Double UpdateTotalAmtDB = (totalAmtDB - Double.parseDouble(returnGrossTotal));
			//Double UpdateGrossAmountDB = (grossAmountDB - Double.parseDouble(returnGrossTotal));
			
			
			System.out.println("In Dao  updateOtherBillQuantity Method updatequnty :- "+updatequnty);
			System.out.println("In Dao  updateOtherBillQuantity Method UpdateDiscountDB :- "+UpdateDiscountDB);
			System.out.println("In Dao  updateOtherBillQuantity Method UpdateTaxAmountDB :- "+UpdateTaxAmountDB);
			System.out.println("In Dao  updateOtherBillQuantity Method UpdateTaxAmtAfterDiscountDB :- "+UpdateTaxAmtAfterDiscountDB);
			System.out.println("In Dao  updateOtherBillQuantity Method UpdateTotalperItemDB :- "+UpdateTotalperItemDB);
			//System.out.println("In Dao  updateOtherBillQuantity Method UpdateTotalAmtDB :- "+UpdateTotalAmtDB);
			//System.out.println("In Dao  updateOtherBillQuantity Method UpdateGrossAmountDB :- "+UpdateGrossAmountDB);
			
			OtherBill updateOthrerBill = (OtherBill) session.get(OtherBill.class, new Long(pkBillId));
			
			updateOthrerBill.setQuantity(updatequnty);
			//updateOthrerBill.setTotalperItem(Double.parseDouble(totalAmt));
			updateOthrerBill.setDiscount(UpdateDiscountDB);
			updateOthrerBill.setTaxAmount(UpdateTaxAmountDB);
			updateOthrerBill.setTaxAmtAfterDiscount(UpdateTaxAmtAfterDiscountDB);
			updateOthrerBill.setTotalperItem(UpdateTotalperItemDB);
			//updateOthrerBill.setTotalAmt(UpdateTotalAmtDB);
			//updateOthrerBill.setGrossamt(UpdateGrossAmountDB);
			
			session.saveOrUpdate(updateOthrerBill);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	
	public void updateOtherBillGrossTotal(String billNoToUpdateGrossTotal, String returnGrossTotalToUpdateGrossTotal, String shopIdUpdateGrossTotal)
	{
		System.out.println("In Dao  updateOtherBillGrossTotal Method pkBillId :-"+billNoToUpdateGrossTotal);
		System.out.println("In Dao  updateOtherBillGrossTotal Method returnGrossTotal :-"+returnGrossTotalToUpdateGrossTotal);
		System.out.println("In Dao  updateOtherBillGrossTotal Method shopId :-"+shopIdUpdateGrossTotal);
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		Double pendingBalance = 0.0;
		
		OtherBill hibernate = new OtherBill();
		SaleReturnDao dao = new SaleReturnDao();
		hibernate = getOtherBillGrossTotalListByBillNo(billNoToUpdateGrossTotal, shopIdUpdateGrossTotal);
		
		String  billNoDB = hibernate.getBillNo();
		Double totalAmtDB = hibernate.getTotalAmt();
		Double grossAmountDB = hibernate.getGrossamt();
		
		//updates data
		Double UpdateTotalAmtDB = (totalAmtDB - Double.parseDouble(returnGrossTotalToUpdateGrossTotal));
		Double UpdateGrossAmountDB = (grossAmountDB - Double.parseDouble(returnGrossTotalToUpdateGrossTotal));
		
		System.out.println("In Dao  updateOtherBillGrossTotal Method UpdateTotalAmtDB :-"+UpdateTotalAmtDB);
		System.out.println("In Dao  updateOtherBillGrossTotal Method UpdateGrossAmountDB :-"+UpdateGrossAmountDB);
		
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			Query query = session.createSQLQuery("update otherbill set TotalAmount = '"+UpdateTotalAmtDB+"', GrossTotal = '"+UpdateGrossAmountDB+"'  where BillNo = '"+billNoToUpdateGrossTotal+"' AND fkShopId = '"+shopIdUpdateGrossTotal+"'");
			query.executeUpdate();
			transaction.commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	public OtherBill getOtherBillGrossTotalListByBillNo(String billNoToUpdateGrossTotal, String shopIdUpdateGrossTotal)
	{
		HibernateUtility hbu = null;
		Session session = null;
		//Transaction transaction = null;
		List<OtherBill> billList = null;
		
		try 
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			//Query query = session.createSQLQuery("SELECT bill_number_genrator_pk, bill_no_countor FROM bill_number_genrator_details ORDER BY BillNo desc LIMIT 1");
			
			Query query = session.createSQLQuery("SELECT BillNo, TotalAmount, GrossTotal FROM otherbill WHERE BillNo = '"+billNoToUpdateGrossTotal+"' AND fkShopId ='"+shopIdUpdateGrossTotal+"'");
			//query.setParameter("BillNoToUpdateGrossTotal", billNoToUpdateGrossTotal);
			//query.setParameter("ShopIdUpdateGrossTotal", shopIdUpdateGrossTotal);
			
			List<Object[]> list = query.list();
			System.out.println("IN METHOD getOtherBillGrossTotalListByBillNoNew List Size :-"+list.size());
			//billList = new ArrayList<OtherBill>(0);
			
			for(Object[] objects : list)
			{
				OtherBill bean = new OtherBill();
				
				bean.setBillNo(objects[0].toString());
				bean.setTotalAmt(Double.parseDouble(objects[1].toString()));
				bean.setGrossamt(Double.parseDouble(objects[2].toString()));
				System.out.println("IN METHOD getOtherBillGrossTotalListByBillNoNew Last BilNo : "+bean.getBillNo());
				System.out.println("IN METHOD getOtherBillGrossTotalListByBillNoNew Last TotalAmt : "+bean.getTotalAmt());
				System.out.println("IN METHOD getOtherBillGrossTotalListByBillNoNew Last GrossAmount : "+bean.getGrossamt());
				
				//billList.add(bean);
				return bean;
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception in getLastResourceBillNo :-"+e);
		}
		return null;
	}

	public void updateCreditCustomerBillQuantity(Long pkBillId, String editQuantity, String discount, String taxAmount, String returnTotalAmt, Double pending_bill_payment, String returnGrossTotal, String shopId)
	{
		System.out.println("In Dao  updateCreditCustomerBillQuantity Method pkBillId :-"+pkBillId);
		System.out.println("In Dao  updateCreditCustomerBillQuantity Method editQuantity :-"+editQuantity);
		System.out.println("In Dao  updateCreditCustomerBillQuantity Method discount :-"+discount);
		System.out.println("In Dao  updateCreditCustomerBillQuantity Method taxAmount :-"+taxAmount);
		System.out.println("In Dao  updateCreditCustomerBillQuantity Method returnTotalAmt :-"+returnTotalAmt);
		System.out.println("In Dao  updateCreditCustomerBillQuantity Method returnGrossTotal :-"+returnGrossTotal);
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			org.hibernate.Query query = session.createQuery("from CreditCustomerBill where pkCreditBillId = :pkCreditBillId");
			query.setParameter("pkCreditBillId", pkBillId);

			CreditCustomerBill uniqueResult = (CreditCustomerBill) query.uniqueResult();
			
			Double quant = uniqueResult.getQuantity();
			Double discountDB = uniqueResult.getDiscount();
			Double taxAmountDB = uniqueResult.getTaxAmount();
			Double taxAmtAfterDiscountDB = uniqueResult.getTaxAmtAfterDiscount();
			Double totalperItemDB = uniqueResult.getTotalperItem();
			//Double totalAmtDB = uniqueResult.getTotalAmt();
			//Double grossAmountDB = uniqueResult.getGrossamt();
			//Double pendingBillPaymentDB = uniqueResult.getPendingBillPayment();
			
			//updates data
			Double updatequnty = (quant - Long.parseLong(editQuantity));
			Double UpdateDiscountDB = (discountDB - Double.parseDouble(discount));
			Double UpdateTaxAmountDB = (taxAmountDB - Double.parseDouble(taxAmount));
			Double UpdateTaxAmtAfterDiscountDB = (taxAmtAfterDiscountDB - Double.parseDouble(taxAmount));
			Double UpdateTotalperItemDB = (totalperItemDB - Double.parseDouble(returnTotalAmt));
			//Double UpdateTotalAmtDB = (totalAmtDB - Double.parseDouble(returnTotalAmt));
			//Double UpdateGrossAmountDB = (grossAmountDB - Double.parseDouble(returnTotalAmt));
			//Double UpdatePendingBillPaymentDB = (pendingBillPaymentDB - Double.parseDouble(returnTotalAmt));
			
			CreditCustomerBill updateCreditCustomerBill = (CreditCustomerBill) session.get(CreditCustomerBill.class, new Long(pkBillId));

			updateCreditCustomerBill.setQuantity(updatequnty);
			updateCreditCustomerBill.setDiscount(UpdateDiscountDB);
			updateCreditCustomerBill.setTaxAmount(UpdateTaxAmountDB);
			updateCreditCustomerBill.setTaxAmtAfterDiscount(UpdateTaxAmtAfterDiscountDB);
			updateCreditCustomerBill.setTotalperItem(UpdateTotalperItemDB);
			//updateCreditCustomerBill.setTotalAmt(UpdateTotalAmtDB);
			//updateCreditCustomerBill.setGrossamt(UpdateGrossAmountDB);
			//updateCreditCustomerBill.setPendingBillPayment(UpdatePendingBillPaymentDB);
			
			System.out.println("BEFORE UPDATE CREDITCUSTOMER BILL");
			session.saveOrUpdate(updateCreditCustomerBill);
			System.out.println("AFTER UPDATE CREDITCUSTOMER BILL");
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}

	}
	
	
	public void updateCreditCustomerBillGrossTotal(String billNoToUpdateGrossTotal, String returnGrossTotalToUpdateGrossTotal, String shopIdUpdateGrossTotal)
	{
		System.out.println("In Dao  updateOtherBillGrossTotal Method pkBillId :-"+billNoToUpdateGrossTotal);
		System.out.println("In Dao  updateOtherBillGrossTotal Method returnGrossTotal :-"+returnGrossTotalToUpdateGrossTotal);
		System.out.println("In Dao  updateOtherBillGrossTotal Method shopId :-"+shopIdUpdateGrossTotal);
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		Double pendingBalance = 0.0;
		
		CreditCustomerBill hibernate = new CreditCustomerBill();
		SaleReturnDao dao = new SaleReturnDao();
		hibernate = getCustomerBillGrossTotalListByBillNo(billNoToUpdateGrossTotal, shopIdUpdateGrossTotal);
		
		Long  billNo = hibernate.getBillNo();
		Double totalAmtDB = hibernate.getTotalAmt();
		Double grossAmountDB = hibernate.getGrossamt();
		
		//updates data
		Double UpdateTotalAmtDB = (totalAmtDB - Double.parseDouble(returnGrossTotalToUpdateGrossTotal));
		Double UpdateGrossAmountDB = (grossAmountDB - Double.parseDouble(returnGrossTotalToUpdateGrossTotal));
		
		System.out.println("In Dao  updateOtherBillGrossTotal Method UpdateTotalAmtDB :-"+UpdateTotalAmtDB);
		System.out.println("In Dao  updateOtherBillGrossTotal Method UpdateGrossAmountDB :-"+UpdateGrossAmountDB);
		
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			Query query = session.createSQLQuery("update creditcustomerbill set TotalAmount = '"+UpdateTotalAmtDB+"', GrossTotal = '"+UpdateGrossAmountDB+"'  where BillNo = '"+billNoToUpdateGrossTotal+"' AND fkShopId = '"+shopIdUpdateGrossTotal+"'");
			query.executeUpdate();
			transaction.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	public CreditCustomerBill getCustomerBillGrossTotalListByBillNo(String billNoToUpdateGrossTotal, String shopIdUpdateGrossTotal)
	{
		HibernateUtility hbu = null;
		Session session = null;
		//Transaction transaction = null;
		List<CreditCustomerBill> billList = null;
		
		try 
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			//Query query = session.createSQLQuery("SELECT bill_number_genrator_pk, bill_no_countor FROM bill_number_genrator_details ORDER BY BillNo desc LIMIT 1");
			
			Query query = session.createSQLQuery("SELECT BillNo, TotalAmount, GrossTotal FROM creditcustomerbill WHERE BillNo = '"+billNoToUpdateGrossTotal+"' AND fkShopId ='"+shopIdUpdateGrossTotal+"'");
			//query.setParameter("BillNoToUpdateGrossTotal", billNoToUpdateGrossTotal);
			//query.setParameter("ShopIdUpdateGrossTotal", shopIdUpdateGrossTotal);
			
			List<Object[]> list = query.list();
			System.out.println("IN METHOD getCustomerBillGrossTotalListByBillNo List Size :-"+list.size());
			//billList = new ArrayList<CreditCustomerBill>(0);
			
			for(Object[] objects : list)
			{
				CreditCustomerBill bean = new CreditCustomerBill();
				
				bean.setBillNo(Long.parseLong(objects[0].toString()));
				bean.setTotalAmt(Double.parseDouble(objects[1].toString()));
				bean.setGrossamt(Double.parseDouble(objects[2].toString()));
				System.out.println("IN METHOD getCustomerBillGrossTotalListByBillNo Last BilNo : "+bean.getBillNo());
				System.out.println("IN METHOD getCustomerBillGrossTotalListByBillNo Last TotalAmt : "+bean.getTotalAmt());
				System.out.println("IN METHOD getCustomerBillGrossTotalListByBillNo Last GrossAmount : "+bean.getGrossamt());
				
				//billList.add(bean);
				return bean;
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("Exception in getLastResourceBillNo :-"+e);
		}
		return null;
	}
	
	public void updateCreditCustomerBillGrossTotalOld(String billNoToUpdateGrossTotal, String returnGrossTotalToUpdateGrossTotal, String shopIdUpdateGrossTotal)
	{
		System.out.println("In Dao  updateCreditCustomerBillQuantity Method pkBillId :-"+billNoToUpdateGrossTotal);
		System.out.println("In Dao  updateCreditCustomerBillQuantity Method returnGrossTotal :-"+returnGrossTotalToUpdateGrossTotal);
		System.out.println("In Dao  updateCreditCustomerBillQuantity Method shopId :-"+shopIdUpdateGrossTotal);
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		
		SaleReturnDao dao = new SaleReturnDao();
		List stkList2 = dao.getCustomerBillGrossTotalListByBillNoOld(billNoToUpdateGrossTotal, shopIdUpdateGrossTotal);
		
		for (int j = 0; j < stkList2.size(); j++)
		{
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				transaction = session.beginTransaction();
				
				CreditCustomerBill uniqueResult = (CreditCustomerBill) stkList2.get(j);
				
				Long pkCreditBillIdDB = uniqueResult.getPkCreditBillId();
				Double totalAmtDB = uniqueResult.getTotalAmt();
				Double grossAmountDB = uniqueResult.getGrossamt();
				//Double pendingBillPaymentDB = uniqueResult.getPendingBillPayment();
				
				//updates data
				Double UpdateTotalAmtDB = (totalAmtDB - Double.parseDouble(returnGrossTotalToUpdateGrossTotal));
				Double UpdateGrossAmountDB = (grossAmountDB - Double.parseDouble(returnGrossTotalToUpdateGrossTotal));
				//Double UpdatePendingBillPaymentDB = (pendingBillPaymentDB - Double.parseDouble(returnGrossTotal));
				
				CreditCustomerBill updateCreditCustomerBill = (CreditCustomerBill) session.get(CreditCustomerBill.class, new Long(pkCreditBillIdDB));
				
				updateCreditCustomerBill.setTotalAmt(UpdateTotalAmtDB);
				updateCreditCustomerBill.setGrossamt(UpdateGrossAmountDB);
				//updateCreditCustomerBill.setPendingBillPayment(UpdatePendingBillPaymentDB);
				
				System.out.println("BEFORE UPDATE CREDITCUSTOMER BILL");
				session.saveOrUpdate(updateCreditCustomerBill);
				System.out.println("AFTER UPDATE CREDITCUSTOMER BILL");
				transaction.commit();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (session != null) {
					session.close();
				}
			}
		}
	}
	
	public List getCustomerBillGrossTotalListByBillNoOld(String billNoToUpdateGrossTotal, String fkShopId)
	{
		com.smt.utility.HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createQuery("from Stock");
			
			org.hibernate.Query query = session.createQuery("FROM CreditCustomerBill WHERE BillNo = :BillNoToUpdateGrossTotal");
			query.setParameter("BillNoToUpdateGrossTotal", billNoToUpdateGrossTotal);
			
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

	public void updateBarcodeQuantity(Long barcodeNo, String editQuantity)
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

			Query query = session.createQuery("from GoodReceive where barcodeNo=:barcodeNo");
			query.setParameter("barcodeNo", barcodeNo);

			GoodReceive uniqueResult = (GoodReceive) query.uniqueResult();
			
			Double quant = uniqueResult.getQuantity();
			Double soldQuantity = uniqueResult.getSoldQuantity();
			Long pkGoodReceiveId = uniqueResult.getPkGoodRecId();
			Double updatequnty = (Double) (quant + Double.parseDouble(editQuantity));
			Double updateSoldQuantity = soldQuantity - Double.parseDouble(editQuantity);
			
			
			GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(pkGoodReceiveId));

			updateStock.setQuantity(updatequnty);
			updateStock.setSoldQuantity(updateSoldQuantity);
			session.saveOrUpdate(updateStock);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null)
			{
				session.close();
			}
		}
	}	
		
	public List gettPendingBalance(String fkCreditCustId, String shopId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<Object> lastBillPending = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT ccb.fkCrediCustId, ccb.pending_bill_payment FROM creditcustomerbill ccb where ccb.fkCrediCustId = "+fkCreditCustId+" AND ccb.fkShopId = "+shopId+" ORDER BY ccb.fkCrediCustId DESC LIMIT 1;");
			lastBillPending = query.list();	
			
			/*			
				System.out.println("lastBillPending SIZE ====>======>====> "+lastBillPending.size());
				if(lastBillPending.isEmpty())
				{
					lastBillPending.add(0.0);
				}
				else if(lastBillPending.get(0) == null)
				{
					lastBillPending.add(0.0);
				}
				System.out.println("LAST lastBillPending ====>======>====> "+lastBillPending.get(0));			
			*/
			
		} catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
		
		/*		
			System.out.println("LAST lastBillPending ====>======>====> "+lastBillPending.get(0).doubleValue());
			BigDecimal bd1 = BigDecimal.valueOf(lastBillPending.get(0).doubleValue());
			Double lastPendingBill = bd1.doubleValue();
			return (lastBillPending.get(0).doubleValue());
		*/	
		
		return lastBillPending;
	}
	
	public void settPendingBalance(Double totalPendingbalance, String fkCreditCustId, String shopId)
	{
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		Double pendingBalance = 0.0;
		
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			Query query = session.createSQLQuery("update creditcustomerbill set pending_bill_payment = "+totalPendingbalance+" where fkCrediCustId = "+fkCreditCustId+" AND fkShopId = "+shopId);
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
				session.close();
			}
		}
	}
	
	public Double gettTotalBillAmount(String fkCreditCustId, String shopId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<Double> lastBillPending = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT SUM(ccb.totalperitem) FROM creditcustomerbill ccb where ccb.fkCrediCustId = "+fkCreditCustId+" AND ccb.fkShopId = "+shopId+" AND ccb.totalperitem > 0");
			lastBillPending = query.list();
			
			if(lastBillPending.isEmpty())
			{
				lastBillPending.add(0.0);
			}
			else if(lastBillPending.get(0) == null)
			{
				lastBillPending.add(0.0);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
		/*System.out.println("LAST lastBillPending ====>======>====> "+lastBillPending.get(0).doubleValue());
		BigDecimal bd1 = BigDecimal.valueOf(lastBillPending.get(0).doubleValue());
		Double lastPendingBill = bd1.doubleValue();*/
		return (lastBillPending.get(0).doubleValue());	
	}
	
	public void regCreditCustomerReturnPayment(Double grossTotal, Double lastPendingBalNEW, Double returnAmt, String fkRootCustId, String discount, String reasonForSReturn3, String shopId) 
	{
		// TODO Auto-generated method stub
		try
		{
			CustomerPaymentBean bean = new CustomerPaymentBean();
	
			bean.setCustomer(Long.parseLong(fkRootCustId));
	
			//bean.setBillNo(billNo);
	
			bean.setPersonname("At Time Of Bill");
	
			bean.setPaymentMode("N/A");
	
			bean.setChequeNum("N/A");
	
			bean.setNameOnCheck("N/A");
	
			bean.setCardNum(null);
	
			bean.setBankName("N/A");
	
			bean.setAccNum(null);
	
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
			Date dateobj = new Date();
	
			bean.setInsertDate(dateobj);
	
			bean.setTotalAmount(grossTotal);
	
			bean.setBalance(lastPendingBalNEW);
	
			bean.setPaymentType("debit");
	
			bean.setCredit(0.0);
			
			bean.setReturnAmount(returnAmt);
			
			if(reasonForSReturn3 == null || reasonForSReturn3.equalsIgnoreCase(""))
			{
				bean.setDescription("Sale Return");
			}
			else
			{
				bean.setDescription(reasonForSReturn3);
			}
			
			bean.setFkShopId(Long.parseLong(shopId));
			
			CustomerPaymentDao dao = new CustomerPaymentDao();
			dao.regCustomerPayment(bean);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
	
	
	public List<SaleReturn> getAllTransactionDetails(String srTransactionId, String fkRootCustId, String shopId)
	{
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReturn> itemlist = null;
		String sqlQuery = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			if(fkRootCustId == null)
			{
				sqlQuery = "SELECT sr.PkSellReturnId, sr.transactionId, SUM(sr.Return_Total) FROM salereturn sr WHERE sr.transactionId = "+srTransactionId+" AND sr.fkShopId = "+shopId+" AND fkCreditCustId = 0 AND redeemedForBillNo=0 GROUP BY sr.transactionId";
			}
			else
			{
				sqlQuery = "SELECT sr.PkSellReturnId, sr.transactionId, SUM(sr.Return_Total) FROM salereturn sr WHERE sr.transactionId = "+srTransactionId+" AND sr.fkShopId = "+shopId+" AND fkCreditCustId = "+fkRootCustId+" AND redeemedForBillNo=0 GROUP BY sr.transactionId";
			}

			Query query = session.createSQLQuery(sqlQuery);
			List<Object[]> list = query.list();
			SaleReturn bean = new SaleReturn();
			itemlist = new ArrayList<SaleReturn>(0);
			for (Object[] objects : list)
			{
				bean.setPkBillId(Long.parseLong(objects[0].toString()));
				bean.setTransactionId(Long.parseLong(objects[1].toString()));
				bean.setReturnTotal(Double.parseDouble(objects[2].toString()));
				itemlist.add(bean);
			}
			
			System.out.println("pk id ===> "+bean.getPkBillId());
			System.out.println("transaction id ===> "+bean.getTransactionId());
			System.out.println("total return amt id ===> "+bean.getReturnTotal());
			
		} catch (RuntimeException e) {
			e.printStackTrace();
			//Log.error("Error in getAllItemDetails(String key)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return itemlist;
	}	
	
	
	
	
	public List getAllTransactionId()
	{
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from SaleReturn");
			list = query.list();
		}
		catch (RuntimeException e)
		{
			e.printStackTrace();
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	
	
	public void updateBarcodeQuantity1(Long barcodeNo, String editQuantity)
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

			org.hibernate.Query query = session.createQuery("from GoodReceive where barcodeNo=:barcodeNo");
			query.setParameter("barcodeNo", barcodeNo);

			GoodReceive uniqueResult = (GoodReceive) query.uniqueResult();
			Double quant = uniqueResult.getQuantity();
			Double soldQuantity = uniqueResult.getSoldQuantity();
			Long pkGoodReceiveId = uniqueResult.getPkGoodRecId();
			Double updatequnty = (Double) (quant + Double.parseDouble(editQuantity));
			Double updateSoldQuantity = soldQuantity - Double.parseDouble(editQuantity);
			GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(pkGoodReceiveId));

			updateStock.setQuantity(updatequnty);
			updateStock.setSoldQuantity(updateSoldQuantity);
			session.saveOrUpdate(updateStock);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	public List getAllbilling(String shopId,String BillNo)
	{
		System.out.println("fkshopIdTx - "+shopId+" , "+BillNo);
		HibernateUtility hbu=null;
		Session session=null;
		List list=null;
		try{
		 hbu = HibernateUtility.getInstance();
		 session = hbu.getHibernateSession();
		 Query query = session.createQuery("from OtherBill where fkShopId ='"+shopId+"' AND billNo = '"+BillNo+"'");
		 list = query.list();
		 System.out.println("fertilier query list size -  "+query.list().size());
		}
			catch(Exception e){	
				e.printStackTrace();
		}
			finally
			{
					if(session!=null){
					hbu.closeSession(session);
				}
			}
		
	return list;
	}
	
	
	
	public void updateQuantityforBillCancel(Long pkBillId, Double quantity, Double peritemprice, Double cashAmount, Double cardAmount, Double upiCashAmount, Double upiAmount, Double grosstotal) {
		// TODO Auto-generated method stub

		
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
				String Billcancel="Bill_cancel";
			org.hibernate.Query query = session.createQuery("from OtherBill where pkBillId = :pkBillId ");
			query.setParameter("pkBillId", pkBillId);

			OtherBill uniqueResult = (OtherBill) query.uniqueResult();
			Double quant =  uniqueResult.getQuantity();
			Double grossAmount=uniqueResult.getGrossamt();
			Double totalperitem=uniqueResult.getTotalperItem();
			Double cashAm=uniqueResult.getCashCard_cashAmount();
			Double cardAm=uniqueResult.getCashCard_cardAmount();
			Double upicash=uniqueResult.getCashupi_cashAmount();
			Double upi=uniqueResult.getCashupi_upiAmount();
			
			Double updatequnty = (quant - (quantity));
			
			Double updategross = (grossAmount - (grosstotal));
			Double updateperitem = (totalperitem - (peritemprice));
			Double updatecash = (cashAm - (cashAmount));
			Double updatecard = (cardAm - (cardAmount));
			Double updateupicash = (upicash - (upiCashAmount));
			Double updateupi = (upi - (upiAmount));
			
			
				System.out.println("update Quantity in sale retiurn dao"+updatequnty);

			OtherBill updateStock = (OtherBill) session.get(OtherBill.class, new Long(pkBillId));

			updateStock.setQuantity(updatequnty);
			updateStock.setTotalperItem(updateperitem);
			updateStock.setGrossamt(updategross);
			updateStock.setCashCard_cardAmount(updatecard);
			updateStock.setCashCard_cashAmount(updatecash);
			updateStock.setCashupi_cashAmount(updateupicash);
			updateStock.setCashupi_upiAmount(updateupi);
			
			updateStock.setBillCancel(Billcancel);
			
			session.saveOrUpdate(updateStock);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}

	}
	
	public void updateBarcodeQuantity11(Long barcodeNo, Double quantity)
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

			org.hibernate.Query query = session.createQuery("from GoodReceive where barcodeNo=:barcodeNo");
			query.setParameter("barcodeNo", barcodeNo);

			GoodReceive uniqueResult = (GoodReceive) query.uniqueResult();
			Double quant = uniqueResult.getQuantity();
			Double soldQuantity = uniqueResult.getSoldQuantity();
			Long pkGoodReceiveId = uniqueResult.getPkGoodRecId();
			Double updatequnty = (Double) (quant + (quantity));
			Double updateSoldQuantity = soldQuantity - (quantity);
			GoodReceive updateStock = (GoodReceive) session.get(GoodReceive.class, new Long(pkGoodReceiveId));

			updateStock.setQuantity(updatequnty);
			updateStock.setSoldQuantity(updateSoldQuantity);
			session.saveOrUpdate(updateStock);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null)
			{
				session.close();
			}
		}
	}
	
	public List getAllBillNoListOld1()
	{System.out.println("In Dao getAllBillNoList 0 ");
		HibernateUtility hbu=null;
		Session session=null;
		
		List<OtherBill> itemlist=null;
		List<Object[]> list = null;
		System.out.println("In Dao getAllBillNoList 2 ");
		try
		{System.out.println("In Dao getAllBillNoList 3 ");
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query=session.createQuery("select invoiceNo , toPay  from ProfarmaDetail  group by invoiceNo order by invoiceNo DESC");
			//Query query=session.createSQLQuery("select pk_credit_cust_detail_id, first_name, middle_name, last_name from kisandetails where status='active';");
			System.out.println("In Dao getAllBillNoList 4 ");
			//Query query = session.createSQLQuery("SELECT pkOtherBillId, ContactNo FROM otherbill WHERE ContactNo>0 GROUP BY ContactNo");
			
			Query query = session.createSQLQuery("SELECT pkOtherBillId, ContactNo FROM otherbill WHERE ContactNo>0");
			
			System.out.println("In Dao getAllBillNoList 5 ");
			
			list = query.list();
			int listSize = list.size();
			System.out.println("In Dao listSize :- "+listSize);
			itemlist = new ArrayList<OtherBill>(0);
			System.out.println("In Dao getAllBillNoList 6 ");
			for (Object[] o : list) {
				OtherBill bean = new OtherBill();
				System.out.println("In Dao getAllBillNoList 7 ");
				bean.setPkBillId(Long.parseLong(o[0].toString()));
				bean.setContactNo(Long.parseLong(o[1].toString()));
				System.out.println("getPkBillId :- "+bean.getPkBillId());
				System.out.println("getContactNo :- "+bean.getContactNo());
				System.out.println("In Dao getAllBillNoList 8 ");
				itemlist.add(bean);
			}
		 } catch(RuntimeException  e) {
			e.printStackTrace();
		 } finally {
			 if(session!=null){
				 hbu.closeSession(session);
			}
		}
		System.out.println("In Dao getAllBillNoList 9 ");
		return itemlist;
	}
	
	public List<OtherBill> getAllBillNoListOld2(HttpServletRequest request, HttpServletResponse response)
	{
		//HttpSession session1 = request.getSession();
		//String shopId = (String)session1.getAttribute("shopId");
		//Long fkShopId = Long.parseLong(shopId);
		
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<OtherBill> list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//query = session.createQuery("from OtherBill");
			query = session.createSQLQuery("SELECT pkOtherBillId, ContactNo FROM otherbill WHERE ContactNo > 0 ");
		//	query.setParameter("fkShopId", fkShopId);
			list = query.list();
			int listSize = list.size();
			System.out.println("In Dao listSize :- "+listSize);
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}
	
	public List getAllBillNoList(HttpServletRequest request, HttpServletResponse response)
	{
		HibernateUtility hbu=null;
		Session session=null;
		List<OtherBill> saleList=null;
		
		try{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query=session.createSQLQuery("SELECT pkOtherBillId, mobile_No, ItemName FROM otherbill WHERE mobile_No>0 GROUP BY BillNo;");
			
			List<Object[]> list = query.list();
			int listSize = list.size();
			//System.out.println("In Dao listSize :- "+listSize);
			saleList= new ArrayList<OtherBill>(0);
			for (Object[] object : list) {
				String mobileNoStr = "0";
				mobileNoStr = object[1].toString();
				//System.out.println("In Dao mobileNoStr :- "+mobileNoStr);
				int mobileNoSize = mobileNoStr.length();
				//System.out.println("In Dao mobileNoSize :- "+mobileNoSize);
				if(mobileNoSize >= 10)
				{
					OtherBill bean = new OtherBill();
					bean.setPkBillId(Long.parseLong(object[0].toString()));
					bean.setContactNo(Long.parseLong(object[1].toString()));
					//System.out.println("getPkBillId :- "+bean.getPkBillId());
					//System.out.println("getContactNo :- "+bean.getContactNo());
					
					saleList.add(bean);
				}
			}
		} catch (RuntimeException e){
			e.printStackTrace();
		} finally {
			if(session!=null){
				hbu.closeSession(session);
			}
		}
		return saleList;
	}
	
}
