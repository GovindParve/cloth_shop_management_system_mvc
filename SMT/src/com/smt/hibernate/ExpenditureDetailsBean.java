package com.smt.hibernate;

import java.io.Serializable;
import java.util.Date;

public class ExpenditureDetailsBean implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long pkExpenseDetailsId;
	private String expenseName;
	private Date insertDate;
	private double expdCreditAmount; 
	private double expdDebitAmount;
	private Long fkExpenseTypeId;
	private Long fkShopId;

	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}

	public Long getPkExpenseDetailsId() {
		return pkExpenseDetailsId;
	}

	public void setPkExpenseDetailsId(Long pkExpenseDetailsId) {
		this.pkExpenseDetailsId = pkExpenseDetailsId;
	}

	public String getExpenseName() {
		return expenseName;
	}

	public void setExpenseName(String expenseName) {
		this.expenseName = expenseName;
	}
	
	public double getExpdDebitAmount() {
		return expdDebitAmount;
	}

	public void setExpdDebitAmount(double expdDebitAmount) {
		this.expdDebitAmount = expdDebitAmount;
	}	

	public double getExpdCreditAmount() {
		return expdCreditAmount;
	}

	public void setExpdCreditAmount(double expdCreditAmount) {
		this.expdCreditAmount = expdCreditAmount;
	}

	public Long getFkExpenseTypeId() {
		return fkExpenseTypeId;
	}

	public void setFkExpenseTypeId(Long fkExpenseTypeId) {
		this.fkExpenseTypeId = fkExpenseTypeId;
	}
	
	public Long getFkShopId() {
		return fkShopId;
	}

	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public ExpenditureDetailsBean(Long pkExpenseDetailsId, String expenseName, Date insertDate, double expdCreditAmount,
			double expdDebitAmount, Long fkExpenseTypeId, Long fkShopId) {
		super();
		this.pkExpenseDetailsId = pkExpenseDetailsId;
		this.expenseName = expenseName;
		this.insertDate = insertDate;
		this.expdCreditAmount = expdCreditAmount;
		this.expdDebitAmount = expdDebitAmount;
		this.fkExpenseTypeId = fkExpenseTypeId;
		this.fkShopId = fkShopId;
	}

	public ExpenditureDetailsBean() {
		super();
		// TODO Auto-generated constructor stub
	}
}
