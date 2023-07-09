package com.smt.helper;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillBean;
import com.smt.bean.CustomerBean;
import com.smt.bean.GoodreciveBillBean;
import com.smt.bean.SaleReturnBean;
import com.smt.bean.allTransactionId;
import com.smt.dao.CustomerDetailsDao;
import com.smt.dao.CustomerOrderDao;
import com.smt.dao.CustomerPaymentDao;
import com.smt.dao.OtherBillDao;
import com.smt.dao.SaleReturnDao;
import com.smt.dao.StockDao;
import com.smt.hibernate.EmployeeDetailsBean;
import com.smt.hibernate.OtherBill;
import com.smt.hibernate.SaleReturn;
import com.smt.hibernate.Stock;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class SaleReturnHelper {

	public void returnSale(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession sessionv = request.getSession(true);
		String type2 = "";
        String name2 = "";
        Long uid = null ;
        if (sessionv != null)
        {
	         if (sessionv.getAttribute("user") != null)
	         {
	        	 name2 = (String) sessionv.getAttribute("user");
	          	 HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
	        	 query1.setParameter("name2", name2);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
			 }
	         else
	         {
	        	type2 = request.getParameter("userType");
	        	name2 = request.getParameter("userName");
	        	
	        	HibernateUtility hbu1=HibernateUtility.getInstance();
	        	 Session session2=hbu1.getHibernateSession();
	        	 org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
	        	 query1.setParameter("name2", name2);
	        	 UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
	        	 type2 = userDetail1.getTypeId();
	        	 uid = userDetail1.getPkUserId();
	         }
        }
		
		Long transactionIdSr = 1l;
		String creditCustomer1 = "";
		
		CustomerDetailsDao cdd = new CustomerDetailsDao();
		List trList = cdd.getLastTransactionIdForSaleReturn();
		
		for (int i = 0; i < trList.size(); i++)
		{
			allTransactionId st = (allTransactionId) trList.get(i);
			transactionIdSr = st.getSaleReturnTransactoinId();
			transactionIdSr++;
		}
		
		SaleReturn cust = new SaleReturn();

		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111=====" + count.toString());
		
		//Variable to Update Grross Total
		String shopIdUpdateGrossTotal = (String) sessionv.getAttribute("shopId");
		String billNoToUpdateGrossTotal = request.getParameter("billNo");
		String returnGrossTotalToUpdateGrossTotal = request.getParameter("returnGrossTotal");
		
		System.out.println("shopIdUpdateGrossTotal :- "+shopIdUpdateGrossTotal);
		System.out.println("billNoToUpdateGrossTotal :- "+billNoToUpdateGrossTotal);
		System.out.println("returnGrossTotalToUpdateGrossTotal :- "+returnGrossTotalToUpdateGrossTotal);

		for (int i = 0; i < count; i++)
		{				
			String editQuantity = request.getParameter("editQuantity" + i);
			
			Double checkReturnQty = Double.parseDouble(editQuantity);
			if(checkReturnQty > 0)
			{
				String billNo = request.getParameter("billNo");
				creditCustomer1 = request.getParameter("creditCustomer1");
				Long shopId = Long.parseLong(request.getParameter("shopId" + i));
				Long pkBillId = Long.parseLong(request.getParameter("pkBillId" + i));
				Long fkgoodreciveid = Long.parseLong(request.getParameter("fkgoodreciveid" + i));
				String carNo = request.getParameter("carNo");
				String contactNo = request.getParameter("contactNo" + i);
				String barcodeNo = request.getParameter("barcodeNo" + i);
				long productId = Long.parseLong(request.getParameter("productId"+i));
				String itemName = request.getParameter("itemName" + i);
				long catId = Long.parseLong(request.getParameter("catId"+i));
				String categoryName = request.getParameter("categoryName" + i);
				long subCatId = Long.parseLong(request.getParameter("subCatId"+i));
				String quantity = request.getParameter("quantity" + i);
				//editQuantity/returnQuantity is already get above before if condition use that One
				//String editQuantity = request.getParameter("editQuantity" + i);
				String salePrice = request.getParameter("salePrice" + i);
				String discountPercent = request.getParameter("discountPercent" + i);
				String discount = request.getParameter("discount" + i);
				String gst = request.getParameter("gst"+i);
				String iGst = request.getParameter("iGst"+i);
				String taxAmount = request.getParameter("taxAmt"+i);
				String totalAmt = request.getParameter("totalAmt" + i);
				String returnTotalAmt = request.getParameter("returnTotalAmt" + i);
				String finalTotalPerProduct = request.getParameter("finalTotalPerProduct" + i);
				String grossamt = request.getParameter("grossamt" + i);
				String returnGrossTotal = request.getParameter("returnGrossTotal");
				String grossTotalAmount = request.getParameter("grossTotalAmount");
				
				System.out.println("In Helper Barcode No :- " + barcodeNo);
				System.out.println("product id in helper:--"+productId);
				System.out.println("In Helper quantity" + quantity);
				System.out.println("In Helper Old Sale quantity"+quantity);
				System.out.println("In Helper Sale Return quantity"+editQuantity);
				System.out.println("In Helper returnTotalAmt :- "+returnTotalAmt);
				System.out.println("In Helper returnGrossTotal :- "+returnGrossTotal);
				System.out.println("In Helper grossamt :- "+grossamt);
				
				cust.setType("Tax Invoice");
				cust.setFkCreditCustId(0l);
				//cust.setCustomerName(creditCustomer1);
				if (!"".equals(creditCustomer1)) {
					cust.setCustomerName(creditCustomer1);
				} else {
					cust.setCustomerName("N/A");
				}
				cust.setBillNo(billNo);
				cust.setFkShopId(shopId);
				cust.setTransactionId(transactionIdSr);
				String reasonForSReturn1 = request.getParameter("reasonForSReturn1");
				if(reasonForSReturn1 == null || reasonForSReturn1.equalsIgnoreCase("") || reasonForSReturn1 == " ")
				{
					String reasonForSReturn2 = request.getParameter("reasonForSReturn2");
					if(reasonForSReturn2 == null || reasonForSReturn2.equalsIgnoreCase("") || reasonForSReturn2 == " ")
					{
						cust.setReturnReason("Sale Return");
					} else {
						cust.setReturnReason(reasonForSReturn2);
					}		
				} else {
					cust.setReturnReason(reasonForSReturn1);
				}
				if (!"".equals(carNo))
				{
					cust.setCarNo(carNo);
				} else {
					cust.setCarNo("N/A");
				}
				if (contactNo == null) {
					cust.setContactNo(Long.parseLong("00"));
				} else {
					cust.setContactNo(Long.parseLong(contactNo));
				}
				cust.setBarcodeNo(Long.parseLong(barcodeNo));
				cust.setProductId(productId);
				cust.setItemName(itemName);
				cust.setCatId(catId);
				if (!"".equals(categoryName)) {
					cust.setCategoryName(categoryName);
				} else {
					cust.setCategoryName("N/A");
				}
				cust.setSubCatId(subCatId);
				
				Double afterReturnQuantity = Double.parseDouble(quantity) - Double.parseDouble(editQuantity);
				System.out.println("In Helper New Sale afterReturnQuantity :- "+afterReturnQuantity);
				
				cust.setQuantity(Double.parseDouble(quantity));
				cust.setEditQuantity(Double.parseDouble(editQuantity));
				cust.setAfterQuantity(afterReturnQuantity);
				cust.setSalePrice(Double.parseDouble(salePrice));
				cust.setDiscountPercent(Double.parseDouble(discountPercent));
				cust.setDiscount(Double.parseDouble(discount));
				cust.setGst(Double.parseDouble(gst));
				cust.setiGst(Double.parseDouble(iGst));
				cust.setTaxAmount(Double.parseDouble(taxAmount));
				cust.setTotalAmountPerItem(Double.parseDouble(returnTotalAmt));
				
				Double grossTotalBeforeSaleReturn = Double.parseDouble(quantity) * Double.parseDouble(finalTotalPerProduct);
				System.out.println("In Helper New Sale afterReturnQuantity :- "+afterReturnQuantity);

				cust.setTotalAmt(grossTotalBeforeSaleReturn);
				cust.setGrossamt(grossTotalBeforeSaleReturn);
				cust.setReturnTotal(Double.parseDouble(returnGrossTotal));
				
				cust.setRedeemedForBillNo(0l);
				
				String Date = request.getParameter("Date" + i);
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	
				Date adate = null;
				try {
					adate = format.parse(Date);
				} catch (ParseException e1) {
					e1.printStackTrace();
				}
				cust.setCurrent_date(adate);
				try
				{
					//DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
					Date dateobj = new Date();
					System.out.println(format.format(dateobj));
					String newDate = format.format(dateobj);
					Date today = format.parse(newDate);
					System.out.println(today);
					cust.setDate(today);
				} catch (Exception e) {
					System.out.println(e);
				}

				cust.setFkUserId(uid);
				cust.setUserType(type2);
				
				
				SaleReturnDao dao = new SaleReturnDao();
				dao.registerSaleReturn(cust);
				
				//update Barcode No Wise Stock
				Long barcodeNoLong = Long.parseLong(barcodeNo);
				Double editQuantityDouble = Double.parseDouble(editQuantity);
				Long shopIdLong = shopId; //Long.parseLong(shopId);
				dao.updateBarcodeNoWiseStockQuantitySaleReturn(barcodeNoLong, editQuantityDouble,shopIdLong);
				
				// update sellbill quantity minus
				SaleReturnDao good = new SaleReturnDao();
				good.updateOtherBillQuantity(pkBillId, editQuantity, discount, taxAmount, returnTotalAmt, totalAmt, returnGrossTotal);
				
				// update sellbill quantity minus
				Long barcodeNo1 = Long.parseLong(request.getParameter("barcodeNo" + i));
				SaleReturnDao good1 = new SaleReturnDao();
				if(barcodeNo1 > 0)
				{
					good1.updateBarcodeQuantity(barcodeNo1, editQuantity);
				}
	
				StockDao dao1 = new StockDao();
				List stkList2 = dao1.getAllStockEntry();
				
				for (int j = 0; j < stkList2.size(); j++)
				{
					//System.out.println(stkList2.toString());
					System.out.println("inside stock for loop");
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long fkProductId = st.getFkProductId();
					//Long fkCatId = st.getFkCategoryId();
					//Long fkShopId = st.getFkShopId();
					
					/* if (fkProductId == productId || fkCatId == catId || fkShopId == shopId) */
					
					if (ItemId.equals(itemName) && cat.equals(categoryName)&& fkProductId.equals(productId))
					{
						System.out.println("inside if of stock");
						Long PkItemId = st.getPkStockId();
						Double qunty = st.getQuantity();
						System.out.println("for update stock quantity block");
						Double updatequnty = (Double) (qunty + Double.parseDouble(editQuantity));
	
						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();
	
						Date date = new Date();
	
						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);
						System.out.println("update stock"+updatequnty);
						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}
			}
		}
		
		SaleReturnDao good = new SaleReturnDao();
		good.updateOtherBillGrossTotal(billNoToUpdateGrossTotal, returnGrossTotalToUpdateGrossTotal, shopIdUpdateGrossTotal);
		
		HttpSession sessionHttp = request.getSession();
		sessionHttp.setAttribute("transactionIdSr", transactionIdSr);
		sessionHttp.setAttribute("creditCustomer1", creditCustomer1);
	}
	
	//sal Return By Mobile No
	public void salReturnByMobNo(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession sessionv = request.getSession(true);
		String type2 = "";
		String name2 = "";
		Long uid = null ;
		
		if (sessionv != null)
		{
			if (sessionv.getAttribute("user") != null)
			{
				name2 = (String) sessionv.getAttribute("user");
				HibernateUtility hbu1=HibernateUtility.getInstance();
				Session session2=hbu1.getHibernateSession();
				org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
				query1.setParameter("name2", name2);
				UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
				type2 = userDetail1.getTypeId();
				uid = userDetail1.getPkUserId();
			}
			else
			{
				type2 = request.getParameter("userType");
				name2 = request.getParameter("userName");
				
				HibernateUtility hbu1=HibernateUtility.getInstance();
				Session session2=hbu1.getHibernateSession();
				org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
				query1.setParameter("name2", name2);
				UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
				type2 = userDetail1.getTypeId();
				uid = userDetail1.getPkUserId();
			}
		}
		
		Long transactionIdSr = 1l;
		String creditCustomer1 = "";
		
		CustomerDetailsDao cdd = new CustomerDetailsDao();
		List trList = cdd.getLastTransactionIdForSaleReturn();
		
		for (int i = 0; i < trList.size(); i++)
		{
			allTransactionId st = (allTransactionId) trList.get(i);
			transactionIdSr = st.getSaleReturnTransactoinId();
			transactionIdSr++;
		}
		
		SaleReturn cust = new SaleReturn();
		
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111=====" + count.toString());
		
		//Variable to Update Grross Total
		String shopIdUpdateGrossTotal = (String) sessionv.getAttribute("shopId");
		String billNoToUpdateGrossTotal = request.getParameter("billNo");
		String returnGrossTotalToUpdateGrossTotal = request.getParameter("returnGrossTotal");
		
		System.out.println("shopIdUpdateGrossTotal :- "+shopIdUpdateGrossTotal);
		System.out.println("billNoToUpdateGrossTotal :- "+billNoToUpdateGrossTotal);
		System.out.println("returnGrossTotalToUpdateGrossTotal :- "+returnGrossTotalToUpdateGrossTotal);
		
		for (int i = 0; i < count; i++)
		{
			String editQuantity = request.getParameter("editQuantity" + i);
			
			Double checkReturnQty = Double.parseDouble(editQuantity);
			if(checkReturnQty > 0)
			{
				Long shopId = Long.parseLong(request.getParameter("shopId" + i));
				String carNo = request.getParameter("carNo");
				String billNo = request.getParameter("billNo");
				creditCustomer1 = request.getParameter("creditCustomer1");
				
				String reasonForSReturn1 = request.getParameter("reasonForSReturn1");
				if(reasonForSReturn1 == null || reasonForSReturn1.equalsIgnoreCase("") || reasonForSReturn1 == " ")
				{
					String reasonForSReturn2 = request.getParameter("reasonForSReturn2");
					if(reasonForSReturn2 == null || reasonForSReturn2.equalsIgnoreCase("") || reasonForSReturn2 == " ")
					{
						cust.setReturnReason("Sale Return");
					} else {
						cust.setReturnReason(reasonForSReturn2);
					}
				} else {
					cust.setReturnReason(reasonForSReturn1);
				}
				Long pkBillId = Long.parseLong(request.getParameter("pkBillId" + i));
				Long fkgoodreciveid = Long.parseLong(request.getParameter("fkgoodreciveid" + i));
				String contactNo = request.getParameter("contactNo" + i);
				String barcodeNo = request.getParameter("barcodeNo" + i);
				long productId = Long.parseLong(request.getParameter("productId"+i));
				String itemName = request.getParameter("itemName" + i);
				long catId = Long.parseLong(request.getParameter("catId"+i));
				String categoryName = request.getParameter("categoryName" + i);
				long subCatId = Long.parseLong(request.getParameter("subCatId"+i));
				String quantity = request.getParameter("quantity" + i);
				//editQuantity/returnQuantity is already get above before if condition use that One
				//String editQuantity = request.getParameter("editQuantity" + i);
				String discount = request.getParameter("discount" + i);
				String discountPercent = request.getParameter("discountPercent" + i);
				String salePrice = request.getParameter("salePrice" + i);
				String gst = request.getParameter("gst"+i);
				String iGst = request.getParameter("iGst"+i);
				String taxAmount = request.getParameter("taxAmt"+i);
				String totalAmt = request.getParameter("totalAmt" + i);
				String finalTotalPerProduct = request.getParameter("finalTotalPerProduct" + i);
				String returnTotalAmt = request.getParameter("returnTotalAmt" + i);
				String grossamt = request.getParameter("grossamt" + i);
				String returnGrossTotal = request.getParameter("returnGrossTotal");
				String grossTotalAmount = request.getParameter("grossTotalAmount");
				
				
				System.out.println("barcode no in sale return" + barcodeNo);
				System.out.println("product id in helper:--"+productId);
				System.out.println("In Dao Old Sale quantity :- "+quantity);
				System.out.println("In Dao editQuantity :- "+editQuantity);
				System.out.println("returnTotalAmt ================> "+returnTotalAmt);
				
				cust.setType("Tax Invoice");
				if (!"".equals(creditCustomer1)) {
					cust.setCustomerName(creditCustomer1);
				} else {
					cust.setCustomerName("N/A");
				}
				cust.setBillNo(billNo);
				cust.setFkCreditCustId(0l);
				cust.setFkShopId(shopId);
				cust.setTransactionId(transactionIdSr);
				if (contactNo == null) {
					cust.setContactNo(Long.parseLong("00"));
				} else {
					cust.setContactNo(Long.parseLong(contactNo));
				}
				cust.setBarcodeNo(Long.parseLong(barcodeNo));
				cust.setProductId(productId);
				cust.setItemName(itemName);
				cust.setCatId(catId);
				if (!"".equals(categoryName)) {
					cust.setCategoryName(categoryName);
				} else {
					cust.setCategoryName("N/A");
				}
				cust.setSubCatId(subCatId);
				
				Double afterReturnQuantity = Double.parseDouble(quantity) - Double.parseDouble(editQuantity);
				System.out.println("In Dao afterReturnQuantity :- "+afterReturnQuantity);
				
				cust.setQuantity(Double.parseDouble(quantity));
				cust.setEditQuantity(Double.parseDouble(editQuantity));
				cust.setAfterQuantity(afterReturnQuantity);
				cust.setSalePrice(Double.parseDouble(salePrice));
				cust.setDiscountPercent(Double.parseDouble(discountPercent));
				cust.setDiscount(Double.parseDouble(discount));
				cust.setGst(Double.parseDouble(gst));
				cust.setiGst(Double.parseDouble(iGst));
				cust.setTaxAmount(Double.parseDouble(taxAmount));
				cust.setTotalAmountPerItem(Double.parseDouble(returnTotalAmt));
				
				Double grossTotalBeforeSaleReturn = Double.parseDouble(quantity) * Double.parseDouble(finalTotalPerProduct);
				System.out.println("In Helper New Sale afterReturnQuantity :- "+afterReturnQuantity);

				cust.setTotalAmt(grossTotalBeforeSaleReturn);
				cust.setGrossamt(grossTotalBeforeSaleReturn);
				cust.setReturnTotal(Double.parseDouble(returnGrossTotal));
	
				String Date = request.getParameter("Date" + i);
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	
				Date adate = null;
				try
				{
					adate = format.parse(Date);
				} catch (ParseException e1) {
					e1.printStackTrace();
				}
				cust.setCurrent_date(adate);
				try {
					//DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
					Date dateobj = new Date();
					System.out.println(format.format(dateobj));
					String newDate = format.format(dateobj);
					Date today = format.parse(newDate);
					System.out.println(today);
					cust.setDate(today);
				} catch(Exception e) {
					System.out.println(e);
				}
				
				cust.setUserType(type2);
				cust.setFkUserId(uid);
				cust.setRedeemedForBillNo(0l);
				
				
				SaleReturnDao dao = new SaleReturnDao();
				dao.registerSaleReturn(cust);
				
				//Update Barcode Nuumber Wise Stock Quantity
				Long barcodeNoLong = Long.parseLong(barcodeNo);
				Double editQuantityDouble = Double.parseDouble(editQuantity);
				Long shopIdLong = shopId; //Long.parseLong(shopId);
				dao.updateBarcodeNoWiseStockQuantitySaleReturn(barcodeNoLong, editQuantityDouble,shopIdLong);
	
				//update sellbill quantity minus
				SaleReturnDao good = new SaleReturnDao();
				//good.updateQuantity(pkBillId, editQuantity, totalAmt);
				good.updateOtherBillQuantity(pkBillId, editQuantity, discount, taxAmount, returnTotalAmt, totalAmt, returnGrossTotal);
				
				//Update sellbill quantity minus
				Long barcodeNo1 = Long.parseLong(request.getParameter("barcodeNo" + i));
				SaleReturnDao good1 = new SaleReturnDao();
				if(barcodeNo1 > 0)
				{
					good1.updateBarcodeQuantity(barcodeNo1, editQuantity);
				}
	
				StockDao dao1 = new StockDao();
				List stkList2 = dao1.getAllStockEntry();
	
				
				for (int j = 0; j < stkList2.size(); j++)
				{
					//System.out.println(stkList2.toString());
					System.out.println("inside stock for loop");
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long fkProductId = st.getFkProductId();
					//Long fkCatId = st.getFkCategoryId();
					//Long fkShopId = st.getFkShopId();
					
					/* if (fkProductId == productId || fkCatId == catId || fkShopId == shopId) */
					
					if (ItemId.equals(itemName) && cat.equals(categoryName)&& fkProductId.equals(productId))
					{
						System.out.println("inside if of stock");
						Long PkItemId = st.getPkStockId();
						Double qunty = st.getQuantity();
						System.out.println("for update stock quantity block");
						Double updatequnty = (Double) (qunty + Double.parseDouble(editQuantity));
	
						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();
	
						Date date = new Date();
	
						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);
						System.out.println("update stock"+updatequnty);
						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}
			}
		}
		
		SaleReturnDao good = new SaleReturnDao();
		good.updateOtherBillGrossTotal(billNoToUpdateGrossTotal, returnGrossTotalToUpdateGrossTotal, shopIdUpdateGrossTotal);
		
		HttpSession sessionHttp = request.getSession();
		sessionHttp.setAttribute("transactionIdSr", transactionIdSr);
		sessionHttp.setAttribute("creditCustomer1", creditCustomer1);
	}

	public void returnSale1(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession sessionv = request.getSession(true);
		String type2 = "";
		String name2 = "";
		Long uid = null ;
		String shopId = "";
		
		if (sessionv != null)
		{
			if (sessionv.getAttribute("user") != null)
			{
				name2 = (String) sessionv.getAttribute("user");
				HibernateUtility hbu1=HibernateUtility.getInstance();
				Session session2=hbu1.getHibernateSession();
				org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
				query1.setParameter("name2", name2);
				UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
				type2 = userDetail1.getTypeId();
				uid = userDetail1.getPkUserId();
			} else {
				type2 = request.getParameter("userType");
				name2 = request.getParameter("userName");
				
				HibernateUtility hbu1=HibernateUtility.getInstance();
				Session session2=hbu1.getHibernateSession();
				org.hibernate.Query query1 = session2.createQuery("from UserDetail where userName =:name2");
				query1.setParameter("name2", name2);
				UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
				type2 = userDetail1.getTypeId();
				uid = userDetail1.getPkUserId();
			}
		}
		
		System.out.println("USERTYPE ******************************>>>>>>>>> "+type2);
		System.out.println("USERNAME ******************************>>>>>>>>> "+name2);
		
		SaleReturn cust = new SaleReturn();
		
		Long transactionIdSr = null;
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);
		
		//Variable to Update Grross Total
		String shopIdUpdateGrossTotal = (String) sessionv.getAttribute("shopId");
		String billNoToUpdateGrossTotal = request.getParameter("billNo");
		String returnGrossTotalToUpdateGrossTotal = request.getParameter("returnGrossTotal");
		
		System.out.println("shopIdUpdateGrossTotal :- "+shopIdUpdateGrossTotal);
		System.out.println("billNoToUpdateGrossTotal :- "+billNoToUpdateGrossTotal);
		System.out.println("returnGrossTotalToUpdateGrossTotal :- "+returnGrossTotalToUpdateGrossTotal);
		
		String billNo = "";
		for (int i = 0; i < count; i++)
		{
			String editQuantity = request.getParameter("editQuantity" + i);
			
			if(Double.parseDouble(editQuantity) > 0)
			{
				String reasonForSReturn3 = request.getParameter("reasonForSReturn3");
				System.out.println("SALE RERURN 3333333 "+reasonForSReturn3);
				if(reasonForSReturn3 == null || reasonForSReturn3.equalsIgnoreCase(""))
				{
					cust.setReturnReason("Sale Return");
				} else {
					cust.setReturnReason(reasonForSReturn3);
				}
				
				shopId = request.getParameter("shopId" + i);
				String carNo = request.getParameter("carNo");
				Long pkBillId = Long.parseLong(request.getParameter("pkBillId" + i));
				String fkCreditCustId = request.getParameter("fkCreditCustId"+i);
				String creditCustomer1 = request.getParameter("creditCustomer1");
				billNo = request.getParameter("billNo");
				String Date = request.getParameter("Date" + i);
				String contactNo = request.getParameter("contactNo" + i);
				String barcodeNo = request.getParameter("barcodeNo" + i);
				long productId = Long.parseLong(request.getParameter("productId"+i));
				String itemName = request.getParameter("itemName" + i);
				long catId = Long.parseLong(request.getParameter("catId"+i));
				String categoryName = request.getParameter("categoryName" + i);
				long subCatId = Long.parseLong(request.getParameter("subCatId"+i));
				String quantity = request.getParameter("quantity" + i);
				String salePrice = request.getParameter("salePrice" + i);
				String discountPercent = request.getParameter("discountPercent" + i);
				String discount = request.getParameter("discount" + i);
				String gst = request.getParameter("gst"+i);
				String iGst = request.getParameter("iGst"+i);
				String taxAmount = request.getParameter("taxAmt"+i);
				String totalAmt = request.getParameter("totalAmt" + i);
				String returnTotalAmt = request.getParameter("returnTotalAmt" + i);
				String finalTotalPerProduct = request.getParameter("finalTotalPerProduct" + i);
				
				
				String grossamt = request.getParameter("grossamt" + i);
				String returnGrossTotal = request.getParameter("returnGrossTotal");
				String grossTotalAmount = request.getParameter("grossTotalAmount");
				
				transactionIdSr = Long.parseLong(request.getParameter("transactionIdSr"));
				
				System.out.println("In Helper fkCreditCustId :- "+fkCreditCustId);
				System.out.println("In Helper barcodeNo :- " + barcodeNo);
				System.out.println("In Helper Old Sale quantity :- " + quantity);
				
				
				cust.setFkShopId(Long.parseLong(shopId));
				if (!"".equals(carNo))
				{
					cust.setCarNo(carNo);
				} else {
					cust.setCarNo("N/A");
				}
				cust.setType("Credit Customer");
				if(fkCreditCustId == null || fkCreditCustId.equalsIgnoreCase(""))
				{
					cust.setFkCreditCustId(0l);
				} else {
					cust.setFkCreditCustId(Long.parseLong(fkCreditCustId));
				}
				cust.setCustomerName(creditCustomer1);
				cust.setBillNo(billNo);
				if (contactNo == null) {
					cust.setContactNo(Long.parseLong("00"));
				} else {
					cust.setContactNo(Long.parseLong(contactNo));
				}
				cust.setBarcodeNo(Long.parseLong(barcodeNo));
				cust.setProductId(productId);
				cust.setItemName(itemName);
				cust.setCatId(catId);
				if (!"".equals(categoryName)) {
					cust.setCategoryName(categoryName);
				} else {
					cust.setCategoryName("N/A");
				}
				cust.setSubCatId(subCatId);
				
				//String editQuantity = request.getParameter("editQuantity" + i);
				Double afterReturnQuantity = Double.parseDouble(quantity) - Double.parseDouble(editQuantity);
				System.out.println("In Helper afterReturnQuantity :- " + afterReturnQuantity);
				
				cust.setQuantity(Double.parseDouble(quantity));
				cust.setEditQuantity(Double.parseDouble(editQuantity));
				cust.setAfterQuantity(afterReturnQuantity);
				cust.setSalePrice(Double.parseDouble(salePrice));
				cust.setDiscountPercent(Double.parseDouble(discountPercent));
				cust.setDiscount(Double.parseDouble(discount));
				cust.setGst(Double.parseDouble(gst));
				cust.setiGst(Double.parseDouble(iGst));
				cust.setTaxAmount(Double.parseDouble(taxAmount));
				cust.setTotalAmountPerItem(Double.parseDouble(returnTotalAmt));
				
				
				Double grossTotalBeforeSaleReturn = Double.parseDouble(quantity) * Double.parseDouble(finalTotalPerProduct);
				System.out.println("In Helper New Sale afterReturnQuantity :- "+afterReturnQuantity);
				
				cust.setTotalAmt(grossTotalBeforeSaleReturn);
				cust.setGrossamt(grossTotalBeforeSaleReturn);
				cust.setReturnTotal(Double.parseDouble(returnGrossTotal));
				
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
				Date adate = null;
				try
				{
					adate = format.parse(Date);
				} catch (ParseException e1) {
					e1.printStackTrace();
				}
				cust.setCurrent_date(adate);
	
				//DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
				try
				{
					//DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
					Date dateobj = new Date();
					System.out.println(format.format(dateobj));
					String newDate = format.format(dateobj);
					Date today = format.parse(newDate);
					System.out.println(today);
					cust.setDate(today);
				} catch(Exception e) {
					System.out.println(e);
				}
				
				cust.setTransactionId(transactionIdSr);
				cust.setRedeemedForBillNo(0l);
				cust.setUserType(type2);
				cust.setFkUserId(uid);
				
				
				SaleReturnDao dao = new SaleReturnDao();
				dao.registerSaleReturn(cust);
				
				//Update Barcode Nuumber Wise Stock Quantity
				Long barcodeNoLong = Long.parseLong(barcodeNo);
				Double editQuantityDouble = Double.parseDouble(editQuantity);
				Long shopIdLong = Long.parseLong(shopId);
				dao.updateBarcodeNoWiseStockQuantitySaleReturn(barcodeNoLong, editQuantityDouble,shopIdLong);
				
				//update sellbill quantity minus
				Double pending_bill_payment = Double.parseDouble(request.getParameter("totalAmount"));
				System.out.println("In Helper pending_bill_payment :- "+pending_bill_payment);
				
				SaleReturnDao good = new SaleReturnDao();
				good.updateCreditCustomerBillQuantity(pkBillId, editQuantity, discount, taxAmount, returnTotalAmt, pending_bill_payment, returnGrossTotal, shopId);
				
				//Update Barcodewise quantity in good receive plus
				Long barcodeNo1 = Long.parseLong(request.getParameter("barcodeNo" + i));
				SaleReturnDao good1 = new SaleReturnDao();
				
				if(barcodeNo1 > 0)
				{
					good1.updateBarcodeQuantity(barcodeNo1, editQuantity);
				}
				
				Double totalPendingBal = 0.0;
				List <Object[]> billPendingList = good1.gettPendingBalance(fkCreditCustId, shopId);
				for (Object[] object : billPendingList)
				{
					if(object[1] == null)
					{
						totalPendingBal = 0.0;
					} else {
						totalPendingBal = Double.parseDouble(object[1].toString());
					}
				}
				
				Double newPendingBill = 0.0;
				if(totalPendingBal > 0)
				{
					newPendingBill = (totalPendingBal - (Double.parseDouble(returnTotalAmt)));
				} else {
					newPendingBill = totalPendingBal;
				}
				
				good1.settPendingBalance(newPendingBill, fkCreditCustId, shopId);
				
				StockDao dao1 = new StockDao();
				List stkList2 = dao1.getAllStockEntry();
				
				for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long fkProductId = st.getFkProductId();
					Long fkCatId = st.getFkCategoryId();
					Long fkShopId = st.getFkShopId();
					
					//If ItemName Is Already Exists In Stock Table
					//if (ItemId.equals(itemName) && cat.equals(categoryName))
					if (fkProductId == productId && fkCatId == catId && fkShopId == Long.parseLong(shopId))
					{
						Long PkItemId = st.getPkStockId();
						Double qunty = st.getQuantity();
	
						Double updatequnty = (Double) (qunty + Double.parseDouble(editQuantity));
	
						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();
	
						Date date = new Date();
	
						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);
	
						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}
				
				Double returnTotalAmount = Double.parseDouble(request.getParameter("returnTotalAmount"));
				Double totalBillAmount = good1.gettTotalBillAmount(fkCreditCustId, shopId);
				Double lastPendingBalNEW = 0.0;				
				
				List <Object[]> billPendingList2 = good1.gettPendingBalance(fkCreditCustId, shopId);
				for (Object[] object : billPendingList2)
				{
					if(object[1] == null)
					{
						lastPendingBalNEW = 0.0;
					} else {
						lastPendingBalNEW = Double.parseDouble(object[1].toString());
					}
				}
				good1.regCreditCustomerReturnPayment(totalBillAmount, lastPendingBalNEW, returnTotalAmount, fkCreditCustId, discount, reasonForSReturn3, shopId);
			}
		}
		
		SaleReturnDao good = new SaleReturnDao();
		good.updateCreditCustomerBillGrossTotal(billNoToUpdateGrossTotal, returnGrossTotalToUpdateGrossTotal, shopIdUpdateGrossTotal);
		
		HttpSession sessionHttp = request.getSession();
		sessionHttp.setAttribute("transactionIdSr", transactionIdSr);
	}
	
	// pdf copy of other bill
		public void saleReturnCreditNoteHelper(HttpServletRequest request, HttpServletResponse response)
		{
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			
			// TODO Auto-generated method stub
			String sRTransactionId = request.getParameter("sRTransactionId");
			System.out.println("----------------sRTransactionId before session create::" + sRTransactionId);
			HttpSession session3 = request.getSession();
			Long transactionIdSr = Long.parseLong(sRTransactionId);
			session3.setAttribute("transactionIdSr", transactionIdSr);
		}
		
		public SaleReturn getSRTrasanctionData(HttpServletRequest request, HttpServletResponse response)
		{
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			
			String srTransactionId = request.getParameter("srTransactionId");
			String fkRootCustId = request.getParameter("fkRootCustId");
			Map<Long, SaleReturn> map = new HashMap<Long, SaleReturn>();

			SaleReturnDao dao = new SaleReturnDao();
			List<SaleReturn> trasactionIdList = dao.getAllTransactionDetails(srTransactionId, fkRootCustId, shopId);
			
			SaleReturn cs = null;
			if (trasactionIdList != null && trasactionIdList.size() > 0)
			{
				cs = trasactionIdList.get(0);
				System.out.println("pk id ===> "+cs.getPkBillId());
				System.out.println("transaction id ===> "+cs.getTransactionId());
				System.out.println("total return amt id ===> "+cs.getReturnTotal());
			}
			
			return cs;
		}

		public void billReturnAsPerBillNo(HttpServletRequest request, HttpServletResponse response) throws ParseException
		{
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			
			String BillNo = request.getParameter("billno");
		
			Map<Long, SaleReturn> map = new HashMap<Long, SaleReturn>();

			SaleReturnDao dao = new SaleReturnDao();
			List stkList2  = dao.getAllbilling(shopId,BillNo);
			
			for(int i=0;i<stkList2.size();i++)
			{
				OtherBill bean=(OtherBill) stkList2.get(i);
				
				String catname=bean.getCategoryName();
				String ItemName=bean.getItemName();
				Double quantity=bean.getQuantity();
				Long productid=bean.getFkProductId();
				Double grosstotal=bean.getGrossamt();
				Double  peritemprice=bean.getTotalperItem();
				Double cashAmount=bean.getCashCard_cashAmount();
				Double cardAmount=bean.getCashCard_cardAmount();
				Double upiCashAmount=bean.getCashupi_cashAmount();
				Double upiAmount=bean.getCashupi_upiAmount();
				Long barcode=bean.getBarcodeNo();
				Long catid=bean.getFkCatId();
				Long pkBillId= bean.getPkBillId();
				
				
				
				
				// update sellbill quantity minus
				//Long barcodeNo1 = Long.parseLong(request.getParameter("barcodeNo" + i));
				SaleReturnDao good1 = new SaleReturnDao();
				if(barcode > 0)
				{
					good1.updateBarcodeQuantity11(barcode, quantity);
				}
	
				StockDao dao1 = new StockDao();
				List stkList3 = dao1.getAllStockEntry();
	
				
				for (int j = 0; j < stkList3.size(); j++)
				{
					//System.out.println(stkList2.toString());
					System.out.println("inside stock for loop");
					Stock st = (Stock) stkList3.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
				Long fkProductId = st.getFkProductId();
					//Long fkCatId = st.getFkCategoryId();
					//Long fkShopId = st.getFkShopId();
					
					/* if (fkProductId == productId || fkCatId == catId || fkShopId == shopId) */
					
					if (ItemId.equals(ItemName) && cat.equals(catname)&& fkProductId.equals(productid))
					{
						System.out.println("inside if of stock");
						Long PkItemId = st.getPkStockId();
						Double qunty = st.getQuantity();
						System.out.println("for update stock quantity block");
						Double updatequnty = (Double) (qunty +(quantity));
	
						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();
	
						Date date = new Date();
	
						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);
						System.out.println("update stock"+updatequnty);
						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}
				SaleReturnDao good = new SaleReturnDao();
				good.updateQuantityforBillCancel(pkBillId, quantity, peritemprice,cashAmount,cardAmount,upiCashAmount,upiAmount,grosstotal);
				
			}
			
			//return cs;
		}

		
		
	
		
}
