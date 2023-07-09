package com.smt.hibernate;

import java.util.Date;

public class ShopDetailsBeanH
{
	private Long pkShopId;
	private String shopName;
	private String contactNumber;
	private String gstNo;
	private String shopAddress;
	private String city;
	private Date shopRegDate;
	
	public Long getPkShopId() {
		return pkShopId;
	}
	public void setPkShopId(Long pkShopId) {
		this.pkShopId = pkShopId;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public String getGstNo() {
		return gstNo;
	}
	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getShopAddress() {
		return shopAddress;
	}
	public void setShopAddress(String shopAddress) {
		this.shopAddress = shopAddress;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public Date getShopRegDate() {
		return shopRegDate;
	}
	public void setShopRegDate(Date shopRegDate) {
		this.shopRegDate = shopRegDate;
	}
}
