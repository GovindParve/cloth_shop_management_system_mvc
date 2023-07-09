package com.smt.bean;

import java.math.BigInteger;

public class GetCreditCustomerDetails {

	private String village;
	private String firstName;
	private String lastName;
	private String middleName;
	private String address;
	private String email;
	private BigInteger zipCode;
	private BigInteger contactNo;
	private String insertDate;
	private BigInteger billNo;
	private Double totalAmount;
	private Double balance;
	private String aadhar;
	private Long billNo1;
	private Double purchasetotal;
	private Double totalAmount1;
	private Double totalAmount2;
	
	private String productName;
	private String color;
	private String size;
	private Double quantity;
	
	
	private Long fkproductid;
	
	
	public Long getFkproductid() {
		return fkproductid;
	}

	public void setFkproductid(Long fkproductid) {
		this.fkproductid = fkproductid;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public Double getQuantity() {
		return quantity;
	}

	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	public Double getPurchasetotal() {
		return purchasetotal;
	}

	public void setPurchasetotal(Double purchasetotal) {
		this.purchasetotal = purchasetotal;
	}

	public Double getTotalAmount1() {
		return totalAmount1;
	}

	public void setTotalAmount1(Double totalAmount1) {
		this.totalAmount1 = totalAmount1;
	}
	public Double getTotalAmount2() {
		return totalAmount2;
	}

	public void setTotalAmount2(Double totalAmount2){
		this.totalAmount2 = totalAmount2;
	}
	
	
	public Long getBillNo1() {
		return billNo1;
	}

	public void setBillNo1(Long billNo1) {
		this.billNo1 = billNo1;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public BigInteger getZipCode() {
		return zipCode;
	}

	public void setZipCode(BigInteger zipCode) {
		this.zipCode = zipCode;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public String getVillage() {
		return village;
	}

	public void setVillage(String village) {
		this.village = village;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public BigInteger getContactNo() {
		return contactNo;
	}

	public void setContactNo(BigInteger contactNo) {
		this.contactNo = contactNo;
	}

	public BigInteger getBillNo() {
		return billNo;
	}

	public void setBillNo(BigInteger billNo) {
		this.billNo = billNo;
	}

	public String getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getAadhar() {
		return aadhar;
	}

	public void setAadhar(String aadhar) {
		this.aadhar = aadhar;
	}

}
