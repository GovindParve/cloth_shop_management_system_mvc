package com.smt.helper;

import java.math.BigInteger;
import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillCopy;
import com.smt.bean.GetCreditCustomerDetails;
import com.smt.bean.GetSupplierDetails;
import com.smt.dao.CustomerDetailsDao;
import com.smt.dao.ExpenditureDetailsDao;
import com.smt.hibernate.CustomerDetailsBean;
import com.smt.hibernate.ExpenditureDetailsBean;
import com.smt.utility.HibernateUtility;

public class CustomerDetailsHelper {

	public void customerDetails(HttpServletRequest request, HttpServletResponse response) {

		System.out.println("In helper");

		String address = request.getParameter("address");
		String contactNo = request.getParameter("contactNo");
		String emailId = request.getParameter("emailId");
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		String middleName = request.getParameter("middleName");
		String zipCode = request.getParameter("zipCode");
		String aadhar = request.getParameter("aadhar");
		String shopId = request.getParameter("shopId");
		
		CustomerDetailsBean cdb = new CustomerDetailsBean();

		if (!"".equals(contactNo)) {
			cdb.setContactNo(Long.parseLong(contactNo));
		} else {
			cdb.setContactNo(Long.parseLong("00"));
		}

		if (!"".equals(zipCode)) {
			cdb.setZipCode(Long.parseLong(zipCode));
		} else {
			cdb.setZipCode(Long.parseLong("00"));
		}

		if (!"".equals(aadhar)) {
			cdb.setAadhar((aadhar));
		} else {
			cdb.setAadhar("NA");
		}
		if (!"".equals(emailId)) {
			cdb.setEmailId(emailId);
		} else {
			cdb.setEmailId("N/A");
		}
		cdb.setFirstName(firstName);
		
		if(middleName == null || middleName.isEmpty() || middleName == "" || middleName == " ")
		{
			cdb.setMiddleName("N/A");
		}
		else {
			cdb.setMiddleName(middleName);	
		}
		
		cdb.setLastName(lastName);
		cdb.setAddress(address);
		cdb.setFkShopId(Long.parseLong(shopId));

		CustomerDetailsDao cdo = new CustomerDetailsDao();
		cdo.valCustomerDetails(cdb);
	}

