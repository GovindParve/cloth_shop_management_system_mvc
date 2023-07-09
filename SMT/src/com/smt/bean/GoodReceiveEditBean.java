package com.smt.bean;

import java.util.Date;

public class GoodReceiveEditBean {
	
	private Long pkGoodRecId;
	private Long voucherNo;
	private String purchaseCode;
	private Long barcodeNo;
	private Long barQtyTotalPuchaseQty;
	private Long fkcategoryId;
	private String categoryName;
	private Long fksubCategoryId;
	private String subCategoryName;
	private Long fkProductId;
	private String itemName;
	private String hsnSacno;
	private Double rollSize;
	private String size;
	private String sizeFixed;
	private String color;
	private String style;
	private Double originalQuantity;
	private Double returnQuantity;
	private Double soldQuantity;
	private Double availableQuantity;
	private Double quantity;
	private Double buyPrice;
	private Double salePrice;
	private Double totalSalePrice;
	private Double totalBuyPrice;
	private Double discountPercent;
	private Double discountAmount;
	private Double gst;
	private Double cgst;
	private Double sgst;
	private Double igst;
	private Double taxAmount;
	private Double totalAmount;
	//Purchase Non Grid Details
	private String billNo;
	private String suppCodes;
	private Long fksupplierId;
	private String supplierDetails;
	private String purchaseDate;
	private String contactPerson;
	private String purchasePaymentDueDate;
	private String bookingNoAB;
	private Double totalQuantity;
	private Double totalGST;
	private Double totalIGST;
	private Double totalSGST;
	private Double totalCGST;
	private Double transportExpenses;
	private Double laborExpenses;
	private Double grossTotal;
	private Double pendigBillPayment;
	private Long fkShopId;
	
