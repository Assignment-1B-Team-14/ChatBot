package com.team14.backend.rest;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team14.backend.model.AIChat;

@RestController
public class ChatControler {
	@RequestMapping(value = "/tools/sessionid", method = RequestMethod.GET, produces = "application/json")
	public String getSession(HttpSession session) {
		return session.getId();
	}

	private static HashMap<String, AIChat> chats = new HashMap<>();

	private static boolean chatExists(String sessionId) {
		return chats.containsKey(sessionId);
	}

	@RequestMapping(value = "/chat", method = RequestMethod.PUT, produces = "application/json")
	public static void createChat(HttpSession session) {
		chats.put(session.getId(), new AIChat());
	}

	@RequestMapping(value = "/chat", method = RequestMethod.GET, produces = "application/json")
	public static AIChat getMessages(HttpSession session, @RequestParam("message") String message) {
		if (!chatExists(session.getId()) && (message != null))
			return null;
		chats.get(session.getId()).newMessage(message);
		return chats.get(session.getId());
	}
}
