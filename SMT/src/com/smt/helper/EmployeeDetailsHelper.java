package com.smt.helper;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
//import org.omg.PortableInterceptor.LOCATION_FORWARD;

import com.smt.bean.GetEmployeeDetails;
import com.smt.bean.userDetaile;
import com.smt.dao.CategoryDao;
import com.smt.dao.EmployeeDetailsDao;
import com.smt.dao.SaleReturnDao;
import com.smt.dao.StockDao;
import com.smt.dao.SupplierDetailDao;
import com.smt.hibernate.EmpAttendenceBean;
import com.smt.hibernate.EmployeeDetailsBean;
import com.smt.hibernate.OtherBill;
import com.smt.hibernate.Stock;
import com.smt.utility.HibernateUtility;

public class EmployeeDetailsHelper {
	Date newDate = null;

	public boolean employeeDetails(HttpServletRequest request, HttpServletResponse response)
	{
		System.out.println("EMPLOYEEDETAILS HELPER");
		
		String shopId = request.getParameter("shopId");

		String address = request.getParameter("address");

		String contactNo = request.getParameter("contactNo");

		String emailId = request.getParameter("emailId");

		String firstName = request.getParameter("firstName");

		String joiningDate = request.getParameter("joiningDate");

		String lastName = request.getParameter("lastName");

		String middleName = request.getParameter("middleName");

		String salary = request.getParameter("salary");

		String zipCode = request.getParameter("zipCode");
		String EmpidNo = request.getParameter("EmpidNo");
		String resignDate = request.getParameter("resignDate");
		
		
		EmployeeDetailsBean edb = new EmployeeDetailsBean();

		if (!"".equals(joiningDate))
		{
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date newDate = null;
			try {
				newDate = format.parse(joiningDate);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			edb.setJoiningDate(newDate);
		} else {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date adate = null;
			try {
				adate = format.parse("2016-09-20");
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			edb.setJoiningDate(adate);
		}

		if (!"".equals(contactNo)) {
			edb.setContactNo(Long.parseLong(contactNo));
		} else {
			edb.setContactNo(Long.parseLong("00"));
		}

		if (!"".equals(zipCode)) {
			edb.setZipCode(Long.parseLong(zipCode));

			
		} else {
			edb.setZipCode(Long.parseLong("00"));
			
		}

		if (!"".equals(emailId)) {
			edb.setEmailId(emailId);
		} else {
			edb.setEmailId("N/A");
		}

		if (!"".equals(salary)) {
			edb.setSalary(Double.parseDouble(salary));
		} else {
			edb.setSalary(Double.parseDouble("00"));
		}
		
		if (!"".equals(EmpidNo)) {
			edb.setEmpIdNo(EmpidNo);
		} else {
			edb.setEmpIdNo("00");
		}

		edb.setFirstName(firstName.trim());
		edb.setMiddleName(middleName.trim());
		edb.setLastName(lastName.trim());
		edb.setAddress(address);
		//edb.setResignDate(null);
		edb.setFkShopId(Long.parseLong(shopId));
		
		if (!"".equals(resignDate))
		{
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date newDate = null;
			try {
				newDate = format.parse(resignDate);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			edb.setResignDate(newDate);
		} else {
			/*SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			Date adate = null;
			try {
				adate = format.parse("2016-09-20");
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}*/
			//edb.setJoiningDate(adate);
			edb.setResignDate(null);
		}
		
		EmployeeDetailsDao edo = new EmployeeDetailsDao();
		edo.valEmployeeDetails(edb);

		return true;
	}

	public Map getEmployeeDetailsForEdit(Long empId)
	{
		System.out.println("into helper class");
		EmployeeDetailsDao dao1 = new EmployeeDetailsDao();
		List catList = dao1.getAllEmployeeDetailsForEdit(empId);

		Map map = new HashMap();
		for (int i = 0; i < catList.size(); i++) {
			Object[] o = (Object[]) catList.get(i);

			GetEmployeeDetails bean = new GetEmployeeDetails();

			bean.setFirstName(o[0].toString());
			bean.setMiddleName(o[1].toString());
			bean.setLastName(o[2].toString());
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			try {
				Date newDate = format.parse(o[3].toString());
				bean.setJoiningDate(newDate);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			;

			bean.setEmail(o[4].toString());
			bean.setSalary(Double.parseDouble(o[5].toString()));
			bean.setContactNo((BigInteger) o[6]);
			bean.setAddresst(o[7].toString());
			bean.setZipCode((BigInteger) o[8]);
			map.put(bean.getFirstName(), bean);
		}
		System.out.println("out of helper return map : " + map);
		return map;

	}

	public void editEmployeeDetail(HttpServletRequest request, HttpServletResponse response)
	{
		String EmployeeId = request.getParameter("EmployeeId");
		String firstName = request.getParameter("firstName");
		String middleName = request.getParameter("middleName");
		String lastName = request.getParameter("lastName");
		String joiningDate = request.getParameter("joiningDate");
		String emailId = request.getParameter("emailId");
		String salary = request.getParameter("salary");
		String contactNo = request.getParameter("contactNo");
		String address = request.getParameter("address");
		String zipCode = request.getParameter("zipCode");
		
		
		String oldJoiningDate = request.getParameter("oldJoiningDate");
		
		String resignDate = request.getParameter("resignDate");
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");		
		
		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;

		hbu = HibernateUtility.getInstance();
		session = hbu.getHibernateSession();
		transaction = session.beginTransaction();
		long EmployeeID = Long.parseLong(EmployeeId);
		EmployeeDetailsBean det = (EmployeeDetailsBean) session.get(EmployeeDetailsBean.class, EmployeeID);

		det.setAddress(address);
		det.setFirstName(firstName.trim());
		det.setLastName(lastName.trim());
		det.setMiddleName(middleName.trim());
		det.setContactNo(Long.parseLong(contactNo));
		if (emailId != "")
		{
			det.setEmailId(emailId);
		}
		else
		{
			det.setEmailId("N/A");
		}

		det.setSalary(Double.parseDouble(salary));
		
		if (zipCode != "")
		{
			
			det.setZipCode(Long.parseLong(zipCode));
		}
		else
		{
			det.setZipCode(Long.parseLong("0"));
		}
		

		if (!"".equals(joiningDate))
		{	
			Date newDate = null;
			try
			{
				newDate = format.parse(joiningDate);
			} catch (ParseException e1)
			{
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			det.setJoiningDate(newDate);
			System.out.println("Date in helper=  = =" + newDate);
		}
		
		if (!"".equals(resignDate))
		{
			Date newDate = null;
			try
			{
				newDate = format.parse(resignDate);
			}
			catch (ParseException e1)
			{
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			det.setResignDate(newDate);
			System.out.println("Date in helper=  = =" + newDate);
		}		

		session.saveOrUpdate(det);
		transaction.commit();

		System.out.println("Record updated successfully.");

	}
	// get All User Category
		public List getUserTypes() {

			EmployeeDetailsDao dao = new EmployeeDetailsDao();
			return dao.getAllUserType();

		}
		
	// get all user name on user type
		
		public Map getAllUserName(String uType) {
			// TODO Auto-generated method stub
			EmployeeDetailsDao dao = new EmployeeDetailsDao();
			List list = dao.getAllUserName(uType);
			Map map = new HashMap();
			
			for (int i = 0; i < list.size(); i++) {
				Object[] object = (Object[]) list.get(i);
				userDetaile bean = new userDetaile();
				System.out.println(Arrays.toString(object));

				/*String pendingBal = o[2].toString();
				if (pendingBal.equals("0")) {
					continue;

				} else {
					bean.setBillNo(o[0].toString());
				}
				// bean.setTotalAmount((Double)o[1]);
*/				
				bean.setPkUserId(Long.parseLong(object[0].toString()));
				bean.setUserName(object[1].toString());
				
				System.out.println("***************" + object[0]);
				map.put(bean.getPkUserId(), bean);

			}
			return map;
		}
		
		
		public void EmpAttendence(HttpServletRequest request, HttpServletResponse response) throws ParseException
		{
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			Long shopid=Long.parseLong(shopId);
			String Empid = request.getParameter("attendencesid");
			Long Empid1=Long.parseLong(Empid);
			String EmpAttend = request.getParameter("attendences");
			String first = request.getParameter("first");
			String second = request.getParameter("second");
			
			String thrid = request.getParameter("third");
			
			String Date = request.getParameter("date");
			Date date = new SimpleDateFormat("yyyy-MM-dd").parse(Date);
			System.out.println("date is"+date);
		
			Map<Long, EmployeeDetailsBean> map = new HashMap<Long, EmployeeDetailsBean>();

			EmpAttendenceBean eb= new EmpAttendenceBean();		
			
		
		
		EmployeeDetailsDao dao1 = new EmployeeDetailsDao();
		List stkList21  = dao1.getEmpAttend1(shopId,Empid,Date);
		
		if(stkList21.size()==0) {
			eb.setEmpId(Long.parseLong(Empid));	
			eb.setFirstName(first);
			eb.setMiddleName(second);
			eb.setLastName(thrid);
			eb.setEmpAttendence(EmpAttend);
			eb.setFkShopId(Long.parseLong(shopId));
			eb.setDate(date);
			System.out.println("Empolyeeid--"+Empid+"--first--"+first+"--middle--"+second+"--last--"+thrid+"--date--"+newDate+"--attendencetype--"+EmpAttend+"--fkshpid--"+shopId);
			
			EmployeeDetailsDao edo = new EmployeeDetailsDao();
			edo.EmpAttendence(eb);
			
		}
		
		else {
			
		
		for(int i=0;i<stkList21.size();i++)
		{
			EmpAttendenceBean bean1=(EmpAttendenceBean) stkList21.get(i);
			Date date11=bean1.getDate();
			Long fkempid=bean1.getEmpId();
			Long fkshop=bean1.getFkShopId();	
		
			String pattern = "yyyy-MM-dd";
			DateFormat df = new SimpleDateFormat(pattern);
			String todayAsString = df.format(date11);
			System.out.println("database date"+todayAsString);
			System.out.println("Sting date"+Date);
		if(todayAsString.equals(Date) && fkempid.equals(Empid1) && fkshop.equals(shopid) )
		{
			System.out.println("inside if of for loop");
			HibernateUtility hbu = null;
			Session session = null;
			Transaction transaction = null;

			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			transaction = session.beginTransaction();
			long EmployeeID = Long.parseLong(Empid);
			

			
			Query query = session.createSQLQuery("UPDATE employee_attendence SET Attendence = '"+EmpAttend+"' WHERE date='"+Date+"' AND fkempid="+Empid+" and fkShopId="+shopId);
			query.executeUpdate();
			transaction.commit();

			System.out.println("Record updated successfully.");
			break;
		}
	
		}
		}
		
		}
		
		
		public void updateEmpAttendence(HttpServletRequest request, HttpServletResponse response) throws ParseException
		{
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			Long shopId1=Long.parseLong(shopId);
			String Empid = request.getParameter("EmployeeId");
			System.out.println("empid======="+Empid);
			String first = request.getParameter("firstname");
			String middle = request.getParameter("middlename");
			String last = request.getParameter("lastname");
			
			Long Empid1=Long.parseLong(Empid);
			String EmpAttend = request.getParameter("type");
		   
			String date = request.getParameter("date");
			
			Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
					System.out.println("date is"+date1);
					
					
					SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
					
					String adate = null;
					try {
						
						Date date12 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
					    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
					     adate = formatter.format(date1);  
					    System.out.println("Date Format with MM/dd/yyyy : "+adate);  
						
						
						
						System.out.println("Date for other bill Sale report "+adate);
					} catch (ParseException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				
					SimpleDateFormat formatter2=new SimpleDateFormat("yyyy-MM-dd");
					
					Date date21=formatter2.parse(adate); 
					String strDate = formatter2.format(date21);
					
					System.out.println("========================"+date21);
					
			Map<Long, EmployeeDetailsBean> map = new HashMap<Long, EmployeeDetailsBean>();

			EmpAttendenceBean eb= new EmpAttendenceBean();		
				EmployeeDetailsDao dao1 = new EmployeeDetailsDao();
				List stkList21  = dao1.getEmpAttend1(shopId,Empid,date);
				
				if(stkList21.size()==0) {
					eb.setEmpId(Long.parseLong(Empid));	
					eb.setFirstName(first);
					eb.setMiddleName(middle);
					eb.setLastName(last);
					eb.setEmpAttendence(EmpAttend);
					eb.setFkShopId(Long.parseLong(shopId));
					eb.setDate(date1);
					System.out.println("Empolyeeid--"+Empid+"--first--"+first+"--middle--"+middle+"--last--"+last+"--date--"+newDate+"--attendencetype--"+EmpAttend+"--fkshpid--"+shopId);
					
					EmployeeDetailsDao edo = new EmployeeDetailsDao();
					edo.EmpAttendence(eb);
					
				}
				
				else {
					
				
				for(int i=0;i<stkList21.size();i++)
				{
					EmpAttendenceBean bean1=(EmpAttendenceBean) stkList21.get(i);
					Date date11=bean1.getDate();
					Long fkempid=bean1.getEmpId();
					Long fkshop=bean1.getFkShopId();	
				
					String pattern = "yyyy-MM-dd";
					DateFormat df = new SimpleDateFormat(pattern);
					String todayAsString = df.format(date11);
					System.out.println("database date"+todayAsString);
					System.out.println("Sting date"+adate);
				if(todayAsString.equals(adate) && fkempid.equals(Empid1) && fkshop.equals(shopId1) )
				{
					System.out.println("inside if of for loop");
					HibernateUtility hbu = null;
					Session session = null;
					Transaction transaction = null;

					hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					transaction = session.beginTransaction();
					long EmployeeID = Long.parseLong(Empid);
					

					
					Query query = session.createSQLQuery("UPDATE employee_attendence SET Attendence = '"+EmpAttend+"' WHERE date='"+adate+"' AND fkempid="+Empid+" and fkShopId="+shopId);
					query.executeUpdate();
					transaction.commit();

					System.out.println("Record updated successfully.");
					break;
				}
			
				}
				}
		
			}
	
		
		public List getAllMainTableNo(HttpServletRequest request, HttpServletResponse response)throws IOException
		{
			PrintWriter out = response.getWriter();
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			Long shopid=Long.parseLong(shopId);
		
			EmployeeDetailsDao dao1 = new EmployeeDetailsDao();
			System.out.println("in temp helper -- ");
			return dao1.getAllMainTableNo(shopid);
		} 
		
		}