	public Map getVillage(String creditCustomerId) {

		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list = dao.getVillageByCustomerName(creditCustomerId);
		Map map = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			bean.setVillage(o[0].toString());
			bean.setFirstName(o[1].toString());
			bean.setContactNo((BigInteger) o[2]);
			bean.setAadhar(o[3].toString());
			System.out.println("***************" + o[0]);
			map.put(bean.getVillage(), bean);
		}
		return map;
	}

	public Map getAllBillByCustomers(String fkCustomerId) {

		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list = dao.getAllBillByCreditCustomer(fkCustomerId);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			System.out.println(Arrays.toString(o));
			String pendingBal = o[2].toString();
			if (pendingBal.equals("0")) {
				continue;
			} else {
				bean.setBillNo((BigInteger) o[0]);
				bean.setInsertDate(o[1].toString());
				System.out.println("***************" + o[0]);
			}
			map.put(bean.getBillNo(), bean);

		}
		return map;

	}

	public Map getAllBillByCreditCustomers(String fkCustomerId, String shopId)
	{
		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list = dao.getAllBillByCreditCustomer(fkCustomerId);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			System.out.println(Arrays.toString(o));
			String quantity = o[3].toString();			
			bean.setBillNo((BigInteger) o[0]);
			map.put(bean.getBillNo(), bean);
		}
		return map;

	}

	public List getAllBillByCustomers2(String fkCustomerId)
	{
		Map<Long, BillCopy> map = new HashMap<Long, BillCopy>();
		CustomerDetailsDao dao = new CustomerDetailsDao();
		List<BillCopy> custList = dao.getAllBillByCreditCustomer2(fkCustomerId);
		return custList;
	}

	public Map getAllBillByCustomers1(String fkCustomerId) {

		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list = dao.getAllBillByCreditCustomer1(fkCustomerId);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			System.out.println(Arrays.toString(o));
			bean.setBillNo((BigInteger) o[0]);
			bean.setInsertDate(o[1].toString());
			System.out.println("***************" + o[0]);
			map.put(bean.getBillNo(), bean);

		}
		return map;

	}

	public Map getTotalAmtByBillNo(String billNo, String creditCustomer, String shopId)
	{
		DecimalFormat df = new DecimalFormat("#.##");

		Double total2 = 0.0;
		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list = dao.getTotalAmountByBill(billNo, creditCustomer, shopId);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			System.out.println(Arrays.toString(o));
			String total = o[0].toString();
			Double total1 = Double.valueOf(total);
			String discount = o[2].toString();
			Double discount1 = Double.valueOf(discount);
			total2 = total2 + total1;// - discount1;
			System.out.println(total1);
			if( i == (list.size()-1))
			{
				bean.setTotalAmount(Double.parseDouble(df.format(total2)));	
			}
			else
			{
				continue;
			}
			System.out.println("***************" + o[0]);
			System.out.println("Ih helper method getTotal");
			map.put(bean.getBillNo(), bean);
		}
		return map;
	}

	public Map getBalanceAmtByBillNo(String billNo, String creditCustomer, String totalAmount1, String shopId)
	{		
		DecimalFormat df = new DecimalFormat("#.##");
		
		Double total2 = 0.0;
		Double total3 = 0.0;
		Double totalDiscount = 0.0;
		Double totalAfterPayment = 0.0;
		String lastTotalAmt = null;
		String lastBalance = null;
		Double diffrenceTotal = 0.0;
		Double latestbalanceAmt = 0.0;
		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list = dao.getRemainingBalanceAmountByBill(billNo, creditCustomer, shopId);
		Map map = new HashMap();
		int sic = list.size();
		if (sic == 0)
		{
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			//Double totalAmt = dao.getTotalAmt(billNo);
			Double totalAmt = dao.getTotalAmt(billNo,creditCustomer);
			bean.setBalance(totalAmt);
			map.put(bean.getBalance(), bean);
		}
		else
		{
			for (int i = 0; i < list.size(); i++)
			{
				Object[] o = (Object[]) list.get(i);
				GetSupplierDetails bean = new GetSupplierDetails();
        Double newBal = (Double.parseDouble(o[0].toString()));
					
				
				//Double newBal1 = Double.valueOf(newBal);
					System.out.println(newBal+"NEW BALANCE");
					
						bean.setBalance(newBal);
					
				
				
				System.out.println("***************"+o[0]);
				map.put(bean.getBalance(), bean);
			}
		}
		return map;
	}

	public Map getCreditCustomerDetailsForEdit(Long customerId) {

		System.out.println("into helper class");
		CustomerDetailsDao dao1 = new CustomerDetailsDao();
		List catList = dao1.getCreditCustomerForEdit(customerId);

		Map map = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);
			GetCreditCustomerDetails bean = new GetCreditCustomerDetails();
			bean.setFirstName(o[0].toString());
			bean.setMiddleName(o[1].toString());
			bean.setLastName(o[2].toString());
			bean.setEmail(o[3].toString());
			bean.setAddress(o[4].toString());
			bean.setContactNo((BigInteger) o[5]);
			bean.setZipCode((BigInteger) o[6]);
			bean.setAadhar(o[7].toString());

			map.put(bean.getFirstName(), bean);
		}
		System.out.println("out of helper return map : " + map);
		return map;

	}

	public void editCreditCustomer(HttpServletRequest request, HttpServletResponse response) {

		System.out.println("in EditEmployee helper");

		String strcustomerId = request.getParameter("customerId");

		String firstName = request.getParameter("firstName");
		String middleName = request.getParameter("middleName");
		String lastName = request.getParameter("lastName");

		String address = request.getParameter("address");
		String contactNo = request.getParameter("contactNo");
		String aadharNo = request.getParameter("aadharNo");

		String emailId = request.getParameter("emailId");
		String zipCode = request.getParameter("zipCode");

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		transaction = session.beginTransaction();
		long customerId = Long.parseLong(strcustomerId);
		CustomerDetailsBean det = (CustomerDetailsBean) session.get(CustomerDetailsBean.class, customerId);

		det.setFirstName(firstName);
		det.setMiddleName(middleName);
		det.setLastName(lastName);

		det.setAddress(address);
		det.setContactNo(Long.parseLong(contactNo));
		det.setAadhar((aadharNo));
		if ("" != (emailId)) {
			det.setEmailId(emailId);
		} else {
			det.setEmailId("NA");
		}

		det.setZipCode(Long.parseLong(zipCode));

		session.saveOrUpdate(det);
		transaction.commit();

		System.out.println("Record updated successfully.");

	}
	
	
	public Map getAllCustomerHelper()
	{
		System.out.println("GET CUSTOMER CONTROLLER ===============> HELPER");
		// TODO Auto-generated method stub
		CustomerDetailsDao dao = new CustomerDetailsDao();
		List list = dao.getAllCustomer();
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			CustomerDetailsBean bean = new CustomerDetailsBean();
			System.out.println(Arrays.toString(o));
			if (o[0] == null && o[1] == null)
			{
				bean.setFirstName("");
				//bean.setLastName("");
			}
			else
			{
				bean.setFirstName(o[0].toString()+" "+o[1].toString());
				//bean.setLastName(o[1].toString());
				System.out.println("EXPD debit AMOUNT ==========> "+(o[1].toString()+" "+ o[1].toString()));
			}
			map.put(bean.getFirstName(), bean);
		}
		return map;
	}
	
	
	public List getBillNoListByMobileNoForSaleReturnByMobileNo(String contactNumber)
	{
		Map<Long, BillCopy> map = new HashMap<Long, BillCopy>();
		CustomerDetailsDao dao = new CustomerDetailsDao();
		List<BillCopy> custList = dao.getBillNoListByMobileNoForSaleReturnByMobileNo(contactNumber);
		return custList;
	}
	
	

}
