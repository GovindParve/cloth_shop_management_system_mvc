package com.smt.helper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillCopy;
import com.smt.bean.GoodReceiveItemBean;
import com.smt.bean.ItemList;
import com.smt.bean.ProductDetailBean;
import com.smt.bean.ProductDetailsToEdit;
import com.smt.bean.GoodReceiveEditBean;
import com.smt.bean.PurchaseReport;
import com.smt.bean.SubCategoryUpdate;
import com.smt.dao.CategoryDao;
import com.smt.dao.CustomerDetailsDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.ProductDetailDao;
import com.smt.dao.SaleReturnDao;
import com.smt.hibernate.ProductRegister;
import com.smt.hibernate.SaleReturn;
import com.smt.hibernate.SubCategory;
import com.smt.utility.HibernateUtility;

public class ProductDetailHelper
{
	public void doProductRegister(HttpServletRequest request, HttpServletResponse response) {

		String itemName = request.getParameter("itemName");
		String catId = request.getParameter("catId");
		String shopId = request.getParameter("shopId");
		String modelName = request.getParameter("modelName");
		String hsnsacno = request.getParameter("hsnsacno");
		String vat = request.getParameter("vat");
		String fkSubCatId = request.getParameter("fkSubCatId");
		String isBarcodeProduct = request.getParameter("isBarcodeProduct");
		
		String image=request.getParameter("image");
		
		System.out.println("image"+image);
		
		
		File file=new File(image);
		
		byte[] bfile=new byte[(int) file.length()];
		
		try {
			FileInputStream fi= new FileInputStream(file);
			
			try {
				fi.read(bfile);
				
				fi.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		Date dateobj = new Date();

		String newDate = df.format(dateobj);

		ProductRegister pdreg = new ProductRegister();
		ProductDetailDao reg = new ProductDetailDao();

		Integer count = Integer.parseInt(request.getParameter("count"));

		
		if(count == null || count == 0)
		{
			String color = request.getParameter("colorFinal");
			pdreg.setColor(color);

			String size = request.getParameter("sizeFinal");
			pdreg.setSize(size);

			pdreg.setItemName(itemName);

			pdreg.setFkCategoryId(Long.parseLong(catId));

			pdreg.setFkSubCategoryId(Long.parseLong(fkSubCatId));

			if (!"".equals(modelName)) {
				pdreg.setModelName(modelName);
			} else {
				pdreg.setModelName("N/A");
			}
		if(vat == null || vat.equalsIgnoreCase("") || vat.equalsIgnoreCase("undefined"))
		{
			pdreg.setVat(0.0);
		}
		else
		{
			pdreg.setVat(Double.parseDouble(vat));
		}
			if (hsnsacno != "") {
				pdreg.setHsnsacno(hsnsacno);
			} else {
				pdreg.setHsnsacno("N/A");
			}
			
			pdreg.setFkShopId(Long.parseLong(shopId));
			
			pdreg.setIsInsertDate(dateobj);

			pdreg.setIsBarcodeProduct(isBarcodeProduct);
			reg.doProductRegister(pdreg);		
		}
		else
		{
			for (int i = 0; i < count; i++)
			{
				String color = request.getParameter("colorFinal" + i + "");
				if(color == null || color.equalsIgnoreCase("undefined") || color.equalsIgnoreCase(""))
				{
					pdreg.setColor(".");
				}
				else
				{
					pdreg.setColor(color);
				}
	
				String size = request.getParameter("sizeFinal" + i + "");
				if(size == null || size.equalsIgnoreCase("undefined") || size.equalsIgnoreCase(""))
				{
					pdreg.setSize(".");
				}
				else
				{
					pdreg.setSize(size);
				}
	
				pdreg.setItemName(itemName);
	
				pdreg.setFkCategoryId(Long.parseLong(catId));
	
				pdreg.setFkSubCategoryId(Long.parseLong(fkSubCatId));
	
				if (!"".equals(modelName)) {
					pdreg.setModelName(modelName);
				} else {
					pdreg.setModelName("N/A");
				}
			if(vat == null || vat.equalsIgnoreCase("") || vat.equalsIgnoreCase("undefined"))
			{
				pdreg.setVat(0.0);
			}
			else
			{
				pdreg.setVat(Double.parseDouble(vat));
			}
				if (hsnsacno != "") {
					pdreg.setHsnsacno(hsnsacno);
				} else {
					pdreg.setHsnsacno("N/A");
				}
				
				pdreg.setIsInsertDate(dateobj);
				pdreg.setFkShopId(Long.parseLong(shopId));
				pdreg.setIsBarcodeProduct(isBarcodeProduct);
	
				pdreg.setImage(bfile);
				
				reg.doProductRegister(pdreg);
			}
		}
	}

	// to get all Item Name on Good receive form

	public List getAllItemName(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session3 = request.getSession();
		String shopId = (String) session3.getAttribute("shopId");
		
		ProductDetailDao dow = new ProductDetailDao();
		List l = dow.getAllItemName(shopId);
		System.out.println("Product List size in helper" + l.size());
		return l;
	}
	
	public List getAllItemListWithoutBarcodeForBilling(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session3 = request.getSession();
		String shopId = (String) session3.getAttribute("shopId");
		
		ProductDetailDao dow = new ProductDetailDao();
		List l = dow.getAllItemListWithoutBarcodeForBillingDao(shopId);
		System.out.println("Product List size in helper" + l.size());
		return l;
	}

	// to get itemName And Category Name on Product Detail Form
	public List getAllItemNameAndCatName() {
		ProductDetailDao dow = new ProductDetailDao();
		return dow.getAllItemNameAndCatName();
	}

	// get all main product Name
	public List getAllMAinItem(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		Map<Long, ItemList> map = new HashMap<Long, ItemList>();

		ProductDetailDao dao = new ProductDetailDao();
		List<ItemList> exp1List = dao.getAllMAinItem();

		return exp1List;
	}

	public Map getProductDetailsForEdit(String productId) {

		System.out.println("into helper class");
		ProductDetailDao dao1 = new ProductDetailDao();
		List catList = dao1.getAllProductSetailsForEdit(productId);

		Map map = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);

			ProductDetailsToEdit bean = new ProductDetailsToEdit();
			bean.setProName(o[0].toString());
			String vat = o[1].toString();
			bean.setVat(Double.parseDouble(vat));
			bean.setModelName(o[2].toString());
			String pkId = o[3].toString();
			bean.setHsnsacno(o[4].toString());
			bean.setSize(o[5].toString());
			bean.setCatName(o[6].toString());
			bean.setSubCatName(o[7].toString());
			bean.setPkProduct(Long.parseLong(pkId));
			bean.setColor(o[8].toString());

			map.put(bean.getPkProduct(), bean);
		}
		System.out.println("out of helper return map : " + map);
		return map;
	}

