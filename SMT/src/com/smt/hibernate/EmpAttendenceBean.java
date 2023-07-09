package com.smt.hibernate;

import java.io.Serializable;
import java.util.Date;
;

public class EmpAttendenceBean implements Serializable {
	
	private long empId;
	private String firstName;
	private String middleName;
	private String lastName;
	private Long fkShopId;
	private String EmpAttendence;
	private long pkempId;
	private Date date;
	
	

	public EmpAttendenceBean(long empId, String firstName, String middleName, String lastName, Long fkShopId,
			String empAttendence, long pkempId, Date date) {
		super();
		this.empId = empId;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.fkShopId = fkShopId;
		EmpAttendence = empAttendence;
		this.pkempId = pkempId;
		this.date = date;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public long getPkempId() {
		return pkempId;
	}

	public void setPkempId(long pkempId) {
		this.pkempId = pkempId;
	}

	
	public EmpAttendenceBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public String getEmpAttendence() {
		return EmpAttendence;
	}

	public void setEmpAttendence(String empAttendence) {
		EmpAttendence = empAttendence;
	}

	public long getEmpId() {
		return empId;
	}
	public void setEmpId(long empId) {
		this.empId = empId;
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
	public Long getFkShopId() {
		return fkShopId;
	}
	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}
	

}
