package com.team14.backend.main.rest;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatControler {
	@RequestMapping(value = "/api/tools/session", method = RequestMethod.GET)
	public String getSession(HttpSession session) {
		return session.getId();
	}
}
