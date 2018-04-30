package com.team14.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.team14.backend.bot.ChatBotFactory;

@SpringBootApplication
public class ChatBotBackendApplication {
	public static String path;

	public static void main(String[] args) {
		new ChatBotBackendApplication().run(args);
	}

	public void run(String[] args) {
		path = System.getProperty("bot.path");
		System.out.println(path);
		ChatBotFactory.startUp();
		SpringApplication.run(ChatBotBackendApplication.class, args);

	}
}
