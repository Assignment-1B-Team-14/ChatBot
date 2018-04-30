package com.team14.backend.model;

public enum Returncodes {
	OKAY("Request okay", 0), CHAT_NOT_FOUND("Can not find Chat. Please create one first with HTTP.PUT on '/chat' .", 1);

	private String message;
	private int code;

	Returncodes(String s, int code) {
		setMessage(s);
		setCode(code);
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
}
