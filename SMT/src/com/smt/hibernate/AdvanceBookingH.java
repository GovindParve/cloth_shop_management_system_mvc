package com.smt.hibernate;

import java.util.Date;

public class AdvanceBookingH
{
	private long pkAdvanceBookingIdAB;
	//suppId
	private long supplierId;
	private long productId;
	private long subCatId;
	private long categoryId;
	private String color;
	private Double rollSize;
	private String size;
	private String style;
	private double quantity;
	private long bookingNoAB;
	private String suppCode;
	private Date bookingDateAB;
	private String goodReceiveBillNo;
	private Long fkShopId;	

	public long getPkAdvanceBookingIdAB() {
		return pkAdvanceBookingIdAB;
	}

	public void setPkAdvanceBookingIdAB(long pkAdvanceBookingIdAB) {
		this.pkAdvanceBookingIdAB = pkAdvanceBookingIdAB;
	}

	public long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(long supplierId) {
		this.supplierId = supplierId;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public long getSubCatId() {
		return subCatId;
	}

	public void setSubCatId(long subCatId) {
		this.subCatId = subCatId;
	}

	public long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Double getRollSize() {
		return rollSize;
	}

	public void setRollSize(Double rollSize) {
		this.rollSize = rollSize;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public long getBookingNoAB() {
		return bookingNoAB;
	}

	public void setBookingNoAB(long bookingNoAB) {
		this.bookingNoAB = bookingNoAB;
	}

	public String getSuppCode() {
		return suppCode;
	}

	public void setSuppCode(String suppCode) {
		this.suppCode = suppCode;
	}

	public Date getBookingDateAB() {
		return bookingDateAB;
	}

	public void setBookingDateAB(Date bookingDateAB) {
		this.bookingDateAB = bookingDateAB;
	}

	public String getGoodReceiveBillNo() {
		return goodReceiveBillNo;
	}

	public void setGoodReceiveBillNo(String goodReceiveBillNo) {
		this.goodReceiveBillNo = goodReceiveBillNo;
	}

	public Long getFkShopId() {
		return fkShopId;
	}

	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}

	public AdvanceBookingH() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AdvanceBookingH(long pkAdvanceBookingIdAB, long supplierId, long productId, long subCatId, long categoryId,
			String color, Double rollSize, String size, String style, double quantity, long bookingNoAB,
			String suppCode, Date bookingDateAB, String goodReceiveBillNo, Long fkShopId) {
		super();
		this.pkAdvanceBookingIdAB = pkAdvanceBookingIdAB;
		this.supplierId = supplierId;
		this.productId = productId;
		this.subCatId = subCatId;
		this.categoryId = categoryId;
		this.color = color;
		this.rollSize = rollSize;
		this.size = size;
		this.style = style;
		this.quantity = quantity;
		this.bookingNoAB = bookingNoAB;
		this.suppCode = suppCode;
		this.bookingDateAB = bookingDateAB;
		this.goodReceiveBillNo = goodReceiveBillNo;
		this.fkShopId = fkShopId;
	}
}
