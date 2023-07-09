package com.smt.helper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.bean.CreditDebitReportBean;
import com.smt.bean.ProfitAndLossBean;
import com.smt.dao.ProfitAndLossDao;

public class ProfitAndLossHelper
{
	public List getAllExpensesBetweenDateRangeHelper(HttpServletRequest request, HttpServletResponse response)
	{
		
		String fisDateExpense = request.getParameter("fisDateExpense");
		String endDateExpense = request.getParameter("endDateExpense");
		
		Map<Long, CreditDebitReportBean> map = new HashMap<Long, CreditDebitReportBean>();

		ProfitAndLossDao dao = new ProfitAndLossDao();
		List<ProfitAndLossBean> exp1List = dao.getAllExpensesBetweenDateRangeDao(fisDateExpense, endDateExpense);

		return exp1List;
	}

	public List getAllIncomeBetweenDateRangeHelper(HttpServletRequest request, HttpServletResponse response)
	{
		
		String fisDateExpense = request.getParameter("fisDateExpense");
		String endDateExpense = request.getParameter("endDateExpense");
		
		Map<Long, CreditDebitReportBean> map = new HashMap<Long, CreditDebitReportBean>();

		ProfitAndLossDao dao = new ProfitAndLossDao();
		List<ProfitAndLossBean> exp1List = dao.getAllIncomeBetweenDateRangeDao(fisDateExpense, endDateExpense);

		return exp1List;
	}
	
	public List getAllExpensesBetweenDateRangeForExpenditureHelper(HttpServletRequest request, HttpServletResponse response)
	{
		
		String fisDateExpense = request.getParameter("fisDateExpense");
		String endDateExpense = request.getParameter("endDateExpense");
		String expenseId = request.getParameter("expenseId");
		
		Map<Long, CreditDebitReportBean> map = new HashMap<Long, CreditDebitReportBean>();

		ProfitAndLossDao dao = new ProfitAndLossDao();
		List<ProfitAndLossBean> exp1List = dao.getAllExpensesBetweenDateRangeForExpenditureDao(fisDateExpense, endDateExpense, expenseId);

		return exp1List;
	}
	
}
