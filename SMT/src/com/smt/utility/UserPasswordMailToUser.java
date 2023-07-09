package com.smt.utility;

import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.smt.bean.ClientDetails;

public class UserPasswordMailToUser
{
	public void sendMailToUser(String emailId, String password, String username)
	{	
		final String user = "embelmessanger@gmail.com";// change accordingly
		final String pass = "embel@456";
		System.out.println("MAIL TO ===> "+emailId);
		// 1st step) Get the session object
		Properties props = new Properties();
		props.setProperty("mail.transport.protocol", "smtp");
	
		props.setProperty("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "465");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.debug", "true");
		props.put("mail.smtp.socketFactory.fallback", "false");
		props.setProperty("mail.smtp.quitwait", "false");
		
		Session session = Session.getInstance(props, new javax.mail.Authenticator()
		{			
			protected PasswordAuthentication getPasswordAuthentication()
			{
				return new PasswordAuthentication(user, pass);
			}		
		}		
	);
		// 2nd step)compose message
		try
		{				
			MimeMessage message = new MimeMessage(session); 
			message.setFrom(new InternetAddress(user)); 
			message.addRecipient(Message.RecipientType.TO,new InternetAddress(emailId)); 
			message.setSubject("Password of User "+username); 
			
			//3) create MimeBodyPart object and set your message content 
			MimeBodyPart messageBodyPart1 = new MimeBodyPart(); 
			messageBodyPart1.setContent("<h1>Password of User "+username+"\nPassword : "+password+"</h1>","text/html"); 
			//art1.setText("<h1>This is message body ki hall ne rajeev veere<br>theek thaak ho</h1>"); 
			
			//4) create new MimeBodyPart object and set DataHandler object to this object 
/*			
			MimeBodyPart messageBodyPart2 = new MimeBodyPart();			  
			String filename1 = "E:\\databackup\\advanceBooking.xlsx";//change accordingly //DataSource
			DataSource source1 = new FileDataSource(filename1);
			messageBodyPart2.setDataHandler(new DataHandler(source1));
			messageBodyPart2.setFileName(filename1);
*/			 			
			
			//5) create Multipart object and add MimeBodyPart objects to this object 
			Multipart multipart = new MimeMultipart(); 
			multipart.addBodyPart(messageBodyPart1); 
			
			//6) set the multiplart object to the message object 
			message.setContent(multipart); 
			
			//7) send message 
			Transport.send(message); 
			
			System.out.println("Mailer....Done");			
		}
		catch (MessagingException e)
		{
			throw new RuntimeException(e);
		}	
	}
}