	public void editProductDetail(HttpServletRequest request, HttpServletResponse response)
	{
		ProductDetailDao pdo = new ProductDetailDao();

		String productId = request.getParameter("productId");
		String itemName = request.getParameter("itemName");
		String modelName = request.getParameter("modelName");
		String hsnsacno = request.getParameter("hsnsacno");
		//String vat = request.getParameter("vat");
		String size = request.getParameter("size");
		String color = request.getParameter("colorP");

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		transaction = session.beginTransaction();

		System.out.println("%%%%%%%%%%%%%%%%% Product id :" + productId);
		long productID = Long.parseLong(productId);
		ProductRegister det = (ProductRegister) session.get(ProductRegister.class, productID);

		if (!"".equals(itemName)) {
			det.setItemName(itemName);
		} else {
			det.setItemName("N/A");
		}

		//det.setVat(Double.parseDouble(vat));

		if (!"".equals(modelName)) {
			det.setModelName(modelName);
		} else {
			det.setModelName("N/A");
		}

		if (hsnsacno != "") {
			det.setHsnsacno(hsnsacno);
		} else {
			det.setHsnsacno("N/A");
		}
		
		if(size.isEmpty() || size == null || size.equalsIgnoreCase(""))
		{
			det.setSize(".");
		}
		else
		{
			det.setSize(size);
		}
		
		if(color.isEmpty() || color == null || color.equalsIgnoreCase(""))
		{
			det.setColor(".");
		}
		else
		{
			det.setColor(color);
		}

		session.saveOrUpdate(det);
		transaction.commit();
		session.close();
		System.out.println("Record updated successfully.");

	}

