package com.smt.dao;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;

import com.smt.bean.BillCopy;
import com.smt.bean.CategoryDetails;
import com.smt.bean.GoodReceiveEditBean;
import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.ItemList;
import com.smt.bean.ProductNameBean;
import com.smt.bean.PurchaseReport;
import com.smt.bean.UpdateProductDetails;
import com.smt.hibernate.Category;
import com.smt.hibernate.ProductRegister;
import com.smt.hibernate.SubCategory;
import com.smt.utility.HibernateUtility;

public class ProductDetailDao {

	public List getAllProductDetails() {

		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<UpdateProductDetails> proList = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select s.shop_name , sup.supplier_name , c.category_name ,sc.subcat_name ,p.pk_product_id, p.item_name , p.is_vat , p.vat_percentage , p.is_alternate_product , p.is_item , p.commision from product_details p left join shop_detail s ON p.fk_shop_id=s.shop_id left join supplier_details sup ON p.fk_vendor_id = sup.supplier_id left join categories c ON p.fk_cat_id = c.pk_category_id left join sub_categories sc ON sc.fk_rootcat_id = c.pk_category_id");
			list = query.list();
			proList = new ArrayList<UpdateProductDetails>(0);

			for (Object[] objects : list) {

				UpdateProductDetails productDetails = new UpdateProductDetails();
				productDetails.setShopName(objects[0].toString());
				productDetails.setSupplierName(objects[1].toString());
				productDetails.setCategoryName(objects[2].toString());
				productDetails.setSubCatName(objects[3].toString());
				productDetails.setProductId(Long.parseLong(objects[4].toString()));
				productDetails.setProductName(objects[5].toString());
				productDetails.setIsVat(objects[6].toString());
				productDetails.setVatPercentage(Double.parseDouble(objects[7].toString()));
				productDetails.setIsAlterNate(objects[8].toString());
				productDetails.setIsItem(objects[9].toString());
				productDetails.setCommission(Double.parseDouble(objects[10].toString()));

				proList.add(productDetails);

			}

		} catch (Exception e) {
			Log.error("Error in getAllProductDetails Method ", e);
			// TODO: handle exception
		} finally

		{
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return proList;

	}

