package com.team14.backend.main.rest;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DummyController {
	@RequestMapping(value = "/dummy/message/okay", method = RequestMethod.GET, produces = "application/json")
	public String getMessage(HttpSession session) {
		return "{\"status\": \"200\", \"error\":\"\", \"message\":\"" + ((int) (Math.random() * 10000)) + "\"}";
	}

	@RequestMapping(value = "/dummy/message/okay", method = RequestMethod.POST, produces = "application/json")
	public String postMessage(HttpSession session) {
		return "{\"status\": \"200\", \"error\": \"\"}";
	}

	@RequestMapping(value = "/dummy/message/error", method = RequestMethod.POST, produces = "application/json")
	public String postMessageError(HttpSession session) {
		return "{\"status\": \"500\", \"error\": \"Any Error\"}";
	}

	@RequestMapping(value = "/dummy/message/error", method = RequestMethod.GET, produces = "application/json")
	public String getMessageError(HttpSession session) {
		return "{\"status\": \"500\", \"error\": \"Any Error\", \"message\": \"\"}";
	}
}
