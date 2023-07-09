package com.smt.bean;

public class ExpenseTypeBean
{
	private String pkExpenseId;
	private String expenseType;
	private String expenseTypeDate;
	
	public String getPkExpenseId() {
		return pkExpenseId;
	}
	public void setPkExpenseId(String pkExpenseId) {
		this.pkExpenseId = pkExpenseId;
	}
	public String getExpenseType() {
		return expenseType;
	}
	public void setExpenseType(String expenseType) {
		this.expenseType = expenseType;
	}
	public String getExpenseTypeDate() {
		return expenseTypeDate;
	}
	public void setExpenseTypeDate(String expenseTypeDate) {
		this.expenseTypeDate = expenseTypeDate;
	}
}
