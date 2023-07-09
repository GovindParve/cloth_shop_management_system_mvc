//CONTROLLER CLASS, EVERY REQUEST NAVIGATES FROM HERE 
package com.smt.utility;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.smt.bean.CreditDebitReportBean;
import com.smt.bean.CustomerBean;
import com.smt.bean.ProductDetailBean;
import com.smt.bean.PurchaseReturnGetItems;
import com.smt.bean.SaleReturnBean;
import com.smt.dao.GoodReciveDao;
import com.smt.helper.AccessControlHelper;
import com.smt.helper.AdvanceBookingHelper;
import com.smt.helper.AllGraphHelper;
import com.smt.helper.BankDetailsHelper;
import com.smt.helper.BankPaymentHelper;
import com.smt.helper.GSTReportHelper;
import com.smt.helper.CarEntryHelper;
import com.smt.helper.CashBookHelper; 
import com.smt.helper.CategoryHelper;
import com.smt.helper.CreditCustomerBillHelper;
import com.smt.helper.CreditDebitReportHelper;
import com.smt.helper.CustomerDetailsHelper;
import com.smt.helper.CustomerOrderHelper;
import com.smt.helper.CustomerPaymentHelper;
import com.smt.helper.EmployeeDetailsHelper;
import com.smt.helper.EmployeePaymentHelper;
import com.smt.helper.ExpenditureDetailsHelper;
import com.smt.helper.ExpenditurePaymentHelper;
import com.smt.helper.GoodReceiveHelper;
import com.smt.helper.JSONtoXML;
import com.smt.helper.LoginController;
import com.smt.helper.LoginEditBillHelper;
import com.smt.helper.LogoutController;
import com.smt.helper.OtherBillHelper;
import com.smt.helper.ProductDetailHelper;
import com.smt.helper.ProfitAndLossHelper;
import com.smt.helper.PurchaseReturnHelper;
import com.smt.helper.SaleReturnHelper;
import com.smt.helper.ShopDetailsHelper;
import com.smt.helper.SubCategoryHelper;
import com.smt.helper.SupplierAccountDetailsHelper;
import com.smt.helper.SupplierCashBankHelper;
import com.smt.helper.SupplierDetailHelper;
import com.smt.helper.TempCreditCustomerHelper;
import com.smt.helper.TempItemDetailHelper;
import com.smt.helper.UserDetailHelper;
import com.smt.helper.VatHelper;
import com.smt.helper.dayClosureReportHelper;
import com.smt.hibernate.GoodReceive;
import com.smt.hibernate.SaleReturn;

public class Controller
{
	private String toJson(Object data)
	{
		Gson gson = new GsonBuilder().setPrettyPrinting().disableHtmlEscaping().create();
		return gson.toJson(data);
	}
	
	// reg biill to database
	public String registerBill(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("IN CONTROLLER");
		CustomerOrderHelper Helper = new CustomerOrderHelper();
		Helper.registerBill(request, response);
		return toJson("Data Added Successfully");
	}

	// register gooods receive
	public String regGoodReceive(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		GoodReceiveHelper Helper = new GoodReceiveHelper();
		Helper.regGoodReceive(request, response);
		return toJson("Data Added Successfully");
	}

	// register ADVANCE BOOKING
	public String regAdvanceBooking(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		AdvanceBookingHelper Helper = new AdvanceBookingHelper();
		Helper.registerAdvanceBooking(request, response);
		return toJson("Data Added Successfully");
	}
	
	// regGoodReceive WithOut Barcode print
	public String regGoodReceiveWithOutBarcode(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		GoodReceiveHelper Helper = new GoodReceiveHelper();
		Helper.regGoodReceiveWithOutBarcode(request, response);
		return toJson("Goods Added Successfully");
	}

