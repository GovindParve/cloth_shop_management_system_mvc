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
import com.smt.dao.AdvanceBookingDao;
import com.smt.dao.CreditCustBillDao;
import com.smt.dao.CustomerOrderDao;
import com.smt.dao.CustomerPaymentDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.OtherBillDao;
import com.smt.dao.ProductDetailDao;
import com.smt.dao.StockDao;
import com.smt.hibernate.CreditCustomerBill;
import com.smt.hibernate.CustomerPaymentBean;
import com.smt.hibernate.OtherBill;
import com.smt.hibernate.Stock;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

//ALL CREDIT CUSTOMER BILLING FUNCTIONALITY
public class CreditCustomerBillHelper
{
	Long BillNo = 1l;
	public void regCreditCustomerBill(HttpServletRequest request, HttpServletResponse response)
	{		
		CreditCustBillDao dao = new CreditCustBillDao();
		Double totalBillpending = 0.0;
		String fkRootCustId = "";
		Double lastBillPending = 0.0;
		String shopId = "";
		
		HttpSession session3 = request.getSession();
		
		CreditCustBillDao data = new CreditCustBillDao();
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
				Query query1 = session2.createQuery("from UserDetail where userName =:name2");
				query1.setParameter("name2", name2);
				UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
				type2 = userDetail1.getTypeId();
				uid = userDetail1.getPkUserId();
			} else {
				type2 = request.getParameter("userType");
				name2 = request.getParameter("userName");
				
				HibernateUtility hbu1=HibernateUtility.getInstance();
				Session session2=hbu1.getHibernateSession();
				Query query1 = session2.createQuery("from UserDetail where userName =:name2");
				query1.setParameter("name2", name2);
				UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
				type2 = userDetail1.getTypeId();
				uid = userDetail1.getPkUserId();
			}
		}
		
		CreditCustomerBill cust = new CreditCustomerBill();
		
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
			} catch(Exception e) {
				e.printStackTrace();
			}
		}
		
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);
		
		for (int i = 0; i < count; i++)
		{
			shopId = request.getParameter("shopId"+i);
			String bookingNoAB = request.getParameter("Billno"+i);
			String barcodeNo = request.getParameter("barcodeNo" + i);
			String fkProductId = request.getParameter("fkProductId" + i);
			String itemName = request.getParameter("itemName" + i);
			String fkCatId = request.getParameter("fkCategoryId" + i);
			String categoryName = request.getParameter("categoryName" + i);
			String fkSubCatId = request.getParameter("fkSubCatId" + i);
			String hsnSacNo = request.getParameter("hsnSacNo" + i);
			String rollSize = request.getParameter("rollSize"+i);
			String size1 = request.getParameter("size1" + i);
			String style = request.getParameter("style" + i);
			String sQTY = request.getParameter("goodReceiveQuantity"+i);
			String quantity = request.getParameter("quantity" + i);
			String salePrice = request.getParameter("salePrice" + i);
			String perProductdisPer = request.getParameter("perProductdisPer"+i);
			String perProductdisAmount = request.getParameter("perProductdisAmount"+i);
			String vat = request.getParameter("vat" + i);
			String igst = request.getParameter("igst" + i);
			String taxAmount = request.getParameter("taxAmount" + i);
			String taxAmountAfterDis = request.getParameter("taxAmountAfterDis" + i);
			String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
			String total = request.getParameter("total" + i);
			
			String fkSuppId = request.getParameter("fkSuppId" + i);
			String saleEmpId = request.getParameter("saleEmpId"+i);
			String saleEmpName = request.getParameter("saleEmpName"+i);
			
			
			String totalAmount = request.getParameter("totalAmount");
			
			String paymentMode = request.getParameter("paymentMode");
			String chequeNum = request.getParameter("chequeNum");
			String cardNum = request.getParameter("cardNum");
			String accNum = request.getParameter("accNum");
			String nameOnCheck = request.getParameter("nameOnCheck");
			String bankName = request.getParameter("bankName");
			String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");
			String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
			String cashupi_cashAmount = request.getParameter("cashupi_cashAmount");
			String cashupi_cardAmount = request.getParameter("cashupi_cardAmount");
			
			
			String totalCreditAmt = request.getParameter("totalCreditAmt");
			String paidAmt = request.getParameter("paidAmt");
			String grossTotal = request.getParameter("grossTotal");
			
			fkRootCustId = request.getParameter("fkRootCustId");
			
			
			System.out.println("upi amount"+cashupi_cardAmount);
			System.out.println("In Helper paid ammount :- "+paidAmt);
			
			cust.setFkShopId(Long.parseLong(shopId));
			cust.setFkProductId(Long.parseLong(fkProductId));
			cust.setItemName(itemName);
			cust.setFkCatId(Long.parseLong(fkCatId));
			cust.setCategoryName(categoryName);
			cust.setFkSubCatId(Long.parseLong(fkSubCatId));
			cust.setHsnSacNo(hsnSacNo);
			cust.setSize(size1);
			cust.setStyle(style);
			cust.setQuantity(Double.parseDouble(quantity));
			cust.setSalePrice(Double.parseDouble(salePrice));
			
			if(perProductdisPer == null || perProductdisPer.equalsIgnoreCase("") || perProductdisPer.isEmpty())
			{
				cust.setPerProductdisPer(0.0);				
			} else {
				cust.setPerProductdisPer(Double.parseDouble(perProductdisPer));
			}
			double disAmt = 0.0;
			if(perProductdisAmount == null || perProductdisAmount.equalsIgnoreCase("") || perProductdisAmount.isEmpty())
			{
				cust.setDiscount(0.00);				
			} else {
				cust.setDiscount(Double.parseDouble(perProductdisAmount));
			}
			cust.setBarcodeNo(Long.parseLong(barcodeNo));
			cust.setVat(Double.parseDouble(vat));
			//cust.setIgst(Double.parseDouble(igst));
			if (igst == null || igst.equalsIgnoreCase(""))
			{
				cust.setIgst(0d);
			} else {
				cust.setIgst(Double.parseDouble(igst));
			}
			cust.setSpWithoutTaxAmount(Double.parseDouble(sPWithoutTax));
			
			Double amtPaid = Double.parseDouble(paidAmt);
			Double grossAmt = Double.parseDouble(grossTotal);
			/*double taxAmount0 = 0.0;
			if(Double.parseDouble(vat) > 0)
			{
				taxAmount0 = ((Double.parseDouble(salePrice)) - (Double.parseDouble(sPWithoutTax)));
			} else {
				cust.setTaxAmount(Double.parseDouble(quantity) *  taxAmount0);
			}
			cust.setTaxAmount(Double.parseDouble(quantity) * taxAmount0);*/
			cust.setTaxAmount(Double.parseDouble(taxAmount));
			
			if(taxAmountAfterDis == null || taxAmountAfterDis.isEmpty() || taxAmountAfterDis.equalsIgnoreCase(""))
			{
				cust.setTaxAmtAfterDiscount(0.0);
			} else {
				//cust.setTaxAmtAfterDiscount(Double.parseDouble(quantity) * Double.parseDouble(taxAmountAfterDis));
				cust.setTaxAmtAfterDiscount(Double.parseDouble(taxAmountAfterDis));
			}
			
			cust.setTotalperItem(Double.parseDouble(total));
			
			cust.setFkSuppId(Long.parseLong(fkSuppId));
			
			if(saleEmpId == null || saleEmpId.isEmpty() || saleEmpId.equalsIgnoreCase("") || saleEmpId.equalsIgnoreCase(" "))
			{
				cust.setFkSaleEmployeeId(0l);
			} else {
				cust.setFkSaleEmployeeId(Long.parseLong(saleEmpId));
			}
			if (saleEmpName.equalsIgnoreCase("") || saleEmpName == null || saleEmpName.equalsIgnoreCase("undefined") || saleEmpName.equalsIgnoreCase(" "))
			{
				cust.setEmpName("NA");
			} else {
				cust.setEmpName(saleEmpName);
			}
			
			cust.setTotalAmt(Double.parseDouble(totalAmount));
			
			
			//payment details
			if (paymentMode == null) {
				cust.setPaymentMode("N/A");
			} else {
				cust.setPaymentMode(paymentMode);
			}
			if (paymentMode.equals("cheque"))
			{
				if (chequeNum == null) {
					cust.setChequeNum("N/A");
				} else {
					cust.setChequeNum(chequeNum);
				}
				if (nameOnCheck == null) {
					cust.setNameOnCheck("N/A");
				} else {
					cust.setNameOnCheck(nameOnCheck);
				}
			} else if (paymentMode.equals("card"))
			{
				if(Double.parseDouble(paidAmt) > 0)
				{
					cust.setCashCard_cardAmount(Double.parseDouble(paidAmt));
				} else {
					cust.setCashCard_cardAmount(0.0);
				}
				cust.setCashCard_cashAmount(0.0);
				cust.setCashupi_cashAmount(0.0);
				cust.setCashupi_upidAmount(0.0);
				int cardNumLength = cardNum.length();
				if (cardNumLength > 0) {
					cust.setCardNum(Long.parseLong(cardNum));
				} else {
					cust.setCardNum(null);
				}
			}else if (paymentMode.equals("neft")) {
				if (bankName == null) {
					cust.setBankName("N/A");
				} else {
					cust.setBankName(bankName);
				}

				int accNumLength = accNum.length();
				if (accNumLength > 0) {
					cust.setAccNum(Long.parseLong(accNum));

				} else {
					cust.setAccNum(null);
				}
			} else if (paymentMode.equals("cash"))
			{
				if(Double.parseDouble(paidAmt) > 0)
				{
					cust.setCashCard_cashAmount(Double.parseDouble(paidAmt));
				} else {
					cust.setCashCard_cashAmount(0.0);
				}
				cust.setCashCard_cardAmount(0.0);
				cust.setCashupi_cashAmount(0.0);
				cust.setCashupi_upidAmount(0.0);
			} else if (paymentMode.equals("Upi")) {
				if(Double.parseDouble(paidAmt) > 0)
				{
					System.out.println("inside if of upi");
					cust.setCashupi_upidAmount(Double.parseDouble(paidAmt));
				} else {
					System.out.println("inside else of upi");
					cust.setCashupi_upidAmount(0.0);
				}
				System.out.println("inside elseif of upi");
				cust.setCashupi_cashAmount(0.0);
				cust.setCashCard_cardAmount(0.0);
				cust.setCashCard_cashAmount(0.0);
			}
			if (paymentMode.equals("cashAndCard"))
			{
				if(cashCard_cashAmount.equals("") || cashCard_cashAmount.isEmpty() || cashCard_cashAmount == null)
				{
					cust.setCashCard_cashAmount(0.0);
				} else {
					cust.setCashCard_cashAmount(Double.parseDouble(cashCard_cashAmount));
				}
				if(cashCard_cardAmount.equals("") || cashCard_cardAmount.isEmpty() || cashCard_cardAmount == null)
				{
					cust.setCashCard_cardAmount(0.0);
				} else {
					cust.setCashCard_cardAmount(Double.parseDouble(cashCard_cardAmount));
				}
				cust.setCashupi_cashAmount(0.0);
				cust.setCashupi_upidAmount(0.0);
			}
			if (paymentMode.equals("cashAndupi"))
			{
				if(cashupi_cashAmount.equals("") || cashupi_cashAmount.isEmpty() || cashupi_cashAmount == null)
				{
					cust.setCashupi_cashAmount(0.0);
				} else {
					cust.setCashupi_cashAmount(Double.parseDouble(cashupi_cashAmount));
				}
				if(cashupi_cardAmount.equals("") || cashupi_cardAmount.isEmpty() || cashupi_cardAmount == null)
				{
					cust.setCashupi_upidAmount(0.0);
				} else {
					cust.setCashupi_upidAmount(Double.parseDouble(cashupi_cardAmount));
				}
				cust.setCashCard_cardAmount(0.0);
				cust.setCashCard_cashAmount(0.0);
			}
			
			if(totalCreditAmt == null || totalCreditAmt.isEmpty())
			{
				totalCreditAmt = "0";
				cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
			} else {
				cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
			}
			
			if(paidAmt.isEmpty() || paidAmt.equalsIgnoreCase("") || paidAmt == null)
			{
				paidAmt = "0.0";
			}else{}
			
			if (paidAmt.equals(grossTotal))
			{
				cust.setPaymentDone("n");
			} else {
				cust.setPaymentDone("y");
			}
			cust.setGrossamt(Double.parseDouble(grossTotal));
			
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

			session3.setAttribute("creditCustomerName", input);
			session3.setAttribute("gstTinNo", gstTinNo);
			session3.setAttribute("BillNo2", BillNo);
			session3.setAttribute("paidAmt", amtPaid);
			if (BillNo == null)
			{
				cust.setBillNo(1l);
			} else {
				cust.setBillNo(BillNo);
			}
			
			Double pendingBal = grossAmt - amtPaid;
			System.out.println("bill payment pending =======> "+pendingBal);
			
			//CALLING GET PENDING AMOUNT"
			//List pendingBill = dao.getPendingBillPaymentCreditCust(fkRootCustId);
			//BillBean getPendingBill = new BillBean();
				
			
			if(i == 0)
			{	
				List pBillList  = data.getPendingBillPaymentCreditCust(fkRootCustId);
				for(int j=0; j<pBillList.size(); j++){
					BillBean st = (BillBean)pBillList.get(j);
					lastBillPending = st.getPendingBill();
					//totalBillpending = ((Double.parseDouble(salePrice) - disAmt) + lastBillPending);
				}
			}
			
			dao.regCreditCustomerBill(cust);
			
			//Update Barcode Nuumber Wise Stock Quantity
			Long barcodeNoLong = Long.parseLong(barcodeNo);
			Double quantityDouble = Double.parseDouble(quantity);
			Long shopIdLong = Long.parseLong(shopId);
			dao.updateBarcodeNoWiseStockSaleInvoce(barcodeNoLong, quantityDouble,shopIdLong);
			
			if(Long.parseLong(bookingNoAB) > 0)
			{
				System.out.println("Long.parseLong(bookingNoAB) > 0 "+bookingNoAB);
				CreditCustBillDao advancebooking = new CreditCustBillDao();
				advancebooking.updateAdvanceBooking(bookingNoAB, BillNo);
			}
				
			double totalBillpending1 = 0.0;
			if(i == (count-1))
			{
				totalBillpending1 = ((grossAmt - Double.parseDouble(paidAmt))+lastBillPending);
				dao.setPendingBillPaymentToCreditCust(totalBillpending1, fkRootCustId, shopId);
			}
			
			if(Double.parseDouble(paidAmt) > 0)
			{
				if (i == (count-1))
				{
					double totalAmountOfCust = 0.0;
					
					List pBillList  = data.getTotalBillAmountOfCust(fkRootCustId);
					
					for(int j=0; j<pBillList.size(); j++)
					{
						BillBean st = (BillBean)pBillList.get(j);
						totalAmountOfCust = st.getPendingBill();
					}
					CustomerPaymentDao pay = new CustomerPaymentDao();
					pay.regCreditCustomerPayment(BillNo, grossTotal, paidAmt, fkRootCustId, totalBillpending1, totalAmountOfCust, shopId);
				}
			}
			if(Long.parseLong(bookingNoAB) == 0)
			{
				Long item_id = Long.parseLong(request.getParameter("item_id" + i));
				GoodReciveDao good = new GoodReciveDao();
				good.updateQuantity(item_id, quantity, rollSize, sQTY, size1);
			
				StockDao dao1 = new StockDao();
				List stkList2 = dao1.getAllStockEntry();

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
					System.out.println("In Helper Update Stock quantity :- "+qunty);
					System.out.println("In Helper Update Stock Credit Sale quantity :- "+quantity);
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
					} else {
						updatequnty = (Double) (qunty - Double.parseDouble(quantity));
					}
						/*QTY = (Double.parseDouble(rollSize) * qunty);
						updatequnty = (Double) (QTY - Double.parseDouble(quantity)); 
					} else {
						updatequnty = (Double) (qunty - Double.parseDouble(quantity));
					}*/

					HibernateUtility hbu = HibernateUtility.getInstance();
					Session session = hbu.getHibernateSession();
					Transaction transaction = session.beginTransaction();
					
					Date date = new Date();
					
					Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
					updateStock.setUpdateDate(date);
					System.out.println("In Helper Update Stock updatequnty :- "+updatequnty);
					updateStock.setQuantity(updatequnty);
					session.saveOrUpdate(updateStock);
					transaction.commit();
				}
			}
			}
		}
		
		Integer count1 = Integer.parseInt(request.getParameter("count1"));
		if(count1 > 0)
		{
			HibernateUtility hbu2 = null;
			Session session2 = null;
			Transaction transaction2 = null;
	
			try
			{
				hbu2 = HibernateUtility.getInstance();
				session2 = hbu2.getHibernateSession();
				transaction2 = session2.beginTransaction();		
				for(int j=0; j<count1; j++)
				{				
					String transactionId = request.getParameter("transactionId"+j);
					Query query = session2.createSQLQuery("UPDATE salereturn set redeemedForBillNo = "+BillNo+" WHERE transactionId = "+transactionId+" AND fkShopId = "+shopId);
					query.executeUpdate();
					transaction2.commit();
				}
			} catch(Exception e) {
				e.printStackTrace();
			}
		}
		else
		{}
	}

	// copy for credit bill customer
	public void BillCOPYForCreditBill(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String billNo = request.getParameter("billNo");
		String custName = request.getParameter("custName");
		String gstTinNo = request.getParameter("gstTinNo");
		String custName1 = request.getParameter("custName1");
		HttpSession session3 = request.getSession();
		Long billNo2 = Long.parseLong(billNo);
		session3.setAttribute("BillNo", billNo2);
		session3.setAttribute("creditCustomerName", custName);
		session3.setAttribute("creditCustomerName1", custName1);
		session3.setAttribute("gstTinNo", gstTinNo);
	}

	// Single Date Credit Sale Report
	public List creditSingleDate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		try {
			adate = format.parse(fDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CreditCustBillDao dao = new CreditCustBillDao();
		List<SaleReport> exp1List = dao.creditSingleDate(adate);

		return exp1List;
	}

	// Two Date Credit Sale Report
	public List creditTwoDate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		String eDate = request.getParameter("eDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;
		try {
			adate = format.parse(fDate);
			bdate = format.parse(eDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CreditCustBillDao dao = new CreditCustBillDao();
		List<SaleReport> exp1List = dao.creditTwoDate(adate, bdate);

		return exp1List;
	}

	// Category Wise Credit Sale Report
	public List creditSaleWiseCustomer(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String cscatId = request.getParameter("cscatId");

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CreditCustBillDao dao = new CreditCustBillDao();
		List<SaleReport> exp1List = dao.creditSaleWiseCustomer(cscatId);

		return exp1List;
	}
	
	public List creditProductWiseSaleHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String csProductId = request.getParameter("csProductId");

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CreditCustBillDao dao = new CreditCustBillDao();
		List<SaleReport> exp1List = dao.creditProductWiseSaleDao(csProductId);

		return exp1List;
	}

	// Bill No Wise Credit Sale Report
	public List billnowiseCreditsell(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		long csBillNocust = Long.parseLong(request.getParameter("csBillNocust"));

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CreditCustBillDao dao = new CreditCustBillDao();
		List<SaleReport> exp1List = dao.billnowiseCreditsell(csBillNocust);

		return exp1List;
	}

	// Barcode No Wise Credit Sale Report
	public List barcodenowiseCredit(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		long barcodeCredit = Long.parseLong(request.getParameter("barcodeCredit"));

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CreditCustBillDao dao = new CreditCustBillDao();
		List<SaleReport> exp1List = dao.barcodenowiseCredit(barcodeCredit);

		return exp1List;
	}
	
	public void creditCustomerEditBillHelper(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("BILL EDIT HELPER");
		
		CreditCustBillDao ccbd = new CreditCustBillDao();
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			for (int i = 0; i < count; i++)
			{	
				String pkBillId = request.getParameter("pkBillId" + i);
				CreditCustomerBill cust = (CreditCustomerBill) session.get(CreditCustomerBill.class, Long.parseLong(pkBillId));
				
				String fkSaleEmployeeId = request.getParameter("saleEmpId" + i);
				cust.setFkSaleEmployeeId(Long.parseLong(fkSaleEmployeeId));
	
				String employeeName = request.getParameter("saleEmpName" + i);
				cust.setEmpName(employeeName);
				
				ccbd.creditCustomerUpdateBill(cust);
			}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (session != null) {
					session.close();
				}
			}
	}	
	
	public List getCcbProductListHelper()
	{
		CreditCustBillDao dao = new CreditCustBillDao();		
		return dao.getCreditCustSaleProductListDao();
	}
	
	
	
	public List paymentModeWiseReportForCreditCustHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String startDateForCC = request.getParameter("startDateForCC");
		String endDateForCC = request.getParameter("endDateForCC");
		String paymentModeForCC = request.getParameter("paymentModeForCC");
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		System.out.println("startDateForCC ===> "+startDateForCC);
		System.out.println("endDateForCC ===> "+endDateForCC);
		
		Date adate = null;
		Date bdate = null;
		try
		{
			adate = format.parse(startDateForCC);
			//bdate = format.parse(pmDate22);
		}
		catch (ParseException e1)
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		/*System.out.println("pmDate HELPER =========> "+pmDate);
		System.out.println("adate HELPER =========> "+adate);*/
		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		CreditCustBillDao dao = new CreditCustBillDao();
		List<SaleReport> exp1List = dao.paymentModeWiseReportDaoForCreditCust(startDateForCC, endDateForCC, paymentModeForCC, userTypeRole, userName);

		return exp1List;

	}	
	
	public void editBillCreditCustomerHelper(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("CREDIT CUSTOMER BILL EDIT HELPER");
		
		CreditCustBillDao obd = new CreditCustBillDao();
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		Double saleReturnCAmt = 0.0;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			for (int i = 0; i < count; i++)
			{	
				String pkBillId = request.getParameter("pkBillId" + i);
				CreditCustomerBill cust = (CreditCustomerBill) session.get(CreditCustomerBill.class, Long.parseLong(pkBillId));
				
				String fkShopId = request.getParameter("fkShopId" + i);
				cust.setFkShopId(Long.parseLong(fkShopId));
				
				String barcodeNo = request.getParameter("barcodeNo" + i);
				cust.setBarcodeNo(Long.parseLong(barcodeNo));
				String quantityToUpdateStock = request.getParameter("quantityToUpdateStock" + i);
				String quantity = request.getParameter("quantity" + i);
				cust.setQuantity(Double.parseDouble(quantity));
				
				String fkSaleEmployeeId = request.getParameter("saleEmpId" + i);
				cust.setFkSaleEmployeeId(Long.parseLong(fkSaleEmployeeId));
	
				String employeeName = request.getParameter("saleEmpName" + i);
				cust.setEmpName(employeeName);			
				
				String paymentMode = request.getParameter("paymentMode");
				cust.setPaymentMode(paymentMode);
				
				String finalCreditAmount = request.getParameter("netPaymentAmountCC");
				if(finalCreditAmount.equalsIgnoreCase("0") || finalCreditAmount.isEmpty() || finalCreditAmount.equalsIgnoreCase("") || finalCreditAmount == null)
				{}else
				{
					saleReturnCAmt = Double.parseDouble(finalCreditAmount);
				}
				
				String netPaymentAmountCC = request.getParameter("netPaymentAmountCC");
				if(paymentMode.equals("cash"))
				{	
					cust.setCashCard_cashAmount(Double.parseDouble(netPaymentAmountCC));
					cust.setCashCard_cardAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upidAmount(0.0);
				}
				else if(paymentMode.equals("card"))
				{
					cust.setCashCard_cardAmount(Double.parseDouble(netPaymentAmountCC));
					cust.setCashCard_cashAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upidAmount(0.0);
				}
				else if(paymentMode.equals("Upi"))
				{
					cust.setCashCard_cardAmount(0.0);
					cust.setCashCard_cashAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upidAmount(Double.parseDouble(netPaymentAmountCC));
				}
				else if(paymentMode.equals("cashAndCard"))
				{
					System.out.println("in side cash and card");
					String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");
					String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
					cust.setCashCard_cashAmount(Double.parseDouble(cashCard_cashAmount));
					cust.setCashCard_cardAmount(Double.parseDouble(cashCard_cardAmount));
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upidAmount(0.0);
				}
				else if(paymentMode.equals("cashAndupi"))
				{
					System.out.println("in side cash and Upi");
					String cashupi_cashAmount = request.getParameter("cashUpi_cashAmount");
					String cashupi_upiAmount = request.getParameter("cashUpi_upiAmount");
					cust.setCashupi_cashAmount(Double.parseDouble(cashupi_cashAmount));
					cust.setCashupi_upidAmount(Double.parseDouble(cashupi_upiAmount));
					cust.setCashCard_cardAmount(0.0);
					cust.setCashCard_cashAmount(0.0);
				}
				
				obd.updateCreditCustomerBill(cust);
				
				//Update Barcode Number Wise Stock
				Long barcodeNoLong = Long.parseLong(barcodeNo);
				Double oldQuantity = Double.parseDouble(quantityToUpdateStock);
				Double newQuantity = Double.parseDouble(quantity);
				Long shopIdLong = Long.parseLong(fkShopId);
				obd.updateBarcodeNoWiseStockEditSaleBillInvoice(barcodeNoLong, oldQuantity, newQuantity,shopIdLong);
			}
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
	}
	
	
	
	
	
	
	
	
}
