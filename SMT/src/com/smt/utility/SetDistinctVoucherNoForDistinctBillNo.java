package com.smt.utility;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.hibernate.CustomerDetailsBean;
import com.smt.utility.HibernateUtility;

public class SetDistinctVoucherNoForDistinctBillNo {
	
	//System.out.println("In SetDistinctVoucherNoForDistinctBillNo Class ");
	
	public static void main(String[] args) 
	{
		//Resource resource=new ClassPathResource("com/in/embel/Helper/applicationContext.xml");  
		// BeanFactory factory=new XmlBeanFactory(resource);  
		
		//Student student=(Student)factory.getBean("studentbean");  
		
		getDistinctBillNoAndSetVoucherN2o();
		
	}
	
	public static void getDistinctBillNoAndSetVoucherN2o()
	{				
		System.out.println("In getDistinctBillNoAndSetVoucherNo Method ");
		
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		Query query1 = null;
		
		List<List<Object>> list = new ArrayList<List<Object>>();
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();			
			query = session.createSQLQuery("SELECT PkGoodRecId, BillNo FROM goodreceive");
			List<Object[]> data = query.list();
			
			for(Object[] item:data) {
				List<Object> d=new ArrayList<Object>();
				d.add(item[0]);
				d.add(item[1]);
				list.add(d);
			}
			
			if(list!=null &&list.size()>0) {
			int i=0;
			String billNo="";
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			for(List<Object> items:list) {
				String currentBillNo=(String) items.get(1);
				if(!currentBillNo.equalsIgnoreCase(billNo)) {
					i++;
					billNo=currentBillNo;
				}
				Transaction transaction = session.beginTransaction();
				query1 = session.createQuery("update GoodReceive set voucherNo="+i+" where PkGoodRecId='"+items.get(0)+"'");
				int status=query1.executeUpdate();
				System.out.println(status);
				transaction.commit();
				
			}
			}
			
			
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
		}
		finally
		{	
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}
	}
	
	public static void getDistinctBillNoAndSetVoucherNo()
	{				
		System.out.println("In getDistinctBillNoAndSetVoucherNo Method ");
		
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		Query query1 = null;
		
		List<String> list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();			
			query = session.createSQLQuery("SELECT DISTINCT(BillNo) FROM goodreceive");
			list = query.list();
			
			if(list!=null &&list.size()>0) {
			int i=1;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			for(String eachElement:list) {
			
				Transaction transaction = session.beginTransaction();
				query1 = session.createQuery("update GoodReceive set voucherNo="+i+" where billNo='"+eachElement+"'");
				int status=query1.executeUpdate();
				System.out.println(status);
				transaction.commit();
				i++;
			}
			}
			
			
		} catch (Exception e) {
			Log.error("Error in getAllCustomer", e);
		}
		finally
		{	
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}
	}

}
