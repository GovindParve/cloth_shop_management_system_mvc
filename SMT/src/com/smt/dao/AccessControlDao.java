package com.smt.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.jfree.util.Log;
import org.hibernate.Transaction;

import com.smt.hibernate.AccessControlBean;
import com.smt.utility.HibernateUtility;

public class AccessControlDao {
	
	public List getAllMainUserNameShopWise(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		Long fkShopId = Long.parseLong(shopId);
		
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			
			System.out.println("ALL UserName====");
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//query = session.createQuery("from SupplierDetail");
			query = session.createQuery("from UserDetail WHERE fkShopId = :fkShopId");
			query.setParameter("fkShopId", fkShopId);
			list = query.list();
		}
		catch (RuntimeException e)
		{
			Log.error("Error in getAllUserName ", e);
		}
		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	public List getAllUserDetailsForAccessControl(String userId) {

		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("SELECT userName, password from user_details WHERE pk_user_id='"+userId+"'");
			list = query.list(); 
		} catch (RuntimeException e) {
			e.printStackTrace();
		}

		finally
		{
			if (session!=null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	//Add Access Control Details
	public void saveAccessControlDetails(AccessControlBean bean){
		System.out.println("In DAO");

		HibernateUtility hbu=null;
		Session session = null;
		Transaction transaction = null;
		try{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("got session ");
			transaction = session.beginTransaction();

			System.out.println("Tx started");
			session.save(bean);
			transaction.commit();
			System.out.println("Successful");
		}
		catch(RuntimeException e){
			try{
				transaction.rollback();
			}catch(RuntimeException rbe)
			{
				Log.error("Couldn't roll back tranaction",rbe);
			}	
		}finally{
			hbu.closeSession(session);
		}
		hbu.closeSession(session);
	}

}
