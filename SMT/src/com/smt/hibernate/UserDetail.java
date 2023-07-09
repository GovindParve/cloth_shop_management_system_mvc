package com.smt.hibernate;

import java.io.Serializable;

/** @author Hibernate CodeGenerator */
public class UserDetail implements Serializable {

	/** identifier field */
	private Long pkUserId;
	/** nullable persistent field */
	private String typeId;
	/** nullable persistent field */
	private String userName;
	/** nullable persistent field */
	private String userEmail;
	private String password;
	/** nullable persistent field */
	private String repassword;
	private Long fkShopId;
	
	public Long getPkUserId() {
		return pkUserId;
	}
	public void setPkUserId(Long pkUserId) {
		this.pkUserId = pkUserId;
	}
	
	public String getTypeId() {
		return typeId;
	}
	
	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getUserEmail() {
		return userEmail;
	}
	
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getRepassword() {
		return repassword;
	}
	
	public void setRepassword(String repassword) {
		this.repassword = repassword;
	}
	
	public Long getFkShopId() {
		return fkShopId;
	}

	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}
}
