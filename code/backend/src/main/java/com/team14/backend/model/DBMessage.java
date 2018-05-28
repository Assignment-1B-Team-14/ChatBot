package com.team14.backend.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DBMessage implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = -8393161283420481455L;

	public DBMessage() {
		setTIMESTAMP(LocalDateTime.now());
	}

	public LocalDateTime getTIMESTAMP() {
		return TIMESTAMP;
	}

	public void setTIMESTAMP(LocalDateTime tIMESTAMP) {
		TIMESTAMP = tIMESTAMP;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getChatID() {
		return chatID;
	}

	public void setChatID(String chatID) {
		this.chatID = chatID;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIPAdress() {
		return IPAdress;
	}

	public void setIPAdress(String iPAdress) {
		IPAdress = iPAdress;
	}

	public String getSessionID() {
		return sessionID;
	}

	public void setSessionID(String sessionID) {
		this.sessionID = sessionID;
	}

	private LocalDateTime TIMESTAMP;
	@Column(length = 2048)
	private String question;
	@Column(length = 2048)
	private String answer;
	private String chatID;
	private String sessionID;
	private String IPAdress;

}
