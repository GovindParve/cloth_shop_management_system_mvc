package com.smt.helper;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
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
import com.smt.bean.BarcodeReportBean;
import com.smt.bean.BillBean;
import com.smt.bean.GetCreditCustomerDetails;
import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.GoodreciveBillBean;
import com.smt.bean.PreviousGoodReceive;
import com.smt.bean.PurchaseReport;
import com.smt.bean.allTransactionId;
import com.smt.bean.currentStock;
import com.smt.dao.AdvanceBookingDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.OtherBillDao;
import com.smt.dao.PurchaseReturnDao;
import com.smt.dao.StockDao;
import com.smt.dao.SupplierPaymentDao;
import com.smt.hibernate.BarcodeNumberWiseStockDetailsHibernate;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.PurchaseReturn;
import com.smt.hibernate.Stock;
import com.smt.hibernate.SupplierPaymentBean;
import com.smt.utility.HibernateUtility;

public class GoodReceiveHelper
{
	public void regGoodReceive(HttpServletRequest request, HttpServletResponse response)
	{		
		Long barcodeNo = 1000l;
		Long voucherNo = 1l;

		System.out.println("GOOD RECEIVE HELPER");
		
		GoodReciveDao dao = new GoodReciveDao();
		GoodReciveDao data = new GoodReciveDao();
		
		// TODO Auto-generated method stub

		GoodReceive goodsReceived = new GoodReceive();
		System.out.println("hi vikas in helper");
		Integer count = Integer.parseInt(request.getParameter("count"));
		
		String bookingNoAB = "";
		
		String billNo = request.getParameter("billNo");		
		String resolution = request.getParameter("resolution");
		String supplierId = request.getParameter("supplierId");
		
		
		String transaportExpense = request.getParameter("transaportExpense");
		System.out.println("this is transaportExpense "+transaportExpense);
		
		String labourExpense = request.getParameter("labourExpense");
		System.out.println("this is labourExpense "+labourExpense);
		String Grosstotalwithoutexpese = request.getParameter("resolution1");
		System.out.println("this is Grosstotalwithoutexpese "+Grosstotalwithoutexpese);
		String pDate = request.getParameter("pDate");
		String purchaseDueDate = request.getParameter("purchaseDueDate");
		System.out.println("this is purchaseDueDate "+purchaseDueDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		Date purchaseEntryDate  = new Date();
		Date adate = null;
		Date payDueDate = null;
		try
		{
			adate = format.parse(pDate);
			if(purchaseDueDate == null || purchaseDueDate.isEmpty() || purchaseDueDate.equalsIgnoreCase(""))
			{}
			else
			{
				payDueDate = format.parse(purchaseDueDate);
			}
		}
		catch (ParseException e1)
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}		
		
		System.out.println("c111111" + count);		
	
		List vList = data.getLastVoucherNo();

		for (int i = 0; i < vList.size(); i++)
		{
			GoodreciveBillBean grbb = (GoodreciveBillBean) vList.get(i);
			voucherNo = grbb.getVoucherNo();
			voucherNo++;
		}
		
		for (int i = 0; i < count; i++)
		{
			HttpSession session3 = request.getSession();
			//GoodReciveDao data = new GoodReciveDao();
			List stkList = data.getLastBarcodeNo();
			for (int j = 0; j < stkList.size(); j++)
			{
				GoodreciveBillBean st = (GoodreciveBillBean) stkList.get(j);
				barcodeNo = st.getBarcodeNo();
				barcodeNo++;
			}
		
			goodsReceived.setLabourExpense(Double.parseDouble(labourExpense));
			goodsReceived.setTransaportExpense(Double.parseDouble(transaportExpense));
			goodsReceived.setGrosstotalwithoutexpese(Double.parseDouble(Grosstotalwithoutexpese));
			
			String shopId = request.getParameter("shopId" + i);		
			goodsReceived.setFkShopId(Long.parseLong(shopId));
			goodsReceived.setVoucherNo(voucherNo);
			
			String color = request.getParameter("color" + i);
			System.out.println("Color is :++++++++++++" + color);
			goodsReceived.setColor(color);

			String size = request.getParameter("size" + i + ""/* +k */);
			System.out.println("Size is :++++++++++++" + size);
			goodsReceived.setSize(size);			

			String quantity = request.getParameter("quantity" + i + ""/* +k */);
			goodsReceived.setQuantity(Double.parseDouble(quantity));
			goodsReceived.setOringnalQuantity(Double.parseDouble(quantity));

			goodsReceived.setBarcodeQty(Long.parseLong(quantity));
			
			String rollSize = request.getParameter("rollSize" + i/* + ""/* +k */);
			if (!"".equals(rollSize) || rollSize != null)
			{
				System.out.println("rollSize ===> "+rollSize);
				goodsReceived.setRollSize(Double.parseDouble(rollSize));
			}
			else if(rollSize == null || rollSize.equalsIgnoreCase("0"))
			{
				goodsReceived.setRollSize(0.0);
			}

			// goodsReceived.setOringnalQuantity(Double.parseDouble(quantity));

			String itemName = request.getParameter("itemName" + i);
			goodsReceived.setItemName(itemName);

			String catName = request.getParameter("catName" + i);
			goodsReceived.setCatName(catName);

			String buyPrice = request.getParameter("buyPrice" + i);
			goodsReceived.setBuyPrice(Double.parseDouble(buyPrice));

			String purcode = request.getParameter("purcode" + i);
			System.out.println(purcode);
			goodsReceived.setPurcode(purcode);
			
			String discount = request.getParameter("disPer"+i);
			goodsReceived.setDiscount(Double.parseDouble(discount));

			String actualprice = request.getParameter("actualprice" + i);
			goodsReceived.setSalePrice(Double.parseDouble(actualprice));
			System.out.println(actualprice);

			String hsnsacno = request.getParameter("hsnsacno" + i);
			goodsReceived.setHsnsacno(hsnsacno);

			String Total = request.getParameter("Total" + i);
			goodsReceived.setTotal(Double.parseDouble(Total));
			
			String subCatId = request.getParameter("subCatId" + i);
			goodsReceived.setSubCatId(Long.parseLong(subCatId));
			
			String productId = request.getParameter("productId" + i);
			goodsReceived.setFkProductId(Long.parseLong(productId));
			
			String categoryId = request.getParameter("categoryId" + i);
			goodsReceived.setFkCatId(Long.parseLong(categoryId));

			bookingNoAB = request.getParameter("bookingNoAB" + i);
			System.out.println("bookingNoAB ====> "+bookingNoAB);
			if(bookingNoAB == null || bookingNoAB.equalsIgnoreCase("") || bookingNoAB.equalsIgnoreCase(" ") || bookingNoAB.equalsIgnoreCase("undefined"))
			{
				bookingNoAB = "0";
			}
			else
			{}

			goodsReceived.setBookingNo(Long.parseLong(bookingNoAB));	

			//String billNo = request.getParameter("billNo");
			goodsReceived.setBillNo(billNo);
			
			String contactPerson = request.getParameter("contactPerson");
			if (!"".equals(contactPerson))
			{
				goodsReceived.setContactPerson(contactPerson);
			}
			else
			{
				goodsReceived.setContactPerson("NA");
			}

			String vat = request.getParameter("vat" + i);
			Double gst = Double.parseDouble(vat);
			Double mainGst = gst;
			System.out.println("VAt is " + mainGst);
			if (vat == null) {
				goodsReceived.setVat(0.0);
			} else {
				goodsReceived.setVat(mainGst);
			}

			String igst = request.getParameter("igst" + i);
			System.out.println("igst is " + igst);
			if (igst == null) {
				goodsReceived.setIgst(0.0);
			} else {
				goodsReceived.setIgst(Double.parseDouble(igst));
			}

			String gstamt = request.getParameter("gstamt" + i);
			System.out.println("gstamt is " + gstamt);
			if (gstamt == null) {
				goodsReceived.setTaxAmount(0.0);
			} else {
				goodsReceived.setTaxAmount(Double.parseDouble(gstamt));
			}

			String extraDiscount = request.getParameter("extraDiscount");
			goodsReceived.setExtraDiscount(Double.parseDouble(extraDiscount));

			String expence = request.getParameter("expence");
			goodsReceived.setExpence(Double.parseDouble(expence));

			
			
			
		
			//String resolution = request.getParameter("resolution");
			goodsReceived.setGrossTotal(Double.parseDouble(resolution));

			//String supplierId = request.getParameter("supplierId");
			goodsReceived.setSupplierName(Long.parseLong(supplierId));

			//String pDate = request.getParameter("pDate");
			
			String supcode = request.getParameter("supcode");
			System.out.println("this is supplier code"+supcode);
			goodsReceived.setSupCode(supcode);
			
			/*Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{
					lastBillPending = Double.parseDouble(object[1].toString());
					System.out.println("ln 625 LAST BILL PENDING ==============> "+object[1].toString());
				}
			}
			Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);*/
			
			Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId, shopId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{				
					System.out.println("ln 220 LAST BILL PENDING ==============> "+object[1].toString());
					lastBillPending = Double.parseDouble(object[1].toString());
					System.out.println("ln 222 LAST BILL PENDING ==============> "+object[1].toString());
				}
			}
			Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);
			
			//Double lastBillPending = dao.getPendingBillPayment(supplierId);
			//Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);
			
			/*goodsReceived.setPendingBillPayment(Double.parseDouble(resolution));
			goodsReceived.setPendingBillPayment(totalBillpending);*/			

			double discontTotal = Double.parseDouble(Total);
			double data1 = Double.parseDouble(quantity);

			double discontValue = (discontTotal / data1);

			long data5 = (long) discontValue;
			System.out.println("print BuyPrice ::  " + data5);
			String data6 = String.valueOf(data5);
			String xyz = "";
			String adc = "";
			String[] Shreemant;
			if (actualprice.equals("0.0")) {
				Shreemant = data6.split("");
			} else {
				Shreemant = actualprice.split("");
			}
			for (int a = 0; a < Shreemant.length; a++) {
				System.out.println("shreemant :: " + Shreemant[a]);
				String abc = Shreemant[a];
				if (abc.equals("1")) {
					adc = "N";
				}
				if (abc.equals("2")) {
					adc = "A";
				}
				if (abc.equals("3")) {
					adc = "G";
				}
				if (abc.equals("4")) {
					adc = "P";
				}
				if (abc.equals("5")) {
					adc = "U";
				}
				if (abc.equals("6")) {
					adc = "R";
				}
				if (abc.equals("7")) {
					adc = "C";
				}
				if (abc.equals("8")) {
					adc = "I";
				}
				if (abc.equals("9")) {
					adc = "T";
				}
				if (abc.equals("0")) {
					adc = "Y";
				}
				xyz = xyz.concat(adc);
			}

