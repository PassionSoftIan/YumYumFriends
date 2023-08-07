package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.MyBadge;
import com.ssafy.api.model.User;

@Repository
public interface MyBadgeRepository extends JpaRepository<MyBadge, Long> {
	
	void deleteByUserID(long userID);

	List<MyBadge> findAllByUserID(long userID);

	Optional<MyBadge> findByUserIDAndBadgeID(long userID, long badgeID);

}