	public List getLeafcatBYCatandSubCategory(String catID, String subCatID) {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("select i.leafcatName from ItemDetail as i join i.productDetail where i.productDetail.category.subCategory.pkSubcatId=" + subCatID);
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getLeafcatBYCatandSubCategory", e);
			// TODO: handle exception
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}
		}

		return list;

	}

	public List getAllProductName(String productId) {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select p.item_name,p.pk_product_id from product_details p where p.pk_product_id=" + productId);
			list = query.list();
		} catch (RuntimeException e) {

			Log.error("Error In getAllProductname", e);
			// TODO: handle exception
		} finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
		return list;
	}

	/****** code for edit item details *****/

	public List getallItemDetails(String productId) {
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select i.item_name,i.color,i.size,i.sale_price,i.buy_price,i.mmcc,i.pk_item_id from item_details i where i.pk_item_id=" + productId);
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getallItemDetails", e);
			// TODO: handle exception
		} finally {
			if (session != null) {
				hbu.closeSession(session);

			}
		}
		return list;

	}

	public void doProductRegister(ProductRegister pdreg) {

		HibernateUtility hbu = null;
		Session session = null;
		org.hibernate.Transaction transaction = null;

		Category category = null;
		Long fkCategoryId = null;
		Long fkSubCategoryId = null;

		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();

			fkCategoryId = pdreg.getFkCategoryId();
			fkSubCategoryId = pdreg.getFkSubCategoryId();
			Category supdetail = (Category) session.load(Category.class, fkCategoryId);
			SubCategory subCat = (SubCategory) session.load(SubCategory.class, fkSubCategoryId);
			pdreg.setCategory(supdetail);
			pdreg.setSubCategory(subCat);

			session.save(pdreg);

			transaction.commit();
		} catch (RuntimeException e) {

			try {
				transaction.rollback();
			} catch (RuntimeException e2) {
				Log.error("Error in PRODUCTDETAIL Add FORM", e2);
			}
		}

		finally
		{
			if (session != null)
			{
				hbu.closeSession(session);
			}
		}
	}

	public List getAllItemName(String shopId)
	{
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<ProductNameBean> itemList = null;
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		
		query = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.color, p.size, p.FkCatId, p.fkSubCategoryId, sc.subcat_name, p.pkProductNameId, sd.pkShopId from product_reg p LEFT JOIN categories c ON p.FkCatId = c.pk_category_id JOIN sub_categories sc on p.fkSubCategoryId = sc.pk_subcat_id JOIN shopdetails sd ON p.fkShopId = sd.pkShopId WHERE p.fkShopId = "+shopId+" GROUP BY p.ProductName, c.category_name, sc.subcat_name");
		list = query.list();

		itemList = new ArrayList<ProductNameBean>(0);
		for (Object[] objects : list)
		{
			ProductNameBean item = new ProductNameBean();
			item.setItemName(objects[0].toString());
			item.setCaregoryName(objects[1].toString());
			item.setHsnsacno(objects[2].toString());
			item.setFkCatId(objects[5].toString());
			item.setSubCatid(objects[6].toString());
			item.setSubCat(objects[7].toString());
			item.setProductid(objects[8].toString());
			String color = objects[3].toString();

			String size = objects[4].toString();

			if (color.equals("null")) {
				item.setColor("N/A");
			} else {
				item.setColor(color);
			}
			if (size.equals("null")) {
				item.setSize("N/A");
			} else {
				item.setSize(size);
			}

			itemList.add(item);
		}

		hbu.closeSession(session);
		return itemList;
	}
	
	public List getAllItemListWithoutBarcodeForBillingDao(String shopId)
	{
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List<Object[]> list = null;
		List<ProductNameBean> itemList = null;
		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		
		//query = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.color, p.size, p.FkCatId, p.fkSubCategoryId, sc.subcat_name, p.pkProductNameId, sd.pkShopId from product_reg p LEFT JOIN categories c ON p.FkCatId = c.pk_category_id JOIN sub_categories sc on p.fkSubCategoryId = sc.pk_subcat_id JOIN shopdetails sd ON p.fkShopId = sd.pkShopId WHERE p.fkShopId = "+shopId+" GROUP BY p.ProductName, c.category_name, sc.subcat_name");
		
		//query = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.color, p.size, p.FkCatId, p.fkSubCategoryId, sc.subcat_name, p.pkProductNameId, sd.pkShopId from product_reg p LEFT JOIN categories c ON p.FkCatId = c.pk_category_id JOIN sub_categories sc on p.fkSubCategoryId = sc.pk_subcat_id JOIN shopdetails sd ON p.fkShopId = sd.pkShopId WHERE p.fkShopId = "+shopId+" GROUP BY p.ProductName, c.category_name, sc.subcat_name");
		
		//query = session.createSQLQuery("SELECT bns.fk_Product_Id, bns.item_name, bns.fk_cat_id, bns.category_name, bns.barcode_no, bns.quantity, bns.buy_price, bns.sale_price, p.HsnSacNo, p.color, p.size, p.fkSubCategoryId, sc.subcat_name, sd.pkShopId FROM barcode_number_wise_stock_details bns LEFT JOIN product_reg p LEFT JOIN categories c ON p.FkCatId = c.pk_category_id JOIN sub_categories sc on p.fkSubCategoryId = sc.pk_subcat_id JOIN shopdetails sd ON p.fkShopId = sd.pkShopId WHERE p.fkShopId = "+shopId+" GROUP BY p.ProductName, c.category_name, sc.subcat_name");
		
		//query = session.createSQLQuery("SELECT bns.barcode_no, bns.quantity, bns.buy_price, bns.sale_price, p.pkProductNameId, p.ProductName, p.FkCatId, c.category_name, p.HsnSacNo, p.color, p.size, p.fkSubCategoryId, sc.subcat_name, sd.pkShopId FROM barcode_number_wise_stock_details bns LEFT JOIN product_reg p ON bns.fk_Product_Id = p.pkProductNameId JOIN categories c ON p.FkCatId = c.pk_category_id JOIN sub_categories sc on p.fkSubCategoryId = sc.pk_subcat_id JOIN shopdetails sd ON p.fkShopId = sd.pkShopId WHERE bns.quantity > 0 AND p.fkShopId = "+shopId+" GROUP BY p.ProductName, c.category_name, sc.subcat_name");
		
		query = session.createSQLQuery("SELECT bns.barcode_no, bns.barcode_number_wise_stock_quantity, p.pkProductNameId, p.ProductName, p.FkCatId, c.category_name, p.HsnSacNo, p.color, p.size, p.fkSubCategoryId, sc.subcat_name, sd.pkShopId FROM barcode_number_wise_stock_details bns JOIN product_reg p ON bns.fk_Product_Id = p.pkProductNameId JOIN categories c ON p.FkCatId = c.pk_category_id JOIN sub_categories sc on p.fkSubCategoryId = sc.pk_subcat_id JOIN shopdetails sd ON p.fkShopId = sd.pkShopId WHERE bns.barcode_number_wise_stock_quantity > 0 AND bns.fk_shop_id = "+shopId+" ORDER BY p.ProductName, c.category_name, sc.subcat_name ");
		
		//query = session.createSQLQuery("SELECT bns.barcode_no, bns.fk_Product_Id, bns.item_name, bns.fk_cat_id, bns.category_name, bns.fk_sub_category_id, bns.sub_category_name, bns.quantity, bns.fk_shop_id, p.HsnSacNo, p.color, p.size FROM barcode_number_wise_stock_details bns JOIN product_reg p ON bns.fk_Product_Id = p.pkProductNameId WHERE bns.quantity > 0 AND bns.fk_shop_id = "+shopId+" ORDER BY item_name");
		
		list = query.list();
		
		itemList = new ArrayList<ProductNameBean>(0);
		for (Object[] objects : list)
		{
			ProductNameBean item = new ProductNameBean();
			
			/*bns.barcode_no, bns.fk_Product_Id, bns.item_name, bns.fk_cat_id, bns.category_name,
			 *  bns.fk_sub_category_id, bns.sub_category_name, bns.quantity, bns.fk_shop_id,
			 *   p.HsnSacNo, p.color, p.size*/
			
			/*item.setBarcodeNo(objects[0].toString());
			item.setProductid(objects[1].toString());
			item.setItemName(objects[2].toString());
			item.setFkCatId(objects[3].toString());
			item.setCaregoryName(objects[4].toString());
			item.setSubCatid(objects[5].toString());
			item.setSubCat(objects[6].toString());
			item.setQuantity(Double.parseDouble(objects[7].toString()));
			
			item.setHsnsacno(objects[9].toString());
			
			String color = objects[10].toString();

			String size = objects[11].toString();

			if (color.equals("null")) {
				item.setColor("N/A");
			} else {
				item.setColor(color);
			}
			if (size.equals("null")) {
				item.setSize("N/A");
			} else {
				item.setSize(size);
			}*/
			
			item.setBarcodeNo(objects[0].toString());
			item.setQuantity(Double.parseDouble(objects[1].toString()));

			item.setProductid(objects[2].toString());
			item.setItemName(objects[3].toString());
			item.setFkCatId(objects[4].toString());
			item.setCaregoryName(objects[5].toString());
			
			item.setHsnsacno(objects[6].toString());
			
			String color = objects[7].toString();

			String size = objects[8].toString();

			if (color.equals("null")) {
				item.setColor("N/A");
			} else {
				item.setColor(color);
			}
			if (size.equals("null")) {
				item.setSize("N/A");
			} else {
				item.setSize(size);
			}
			
			item.setSubCatid(objects[9].toString());
			item.setSubCat(objects[10].toString());

			itemList.add(item);
		}

		hbu.closeSession(session);
		return itemList;
	}
	
	
	
	

	// to get itemName And Category Name on Product Detail Form
	public List getAllItemNameAndCatName() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createQuery("from ProductRegister");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAllMainCategories()", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}

		return list;
	}

	// get all main Item name
	public List<ItemList> getAllMAinItem() {
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<ItemList> catList = null;
		try {
			Long k = 0l;
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, sb.subcat_name, p.size from product_reg p left join categories c ON p.FkCatId = c.pk_category_id join sub_categories sb on p.fkSubCategoryId = sb.pk_subcat_id");
			List<Object[]> list = query2.list();
			catList = new ArrayList<ItemList>(0);

			for (Object[] object : list) {
				k++;
				ItemList reports = new ItemList();
				reports.setSerialnumber(k);
				reports.setItem_name(object[0].toString());
				reports.setCategoryName(object[1].toString());
				reports.setHsnsacno(object[2].toString());
				reports.setSubCatName(object[3].toString());
				reports.setSize(object[4].toString());
				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}

	public List getProductNames()
	{		
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from ProductRegister");
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAllSupllier", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}
	
	public List getProductNamesShopWise(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		Long fkShopId = Long.parseLong(shopId);
		
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createQuery("from ProductRegister WHERE fkShopId = :fkShopId");
			query.setParameter("fkShopId", fkShopId);
			list = query.list();
		} catch (RuntimeException e) {
			Log.error("Error in getAllSupllier", e);
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return list;
	}

	public List getAllProductSetailsForEdit(String ProductId) {

		System.out.println("into dao supplier : " + ProductId);
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("select pr.ProductName, pr.Vat, pr.modelName, pr.pkProductNameId, pr.HsnSacNo, pr.size, c.category_name, subC.subcat_name, pr.color from product_reg pr join categories c on pr.FkCatId=c.pk_category_id join sub_categories subC on pr.fkSubCategoryId = subC.pk_subcat_id where pkProductNameId = "+ProductId);
			list = query.list();
		} catch (RuntimeException e) {
			e.printStackTrace();
		}

		finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		System.out.println("out of dao - return credit customer List : " + list);
		return list;
	}

	public List getProductDetailsForAdvanceBook(String itemName) {
		HibernateUtility hbu = null;
		Session session = null;
		List list = null;

		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Query query = session.createSQLQuery("select p.size,p.pkProductNameId from product_reg p  where p.ProductName ='" + itemName + "'");
			System.out.println("ItemNAme is" + itemName);
			list = query.list();

			System.out.println(list.size() + "*************");
		} catch (RuntimeException e) {

			Log.error("Error in getProductDetails", e);
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}

		}

		return list;
	}
	
	public List<GoodReceiveItemBean> getDetailsById1(String itemName, String fkCatId, String subcatId, String productId, String bookingNo, String forAdvanceBooking)
	{			
		HibernateUtility hbu = null;
		Session session = null;
		List<com.smt.bean.GoodReceiveItemBean> saleList = null;
		try
		{	
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query2 = null;				
				
				if(bookingNo == null || bookingNo.isEmpty() || bookingNo.equalsIgnoreCase(""))
				{					
					query2 = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.size, p.Vat,p.color,sb.subcat_name, sb.pk_subcat_id, c.pk_category_id, p.pkProductNameId, p.fkShopId from product_reg p left join categories c ON p.FkCatId = c.pk_category_id join sub_categories sb ON p.fkSubCategoryId = sb.pk_subcat_id where p.pkProductNameId=:productId AND p.FkCatId=:fkCatId AND p.fkSubCategoryId=:subcatId");
					query2.setParameter("productId", productId);
					query2.setParameter("fkCatId", fkCatId);
					query2.setParameter("subcatId", subcatId);
					
					List<Object[]> list = query2.list();
					saleList = new ArrayList<com.smt.bean.GoodReceiveItemBean>(0);
	
					for (Object[] object : list)
					{
						com.smt.bean.GoodReceiveItemBean reports = new com.smt.bean.GoodReceiveItemBean();
						System.out.println("...ADDING IN BEAN FROM PRODUCT LIST...");
						reports.setItemName(object[0].toString());
						reports.setCatName(object[1].toString());
						reports.setHsnsacno(object[2].toString());
						reports.setSize(object[3].toString());
						reports.setSizeFixed(object[3].toString());
						reports.setVat(0d);
						reports.setDisPer("0");
						reports.setColor(object[5].toString());
						reports.setSubCatName(object[6].toString());
						reports.setSubCatId(object[7].toString());
						reports.setCategoryId(object[8].toString());
						reports.setProductId(Long.parseLong(object[9].toString()));				
						reports.setRollSize(0d);
						reports.setBookingNoAB("0");
						reports.setFkShopId(Long.parseLong(object[10].toString()));
						
						saleList.add(reports);
						System.out.println("PRODUCT ADDED");
					}
				}
				else if(bookingNo != null || bookingNo.length() > 0)
				{					
					Long bookingNoL = Long.parseLong(bookingNo);
					
					query2 = session.createSQLQuery("select pr.ProductName, c.category_name, pr.HsnSacNo, ab.size, pr.Vat, ab.color, sb.subcat_name, ab.fkSubcatId, ab.fkCategoryId, ab.fkProductId, ab.rollSize, ab.quantity, sd.supplier_name, sd.SuppCode, ab.bookingNo, pr.fkShopId from advancebooking ab JOIN categories c ON ab.fkCategoryId = c.pk_category_id JOIN sub_categories sb ON ab.fkSubcatId = sb.pk_subcat_id JOIN product_reg pr ON ab.fkProductId = pr.pkProductNameId JOIN supplier_details sd ON ab.fkSupplierId = sd.supplier_id WHERE ab.bookingNo="+bookingNoL+" AND ab.goodReceiveBillNo IS NULL;");
					//query2.setParameter("bookingNoL", bookingNoL);
					
					List<Object[]> list = query2.list();
					saleList = new ArrayList<com.smt.bean.GoodReceiveItemBean>(0);
	
					for (Object[] object : list)
					{
						com.smt.bean.GoodReceiveItemBean reports = new com.smt.bean.GoodReceiveItemBean();
						System.out.println("...ADDING IN BEAN FROM BOOKING NO...");
						reports.setItemName(object[0].toString());
						reports.setCatName(object[1].toString());
						reports.setHsnsacno(object[2].toString());
						reports.setSize(object[3].toString());
						reports.setSizeFixed(object[3].toString());
						reports.setVat(0d);
						reports.setDisPer("0");
						reports.setColor(object[5].toString());
						reports.setSubCatName(object[6].toString());
						reports.setSubCatId(object[7].toString());
						reports.setCategoryId(object[8].toString());
						reports.setProductId(Long.parseLong(object[9].toString()));				
						reports.setRollSize(Double.parseDouble(object[10].toString()));
						reports.setQuantity(Double.parseDouble(object[11].toString()));
						reports.setSupplierDetails(object[12].toString()+","+object[13].toString());
						reports.setBookingNoAB(object[14].toString());
						reports.setFkShopId(Long.parseLong(object[15].toString()));
						saleList.add(reports);
						System.out.println("PRODUCT ADDED");
					}
				}
		}
		catch (RuntimeException e)
		{
			Log.error("Error in getSaleDetailsDateWise(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}	
		
		return saleList;
	}
	
	public List<GoodReceiveItemBean> getMultipleProDetailsDao(String itemName, String fkCatId, String subcatId, String productId)
	{		
		HibernateUtility hbu = null;
		Session session = null;
		List<com.smt.bean.GoodReceiveItemBean> saleList = null;
		try
		{	
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query2 = null;
				
				query2 = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.size, p.Vat,p.color,sb.subcat_name, sb.pk_subcat_id, c.pk_category_id, p.pkProductNameId, p.fkShopId from product_reg p left join categories c ON p.FkCatId = c.pk_category_id join sub_categories sb ON p.fkSubCategoryId = sb.pk_subcat_id where p.ProductName=:itemName AND p.FkCatId=:fkCatId AND p.fkSubCategoryId=:subcatId");
				query2.setParameter("itemName", itemName);
				query2.setParameter("fkCatId", fkCatId);
				query2.setParameter("subcatId", subcatId);
				
				List<Object[]> list = query2.list();
				saleList = new ArrayList<com.smt.bean.GoodReceiveItemBean>(0);

				for (Object[] object : list)
				{
					com.smt.bean.GoodReceiveItemBean reports = new com.smt.bean.GoodReceiveItemBean();
					System.out.println("...ADDING IN BEAN FROM PRODUCT LIST...");
					reports.setItemName(object[0].toString());
					reports.setCatName(object[1].toString());
					reports.setHsnsacno(object[2].toString());
					reports.setSize(object[3].toString());
					reports.setSizeFixed(object[3].toString());
					reports.setVat(0d);
					reports.setColor(object[5].toString());
					reports.setSubCatName(object[6].toString());
					reports.setSubCatId(object[7].toString());
					reports.setCategoryId(object[8].toString());
					reports.setProductId(Long.parseLong(object[9].toString()));
					reports.setFkShopId(Long.parseLong(object[10].toString()));
					System.out.println("shop id ===> "+reports.getFkShopId());
					reports.setRollSize(0d);
					reports.setBookingNoAB("0");
					
					saleList.add(reports);
					System.out.println("PRODUCT ADDED");
				}
		}
		catch (RuntimeException e)
		{
			Log.error("Error in getSaleDetailsDateWise(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}	
		
		return saleList;
	}
	
	
	public List<GoodReceiveItemBean> getMultipleProDetailsForAdvanceBookingDao(String itemName, String fkCatId, String subcatId, String productId)
	{	
		System.out.println("itemName ===>  "+itemName);
		
		HibernateUtility hbu = null;
		Session session = null;
		List<com.smt.bean.GoodReceiveItemBean> saleList = null;
		try
		{	
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query2 = null;
				
				query2 = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.size, p.Vat,p.color,sb.subcat_name, sb.pk_subcat_id, c.pk_category_id, p.pkProductNameId from product_reg p left join categories c ON p.FkCatId = c.pk_category_id join sub_categories sb ON p.fkSubCategoryId = sb.pk_subcat_id where p.ProductName=:itemName AND p.FkCatId=:fkCatId AND p.fkSubCategoryId=:subcatId");
				query2.setParameter("itemName", itemName);
				query2.setParameter("fkCatId", fkCatId);
				query2.setParameter("subcatId", subcatId);
				
				List<Object[]> list = query2.list();
				saleList = new ArrayList<com.smt.bean.GoodReceiveItemBean>(0);

				for (Object[] object : list)
				{
					com.smt.bean.GoodReceiveItemBean reports = new com.smt.bean.GoodReceiveItemBean();
					System.out.println("...ADDING IN BEAN FROM PRODUCT LIST...");
					reports.setItemName(object[0].toString());
					reports.setCatName(object[1].toString());
					reports.setHsnsacno(object[2].toString());
					reports.setSize(object[3].toString());
					reports.setSizeFixed(object[3].toString());
					reports.setVat(0d);
					reports.setColor(object[5].toString());
					reports.setSubCatName(object[6].toString());
					reports.setSubCatId(object[7].toString());
					reports.setCategoryId(object[8].toString());
					reports.setProductId(Long.parseLong(object[9].toString()));				
					reports.setRollSize(0d);
					reports.setBookingNoAB("0");
					
					saleList.add(reports);
					System.out.println("PRODUCT ADDED");
				}
		}
		catch (RuntimeException e)
		{
			Log.error("Error in getSaleDetailsDateWise(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}	
		
		System.out.println("saleList.size() ===> "+saleList.size());
		return saleList;
	}
	
	
	
	
	public List<GoodReceiveItemBean> getDetailsById1(String itemName) {

		HibernateUtility hbu = null;
		Session session = null;
		List<com.smt.bean.GoodReceiveItemBean> saleList = null;
		try {
			System.out.println("hiii " + itemName);
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query2 = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.size,p.Vat,p.color from product_reg p left join categories c ON p.FkCatId = c.pk_category_id where p.ProductName =:itemName ");
			query2.setParameter("itemName", itemName);
			List<Object[]> list = query2.list();
			System.out.println("hiii " + itemName);
			saleList = new ArrayList<com.smt.bean.GoodReceiveItemBean>(0);

			for (Object[] object : list)
			{
				com.smt.bean.GoodReceiveItemBean reports = new com.smt.bean.GoodReceiveItemBean();

				reports.setItemName(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setHsnsacno(object[2].toString());
				reports.setSize(object[3].toString());
				reports.setVat(0d);
				reports.setColor(object[5].toString());
				reports.setRollSize(0d);

				saleList.add(reports);
			}
		} catch (RuntimeException e) {
			Log.error("Error in getSaleDetailsDateWise(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return saleList;
	}

	public List getCategoryWiseItemName(String category)
	{
		System.out.println("category ====> "+category);
		List<GoodReceiveItemBean> saleList = null;
		HibernateUtility hbu = null;
		Session session = null;
		try {
			String paytype = "y";
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select pr.ProductName, pr.FkCatId, pr.size, pr.pkProductNameId from product_reg pr left join categories c on c.pk_category_id = pr.FkCatId where pr.FkCatId=:category");
			query.setParameter("category", category);
			List<Object[]> list = query.list();
			saleList = new ArrayList<GoodReceiveItemBean>(0);
			for (Object[] objects : list)
			{
				System.out.println(Arrays.toString(objects));
				GoodReceiveItemBean bean = new GoodReceiveItemBean();
				bean.setItemName(objects[0].toString());
				bean.setSize(objects[2].toString());
				bean.setProductId(Long.parseLong(objects[3].toString()));
				saleList.add(bean);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return saleList;
	}
	
	
	
	public List getProductListDao()
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;
		List<ItemList> bill = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("select ob.fkProductId, pr.ProductName from otherbill ob join product_reg pr on ob.fkProductId = pr.pkProductNameId GROUP BY ob.fkProductId;");
			list = query.list();
			bill = new ArrayList<ItemList>(0);
			for (Object[] object : list)
			{
				ItemList reports = new ItemList();
				reports.setPkProductId(object[0].toString());
				reports.setItem_name(object[1].toString());
				bill.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}
		}
		
		System.out.println(Arrays.toString(bill.toArray()));
		
		return bill;
	}
	
	
	
	public List getbillNoDao()
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<Object[]> list = null;
		List<ItemList> bill = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			Query query = session.createSQLQuery("SELECT BillNo, BillNo FROM otherbill WHERE BarcodeNo=0 GROUP BY BillNo ");
			list = query.list();
			bill = new ArrayList<ItemList>(0);
			for (Object[] object : list)
			{
				ItemList reports = new ItemList();
				reports.setBillNo(object[0].toString());
				reports.setBillNo(object[1].toString());
				bill.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {

				hbu.closeSession(session);
			}
		}
		
		System.out.println(Arrays.toString(bill.toArray()));
		
		return bill;
	}
	
	
	public List<PurchaseReport> productWisePurchaseReportDao(String productId)
	{
		// TODO Auto-generated method stub
		HibernateUtility hbu = null;
		Session session = null;
		List<PurchaseReport> catList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();

			Long k = 0l;
			  double rSize=0.0;
				double Qmeter = 0.0;
				double qty = 0.0;
				String Rsize=null;
			Query query2 = session.createSQLQuery("select s.BillNo, ct.category_name, pr.ProductName, s.HsnSacNo, s.OrignalQuantity, s.BuyPrice, s.Vat, s.igst, s.TaxAmount, s.Total, s.BarcodeNo, s.Date, c.supplier_name,s.RollSize,s.ExtraDiscount,s.Discount, ((s.BuyPrice*s.OrignalQuantity)*(s.Discount/100)), s.OrignalQuantity, sb.subcat_name, s.voucherNo, s.SalePrice, s.returnQuantity, s.soldQuantity from goodreceive s left join supplier_details c ON s.FksuppId=c.supplier_id join categories ct on s.fkCatId=ct.pk_category_id JOIN sub_categories sb on s.fkSubCatId=sb.pk_subcat_id JOIN product_reg pr on s.fkProductId = pr.pkProductNameId where s.fkProductId = :productId");
			query2.setParameter("productId", productId);

			List<Object[]> list = query2.list();
			catList = new ArrayList<PurchaseReport>(0);
			DecimalFormat df = new DecimalFormat("#.##");
			for (Object[] object : list) {

				PurchaseReport reports = new PurchaseReport();
				k++;
				
				Rsize = object[13].toString();
				rSize = Double.parseDouble(object[13].toString());
				qty = Double.parseDouble(object[4].toString());
				
				reports.setSrno(k);
				reports.setBillNo(object[0].toString());
				reports.setCatName(object[1].toString());
				reports.setItemName(object[2].toString());
				reports.setHsnsacno(object[3].toString());
				
				reports.setQuantity(Double.parseDouble(object[4].toString()));
				if(rSize > 0.0)
				{
					reports.setRollSize(Double.parseDouble(object[13].toString()));
					double taxAmount = 0.0;
					double meterQty = Double.parseDouble(object[17].toString())*Double.parseDouble(object[13].toString());
					double amount = meterQty*Double.parseDouble(object[5].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[15].toString())/100.00);
					taxAmount = amountWithoutDis*Double.parseDouble(object[6].toString())/100.00;
					
					if(Double.parseDouble(object[6].toString()) > Double.parseDouble(object[7].toString()))
					{
						taxAmount = amountWithoutDis*(Double.parseDouble(object[6].toString())/100.00);
					}else
					{
						taxAmount = amountWithoutDis*(Double.parseDouble(object[7].toString())/100.00);
					}
					reports.setTaxAmount(Double.parseDouble(df.format(taxAmount)));
				}
				else
				{
					reports.setRollSize(0.0);
					double taxAmount = 0.0;
					double amount = Double.parseDouble(object[17].toString())*Double.parseDouble(object[5].toString());
					double amountWithoutDis = amount - (amount*Double.parseDouble(object[15].toString())/100.00);
					
					if(Double.parseDouble(object[6].toString()) > Double.parseDouble(object[7].toString()))
					{	
						taxAmount = amountWithoutDis*(Double.parseDouble(object[6].toString())/100.00);
					}else
					{	
						taxAmount = amountWithoutDis*(Double.parseDouble(object[7].toString())/100.00);
					}
					
					reports.setTaxAmount(Double.parseDouble(df.format(taxAmount)));
				}
				reports.setBuyPrice(Double.parseDouble(object[5].toString()));
				reports.setVat(Double.parseDouble(object[6].toString()));
				reports.setIgst(Double.parseDouble(object[7].toString()));
				//reports.setTaxAmount(Double.parseDouble(object[8].toString()));
				reports.setTotal(Double.parseDouble(df.format(Double.parseDouble(object[9].toString()))));
				reports.setBarcodeNo(Long.parseLong(object[10].toString()));
				reports.setDate(object[11].toString());
				reports.setSupplierName(object[12].toString());
				reports.setExtraDiscount(Double.parseDouble(object[14].toString()));
				reports.setDiscount(Double.parseDouble(df.format(Double.parseDouble(object[15].toString()))));
				reports.setDiscountAmt(df.format(Double.parseDouble(object[16].toString())));
				
				
				if(Rsize.equals("0.0") || Rsize.equals("1.0"))
				{
					/*reports.setQuantityMeter(Double.parseDouble(object[4].toString()));*/
					reports.setQuantityMeter(0.0);
				}
				else
				{
					Qmeter = rSize * qty;
					reports.setQuantityMeter(Qmeter);
				}
				
				reports.setSubCatName(object[18].toString());
				reports.setVoucherNo(object[19].toString());
				reports.setSalePrice(Double.parseDouble(object[20].toString()));
				reports.setReturnQuantity(object[21].toString());
				reports.setSoldQuantity(object[22].toString());

				catList.add(reports);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return catList;
	}
	
	//Edit Purchase Code
	
	public List getAllNonGridPurchaseBillDetailsForPurchaseEditBilling(String voucherNo, String shopId)
	{
		System.out.println("Dao 0 11");
		System.out.println("In Dao voucherNo : "+voucherNo);
		System.out.println("In Dao shopId : "+shopId);
		HibernateUtility hbu = null;
		Session session =  null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			
			query = session.createSQLQuery("SELECT gr.PkGoodRecId, gr.BillNo, gr.FksuppId, sd.supplier_id, sd.supplier_name, sd.SuppCode, gr.Date, gr.ContactPerson, gr.paymentDueDate, gr.GrossTotal, gr.pending_bill_payment, gr.fkShopId  FROM goodreceive gr JOIN supplier_details sd on gr.FksuppId=sd.supplier_id  WHERE gr.voucherNo =:VoucherNo AND gr.fkShopId =:ShopId limit 1");
			query.setParameter("VoucherNo", voucherNo);
			query.setParameter("ShopId", shopId);
			
			list = query.list();
			 
			 //query = session.createSQLQuery("SELECT pkPurchaseBill, billNo, purchaseDate, contact_no, vehicleNo, Aadhar_No, gross_total, varai, hamali, tolai, ladies_hamali, levhy, motar_bhade, rokh_uchal, vasuli, etc, tolal_minus_amount, extraExpenceDis, extraExpence, extraExpenseName2, extraExpense2, extraExpenseName3, extraExpense3, gross_total_with_expense FROM purchasedstock WHERE  billNo =:BillNo AND customer_type=:CustomerType AND  fk_supplier_id =:PartyId limit 1");
			 
			 //query = session.createSQLQuery("select s.PkGoodRecId, ct.Category_Name, pr.ProductName, s.OrignalQuantity, s.BuyPrice, s.Vat, s.Total, s.ContactPerson, s.BarcodeNo, s.Date, s.Quantity, s.igst, s.Discount, s.RollSize, pr.size, s.FksuppId, s.BillNo, sd.supplier_name, s.GrossTotal, sc.subcat_name, s.HsnSacNo, pr.color, s.style, s.PurchaseCode, s.ContactPerson, s.TaxAmount, s.returnQuantity, s.SalePrice, sd.supplier_id, s.fkProductId, s.fkSubCatId, s.fkCatId, sd.SuppCode, s.soldQuantity, s.pending_bill_payment, s.BarcodeQty, s.fkShopId from goodreceive s join supplier_details sd on s.FksuppId=sd.supplier_id join sub_categories sc on s.fkSubCatId=sc.pk_subcat_id join categories ct on s.fkCatId=ct.pk_category_id JOIN product_reg pr ON s.fkProductId = pr.pkProductNameId where s.voucherNo = :VoucherNo AND s.fkShopId = :ShopId");
						 
			/*s.PkGoodRecId, s.PurchaseCode, s.BarcodeNo, s.BarcodeQty, s.fkProductId, pr.ProductName,
			s.fkCatId, ct.Category_Name, s.fkSubCatId, sc.subcat_name, s.HsnSacNo, s.RollSize,
			pr.size, pr.color, s.style, s.OrignalQuantity, s.returnQuantity, s.soldQuantity,
			s.Quantity, s.BuyPrice, s.SalePrice, s.Discount, s.Vat, s.igst, s.TaxAmount, s.Total,
			s.GrossTotal, s.pending_bill_payment, s.BillNo, s.FksuppId, sd.supplier_name,
			sd.supplier_id, sd.SuppCode, s.ContactPerson, s.Date, paymentDueDate, s.fkShopId*/
			
		} catch(RuntimeException e){
			Log.error("Error in getAllNonGridPurchaseBillDetailsForPurchaseEditBilling",e);
		}finally{
			if(session!=null){
				hbu.closeSession(session);
			}
		}
		System.out.println("Out of Dao - return getAllNonGridPurchaseBillDetailsForPurchaseEditBilling list : "+list);
		System.out.println("Dao 1");
		return list;
	}
	
	public List<GoodReceiveEditBean> getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetails(String voucherNo, String productId, String itemName, String fkCatId, String subcatId, String bookingNo, String forAdvanceBooking, String shopId)//(String voucherNo, String shopId)
	{
		HibernateUtility hbu = null;
		Session session = null;
		List<GoodReceiveEditBean> saleList = null;
		System.out.println("In Dao voucherNo :- "+voucherNo);
		System.out.println("In Dao productId :- "+productId);
		System.out.println("In Dao itemName :- "+itemName);
		System.out.println("In Dao fkCatId :- "+fkCatId);
		System.out.println("In Dao subcatId :- "+subcatId);
		System.out.println("In Dao bookingNo :- "+bookingNo);
		System.out.println("In Dao forAdvanceBooking :- "+forAdvanceBooking);
		System.out.println("In Dao shopId :- "+shopId);
		try
		{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = null;
				
				//if(voucherNo != "Empty" || voucherNo != null)
				if(!"Empty".equals(voucherNo) || voucherNo != null)
				{
					System.out.println("In First If Block");
					
					query = session.createSQLQuery("SELECT s.PkGoodRecId, s.PurchaseCode, s.BarcodeNo, s.BarcodeQty, s.fkProductId, pr.ProductName, s.fkCatId, ct.Category_Name, s.fkSubCatId, sc.subcat_name, s.HsnSacNo, s.RollSize, pr.size, pr.color, s.style, s.OrignalQuantity, s.returnQuantity, s.soldQuantity, s.Quantity, s.BuyPrice, s.SalePrice, s.Discount, s.Vat, s.igst, s.TaxAmount, s.Total, s.GrossTotal, s.fkShopId FROM goodreceive s join supplier_details sd on s.FksuppId=sd.supplier_id join sub_categories sc on s.fkSubCatId=sc.pk_subcat_id join categories ct on s.fkCatId=ct.pk_category_id JOIN product_reg pr ON s.fkProductId = pr.pkProductNameId where s.voucherNo = :VoucherNo AND s.fkShopId = :ShopId");
					query.setParameter("VoucherNo", voucherNo);
					query.setParameter("ShopId", shopId);
					
					List<Object[]> list = query.list();
					saleList = new ArrayList<GoodReceiveEditBean>(0);
					
					Double totalQuantity = 0d;
	
					for (Object[] o : list)
					{
						GoodReceiveEditBean bean = new GoodReceiveEditBean();
						
						System.out.println("...ADDING IN BEAN FROM BOOKING NO...");
						//s.PkGoodRecId, s.PurchaseCode, s.BarcodeNo, s.BarcodeQty, s.fkProductId,
						//pr.ProductName, s.fkCatId, ct.Category_Name, s.fkSubCatId, sc.subcat_name,
						//s.HsnSacNo, s.RollSize, pr.size, pr.color, s.style, s.OrignalQuantity,
						//s.returnQuantity, s.soldQuantity, s.Quantity, s.BuyPrice, s.SalePrice,
						//s.Discount, s.Vat, s.igst, s.TaxAmount, s.Total, s.fkShopId
						
						bean.setPkGoodRecId(Long.parseLong(o[0].toString()));
						System.out.println("setPkGoodRecId =====> "+bean.getPkGoodRecId());
						if(o[1] == null)
						{
							bean.setPurchaseCode("0");
						} else {
							bean.setPurchaseCode(o[1].toString());
						}
						bean.setBarcodeNo(Long.parseLong(o[2].toString()));
						System.out.println("setBarcodeNo =====> "+bean.getBarcodeNo());
						bean.setBarQtyTotalPuchaseQty(Long.parseLong(o[3].toString()));
						bean.setFkProductId(Long.parseLong(o[4].toString()));
						bean.setItemName(o[5].toString());
						System.out.println("setItemName =====> "+bean.getItemName());
						bean.setFkcategoryId(Long.parseLong(o[6].toString()));
						bean.setCategoryName(o[7].toString());
						bean.setFksubCategoryId(Long.parseLong(o[8].toString()));
						bean.setSubCategoryName(o[9].toString());
						bean.setHsnSacno(o[10].toString());
						bean.setRollSize(Double.parseDouble(o[11].toString()));
						bean.setSize(o[12].toString());
						bean.setSizeFixed(o[12].toString());
						bean.setColor(o[13].toString());
						bean.setStyle(o[14].toString());
						bean.setOriginalQuantity(Double.parseDouble(o[15].toString()));
						bean.setReturnQuantity(Double.parseDouble(o[16].toString()));
						bean.setSoldQuantity(Double.parseDouble(o[17].toString()));
						
						bean.setQuantity(Double.parseDouble(o[18].toString()));
						bean.setAvailableQuantity(Double.parseDouble(o[18].toString()));
						Double totalQuantity1 = 0d;
						totalQuantity1 = Double.parseDouble(o[18].toString());
						totalQuantity = totalQuantity + totalQuantity1;
						bean.setTotalQuantity(totalQuantity);
						System.out.println("setTotalQuantity :- "+bean.getTotalQuantity());
						bean.setBuyPrice(Double.parseDouble(o[19].toString()));
						bean.setSalePrice(Double.parseDouble(o[20].toString()));
						bean.setDiscountPercent(Double.parseDouble(o[21].toString()));
						
						//calculate Discount Amount
						Double quantityToCalculateDiscount = bean.getQuantity();
						Double buyPrice = bean.getBuyPrice();
						Double totalBuyPriceToCalculateDiscount = buyPrice*quantityToCalculateDiscount;
						Double discountPercent = bean.getDiscountPercent();
						
						System.out.println("In Dao quantityToCalculateDiscount :- "+quantityToCalculateDiscount);
						System.out.println("In Dao buyPrice :- "+buyPrice);
						System.out.println("In Dao quantityToCalculateDiscount :- "+quantityToCalculateDiscount);
						System.out.println("In Dao discountPercent :- "+discountPercent);
						
						Double discountAmount = 0d;
						
						discountAmount = (totalBuyPriceToCalculateDiscount/100)*discountPercent;
						
						System.out.println("In Dao discountAmount :- "+discountAmount);
						
						bean.setDiscountAmount(discountAmount);
						bean.setGst(Double.parseDouble(o[22].toString()));
						bean.setIgst(Double.parseDouble(o[23].toString()));
						bean.setTaxAmount(Double.parseDouble(o[24].toString()));
						bean.setTotalAmount(Double.parseDouble(o[25].toString()));
						bean.setGrossTotal(Double.parseDouble(o[26].toString()));
						bean.setBookingNoAB("0");
//						bean.setPendigBillPayment(Double.parseDouble(o[26].toString()));
//						bean.setBillNo(o[27].toString());
//						bean.setFksupplierId(Long.parseLong(o[28].toString()));
//						bean.setSupplierDetails(o[28].toString()+","+o[29].toString()+","+o[31].toString());
//						bean.setContactPerson(o[32].toString());
//						bean.setPurchaseDate(o[33].toString());
//						bean.setPurchasePaymentDueDate(o[34].toString());
						bean.setFkShopId(Long.parseLong(o[27].toString()));
						
						System.out.println("PRODUCT ADDED");
						
						saleList.add(bean);
						
						System.out.println("PRODUCT ADDED 01");
					}
				}
				//else if(voucherNo == "Empty" || voucherNo == null || bookingNo == null || bookingNo.isEmpty() || bookingNo.equalsIgnoreCase(""))
				if(productId != null || "Empty".equals(voucherNo) || voucherNo == null)
				{
					System.out.println("In Second If Block");
					//query = session.createSQLQuery("select p.ProductName, c.category_name, p.HsnSacNo, p.size, p.Vat,p.color,sb.subcat_name, sb.pk_subcat_id, c.pk_category_id, p.pkProductNameId, p.fkShopId from product_reg p left join categories c ON p.FkCatId = c.pk_category_id join sub_categories sb ON p.fkSubCategoryId = sb.pk_subcat_id where p.pkProductNameId=:productId AND p.FkCatId=:fkCatId AND p.fkSubCategoryId=:subcatId");
					
					query = session.createSQLQuery("SELECT p.pkProductNameId, p.ProductName, c.pk_category_id, c.category_name, sb.pk_subcat_id, sb.subcat_name, p.HsnSacNo, p.size, p.color, p.Vat, p.fkShopId FROM product_reg p left JOIN categories c ON p.FkCatId = c.pk_category_id JOIN sub_categories sb ON p.fkSubCategoryId = sb.pk_subcat_id WHERE p.pkProductNameId=:ProductId AND p.FkCatId=:FkCatId AND p.fkSubCategoryId=:SubcatId");
					
					query.setParameter("ProductId", productId);
					query.setParameter("FkCatId", fkCatId);
					query.setParameter("SubcatId", subcatId);
					
					List<Object[]> list = query.list();
					saleList = new ArrayList<GoodReceiveEditBean>(0);
					
					for (Object[] o : list)
					{
						GoodReceiveEditBean bean = new GoodReceiveEditBean();
						
						bean.setPkGoodRecId(0l);
						System.out.println("setPkGoodRecId =====> "+bean.getPkGoodRecId());
						if(o[1] == null)
						{
							bean.setPurchaseCode("");
						} else {
							bean.setPurchaseCode(o[1].toString());
						}
						//p.pkProductNameId, p.ProductName, c.pk_category_id, c.category_name,
						//sb.pk_subcat_id, sb.subcat_name, p.HsnSacNo, p.size, p.color, p.Vat, p.fkShopId
						
						bean.setPkGoodRecId(0l);
						bean.setPurchaseCode("0");
						bean.setBarcodeNo(0l);
						bean.setBarQtyTotalPuchaseQty(0l);
						bean.setFkProductId(Long.parseLong(o[0].toString()));
						bean.setItemName(o[1].toString());
						bean.setFkcategoryId(Long.parseLong(o[2].toString()));
						bean.setCategoryName(o[3].toString());
						bean.setFksubCategoryId(Long.parseLong(o[4].toString()));
						bean.setSubCategoryName(o[5].toString());
						bean.setHsnSacno(o[6].toString());
						bean.setRollSize(0d);
						bean.setSize(o[7].toString());
						bean.setSizeFixed(o[7].toString());
						bean.setColor(o[8].toString());
						bean.setStyle("N/A");
						bean.setOriginalQuantity(0d);
						bean.setReturnQuantity(0d);
						bean.setSoldQuantity(0d);
						bean.setQuantity(1d);
						bean.setAvailableQuantity(0d);
						//Double totalQuantity1 = 0d;
						//totalQuantity1 = Double.parseDouble(o[18].toString());
						//totalQuantity = totalQuantity + totalQuantity1;
						//bean.setTotalQuantity(totalQuantity);
						//System.out.println("setTotalQuantity :- "+bean.getTotalQuantity());
						bean.setBuyPrice(0d);
						bean.setSalePrice(0d);
						bean.setDiscountPercent(0d);
						bean.setDiscountAmount(0d);
						bean.setGst(Double.parseDouble(o[9].toString()));
						bean.setIgst(0d);
						bean.setTaxAmount(0d);
						bean.setTotalAmount(0d);
						bean.setGrossTotal(0d);
						bean.setBookingNoAB("0");
//						bean.setPendigBillPayment(Double.parseDouble(o[26].toString()));
//						bean.setBillNo(o[27].toString());
//						bean.setFksupplierId(Long.parseLong(o[28].toString()));
//						bean.setSupplierDetails(o[28].toString()+","+o[29].toString()+","+o[31].toString());
//						bean.setContactPerson(o[32].toString());
//						bean.setPurchaseDate(o[33].toString());
//						bean.setPurchasePaymentDueDate(o[34].toString());
						bean.setFkShopId(Long.parseLong(o[10].toString()));
						
						saleList.add(bean);
						
						System.out.println("PRODUCT ADDED");
					}
				}
				/*else if(bookingNo != null || bookingNo.length() > 0)
				{					
					Long bookingNoL = Long.parseLong(bookingNo);
					
					query = session.createSQLQuery("select pr.ProductName, c.category_name, pr.HsnSacNo, ab.size, pr.Vat, ab.color, sb.subcat_name, ab.fkSubcatId, ab.fkCategoryId, ab.fkProductId, ab.rollSize, ab.quantity, sd.supplier_name, sd.SuppCode, ab.bookingNo, pr.fkShopId from advancebooking ab JOIN categories c ON ab.fkCategoryId = c.pk_category_id JOIN sub_categories sb ON ab.fkSubcatId = sb.pk_subcat_id JOIN product_reg pr ON ab.fkProductId = pr.pkProductNameId JOIN supplier_details sd ON ab.fkSupplierId = sd.supplier_id WHERE ab.bookingNo="+bookingNoL+" AND ab.goodReceiveBillNo IS NULL;");
					//query.setParameter("bookingNoL", bookingNoL);
					
					List<Object[]> list = query.list();
					saleList = new ArrayList<GoodReceiveEditBean>(0);
	
					for (Object[] object : list)
					{
						GoodReceiveEditBean reports = new GoodReceiveEditBean();
						
						System.out.println("...ADDING IN BEAN FROM BOOKING NO...");
						reports.setItemName(object[0].toString());
						reports.setCatName(object[1].toString());
						reports.setHsnsacno(object[2].toString());
						reports.setSize(object[3].toString());
						reports.setSizeFixed(object[3].toString());
						reports.setVat(0d);
						reports.setDisPer("0");
						reports.setColor(object[5].toString());
						reports.setSubCatName(object[6].toString());
						reports.setSubCatId(object[7].toString());
						reports.setCategoryId(object[8].toString());
						reports.setProductId(Long.parseLong(object[9].toString()));				
						reports.setRollSize(Double.parseDouble(object[10].toString()));
						reports.setQuantity(Double.parseDouble(object[11].toString()));
						reports.setSupplierDetails(object[12].toString()+","+object[13].toString());
						reports.setBookingNoAB(object[14].toString());
						reports.setFkShopId(Long.parseLong(object[15].toString()));
						saleList.add(reports);
						System.out.println("PRODUCT ADDED");
					}
				}*/
		}
		catch (RuntimeException e)
		{
			Log.error("Error in getPurchaseDetailsToEditPurchase(String startDate,String endDate)", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return saleList;
	}
	
	
}
