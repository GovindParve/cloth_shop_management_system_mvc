package com.smt.hibernate;

import java.util.Date;

public class ExpenditureTypeBeanH
{
	Long pk_expenseType_Id;
	String expenseTypeName;
	Date insertDate;
	private Long fkShopId;
	
	public Long getPk_expenseType_Id() {
		return pk_expenseType_Id;
	}
	
	public void setPk_expenseType_Id(Long pk_expenseType_Id) {
		this.pk_expenseType_Id = pk_expenseType_Id;
	}
	
	public String getExpenseTypeName() {
		return expenseTypeName;
	}
	
	public void setExpenseTypeName(String expenseTypeName) {
		this.expenseTypeName = expenseTypeName;
	}
	
	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}
	
	public Long getFkShopId() {
		return fkShopId;
	}

	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}
}
