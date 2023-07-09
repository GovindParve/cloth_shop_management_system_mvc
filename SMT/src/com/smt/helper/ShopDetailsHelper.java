package com.smt.helper;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.bean.ExpenseTypeBean;
import com.smt.bean.ShopDetailsBean;
import com.smt.dao.BankDetailsDao;
import com.smt.dao.ExpenditureDetailsDao;
import com.smt.dao.ShopDetailsDao;
import com.smt.hibernate.BankDetailsH;
import com.smt.hibernate.ShopDetailsBeanH;

public class ShopDetailsHelper
{	
	public void addShopDetails(HttpServletRequest request, HttpServletResponse response)
	{		
		String shopName = request.getParameter("shopName");
		String contactNumber = request.getParameter("contactNumber");
		String gstNo = request.getParameter("gstNo");
		String shopAddress = request.getParameter("shopAddress");
		String cityName = request.getParameter("cityName");
		
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		Date dateobj = new Date();
	
		String newDate = df.format(dateobj);
	
		ShopDetailsBeanH shop = new ShopDetailsBeanH();
	
		shop.setShopName(shopName);
		shop.setContactNumber(contactNumber);
		shop.setGstNo(gstNo);
		shop.setShopAddress(shopAddress);
		shop.setCity(cityName);
		shop.setShopRegDate(dateobj);
	
		ShopDetailsDao reg = new ShopDetailsDao();
		reg.addShopDeatailsDAO(shop);		
	}
	
	
	public Map getAllShopHelper(HttpServletRequest request,HttpServletResponse response)
	{
		int count = 1;
		
		String uname = request.getParameter("uname");
		
		System.out.println("uname in getshop -  "+uname);
		//Map<String, ShopDetailsBean> map = new HashMap<String, ShopDetailsBean>();

		ShopDetailsDao dao = new ShopDetailsDao();
		List catList = dao.getAllShopsDAo(uname);
		Map map1 = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			
			Object[] o = (Object[]) catList.get(i);
			System.out.println(Arrays.toString(o));
			ShopDetailsBean bean = new ShopDetailsBean();
			bean.setShopId(Long.parseLong(o[0].toString()));
			bean.setUserId(Long.parseLong(o[1].toString()));
			bean.setShopName(o[3].toString());
			bean.setUserName(o[2].toString());
			map1.put(count, bean);
			
			count++;
		}
		return map1;
	}
	
	
}
