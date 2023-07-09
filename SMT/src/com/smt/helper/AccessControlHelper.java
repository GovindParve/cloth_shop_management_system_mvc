package com.smt.helper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.dao.AccessControlDao;
import com.smt.hibernate.AccessControlBean;

public class AccessControlHelper {
	
	public Map getUserDetailsForAccessControl(HttpServletRequest request, HttpServletResponse response) {

		String userId=request.getParameter("userId");
		String empname=request.getParameter("empname");
		
		AccessControlDao dao=new AccessControlDao();
		List userList = dao.getAllUserDetailsForAccessControl(userId);
		

		Map  map =  new HashMap();
		for(int i=0;i<userList.size();i++)
		{
			Object[] o = (Object[])userList.get(i);

			
			AccessControlBean bean=new AccessControlBean();
			bean.setUserName(o[0].toString());
			bean.setPassword(o[1].toString());
			
			map.put(bean.getUserName(),bean);
		}
		System.out.println("out of helper return map : "+map);
		return map;
	}
	
	//Add Access Control Details
		public void AccessControlDetails(HttpServletRequest request, HttpServletResponse response ){

			System.out.println("In helper");

			String userid = request.getParameter("userid");
			String EmpName = request.getParameter("EmpName");
			String userName = request.getParameter("userName");
			String password = request.getParameter("password");
			String type = request.getParameter("type");
			String shopid = request.getParameter("shopid");
			String shop = request.getParameter("shop");			
			AccessControlBean bean=new AccessControlBean();
			bean.setUserId(Long.parseLong(userid));
			bean.setEmpName(EmpName);
			bean.setUserName(userName);
			bean.setPassword(password);
			bean.setType(type);
			bean.setShopId(Long.parseLong(shopid));
			bean.setShopName(shop);
			
			AccessControlDao dao=new AccessControlDao();
			dao.saveAccessControlDetails(bean);
			
		}

}
