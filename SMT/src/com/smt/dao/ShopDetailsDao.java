package com.smt.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;
import com.smt.hibernate.ShopDetailsBeanH;
import com.smt.utility.HibernateUtility;

public class ShopDetailsDao
{
	public void addShopDeatailsDAO(ShopDetailsBeanH shop)
	{
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(shop);
			transaction.commit();
		}
		catch (RuntimeException e)
		{
			try
			{
				transaction.rollback();
			}
			catch (RuntimeException e2)
			{
				Log.error("Error in shop DETAILS Add FORM", e2);
			}
		}
		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}
	}
	
	public List getAllShopsDAo(String uname)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		System.out.println("uname----------->Dao----------> "+uname);
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("uname === == = "+uname);
			Query query = session.createSQLQuery("SELECT shop_id,user_id,username,shop_name FROM accesscontrol WHERE username='"+uname+"'");
			
			list = query.list();
			System.out.println("List Size----------->Dao----------> "+list.size());
		}
		catch (RuntimeException e)
		{
			Log.error("Error in getSubCategoriesByRootcategory(String mainCatId)", e);
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
	
	public List getAllMainShop(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		Long pkShopId = Long.parseLong(shopId);
		
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			
			System.out.println("ALL Shop Name====");
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//query = session.createQuery("from SupplierDetail");
			query = session.createQuery("from ShopDetailsBeanH WHERE pkShopId = :pkShopId");
			query.setParameter("pkShopId", pkShopId);
			list = query.list();
		}
		catch (RuntimeException e)
		{
			Log.error("Error in getAllShopName ", e);
		}
		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
}
