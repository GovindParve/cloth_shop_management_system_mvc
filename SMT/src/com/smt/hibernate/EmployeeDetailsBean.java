package com.smt.hibernate;

import java.io.Serializable;
import java.util.Date;

public class EmployeeDetailsBean implements Serializable {

	private long empId;
	private String firstName;
	private String middleName;
	private String lastName;
	private String address;
	private Date joiningDate;
	private long contactNo;
	private String emailId;
	private Double salary;
	private long zipCode;
	private Date resignDate;
	private Long fkShopId;
	private String EmpIdNo;
	
	public String getEmpIdNo() {
		return EmpIdNo;
	}

	public void setEmpIdNo(String empIdNo) {
		EmpIdNo = empIdNo;
	}

	public long getZipCode() {
		return zipCode;
	}

	public void setZipCode(long zipCode) {
		this.zipCode = zipCode;
	}

	public long getEmpId() {
		return empId;
	}

	public void setEmpId(long empId) {
		this.empId = empId;
	}

	private long zipcode;

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

	public Date getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
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

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}



	public Date getResignDate() {
		return resignDate;
	}

	public void setResignDate(Date resignDate) {
		this.resignDate = resignDate;
	}
	
	public Long getFkShopId() {
		return fkShopId;
	}

	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}



	public EmployeeDetailsBean(long empId, String firstName, String middleName, String lastName, String address,
			Date joiningDate, long contactNo, String emailId, Double salary, long zipCode, Date resignDate,
			Long fkShopId, String empIdNo) {
		super();
		this.empId = empId;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.address = address;
		this.joiningDate = joiningDate;
		this.contactNo = contactNo;
		this.emailId = emailId;
		this.salary = salary;
		this.zipCode = zipCode;
		this.resignDate = resignDate;
		this.fkShopId = fkShopId;
		this.EmpIdNo = empIdNo;
		
	}

	public EmployeeDetailsBean() {
		super();
		// TODO Auto-generated constructor stub
	}
}
