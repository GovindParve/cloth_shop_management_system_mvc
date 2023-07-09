package com.smt.hibernate;

import java.util.Date;

public class BarcodeNumberWiseStockDetailsHibernate {
	
	public Long pkBarcodeNoWiseStockId;
	private Long fkProductId;
	public String itemName;
	private Long fkCategoryId;
	public String catName;
	private Long fkSubCategoryId;
	public String subCategoryName;
	private Double barcodeNumberWiseStockQuantity;
	private Double originalQuantity;
	private String barcodeNo;
	private Double buyPrice;
	private Double totalBuyPrice;
	private Double salePrice;
	private Double totalSalePrice;
	private Date updateDate;
	private Long fkShopId;
	
	public Long getPkBarcodeNoWiseStockId() {
		return pkBarcodeNoWiseStockId;
	}
	public void setPkBarcodeNoWiseStockId(Long pkBarcodeNoWiseStockId) {
		this.pkBarcodeNoWiseStockId = pkBarcodeNoWiseStockId;
	}
	public Long getFkProductId() {
		return fkProductId;
	}
	public void setFkProductId(Long fkProductId) {
		this.fkProductId = fkProductId;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public Long getFkCategoryId() {
		return fkCategoryId;
	}
	public void setFkCategoryId(Long fkCategoryId) {
		this.fkCategoryId = fkCategoryId;
	}
	public String getCatName() {
		return catName;
	}
	public void setCatName(String catName) {
		this.catName = catName;
	}
	public Long getFkSubCategoryId() {
		return fkSubCategoryId;
	}
	public void setFkSubCategoryId(Long fkSubCategoryId) {
		this.fkSubCategoryId = fkSubCategoryId;
	}
	public String getSubCategoryName() {
		return subCategoryName;
	}
	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}
	public Double getBarcodeNumberWiseStockQuantity() {
		return barcodeNumberWiseStockQuantity;
	}
	public void setBarcodeNumberWiseStockQuantity(Double barcodeNumberWiseStockQuantity) {
		this.barcodeNumberWiseStockQuantity = barcodeNumberWiseStockQuantity;
	}
	public Double getOriginalQuantity() {
		return originalQuantity;
	}
	public void setOriginalQuantity(Double originalQuantity) {
		this.originalQuantity = originalQuantity;
	}
	public String getBarcodeNo() {
		return barcodeNo;
	}
	public void setBarcodeNo(String barcodeNo) {
		this.barcodeNo = barcodeNo;
	}
	public Double getBuyPrice() {
		return buyPrice;
	}
	public void setBuyPrice(Double buyPrice) {
		this.buyPrice = buyPrice;
	}
	public Double getTotalBuyPrice() {
		return totalBuyPrice;
	}
	public void setTotalBuyPrice(Double totalBuyPrice) {
		this.totalBuyPrice = totalBuyPrice;
	}
	public Double getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}
	public Double getTotalSalePrice() {
		return totalSalePrice;
	}
	public void setTotalSalePrice(Double totalSalePrice) {
		this.totalSalePrice = totalSalePrice;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public Long getFkShopId() {
		return fkShopId;
	}
	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}
	
}
