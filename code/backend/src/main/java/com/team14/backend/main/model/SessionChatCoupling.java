package com.team14.backend.main.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SessionChatCoupling implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 3034898969879930468L;
	@Id
	private String sessionHash = null;
	private String chatIdentifier = null;
	public final long creation;

	public SessionChatCoupling(String sessionHash, String chatIdentifier) {
		super();
		this.sessionHash = sessionHash;
		this.chatIdentifier = chatIdentifier;
		creation = System.currentTimeMillis();
	}

	public SessionChatCoupling() {
		super();
		creation = System.currentTimeMillis();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = (prime * result) + ((chatIdentifier == null) ? 0 : chatIdentifier.hashCode());
		result = (prime * result) + (int) (creation ^ (creation >>> 32));
		result = (prime * result) + ((sessionHash == null) ? 0 : sessionHash.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SessionChatCoupling other = (SessionChatCoupling) obj;
		if (chatIdentifier == null) {
			if (other.chatIdentifier != null)
				return false;
		} else if (!chatIdentifier.equals(other.chatIdentifier))
			return false;
		if (creation != other.creation)
			return false;
		if (sessionHash == null) {
			if (other.sessionHash != null)
				return false;
		} else if (!sessionHash.equals(other.sessionHash))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "SessionChatCoupling [sessionHash=" + sessionHash + ", chatIdentifier=" + chatIdentifier + ", creation="
				+ creation + "]";
	}

	public String getChatIdentifier() {
		return chatIdentifier;
	}

	public void setChatIdentifier(String chatIdentifier) {
		this.chatIdentifier = chatIdentifier;
	}

	public String getSessionHash() {
		return sessionHash;
	}

	public void setSessionHash(String sessionHash) {
		this.sessionHash = sessionHash;
	}
}
