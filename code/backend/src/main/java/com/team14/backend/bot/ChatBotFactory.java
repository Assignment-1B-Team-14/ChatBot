package com.team14.backend.bot;

import java.io.File;
import java.io.IOException;

import org.alicebot.ab.Bot;
import org.alicebot.ab.Chat;
import org.alicebot.ab.MagicBooleans;
import org.springframework.core.io.ClassPathResource;

import com.team14.backend.ChatBotBackendApplication;

public class ChatBotFactory {
	private static ChatBotFactory me;
	private static final String botName = "super";
	private Bot bot;

	private ChatBotFactory() {
		try {
			init();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void startUp() {
		getInstance();
	}

	private static ChatBotFactory getInstance() {
		if (me != null)
			return me;
		me = new ChatBotFactory();
		return getInstance();
	}

	private String getResourcesPath() throws IOException {
		File folder;
		if (ChatBotBackendApplication.path == null) {
			folder = new ClassPathResource("bots").getFile().getParentFile();
		} else {
			folder = new File(ChatBotBackendApplication.path).getParentFile();
		}
		return folder.toURI().getPath();
	}

	private void init() throws IOException {
		String resourcesPath = getResourcesPath();
		System.out.println(resourcesPath);
		MagicBooleans.trace_mode = false;
		bot = new Bot(botName, resourcesPath);
		bot.writeAIMLFiles();
		bot.brain.nodeStats();
	}

	public static Chat getChat() {
		Chat chatSession = new Chat(getInstance().bot);
		return chatSession;
	}
}