	// get item from tempData table
	public String getItemDetailByCarNo(HttpServletRequest request, HttpServletResponse response) {

		com.smt.helper.TempItemDetailHelper helper = new com.smt.helper.TempItemDetailHelper();
		List categories = helper.getItemDetailByCarNo(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// delete Item From TempData
	public String deleteItem(HttpServletRequest request, HttpServletResponse response) {
		TempItemDetailHelper helper = new TempItemDetailHelper();
		helper.deleteItem(request, response);
		return toJson("Item Deleted Successfully");
	}

	// get Category List In CategoryList Form
	public String getAllMAinCaregory(HttpServletRequest request, HttpServletResponse response) {
		CategoryHelper helper = new CategoryHelper();
		List categories = helper.getAllMAinCaregory(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// get Category List In CategoryList Form
	public String getAllMAinCaregoryShopWise(HttpServletRequest request, HttpServletResponse response) {
		CategoryHelper helper = new CategoryHelper();
		List categories = helper.getAllMAinCaregoryShopWise(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get SubCategory List In SubCategoryList Form
	public String getAllMainSubCategory(HttpServletRequest request, HttpServletResponse response) {
		CategoryHelper helper = new CategoryHelper();
		List SubCategory = helper.getAllMainSubCategory(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", SubCategory);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get Item List In ItemList Form
	public String getAllMAinItem(HttpServletRequest request, HttpServletResponse response) {
		ProductDetailHelper helper = new ProductDetailHelper();
		List categories = helper.getAllMAinItem(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get Supplier Detail
	public String getAllMAinSupp(HttpServletRequest request, HttpServletResponse response) {
		SupplierDetailHelper helper = new SupplierDetailHelper();
		List categories = helper.getAllMAinSupp(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get Current Stock Detail
	public String getAllCurrentStock(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getAllCurrentStock(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	//get all stock 
	
	public String getAllStock(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("CONTROLLER CALLED ========== ");
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getAllStock(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	//Current Stock
	
	public String getAllStock1(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("CONTROLLER CALLED ========== ");
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getAllStock1(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	public String getCurrentStockBarcodeNumberWise(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("CONTROLLER CALLED ========== ");
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getCurrentStockBarcodeNumberWise(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get categoryWise Stock
	public String getCategoryWiseStock(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getCategoryWiseStock(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get barcodeWise Stock
	/*public String getBarcodeWiseStock(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getBarcodeWiseStock(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}*/
	
	public String stockBarcodeWise(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.stockbarcodeWiseHelper(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	// get bill No Wise Stock
	public String getBillNoWiseStock(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getBillNoWiseStock(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	public String getbarcodeWiseStock(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getBillNoWiseStock(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get single date purchase
	public String singleDatePurchase(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.singleDatePurchase(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get two date purchase
	public String creditNoteReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.creditNoteReportBetweenTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("In Controller $$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get two date purchase
	public String debitNoteReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.debitNoteReportBetweenTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("In Controller $$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// get two date purchase
		public String debitNoteReportBetweenTwoDates1(HttpServletRequest request, HttpServletResponse response) {
			CustomerOrderHelper helper = new CustomerOrderHelper();
			List categories = helper.debitNoteReportBetweenTwoDates1(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("In Controller $$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}

	// get single date sale
	public String singleDateSale(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.singleDateSale(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get two date purchase
	public String purchaseReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.purchaseReportBetweenTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// get two date purchase GST B2B
		public String purchaseReportBetweenTwoDatesB2BPurchaseReport(HttpServletRequest request, HttpServletResponse response) {
			GSTReportHelper helper = new GSTReportHelper();
			List categories = helper.purchaseReportBetweenTwoDatesB2BPurchaseReport(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
	
	public String suppGstReportBetweenTwoDatesC(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.suppGstReportBetweenTwoDatesHelper(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get Category Wise sale report
	public String CategoryWiseSaleReport(HttpServletRequest request, HttpServletResponse response)
	{
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.CategoryWiseSaleReport(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	public String billSaleWiseForPopUpReportController(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.billSaleWiseForPopUpReportHelper(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	public String productWiseSaleReport(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.productWiseSaleReportHelper(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get two date sale
	public String getSaleDetailsBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getSaleDetailsBetweenTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}	
	
	//get two date sale bill no wise
	public String getSaleDetailsBetweenTwoDatesBillNo(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getSaleDetailsBetweenTwoDatesBillNo(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	//gst return 
	
	public String gstReturn(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.gstReturn(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	// for purchase gst return
	
	public String purchasegstReturn(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.purchasegstReturn(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	//expense report
	public String expenseReport(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.expenseReport(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	//get user sale between two dates
	public String getSaleDetailsBetweenTwoDates_users(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getSaleDetailsBetweenTwoDates_users(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Day Close Report
	public String dayCloseReport(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.dayCloseReport(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// register Supplier Detail
	public String doSupplierDetails(HttpServletRequest request, HttpServletResponse response) {
		SupplierDetailHelper helper = new SupplierDetailHelper();
		helper.doSupplier(request, response);
		return toJson("Supplier Added Successfully");
	}

	// edit Supplier Detail
	public String editSupp(HttpServletRequest request, HttpServletResponse response) {
		SupplierDetailHelper helper = new SupplierDetailHelper();
		helper.editSupplier(request, response);
		return toJson("Data Updated Successfully");
	}
	
	// delete Supplier Detail
	public String deleteSupplier(HttpServletRequest request, HttpServletResponse response) {
		SupplierDetailHelper helper = new SupplierDetailHelper();
		helper.deleteSupplier(request, response);
		return toJson("Supplier Deleted Successfully");
	}

	// to add product Name
	public String doProductDetail(HttpServletRequest request, HttpServletResponse response) throws IOException {
		ProductDetailHelper helper = new ProductDetailHelper();
		helper.doProductRegister(request, response);
		return toJson("Product Added Successfully");
	}

	// register Category Name
	public String regCategory(HttpServletRequest request, HttpServletResponse response) {
		CategoryHelper helper = new CategoryHelper();
		helper.registerCategory(request, response);
		return toJson("Data Added Successfully");
	}

	// register SubCategory Name
	public String regSubCategory(HttpServletRequest request, HttpServletResponse response) {
		SubCategoryHelper helper = new SubCategoryHelper();
		helper.regSubCategory(request, response);
		return toJson("Data Added Successfully");
	}

	// reName Category Name
	public String reNameCategory(HttpServletRequest request, HttpServletResponse response) {
		CategoryHelper helper = new CategoryHelper();
		helper.reNameCategory(request, response);
		return toJson("Category Updated Successfully !!!");
	}
	
	// delete Category Name
	public String deleteCategory(HttpServletRequest request, HttpServletResponse response) {
		CategoryHelper helper = new CategoryHelper();
		helper.deleteCategory(request, response);
		return toJson("Category Deleted Successfully !!!");
	}

	// get all Information about Supplier on SupplierEdit Form
	public String getSupplier(HttpServletRequest request, HttpServletResponse response) {
		String supplierName = request.getParameter("supplierName");
		Long suppilerId = Long.parseLong(supplierName);
		SupplierDetailHelper helper = new SupplierDetailHelper();
		Map map = helper.getEditSupplier(suppilerId);
		Map<String, List> returnMap = new HashMap<String, List>();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	public String getCategoryBySupplier(HttpServletRequest request, HttpServletResponse response) {
		String supplierId = request.getParameter("supplierId");
		CategoryHelper helper = new CategoryHelper();
		Map map = helper.getCategoryBySupplier(supplierId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	public String getAllCategoryReport(HttpServletRequest request, HttpServletResponse response) {
		CategoryHelper helper = new CategoryHelper();
		List stockList = helper.getCategoryName();
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", stockList);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// To Fetch Data in OderBill after Barcode Enter
	public String fetchCust(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		CustomerBean customer = helper.getDetailsById(request, response);
		Map<String, CustomerBean> returnMap = new HashMap<String, CustomerBean>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String getSaleDetailsBYYear(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getSaleDetailsBYYear(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String getSaleDetailsBYSingalDate(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getSaleDetailsBYSingalDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String getItemsBySaleBill(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getItemsBYSaleBILL(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String getSaleReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getSaleDetailsBYDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Logout
	public String logout(HttpServletRequest request, HttpServletResponse response) throws IOException, Exception
	{
		System.out.println("1111111 Controller.java Called");
		LogoutController helper = new LogoutController();
		helper.logoutUser(request, response);
		return toJson("Data Added Successsfully");
	}

	// to check UserName and Password
	public String login(HttpServletRequest request, HttpServletResponse response) throws IOException {
		LoginController helper = new LoginController();
		helper.loginUser(request, response);
		return toJson("Data Added Successfully");
	}

	// creting User
	public String userLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
		UserDetailHelper helper = new UserDetailHelper();
		helper.userLogin(request, response);
		return toJson("User Added Successfully");
	}

	// Register Car Entry
	public String carEntry(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		CarEntryHelper createUserHelper = new CarEntryHelper();
		createUserHelper.userCreate(request, response);
		return toJson("Data Added Successfully");
	}

	// Register vat Entry
	public String vatEntry(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		VatHelper createUserHelper = new VatHelper();
		createUserHelper.createVat(request, response);
		return toJson("Data Added Successfully");
	}

	// to get itemName In GoodReceived Form In Grid
	public String getProductInGrid(HttpServletRequest request, HttpServletResponse response) {
		String itemName = request.getParameter("itemName");
		ProductDetailHelper helper = new ProductDetailHelper();
		List customer = helper.getDetailsById1(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	//Edit Purchase Module Code
	
	public String getAllNonGridPurchaseBillDetailsForPurchaseEditBilling(HttpServletRequest request , HttpServletResponse response)
	{
		HttpSession session = request.getSession();
		String shopId = (String) session.getAttribute("shopId");
		
		String voucherNo = request.getParameter("voucherNo");
		ProductDetailHelper helper  = new ProductDetailHelper();
		Map map = helper.getAllNonGridPurchaseBillDetailsForPurchaseEditBilling(voucherNo, shopId);
		Map<String,List> returnMap = new HashMap<String,List>();
		String xyz= toJson(map);
		return xyz;
	}
	
	public String getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetails(HttpServletRequest request, HttpServletResponse response)
	{
		ProductDetailHelper helper = new ProductDetailHelper();
		List customer = helper.getPurchaseGridDetailsAndNewItemInGridByVoucherNoOrItemDetails(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
		//String xyz = toJson(returnMap);
		//return xyz;
	}
	
	public String editGoodReceiveDetails(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("IN CONTROLLER");
		GoodReceiveHelper Helper = new GoodReceiveHelper();
		Helper.editGoodReceiveDetails(request, response);
		return toJson("Data Added Successfully");
	}
	
	public String getItemsGridAndNonGridGoodReceiveDetailsByVoucherNo(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session = request.getSession();
		
		String voucherNo = request.getParameter("voucherNo");
		String shopId = (String) session.getAttribute("shopId");
		System.out.println("====CONTROLLER====");
		SupplierDetailHelper helper = new SupplierDetailHelper();
		Map purchaseReturn = helper.getItemsGridAndNonGridGoodReceiveDetailsByVoucherNo(voucherNo, shopId);
		String xyz = toJson(purchaseReturn);
		return xyz;
	}
	
	
	public String fetchCust11(HttpServletRequest request, HttpServletResponse response)
	{
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List customer = helper.getDetailsById11(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("offer", customer);
		System.out.println("In Controller fetchCust11 $$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	public String getMultipleProductInGrid(HttpServletRequest request, HttpServletResponse response) {
		String itemName = request.getParameter("itemName");
		ProductDetailHelper helper = new ProductDetailHelper();
		List customer = helper.getMultipleDetailsById1(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	public String getMultipleProductInGridForAdvanvceBookingCntrl(HttpServletRequest request, HttpServletResponse response) {
		String itemName = request.getParameter("itemName");
		ProductDetailHelper helper = new ProductDetailHelper();
		List customer = helper.getMultipleDetailsById1(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	/* Bill copy Generation */
	public String CustBillCOPY(HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("Start In regProfarmaDetail Controller");
		CarEntryHelper helper = new CarEntryHelper();
		helper.CustomerBillCopy(request, response);
		System.out.println("Start In regProfarmaDetail Controller");
		return toJson("Data Added Successfully");
	}

	// Fetching Product Details To Edit
	public String getProductDetailsToEdit(HttpServletRequest request, HttpServletResponse response) {
		String productId = request.getParameter("productId");
		Long productID = Long.parseLong(productId);
		System.out.println("in controller customerId : " + productID);
		ProductDetailHelper helper = new ProductDetailHelper();
		Map map = helper.getProductDetailsForEdit(productId);
		Map<String, List> returnMap = new HashMap<String, List>();
		String xyz = toJson(map);
		System.out.println(xyz);
		System.out.println("going out of controller");
		return xyz;
	}

	// update product details
	public String updateProductDetails(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("In controller update Supplier Details");
		ProductDetailHelper helper = new ProductDetailHelper();
		helper.editProductDetail(request, response);
		System.out.println("In controller Updateemployee");
		return toJson("Data Updated Successfully");
	}

	/*
	 * This getSupplierToPayment() used to get supplier names in cashbook when
	 * user payment to supplier
	 */

	public String getSupplierToPayment(HttpServletRequest request, HttpServletResponse response) {
		SupplierDetailHelper helper = new SupplierDetailHelper();
		List leafcat = helper.getSupplier();
		String aa = toJson(leafcat);
		System.out.println(aa);
		return aa;
	}

	// Register Customer Details
	public String customerDetails(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		CustomerDetailsHelper cdh = new CustomerDetailsHelper();
		cdh.customerDetails(request, response);
		return toJson("Customer Added Successfully");
	}

	// Fetching Credit Customer Details To Edit
	public String getCreditCustomerDetailsToEdit(HttpServletRequest request, HttpServletResponse response) {
		String strcustomerId = request.getParameter("creditCustomer");
		Long customerId = Long.parseLong(strcustomerId);
		System.out.println("in controller customerId : " + customerId);
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getCreditCustomerDetailsForEdit(customerId);
		Map<String, List> returnMap = new HashMap<String, List>();
		String xyz = toJson(map);
		System.out.println(xyz);
		System.out.println("going out of controller");
		return xyz;
	}

	// update credit customer details
	public String updateCreditCustomerDetails(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("In controller UpdateCreditCustomer");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		helper.editCreditCustomer(request, response);
		System.out.println("In controller Updateemployee");
		return toJson("Data Updated Successfully");
	}

	/* Add Cash Book Entry */
	public String addCashBook(HttpServletRequest request, HttpServletResponse response) {
		CashBookHelper helper = new CashBookHelper();
		helper.registerCashBookEntry(request, response);
		return toJson("Data Added Successfully");
	}

	// Register Employee Details
	public String regDetails(HttpServletRequest request, HttpServletResponse response) {
		EmployeeDetailsHelper edh = new EmployeeDetailsHelper();
		boolean b = edh.employeeDetails(request, response);
		if (b) {
			return toJson("Employee Added Successfully");
		} else {
			return toJson("Employee is not added !");
		}
	}

	// Fetching Employee Details To Edit
	public String getEmployeeDetailsToEdit(HttpServletRequest request, HttpServletResponse response) {
		String empID = request.getParameter("EmpId");
		Long empId = Long.parseLong(empID);
		System.out.println("in controller customerId : " + empId);
		EmployeeDetailsHelper helper = new EmployeeDetailsHelper();
		Map map = helper.getEmployeeDetailsForEdit(empId);
		Map<String, List> returnMap = new HashMap<String, List>();
		String xyz = toJson(map);
		System.out.println(xyz);
		System.out.println("going out of controller");
		return xyz;
	}

	// update Employee details
	public String updateEmployeeDetails(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("In controller update Supplier Details");
		EmployeeDetailsHelper helper = new EmployeeDetailsHelper();
		helper.editEmployeeDetail(request, response);
		System.out.println("In controller Updateemployee");
		return toJson("Data Updated Successfully");
	}

	// Register Expense Details
	public String addExpenseDetails(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		ExpenditureDetailsHelper exdh = new ExpenditureDetailsHelper();
		exdh.expenseDetails(request, response);
		return toJson("Expenditure Added Successfully");
	}
	
	// Register ExpenseType
		public String addExpenseType(HttpServletRequest request, HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			ExpenditureDetailsHelper exdh = new ExpenditureDetailsHelper();
			exdh.expenseType(request, response);
			return toJson("Expenditure Type Added Successfully");
		}

	public String getEmlpToPayment(HttpServletRequest request, HttpServletResponse response) {
		SupplierDetailHelper helper = new SupplierDetailHelper();
		List leafcat = helper.getEmployee();
		String aa = toJson(leafcat);
		System.out.println(aa);
		return aa;
	}

	// get Previous Good Receive Detail
	public String getPreGoodReceive(HttpServletRequest request, HttpServletResponse response) {
		GoodReceiveHelper helper = new GoodReceiveHelper();
		List categories = helper.getPreGoodReceive(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get billNo in purchase return Form
	public String getAllBillBySuppliers(HttpServletRequest request, HttpServletResponse response) {
		String supplierId = request.getParameter("supplier");
		SupplierDetailHelper helper = new SupplierDetailHelper();
		Map map = helper.getAllBillBySuppliers(supplierId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// get items in purchase return Form
	/*public String getTotalItemByBillNo(HttpServletRequest request, HttpServletResponse response) {
		String billNo = request.getParameter("billNo");
		String supplierId = request.getParameter("supplierId");
		System.out.println("supplier  :: " + supplierId);
		SupplierDetailHelper helper = new SupplierDetailHelper();
		Map map = helper.getTotalItemByBillNo(billNo, supplierId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}*/
	
	public String getTotalItemByBillNo(HttpServletRequest request, HttpServletResponse response)
	{
		String billNo = request.getParameter("billNo");
		String supplierId = request.getParameter("supplierId");
		
		SupplierDetailHelper helper = new SupplierDetailHelper();
		PurchaseReturnGetItems purchaseReturn = helper.getTotalItemByBillNo(billNo, supplierId);
		Map<String, PurchaseReturnGetItems> map = new HashMap<String, PurchaseReturnGetItems>();
		map.put("offer", purchaseReturn);
		return toJson(map);
		/*String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;*/
	}
	
	public String fetchCust1(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("In Controller fetchCust1 Method for Get Grid 0");
		CustomerOrderHelper helper = new CustomerOrderHelper();
		CustomerBean customer = helper.getDetailsById1(request, response);
		Map<String, CustomerBean> returnMap = new HashMap<String, CustomerBean>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		System.out.println("In Controller fetchCust1 Method for Get Grid 1");
		return toJson(returnMap);
	}

	public String fetchCust123(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List customer = helper.getDetailsById123(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	// Register PurchaseReturn
	public String returngoodsReceipt(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("IN CONTROLLER");
		PurchaseReturnHelper helper = new PurchaseReturnHelper();
		helper.returngoodsReceipt(request, response);
		return toJson("Purchase Return Added Successfully");
	}

	// get items in sale return Form
	public String getSaleItemByBillNo(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		String billNo = request.getParameter("billNo");
		CustomerOrderHelper helper = new CustomerOrderHelper();
		Map map = helper.getSaleItemByBillNo(billNo, shopId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	// get items in sale return For Sale Return By Mobile No
	public String getSaleItemsGridForSaleReturnByMobileNo(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		String billNo = request.getParameter("billNo");
		CustomerOrderHelper helper = new CustomerOrderHelper();
		Map map = helper.getSaleItemsGridForSaleReturnByMobileNo(billNo, shopId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// get items in sale return Form
	public String getSaleItemByBillNo1(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		String billNo = request.getParameter("billNo");
		CustomerOrderHelper helper = new CustomerOrderHelper();
		Map map = helper.getSaleItemByBillNo1(billNo, shopId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	// get items in sale return Form
/*		
 	public String getSaleItemByBillNoForUpdateCreditCust(HttpServletRequest request, HttpServletResponse response)
 	{ 
			String billNo = request.getParameter("billNo");
			// String supplierId = request.getParameter("supplierId");
			// System.out.println("supplier  :: "+supplierId);
			System.out.println("billNo In Credit Customer  :: " + billNo);
			CreditCustomerBillHelper helper = new CreditCustomerBillHelper();
			Map map = helper.getSaleItemByBillNoForUpdateCreditCustHelper(billNo);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
*/		
	
	// get items in sale return Form
		public String getSaleItemByBillNo2(HttpServletRequest request, HttpServletResponse response)
		{
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			
			String billNo = request.getParameter("billNo");
			CustomerOrderHelper helper = new CustomerOrderHelper();
			Map map = helper.getSaleItemByBillNo2(billNo, shopId);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}

	// Register SaleReturn
	public String returnSale(HttpServletRequest request, HttpServletResponse response) 
	{
		System.out.println("IN CONTROLLER");
		SaleReturnHelper helper = new SaleReturnHelper();
		helper.returnSale(request, response);
		return toJson("Data Added Successfully");
	}
	
	//sale return bill no wise
	public String returnSaleBillno(HttpServletRequest request, HttpServletResponse response) 
	{
		System.out.println("IN CONTROLLER");
		SaleReturnHelper helper = new SaleReturnHelper();
		helper.returnSale(request, response);
		return toJson("Data Added Successfully");
	}
	
	//sale return Mobile Number Wise
	public String salReturnByMobNo(HttpServletRequest request, HttpServletResponse response) 
	{
		System.out.println("IN CONTROLLER");
		SaleReturnHelper helper = new SaleReturnHelper();
		helper.salReturnByMobNo(request, response);
		return toJson("Data Added Successfully");
	}

	// Register SaleReturn
	public String returnSale1(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("IN CONTROLLER");
		SaleReturnHelper helper = new SaleReturnHelper();
		helper.returnSale1(request, response);
		return toJson("Data Added Successfully");
	}

	// To Fetch Data in OtherOderBill after Barcode Enter
	/*public String fetchCust1(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		CustomerBean customer = helper.getDetailsById1(request, response);
		Map<String, CustomerBean> returnMap = new HashMap<String, CustomerBean>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}*/

	// reg Other Bill to Database
	public String registerOtherBill(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("IN CONTROLLER");
		OtherBillHelper Helper = new OtherBillHelper();
		Helper.registerOtherBill(request, response);
		return toJson("Data Added Successfully");
	}
	//Edit otherbill temporay to permanet
	public String registerOtherBill123(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("IN CONTROLLER");
		OtherBillHelper Helper = new OtherBillHelper();
		Helper.registerOtherBill123(request, response);
		return toJson("Data Added Successfully");
	}
	
	//Tax Invoice Hold Bill Edit And Print Code Start Here
	
	public String getSaleInvoceBillNonGridDetailsByBillNoForTaxInvoiceHoldBillEditAndPrintBilling(HttpServletRequest request , HttpServletResponse response)
	{
		HttpSession session = request.getSession();
		String shopId = (String) session.getAttribute("shopId");
		
		String billNo = request.getParameter("billNo");
		OtherBillHelper helper  = new OtherBillHelper();
		Map map = helper.getSaleInvoceBillNonGridDetailsByBillNoForTaxInvoiceHoldBillEditAndPrintBilling(billNo, shopId);
		Map<String,List> returnMap = new HashMap<String,List>();
		String xyz= toJson(map);
		return xyz;
	}
	
	public String getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForTaxInvoiceHoldBillEditAndPrintBilling(HttpServletRequest request, HttpServletResponse response)
	{
		OtherBillHelper helper = new OtherBillHelper();
		List customer = helper.getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForTaxInvoiceHoldBillEditAndPrintBilling(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("offer", customer);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
		//String xyz = toJson(returnMap);
		//return xyz;
	}
	
	public String taxInvoiceHoldBillEditAndPrintBillingSave(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("IN CONTROLLER");
		OtherBillHelper Helper = new OtherBillHelper();
		Helper.taxInvoiceHoldBillEditAndPrintBillingSave(request, response);
		return toJson("Data Added Successfully");
	}
	
	
	
	// pdf copy of other bill
	public String OtherBillCOPY(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		OtherBillHelper Helper = new OtherBillHelper();
		Helper.OtherBillCOPY(request, response);
		return toJson("Data Added Successfully");
	}

	// pdf copy of other bill
	public String BillCOPYForCreditBill(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		CreditCustomerBillHelper Helper = new CreditCustomerBillHelper();
		Helper.BillCOPYForCreditBill(request, response);
		return toJson("Data Added Successfully");
	}

	// get supplierwise stock between two selected date
	public String getSupWiseStockBetTwoDays(HttpServletRequest request, HttpServletResponse response)
	{	
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getSupWiseStockBetTwoDays(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get single date cash report
	public String singleDateCashBook(HttpServletRequest request, HttpServletResponse response) {
		CashBookHelper helper = new CashBookHelper();
		List categories = helper.singleDateCashBook(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get two date cash report
	public String cashBookReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		CashBookHelper helper = new CashBookHelper();
		List categories = helper.cashBookReportBetweenTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// register gooods receive
	public String printBarcode(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		GoodReceiveHelper Helper = new GoodReceiveHelper();
		Helper.printBarcode(request, response);
		return toJson("Barcode Printed Successfully");
	}

	// Registering Supplier Payment
	public String regSupCashBook(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		System.out.println("In controller");
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		helper.regSupplierCashBank(request, response);
		return toJson("Data Added Successfully");
	}

	// Registering Credit Customer Payment
	public String regCreditCustCashBook(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		System.out.println("In controller");

		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		helper.regCreditCustomerCashBank(request, response);
		return toJson("Data Added Successfully");
	}

	// Registering Employee Payment
	public String regEmpCashBook(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		System.out.println("IN CONTROLLER");
		EmployeePaymentHelper helper = new EmployeePaymentHelper();
		helper.regEmployeePayment(request, response);
		return toJson("Data Added Successfully");
	}

	// Registering Expenditure Payment
	public String regExpenseCashBook(HttpServletRequest request, HttpServletResponse response)throws Exception
	{
		System.out.println("IN CONTROLLER");
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		helper.regExpensePayment(request, response);
		return toJson("Data Added Successfully");
	}

	// Getting Total amount as per Bill number in Supplier Payment from goods
	// receive table
	public String getTotalAmtByBillNo(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		String billNo = request.getParameter("billNo");
		String supplierId = request.getParameter("supplier");
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getTotalAmtByBillNo(billNo, supplierId, shopId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// Getting Supplier Name wise report from good receive
	public String supplierAllPurchase(HttpServletRequest request, HttpServletResponse response) {
		String supplier = request.getParameter("supplier");
		System.out.println("Supplier is" + supplier);
		GoodReceiveHelper helper = new GoodReceiveHelper();
		List map = helper.getsuppliernamewisepurchaseReport(supplier);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", map);
		System.out.println(map);
		return toJson(returnMap);
	}

	// fetching Bill number as per customer Name in customer Payment
	public String getAllBillByCustomer(HttpServletRequest request, HttpServletResponse response) {
		String fkCustomerId = request.getParameter("creditCustomer");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getAllBillByCustomers(fkCustomerId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// fetching Bill number as per customer Name in customer Payment
	public String getAllBillByCustomer2(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession(true);
		String shopId = (String) session1.getAttribute("shopId");
		String fkCustomerId = request.getParameter("creditCustomer");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getAllBillByCreditCustomers(fkCustomerId, shopId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// fetching Bill number as per customer Name in customer Payment
	public String getAllBillByCustomer1(HttpServletRequest request, HttpServletResponse response) {
		String fkCustomerId = request.getParameter("creditCustomer");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		List list = helper.getAllBillByCustomers2(fkCustomerId);
		String xyz = toJson(list);
		System.out.println(xyz);
		return xyz;
	}
	
	//Getting Bill No List By Contact No For Sale return invice by Mobile Number
	public String getBillNoListByMobileNoForSaleReturnByMobileNo(HttpServletRequest request, HttpServletResponse response)
	{
		String contactNumber = request.getParameter("contactNumber");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		List list = helper.getBillNoListByMobileNoForSaleReturnByMobileNo(contactNumber);
		String xyz = toJson(list);
		System.out.println(xyz);
		return xyz;
	}

	// Getting Total amount as per Bill number in Customer Payment from
	// fertilizer bill table
	public String getTotalAmtByBillNoForCreditCustomer(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		String billNo = request.getParameter("billNo1");
		String creditCustomer = request.getParameter("creditCustomer");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getTotalAmtByBillNo(billNo, creditCustomer, shopId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// Getting Remaining balance amount as per Bill number in Supplier Payment
	// from Supplier Payment details table
	public String getBalanceAmtByBillNo(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		String billNo = request.getParameter("billNo");
		String supplier = request.getParameter("supplier");
		String totalAmount = request.getParameter("totalAmount");
		System.out.println("Total Amount"+totalAmount);
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getRemainingAmtByBillNo(billNo, supplier, totalAmount, shopId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// fetching balance amount as per Bill number in Customer Payment from
	// Customer Payment table
	public String getBalanceAmtByBillNoForCreditCustomer(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		String billNo = request.getParameter("billNo1");
		String creditCustomer = request.getParameter("creditCustomer");
		String totalAmount1 = request.getParameter("totalAmount1");
		CustomerDetailsHelper helper = new CustomerDetailsHelper();
		Map map = helper.getBalanceAmtByBillNo(billNo, creditCustomer,totalAmount1, shopId);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// Supplier payment as per single date
	public String getSupplierPaymentDetailsForSingleDate(HttpServletRequest request, HttpServletResponse response) {
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		List categories = helper.getSupplierPaymentDetailsBySingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Supplier payment report between two days
	public String getSupplierPaymentReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		List categories = helper.getSupplierPaymentByTwoDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Supplier payment as per bill number
	public String getSupplierPaymentDetailsAsPerBillNumber(HttpServletRequest request, HttpServletResponse response) {
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		List categories = helper.getSupplierPaymentDetailsByBillNumber(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Supplier payment as per name
	public String getSupplierPaymentDetailsAsPerName(HttpServletRequest request, HttpServletResponse response) {
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		List categories = helper.getSupplierPaymentDetailsByNames(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Supplier Unpaid payment as per name
	public String getAllUnPaidBillAmount(HttpServletRequest request, HttpServletResponse response) {
		SupplierCashBankHelper helper = new SupplierCashBankHelper();
		List categories = helper.getSupplierUnpaidPaymentDetailsByNames(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Credit Customer payment as per Name
	public String getCustomerReportByName(HttpServletRequest request, HttpServletResponse response) {
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		List categories = helper.getCustPaymentDetailsByNames(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Credit Customer payment as per bill number
	public String getCreditCustPaymentDetailsForBillNo(HttpServletRequest request, HttpServletResponse response) {
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		List categories = helper.getCustPaymentDetailsByBill(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Credit Customer payment as per single date
	public String getCreditCustPaymentDetailsForSingleDate(HttpServletRequest request, HttpServletResponse response) {
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		List categories = helper.getCustPaymentDetailsBySingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Credit Customer payment report between two days
	public String getCustomerReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		List categories = helper.getCustDetailsByDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Employee payment as per single date
	public String getEmpPaymentDetailsForSingleDate(HttpServletRequest request, HttpServletResponse response) {
		EmployeePaymentHelper helper = new EmployeePaymentHelper();
		List categories = helper.getEmployeePaymentDetailsForSingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Employee payment report between two days
	public String getEmployeeReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		EmployeePaymentHelper helper = new EmployeePaymentHelper();
		List categories = helper.getEmpPaymentByTwoDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Expenditure payment report as per single date
	public String getExpensePaymentDetailsForSingleDate(HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.getExpensePaymentDetailsForSingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Expenditure payment report between two days
	public String getExpenditurePaymentReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.getExpensePaymentDetailByTwoDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get today credit and debit report
	public String getTodayCreditDebitReport(HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.getTodayCreditDebitReport(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get taday credit and debit report
	public String getTodayCreditDebitReport1(HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.getTodayCreditDebitReport1(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// get today Upi report
		public String getTodayUpiReport(HttpServletRequest request, HttpServletResponse response) {
			ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
			List categories = helper.getTodayUpiReport1(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}

	// get single credit and debit report
	public String creditdebitForsingleDate(HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.creditdebitForsingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get single credit and debit report
	public String creditdebitForsingleDate1(HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.creditdebitForsingleDate1(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get two credit and debit report
	public String creditdebitForBetTowDate(HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.creditdebitForBetTowDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String creditdebitForBetTowDate1(HttpServletRequest request, HttpServletResponse response) {
		ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
		List categories = helper.creditdebitForBetTowDate1(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Supplier Account details
	public String getYesterdarTotalAmount(HttpServletRequest request, HttpServletResponse response) {
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getYesterdarTotalAmount();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	public String getTodaySaleTotalAmount(HttpServletRequest request, HttpServletResponse response) {
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getTodaySaleTotalAmount();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	public String getTodaySaleTotalAmount1(HttpServletRequest request, HttpServletResponse response) {
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		String userType = request.getParameter("userType");
		String userName = request.getParameter("userName");
		Map map = helper.getTodaySaleTotalAmount1(userType, userName);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	public String getTodaySaleReturnTotalAmount(HttpServletRequest request, HttpServletResponse response) {
		String userType = request.getParameter("userType");
		String userName = request.getParameter("userName");
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getTodaySaleReturnTotalAmount(userType, userName);
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	public String getTodayCreditTotalAmount(HttpServletRequest request, HttpServletResponse response) {
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getTodayCreditTotalAmountHelper();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	public String getTodayCreditReturnTotalAmount(HttpServletRequest request, HttpServletResponse response) {
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getTodayCreditReturnTotalAmountHelper();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	public String getTodayPurchaseReturnTotalAmount(HttpServletRequest request, HttpServletResponse response) {
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getTodayPurchaseReturnTotalAmount();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}
	
	public String getTodayPurchaseTotalAmount(HttpServletRequest request, HttpServletResponse response) {
		SupplierAccountDetailsHelper helper = new SupplierAccountDetailsHelper();
		Map map = helper.getTodayPurchaseTotalAmount();
		String xyz = toJson(map);
		System.out.println(xyz);
		return xyz;
	}

	// reg biill to database
	public String regCreditCustomerBill(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("IN CONTROLLER");
		CreditCustomerBillHelper Helper = new CreditCustomerBillHelper();
		Helper.regCreditCustomerBill(request, response);
		return toJson("Data Added Successfully");
	}
	
	public String tempbill(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("IN CONTROLLER");
		TempCreditCustomerHelper Helper = new TempCreditCustomerHelper();
		Helper.regCreditCustomerBill1(request, response);
		return toJson("Data Added Successfully");
	}

	// get two date sale gst
	public String gstSaleReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.gstSaleReportBetweenTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get Barcode Wise report
	public String BarcodeWiseReport(HttpServletRequest request, HttpServletResponse response) {
		GoodReceiveHelper helper = new GoodReceiveHelper();
		List categories = helper.BarcodeWiseReport(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String getSubCategoriesByRootcategory(HttpServletRequest request, HttpServletResponse response) {
		String catID = request.getParameter("catId");
		// String subCatID=request.getParameter("subCatId");
		ProductDetailHelper helper = new ProductDetailHelper();
		Map leafcat = helper.getSubCategoriesByRootcategory(catID);
		String aa = toJson(leafcat);
		System.out.println(aa);
		return aa;
	}
	
	public String getExpenseTypeForExpenditurePayment(HttpServletRequest request, HttpServletResponse response) {
		String expenditureId = request.getParameter("expenditureId");
		// String subCatID=request.getParameter("subCatId");
		ExpenditureDetailsHelper helper = new ExpenditureDetailsHelper();
		Map leafcat = helper.getExpenseTypeForExpenditurePaymentHelper(expenditureId);
		String aa = toJson(leafcat);
		System.out.println(aa);
		return aa;
	}

	// reName Sub Category Name
	public String reNameSubCategory(HttpServletRequest request, HttpServletResponse response) {
		SubCategoryHelper helper = new SubCategoryHelper();
		helper.reNameSubCategory(request, response);
		return toJson("Sub Category Updated Successfully !!!");
	}
	
	// delete Sub Category Name
	public String deleteSubCategory(HttpServletRequest request, HttpServletResponse response) {
		SubCategoryHelper helper = new SubCategoryHelper();
		helper.deleteSubCategory(request, response);
		return toJson("Sub Category Delete Successfully !!!");
	}

	// get two date purchase NON GST
	public String purchaseReportBetweenTwoDatesNonGst(HttpServletRequest request, HttpServletResponse response) {
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.purchaseReportBetweenTwoDatesNonGst(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get single date Miscellaneos customer Sale
	public String miscellaneousSingleDate(HttpServletRequest request, HttpServletResponse response) {
		OtherBillHelper helper = new OtherBillHelper();
		List categories = helper.miscellaneousSingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// Credit Single Date Sale Return Report
	
		public String CSRSingleDate(HttpServletRequest request, HttpServletResponse response) {
			OtherBillHelper helper = new OtherBillHelper();
			List categories = helper.CSRSingleDate(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}

	// get Two date Miscellaneos customer Sale
	public String miscellaneousTwoDate(HttpServletRequest request, HttpServletResponse response) {
		OtherBillHelper helper = new OtherBillHelper();
		List categories = helper.miscellaneousTwoDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// get Two date Miscellaneos customer Sale
		public String CCSRTwoDate(HttpServletRequest request, HttpServletResponse response) {
			OtherBillHelper helper = new OtherBillHelper();
			List categories = helper.CCSRTwoDate(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}

	// get category wise Miscellaneos customer Sale
	public String miscellaneousSaleWiseCustomer(HttpServletRequest request, HttpServletResponse response) {
		OtherBillHelper helper = new OtherBillHelper();
		List categories = helper.miscellaneousSaleWiseCustomer(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get category wise Credit customer Sale return report
		public String CCSRSaleWiseCustomer(HttpServletRequest request, HttpServletResponse response) {
			OtherBillHelper helper = new OtherBillHelper();
			List categories = helper.CCSRSaleWiseCustomer(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
	
	
	// get Bill no wise Miscellaneos customer Sale
	public String billnowiseMiscellaneoussell(HttpServletRequest request, HttpServletResponse response) {
		OtherBillHelper helper = new OtherBillHelper();
		List categories = helper.billnowiseMiscellaneoussell(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// get Bill no wise Credit customer Sale Return Report
		public String billnowiseCCSR(HttpServletRequest request, HttpServletResponse response) {
			OtherBillHelper helper = new OtherBillHelper();
			List categories = helper.billnowiseCCSR(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}

	// Barcode No Wise Miscellaneos Sale Report
	public String barcodenowiseMiscellaneoussell(HttpServletRequest request, HttpServletResponse response) {
		OtherBillHelper helper = new OtherBillHelper();
		List categories = helper.barcodenowiseMiscellaneoussell(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// Barcode No Wise Credit Customer Sale Return Report
	public String barcodenowiseCCSR(HttpServletRequest request, HttpServletResponse response)
	{
		OtherBillHelper helper = new OtherBillHelper();
		List categories = helper.barcodenowiseCCSR(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
		
	// Purchase Report Category Wise
	public String categoryWisePurchaseReport(HttpServletRequest request, HttpServletResponse response)
	{
		GoodReceiveHelper helper = new GoodReceiveHelper();
		List categories = helper.categoryWisePurchaseReport(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	public String productWisePurchaseReport(HttpServletRequest request, HttpServletResponse response)
	{
		ProductDetailHelper helper = new ProductDetailHelper();
		List categories = helper.productWisePurchaseReportHelper(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Purchase Report Supplier Bill No Wise
	public String supplierBillWisePurchaseReport(HttpServletRequest request, HttpServletResponse response)
	{
		GoodReceiveHelper helper = new GoodReceiveHelper();
		List categories = helper.supplierBillWisePurchaseReport(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	public String voucherNoWisePurchaseReport(HttpServletRequest request, HttpServletResponse response)
	{
		GoodReceiveHelper helper = new GoodReceiveHelper();
		List categories = helper.voucherNumberWisePurchaseReportHelper(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Purchase Report Barcode No Wise
	public String barcodeWisePurchaseReport(HttpServletRequest request, HttpServletResponse response)
	{
		GoodReceiveHelper helper = new GoodReceiveHelper();
		List categories = helper.barcodeWisePurchaseReport(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Purchase Report Single Date
	public String singleDatePurchase45(HttpServletRequest request, HttpServletResponse response)
	{
		GoodReceiveHelper helper = new GoodReceiveHelper();
		List categories = helper.singleDatePurchase45(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Purchase Report Two Date
	public String twoDatePurchase45(HttpServletRequest request, HttpServletResponse response)
	{
		GoodReceiveHelper helper = new GoodReceiveHelper();
		List categories = helper.twoDatePurchase45(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Single Date Credit Sale Report
	public String creditSingleDate(HttpServletRequest request, HttpServletResponse response)
	{
		CreditCustomerBillHelper helper = new CreditCustomerBillHelper();
		List categories = helper.creditSingleDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Two Date Credit Sale Report
	public String creditTwoDate(HttpServletRequest request, HttpServletResponse response)
	{
		CreditCustomerBillHelper helper = new CreditCustomerBillHelper();
		List categories = helper.creditTwoDate(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Category Wise Credit Sale Report
	public String creditSaleWiseCustomer(HttpServletRequest request, HttpServletResponse response)
	{
		CreditCustomerBillHelper helper = new CreditCustomerBillHelper();
		List categories = helper.creditSaleWiseCustomer(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	public String creditProductWiseSaleController(HttpServletRequest request, HttpServletResponse response)
	{
		CreditCustomerBillHelper helper = new CreditCustomerBillHelper();
		List categories = helper.creditProductWiseSaleHelper(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	
	// Bill No Wise Credit Sale Report
	public String billnowiseCreditsell(HttpServletRequest request, HttpServletResponse response) 
	{
		CreditCustomerBillHelper helper = new CreditCustomerBillHelper();
		List categories = helper.billnowiseCreditsell(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// Barcode No Wise Credit Sale Report
	public String barcodenowiseCredit(HttpServletRequest request, HttpServletResponse response) 
	{
		CreditCustomerBillHelper helper = new CreditCustomerBillHelper();
		List categories = helper.barcodenowiseCredit(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// CA Purchase Report Two Date
	public String caReportBetweenTwoDates(HttpServletRequest request, HttpServletResponse response) throws FileNotFoundException, IOException, JSONException
	{
		GoodReceiveHelper helper = new GoodReceiveHelper();
		List categories = helper.caReportBetweenTwoDates(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		JSONtoXML abc = new JSONtoXML();
		abc.shree(returnMap);
		return toJson(returnMap);
	}

	// Credit Customer payment as per Name
	public String getCreditCustomerBalanceReportNameWise(HttpServletRequest request, HttpServletResponse response)
	{
		CustomerPaymentHelper helper = new CustomerPaymentHelper();
		List categories = helper.getCreditCustomerBalanceReportNameWise(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get Category Wise Item Name
	public String getCategoryWiseItemName(HttpServletRequest request, HttpServletResponse response)
	{
		String category = request.getParameter("category");
		ProductDetailHelper helper = new ProductDetailHelper();
		List list = helper.getCategoryWiseItemName(category);
		String xyz = toJson(list);
		System.out.println(xyz);
		return xyz;
	}

	// get categoryWise Item Stock
	public String getCategoryWiseItemnameStock(HttpServletRequest request, HttpServletResponse response)
	{
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getCategoryWiseItemnameStock(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}

	// get Most Selling Item
	public String getMostSellingProduct(HttpServletRequest request, HttpServletResponse response)
	{
		CustomerOrderHelper helper = new CustomerOrderHelper();
		List categories = helper.getMostSellingProduct(request, response);
		Map<String, List> returnMap = new HashMap<String, List>();
		returnMap.put("list", categories);
		System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
		return toJson(returnMap);
	}
	
	// get two date purchase
		public String employeeNameWiseAndBetweenTwoDates(HttpServletRequest request, HttpServletResponse response)
		{
			CustomerOrderHelper helper = new CustomerOrderHelper();
			List categories = helper.employeeNameWiseAndBetweenTwoDates(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("In Controller $$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Sales Graph
		public String getSalesGraph(HttpServletRequest request, HttpServletResponse response)
		{
			CustomerOrderHelper helper = new CustomerOrderHelper();
			List categories = helper.getSalesGraph(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Sales Graph
		public String getPurchaseGraph(HttpServletRequest request, HttpServletResponse response) {
			CustomerOrderHelper helper = new CustomerOrderHelper();
			List categories = helper.getPurchaseGraph(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
	//this method is created for get all emp name
		
		public String getEmpNameforGrid(HttpServletRequest request, HttpServletResponse response) {
			OtherBillHelper helper = new OtherBillHelper();
			System.out.println("hello i am in controler Sonal+++++++++++++++");
			
			List leafcat = helper.getEmployee();
			String aa = toJson(leafcat);
			System.out.println("in other bill helper"+aa);
			return toJson(leafcat);
		}		
		
		//get all user Name
		
		public String getAllUserName(HttpServletRequest request, HttpServletResponse response) {
			String empname = request.getParameter("utype");
			EmployeeDetailsHelper helper = new EmployeeDetailsHelper();
			Map map = helper.getAllUserName(empname);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		public String advanceBookingRangeController(HttpServletRequest request, HttpServletResponse response)
		{
			AdvanceBookingHelper helper = new AdvanceBookingHelper();
			List categories = helper.advanceBookingRangeHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String advanceBookingSupplierAndRangeController(HttpServletRequest request, HttpServletResponse response)
		{
			AdvanceBookingHelper helper = new AdvanceBookingHelper();
			List categories = helper.advanceBookingSupplierAndRangeHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String advanceBooking_BookingNoController(HttpServletRequest request, HttpServletResponse response)
		{
			AdvanceBookingHelper helper = new AdvanceBookingHelper();
			List categories = helper.advanceBooking_BookingNoHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String purchaseReturnSingleDate(HttpServletRequest request, HttpServletResponse response)
		{
			OtherBillHelper helper = new OtherBillHelper();
			List categories = helper.purchaseReturnSingleDateHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String purchaseReturnRangeWise(HttpServletRequest request, HttpServletResponse response)
		{
			OtherBillHelper helper = new OtherBillHelper();
			List categories = helper.purchaseReturnRangeWiseHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		public String purchaseReturnBillNoWise(HttpServletRequest request, HttpServletResponse response)
		{
			OtherBillHelper helper = new OtherBillHelper();
			List categories = helper.purchaseReturnBillNoWiseHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String getTotalItemByVoucherNoForEditGR(HttpServletRequest request, HttpServletResponse response)
		{
			HttpSession session = request.getSession();
			
			String voucherNo = request.getParameter("voucherNo");
			String shopId = (String) session.getAttribute("shopId");
			System.out.println("====CONTROLLER====");
			SupplierDetailHelper helper = new SupplierDetailHelper();
			Map purchaseReturn = helper.getTotalItemByVoucherNoForEditGRHelper(voucherNo, shopId);
			String xyz = toJson(purchaseReturn);
			return xyz;
		}
		
		public String getTodayExpdCreditAmount(HttpServletRequest request, HttpServletResponse response) {
			ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
			Map map = helper.getTodayExpdCreditAmount();
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		public String getTodayExpdDebitAmount(HttpServletRequest request, HttpServletResponse response) {
			ExpenditurePaymentHelper helper = new ExpenditurePaymentHelper();
			Map map = helper.getTodayExpdDebitAmount();
			String xyz = toJson(map);
			System.out.println("EXPD DEBIT AMOUNT ===============> "+map.get(xyz));
			System.out.println(xyz);
			return xyz;
		}
		
		public String getTodayCashAmount(HttpServletRequest request, HttpServletResponse response)
		{
			String userType = request.getParameter("userType");
			String userName = request.getParameter("userName");
			dayClosureReportHelper helper = new dayClosureReportHelper();
			Map map = helper.getTodayCashAmounthelper(userType, userName);
			String xyz = toJson(map);
			System.out.println("today Cash AMOUNT ===============> "+map.get(xyz));
			System.out.println(xyz);
			return xyz;
		}
		
		public String getTodayCardAmount(HttpServletRequest request, HttpServletResponse response) {
			String userType = request.getParameter("userType");
			String userName = request.getParameter("userName");
			dayClosureReportHelper helper = new dayClosureReportHelper();
			Map map = helper.getTodayCardAmounthelper(userType, userName);
			String xyz = toJson(map);
			System.out.println("today card AMOUNT ===============> "+map.get(xyz));
			System.out.println(xyz);
			return xyz;
		}
		
		public String getTodayChequeAmount(HttpServletRequest request, HttpServletResponse response) {
			String userType = request.getParameter("userType");
			String userName = request.getParameter("userName");
			dayClosureReportHelper helper = new dayClosureReportHelper();
			Map map = helper.getTodayChequeAmounthelper(userType, userName);
			String xyz = toJson(map);
			System.out.println("today card AMOUNT ===============> "+map.get(xyz));
			System.out.println(xyz);
			return xyz;
		}
		
		public String getTodayNEFTAmount(HttpServletRequest request, HttpServletResponse response) {
			String userType = request.getParameter("userType");
			String userName = request.getParameter("userName");
			dayClosureReportHelper helper = new dayClosureReportHelper();
			Map map = helper.getTodayNeftAmounthelper(userType, userName);
			String xyz = toJson(map);
			System.out.println("today NEFT AMOUNT ===============> "+map.get(xyz));
			System.out.println(xyz);
			return xyz;
		}
		
		public String getAllCustomers(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("GET CUSTOMER ===============> CONTROLLER");
			CustomerDetailsHelper helper = new CustomerDetailsHelper();
			Map map = helper.getAllCustomerHelper();
			String xyz = toJson(map);
			System.out.println("GET CUSTOMER CONTROLLER ===============> "+map.get(xyz));
			System.out.println(xyz);
			return xyz;
		}
		
		public String setOfferDiscount(HttpServletRequest request, HttpServletResponse response)
		{					
			System.out.println("IN CONTROLLER setOfferDiscount called");
			GoodReceiveHelper Helper = new GoodReceiveHelper();
			Helper.setOfferDiscountHelper(request, response);
			return toJson("Data Added Successfully");
		}
		
		public String editBillTaxInvoiceC(HttpServletRequest request, HttpServletResponse response) 
		{
			System.out.println("IN CONTROLLER BILL EDIT");
			OtherBillHelper helper = new OtherBillHelper();
			helper.editBillTaxInvoiceHelper(request, response);
			return toJson("Data Added Successfully");
		}
		
		public String editBillCreditCustomerController(HttpServletRequest request, HttpServletResponse response) 
		{
			System.out.println("CREDIT CUSTOMER  BILL EDIT CONTROLLER ");
			CreditCustomerBillHelper helper = new CreditCustomerBillHelper();
			helper.editBillCreditCustomerHelper(request, response);
			return toJson("Data Added Successfully");
		}
		
		public String getSaleItemByBillNoForBillEdit(HttpServletRequest request, HttpServletResponse response)
		{
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			
			String billNo = request.getParameter("billNo");
			CustomerOrderHelper helper = new CustomerOrderHelper();
			Map map = helper.getSaleItemByBillNoForBillEditHelper(billNo, shopId);
			String xyz = toJson(map);
			System.out.println(xyz);
			return xyz;
		}
		
		public String getSaleItemByBillNoForBillEditCreditCust(HttpServletRequest request, HttpServletResponse response)
		{
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			String billNo = request.getParameter("billNo");
			String creditCustomer1 = request.getParameter("creditCustomer1");
			CustomerOrderHelper helper = new CustomerOrderHelper();
			Map map = helper.getSaleItemByBillNoForBillEditCreditCustHelper(billNo, shopId);
			String xyz = toJson(map);
			System.out.println("xyz ====> "+xyz);
			return xyz;
		}
		
		public String creditCustEditBillTaxInvoice(HttpServletRequest request, HttpServletResponse response) 
		{
			System.out.println("IN CONTROLLER BILL EDIT");
			CreditCustomerBillHelper helper = new CreditCustomerBillHelper();
			helper.creditCustomerEditBillHelper(request, response);
			return toJson("Data Added Successfully");
		}
		
		public String paymentModeWiseReport(HttpServletRequest request, HttpServletResponse response) {
			CustomerOrderHelper helper = new CustomerOrderHelper();
			List categories = helper.paymentModeWiseReportHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		
		public String paymentModeWiseReportForCreditCust(HttpServletRequest request, HttpServletResponse response) {
			CreditCustomerBillHelper helper = new CreditCustomerBillHelper();
			List categories = helper.paymentModeWiseReportForCreditCustHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		
		public String paymentModeRangeWiseReport(HttpServletRequest request, HttpServletResponse response) {
			System.out.println("IN CONTROLLER paymentModeRangeWiseReport");
			CustomerOrderHelper helper = new CustomerOrderHelper();
			List categories = helper.paymentModeRangeWiseReportHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String updatePurchaseReturn(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("IN CONTROLLER");
			GoodReceiveHelper helper = new GoodReceiveHelper();
			helper.updatePurchaseReturnHelper(request, response);
			return toJson("Purchase Updated Successfully");
		}
		
		public String getUserList(HttpServletRequest request, HttpServletResponse response) {
			UserDetailHelper helper = new UserDetailHelper();
			List categories = helper.getAllUserListHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String saleReturnCreditNote(HttpServletRequest request, HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			SaleReturnHelper Helper = new SaleReturnHelper();
			Helper.saleReturnCreditNoteHelper(request, response);
			return toJson("Data Added Successfully");
		}
		
		public String getSrCreditAmountController(HttpServletRequest request, HttpServletResponse response) {
			SaleReturnHelper helper = new SaleReturnHelper();
			SaleReturn transactionData = helper.getSRTrasanctionData(request, response);
			Map<String, SaleReturn> returnMap = new HashMap<String, SaleReturn>();
			returnMap.put("offer", transactionData);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String creditDebitReportRangeWiseController(HttpServletRequest request, HttpServletResponse response) {
			CreditDebitReportHelper helper = new CreditDebitReportHelper();
			List categories = helper.getCreditDebitReportByTwoDate(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String getAllUsersToEdit(HttpServletRequest request, HttpServletResponse response)
		{	
			String userType = request.getParameter("userType");
			// String subCatID=request.getParameter("subCatId");
			UserDetailHelper helper = new UserDetailHelper();
			Map leafcat = helper.getAllUsersToEditHelper(userType);
			String aa = toJson(leafcat);
			System.out.println(aa);
			return aa;
		}
		
		public String updateUserDetails(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("In controller update User Details");
			UserDetailHelper helper = new UserDetailHelper();
			String getMsg = helper.updateUserDetailsHelper(request, response);
			System.out.println("In controller UpdateUser");
			return toJson(getMsg);
		}				
		
		public String getCurrentNewSupplierPendingAmountController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("In controller getCurrentNewSupplierPendingAmountController");
			String newSupplierId = request.getParameter("newSupplierId"); 
			SupplierDetailHelper helper = new SupplierDetailHelper();
			Map map = helper.getCurrentNewSupplierPendingAmountHelper(newSupplierId);
			Map<String, List> returnMap = new HashMap<String , List>();
			String xyz = toJson(map);
			System.out.println(xyz);
			System.out.println("going out of controller getCurrentNewSupplierPendingAmountController");
			return xyz;
		}				
		
		public String getTodayCreditCustCashAmount(HttpServletRequest request, HttpServletResponse response)
		{
			String userType = request.getParameter("userType");
			String userName = request.getParameter("userName");
			dayClosureReportHelper helper = new dayClosureReportHelper();
			Map map = helper.getTodayCReditCustCashAmounthelper(userType, userName);
			String xyz = toJson(map);
			System.out.println("today Cash AMOUNT ===============> "+map.get(xyz));
			System.out.println(xyz);
			return xyz;
		}
		
		//Upi
		public String getTodayUpiCashAmount(HttpServletRequest request, HttpServletResponse response)
		{
			String userType = request.getParameter("userType");
			String userName = request.getParameter("userName");
			dayClosureReportHelper helper = new dayClosureReportHelper();
			Map map = helper.getTodayUpiCustCashAmounthelper(userType, userName);
			String xyz = toJson(map);
			System.out.println("today upi AMOUNT ===============> "+map.get(xyz));
			System.out.println(xyz);
			return xyz;
		}
		
		public String getTodayCreditCustCardAmount(HttpServletRequest request, HttpServletResponse response)
		{
			String userType = request.getParameter("userType");
			String userName = request.getParameter("userName");
			dayClosureReportHelper helper = new dayClosureReportHelper();
			Map map = helper.getTodayCReditCustCardAmounthelper(userType, userName);
			String xyz = toJson(map);
			System.out.println("today Cash AMOUNT ===============> "+map.get(xyz));
			System.out.println(xyz);
			return xyz;
		}
		
		public String setProductSizeController(HttpServletRequest request, HttpServletResponse response) {
			ProductDetailHelper helper = new ProductDetailHelper();
			ProductDetailBean productDetailsData = helper.getProductDetailsForGrid(request, response);
			Map<String, ProductDetailBean> returnMap = new HashMap<String, ProductDetailBean>();
			returnMap.put("offer", productDetailsData);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		
		public String paymentDueDateWiseController(HttpServletRequest request, HttpServletResponse response)
		{
			GoodReceiveHelper helper = new GoodReceiveHelper();
			List categories = helper.paymentDueDateWiseHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get two date sale
		public String saleDetailsBetweenTwoDatesB2CGSTReport(HttpServletRequest request, HttpServletResponse response)
		{
			GSTReportHelper helper = new GSTReportHelper();
			List categories = helper.getSaleDetailsBetweenTwoDatesB2CGSTReport(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}				
		
		// get two date sale
		public String saleDetailsBetweenTwoDatesB2CGSTReportExportToExcel(HttpServletRequest request, HttpServletResponse response)
		{
			GSTReportExportToExcel exportToExcel = new GSTReportExportToExcel();
			exportToExcel.exportSaleB2CGSTReportToExcel(request, response);
			System.out.println("In controller saleDetailsBetweenTwoDatesB2CGSTReportExportToExcel");
			return toJson("Data Exported To Excel File Successfully");					
		}
		
		// get two date sale
		public String purchaseDetailsBetweenTwoDatesB2BGSTReportExportToExcel(HttpServletRequest request, HttpServletResponse response)
		{
			GSTReportExportToExcel exportToExcel = new GSTReportExportToExcel();
			exportToExcel.exportPurchaseB2BGSTReportToExcel(request, response);
			System.out.println("In controller saleDetailsBetweenTwoDatesB2CGSTReportExportToExcel");
			return toJson("Data Exported To Excel File Successfully");					
		}
		
		// get taday credit and debit report
		public String allExpensesProfitAndLoss(HttpServletRequest request, HttpServletResponse response) {
			ProfitAndLossHelper helper = new ProfitAndLossHelper();
			List categories = helper.getAllExpensesBetweenDateRangeHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get taday credit and debit report
		public String allIncomeProfitAndLoss(HttpServletRequest request, HttpServletResponse response) {
			ProfitAndLossHelper helper = new ProfitAndLossHelper();
			List categories = helper.getAllIncomeBetweenDateRangeHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Category Wise sale report FOR GRAPH
		public String categoryWiseSaleGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.categoryWiseSaleGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		
		public String SaleGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.SaleGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		
		// get Category Wise sale report FOR GRAPH
		public String supplierWiseSaleTotalGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.supplierWiseTotalSaleGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Category Wise sale report FOR TODAY SALE
		public String categoryWiseTodaySaleGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.categoryWiseSaleGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String todaysCategoryWiseSaleGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.todaysCategoryWiseSaleGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Category Wise sale report FOR GRAPH
		public String subCategoryWiseSaleGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.subCategoryWiseSaleGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Category Wise sale report FOR PURCHASE
		public String categoryWisePurchaseGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.categoryWisePurchaseGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Category Wise sale report FOR PURCHASE
		public String supplierWiseTotalPurchaseGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== supplierWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.supplierWiseTotalPurchaseGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Category Wise sale report FOR TODAY PURCHASE
		public String todaysCategoryWisePurchaseGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.todaysCategoryWisePurchaseGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Category Wise sale report FOR GRAPH
		public String rangeWiseSaleGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.rangeWiseSaleGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Category Wise sale report FOR PURCHASE
		public String subCategoryWisePurchaseGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.subCategoryWisePurchaseGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		
		public String rangeWisePurchaseGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.rangeWisePurchaseGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// get Category Wise sale report FOR GRAPH
		public String supplierWiseSaleGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.supplierWiseSaleGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String supplierWisePurchaseGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.supplierWisePurchaseGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String subCatWiseSaleGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.subCatWiseSaleGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String subCatWisePurchaseGraphController(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("=== categoryWiseSaleGraph Controller ===");
			AllGraphHelper helper = new AllGraphHelper();
			List categories = helper.subCatWisePurchaseGraphHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// to add bank Name
		public String addBankDetails(HttpServletRequest request, HttpServletResponse response) throws IOException {
			BankDetailsHelper helper = new BankDetailsHelper();
			helper.addBank(request, response);
			return toJson("Bank Added Successfully");
		}
		
		// to add bank Name
		public String addShopDetails(HttpServletRequest request, HttpServletResponse response) throws IOException
		{
		  ShopDetailsHelper helper = new ShopDetailsHelper();
		  helper.addShopDetails(request, response);
		  return toJson("Shop Added Successfully");
		}
		
		// Registering Bank Payment
		public String regBankCashBook(HttpServletRequest request, HttpServletResponse response)throws Exception
		{
			System.out.println("IN CONTROLLER");
			BankPaymentHelper helper = new BankPaymentHelper();
			helper.regBankPayment(request, response);
			return toJson("Data Added Successfully");
		}
		
		public String getTotalAmountOfBankController(HttpServletRequest request, HttpServletResponse response)
		{
			String fkRootBankId = request.getParameter("fkRootBankId"); 
			BankPaymentHelper helper = new BankPaymentHelper();
			Map map = helper.getBankTotalAmountHelper(fkRootBankId);
			Map<String, List> returnMap = new HashMap<String , List>();
			String xyz = toJson(map);
			System.out.println(xyz);
			System.out.println("going out of controller getTotalAmountOfBankController");
			return xyz;
		}
		
		// Bank payment as per name
		public String getBankPaymentDetailsAsPerName(HttpServletRequest request, HttpServletResponse response) {
			BankPaymentHelper helper = new BankPaymentHelper();
			List categories = helper.getBankPaymentDetailsByNames(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// Bank payment as per name
		public String getBankPaymentDetailsBetweenDates(HttpServletRequest request, HttpServletResponse response) {
			BankPaymentHelper helper = new BankPaymentHelper();
			List categories = helper.getBankPaymentDetailsBetweenDates(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String getUsersAllInfoController(HttpServletRequest request, HttpServletResponse response)
		{	
			String userType = request.getParameter("userType");
			String pkUserid = request.getParameter("userNameList");
			// String subCatID=request.getParameter("subCatId");
			UserDetailHelper helper = new UserDetailHelper();
			Map leafcat = helper.getUsersAllInfoHelper(userType, pkUserid);
			String aa = toJson(leafcat);
			System.out.println(aa);
			return aa;
		}
		
		// to check UserName and Password
		public String sendPassToMailController(HttpServletRequest request, HttpServletResponse response) throws IOException {
			LoginController helper = new LoginController();
			String alert = helper.loginUserMailHelper(request, response);
			return toJson(alert);
		}
		
		// get Current Stock Detail
		public String getBarcodeBasedStockC(HttpServletRequest request, HttpServletResponse response) {
			CustomerOrderHelper helper = new CustomerOrderHelper();
			List categories = helper.getBarcodeBasedStockHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String getAllShopsNameC(HttpServletRequest request, HttpServletResponse response)
		{
			ShopDetailsHelper helper = new ShopDetailsHelper();
			Map leafcat = helper.getAllShopHelper(request, response);
			String aa = toJson(leafcat);
			return aa;
		}
		
		public String allExpensesProfitAndLossForExpenditure(HttpServletRequest request, HttpServletResponse response) {
			ProfitAndLossHelper helper = new ProfitAndLossHelper();
			List categories = helper.getAllExpensesBetweenDateRangeForExpenditureHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		//Access Control Data
		public String getUserDetailsToAccessControl(HttpServletRequest request,	HttpServletResponse response) {
			
			AccessControlHelper helper =new AccessControlHelper();
			Map map = helper.getUserDetailsForAccessControl(request,response);
			String xyz = toJson(map);
			System.out.println(xyz);
			System.out.println("going out of controller");
			return xyz;
		}
		
		//Add Access Control Details
		public String AddAccessControl(HttpServletRequest request,
			HttpServletResponse response) {
			System.out.println("IN CONTROLLER");
			AccessControlHelper helper=new AccessControlHelper();
			helper.AccessControlDetails(request, response);
			return toJson("Data Added Successfully");
		}
		
		
		// get Taxinvoicewithoutbarcode Report
		public String TaxWiseSaleReport(HttpServletRequest request, HttpServletResponse response)
		{
			OtherBillHelper helper = new OtherBillHelper();
			List categories = helper.Taxinvoicewisesalereport(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String getsaleamount (HttpServletRequest request ,HttpServletResponse response)
		{
			GoodReceiveHelper helper=new GoodReceiveHelper();
			List categories=helper.getsaleamount(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(categories);
			System.out.println("data: - "+xyz);
			System.out.println("going out of controller");
			return xyz;	
		}
		
		
		public String MostsellProduct (HttpServletRequest request ,HttpServletResponse response)
		{
			GoodReceiveHelper helper=new GoodReceiveHelper();
			List categories=helper.getmostSell(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(categories);
			System.out.println("data: - "+xyz);
			System.out.println("going out of controller");
			return xyz;	
		}
		
		public String getsaleamountreg (HttpServletRequest request ,HttpServletResponse response)
		{
			GoodReceiveHelper helper=new GoodReceiveHelper();
			List categories=helper.getsaleamount1(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(categories);
			System.out.println("data: - "+xyz);
			System.out.println("going out of controller");
			return xyz;	
		}
		
		public String getPurchase (HttpServletRequest request ,HttpServletResponse response)
		{
			GoodReceiveHelper helper=new GoodReceiveHelper();
			List categories=helper.getPurchaseAmount(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(categories);
			System.out.println("data: - "+xyz);
			System.out.println("going out of controller");
			return xyz;	
		}
		
		
		public String getlowStock (HttpServletRequest request ,HttpServletResponse response)
		{
			GoodReceiveHelper helper=new GoodReceiveHelper();
			List categories=helper.getlowStock(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(categories);
			System.out.println("data: - "+xyz);
			System.out.println("going out of controller");
			return xyz;	
		}
		
		
		public String getyestsaleamount (HttpServletRequest request ,HttpServletResponse response)
		{
			GoodReceiveHelper helper=new GoodReceiveHelper();
			List categories=helper.getyestAmount(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(categories);
			System.out.println("data: - "+xyz);
			System.out.println("going out of controller");
			return xyz;	
		}
		
		
		public String getyestsaleRegamount (HttpServletRequest request ,HttpServletResponse response)
		{
			GoodReceiveHelper helper=new GoodReceiveHelper();
			List categories=helper.getyestAmount1(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(categories);
			System.out.println("data: - "+xyz);
			System.out.println("going out of controller");
			return xyz;	
		}
		
		public String getyestpurchaseamount (HttpServletRequest request ,HttpServletResponse response)
		{
			GoodReceiveHelper helper=new GoodReceiveHelper();
			List categories=helper.getyestpurchaseAmount(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			String xyz = toJson(categories);
			System.out.println("data: - "+xyz);
			System.out.println("going out of controller");
			return xyz;	
		}
		
		
		
		public String agewiseRangeController(HttpServletRequest request, HttpServletResponse response)
		{
			CustomerOrderHelper helper = new CustomerOrderHelper();
			List categories = helper.advanceBookingRangeHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String agewiseSupplierAndRangeController(HttpServletRequest request, HttpServletResponse response)
		{
			AdvanceBookingHelper helper = new AdvanceBookingHelper();
			List categories = helper.agewiseSupplierAndRangeHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		public String agewiseBarcodeController(HttpServletRequest request, HttpServletResponse response)
		{
			AdvanceBookingHelper helper = new AdvanceBookingHelper();
			List categories = helper.agewiseBarcodeHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
		
		// barcode wise age reports
		public String barcodeWiseController(HttpServletRequest request, HttpServletResponse response)
		{
			AdvanceBookingHelper helper = new AdvanceBookingHelper();
			List categories = helper.agewiseBarcodeHelper(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("list", categories);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
		}
				
		public String updateGridData(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("In controller");
			TempCreditCustomerHelper stk = new TempCreditCustomerHelper();
			stk.updateGridData(request, response);
			return toJson("Data Added Successfully");
		}
				 
		public String billreturn(HttpServletRequest request, HttpServletResponse response) throws ParseException
		{
			System.out.println("IN CONTROLLER");
			SaleReturnHelper helper = new SaleReturnHelper();
			helper.billReturnAsPerBillNo(request, response);
			return toJson("Bill Deleted Successfully");
		}
		
		public String EmpAttend(HttpServletRequest request, HttpServletResponse response) throws ParseException
		{
			System.out.println("IN CONTROLLER");
			EmployeeDetailsHelper helper = new EmployeeDetailsHelper();
			helper.EmpAttendence(request, response);
			return toJson("Attendence Registered Successfully");
		}
		public String updateEmployeeAttendenceDetails(HttpServletRequest request, HttpServletResponse response) throws ParseException
		{
			System.out.println("IN CONTROLLER");
			EmployeeDetailsHelper helper = new EmployeeDetailsHelper();
			helper.updateEmpAttendence(request, response);
			return toJson("Attendence  Updated/Registered Successfully");
		}
		
		public String editBillLogin(HttpServletRequest request,HttpServletResponse response) throws IOException
		{
			LoginEditBillHelper  helper = new LoginEditBillHelper();
			//helper.loginUser(request, response);
			boolean reult = helper.editBillLogin(request, response);
			if (reult) {
				System.out.println("IN CONTROLLER Succes");
				return toJson(1);
			} else {
				System.out.println("IN CONTROLLER Fail");
				return toJson(0);
			}
		}
		
		//Edit Sale Invoice Bill Code Start Here
		
		public String getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling(HttpServletRequest request , HttpServletResponse response)
		{
			HttpSession session = request.getSession();
			String shopId = (String) session.getAttribute("shopId");
			
			String billNo = request.getParameter("billNo");
			OtherBillHelper helper  = new OtherBillHelper();
			Map map = helper.getSaleInvoceBillNonGridDetailsByBillNoForEditSaleInvoceBilling(billNo, shopId);
			Map<String,List> returnMap = new HashMap<String,List>();
			String xyz= toJson(map);
			return xyz;
		}
		
		public String getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBilling(HttpServletRequest request, HttpServletResponse response)
		{
			OtherBillHelper helper = new OtherBillHelper();
			List customer = helper.getSaleInvoceBillGridDetailsAndNewItemInGridByBillNoOrBarcodeNoOrItemDetailsForEditSaleInvoceBilling(request, response);
			Map<String, List> returnMap = new HashMap<String, List>();
			returnMap.put("offer", customer);
			System.out.println("$$$$$$$$$$$$$$$$" + returnMap);
			return toJson(returnMap);
			//String xyz = toJson(returnMap);
			//return xyz;
		}
		
		public String editSaleInvoceBilling(HttpServletRequest request, HttpServletResponse response)
		{
			System.out.println("IN CONTROLLER");
			OtherBillHelper Helper = new OtherBillHelper();
			Helper.editSaleInvoceBilling(request, response);
			return toJson("Data Added Successfully");
		}
		
		//Edit Sale Invoice Bill Code End Here
		
}