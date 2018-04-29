package com.team14.backend.bot;

import java.io.File;

import org.alicebot.ab.Bot;
import org.alicebot.ab.Chat;
import org.alicebot.ab.MagicBooleans;

public class ChatBotFactory {
	private static ChatBotFactory me;
	private static final String botName = "super";
	private Bot bot;

	private ChatBotFactory() {
		init();
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

	private static String getResourcesPath() {
		File currDir = new File(".");
		String path = currDir.getAbsolutePath();
		path = path.substring(0, path.length() - 2);
		System.out.println(path);
		String resourcesPath = path + File.separator + "src" + File.separator + "main" + File.separator + "resources";
		return resourcesPath;
	}

	private void init() {
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
