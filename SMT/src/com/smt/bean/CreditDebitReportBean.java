package com.smt.bean;

public class CreditDebitReportBean
{	
	private String trIdOrBillNo;
	private String transactionOf;
	private String discription;
	private String transactionDate;
	private String transactionPaymentType;
	private String transactionAmt;
	private Double credit;
	private Double debit;
	private Double Upi;
	private Double upiAmt;

	
	public CreditDebitReportBean(String trIdOrBillNo, String transactionOf, String discription, String transactionDate,
			String transactionPaymentType, String transactionAmt, Double credit, Double debit, Double upi,
			Double upiAmt, String name) {
		super();
		this.trIdOrBillNo = trIdOrBillNo;
		this.transactionOf = transactionOf;
		this.discription = discription;
		this.transactionDate = transactionDate;
		this.transactionPaymentType = transactionPaymentType;
		this.transactionAmt = transactionAmt;
		this.credit = credit;
		this.debit = debit;
		Upi = upi;
		this.upiAmt = upiAmt;
		this.name = name;
	}
	public CreditDebitReportBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Double getUpiAmt() {
		return upiAmt;
	}
	public void setUpiAmt(Double upiAmt) {
		this.upiAmt = upiAmt;
	}
	private String name;
	public String getTrIdOrBillNo() {
		return trIdOrBillNo;
	}
	public void setTrIdOrBillNo(String trIdOrBillNo) {
		this.trIdOrBillNo = trIdOrBillNo;
	}
	public String getTransactionOf() {
		return transactionOf;
	}
	public void setTransactionOf(String transactionOf) {
		this.transactionOf = transactionOf;
	}
	public String getDiscription() {
		return discription;
	}
	public void setDiscription(String discription) {
		this.discription = discription;
	}
	public String getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}
	public String getTransactionPaymentType() {
		return transactionPaymentType;
	}
	public void setTransactionPaymentType(String transactionPaymentType) {
		this.transactionPaymentType = transactionPaymentType;
	}
	public String getTransactionAmt() {
		return transactionAmt;
	}
	public void setTransactionAmt(String transactionAmt) {
		this.transactionAmt = transactionAmt;
	}
	public Double getCredit() {
		return credit;
	}
	public void setCredit(Double credit) {
		this.credit = credit;
	}
	public Double getDebit() {
		return debit;
	}
	public void setDebit(Double debit) {
		this.debit = debit;
	}
	public Double getUpi() {
		return Upi;
	}
	public void setUpi(Double upi) {
		Upi = upi;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	
}
