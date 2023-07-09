package com.smt.bean;

public class ClientDetails
{
	static String email = "";
	static String shopName = "";
	static String embelEmail = "";
	static String embelEmailPassword = "";

	public static String getEmail()
	{
		email = "cr7rohanchhajed7@gmail.com";
		//email = "embelbackup@gmail.com";
		//email = "pehenavabaramati@gmail.com";
		//email = "cr7rohanchhajed7@gmail.com";
		//email = "embel12@mailinator.com";
		//email = "embelbackup@gmail.com";
		//email = "vivekghantalwar@gmail.com";
		return email;
	}	
	public static String getShopName()
	{
		shopName = "GHANTALWAR MENS WEAR";
		//shopName = "PEHENAVA";
		//shopName = "STYLE ME";
		return shopName;
	}	
	
	public static String getEmbelEmail()
	{
		embelEmail = "embelmessanger@gmail.com";
		//embelEmail = "embelbackup@gmail.com";
		return embelEmail;
	}	
	
	public static String getEmbelEmailPassword()
	{
		//embelEmailPassword = "Embel@123";
		embelEmailPassword = "Embel@456";
		return embelEmailPassword;
	}
}