package com.smt.helper;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;

import com.smt.hibernate.LoginEditBillHibernate;
import com.smt.utility.HibernateUtility;
import com.smt.utility.ScheduledBackup;

public class LoginEditBillHelper {
	
	public boolean editBillLogin(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		response.setContentType("text/html");
		
		PrintWriter out = response.getWriter();
		
		String password = request.getParameter("pass");
	
		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session1 = hbu.getHibernateSession();
		
		org.hibernate.Query query = session1.createQuery("FROM LoginEditBillHibernate WHERE password = :Password");
		query.setParameter("Password", password);
		
		Integer queryListSize = query.list().size();
		if( queryListSize > 0)
		{
			System.out.println("in 1st if condt - ");
			LoginEditBillHibernate uresult = (LoginEditBillHibernate) query.uniqueResult();
			
			String p = uresult.getPassword();
			
			if(password.equals(p))
			{
				System.out.println("in 2nd if condt - ");
				//System.out.println("===========================Admin==========================IF :- "+u);
				HttpSession session = request.getSession(true); // reuse existing
				//response.sendRedirect("/jsp/Dindex.jsp");
				/*session.setAttribute("UserId", userId);
				session.setAttribute("userName", userName);
				session.setAttribute("UserType", userType);
				session.setAttribute("ShopId", shopId);
				session.setAttribute("ShopName", shopName);*/
				//request.getRequestDispatcher("/embel/jsp/Dindex.jsp").forward(request, response);
				//session.setAttribute("userType", userType);
				return true;
			} else {
				System.out.println("in 2nd else condt - ");
				//String failRongLogin = "Either user name or password is wrong.";
				//System.out.println("after in else :----**** :- "+name);
				//HttpSession session = request.getSession(true); // reuse existing
				
				//session.setAttribute("FailRongLogin", failRongLogin);
				//System.out.println("=====================================================ELSE :- "+u);
				//out.println("<font color=red>Either user name or password is wrong.</font>");
				//response.sendRedirect("/jsp/login.jsp");
				// request.getRequestDispatcher("/embel/jsp/login.jsp").forward(request, response);
				return false;
			}
		} else {
			  System.out.println("in 1st else condt - ");
			  //response.sendRedirect("/jsp/login.jsp");
			  //request.getRequestDispatcher("/embel/jsp/login.jsp").forward(request, response);
			  //out.println("<font color=red>Either user name or password is wrong.</font>");
			  System.out.println("QUERY LIST SIZE < 1");
			  return false;
		}
	}

}
