package com.smt.helper;

import java.math.BigInteger;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.CreditCustPaymentDetail;
import com.smt.bean.CustomerBean;
import com.smt.bean.EditPurchase;
import com.smt.bean.GetEmployeeDetails;
import com.smt.bean.GetSupplierDetails;
import com.smt.bean.PurchaseReturnGetItems;
import com.smt.bean.SupplierBean;
import com.smt.bean.SupplierEditBean;
import com.smt.dao.CustomerOrderDao;
import com.smt.dao.EmployeeDetailsDao;
import com.smt.dao.SupplierDetailDao;
import com.smt.hibernate.SupplierDetail;
import com.smt.utility.HibernateUtility;

public class SupplierDetailHelper
{
	public void doSupplier(HttpServletRequest request, HttpServletResponse response)
	{
		String shopId = request.getParameter("shopId");
		String address = request.getParameter("address");
		String city = request.getParameter("city");
		String contactPerson = request.getParameter("contactPerson");
		String email = request.getParameter("email");
		String pin = request.getParameter("pin");
		String supplierName = request.getParameter("supplierName");
		String mobileno = request.getParameter("mobileno");
		String panNo = request.getParameter("panNo");
		String supcode = request.getParameter("supCode");
		String taxName = request.getParameter("vatName");
		
		String supplierType = request.getParameter("type");
System.out.println("Supplier type"+supplierType);		
		String accountName = request.getParameter("accountname");
		System.out.println(accountName+"account name");
		String accountnumber = request.getParameter("account");
		System.out.println(accountnumber);
		String ifsc = request.getParameter("ifsc");
		String upiid = request.getParameter("upiid");

		SupplierDetail detail = new SupplierDetail();


		
		detail.setSupplierType(supplierType);
		
		
			if(address == null || address.isEmpty() || address == "" || address == " ")
		{
				detail.setAddress("N/A");
			
		} else {
			
			detail.setAddress(address);
		}

			if(city == null || city.isEmpty() || city == "" || city == " ")
			{

			detail.setCity("N/A");
		} else {

			detail.setCity(city);
		}

		if(contactPerson == null || contactPerson.isEmpty() || contactPerson == "" || contactPerson == " ")
		{
			detail.setContactPerson("N/A");
		}
		else
		{
			detail.setContactPerson(contactPerson);
		}

		if(email == null || email.isEmpty() || email == "" || email == " ")
		{

			detail.setEmail("N/A");
		} else {
			detail.setEmail(email);
		}

		if(pin == null || pin.isEmpty() || pin == "" || pin == " ")
		{

			detail.setPin(Long.parseLong("00"));
		} else {
			detail.setPin(Long.parseLong(pin));
		}

		if(panNo == null || panNo.isEmpty() || panNo == "" || panNo == " ")
		{

			detail.setPanNo("N/A");
		} else {

			detail.setPanNo(panNo);
		}
		detail.setSupplierName(supplierName);

		if(mobileno == null || mobileno.isEmpty() || mobileno == "" || mobileno == " ")
		{

			detail.setMobileno(Long.parseLong("00"));
		} else {

			detail.setMobileno(Long.parseLong(mobileno));
		}
		
		
		if(accountName == null || accountName.isEmpty() || accountName == "" || accountName == " ")
		{

			detail.setAccountName("N/A");
		} else {
			detail.setAccountName(accountName);
		}
		
		
		if(upiid == null || upiid.isEmpty() || upiid == "" || upiid == " ")
		{

			detail.setUpiid("N/A");
		} else {
			detail.setUpiid(upiid);
		}
		
		if(accountnumber == null || accountnumber.isEmpty() || accountnumber == "" || accountnumber == " ")
		{
			detail.setAccNumber(Long.parseLong("00"));
			
		} else {
			
			detail.setAccNumber(Long.parseLong(accountnumber));
		}
		
		if(ifsc == null || ifsc.isEmpty() || ifsc == "" || ifsc == " ")
		{

			detail.setIfsCcode1("N/A");
		} else {
			detail.setIfsCcode1(ifsc);
		}
		
		
		if(supcode == null || supcode.isEmpty() || supcode == "" || supcode == " ")
		{

			detail.setSuppCode("N/A");
		} else {
			detail.setSuppCode(supcode);
		}
		
		
		detail.setTaxType(taxName);
		detail.setActiveYn("Y");
		detail.setFkShopId(Long.parseLong(shopId));
System.out.println("data come in helper going to dao");
		SupplierDetailDao dao = new SupplierDetailDao();
		dao.valSupplierDetail(detail);
	}