	public Long getPkGoodRecId() {
		return pkGoodRecId;
	}
	public void setPkGoodRecId(Long pkGoodRecId) {
		this.pkGoodRecId = pkGoodRecId;
	}
	public Long getVoucherNo() {
		return voucherNo;
	}
	public void setVoucherNo(Long voucherNo) {
		this.voucherNo = voucherNo;
	}
	public String getPurchaseCode() {
		return purchaseCode;
	}
	public void setPurchaseCode(String purchaseCode) {
		this.purchaseCode = purchaseCode;
	}
	public Long getBarcodeNo() {
		return barcodeNo;
	}
	public void setBarcodeNo(Long barcodeNo) {
		this.barcodeNo = barcodeNo;
	}
	public Long getBarQtyTotalPuchaseQty() {
		return barQtyTotalPuchaseQty;
	}
	public void setBarQtyTotalPuchaseQty(Long barQtyTotalPuchaseQty) {
		this.barQtyTotalPuchaseQty = barQtyTotalPuchaseQty;
	}
	public Long getFkcategoryId() {
		return fkcategoryId;
	}
	public void setFkcategoryId(Long fkcategoryId) {
		this.fkcategoryId = fkcategoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Long getFksubCategoryId() {
		return fksubCategoryId;
	}
	public void setFksubCategoryId(Long fksubCategoryId) {
		this.fksubCategoryId = fksubCategoryId;
	}
	public String getSubCategoryName() {
		return subCategoryName;
	}
	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
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
	public String getHsnSacno() {
		return hsnSacno;
	}
	public void setHsnSacno(String hsnSacno) {
		this.hsnSacno = hsnSacno;
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
	public String getSizeFixed() {
		return sizeFixed;
	}
	public void setSizeFixed(String sizeFixed) {
		this.sizeFixed = sizeFixed;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getStyle() {
		return style;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public Double getOriginalQuantity() {
		return originalQuantity;
	}
	public void setOriginalQuantity(Double originalQuantity) {
		this.originalQuantity = originalQuantity;
	}
	public Double getReturnQuantity() {
		return returnQuantity;
	}
	public void setReturnQuantity(Double returnQuantity) {
		this.returnQuantity = returnQuantity;
	}
	public Double getSoldQuantity() {
		return soldQuantity;
	}
	public void setSoldQuantity(Double soldQuantity) {
		this.soldQuantity = soldQuantity;
	}
	public Double getAvailableQuantity() {
		return availableQuantity;
	}
	public void setAvailableQuantity(Double availableQuantity) {
		this.availableQuantity = availableQuantity;
	}
	public Double getQuantity() {
		return quantity;
	}
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}
	public Double getBuyPrice() {
		return buyPrice;
	}
	public void setBuyPrice(Double buyPrice) {
		this.buyPrice = buyPrice;
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
	public Double getTotalBuyPrice() {
		return totalBuyPrice;
	}
	public void setTotalBuyPrice(Double totalBuyPrice) {
		this.totalBuyPrice = totalBuyPrice;
	}
	public Double getDiscountPercent() {
		return discountPercent;
	}
	public void setDiscountPercent(Double discountPercent) {
		this.discountPercent = discountPercent;
	}
	public Double getDiscountAmount() {
		return discountAmount;
	}
	public void setDiscountAmount(Double discountAmount) {
		this.discountAmount = discountAmount;
	}
	public Double getGst() {
		return gst;
	}
	public void setGst(Double gst) {
		this.gst = gst;
	}
	public Double getCgst() {
		return cgst;
	}
	public void setCgst(Double cgst) {
		this.cgst = cgst;
	}
	public Double getSgst() {
		return sgst;
	}
	public void setSgst(Double sgst) {
		this.sgst = sgst;
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
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getBillNo() {
		return billNo;
	}
	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}
	public String getSuppCodes() {
		return suppCodes;
	}
	public void setSuppCodes(String suppCodes) {
		this.suppCodes = suppCodes;
	}
	public Long getFksupplierId() {
		return fksupplierId;
	}
	public void setFksupplierId(Long fksupplierId) {
		this.fksupplierId = fksupplierId;
	}
	public String getSupplierDetails() {
		return supplierDetails;
	}
	public void setSupplierDetails(String supplierDetails) {
		this.supplierDetails = supplierDetails;
	}
	public String getPurchaseDate() {
		return purchaseDate;
	}
	public void setPurchaseDate(String purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
	public String getContactPerson() {
		return contactPerson;
	}
	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}
	public String getPurchasePaymentDueDate() {
		return purchasePaymentDueDate;
	}
	public void setPurchasePaymentDueDate(String purchasePaymentDueDate) {
		this.purchasePaymentDueDate = purchasePaymentDueDate;
	}
	public String getBookingNoAB() {
		return bookingNoAB;
	}
	public void setBookingNoAB(String bookingNoAB) {
		this.bookingNoAB = bookingNoAB;
	}
	public Double getTotalQuantity() {
		return totalQuantity;
	}
	public void setTotalQuantity(Double totalQuantity) {
		this.totalQuantity = totalQuantity;
	}
	public Double getTotalGST() {
		return totalGST;
	}
	public void setTotalGST(Double totalGST) {
		this.totalGST = totalGST;
	}
	public Double getTotalIGST() {
		return totalIGST;
	}
	public void setTotalIGST(Double totalIGST) {
		this.totalIGST = totalIGST;
	}
	public Double getTotalSGST() {
		return totalSGST;
	}
	public void setTotalSGST(Double totalSGST) {
		this.totalSGST = totalSGST;
	}
	public Double getTotalCGST() {
		return totalCGST;
	}
	public void setTotalCGST(Double totalCGST) {
		this.totalCGST = totalCGST;
	}
	public Double getTransportExpenses() {
		return transportExpenses;
	}
	public void setTransportExpenses(Double transportExpenses) {
		this.transportExpenses = transportExpenses;
	}
	public Double getLaborExpenses() {
		return laborExpenses;
	}
	public void setLaborExpenses(Double laborExpenses) {
		this.laborExpenses = laborExpenses;
	}
	public Double getGrossTotal() {
		return grossTotal;
	}
	public void setGrossTotal(Double grossTotal) {
		this.grossTotal = grossTotal;
	}
	public Double getPendigBillPayment() {
		return pendigBillPayment;
	}
	public void setPendigBillPayment(Double pendigBillPayment) {
		this.pendigBillPayment = pendigBillPayment;
	}
	public Long getFkShopId() {
		return fkShopId;
	}
	public void setFkShopId(Long fkShopId) {
		this.fkShopId = fkShopId;
	}
	
}
