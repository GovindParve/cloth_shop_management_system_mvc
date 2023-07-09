package com.smt.helper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.bean.ExpenseTypeBean;
import com.smt.bean.SubCategoryUpdate;
import com.smt.dao.CategoryDao;
import com.smt.dao.ExpenditureDetailsDao;
import com.smt.hibernate.ExpenditureDetailsBean;
import com.smt.hibernate.ExpenditureTypeBeanH;
import com.smt.hibernate.SubCategory;

public class ExpenditureDetailsHelper {

	public void expenseDetails(HttpServletRequest request, HttpServletResponse response)
	{
		String shopId = request.getParameter("shopId");
		String expenseName = request.getParameter("expenseName");
		String expenseTypeId = request.getParameter("expenseTypeId");

		ExpenditureDetailsBean bean = new ExpenditureDetailsBean();

		bean.setExpenseName(expenseName);
		bean.setFkExpenseTypeId(Long.parseLong(expenseTypeId));

		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date dateobj = new Date();
		System.out.println(dateFormat1.format(dateobj));

		bean.setInsertDate(dateobj);
		
		bean.setFkShopId(Long.parseLong(shopId));

		ExpenditureDetailsDao dao = new ExpenditureDetailsDao();
		dao.addExpenseDetails(bean);
	}
	
	public void expenseType(HttpServletRequest request, HttpServletResponse response)
	{
		String shopId = request.getParameter("shopId");
		String expTypeName = request.getParameter("expTypeName");

		ExpenditureTypeBeanH bean = new ExpenditureTypeBeanH();
		
		bean.setExpenseTypeName(expTypeName);
		bean.setFkShopId(Long.parseLong(shopId));
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date dateobj = new Date();
		System.out.println(dateFormat1.format(dateobj));

		bean.setInsertDate(dateobj);

		ExpenditureDetailsDao dao = new ExpenditureDetailsDao();
		dao.addExpenseType(bean);
	}
	
	public Map getExpenseTypeForExpenditurePaymentHelper(String expenditureId) {

		Map<String, ExpenseTypeBean> map = new HashMap<String, ExpenseTypeBean>();

		ExpenditureDetailsDao dao = new ExpenditureDetailsDao();
		List catList = dao.getExpenseTypeForExpenditurePaymentDAo(expenditureId);
		Map map1 = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);
			ExpenseTypeBean bean = new ExpenseTypeBean();
			bean.setPkExpenseId(o[0].toString());
			bean.setExpenseType((String) o[1]);

			System.out.println("***************" + o[0] + "\t" + o[1]);
			map1.put(bean.getPkExpenseId(), bean);
		}
		return map1;
	}

}
