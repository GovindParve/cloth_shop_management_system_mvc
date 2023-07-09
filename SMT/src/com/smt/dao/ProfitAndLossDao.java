package com.smt.dao;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.smt.bean.CreditDebitReportBean;
import com.smt.bean.ProfitAndLossBean;
import com.smt.utility.HibernateUtility;

public class ProfitAndLossDao
{
	
	public List<ProfitAndLossBean> getAllExpensesBetweenDateRangeDao(String fisDateExpense, String endDateExpense)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<ProfitAndLossBean> expenseList1 = null;

		try
		{
			DecimalFormat df = new DecimalFormat("#.##");

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			//Query query3 = session.createSQLQuery("SELECT 'Purchase', SUM(grt.GrossTotal), grt.Date FROM goodreceive grt WHERE grt.Date BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"' UNION ALL SELECT 'Employee Payment', SUM(ept.payment), ept.insert_date FROM employee_payment ept WHERE ept.paymentType='credit' AND ept.insert_date BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"' UNION ALL SELECT 'Expenditure Payment', SUM(exppt.payment), exppt.insert_date FROM expenditure_payment exppt WHERE exppt.paymentType='credit' AND exppt.insert_date BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"' UNION ALL SELECT 'Sale Return', SUM(srt.Return_Total), srt.BillReturnDate FROM salereturn srt WHERE srt.BillReturnDate BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"'");
			Query query3 = session.createSQLQuery("SELECT 'Purchase', SUM(grt.Total), grt.Date FROM goodreceive grt WHERE grt.Date BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"' UNION ALL SELECT 'Employee Payment', SUM(ept.payment), ept.insert_date FROM employee_payment ept WHERE ept.paymentType='credit' AND ept.insert_date BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"' UNION ALL SELECT 'Expenditure Payment', SUM(exppt.payment), exppt.insert_date FROM expenditure_payment exppt WHERE exppt.paymentType='credit' AND exppt.insert_date BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"' UNION ALL SELECT 'Sale Return', SUM(srt.total_amount_per_item), srt.BillReturnDate FROM salereturn srt WHERE srt.BillReturnDate BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"'");
			 
			List<Object[]> list1 = query3.list();

			expenseList1 = new ArrayList<ProfitAndLossBean>(0);

			for (Object[] object : list1)
			{
				ProfitAndLossBean reports = new ProfitAndLossBean();
				
				if(object[1] == null)
				{}
				else
				{
					reports.setExpenseName(object[0].toString());
					reports.setExpenseAmount(df.format(Double.parseDouble(object[1].toString())));
				}
				
				expenseList1.add(reports);
			}

		} catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return expenseList1;
	}
	
	
	public List<ProfitAndLossBean> getAllIncomeBetweenDateRangeDao(String fisDateExpense, String endDateExpense)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<ProfitAndLossBean> expenseListI = null;
		try
		{
			DecimalFormat df = new DecimalFormat("#.##");

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			System.out.println("INCOME  fisDateExpense ===> "+fisDateExpense);
			System.out.println("INCOME  endDateExpense ===> "+endDateExpense);
			
			Query queryI = session.createSQLQuery("SELECT 'Credit Customer Bill', SUM(ccbt.totalperitem), ccbt.Date FROM creditcustomerbill ccbt WHERE ccbt.Date BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"' UNION ALL SELECT 'Cash Customer Bill', SUM(obt.totalperitem), obt.Date FROM otherbill obt WHERE obt.Date BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"'");
			 
			List<Object[]> listI = queryI.list();
			
			System.out.println("listI.size ====> "+listI.size());

			expenseListI = new ArrayList<ProfitAndLossBean>(0);

			for (Object[] object : listI)
			{	
				System.out.println("INCOME   =  " + Arrays.toString(object));
				
				ProfitAndLossBean reports = new ProfitAndLossBean();
				
				if(object[1] == null)
				{}
				else
				{
					reports.setIncomeName(object[0].toString());
					reports.setIncomeAmount(df.format(Double.parseDouble(object[1].toString())));
				}
				
				expenseListI.add(reports);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}	
		return expenseListI;
	}
	
	public List<ProfitAndLossBean> getAllExpensesBetweenDateRangeForExpenditureDao(String fisDateExpense, String endDateExpense, String expenseId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<ProfitAndLossBean> expenseList1 = null;

		try
		{
			DecimalFormat df = new DecimalFormat("#.##");

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			Query query3 = session.createSQLQuery("SELECT ed.expense_name, ep.total_amount,ed.insert_date FROM expenditure_details ed JOIN expenditure_payment ep ON ed.pk_expense_details_id = ep.fk_expense_detail_id WHERE ed.fkExpenseTypeId='"+expenseId+"' and ed.insert_date BETWEEN '"+fisDateExpense+"' AND '"+endDateExpense+"'");
			 
			List<Object[]> list1 = query3.list();

			expenseList1 = new ArrayList<ProfitAndLossBean>(0);

			for (Object[] object : list1)
			{
				ProfitAndLossBean reports = new ProfitAndLossBean();
				
				if(object[1] == null)
				{}
				else
				{
					reports.setExpenseName(object[0].toString());
					reports.setExpenseAmount(df.format(Double.parseDouble(object[1].toString())));
				}
				
				expenseList1.add(reports);
			}

		} catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return expenseList1;
	}
}
