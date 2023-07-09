package com.smt.bean;

import java.math.BigDecimal;

public class SaleInvoiceBillEditBean {
	
	//Non Grid Data Types
	private Long pkOtherBillId;
	private String BillType;
	private String billNo;
	private Double totalAmount;
	private String paymentMode;
	private Double oldCashAmount;
	private Double oldCardAmount;
	private Double oldUpiAmount;
	private Double oldUpiCashAmount;
	private String creditCustomerName;
	private String customerGstNo;
	private String customerMobileNo;
	private Double grossTotal;
	//Grid Data Types
	private Long item_id;
	private Long barcodeNo;
	private Long fkProductId;
	private String itemName;
	private Long fkCategoryId;
	private String categoryName;
	private Long fkSubCatId;
	private String subCategoryName;
	private String hsnSacNo;
	private double rollSize;
	private String size1;
	private String style;
	private Double mtrQuantity;
	private double goodReceiveQuantity;;
	private Double stockQuantity;
	private Double oldSaleQuantityToUpdateStock;
	private double quantity;
	private Double salePrice;
	private Double fixedSalePrice;
	private Double sPWithoutTax;
	private Double disPerForBill;
	private Double disAmount;
	private Double spAfterDis;
	private Double vat;
	private Double igst;
	private Double taxAmount;
	private Double taxAmountAfterDis;
	private Double total;
	private String employeeName1;
	private String fkSuppId;
	private Long fkShopId;
	
	
	//Not used Data Types
	/*private String Billno;
	private String color;
	private Long size;
	private Double vatPercentage;
	private Double discount;
	private Long offerId;
	private Long cat_id;
	private Double commision;
	private Double buyPrice;
	private String supplierName;
	private BigDecimal avilableQuan;
	//private Double mtrQuantity;
	private Long fksaleEmployeeid;
	private String EmpName;
	private Long pkTempid;*/
	
	
	public Long getPkOtherBillId() {
		return pkOtherBillId;
	}
	public void setPkOtherBillId(Long pkOtherBillId) {
		this.pkOtherBillId = pkOtherBillId;
	}
	public String getBillType() {
		return BillType;
	}
	public void setBillType(String billType) {
		BillType = billType;
	}
	public String getBillNo() {
		return billNo;
	}
	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	public Double getOldCashAmount() {
		return oldCashAmount;
	}
	public void setOldCashAmount(Double oldCashAmount) {
		this.oldCashAmount = oldCashAmount;
	}
	public Double getOldCardAmount() {
		return oldCardAmount;
	}
	public void setOldCardAmount(Double oldCardAmount) {
		this.oldCardAmount = oldCardAmount;
	}
	public Double getOldUpiAmount() {
		return oldUpiAmount;
	}
	public void setOldUpiAmount(Double oldUpiAmount) {
		this.oldUpiAmount = oldUpiAmount;
	}
	public Double getOldUpiCashAmount() {
		return oldUpiCashAmount;
	}
	public void setOldUpiCashAmount(Double oldUpiCashAmount) {
		this.oldUpiCashAmount = oldUpiCashAmount;
	}
	public String getCreditCustomerName() {
		return creditCustomerName;
	}
	public void setCreditCustomerName(String creditCustomerName) {
		this.creditCustomerName = creditCustomerName;
	}
	public String getCustomerGstNo() {
		return customerGstNo;
	}
	public void setCustomerGstNo(String customerGstNo) {
		this.customerGstNo = customerGstNo;
	}
	public String getCustomerMobileNo() {
		return customerMobileNo;
	}
	public void setCustomerMobileNo(String customerMobileNo) {
		this.customerMobileNo = customerMobileNo;
	}
	public Double getGrossTotal() {
		return grossTotal;
	}
	public void setGrossTotal(Double grossTotal) {
		this.grossTotal = grossTotal;
	}
	public Long getItem_id() {
		return item_id;
	}
	public void setItem_id(Long item_id) {
		this.item_id = item_id;
	}
	public Long getBarcodeNo() {
		return barcodeNo;
	}
	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
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
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Long getFkSubCatId() {
		return fkSubCatId;
	}
	public void setFkSubCatId(Long fkSubCatId) {
		this.fkSubCatId = fkSubCatId;
	}
	public String getSubCategoryName() {
		return subCategoryName;
	}
	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}
	public String getHsnSacNo() {
		return hsnSacNo;
	}
	public void setHsnSacNo(String hsnSacNo) {
		this.hsnSacNo = hsnSacNo;
	}
	public double getRollSize() {
		return rollSize;
	}
	public void setRollSize(double rollSize) {
		this.rollSize = rollSize;
	}
	public String getSize1() {
		return size1;
	}
	public void setSize1(String size1) {
		this.size1 = size1;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public Double getMtrQuantity() {
		return mtrQuantity;
	}
	public void setMtrQuantity(Double mtrQuantity) {
		this.mtrQuantity = mtrQuantity;
	}
	public double getGoodReceiveQuantity() {
		return goodReceiveQuantity;
	}
	public void setGoodReceiveQuantity(double goodReceiveQuantity) {
		this.goodReceiveQuantity = goodReceiveQuantity;
	}
	public Double getStockQuantity() {
		return stockQuantity;
	}
	public void setStockQuantity(Double stockQuantity) {
		this.stockQuantity = stockQuantity;
	}
	public Double getOldSaleQuantityToUpdateStock() {
		return oldSaleQuantityToUpdateStock;
	}
	public void setOldSaleQuantityToUpdateStock(Double oldSaleQuantityToUpdateStock) {
		this.oldSaleQuantityToUpdateStock = oldSaleQuantityToUpdateStock;
	}
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public Double getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}
	public Double getFixedSalePrice() {
		return fixedSalePrice;
	}
	public void setFixedSalePrice(Double fixedSalePrice) {
		this.fixedSalePrice = fixedSalePrice;
	}
	public Double getsPWithoutTax() {
		return sPWithoutTax;
	}
	public void setsPWithoutTax(Double sPWithoutTax) {
		this.sPWithoutTax = sPWithoutTax;
	}
	public Double getDisPerForBill() {
		return disPerForBill;
	}
	public void setDisPerForBill(Double disPerForBill) {
		this.disPerForBill = disPerForBill;
	}
	public Double getDisAmount() {
		return disAmount;
	}
	public void setDisAmount(Double disAmount) {
		this.disAmount = disAmount;
	}
	public Double getSpAfterDis() {
		return spAfterDis;
	}
	public void setSpAfterDis(Double spAfterDis) {
		this.spAfterDis = spAfterDis;
	}
	public Double getVat() {
		return vat;
	}
	public void setVat(Double vat) {
		this.vat = vat;
	}
	public Double getIgst() {
		return igst;
	}
	public void setIgst(Double igst) {
		this.igst = igst;
	}
	public Double getTaxAmount() {
		return taxAmount;
	}
	public void setTaxAmount(Double taxAmount) {
		this.taxAmount = taxAmount;
	}
	public Double getTaxAmountAfterDis() {
		return taxAmountAfterDis;
	}
	public void setTaxAmountAfterDis(Double taxAmountAfterDis) {
		this.taxAmountAfterDis = taxAmountAfterDis;
	}
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}
	public String getEmployeeName1() {
		return employeeName1;
	}
	public void setEmployeeName1(String employeeName1) {
		this.employeeName1 = employeeName1;
	}
	public String getFkSuppId() {
		return fkSuppId;
	}
	public void setFkSuppId(String fkSuppId) {
		this.fkSuppId = fkSuppId;
	}
	public Long getFkShopId() {
		return fkShopId;
	}
	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}
	
}
