package com.smt.dao;

import java.math.BigInteger;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jfree.util.Log;
import com.smt.bean.CategoryDetails;
import com.smt.bean.GetEmployeeDetails;
import com.smt.bean.GetSupplierDetails;
import com.smt.bean.allTransactionId;
import com.smt.bean.userDetaile;
import com.smt.hibernate.EmpAttendenceBean;
import com.smt.hibernate.EmployeeDetailsBean;
import com.smt.hibernate.UserDetail;
import com.smt.utility.HibernateUtility;

public class EmployeeDetailsDao {

	public void valEmployeeDetails(EmployeeDetailsBean ed1) 
	{
		System.out.println("In DAO");

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("got session ");
			transaction = session.beginTransaction();

			System.out.println("Tx started");

			session.save(ed1);
			transaction.commit();
			System.out.println("Successful");
		}

		catch (RuntimeException e) {
			try {
				transaction.rollback();
			} catch (RuntimeException rbe) {
				Log.error("Couldn't roll back tranaction", rbe);
			}
		} finally {
			hbu.closeSession(session);
		}
	}

	
	
	public void EmpAttendence(EmpAttendenceBean eb) 
	{
		System.out.println("In DAO");

		HibernateUtility hbu = null;
		Session session = null;
		Transaction transaction = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			System.out.println("got session ");
			transaction = session.beginTransaction();

			System.out.println("Tx started");

			session.save(eb);
			transaction.commit();
			System.out.println("Successful");
		}

		catch (RuntimeException e) {
			try {
				transaction.rollback();
			} catch (RuntimeException rbe) {
				Log.error("Couldn't roll back tranaction", rbe);
			}
		} finally {
			hbu.closeSession(session);
		}
	}
	
	
	public List getAllMainEmployeeShopWise(HttpServletRequest request, HttpServletResponse response)
	{
		HttpSession session1 = request.getSession();
		String shopId = (String) session1.getAttribute("shopId");
		
		HibernateUtility hbu = null;
		Session session = null;		
		List<EmployeeDetailsBean> empList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createQuery("from EmployeeDetailsBean");
			Query query = session.createSQLQuery("SELECT pk_empoyee_id, first_name, middle_name, last_name FROM employee_details WHERE fkShopId = "+shopId+" AND ISNULL(resignDate);");
			List<Object[]> list = query.list();
			empList = new ArrayList<EmployeeDetailsBean>();
			for(Object[] object : list)
			{
				EmployeeDetailsBean empDetails = new EmployeeDetailsBean();
				empDetails.setEmpId(Long.parseLong(object[0].toString()));
				empDetails.setFirstName(object[1].toString());
				
				empDetails.setLastName(object[3].toString());
				System.out.println(empDetails.getEmpId()+" "+empDetails.getFirstName()+" "+empDetails.getMiddleName()+" "+empDetails.getLastName());
				empList.add(empDetails);
			}
		} catch (Exception e) {
			Log.error("Error in getAllMainEmployee", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return empList;
	}
	
	public List getAllMainEmployee()
	{
		HibernateUtility hbu = null;
		Session session = null;		
		List<EmployeeDetailsBean> empList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createQuery("from EmployeeDetailsBean");
			Query query = session.createSQLQuery("SELECT pk_empoyee_id, first_name, middle_name, last_name FROM employee_details WHERE ISNULL(resignDate);");
			List<Object[]> list = query.list();
			empList = new ArrayList<EmployeeDetailsBean>();
			for(Object[] object : list)
			{
				EmployeeDetailsBean empDetails = new EmployeeDetailsBean();
				empDetails.setEmpId(Long.parseLong(object[0].toString()));
				empDetails.setFirstName(object[1].toString());
				empDetails.setMiddleName(object[2].toString());
				empDetails.setLastName(object[3].toString());
				System.out.println(empDetails.getEmpId()+" "+empDetails.getFirstName()+" "+empDetails.getMiddleName()+" "+empDetails.getLastName());
				empList.add(empDetails);
			}
		} catch (Exception e) {
			Log.error("Error in getAllMainEmployee", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return empList;
	}
	
	public List getAllMainEmployeeForEmpReport()
	{
		HibernateUtility hbu = null;
		Session session = null;		
		List<EmployeeDetailsBean> empList = null;
		try
		{
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			//Query query = session.createQuery("from EmployeeDetailsBean");
			Query query = session.createSQLQuery("SELECT pk_empoyee_id, first_name, middle_name, last_name FROM employee_details;");
			List<Object[]> list = query.list();
			empList = new ArrayList<EmployeeDetailsBean>();
			for(Object[] object : list)
			{
				EmployeeDetailsBean empDetails = new EmployeeDetailsBean();
				empDetails.setEmpId(Long.parseLong(object[0].toString()));
				empDetails.setFirstName(object[1].toString());
				empDetails.setLastName(object[3].toString());
				System.out.println(empDetails.getEmpId()+" "+empDetails.getFirstName()+" "+empDetails.getMiddleName()+" "+empDetails.getLastName());
				empList.add(empDetails);
			}
		} catch (Exception e) {
			Log.error("Error in getAllMainEmployee", e);
		} finally {
			if (session != null) {
				hbu.closeSession(session);
			}
		}
		return empList;
	}

	public List getAllEmployeeDetailsForEdit(Long empId) {

		System.out.println("into dao employee : " + empId);
		HibernateUtility hbu = null;
		Session session = null;
		Query query = null;
		List list = null;
		try {
			hbu = HibernateUtility.getInstance();
			session = hbu.getHibernateSession();
			query = session.createSQLQuery("SELECT first_name, middle_name, last_name, joining_date, email_id, salary, contact_no, address, pin_code FROM employee_details WHERE pk_empoyee_id =" + empId);
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

	/*
	 * public List getEmployeeList() { HibernateUtility hbu = null; Session session
	 * = null; List<GetEmployeeDetails> empList = null; try {
	 * 
	 * hbu = HibernateUtility.getInstance(); session = hbu.getHibernateSession();
	 * 
	 * Query query = session.
	 * createSQLQuery("SELECT first_name, middle_name, last_name, joining_date, email_id, salary, contact_no, address, pin_code, resignDate FROM employee_details;"
	 * ); List<Object[]> list = query.list();
	 * 
	 * empList = new ArrayList<GetEmployeeDetails>(0);
	 * 
	 * for (Object[] object : list) { GetEmployeeDetails reports = new
	 * GetEmployeeDetails();
	 * 
	 * reports.setFirstName(object[0].toString());
	 * reports.setMiddleName(object[1].toString());
	 * reports.setLastName(object[2].toString()); reports.setJoiningDate((Date)
	 * object[3]); reports.setEmail(object[4].toString());
	 * reports.setSalary(Double.parseDouble(object[5].toString()));
	 * reports.setContactNo((BigInteger) object[6]);
	 * reports.setAddresst(object[7].toString()); reports.setZipCode((BigInteger)
	 * object[8]); if(object[9] == null) { reports.setResignDateString("N/A"); }
	 * else { reports.setResignDateString(object[9].toString()); }
	 * empList.add(reports);
	 * 
	 * } } catch (RuntimeException e) {
	 * 
	 * } finally {
	 * 
	 * hbu.closeSession(session); } return empList; }
	 */
	
	// get All user type 
		public List getAllUserType() {

			HibernateUtility hbu = null;
			Session session = null;
			List<Object[]> list = null;
			List<userDetaile> bill = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = session.createSQLQuery("select pk_user_id, typeId from user_details GROUP BY typeId;");
				list = query.list();
				bill = new ArrayList<userDetaile>(0);
				for (Object[] object : list) {
					userDetaile reports = new userDetaile();
					reports.setPkUserId(Long.parseLong(object[0].toString()));
					reports.setTypeId(object[1].toString());
					bill.add(reports);

				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (session != null) {

					hbu.closeSession(session);
				}
			}

			return bill;

		}
		
		//get all user name as per user type
			
		public List getAllUserName(String uType) {
			// TODO Auto-generated method stub
			HibernateUtility hbu = null;
			Session session = null;
			List list = null;
			try {
				
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = session.createSQLQuery("select pk_user_id, userName from user_details where typeId='" + uType + "'");
				list = query.list();

			} catch (Exception e) {
				e.printStackTrace();
				// TODO: handle exception
			}

			finally {
				if (session != null) {
					hbu.closeSession(session);
				}
			}
			return list;
		}
		
		public List getEmpLastTransactionNo()
		{
			// TODO Auto-generated method stub
			HibernateUtility hbu = null;
			Session session = null;
			List<allTransactionId> saleList = null;
			List<allTransactionId> listTid = null;
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				Query query = session.createSQLQuery("SELECT ep.pk_employee_payment_id, ep.fk_employee_id FROM employee_payment ep ORDER BY ep.pk_employee_payment_id DESC LIMIT 1;");
				listTid = query.list();
				
				List<Object[]> list = query.list();
				listTid = new ArrayList<allTransactionId>(0);
				for (Object[] object : list) {
					System.out.println(Arrays.toString(object));
					allTransactionId reports = new allTransactionId();
					reports.setEmpTransactionId(Long.parseLong(object[0].toString()));
					System.out.println("selTransactionId =============> "+reports.getSaleReturnTransactoinId());
					listTid.add(reports);
				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (session != null) {
					session.close();
				}
			}
			return listTid;
		}	
		
		public List getEmployeeList1()
		{
			HibernateUtility hbu = null;
			Session session = null;
			List<GetEmployeeDetails> empList = null;
			try {

				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Query query = session.createSQLQuery("SELECT first_name, middle_name, last_name, joining_date, email_id, salary, contact_no, address, pin_code, resignDate,pk_empoyee_id FROM employee_details;");
				List<Object[]> list = query.list();

				empList = new ArrayList<GetEmployeeDetails>(0);

				for (Object[] object : list) {
					GetEmployeeDetails reports = new GetEmployeeDetails();

					reports.setFirstName(object[0].toString());
					reports.setMiddleName(object[1].toString());
					reports.setLastName(object[2].toString());
					reports.setJoiningDate((Date) object[3]);
					reports.setEmail(object[4].toString());
					reports.setSalary(Double.parseDouble(object[5].toString()));
					reports.setContactNo((BigInteger) object[6]);
					reports.setAddresst(object[7].toString());
					reports.setZipCode((BigInteger) object[8]);
					if(object[9] == null)
					{
						reports.setResignDateString("N/A");
					}
					else
					{
						reports.setResignDateString(object[9].toString());
					}
					reports.setEmpPkId(Long.parseLong(object[10].toString()));
					
					empList.add(reports);

				}
			} catch (RuntimeException e) {

			} finally {

				hbu.closeSession(session);
			}
			return empList;
		}
		
		
		public List getEmployeeList2(HttpServletRequest request, HttpServletResponse response)
		{
			
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			
			HibernateUtility hbu = null;
			Session session = null;
			List<EmpAttendenceBean> empList = null;
			try {

				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Query query = session.createSQLQuery("SELECT first_name, middle_name, last_name, joining_date, email_id, salary, contact_no, address, pin_code, resignDate,pk_empoyee_id,fkShopid FROM employee_details;");
				List<Object[]> list = query.list();

				empList = new ArrayList<EmpAttendenceBean>(0);

				for (Object[] object : list) {
					GetEmployeeDetails reports = new GetEmployeeDetails();

					
					reports.setFirstName(object[0].toString());
					reports.setMiddleName(object[1].toString());
					reports.setLastName(object[2].toString());
					reports.setJoiningDate((Date) object[3]);
					reports.setEmail(object[4].toString());
					reports.setSalary(Double.parseDouble(object[5].toString()));
					reports.setContactNo((BigInteger) object[6]);
					reports.setAddresst(object[7].toString());
					reports.setZipCode((BigInteger) object[8]);
					if(object[9] == null)
					{
						reports.setResignDateString("N/A");
					}
					else
					{
						reports.setResignDateString(object[9].toString());
					}
					reports.setEmpPkId(Long.parseLong(object[10].toString()));
					
					reports.setFkshopid(Long.parseLong(object[11].toString()));
					
					Long empid=reports.getEmpPkId();
					String fname=reports.getFirstName();
					String mname=reports.getMiddleName();
					String lname=reports.getLastName();
					Long fkshopid=reports.getFkshopid();
					
					//System.out.println(empid+fname+mname+lname);
					 DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
					 java.util.Date dateobj = new java.util.Date();
					
					 String datee = df.format(dateobj);
				
					
					 EmployeeDetailsDao dao= new EmployeeDetailsDao();
					 List list1 = dao.getattendance(empid, datee);
						Map map = new HashMap();
						int sic = list1.size();
			
						if (sic == 0)
						{
						EmpAttendenceBean eb=new EmpAttendenceBean();
						
						eb.setFirstName(fname);
						eb.setMiddleName(mname);
						eb.setLastName(lname);
						eb.setDate(dateobj);
						eb.setFkShopId(fkshopid);
						eb.setEmpId(empid);
						eb.setEmpAttendence("NA");
						
						EmployeeDetailsDao dao1= new EmployeeDetailsDao();
						
						dao1.EmpAttendence1(eb);
						
						}
				}
				
				DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
				 java.util.Date dateobj = new java.util.Date();
				 String datee = df.format(dateobj);
							
							HibernateUtility hbu1 = HibernateUtility.getInstance();
							Session session11 = hbu1.getHibernateSession();

							Query query1 = session11.createSQLQuery("SELECT first_name,middle_name,last_name ,fkempid,Attendence FROM employee_attendence WHERE date='"+datee+"' AND fkShopId='"+shopId+"'");

							
							List<Object[]> list11 = query1.list();
							
							for (Object[] objects : list11) {

								EmpAttendenceBean ea=new EmpAttendenceBean();
															
								ea.setEmpId(Long.parseLong((objects[3].toString())));
								ea.setFirstName(objects[0].toString());
								ea.setMiddleName(objects[1].toString());
								ea.setLastName(objects[2].toString());
								ea.setEmpAttendence(objects[4].toString());
								
								
								empList.add(ea);

							}
							
							
							//EmployeeDetailsDao dao2=new EmployeeDetailsDao();
							//dao2.getAllMainTableNo(fkshopid);
						
					
				
				
			} catch (RuntimeException e) {

			} finally {

				hbu.closeSession(session);
			}
			return empList;
		}

		
		public void EmpAttendence1(EmpAttendenceBean eb) 
		{
			System.out.println("In DAO");

			HibernateUtility hbu = null;
			Session session = null;
			Transaction transaction = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				System.out.println("got session ");
				transaction = session.beginTransaction();

				System.out.println("Tx started");

				session.save(eb);
				transaction.commit();
				System.out.println("Successful");
			}

			catch (RuntimeException e) {
				try {
					transaction.rollback();
				} catch (RuntimeException rbe) {
					Log.error("Couldn't roll back tranaction", rbe);
				}
			} finally {
				hbu.closeSession(session);
			}
		}
		
		public List getattendance(Long empid, String datee)
		{
			HibernateUtility hbu = null;
			Session session = null;
			List list = null;
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				 Query query = session.createQuery("from EmpAttendenceBean where  date='"+datee+"' and empId= '"+empid+"'");
				list = query.list();

			}
			catch (Exception e)
			{
				e.printStackTrace();
				// TODO: handle exception
			}

			finally {
				if (session != null) {
					hbu.closeSession(session);
				}
			}
			return list;
		}
		public List getEmpAttend(String shopId,String Empid)
		{
			System.out.println("fkshopIdTx - "+shopId+" , "+Empid);
			HibernateUtility hbu=null;
			Session session=null;
			List list=null;
			try{
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 Query query = session.createQuery("from EmployeeDetailsBean where fkShopId ='"+shopId+"' AND empId = '"+Empid+"'");
			 list = query.list();
			 System.out.println("fertilier query list size -  "+query.list().size());
			}
				catch(Exception e){	
					e.printStackTrace();
			}
				finally
				{
						if(session!=null){
						hbu.closeSession(session);
					}
				}
			
		return list;
		}
		
		public List getEmpAttend1(String shopId,String Empid,String date)
		{
			System.out.println("fkshopIdTx - "+shopId+" , "+Empid);
			HibernateUtility hbu=null;
			Session session=null;
			List list=null;
			try{
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
			 Query query = session.createQuery("from EmpAttendenceBean where fkShopId ='"+shopId+"' AND empId = '"+Empid+"' and date='"+date+"' ");
			 list = query.list();
			 System.out.println("fertilier query list size -  "+query.list().size());
			}
				catch(Exception e){	
					e.printStackTrace();
			}
				finally
				{
						if(session!=null){
						hbu.closeSession(session);
					}
				}
			
		return list;
		}
		
		public List getAllMainEmployeeShopWise1(HttpServletRequest request, HttpServletResponse response)
		{
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			
			HibernateUtility hbu = null;
			Session session = null;		
			List<EmployeeDetailsBean> empList = null;
			try
			{
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				//Query query = session.createQuery("from EmployeeDetailsBean");
				Query query = session.createSQLQuery("SELECT pk_empoyee_id, first_name, middle_name, last_name FROM employee_details WHERE fkShopId = "+shopId+" AND ISNULL(resignDate);");
				List<Object[]> list = query.list();
				empList = new ArrayList<EmployeeDetailsBean>();
				for(Object[] object : list)
				{
					EmployeeDetailsBean empDetails = new EmployeeDetailsBean();
					empDetails.setEmpId(Long.parseLong(object[0].toString()));
					empDetails.setFirstName(object[1].toString());
					empDetails.setMiddleName(object[2].toString());
					empDetails.setLastName(object[3].toString());
					System.out.println(empDetails.getEmpId()+" "+empDetails.getFirstName()+" "+empDetails.getMiddleName()+" "+empDetails.getLastName());
					empList.add(empDetails);
				}
			} catch (Exception e) {
				Log.error("Error in getAllMainEmployee", e);
			} finally {
				if (session != null) {
					hbu.closeSession(session);
				}
			}
			return empList;
		}
		
		public List gettodayemplist(HttpServletRequest request)
		{
			HttpSession session1 = request.getSession();
			String shopId = (String) session1.getAttribute("shopId");
			String pattern = "yyyy-MM-dd";
		  	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		  	String todayDate = simpleDateFormat.format(new java.util.Date());
		  	System.out.println(todayDate);
		  	
			System.out.println("` ` ` ` ````   date todayDate -   "+todayDate);
			
			HibernateUtility hbu = null;
			Session session = null;
			Query query = null;
			List<EmpAttendenceBean> empList = null;
			try {
				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();
				
				query = session.createSQLQuery("SELECT first_name,middle_name,last_name,date,Attendence from employee_attendence where fkShopId='"+shopId+"' and date='"+todayDate+"' group by fkempid");
				List<Object[]> list = query.list();
				 System.out.println("SIZE---------------::::  :"+list.size());
				 empList = new ArrayList<EmpAttendenceBean>(0);
					for(Object[] object : list)
					{
						EmpAttendenceBean eb=new EmpAttendenceBean();
						eb.setFirstName(object[0].toString());
						eb.setMiddleName(object[1].toString());
						eb.setLastName(object[2].toString());
						eb.setDate((Date)(object[3]));
						eb.setEmpAttendence(object[4].toString());
						empList.add(eb);	
					}
					
					
				 
			} catch (RuntimeException e) {
				Log.error("Error in getAllSupplier ", e);
			} finally {
				if (session != null) {
					hbu.closeSession(session);
				}
			}

			return empList;
		}
		public List getEmployeeList()
		{
			HibernateUtility hbu = null;
			Session session = null;
			List<GetEmployeeDetails> empList = null;
			try {

				hbu = HibernateUtility.getInstance();
				session = hbu.getHibernateSession();

				Query query = session.createSQLQuery("SELECT first_name, middle_name, last_name, joining_date, email_id, salary, contact_no, address, pin_code, resignDate FROM employee_details;");
				List<Object[]> list = query.list();

				empList = new ArrayList<GetEmployeeDetails>(0);

				for (Object[] object : list) {
					GetEmployeeDetails reports = new GetEmployeeDetails();

					reports.setFirstName(object[0].toString());
					reports.setMiddleName(object[1].toString());
					reports.setLastName(object[2].toString());
					reports.setJoiningDate((Date) object[3]);
					reports.setEmail(object[4].toString());
					reports.setSalary(Double.parseDouble(object[5].toString()));
					reports.setContactNo((BigInteger) object[6]);
					reports.setAddresst(object[7].toString());
					reports.setZipCode((BigInteger) object[8]);
					if(object[9] == null)
					{
						reports.setResignDateString("N/A");
					}
					else
					{
						reports.setResignDateString(object[9].toString());
					}
					empList.add(reports);

				}
			} catch (RuntimeException e) {

			} finally {

				hbu.closeSession(session);
			}
			return empList;
		}
		
		public List getAllMainTableNo(Long shopid)
		{
			
			
			HibernateUtility hbu=null;
			Session session=null;
			List list=null;
			try{
			 hbu = HibernateUtility.getInstance();
			 session = hbu.getHibernateSession();
//			 DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
			 DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			 java.util.Date dateobj = new java.util.Date();
			 System.out.println("df.format(dateobj) -   "+df.format(dateobj));
			 String datee = df.format(dateobj);
			 System.out.println("datee -   "+datee);
	
			 Query query = session.createQuery("from EmpAttendenceBean where  date='"+datee+"' and fkShopId= '"+shopid+"'");
			 list = query.list();
			 System.out.println(" list size in getting table no ----  "+list.size());
			}
			catch(Exception e){	
				e.printStackTrace();
		}
			finally
			{
					if(session!=null){
					hbu.closeSession(session);
				}
			}
			
		return list;
		
		}
}
