package com.smt.hibernate;

import java.util.Date;

public class BankPaymentBeanH
{
	private Long pkBankPaymentId;
	private Long fkBankDetailId;
	private String serviceProvider;
	private Long contactNumber;
	private String accountantName;
	private String paymentType;
	private Double crDbAmount;
	private Double totalAmount;
	private Date insertDate;
	private Date paymentDate;
	private Long fkShopId;
	
	public Long getPkBankPaymentId() {
		return pkBankPaymentId;
	}

	public void setPkBankPaymentId(Long pkBankPaymentId) {
		this.pkBankPaymentId = pkBankPaymentId;
	}

	public Long getFkBankDetailId() {
		return fkBankDetailId;
	}

	public void setFkBankDetailId(Long fkBankDetailId) {
		this.fkBankDetailId = fkBankDetailId;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	
	public String getServiceProvider() {
		return serviceProvider;
	}

	public void setServiceProvider(String serviceProvider) {
		this.serviceProvider = serviceProvider;
	}

	public Long getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(Long contactNumber) {
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

	public Double getCrDbAmount() {
		return crDbAmount;
	}

	public void setCrDbAmount(Double crDbAmount) {
		this.crDbAmount = crDbAmount;
	}

	public Long getFkShopId() {
		return fkShopId;
	}

	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}
}
