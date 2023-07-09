package com.smt.helper;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.dao.BankDetailsDao;
import com.smt.dao.ProductDetailDao;
import com.smt.hibernate.BankDetailsH;
import com.smt.hibernate.ProductRegister;

public class BankDetailsHelper
{
	public void addBank(HttpServletRequest request, HttpServletResponse response)
	{
		String shopId = request.getParameter("shopId");
		String bankName = request.getParameter("bankName");
		String accountNumber = request.getParameter("accountNumber");
		String bankIfscCode = request.getParameter("bankIfscCode");
		String address = request.getParameter("address");
		String contactNo = request.getParameter("contactNo");
		String bankBranchName = request.getParameter("bankBranchName");
		String bankAccountHname = request.getParameter("bankAccountHname");
		
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		Date dateobj = new Date();
	
		String newDate = df.format(dateobj);
	
		BankDetailsH bank = new BankDetailsH();
	
		bank.setFkShopId(Long.parseLong(shopId));
		bank.setBankName(bankName);
		bank.setAccountNumber(accountNumber);
		bank.setBankIfscCode(bankIfscCode);
		bank.setAddress(address);
		bank.setContactNo(Long.parseLong(contactNo));
		bank.setAddress(address);
		bank.setContactNo(Long.parseLong(contactNo));
		bank.setBankBranchName(bankBranchName);
		bank.setAccountHolderName(bankAccountHname);
	
		BankDetailsDao reg = new BankDetailsDao();
		reg.addBankdatailsDAO(bank);		
	}	
}
