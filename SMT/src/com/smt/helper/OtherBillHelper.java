package com.smt.helper;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.itextpdf.text.log.SysoLogger;
import com.smt.bean.BillBean;
import com.smt.bean.CustomerBean;
import com.smt.bean.GoodReceiveEditBean;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.SaleInvoiceBillEditBean;
import com.smt.bean.SaleReport;
import com.smt.dao.CustomerOrderDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.OtherBillDao;
import com.smt.dao.ProductDetailDao;
import com.smt.dao.SaleReturnDao;
import com.smt.dao.StockDao;
import com.smt.dao.SupplierDetailDao;
import com.smt.hibernate.BillNumberGenratorHibernate;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.OtherBill;
import com.smt.hibernate.SaleReturn;
import com.smt.hibernate.Stock;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class OtherBillHelper
{
	DecimalFormat df = new DecimalFormat("#.##");

	Long BillNo = 1l;

	public void registerOtherBill(HttpServletRequest request, HttpServletResponse response)
	{
		//Code for Bill No Start
		BillNumberGenratorHibernate billNumberGenratorHibernate = new BillNumberGenratorHibernate();
		OtherBillDao dao1 = new OtherBillDao();
		billNumberGenratorHibernate = dao1.getBillNumberGenratorDetails();
		
		
		SimpleDateFormat simpleformat = new SimpleDateFormat(" DD MM yyyy");
		
		//Displaying month in MMMM format
		simpleformat = new SimpleDateFormat("MM yyyy");
		String strMonth = simpleformat.format(new Date());
		System.out.println("Month in MMMM format :- " + strMonth);
		
		String d1123 = strMonth.toString();
		String[] d = d1123.split(" ");
		String month = d[0];
		String year = d[1];
		
		SimpleDateFormat simpleformatnew = new SimpleDateFormat("DD MM yyyy");
		
		String lastUpdatedDate = simpleformatnew.format(billNumberGenratorHibernate.getUpdatedDate());
		String[] d1 = lastUpdatedDate.split(" ");
		String month1 = d1[1];
		//String year1 = d1[2];
		
		System.out.println("In Helper Last Updated Month  :- " + month1);
		//   31 march (3)<4   true  11 april (4)   1
		// 11 april (4)   ===
		if(Integer.parseInt(month1)<4 && Integer.parseInt(month)>=4) {
			billNumberGenratorHibernate.setBillNoCountor((long)0);
		}
		//String BillNo = year + "/" + month + "/" + "00" + 1;
		String BillNo = year + "/" + month + "/" + (billNumberGenratorHibernate.getBillNoCountor()+1);
		//Code for Bill No End
		
		HttpSession session3 = request.getSession();
		
		//This session is handle for get user type and id
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
				Query query1 = session2.createQuery("from UserDetail where userName =:name2");
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
				
				Query query1 = session2.createQuery("from UserDetail where userName =:name2");
				query1.setParameter("name2", name2);
				
				UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
				type2 = userDetail1.getTypeId();
				uid = userDetail1.getPkUserId();
			}
		}
		
		String shopId = (String)sessionv.getAttribute("shopId");
		
		/*OtherBillDao data = new OtherBillDao();
		List stkList = data.getLastBillNo();
		
		for (int i = 0; i < stkList.size(); i++)
		{
			BillBean st = (BillBean) stkList.get(i);
			//BillNo = st.getBillNo();
			BillNo = Long.parseLong(st.getBillNo());
			BillNo++;
		}*/
		
		OtherBill cust = new OtherBill();
		
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("In Healper registerOtherBill count :- "+count);
		
		String BillType=request.getParameter("billtype");
		System.out.println("In Healper registerOtherBill BillType :- "+BillType);
		
		if(BillType.equals("Temporay"))
		{
			for (int i = 0; i < count; i++)
			{
				//BillNo = Long.parseLong(request.getParameter("billNo"));
				//System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
				
				String barcodeNo = request.getParameter("barcodeNo" + i);
				Long item_id = Long.parseLong(request.getParameter("item_id" + i));
				String fkProductId = request.getParameter("fkProductId" + i);
				String itemName = request.getParameter("itemName" + i);
				String fkCatId = request.getParameter("fkCategoryId" + i);
				String categoryName = request.getParameter("categoryName" + i);
				String fkSubCatId = request.getParameter("fkSubCatId" + i);
				String hsnSacNo = request.getParameter("hsnSacNo" + i);
				String rollSize = request.getParameter("rollSize"+i);
				String size1 = request.getParameter("size1"+i);
				String style = request.getParameter("style"+i);
				String sQTY = request.getParameter("goodReceiveQuantity"+i);
				String quantity = request.getParameter("quantity" + i);
				String salePrice = request.getParameter("salePrice" + i);
				String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
				String perProductdisPer = request.getParameter("perProductdisPer"+i);
				String discountPerProduct = request.getParameter("perProductdisAmount"+i);
				String vat = request.getParameter("vat" + i);
				String igst = request.getParameter("igst" + i);
				String taxAmount = request.getParameter("taxAmount" + i);
				String taxAmountAfterDis = request.getParameter("taxAmountAfterDis" + i);
				String total = request.getParameter("total" + i);
				String saleEmpId = request.getParameter("saleEmpId"+i);
				String saleEmpName = request.getParameter("saleEmpName"+i);
				String fkSuppId = request.getParameter("fkSuppId"+i);
				
				String totalAmount = request.getParameter("totalAmount");
				String totalCreditAmt = request.getParameter("totalCreditAmt");
				
				String paymentMode = request.getParameter("paymentMode");
				String chequeNum = request.getParameter("chequeNum");
				String cardNum = request.getParameter("cardNum");
				String accNum = request.getParameter("accNum");
				String nameOnCheck = request.getParameter("nameOnCheck");
				String bankName = request.getParameter("bankName");
				
				String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");
				String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
				String cashupi_cashAmount = request.getParameter("cashCard_cashAmount1");
				String cashupi_upiAmount = request.getParameter("cashCard_upiAmount");
				
				String BillType1=request.getParameter("billtype");
				
				String creditCustomer1 = request.getParameter("creditCustomer1");
				String CustGst = request.getParameter("CustGst");
				String mobileNo = request.getParameter("mobileNo");
				String grossTotal = request.getParameter("grossTotal");

				System.out.println("item_id" + item_id);
				System.out.println("totalCreditAmt" + totalCreditAmt);
				System.out.println("item_id" + item_id);
				System.out.println("BillType1 :-"+BillType1);
				
				
				cust.setBarcodeNo(Long.parseLong(barcodeNo));
				cust.setFkProductId(Long.parseLong(fkProductId));
				cust.setFkgoodreciveid(item_id);
				cust.setItemName(itemName);
				cust.setFkCatId(Long.parseLong(fkCatId));
				cust.setCategoryName(categoryName);
				cust.setFkSubCatId(Long.parseLong(fkSubCatId));
				cust.setHsnSacNo(hsnSacNo);
				cust.setRollsize(Double.parseDouble(rollSize));
				cust.setSize(size1);
				cust.setStyle(style);
				cust.setQuantity(Double.parseDouble(quantity));
				cust.setSalePrice(Double.parseDouble(salePrice));
				cust.setSpWithoutTaxAmount(Double.parseDouble(sPWithoutTax));
				
				if(perProductdisPer == null || perProductdisPer.equalsIgnoreCase("") || perProductdisPer.isEmpty())
				{
					cust.setPerProductdisPer(0.0);
				} else {
					cust.setPerProductdisPer(Double.parseDouble(perProductdisPer));
				}
				if(discountPerProduct == null || discountPerProduct.equalsIgnoreCase("") || discountPerProduct.isEmpty())
				{
					cust.setDiscount(0.0);				
				} else {
					cust.setDiscount(Double.parseDouble(discountPerProduct));
				}
				if (vat.equalsIgnoreCase("0"))
				{
					cust.setVat(Double.parseDouble(vat));
				} else {
					cust.setVat(Double.parseDouble(vat));
				}
				cust.setIgst(0d);
				cust.setTaxAmount(Double.parseDouble(taxAmount));
				if(taxAmountAfterDis == null || taxAmountAfterDis.isEmpty() || taxAmountAfterDis.equalsIgnoreCase(""))
				{
					cust.setTaxAmtAfterDiscount(0.0);
				} else {
					cust.setTaxAmtAfterDiscount(Double.parseDouble(taxAmountAfterDis));
				}
				cust.setTotalperItem(Double.parseDouble(total));
				
				
				if(saleEmpId == null || saleEmpId.isEmpty() || saleEmpId.equalsIgnoreCase("") || saleEmpId.equalsIgnoreCase(" "))
				{
					cust.setFkSaleEmployeeId(0l);				
				} else {
					cust.setFkSaleEmployeeId(Long.parseLong(saleEmpId));
				}
				if (saleEmpName.equalsIgnoreCase("") || saleEmpName == null || saleEmpName.equalsIgnoreCase("undefined") || saleEmpName.equalsIgnoreCase(" "))
				{				
					cust.setEmployeeName("NA");				
				} else {
					cust.setEmployeeName(saleEmpName);
				}
				
				cust.setFkSuppId(Long.parseLong(fkSuppId));
				
				if(totalCreditAmt == null || totalCreditAmt.isEmpty())
				{
					totalCreditAmt = "0";
					cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
				} else {
					cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
				}
				
				//Payment Details
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
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String cardAmount = request.getParameter("cardAmount");
						cust.setCashCard_cardAmount(Double.parseDouble(cardAmount));
					} else {
						cust.setCashCard_cardAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashCard_cashAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
					int cardNumLength = cardNum.length();
					if (cardNumLength > 0) {
						cust.setCardNum(Long.parseLong(cardNum));
					} else {
						cust.setCardNum(null);
					}
				}
				else if (paymentMode.equals("neft"))
				{
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
				}
				else if (paymentMode.equals("cash"))
				{
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String cashAmount = request.getParameter("cashAmount");
						cust.setCashCard_cashAmount(Double.parseDouble(cashAmount));
					} else {
						cust.setCashCard_cashAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashCard_cardAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
				}
				else if (paymentMode.equals("Upi"))
				{
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String upiAmount = request.getParameter("UpiAmount");
						cust.setCashupi_upiAmount(Double.parseDouble(upiAmount));
					} else {
						cust.setCashupi_upiAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashupi_cashAmount(0.0);
					cust.setCashCard_cardAmount(0.0);
					cust.setCashCard_cashAmount(0.0);
				}
				if (paymentMode.equals("cashAndupi"))
				{
					if(cashupi_cashAmount.equals("") || cashupi_cashAmount.isEmpty() || cashupi_cashAmount == null)
					{
						System.out.println("inside if of upi cash 0");
						cust.setCashupi_cashAmount(0.0);
					} else {
						System.out.println("inside else of upi cash "+cashupi_cashAmount);
						cust.setCashupi_cashAmount(Double.parseDouble(cashupi_cashAmount));
					}
					if(cashupi_upiAmount.equals("") || cashupi_upiAmount.isEmpty() || cashupi_upiAmount == null)
					{
						System.out.println("inside if of upi  0 ");
						cust.setCashupi_upiAmount(0.0);
					} else {
						System.out.println("inside if of upi amount "+cashupi_upiAmount);
						cust.setCashupi_upiAmount(Double.parseDouble(cashupi_upiAmount));
					}
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
					cust.setCashupi_upiAmount(0.0);
				}
				
				
				cust.setBilltype(BillType1);
				
				if (creditCustomer1.equalsIgnoreCase("") || creditCustomer1 == null || creditCustomer1.equalsIgnoreCase("undefined") || creditCustomer1.equalsIgnoreCase(" "))
				{				
					cust.setCreditCustomer1("N/A");			
				} else {
					cust.setCreditCustomer1(creditCustomer1);
				}
				if (CustGst.equalsIgnoreCase("") || CustGst == null || CustGst.equalsIgnoreCase("undefined") || CustGst.equalsIgnoreCase(" "))
				{				
					cust.setCustGst("N/A");			
				} else {
					cust.setCustGst(CustGst);
				}
				if (!"".equals(mobileNo)) {
					cust.setMobileNo(Long.parseLong(mobileNo));
				} else {
					cust.setMobileNo(Long.parseLong("00"));
				}
				
				cust.setTotalAmt(Double.parseDouble(totalAmount));
				
				
				cust.setCarNo("NA");
				cust.setContactNo(000l);
				cust.setOwnerName("NA");
				cust.setGrossamt(Double.parseDouble(grossTotal));
				
				
				//this two value save user id and userType
				cust.setEmpType(type2);
				System.out.println("type2 ====> "+type2);
				cust.setEmpIdFK(uid);
				System.out.println("uid ====>  "+uid);
				
				DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
				Date dateobj = new Date();
				System.out.println(df.format(dateobj));
				String newDate = df.format(dateobj);
				cust.setCurrent_date(dateobj);
				
				Date now = new Date();
				cust.setBillTime(now);
				
				
				//get bill no auto increment
				session3.setAttribute("BillNo", BillNo);
				session3.setAttribute("customerName", creditCustomer1);
				session3.setAttribute("CustGst", CustGst);
				
				
				cust.setBillNo(BillNo);
				/*if (BillNo == null) {
					cust.setBillNo(1);
				} else {
					System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
					cust.setBillNo(BillNo);
				}*/
				
				cust.setFkShopId(Long.parseLong(shopId));
				
				OtherBillDao dao2 = new OtherBillDao();
				dao2.registerBill(cust);
				
				/*//updateBillNumberGenratorDetails Code
				billNumberGenratorHibernate.setUpdatedDate(new Date());
				billNumberGenratorHibernate.setBillNoCountor(billNumberGenratorHibernate.getBillNoCountor()+1);
				dao.updateBillNumberGenratorDetails(billNumberGenratorHibernate);*/
			}
			//updateBillNumberGenratorDetails Code
			OtherBillDao dao3 = new OtherBillDao();
			billNumberGenratorHibernate.setUpdatedDate(new Date());
			billNumberGenratorHibernate.setBillNoCountor(billNumberGenratorHibernate.getBillNoCountor()+1);
			dao3.updateBillNumberGenratorDetails(billNumberGenratorHibernate);
		}
		
		else if(BillType.equals("Permanent"))
		{
			for (int i = 0; i < count; i++)
			{
				//BillNo = Long.parseLong(request.getParameter("billNo"));
				//System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
				
				String BillType1=request.getParameter("billtype");
				String barcodeNo = request.getParameter("barcodeNo" + i);
				Long item_id = Long.parseLong(request.getParameter("item_id" + i));
				String fkProductId = request.getParameter("fkProductId" + i);
				String itemName = request.getParameter("itemName" + i);
				String fkCatId = request.getParameter("fkCategoryId" + i);
				String categoryName = request.getParameter("categoryName" + i);
				String fkSubCatId = request.getParameter("fkSubCatId" + i);
				String hsnSacNo = request.getParameter("hsnSacNo" + i);
				String rollSize = request.getParameter("rollSize"+i);
				String size1 = request.getParameter("size1"+i);
				String style = request.getParameter("style"+i);
				String sQTY = request.getParameter("goodReceiveQuantity"+i);
				String quantity = request.getParameter("quantity" + i);
				String salePrice = request.getParameter("salePrice" + i);
				String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
				String perProductdisPer = request.getParameter("perProductdisPer"+i);
				String discountPerProduct = request.getParameter("perProductdisAmount"+i);
				String vat = request.getParameter("vat" + i);
				String igst = request.getParameter("igst" + i);
				String taxAmount = request.getParameter("taxAmount" + i);
				String taxAmountAfterDis = request.getParameter("taxAmountAfterDis" + i);
				String total = request.getParameter("total" + i);
				
				
				String saleEmpId = request.getParameter("saleEmpId"+i);
				String saleEmpName = request.getParameter("saleEmpName"+i);
				
				String fkSuppId = request.getParameter("fkSuppId"+i);
				
				String totalAmount = request.getParameter("totalAmount");
				String totalCreditAmt = request.getParameter("totalCreditAmt");
				
				String paymentMode = request.getParameter("paymentMode");
				String chequeNum = request.getParameter("chequeNum");
				String cardNum = request.getParameter("cardNum");
				String accNum = request.getParameter("accNum");
				String nameOnCheck = request.getParameter("nameOnCheck");
				String bankName = request.getParameter("bankName");
				
				String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");
				String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
				String cashupi_cashAmount = request.getParameter("cashCard_cashAmount1");
				String cashupi_upiAmount = request.getParameter("cashCard_upiAmount");
				
				String creditCustomer1 = request.getParameter("creditCustomer1");
				String CustGst = request.getParameter("custGst");
				String mobileNo = request.getParameter("mobileNo");
				
				String grossTotal = request.getParameter("grossTotal");
				
				
				System.out.println("BillType1 :- "+BillType1);
				System.out.println("item_id :- " + item_id);
				
				cust.setBilltype(BillType1);
				
				cust.setBarcodeNo(Long.parseLong(barcodeNo));
				cust.setFkgoodreciveid(item_id);
				cust.setFkProductId(Long.parseLong(fkProductId));
				cust.setItemName(itemName);
				cust.setFkCatId(Long.parseLong(fkCatId));
				cust.setCategoryName(categoryName);
				cust.setFkSubCatId(Long.parseLong(fkSubCatId));
				cust.setHsnSacNo(hsnSacNo);
				cust.setRollsize(Double.parseDouble(rollSize));
				cust.setSize(size1);
				cust.setStyle(style);
				cust.setQuantity(Double.parseDouble(quantity));
				cust.setSpWithoutTaxAmount(Double.parseDouble(sPWithoutTax));
				
				
				if(perProductdisPer == null || perProductdisPer.equalsIgnoreCase("") || perProductdisPer.isEmpty())
				{
					cust.setPerProductdisPer(0.0);
				} else {
					cust.setPerProductdisPer(Double.parseDouble(perProductdisPer));
				}
				if(discountPerProduct == null || discountPerProduct.equalsIgnoreCase("") || discountPerProduct.isEmpty())
				{
					cust.setDiscount(0.0);				
				} else {
					cust.setDiscount(Double.parseDouble(discountPerProduct));
				}
				
				double gstAmt = 0.0;
				if (vat.equalsIgnoreCase("0"))
				{
					cust.setVat(Double.parseDouble(vat));
				} else {
					cust.setVat(Double.parseDouble(vat));
					gstAmt = (Double.parseDouble(salePrice)-Double.parseDouble(sPWithoutTax));
					System.out.println("gstAmt =========> "+gstAmt);
				}
				cust.setIgst(0d);
				cust.setTaxAmount(Double.parseDouble(taxAmount));
				
				if(taxAmountAfterDis == null || taxAmountAfterDis.isEmpty() || taxAmountAfterDis.equalsIgnoreCase(""))
				{
					cust.setTaxAmtAfterDiscount(0.0);
				} else {
					cust.setTaxAmtAfterDiscount(Double.parseDouble(taxAmountAfterDis));
				}
				cust.setTotalperItem(Double.parseDouble(total));
				
				
				if(saleEmpId == null || saleEmpId.isEmpty() || saleEmpId.equalsIgnoreCase("") || saleEmpId.equalsIgnoreCase(" "))
				{
					cust.setFkSaleEmployeeId(0l);				
				} else {
					cust.setFkSaleEmployeeId(Long.parseLong(saleEmpId));
				}
				if (saleEmpName.equalsIgnoreCase("") || saleEmpName == null || saleEmpName.equalsIgnoreCase("undefined") || saleEmpName.equalsIgnoreCase(" "))
				{				
					cust.setEmployeeName("NA");				
				} else {
					cust.setEmployeeName(saleEmpName);
				}
				
				cust.setFkSuppId(Long.parseLong(fkSuppId));
				
				cust.setTotalAmt(Double.parseDouble(totalAmount));
				
				if(totalCreditAmt == null || totalCreditAmt.isEmpty())
				{
					totalCreditAmt = "0";
					cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
				} else {
					cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
				}
				
				
				
				//Payment Details
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
				}
				else if (paymentMode.equals("card"))
				{
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String cardAmount = request.getParameter("cardAmount");
						cust.setCashCard_cardAmount(Double.parseDouble(cardAmount));
					} else {
						cust.setCashCard_cardAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashCard_cashAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
					int cardNumLength = cardNum.length();
					if (cardNumLength > 0) {
						cust.setCardNum(Long.parseLong(cardNum));
					} else {
						cust.setCardNum(null);
					}
				}
				else if (paymentMode.equals("neft"))
				{
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
				}
				else if (paymentMode.equals("cash"))
				{				
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String cashAmount = request.getParameter("cashAmount");
						cust.setCashCard_cashAmount(Double.parseDouble(cashAmount));
					} else {
						cust.setCashCard_cashAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashCard_cardAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
				}
				else if (paymentMode.equals("Upi"))
				{				
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String upiAmount = request.getParameter("UpiAmount");
						cust.setCashupi_upiAmount(Double.parseDouble(upiAmount));
					} else {
						cust.setCashupi_upiAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashupi_cashAmount(0.0);
					cust.setCashCard_cardAmount(0.0);
					cust.setCashCard_cashAmount(0.0);
				}
				if (paymentMode.equals("cashAndupi"))
				{
					if(cashupi_cashAmount.equals("") || cashupi_cashAmount.isEmpty() || cashupi_cashAmount == null)
					{
						
						System.out.println("inside if of upi cash 0");
						cust.setCashupi_cashAmount(0.0);
					} else {
						System.out.println("inside else of upi cash "+cashupi_cashAmount);
						cust.setCashupi_cashAmount(Double.parseDouble(cashupi_cashAmount));
					}
					if(cashupi_upiAmount.equals("") || cashupi_upiAmount.isEmpty() || cashupi_upiAmount == null)
					{
						System.out.println("inside if of upi  0 ");
						cust.setCashupi_upiAmount(0.0);
					} else {
						System.out.println("inside if of upi amount "+cashupi_upiAmount);
						cust.setCashupi_upiAmount(Double.parseDouble(cashupi_upiAmount));
					}
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
					cust.setCashupi_upiAmount(0.0);
				}
				
				cust.setCarNo("NA");
				cust.setContactNo(000l);
				cust.setOwnerName("NA");
				
				if (creditCustomer1.equalsIgnoreCase("") || creditCustomer1 == null || creditCustomer1.equalsIgnoreCase("undefined") || creditCustomer1.equalsIgnoreCase(" "))
				{				
					cust.setCreditCustomer1("N/A");			
				} else {
					cust.setCreditCustomer1(creditCustomer1);
				}
				if (CustGst.equalsIgnoreCase("") || CustGst == null || CustGst.equalsIgnoreCase("undefined") || CustGst.equalsIgnoreCase(" "))
				{				
					cust.setCustGst("N/A");			
				} else {
					cust.setCustGst(CustGst);
				}
				cust.setSalePrice(Double.parseDouble(salePrice));

				if (!"".equals(mobileNo)) {

					cust.setMobileNo(Long.parseLong(mobileNo));
				} else {

					cust.setMobileNo(Long.parseLong("00"));
				}
				
				cust.setGrossamt(Double.parseDouble(grossTotal));
				
				//this two value save user id and userType
				cust.setEmpType(type2);
				System.out.println("type2 ====> "+type2);
				cust.setEmpIdFK(uid);
				System.out.println("uid ====>  "+uid);
				
				
				DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
				Date dateobj = new Date();
				System.out.println(df.format(dateobj));
				String newDate = df.format(dateobj);
				cust.setCurrent_date(dateobj);
				
				Date now = new Date();
				cust.setBillTime(now);
				
				//get bill no auto increment
				session3.setAttribute("BillNo", BillNo);
				session3.setAttribute("customerName", creditCustomer1);
				session3.setAttribute("CustGst", CustGst);
				
				/*if (BillNo == null) {
					cust.setBillNo(1l);
				} else {
					System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
					cust.setBillNo(BillNo);
				}*/
				
				cust.setBillNo(BillNo);
				
				cust.setFkShopId(Long.parseLong(shopId));
				
				OtherBillDao dao4 = new OtherBillDao();
				dao4.registerBill(cust);
				
				/*//updateBillNumberGenratorDetails Code
				billNumberGenratorHibernate.setUpdatedDate(new Date());
				billNumberGenratorHibernate.setBillNoCountor(billNumberGenratorHibernate.getBillNoCountor()+1);
				dao.updateBillNumberGenratorDetails(billNumberGenratorHibernate);*/
				
				
				//Update Barcode Number Wise Stock Sale Invoice
				Long barcodeNoLong = Long.parseLong(barcodeNo);
				Double quantityDouble = Double.parseDouble(quantity);
				Long shopIdLong = Long.parseLong(shopId);
				dao4.updateBarcodeNoWiseStockSaleInvoce(barcodeNoLong, quantityDouble,shopIdLong);
				
				//Update Good Receive Quantity
				GoodReciveDao good = new GoodReciveDao();
				good.updateQuantity(item_id, quantity, rollSize, sQTY, size1);
				
				
				StockDao stockDao = new StockDao();
				List stkList2 = stockDao.getAllStockEntry();
				Double updatequnty = 0.0;
				for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long productId = st.getFkProductId();
					Long categoryId = st.getFkCategoryId();
					Long fkShopId = st.getFkShopId();

					/* If ItemName Is Already Exists In Stock Table */
					//if (ItemId.equals(itemName) && cat.equals(categoryName))
					if (productId == Long.parseLong(fkProductId) && categoryId == Long.parseLong(fkCatId) && fkShopId == Long.parseLong(shopId))
					{
						Long PkItemId = st.getPkStockId();
						Double qunty = st.getQuantity();
						
						double QTY = 0.0;
						if(!rollSize.equals("0"))
						{	
							List<Double> list = null;
							Double totalQty = 0.0;
							HibernateUtility hbuSu = HibernateUtility.getInstance();
							Session sessionSu = hbuSu.getHibernateSession();
							Transaction transactionSu = sessionSu.beginTransaction();
							org.hibernate.Query querySu = sessionSu.createSQLQuery("select SUM(gr.Quantity) from goodreceive gr where gr.fkProductId = :fkProductId AND gr.fkCatId = :fkCatId AND gr.fkShopId = :fkShopId");
							querySu.setParameter("fkProductId", fkProductId);
							querySu.setParameter("fkCatId", fkCatId);
							querySu.setParameter("fkShopId", fkShopId);
							list = querySu.list();
							updatequnty = list.get(0).doubleValue();
						} else {
							updatequnty = (Double) (qunty - Double.parseDouble(quantity));
						}

						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();

						Date date = new Date();

						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setQuantity(updatequnty);
						updateStock.setUpdateDate(date);
						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}
			}
			
			//updateBillNumberGenratorDetails Code
			OtherBillDao dao5 = new OtherBillDao();
			billNumberGenratorHibernate.setUpdatedDate(new Date());
			billNumberGenratorHibernate.setBillNoCountor(billNumberGenratorHibernate.getBillNoCountor()+1);
			dao5.updateBillNumberGenratorDetails(billNumberGenratorHibernate);
			
			int gCount1 = 0;
			String count1 = request.getParameter("count1");
			if(count1 == null || count1.isEmpty() || count1 == "" || count1 == " ")
			{
				gCount1 = 0;
			} else {
				gCount1 = Integer.parseInt(count1);
			}
			
			System.out.println("GRID COUNT ====> "+count1);
			
			if(gCount1 > 0)
			{
				System.out.println("c22222 ====> " + count1);
				HibernateUtility hbu2 = null;
				Session session2 = null;
				Transaction transaction2 = null;
		
				try
				{
					hbu2 = HibernateUtility.getInstance();
					session2 = hbu2.getHibernateSession();
					transaction2 = session2.beginTransaction();		
					for(int j=0; j<gCount1; j++)
					{				
						String transactionId = request.getParameter("transactionId"+j);
						Query query = session2.createSQLQuery("UPDATE salereturn set redeemedForBillNo = "+BillNo+" WHERE transactionId = "+transactionId);
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
	}
	
	// pdf copy of other bill
	public void OtherBillCOPY(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String billNo = request.getParameter("billNo");
		System.out.println("----------------Bill No before session create::" + billNo);
		HttpSession session3 = request.getSession();
		//Long billNo2 = Long.parseLong(billNo);
		session3.setAttribute("billNo2", billNo);
	}

	// get single date Miscellaneos customer Sale
	public List miscellaneousSingleDate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		System.out.println("Date format from js @@@@@@@@@@@@@@@@"+fDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");		    

		String adate = null;
		try {
			
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(fDate);
		    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		     adate = formatter.format(date);  
		    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
			
			
			//adate = format.parse(fDate);
			System.out.println("Date for other bill Sale report "+adate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.miscellaneousSingleDate(fDate);

		return exp1List;
	}
	
	//get singal date sale return report
	public List CSRSingleDate(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		System.out.println("Date format from js @@@@@@@@@@@@@@@@"+fDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		String adate = null;
		try {
			
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(fDate);
		    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		     adate = formatter.format(date);  
		    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
			
			
			//adate = format.parse(fDate);
			System.out.println("Date for other bill Sale report "+adate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.CSRSingleDate(fDate);

		return exp1List;
	}
	

	// get Two date Miscellaneos customer Sale
	public List miscellaneousTwoDate(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("fDate");
		String eDate = request.getParameter("eDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		String adate = null;
		String bdate = null;
		try {
			
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(fDate);
			Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(eDate);
			
		    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		    // adate = formatter.format(date);  
		    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
			
			adate = formatter.format(date); ;
			bdate = formatter.format(date1); ;
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.miscellaneousTwoDate(fDate, eDate);

		return exp1List;
	}
	
	// get Two date Credit customer Sale Return
		public List CCSRTwoDate(HttpServletRequest request, HttpServletResponse response)
		{
			// TODO Auto-generated method stub
			String fDate = request.getParameter("fDate");
			String eDate = request.getParameter("eDate");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

			String adate = null;
			String bdate = null;
			try {
				
				Date date = new SimpleDateFormat("yyyy-MM-dd").parse(fDate);
				Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(eDate);
				
			    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
			    // adate = formatter.format(date);  
			    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
				
				adate = formatter.format(date); ;
				bdate = formatter.format(date1); ;
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

			OtherBillDao dao = new OtherBillDao();
			List<SaleReport> exp1List = dao.CCSRTwoDate(fDate, eDate);

			return exp1List;
		}

	// get category wise Miscellaneos customer Sale
	public List miscellaneousSaleWiseCustomer(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String mscatId = request.getParameter("mscatId");

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.miscellaneousSaleWiseCustomer(mscatId);

		return exp1List;
	}
	// get category wise Credit customer Sale return
	public List CCSRSaleWiseCustomer(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String mscatId = request.getParameter("mscatId");
		System.out.println("hi vikas your in helper");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.CCSRSaleWiseCustomer(mscatId);

		return exp1List;
	}

	// get Bill no wise Miscellaneos customer Sale
	public List billnowiseMiscellaneoussell(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String msBillNocust = request.getParameter("msBillNocust");

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.billnowiseMiscellaneoussell(msBillNocust);

		return exp1List;
	}
	
	// get Bill no wise Credit customer Sale Return Report
		public List billnowiseCCSR(HttpServletRequest request, HttpServletResponse response) {
			// TODO Auto-generated method stub
			long msBillNocust = Long.parseLong(request.getParameter("msBillNocust"));

			Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

			OtherBillDao dao = new OtherBillDao();
			List<SaleReport> exp1List = dao.billnowiseCCSR(msBillNocust);

			return exp1List;
		}
		
		
		public List Taxinvoicewithoutbarcode(HttpServletRequest request, HttpServletResponse response) {
			// TODO Auto-generated method stub
			long msBillNocust = Long.parseLong(request.getParameter("msBillNocust"));

			Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

			OtherBillDao dao = new OtherBillDao();
			List<SaleReport> exp1List = dao.billnowiseCCSR(msBillNocust);

			return exp1List;
		}
		

	// Barcode No Wise Miscellaneos Sale Report
	public List barcodenowiseMiscellaneoussell(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		long barcodeMiscellaneous = Long.parseLong(request.getParameter("barcodeMiscellaneous"));

		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.barcodenowiseMiscellaneoussell(barcodeMiscellaneous);

		return exp1List;
	}
	
	// Barcode No Wise Credit Customer Sale Return Report
		public List barcodenowiseCCSR(HttpServletRequest request, HttpServletResponse response) {
			// TODO Auto-generated method stub
			long barcodeMiscellaneous = Long.parseLong(request.getParameter("barcodeMiscellaneous"));

			Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

			OtherBillDao dao = new OtherBillDao();
			List<SaleReport> exp1List = dao.barcodenowiseCCSR(barcodeMiscellaneous);

			return exp1List;
		}
	
	// EmpName For Grid
	public List getEmployee()
	{
		System.out.println("grid emp in helper");
		OtherBillDao dao = new OtherBillDao();
		return dao.getEmployeeNameforGrid();

	}
	
	public List purchaseReturnSingleDateHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String pRDate = request.getParameter("pRDate");
		System.out.println("Date format from js @@@@@@@@@@@@@@@@"+pRDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		String adate = null;
		try {
			
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(pRDate);
		    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		     adate = formatter.format(date);  
		    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
			
			
			//adate = format.parse(fDate);
			System.out.println("Date for other bill Sale report "+adate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<PurchaseReportBean> exp1List = dao.purchaseReturnSingleDateDao(pRDate);

		return exp1List;
	}
	
	public List purchaseReturnRangeWiseHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String pRFisDate = request.getParameter("pRFisDate");
		String pREndDate = request.getParameter("pREndDate");
		System.out.println("Date format from js @@@@@@@@@@@@@@@@"+pRFisDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		String adate = null;
		try {
			
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(pRFisDate);
		    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		     adate = formatter.format(date);  
		    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
			
			
			//adate = format.parse(fDate);
			System.out.println("Date for other bill Sale report "+adate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<PurchaseReportBean> exp1List = dao.purchaseReturnRangeWiseDao(pRFisDate, pREndDate);

		return exp1List;
	}
	
	public List purchaseReturnBillNoWiseHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String pRBillNo = request.getParameter("pRBillNo");
		String supplierpR = request.getParameter("supplierpR");
		String suppId = request.getParameter("suppId");
		System.out.println("Date format from js @@@@@@@@@@@@@@@@"+pRBillNo);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");		
		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		OtherBillDao dao = new OtherBillDao();
		List<PurchaseReportBean> exp1List = dao.purchaseReturnBillNoWiseDao(pRBillNo, supplierpR, suppId);

		return exp1List;
	}
	
	public void editBillTaxInvoiceHelper(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("BILL EDIT HELPER");
		
		OtherBillDao dao = new OtherBillDao();
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
				OtherBill cust = (OtherBill) session.get(OtherBill.class, Long.parseLong(pkBillId));
				
				String fkShopId = request.getParameter("fkShopId" + i);
				cust.setFkShopId(Long.parseLong(fkShopId));
				
				String barcodeNo = request.getParameter("barcodeNo" + i);
				cust.setBarcodeNo(Long.parseLong(barcodeNo));
				
				String quantityToUpdateStock = request.getParameter("quantityToUpdateStock" + i);
				
				String quantity = request.getParameter("quantity" + i);
				cust.setQuantity(Long.parseLong(quantity));
				
				String fkSaleEmployeeId = request.getParameter("saleEmpId" + i);
				cust.setFkSaleEmployeeId(Long.parseLong(fkSaleEmployeeId));
	
				String employeeName = request.getParameter("saleEmpName" + i);
				cust.setEmployeeName(employeeName);			
				
				String creditCustomer1 = request.getParameter("creditCustomer1");
				cust.setCreditCustomer1(creditCustomer1);
				
				String CustGst = request.getParameter("CustGst");
				cust.setCustGst(CustGst);
				
				String finalCreditAmount = request.getParameter("finalCreditAmount");
				if(finalCreditAmount.equalsIgnoreCase("0") || finalCreditAmount.isEmpty() || finalCreditAmount.equalsIgnoreCase("") || finalCreditAmount == null)
				{}else
				{
					saleReturnCAmt = Double.parseDouble(finalCreditAmount);
				}
				
				String mobileNo = request.getParameter("mobileNo");
				if(mobileNo.isEmpty() || mobileNo.equalsIgnoreCase("") || mobileNo == null)
				{
					cust.setMobileNo(0l);
				}
				else
				{
					cust.setMobileNo(Long.parseLong(mobileNo));
				}
				
				String paymentMode = request.getParameter("paymentMode");
				cust.setPaymentMode(paymentMode);
				
				String totalAmount = request.getParameter("totalAmount");
				if(paymentMode.equals("cash"))
				{	
					cust.setCashCard_cashAmount(Double.parseDouble(totalAmount) - saleReturnCAmt);
					cust.setCashCard_cardAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
				}
				else if(paymentMode.equals("card"))
				{
					cust.setCashCard_cardAmount(Double.parseDouble(totalAmount) - saleReturnCAmt);
					cust.setCashCard_cashAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
				}
				else if(paymentMode.equals("Upi"))
				{
					cust.setCashCard_cardAmount(0.0);
					cust.setCashCard_cashAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(Double.parseDouble(totalAmount) - saleReturnCAmt);
				}
				else if(paymentMode.equals("cashAndCard"))
				{
					String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");
					String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
					cust.setCashCard_cashAmount(Double.parseDouble(cashCard_cashAmount));
					cust.setCashCard_cardAmount(Double.parseDouble(cashCard_cardAmount));
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
				}
				
				else if(paymentMode.equals("cashAndupi"))
				{
					String cashupi_cashAmount = request.getParameter("cashupi_cashAmount");
					String cashupi_upiAmount = request.getParameter("cashupi_upiAmount");
					cust.setCashupi_cashAmount(Double.parseDouble(cashupi_cashAmount));
					cust.setCashupi_upiAmount(Double.parseDouble(cashupi_upiAmount));	
					cust.setCashCard_cardAmount(0.0);
					cust.setCashCard_cashAmount(0.0);
				}
				
				dao.updateBill(cust);
				
				//Update Barcode Number Wise Stock
				Long barcodeNoLong = Long.parseLong(barcodeNo);
				Double oldQuantity = Double.parseDouble(quantityToUpdateStock);
				Double newQuantity = Double.parseDouble(quantity);
				Long shopIdLong = Long.parseLong(fkShopId);
				dao.updateBarcodeNoWiseStockEditSaleBillInvoice(barcodeNoLong, oldQuantity, newQuantity,shopIdLong);
				
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

	
	public List Taxinvoicewisesalereport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String TaxvoiceId = request.getParameter("TaxvoiceId");
		String userTypeRole = request.getParameter("userTypeRole");
		String userName = request.getParameter("userName");
		String BillFirstDate = request.getParameter("BillFirstDate");
		String BillEndDate = request.getParameter("BillEndDate");
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();
		OtherBillDao dao = new OtherBillDao();
		List<SaleReport> exp1List = dao.Taxinvoicewisesalereport(TaxvoiceId,userTypeRole,userName, BillFirstDate, BillEndDate);
		return exp1List;
	}
	
	public void registerOtherBill123(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session3 = request.getSession();
		
		//this session is handel for get user type and id
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
		
		String shopId = (String)sessionv.getAttribute("shopId");
		String BillNo=request.getParameter("TempBillNo");
		System.out.println("Before Delete BillNo :- "+BillNo);
		
		OtherBillDao data = new OtherBillDao();
		data.deletebill(shopId, BillNo);
		
		
		OtherBill cust = new OtherBill();
		
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);

		String BillType=request.getParameter("billtype");
		System.out.println(BillType);
		
		String BillNo1=request.getParameter("TempBillNo");
		System.out.println("before delete"+BillNo1);
		
		for (int i = 0; i < count; i++)
		{
			//BillNo2 = Long.parseLong(request.getParameter("TempBillNo"));
			System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
			
			String BillType1=request.getParameter("billtype");
			System.out.println(BillType1);
			
			String barcodeNo = request.getParameter("barcodeNo" + i);
			String fkProductId = request.getParameter("fkProductId" + i);
			String itemName = request.getParameter("itemName" + i);
			String fkCatId = request.getParameter("fkCategoryId" + i);
			String categoryName = request.getParameter("categoryName" + i);
			String fkSubCatId = request.getParameter("fkSubCatId" + i);
			String hsnSacNo = request.getParameter("hsnSacNo" + i);
			String rollSize = request.getParameter("rollSize"+i);
			String size1 = request.getParameter("size1"+i);
			String sQTY = request.getParameter("goodReceiveQuantity"+i);
			String quantity = request.getParameter("quantity" + i);
			String salePrice = request.getParameter("salePrice" + i);
			String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
			String perProductdisPer = request.getParameter("perProductdisPer"+i);
			String discountPerProduct = request.getParameter("perProductdisAmount"+i);
			String vat = request.getParameter("vat" + i);
			String igst = request.getParameter("igst" + i);
			String taxAmountAfterDis = request.getParameter("taxAmountAfterDis" + i);
			
			String total = request.getParameter("total" + i);
			
			String saleEmpId = request.getParameter("saleEmpId"+i);
			String saleEmpName = request.getParameter("saleEmpName"+i);
			
			String totalAmount = request.getParameter("totalAmount1");
			String totalCreditAmt = request.getParameter("totalCreditAmt1");
			
			String paymentMode = request.getParameter("paymentMode1");
			String chequeNum = request.getParameter("chequeNum1");
			String cardNum = request.getParameter("cardNum1");
			String accNum = request.getParameter("accNum1");
			String nameOnCheck = request.getParameter("nameOnCheck1");
			String bankName = request.getParameter("bankName1");
			
			String cashCard_cashAmount = request.getParameter("cashCard_cashAmount1");
			String cashCard_cardAmount = request.getParameter("cashCard_cardAmount1");
			String cashupi_cashAmount = request.getParameter("cashCard_cashAmount11");
			String cashupi_upiAmount = request.getParameter("cashCard_upiAmount1");
			
			String creditCustomer1 = request.getParameter("creditCustomer11");
			String mobileNo = request.getParameter("mobileNo1");
			
			String grossTotal = request.getParameter("grossTotal1");
			
			cust.setBilltype(BillType1);
			cust.setBarcodeNo(Long.parseLong(barcodeNo));
			cust.setFkProductId(Long.parseLong(fkProductId));
			cust.setItemName(itemName);
			cust.setFkCatId(Long.parseLong(fkCatId));
			cust.setCategoryName(categoryName);
			cust.setFkSubCatId(Long.parseLong(fkSubCatId));
			cust.setHsnSacNo(hsnSacNo);
			cust.setSize(size1);
			cust.setQuantity(Double.parseDouble(quantity));
			cust.setSalePrice(Double.parseDouble(salePrice));
			cust.setSpWithoutTaxAmount(Double.parseDouble(sPWithoutTax));
			
			if(perProductdisPer == null || perProductdisPer.equalsIgnoreCase("") || perProductdisPer.isEmpty())
			{
				cust.setPerProductdisPer(0.0);
			} else {
				cust.setPerProductdisPer(Double.parseDouble(perProductdisPer));
			}
			if(discountPerProduct == null || discountPerProduct.equalsIgnoreCase("") || discountPerProduct.isEmpty())
			{
				cust.setDiscount(0.0);				
			} else {
				cust.setDiscount(Double.parseDouble(discountPerProduct));
			}
			
			double gstAmt = 0.0;
			if (vat.equalsIgnoreCase("0"))
			{
				cust.setVat(Double.parseDouble(vat));
			} else {
				cust.setVat(Double.parseDouble(vat));
				gstAmt = (Double.parseDouble(salePrice)-Double.parseDouble(sPWithoutTax));
				System.out.println("gstAmt =========> "+gstAmt);
			}
			
			cust.setIgst(0d);
			cust.setTaxAmount(Double.parseDouble(quantity) * gstAmt);
			if(taxAmountAfterDis == null || taxAmountAfterDis.isEmpty() || taxAmountAfterDis.equalsIgnoreCase(""))
			{
				cust.setTaxAmtAfterDiscount(0.0);
			} else {
				cust.setTaxAmtAfterDiscount(Double.parseDouble(quantity) * Double.parseDouble(taxAmountAfterDis));
			}
			
			cust.setTotalperItem(Double.parseDouble(total));

			if(saleEmpId == null || saleEmpId.isEmpty() || saleEmpId.equalsIgnoreCase("") || saleEmpId.equalsIgnoreCase(" "))
			{
				cust.setFkSaleEmployeeId(0l);				
			} else {
				cust.setFkSaleEmployeeId(Long.parseLong(saleEmpId));
			}
			if (saleEmpName.equalsIgnoreCase("") || saleEmpName == null || saleEmpName.equalsIgnoreCase("undefined") || saleEmpName.equalsIgnoreCase(" "))
			{				
				cust.setEmployeeName("NA");				
			} else {
				cust.setEmployeeName(saleEmpName);
			}
			
			cust.setTotalAmt(Double.parseDouble(totalAmount));
			
			if(totalCreditAmt == null || totalCreditAmt.isEmpty())
			{
				totalCreditAmt = "0";
				cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
			} else {
				cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
			}
			
			// Payment Details
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
			}
			else if (paymentMode.equals("card"))
			{
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String cardAmount = request.getParameter("cardAmount1");
					cust.setCashCard_cardAmount(Double.parseDouble(cardAmount));
				} else {
					cust.setCashCard_cardAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashCard_cashAmount(0.0);
				cust.setCashupi_cashAmount(0.0);
				cust.setCashupi_upiAmount(0.0);
				int cardNumLength = cardNum.length();
				if (cardNumLength > 0) {
					cust.setCardNum(Long.parseLong(cardNum));
				} else {
					cust.setCardNum(null);
				}
			}
			else if (paymentMode.equals("neft"))
			{
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
			}
			else if (paymentMode.equals("cash"))
			{				
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String cashAmount = request.getParameter("cashAmount1");
					cust.setCashCard_cashAmount(Double.parseDouble(cashAmount));
				} else {
					cust.setCashCard_cashAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashCard_cardAmount(0.0);
				cust.setCashupi_cashAmount(0.0);
				cust.setCashupi_upiAmount(0.0);
			}
			else if (paymentMode.equals("Upi"))
			{				
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String upiAmount = request.getParameter("UpiAmount1");
					cust.setCashupi_cashAmount(Double.parseDouble(upiAmount));
				} else {
					cust.setCashupi_cashAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashupi_upiAmount(0.0);
				cust.setCashCard_cardAmount(0.0);
				cust.setCashCard_cashAmount(0.0);
			}
			if (paymentMode.equals("cashAndupi"))
			{
				if(cashupi_cashAmount.equals("") || cashupi_cashAmount.isEmpty() || cashupi_cashAmount == null)
				{
					System.out.println("inside if of upi cash 0");
					cust.setCashupi_cashAmount(0.0);
				} else {
					System.out.println("inside else of upi cash "+cashupi_cashAmount);
					cust.setCashupi_cashAmount(Double.parseDouble(cashupi_cashAmount));
				}
				if(cashupi_upiAmount.equals("") || cashupi_upiAmount.isEmpty() || cashupi_upiAmount == null)
				{
					System.out.println("inside if of upi  0 ");
					cust.setCashupi_upiAmount(0.0);
				} else {
					System.out.println("inside if of upi amount "+cashupi_upiAmount);
					cust.setCashupi_upiAmount(Double.parseDouble(cashupi_upiAmount));
				}
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
				cust.setCashupi_upiAmount(0.0);
			}
			
			cust.setCarNo("NA");
			cust.setContactNo(000l);
			cust.setOwnerName("NA");
			if (creditCustomer1.equalsIgnoreCase("") || creditCustomer1 == null || creditCustomer1.equalsIgnoreCase("undefined") || creditCustomer1.equalsIgnoreCase(" "))
			{				
				cust.setCreditCustomer1("N/A");			
			} else {
				cust.setCreditCustomer1(creditCustomer1);
			}
			if (!"".equals(mobileNo)) {

				cust.setMobileNo(Long.parseLong(mobileNo));
			} else {

				cust.setMobileNo(Long.parseLong("00"));
			}
			
			cust.setGrossamt(Double.parseDouble(grossTotal));
			
			//this two value save user id and userType
			cust.setEmpType(type2);
			System.out.println("type2 ====> "+type2);
			cust.setEmpIdFK(uid);
			System.out.println("uid ====>  "+uid);

			DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			Date dateobj = new Date();
			System.out.println(df.format(dateobj));
			String newDate = df.format(dateobj);
			cust.setCurrent_date(dateobj);
			
			Date now = new Date();
			cust.setBillTime(now);
			
			long BillNo2 = (Long.parseLong(BillNo1));
			
			//get bill no auto increment
			session3.setAttribute("BillNo", BillNo2);
			session3.setAttribute("customerName", creditCustomer1);
			
			if (BillNo == null) {
				cust.setBillNo("1");
			} else {
				System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
				cust.setBillNo(BillNo1);
			}
			
			String style = request.getParameter("style"+i);
			cust.setStyle(style);
			
			String fkSuppId = request.getParameter("fkSuppId"+i);
			cust.setFkSuppId(Long.parseLong(fkSuppId));
			
			cust.setFkShopId(Long.parseLong(shopId));
			
			OtherBillDao dao = new OtherBillDao();
			dao.registerBill(cust);
			
			Long item_id = Long.parseLong(request.getParameter("item_id" + i));
			System.out.println("item_id" + item_id);
			GoodReciveDao good = new GoodReciveDao();
			good.updateQuantity(item_id, quantity, rollSize, sQTY, size1);

			StockDao dao1 = new StockDao();
			List stkList2 = dao1.getAllStockEntry();

			Double updatequnty = 0.0;
			System.out.println("====================================");
			
			for (int j = 0; j < stkList2.size(); j++)
			{
				Stock st = (Stock) stkList2.get(j);
				String ItemId = st.getItemName();
				String cat = st.getCatName();
				Long productId = st.getFkProductId();
				Long categoryId = st.getFkCategoryId();
				Long fkShopId = st.getFkShopId();
				
				//If ItemName Is Already Exists In Stock Table
				//if (ItemId.equals(itemName) && cat.equals(categoryName))
				if (productId == Long.parseLong(fkProductId) && categoryId == Long.parseLong(fkCatId) && fkShopId == Long.parseLong(shopId))
				{
					Long PkItemId = st.getPkStockId();
					Double qunty = st.getQuantity();
					
					double QTY = 0.0;
					if(!rollSize.equals("0"))
					{	
						List<Double> list = null;
						Double totalQty = 0.0;
						HibernateUtility hbuSu = HibernateUtility.getInstance();
						Session sessionSu = hbuSu.getHibernateSession();
						Transaction transactionSu = sessionSu.beginTransaction();
						org.hibernate.Query querySu = sessionSu.createSQLQuery("select SUM(gr.Quantity) from goodreceive gr where gr.fkProductId = :fkProductId AND gr.fkCatId = :fkCatId AND gr.fkShopId = :fkShopId");
						querySu.setParameter("fkProductId", fkProductId);
						querySu.setParameter("fkCatId", fkCatId);
						querySu.setParameter("fkShopId", fkShopId);
						list = querySu.list();
						updatequnty = list.get(0).doubleValue();
					} else {
						updatequnty = (Double) (qunty - Double.parseDouble(quantity));
					}

					HibernateUtility hbu = HibernateUtility.getInstance();
					Session session = hbu.getHibernateSession();
					Transaction transaction = session.beginTransaction();

					Date date = new Date();

					Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
					updateStock.setQuantity(updatequnty);
					updateStock.setUpdateDate(date);
					session.saveOrUpdate(updateStock);
					transaction.commit();
				}
			}
		}

		int gCount1 = 0;
		String count1 = request.getParameter("count1");
		if(count1 == null || count1.isEmpty() || count1 == "" || count1 == " ")
		{
			gCount1 = 0;
		} else {
			gCount1 = Integer.parseInt(count1);
		}
		System.out.println("GRID COUNT ====> "+count1);
		if(gCount1 > 0)
		{
			System.out.println("c22222 ====> " + count1);
			HibernateUtility hbu2 = null;
			Session session2 = null;
			Transaction transaction2 = null;
	
			try
			{
				hbu2 = HibernateUtility.getInstance();
				session2 = hbu2.getHibernateSession();
				transaction2 = session2.beginTransaction();		
				for(int j=0; j<gCount1; j++)
				{				
					String transactionId = request.getParameter("transactionId"+j);
					Query query = session2.createSQLQuery("UPDATE salereturn set redeemedForBillNo = "+BillNo+" WHERE transactionId = "+transactionId);
					query.executeUpdate();
					transaction2.commit();
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		else
		{}
	}
	
	
	//Tax Invoice Hold Bill Edit And Print Code Start Here
	public Map getSaleInvoceBillNonGridDetailsByBillNoForTaxInvoiceHoldBillEditAndPrintBilling(String billNo, String shopId)
	{
		OtherBillDao dao = new OtherBillDao();
		List catList = dao.getSaleInvoceBillNonGridDetailsByBillNoForTaxInvoiceHoldBillEditAndPrintBilling(billNo, shopId);
		
		Map  map =  new HashMap();
		for(int i=0;i<catList.size();i++)
		{
			Object[] objects = (Object[])catList.get(i);
			
			System.out.println(Arrays.toString(objects));
			
			//pkOtherBillId, BillType, BillNo, TotalAmount, payment_mode, cashCard_cashAmount, cashCard_cardAmount,
			//cashupi_cashAmount, cashupi_upiAmount, credit_Customer_Name, CustGst, mobile_No, GrossTotal, fkShopId
			
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
				System.out.println("setCreditCustomerName :- "+bean.getCreditCustomerName());
				bean.setCreditCustomerName(objects[9].toString());
				
			}
			if(objects[10] == null)
			{
				bean.setCustomerGstNo("");
			} else {
				System.out.println("setCustomerGstNo :- "+bean.getCustomerGstNo());
				bean.setCustomerGstNo(objects[10].toString());
			}
			if(objects[11] == null)
			{
				bean.setCustomerMobileNo("");
			} else {
				System.out.println("setCustomerMobileNo :- "+bean.getCustomerMobileNo());
				bean.setCustomerMobileNo(objects[11].toString());
			}
			if(objects[12] == null)
			{
				bean.setGrossTotal(0d);
			} else {
				bean.setGrossTotal(Double.parseDouble(objects[12].toString()));
			}
			
			map.put(bean.getPkOtherBillId(),bean);
		}
		return map;
	}
	
	public List getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForTaxInvoiceHoldBillEditAndPrintBilling(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session = request.getSession();
		String shopId = (String) session.getAttribute("shopId");
		
		String billNo = request.getParameter("billNo");
		
		String key = request.getParameter("key");
		String productId = request.getParameter("productId");
		String barcodeNo = request.getParameter("barcodeNo");
		
		System.out.println("barcodeNo key :-"+key);
		System.out.println("productId :-"+productId);
		System.out.println("barcode No :-"+barcodeNo);
		
		Map<Long, SaleInvoiceBillEditBean> map = new HashMap<Long, SaleInvoiceBillEditBean>();
		
		OtherBillDao dao = new OtherBillDao();
		List<SaleInvoiceBillEditBean> saleList = dao.getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForTaxInvoiceHoldBillEditAndPrintBilling(billNo, key, productId, barcodeNo, shopId);
		return saleList;
	}
	
	
	
	public void taxInvoiceHoldBillEditAndPrintBillingSave(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session3 = request.getSession();
		
		//this session is handle for get user type and id
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
				Query query1 = session2.createQuery("from UserDetail where userName =:name2");
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
				
				Query query1 = session2.createQuery("from UserDetail where userName =:name2");
				query1.setParameter("name2", name2);
				UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
				type2 = userDetail1.getTypeId();
				uid = userDetail1.getPkUserId();
			}
		}
		
		String shopId = (String)sessionv.getAttribute("shopId");
		
		OtherBill cust = new OtherBill();
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);
		
		String BillType=request.getParameter("billtype");
		System.out.println(BillType);
		
		String BillNo = request.getParameter("billNoBW");
		System.out.println(BillNo);
		//Long billNoLong = Long.parseLong(BillNo);
		
		// Add Sale Bill Items Quantity into Stock and Delete Bill Old Record
		OtherBillDao dao1 = new OtherBillDao();
		//System.out.println("Add Sale Bill Items Quantity into Stock by BillNo:- "+billNoLong);
		//dao1.addOldTaxInvoiceBillSaleQTYInStockToEditTaxInvoiceBillRecordByBillNo(billNoLong, shopId);
		System.out.println("before delete billNo:- "+BillNo);
		dao1.deleteTaxInvoiceBillRecordByBillNo(BillNo, shopId);
	
	
	if(BillType.equals("Temporay"))
	{
		for (int i = 0; i < count; i++)
		{
			/*BillNo = Long.parseLong(request.getParameter("billNo"));
			System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);*/
			
			String itemName = request.getParameter("itemName" + i);
			cust.setItemName(itemName);

			String categoryName = request.getParameter("categoryName" + i);
			cust.setCategoryName(categoryName);

			String quantity = request.getParameter("quantity" + i);
			System.out.println("Sonal ====> quantity" + quantity);
			cust.setQuantity(Double.parseDouble(quantity));			

			String salePrice = request.getParameter("salePrice" + i);
			System.out.println("Sale Price is" + salePrice);

			String barcodeNo = request.getParameter("barcodeNo" + i);
			System.out.println("unitinMl" + barcodeNo);
			cust.setBarcodeNo(Long.parseLong(barcodeNo));

			String hsnSacNo = request.getParameter("hsnSacNo" + i);
			cust.setHsnSacNo(hsnSacNo);

			String vat = request.getParameter("vat" + i);
			String igst = request.getParameter("igst" + i);
			
			String size1 = request.getParameter("size1"+i);
			cust.setSize(size1);
			
			String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
			System.out.println("SALE PRICE WITHOUT WITHOUT TAX ======> "+sPWithoutTax);
			cust.setSpWithoutTaxAmount(Double.parseDouble(sPWithoutTax));

			System.out.println("VAT ================> "+vat);
			double gstAmt = 0.0;
			if (vat.equalsIgnoreCase("0"))
			{
				cust.setVat(Double.parseDouble(vat));
			} else {
				cust.setVat(Double.parseDouble(vat));
				gstAmt = (Double.parseDouble(salePrice)-Double.parseDouble(sPWithoutTax));
				System.out.println("gstAmt =========> "+gstAmt);
			}
			
			cust.setIgst(0d);
			cust.setTaxAmount(Double.parseDouble(quantity) * gstAmt);
			//cust.setTaxAmount(Double.parseDouble(taxAmount));
			
			String saleEmpName = request.getParameter("saleEmpName"+i);
			System.out.println("hi this is Sonal in other bill helper"+saleEmpName);			
			if (saleEmpName.equalsIgnoreCase("") || saleEmpName == null || saleEmpName.equalsIgnoreCase("undefined") || saleEmpName.equalsIgnoreCase(" "))
			{				
				cust.setEmployeeName("NA");				
			}
			else
			{
				cust.setEmployeeName(saleEmpName);
			}
			
			String saleEmpId = request.getParameter("saleEmpId"+i);
			System.out.println("hi this is Sonal in other bill helper"+saleEmpId);
			if(saleEmpId == null || saleEmpId.isEmpty() || saleEmpId.equalsIgnoreCase("") || saleEmpId.equalsIgnoreCase(" "))
			{
				cust.setFkSaleEmployeeId(0l);				
			}
			else
			{
				cust.setFkSaleEmployeeId(Long.parseLong(saleEmpId));
			}

			String rollSize = request.getParameter("rollSize"+i);
			System.out.println("roll size in other bill helper@@@###$$$    ----"+rollSize);
			
			cust.setRollsize(Double.parseDouble(rollSize));
			String sQTY = request.getParameter("goodReceiveQuantity"+i);
			System.out.println("there is stock Quantity #### %%% &&&"+sQTY);
			
			String totalAmount = request.getParameter("totalAmount");
			cust.setTotalAmt(Double.parseDouble(totalAmount));

			String perProductdisPer = request.getParameter("perProductdisPer"+i);
			System.out.println("perProductdisPer =============> "+perProductdisPer);
			if(perProductdisPer == null || perProductdisPer.equalsIgnoreCase("") || perProductdisPer.isEmpty())
			{
				cust.setPerProductdisPer(0.0);
			}
			else
			{
				cust.setPerProductdisPer(Double.parseDouble(perProductdisPer));
			}
			
			String discountPerProduct = request.getParameter("perProductdisAmount"+i);
			System.out.println("discountPerProduct =============> "+discountPerProduct);
			if(discountPerProduct == null || discountPerProduct.equalsIgnoreCase("") || discountPerProduct.isEmpty())
			{
				cust.setDiscount(0.0);				
			}
			else
			{
				cust.setDiscount(Double.parseDouble(discountPerProduct));
			}
			
			String taxAmountAfterDis = request.getParameter("taxAmountAfterDis" + i);
			System.out.println("taxAmountAfterDis =============> "+taxAmountAfterDis);
			if(taxAmountAfterDis == null || taxAmountAfterDis.isEmpty() || taxAmountAfterDis.equalsIgnoreCase(""))
			{
				cust.setTaxAmtAfterDiscount(0.0);
			}
			else
			{
				cust.setTaxAmtAfterDiscount(Double.parseDouble(quantity) * Double.parseDouble(taxAmountAfterDis));
			}
			
			String BillType1 = request.getParameter("billtype");
			
			cust.setBilltype(BillType1);
			System.out.println("BillType1 :-"+BillType1);
			String creditCustomer1 = request.getParameter("creditCustomer1");
			String CustGst = request.getParameter("CustGst");
			System.out.println("CustGst :-"+CustGst);
			String mobileNo = request.getParameter("mobileNo");
			
			String paymentMode = request.getParameter("paymentMode");

			String chequeNum = request.getParameter("chequeNum");

			String cardNum = request.getParameter("cardNum");

			String accNum = request.getParameter("accNum");

			String nameOnCheck = request.getParameter("nameOnCheck");

			String bankName = request.getParameter("bankName");
			
			String grossTotal = request.getParameter("grossTotal");
			
			cust.setGrossamt(Double.parseDouble(grossTotal));
			
			String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");

			String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
			
			
			String cashupi_cashAmount = request.getParameter("cashCard_cashAmount1");

			String cashupi_upiAmount = request.getParameter("cashCard_upiAmount");
			
			System.out.println("upi cash amount :-"+cashupi_cashAmount);
			System.out.println("upi amount :-"+cashupi_upiAmount);
			
			String totalCreditAmt = request.getParameter("totalCreditAmt");
			if(totalCreditAmt == null || totalCreditAmt.isEmpty())
			{
				totalCreditAmt = "0";
				cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
			}
			else
			{
				cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
			}

			cust.setCarNo("NA");
			cust.setContactNo(000l);
			cust.setOwnerName("NA");
			if (creditCustomer1.equalsIgnoreCase("") || creditCustomer1 == null || creditCustomer1.equalsIgnoreCase("undefined") || creditCustomer1.equalsIgnoreCase(" "))
			{				
				cust.setCreditCustomer1("N/A");			
			}
			else
			{
				cust.setCreditCustomer1(creditCustomer1);
			}
			if (CustGst.equalsIgnoreCase("") || CustGst == null || CustGst.equalsIgnoreCase("undefined") || CustGst.equalsIgnoreCase(" "))
			{				
				cust.setCustGst("N/A");			
			}
			else
			{
				cust.setCreditCustomer1(CustGst);
			}
			cust.setSalePrice(Double.parseDouble(salePrice));

			if (!"".equals(mobileNo)) {

				cust.setMobileNo(Long.parseLong(mobileNo));
			} else {

				cust.setMobileNo(Long.parseLong("00"));
			}

			// payment details
			if (paymentMode == null) {
				cust.setPaymentMode("N/A");
			} else {
				cust.setPaymentMode(paymentMode);
			}		
		
			if (paymentMode.equals("cheque")) {

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
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String cardAmount = request.getParameter("cardAmount");
					cust.setCashCard_cardAmount(Double.parseDouble(cardAmount));
				}
				else
				{
					cust.setCashCard_cardAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashCard_cashAmount(0.0);
				
				cust.setCashupi_cashAmount(0.0);
				cust.setCashupi_upiAmount(0.0);
				int cardNumLength = cardNum.length();
				if (cardNumLength > 0) {

					cust.setCardNum(Long.parseLong(cardNum));
				} else {
					cust.setCardNum(null);
				}
			}
			else if (paymentMode.equals("neft")) {
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
			}
			else if (paymentMode.equals("cash"))
			{				
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String cashAmount = request.getParameter("cashAmount");
					cust.setCashCard_cashAmount(Double.parseDouble(cashAmount));
				}
				else
				{
					cust.setCashCard_cashAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashCard_cardAmount(0.0);
				cust.setCashupi_cashAmount(0.0);
				cust.setCashupi_upiAmount(0.0);
			}
			
			else if (paymentMode.equals("Upi"))
			{				
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String upiAmount = request.getParameter("UpiAmount");
					cust.setCashupi_upiAmount(Double.parseDouble(upiAmount));
				}
				else
				{
					cust.setCashupi_upiAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashupi_cashAmount(0.0);
				cust.setCashCard_cardAmount(0.0);
				cust.setCashCard_cashAmount(0.0);
				
			}	
			
			if (paymentMode.equals("cashAndupi"))
			{
				if(cashupi_cashAmount.equals("") || cashupi_cashAmount.isEmpty() || cashupi_cashAmount == null)
				{
					
					System.out.println("inside if of upi cash 0");
					cust.setCashupi_cashAmount(0.0);
				}
				else
				{
					System.out.println("inside else of upi cash "+cashupi_cashAmount);
					cust.setCashupi_cashAmount(Double.parseDouble(cashupi_cashAmount));
				}
				
				if(cashupi_upiAmount.equals("") || cashupi_upiAmount.isEmpty() || cashupi_upiAmount == null)
				{
					System.out.println("inside if of upi  0 ");
					cust.setCashupi_upiAmount(0.0);
				}
				else
				{
					System.out.println("inside if of upi amount "+cashupi_upiAmount);
					cust.setCashupi_upiAmount(Double.parseDouble(cashupi_upiAmount));
				}
				
				cust.setCashCard_cardAmount(0.0);
				cust.setCashCard_cashAmount(0.0);
			}
			
			
			if (paymentMode.equals("cashAndCard"))
			{
				if(cashCard_cashAmount.equals("") || cashCard_cashAmount.isEmpty() || cashCard_cashAmount == null)
				{
					cust.setCashCard_cashAmount(0.0);
				}
				else
				{
					cust.setCashCard_cashAmount(Double.parseDouble(cashCard_cashAmount));
				}
				
				if(cashCard_cardAmount.equals("") || cashCard_cardAmount.isEmpty() || cashCard_cardAmount == null)
				{
					cust.setCashCard_cardAmount(0.0);
				}
				else
				{
					cust.setCashCard_cardAmount(Double.parseDouble(cashCard_cardAmount));
				}
				cust.setCashupi_cashAmount(0.0);
				cust.setCashupi_upiAmount(0.0);
			}
			String total = request.getParameter("total" + i);
			cust.setTotalperItem(Double.parseDouble(total));
			
			//this two value save user id and userType
			cust.setEmpType(type2);
			System.out.println("type2 ====> "+type2);
			cust.setEmpIdFK(uid);
			System.out.println("uid ====>  "+uid);
			
			DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			Date dateobj = new Date();
			System.out.println(df.format(dateobj));
			String newDate = df.format(dateobj);
			cust.setCurrent_date(dateobj);
			
			//get bill no auto increment
			session3.setAttribute("BillNo", BillNo);
			session3.setAttribute("customerName", creditCustomer1);
			session3.setAttribute("CustGst", CustGst);
			if (BillNo == null) {
				cust.setBillNo("1");
			} else {
				System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
				cust.setBillNo(BillNo);
			}
			
			String fkProductId = request.getParameter("fkProductId" + i);
			cust.setFkProductId(Long.parseLong(fkProductId));
			
			
			String fkSubCatId = request.getParameter("fkSubCatId" + i);
			cust.setFkSubCatId(Long.parseLong(fkSubCatId));
			
			String fkCatId = request.getParameter("fkCategoryId" + i);
			cust.setFkCatId(Long.parseLong(fkCatId));

			Date now = new Date();
			cust.setBillTime(now);
			
			String style = request.getParameter("style"+i);
			cust.setStyle(style);
			
			String fkSuppId = request.getParameter("fkSuppId"+i);
			cust.setFkSuppId(Long.parseLong(fkSuppId));
			
			cust.setFkShopId(Long.parseLong(shopId));
	
			Long item_id = Long.parseLong(request.getParameter("item_id" + i));
			System.out.println("item_id" + item_id);
			cust.setFkgoodreciveid(item_id);	
			OtherBillDao dao = new OtherBillDao();
			dao.registerBill(cust);
		}
	}

	
	//else if(BillType.equals("Permanent"))
	if(BillType.equals("Permanent"))
	{
		for (int i = 0; i < count; i++)
		{
			//BillNo = Long.parseLong(request.getParameter("billNo"));
			//System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
			
			String BillType1=request.getParameter("billtype");
			
			String barcodeNo = request.getParameter("barcodeNo" + i);
			Long item_id = Long.parseLong(request.getParameter("item_id" + i));
			String fkProductId = request.getParameter("fkProductId" + i);
			String itemName = request.getParameter("itemName" + i);
			String fkCatId = request.getParameter("fkCategoryId" + i);
			String categoryName = request.getParameter("categoryName" + i);
			String fkSubCatId = request.getParameter("fkSubCatId" + i);
			String hsnSacNo = request.getParameter("hsnSacNo" + i);
			String rollSize = request.getParameter("rollSize"+i);
			String size1 = request.getParameter("size1"+i);
			String style = request.getParameter("style"+i);
			String sQTY = request.getParameter("goodReceiveQuantity"+i);
			String oldSaleQuantityToUpdateStock = request.getParameter("oldSaleQuantityToUpdateStock" + i);
			String quantity = request.getParameter("quantity" + i);
			String salePrice = request.getParameter("salePrice" + i);
			String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
			String perProductdisPer = request.getParameter("perProductdisPer"+i);
			String discountPerProduct = request.getParameter("perProductdisAmount"+i);
			String vat = request.getParameter("vat" + i);
			String igst = request.getParameter("igst" + i);
			String taxAmount = request.getParameter("taxAmount" + i);
			String taxAmountAfterDis = request.getParameter("taxAmountAfterDis" + i);
			String totalAmount = request.getParameter("totalAmount");
			String total = request.getParameter("total" + i);
			
			String saleEmpName = request.getParameter("saleEmpName"+i);
			String saleEmpId = request.getParameter("saleEmpId"+i);
			String fkSuppId = request.getParameter("fkSuppId"+i);
			
			String totalCreditAmt = request.getParameter("totalCreditAmt");
			
			String paymentMode = request.getParameter("paymentMode");
			String chequeNum = request.getParameter("chequeNum");
			String cardNum = request.getParameter("cardNum");
			String accNum = request.getParameter("accNum");
			String nameOnCheck = request.getParameter("nameOnCheck");
			String bankName = request.getParameter("bankName");
			
			String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");
			String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
			String cashupi_cashAmount = request.getParameter("cashCard_cashAmount1");
			String cashupi_upiAmount = request.getParameter("cashCard_upiAmount");
			
			String creditCustomer1 = request.getParameter("creditCustomer1");
			String CustGst = request.getParameter("custGst");
			String mobileNo = request.getParameter("mobileNo");
			
			String grossTotal = request.getParameter("grossTotal");
			
			
			
			cust.setBilltype(BillType1);
			cust.setBarcodeNo(Long.parseLong(barcodeNo));
			cust.setFkgoodreciveid(item_id);
			cust.setFkProductId(Long.parseLong(fkProductId));
			cust.setItemName(itemName);
			cust.setFkCatId(Long.parseLong(fkCatId));
			cust.setCategoryName(categoryName);
			cust.setFkSubCatId(Long.parseLong(fkSubCatId));
			cust.setHsnSacNo(hsnSacNo);
			cust.setRollsize(Double.parseDouble(rollSize));
			cust.setSize(size1);
			cust.setStyle(style);
			cust.setQuantity(Double.parseDouble(quantity));
			cust.setSalePrice(Double.parseDouble(salePrice));
			cust.setSpWithoutTaxAmount(Double.parseDouble(sPWithoutTax));
			
			if(perProductdisPer == null || perProductdisPer.equalsIgnoreCase("") || perProductdisPer.isEmpty())
			{
				cust.setPerProductdisPer(0.0);
			} else {
				cust.setPerProductdisPer(Double.parseDouble(perProductdisPer));
			}
			if(discountPerProduct == null || discountPerProduct.equalsIgnoreCase("") || discountPerProduct.isEmpty())
			{
				cust.setDiscount(0.0);				
			} else {
				cust.setDiscount(Double.parseDouble(discountPerProduct));
			}
			double gstAmt = 0.0;
			if (vat.equalsIgnoreCase("0"))
			{
				cust.setVat(Double.parseDouble(vat));
			} else {
				cust.setVat(Double.parseDouble(vat));
				gstAmt = (Double.parseDouble(salePrice)-Double.parseDouble(sPWithoutTax));
			}
			cust.setIgst(0d);
			cust.setTaxAmount(Double.parseDouble(taxAmount));
			if(taxAmountAfterDis == null || taxAmountAfterDis.isEmpty() || taxAmountAfterDis.equalsIgnoreCase(""))
			{
				cust.setTaxAmtAfterDiscount(0.0);
			} else {
				//cust.setTaxAmtAfterDiscount(Double.parseDouble(quantity) * Double.parseDouble(taxAmountAfterDis));
				cust.setTaxAmtAfterDiscount(Double.parseDouble(taxAmountAfterDis));
			}
			cust.setTotalAmt(Double.parseDouble(totalAmount));
			cust.setTotalperItem(Double.parseDouble(total));
			
			if (saleEmpName.equalsIgnoreCase("") || saleEmpName == null || saleEmpName.equalsIgnoreCase("undefined") || saleEmpName.equalsIgnoreCase(" "))
			{
				cust.setEmployeeName("NA");		
			} else {
				cust.setEmployeeName(saleEmpName);
			}
			if(saleEmpId == null || saleEmpId.isEmpty() || saleEmpId.equalsIgnoreCase("") || saleEmpId.equalsIgnoreCase(" "))
			{
				cust.setFkSaleEmployeeId(0l);				
			} else {
				cust.setFkSaleEmployeeId(Long.parseLong(saleEmpId));
			}
			cust.setFkSuppId(Long.parseLong(fkSuppId));
			
			if(totalCreditAmt == null || totalCreditAmt.isEmpty())
			{
				totalCreditAmt = "0";
				cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
			} else {
				cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
			}
			
			
			//payment details
			if (paymentMode == null) {
				cust.setPaymentMode("N/A");
			} else {
				cust.setPaymentMode(paymentMode);
			}
			if (paymentMode.equals("cheque")) {

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
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String cardAmount = request.getParameter("cardAmount");
					cust.setCashCard_cardAmount(Double.parseDouble(cardAmount));
				}
				else
				{
					cust.setCashCard_cardAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashCard_cashAmount(0.0);
				
				cust.setCashupi_cashAmount(0.0);
				cust.setCashupi_upiAmount(0.0);
				int cardNumLength = cardNum.length();
				if (cardNumLength > 0) {
					cust.setCardNum(Long.parseLong(cardNum));
				} else {
					cust.setCardNum(null);
				}
			} else if (paymentMode.equals("neft"))
			{
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
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String cashAmount = request.getParameter("cashAmount");
					cust.setCashCard_cashAmount(Double.parseDouble(cashAmount));
				}
				else
				{
					cust.setCashCard_cashAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashCard_cardAmount(0.0);
				cust.setCashupi_cashAmount(0.0);
				cust.setCashupi_upiAmount(0.0);
			} else if (paymentMode.equals("Upi"))
			{				
				if(Double.parseDouble(totalCreditAmt) > 0)
				{
					String upiAmount = request.getParameter("UpiAmount");
					cust.setCashupi_upiAmount(Double.parseDouble(upiAmount));
				} else {
					cust.setCashupi_upiAmount(Double.parseDouble(grossTotal));
				}
				cust.setCashupi_cashAmount(0.0);
				cust.setCashCard_cardAmount(0.0);
				cust.setCashCard_cashAmount(0.0);
			}
			
			if (paymentMode.equals("cashAndupi"))
			{
				if(cashupi_cashAmount.equals("") || cashupi_cashAmount.isEmpty() || cashupi_cashAmount == null)
				{
					
					System.out.println("inside if of upi cash 0");
					cust.setCashupi_cashAmount(0.0);
				} else {
					System.out.println("inside else of upi cash "+cashupi_cashAmount);
					cust.setCashupi_cashAmount(Double.parseDouble(cashupi_cashAmount));
				}
				if(cashupi_upiAmount.equals("") || cashupi_upiAmount.isEmpty() || cashupi_upiAmount == null)
				{
					System.out.println("inside if of upi  0 ");
					cust.setCashupi_upiAmount(0.0);
				} else {
					System.out.println("inside if of upi amount "+cashupi_upiAmount);
					cust.setCashupi_upiAmount(Double.parseDouble(cashupi_upiAmount));
				}
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
				cust.setCashupi_upiAmount(0.0);
			}
			
			cust.setCarNo("NA");
			cust.setContactNo(000l);
			cust.setOwnerName("NA");
			if (creditCustomer1.equalsIgnoreCase("") || creditCustomer1 == null || creditCustomer1.equalsIgnoreCase("undefined") || creditCustomer1.equalsIgnoreCase(" "))
			{				
				cust.setCreditCustomer1("N/A");			
			} else {
				cust.setCreditCustomer1(creditCustomer1);
			}
			if (CustGst.equalsIgnoreCase("") || CustGst == null || CustGst.equalsIgnoreCase("undefined") || CustGst.equalsIgnoreCase(" "))
			{				
				cust.setCustGst("N/A");			
			} else {
				cust.setCustGst(CustGst);
			}
			if (!"".equals(mobileNo)) {

				cust.setMobileNo(Long.parseLong(mobileNo));
			} else {

				cust.setMobileNo(Long.parseLong("00"));
			}
			
			cust.setGrossamt(Double.parseDouble(grossTotal));
			
			//this two value save user id and userType
			cust.setEmpType(type2);
			System.out.println("type2 ====> "+type2);
			cust.setEmpIdFK(uid);
			System.out.println("uid ====>  "+uid);
			
			DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
			Date dateobj = new Date();
			System.out.println(df.format(dateobj));
			String newDate = df.format(dateobj);
			cust.setCurrent_date(dateobj);
			
			Date now = new Date();
			cust.setBillTime(now);
			
			cust.setFkShopId(Long.parseLong(shopId));
			
			if (BillNo == null) {
				cust.setBillNo("1");
			} else {
				System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
				cust.setBillNo(BillNo);
			}
			
			
			//get bill no auto increment Set Session Attributes For BillPDF
			session3.setAttribute("BillNo", BillNo);
			session3.setAttribute("customerName", creditCustomer1);
			session3.setAttribute("CustGst", CustGst);
			
			
			//To Register Bill Details Dao Method is Called
			OtherBillDao dao = new OtherBillDao();
			
			/*//Update Borcode Number Wise Stock Add Old Quantity In Stock
			Long barcodeNoLongToAddOld = Long.parseLong(barcodeNo);
			Double oldSaleQuantityToUpdateStockDoubleToAddOld = Double.parseDouble(oldSaleQuantityToUpdateStock);
			Long shopIdLongToAddOld = Long.parseLong(shopId);
			dao.updateBarcodeNoWiseStockAddOldQuantityInBarcodeNoWiseStockEditSaleTaxInvoce(barcodeNoLongToAddOld, oldSaleQuantityToUpdateStockDoubleToAddOld,shopIdLongToAddOld);*/
			
			dao.registerBill(cust);
			
			//Update Barcode Number Wise Stock Sale Invoice Hold Bill Print
			Long barcodeNoLong = Long.parseLong(barcodeNo);
			Double quantityDouble = Double.parseDouble(quantity);
			Long shopIdLong = Long.parseLong(shopId);
			dao.updateBarcodeNoWiseStockSaleInvoce(barcodeNoLong, quantityDouble,shopIdLong);
			
			/*//Update Borcode Number Wise Stock
			Long barcodeNoLong = Long.parseLong(barcodeNo);
			Double quantityDouble = Double.parseDouble(quantity);
			Long shopIdLong = Long.parseLong(shopId);
			dao.updateBarcodeNoWiseStockSaleInvoce(barcodeNoLong, quantityDouble,shopIdLong);*/
			
			//Update Good Receive Quantity
			GoodReciveDao good = new GoodReciveDao();
			good.updateQuantity(item_id, quantity, rollSize, sQTY, size1);
			
			
			//Update Main Stock
			StockDao dao3 = new StockDao();
			List stkList2 = dao3.getAllStockEntry();
			
			Double updatequnty = 0.0;
			
			for (int j = 0; j < stkList2.size(); j++)
			{
				Stock st = (Stock) stkList2.get(j);
				String ItemId = st.getItemName();
				String cat = st.getCatName();
				Long productId = st.getFkProductId();
				Long categoryId = st.getFkCategoryId();
				Long fkShopId = st.getFkShopId();
				
				//If ItemName Is Already Exists In Stock Table
				//if (ItemId.equals(itemName) && cat.equals(categoryName))
				
				if (productId == Long.parseLong(fkProductId) && categoryId == Long.parseLong(fkCatId) && fkShopId == Long.parseLong(shopId))
				{
					Long PkItemId = st.getPkStockId();
					Double qunty = st.getQuantity();
					double QTY = 0.0;
					
					if(!rollSize.equals("0"))
					{
						List<Double> list = null;
						Double totalQty = 0.0;
						HibernateUtility hbuSu = HibernateUtility.getInstance();
						Session sessionSu = hbuSu.getHibernateSession();
						Transaction transactionSu = sessionSu.beginTransaction();
						org.hibernate.Query querySu = sessionSu.createSQLQuery("select SUM(gr.Quantity) from goodreceive gr where gr.fkProductId = :fkProductId AND gr.fkCatId = :fkCatId AND gr.fkShopId = :fkShopId");
						querySu.setParameter("fkProductId", fkProductId);
						querySu.setParameter("fkCatId", fkCatId);
						querySu.setParameter("fkShopId", fkShopId);
						list = querySu.list();
						updatequnty = list.get(0).doubleValue();
						
					} else {
						updatequnty = (Double) (qunty - Double.parseDouble(quantity));
					}
					
					HibernateUtility hbu = HibernateUtility.getInstance();
					Session session = hbu.getHibernateSession();
					Transaction transaction = session.beginTransaction();
					
					Date date = new Date();
					
					Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
					updateStock.setQuantity(updatequnty);
					updateStock.setUpdateDate(date);
					session.saveOrUpdate(updateStock);
					transaction.commit();
				}
			}
		}
		
		int gCount1 = 0;
		String count1 = request.getParameter("count1");
		if(count1 == null || count1.isEmpty() || count1 == "" || count1 == " ")
		{
			gCount1 = 0;
		} else {
			gCount1 = Integer.parseInt(count1);
		}
		
		System.out.println("GRID COUNT ====> "+count1);
		
		if(gCount1 > 0)
		{
			System.out.println("c22222 ====> " + count1);
			HibernateUtility hbu2 = null;
			Session session2 = null;
			Transaction transaction2 = null;
			
			try
			{
				hbu2 = HibernateUtility.getInstance();
				session2 = hbu2.getHibernateSession();
				transaction2 = session2.beginTransaction();
				
				for(int j=0; j<gCount1; j++)
				{
					String transactionId = request.getParameter("transactionId"+j);
					Query query = session2.createSQLQuery("UPDATE salereturn set redeemedForBillNo = '"+BillNo+"' WHERE transactionId = "+transactionId);
					query.executeUpdate();
					transaction2.commit();
				}
			} catch(Exception e) {
				e.printStackTrace();
			}
		} else {}
	}
	}
	
	
	
	
	
	
	
	
	
	
	//Edit Sale Invoice Bill Code Start Here
	
	public Map getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling(String billNo, String shopId)
	{
		OtherBillDao dao = new OtherBillDao();
		List catList = dao.getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling(billNo, shopId);
		
		Map  map =  new HashMap();
		for(int i=0;i<catList.size();i++)
		{
			Object[] objects = (Object[])catList.get(i);
			
			System.out.println(Arrays.toString(objects));
			
			//ob.pkOtherBillId, ob.BillType, ob.BillNo, ob.TotalAmount, ob.payment_mode, ob.cashCard_cashAmount, ob.cashCard_cardAmount,
			//ob.cashupi_cashAmount, ob.cashupi_upiAmount, ob.credit_Customer_Name, ob.CustGst, mobile_No, ob.GrossTotal, ob.fkShopId
			
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
			System.out.println("In Helper setOldCardAmount :- "+bean.getOldCardAmount());
			
			bean.setOldUpiCashAmount(Double.parseDouble(objects[7].toString()));
			System.out.println("setOldUpiCashAmount :- "+bean.getOldUpiCashAmount());
			
			bean.setOldUpiAmount(Double.parseDouble(objects[8].toString()));
			System.out.println("In Helper setOldUpiAmount :- "+bean.getOldUpiAmount());
			
			
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
			
			map.put(bean.getPkOtherBillId(),bean);
		}
		return map;
	}
	
		public List getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBilling(HttpServletRequest request, HttpServletResponse response)
		{
			HttpSession session = request.getSession();
			String shopId = (String) session.getAttribute("shopId");
			
			String billNo = request.getParameter("billNo");
			
			String key = request.getParameter("key");
			String productId = request.getParameter("productId");
			String barcodeNo = request.getParameter("barcodeNo");
			
			System.out.println("barcodeNo key :-"+key);
			System.out.println("productId :-"+productId);
			System.out.println("barcode No :-"+barcodeNo);
			
			Map<Long, SaleInvoiceBillEditBean> map = new HashMap<Long, SaleInvoiceBillEditBean>();
			
			OtherBillDao dao = new OtherBillDao();
			List<SaleInvoiceBillEditBean> saleList = dao.getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBilling(billNo, key, productId, barcodeNo, shopId);
			return saleList;
		}
		
		public void editSaleInvoceBilling(HttpServletRequest request, HttpServletResponse response)
		{
		HttpSession session3 = request.getSession();
		
		/*this session is handle for get user type and id*/
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
         
         String shopId = (String)sessionv.getAttribute("shopId");
		
		/*OtherBillDao data = new OtherBillDao();
		List stkList = data.getLastBillNo();

		for (int i = 0; i < stkList.size(); i++)
		{
			BillBean st = (BillBean) stkList.get(i);
			BillNo = st.getBillNo();

			BillNo++;
		}*/

		OtherBill cust = new OtherBill();
		Integer count = Integer.parseInt(request.getParameter("count"));
		System.out.println("c111111" + count);
		
		String BillType=request.getParameter("billtype");
		System.out.println(BillType);

		String BillNo=request.getParameter("billNoBW");
		System.out.println(BillNo);
		//Long billNoLong = Long.parseLong(BillNo);
		
		// Add Sale Bill Items Quantity into Stock and Delete Bill Old Record
		OtherBillDao dao1 = new OtherBillDao();
		System.out.println("Add Sale Bill Items Quantity into Stock by BillNo:- "+BillNo);
		dao1.addOldTaxInvoiceBillSaleQTYInStockToEditTaxInvoiceBillRecordByBillNo(BillNo, shopId);
		System.out.println("before delete billNo:- "+BillNo);
		dao1.deleteTaxInvoiceBillRecordByBillNo(BillNo, shopId);
		
		
		if(BillType.equals("Temporay"))
		{
			for (int i = 0; i < count; i++)
			{
				/*BillNo = Long.parseLong(request.getParameter("billNo"));
				System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);*/
				
				String itemName = request.getParameter("itemName" + i);
				cust.setItemName(itemName);

				String categoryName = request.getParameter("categoryName" + i);
				cust.setCategoryName(categoryName);

				String quantity = request.getParameter("quantity" + i);
				System.out.println("Sonal ====> quantity" + quantity);
				cust.setQuantity(Double.parseDouble(quantity));			

				String salePrice = request.getParameter("salePrice" + i);
				System.out.println("Sale Price is" + salePrice);

				String barcodeNo = request.getParameter("barcodeNo" + i);
				System.out.println("unitinMl" + barcodeNo);
				cust.setBarcodeNo(Long.parseLong(barcodeNo));

				String hsnSacNo = request.getParameter("hsnSacNo" + i);
				cust.setHsnSacNo(hsnSacNo);

				String vat = request.getParameter("vat" + i);
				String igst = request.getParameter("igst" + i);
				
				String size1 = request.getParameter("size1"+i);
				cust.setSize(size1);
				
				String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
				System.out.println("SALE PRICE WITHOUT WITHOUT TAX ======> "+sPWithoutTax);
				cust.setSpWithoutTaxAmount(Double.parseDouble(sPWithoutTax));

				System.out.println("VAT ================> "+vat);
				double gstAmt = 0.0;
				if (vat.equalsIgnoreCase("0"))
				{
					cust.setVat(Double.parseDouble(vat));
				} else {
					cust.setVat(Double.parseDouble(vat));
					gstAmt = (Double.parseDouble(salePrice)-Double.parseDouble(sPWithoutTax));
					System.out.println("gstAmt =========> "+gstAmt);
				}
				
				cust.setIgst(0d);
				cust.setTaxAmount(Double.parseDouble(quantity) * gstAmt);
				//cust.setTaxAmount(Double.parseDouble(taxAmount));
				
				String saleEmpName = request.getParameter("saleEmpName"+i);
				System.out.println("hi this is Sonal in other bill helper"+saleEmpName);			
				if (saleEmpName.equalsIgnoreCase("") || saleEmpName == null || saleEmpName.equalsIgnoreCase("undefined") || saleEmpName.equalsIgnoreCase(" "))
				{				
					cust.setEmployeeName("NA");				
				}
				else
				{
					cust.setEmployeeName(saleEmpName);
				}
				
				String saleEmpId = request.getParameter("saleEmpId"+i);
				System.out.println("hi this is Sonal in other bill helper"+saleEmpId);
				if(saleEmpId == null || saleEmpId.isEmpty() || saleEmpId.equalsIgnoreCase("") || saleEmpId.equalsIgnoreCase(" "))
				{
					cust.setFkSaleEmployeeId(0l);				
				}
				else
				{
					cust.setFkSaleEmployeeId(Long.parseLong(saleEmpId));
				}

				String rollSize = request.getParameter("rollSize"+i);
				System.out.println("roll size in other bill helper@@@###$$$    ----"+rollSize);
				
				cust.setRollsize(Double.parseDouble(rollSize));
				String sQTY = request.getParameter("goodReceiveQuantity"+i);
				System.out.println("there is stock Quantity #### %%% &&&"+sQTY);
				
				String totalAmount = request.getParameter("totalAmount");
				cust.setTotalAmt(Double.parseDouble(totalAmount));

				String perProductdisPer = request.getParameter("perProductdisPer"+i);
				System.out.println("perProductdisPer =============> "+perProductdisPer);
				if(perProductdisPer == null || perProductdisPer.equalsIgnoreCase("") || perProductdisPer.isEmpty())
				{
					cust.setPerProductdisPer(0.0);
				}
				else
				{
					cust.setPerProductdisPer(Double.parseDouble(perProductdisPer));
				}
				
				String discountPerProduct = request.getParameter("perProductdisAmount"+i);
				System.out.println("discountPerProduct =============> "+discountPerProduct);
				if(discountPerProduct == null || discountPerProduct.equalsIgnoreCase("") || discountPerProduct.isEmpty())
				{
					cust.setDiscount(0.0);				
				}
				else
				{
					cust.setDiscount(Double.parseDouble(discountPerProduct));
				}
				
				String taxAmountAfterDis = request.getParameter("taxAmountAfterDis" + i);
				System.out.println("taxAmountAfterDis =============> "+taxAmountAfterDis);
				if(taxAmountAfterDis == null || taxAmountAfterDis.isEmpty() || taxAmountAfterDis.equalsIgnoreCase(""))
				{
					cust.setTaxAmtAfterDiscount(0.0);
				}
				else
				{
					cust.setTaxAmtAfterDiscount(Double.parseDouble(quantity) * Double.parseDouble(taxAmountAfterDis));
				}
				
				String BillType1 = request.getParameter("billtype");
				
				cust.setBilltype(BillType1);
				System.out.println("BillType1 :-"+BillType1);
				String creditCustomer1 = request.getParameter("creditCustomer1");
				String CustGst = request.getParameter("CustGst");
				System.out.println("CustGst :-"+CustGst);
				String mobileNo = request.getParameter("mobileNo");
				
				String paymentMode = request.getParameter("paymentMode");

				String chequeNum = request.getParameter("chequeNum");

				String cardNum = request.getParameter("cardNum");

				String accNum = request.getParameter("accNum");

				String nameOnCheck = request.getParameter("nameOnCheck");

				String bankName = request.getParameter("bankName");
				
				String grossTotal = request.getParameter("grossTotal");
				
				cust.setGrossamt(Double.parseDouble(grossTotal));
				
				String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");

				String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
				
				
				String cashupi_cashAmount = request.getParameter("cashCard_cashAmount1");

				String cashupi_upiAmount = request.getParameter("cashCard_upiAmount");
				
				System.out.println("upi cash amount :-"+cashupi_cashAmount);
				System.out.println("upi amount :-"+cashupi_upiAmount);
				
				String totalCreditAmt = request.getParameter("totalCreditAmt");
				if(totalCreditAmt == null || totalCreditAmt.isEmpty())
				{
					totalCreditAmt = "0";
					cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
				}
				else
				{
					cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
				}

				cust.setCarNo("NA");
				cust.setContactNo(000l);
				cust.setOwnerName("NA");
				if (creditCustomer1.equalsIgnoreCase("") || creditCustomer1 == null || creditCustomer1.equalsIgnoreCase("undefined") || creditCustomer1.equalsIgnoreCase(" "))
				{				
					cust.setCreditCustomer1("N/A");			
				}
				else
				{
					cust.setCreditCustomer1(creditCustomer1);
				}
				if (CustGst.equalsIgnoreCase("") || CustGst == null || CustGst.equalsIgnoreCase("undefined") || CustGst.equalsIgnoreCase(" "))
				{				
					cust.setCustGst("N/A");			
				}
				else
				{
					cust.setCreditCustomer1(CustGst);
				}
				cust.setSalePrice(Double.parseDouble(salePrice));

				if (!"".equals(mobileNo)) {

					cust.setMobileNo(Long.parseLong(mobileNo));
				} else {

					cust.setMobileNo(Long.parseLong("00"));
				}

				// payment details
				if (paymentMode == null) {
					cust.setPaymentMode("N/A");
				} else {
					cust.setPaymentMode(paymentMode);
				}		
			
				if (paymentMode.equals("cheque")) {

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
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String cardAmount = request.getParameter("cardAmount");
						cust.setCashCard_cardAmount(Double.parseDouble(cardAmount));
					}
					else
					{
						cust.setCashCard_cardAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashCard_cashAmount(0.0);
					
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
					int cardNumLength = cardNum.length();
					if (cardNumLength > 0) {

						cust.setCardNum(Long.parseLong(cardNum));
					} else {
						cust.setCardNum(null);
					}
				}
				else if (paymentMode.equals("neft")) {
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
				}
				else if (paymentMode.equals("cash"))
				{				
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String cashAmount = request.getParameter("cashAmount");
						cust.setCashCard_cashAmount(Double.parseDouble(cashAmount));
					}
					else
					{
						cust.setCashCard_cashAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashCard_cardAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
				}
				
				else if (paymentMode.equals("Upi"))
				{				
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String upiAmount = request.getParameter("UpiAmount");
						cust.setCashupi_upiAmount(Double.parseDouble(upiAmount));
					}
					else
					{
						cust.setCashupi_upiAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashupi_cashAmount(0.0);
					cust.setCashCard_cardAmount(0.0);
					cust.setCashCard_cashAmount(0.0);
					
				}	
				
				if (paymentMode.equals("cashAndupi"))
				{
					if(cashupi_cashAmount.equals("") || cashupi_cashAmount.isEmpty() || cashupi_cashAmount == null)
					{
						
						System.out.println("inside if of upi cash 0");
						cust.setCashupi_cashAmount(0.0);
					}
					else
					{
						System.out.println("inside else of upi cash "+cashupi_cashAmount);
						cust.setCashupi_cashAmount(Double.parseDouble(cashupi_cashAmount));
					}
					
					if(cashupi_upiAmount.equals("") || cashupi_upiAmount.isEmpty() || cashupi_upiAmount == null)
					{
						System.out.println("inside if of upi  0 ");
						cust.setCashupi_upiAmount(0.0);
					}
					else
					{
						System.out.println("inside if of upi amount "+cashupi_upiAmount);
						cust.setCashupi_upiAmount(Double.parseDouble(cashupi_upiAmount));
					}
					
					cust.setCashCard_cardAmount(0.0);
					cust.setCashCard_cashAmount(0.0);
				}
				
				
				if (paymentMode.equals("cashAndCard"))
				{
					if(cashCard_cashAmount.equals("") || cashCard_cashAmount.isEmpty() || cashCard_cashAmount == null)
					{
						cust.setCashCard_cashAmount(0.0);
					}
					else
					{
						cust.setCashCard_cashAmount(Double.parseDouble(cashCard_cashAmount));
					}
					
					if(cashCard_cardAmount.equals("") || cashCard_cardAmount.isEmpty() || cashCard_cardAmount == null)
					{
						cust.setCashCard_cardAmount(0.0);
					}
					else
					{
						cust.setCashCard_cardAmount(Double.parseDouble(cashCard_cardAmount));
					}
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
				}
				String total = request.getParameter("total" + i);
				cust.setTotalperItem(Double.parseDouble(total));
				
				//this two value save user id and userType
				cust.setEmpType(type2);
				System.out.println("type2 ====> "+type2);
				cust.setEmpIdFK(uid);
				System.out.println("uid ====>  "+uid);
				
				DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
				Date dateobj = new Date();
				System.out.println(df.format(dateobj));
				String newDate = df.format(dateobj);
				cust.setCurrent_date(dateobj);
				
				//get bill no auto increment
				session3.setAttribute("BillNo", BillNo);
				session3.setAttribute("customerName", creditCustomer1);
				session3.setAttribute("CustGst", CustGst);
				if (BillNo == null) {
					cust.setBillNo("1");
				} else {
					System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
					cust.setBillNo(BillNo);
				}
				
				String fkProductId = request.getParameter("fkProductId" + i);
				cust.setFkProductId(Long.parseLong(fkProductId));
				
				
				String fkSubCatId = request.getParameter("fkSubCatId" + i);
				cust.setFkSubCatId(Long.parseLong(fkSubCatId));
				
				String fkCatId = request.getParameter("fkCategoryId" + i);
				cust.setFkCatId(Long.parseLong(fkCatId));

				Date now = new Date();
				cust.setBillTime(now);
				
				String style = request.getParameter("style"+i);
				cust.setStyle(style);
				
				String fkSuppId = request.getParameter("fkSuppId"+i);
				cust.setFkSuppId(Long.parseLong(fkSuppId));
				
				cust.setFkShopId(Long.parseLong(shopId));
		
				Long item_id = Long.parseLong(request.getParameter("item_id" + i));
				System.out.println("item_id" + item_id);
				cust.setFkgoodreciveid(item_id);	
				OtherBillDao dao = new OtherBillDao();
				dao.registerBill(cust);
			}
		}
	
		
		//else if(BillType.equals("Permanent"))
		if(BillType.equals("Permanent"))
		{
			for (int i = 0; i < count; i++)
			{
				
				//BillNo = Long.parseLong(request.getParameter("billNo"));
				//System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
				
				String BillType1=request.getParameter("billtype");
				
				String barcodeNo = request.getParameter("barcodeNo" + i);
				Long item_id = Long.parseLong(request.getParameter("item_id" + i));
				String fkProductId = request.getParameter("fkProductId" + i);
				String itemName = request.getParameter("itemName" + i);
				String fkCatId = request.getParameter("fkCategoryId" + i);
				String categoryName = request.getParameter("categoryName" + i);
				String fkSubCatId = request.getParameter("fkSubCatId" + i);
				String hsnSacNo = request.getParameter("hsnSacNo" + i);
				String rollSize = request.getParameter("rollSize"+i);
				String size1 = request.getParameter("size1"+i);
				String style = request.getParameter("style"+i);
				String sQTY = request.getParameter("goodReceiveQuantity"+i);
				String oldSaleQuantityToUpdateStock = request.getParameter("oldSaleQuantityToUpdateStock" + i);
				String quantity = request.getParameter("quantity" + i);
				String salePrice = request.getParameter("salePrice" + i);
				String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
				String perProductdisPer = request.getParameter("perProductdisPer"+i);
				String discountPerProduct = request.getParameter("perProductdisAmount"+i);
				String vat = request.getParameter("vat" + i);
				String igst = request.getParameter("igst" + i);
				String taxAmount = request.getParameter("taxAmount" + i);
				String taxAmountAfterDis = request.getParameter("taxAmountAfterDis" + i);
				String totalAmount = request.getParameter("totalAmount");
				String total = request.getParameter("total" + i);
				
				String saleEmpName = request.getParameter("saleEmpName"+i);
				String saleEmpId = request.getParameter("saleEmpId"+i);
				String fkSuppId = request.getParameter("fkSuppId"+i);
				
				String totalCreditAmt = request.getParameter("totalCreditAmt");
				
				String paymentMode = request.getParameter("paymentMode");
				String chequeNum = request.getParameter("chequeNum");
				String cardNum = request.getParameter("cardNum");
				String accNum = request.getParameter("accNum");
				String nameOnCheck = request.getParameter("nameOnCheck");
				String bankName = request.getParameter("bankName");
				
				String cashCard_cashAmount = request.getParameter("cashCard_cashAmount");
				String cashCard_cardAmount = request.getParameter("cashCard_cardAmount");
				String cashupi_cashAmount = request.getParameter("cashCard_cashAmount1");
				String cashupi_upiAmount = request.getParameter("cashCard_upiAmount");
				
				String creditCustomer1 = request.getParameter("creditCustomer1");
				String CustGst = request.getParameter("custGst");
				String mobileNo = request.getParameter("mobileNo");
				
				String grossTotal = request.getParameter("grossTotal");
				
				
				cust.setBilltype(BillType1);
				cust.setBarcodeNo(Long.parseLong(barcodeNo));
				cust.setFkgoodreciveid(item_id);
				cust.setFkProductId(Long.parseLong(fkProductId));
				cust.setItemName(itemName);
				cust.setFkCatId(Long.parseLong(fkCatId));
				cust.setCategoryName(categoryName);
				cust.setFkSubCatId(Long.parseLong(fkSubCatId));
				cust.setHsnSacNo(hsnSacNo);
				cust.setRollsize(Double.parseDouble(rollSize));
				cust.setSize(size1);
				cust.setStyle(style);
				cust.setQuantity(Double.parseDouble(quantity));
				cust.setSalePrice(Double.parseDouble(salePrice));
				cust.setSpWithoutTaxAmount(Double.parseDouble(sPWithoutTax));
				
				if(perProductdisPer == null || perProductdisPer.equalsIgnoreCase("") || perProductdisPer.isEmpty())
				{
					cust.setPerProductdisPer(0.0);
				} else {
					cust.setPerProductdisPer(Double.parseDouble(perProductdisPer));
				}
				if(discountPerProduct == null || discountPerProduct.equalsIgnoreCase("") || discountPerProduct.isEmpty())
				{
					cust.setDiscount(0.0);				
				} else {
					cust.setDiscount(Double.parseDouble(discountPerProduct));
				}
				double gstAmt = 0.0;
				if (vat.equalsIgnoreCase("0"))
				{
					cust.setVat(Double.parseDouble(vat));
				} else {
					cust.setVat(Double.parseDouble(vat));
					gstAmt = (Double.parseDouble(salePrice)-Double.parseDouble(sPWithoutTax));
				}
				cust.setIgst(0d);
				cust.setTaxAmount(Double.parseDouble(taxAmount));
				if(taxAmountAfterDis == null || taxAmountAfterDis.isEmpty() || taxAmountAfterDis.equalsIgnoreCase(""))
				{
					cust.setTaxAmtAfterDiscount(0.0);
				} else {
					//cust.setTaxAmtAfterDiscount(Double.parseDouble(quantity) * Double.parseDouble(taxAmountAfterDis));
					cust.setTaxAmtAfterDiscount(Double.parseDouble(taxAmountAfterDis));
				}
				cust.setTotalAmt(Double.parseDouble(totalAmount));
				cust.setTotalperItem(Double.parseDouble(total));
				
				if (saleEmpName.equalsIgnoreCase("") || saleEmpName == null || saleEmpName.equalsIgnoreCase("undefined") || saleEmpName.equalsIgnoreCase(" "))
				{
					cust.setEmployeeName("NA");		
				} else {
					cust.setEmployeeName(saleEmpName);
				}
				if(saleEmpId == null || saleEmpId.isEmpty() || saleEmpId.equalsIgnoreCase("") || saleEmpId.equalsIgnoreCase(" "))
				{
					cust.setFkSaleEmployeeId(0l);				
				} else {
					cust.setFkSaleEmployeeId(Long.parseLong(saleEmpId));
				}
				cust.setFkSuppId(Long.parseLong(fkSuppId));
				
				if(totalCreditAmt == null || totalCreditAmt.isEmpty())
				{
					totalCreditAmt = "0";
					cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
				} else {
					cust.setTotalSaleReturnCreditAmt(Double.parseDouble(totalCreditAmt));
				}
				
				
				//payment details
				if (paymentMode == null) {
					cust.setPaymentMode("N/A");
				} else {
					cust.setPaymentMode(paymentMode);
				}
				if (paymentMode.equals("cheque")) {

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
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String cardAmount = request.getParameter("cardAmount");
						cust.setCashCard_cardAmount(Double.parseDouble(cardAmount));
					}
					else
					{
						cust.setCashCard_cardAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashCard_cashAmount(0.0);
					
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
					int cardNumLength = cardNum.length();
					if (cardNumLength > 0) {
						cust.setCardNum(Long.parseLong(cardNum));
					} else {
						cust.setCardNum(null);
					}
				} else if (paymentMode.equals("neft"))
				{
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
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String cashAmount = request.getParameter("cashAmount");
						cust.setCashCard_cashAmount(Double.parseDouble(cashAmount));
					}
					else
					{
						cust.setCashCard_cashAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashCard_cardAmount(0.0);
					cust.setCashupi_cashAmount(0.0);
					cust.setCashupi_upiAmount(0.0);
				} else if (paymentMode.equals("Upi"))
				{				
					if(Double.parseDouble(totalCreditAmt) > 0)
					{
						String upiAmount = request.getParameter("UpiAmount");
						cust.setCashupi_upiAmount(Double.parseDouble(upiAmount));
					} else {
						cust.setCashupi_upiAmount(Double.parseDouble(grossTotal));
					}
					cust.setCashupi_cashAmount(0.0);
					cust.setCashCard_cardAmount(0.0);
					cust.setCashCard_cashAmount(0.0);
				}
				
				if (paymentMode.equals("cashAndupi"))
				{
					if(cashupi_cashAmount.equals("") || cashupi_cashAmount.isEmpty() || cashupi_cashAmount == null)
					{
						
						System.out.println("inside if of upi cash 0");
						cust.setCashupi_cashAmount(0.0);
					} else {
						System.out.println("inside else of upi cash "+cashupi_cashAmount);
						cust.setCashupi_cashAmount(Double.parseDouble(cashupi_cashAmount));
					}
					if(cashupi_upiAmount.equals("") || cashupi_upiAmount.isEmpty() || cashupi_upiAmount == null)
					{
						System.out.println("inside if of upi  0 ");
						cust.setCashupi_upiAmount(0.0);
					} else {
						System.out.println("inside if of upi amount "+cashupi_upiAmount);
						cust.setCashupi_upiAmount(Double.parseDouble(cashupi_upiAmount));
					}
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
					cust.setCashupi_upiAmount(0.0);
				}
				
				cust.setCarNo("NA");
				cust.setContactNo(000l);
				cust.setOwnerName("NA");
				if (creditCustomer1.equalsIgnoreCase("") || creditCustomer1 == null || creditCustomer1.equalsIgnoreCase("undefined") || creditCustomer1.equalsIgnoreCase(" "))
				{				
					cust.setCreditCustomer1("N/A");			
				} else {
					cust.setCreditCustomer1(creditCustomer1);
				}
				if (CustGst.equalsIgnoreCase("") || CustGst == null || CustGst.equalsIgnoreCase("undefined") || CustGst.equalsIgnoreCase(" "))
				{				
					cust.setCustGst("N/A");			
				} else {
					cust.setCustGst(CustGst);
				}
				if (!"".equals(mobileNo)) {

					cust.setMobileNo(Long.parseLong(mobileNo));
				} else {

					cust.setMobileNo(Long.parseLong("00"));
				}
				
				cust.setGrossamt(Double.parseDouble(grossTotal));
				
				//this two value save user id and userType
				cust.setEmpType(type2);
				System.out.println("type2 ====> "+type2);
				cust.setEmpIdFK(uid);
				System.out.println("uid ====>  "+uid);
				
				DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
				Date dateobj = new Date();
				System.out.println(df.format(dateobj));
				String newDate = df.format(dateobj);
				cust.setCurrent_date(dateobj);
				
				Date now = new Date();
				cust.setBillTime(now);
				
				cust.setFkShopId(Long.parseLong(shopId));
				
				if (BillNo == null) {
					cust.setBillNo("1");
				} else {
					System.out.println("CURRENT Bill No ======> st.getBillNumber ::::::::::::::::::::: "+BillNo);
					cust.setBillNo(BillNo);
				}
				
				
				//get bill no auto increment Set Session Attributes For BillPDF
				session3.setAttribute("BillNo", BillNo);
				session3.setAttribute("customerName", creditCustomer1);
				session3.setAttribute("CustGst", CustGst);
				
				
				//To Register Bill Details Dao Method is Called
				OtherBillDao dao = new OtherBillDao();
				
				//Update Borcode Number Wise Stock Add Old Quantity In Stock
				Long barcodeNoLongToAddOld = Long.parseLong(barcodeNo);
				Double oldSaleQuantityToUpdateStockDoubleToAddOld = Double.parseDouble(oldSaleQuantityToUpdateStock);
				Long shopIdLongToAddOld = Long.parseLong(shopId);
				dao.updateBarcodeNoWiseStockAddOldQuantityInBarcodeNoWiseStockEditSaleTaxInvoce(barcodeNoLongToAddOld, oldSaleQuantityToUpdateStockDoubleToAddOld,shopIdLongToAddOld);
				
				dao.registerBill(cust);
				
				//Update Borcode Number Wise Stock
				Long barcodeNoLong = Long.parseLong(barcodeNo);
				Double quantityDouble = Double.parseDouble(quantity);
				Long shopIdLong = Long.parseLong(shopId);
				dao.updateBarcodeNoWiseStockSaleInvoce(barcodeNoLong, quantityDouble,shopIdLong);
				
				System.out.println("In Helper editSaleInvoceBilling item_id :- "+item_id);
				System.out.println("In Helper editSaleInvoceBilling quantity :- "+quantity);
				System.out.println("In Helper editSaleInvoceBilling rollSize :- "+rollSize);
				System.out.println("In Helper editSaleInvoceBilling sQTY :- "+sQTY);
				System.out.println("In Helper editSaleInvoceBilling size1 :- "+size1);
				//Update Good Receive Quantity oldSaleQuantityToUpdateStock
				GoodReciveDao good = new GoodReciveDao();
				//Minus Quantity From Good Receive Quantity
				good.minusOldQuantityFromGoodReceive(item_id, oldSaleQuantityToUpdateStock, rollSize, sQTY, size1);
				//Add New Quantity From Good Receive Quantity
				good.updateQuantity(item_id, quantity, rollSize, sQTY, size1);
				
				
				//Update Main Stock
				StockDao dao3 = new StockDao();
				List stkList2 = dao3.getAllStockEntry();
				
				Double updatequnty = 0.0;
				
				for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long productId = st.getFkProductId();
					Long categoryId = st.getFkCategoryId();
					Long fkShopId = st.getFkShopId();
					
					//If ItemName Is Already Exists In Stock Table
					//if (ItemId.equals(itemName) && cat.equals(categoryName))
					
					if (productId == Long.parseLong(fkProductId) && categoryId == Long.parseLong(fkCatId) && fkShopId == Long.parseLong(shopId))
					{
						Long PkItemId = st.getPkStockId();
						Double qunty = st.getQuantity();
						double QTY = 0.0;
						
						if(!rollSize.equals("0"))
						{
							List<Double> list = null;
							Double totalQty = 0.0;
							HibernateUtility hbuSu = HibernateUtility.getInstance();
							Session sessionSu = hbuSu.getHibernateSession();
							Transaction transactionSu = sessionSu.beginTransaction();
							org.hibernate.Query querySu = sessionSu.createSQLQuery("select SUM(gr.Quantity) from goodreceive gr where gr.fkProductId = :fkProductId AND gr.fkCatId = :fkCatId AND gr.fkShopId = :fkShopId");
							querySu.setParameter("fkProductId", fkProductId);
							querySu.setParameter("fkCatId", fkCatId);
							querySu.setParameter("fkShopId", fkShopId);
							list = querySu.list();
							updatequnty = list.get(0).doubleValue();
							
						} else {
							updatequnty = (Double) (qunty - Double.parseDouble(quantity));
						}
						
						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();
						
						Date date = new Date();
						
						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setQuantity(updatequnty);
						updateStock.setUpdateDate(date);
						session.saveOrUpdate(updateStock);
						transaction.commit();
					}
				}
			}
			
			int gCount1 = 0;
			String count1 = request.getParameter("count1");
			if(count1 == null || count1.isEmpty() || count1 == "" || count1 == " ")
			{
				gCount1 = 0;
			} else {
				gCount1 = Integer.parseInt(count1);
			}
			
			System.out.println("GRID COUNT ====> "+count1);
			
			if(gCount1 > 0)
			{
				System.out.println("c22222 ====> " + count1);
				HibernateUtility hbu2 = null;
				Session session2 = null;
				Transaction transaction2 = null;
				
				try
				{
					hbu2 = HibernateUtility.getInstance();
					session2 = hbu2.getHibernateSession();
					transaction2 = session2.beginTransaction();
					
					for(int j=0; j<gCount1; j++)
					{
						String transactionId = request.getParameter("transactionId"+j);
						Query query = session2.createSQLQuery("UPDATE salereturn set redeemedForBillNo = '"+BillNo+"' WHERE transactionId = "+transactionId);
						query.executeUpdate();
						transaction2.commit();
					}
				} catch(Exception e) {
					e.printStackTrace();
				}
			} else {}
		}
	}
	
	
}
