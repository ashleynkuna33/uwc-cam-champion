package com.cam_champion.demo;

import java.net.InetAddress;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
    public void printAppUrl() throws Exception {
        String ip = InetAddress.getLocalHost().getHostAddress();
        System.out.println("\n----------------------------------------------------------");
        System.out.println("  Application is running!");
        System.out.println("  Local:   http://localhost:8080/");
        System.out.println("  External: http://" + ip + ":8080/");
        System.out.println("----------------------------------------------------------\n");
    }

}
