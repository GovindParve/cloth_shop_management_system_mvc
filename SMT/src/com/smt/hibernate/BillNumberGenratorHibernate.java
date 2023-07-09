package com.smt.hibernate;

import java.util.Date;

public class BillNumberGenratorHibernate {
	
	private Long billNnumberGgenratorPk;
	private Long billNoCountor;
	private Long fkShopId;
	private Date updatedDate;
	
	public Long getBillNnumberGgenratorPk() {
		return billNnumberGgenratorPk;
	}
	public void setBillNnumberGgenratorPk(Long billNnumberGgenratorPk) {
		this.billNnumberGgenratorPk = billNnumberGgenratorPk;
	}
	public Long getBillNoCountor() {
		return billNoCountor;
	}
	public void setBillNoCountor(Long billNoCountor) {
		this.billNoCountor = billNoCountor;
	}
	
	public Long getFkShopId() {
		return fkShopId;
	}
	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}
	
	public Date getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

}