	public Map getSubCategoriesByRootcategory(String catID) {

		Map<Long, SubCategory> map = new HashMap<Long, SubCategory>();

		CategoryDao dao = new CategoryDao();
		List catList = dao.getSubCategoriesByRootcategory(catID);
		Map map1 = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);
			SubCategoryUpdate bean = new SubCategoryUpdate();
			bean.setSubCatId(Long.parseLong(o[0].toString()));
			bean.setSubCatName((String) o[1]);

			System.out.println("***************" + o[0] + "\t" + o[1]);
			map1.put(bean.getSubCatId(), bean);
		}
		return map1;
	}

	public Map getDetailsById(String itemName) {

		ProductDetailDao dao = new ProductDetailDao();
		List list = dao.getProductDetailsForAdvanceBook(itemName);
		System.out.println(list.size());
		Map map1 = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			ProductRegister bean = new ProductRegister();
			bean.setSize(o[0].toString());
			bean.setPkProductId(Long.parseLong(o[1].toString()));
			map1.put(bean.getSize(), bean);
		}
		return map1;

	}

	public List getDetailsById1(HttpServletRequest request, HttpServletResponse response)
	{
		String bookingNo = request.getParameter("bookingNo");
		String itemName = request.getParameter("itemName");
		String fkCatId = request.getParameter("fkCatId");
		String subcatId = request.getParameter("subcatId");
		String productId = request.getParameter("productId");
		String forAdvanceBooking = request.getParameter("forAdvanceBooking");
		
		Map<Long, GoodReceiveItemBean> map = new HashMap<Long, GoodReceiveItemBean>();

		ProductDetailDao dao = new ProductDetailDao();
		List<GoodReceiveItemBean> saleList = dao.getDetailsById1(itemName, fkCatId, subcatId, productId, bookingNo, forAdvanceBooking);

		return saleList;
	}
	
	public List getMultipleDetailsById1(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String itemName = request.getParameter("itemName");
		String fkCatId = request.getParameter("fkCatId");
		String subcatId = request.getParameter("subcatId");
		String productId = request.getParameter("productId");
		Map<Long, GoodReceiveItemBean> map = new HashMap<Long, GoodReceiveItemBean>();

		ProductDetailDao dao = new ProductDetailDao();
		List<GoodReceiveItemBean> saleList = dao.getMultipleProDetailsDao(itemName, fkCatId, subcatId, productId);

		return saleList;
	}
	
	public List getMultipleProDetailsForAdvanceBookingDao(HttpServletRequest request, HttpServletResponse response)
	{
		// TODO Auto-generated method stub
		String itemName = request.getParameter("itemName");
		String fkCatId = request.getParameter("fkCatId");
		String subcatId = request.getParameter("subcatId");
		String productId = request.getParameter("productId");
		System.out.println(itemName+" "+ productId+" "+subcatId+" "+fkCatId+"hi SAGAR in helper");
		Map<Long, GoodReceiveItemBean> map = new HashMap<Long, GoodReceiveItemBean>();

		ProductDetailDao dao = new ProductDetailDao();
		List<GoodReceiveItemBean> saleList = dao.getMultipleProDetailsDao(itemName, fkCatId, subcatId, productId);

		return saleList;
	}

	public List getCategoryWiseItemName(String category) {

		Map<Long, GoodReceiveItemBean> map = new HashMap<Long, GoodReceiveItemBean>();

		ProductDetailDao dao = new ProductDetailDao();
		List<GoodReceiveItemBean> custList = dao.getCategoryWiseItemName(category);

		return custList;

	}
	
	public List getProductListHelper() {

		ProductDetailDao dao = new ProductDetailDao();
		return dao.getProductListDao();
	}
	
	
	public List getbillnumber() {

		ProductDetailDao dao = new ProductDetailDao();
		return dao.getbillNoDao();
	}
	
	
	public List productWisePurchaseReportHelper(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String productId = request.getParameter("productId");
		Map<Long, PurchaseReport> map = new HashMap<Long, PurchaseReport>();

		ProductDetailDao dao = new ProductDetailDao();
		List<PurchaseReport> exp1List = dao.productWisePurchaseReportDao(productId);

		return exp1List;
	}
	
	public ProductDetailBean getProductDetailsForGrid(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String productSizePD = request.getParameter("productSizePD");

		System.out.println("productSizePD "+productSizePD);
		Map<Long, SaleReturn> map = new HashMap<Long, SaleReturn>();
		
		ProductDetailBean pdb = new ProductDetailBean();
		pdb.setProductSize(productSizePD);
		pdb.setProductColor("");
		
		return pdb;
	}
	
	//Purchase Edit Module Code
	
	public Map getAllNonGridPurchaseBillDetailsForPurchaseEditBilling(String voucherNo, String shopId)
	{
		ProductDetailDao dao = new ProductDetailDao();
		List catList = dao.getAllNonGridPurchaseBillDetailsForPurchaseEditBilling(voucherNo, shopId);
		
		Map  map =  new HashMap();
		for(int i=0;i<catList.size();i++)
		{
			Object[] o = (Object[])catList.get(i);
			
			GoodReceiveEditBean bean = new GoodReceiveEditBean();
			
			bean.setPkGoodRecId(Long.parseLong(o[0].toString()));
			bean.setBillNo(o[1].toString());
			bean.setFksupplierId(Long.parseLong(o[2].toString()));
			bean.setSupplierDetails(o[3].toString()+","+o[4].toString()+","+o[5].toString());
			if(o[6] == null)
			{
				bean.setPurchaseDate("");
			} else {
				bean.setPurchaseDate(o[6].toString());
			}
			bean.setContactPerson(o[7].toString());
			if(o[8] == null)
			{
				bean.setPurchasePaymentDueDate("");
			} else {
				bean.setPurchasePaymentDueDate(o[8].toString());
			}
			if(o[9] == null)
			{
				bean.setGrossTotal(0d);
			} else {
				bean.setGrossTotal(Double.parseDouble(o[9].toString()));
			}
			if(o[10] == null)
			{
				bean.setPendigBillPayment(0d);
			} else {
				bean.setPendigBillPayment(Double.parseDouble(o[10].toString()));
			}
			bean.setFkShopId(Long.parseLong(o[11].toString()));
			
			map.put(bean.getPkGoodRecId(),bean);
		}
		return map;
	}
	
	public List getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetails(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session = request.getSession();
		
		String voucherNo = request.getParameter("voucherNo");
		String shopId = (String) session.getAttribute("shopId");
		String productId = request.getParameter("productId");
		String itemName = request.getParameter("itemName");
		String fkCatId = request.getParameter("fkCatId");
		String subcatId = request.getParameter("subcatId");
		String bookingNo = request.getParameter("bookingNo");
		String forAdvanceBooking = request.getParameter("forAdvanceBooking");
		
		Map<Long, GoodReceiveEditBean> map = new HashMap<Long, GoodReceiveEditBean>();
		
		ProductDetailDao dao = new ProductDetailDao();
		List<GoodReceiveEditBean> saleList = dao.getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetails(voucherNo, productId, itemName, fkCatId, subcatId, bookingNo, forAdvanceBooking, shopId);//(voucherNo,shopId);//

		return saleList;
	}
	
	

}