	// Edit Supplier Detail
	public void editSupplier(HttpServletRequest request, HttpServletResponse response)
	{
		String address = request.getParameter("address");
		String supplierCode = request.getParameter("supplierCode");
		String city = request.getParameter("city");
		String contactPerson = request.getParameter("contactPerson");
		String email = request.getParameter("email");
		String pin = request.getParameter("pin");
		String mobileno = request.getParameter("mobileno");
		String panNo = request.getParameter("panNo");
		String supplierName1 = request.getParameter("supplierName1");
		String supplierName = request.getParameter("supplierName");
		
		String type = request.getParameter("type");
		
		String accname = request.getParameter("accname");
		String account = request.getParameter("account");
		String ifsc = request.getParameter("ifsc");
		String upid = request.getParameter("upid");

		HibernateUtility hbu = HibernateUtility.getInstance();
		Session session = hbu.getHibernateSession();
		Transaction transaction = session.beginTransaction();

		SupplierDetail det = (SupplierDetail) session.get(SupplierDetail.class, new Long(supplierName));

		det.setSupplierType(type);
		
		det.setSupplierName(supplierName1);
		
		det.setSuppCode(supplierCode);

		det.setContactPerson(contactPerson);

		if (!"".equals(address)) {

			det.setAddress(address);
		} else {
			det.setAddress("N/A");
		}

		if (!"".equals(city)) {

			det.setCity(city);
		} else {

			det.setCity("N/A");
		}

		if (!"".equals(contactPerson)) {

			det.setContactPerson(contactPerson);
		} else {

			det.setContactPerson("N/A");
		}

		if (!"".equals(email)) {

			det.setEmail(email);
		} else {
			det.setEmail("N/A");
		}

		if (!"".equals(pin)) {

			det.setPin(Long.parseLong(pin));
		} else {
			det.setPin(Long.parseLong("00"));
		}

		if (!"".equals(panNo)) {

			det.setPanNo(panNo);
		} else {

			det.setPanNo("NA");
		}
		if (!"".equals(mobileno)) {

			det.setMobileno(Long.parseLong(mobileno));
		} else {

			det.setMobileno(Long.parseLong("00"));
		}
		
		
		
		if (!"".equals(accname)) {

			det.setAccountName(accname);
		} else {

			det.setAccountName("N/A");
		}
		
		
		if (!"".equals(account)) {

			det.setAccNumber(Long.parseLong(account));
		} else {

			det.setAccNumber(Long.parseLong("00"));
		}
		
		
		if (!"".equals(ifsc)) {

			det.setIfsCcode1(ifsc);
		} else {

			det.setIfsCcode1("N/A");
		}
		
		if (!"".equals(upid)) {

			det.setUpiid(upid);
		} else {

			det.setUpiid("N/A");
		}
		

		session.saveOrUpdate(det);
		transaction.commit();
	}

	public List getAllSuppliers()
	{
		SupplierDetailDao dao = new SupplierDetailDao();
		return dao.getAllMainSuppliers();
	}
	
	public List getAllSuppliersShopWise(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		SupplierDetailDao dao = new SupplierDetailDao();
		return dao.getAllMainSuppliers(shopId);
	}

