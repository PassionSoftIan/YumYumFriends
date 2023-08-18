package com.ssafy.api.service;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.api.model.SessionInfo;

public interface SessionInfoRepository extends JpaRepository<SessionInfo, String>{

	Optional<SessionInfo> findByUserID(long userID);

	void deleteByUserID(long userID);

}
