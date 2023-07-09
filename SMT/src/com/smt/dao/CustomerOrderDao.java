package com.smt.dao;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.BillBean;
import com.smt.bean.CategoryWisePurchase;
import com.smt.bean.CustomerBean;
import com.smt.bean.DayWiseSale;
import com.smt.bean.GetBill;
import com.smt.bean.GstReportBean;
import com.smt.bean.PurchaseReport;
import com.smt.bean.SaleReport;
import com.smt.bean.SaleReports;
import com.smt.bean.gstReturnbean;
import com.smt.hibernate.TempItemDetail;
import com.smt.utility.HibernateUtility;

public class CustomerOrderDao {

	public void registerBill(com.smt.hibernate.CustomerBill cust) {

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
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
	}

	public void updateTabaleStatus(Long pk_temp_id) {
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			TempItemDetail itemDetail = (TempItemDetail) session.get(TempItemDetail.class, new Long(pk_temp_id));
			itemDetail.setActiveYN('N');
			session.saveOrUpdate(itemDetail);
			transaction.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

	}

	public List getAllClosingReport() {
		java.util.Date date = new java.util.Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String data = (dateFormat.format(date)); // 2014/08/06 15:59:4
		HibernateUtility hbu = null;
		Session session = null;
		List<DayWiseSale> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select customerBill, item_name , quantity , price ,totalAmt,newTotalAmt from customer_order where is_insert_date=" + data);
			List<Object[]> list = query.list();
			saleList = new ArrayList<DayWiseSale>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));

				DayWiseSale reports = new DayWiseSale();
				reports.setCustomerBill(Long.parseLong(object[0].toString()));
				reports.setItemName(object[1].toString());
				BigDecimal qunt = (BigDecimal) object[2];
				reports.setQuantity((qunt));
				reports.setPrice(Double.parseDouble(object[3].toString()));

				reports.setTotAmount(Double.parseDouble(object[4].toString()));

				Double disTotal = (Double) object[5];
				if (disTotal == null) {

					reports.setDicountTotal(Double.parseDouble("0.0"));
				} else {
					reports.setDicountTotal(Double.parseDouble(object[5].toString()));
				}
				saleList.add(reports);
			}
		} catch (RuntimeException e) {
			Log.error("Error in getAllClosingReport()", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return saleList;
	}

	// get Data On CustomerBill Using Barcode No amd in TempData Table
	public List getAllItemDetails(String key, String carNo) {

		HibernateUtility hbu = null;
		Session session = null;
		List<CategoryWisePurchase> categoryBean = null;
		List<CustomerBean> itemlist = null;
		try {

			System.out.println("shreemant");
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			String sqlQuery = "SELECT ItemName , PkGoodRecId, CategoryName , BarcodeNo, hsnsacno, vat, igst FROM GoodReceive WHERE  quantity > 0 AND BarcodeNo =" + key;

			Query query = session.createSQLQuery(sqlQuery);

			List<Object[]> list = query.list();

			itemlist = new ArrayList<CustomerBean>(0);
			for (Object[] objects : list) {
				System.out.println(Arrays.toString(objects));
				CustomerBean bean = new CustomerBean();

				bean.setItemName(objects[0].toString());
				bean.setItem_id(Long.parseLong(objects[1].toString()));
				bean.setCategoryName(objects[2].toString());

				bean.setBarcodeNo(Long.parseLong(objects[3].toString()));
				bean.setHsnSacNo(objects[4].toString());
				bean.setQuantity(1l);
				bean.setSalePrice(0d);
				bean.setVat(Double.parseDouble(objects[5].toString()));
				bean.setIgst(Double.parseDouble(objects[6].toString()));
				bean.setTaxAmount(0d);

				itemlist.add(bean);

				String itemName = (objects[0].toString());
				Double salePrice = 0d;
				Long item_id = Long.parseLong(objects[1].toString());
				Long quantity = 1l;
				Long barcodeNo = Long.parseLong(objects[3].toString());
				String categoryName = (objects[2].toString());
				String hsnSacNo = (objects[4].toString());
				Double vat = Double.parseDouble(objects[5].toString());
				Double igst = Double.parseDouble(objects[6].toString());
				Double taxAmount = 0d;

				TempItemDetailDao data = new TempItemDetailDao();
				List stkList = data.getAllItemEntry();

				if (stkList.size() == 0) {

					com.smt.hibernate.TempItemDetail tid = new com.smt.hibernate.TempItemDetail();

					tid.setItemName(itemName);

					tid.setSalePrice(salePrice);

					tid.setItem_id(item_id);

					tid.setQuantity(quantity);

					tid.setBarcodeNo(barcodeNo);
					tid.setVat(vat);
					tid.setIgst(igst);
					tid.setTaxAmount(taxAmount);
					tid.setHsnSacNo(hsnSacNo);

					tid.setCategoryName(categoryName);

					tid.setActiveYN('Y');

					tid.setCarNo(carNo);

					DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
					Date dateobj = new Date();
					System.out.println(df.format(dateobj));

					tid.setCurrent_date(dateobj);

					TempItemDetailDao dao = new TempItemDetailDao();
					dao.regTempData(tid);

				} else {
					for (int i = 0; i < stkList.size(); i++) {

						TempItemDetail st = (TempItemDetail) stkList.get(i);
						Long barcodeNumber = st.getBarcodeNo();
						System.out.println(i + " == " + barcodeNumber);
						String carNumber = st.getCarNo();
						Long PkItemId = st.getPk_temp_id();

						if (barcodeNumber.equals(barcodeNo) && carNumber.equals(carNo)) {

							Long qunty = st.getQuantity();

							Long updatequnty = qunty + quantity;

							HibernateUtility hbu1 = HibernateUtility.getInstance();
							Session session1 = hbu1.getHibernateSession();
							Transaction transaction = session1.beginTransaction();

							TempItemDetail updateStock = (TempItemDetail) session1.get(TempItemDetail.class, new Long(PkItemId));

							updateStock.setQuantity(updatequnty);

							session1.saveOrUpdate(updateStock);
							transaction.commit();
							break;

						} else {
							if (i + 1 == stkList.size()) {

								TempItemDetail newEntry = new TempItemDetail();

								newEntry.setItemName(itemName);

								newEntry.setSalePrice(salePrice);

								newEntry.setItem_id(item_id);

								newEntry.setQuantity(quantity);

								newEntry.setBarcodeNo(barcodeNo);

								newEntry.setVat(vat);
								newEntry.setIgst(igst);
								newEntry.setTaxAmount(taxAmount);
								newEntry.setHsnSacNo(hsnSacNo);

								newEntry.setCategoryName(categoryName);

								newEntry.setActiveYN('Y');

								newEntry.setCarNo(carNo);

								DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
								Date dateobj = new Date();
								System.out.println(df.format(dateobj));

								newEntry.setCurrent_date(dateobj);

								TempItemDetailDao dao1 = new TempItemDetailDao();
								dao1.regTempData(newEntry);
							}
						}
					}
				}
			}
		} catch (RuntimeException e) {
			Log.error("Error in getAllItemDetails(String key)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return itemlist;

	}

	// car Bill No in regBill
	public List getLastBillNo() {
		HibernateUtility hbu = null;
		Session session = null;
		List<BillBean> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT BillNo, pkBillId FROM customerbill ORDER BY BillNo desc LIMIT 1");

			List<Object[]> list = query.list();
			saleList = new ArrayList<BillBean>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				BillBean reports = new BillBean();
				//reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setBillNo(object[0].toString());
				saleList.add(reports);
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

	public List getBillPrint() {
		HibernateUtility hbu = null;
		Session session = null;
		List<GetBill> billList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT customerBill , color FROM customer_order ORDER BY customerBill DESC LIMIT 1");
			List<Object[]> list = query.list();
			billList = new ArrayList<GetBill>(0);
			for (Object[] object : list) {
				GetBill reports = new GetBill();
				reports.setCustomerBill(Long.parseLong(object[0].toString()));
				billList.add(reports);
			}
		} catch (RuntimeException e) {
			Log.error("Error in getBillPrint()", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return billList;
	}

	public List getSaleDetailsDateWise(String startDate, String endDate) {

		HibernateUtility hbu = null;
		Session session = null;
		List<com.smt.bean.SaleReports> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select DATE(c.is_insert_date),c.quantity ,c.newTotalAmt,c.customerBill,c.card,c.cash from customer_order c left join offer_details o ON c.fk_offerrr_id=o.pk_itemoffer_id where c.is_insert_date BETWEEN :stDate AND :edDate AND (sale_return) IN ('No') ");
			query2.setParameter("stDate", startDate);
			query2.setParameter("edDate", endDate);
			List<Object[]> list = query2.list();
			saleList = new ArrayList<com.smt.bean.SaleReports>(0);

			for (Object[] object : list) {

				com.smt.bean.SaleReports reports = new com.smt.bean.SaleReports();

				reports.setSoldDate(object[0].toString());
				System.out.println(Arrays.toString(object));
				BigDecimal qunt = (BigDecimal) object[1];

				if (!"".equals(qunt)) {
					reports.setQuantity((qunt));
				} else {
					Double qq = 0.0;
					reports.setQuantity(BigDecimal.valueOf(qq));
				}

				reports.setTotalAmount(Double.parseDouble(object[2].toString()));
				reports.setCustomerBill(Integer.parseInt(object[3].toString()));

				Double card = (Double) object[4];

				if (card == null) {
					Double nullCard = 0.0;
					reports.setCardAmt(nullCard);

				} else {

					reports.setCardAmt(card);
				}

				Double cash = (Double) object[5];

				if (cash == null) {
					Double nullcash = 0.0;
					reports.setCashAmt(nullcash);

				} else {

					reports.setCashAmt(cash);
				}

				saleList.add(reports);
			}
		} catch (RuntimeException e) {
			Log.error("Error in getSaleDetailsDateWise(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return saleList;

	}

	public List getSaleDetailsYearly(String startDate, String endDate) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy");
		Date stsDAte = null;
		try {
			stsDAte = format.parse(startDate);
		} catch (ParseException e) {

			e.printStackTrace();
		}
		Date edDate = null;

		try {
			edDate = format.parse(endDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		HibernateUtility hbu = null;
		Session session = null;
		List<com.smt.bean.SaleReports> saleList = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select c.customerBill ,DATE(c.is_insert_date) , c.quantity , c.price , c.totalAmt , c.newTotalAmt from customer_order c where c.is_insert_date BETWEEN :stDate AND :edDate ");
			query2.setParameter("stDate", stsDAte);
			query2.setParameter("edDate", edDate);
			List<Object[]> list = query2.list();
			saleList = new ArrayList<com.smt.bean.SaleReports>(0);

			for (Object[] object : list) {
				System.out.println("result" + Arrays.toString(object));
				com.smt.bean.SaleReports reports = new com.smt.bean.SaleReports();
				reports.setCustomerBill(Integer.parseInt(object[0].toString()));
				reports.setSoldDate(object[1].toString());
				BigDecimal qunt = (BigDecimal) object[2];
				reports.setQuantity((qunt));
				reports.setSalePrice(Double.parseDouble(object[3].toString()));

				reports.setTotalAmount(Double.parseDouble(object[4].toString()));
				reports.setNewTotAmt(Double.parseDouble(object[5].toString()));
				saleList.add(reports);
			}
		} catch (RuntimeException e) {

			Log.error("Error in getSaleDetailsYearly(String startDate,String endDate)", e);
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}
		}
		return saleList;
	}

	public List getSaleDetailsBySingalDateWise(String isInsertDate) {

		HibernateUtility hbu = null;
		Session session = null;
		List<com.smt.bean.SaleReports> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery(" select customerBill,  DATE(is_insert_date) , quantity  ,price , totalAmt , newTotalAmt from customer_order where DATE(is_insert_date)=:isInsertDate AND (sale_return) IN ('No')");
			query.setParameter("isInsertDate", isInsertDate);
			List<Object[]> list = query.list();
			saleList = new ArrayList<com.smt.bean.SaleReports>(0);

			for (Object[] object : list) {

				com.smt.bean.SaleReports reports = new com.smt.bean.SaleReports();
				reports.setCustomerBill(Integer.parseInt(object[0].toString()));
				reports.setSoldDate(object[1].toString());
				BigDecimal qunt = (BigDecimal) object[2];
				reports.setQuantity((qunt));
				reports.setSalePrice(Double.parseDouble(object[3].toString()));

				reports.setTotalAmount(Double.parseDouble(object[4].toString()));
				reports.setNetAmount(Double.parseDouble(object[5].toString()));

				saleList.add(reports);
			}
		} catch (RuntimeException e) {
			Log.error("Error in getSaleDetailsBySingalDateWise(String isInsertDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return saleList;
	}

	public List getSaleDetailsByBillNO(String billNo) {

		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReports> saleReports = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select c.customerBill, DATE(c.is_insert_date) , c.quantity  ,c.price , c.totalAmt , c.newTotalAmt ,c.fk_item_id ,c.item_name,c.discount,c.color,e.firstName from customer_order c left join employeedetails e ON c.fk_emp_id=e.id where customerBill=" + billNo);
			List<Object[]> list = query.list();
			saleReports = new ArrayList<SaleReports>(0);
			for (Object[] object : list) {

				System.out.println("eeeeeE" + Arrays.toString(object));
				com.smt.bean.SaleReports reports = new com.smt.bean.SaleReports();
				reports.setCustomerBill(Integer.parseInt(object[0].toString()));
				reports.setSoldDate(object[1].toString());
				BigDecimal qunt = (BigDecimal) object[2];
				reports.setQuantity((qunt));
				reports.setSalePrice(Double.parseDouble(object[3].toString()));

				reports.setTotalAmount(Double.parseDouble(object[4].toString()));
				reports.setNetAmount(Double.parseDouble(object[5].toString()));
				reports.setItemId((BigInteger) object[6]);
				reports.setItemName(object[7].toString());
				BigDecimal vl = (BigDecimal) (object[8]);

				BigDecimal nullDiss = new BigDecimal(0.0);

				if (vl == null) {
					reports.setDiscountforsalereturn(nullDiss);
				} else {
					reports.setDiscountforsalereturn(vl);
				}

				reports.setColor(object[9].toString());

				String empName = (String) object[10];

				if (!"".equals(empName)) {

					reports.setEmpName(empName);
				} else {
					reports.setEmpName("N/A");

				}
				saleReports.add(reports);

			}

		} catch (RuntimeException e) {
			Log.error("Error in getSaleDetailsByBillNO(String billNo)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}

		}
		return saleReports;

	}

	public List getAllClosingReportPayments() {
		java.util.Date date = new java.util.Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String data = (dateFormat.format(date)); // 2014/08/06 15:59:4
		HibernateUtility hbu = null;
		Session session = null;
		List<DayWiseSale> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select card , cash  ,SUM(newTotalAmt) ,customerBill, is_insert_date   from customer_order  where  is_insert_date=:data AND (sale_return) IN ('No') GROUP BY customerBill  ");
			query.setParameter("data", data);
			List<Object[]> list = query.list();
			saleList = new ArrayList<DayWiseSale>(0);
			for (Object[] object : list) {

				DayWiseSale reports = new DayWiseSale();
				reports.setCard(Double.parseDouble(object[0].toString()));
				reports.setCash(Double.parseDouble(object[1].toString()));
				reports.setNewTotalAmt(Double.parseDouble(object[2].toString()));
				reports.setCustomerBill(Long.parseLong(object[3].toString()));
				saleList.add(reports);
			}
		} catch (RuntimeException e) {
			Log.error("error in getAllClosingReportPayments()", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return saleList;
	}

	public List getDayClosingBetTwoDates(String startDate, String endDate) {

		HibernateUtility hbu = null;
		Session session = null;
		List<com.smt.bean.DayWiseSale> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select card , cash  ,SUM(newTotalAmt) ,customerBill, is_insert_date   from customer_order c where c.is_insert_date BETWEEN :stDate AND :edDate   GROUP BY customerBill ");
			query2.setParameter("stDate", startDate);
			query2.setParameter("edDate", endDate);
			List<Object[]> list = query2.list();
			saleList = new ArrayList<DayWiseSale>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));

				DayWiseSale reports = new DayWiseSale();
				Double cash = (Double) object[0];
				if (cash == null) {

					reports.setCash(0.0);
				} else {
					reports.setCash(cash);
				}

				Double card = (Double) object[1];
				if (cash == null) {

					reports.setCard(0.0);
				} else {
					reports.setCard(card);
				}
				reports.setNewTotalAmt(Double.parseDouble(object[2].toString()));
				reports.setCustomerBill(Long.parseLong(object[3].toString()));
				saleList.add(reports);
			}
		} catch (RuntimeException e) {
			Log.error("Error in getDayClosingBetTwoDates(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return saleList;

	}

	public List getPaymentDetailsBySingalDateWise(String data) {

		HibernateUtility hbu = null;
		Session session = null;
		List<DayWiseSale> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query = session.createSQLQuery("select card , cash  ,SUM(newTotalAmt) ,customerBill, is_insert_date   from customer_order  where  is_insert_date=:data GROUP BY customerBill ");
			query.setParameter("data", data);
			List<Object[]> list = query.list();
			saleList = new ArrayList<DayWiseSale>(0);

			for (Object[] object : list) {

				DayWiseSale reports = new DayWiseSale();
				reports.setCard(Double.parseDouble(object[0].toString()));
				reports.setCash(Double.parseDouble(object[1].toString()));
				reports.setNewTotalAmt(Double.parseDouble(object[2].toString()));
				reports.setCustomerBill(Long.parseLong(object[3].toString()));
				saleList.add(reports);
			}
		} catch (RuntimeException e) {
			Log.error("Error in getPaymentDetailsBySingalDateWise(String data)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return saleList;
	}

	public List<SaleReport> singleDatePurchase(Date adate, String userTypeRole, String userName) {
		
		System.out.println("adate =========> "+adate);
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long k = 1l;
			Double total = 0.0;
			Double discount = 0.0;
			Double grossAmt = 0.0;
			
			if(userTypeRole.equalsIgnoreCase("admin"))
			{
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, pr.ProductName, ct.category_name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.TaxAmount, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId where o.Date =:adate AND o.Quantity>0");
			}
			else
			{
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, pr.ProductName, ct.category_name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.TaxAmount, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId where o.Date =:adate AND o.Quantity>0 AND o.EmpType != 'admin'");
			}
			query2.setParameter("adate", adate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				
				Double quantity = Double.parseDouble(object[10].toString());
				
				/*String quantity = object[10].toString();
				if (quantity.equals("0")) {
					continue;

				} else {*/
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
				
				reports.setTotalAmt(Double.parseDouble(object[8].toString()));
				
				total = (Double) object[8];
				discount = (Double) object[9];
				if(quantity == 0)
				{
					reports.setDiscount(0.0);
					//reports.setTotalAmt(Double.parseDouble(sp));
				}
				else
				{
					//reports.setTotalAmt(total);
					//reports.setTotalAmt(Double.parseDouble(df.format((quantity * Double.parseDouble(sp)) - discount)));
					reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);
				} 
				
				/*reports.setTotalAmt((double) Math.round(Double.parseDouble(object[8].toString())*100.0)/100.0);
				reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);*/
				
				reports.setQuantity(Double.parseDouble(object[10].toString()));
				
				total = (Double) object[8];
				discount = (Double) object[9];
				grossAmt = total - discount;
				reports.setGrossamt(Double.parseDouble(object[8].toString()));
				reports.setSpWithoutTax(object[12].toString());
				reports.setPerProductDisPer(object[13].toString());
				reports.setAfterDisTaxAmt(object[14].toString());
				reports.setGst(Double.parseDouble(object[15].toString()));
				if(userTypeRole.equalsIgnoreCase("admin"))
				{
					reports.setGrBuyPriceExTax("N/A");
				}
				else
				{
					reports.setGrBuyPriceExTax("0");
				}				
				k++;
				/* } */
				
				reports.setSubCatName(object[16].toString());
				
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List<SaleReport> CategoryWiseSaleReport(String catId, String userTypeRole, String userName, String catFirstDate, String catEndDate)
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
				System.out.println("catId ===> "+catId);
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, pr.productName, ct.category_name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId where o.fkCatId=:catId AND o.Quantity>0 AND o.Date BETWEEN :catFirstDate AND :catEndDate");
			}
			else if(userTypeRole != "admin")
			{
				System.out.println("catId ===> "+catId);
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, pr.productName, ct.category_name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId where o.fkCatId=:catId AND o.Quantity>0 AND o.EmpType != 'admin' AND o.Date BETWEEN :catFirstDate AND :catEndDate");
			}
			
			query2.setParameter("catId", catId);
			query2.setParameter("catFirstDate", catFirstDate);
			query2.setParameter("catEndDate", catEndDate);
			
			
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
					//reports.setBillNo(Long.parseLong(object[0].toString()));
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
					
					reports.setTotalAmt(Double.parseDouble(object[8].toString()));
					
					total = (Double) object[8];
					discount = (Double) object[9];
					if(quantity == 0)
					{
						reports.setDiscount(0.0);
						//reports.setTotalAmt(Double.parseDouble(sp));
					}
					else
					{
						//reports.setTotalAmt(total);
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

	
	
	public List<SaleReport> billSaleWiseForPopUpReportDao(String billNo, String userTypeRole, String userName)
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
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, pr.productName, ct.category_name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId where o.BillNo=:billNo AND o.Quantity>0");
			}
			else if(userTypeRole != "admin")
			{
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, pr.productName, ct.category_name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId where o.BillNo=:billNo AND o.Quantity>0 AND o.EmpType != 'admin'");
			}
			
			query2.setParameter("billNo", billNo);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list)
			{
				SaleReport reports = new SaleReport();
				
				String quantity = object[10].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
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
					reports.setTotalAmt((double) Math.round(Double.parseDouble(object[8].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);
					reports.setQuantity(Double.parseDouble(object[10].toString()));
					total = (Double) object[8];
					discount = (Double) object[9];
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
				}
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	
	
	public List<SaleReport> productWiseSaleReportDao(String productId, String userTypeRole, String userName)
	{
		System.out.println("productId ====> "+productId);
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
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, pr.productName, ct.category_name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId where o.fkProductId=:productId AND o.Quantity>0");
			}
			else 
			{
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, pr.productName, ct.category_name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, o.Date, sb.subcat_name from otherbill o categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on o.fkProductId = pr.pkProductNameId where o.fkProductId=:productId AND o.Quantity>0 AND o.EmpType != 'admin'");
			}
			query2.setParameter("productId", productId);
			List<Object[]> list = query2.list();
			
			System.out.println("list.size() =====> "+list.size());
			
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
					
					reports.setTotalAmt(Double.parseDouble(object[8].toString()));
					
					total = (Double) object[8];
					discount = (Double) object[9];
					if(quantity == 0)
					{
						reports.setDiscount(0.0);
						//reports.setTotalAmt(Double.parseDouble(sp));
					}
					else
					{
						//reports.setTotalAmt(total);
						//reports.setTotalAmt(Double.parseDouble(df.format((quantity * Double.parseDouble(sp)) - discount)));
						reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);
					} 
					/*reports.setTotalAmt((double) Math.round(Double.parseDouble(object[8].toString())*100.0)/100.0);
					reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);*/
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
				/* } */
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public List<SaleReport> getSaleDetailsBetweenTwoDates(Date adate, Date bdate, String userTypeRole, String userName) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<SaleReport> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
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
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, o.ItemName, ct.Category_Name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id where o.Date BETWEEN :adate AND :bdate  AND o.quantity > -1");
			}
			else
			{
				query2 = session.createSQLQuery("select o.BillNo, o.CarNo, o.BarcodeNo, o.ItemName, ct.Category_Name, o.SalePrice, o.OwnerName, o.ContactNo, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id where o.Date BETWEEN :adate AND :bdate  AND o.quantity > -1 AND o.EmpType != 'admin'");
			}
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
			
				Double quantity = Double.parseDouble(object[10].toString());
/*
				if (quantity.equals("0"))
				{
					continue;

				}
				else
				{
*/				
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
					
					reports.setTotalAmt(Double.parseDouble(object[8].toString()));
					
					total = (Double) object[8];
					discount = (Double) object[9];
					if(quantity == 0)
					{
						reports.setDiscount(0.0);
						//reports.setTotalAmt(Double.parseDouble(sp));
					}
					else
					{
						//reports.setTotalAmt(total);
						//reports.setTotalAmt(Double.parseDouble(df.format((quantity * Double.parseDouble(sp)) - discount)));
						reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())*100.0)/100.0);
					} 
					reports.setQuantity(Double.parseDouble(object[10].toString()));
										
					grossAmt = total - discount;
					reports.setGrossamt((Double) object[8]);
					
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
	
					reports.setSaleDate(object[15].toString());
					reports.setSubCatName(object[16].toString());
					k++;
				/* } */
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	//get sale Date Betweent to date bill No
	public List<SaleReport> getSaleDetailsBetweenTwoDatesBillNo(Date adate, Date bdate, String userTypeRole, String userName)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		String admin = "admin";
		
		Query query2 = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long k = 1l;
			Double total = 0.0;
			Double discount = 0.0;
			Double grossAmt = 0.0;
			System.out.println("Before SQL Query In Helper");
			
			if(userTypeRole.equalsIgnoreCase("admin"))
			{
				query2 = session.createSQLQuery("SELECT BillNo, credit_Customer_Name, mobile_No, Sum(totalperitem), Date FROM otherbill WHERE Date BETWEEN :adate AND :bdate AND Quantity > 0 GROUP BY BillNo");
			}
			else
			{
				query2 = session.createSQLQuery("SELECT BillNo, credit_Customer_Name, mobile_No, Sum(totalperitem), Date FROM otherbill WHERE Date BETWEEN :adate AND :bdate AND Quantity > 0 AND EmpType != 'admin' GROUP BY BillNo");
			}
			
			System.out.println("After SQL");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list)
			{
				SaleReport reports = new SaleReport();
			
				/*String quantity = object[10].toString();
				if (quantity.equals("0")) {
					continue;

				} else {*/
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				//System.out.println("SR.No"+Long.parseLong(object[0].toString()));
				reports.setCustomerName(object[1].toString());
				//System.out.println("CName"+object[1].toString());
				reports.setContactNo(Long.parseLong(object[2].toString()));
				//System.out.println("CNo"+Long.parseLong(object[2].toString()));
				reports.setGrossamt((double) Math.round(Double.parseDouble(object[3].toString())*100.0)/100.0);
				//System.out.println("tota"+(double) Math.round(Double.parseDouble(object[3].toString())*100.0)/100.0);
				reports.setSaleDate(object[4].toString());
				
				k++;
				/*}*/
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	//gst return
	public List<gstReturnbean> gstReturndao(Date adate, Date bdate, String userTypeRole, String userName) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<gstReturnbean> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Double tpersent = 0.0;
			Double gst = 0.0;
			Double tamount = 0.0;
			Double tTax = 0.0;
			System.out.println("Before SQL Query In Helper");
			if(userTypeRole.equalsIgnoreCase("admin"))
			{
				query2 = session.createSQLQuery("SELECT Gst, SUM(totalperitem) FROM otherbill WHERE Date BETWEEN :adate AND :bdate GROUP BY Gst");
			}
			else
			{
				query2 = session.createSQLQuery("SELECT Gst, SUM(totalperitem) FROM otherbill WHERE Date BETWEEN :adate AND :bdate AND EmpType != 'admin' GROUP BY Gst");
			}
			System.out.println("After SQL");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<gstReturnbean>(0);

			for (Object[] object : list) {

				gstReturnbean reports = new gstReturnbean();
			
				
				reports.setGstpersent(object[0].toString());
				
				tpersent = Double.parseDouble(object[0].toString());
				
				reports.settValue(object[1].toString());
				tamount = Double.parseDouble(object[1].toString());
				gst = (tamount * (tpersent/2))/100;
				
				reports.setCgst(Double.toString(gst));
				reports.setSgst(Double.toString(gst));
				
				tTax = gst*2;
				System.out.println("********************************************"+tTax);
				reports.setTotalgst(Double.toString(tTax));
				
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	//gst return for purchase
	
	public List<gstReturnbean> purchasegstReturn(Date adate, Date bdate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<gstReturnbean> catList = null;
		DecimalFormat df = new DecimalFormat("#.##");
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Double tpersent = 0.0;
			Double gst = 0.0;
			Double tamount = 0.0;
			Double tTax = 0.0;
			/*String GST = null;
			String IGST = null;*/
			Double igstPersent = 0.0;
			System.out.println("Before SQL Query In Helper");
			Query query2 = session.createSQLQuery("SELECT Vat, sum(Total - TaxAmount),igst from goodreceive WHERE Date BETWEEN :adate AND :bdate GROUP BY Vat,igst");
			//Query query2 = session.createSQLQuery("SELECT gr.Vat, gr.igst, gr.Discount, gr.RollSize, gr.OrignalQuantity, gr.BuyPrice from goodreceive gr WHERE Date  BETWEEN :adate AND :bdate GROUP BY Vat,igst");
			System.out.println("After SQL");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<gstReturnbean>(0);

			double totaGst = 0.0;
			double totaIgstTax = 0.0;
			
			for (Object[] object : list)
			{
				gstReturnbean reports = new gstReturnbean();
			
				Double GST = Double.parseDouble(object[0].toString());
				Double IGST = Double.parseDouble(object[2].toString());
				System.out.println("GST is   "+GST);
				System.out.println("IGST is   "+IGST);
				
				/*if(GST == 0.00 && IGST == 0.00)
				{
					double taxableValue = 0.0;
					double totaAmt = 0.0;
					Double rollSize = Double.parseDouble(object[3].toString());
					Double disPer = Double.parseDouble(object[2].toString());
					Double oQuantity = Double.parseDouble(object[4].toString());
					Double buyPrice = Double.parseDouble(object[5].toString());
					
					if(rollSize > 0.00)
					{	
						taxableValue = ((oQuantity * rollSize)*buyPrice);
						System.out.println("rollSize =====> "+rollSize);
						System.out.println("TAXABLE VALUE =======> "+taxableValue);
					}
					else
					{
						taxableValue = oQuantity * buyPrice;
						System.out.println("oQuantity "+oQuantity);
						System.out.println("buyPrice "+buyPrice);
						System.out.println("TAXABLE VALUE =======> "+taxableValue);
					}
					if(disPer == 0.00)
					{}
					else
					{
						double disAmount = (taxableValue*(disPer/100));
						taxableValue = taxableValue - disAmount;
					}
					
					totaAmt = totaAmt+taxableValue;
					
					reports.setGstpersent(object[0].toString());
					reports.setIgst(object[1].toString());
					reports.settValue(String.valueOf(totaAmt));
					reports.setCgst("0");
					reports.setSgst("0");
					reports.setTotalgst("0.0");
					reports.setTotalIgst("0.0");
				}
				if(GST > 0.00 && IGST == 0.00)
				{
					Double oQuantity = Double.parseDouble(object[4].toString());
					Double buyPrice = Double.parseDouble(object[5].toString());
					double taxableValue = oQuantity * buyPrice;
					reports.setGstpersent(object[0].toString());
					reports.setIgst(object[1].toString());
					reports.settValue(String.valueOf(taxableValue));
					reports.setCgst("0");
					reports.setSgst("0");
					reports.setTotalgst("0.0");
					reports.setTotalIgst("0.0");
				}
				if(IGST > 0.00 && GST == 0.00)
				{
					Double oQuantity = Double.parseDouble(object[4].toString());
					Double buyPrice = Double.parseDouble(object[5].toString());
					double taxableValue = oQuantity * buyPrice;
					reports.setGstpersent(object[0].toString());
					reports.setIgst(object[1].toString());
					reports.settValue(String.valueOf(taxableValue));
					reports.setCgst("0");
					reports.setSgst("0");
					reports.setTotalgst("0.0");
					reports.setTotalIgst("0.0");
				}*/
				
			 /*if(IGST.equals("0.0"))*/
				if(IGST == 0)
				{
					System.out.println("for GST AMOUNT");
					reports.setGstpersent(object[0].toString());
					reports.setIgst("0.0");
					
					tpersent = Double.parseDouble(object[0].toString());
					
					reports.settValue(df.format(Double.parseDouble(object[1].toString())));
					tamount = Double.parseDouble(object[1].toString());
					gst = (tamount * (tpersent/2))/100;
					
					reports.setCgst(df.format(gst));
					reports.setSgst(df.format(gst));
					
					tTax = gst*2;
					System.out.println("********************************************"+tTax);
					reports.setTotalgst(df.format(tTax));
					reports.setTotalIgst("0.0");
				}
				/*else if(GST.equals("0.0"))*/
				else if(GST == 0.0)
				{
					System.out.println("fore IGST");
					reports.setGstpersent("0.0");
					reports.setIgst(object[2].toString());
					
					igstPersent = Double.parseDouble(object[2].toString());
					tpersent = Double.parseDouble(object[0].toString());
					
					reports.settValue(object[1].toString());
					tamount = Double.parseDouble(object[1].toString());
					gst = (tamount * igstPersent)/100;
					
					reports.setCgst("0.0");
					reports.setSgst("0.0");
					
					//tTax = gst*2;
					System.out.println("********************************************"+tTax);
					reports.setTotalgst("0.0");
					reports.setTotalIgst(df.format(gst));
					
				}
				else if(GST == 0.0 && IGST == 0.0)
				/*else if(GST.equals("0.0") && IGST.equals("0.0"))*/
				{
					reports.setGstpersent("0.0");
					reports.setIgst("0.0");
					
					igstPersent = Double.parseDouble(object[2].toString());
					tpersent = Double.parseDouble(object[0].toString());
					
					reports.settValue(object[1].toString());
					tamount = Double.parseDouble(object[1].toString());
					gst = (tamount * igstPersent)/100;
					
					reports.setCgst("0.0");
					reports.setSgst("0.0");
					
					//tTax = gst*2;
					System.out.println("********************************************"+tTax);
					reports.setTotalgst("0.0");
					reports.setTotalIgst("0.0");
				}
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	//get sale details between two date as per user
	
	public List<SaleReport> getSaleDetailsBetweenTwoDates_asPerUser(String uType, String userId, String adate, String bdate, String userType, String userName)
	{
		// TODO Auto-generated method stub
		
		
		//LOGGED IN USER
/*		userType
		userName      */
		
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long k = 1l;
			Double total = 0.0;
			Double discount = 0.0;
			Double grossAmt = 0.0;
			
			System.out.println("uType ===> "+uType);
			System.out.println("userId ===> "+userId);
			System.out.println("adate ===> "+adate);
			System.out.println("bdate ===> "+bdate);
			
			//LOGGED IN USER
			if(userType.equalsIgnoreCase("admin"))
			{
				query2 = session.createSQLQuery("select BillNo, BarcodeNo, ItemName, ct.Category_Name, SalePrice, totalperitem, Discount, Quantity, SalePWithoutTax, perProductdisPer, taxAmtAfterDiscount, Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id where Date BETWEEN :adate AND :bdate AND EmpType=:uType AND EmpId_Fk=:uId AND Quantity > 0 UNION ALL select BillNo, BarcodeNo, ItemName, ct.Category_Name, SalePrice,totalperitem, Discount, Quantity, SalePWithoutTax, perProductdisPer, taxAmtAfterDiscount, Gst, ccb.Date, sb.subcat_name from creditcustomerbill ccb join categories ct on ccb.fkCatId=ct.pk_category_id JOIN sub_categories sb on ccb.fkSubCatId=sb.pk_subcat_id where Date BETWEEN :adate AND :bdate AND cEmpType=:uType AND cEmpIdFk=:uId AND Quantity > 0");
				query2.setParameter("adate", adate);
				query2.setParameter("bdate", bdate);
				query2.setParameter("uType", uType);
				query2.setParameter("uId", userId);
				
				System.out.println(" FOR ADMIN ");
				System.out.println("uType ===> "+uType);
				System.out.println("userId ===> "+userId);
				System.out.println("adate ===> "+adate);
				System.out.println("bdate ===> "+bdate);
			}
			else
			{
				query2 = session.createSQLQuery("select BillNo, BarcodeNo, ItemName, ct.Category_Name, SalePrice, totalperitem, Discount, Quantity, SalePWithoutTax, perProductdisPer, taxAmtAfterDiscount, Gst, o.Date, sb.subcat_name from otherbill o join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id where Date BETWEEN :adate AND :bdate AND Quantity > 0 AND EmpType != 'admin' UNION ALL select BillNo, BarcodeNo, ItemName, ct.Category_Name, SalePrice,totalperitem, Discount, Quantity, SalePWithoutTax, perProductdisPer, taxAmtAfterDiscount, Gst, ccb.Date, sb.subcat_name from creditcustomerbill ccb join categories ct on ccb.fkCatId=ct.pk_category_id JOIN sub_categories sb on ccb.fkSubCatId=sb.pk_subcat_id where Date BETWEEN :adate AND :bdate AND Quantity > 0 AND cEmpType != 'admin'");
				query2.setParameter("adate", adate);
				query2.setParameter("bdate", bdate);
				
				System.out.println("uType ===> "+uType);
				System.out.println("userId ===> "+userId);
				System.out.println("adate ===> "+adate);
				System.out.println("bdate ===> "+bdate);
			}
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				String quantity = object[7].toString();
				if (quantity.equals("0")) {
					continue;

				} else {
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				/*reports.setCarNo(object[1].toString());*/
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				DecimalFormat f = new DecimalFormat("##.00");
				String sp = f.format(object[4]);
				reports.setSalePrice(Double.parseDouble(sp));
				/*reports.setOwnerName(object[6].toString());
				reports.setContactNo(Long.parseLong(object[7].toString()));*/
				reports.setTotalAmt((double) Math.round(Double.parseDouble(object[5].toString())*100.0)/100.0);
				reports.setDiscount((double) Math.round(Double.parseDouble(object[6].toString())*100.0)/100.0);
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				total = (Double) object[5];
				discount = (Double) object[6];
				grossAmt = total - discount;
				reports.setGrossamt((Double) object[5]);
				reports.setSpWithoutTax(object[8].toString());
				reports.setPerProductDisPer(object[9].toString());
				reports.setAfterDisTaxAmt(object[10].toString());
				reports.setGst(Double.parseDouble(object[11].toString()));
				reports.setSaleDate(object[12].toString());
				reports.setSubCatName(object[13].toString());
				k++;
				}
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// day closing report
	public List<SaleReport> dayCloseReport() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date dateobj = new Date();
			System.out.println(df.format(dateobj));
			String newDate = df.format(dateobj);
			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.totalperitem, s.Discount, s.Quantity from customerbill s where s.Date =:newDate UNION select o.BillNo, o.BarcodeNo, o.ItemName, o.CategoryName, o.SalePrice, o.totalperitem, o.Discount, o.Quantity from otherbill o where o.Date =:newDate UNION select c.BillNo, c.BarcodeNo, c.ItemName, c.CategoryName, c.SalePrice, c.totalperitem, c.Discount, c.Quantity from creditcustomerbill c where c.Date =:newDate");
			query2.setParameter("newDate", newDate);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {
				System.out.println("kjhhv " + Arrays.toString(object));
				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice(Double.parseDouble(object[4].toString()));
				reports.setTotalAmt(Double.parseDouble(object[5].toString()));
				reports.setDiscount(Double.parseDouble(object[6].toString()));
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List getSaleItemByBillNo(String billNo, String shopId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query = session.createSQLQuery("select s.pkOtherBillId, ct.category_name, pr.ProductName, s.BarcodeNo, s.Quantity, s.SalePrice, s.mobile_No, s.totalperitem, s.Discount, s.GrossTotal, s.Date, s.size, s.TaxAmount, s.Gst, s.Igst, s.perProductdisPer, s.taxAmtAfterDiscount, s.fkProductId, s.fkSubCatId, s.fkCatId, sb.subcat_name, s.fkShopId, s.perProductdisPer, s.fkgoodreciveid from otherbill s join product_reg pr on s.fkProductId=pr.pkProductNameId join categories ct on pr.FkCatId=ct.pk_category_id join sub_categories sb ON s.fkSubCatId = sb.pk_subcat_id where s.BillNo=:billNo AND s.fkshopId=:shopId AND s.Quantity>0");
			query.setParameter("billNo", billNo);
			query.setParameter("shopId", shopId);

			list = query.list();

		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	public List getSaleItemsGridForSaleReturnByMobileNo(String billNo, String shopId)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query = session.createSQLQuery("select s.pkOtherBillId, ct.category_name, pr.ProductName, s.BarcodeNo, s.Quantity, s.SalePrice, s.mobile_No, s.totalperitem, s.Discount, s.GrossTotal, s.Date, s.size, s.TaxAmount, s.Gst, s.Igst, s.perProductdisPer, s.taxAmtAfterDiscount, s.fkProductId, s.fkSubCatId, s.fkCatId, sb.subcat_name, s.fkShopId, s.fkgoodreciveid from otherbill s join product_reg pr on s.fkProductId=pr.pkProductNameId join categories ct on pr.FkCatId=ct.pk_category_id join sub_categories sb ON s.fkSubCatId = sb.pk_subcat_id where s.BillNo=:billNo AND s.fkshopId=:shopId AND s.Quantity>0");
			query.setParameter("billNo", billNo);
			query.setParameter("shopId", shopId);

			list = query.list();
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}

	public List getSaleItemByBillNo1(String billNo, String shopId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("BillNo :: " + billNo);

			Query query = session.createSQLQuery("select s.pkCrediBillId, ct.category_name, pr.ProductName, s.BarcodeNo, s.Quantity, s.SalePrice, s.totalperitem, s.Discount, s.GrossTotal, s.Date, s.size, s.fkCrediCustId, s.BillNo, s.Gst, s.Igst, s.TaxAmount, s.taxAmtAfterDiscount, s.perProductdisPer, s.fkProductId, s.fkSubCatId, s.fkCatId, cd.contact_no, s.fkShopId  from creditcustomerbill s JOIN product_reg pr on s.fkProductId = pr.pkProductNameId JOIN categories ct on s.fkCatId = ct.pk_category_id JOIN customer_details cd on s.fkCrediCustId=cd.pk_customer_id where s.BillNo=:billNo AND s.fkShopId=:shopId AND s.Quantity>0");
			query.setParameter("billNo", billNo);
			query.setParameter("shopId", shopId);
			list = query.list();

		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}

	// other bill not in use
	public List<CustomerBean> getAllItemDetails1Old(String key, String productId, String shopId)
	{System.out.println("In Dao getAllItemDetails1 Method for Get Grid 0");
		System.out.println("key ====> "+key);
		System.out.println("productId ====> "+productId);
		System.out.println("shopId ====> "+shopId);
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		List<CategoryWisePurchase> categoryBean = null;
		List<CustomerBean> itemlist = null;
		double spWTax = 0d;
		double disPer = 0d;
		double spAfterDis = 0d;
		DecimalFormat df = new DecimalFormat("#.##");
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			if(key != null)
			{
				System.out.println("In First If Block if Key is Not Nill :- "+key);
				String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId FROM goodreceive gr JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE gr.Quantity > 0 AND BarcodeNo = "+key+" AND gr.fkShopId = "+shopId;

				Query query = session.createSQLQuery(sqlQuery);
				List<Object[]> list = query.list();

				itemlist = new ArrayList<CustomerBean>(0);
				for (Object[] objects : list)
				{	
					Double sp = (Double.parseDouble(objects[9].toString()));
					
					System.out.println("Selling Sprice :- "+sp);
					
					spWTax = Double.parseDouble(objects[13].toString());
					disPer = Double.parseDouble(objects[14].toString());
					
					System.out.println("Size :"+Arrays.toString(objects));
					CustomerBean bean = new CustomerBean();

					bean.setItemName(objects[0].toString());
					bean.setItem_id(Long.parseLong(objects[1].toString()));
					bean.setCategoryName(objects[2].toString());

					bean.setBarcodeNo(Long.parseLong(objects[3].toString()));
					bean.setHsnSacNo(objects[4].toString());
					System.out.println(objects[4].toString());
					bean.setQuantity(1d);
					bean.setSalePrice(Double.parseDouble(objects[9].toString()));
					
					bean.setFixedSalePrice(Double.parseDouble(objects[9].toString()));

					//Double gstPer = Double.parseDouble(objects[5].toString());
					Double iGstPer = Double.parseDouble(objects[6].toString());
					System.out.println("iGstPer :- "+iGstPer);
					
					Double gstPer = 0d;
					if(sp > 0d && sp <= 1000d) {
						gstPer = 5d;
					} else {
						if(sp > 1000d) {
							gstPer =  12d;
						}
					}
					System.out.println("gstPer :- "+gstPer);
					
					
					bean.setSize1(objects[7].toString());
					
					bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
						
					bean.setRollSize(Double.parseDouble(objects[10].toString()));
					bean.setSubCategoryName(objects[11].toString());
					bean.setMtrQuantity(Double.parseDouble(objects[12].toString()));
					//bean.setsPWithoutTax(Double.parseDouble((objects[13].toString())));
					//bean.setDisPerForBill(0.0);
					bean.setDisPerForBill(Double.parseDouble(objects[14].toString()));
									
					if(disPer > 0)
					{								
						if(spWTax > 0 && spWTax <= 1000)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
						}
						else if(spWTax > 1000)
						{
							System.out.println("(spWTax > 1000) =====> "+spWTax);
							
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							bean.setSpAfterDis("0");
						}					
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						double taxAmtAfterDis = 0;					
						double disAmt = (spWTax*(disPer/100));
						bean.setDisAmount(Double.parseDouble(df.format(disAmt)));					
						spAfterDis = spWTax - disAmt;

						if(gstPer > 0)
						{
							bean.setVat(gstPer);
							taxAmtAfterDis = (spAfterDis * (gstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else if(iGstPer > 0)
						{
							bean.setVat(iGstPer);
							taxAmtAfterDis = (spAfterDis * (iGstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else
						{
							bean.setTaxAmountAfterDis(0.0);
							bean.setTotal(Double.parseDouble(df.format(sp - disAmt)));
						}
					}
					else
					{
						if(sp > 0d && sp <= 1000d)
						{
							spWTax = (sp/(1+(gstPer/100)));
							bean.setVat(gstPer);
							bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							
							/*if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}*/
						}
						else if(sp > 1000d)
						{
							spWTax = (sp/(1+(gstPer/100)));
							bean.setVat(gstPer);
							bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							/*if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else 
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}*/
						}						
						
						bean.setDisAmount(0.0);
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						bean.setTaxAmountAfterDis(0.0);
						bean.setTotal(sp);
					}
					
					bean.setSpAfterDis(df.format(spAfterDis));
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
			else
			{
				System.out.println("In else Block if Key is Null :- "+key);
				System.out.println("called === PRODUCT BY PRODUCT INFO "+productId);
				
				String sqlQuery = "SELECT pr.ProductName, pr.pkProductNameId, ct.category_name, sb.subcat_name, pr.FkCatId, pr.fkSubCategoryId, pr.fkShopId FROM product_reg pr JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id WHERE pr.pkProductNameId = "+productId+" AND pr.fkShopId = "+shopId;
				
				Query query = session.createSQLQuery(sqlQuery);
				List<Object[]> list = query.list();

				itemlist = new ArrayList<CustomerBean>(0);
				for (Object[] objects : list)
				{	
					CustomerBean bean = new CustomerBean();

					bean.setItemName(objects[0].toString());
					bean.setItem_id(Long.parseLong(objects[1].toString()));
					bean.setCategoryName(objects[2].toString());

					bean.setBarcodeNo(0l);
					bean.setHsnSacNo("NA");
					bean.setQuantity(1d);
					bean.setSalePrice(0d);
					bean.setFixedSalePrice(0d);
					
					bean.setSize1("NA");
											
					bean.setRollSize(0d);
					bean.setSubCategoryName(objects[3].toString());
					bean.setMtrQuantity(0d);
					bean.setDisPerForBill(0d);
					bean.setTaxAmount(0d);
					bean.setVat(0d);
					bean.setsPWithoutTax(0d);
					bean.setDisAmount(0d);
					bean.setTaxAmountAfterDis(0d);
					bean.setTotal(0d);
					bean.setSpAfterDis("0");
					bean.setFkCategoryId(Long.parseLong(objects[4].toString()));
					bean.setFkSubCatId(Long.parseLong(objects[5].toString()));
					bean.setFkProductId(Long.parseLong(objects[1].toString()));
					bean.setStyle("NA");
					bean.setFkSuppId("0");
					bean.setFkShopId(Long.parseLong(objects[6].toString()));
					
					itemlist.add(bean);
				}	
			}
			
		} catch (RuntimeException e) {
			Log.error("Error in getAllItemDetails(String key)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		System.out.println("In Dao getAllItemDetails1 Method for Get Grid 1");
		return itemlist;
	}
	
	// other bill in use
	public List<CustomerBean> getAllItemDetails1(String key, String productId, String barcodeNo, String shopId)
	{System.out.println("In Dao getAllItemDetails1 Method for Get Grid 0");
		System.out.println("key ====> "+key);
		System.out.println("productId ====> "+productId);
		System.out.println("barcode No Form List ====> "+barcodeNo);
		System.out.println("shopId ====> "+shopId);
		
		HibernateUtility hbu = null;
		Session session = null;
		List<CategoryWisePurchase> categoryBean = null;
		List<CustomerBean> itemlist = null;
		double spWTax = 0d;
		double disPer = 0d;
		double spAfterDis = 0d;
		DecimalFormat df = new DecimalFormat("#.##");
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			if(key != null)
			{
				System.out.println("In First If Block if Key is Not Nill :- "+key);
				//String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId FROM goodreceive gr JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE gr.Quantity > 0 AND BarcodeNo = "+key+" AND gr.fkShopId = "+shopId;
				System.out.println("Success 0");
				//String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId, bns.barcode_no, bns.quantity FROM goodreceive gr JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId JOIN barcode_number_wise_stock_details bns ON pr.pkProductNameId = bns.fk_Product_Id WHERE bns.quantity > 0 AND barcode_no = "+key+" AND bns.fk_shop_id = "+shopId;
				
				String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId, bns.barcode_no, bns.barcode_number_wise_stock_quantity FROM barcode_number_wise_stock_details bns JOIN goodreceive gr ON bns.barcode_no = gr.BarcodeNo JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE bns.barcode_number_wise_stock_quantity > 0 AND barcode_no = "+key+" AND bns.fk_shop_id = "+shopId;
				
				//String sqlQuery = "SELECT bns.barcode_no, bns.quantity, bns.buy_price, bns.sale_price, pr.ProductName, ";
				
				System.out.println("Success 1");
				
				Query query = session.createSQLQuery(sqlQuery);
				List<Object[]> list = query.list();

				itemlist = new ArrayList<CustomerBean>(0);
				for (Object[] objects : list)
				{	
					Double sp = (Double.parseDouble(objects[9].toString()));
					
					System.out.println("Selling Sprice :- "+sp);
					
					spWTax = Double.parseDouble(objects[13].toString());
					disPer = Double.parseDouble(objects[14].toString());
					
					System.out.println("Size :"+Arrays.toString(objects));
					
					CustomerBean bean = new CustomerBean();

					bean.setItemName(objects[0].toString());
					bean.setItem_id(Long.parseLong(objects[1].toString()));
					bean.setCategoryName(objects[2].toString());

					bean.setBarcodeNo(Long.parseLong(objects[21].toString()));
					System.out.println("StockQuantity 1 :- "+objects[22].toString());
					bean.setStockQuantity(Double.parseDouble(objects[22].toString()));
					System.out.println("getStockQuantity :- "+bean.getStockQuantity());
					bean.setHsnSacNo(objects[4].toString());
					System.out.println(objects[4].toString());
					bean.setQuantity(1d);
					bean.setSalePrice(Double.parseDouble(objects[9].toString()));
					
					bean.setFixedSalePrice(Double.parseDouble(objects[9].toString()));

					//Double gstPer = Double.parseDouble(objects[5].toString());
					Double iGstPer = Double.parseDouble(objects[6].toString());
					System.out.println("iGstPer :- "+iGstPer);
					
					//bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
					bean.setDisAmount(0d);
					
					bean.setSpAfterDis(sp.toString());
					System.out.println("In Dao getSpAfterDis() :- "+bean.getSpAfterDis());
					
					Double quantityTocalculateTax =  0d;
					quantityTocalculateTax = bean.getQuantity();
					Double sellingPriceToCalculateTax = quantityTocalculateTax * sp;
					Double gstPer = 0d;
					Double taxCalcute = 0d;
					Double finalSP = 0d;
					Double finalSPWithaoutTax = 0d;
					if(sp > 0d && sp <= 1000d) {
						/*gstPer = 5d;
						taxCalcute = (sellingPriceToCalculateTax/100)*gstPer;
						//finalSP = sellingPriceToCalculateTax + taxCalcute;
						finalSP = sellingPriceToCalculateTax;
						bean.setVat(gstPer);
						bean.setTaxAmount(taxCalcute);*/
						
						gstPer = 5.0;
						//finalSPWithaoutTax = (df.format(sp-(sp/(1+(gstPer/100)))));
						bean.setsPWithoutTax(Double.parseDouble(df.format(sp/(1+(gstPer/100)))));
						bean.setVat(gstPer);
						bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
						bean.setTaxAmountAfterDis(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
						
					} else {
						if(sp > 1000d) {
							/*gstPer =  12d;
							taxCalcute = (sellingPriceToCalculateTax/100)*gstPer;
							finalSP = sellingPriceToCalculateTax + taxCalcute;
							bean.setVat(gstPer);
							bean.setTaxAmount(taxCalcute);*/
							
							gstPer = 12.0;
							//finalSPWithaoutTax = (sp/(1+(gstPer/100)));
							bean.setsPWithoutTax(Double.parseDouble(df.format(sp/(1+(gstPer/100)))));
							bean.setVat(gstPer);
							bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
						}
					}
					System.out.println("In Dao gstPer :- "+gstPer);
					System.out.println("In Dao taxCalcute :- "+taxCalcute);
					System.out.println("In Dao finalSP :- "+finalSP);
					
					//bean.setsPWithoutTax(finalSPWithaoutTax);
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
					
					/*if(disPer > 0)
					{				
						if(spWTax > 0 && spWTax <= 1000)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								//spWTax = (sp/(1+(gstPer/100)));
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
								
								bean.setVat(gstPer);
								Double taxCalcute = (sp/100)*gstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
								
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								//spWTax = (sp/(1+(iGstPer/100)));
								//bean.setVat(gstPer);
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
								
								bean.setVat(gstPer);
								Double taxCalcute = (sp/100)*gstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							}
						}
						else if(spWTax > 1000)
						{
							System.out.println("(spWTax > 1000) =====> "+spWTax);
							
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								//spWTax = (sp/(1+(gstPer/100)));
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
								
								bean.setVat(gstPer);
								Double taxCalcute = (sp/100)*gstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								//spWTax = (sp/(1+(iGstPer/100)));
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
								
								bean.setVat(iGstPer);
								Double taxCalcute = (sp/100)*iGstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							}
							else
							{
								//gstPer = 12.0;
								//spWTax = (sp/(1+(gstPer/100)));
								//bean.setVat(gstPer);
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
								
								bean.setVat(gstPer);
								Double taxCalcute = (sp/100)*gstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							}
							bean.setSpAfterDis("0");
						}					
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						double taxAmtAfterDis = 0;					
						double disAmt = (spWTax*(disPer/100));
						bean.setDisAmount(Double.parseDouble(df.format(disAmt)));					
						spAfterDis = spWTax - disAmt;

						if(gstPer > 0)
						{
							bean.setVat(gstPer);
							taxAmtAfterDis = (spAfterDis * (gstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else if(iGstPer > 0)
						{
							bean.setVat(iGstPer);
							taxAmtAfterDis = (spAfterDis * (iGstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else
						{
							bean.setTaxAmountAfterDis(0.0);
							bean.setTotal(Double.parseDouble(df.format(sp - disAmt)));
						}
					}
					else
					{
						if(sp > 0d && sp <= 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								//spWTax = (sp/(1+(gstPer/100)));
								//bean.setVat(gstPer);
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
								
								bean.setVat(gstPer);
								Double taxCalcute = (sp/100)*gstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								//spWTax = (sp/(1+(iGstPer/100)));
								//bean.setVat(iGstPer);
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
								
								bean.setVat(iGstPer);
								Double taxCalcute = (sp/100)*iGstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							}
							else
							{
								//gstPer = 5.0;
								//spWTax = (sp/(1+(gstPer/100)));
								//bean.setVat(gstPer);
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
								
								bean.setVat(gstPer);
								Double taxCalcute = (sp/100)*gstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							}
						}
						else if(sp > 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								//spWTax = (sp/(1+(gstPer/100)));
								//bean.setVat(gstPer);
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
								
								bean.setVat(gstPer);
								Double taxCalcute = (sp/100)*gstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								//spWTax = (sp/(1+(iGstPer/100)));
								//bean.setVat(iGstPer);
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
								
								bean.setVat(iGstPer);
								Double taxCalcute = (sp/100)*iGstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							}
							else 
							{
								//gstPer = 12.0;
								//spWTax = (sp/(1+(gstPer/100)));
								//bean.setVat(gstPer);
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
								
								bean.setVat(gstPer);
								Double taxCalcute = (sp/100)*gstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("getTaxAmount :- "+bean.getTaxAmount());
							}
						}						
						
						bean.setDisAmount(0.0);
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						bean.setTaxAmountAfterDis(0.0);
						bean.setTotal(sp);
					}*/
					
					//bean.setSpAfterDis(df.format(spAfterDis));
					//double quantity = bean.getQuantity();
					//Double total = quantity * sp;
					
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
			else
			{
				System.out.println("In else Block if Key is Null :- "+key);
				System.out.println("called === PRODUCT BY PRODUCT INFO "+productId);
				
				//String sqlQuery = "SELECT pr.ProductName, pr.pkProductNameId, ct.category_name, sb.subcat_name, pr.FkCatId, pr.fkSubCategoryId, pr.fkShopId FROM product_reg pr JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id WHERE pr.pkProductNameId = "+productId+" AND pr.fkShopId = "+shopId;
				
				//String sqlQuery = "SELECT bns.barcode_no, bns.barcode_number_wise_stock_quantity, pr.pkProductNameId, pr.ProductName, pr.FkCatId, ct.category_name, pr.fkSubCategoryId, sb.subcat_name, gr.Quantity, pr.fkShopId  FROM barcode_number_wise_stock_details bns JOIN product_reg pr ON bns.fk_Product_Id = pr.pkProductNameId JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id JOIN goodreceive gr on bns.barcode_no = gr.BarcodeNo  WHERE bns.barcode_no = "+barcodeNo+" AND bns.fk_shop_id = "+shopId;
				
				String sqlQuery = "SELECT bns.barcode_no, bns.barcode_number_wise_stock_quantity, pr.pkProductNameId, pr.ProductName, pr.FkCatId, ct.category_name, pr.fkSubCategoryId, sb.subcat_name, gr.Quantity, gr.PkGoodRecId, pr.fkShopId  FROM barcode_number_wise_stock_details bns JOIN product_reg pr ON bns.fk_Product_Id = pr.pkProductNameId JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id JOIN goodreceive gr on bns.barcode_no = gr.BarcodeNo  WHERE bns.barcode_no = "+barcodeNo+" AND bns.fk_shop_id = "+shopId;
				
				/*bns.barcode_no, bns.quantity, pr.pkProductNameId, pr.ProductName, pr.FkCatId,
				ct.category_name, pr.fkSubCategoryId, sb.subcat_name, pr.fkShopId*/
				
				//barcodeNo
				Query query = session.createSQLQuery(sqlQuery);
				List<Object[]> list = query.list();

				itemlist = new ArrayList<CustomerBean>(0);
				for (Object[] objects : list)
				{
					CustomerBean bean = new CustomerBean();
					
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
					bean.setSpAfterDis("0");
					bean.setStyle("NA");
					bean.setFkSuppId("0");
					bean.setFkShopId(Long.parseLong(objects[10].toString()));
					
					itemlist.add(bean);
				}	
			}
			
		} catch (RuntimeException e) {
			Log.error("Error in getAllItemDetails(String key)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		System.out.println("In Dao getAllItemDetails1 Method for Get Grid 1");
		return itemlist;
	}

	
	public List<CustomerBean> getAllItemDetails123(String key, String productId, String shopId, String tempbillNo)
	{
		System.out.println("key ====> "+key);
		System.out.println("productId ====> "+productId);
		System.out.println("shopId ====> "+shopId);
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		List<CategoryWisePurchase> categoryBean = null;
		List<CustomerBean> itemlist = null;
		double spWTax = 0d;
		double disPer = 0d;
		double spAfterDis = 0d;
		DecimalFormat df = new DecimalFormat("#.##");
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			if(tempbillNo != null)
			{
				String sqlQuery = "SELECT o.ItemName,o.fkgoodreciveid, o.CategoryName,o.BarcodeNo,o.HsnSacNo,o.Gst,o.Igst,o.size,gr.Quantity,o.SalePrice,o.RollSize,sb.subcat_name,(o.RollSize * gr.Quantity),o.SalePWithoutTax,gr.discountPerForBilling,o.fkCatId,o.fkSubCatId,o.fkProductId,o.style,o.fkSuppId,o.fkShopId FROM otherbill o JOIN goodreceive gr on o.fkgoodreciveid=gr.PkGoodRecId JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id WHERE gr.Quantity > 0 AND o.BillNo="+tempbillNo+" AND gr.fkShopId = "+shopId+" AND o.BillType='Temporay'";
				
				//String sqlQuery = "SELECT o.ItemName, o.fkgoodreciveid, o.CategoryName, o.BarcodeNo, o.HsnSacNo, o.Gst, o.Igst, o.size, bns.barcode_number_wise_stock_quantity, o.SalePrice, o.RollSize, sb.subcat_name,(o.RollSize * gr.Quantity), o.SalePWithoutTax, gr.discountPerForBilling, o.fkCatId,o.fkSubCatId, o.fkProductId, o.style, o.fkSuppId, o.fkShopId FROM otherbill o JOIN goodreceive gr on o.fkgoodreciveid=gr.PkGoodRecId JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id WHERE gr.Quantity > 0 AND o.BillNo="+tempbillNo+" AND gr.fkShopId = "+shopId+" AND o.BillType='Temporay'";
				
				
				//bns.barcode_no, bns.barcode_number_wise_stock_quantity FROM barcode_number_wise_stock_details bns JOIN
				
				//String sqlQuery = "SELECT pkOtherBillId, BillType, BillNo, fkgoodreciveid, BarcodeNo, fkProductId, ItemName, fkCatId, CategoryName, fkSubCatId, HsnSacNo, Rollsize, size, style, Quantity, SalePrice, SalePWithoutTax, perProductdisPer, Discount, Gst, Igst, TaxAmount, taxAmtAfterDiscount, totalperitem, TotalAmount, GrossTotal, 
				
				
				Query query = session.createSQLQuery(sqlQuery);
				List<Object[]> list = query.list();

				itemlist = new ArrayList<CustomerBean>(0);
				for (Object[] objects : list)
				{				
					Double sp = (Double.parseDouble(objects[9].toString()));
					
					spWTax = Double.parseDouble(objects[13].toString());
					disPer = Double.parseDouble(objects[14].toString());
					
					System.out.println("Size :"+Arrays.toString(objects));
					CustomerBean bean = new CustomerBean();

					bean.setItemName(objects[0].toString());
					bean.setItem_id(Long.parseLong(objects[1].toString()));
					bean.setCategoryName(objects[2].toString());

					bean.setBarcodeNo(Long.parseLong(objects[3].toString()));
					bean.setHsnSacNo(objects[4].toString());
					System.out.println(objects[4].toString());
					bean.setQuantity(1d);
					bean.setSalePrice(Double.parseDouble(objects[9].toString()));
					bean.setFixedSalePrice(Double.parseDouble(objects[9].toString()));

					Double gstPer = Double.parseDouble(objects[5].toString());
					Double iGstPer = Double.parseDouble(objects[6].toString());
					
					bean.setSize1(objects[7].toString());
					
					bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
						
					bean.setRollSize(Double.parseDouble(objects[10].toString()));
					bean.setSubCategoryName(objects[11].toString());
					bean.setMtrQuantity(Double.parseDouble(objects[12].toString()));
					//bean.setsPWithoutTax(Double.parseDouble((objects[13].toString())));
					//bean.setDisPerForBill(0.0);
					bean.setDisPerForBill(Double.parseDouble(objects[14].toString()));
									
					if(disPer > 0)
					{								
						if(spWTax > 0 && spWTax <= 1000)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
						}
						else if(spWTax > 1000)
						{
							System.out.println("(spWTax > 1000) =====> "+spWTax);
							
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							bean.setSpAfterDis("0");
						}					
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						double taxAmtAfterDis = 0;					
						double disAmt = (spWTax*(disPer/100));
						bean.setDisAmount(Double.parseDouble(df.format(disAmt)));					
						spAfterDis = spWTax - disAmt;

						if(gstPer > 0)
						{
							bean.setVat(gstPer);
							taxAmtAfterDis = (spAfterDis * (gstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else if(iGstPer > 0)
						{
							bean.setVat(iGstPer);
							taxAmtAfterDis = (spAfterDis * (iGstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else
						{
							bean.setTaxAmountAfterDis(0.0);
							bean.setTotal(Double.parseDouble(df.format(sp - disAmt)));
						}
					}
					else
					{						
						if(sp > 0d && sp <= 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}
						else if(sp > 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else 
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}									
						
						bean.setDisAmount(0.0);
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						bean.setTaxAmountAfterDis(0.0);
						bean.setTotal(sp);
					}
					
					bean.setSpAfterDis(df.format(spAfterDis));
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
			else if(key != null)
			{
				String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId FROM goodreceive gr JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE gr.Quantity > 0 AND BarcodeNo = "+key+" AND gr.fkShopId = "+shopId;

				Query query = session.createSQLQuery(sqlQuery);
				List<Object[]> list = query.list();

				itemlist = new ArrayList<CustomerBean>(0);
				for (Object[] objects : list)
				{				
					Double sp = (Double.parseDouble(objects[9].toString()));
					
					spWTax = Double.parseDouble(objects[13].toString());
					disPer = Double.parseDouble(objects[14].toString());
					
					System.out.println("Size :"+Arrays.toString(objects));
					CustomerBean bean = new CustomerBean();

					bean.setItemName(objects[0].toString());
					bean.setItem_id(Long.parseLong(objects[1].toString()));
					bean.setCategoryName(objects[2].toString());

					bean.setBarcodeNo(Long.parseLong(objects[3].toString()));
					bean.setHsnSacNo(objects[4].toString());
					System.out.println(objects[4].toString());
					bean.setQuantity(1d);
					bean.setSalePrice(Double.parseDouble(objects[9].toString()));
					bean.setFixedSalePrice(Double.parseDouble(objects[9].toString()));

					Double gstPer = Double.parseDouble(objects[5].toString());
					Double iGstPer = Double.parseDouble(objects[6].toString());
					
					bean.setSize1(objects[7].toString());
					
					bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
						
					bean.setRollSize(Double.parseDouble(objects[10].toString()));
					bean.setSubCategoryName(objects[11].toString());
					bean.setMtrQuantity(Double.parseDouble(objects[12].toString()));
					//bean.setsPWithoutTax(Double.parseDouble((objects[13].toString())));
					//bean.setDisPerForBill(0.0);
					bean.setDisPerForBill(Double.parseDouble(objects[14].toString()));
									
					if(disPer > 0)
					{								
						if(spWTax > 0 && spWTax <= 1000)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
						}
						else if(spWTax > 1000)
						{
							System.out.println("(spWTax > 1000) =====> "+spWTax);
							
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							bean.setSpAfterDis("0");
						}					
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						double taxAmtAfterDis = 0;					
						double disAmt = (spWTax*(disPer/100));
						bean.setDisAmount(Double.parseDouble(df.format(disAmt)));					
						spAfterDis = spWTax - disAmt;

						if(gstPer > 0)
						{
							bean.setVat(gstPer);
							taxAmtAfterDis = (spAfterDis * (gstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else if(iGstPer > 0)
						{
							bean.setVat(iGstPer);
							taxAmtAfterDis = (spAfterDis * (iGstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else
						{
							bean.setTaxAmountAfterDis(0.0);
							bean.setTotal(Double.parseDouble(df.format(sp - disAmt)));
						}
					}
					else
					{						
						if(sp > 0d && sp <= 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}
						else if(sp > 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else 
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}									
						
						bean.setDisAmount(0.0);
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						bean.setTaxAmountAfterDis(0.0);
						bean.setTotal(sp);
					}
					
					bean.setSpAfterDis(df.format(spAfterDis));
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
			else
			{
				System.out.println("called === PRODUCT BY PRODUCT INFO "+productId);
				
				String sqlQuery = "SELECT pr.ProductName, pr.pkProductNameId, ct.category_name, sb.subcat_name, pr.FkCatId, pr.fkSubCategoryId, pr.fkShopId FROM product_reg pr JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id WHERE pr.pkProductNameId = "+productId+" AND pr.fkShopId = "+shopId;
				
				Query query = session.createSQLQuery(sqlQuery);
				List<Object[]> list = query.list();

				itemlist = new ArrayList<CustomerBean>(0);
				for (Object[] objects : list)
				{	
					CustomerBean bean = new CustomerBean();

					bean.setItemName(objects[0].toString());
					bean.setItem_id(Long.parseLong(objects[1].toString()));
					bean.setCategoryName(objects[2].toString());

					bean.setBarcodeNo(0l);
					bean.setHsnSacNo("NA");
					bean.setQuantity(1d);
					bean.setSalePrice(0d);
					bean.setFixedSalePrice(0d);
					
					bean.setSize1("NA");
											
					bean.setRollSize(0d);
					bean.setSubCategoryName(objects[3].toString());
					bean.setMtrQuantity(0d);
					bean.setDisPerForBill(0d);
					bean.setTaxAmount(0d);
					bean.setVat(0d);
					bean.setsPWithoutTax(0d);
					bean.setDisAmount(0d);
					bean.setTaxAmountAfterDis(0d);
					bean.setTotal(0d);
					bean.setSpAfterDis("0");
					bean.setFkCategoryId(Long.parseLong(objects[4].toString()));
					bean.setFkSubCatId(Long.parseLong(objects[5].toString()));
					bean.setFkProductId(Long.parseLong(objects[1].toString()));
					bean.setStyle("NA");
					bean.setFkSuppId("0");
					bean.setFkShopId(Long.parseLong(objects[6].toString()));
					
					itemlist.add(bean);
				}	
			}
			
		} catch (RuntimeException e) {
			Log.error("Error in getAllItemDetails(String key)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		
		return itemlist;
	}
	
	
	// get all bill numbers in sale return form
	public List getAllBillNumbers() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from OtherBill group by billNo");
			list = query.list();

		} catch (RuntimeException e) {
			Log.error("Error in getAllSupplier ", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}

	// get all bill numbers in sale return form
	public List getAllBillNumbers1() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from CreditCustomerBill group by billNo");
			list = query.list();

		} catch (RuntimeException e) {
			Log.error("Error in getAllSupplier ", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}

	public List<GstReportBean> gstSaleReportBetweenTwoDates(Date adate, Date bdate)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<GstReportBean> catList = null;
		try {
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			String qty = "0";
			Query query2 = session.createSQLQuery("select ccb.Date, ccb.BillNo, ccb.ItemName, ccb.SalePrice, ccb.Quantity, ccb.Gst, ccb.Igst, ccb.HsnSacNo, ccb.Discount, ccb.TaxAmount, ccb.totalperitem from creditcustomerbill ccb where (date BETWEEN :adate AND :bdate) AND Quantity > 0 UNION ALL SELECT cb.Date, cb.BillNo, cb.ItemName, cb.SalePrice, cb.Quantity, cb.Gst, cb.Igst, cb.HsnSacNo, cb.Discount, cb.TaxAmount, cb.totalperitem from customerbill cb where (date BETWEEN :adate AND :bdate) AND Quantity > 0 UNION ALL SELECT ob.Date, ob.BillNo, ob.ItemName, ob.SalePrice, ob.Quantity, ob.Gst, ob.Igst, ob.HsnSacNo, ob.Discount, ob.TaxAmount, ob.totalperitem from otherbill ob where (date BETWEEN :adate AND :bdate) AND Quantity > 0");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			//query2.setParameter("qty", qty);
			List<Object[]> list = query2.list();
			catList = new ArrayList<GstReportBean>(0);

			for (Object[] object : list) {
				k++;
				GstReportBean reports = new GstReportBean();
				DecimalFormat f = new DecimalFormat("##.00");
				reports.setSerialnumber(k);
				reports.setFetchDate(object[0].toString());
				reports.setBillNo(object[1].toString());
				reports.setItemName(object[2].toString());
				String sp = f.format(object[3]);
				System.out.println("sp =============> "+sp);
				reports.setBuyPrice(Double.parseDouble(sp));
				reports.setQuantity(Double.parseDouble(object[4].toString()));
				reports.setHsnsacno(object[7].toString());
				reports.setDiscountAmt(object[8].toString());

				Double qunti = Double.parseDouble(object[4].toString());
				Double byPrice = Double.parseDouble(sp);
				Double total = byPrice * qunti;
				System.out.println("qunti =============> "+qunti);
				System.out.println("byPrice =============> "+byPrice);
				System.out.println("TOTAL AMOUNT =============> "+total);
				reports.setTotal(Double.parseDouble(f.format(total)));
				Double gstTaxPer = Double.parseDouble(object[5].toString());
				Double iGstTaxPer = Double.parseDouble(object[6].toString());
				System.out.println("gstTaxPer" + gstTaxPer);
				System.out.println("iGstTaxPer" + iGstTaxPer);
				
				reports.setVat(gstTaxPer);
				reports.setIgst(iGstTaxPer);
				reports.setTotalTaxAmount(Double.parseDouble(object[9].toString()));
				reports.setNetAmount(Double.parseDouble(object[10].toString()));

				/*if(gsttaxAmt.equals("5.0"))
				{
					Double tx = Double.parseDouble(gsttaxAmt);
					Double taxAmt = (tx / 100) * (byPrice);
					Double totalTaxAmount = qunti * taxAmt;
					Double newSalePrice = byPrice + taxAmt;
					Double totalAmount = qunti * newSalePrice;
					reports.setFivePercentageGST((double) Math.round(taxAmt));
					reports.setTwelwePercentageGST(0.0);
					reports.setEighteenPercentageGST(0.0);
					reports.setTwentyEightPercentageGST(0.0);
					reports.setiGSTFivePercentage(0.0);
					reports.setiGSTTwelwePercentage(0.0);
					reports.setiGSTEighteenPercentage(0.0);
					reports.setiGSTTwentyeightPercentage(0.0);
					reports.setTotalTaxAmount((double) Math.round(totalTaxAmount));
					reports.setNetAmount((double) Math.round(totalAmount));
					System.out.println("5 % GST Amount" + taxAmt);
				}
				else if (gsttaxAmt.equals("12.0"))
				{
					Double tx = Double.parseDouble(gsttaxAmt);
					Double taxAmt = (tx / 100) * (byPrice);
					Double totalTaxAmount = qunti * taxAmt;
					Double newSalePrice = byPrice + taxAmt;
					Double totalAmount = qunti * newSalePrice;
					reports.setFivePercentageGST(0.0);
					reports.setTwelwePercentageGST((double) Math.round(taxAmt));
					reports.setEighteenPercentageGST(0.0);
					reports.setTwentyEightPercentageGST(0.0);
					reports.setiGSTFivePercentage(0.0);
					reports.setiGSTTwelwePercentage(0.0);
					reports.setiGSTEighteenPercentage(0.0);
					reports.setiGSTTwentyeightPercentage(0.0);
					reports.setTotalTaxAmount((double) Math.round(totalTaxAmount));
					reports.setNetAmount((double) Math.round(totalAmount));
					System.out.println("5 % GST Amount" + taxAmt);

				} else if (gsttaxAmt.equals("18.0")) {
					Double tx = Double.parseDouble(gsttaxAmt);
					Double taxAmt = (tx / 100) * (byPrice);
					Double totalTaxAmount = qunti * taxAmt;
					Double newSalePrice = byPrice + taxAmt;
					Double totalAmount = qunti * newSalePrice;
					reports.setFivePercentageGST(0.0);
					reports.setTwelwePercentageGST(0.0);
					reports.setEighteenPercentageGST((double) Math.round(taxAmt));
					reports.setTwentyEightPercentageGST(0.0);
					reports.setiGSTFivePercentage(0.0);
					reports.setiGSTTwelwePercentage(0.0);
					reports.setiGSTEighteenPercentage(0.0);
					reports.setiGSTTwentyeightPercentage(0.0);
					reports.setTotalTaxAmount((double) Math.round(totalTaxAmount));
					reports.setNetAmount((double) Math.round(totalAmount));
					System.out.println("5 % GST Amount" + taxAmt);

				} else if (gsttaxAmt.equals("28.0")) {
					Double tx = Double.parseDouble(gsttaxAmt);
					Double taxAmt = (tx / 100) * (byPrice);
					Double totalTaxAmount = qunti * taxAmt;
					Double newSalePrice = byPrice + taxAmt;
					Double totalAmount = qunti * newSalePrice;
					reports.setFivePercentageGST(0.0);
					reports.setTwelwePercentageGST(0.0);
					reports.setEighteenPercentageGST(0.0);
					reports.setTwentyEightPercentageGST((double) Math.round(taxAmt));
					reports.setiGSTFivePercentage(0.0);
					reports.setiGSTTwelwePercentage(0.0);
					reports.setiGSTEighteenPercentage(0.0);
					reports.setiGSTTwentyeightPercentage(0.0);
					reports.setTotalTaxAmount((double) Math.round(totalTaxAmount));
					reports.setNetAmount((double) Math.round(totalAmount));
					System.out.println("5 % GST Amount" + taxAmt);

				}

				if (igsttaxAmt.equals("5.0")) {
					Double tx = Double.parseDouble(igsttaxAmt);
					Double taxAmt = (tx / 100) * (byPrice);
					Double totalTaxAmount = qunti * taxAmt;
					Double newSalePrice = byPrice + taxAmt;
					Double totalAmount = qunti * newSalePrice;
					reports.setiGSTFivePercentage((double) Math.round(taxAmt));
					reports.setiGSTTwelwePercentage(0.0);
					reports.setiGSTEighteenPercentage(0.0);
					reports.setiGSTTwentyeightPercentage(0.0);
					reports.setFivePercentageGST(0.0);
					reports.setTwelwePercentageGST(0.0);
					reports.setEighteenPercentageGST(0.0);
					reports.setTwentyEightPercentageGST(0.0);
					reports.setTotalTaxAmount((double) Math.round(totalTaxAmount));
					reports.setNetAmount((double) Math.round(totalAmount));
					System.out.println("5 % GST Amount" + taxAmt);
				} else if (igsttaxAmt.equals("12.0")) {
					Double tx = Double.parseDouble(igsttaxAmt);
					Double taxAmt = (tx / 100) * (byPrice);
					Double totalTaxAmount = qunti * taxAmt;
					Double newSalePrice = byPrice + taxAmt;
					Double totalAmount = qunti * newSalePrice;
					reports.setiGSTFivePercentage(0.0);
					reports.setiGSTTwelwePercentage((double) Math.round(taxAmt));
					reports.setiGSTEighteenPercentage(0.0);
					reports.setiGSTTwentyeightPercentage(0.0);
					reports.setFivePercentageGST(0.0);
					reports.setTwelwePercentageGST(0.0);
					reports.setEighteenPercentageGST(0.0);
					reports.setTwentyEightPercentageGST(0.0);
					reports.setTotalTaxAmount((double) Math.round(totalTaxAmount));
					reports.setNetAmount((double) Math.round(totalAmount));
					System.out.println("5 % GST Amount" + taxAmt);

				} else if (igsttaxAmt.equals("18.0")) {
					Double tx = Double.parseDouble(igsttaxAmt);
					Double taxAmt = (tx / 100) * (byPrice);
					Double totalTaxAmount = qunti * taxAmt;
					Double newSalePrice = byPrice + taxAmt;
					Double totalAmount = qunti * newSalePrice;
					reports.setiGSTFivePercentage(0.0);
					reports.setiGSTTwelwePercentage(0.0);
					reports.setiGSTEighteenPercentage((double) Math.round(taxAmt));
					reports.setiGSTTwentyeightPercentage(0.0);
					reports.setFivePercentageGST(0.0);
					reports.setTwelwePercentageGST(0.0);
					reports.setEighteenPercentageGST(0.0);
					reports.setTwentyEightPercentageGST(0.0);
					reports.setTotalTaxAmount((double) Math.round(totalTaxAmount));
					reports.setNetAmount((double) Math.round(totalAmount));
					System.out.println("5 % GST Amount" + taxAmt);

				} else if (igsttaxAmt.equals("28.0")) {
					Double tx = Double.parseDouble(igsttaxAmt);
					Double taxAmt = (tx / 100) * (byPrice);
					Double totalTaxAmount = qunti * taxAmt;
					Double newSalePrice = byPrice + taxAmt;
					Double totalAmount = qunti * newSalePrice;
					reports.setiGSTFivePercentage(0.0);
					reports.setiGSTTwelwePercentage(0.0);
					reports.setiGSTEighteenPercentage(0.0);
					reports.setiGSTTwentyeightPercentage((double) Math.round(taxAmt));
					reports.setFivePercentageGST(0.0);
					reports.setTwelwePercentageGST(0.0);
					reports.setEighteenPercentageGST(0.0);
					reports.setTwentyEightPercentageGST(0.0);
					reports.setTotalTaxAmount((double) Math.round(totalTaxAmount));
					reports.setNetAmount((double) Math.round(totalAmount));
					System.out.println("5 % GST Amount" + taxAmt);

				}
				if (gsttaxAmt.equals("0.0") && igsttaxAmt.equals("0.0")) {

					Double totalAmount = qunti * byPrice;
					reports.setiGSTFivePercentage(0.0);
					reports.setiGSTTwelwePercentage(0.0);
					reports.setiGSTEighteenPercentage(0.0);
					reports.setiGSTTwentyeightPercentage(0.0);
					reports.setFivePercentageGST(0.0);
					reports.setTwelwePercentageGST(0.0);
					reports.setEighteenPercentageGST(0.0);
					reports.setTwentyEightPercentageGST(0.0);
					reports.setTotalTaxAmount(0.0);
					reports.setNetAmount((double) Math.round(totalAmount));

				}*/
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// Single Date Sale Report
	public List<SaleReport> singleDateSaleReport(Date adate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.totalperitem, s.Discount, s.Quantity, s.TaxAmount, s.Gst, s.Igst from customerbill s where s.Date =:adate UNION select o.BillNo, o.BarcodeNo, o.ItemName, o.CategoryName, o.SalePrice, o.totalperitem, o.Discount, o.Quantity, o.TaxAmount, o.Gst, o.Igst from otherbill o where o.Date =:adate UNION select c.BillNo, c.BarcodeNo, c.ItemName, c.CategoryName, c.SalePrice, c.totalperitem, c.Discount, c.Quantity, c.TaxAmount, c.Gst, c.Igst from creditcustomerbill c where c.Date =:adate");
			query2.setParameter("adate", adate);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {
				System.out.println("kjhhv " + Arrays.toString(object));
				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())));
				reports.setDiscount((double) Math.round(Double.parseDouble(object[6].toString())));
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				reports.setTaxAmount(Double.parseDouble(object[8].toString()));
				String gst = object[9].toString();
				String igst = object[10].toString();
				if (gst.equals("0.0")) {
					reports.setGst(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setGst(Double.parseDouble(gst));
				}
				double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[8].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal));
				reports.setTotalAmt((double) Math.round(totalAmt));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// Two Date Sale Report
	public List<SaleReport> twoDateSaleReport(Date adate, Date bdate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date dateobj = new Date();
			System.out.println(df.format(dateobj));
			String newDate = df.format(adate);
			String newDate1 = df.format(bdate);
			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.totalperitem, s.Discount, s.Quantity, s.TaxAmount, s.Gst, s.Igst from customerbill s where s.Date BETWEEN :newDate AND :newDate1 UNION select o.BillNo, o.BarcodeNo, o.ItemName, o.CategoryName, o.SalePrice, o.totalperitem, o.Discount, o.Quantity, o.TaxAmount, o.Gst, o.Igst from otherbill o where o.Date BETWEEN :newDate AND :newDate1 UNION select c.BillNo, c.BarcodeNo, c.ItemName, c.CategoryName, c.SalePrice, c.totalperitem, c.Discount, c.Quantity, c.TaxAmount, c.Gst, c.Igst from creditcustomerbill c where c.Date BETWEEN :newDate AND :newDate1");
			query2.setParameter("newDate", newDate);
			query2.setParameter("newDate1", newDate1);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {
				System.out.println("kjhhv " + Arrays.toString(object));
				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())));
				reports.setDiscount((double) Math.round(Double.parseDouble(object[6].toString())));
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				reports.setTaxAmount(Double.parseDouble(object[8].toString()));
				String gst = object[9].toString();
				String igst = object[10].toString();
				if (gst.equals("0.0")) {
					reports.setGst(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setGst(Double.parseDouble(gst));
				}
				double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[8].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal));
				reports.setTotalAmt((double) Math.round(totalAmt));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// Category Wise Sale Report
	public List<SaleReport> categorySaleWise(String catName) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.totalperitem, s.Discount, s.Quantity, s.TaxAmount, s.Gst, s.Igst from customerbill s where s.CategoryName =:catName UNION select o.BillNo, o.BarcodeNo, o.ItemName, o.CategoryName, o.SalePrice, o.totalperitem, o.Discount, o.Quantity, o.TaxAmount, o.Gst, o.Igst from otherbill o where o.CategoryName =:catName UNION select c.BillNo, c.BarcodeNo, c.ItemName, c.CategoryName, c.SalePrice, c.totalperitem, c.Discount, c.Quantity, c.TaxAmount, c.Gst, c.Igst from creditcustomerbill c where c.CategoryName =:catName");
			query2.setParameter("catName", catName);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {
				System.out.println("kjhhv " + Arrays.toString(object));
				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setBarcodeNo(Long.parseLong(object[1].toString()));
				reports.setItemName(object[2].toString());
				reports.setCategoryName(object[3].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[4].toString())));
				reports.setDiscount((double) Math.round(Double.parseDouble(object[6].toString())));
				reports.setQuantity(Double.parseDouble(object[7].toString()));
				reports.setTaxAmount(Double.parseDouble(object[8].toString()));
				String gst = object[9].toString();
				String igst = object[10].toString();
				if (gst.equals("0.0")) {
					reports.setGst(Double.parseDouble(igst));
				}
				if (igst.equals("0.0")) {
					reports.setGst(Double.parseDouble(gst));
				}
				double quan = Double.parseDouble(object[7].toString());
				double saleP = Double.parseDouble(object[4].toString());
				double taxAmt = Double.parseDouble(object[8].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal));
				reports.setTotalAmt((double) Math.round(totalAmt));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// Single Date Vehicle Customer Sale Report
	public List<SaleReport> vehicleSingleDate(Date adate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.CarNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.OwnerName, s.ContactNo, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount from customerbill s where s.Date =:adate");
			query2.setParameter("adate", adate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setCarNo(object[1].toString());
				reports.setBarcodeNo(Long.parseLong(object[2].toString()));
				reports.setItemName(object[3].toString());
				reports.setCategoryName(object[4].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[5].toString())));
				reports.setOwnerName(object[6].toString());
				reports.setContactNo(Long.parseLong(object[7].toString()));
				reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())));
				reports.setQuantity(Double.parseDouble(object[10].toString()));
				reports.setGst(Double.parseDouble(object[11].toString()));
				reports.setTaxAmount(Double.parseDouble(object[12].toString()));
				double quan = Double.parseDouble(object[10].toString());
				double saleP = Double.parseDouble(object[5].toString());
				double taxAmt = Double.parseDouble(object[12].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal));
				reports.setTotalAmt((double) Math.round(totalAmt));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// get Two date Vehicle customer Sale
	public List<SaleReport> vehicleTwoDate(Date adate, Date bdate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.CarNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.OwnerName, s.ContactNo, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount from customerbill s where s.Date BETWEEN :adate AND :bdate");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setCarNo(object[1].toString());
				reports.setBarcodeNo(Long.parseLong(object[2].toString()));
				reports.setItemName(object[3].toString());
				reports.setCategoryName(object[4].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[5].toString())));
				reports.setOwnerName(object[6].toString());
				reports.setContactNo(Long.parseLong(object[7].toString()));
				reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())));
				reports.setQuantity(Double.parseDouble(object[10].toString()));
				reports.setGst(Double.parseDouble(object[11].toString()));
				reports.setTaxAmount(Double.parseDouble(object[12].toString()));
				double quan = Double.parseDouble(object[10].toString());
				double saleP = Double.parseDouble(object[5].toString());
				double taxAmt = Double.parseDouble(object[12].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal));
				reports.setTotalAmt((double) Math.round(totalAmt));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// get Category Wise Vehicle customer Sale
	public List<SaleReport> categorySaleWiseCustomer(String catId) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.CarNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.OwnerName, s.ContactNo, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount from customerbill s where s.CategoryName =:catId");
			query2.setParameter("catId", catId);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setCarNo(object[1].toString());
				reports.setBarcodeNo(Long.parseLong(object[2].toString()));
				reports.setItemName(object[3].toString());
				reports.setCategoryName(object[4].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[5].toString())));
				reports.setOwnerName(object[6].toString());
				reports.setContactNo(Long.parseLong(object[7].toString()));
				reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())));
				reports.setQuantity(Double.parseDouble(object[10].toString()));
				reports.setGst(Double.parseDouble(object[11].toString()));
				reports.setTaxAmount(Double.parseDouble(object[12].toString()));
				double quan = Double.parseDouble(object[10].toString());
				double saleP = Double.parseDouble(object[5].toString());
				double taxAmt = Double.parseDouble(object[12].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal));
				reports.setTotalAmt((double) Math.round(totalAmt));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// get Category Wise Vehicle customer Sale
	public List<SaleReport> billnowiseVehiclesell(String billNo) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long billno = Long.parseLong(billNo);
			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.CarNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.OwnerName, s.ContactNo, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount from customerbill s where s.BillNo =:billno");
			query2.setParameter("billno", billno);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setCarNo(object[1].toString());
				reports.setBarcodeNo(Long.parseLong(object[2].toString()));
				reports.setItemName(object[3].toString());
				reports.setCategoryName(object[4].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[5].toString())));
				reports.setOwnerName(object[6].toString());
				reports.setContactNo(Long.parseLong(object[7].toString()));
				reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())));
				reports.setQuantity(Double.parseDouble(object[10].toString()));
				reports.setGst(Double.parseDouble(object[11].toString()));
				reports.setTaxAmount(Double.parseDouble(object[12].toString()));
				double quan = Double.parseDouble(object[10].toString());
				double saleP = Double.parseDouble(object[5].toString());
				double taxAmt = Double.parseDouble(object[12].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal));
				reports.setTotalAmt((double) Math.round(totalAmt));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	// get Barcode Wise Vehicle customer Sale
	public List<SaleReport> barcodewiseVehicleSale(String barcodeVehicle) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<SaleReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long barno = Long.parseLong(barcodeVehicle);
			Long k = 0l;
			Query query2 = session.createSQLQuery("select s.BillNo, s.CarNo, s.BarcodeNo, s.ItemName, s.CategoryName, s.SalePrice, s.OwnerName, s.ContactNo, s.TotalAmount, s.Discount, s.Quantity, s.Gst, s.TaxAmount from customerbill s where s.BarcodeNo =:barno");
			query2.setParameter("barno", barno);

			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list) {

				SaleReport reports = new SaleReport();
				k++;
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				reports.setCarNo(object[1].toString());
				reports.setBarcodeNo(Long.parseLong(object[2].toString()));
				reports.setItemName(object[3].toString());
				reports.setCategoryName(object[4].toString());
				reports.setSalePrice((double) Math.round(Double.parseDouble(object[5].toString())));
				reports.setOwnerName(object[6].toString());
				reports.setContactNo(Long.parseLong(object[7].toString()));
				reports.setDiscount((double) Math.round(Double.parseDouble(object[9].toString())));
				reports.setQuantity(Double.parseDouble(object[10].toString()));
				reports.setGst(Double.parseDouble(object[11].toString()));
				reports.setTaxAmount(Double.parseDouble(object[12].toString()));
				double quan = Double.parseDouble(object[10].toString());
				double saleP = Double.parseDouble(object[5].toString());
				double taxAmt = Double.parseDouble(object[12].toString());
				double saleTotal = quan * saleP;
				double totalAmt = saleTotal + taxAmt;
				reports.setTotalperItem((double) Math.round(saleTotal));
				reports.setTotalAmt((double) Math.round(totalAmt));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	public List getSaleItemByBillNoForBillEditdao(String billNo, String shopId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("BillNo :: " + billNo);

			Query query = session.createSQLQuery("select s.pkOtherBillId, ct.category_name, pr.ProductName, s.BarcodeNo, s.Quantity, s.SalePrice, s.mobile_No, (s.SalePrice - s.Discount), s.Discount, s.GrossTotal, s.Date, s.size, s.TaxAmount, s.Gst, s.Igst, s.perProductdisPer, s.taxAmtAfterDiscount, CONCAT(s.FkSaleEmployeeId, ' ', s.employee_Name), s.pkOtherBillId, s.credit_Customer_Name, s.mobile_No, s.payment_mode, cashCard_cashAmount, cashCard_cardAmount, totalSaleReturnAmt, TotalAmount, totalperitem, s.SalePWithoutTax,s.cashupi_cashAmount,s.cashupi_upiAmount, s.fkShopId from otherbill s JOIN categories ct on s.fkCatId = ct.pk_category_id JOIN sub_categories sb ON s.fkSubCatId = sb.pk_subcat_id JOIN product_reg pr ON s.fkProductId = pr.pkProductNameId where s.BillNo = :billNo AND s.fkShopId = :shopId");
			query.setParameter("billNo", billNo);
			query.setParameter("shopId", shopId);
			list = query.list();

		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	public List getSaleItemByBillNoForBillEditCreditCustDao(String billNo, String shopId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("BillNo :: " + billNo);

			Query query = session.createSQLQuery("select s.pkCrediBillId, s.CategoryName, s.ItemName, s.BarcodeNo, s.Quantity, s.SalePrice, s.totalperitem, s.Discount, s.GrossTotal, s.Date, s.size, s.fkCrediCustId, s.BillNo, s.Gst, s.Igst, s.TaxAmount, s.taxAmtAfterDiscount, s.perProductdisPer, CONCAT(s.FkSaleEmployeeId, ' ', s.EmpName), s.payment_mode, s.cashCard_cashAmount, s.cashCard_cardAmount, s.totalSaleReturnAmt, s.SalePWithoutTax, TotalAmount,cashupi_cashAmunt,cashupi_UpiAmount, s.fkShopId from creditcustomerbill s where s.BillNo = :billNo and s.Quantity>0 AND s.fkShopId = :shopId");
			query.setParameter("billNo", billNo);
			query.setParameter("shopId", shopId);

			list = query.list();

		}
		catch (Exception e)
		{
			e.printStackTrace();
			// TODO: handle exception
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
	
public List<SaleReport> paymentModeWiseReportDao(String adate, String bdate, String paymentMode, String userTypeRole, String userName)
{		
		System.out.println("adate DAO =========> "+adate);
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
				query2 = session.createSQLQuery("select o.BillNo, o.GrossTotal, o.payment_mode, credit_Customer_Name, cashCard_cashAmount, cashCard_cardAmount, o.Date, totalSaleReturnAmt from otherbill o where o.payment_mode = :paymentMode AND o.Date BETWEEN :adate AND :bdate GROUP BY o.BillNo;");
			}
			else
			{
				query2 = session.createSQLQuery("select o.BillNo, o.GrossTotal, o.payment_mode, credit_Customer_Name, cashCard_cashAmount, cashCard_cardAmount, o.Date, totalSaleReturnAmt from otherbill o where o.payment_mode='"+paymentMode+"' AND o.Date BETWEEN '"+adate+"' AND '"+bdate+"' AND EmpType != 'admin' GROUP BY o.BillNo;");
			}

			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			query2.setParameter("paymentMode", paymentMode);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleReport>(0);

			for (Object[] object : list)
			{

				SaleReport reports = new SaleReport();
				
			 {
				reports.setSrNo(k);
				reports.setBillNo(object[0].toString());
				
				reports.setPaymentMode(object[2].toString());
				
				if(object[3] == null || object[3].toString().isEmpty())
				{
					reports.setCustomerName("N/A");
				}
				else
				{
					reports.setCustomerName(object[3].toString());
				}
				
				reports.setCashAndCard_cashAmount(object[4].toString());
				reports.setCashAndCard_cardAmount(object[5].toString());
				reports.setSaleDate(object[6].toString());
				reports.setGrossamt(Double.parseDouble(object[4].toString()) + Double.parseDouble(object[5].toString()) + Double.parseDouble(object[7].toString()));
				reports.setTotalSaleReturnAmt(object[7].toString());
				
				k++;
			}
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List<SaleReport> paymentModeRangeWiseReportDao(String adate, String bdate)
	{		
			System.out.println("adate DAO =========> "+adate);
			// TODO Auto-generated method stub
			HibernateUtility hbu = null;
			Session session = null;
			List<SaleReport> catList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Long k = 1l;
				Double total = 0.0;
				Double discount = 0.0;
				Double grossAmt = 0.0;
				Query query2 = session.createSQLQuery("select SUM(o.cashCard_cashAmount), SUM(o.cashCard_cardAmount) from otherbill o where o.Quantity > 0 AND o.Date BETWEEN '"+adate+"' AND '"+bdate+"'");
				
				List<Object[]> list = query2.list();
				catList = new ArrayList<SaleReport>(0);
	
				for (Object[] object : list)
				{	
					SaleReport reports = new SaleReport();					
					reports.setSrNo(k);
					reports.setTotalCashAndCard_cashAmount(object[0].toString());
					reports.setTotalCashAndCard_cardAmount(object[1].toString());					
					k++;
					catList.add(reports);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return catList;
	}
	
	
	
	
	public List<CustomerBean> getAllItemDetails11(String key, String productId, String barcodeNo, String shopId,String Tempbillid)
	{
		System.out.println("key ====> "+key);
		System.out.println("productId ====> "+productId);
		System.out.println("shopId ====> "+shopId);
		System.out.println("Temp bill no ====> "+Tempbillid);
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		List<CategoryWisePurchase> categoryBean = null;
		List<CustomerBean> itemlist = null;
		double spWTax = 0d;
		double disPer = 0d;
		double spAfterDis = 0d;
		DecimalFormat df = new DecimalFormat("#.##");
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			if(Tempbillid != null)
			{
				System.out.println("inside tempid");
				
				//String sqlQuery = "SELECT tc.ItemName,tc.fk_goodrecive_id,tc.CategoryName,tc.BarcodeNo,tc.HsnSacNo,tc.Gst,tc.lgst,tc.size,gr.Quantity,tc.SalePrice,tc.rollsize,tc.sub_categoryName,(tc.rollsize * gr.Quantity),tc.salepWithoutTax,tc.Discount,tc.fkCatId,tc.fksubCatId,tc.fkProductId,tc.style,tc.fksuppid,tc.fkshopId,tc.BillNo,tc.pktempBillId FROM tempcredit_invoice tc JOIN goodreceive gr on tc.fk_goodrecive_id=gr.PkGoodRecId WHERE tc.BillNo= "+Tempbillid+" AND gr.fkShopId = "+shopId+" and tc.fk_credit_cust_bill IS NULL";
				
				//String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, bns.barcode_no, bns.quantity, gr.fkShopId FROM barcode_number_wise_stock_details bns JOIN goodreceive gr ON bns.barcode_no = gr.BarcodeNo JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE bns.quantity > 0 AND bns.barcode_no = "+key+" AND bns.fk_shop_id = "+shopId;
				
				//String sqlQuery = "SELECT tc.ItemName,tc.fk_goodrecive_id,tc.CategoryName,tc.BarcodeNo,tc.HsnSacNo,tc.Gst,tc.lgst,tc.size,gr.Quantity,tc.SalePrice,tc.rollsize,tc.sub_categoryName,(tc.rollsize * gr.Quantity),tc.salepWithoutTax,tc.Discount,tc.fkCatId,tc.fksubCatId,tc.fkProductId,tc.style,tc.fksuppid,tc.fkshopId,tc.BillNo,tc.pktempBillId, bns.barcode_no, bns.quantity FROM tempcredit_invoice tc JOIN goodreceive gr on tc.fk_goodrecive_id=gr.PkGoodRecId JOIN barcode_number_wise_stock_details bns ON bns.barcode_no = gr.BarcodeNo WHERE tc.BillNo= "+Tempbillid+" AND bns.quantity > 0 AND gr.fkShopId = "+shopId+" AND tc.fk_credit_cust_bill IS NULL";
				
				//String sqlQuery = "SELECT tc.ItemName, tc.fk_goodrecive_id, tc.CategoryName, tc.BarcodeNo, tc.HsnSacNo, tc.Gst, tc.lgst, tc.size, gr.Quantity, tc.SalePrice, tc.rollsize, tc.sub_categoryName,(tc.rollsize * gr.Quantity),tc.salepWithoutTax,tc.Discount,tc.fkCatId,tc.fksubCatId,tc.fkProductId,tc.style,tc.fksuppid,tc.fkshopId,tc.BillNo,tc.pktempBillId,tc.Quantity, bns.barcode_no, bns.quantity FROM tempcredit_invoice tc JOIN goodreceive gr on tc.fk_goodrecive_id=gr.PkGoodRecId JOIN barcode_number_wise_stock_details bns ON bns.barcode_no = gr.BarcodeNo WHERE tc.BillNo= "+Tempbillid+" AND bns.quantity > 0 AND gr.fkShopId = "+shopId+" AND tc.fk_credit_cust_bill IS NULL";
				
				//String sqlQuery = "
				/*SELECT tc.ItemName, tc.fk_goodrecive_id, tc.CategoryName, tc.BarcodeNo, tc.HsnSacNo, tc.Gst, tc.lgst, tc.size, gr.Quantity, tc.SalePrice,
				tc.rollsize, tc.sub_categoryName,(tc.rollsize * gr.Quantity),tc.salepWithoutTax,tc.Discount,tc.fkCatId,tc.fksubCatId,tc.fkProductId,tc.style,
				tc.fksuppid,tc.fkshopId,tc.BillNo,tc.pktempBillId,tc.Quantity, bns.barcode_no, bns.quantity FROM tempcredit_invoice tc JOIN 
				goodreceive gr on tc.fk_goodrecive_id=gr.PkGoodRecId JOIN barcode_number_wise_stock_details bns ON bns.barcode_no = gr.BarcodeNo
				WHERE tc.BillNo= "+Tempbillid+" AND bns.quantity > 0 AND gr.fkShopId = "+shopId+" AND tc.fk_credit_cust_bill IS NULL";*/
				
				
				String sqlQuery = "SELECT tc.BillNo, tc.pktempBillId, tc.fk_goodrecive_id, tc.BarcodeNo, tc.fkCatId, tc.CategoryName, tc.fksubCatId, tc.sub_categoryName ,tc.fkProductId, tc.ItemName, tc.Quantity, tc.style, tc.HsnSacNo, tc.rollsize, bns.barcode_number_wise_stock_quantity, tc.size, gr.Quantity, bns.barcode_no, tc.SalePrice, tc.salepWithoutTax, tc.perProductdistper, tc.Discount, tc.spAfterDis, tc.Gst, tc.lgst, tc.TaxAmount, tc.totalperitem, tc.TotalAmount, tc.GrossTotal, tc.fksuppid, fksaleEmployeeid, EmpName,  tc.fkshopId FROM tempcredit_invoice tc JOIN goodreceive gr on tc.fk_goodrecive_id=gr.PkGoodRecId JOIN barcode_number_wise_stock_details bns ON bns.barcode_no = gr.BarcodeNo WHERE tc.BillNo= "+Tempbillid+" AND bns.barcode_number_wise_stock_quantity > 0 AND gr.fkShopId = "+shopId+" AND tc.fk_credit_cust_bill IS NULL";
				
				//tc.BillNo, tc.pktempBillId, tc.fk_goodrecive_id, tc.BarcodeNo, tc.fkCatId, tc.CategoryName, tc.fksubCatId, tc.sub_categoryName ,tc.fkProductId,
				//tc.ItemName, tc.style, tc.HsnSacNo, tc.rollsize, bns.quantity, tc.Quantity , tc.size, gr.Quantity, bns.barcode_no, tc.SalePrice, tc.salepWithoutTax,
				//perProductdistper, tc.Discount, tc.spAfterDis, tc.Gst, tc.lgst, tc.TotalAmount, tc.GrossTotal, tc.fksuppid, fksaleEmployeeid, EmpName,  tc.fkshopId
				
				Query query = session.createSQLQuery(sqlQuery);
				List<Object[]> list = query.list();

				itemlist = new ArrayList<CustomerBean>(0);
				for (Object[] objects : list)
				{
					
					System.out.println("Size :"+Arrays.toString(objects));
					CustomerBean bean = new CustomerBean();
					
					
					
					bean.setBillno(objects[0].toString());
					bean.setPkTempid(Long.parseLong(objects[1].toString()));
					bean.setItem_id(Long.parseLong(objects[2].toString()));
					bean.setBarcodeNo(Long.parseLong(objects[3].toString()));
					bean.setFkCategoryId(Long.parseLong(objects[4].toString()));
					bean.setCategoryName(objects[5].toString());
					bean.setFkSubCatId(Long.parseLong(objects[6].toString()));
					bean.setSubCategoryName(objects[7].toString());
					bean.setFkProductId(Long.parseLong(objects[8].toString()));
					bean.setItemName(objects[9].toString());
					bean.setQuantity(Double.parseDouble(objects[10].toString()));
					bean.setStyle(objects[11].toString());
					bean.setHsnSacNo(objects[12].toString());
					bean.setRollSize(Double.parseDouble(objects[13].toString()));
					bean.setStockQuantity(Double.parseDouble(objects[14].toString()));
					//bean.setQuantity(Double.parseDouble(objects[14].toString()));
					System.out.println("getStockQuantity :- "+bean.getStockQuantity());
					System.out.println("getQuantity :- "+bean.getQuantity());
					bean.setSize1(objects[15].toString());
					bean.setGoodReceiveQuantity(Double.parseDouble(objects[16].toString()));
					//bean.setBarcodeNo(Long.parseLong(objects[17].toString()));
					bean.setSalePrice(Double.parseDouble(objects[18].toString()));
					bean.setFixedSalePrice(Double.parseDouble(objects[18].toString()));
					bean.setsPWithoutTax(Double.parseDouble(objects[19].toString()));
					bean.setDisPerForBill(Double.parseDouble(objects[20].toString()));
					bean.setDisAmount(Double.parseDouble(objects[21].toString()));
					Double spAfterDis1 = Double.parseDouble(objects[22].toString());
					bean.setSpAfterDis(spAfterDis1.toString());
					Double gstPer = Double.parseDouble(objects[23].toString());
					Double iGstPer = Double.parseDouble(objects[24].toString());
					if(gstPer > 0)
					{
						bean.setVat(gstPer);
					} else if(iGstPer > 0)
					{
						bean.setVat(iGstPer);
					}
					bean.setTaxAmount(Double.parseDouble(objects[25].toString()));
					bean.setTaxAmountAfterDis(Double.parseDouble(objects[25].toString()));
					bean.setTotal(Double.parseDouble(objects[26].toString()));
					//bean.setTotal(Double.parseDouble(objects[27].toString()));
					bean.setGrossTotal(Double.parseDouble(objects[28].toString()));
					bean.setFkSuppId(objects[29].toString());
					//bean.setFksaleEmployeeid(Long.parseLong(objects[30].toString()));
					//bean.setEmpName(objects[31].toString());
					String empId = objects[30].toString();
					String empName = objects[31].toString();
					String empIdWithSpace = empId+" ";
					String empIdEmpName = empIdWithSpace.concat(empName);
					System.out.println("empIdEmpName :- "+empIdEmpName);
					bean.setEmpName(empIdEmpName);
					
					bean.setFkShopId(Long.parseLong(objects[32].toString()));
					
					itemlist.add(bean);

					/*Double sp = (Double.parseDouble(objects[9].toString()));
					
					spWTax = Double.parseDouble(objects[13].toString());
					disPer = Double.parseDouble(objects[14].toString());
					
					System.out.println("Size :"+Arrays.toString(objects));
					CustomerBean bean = new CustomerBean();
					
					// 1 bean.setItemName(objects[0].toString());
					// 1 bean.setItem_id(Long.parseLong(objects[1].toString()));
					// 1 bean.setCategoryName(objects[2].toString());
					// 1 bean.setQuantity(Double.parseDouble(objects[23].toString()));
					// 1 System.out.println("In Dao setQuantity :- "+bean.getQuantity());
					//bean.setBarcodeNo(Long.parseLong(objects[3].toString()));
					// 1 bean.setBarcodeNo(Long.parseLong(objects[24].toString()));
					// 1 bean.setStockQuantity(Double.parseDouble(objects[25].toString()));
					// 1 System.out.println("StockQuantity :- "+objects[24].toString());
					// 1 bean.setHsnSacNo(objects[4].toString());
					// 1 System.out.println(objects[4].toString());
					//bean.setQuantity(1d);
					// 1 bean.setSalePrice(Double.parseDouble(objects[9].toString()));
					// 1 bean.setFixedSalePrice(Double.parseDouble(objects[9].toString()));

					// 1 Double gstPer = Double.parseDouble(objects[5].toString());
					// 1 Double iGstPer = Double.parseDouble(objects[6].toString());
					
					// 1 bean.setSize1(objects[7].toString());
					
					// 1 bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
						
					// 1 bean.setRollSize(Double.parseDouble(objects[10].toString()));
					// 1 bean.setSubCategoryName(objects[11].toString());
					bean.setMtrQuantity(Double.parseDouble(objects[12].toString()));
					//bean.setsPWithoutTax(Double.parseDouble((objects[13].toString())));
					//bean.setDisPerForBill(0.0);
					// 1 bean.setDisPerForBill(Double.parseDouble(objects[14].toString()));
									
					if(disPer > 0)
					{								
						if(spWTax > 0 && spWTax <= 1000)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
						}
						else if(spWTax > 1000)
						{
							System.out.println("(spWTax > 1000) =====> "+spWTax);
							
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							bean.setSpAfterDis("0");
						}					
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						double taxAmtAfterDis = 0;					
						double disAmt = (spWTax*(disPer/100));
						// 1 bean.setDisAmount(Double.parseDouble(df.format(disAmt)));					
						spAfterDis = spWTax - disAmt;

						if(gstPer > 0)
						{
							bean.setVat(gstPer);
							taxAmtAfterDis = (spAfterDis * (gstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else if(iGstPer > 0)
						{
							bean.setVat(iGstPer);
							taxAmtAfterDis = (spAfterDis * (iGstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else
						{
							bean.setTaxAmountAfterDis(0.0);
							bean.setTotal(Double.parseDouble(df.format(sp - disAmt)));
						}
					}
					else
					{						
						if(sp > 0d && sp <= 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}
						else if(sp > 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else 
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}									
						
						// 1 bean.setDisAmount(0.0);
						//bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						// 1 bean.setTaxAmountAfterDis(0.0);
						// 1 bean.setTotal(sp);
					}
					
					//bean.setSpAfterDis(df.format(spAfterDis));
					double quantity = bean.getQuantity();
					Double total = quantity * sp;
					
					// 1 bean.setFkCategoryId(Long.parseLong(objects[15].toString()));
					// 1 bean.setFkSubCatId(Long.parseLong(objects[16].toString()));
					// 1 bean.setFkProductId(Long.parseLong(objects[17].toString()));
					// 1 bean.setStyle(objects[18].toString());
					// 1 bean.setFkSuppId(objects[19].toString());
					// 1 bean.setFkShopId(Long.parseLong(objects[20].toString()));
					// 1 bean.setBillno(objects[21].toString());
					// 1 bean.setPkTempid(Long.parseLong(objects[22].toString()));
					//bean.setTotal(total);
					// 1 itemlist.add(bean);*/
					
					/*Double sp = (Double.parseDouble(objects[9].toString()));
					
					spWTax = Double.parseDouble(objects[13].toString());
					disPer = Double.parseDouble(objects[14].toString());
					
					System.out.println("Size :"+Arrays.toString(objects));
					CustomerBean bean = new CustomerBean();

					bean.setItemName(objects[0].toString());
					bean.setItem_id(Long.parseLong(objects[1].toString()));
					bean.setCategoryName(objects[2].toString());
					bean.setQuantity(Double.parseDouble(objects[23].toString()));
					System.out.println("In Dao setQuantity :- "+bean.getQuantity());
					//bean.setBarcodeNo(Long.parseLong(objects[3].toString()));
					bean.setBarcodeNo(Long.parseLong(objects[24].toString()));
					bean.setStockQuantity(Double.parseDouble(objects[25].toString()));
					System.out.println("StockQuantity :- "+objects[24].toString());
					bean.setHsnSacNo(objects[4].toString());
					System.out.println(objects[4].toString());
					//bean.setQuantity(1d);
					bean.setSalePrice(Double.parseDouble(objects[9].toString()));
					bean.setFixedSalePrice(Double.parseDouble(objects[9].toString()));

					Double gstPer = Double.parseDouble(objects[5].toString());
					Double iGstPer = Double.parseDouble(objects[6].toString());
					
					bean.setSize1(objects[7].toString());
					
					bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
						
					bean.setRollSize(Double.parseDouble(objects[10].toString()));
					bean.setSubCategoryName(objects[11].toString());
					bean.setMtrQuantity(Double.parseDouble(objects[12].toString()));
					//bean.setsPWithoutTax(Double.parseDouble((objects[13].toString())));
					//bean.setDisPerForBill(0.0);
					bean.setDisPerForBill(Double.parseDouble(objects[14].toString()));
									
					if(disPer > 0)
					{								
						if(spWTax > 0 && spWTax <= 1000)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
						}
						else if(spWTax > 1000)
						{
							System.out.println("(spWTax > 1000) =====> "+spWTax);
							
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							bean.setSpAfterDis("0");
						}					
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						double taxAmtAfterDis = 0;					
						double disAmt = (spWTax*(disPer/100));
						bean.setDisAmount(Double.parseDouble(df.format(disAmt)));					
						spAfterDis = spWTax - disAmt;

						if(gstPer > 0)
						{
							bean.setVat(gstPer);
							taxAmtAfterDis = (spAfterDis * (gstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else if(iGstPer > 0)
						{
							bean.setVat(iGstPer);
							taxAmtAfterDis = (spAfterDis * (iGstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else
						{
							bean.setTaxAmountAfterDis(0.0);
							bean.setTotal(Double.parseDouble(df.format(sp - disAmt)));
						}
					}
					else
					{						
						if(sp > 0d && sp <= 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}
						else if(sp > 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else 
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}									
						
						bean.setDisAmount(0.0);
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						bean.setTaxAmountAfterDis(0.0);
						bean.setTotal(sp);
					}
					
					bean.setSpAfterDis(df.format(spAfterDis));
					double quantity = bean.getQuantity();
					Double total = quantity * sp;
					
					bean.setFkCategoryId(Long.parseLong(objects[15].toString()));
					bean.setFkSubCatId(Long.parseLong(objects[16].toString()));
					bean.setFkProductId(Long.parseLong(objects[17].toString()));
					bean.setStyle(objects[18].toString());
					bean.setFkSuppId(objects[19].toString());
					bean.setFkShopId(Long.parseLong(objects[20].toString()));
					bean.setBillno(objects[21].toString());
					bean.setPkTempid(Long.parseLong(objects[22].toString()));
					//bean.setTotal(total);
					itemlist.add(bean);*/
				}
				
			}
			else if(key != null)
			{
				//String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId FROM goodreceive gr JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE gr.Quantity > 0 AND BarcodeNo = "+key+" AND gr.fkShopId = "+shopId;
				
				String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, bns.barcode_no, bns.barcode_number_wise_stock_quantity, gr.fkShopId FROM barcode_number_wise_stock_details bns JOIN goodreceive gr ON bns.barcode_no = gr.BarcodeNo JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE bns.barcode_number_wise_stock_quantity > 0 AND bns.barcode_no = "+key+" AND bns.fk_shop_id = "+shopId;
				
				//String sqlQuery = "SELECT pr.ProductName, gr.PkGoodRecId, ct.category_name, gr.BarcodeNo, gr.hsnsacno, gr.vat, gr.igst, gr.size, gr.Quantity, gr.SalePrice, gr.RollSize, sb.subcat_name, (RollSize * gr.Quantity), gr.salePWithoutTax, gr.discountPerForBilling, gr.fkCatId, gr.fkSubCatId, gr.fkProductId, gr.style, gr.FksuppId, gr.fkShopId FROM goodreceive gr JOIN sub_categories sb on gr.fkSubCatId = sb.pk_subcat_id JOIN categories ct on gr.fkCatId=ct.pk_category_id JOIN product_reg pr on gr.fkProductId=pr.pkProductNameId WHERE gr.Quantity > 0 AND BarcodeNo = "+key+" AND gr.fkShopId = "+shopId;
				
				Query query = session.createSQLQuery(sqlQuery);
				List<Object[]> list = query.list();

				itemlist = new ArrayList<CustomerBean>(0);
				for (Object[] objects : list)
				{				
					Double sp = (Double.parseDouble(objects[9].toString()));
					
					spWTax = Double.parseDouble(objects[13].toString());
					disPer = Double.parseDouble(objects[14].toString());
					
					System.out.println("Size :"+Arrays.toString(objects));
					CustomerBean bean = new CustomerBean();

					bean.setItemName(objects[0].toString());
					bean.setItem_id(Long.parseLong(objects[1].toString()));
					bean.setCategoryName(objects[2].toString());

					//bean.setBarcodeNo(Long.parseLong(objects[3].toString()));
					bean.setBarcodeNo(Long.parseLong(objects[20].toString()));
					bean.setStockQuantity(Double.parseDouble(objects[21].toString()));
					System.out.println("StockQuantity :- "+objects[21].toString());
					bean.setQuantity(1d);
					bean.setHsnSacNo(objects[4].toString());
					System.out.println(objects[4].toString());
					bean.setSalePrice(Double.parseDouble(objects[9].toString()));
					bean.setFixedSalePrice(Double.parseDouble(objects[9].toString()));
					//bean.setsPWithoutTax(Double.parseDouble((objects[9].toString())));
					
					/*double salePrice = 0;
					double gstPer = 0;
					double iGstPer = 0;
					salePrice = Double.parseDouble(objects[9].toString());
					System.out.println("IN DAO salePrice :- "+salePrice);
					if(salePrice <= 1000) {
						gstPer = 15;
						iGstPer = 15;
					} else {
						gstPer = 10;
						iGstPer = 10;
					}*/
					
					

					Double gstPer = Double.parseDouble(objects[5].toString());
					Double iGstPer = Double.parseDouble(objects[6].toString());
					
					bean.setSize1(objects[7].toString());
					
					bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
						
					bean.setRollSize(Double.parseDouble(objects[10].toString()));
					bean.setSubCategoryName(objects[11].toString());
					bean.setMtrQuantity(Double.parseDouble(objects[12].toString()));
					//bean.setsPWithoutTax(Double.parseDouble((objects[13].toString())));
					//bean.setDisPerForBill(0.0);
					//bean.setDisPerForBill(Double.parseDouble(objects[14].toString()));
					
					bean.setDisPerForBill(0d);
					bean.setDisAmount(0d);
					
					Double quantityTocalculateTax =  0d;
					quantityTocalculateTax = bean.getQuantity();
					Double sellingPriceToCalculateTax = quantityTocalculateTax * sp;
					Double gstPerForBarcode = 0d;
					Double taxCalcute = 0d;
					Double finalSP = 0d;
					if(sp > 0d && sp <= 1000d) {
						gstPerForBarcode = 5d;
						/*taxCalcute = (sellingPriceToCalculateTax/100)*gstPerForBarcode;
						finalSP = sellingPriceToCalculateTax + taxCalcute;
						bean.setVat(gstPerForBarcode);
						bean.setTaxAmount(taxCalcute);*/
						
						bean.setsPWithoutTax(Double.parseDouble(df.format(sp/(1+(gstPer/100)))));
						bean.setVat(gstPer);
						bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
						bean.setTaxAmountAfterDis(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
					} else {
						if(sp > 1000d) {
							gstPerForBarcode =  12d;
							/*taxCalcute = (sellingPriceToCalculateTax/100)*gstPerForBarcode;
							finalSP = sellingPriceToCalculateTax + taxCalcute;
							bean.setVat(gstPerForBarcode);
							bean.setTaxAmount(taxCalcute);*/
							
							bean.setsPWithoutTax(Double.parseDouble(df.format(sp/(1+(gstPer/100)))));
							bean.setVat(gstPer);
							bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
						}
					}
					System.out.println("gstPer :- "+gstPerForBarcode);
					
					//bean.setTaxAmountAfterDis(taxCalcute);
					//bean.setTotal(finalSP);
					bean.setTotal(sp);

					//System.out.println("disPer  :- "+disPer);
					
					/*if(disPer > 0)
					{						
						if(spWTax > 0 && spWTax <= 1000)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
						}
						else if(spWTax > 1000)
						{
							System.out.println("(spWTax > 1000) =====> "+spWTax);
							
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							bean.setSpAfterDis("0");
						}					
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						double taxAmtAfterDis = 0;					
						double disAmt = (spWTax*(disPer/100));
						bean.setDisAmount(Double.parseDouble(df.format(disAmt)));					
						spAfterDis = spWTax - disAmt;

						if(gstPer > 0)
						{
							bean.setVat(gstPer);
							taxAmtAfterDis = (spAfterDis * (gstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else if(iGstPer > 0)
						{
							bean.setVat(iGstPer);
							taxAmtAfterDis = (spAfterDis * (iGstPer/100));
							bean.setTaxAmountAfterDis(Double.parseDouble(df.format(taxAmtAfterDis)));
							bean.setTotal(Double.parseDouble(df.format((spWTax - disAmt) + taxAmtAfterDis)));
						}
						else
						{
							bean.setTaxAmountAfterDis(0.0);
							bean.setTotal(Double.parseDouble(df.format(sp - disAmt)));
						}
					}
					else
					{						
						if(sp > 0d && sp <= 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 5.0;
								//spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								//bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
								//Double taxCalcute = gstPer*100/100*sp/100;
								Double taxCalcute = (sp/100)*gstPer;
								bean.setTaxAmount(taxCalcute);
								
								System.out.println("sp 1 :- "+sp);
								System.out.println("gstPer 1 :- "+gstPer);
								System.out.println("taxCalcute 1 :- "+taxCalcute);
								
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 5.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
								
								Double taxCalcute = (sp/100)*iGstPer;
								bean.setTaxAmount(taxCalcute);
								System.out.println("taxCalcute 2 :- "+taxCalcute);
							}
							else
							{
								//gstPer = 5.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}
						else if(sp > 1000d)
						{
							if(gstPer > 0)
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
							else if(iGstPer > 0)
							{
								//iGstPer = 12.0;
								spWTax = (sp/(1+(iGstPer/100)));
								bean.setVat(iGstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(iGstPer/100))))));
							}
							else 
							{
								//gstPer = 12.0;
								spWTax = (sp/(1+(gstPer/100)));
								bean.setVat(gstPer);
								bean.setTaxAmount(Double.parseDouble(df.format(sp-(sp/(1+(gstPer/100))))));
							}
						}									
						
						bean.setDisAmount(0.0);
						bean.setsPWithoutTax(Double.parseDouble(df.format(spWTax)));
						//bean.setTaxAmountAfterDis(0.0);
						//bean.setTotal(sp);
					}*/
					
					bean.setSpAfterDis(df.format(spAfterDis));
					double quantity = bean.getQuantity();
					Double total = quantity * sp;
					
					bean.setFkCategoryId(Long.parseLong(objects[15].toString()));
					bean.setFkSubCatId(Long.parseLong(objects[16].toString()));
					bean.setFkProductId(Long.parseLong(objects[17].toString()));
					bean.setStyle(objects[18].toString());
					bean.setFkSuppId(objects[19].toString());
					bean.setFkShopId(Long.parseLong(objects[22].toString()));
					
					
					bean.setBillno("0");
					bean.setPkTempid(Long.parseLong("00"));
					//bean.setTotal(total);
					itemlist.add(bean);
				}
			}
			else
			{
				System.out.println("called === PRODUCT BY PRODUCT INFO "+productId);
				
				//String sqlQuery = "SELECT pr.ProductName, pr.pkProductNameId, ct.category_name, sb.subcat_name, pr.FkCatId, pr.fkSubCategoryId, pr.fkShopId FROM product_reg pr JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id WHERE pr.pkProductNameId = "+productId+" AND pr.fkShopId = "+shopId;
				
				String sqlQuery = "SELECT bns.barcode_no, bns.barcode_number_wise_stock_quantity, pr.pkProductNameId, pr.ProductName, pr.FkCatId, ct.category_name, pr.fkSubCategoryId, sb.subcat_name, gr.Quantity, pr.fkShopId  FROM barcode_number_wise_stock_details bns JOIN product_reg pr ON bns.fk_Product_Id = pr.pkProductNameId JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id JOIN goodreceive gr on bns.barcode_no = gr.BarcodeNo  WHERE bns.barcode_no = "+barcodeNo+" AND bns.fk_shop_id = "+shopId;
				
				//String sqlQuery = "SELECT pr.ProductName, pr.pkProductNameId, ct.category_name, sb.subcat_name, pr.FkCatId, pr.fkSubCategoryId, pr.fkShopId FROM product_reg pr JOIN sub_categories sb on pr.fkSubCategoryId = sb.pk_subcat_id JOIN categories ct on pr.FkCatId = ct.pk_category_id WHERE pr.pkProductNameId = "+productId+" AND pr.fkShopId = "+shopId;
				
				Query query = session.createSQLQuery(sqlQuery);
				List<Object[]> list = query.list();

				itemlist = new ArrayList<CustomerBean>(0);
				for (Object[] objects : list)
				{
					CustomerBean bean = new CustomerBean();
					
					/*bns.barcode_no, bns.quantity, pr.pkProductNameId, pr.ProductName, pr.FkCatId,
					ct.category_name, pr.fkSubCategoryId, sb.subcat_name, gr.Quantity, pr.fkShopId*/
					
					bean.setBarcodeNo(Long.parseLong(objects[0].toString()));
					bean.setStockQuantity(Double.parseDouble(objects[1].toString()));
					bean.setFkProductId(Long.parseLong(objects[2].toString()));
					bean.setItem_id(Long.parseLong(objects[2].toString()));
					bean.setItemName(objects[3].toString());
					bean.setFkCategoryId(Long.parseLong(objects[4].toString()));
					bean.setCategoryName(objects[5].toString());
					bean.setFkSubCatId(Long.parseLong(objects[6].toString()));
					bean.setSubCategoryName(objects[7].toString());
					bean.setGoodReceiveQuantity(Double.parseDouble(objects[8].toString()));
					
					bean.setHsnSacNo("NA");
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
					bean.setSpAfterDis("0");
					bean.setStyle("NA");
					bean.setFkSuppId("0");
					bean.setBillno("0");
					bean.setPkTempid(Long.parseLong("00"));
					
					bean.setFkShopId(Long.parseLong(objects[9].toString()));
					
					/*bean.setItemName(objects[0].toString());
					bean.setItem_id(Long.parseLong(objects[1].toString()));
					bean.setCategoryName(objects[2].toString());

					bean.setBarcodeNo(0l);
					bean.setHsnSacNo("NA");
					bean.setQuantity(1d);
					bean.setSalePrice(0d);
					bean.setFixedSalePrice(0d);
					
					bean.setSize1("NA");
											
					bean.setRollSize(0d);
					bean.setSubCategoryName(objects[3].toString());
					bean.setMtrQuantity(0d);
					bean.setDisPerForBill(0d);
					bean.setTaxAmount(0d);
					bean.setVat(0d);
					bean.setsPWithoutTax(0d);
					bean.setDisAmount(0d);
					bean.setTaxAmountAfterDis(0d);
					bean.setTotal(0d);
					bean.setSpAfterDis("0");
					bean.setFkCategoryId(Long.parseLong(objects[4].toString()));
					bean.setFkSubCatId(Long.parseLong(objects[5].toString()));
					bean.setFkProductId(Long.parseLong(objects[1].toString()));
					bean.setStyle("NA");
					bean.setFkSuppId("0");
					bean.setFkShopId(Long.parseLong(objects[6].toString()));
					bean.setBillno("00");
					bean.setPkTempid(Long.parseLong("00"));*/
					
					itemlist.add(bean);
				}	
			}
			
		} catch (RuntimeException e) {
			Log.error("Error in getAllItemDetails(String key)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		
		return itemlist;
	}

	public List<PurchaseReport> paymentDueDateWiseDao(Date adate, Date bdate) {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
				double rSize=0.0;
				double Qmeter = 0.0;
				double qty = 0.0;
				String Rsize=null;
				double gst = 0.0;
				double iGst = 0.0;
				double taxAmount = 0.0;
				
			Query query2 = session.createSQLQuery("select BillNo,purchaseEntryDate,labourExpense,transaportExpense,Grosstotalwithoutexpese,GrossTotal FROM goodreceive WHERE purchaseEntryDate BETWEEN :adate AND :bdate");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list)
			{
				PurchaseReport reports = new PurchaseReport();
				k++;
				
				reports.setSrno(k);
				reports.setBillNo(object[0].toString());
				reports.setDate(object[1].toString());
				reports.setLabourExpense(Double.parseDouble(object[2].toString()));
				reports.setTransaportExpense(Double.parseDouble(object[3].toString()));
				reports.setGrosstotalwithoutexpese(Double.parseDouble(object[4].toString()));
				reports.setGrossTotal(Double.parseDouble(object[5].toString()));
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
}
