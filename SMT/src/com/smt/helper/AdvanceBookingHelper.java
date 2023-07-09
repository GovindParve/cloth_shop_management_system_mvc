package com.smt.helper;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.smt.bean.AdvanceBookingBean;
import com.smt.bean.ClientDetails;
import com.smt.bean.PurchaseReportBean;
import com.smt.bean.SaleReport;
import com.smt.bean.StocktemNameBean;
import com.smt.dao.AdvanceBookingDao;
import com.smt.dao.OtherBillDao;
import com.smt.hibernate.AdvanceBookingH;
import com.smt.utility.MailThread;
import com.smt.utility.Mailer;

public class AdvanceBookingHelper
{
	AdvanceBookingDao dao = new AdvanceBookingDao();
	Mailer mailer = new Mailer();
	String supplierEmailId = "";
	public void registerAdvanceBooking(HttpServletRequest request, HttpServletResponse response)
	{
		Long bookingNo = 1l;

		System.out.println("GOOD RECEIVE HELPER");
		
		// TODO Auto-generated method stub

		AdvanceBookingH advancebooking = new AdvanceBookingH();
		Integer count = Integer.parseInt(request.getParameter("count"));
		
		String supplierId = request.getParameter("supplierId");
		supplierEmailId =  request.getParameter("supplierEmailId");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		Date bookingDate = null;
		
		try
		{
			String tdate = format.format(date);
			bookingDate = format.parse(tdate);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		System.out.println("c111111" + count);		
	
		List bList = dao.getLastBookingNo();

		for (int i = 0; i < bList.size(); i++)
		{
			AdvanceBookingBean abb = (AdvanceBookingBean) bList.get(i);
			bookingNo =  Long.parseLong(abb.getBookingNoAB());
			bookingNo++;
		}	
		
		for (int i = 0; i < count; i++)
		{
			HttpSession session3 = request.getSession();
			
			advancebooking.setSupplierId(Long.parseLong(supplierId));
			
			advancebooking.setBookingNoAB(bookingNo);
			
			advancebooking.setBookingDateAB(bookingDate);

			String shopId = request.getParameter("shopId" + i);
			advancebooking.setFkShopId(Long.parseLong(shopId));
			
			String color = request.getParameter("color" + i);
			System.out.println("Color is :++++++++++++" + color);
			advancebooking.setColor(color);

			String rollSize = request.getParameter("rollSize" + i);
			if (!"".equals(rollSize) || rollSize != null)
			{
				System.out.println("rollSize ===> "+rollSize);
				advancebooking.setRollSize(Double.parseDouble(rollSize));
			}
			else if(rollSize == null || rollSize.equalsIgnoreCase("0"))
			{
				advancebooking.setRollSize(0.0);
			}
			
			String size = request.getParameter("size"+i);
			System.out.println("Size is :++++++++++++" + size);
			advancebooking.setSize(size);
			
			String style = request.getParameter("style"+i);			
			if(style == null || style.equalsIgnoreCase("") || style.isEmpty())
			{
				advancebooking.setStyle("N/A");
			}
			else
			{
				advancebooking.setStyle(style);
			}

			String quantity = request.getParameter("quantity"+i);
			advancebooking.setQuantity(Double.parseDouble(quantity));
			
			String subCatId = request.getParameter("subCatId"+i);
			advancebooking.setSubCatId(Long.parseLong(subCatId));
			
			String productId = request.getParameter("productId"+i);
			advancebooking.setProductId(Long.parseLong(productId));
			
			String categoryId = request.getParameter("categoryId"+i);
			advancebooking.setCategoryId(Long.parseLong(categoryId));
			
			String supcode = request.getParameter("supcode");
			System.out.println("this is supplier code"+supcode);
			advancebooking.setSuppCode(supcode);
			
			dao.registerGoodReceive(advancebooking);
		}	
		
		dao.sendAdvanceBooking(bookingNo);
		
		MailThread mail = new MailThread(supplierEmailId);
		//Mailer.sendAdvanceBooking(supplierEmailId);
	}
	
	public List advanceBookingRangeHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String aBFisDate = request.getParameter("aBFisDate");
		String aBEndDate = request.getParameter("aBEndDate");
		System.out.println("aBFisDate "+aBFisDate);
		System.out.println("aBEndDate "+aBEndDate);		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		AdvanceBookingDao dao = new AdvanceBookingDao();
		List<AdvanceBookingBean> exp1List = dao.advanceBookingRangeDao(aBFisDate, aBEndDate);

		return exp1List;
	}
	
	public List advanceBookingSupplierAndRangeHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String supplierAB = request.getParameter("supplierAB");
		String aBFisDateSuppWise = request.getParameter("aBFisDateSuppWise");
		String aBEndDateSuppWise = request.getParameter("aBEndDateSuppWise");
		System.out.println("aBFisDateSuppWise "+aBFisDateSuppWise);
		System.out.println("aBEndDateSuppWise "+aBEndDateSuppWise);		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		AdvanceBookingDao dao = new AdvanceBookingDao();
		List<AdvanceBookingBean> exp1List = dao.advanceBookingSupplierAndRangeDao(supplierAB, aBFisDateSuppWise, aBEndDateSuppWise);

		return exp1List;
	}
	
	public List advanceBooking_BookingNoHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String bookingNoAB = request.getParameter("bookingNoAB");
		
		Map<Long, SaleReport> map = new HashMap<Long, SaleReport>();

		AdvanceBookingDao dao = new AdvanceBookingDao();
		List<AdvanceBookingBean> exp1List = dao.advanceBooking_BookingNoDao(bookingNoAB);

		return exp1List;
	}
	
	public List agewiseSupplierAndRangeHelper(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String supplierAB = request.getParameter("supplierAB");
		String aBFisDateSuppWise = request.getParameter("aBFisDateSuppWise");
		String aBEndDateSuppWise = request.getParameter("aBEndDateSuppWise");
		
		System.out.println("supplierAB "+supplierAB);
		System.out.println("aBFisDateSuppWise "+aBFisDateSuppWise);
		System.out.println("aBEndDateSuppWise "+aBEndDateSuppWise);		
		Map<Long, StocktemNameBean> map = new HashMap<Long, StocktemNameBean>();

		AdvanceBookingDao dao = new AdvanceBookingDao();
		List<StocktemNameBean> exp1List = dao.agewiseSupplierAndRangeDao(supplierAB, aBFisDateSuppWise, aBEndDateSuppWise);

		return exp1List;
	}
	
	public List agewiseBarcodeHelper(HttpServletRequest request, HttpServletResponse response)
	{
		String barcodeNoOurchase = request.getParameter("barcodeNoOurchase");
		System.out.println("barcodeNoOurchase :- "+barcodeNoOurchase);
		
		Map<Long, StocktemNameBean> map = new HashMap<Long, StocktemNameBean>();

		AdvanceBookingDao dao = new AdvanceBookingDao();
		List<StocktemNameBean> exp1List = dao.agewiseBarcodeDao(barcodeNoOurchase);

		return exp1List;
	}
}
