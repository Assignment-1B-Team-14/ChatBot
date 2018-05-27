package com.team14.backend.db;

import org.springframework.data.repository.CrudRepository;

import com.team14.backend.model.DBMessage;

public interface DBMessageHandler extends CrudRepository<DBMessage, String> {

}