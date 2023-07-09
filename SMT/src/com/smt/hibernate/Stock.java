package com.smt.hibernate;

import java.util.Date;

public class Stock {

	public long PkStockId;
	public String itemName;
	public String catName;
	private double quantity;
	private Date UpdateDate;
	private String date;
	private Long datediff;
	private String qty2;
	private String size;
	private String subCatName;
	private Long fkCategoryId;
	private Long fkProductId;
	private String barcodeNo;
	private String buyPrice;
	private String salePrice;
	private Long fkShopId;
	private String color;
	

	public Stock() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Stock(long pkStockId, String itemName, String catName, double quantity, Date updateDate, String date,
			Long datediff, String qty2, String size, String subCatName, Long fkCategoryId, Long fkProductId,
			String barcodeNo, String buyPrice, String salePrice, Long fkShopId, String color) {
		super();
		PkStockId = pkStockId;
		this.itemName = itemName;
		this.catName = catName;
		this.quantity = quantity;
		UpdateDate = updateDate;
		this.date = date;
		this.datediff = datediff;
		this.qty2 = qty2;
		this.size = size;
		this.subCatName = subCatName;
		this.fkCategoryId = fkCategoryId;
		this.fkProductId = fkProductId;
		this.barcodeNo = barcodeNo;
		this.buyPrice = buyPrice;
		this.salePrice = salePrice;
		this.fkShopId = fkShopId;
		this.color = color;
	}

	public Long getDatediff() {
		return datediff;
	}

	public void setDatediff(Long datediff) {
		this.datediff = datediff;
	}

	public long getPkStockId() {
		return PkStockId;
	}

	public void setPkStockId(long pkStockId) {
		PkStockId = pkStockId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public Date getUpdateDate() {
		return UpdateDate;
	}

	public void setUpdateDate(Date updateDate) {
		UpdateDate = updateDate;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getQty2() {
		return qty2;
	}

	public void setQty2(String qty2) {
		this.qty2 = qty2;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getSubCatName() {
		return subCatName;
	}

	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}

	public Long getFkCategoryId() {
		return fkCategoryId;
	}

	public void setFkCategoryId(Long fkCategoryId) {
		this.fkCategoryId = fkCategoryId;
	}

	public Long getFkProductId() {
		return fkProductId;
	}

	public void setFkProductId(Long fkProductId) {
		this.fkProductId = fkProductId;
	}

	public String getBarcodeNo() {
		return barcodeNo;
	}

	public void setBarcodeNo(String barcodeNo) {
		this.barcodeNo = barcodeNo;
	}

	public String getBuyPrice() {
		return buyPrice;
	}

	public void setBuyPrice(String buyPrice) {
		this.buyPrice = buyPrice;
	}

	public String getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(String salePrice) {
		this.salePrice = salePrice;
	}

	public Long getFkShopId() {
		return fkShopId;
	}

	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}
}