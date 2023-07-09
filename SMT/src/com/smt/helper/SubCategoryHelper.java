package com.smt.helper;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.smt.dao.CategoryDao;
import com.smt.dao.SubCategoryDao;
import com.smt.hibernate.SubCategory;

public class SubCategoryHelper {
	public void regSubCategory(HttpServletRequest request, HttpServletResponse response) {

		String shopId = request.getParameter("shopId");
		String subcatName = request.getParameter("subcatName");
		String fkRootcatId = request.getParameter("fkRootcatId");

		SubCategory subCategory = new SubCategory();
		subCategory.setFkShopId(Long.parseLong(shopId));
		subCategory.setSubcatName(subcatName);
		subCategory.setFkRootcatId(Long.parseLong(fkRootcatId));
		subCategory.setActiveYn("Y");
		SubCategoryDao dao = new SubCategoryDao();
		dao.valCategory(subCategory);
	}

	public List getAllMainSubCategories() {
		SubCategoryDao dao = new SubCategoryDao();
		return dao.getAllSubCategories();

	}

	public List getAllCategoriesWiseSubCategories(HttpServletRequest request, HttpServletResponse response) {
		String catId = request.getParameter("catId");
		SubCategoryDao dao = new SubCategoryDao();
		return dao.getAllCategoriesWiseSubCategories(catId);

	}

	// rename Category
	public void reNameSubCategory(HttpServletRequest request, HttpServletResponse response) {

		String reNameCat = request.getParameter("reNameCat");

		SubCategoryDao dao = new SubCategoryDao();
		Long subcatId = Long.parseLong(request.getParameter("subcatId"));
		System.out.println("pk_temp_id" + subcatId);
		dao.reNameSubCategory(subcatId, reNameCat);

	}
	
	// delete Category
	public void deleteSubCategory(HttpServletRequest request, HttpServletResponse response)
	{
		String reNameCat = request.getParameter("reNameCat");

		SubCategoryDao dao = new SubCategoryDao();
		Long pk_SubCat_id = Long.parseLong(request.getParameter("pk_SubCat_id"));
		System.out.println("pk_temp_id" + pk_SubCat_id);
		dao.deleteSubCategory(pk_SubCat_id);
	}

}
