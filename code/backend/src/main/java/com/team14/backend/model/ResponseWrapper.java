package com.team14.backend.model;

import java.io.Serializable;

public class ResponseWrapper implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 5629166886992318936L;

	public ResponseWrapper(AbstarctResponse response, Returncodes code) {
		super();
		this.response = response;
		status = code;
		this.code = code.getCode();
		message = code.getMessage();
	}

	public ResponseWrapper(Returncodes status) {
		this.status = status;
		code = status.getCode();
		message = status.getMessage();
	}

	private AbstarctResponse response;
	private Returncodes status;
	private String message;
	private int code;

	public AbstarctResponse getResponse() {
		return response;
	}

	public void setResponse(AbstarctResponse response) {
		this.response = response;
	}

	public Returncodes getStatus() {
		return status;
	}

	public void setStatus(Returncodes status) {
		this.status = status;
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