			/*Date adate = null;
			try {
				adate = format.parse(pDate);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace()
				
				;
			}*/
			goodsReceived.setDate(adate);
			goodsReceived.setPaymentDueDate(payDueDate);

			session3.setAttribute("barcodeNo", barcodeNo);

			if (barcodeNo == null) {
				goodsReceived.setBarcodeNo(1000l);
			} else {
				goodsReceived.setBarcodeNo(barcodeNo);
			}

			goodsReceived.setReturnQuantity(0);
			
			String sPWithoutTax = request.getParameter("sPWithoutTax"+i);
			goodsReceived.setSpWithoutTax(Double.parseDouble(sPWithoutTax));			
			
			//goodsReceived.setDisPerForBill(10.0);
			goodsReceived.setDisPerForBill(0.0);
			
			String style = request.getParameter("style"+i);			
			if(style == null || style.equalsIgnoreCase("") || style.isEmpty())
			{
				goodsReceived.setStyle("N/A");
			}
			else
			{
				goodsReceived.setStyle(style);
			}
			
			String subCatName = request.getParameter("subCatName"+i);			
			if(subCatName == null || subCatName.equalsIgnoreCase(""))
			{
				subCatName = "";
			}
			
			goodsReceived.setSoldQuantity(0d);
			
			goodsReceived.setPurchaseEntryDate(purchaseEntryDate);
			
			//Registering for Good Receive 
			dao.regGoodReceive(goodsReceived);
			
			//Updating supplier pendingTotalAmount
			dao.setPendingBillPaymentToSupp(totalBillpending, supplierId, shopId);
			
			//Updating AdvanceBooking
			if(Long.parseLong(bookingNoAB) > 0)
			{
				System.out.println("Long.parseLong(bookingNoAB) > 0 "+bookingNoAB);
				AdvanceBookingDao advancebooking = new AdvanceBookingDao();
				advancebooking.updateAdvanceBooking(bookingNoAB, billNo);
			}
			
			StockDao dao1 = new StockDao();
			List stkList2 = dao1.getAllStockEntry();

			double quant = Double.parseDouble(quantity);

