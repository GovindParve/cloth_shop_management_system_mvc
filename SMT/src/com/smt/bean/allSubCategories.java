package com.smt.bean;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.smt.hibernate.Category;

public class allSubCategories
{


	/** identifier field */
	private Long pkSubcatId;

	/** persistent field */
	private String activeYn;

	/** persistent field */
	private Long fkRootcatId;

	/** persistent field */
	private String isLeafCatId;

	/** persistent field */
	private String isrootCat;

	/** persistent field */
	private String subcatName;

	private String catName;

	private Long serialnumber;

	

	public Long getSerialnumber() {
		return serialnumber;
	}

	public void setSerialnumber(Long serialnumber) {
		this.serialnumber = serialnumber;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	private Category category;

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Long getPkSubcatId() {
		return this.pkSubcatId;
	}

	public void setPkSubcatId(Long pkSubcatId) {
		this.pkSubcatId = pkSubcatId;
	}

	public String getActiveYn() {
		return this.activeYn;
	}

	public void setActiveYn(String activeYn) {
		this.activeYn = activeYn;
	}

	public Long getFkRootcatId() {
		return this.fkRootcatId;
	}

	public void setFkRootcatId(Long fkRootcatId) {
		this.fkRootcatId = fkRootcatId;
	}

	public String getIsLeafCatId() {
		return this.isLeafCatId;
	}

	public void setIsLeafCatId(String isLeafCatId) {
		this.isLeafCatId = isLeafCatId;
	}

	public String getIsrootCat() {
		return this.isrootCat;
	}

	public void setIsrootCat(String isrootCat) {
		this.isrootCat = isrootCat;
	}

	public String getSubcatName() {
		return this.subcatName;
	}

	public void setSubcatName(String subcatName) {
		this.subcatName = subcatName;
	}

	public String toString() {
		return new ToStringBuilder(this).append("pkSubcatId", getPkSubcatId()).toString();
	}
}
