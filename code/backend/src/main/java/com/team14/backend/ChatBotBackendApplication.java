package com.team14.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.team14.backend.bot.ChatBotFactory;

@SpringBootApplication
public class ChatBotBackendApplication {

	public static void main(String[] args) {
		ChatBotFactory.startUp();
		SpringApplication.run(ChatBotBackendApplication.class, args);
	}
}
