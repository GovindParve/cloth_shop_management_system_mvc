package com.smt.dao;

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

import com.smt.bean.BankDetailsBean;
import com.smt.bean.ItemList;
import com.smt.bean.allTransactionId;
import com.smt.hibernate.BankDetailsH;
import com.smt.utility.HibernateUtility;

public class BankDetailsDao
{
	public void addBankdatailsDAO(BankDetailsH bank)
	{
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			session.save(bank);
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
				Log.error("Error in BANK DETAILS Add FORM", e2);
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
	
	public List getAllBankName()
	{
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from BankDetailsH");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAllUnits", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	
	public List getAllBankNameShopWise(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		Long fkShopId = Long.parseLong(shopId);
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from BankDetailsH WHERE fkShopId = :fkShopId");
			query.setParameter("fkShopId", fkShopId);
			list = query.list();
		} catch (RuntimeException e) {
				e.printStackTrace();
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;

	}
	
	public List getLastBankTransactionId()
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<allTransactionId> listTid = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT bank.pk_bank_payment_id, bankd.bankName FROM bank_payment bank JOIN bankdetails bankd on bank.fk_bank_detail_id = bankd.pkBankId ORDER BY bank.pk_bank_payment_id DESC LIMIT 1;");
			//listTid = query.list();
			
			List<Object[]> list = query.list();
			listTid = new ArrayList<allTransactionId>(0);
			for (Object[] object : list) {
				System.out.println(Arrays.toString(object));
				allTransactionId reports = new allTransactionId();
				
				System.out.println("Long.parseLong(object[0].toString()) ===> "+Long.parseLong(object[0].toString()));
				
				if(object[0] == null)
				{
					reports.setBankPaymentTransactoinId(1l);
				}
				else
				{
					reports.setBankPaymentTransactoinId(Long.parseLong(object[0].toString()));
				}
				System.out.println("selTransactionId =============> "+reports.getSaleReturnTransactoinId());
				listTid.add(reports);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return listTid;
	}
	
	
	public List<BankDetailsBean> getAllBankList() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<BankDetailsBean> catList = null;
		try {
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select bank.bankName, bank.accountNumber, bank.bankIfscCode, bank.address, bank.contactNo from bankdetails bank");
			List<Object[]> list = query2.list();
			catList = new ArrayList<BankDetailsBean>(0);

			for (Object[] object : list) {
				k++;
				BankDetailsBean reports = new BankDetailsBean();
				reports.setSrNo(String.valueOf(k));
				reports.setBankName(object[0].toString());
				reports.setAccountNumber(object[1].toString());
				reports.setBankIfscCode(object[2].toString());
				reports.setAddress(object[3].toString());
				reports.setContactNo(object[4].toString());
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	
	
	
	
	
	
}
