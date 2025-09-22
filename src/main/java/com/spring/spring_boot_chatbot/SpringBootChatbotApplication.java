package com.spring.spring_boot_chatbot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {
        org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration.class,
        org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration.class
})
public class SpringBootChatbotApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootChatbotApplication.class, args);
	}

}
