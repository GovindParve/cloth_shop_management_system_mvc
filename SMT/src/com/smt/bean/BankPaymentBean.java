package com.smt.bean;

import java.util.Date;

public class BankPaymentBean
{
	private String bankName;
	private String pkBankPaymentId;
	private String fkBankDetailId;
	private String serviceProvider;
	private String contactNumber;
	private String accountantName;
	private String paymentType;
	private String crDbAmount;
	private String totalAmount;
	private String insertDate;
	private String paymentDate;
	private String srNo;
	
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getPkBankPaymentId() {
		return pkBankPaymentId;
	}
	public void setPkBankPaymentId(String pkBankPaymentId) {
		this.pkBankPaymentId = pkBankPaymentId;
	}
	public String getFkBankDetailId() {
		return fkBankDetailId;
	}
	public void setFkBankDetailId(String fkBankDetailId) {
		this.fkBankDetailId = fkBankDetailId;
	}
	public String getServiceProvider() {
		return serviceProvider;
	}
	public void setServiceProvider(String serviceProvider) {
		this.serviceProvider = serviceProvider;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getAccountantName() {
		return accountantName;
	}
	public void setAccountantName(String accountantName) {
		this.accountantName = accountantName;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public String getCrDbAmount() {
		return crDbAmount;
	}
	public void setCrDbAmount(String crDbAmount) {
		this.crDbAmount = crDbAmount;
	}
	public String getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}
	public String getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}
	public String getSrNo() {
		return srNo;
	}
	public void setSrNo(String srNo) {
		this.srNo = srNo;
	}
}
