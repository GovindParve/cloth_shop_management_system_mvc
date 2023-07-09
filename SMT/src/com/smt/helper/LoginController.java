package com.smt.helper;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.hibernate.Query;
import org.hibernate.Session;

import com.smt.hibernate.AccessControlBean;
import com.smt.hibernate.UserDetail;
import com.smt.utility.CheckInternetConn;
import com.smt.utility.HibernateUtility;
import com.smt.utility.ScheduledBackup;
import com.smt.utility.UserPasswordMailToUser;

/**
 * Servlet implementation class Session
 */
public class LoginController extends HttpServlet
{
	private static final long serialVersionUID = 1L;

	public void loginUser(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		// TODO Auto-generated method stub
		//UserDetail uniqueResult = null;
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		PrintWriter abc = response.getWriter();
		String un = request.getParameter("uname");
		String pwd = request.getParameter("pass");
		String userid = request.getParameter("userid");
		String shopId = request.getParameter("shopId");
		String shopName = request.getParameter("shopName");
		System.out.println("in login contrl     un -  "+un+"  passs -  "+pwd+"  ,  shopName   "+shopName);
		
		/*
		 * String shopName = request.getParameter("shopName"); String shopId =
		 * request.getParameter("allShopListId");
		 */
		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session1 = hbu.getHibernateSession();
		Query query = session1.createQuery("from AccessControlBean where userName=:username AND password=:pwd");
		query.setParameter("username", un);
		query.setParameter("pwd", pwd);
		
		
		AccessControlBean uniqueResult =(AccessControlBean) query.uniqueResult();
		
		
		
		if(uniqueResult!=null)
		{
			String userName = uniqueResult.getUserName();
			String password = uniqueResult.getPassword();
			String dbshopid = Long.toString(uniqueResult.getShopId());
			String usertype = uniqueResult.getType();
		
if(un.equals(userName) && pwd.equals(password) && shopId.equals(dbshopid))
{
			
			ScheduledBackup.backupOnTime();
			out.print("Welcome, " + un);
			HttpSession session = request.getSession(true); // reuse existing
															// session if exist
		//	response.sendRedirect("/SMT/jsp/Miscellaneous.jsp");												// or create one
	//		SupplierAccountDetailsHelper help = new SupplierAccountDetailsHelper();
		//	help.creditDebitAmount();
		
			session.setAttribute("user", un);                                                           // 30 seconds
			session.setAttribute("userid", userid);
			session.setAttribute("shopId", shopId);
			session.setAttribute("shopName", shopName);
			session.setAttribute("usertype", usertype);			
			response.setContentType("text/html");  
 			//response.setStatus(HttpServletResponse.SC_OK,"Login Successfully...!...!");
 			out.println("<script type=\"text/javascript\">");  
 			out.println("alert('Login Successfully...!');");  
 			out.println("window.location.assign('/SMT/jsp/Miscellaneous.jsp');");  
 			out.println("</script>");

		}
} 
		else {
		
			
			response.setContentType("text/html");  
			//response.setStatus(HttpServletResponse.SC_UNAUTHORIZED,"User or password incorrect...!");
			out.println("<script type=\"text/javascript\">");  
			out.println("alert('User or password incorrect');");  
			out.println("window.location.assign('/SMT/jsp/login.jsp');");  
			out.println("</script>");
			
			/*response.sendRedirect("/SMT/jsp/login.jsp");
			//RequestDispatcher rd = request.getRequestDispatcher("/SMT/jsp/login.jsp");
			out.println("<font color=red>Either user name or password is wrong.</font>");*/
		
	      
	}
		
		
		/*
		 * System.out.println("QUERY LIST SIZE ====> "+(query.list()).size()); Integer
		 * queryListSize = query.list().size(); if(queryListSize == 0) {
		 * //System.out.println("QUERY LIST SIZE() ===> "+queryListSize);
		 * out.println("Either user name or password is wrong.");
		 * abc.println("Either user name or password is wrong.");
		 * response.sendRedirect("/SMT/jsp/login.jsp"); } else { uniqueResult =
		 * (UserDetail) query.uniqueResult();
		 * System.out.println("uniqueResult=-=-=-==-=-=-= "+uniqueResult);
		 * if(uniqueResult == null) {
		 * out.println("Either user name or password is wrong.");
		 * abc.println("Either user name or password is wrong.");
		 * response.sendRedirect("/SMT/jsp/login.jsp");
		 * //out.println("<font color=red>Either user name or password is wrong.</font>"
		 * ); //out.println("Either user name or password is wrong."); } else { String
		 * userName = uniqueResult.getUserName(); String password =
		 * uniqueResult.getPassword();
		 * 
		 * System.out.println(userName); System.out.println(password);
		 * 
		 * if (un.equals(userName) && pwd.equals(password)) {
		 * ScheduledBackup.backupOnTime(); HttpSession session =
		 * request.getSession(true); //reuse existing session if exist or create one
		 * 
		 * if(session!=null) { System.out.println("in side session if loop");
		 * response.sendRedirect("/SMT/jsp/Miscellaneous.jsp");
		 * session.setAttribute("user", un);
		 * System.out.println("shopId loginCntrl    ===>  "+shopId);
		 * session.setAttribute("shopId", shopId); session.setAttribute("shopName",
		 * shopName); } else { response.sendRedirect("/SMT/jsp/login.jsp"); } // 30
		 * seconds } else { response.sendRedirect("/SMT/jsp/login.jsp");
		 * out.println("<font color=red>Either user name or password is wrong.</font>");
		 * } } }
		 */
		/*out.println("Either user name or password is wrong.");
		abc.println("Either user name or password is wrong.");
		response.sendRedirect("/SMT/jsp/login.jsp");*/
		
		out.close();
	}
		
	public String loginUserMailHelper(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		String alert = "";
		String username = request.getParameter("uname");
		
		String emailId = null;
		String password = null;

		UserDetailHelper uHelper = new UserDetailHelper();
   		List<Object[]> uList = uHelper.getUserEmail(username);
   		
		for(Object o[]:uList)
		{
			emailId = o[2].toString();
			password = o[3].toString();
		}
		
		UserPasswordMailToUser user = new UserPasswordMailToUser();
		
		CheckInternetConn checkI = new CheckInternetConn();
		int iConn = checkI.checkInternet();
		
		if(iConn > 0)
		{
			user.sendMailToUser(emailId, password, username);
			alert = "Please Check Your Registered Email Id";
		}
		else
		{
			alert = "No INTERNET CONNECTIOON";
		}
		
		return alert;		
	}
}