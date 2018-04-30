package com.team14.backend.rest;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team14.backend.model.AIChat;
import com.team14.backend.model.ResponseWrapper;
import com.team14.backend.model.Returncodes;

@RestController
public class ChatControler {

	private static HashMap<String, AIChat> chats = new HashMap<>();

	private static boolean chatExists(String sessionId) {
		return chats.containsKey(sessionId);
	}

	@RequestMapping(value = "/chat", method = RequestMethod.PUT, produces = "application/json")
	public static ResponseWrapper createChat(HttpSession session) {
		chats.put(session.getId(), new AIChat());
		return new ResponseWrapper(chats.get(session.getId()), Returncodes.OKAY);
	}

	@RequestMapping(value = "/chat", method = RequestMethod.GET, produces = "application/json")
	public static ResponseWrapper getMessages(HttpSession session, @RequestParam("message") String message) {
		if (!chatExists(session.getId()) && (message != null))
			return new ResponseWrapper(Returncodes.CHAT_NOT_FOUND);
		chats.get(session.getId()).newMessage(message);
		return new ResponseWrapper(chats.get(session.getId()), Returncodes.OKAY);
	}
}
