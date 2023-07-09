package com.smt.dao;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.smt.bean.GstReportBean;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.SaleB2CReportBean;
import com.smt.bean.SaleReport;
import com.smt.utility.HibernateUtility;

public class GSTReportDAO
{
	
	public List<SaleB2CReportBean> getSaleDetailsBetweenTwoDatesB2CGSTReport(String adate, String bdate, String userTypeRole, String userName)
	{	
		//GST B2C REPORT
		
		// TODO Auto-generated method stub		
		System.out.println("adate ====> "+adate);
		System.out.println("bdate ====> "+bdate);
		System.out.println("userTypeRole ====> "+userTypeRole);
		System.out.println("userName ====> "+userName);
		
		HibernateUtility hbu = null;
		Session session = null;
		Query query2 = null;
		List<SaleB2CReportBean> catList = null;
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
				query2 = session.createSQLQuery("select o.BillNo, o.BarcodeNo, o.ItemName, ct.Category_Name, o.SalePrice, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, gr.BuyPrice, o.Date, sb.subcat_name from otherbill o join goodreceive gr on o.BarcodeNo=gr.BarcodeNo join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id where o.Date BETWEEN '"+adate+"' AND '"+bdate+"' AND o.quantity > 0 UNION ALL select ccb.BillNo, ccb.BarcodeNo, ccb.ItemName, ct.Category_Name, ccb.SalePrice, ccb.totalperitem, ccb.Discount, ccb.Quantity, ccb.SalePWithoutTax, ccb.perProductdisPer, ccb.taxAmtAfterDiscount, ccb.Gst, gr.BuyPrice, ccb.Date, sb.subcat_name from creditcustomerbill ccb join goodreceive gr on ccb.BarcodeNo=gr.BarcodeNo join categories ct on ccb.fkCatId=ct.pk_category_id JOIN sub_categories sb on ccb.fkSubCatId=sb.pk_subcat_id where ccb.Date BETWEEN '"+adate+"' AND '"+bdate+"' AND ccb.quantity > 0");
			}
			else
			{
				query2 = session.createSQLQuery("select o.BillNo, o.BarcodeNo, o.ItemName, ct.Category_Name, o.SalePrice, o.totalperitem, o.Discount, o.Quantity, o.SalePWithoutTax, o.perProductdisPer, o.taxAmtAfterDiscount, o.Gst, gr.BuyPrice, o.Date, sb.subcat_name from otherbill o join goodreceive gr on o.BarcodeNo=gr.BarcodeNo join categories ct on o.fkCatId=ct.pk_category_id JOIN sub_categories sb on o.fkSubCatId=sb.pk_subcat_id where o.Date BETWEEN '"+adate+"' AND '"+bdate+"' AND o.quantity > 0 UNION ALL select ccb.BillNo, ccb.BarcodeNo, ccb.ItemName, ct.Category_Name, ccb.SalePrice, ccb.totalperitem, ccb.Discount, ccb.Quantity, ccb.SalePWithoutTax, ccb.perProductdisPer, ccb.taxAmtAfterDiscount, ccb.Gst, gr.BuyPrice, ccb.Date, sb.subcat_name from creditcustomerbill ccb join goodreceive gr on ccb.BarcodeNo=gr.BarcodeNo join categories ct on ccb.fkCatId=ct.pk_category_id JOIN sub_categories sb on ccb.fkSubCatId=sb.pk_subcat_id where ccb.Date BETWEEN '"+adate+"' AND '"+bdate+"' AND ccb.quantity > 0 AND o.EmpType != 'admin'");
			}
			//query2.setParameter("adate", adate);
			//query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<SaleB2CReportBean>(0);
			
			System.out.println("list.size() =====> "+list.size());

			for (Object[] object : list)
			{
				SaleB2CReportBean reports = new SaleB2CReportBean();
			
				String quantity = object[10].toString();
				if (quantity.equals("0"))
				{
					continue;
				}
				else
				{
					reports.setSrNo(k);
					reports.setBillNo(Long.parseLong(object[0].toString()));
					reports.setBarcodeNo(Long.parseLong(object[1].toString()));
					reports.setItemName(object[2].toString());
					reports.setCategoryName(object[3].toString());
					DecimalFormat f = new DecimalFormat("##.00");
					String sp = f.format(object[4]);
					reports.setSalePrice(Double.parseDouble(sp));
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
					if(userTypeRole.equals("admin"))
					{
						reports.setGrBuyPriceExTax(object[12].toString());	
					}
					else
					{
						reports.setGrBuyPriceExTax("0");	
					}
	
					reports.setSaleDate(object[13].toString());
					reports.setSubCatName(object[14].toString());
					k++;
				}
				catList.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
		
	}
	
	
	