			try
			{
				FileInputStream fstream = new FileInputStream("C:/barcose/input.prn");

				BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
				FileWriter fw = new FileWriter("C:/barcose/Output" + i + ".txt");

				BufferedWriter bw = new BufferedWriter(fw);
				String strLine;
				String str1;
				while ((strLine = br.readLine()) != null)
				{
					if (strLine.equals("@shopName")) {
						str1 = br.readLine();
						strLine = str1 + "\"Style me\"";
					}
					else if (strLine.equals("@product"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + itemName + "\"";
					}
					else if (strLine.equals("@quanti"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + quantity + "\"";
					}
					else if (strLine.equals("@catName"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + catName + "\"";
					}
					else if (strLine.equals("@subCatName"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + subCatName + "\"";
					}					
					else if (strLine.equals("@barv"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + "!105" + barcodeNo + "\"";
					}
					else if (strLine.equals("@bar"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + barcodeNo + "\"";
					}
					else if (strLine.equals("@company"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + catName + "\"";
					}
					else if (strLine.equals("@total"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + xyz + "\"";
					}
					else if (strLine.equals("@quantityForNumberOfPrint"))
					{
						str1 = br.readLine();
						strLine = str1 + quantity;
					}
					else if (strLine.equals("@size"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + size + "\"";
					}
					else if (strLine.equals("@style"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + style + "\"";
					}					
					else if (strLine.equals("@saleprice"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" +""+actualprice + "\"";
					}
					//for purchase code
					else if (strLine.equals("@pcode"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + purcode + "\"";//purcode
					}
					//for supplier code
					else if (strLine.equals("@scode"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + supcode + "\"";//purcode
					}

					System.out.println(strLine);
					bw.write(strLine + "\r\n");
					
					/*
					if (strLine.equals("@product")) {
						str1 = br.readLine();
						strLine = str1 + "\"Style me\"";
					} else if (strLine.equals("@quanti")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + itemName + "\"";
					} else if (strLine.equals("@catName")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + itemName + "\"";

					} else if (strLine.equals("@barv")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + "!105" + barcodeNo + "\"";

					} else if (strLine.equals("@bar")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + barcodeNo + "\"";
					} else if (strLine.equals("@company")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + catName + "\"";
					} else if (strLine.equals("@total")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + xyz + "\"";

					} else if (strLine.equals("@quantityForNumberOfPrint")) {
						str1 = br.readLine();
						strLine = str1 + quantity;

					} else if (strLine.equals("@size")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + size + "\"";

					} else if (strLine.equals("@saleprice")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + "Rs " + actualprice + "\"";

					}
					//for purchase code
					else if (strLine.equals("@pcode")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + purcode + "\"";//purcode

					}
					//for supplier code
					else if (strLine.equals("@scode")) {
						str1 = br.readLine();
						strLine = str1 + "\"" + supcode + "\"";//purcode

					}

					System.out.println(strLine);
					bw.write(strLine + "\r\n");
				*/
				}
				System.out.println("catName is " + catName);
				System.out.println("Barcode is ++++++++++" + barcodeNo);
				System.out.println("itemName is *********" + itemName);
				System.out.println("Sale Price is //////" + actualprice);
				System.out.println("size is " + size);
				bw.close();
				// Close the input stream
				br.close();

				List cmdAndArgs = Arrays.asList("cmd", "/C", "printbatch" + i + ".bat");
				File dir = new File("C:/barcose");

				ProcessBuilder pb = new ProcessBuilder(cmdAndArgs);
				pb.directory(dir);
				Process p = pb.start();
			} catch (Exception e) {

			}

			// End Barcode code

			/* If Stock Is Empty */
			if (stkList2.size() == 0)
			{
				Stock newEntry = new Stock();

				newEntry.setItemName(itemName);
				newEntry.setQuantity(Double.parseDouble(quantity));
				newEntry.setCatName(catName);
				newEntry.setFkCategoryId(Long.parseLong(categoryId));
				newEntry.setFkProductId(Long.parseLong(productId));;
				newEntry.setFkShopId(Long.parseLong(shopId));
				StockDao dao2 = new StockDao();
				dao2.registerStock(newEntry);
			}
			else/* To Update Stock Table If It is Not Empty */
			{
				for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long PkItemId = st.getPkStockId();
					Long fkProductId = st.getFkProductId();
					Long fkCategoryId = st.getFkCategoryId();
					Long fkShopId = st.getFkShopId();
					
					/* If ItemName Is Already Exists In Stock Table */
				//	if (ItemId.equals(itemName) && cat.equals(catName)) {
					if ((Long.parseLong(productId) == fkProductId)  && (Long.parseLong(categoryId) == fkCategoryId) && (Long.parseLong(shopId) == fkShopId))
					{
						Double qunty = st.getQuantity();
						Double updatequnty = (Double) (qunty + Double.parseDouble(quantity));
						
						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();

						DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
						Date date = new Date();

						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);

						session.saveOrUpdate(updateStock);
						transaction.commit();
						break;
					}
					else
					{
						/* ItemName is Not Exists */
						if (j + 1 == stkList2.size())
						{
							Stock newEntry = new Stock();

							newEntry.setItemName(itemName);
							newEntry.setQuantity(Double.parseDouble(quantity));
							newEntry.setCatName(catName);
							newEntry.setFkCategoryId(Long.parseLong(categoryId));
							newEntry.setFkProductId(Long.parseLong(productId));
							newEntry.setFkShopId(Long.parseLong(shopId));

							StockDao dao2 = new StockDao();
							dao2.registerStock(newEntry);
						}
					}
				}
			}
			
			//Barcode Wise Stock Entry
			BarcodeNumberWiseStockDetailsHibernate newEntry = new BarcodeNumberWiseStockDetailsHibernate();
			
			if (!"".equals(productId)) {
				newEntry.setFkProductId(Long.parseLong(productId));
			} else {
				newEntry.setFkProductId(0l);
			}
			if (!"".equals(itemName)) {
				newEntry.setItemName(itemName);
			} else {
				newEntry.setItemName("N/A");
			}
			if (!"".equals(categoryId)) {
				newEntry.setFkCategoryId(Long.parseLong(categoryId));
			} else {
				newEntry.setFkCategoryId(0l);
			}
			if (!"".equals(catName)) {
				newEntry.setCatName(catName);
			} else {
				newEntry.setCatName("N/A");
			}
			if (!"".equals(subCatId)) {
				newEntry.setFkSubCategoryId(Long.parseLong(subCatId));
			} else {
				newEntry.setFkSubCategoryId(0l);
			}
			if (!"".equals(subCatId)) {
				newEntry.setSubCategoryName(subCatName);
			} else {
				newEntry.setSubCategoryName("N/A");
			}
			if (barcodeNo == null) {
				newEntry.setBarcodeNo("1000l");
			} else {
				newEntry.setBarcodeNo(barcodeNo.toString());
			}
			if (!"".equals(quantity)) {
				newEntry.setBarcodeNumberWiseStockQuantity(Double.parseDouble(quantity));
			} else {
				newEntry.setBarcodeNumberWiseStockQuantity(0d);
			}
			if (!"".equals(quantity)) {
				newEntry.setOriginalQuantity(Double.parseDouble(quantity));
			} else {
				newEntry.setOriginalQuantity(0d);
			}
			if (!"".equals(buyPrice)) {
				newEntry.setBuyPrice(Double.parseDouble(buyPrice));
			} else {
				newEntry.setBuyPrice(0d);
			}
			if (!"".equals(actualprice)) {
				newEntry.setSalePrice(Double.parseDouble(actualprice));
			} else {
				newEntry.setSalePrice(0d);
			}
			if (!"".equals(shopId)) {
				newEntry.setFkShopId(Long.parseLong(shopId));
			} else {
				newEntry.setFkShopId(0l);
			}
			
			DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			Date date = new Date();
			newEntry.setUpdateDate(date);
			
			StockDao dao3 = new StockDao();
			dao3.saveBarcodeNumberWiseStockDetails(newEntry);
		}
		
		/*
			SupplierPaymentBean bean = new SupplierPaymentBean();
			bean.setBillNo(billNo);
			bean.setSupplier(Long.parseLong(supplierId));
			bean.setBalance(Double.parseDouble(resolution));
			bean.setTotalAmount(Double.parseDouble(resolution));
			bean.setPaymentType("credit");
			bean.setPaymentMode("cash");
			bean.setInsertDate(adate);
			bean.setPersonname("N/A");
			bean.setCredit(0.00);
			SupplierPaymentDao daov = new SupplierPaymentDao();
			daov.regSupPayment(bean);
		*/
	}
	
	// Register Data in database without barcode printing	
	public void regGoodReceiveWithOutBarcode(HttpServletRequest request, HttpServletResponse response)
	{		
		Long barcodeNo = 1000l;
		Long voucherNo = 1l;
		GoodReciveDao dao = new GoodReciveDao();
		GoodReciveDao data = new GoodReciveDao();
		
		// TODO Auto-generated method stub

		GoodReceive goodsReceived = new GoodReceive();
		System.out.println("hi vikas in helper witout barcode print");
		Integer count = Integer.parseInt(request.getParameter("count"));
		
		String billNo = request.getParameter("billNo");		
		String resolution = request.getParameter("resolution");
		String supplierId = request.getParameter("supplierId");
		String pDate = request.getParameter("pDate");
		String purchaseDueDate = request.getParameter("purchaseDueDate");
		System.out.println("this is purchaseDueDate "+purchaseDueDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		Date purchaseEntryDate  = new Date();
		Date adate = null;
		Date payDueDate = null;
		try
		{
			adate = format.parse(pDate);
			if(purchaseDueDate == null || purchaseDueDate.isEmpty() || purchaseDueDate.equalsIgnoreCase(""))
			{}
			else
			{
				payDueDate = format.parse(purchaseDueDate);
			}
		}
		catch (ParseException e1)
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		System.out.println("c111111" + count);		
		
		List vList = data.getLastVoucherNo();

		for (int i = 0; i < vList.size(); i++)
		{
			GoodreciveBillBean grbb = (GoodreciveBillBean) vList.get(i);
			voucherNo = grbb.getVoucherNo();
			voucherNo++;
		}		

		for (int i = 0; i < count; i++)
		{
			HttpSession session3 = request.getSession();
			//GoodReciveDao data = new GoodReciveDao();
			List stkList = data.getLastBarcodeNo();

			for (int j = 0; j < stkList.size(); j++)
			{
				GoodreciveBillBean st = (GoodreciveBillBean) stkList.get(j);
				barcodeNo = st.getBarcodeNo();
				barcodeNo++;
			}
			
			String shopId = request.getParameter("shopId"+ i);
			goodsReceived.setFkShopId(Long.parseLong(shopId));
			goodsReceived.setVoucherNo(voucherNo);
			
			String color = request.getParameter("color" + i + ""/* +k */);
			System.out.println("Color is :++++++++++++" + color);
			goodsReceived.setColor(color);

			String size = request.getParameter("size" + i + ""/* +k */);
			System.out.println("Size is :++++++++++++" + size);
			goodsReceived.setSize(size);

			String quantity = request.getParameter("quantity" + i + ""/* +k */);
			goodsReceived.setQuantity(Double.parseDouble(quantity));
			goodsReceived.setOringnalQuantity(Double.parseDouble(quantity));

			goodsReceived.setBarcodeQty(Long.parseLong(quantity));

			String rollSize = request.getParameter("rollSize" + i + ""/* +k */);
			System.out.println("rollSize ========> "+rollSize);
			if (!"".equals(rollSize) || rollSize != null)
			{
				goodsReceived.setRollSize(Double.parseDouble(rollSize));
			}
			else if(rollSize == null || rollSize.equalsIgnoreCase("0"))
			{
				goodsReceived.setRollSize(0);
			}
			/*if (!"".equals(rollSize)) {
				goodsReceived.setRollSize(Double.parseDouble(rollSize));
			} else {
				goodsReceived.setRollSize(1);
			}*/

			// goodsReceived.setOringnalQuantity(Double.parseDouble(quantity));

			String itemName = request.getParameter("itemName" + i);
			goodsReceived.setItemName(itemName);

			String catName = request.getParameter("catName" + i);
			goodsReceived.setCatName(catName);

			String buyPrice = request.getParameter("buyPrice" + i);
			goodsReceived.setBuyPrice(Double.parseDouble(buyPrice));

			String purcode = request.getParameter("purcode" + i);
			System.out.println(purcode);
			goodsReceived.setPurcode(purcode);
			
			String discount = request.getParameter("disPer"+i);
			System.out.println("discount ==============> "+discount);
			goodsReceived.setDiscount(Double.parseDouble(discount));

			String actualprice = request.getParameter("actualprice" + i);
			goodsReceived.setSalePrice(Double.parseDouble(actualprice));
			System.out.println(actualprice);
			
			String subCatId = request.getParameter("subCatId" + i);
			System.out.println("subCatId =====> "+subCatId);
			goodsReceived.setSubCatId(Long.parseLong(subCatId));
			
			String subCatName = request.getParameter("subCatName"+i);			
			if(subCatName == null || subCatName.equalsIgnoreCase(""))
			{
				subCatName = "";
			}
			
			String productId = request.getParameter("productId" + i);
			System.out.println("productId =====> "+productId);
			goodsReceived.setFkProductId(Long.parseLong(productId));
			
			String categoryId = request.getParameter("categoryId" + i);
			System.out.println("categoryId =====> "+categoryId);
			goodsReceived.setFkCatId(Long.parseLong(categoryId));
			
			String bookingNoAB = request.getParameter("bookingNoAB" + i);
			if(bookingNoAB == null || bookingNoAB.equalsIgnoreCase("") || bookingNoAB.equalsIgnoreCase("undefined") || bookingNoAB.equalsIgnoreCase(" "))
			{
				bookingNoAB = "0";
			}
			goodsReceived.setBookingNo(Long.parseLong(bookingNoAB));
			
			String hsnsacno = request.getParameter("hsnsacno" + i);
			goodsReceived.setHsnsacno(hsnsacno);

			String Total = request.getParameter("Total" + i);
			goodsReceived.setTotal(Double.parseDouble(Total));

			//String billNo = request.getParameter("billNo");
			goodsReceived.setBillNo(billNo);

			String contactPerson = request.getParameter("contactPerson");
			if (!"".equals(contactPerson)) {
				goodsReceived.setContactPerson(contactPerson);
			} else {
				goodsReceived.setContactPerson("NA");
			}

			String vat = request.getParameter("vat" + i);
			Double gst = Double.parseDouble(vat);
			Double mainGst = gst;
			System.out.println("VAt is " + mainGst);
			if (vat == null) {
				goodsReceived.setVat(0.0);
			} else {
				goodsReceived.setVat(mainGst);
			}

			String igst = request.getParameter("igst" + i);
			System.out.println("igst is " + igst);
			if (igst == null) {
				goodsReceived.setIgst(0.0);
			} else {
				goodsReceived.setIgst(Double.parseDouble(igst));
			}

			String gstamt = request.getParameter("gstamt" + i);
			System.out.println("gstamt is " + gstamt);
			if (gstamt == null) {
				goodsReceived.setTaxAmount(0.0);
			} else {
				goodsReceived.setTaxAmount(Double.parseDouble(gstamt));
			}

			String extraDiscount = request.getParameter("extraDiscount");
			goodsReceived.setExtraDiscount(Double.parseDouble(extraDiscount));

			String expence = request.getParameter("expence");
			goodsReceived.setExpence(Double.parseDouble(expence));

			//String resolution = request.getParameter("resolution");
			goodsReceived.setGrossTotal(Double.parseDouble(resolution));

			//String supplierId = request.getParameter("supplierId");
			goodsReceived.setSupplierName(Long.parseLong(supplierId));

			//String pDate = request.getParameter("pDate");
			//SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			
			String supcode = request.getParameter("supcode");
			goodsReceived.setSupCode(supcode);

			/*goodsReceived.setPendingBillPayment(Double.parseDouble(resolution));
			Double lastBillPending = dao.getPendingBillPayment(supplierId);
			Double totalBillpending = (Double.parseDouble(resolution) + lastBillPending);*/
			
			/*Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{
					lastBillPending = Double.parseDouble(object[1].toString());
					System.out.println("ln 625 LAST BILL PENDING ==============> "+object[1].toString());
				}
			}
			Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);*/
			
			Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId, shopId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{
					System.out.println("ln 675 LAST BILL PENDING ==============> "+object[1].toString());
					lastBillPending = Double.parseDouble(object[1].toString());
					System.out.println("ln 677 LAST BILL PENDING ==============> "+object[1].toString());
				}
			}
			Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);			
			
			/*Double lastBillPending = dao.getPendingBillPayment(supplierId);
			Double totalBillpending = (Double.parseDouble(Total) + lastBillPending);*/

			double discontTotal = Double.parseDouble(Total);
			double data1 = Double.parseDouble(quantity);

			double discontValue = (discontTotal / data1);

			long data5 = (long) discontValue;
			System.out.println("print BuyPrice ::  " + data5);
			String data6 = String.valueOf(data5);
			String xyz = "";
			String adc = "";
			String[] Shreemant;
			if (actualprice.equals("0.0")) {
				Shreemant = data6.split("");
			} else {
				Shreemant = actualprice.split("");
			}
			for (int a = 0; a < Shreemant.length; a++) {
				System.out.println("shreemant :: " + Shreemant[a]);
				String abc = Shreemant[a];
				if (abc.equals("1")) {
					adc = "N";
				}
				if (abc.equals("2")) {
					adc = "A";
				}
				if (abc.equals("3")) {
					adc = "G";
				}
				if (abc.equals("4")) {
					adc = "P";
				}
				if (abc.equals("5")) {
					adc = "U";
				}
				if (abc.equals("6")) {
					adc = "R";
				}
				if (abc.equals("7")) {
					adc = "C";
				}
				if (abc.equals("8")) {
					adc = "I";
				}
				if (abc.equals("9")) {
					adc = "T";
				}
				if (abc.equals("0")) {
					adc = "Y";
				}
				xyz = xyz.concat(adc);
			}

			/*Date adate = null;
			try {
				adate = format.parse(pDate);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}*/
			goodsReceived.setDate(adate);
			goodsReceived.setPaymentDueDate(payDueDate);

			session3.setAttribute("barcodeNo", barcodeNo);

			if (barcodeNo == null) {
				goodsReceived.setBarcodeNo(1000l);
			} else {
				goodsReceived.setBarcodeNo(barcodeNo);
			}
			
			goodsReceived.setReturnQuantity(0);
			
			String sPWithoutTax = request.getParameter("sPWithoutTax"+i);
			goodsReceived.setSpWithoutTax(Double.parseDouble(sPWithoutTax));			

			goodsReceived.setDisPerForBill(0.0);
			
			String style = request.getParameter("style"+i);			
			if(style == null || style.equalsIgnoreCase("") || style.isEmpty())
			{
				goodsReceived.setStyle("N/A");
			}
			else
			{
				goodsReceived.setStyle(style);
			}
			
			goodsReceived.setSoldQuantity(0d);
			
			goodsReceived.setPurchaseEntryDate(purchaseEntryDate);
			
			//Registering for Good Receive 
			dao.regGoodReceive(goodsReceived);
			
			//Updating supplier pendingTotalAmount
			dao.setPendingBillPaymentToSupp(totalBillpending, supplierId, shopId);
			
			//Updating AdvanceBooking
			if(Long.parseLong(bookingNoAB) > 0)
			{
				System.out.println("Long.parseLong(bookingNoAB) > 0 "+bookingNoAB);
				AdvanceBookingDao advancebooking = new AdvanceBookingDao();
				advancebooking.updateAdvanceBooking(bookingNoAB, billNo);
			}
			
			StockDao dao1 = new StockDao();
			List stkList2 = dao1.getAllStockEntry();
			System.out.println("stkList2.size() ===========> "+stkList2.size());
			double quant = Double.parseDouble(quantity);

			if (stkList2.size() == 0)
			{
				Stock newEntry = new Stock();

				newEntry.setItemName(itemName);
				newEntry.setQuantity(Double.parseDouble(quantity));
				newEntry.setCatName(catName);
				newEntry.setFkCategoryId(Long.parseLong(categoryId));
				newEntry.setFkProductId(Long.parseLong(productId));;
				newEntry.setFkShopId(Long.parseLong(shopId));
				
				StockDao dao2 = new StockDao();
				dao2.registerStock(newEntry);
			}
			else/* To Update Stock Table If It is Not Empty */
			{
				for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long PkItemId = st.getPkStockId();
					Long fkProductId = st.getFkProductId();
					Long fkCategoryId = st.getFkCategoryId();
					Long fkShopId = st.getFkShopId();
					
					/* If ItemName Is Already Exists In Stock Table */
				//	if (ItemId.equals(itemName) && cat.equals(catName)) {
					if ((Long.parseLong(productId) == fkProductId)  && (Long.parseLong(categoryId) == fkCategoryId) && (Long.parseLong(shopId) == fkShopId))
					{	
						System.out.println("<============== UPDATE STOCK =============>");
						
						Double qunty = st.getQuantity();

						Double updatequnty = (Double) (qunty + Double.parseDouble(quantity));

						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();

						DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
						Date date = new Date();

						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);

						session.saveOrUpdate(updateStock);
						transaction.commit();
						break;
					}
					else
					{
						/* ItemName is Not Exists */
						if (j + 1 == stkList2.size())
						{
							System.out.println("<============== NEW STOCK ENTRY =============>");
							Stock newEntry = new Stock();

							newEntry.setItemName(itemName);
							newEntry.setQuantity(Double.parseDouble(quantity));
							newEntry.setCatName(catName);
							newEntry.setFkCategoryId(Long.parseLong(categoryId));
							newEntry.setFkProductId(Long.parseLong(productId));
							newEntry.setFkShopId(Long.parseLong(shopId));

							StockDao dao2 = new StockDao();
							dao2.registerStock(newEntry);
						}
					}
				}
			}
			
			//Barcode Wise Stock Entry
			BarcodeNumberWiseStockDetailsHibernate newEntry = new BarcodeNumberWiseStockDetailsHibernate();
			
			if (!"".equals(productId)) {
				newEntry.setFkProductId(Long.parseLong(productId));
			} else {
				newEntry.setFkProductId(0l);
			}
			if (!"".equals(itemName)) {
				newEntry.setItemName(itemName);
			} else {
				newEntry.setItemName("N/A");
			}
			if (!"".equals(categoryId)) {
				newEntry.setFkCategoryId(Long.parseLong(categoryId));
			} else {
				newEntry.setFkCategoryId(0l);
			}
			if (!"".equals(catName)) {
				newEntry.setCatName(catName);
			} else {
				newEntry.setCatName("N/A");
			}
			if (!"".equals(subCatId)) {
				newEntry.setFkSubCategoryId(Long.parseLong(subCatId));
			} else {
				newEntry.setFkSubCategoryId(0l);
			}
			if (!"".equals(subCatId)) {
				newEntry.setSubCategoryName(subCatName);
			} else {
				newEntry.setSubCategoryName("N/A");
			}
			if (barcodeNo == null) {
				newEntry.setBarcodeNo("1000l");
			} else {
				newEntry.setBarcodeNo(barcodeNo.toString());
			}
			if (!"".equals(quantity)) {
				newEntry.setBarcodeNumberWiseStockQuantity(Double.parseDouble(quantity));
			} else {
				newEntry.setBarcodeNumberWiseStockQuantity(0d);
			}
			if (!"".equals(quantity)) {
				newEntry.setOriginalQuantity(Double.parseDouble(quantity));
			} else {
				newEntry.setOriginalQuantity(0d);
			}
			if (!"".equals(buyPrice)) {
				newEntry.setBuyPrice(Double.parseDouble(buyPrice));
			} else {
				newEntry.setBuyPrice(0d);
			}
			if (!"".equals(actualprice)) {
				newEntry.setSalePrice(Double.parseDouble(actualprice));
			} else {
				newEntry.setSalePrice(0d);
			}
			if (!"".equals(shopId)) {
				newEntry.setFkShopId(Long.parseLong(shopId));
			} else {
				newEntry.setFkShopId(0l);
			}
			
			DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			Date date = new Date();
			newEntry.setUpdateDate(date);
			
			StockDao dao3 = new StockDao();
			dao3.saveBarcodeNumberWiseStockDetails(newEntry);
			
		}
		/*SupplierPaymentBean bean = new SupplierPaymentBean();
		bean.setBillNo(billNo);
		bean.setSupplier(Long.parseLong(supplierId));
		bean.setBalance(Double.parseDouble(resolution));
		bean.setTotalAmount(Double.parseDouble(resolution));
		bean.setPaymentType("credit");
		bean.setPaymentMode("cash");
		bean.setInsertDate(adate);
		bean.setPersonname("N/A");
		bean.setCredit(0.00);
		SupplierPaymentDao daov = new SupplierPaymentDao();
		daov.regSupPayment(bean);*/
	
	}
	/* } */
	
	public void updatePurchaseReturnHelper(HttpServletRequest request, HttpServletResponse response)
	{	
		System.out.println("UPDATE GOOD RECEIVE HELPER");
		
		GoodReciveDao dao = new GoodReciveDao();
		
		// TODO Auto-generated method stub

		Integer count = Integer.parseInt(request.getParameter("count"));
		String billNo = request.getParameter("billNo");			
		String supplierId = request.getParameter("supplierId");
		String pEDate = request.getParameter("pEDate");
		String editGrossTotal = request.getParameter("editGrossTotal");
		String pendingBillpaymentHidden = request.getParameter("pendingBillpaymentHidden");
		String grossTotalDiff = request.getParameter("grossTotalDiff");
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Double spWtax = 0.0;
		Date adate = null;
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			
			adate = format.parse(pEDate);
		
		System.out.println("c111111" + count);		
		
		for (int i = 0; i < count; i++)
		{			
			String PkGoodRecId = request.getParameter("PkGoodRecId" + i);
			GoodReceive goodsReceived = (GoodReceive) session.get(GoodReceive.class, Long.parseLong(PkGoodRecId));
			
			goodsReceived.setDate(adate);
			
			String barcodeNo = request.getParameter("barcodeNo" + i);
			goodsReceived.setBarcodeNo(Long.parseLong(barcodeNo));
			
			String shopId = request.getParameter("shopId" + i);
			
			String hsnsacno = request.getParameter("hsnSac" + i);
			goodsReceived.setHsnsacno(hsnsacno);
			
			String color = request.getParameter("color" + i);
			System.out.println("Color is :++++++++++++" + color);
			goodsReceived.setColor(color);

			String size = request.getParameter("size" + i);
			System.out.println("Size is :++++++++++++" + size);
			goodsReceived.setSize(size);		
			
			String rollSize = request.getParameter("rollsize" + i);
			if (!"".equals(rollSize) || rollSize != null)
			{
				System.out.println("rollSize ==> "+rollSize);
				goodsReceived.setRollSize(Double.parseDouble(rollSize));
			}
			else if(rollSize == null || rollSize.equalsIgnoreCase("0"))
			{
				goodsReceived.setRollSize(0.0);
			}
			
			String style = request.getParameter("style"+i);		
			System.out.println("style is :++++++++++++" + style);
			if(style == null || style.equalsIgnoreCase("") || style.isEmpty())
			{
				goodsReceived.setStyle("N/A");
			}
			else
			{
				goodsReceived.setStyle(style);
			}

			double rollSize1 = Double.parseDouble(rollSize);
			Double oriQuantity = Double.parseDouble(request.getParameter("oriQuantity" + i));
			Double quantity = Double.parseDouble(request.getParameter("quantity" + i));
			Double returnedQty = Double.parseDouble(request.getParameter("returnedQty" + i));
			Double soldQty = Double.parseDouble(request.getParameter("soldQty" + i));
			Double availquantity = Double.parseDouble(request.getParameter("availquantity" + i));			
			
			System.out.println("count = "+i+" oriQuantity = "+oriQuantity+" quantity = "+quantity);						
			
			if(oriQuantity == quantity)
			{System.out.println("QUANTITY IS SAME");}
			else if((oriQuantity > quantity) || (oriQuantity < quantity))
			{	
				if(size.equalsIgnoreCase("meter") || size.equalsIgnoreCase("mtr"))
				{
					double totalMtr = quantity * rollSize1;
					double afterSoldAndReturnedQty = (totalMtr - (soldQty + (returnedQty*rollSize1)));
					double updatedFabricQty = (afterSoldAndReturnedQty/rollSize1);
					goodsReceived.setQuantity(updatedFabricQty);
					goodsReceived.setOringnalQuantity(quantity - returnedQty);
					goodsReceived.setBarcodeQty(new Double(quantity).longValue());
				}
				else
				{
					System.out.println("count = "+i+" oriQuantity = "+oriQuantity+" quantity = "+quantity);
					Double updateAvlQty = (quantity-(soldQty + returnedQty));
					goodsReceived.setQuantity(updateAvlQty);
					goodsReceived.setOringnalQuantity(quantity - returnedQty);
					goodsReceived.setBarcodeQty(new Double(quantity).longValue());
					System.out.println("GOOD RECEIVE QUANTITY ======> "+updateAvlQty);
					
					System.out.println("quantity => "+updateAvlQty);
					System.out.println("oriQuantity => "+(quantity-returnedQty));
					System.out.println("barQuantity => "+quantity);
				}
			}		

			String buyPrice = request.getParameter("buyPrice" + i);
			goodsReceived.setBuyPrice(Double.parseDouble(buyPrice));
			
			String salePrice = request.getParameter("salePrice" + i);
			goodsReceived.setSalePrice(Double.parseDouble(salePrice));
			System.out.println(salePrice);

			String purchaseCode = request.getParameter("purchaseCode" + i);
			System.out.println(purchaseCode);
			goodsReceived.setPurcode(purchaseCode);
			
			String discount = request.getParameter("discount"+i);
			goodsReceived.setDiscount(Double.parseDouble(discount));			

			String vat = request.getParameter("vat"+i);
			goodsReceived.setVat(Double.parseDouble(vat));	
			
			String igst = request.getParameter("igst"+i);
			goodsReceived.setIgst(Double.parseDouble(igst));
			
			if(Double.parseDouble(vat) > 0)
			{
				if(Double.parseDouble(salePrice) > 0)
				{
					spWtax = ((Double.parseDouble(salePrice))/(1+(Double.parseDouble(vat)/100)));
				}
				else
				{
					spWtax = Double.parseDouble(salePrice);						
				}
			}
			else if(Double.parseDouble(igst) > 0)
			{
				if(Double.parseDouble(salePrice) > 0)
				{
					spWtax = ((Double.parseDouble(salePrice))/(1+(Double.parseDouble(igst)/100)));
				}
				else
				{
					spWtax = Double.parseDouble(salePrice);						
				}
			}
			else
			{
				spWtax = Double.parseDouble(salePrice);	
			}
			
			goodsReceived.setSpWithoutTax(spWtax);
			
			String Total = request.getParameter("total" + i);
			System.out.println("Total ====> "+Total);
			goodsReceived.setTotal(Double.parseDouble(Total));
			
			String subCatId = request.getParameter("subCatId" + i);
			goodsReceived.setSubCatId(Long.parseLong(subCatId));
			
			String productId = request.getParameter("productId" + i);
			goodsReceived.setFkProductId(Long.parseLong(productId));
			
			String categoryId = request.getParameter("catId" + i);
			goodsReceived.setFkCatId(Long.parseLong(categoryId));

			//String billNo = request.getParameter("billNo");
			goodsReceived.setBillNo(billNo);
			
			String contactPerson = request.getParameter("contactPerson");
			if (!"".equals(contactPerson))
			{
				goodsReceived.setContactPerson(contactPerson);
			}
			else
			{
				goodsReceived.setContactPerson("NA");
			}

			String taxAmount = request.getParameter("taxAmount" + i);
			goodsReceived.setTaxAmount(Double.parseDouble(taxAmount));

			goodsReceived.setSupplierName(Long.parseLong(supplierId));
			
			String supcode = request.getParameter("supcode");
			supcode = "";
			System.out.println("this is supplier code"+supcode);
			goodsReceived.setSupCode(supcode);
			
			System.out.println("editGrossTotal ===> "+editGrossTotal);
			goodsReceived.setGrossTotal(Double.parseDouble(editGrossTotal));
			
/*
			goodsReceived.setPendingBillPayment(Double.parseDouble(pendingBillpaymentHidden));
			
			Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{
					lastBillPending = Double.parseDouble(object[1].toString());
				}
			}		
*/
			dao.updateGoodReceive(goodsReceived);
			dao.setPendingBillPaymentToSupp(Double.parseDouble(pendingBillpaymentHidden), supplierId, shopId);
			
			//Update Barcode Number Wise Stock
			Long barcodeNoLong = Long.parseLong(barcodeNo);
			Double quantityDouble = quantity; //Double.parseDouble(quantity);
			Long shopIdLong = Long.parseLong(shopId);
			Double buyPriceDouble = Double.parseDouble(buyPrice);
			Double salePriceDouble = Double.parseDouble(salePrice);
			dao.updateBarcodeNoWiseStockEditPurchase(barcodeNoLong, quantityDouble, buyPriceDouble, salePriceDouble, shopIdLong);
			
			
			//GETTING TOTAL UPDATED QUANTITY FROM GOOD RECEIVE TO UPDATE IN STOCK
			StockDao dao1 = new StockDao();
			
			Double totalStock = 0.0;
			List <Object[]> totalStockAftPEdit = dao1.getTotalQuantityByCatIdAndProductId(categoryId, productId, shopId);
			for (Object[] object : totalStockAftPEdit)
			{
				if(object[1] == null)
				{
					totalStock = 0.0;
				}
				else
				{
					totalStock = Double.parseDouble(object[1].toString());
				}
			}
			
			//UPDATE TOTAL STOCK
/*			dao1.updateTotalQuantityInStock(categoryId, productId, totalStock);    */
			
			List stkList2 = dao1.getAllStockEntry();
			System.out.println("stkList2.size() ===========> "+stkList2.size());

			for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					Long PkItemId = st.getPkStockId();
					Long fkProductId = st.getFkProductId();
					Long fkCategoryId = st.getFkCategoryId();
					Long fkShopId = st.getFkShopId();
					
					if((Long.parseLong(productId) == fkProductId)  && (Long.parseLong(categoryId) == fkCategoryId) && (fkShopId == Long.parseLong(shopId)))
					{	
						System.out.println("<============== UPDATE STOCK =============>");
						
						Double updatequnty = totalStock;
						System.out.println("totalStock ====> "+totalStock);

						HibernateUtility hbu2 = HibernateUtility.getInstance();
						Session session2 = hbu2.getHibernateSession();
						Transaction transaction2 = session.beginTransaction();

						DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
						Date date = new Date();

						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemId));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);

						session2.saveOrUpdate(updateStock);
						transaction2.commit();
						break;
					}
				}
			//UPDATE SUPPLIER PAYMENT
			
			Double suppTotalAmt = 0.0;
			List <Object[]> totalAmtList = dao.getTotalAmountBySupp(supplierId, shopId);
			for (Object[] object : totalAmtList)
			{
				if(object[1] == null)
				{
					suppTotalAmt = 0.0;
				}
				else
				{
					suppTotalAmt = Double.parseDouble(object[1].toString());
				}
			}
			
			if(i == (count - 1))
			{
				if((Double.parseDouble(grossTotalDiff) == 0d))
				{
					System.out.println("grossTotalDiff ===>   (Double.parseDouble(grossTotalDiff)) == 0d   "+grossTotalDiff);
				}
				else if((Double.parseDouble(grossTotalDiff)) != 0d)
				{
					System.out.println("grossTotalDiff ===>   (Double.parseDouble(grossTotalDiff)) != 0d   "+grossTotalDiff);
					SupplierPaymentBean bean = new SupplierPaymentBean();
					bean.setBillNo(billNo);
					bean.setSupplier(Long.parseLong(supplierId));
					bean.setPaymentType("N/A");
					//bean.setPaymentMode("cash");
					bean.setInsertDate(adate);
					bean.setPersonname("N/A");
					bean.setCredit(0.00);
					bean.setDescription("PURCHASE EDITED");
					bean.setTotalAmount(suppTotalAmt);
					bean.setFkShopId(Long.parseLong(shopId));
					bean.setBalance(Double.parseDouble(pendingBillpaymentHidden));
					SupplierPaymentDao daov = new SupplierPaymentDao();
					daov.regSupPayment(bean);
				}
			}
		}
	}	catch (Exception e)
	{
		// TODO: handle exception
		System.out.println("UPDATE GOOD RECEIVE EXCEPTION ");
		e.printStackTrace();
	}
}
	
	// get all purchase bill no
	public List getBillNo(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		GoodReciveDao dao = new GoodReciveDao();
		return dao.getBillNo(shopId);
	}

	// get Previous Good Receive Detail
	public List getPreGoodReceive(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String BillNo = "";
		GoodReciveDao data = new GoodReciveDao();
		List stkList = data.getLastBarcodeNo();

		for (int j = 0; j < stkList.size(); j++) {

			GoodreciveBillBean st = (GoodreciveBillBean) stkList.get(j);
			BillNo = st.getBillNo();

		}

		Map<Long, PreviousGoodReceive> map = new HashMap<Long, PreviousGoodReceive>();

		GoodReciveDao dao = new GoodReciveDao();
		System.out.println("BILL NO ::: " + BillNo);
		List<PreviousGoodReceive> exp1List = dao.getPreGoodReceive(BillNo);
		return exp1List;
	}

	// get all main barcode no
	public List getAllMainBarcodeNo() {
		GoodReciveDao dao = new GoodReciveDao();
		return dao.getAllMainBarcodeNo();
	}

	// print barcode
	public void printBarcode(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String barcodeId = request.getParameter("barcodeId");
		System.out.println("barcode No is***************************" + barcodeId);
		String quantity = request.getParameter("quantity");
		long bar = Long.parseLong(barcodeId);
		System.out.println("id is++++++++++++++++++++++++++++++++++++" + bar);

		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session1 = hbu.getHibernateSession();
		/*org.hibernate.Query query = session1.createQuery("from GoodReceive where barcodeNo=:bar");
		query.setParameter("bar", bar);*/
		
		String itemName = "";
		String subCatName = "";
		String salePrice = "";
		String style = "";
		String size = "";
		String barcode = "";
		
		Query query2 = session1.createSQLQuery("select gr.ItemName, sb.subcat_name, gr.SalePrice, gr.style, gr.size, gr.BarcodeNo from goodreceive gr join sub_categories sb on gr.fkSubCatId=sb.pk_subcat_id where gr.BarcodeNo = "+bar);
		List<Object[]> list = null;
		list = query2.list();
		for (Object[] objects : list)
		{
			itemName = objects[0].toString();
			subCatName = objects[1].toString();
			salePrice = objects[2].toString();
			if(objects[3] == null)
			{
				System.out.println("N/A");
			}
			else
			{
				style = objects[3].toString();
			}
			size = objects[4].toString();
			barcode = objects[5].toString();
		}

		/*GoodReceive uniqueResult = (GoodReceive) query.uniqueResult();
		String itemName = uniqueResult.getItemName();
		System.out.println("hi this is vikas" + itemName);
		String catName = uniqueResult.getCatName();
		System.out.println("category" + catName);
		Double buyPrice = uniqueResult.getBuyPrice();
		System.out.println("name" + buyPrice);
		Double actualprice = uniqueResult.getSalePrice();
		System.out.println("aPrice" + actualprice);
		String size = uniqueResult.getSize();
		System.out.println(" " + size);
		String purcode = uniqueResult.getPurcode();
		System.out.println(" "+purcode);
		
		String supcode = uniqueResult.getSupCode();
		System.out.println(" "+supcode);*/

		String data6 = String.valueOf(salePrice);
		String xyz = "";
		String adc = "";
		String[] Shreemant = data6.split("");
		for (int a = 0; a < Shreemant.length; a++) {
			System.out.println("shreemant :: " + Shreemant[a]);
			String abc = Shreemant[a];
			if (abc.equals("1")) {
				adc = "N";
			}
			if (abc.equals("2")) {
				adc = "A";
			}
			if (abc.equals("3")) {
				adc = "G";
			}
			if (abc.equals("4")) {
				adc = "P";
			}
			if (abc.equals("5")) {
				adc = "U";
			}
			if (abc.equals("6")) {
				adc = "R";
			}
			if (abc.equals("7")) {
				adc = "C";
			}
			if (abc.equals("8")) {
				adc = "I";
			}
			if (abc.equals("9")) {
				adc = "T";
			}
			if (abc.equals("0")) {
				adc = "Y";
			}
			xyz = xyz.concat(adc);
		}

		try {
			FileInputStream fstream = new FileInputStream("C:/barcose/input.prn");

			BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
			FileWriter fw = new FileWriter("C:/barcose/Output.txt");

			BufferedWriter bw = new BufferedWriter(fw);
			String strLine;
			String str1;
			while ((strLine = br.readLine()) != null)
			{
				if (strLine.equals("@shopName")) {
					str1 = br.readLine();
					strLine = str1 + "\"Style me\"";
				}
				else if (strLine.equals("@product"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + itemName + "\"";
				}
				else if (strLine.equals("@quanti"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + quantity + "\"";
				}
				else if (strLine.equals("@catName"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + subCatName + "\"";
				}
				else if (strLine.equals("@subCatName"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + subCatName + "\"";
				}					
				else if (strLine.equals("@barv"))
				{
					str1 = br.readLine();
					//strLine = str1 + "\"" + "!105" + barcodeNo + "\"";
					strLine = str1 + "\"" + "!105" + barcodeId + "\"";
				}
				else if (strLine.equals("@bar"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + barcodeId + "\"";
				}
				else if (strLine.equals("@company"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + subCatName + "\"";
				}
				else if (strLine.equals("@total"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + xyz + "\"";
				}
				else if (strLine.equals("@quantityForNumberOfPrint"))
				{
					str1 = br.readLine();
					strLine = str1 + quantity;
				}
				else if (strLine.equals("@size"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + size + "\"";
				}
				else if (strLine.equals("@style"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + style + "\"";
				}					
				else if (strLine.equals("@saleprice"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" +""+salePrice + "\"";
				}
				/*if (strLine.equals("@product"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + itemName + "\"";
				}
				else if (strLine.equals("@quanti"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + itemName + "\"";
				}
				else if (strLine.equals("@catName"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + itemName + "\"";

				}
				else if (strLine.equals("@barv"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + "!105" + bar + "\"";

				}
				else if (strLine.equals("@bar"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + bar + "\"";

				}
				else if (strLine.equals("@company"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + subCatName + "\"";
				}
				else if (strLine.equals("@total"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + xyz + "\"";
				}
				else if (strLine.equals("@quantityForNumberOfPrint"))
				{
					str1 = br.readLine();
					strLine = str1 + quantity;
				}
				else if (strLine.equals("@size"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + size + "\"";
				}
				else if (strLine.equals("@saleprice"))
				{
					str1 = br.readLine();
					strLine = str1 + "\"" + "Rs " + salePrice + "\"";
				}*/
				
				System.out.println("xyz is " + xyz);
				System.out.println("catName is " + subCatName);
				System.out.println("Barcode is ++++++++++" + bar);
				System.out.println("itemName is *********" + itemName);
				System.out.println("Sale Price is //////" + salePrice);
				System.out.println("size is " + size);

				System.out.println(strLine);
				bw.write(strLine + "\r\n");
				}

			bw.close();
			// Close the input stream
			br.close();

			List cmdAndArgs = Arrays.asList("cmd", "/c", "printbatch.bat");
			File dir = new File("C:/barcose");

			ProcessBuilder pb = new ProcessBuilder(cmdAndArgs);
			pb.directory(dir);
			Process p = pb.start();
			/* } */
		} catch (Exception e) {

		}

	}

	// get Barcode Wise report
	public List BarcodeWiseReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String catName = request.getParameter("catName");
		Long barcodeId = Long.parseLong(catName);

		Map<Long, BarcodeReportBean> map = new HashMap<Long, BarcodeReportBean>();

		GoodReciveDao dao = new GoodReciveDao();
		List<BarcodeReportBean> exp1List = dao.BarcodeWiseReport(barcodeId);

		return exp1List;
	}

	// SupplierName Wise purchase report
	public List getsuppliernamewisepurchaseReport(String supplier)
	{
		Map<String, PurchaseReport> map = new HashMap<String, PurchaseReport>();
		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.suppliernamewiseAllPurchase(supplier);

		return exp1List;
	}

	// Purchase Report Category Wise
	public List categoryWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String catId = request.getParameter("catId");
		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.categoryWisePurchaseReport(catId);

		return exp1List;
	}

	// Purchase Report Supplier Bill No Wise
	public List supplierBillWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		long supplier = Long.parseLong(request.getParameter("supplier"));
		String billNo = request.getParameter("billNo");
		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.supplierBillWisePurchaseReport(supplier, billNo);

		return exp1List;
	}
	
	public List voucherNumberWisePurchaseReportHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		long voucherNo = Long.parseLong(request.getParameter("voucherNo"));
		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.voucherNoWisePurchaseReportDao(voucherNo);

		return exp1List;
	}


	// Purchase Report Barcode No Wise
	public List barcodeWisePurchaseReport(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String barcodeNoOurchase = request.getParameter("barcodeNoOurchase");
		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.barcodeWisePurchaseReport(barcodeNoOurchase);

		return exp1List;
	}

	// Purchase Report Single Date
	public List singleDatePurchase45(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String fDate = request.getParameter("purDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		try {
			adate = format.parse(fDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.singleDatePurchase45(adate);

		return exp1List;
	}

	// Purchase Report Two Date
	public List twoDatePurchase45(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String pFisDate = request.getParameter("pFisDate");
		String pEndDate = request.getParameter("pEndDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;
		try {
			adate = format.parse(pFisDate);
			bdate = format.parse(pEndDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.twoDatePurchase45(adate, bdate);

		return exp1List;
	}

	// CA Purchase Report Two Date
	public List caReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String pFisDate = request.getParameter("fisDate1");
		String pEndDate = request.getParameter("endDate1");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;
		try {
			adate = format.parse(pFisDate);
			bdate = format.parse(pEndDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.caReportBetweenTwoDates(adate, bdate);

		return exp1List;
	}
	
	public void setOfferDiscountHelper(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		System.out.println("IN Helper setOfferDiscountHelper called");
		String disPercentage = request.getParameter("disPercentage");
		String fromBarC = request.getParameter("fromBarC");
		String toBarC = request.getParameter("toBarC");
		
		GoodReciveDao grd = new GoodReciveDao();
		grd.setOfferDiscountDao(disPercentage, fromBarC, toBarC, shopId);
	}
	
	public List paymentDueDateWiseHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String pddwFisDate = request.getParameter("pddwFisDate");
		String pddwEndDate = request.getParameter("pddwEndDate");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;
		try {
			adate = format.parse(pddwFisDate);
			bdate = format.parse(pddwEndDate);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		GoodReciveDao dao = new GoodReciveDao();
		List<PurchaseReport> exp1List = dao.paymentDueDateWiseDao(adate, bdate);

		return exp1List;
	}

	
	public List getsaleamount(HttpServletRequest request,HttpServletResponse response) 
	{
	    LocalDate todaydate = LocalDate.now();
	    //LocalDate frstday = todaydate.withDayOfMonth(1);
	    //LocalDate lstday = todaydate.withDayOfMonth(todaydate.lengthOfMonth());
	   // System.out.println(frstday+" & "+lstday);
	    
         Map<Long,GetCreditCustomerDetails> map = new HashMap<Long,GetCreditCustomerDetails>();
 		
         GoodReciveDao dao = new GoodReciveDao();
 		List<GetCreditCustomerDetails> stockList = dao.getsaleamt(todaydate, request);
 		
 		return stockList;
	
	}
	
	
	
	
	public List getmostSell(HttpServletRequest request,HttpServletResponse response) 
	{
	    LocalDate todaydate = LocalDate.now();
	    //LocalDate frstday = todaydate.withDayOfMonth(1);
	    //LocalDate lstday = todaydate.withDayOfMonth(todaydate.lengthOfMonth());
	   // System.out.println(frstday+" & "+lstday);
	    
         Map<Long,GetCreditCustomerDetails> map = new HashMap<Long,GetCreditCustomerDetails>();
 		
         GoodReciveDao dao = new GoodReciveDao();
 		List<GetCreditCustomerDetails> stockList = dao.getmostSell(todaydate, request);
 		
 		return stockList;
	
	}
	
	
	
	
	public List getsaleamount1(HttpServletRequest request,HttpServletResponse response) 
	{
	    LocalDate todaydate1 = LocalDate.now();
	    //LocalDate frstday = todaydate.withDayOfMonth(1);
	    //LocalDate lstday = todaydate.withDayOfMonth(todaydate.lengthOfMonth());
	   // System.out.println(frstday+" & "+lstday);
	    
         Map<Long,BillBean> map = new HashMap<Long,BillBean>();
 		
         GoodReciveDao dao = new GoodReciveDao();
 		List<BillBean> stockList = dao.getsaleamt1(todaydate1, request);
 		
 		return stockList;
	
	}

	
	public List getPurchaseAmount(HttpServletRequest request,HttpServletResponse response) 
	{
	    LocalDate todaydate1 = LocalDate.now();
	    //LocalDate frstday = todaydate.withDayOfMonth(1);
	    //LocalDate lstday = todaydate.withDayOfMonth(todaydate.lengthOfMonth());
	   // System.out.println(frstday+" & "+lstday);
	    
         Map<Long,BillBean> map = new HashMap<Long,BillBean>();
 		
         GoodReciveDao dao = new GoodReciveDao();
 		List<BillBean> stockList = dao.PurchaseAmount(todaydate1, request);
 		
 		return stockList;
	
	}
	
	
	public List getyestAmount(HttpServletRequest request,HttpServletResponse response) 
	{
		
		
		LocalDate today = LocalDate.now();
		LocalDate yesterday = today.minusDays(1);
		
		//Instant now = Instant.now();
		//Instant yesterday = now.minus(1, ChronoUnit.DAYS);
		System.out.println(LocalDate.now());
		System.out.println(yesterday);
         Map<Long,GetCreditCustomerDetails> map = new HashMap<Long,GetCreditCustomerDetails>();
 		
         GoodReciveDao dao = new GoodReciveDao();
 		List<GetCreditCustomerDetails> stockList = dao.getyestsaleamt(yesterday, request);
 		
 		return stockList;
	
	}
	
	public List getyestAmount1(HttpServletRequest request,HttpServletResponse response) 
	{
		
		
		LocalDate today = LocalDate.now();
		LocalDate yesterday = today.minusDays(1);
		
		//Instant now = Instant.now();
		//Instant yesterday = now.minus(1, ChronoUnit.DAYS);
		System.out.println(LocalDate.now());
		System.out.println(yesterday);
         Map<Long,GetCreditCustomerDetails> map = new HashMap<Long,GetCreditCustomerDetails>();
 		
         GoodReciveDao dao = new GoodReciveDao();
 		List<GetCreditCustomerDetails> stockList = dao.getyestsaleamt1(yesterday, request);
 		
 		return stockList;
	
	}
	
	
	public List getyestpurchaseAmount(HttpServletRequest request,HttpServletResponse response) 
	{
		
		
		LocalDate today = LocalDate.now();
		LocalDate yesterday = today.minusDays(1);
		
		//Instant now = Instant.now();
		//Instant yesterday = now.minus(1, ChronoUnit.DAYS);
		System.out.println(LocalDate.now());
		System.out.println(yesterday);
         Map<Long,GetCreditCustomerDetails> map = new HashMap<Long,GetCreditCustomerDetails>();
 		
         GoodReciveDao dao = new GoodReciveDao();
 		List<GetCreditCustomerDetails> stockList = dao.getyestsaleamt2(yesterday, request);
 		
 		return stockList;
	
	}
	
	
	
	public List getlowStock(HttpServletRequest request,HttpServletResponse response) 
	{
	    LocalDate todaydate1 = LocalDate.now();
	    //LocalDate frstday = todaydate.withDayOfMonth(1);
	    //LocalDate lstday = todaydate.withDayOfMonth(todaydate.lengthOfMonth());
	   // System.out.println(frstday+" & "+lstday);
	    
         Map<Long,currentStock> map = new HashMap<Long,currentStock>();
 		
         GoodReciveDao dao = new GoodReciveDao();
 		List<currentStock> stockList = dao.getslowstock(todaydate1, request);
 		
 		return stockList;
	
	}
	
	//Edit Purchase/Good Receive Module Code
	
	public void editGoodReceiveDetails(HttpServletRequest request, HttpServletResponse response)
	{		
		Long barcodeNo = 1000l;
		//Long voucherNo = 1l;

		System.out.println("GOOD RECEIVE HELPER");
		
		HttpSession sessionToDeleteRecord = request.getSession();
		String shopIdSession = (String) sessionToDeleteRecord.getAttribute("shopId");
		
		System.out.println("In Helper Govind");
		Integer count = Integer.parseInt(request.getParameter("count"));
		Long voucherNo = Long.parseLong(request.getParameter("voucherNo"));
		
		GoodReciveDao dao = new GoodReciveDao();
		GoodReciveDao data = new GoodReciveDao();
		
		System.out.println("Remove Purchases Bill Items Quantity from Stock by voucherNo:- "+voucherNo);
		dao.removeOddPurchaseQTYFromStockAfterEditPurchaseBillByVoucherNo(voucherNo, shopIdSession);
		System.out.println("before delete voucherNo:- "+voucherNo);
		dao.deletePurchaseBillRecordFromGoodreceiveByVoucherNo(voucherNo, shopIdSession);

		GoodReceive goodsReceived = new GoodReceive();
		
		
		
		String bookingNoAB = "";

		
		String billNo = request.getParameter("billNo");
		String supplierId = request.getParameter("supplierId");
		String supName = request.getParameter("supName");
		String supCode = request.getParameter("supCode");
		String contactPerson = request.getParameter("contactPerson");
		String transaportExpense = request.getParameter("transaportExpense");
		String labourExpense = request.getParameter("labourExpense");
		String extraDiscount = request.getParameter("extraDiscount");
		String expence = request.getParameter("expence");
		String resolution = request.getParameter("resolution");
		String Grosstotalwithoutexpese = request.getParameter("resolution1");
		String pDate = request.getParameter("pDate");
		String purchaseDueDate = request.getParameter("purchaseDueDate");
		System.out.println("this is purchaseDueDate "+purchaseDueDate);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date purchaseEntryDate  = new Date();
		Date adate = null;
		Date payDueDate = null;
		try
		{
			adate = format.parse(pDate);
			if(purchaseDueDate == null || purchaseDueDate.isEmpty() || purchaseDueDate.equalsIgnoreCase(""))
			{}
			else
			{
				payDueDate = format.parse(purchaseDueDate);
			}
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		
		System.out.println("c111111" + count);		
	
		/*List vList = data.getLastVoucherNo();

		for (int i = 0; i < vList.size(); i++)
		{
			GoodreciveBillBean grbb = (GoodreciveBillBean) vList.get(i);
			voucherNo = grbb.getVoucherNo();
			voucherNo++;
		}*/
		
		for (int i = 0; i < count; i++)
		{
			HttpSession session3 = request.getSession();
			//GoodReciveDao data = new GoodReciveDao();
			List stkList = data.getLastBarcodeNo();

			for (int j = 0; j < stkList.size(); j++)
			{
				GoodreciveBillBean st = (GoodreciveBillBean) stkList.get(j);
				barcodeNo = st.getBarcodeNo();
				barcodeNo++;
			}

			goodsReceived.setVoucherNo(voucherNo);
			goodsReceived.setBillNo(billNo);
			goodsReceived.setSupplierName(Long.parseLong(supplierId));
			goodsReceived.setSupCode(supCode);
			if (!"".equals(contactPerson))
			{
				goodsReceived.setContactPerson(contactPerson);
			} else {
				goodsReceived.setContactPerson("NA");
			}
			goodsReceived.setDate(adate);
			goodsReceived.setPaymentDueDate(payDueDate);
			goodsReceived.setLabourExpense(Double.parseDouble(labourExpense));
			goodsReceived.setTransaportExpense(Double.parseDouble(transaportExpense));
			goodsReceived.setExtraDiscount(Double.parseDouble(extraDiscount));
			goodsReceived.setExpence(Double.parseDouble(expence));
			goodsReceived.setGrossTotal(Double.parseDouble(resolution));
			goodsReceived.setGrosstotalwithoutexpese(Double.parseDouble(Grosstotalwithoutexpese));
			
			
			
			//Get Grid Variables
			String fkShopId = request.getParameter("fkShopId" + i);
			String barcodeNoGrid = request.getParameter("barcodeNo" + i);
			String fkProductId = request.getParameter("fkProductId" + i);
			String itemName = request.getParameter("itemName" + i);
			String fkcategoryId = request.getParameter("fkcategoryId" + i);
			String categoryName = request.getParameter("categoryName" + i);
			String fksubCategoryId = request.getParameter("fksubCategoryId" + i);
			String subCategoryName = request.getParameter("subCategoryName" + i);
			bookingNoAB = request.getParameter("bookingNoAB" + i);
			String hsnSacno = request.getParameter("hsnSacno" + i);
			String color = request.getParameter("color" + i);
			String size = request.getParameter("size" + i);
			String rollSize = request.getParameter("rollSize" + i);
			String style = request.getParameter("style" + i);
			String originalQuantity = request.getParameter("originalQuantity" + i);
			String barQtyTotalPuchaseQty = request.getParameter("barQtyTotalPuchaseQty" + i);
			String returnQuantity = request.getParameter("returnQuantity" + i);
			String soldQuantity = request.getParameter("soldQuantity" + i);
			String availableQuantity = request.getParameter("availableQuantity" + i);
			String quantity = request.getParameter("quantity" + i);
			String buyPrice = request.getParameter("buyPrice" + i);
			String salePrice = request.getParameter("salePrice" + i);
			String discountPercent = request.getParameter("discountPercent" + i);
			String discountAmount = request.getParameter("discountAmount" + i);
			String gst = request.getParameter("gst" + i);
			String igst = request.getParameter("igst" + i);
			String sPWithoutTax = request.getParameter("sPWithoutTax" + i);
			String taxAmount = request.getParameter("taxAmount" + i);
			String purchaseCode = request.getParameter("purchaseCode" + i);
			String totalAmount = request.getParameter("totalAmount" + i);
			
			
			goodsReceived.setFkShopId(Long.parseLong(fkShopId));
			goodsReceived.setPurcode(purchaseCode);
			if("0".equals(barcodeNoGrid) || barcodeNoGrid == null || barcodeNoGrid == "" || barcodeNoGrid == " ") {
				goodsReceived.setBarcodeNo(barcodeNo);
				session3.setAttribute("barcodeNo", barcodeNo);
			} else {
				goodsReceived.setBarcodeNo(Long.parseLong(barcodeNoGrid));
				session3.setAttribute("barcodeNo", barcodeNoGrid);
			}
			goodsReceived.setFkProductId(Long.parseLong(fkProductId));
			goodsReceived.setItemName(itemName);
			goodsReceived.setFkCatId(Long.parseLong(fkcategoryId));
			goodsReceived.setCatName(categoryName);
			goodsReceived.setSubCatId(Long.parseLong(fksubCategoryId));
			if(subCategoryName == null || subCategoryName.equalsIgnoreCase(""))
			{
				subCategoryName = "";
			}
			if(bookingNoAB == null || bookingNoAB.equalsIgnoreCase("") || bookingNoAB.equalsIgnoreCase(" ") || bookingNoAB.equalsIgnoreCase("undefined"))
			{
				bookingNoAB = "0";
			}
			else
			{}
			goodsReceived.setBookingNo(Long.parseLong(bookingNoAB));
			goodsReceived.setHsnsacno(hsnSacno);
			goodsReceived.setColor(color);
			goodsReceived.setSize(size);
			if (!"".equals(rollSize) || rollSize != null)
			{
				System.out.println("rollSize ===> "+rollSize);
				goodsReceived.setRollSize(Double.parseDouble(rollSize));
			}
			else if(rollSize == null || rollSize.equalsIgnoreCase("0"))
			{
				goodsReceived.setRollSize(0.0);
			}
			if(style == null || style.equalsIgnoreCase("") || style.isEmpty())
			{
				goodsReceived.setStyle("N/A");
			} else {
				goodsReceived.setStyle(style);
			}
			goodsReceived.setOringnalQuantity(Double.parseDouble(quantity));
			goodsReceived.setBarcodeQty(Long.parseLong(quantity));
			goodsReceived.setReturnQuantity(Long.parseLong(returnQuantity));
			goodsReceived.setSoldQuantity(Double.parseDouble(soldQuantity));
			goodsReceived.setQuantity(Double.parseDouble(quantity));
			goodsReceived.setBuyPrice(Double.parseDouble(buyPrice));
			goodsReceived.setSpWithoutTax(Double.parseDouble(sPWithoutTax));
			goodsReceived.setSalePrice(Double.parseDouble(salePrice));
			goodsReceived.setDiscount(Double.parseDouble(discountPercent));
			
			if (gst == null) {
				goodsReceived.setVat(0.0);
			} else {
				goodsReceived.setVat(Double.parseDouble(gst));
			}
			if (igst == null) {
				goodsReceived.setIgst(0.0);
			} else {
				goodsReceived.setIgst(Double.parseDouble(igst));
			}
			if (taxAmount == null) {
				goodsReceived.setTaxAmount(0.0);
			} else {
				goodsReceived.setTaxAmount(Double.parseDouble(taxAmount));
			}
			goodsReceived.setTotal(Double.parseDouble(totalAmount));
			
			Double lastBillPending = 0.0;
			List <Object[]> billPendingList = dao.getPendingBillPayment(supplierId, fkShopId);
			for (Object[] object : billPendingList)
			{
				if(object[1] == null)
				{
					lastBillPending = 0.0;
				}
				else
				{				
					System.out.println("ln 220 LAST BILL PENDING ==============> "+object[1].toString());
					lastBillPending = Double.parseDouble(object[1].toString());
					System.out.println("ln 222 LAST BILL PENDING ==============> "+object[1].toString());
				}
			}
			Double totalBillpending = (Double.parseDouble(totalAmount) + lastBillPending);
			
			double discontTotal = Double.parseDouble(totalAmount);
			double data1 = Double.parseDouble(quantity);

			double discontValue = (discontTotal / data1);

			long data5 = (long) discontValue;
			System.out.println("print BuyPrice ::  " + data5);
			String data6 = String.valueOf(data5);
			String xyz = "";
			String adc = "";
			String[] Shreemant;
			if (salePrice.equals("0.0")) {
				Shreemant = data6.split("");
			} else {
				Shreemant = salePrice.split("");
			}
			for (int a = 0; a < Shreemant.length; a++) {
				System.out.println("shreemant :: " + Shreemant[a]);
				String abc = Shreemant[a];
				if (abc.equals("1")) {
					adc = "N";
				}
				if (abc.equals("2")) {
					adc = "A";
				}
				if (abc.equals("3")) {
					adc = "G";
				}
				if (abc.equals("4")) {
					adc = "P";
				}
				if (abc.equals("5")) {
					adc = "U";
				}
				if (abc.equals("6")) {
					adc = "R";
				}
				if (abc.equals("7")) {
					adc = "C";
				}
				if (abc.equals("8")) {
					adc = "I";
				}
				if (abc.equals("9")) {
					adc = "T";
				}
				if (abc.equals("0")) {
					adc = "Y";
				}
				xyz = xyz.concat(adc);
			}
			
			
			goodsReceived.setDisPerForBill(0.0);
			goodsReceived.setPurchaseEntryDate(purchaseEntryDate);
			
			//Registering Good Receive Details
			dao.regGoodReceive(goodsReceived);
			
			//Updating Supplier PendingTotalAmount
			dao.setPendingBillPaymentToSupp(totalBillpending, supplierId, fkShopId);
			
			//Updating AdvanceBooking
			if(Long.parseLong(bookingNoAB) > 0)
			{
				System.out.println("Long.parseLong(bookingNoAB) > 0 "+bookingNoAB);
				AdvanceBookingDao advancebooking = new AdvanceBookingDao();
				advancebooking.updateAdvanceBooking(bookingNoAB, billNo);
			}
			
			//Stock Code Start From Here
			StockDao dao1 = new StockDao();
			List stkList2 = dao1.getAllStockEntry();

			double quant = Double.parseDouble(quantity);

			try
			{
				FileInputStream fstream = new FileInputStream("C:/barcose/input.prn");

				BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
				FileWriter fw = new FileWriter("C:/barcose/Output" + i + ".txt");

				BufferedWriter bw = new BufferedWriter(fw);
				String strLine;
				String str1;
				while ((strLine = br.readLine()) != null)
				{
					if (strLine.equals("@shopName")) {
						str1 = br.readLine();
						strLine = str1 + "\"Style me\"";
					}
					else if (strLine.equals("@product"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + itemName + "\"";
					}
					else if (strLine.equals("@quanti"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + quantity + "\"";
					}
					else if (strLine.equals("@catName"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + categoryName + "\"";
					}
					else if (strLine.equals("@subCatName"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + subCategoryName + "\"";
					}					
					else if (strLine.equals("@barv"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + "!105" + barcodeNo + "\"";
					}
					else if (strLine.equals("@bar"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + barcodeNo + "\"";
					}
					else if (strLine.equals("@company"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + categoryName + "\"";
					}
					else if (strLine.equals("@total"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + xyz + "\"";
					}
					else if (strLine.equals("@quantityForNumberOfPrint"))
					{
						str1 = br.readLine();
						strLine = str1 + quantity;
					}
					else if (strLine.equals("@size"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + size + "\"";
					}
					else if (strLine.equals("@style"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + style + "\"";
					}					
					else if (strLine.equals("@saleprice"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" +""+salePrice + "\"";
					}
					//for purchase code
					else if (strLine.equals("@pcode"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + purchaseCode + "\"";//purcode
					}
					//for supplier code
					else if (strLine.equals("@scode"))
					{
						str1 = br.readLine();
						strLine = str1 + "\"" + supCode + "\"";//purcode
					}

					System.out.println(strLine);
					bw.write(strLine + "\r\n");
				}
				bw.close();
				// Close the input stream
				br.close();

				List cmdAndArgs = Arrays.asList("cmd", "/C", "printbatch" + i + ".bat");
				File dir = new File("C:/barcose");

				ProcessBuilder pb = new ProcessBuilder(cmdAndArgs);
				pb.directory(dir);
				Process p = pb.start();
			} catch (Exception e) {
				
			}
			// End Barcode code
			
			//Barcode Wise Stock Entry Code
			//If Stock Is Empty
			if (stkList2.size() == 0)
			{
				Stock newEntry = new Stock();

				newEntry.setItemName(itemName);
				newEntry.setQuantity(Double.parseDouble(quantity));
				newEntry.setCatName(categoryName);
				newEntry.setFkCategoryId(Long.parseLong(fkcategoryId));
				newEntry.setFkProductId(Long.parseLong(fkProductId));;
				newEntry.setFkShopId(Long.parseLong(fkShopId));
				StockDao dao2 = new StockDao();
				dao2.registerStock(newEntry);
			}
			else//To Update Stock Table If It is Not Empty
			{
				for (int j = 0; j < stkList2.size(); j++)
				{
					Stock st = (Stock) stkList2.get(j);
					String ItemId = st.getItemName();
					String cat = st.getCatName();
					Long PkItemIdDB = st.getPkStockId();
					Long fkProductIdDB = st.getFkProductId();
					Long fkCategoryIdDB = st.getFkCategoryId();
					Long fkShopIdDB = st.getFkShopId();
					
					//If ItemName Is Already Exists In Stock Table
					//if (ItemId.equals(itemName) && cat.equals(catName)) {
					if ((Long.parseLong(fkProductId) == fkProductIdDB)  && (Long.parseLong(fkcategoryId) == fkCategoryIdDB) && (Long.parseLong(fkShopId) == fkShopIdDB))
					{
						Double qunty = st.getQuantity();
						Double updatequnty = (Double) (qunty + Double.parseDouble(quantity));
						
						HibernateUtility hbu = HibernateUtility.getInstance();
						Session session = hbu.getHibernateSession();
						Transaction transaction = session.beginTransaction();

						DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
						Date date = new Date();

						Stock updateStock = (Stock) session.get(Stock.class, new Long(PkItemIdDB));
						updateStock.setUpdateDate(date);
						updateStock.setQuantity(updatequnty);

						session.saveOrUpdate(updateStock);
						transaction.commit();
						break;
					}
					else
					{
						//ItemName is Not Exists
						if (j + 1 == stkList2.size())
						{
							Stock newEntry = new Stock();

							//newEntry.setFkShopId(Long.parseLong(fkShopId));
							newEntry.setItemName(itemName);
							newEntry.setQuantity(Double.parseDouble(quantity));
							newEntry.setCatName(categoryName);
							newEntry.setFkCategoryId(Long.parseLong(fkcategoryId));
							newEntry.setFkProductId(Long.parseLong(fkProductId));
							newEntry.setFkShopId(Long.parseLong(fkShopId));

							StockDao dao2 = new StockDao();
							dao2.registerStock(newEntry);
						}
					}
				}
			}
			
			//saveBarcodeNumberWiseStockDetails
			if("0".equals(barcodeNoGrid) || barcodeNoGrid == null || barcodeNoGrid == "" || barcodeNoGrid == " ") {
				dao.deleteBarcodeNumberWiseStockRecordFromBarcodeNumberWiseStockDetailsTableByBarcodeNo(barcodeNo, shopIdSession);
			} else {
				Long barcodeNoGridLong = Long.parseLong(barcodeNoGrid);
				dao.deleteBarcodeNumberWiseStockRecordFromBarcodeNumberWiseStockDetailsTableByBarcodeNo(barcodeNoGridLong, shopIdSession);
			}
			
			//Barcode Number Wise Stock Details
			BarcodeNumberWiseStockDetailsHibernate newEntry = new BarcodeNumberWiseStockDetailsHibernate();
			
			if (!"".equals(fkProductId)) {
				newEntry.setFkProductId(Long.parseLong(fkProductId));
			} else {
				newEntry.setFkProductId(0l);
			}
			if (!"".equals(itemName)) {
				newEntry.setItemName(itemName);
			} else {
				newEntry.setItemName("N/A");
			}
			if (!"".equals(fkcategoryId)) {
				newEntry.setFkCategoryId(Long.parseLong(fkcategoryId));
			} else {
				newEntry.setFkCategoryId(0l);
			}
			if (!"".equals(categoryName)) {
				newEntry.setCatName(categoryName);
			} else {
				newEntry.setCatName("N/A");
			}
			if (!"".equals(fksubCategoryId)) {
				newEntry.setFkSubCategoryId(Long.parseLong(fksubCategoryId));
			} else {
				newEntry.setFkSubCategoryId(0l);
			}
			if (!"".equals(subCategoryName)) {
				newEntry.setSubCategoryName(subCategoryName);
			} else {
				newEntry.setSubCategoryName("N/A");
			}
			if("0".equals(barcodeNoGrid) || barcodeNoGrid == null || barcodeNoGrid == "" || barcodeNoGrid == " ") {
				newEntry.setBarcodeNo(barcodeNo.toString());
			} else {
				newEntry.setBarcodeNo(barcodeNoGrid.toString());
			}
			if (!"".equals(quantity)) {
				newEntry.setBarcodeNumberWiseStockQuantity(Double.parseDouble(quantity));
			} else {
				newEntry.setBarcodeNumberWiseStockQuantity(0d);
			}
			if (!"".equals(quantity)) {
				newEntry.setOriginalQuantity(Double.parseDouble(quantity));
			} else {
				newEntry.setOriginalQuantity(0d);
			}
			if (!"".equals(buyPrice)) {
				newEntry.setBuyPrice(Double.parseDouble(buyPrice));
			} else {
				newEntry.setBuyPrice(0d);
			}
			if (!"".equals(salePrice)) {
				newEntry.setSalePrice(Double.parseDouble(salePrice));
			} else {
				newEntry.setSalePrice(0d);
			}
			if (!"".equals(fkShopId)) {
				newEntry.setFkShopId(Long.parseLong(fkShopId));
			} else {
				newEntry.setFkShopId(0l);
			}
			
			DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			Date date = new Date();
			newEntry.setUpdateDate(date);
			
			StockDao dao3 = new StockDao();
			dao3.saveBarcodeNumberWiseStockDetails(newEntry);
		}
	}
	
}
