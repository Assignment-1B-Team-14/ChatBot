package com.team14.backend.model;

import java.util.ArrayList;

import org.alicebot.ab.Chat;

import com.team14.backend.bot.ChatBotFactory;

public class AIChat {
	public AIChat() {
		chatSession = ChatBotFactory.getChat();
		messages = new ArrayList<>();
	}

	private Chat chatSession;
	private ArrayList<Message> messages;

	public ArrayList<Message> getMessages() {
		return messages;
	}

	public void setMessages(ArrayList<Message> messages) {
		this.messages = messages;
	}

	@Override
	public String toString() {
		return "AIChat [" + (messages != null ? "messages=" + messages : "") + "]";
	}

	public void newMessage(String string) {
		String ret = chatSession.multisentenceRespond(string);
		messages.add(new Message(string, ret));
	}
}
