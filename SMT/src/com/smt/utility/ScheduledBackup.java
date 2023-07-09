package com.smt.utility;

import java.util.Timer;
import java.util.TimerTask;
import com.smt.helper.LogoutController;

public class ScheduledBackup
{	
	public static void backupOnTime()
	{		
		System.out.println("Success backupOnTime Method 0");
		final AllFilesToMail sendreports = new AllFilesToMail();
		final MyJob myjob = new MyJob();
		TimerTask task = new TimerTask()
		{
			/*LogoutController bb = new LogoutController();
			Date date = new Date();*/
			@Override
			public void run()
			{
				sendreports.sendTodayPurchaseReport();
				sendreports.sendTodayPurchaseReturnReport();
				sendreports.sendTodaySaleReport();	
				sendreports.sendTodaySaleReturnReport();
				LogoutController.main1();
				myjob.execute();
			}
		};

		Timer timer = new Timer();
		long delay = 0;
		long intevalPeriod = 6 * 3600 * 1000;//time interval for 1 hour
		//long intevalPeriod = 1 * 1000 * 20;//time interval for 20 second
		// schedules the task to be run in an interval
		/*long t2 = intevalPeriod/2;
		long t3 = t2/2;*/
		timer.scheduleAtFixedRate(task, delay, intevalPeriod);//data backup send after time interval for 1 hour
		
		//timer.scheduleAtFixedRate(task, delay, 5000);
		System.out.println("Success backupOnTime Method 1");
	}

	public static void main(String[] args)
	{
		System.out.println("Success Main Method 0");
		backupOnTime();
		System.out.println("Success Main Method 1");
	} // end of main
}