	// get all Information about Supplier on SupplierEdit Form
	public Map getEditSupplier(Long suppilerId) {

		SupplierDetailDao dao1 = new SupplierDetailDao();
		
		System.out.println("supplier id"+suppilerId);
		List catList = dao1.getEditSupplier1(suppilerId);
		
		System.out.println("cat list"+catList);
		
		Map map = new HashMap();
		for (int i = 0; i < catList.size(); i++)
		{
			Object[] o = (Object[]) catList.get(i);
			SupplierEditBean bean = new SupplierEditBean();
			bean.setAddress((String) o[0]);
			bean.setCity((String) o[1]);
			bean.setContactPerson((String) o[2]);
			bean.setPin(Long.parseLong(o[3].toString()));
			bean.setEmail((String) o[4]);
			bean.setMobileno(Long.parseLong(o[5].toString()));
			bean.setPanNo((String) o[6]);
			bean.setSupplierName((String) o[7]);
			bean.setSuppCode((String) o[8]);
			bean.setTaxType((String) o[9]);
			bean.setAccountName((String) o[10]);
			bean.setAccNumber(Long.parseLong(o[11].toString()));
			bean.setIfsCcode1((String) o[12]);
			bean.setUpiid((String) o[13]);
			bean.setSupplierType((String) o[14]);
			map.put(bean.getSupplierName(), bean);
		}
		return map;
	}

	// get supplier name
	public List getAllMAinSupp(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		Map<Long, SupplierDetail> map = new HashMap<Long, SupplierDetail>();

		SupplierDetailDao dao = new SupplierDetailDao();
		List<SupplierDetail> exp1List = dao.getAllMAinSupp();

		return exp1List;
	}

	public List getSupplier() {

		SupplierDetailDao dao = new SupplierDetailDao();
		return dao.getSupplierNameByToPay();

	}

	public List getEmployee() {

		SupplierDetailDao dao = new SupplierDetailDao();
		return dao.getEmployeeNameByToPay();

	}

