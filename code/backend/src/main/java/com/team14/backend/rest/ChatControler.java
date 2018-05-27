package com.team14.backend.rest;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team14.backend.db.DBMessageHandler;
import com.team14.backend.model.AIChat;
import com.team14.backend.model.DBMessage;
import com.team14.backend.model.ResponseWrapper;
import com.team14.backend.model.Returncodes;

@RestController
public class ChatControler {

	private static HashMap<String, AIChat> chats = new HashMap<>();

	private static boolean chatExists(String sessionId) {
		return chats.containsKey(sessionId);
	}

	@Autowired
	DBMessageHandler messages;

	@RequestMapping(value = "/createChat", method = RequestMethod.GET, produces = "application/json")
	public ResponseWrapper createChat(HttpSession session, HttpServletRequest request, HttpServletResponse resp) {
		AIChat chat = new AIChat();
		chat.setChatID(randomAlphaNumeric(64));
		chats.put(session.getId(), chat);
		resp.setHeader("Access-Control-Allow-Credentials", "true");
		resp.setHeader("Access-Control-Allow-Origin", "http://super-bot.pizza");
		return new ResponseWrapper(chats.get(session.getId()), Returncodes.OKAY);
	}

	private static final String ALPHA_NUMERIC_STRING = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	public static String randomAlphaNumeric(int count) {
		StringBuilder builder = new StringBuilder();
		while (count-- != 0) {
			int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
			builder.append(ALPHA_NUMERIC_STRING.charAt(character));
		}
		return builder.toString();
	}

	@RequestMapping(value = "/chat", method = RequestMethod.GET, produces = "application/json")
	public ResponseWrapper getMessages(HttpSession session, @RequestParam("message") String message,
			HttpServletRequest request, HttpServletResponse resp) {
		resp.setHeader("Access-Control-Allow-Credentials", "true");
		resp.setHeader("Access-Control-Allow-Origin", "http://super-bot.pizza");
		if (!chatExists(session.getId()) && (message != null))
			return new ResponseWrapper(Returncodes.CHAT_NOT_FOUND);
		chats.get(session.getId()).newMessage(message);
		AIChat tmp = chats.get(session.getId());
		DBMessage saveMe = new DBMessage();
		saveMe.setAnswer(tmp.getMessages().get(tmp.getMessages().size() - 1).getAnswer());
		saveMe.setQuestion(tmp.getMessages().get(tmp.getMessages().size() - 1).getQuestion());
		saveMe.setChatID(tmp.getChatID());
		saveMe.setSessionID(session.getId());
		saveMe.setIPAdress(request.getRemoteAddr());
		messages.save(saveMe);
		return new ResponseWrapper(chats.get(session.getId()), Returncodes.OKAY);
	}
}
