package com.smt.hibernate;

public class LoginEditBillHibernate {
	
	private Long pkLoginEditBillId;
	private String password;
	private Long shopId;
	public Long getPkLoginEditBillId() {
		return pkLoginEditBillId;
	}
	public void setPkLoginEditBillId(Long pkLoginEditBillId) {
		this.pkLoginEditBillId = pkLoginEditBillId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Long getShopId() {
		return shopId;
	}
	public void setShopId(Long shopId) {
		this.shopId = shopId;
	}
	
}