	public Map getAllBillBySuppliers(String supplierId) {
		// TODO Auto-generated method stub
		SupplierDetailDao dao = new SupplierDetailDao();
		List list = dao.getAllBillBySuppliers(supplierId);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++)
		{
			Object[] o = (Object[]) list.get(i);
			com.smt.bean.GetSupplierDetails bean = new com.smt.bean.GetSupplierDetails();
			System.out.println(Arrays.toString(o));

			String pendingBal = o[2].toString();
			if (pendingBal.equals("0")) {
				continue;
			}
			else
			{
				bean.setBillNo(o[0].toString());
				//bean.setItemName(o[0].toString());
				bean.setSize(o[1].toString());
				bean.setBarcode(o[2].toString());			
			}
			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(bean.getBillNo(), bean);

		}
		return map;
	}

	public List getAllUnPaidBillAmount(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub

		String supplierId = request.getParameter("supplier");

		Map<Long, GetSupplierDetails> map = new HashMap<Long, GetSupplierDetails>();

		SupplierDetailDao dao = new SupplierDetailDao();
		List<GetSupplierDetails> custList = dao.getAllUnPaidBillAmount(supplierId);

		return custList;
	}

	public Map getAllBillBySuppliers1(String supplierId) {
		// TODO Auto-generated method stub
		SupplierDetailDao dao = new SupplierDetailDao();
		List list = dao.getAllBillBySuppliers1(supplierId);
		Map map = new HashMap();
		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			com.smt.bean.GetSupplierDetails bean = new com.smt.bean.GetSupplierDetails();
			System.out.println(Arrays.toString(o));
			bean.setBillNo(o[0].toString());

			// bean.setTotalAmount((Double)o[1]);
			System.out.println("***************" + o[0]);
			map.put(bean.getBillNo(), bean);

		}
		return map;
	}

	/*public Map getTotalItemByBillNo(String billNo, String supplierId) {
		// TODO Auto-generated method stub
		SupplierDetailDao dao = new SupplierDetailDao();
		List list = dao.getTotalItemByBillNo(billNo, supplierId);
		Map map = new HashMap();

		for (int i = 0; i < list.size(); i++) {
			Object[] o = (Object[]) list.get(i);
			PurchaseReturnGetItems bean = new PurchaseReturnGetItems();
			bean.setPkGoodRecId(Long.parseLong(o[0].toString()));
			bean.setCatName(o[1].toString());
			bean.setItemName(o[2].toString());
			bean.setQuantity(Double.parseDouble(o[3].toString()));
			System.out.println("hi this is kishor +++++++++++"+(o[3].toString()));
			bean.setBuyPrice(Double.parseDouble(o[4].toString()));
			bean.setVat(Double.parseDouble(o[5].toString()));
			bean.setIgst(Double.parseDouble(o[11].toString()));
			bean.setDiscount(Double.parseDouble(o[12].toString()));
			bean.setRollsize(Double.parseDouble(o[13].toString()));
			bean.setTotal(Double.parseDouble(o[6].toString()));
			bean.setContactPerson(o[7].toString());
			bean.setBarcodeNo(Long.parseLong(o[8].toString()));
			bean.setOndate(o[9].toString());
			bean.setAvailquantity(Double.parseDouble(o[10].toString()));
			bean.setSize(o[14].toString());
			bean.setSupplierId(o[15].toString());
			bean.setBillNo(Long.parseLong(o[16].toString()));			
			Double d = 0d;
			bean.setReturnTotal(d);
			Long editQuan = 0l;
			bean.setEditQuantity(editQuan);
			System.out.println("***************" + o[0]);
			map.put(bean.getPkGoodRecId(), bean);
		}
		return map;
	}*/
	
	
	public PurchaseReturnGetItems getTotalItemByBillNo(String billNo, String supplierId)
	{
		// TODO Auto-generated method stub
		{
			Map<Long, PurchaseReturnGetItems> map = new HashMap<Long, PurchaseReturnGetItems>();

			SupplierDetailDao dao = new SupplierDetailDao();
			List<PurchaseReturnGetItems> catList = dao.getTotalItemByBillNo(billNo, supplierId);

			PurchaseReturnGetItems cs = null;
			if (catList != null && catList.size() > 0)
			{
				cs = (PurchaseReturnGetItems) catList.get(0);
			}
			return cs;
		}
	}
	
	public Map getTotalItemByVoucherNoForEditGRHelper(String voucherNo, String shopId)
	{
		// TODO Auto-generated method stub		
			System.out.println("====HELPER====");
			long k = 0l;
			Double grossTotal = 0.0;
			Double totalTaxAmt = 0.0;
			DecimalFormat df = new DecimalFormat("#.##");
			//Map<Long, PurchaseReturnGetItems> map = new HashMap<Long, PurchaseReturnGetItems>();
			
			SupplierDetailDao dao = new SupplierDetailDao();
			List productList = dao.getTotalItemByVoucherNoForEditGRDao(voucherNo, shopId);
			Map map = new HashMap();
			PurchaseReturnGetItems cs = null;
			
			for (int i = 0; i < productList.size(); i++)
			{
				k++;
				Object[] o = (Object[]) productList.get(i);
				EditPurchase bean = new EditPurchase();
				bean.setPkGoodRecId(Long.parseLong(o[0].toString()));
				bean.setCatName(o[1].toString());
				bean.setItemName(o[2].toString());
				bean.setQuantity(Double.parseDouble(o[3].toString()));
				bean.setOriQuantity(o[3].toString());
				bean.setBuyPrice(Double.parseDouble(o[4].toString()));
				bean.setFinalBuyPrice(o[4].toString());
				bean.setVat(Double.parseDouble(o[5].toString()));
				bean.setIgst(Double.parseDouble(o[11].toString()));
				bean.setFinalVat(Double.parseDouble(o[5].toString()));
				bean.setFinalIgst(Double.parseDouble(o[11].toString()));
				bean.setDiscount(Double.parseDouble(o[12].toString()));
				bean.setFinalDisPer(o[12].toString());
				bean.setRollsize(Double.parseDouble(o[13].toString()));
				bean.setTotal(Double.parseDouble(o[6].toString()));
				bean.setContactPerson(o[7].toString());
				bean.setBarcodeNo(Long.parseLong(o[8].toString()));
				bean.setOndate(o[9].toString());
				bean.setAvailquantity(Double.parseDouble(o[10].toString()));
				bean.setSize(o[14].toString());
				bean.setSupplierId(o[15].toString());
				bean.setBillNo(o[16].toString());
				bean.setSupplierName2(o[17].toString());
				bean.setGrossTotal(Double.parseDouble(o[18].toString()));
				Double d = 0d;
				bean.setReturnTotal(d);
				Long editQuan = 0l;
				bean.setEditQuantity(editQuan);
				bean.setTotalQuantity(k);
				grossTotal = grossTotal + Double.parseDouble(o[6].toString());
				bean.setFinalGrossTotal(o[18].toString());
				bean.setSubcatName(o[19].toString());
				bean.setHsnSac(o[20].toString());
				bean.setColor(o[21].toString());
				bean.setStyle(o[22].toString());
				if(o[23] == null)
				{
					bean.setPurchaseCode("");
				}
				else
				{
					bean.setPurchaseCode(o[23].toString());
				}
				bean.setContactPerson(o[24].toString());
				bean.setTaxAmount(o[25].toString());
				bean.setReturnedQty(o[26].toString());
				int rQtyInInt = (int)(Double.parseDouble(o[26].toString()));
				bean.setReturnedQty(String.valueOf(rQtyInInt));
				bean.setSalePrice(Double.parseDouble(o[27].toString()));
				bean.setFinalSalePrice(o[27].toString());
				bean.setPkSuppId(o[28].toString());
				bean.setProductId(o[29].toString());
				bean.setSubCatId(o[30].toString());
				bean.setCatId(o[31].toString());
				bean.setSuppCode(o[32].toString());
				bean.setSoldQty(o[33].toString());
				bean.setPendingBillPayment(o[34].toString());
				bean.setBarQtyTotalPuchaseQty(o[35].toString());
				bean.setFkShopId(Long.parseLong(o[36].toString()));
				
				System.out.println("BarQtyTotalPuchaseQty ====> "+bean.getBarQtyTotalPuchaseQty());
				System.out.println("grossTotal =====> "+grossTotal);
				System.out.println("***************" + o[0]);
				map.put(bean.getPkGoodRecId(), bean);	
			/*if (catList != null && catList.size() > 0)
			{
				cs = (PurchaseReturnGetItems) catList.get(0);
			}
			
			System.out.println("TOTAL ITEMLIST Helper "+catList.size());
			
			return cs;*/
		}
			
			return map;
	}
	
	public Map getItemsGridAndNonGridGoodReceiveDetailsByVoucherNo(String voucherNo, String shopId)
	{
		// TODO Auto-generated method stub		
			System.out.println("====HELPER====");
			long k = 0l;
			Double grossTotal = 0.0;
			Double totalTaxAmt = 0.0;
			DecimalFormat df = new DecimalFormat("#.##");
			//Map<Long, PurchaseReturnGetItems> map = new HashMap<Long, PurchaseReturnGetItems>();
			
			SupplierDetailDao dao = new SupplierDetailDao();
			List productList = dao.getTotalItemByVoucherNoForEditGRDao(voucherNo, shopId);
			Map map = new HashMap();
			PurchaseReturnGetItems cs = null;
			
			for (int i = 0; i < productList.size(); i++)
			{
				k++;
				Object[] o = (Object[]) productList.get(i);
				
				EditPurchase bean = new EditPurchase();
				
				bean.setPkGoodRecId(Long.parseLong(o[0].toString()));
				bean.setCatName(o[1].toString());
				bean.setItemName(o[2].toString());
				bean.setQuantity(Double.parseDouble(o[3].toString()));
				bean.setOriQuantity(o[3].toString());
				bean.setBuyPrice(Double.parseDouble(o[4].toString()));
				bean.setFinalBuyPrice(o[4].toString());
				bean.setVat(Double.parseDouble(o[5].toString()));
				bean.setIgst(Double.parseDouble(o[11].toString()));
				bean.setFinalVat(Double.parseDouble(o[5].toString()));
				bean.setFinalIgst(Double.parseDouble(o[11].toString()));
				bean.setDiscount(Double.parseDouble(o[12].toString()));
				bean.setFinalDisPer(o[12].toString());
				bean.setRollsize(Double.parseDouble(o[13].toString()));
				bean.setTotal(Double.parseDouble(o[6].toString()));
				bean.setContactPerson(o[7].toString());
				bean.setBarcodeNo(Long.parseLong(o[8].toString()));
				bean.setOndate(o[9].toString());
				bean.setAvailquantity(Double.parseDouble(o[10].toString()));
				bean.setSize(o[14].toString());
				bean.setSupplierId(o[15].toString());
				bean.setBillNo(o[16].toString());
				bean.setSupplierName2(o[17].toString());
				bean.setGrossTotal(Double.parseDouble(o[18].toString()));
				Double d = 0d;
				bean.setReturnTotal(d);
				Long editQuan = 0l;
				bean.setEditQuantity(editQuan);
				bean.setTotalQuantity(k);
				grossTotal = grossTotal + Double.parseDouble(o[6].toString());
				bean.setFinalGrossTotal(o[18].toString());
				bean.setSubcatName(o[19].toString());
				bean.setHsnSac(o[20].toString());
				bean.setColor(o[21].toString());
				bean.setStyle(o[22].toString());
				if(o[23] == null)
				{
					bean.setPurchaseCode("");
				}
				else
				{
					bean.setPurchaseCode(o[23].toString());
				}
				bean.setContactPerson(o[24].toString());
				bean.setTaxAmount(o[25].toString());
				bean.setReturnedQty(o[26].toString());
				int rQtyInInt = (int)(Double.parseDouble(o[26].toString()));
				bean.setReturnedQty(String.valueOf(rQtyInInt));
				bean.setSalePrice(Double.parseDouble(o[27].toString()));
				bean.setFinalSalePrice(o[27].toString());
				bean.setPkSuppId(o[28].toString());
				bean.setProductId(o[29].toString());
				bean.setSubCatId(o[30].toString());
				bean.setCatId(o[31].toString());
				bean.setSuppCode(o[32].toString());
				bean.setSoldQty(o[33].toString());
				bean.setPendingBillPayment(o[34].toString());
				bean.setBarQtyTotalPuchaseQty(o[35].toString());
				bean.setFkShopId(Long.parseLong(o[36].toString()));
				
				System.out.println("BarQtyTotalPuchaseQty ====> "+bean.getBarQtyTotalPuchaseQty());
				System.out.println("grossTotal =====> "+grossTotal);
				System.out.println("***************" + o[0]);
				map.put(bean.getPkGoodRecId(), bean);	
			/*if (catList != null && catList.size() > 0)
			{
				cs = (PurchaseReturnGetItems) catList.get(0);
			}
			
			System.out.println("TOTAL ITEMLIST Helper "+catList.size());
			
			return cs;*/
		}
			
			return map;
	}
	
	public Map getCurrentNewSupplierPendingAmountHelper(String newSupplierId)
	{
		System.out.println("IN HELPER getCurrentNewSupplierPendingAmountHelper");
		SupplierDetailDao sdo = new SupplierDetailDao();
		
		
		System.out.println("into helper class");
		SupplierDetailDao dao = new SupplierDetailDao();
		List catList = dao.getCurrentNewSupplierPendingAmountDao(newSupplierId);

		Map map = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);

			SupplierEditBean bean = new SupplierEditBean();

			bean.setPkSuppId(o[1].toString());
			bean.setPendingSuppBalance(o[2].toString());
			map.put(bean.getPkSuppId(), bean);
	}
	
	
	return map;
	}
	
	
	
	public void deleteSupplier(HttpServletRequest request, HttpServletResponse response)
	{
		String supplier = request.getParameter("supplier");
		SupplierDetailDao sdd = new SupplierDetailDao();
		sdd.deleteSupplier(supplier);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
