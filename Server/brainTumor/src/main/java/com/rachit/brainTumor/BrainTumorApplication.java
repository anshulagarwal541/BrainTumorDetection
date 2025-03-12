package com.rachit.brainTumor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BrainTumorApplication {

	public static void main(String[] args) {
		try{
			SpringApplication.run(BrainTumorApplication.class, args);
			System.out.println("********************");
			System.out.println("Successfully connected to the port..");
			System.out.println("********************");
		}catch(Exception e){
			System.out.println("**********************");
			System.out.println("Error Occured : "+e);
			System.out.println("**********************");
		}
	}

}