	public List<PurchaseReportBean> purchaseReportBetweenTwoDatesB2CGSTReport(Date adate, Date bdate)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReportBean> catList = null;
		try {
			Long k = 0l;
			double rSize=0.0;
			double Qmeter = 0.0;
			double qty = 0.0;
			String Rsize=null;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select g.Date, s.supplier_name, g.BillNo, s.pan_no, g.ItemName, g.BuyPrice, g.OrignalQuantity, g.vat, g.igst, g.HsnSacNo,g.RollSize, g.Discount from goodreceive g left join supplier_details s on g.FksuppId = s.supplier_id where date BETWEEN :adate AND :bdate");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReportBean>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list) {
				k++;
				PurchaseReportBean reports = new PurchaseReportBean();
				String gsttaxAmt1 = object[7].toString();
				String igsttaxAmt1 = object[8].toString();
				
				Rsize = object[10].toString();
				rSize = Double.parseDouble(object[10].toString());
				qty = Double.parseDouble(object[6].toString());
				
				String gsttaxAmt = object[7].toString();
				String igsttaxAmt = object[8].toString();
				reports.setVat(Double.parseDouble(gsttaxAmt));
				reports.setIgst(Double.parseDouble(igsttaxAmt));
				System.out.println("gsttaxAmt" + gsttaxAmt);
				System.out.println("igsttaxAmt" + igsttaxAmt);
				
				if (gsttaxAmt1.equals("0.0") && igsttaxAmt1.equals("0.0")) {
					continue;
				}
				else
				{
					reports.setSerialnumber(k);
					reports.setFetchDate(object[0].toString());
					reports.setSupplierName(object[1].toString());
					reports.setBillNo(object[2].toString());
					reports.setGstTinNo(object[3].toString());
					reports.setItemName(object[4].toString());
					reports.setBuyPrice(Double.parseDouble(object[5].toString()));
					reports.setQuantity(Double.parseDouble(object[6].toString()));
					reports.setRollSize(Double.parseDouble(object[10].toString()));
					reports.setHsnsacno(object[9].toString());

					Double qunti = Double.parseDouble(object[6].toString());
					Double byPrice = Double.parseDouble(object[5].toString());
					
					if(Rsize.equals("0.0") || Rsize.equals("1.0"))
					{
						Double total = byPrice * qunti;
						reports.setTotal(Double.parseDouble(df.format(total)));
						Double discountAmt = (total * (Double.parseDouble(object[11].toString())/100.00));
						reports.setDiscountAmount(df.format(discountAmt));
						if(Double.parseDouble(object[7].toString()) != 0.0)
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[7].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
						else
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[8].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
					}
					else
					{
						Double total = byPrice * qunti*rSize;
						reports.setTotal(Double.parseDouble(df.format(total)));
						Double discountAmt = (total * (Double.parseDouble(object[11].toString())/100.00));
						reports.setDiscountAmount(df.format(discountAmt));
						if(Double.parseDouble(object[7].toString()) != 0.0)
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[7].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
						else
						{
							Double taxAmount = ((total - discountAmt) * (Double.parseDouble(object[8].toString())/100.00));
							reports.setTotalTaxAmount(Double.parseDouble(df.format(taxAmount)));
							reports.setNetAmount(Double.parseDouble(df.format((total - discountAmt) + taxAmount)));
						}
					}
					
					/*Double total = byPrice * qunti;
					reports.setTotal(total);*/

					/*if (gsttaxAmt.equals("5.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);
					} else if (gsttaxAmt.equals("12.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					} else if (gsttaxAmt.equals("18.0")) {
						Double tx = Double.parseDouble(gsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
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
						reports.setTwentyEightPercentageGST((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					}

					if (igsttaxAmt.equals("5.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);
					} else if (igsttaxAmt.equals("12.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTEighteenPercentage(0.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					} else if (igsttaxAmt.equals("18.0")) {
						Double tx = Double.parseDouble(igsttaxAmt);
						Double taxAmt = (tx / 100) * (byPrice);
						Double totalTaxAmount = qunti * taxAmt;
						Double newSalePrice = byPrice + taxAmt;
						Double totalAmount = qunti * newSalePrice;
						reports.setiGSTFivePercentage(0.0);
						reports.setiGSTTwelwePercentage(0.0);
						reports.setiGSTEighteenPercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setiGSTTwentyeightPercentage(0.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
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
						reports.setiGSTTwentyeightPercentage((double) Math.round(taxAmt*100.0)/100.0);
						reports.setFivePercentageGST(0.0);
						reports.setTwelwePercentageGST(0.0);
						reports.setEighteenPercentageGST(0.0);
						reports.setTwentyEightPercentageGST(0.0);
						reports.setTotalTaxAmount((double) Math.round(totalTaxAmount*100.0)/100.0);
						reports.setNetAmount((double) Math.round(totalAmount*100.0)/100.0);
						System.out.println("5 % GST Amount" + taxAmt);

					}*/

					catList.add(reports);

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	

}
