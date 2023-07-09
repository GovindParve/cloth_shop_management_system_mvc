package com.smt.hibernate;

import java.io.Serializable;

public class CustomerDetailsBean implements Serializable {

	private long custId;
	private String firstName;
	private String middleName;
	private String lastName;
	private String address;
	private long contactNo;
	private String emailId;
	private long zipCode;
	private String aadhar;
	private Long fkShopId;	

	public CustomerDetailsBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CustomerDetailsBean(long custId, String firstName, String middleName, String lastName, String address,
			long contactNo, String emailId, long zipCode, String aadhar, Long fkShopId) {
		super();
		this.custId = custId;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.address = address;
		this.contactNo = contactNo;
		this.emailId = emailId;
		this.zipCode = zipCode;
		this.aadhar = aadhar;
		this.fkShopId = fkShopId;
	}

	public long getCustId() {
		return custId;
	}

	public void setCustId(long custId) {
		this.custId = custId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public long getContactNo() {
		return contactNo;
	}

	public void setContactNo(long contactNo) {
		this.contactNo = contactNo;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public long getZipCode() {
		return zipCode;
	}

	public void setZipCode(long zipCode) {
		this.zipCode = zipCode;
	}

	public String getAadhar() {
		return aadhar;
	}

	public void setAadhar(String aadhar) {
		this.aadhar = aadhar;
	}
	
	public Long getFkShopId() {
		return fkShopId;
	}

	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}
}
