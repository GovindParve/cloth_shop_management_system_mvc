package com.smt.utility;

import java.io.File;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Query;
import org.hibernate.Session;
import com.smt.bean.ClientDetails;

public class GSTReportExportToExcel
{
	
	String pattern = "yyyy-MM-dd";
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
	String todayDate = simpleDateFormat.format(new Date());
	String shopName = ClientDetails.getShopName();	
	
	public void exportSaleB2CGSTReportToExcel(HttpServletRequest request, HttpServletResponse response)
	{
		
		String fisDateB2CGST = request.getParameter("fisDateB2CGST");
		String endDateB2CGST = request.getParameter("endDateB2CGST");
		
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try
		{
			adate = format.parse(fisDateB2CGST);
			bdate = format.parse(endDateB2CGST);
		}
		catch (ParseException e1)
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		HibernateUtility hbu = null;
		Session session = null;
		Double totalTodaySaleAmt = 0.0;
		try
		{
			PrintWriter pw = new PrintWriter(new File("D:\\databackup\\SaleB2CGSTReport "+fisDateB2CGST+" TO "+endDateB2CGST+".csv"));
			StringBuilder sb = new StringBuilder();					
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long k = 1l;
			Double total = 0.0;
			Double discount = 0.0;
			Double grossAmt = 0.0;
			Query query2 = session.createSQLQuery("select BillNo, Date, ItemName, SalePrice, Quantity, Gst, SalePWithoutTax, Igst, HsnSacNo, Discount, TaxAmount from creditcustomerbill where (date BETWEEN :adate AND :bdate) AND Quantity > 0 UNION ALL SELECT BillNo, Date, ItemName, SalePrice, Quantity, Gst, SalePWithoutTax, Igst, HsnSacNo, Discount, TaxAmount from otherbill where (date BETWEEN :adate AND :bdate) AND Quantity > 0");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			System.out.println("TODAY SALE LIST ========> "+list.size());
			
			sb.append("FROM DATE "+fisDateB2CGST+" TO "+endDateB2CGST);
			sb.append("\r\n");
			sb.append("SUMMERY FOR B2C");
			sb.append(",");
			sb.append("\r\n");
			sb.append("No. of Invoices ");
			sb.append(",");
			sb.append(",");
			sb.append("");
			sb.append(",");
			sb.append(",");
			sb.append(",");
			sb.append("");	
			sb.append(",");
			sb.append("");	
			sb.append("\r\n");			
			
			sb.append(list.size());
			sb.append(",");
			sb.append(",");
			sb.append("0000");
			sb.append(",");
			sb.append(",");
			sb.append(",");
			sb.append("0000");	
			sb.append(",");
			sb.append("0000");	
			sb.append("\r\n");			
			
			sb.append("Invoice Number");
			sb.append(",");
			sb.append("Invoice Date");
			sb.append(",");
			sb.append("Invoice Value");
			sb.append(",");
			sb.append("Place Of Supply");
			sb.append(",");
			sb.append("CGST");
			sb.append(",");
			sb.append("SGST");
			sb.append(",");
			sb.append("IGST");
			sb.append(",");
			sb.append("Taxable Value");
			sb.append(",");			
		/*	
			sb.append("GST Amount");
			sb.append(",");
			sb.append("Total Per Product");
			sb.append(",");			
		*/	
			
			sb.append("\r\n");
			for (Object[] object : list)
			{						
				sb.append(object[0].toString());
				sb.append(",");
				sb.append(object[1].toString());
				sb.append(",");
				sb.append(object[3].toString());
				sb.append(",");
				sb.append("");
				sb.append(",");
				sb.append((Double.parseDouble(object[5].toString()))/2);
				sb.append(",");
				sb.append((Double.parseDouble(object[5].toString()))/2);
				sb.append(",");		
				sb.append(object[7].toString());
				sb.append(",");
				sb.append(object[6].toString());
				sb.append(",");								
				
				sb.append("\r\n");
								
				totalTodaySaleAmt = totalTodaySaleAmt+Double.parseDouble(object[9].toString());			
		
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
	
	public void exportPurchaseB2BGSTReportToExcel(HttpServletRequest request, HttpServletResponse response)
	{		
		String fisDateB2bP = request.getParameter("fisDateB2bP");
		String endDateB2bP = request.getParameter("endDateB2bP");		
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date adate = null;
		Date bdate = null;

		try
		{
			adate = format.parse(fisDateB2bP);
			bdate = format.parse(endDateB2bP);
		}
		catch (ParseException e1)
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		HibernateUtility hbu = null;
		Session session = null;
		Double totalTodaySaleAmt = 0.0;
		try
		{
			PrintWriter pw = new PrintWriter(new File("D:\\databackup\\PurchaseB2BGSTReport "+fisDateB2bP+" TO "+endDateB2bP+".csv"));
			StringBuilder sb = new StringBuilder();
			
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Long k = 1l;
			Double total = 0.0;
			Double discount = 0.0;
			Double grossAmt = 0.0;
			Query query2 = session.createSQLQuery("select g.Date, s.supplier_name, g.BillNo, s.pan_no, g.ItemName, g.BuyPrice, g.OrignalQuantity, g.vat, g.igst, g.HsnSacNo,g.RollSize, g.Discount from goodreceive g left join supplier_details s on g.FksuppId = s.supplier_id where date BETWEEN :adate AND :bdate");
			query2.setParameter("adate", adate);
			query2.setParameter("bdate", bdate);
			List<Object[]> list = query2.list();
			System.out.println("TODAY SALE LIST ========> "+list.size());
			
			sb.append("FROM DATE "+fisDateB2bP+" TO "+endDateB2bP);
			sb.append("\r\n");
			sb.append("SUMMERY FOR B2C");
			sb.append(",");
			sb.append("\r\n");
			sb.append("No. of Recipients");
			sb.append(",");
			sb.append(",");
			sb.append("No. of Invoices");
			sb.append(",");
			sb.append(",");
			sb.append("");		
			sb.append(",");
			sb.append(",");
			sb.append(",");
			sb.append(",");
			sb.append(",");
			sb.append(",");
			sb.append(",");
			sb.append("");
			sb.append(",");
			sb.append("");
			sb.append("\r\n");			
			
			sb.append(list.size());
			sb.append(",");
			sb.append(",");
			sb.append("");
			sb.append(",");
			sb.append(",");
			sb.append("");	
			sb.append(",");
			sb.append(",");
			sb.append("");	
			sb.append(",");
			sb.append(",");
			sb.append(",");
			sb.append(",");
			sb.append(",");
			sb.append("");
			sb.append(",");
			sb.append("");
			sb.append("\r\n");			
			
			sb.append("GSTIN/UIN of Recipient");
			sb.append(",");
			sb.append("Receiver Name");
			sb.append(",");
			sb.append("Invoice Number");
			sb.append(",");
			sb.append("Invoice Date");
			sb.append(",");
			sb.append("Invoice Value");
			sb.append(",");
			sb.append("Place Of Supply");
			sb.append(",");	
			sb.append("Invoice Type");
			sb.append(",");
			sb.append("CGST");
			sb.append(",");
			sb.append("SGST");
			sb.append(",");
			sb.append("IGST");
			sb.append(",");
			sb.append("Taxable Value");
			sb.append(",");
			
		/*	
			sb.append("GST Amount");
			sb.append(",");
			sb.append("Total Per Product");
			sb.append(",");			
		*/	
			
			sb.append("\r\n");
			for (Object[] object : list)
			{
				double taxPerValue = 0;
				double cGst = 0;
				double sGst = 0;
				double iGst = 0;
				double taxableValue = 0;
				
				if(Double.parseDouble(object[7].toString()) > 0)
				{
					taxPerValue = Double.parseDouble(object[7].toString());
					cGst = (Double.parseDouble(object[7].toString()) / 2);
					sGst = (Double.parseDouble(object[7].toString()) / 2);
				}
				else if(Double.parseDouble(object[8].toString()) > 0)
				{
					taxPerValue = Double.parseDouble(object[8].toString());
					iGst = Double.parseDouble(object[8].toString());
				}
				else
				{
					taxPerValue = 0;
				}
				
				double buyPrice = Double.parseDouble(object[5].toString());
				
				if(taxPerValue > 0)
				{
					taxableValue = (buyPrice - (buyPrice*(taxPerValue/100)));
				}
				else
				{
					taxableValue = (Double.parseDouble(object[5].toString()));
				}
				
				sb.append("");
				sb.append(",");
				sb.append(object[1].toString());
				sb.append(",");
				sb.append(object[2].toString());
				sb.append(",");
				sb.append(object[0].toString());
				sb.append(",");
				sb.append(object[5].toString());
				sb.append("");
				sb.append(",");		
				sb.append("");
				sb.append(",");		
				sb.append("");
				sb.append(",");		
				sb.append(cGst);
				sb.append(",");
				sb.append(sGst);
				sb.append(",");				
				sb.append(iGst);
				sb.append(",");
				sb.append(taxableValue);
				sb.append(",");
				sb.append("\r\n");
				k++;
				taxPerValue = 0;
				taxableValue = 0;
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
}
