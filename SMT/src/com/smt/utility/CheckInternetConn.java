package com.smt.utility;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class CheckInternetConn
{
	static int checkI = 0;
	
	public static int checkInternet()
	{
		try
	      {
	         URL url = new URL("http://www.gmail.com");
	         URLConnection connection = url.openConnection();
	         connection.connect();
	         checkI++;
	         System.out.println("Internet is connected");
	      }
	      catch(MalformedURLException e)
	      {}
	      catch(IOException e)
	      {}		
		return checkI;
	}
}
