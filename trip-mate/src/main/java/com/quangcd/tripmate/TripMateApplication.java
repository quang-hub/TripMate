package com.quangcd.tripmate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class TripMateApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(TripMateApplication.class, args);
    }

}
