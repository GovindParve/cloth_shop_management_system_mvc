package com.smt.helper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.smt.bean.BankPaymentBean;
import com.smt.bean.SupplierEditBean;
import com.smt.bean.SupplierPaymentDetail;
import com.smt.dao.BankPaymentDao;
import com.smt.dao.ExpenditurePaymentDao;
import com.smt.dao.SupplierDetailDao;
import com.smt.dao.SupplierPaymentDao;
import com.smt.hibernate.BankPaymentBeanH;
import com.smt.hibernate.ExpenditurePaymentBean;

public class BankPaymentHelper
{	
	public void regBankPayment(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		String fkRootBankId = request.getParameter("fkRootBankId");
		String bankTrDate = request.getParameter("bankTrDate");
		String bankTrContactNumber = request.getParameter("bankTrContactNumber");
		String paymentTypeBankTr = request.getParameter("paymentTypeBankTr");		
		String bankTrAccountantName = request.getParameter("bankTrAccountantName");
		String crDbBankTrAmount = request.getParameter("crDbBankTrAmount");
		String totalAmount = request.getParameter("totalAmount");
		String bankServiceProvider = "N/A";
		
		BankPaymentBeanH bean = new BankPaymentBeanH();
		
		bean.setFkBankDetailId(Long.parseLong(fkRootBankId));
		bean.setServiceProvider(bankServiceProvider);
		bean.setAccountantName(bankTrAccountantName);
		bean.setContactNumber(Long.parseLong(bankTrContactNumber));
		bean.setTotalAmount(Double.parseDouble(totalAmount));
		bean.setPaymentType(paymentTypeBankTr);
		bean.setCrDbAmount(Double.parseDouble(crDbBankTrAmount));
		bean.setFkShopId(Long.parseLong(shopId));
		
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd");
		Date payInsertDate = new Date();
		bean.setInsertDate(payInsertDate);
		bean.setPaymentDate(dateFormat1.parse(bankTrDate));
		BankPaymentDao dao = new BankPaymentDao();
		dao.addBankPayment(bean);
	}
	
	public Map getBankTotalAmountHelper(String fkRootBankId)
	{
		System.out.println("IN HELPER getBankTotalAmountHelper");
		BankPaymentDao sdo = new BankPaymentDao();
		
		System.out.println("into helper class");
		BankPaymentDao dao = new BankPaymentDao();
		List catList = dao.getBankTotalAmountDao(fkRootBankId);
		
		BankPaymentBean bean = new BankPaymentBean();
		
		Map map = new HashMap();
		if(catList.size() > 0)
		{
			for (int i = 0; i < catList.size(); i++)
			{
				Object[] o = (Object[]) catList.get(i);
	
				if(o[2] == null)
				{
					bean.setTotalAmount("0");
				}
				else
				{
					bean.setTotalAmount(o[2].toString());
				}
				map.put(bean.getPkBankPaymentId(), bean);
			}		
		}
		else
		{
			bean.setTotalAmount("0");
			map.put(bean.getPkBankPaymentId(), bean);
		}		
	return map;
	}
	
	
	public List getBankPaymentDetailsByNames(HttpServletRequest request, HttpServletResponse response)
	{
		String fkBankId = request.getParameter("fkBankId");

		Map<Long, SupplierPaymentDetail> map = new HashMap<Long, SupplierPaymentDetail>();

		BankPaymentDao dao = new BankPaymentDao();
		List<BankPaymentBean> supList = dao.getBankTransactionByBankDAO(fkBankId);

		return supList;
	}
	
	public List getBankPaymentDetailsBetweenDates(HttpServletRequest request, HttpServletResponse response)
	{
		String bankStartDate1 = request.getParameter("bankStartDate1");
		String bankEndDate1 = request.getParameter("bankEndDate1");

		Map<Long, SupplierPaymentDetail> map = new HashMap<Long, SupplierPaymentDetail>();

		BankPaymentDao dao = new BankPaymentDao();
		List<BankPaymentBean> supList = dao.getBankTransactionByBankBetweenDatesDAO(bankStartDate1, bankEndDate1);

		return supList;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
}
