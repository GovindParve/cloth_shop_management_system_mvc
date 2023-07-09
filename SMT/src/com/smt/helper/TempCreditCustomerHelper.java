package com.smt.helper;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillBean;
import com.smt.bean.SaleReport;
import com.smt.bean.SaleReturnBean;
import com.smt.dao.CreditCustBillDao;
import com.smt.dao.CustomerOrderDao;
import com.smt.dao.CustomerPaymentDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.OtherBillDao;
import com.smt.dao.ProductDetailDao;
import com.smt.dao.SaleReturnDao;
import com.smt.dao.StockDao;
import com.smt.dao.TempCreditCustomerDao;
import com.smt.hibernate.CreditCustomerBill;
import com.smt.hibernate.CustomerPaymentBean;
import com.smt.hibernate.OtherBill;
import com.smt.hibernate.Stock;
import com.smt.hibernate.TempCreditInvoice;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class TempCreditCustomerHelper {

	Long BillNo = 1l;

	public void regCreditCustomerBill1(HttpServletRequest request, HttpServletResponse response)
	{		
		TempCreditCustomerDao dao = new TempCreditCustomerDao();	
		Double totalBillpending = 0.0;
		String fkRootCustId = "";
		Double lastBillPending = 0.0;
		String shopId = "";
		
		// TODO Auto-generated method stub
		HttpSession session3 = request.getSession();
		
		TempCreditCustomerDao data = new TempCreditCustomerDao();
		List stkList = data.getCreditLastBillNo();

		for (int i = 0; i < stkList.size(); i++)
		{
			BillBean st = (BillBean) stkList.get(i);
			BillNo = st.getCreditCustBillNo();
			BillNo++;
		}
		
		/*this session is handel for get user type and id*/
		HttpSession sessionv = request.getSession(true);
		 String type2= "";
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

		TempCreditInvoice cust = new TempCreditInvoice();
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String cPaymentDueDate = request.getParameter("cPaymentDueDate");
		Date cPayDueDate = null;
		if(cPaymentDueDate == null || cPaymentDueDate.isEmpty() || cPaymentDueDate.equalsIgnoreCase(""))
		{}
		else
		{
			try
			{
				cPayDueDate = df.parse(cPaymentDueDate);
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);

		for (int i = 0; i < count; i++)
		{
			shopId = request.getParameter("shopId"+i);
			cust.setFkShopId(Long.parseLong(shopId));
			
			String itemName = request.getParameter("itemName" + i);
			cust.setItemName(itemName);
			String itemid = request.getParameter("item_id" + i);
			cust.setFkgoodReciveid(Long.parseLong(itemid));
			String style = request.getParameter("style" + i);
			cust.setStyle(style);

			String categoryName = request.getParameter("categoryName" + i);
			cust.setCategoryName(categoryName);

			String Subcategory = request.getParameter("subCategoryName" + i);
			cust.setSubcategory(Subcategory);
			String quantity = request.getParameter("quantity" + i);
			cust.setQuantity(Double.parseDouble(quantity));

			String rollsize = request.getParameter("rollSize"+i);
			cust.setRollsize(Double.parseDouble(rollsize));
			
			
			String salePrice = request.getParameter("salePrice" + i);
			cust.setSalePrice(Double.parseDouble(salePrice));
			
			
			String spAfterDis = request.getParameter("spAfterDis"+i);
			cust.setSpAfterDis(spAfterDis);
			

			String barcodeNo = request.getParameter("barcodeNo" + i);
			cust.setBarcodeNo(Long.parseLong(barcodeNo));

			String hsnSacNo = request.getParameter("hsnSacNo" + i);
			cust.setHsnSacNo(hsnSacNo);

			String vat = request.getParameter("vat" + i);
			cust.setVat(Double.parseDouble(vat));

			String igst = request.getParameter("igst" + i);
			//cust.setIgst(Double.parseDouble(igst));
			String taxAmount = request.getParameter("taxAmount" + i);
			cust.setTaxAmount(Double.parseDouble(taxAmount));

			if (igst == null || igst.equalsIgnoreCase(""))
			{
				cust.setIgst(0d);
			} else {
				cust.setIgst(Double.parseDouble(igst));
			}
			
			String saleEmpId = request.getParameter("saleEmpId"+i);
			if(saleEmpId == null || saleEmpId.isEmpty() || saleEmpId.equalsIgnoreCase("") || saleEmpId.equalsIgnoreCase(" "))
			{
				cust.setFkSaleEmployeeId(0l);
			}
			else
			{
				cust.setFkSaleEmployeeId(Long.parseLong(saleEmpId));
			}
			
			String saleEmpName = request.getParameter("saleEmpName"+i);
			if (saleEmpName.equalsIgnoreCase("") || saleEmpName == null || saleEmpName.equalsIgnoreCase("undefined") || saleEmpName.equalsIgnoreCase(" "))
			{
				cust.setEmpName("NA");
			}
			else
			{
				cust.setEmpName(saleEmpName);
			}
			
			String rollSize = request.getParameter("rollSize"+i);
			
			String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
			cust.setSpWithoutTaxAmount(Double.parseDouble(sPWithoutTax));	
			
			String grossTotal = request.getParameter("grossTotal");
			cust.setGrossamt(Double.parseDouble(grossTotal));
			
			

			String total = request.getParameter("total" + i);
			cust.setTotalperItem(Double.parseDouble(total));
			
			String size1 = request.getParameter("size1" + i);
			cust.setSize(size1);

			//Double amtPaid = Double.parseDouble(paidAmt);
			Double grossAmt = Double.parseDouble(grossTotal);
			
			/*double taxAmount0 = 0.0;
			if(Double.parseDouble(vat) > 0)
			{
				taxAmount0 = ((Double.parseDouble(salePrice)) - (Double.parseDouble(sPWithoutTax)));
			}
			else
			{
				cust.setTaxAmount(Double.parseDouble(quantity) *  taxAmount0);
			}
			cust.setTaxAmount(Double.parseDouble(quantity) * taxAmount0);*/
			
			String taxAmountAfterDis = request.getParameter("taxAmountAfterDis" + i);
			if(taxAmountAfterDis == null || taxAmountAfterDis.isEmpty() || taxAmountAfterDis.equalsIgnoreCase(""))
			{
				cust.setTaxAmtAfterDiscount(0.0);
			}
			else
			{
				cust.setTaxAmtAfterDiscount(Double.parseDouble(quantity) * Double.parseDouble(taxAmountAfterDis));
			}
					
			String sQTY = request.getParameter("goodReceiveQuantity"+i);
			
			
			cust.setSalePrice(Double.parseDouble(salePrice));

			
			
			String totalAmount = request.getParameter("totalAmount");
			cust.setTotalAmt(Double.parseDouble(totalAmount));
			double disAmt = 0.0;
			
			String discountPerProduct = request.getParameter("perProductdisAmount"+i);
			if(discountPerProduct == null || discountPerProduct.equalsIgnoreCase("") || discountPerProduct.isEmpty())
			{
				cust.setDiscount(0.0);				
			}
			else
			{
				cust.setDiscount(Double.parseDouble(discountPerProduct));
			}
			
			String perProductdisPer = request.getParameter("perProductdisPer"+i);
			if(perProductdisPer == null || perProductdisPer.equalsIgnoreCase("") || perProductdisPer.isEmpty())
			{
				cust.setPerProductdisPer(0.0);				
			}
			else
			{
				cust.setPerProductdisPer(Double.parseDouble(perProductdisPer));
			}			

			fkRootCustId = request.getParameter("fkRootCustId");
			cust.setFkRootCustId(Long.parseLong(fkRootCustId));			
			
			//this two value set to database
			cust.setCCBempType(type2);
			cust.setCCBempIdFK(uid);
			
			Date now = new Date();
			cust.setBillTime(now);

			Date dateobj = new Date();
			System.out.println(df.format(dateobj));
			String newDate = df.format(dateobj);
			cust.setCurrent_date(dateobj);
			cust.setcPaymentDueDate(cPayDueDate);
			String input = request.getParameter("input1");
			String gstTinNo = request.getParameter("gstTinNo");

			//session3.setAttribute("creditCustomerName", input);
			//session3.setAttribute("gstTinNo", gstTinNo);
			//session3.setAttribute("BillNo2", BillNo);
			//session3.setAttribute("paidAmt", amtPaid);
			if (BillNo == null)
			{
				cust.setBillNo(1l);
			}
			else
			{
				cust.setBillNo(BillNo);
			}
			
		//	Double pendingBal = grossAmt - amtPaid;
			//System.out.println("bill payment pending =======> "+pendingBal);


			
			//CALLING GET PENDING AMOUNT"
			//List pendingBill = dao.getPendingBillPaymentCreditCust(fkRootCustId);
			//BillBean getPendingBill = new BillBean();
				
			
			/*
			 * if(i == 0) { List pBillList =
			 * data.getPendingBillPaymentCreditCust(fkRootCustId);
			 * 
			 * for(int j=0; j<pBillList.size(); j++){ BillBean st =
			 * (BillBean)pBillList.get(j); lastBillPending = st.getPendingBill();
			 * //totalBillpending = ((Double.parseDouble(salePrice) - disAmt) +
			 * lastBillPending); } }
			 */
				
				String fkProductId = request.getParameter("fkProductId" + i);
				cust.setFkProductId(Long.parseLong(fkProductId));
				
				String fkSubCatId = request.getParameter("fkSubCatId" + i);
				cust.setFkSubCatId(Long.parseLong(fkSubCatId));
				
				String fkCatId = request.getParameter("fkCategoryId" + i);
				cust.setFkCatId(Long.parseLong(fkCatId));	
				
				String fkSuppId = request.getParameter("fkSuppId" + i);
				cust.setFkSuppId(Long.parseLong(fkSuppId));
				
			dao.regCreditCustomerBill(cust);
			double totalBillpending1 = 0.0;
			
			Long item_id = Long.parseLong(request.getParameter("item_id" + i));
			GoodReciveDao good = new GoodReciveDao();
			good.updateQuantity1(item_id, quantity, rollSize, sQTY, size1);
			
			StockDao dao1 = new StockDao();
			List stkList2 = dao1.getAllStockEntry115();

			for (int j = 0; j < stkList2.size(); j++)
			{
				Stock st = (Stock) stkList2.get(j);
				String ItemId = st.getItemName();
				String cat = st.getCatName();
				Long productId = st.getFkProductId();
				Long categoryId = st.getFkCategoryId();
				Long fkShopId = st.getFkShopId();

				/* If ItemName Is Already Exists In Stock Table */
				if (productId == Long.parseLong(fkProductId) && categoryId == Long.parseLong(fkCatId) && fkShopId == Long.parseLong(shopId))
				{
					Long PkItemId = st.getPkStockId();
					Double qunty = st.getQuantity();
					Double updatequnty = 0.0;
					double QTY = 0.0;
					if(rollSize!="0")
					{
						List<Double> list = null;
						Double totalQty = 0.0;
						HibernateUtility hbuSu = HibernateUtility.getInstance();
						Session sessionSu = hbuSu.getHibernateSession();
						Transaction transactionSu = sessionSu.beginTransaction();
						org.hibernate.Query querySu = sessionSu.createSQLQuery("select SUM(gr.Quantity) from goodreceive gr where gr.fkProductId = :fkProductId AND gr.fkCatId = :fkCatId AND gr.fkShopId = :shopId");
						querySu.setParameter("fkProductId", fkProductId);
						querySu.setParameter("fkCatId", fkCatId);
						querySu.setParameter("shopId", shopId);
						
						list = querySu.list();
						updatequnty = list.get(0).doubleValue();
					}
					else
					{
						updatequnty = (Double) (qunty - Double.parseDouble(quantity));
					}
						/*QTY = (Double.parseDouble(rollSize) * qunty);
						updatequnty = (Double) (QTY - Double.parseDouble(quantity)); 
					}
					else
					{
						updatequnty = (Double) (qunty - Double.parseDouble(quantity));
					}*/

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
			
	

}
}
	
	
	
	
	
	public void updateGridData(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("Inside updateGridData helper");
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
        CreditCustomerBill cust = new CreditCustomerBill();
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c count is (tempitemdetailhelper) -->  "+count);

		for(int i=0;i<count;i++){
			
String quantity = request.getParameter("quantity" + i);
			
			Double checkReturnQty = Double.parseDouble(quantity);
			
		if(checkReturnQty>0) {
			System.out.println("insde if checkReturnQty");
			String pkTempid = request.getParameter("pkTempid" + i);
			String item_id = request.getParameter("item_id" + i);
			String itemName = request.getParameter("itemName" + i);
			String categoryName = request.getParameter("categoryName" + i);
			String barcodeNo = request.getParameter("barcodeNo" + i);
			String fkProductId = request.getParameter("fkProductId" + i);
			
			long productId = Long.parseLong(request.getParameter("fkProductId"+i));			
			Long barcodeNo1 = Long.parseLong(request.getParameter("barcodeNo" + i));
			SaleReturnDao good1 = new SaleReturnDao();
			if(barcodeNo1 > 0)
			{
				good1.updateBarcodeQuantity1(barcodeNo1, quantity);
			}
			
			
			StockDao dao1 = new StockDao();
			List stkList2 = dao1.getAllStockEntry112();

			
			for (int j = 0; j < stkList2.size(); j++)
			{
				//System.out.println(stkList2.toString());
				System.out.println("inside stock for loop");
				Stock st = (Stock) stkList2.get(j);
				String ItemId = st.getItemName();
				String cat = st.getCatName();
			Long fkProductId1 = st.getFkProductId();
				//Long fkCatId = st.getFkCategoryId();
				//Long fkShopId = st.getFkShopId();
				
				/* if (fkProductId == productId || fkCatId == catId || fkShopId == shopId) */
				
				if (ItemId.equals(itemName) && cat.equals(categoryName)&& fkProductId1.equals(productId))
				{
					System.out.println("inside if of stock");
					Long PkItemId = st.getPkStockId();
					Double qunty = st.getQuantity();
					System.out.println("for update stock quantity block");
					Double updatequnty = (Double) (qunty + Double.parseDouble(quantity));

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
	}
	
}