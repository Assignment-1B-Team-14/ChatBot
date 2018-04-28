package com.team14.backend.main.dataBase;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.team14.backend.main.model.SessionChatCoupling;

/**
 * @author Florian Widder
 *
 */
public interface SessionRepo extends CrudRepository<SessionChatCoupling, Integer> {

	List<SessionChatCoupling> findBysessionHash(String sessionHash);

	List<SessionChatCoupling> findBychatIdentifier(String chatIdentifier);

}
