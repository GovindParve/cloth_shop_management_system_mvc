package com.smt.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.BankPaymentBean;
import com.smt.bean.SupplierPaymentDetail;
import com.smt.hibernate.BankPaymentBeanH;
import com.smt.utility.HibernateUtility;

public class BankPaymentDao
{
	public void addBankPayment(BankPaymentBeanH bean) {

		System.out.println("In DAO");

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			System.out.println("11111111111111111111111111111111111111");

			System.out.println("Tx started");

			session.save(bean);
			System.out.println("22222222222222222222222222222222222222");
			transaction.commit();
			System.out.println("Successful");
		}
		catch (RuntimeException e)
		{
			try
			{
				transaction.rollback();
				e.printStackTrace();
			}			
			catch (RuntimeException rbe)
			{
				Log.error("Couldn't roll back tranaction", rbe);
				rbe.printStackTrace();
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
	
	
	
	public List getBankTotalAmountDao(String newSupplierId)
	{
		System.out.println("into getBankTotalAmountDao newSupplierId : "+newSupplierId);
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select bankp.pk_bank_payment_id, bankp.fk_bank_detail_id, bankp.total_amount from bank_payment bankp where bankp.fk_bank_detail_id = "+newSupplierId+" ORDER BY bankp.pk_bank_payment_id DESC LIMIT 1");
			list = query.list();
		} catch (RuntimeException e) {
			e.printStackTrace();
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		System.out.println("out of dao - return credit customer List : " + list);
		return list;

	}
	
	public List<BankPaymentBean> getBankTransactionByBankDAO(String fkBankId)
	{		
		long srNo = 0;
		Double returnAmt = 0.0;
		HibernateUtility hbu = null;
		Session session = null;
		List<BankPaymentBean> supplierList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("Select bankD.bankName, bankP.accountant_name, bankP.payment_date, bankP.contact_number, bankP.payment, bankP.total_amount, bankP.paymentType from bank_payment bankP join bankdetails bankD on bankP.fk_bank_detail_id = bankD.pkBankId WHERE bankP.fk_bank_detail_id =:fkBankId");
			query.setParameter("fkBankId", fkBankId);
			List<Object[]> list = query.list();
			supplierList = new ArrayList<BankPaymentBean>(0);

			for (Object[] object : list)
			{
				srNo++;
				BankPaymentBean reports = new BankPaymentBean();

				reports.setBankName(object[0].toString());
				reports.setAccountantName(object[1].toString());
				reports.setPaymentDate(object[2].toString());
				reports.setContactNumber(object[3].toString());
				reports.setCrDbAmount(object[4].toString());
				reports.setTotalAmount(object[5].toString());
				reports.setPaymentType(object[6].toString());
				reports.setSrNo(String.valueOf(srNo));
				supplierList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierList;
	}	
	
	
	public List<BankPaymentBean> getBankTransactionByBankBetweenDatesDAO(String bankStartDate1, String bankEndDate1)
	{		
		long srNo = 0;
		Double returnAmt = 0.0;
		HibernateUtility hbu = null;
		Session session = null;
		List<BankPaymentBean> supplierList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("Select bankD.bankName, bankP.accountant_name, bankP.payment_date, bankP.contact_number, bankP.payment, bankP.total_amount, bankP.paymentType from bank_payment bankP join bankdetails bankD on bankP.fk_bank_detail_id = bankD.pkBankId WHERE bankP.insert_date BETWEEN :bankStartDate1 AND :bankEndDate1");
			query.setParameter("bankStartDate1", bankStartDate1);
			query.setParameter("bankEndDate1", bankEndDate1);
			List<Object[]> list = query.list();
			supplierList = new ArrayList<BankPaymentBean>(0);

			for (Object[] object : list)
			{
				srNo++;
				BankPaymentBean reports = new BankPaymentBean();

				reports.setBankName(object[0].toString());
				reports.setAccountantName(object[1].toString());
				reports.setPaymentDate(object[2].toString());
				reports.setContactNumber(object[3].toString());
				reports.setCrDbAmount(object[4].toString());
				reports.setTotalAmount(object[5].toString());
				reports.setPaymentType(object[6].toString());
				reports.setSrNo(String.valueOf(srNo));
				supplierList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return supplierList;
	}	
}
