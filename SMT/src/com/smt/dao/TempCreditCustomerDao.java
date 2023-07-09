package com.smt.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillBean;
import com.smt.hibernate.CreditCustomerBill;
import com.smt.hibernate.TempCreditInvoice;
import com.smt.utility.HibernateUtility;

public class TempCreditCustomerDao {
	
	public void regCreditCustomerBill(TempCreditInvoice cust)
	{
		// TODO Auto-generated method stub

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			session.save(cust);
			transaction.commit();

		} catch (Exception e) {
			try {
				transaction.rollback();
			} catch (RuntimeException ede) {
			}
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
	}
	
	public List getCreditLastBillNo()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<BillBean> saleList = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT BillNo, pktempBillId FROM TempCredit_invoice ORDER BY BillNo DESC LIMIT 1");

			List<Object[]> list = query.list();
			saleList = new ArrayList<BillBean>(0);
			for(Object[] object : list)
			{
				System.out.println(Arrays.toString(object));
				BillBean reports = new BillBean();
				//reports.setBillNo(Long.parseLong(object[0].toString()));
				reports.setCreditCustBillNo(Long.parseLong(object[0].toString()));
				saleList.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			if (session != null)
			{
				session.close();
			}
		}
		return saleList;
	}
	
	


}
