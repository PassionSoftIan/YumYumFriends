package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.MyTrophy;
import com.ssafy.api.model.User;

@Repository
public interface MyTrophyRepository extends JpaRepository<MyTrophy, Long> {
	
	void deleteByUserID(long userID);

	List<MyTrophy> findAllByUserID(long userID);

	Optional<MyTrophy> findByUserIDAndTrophyID(long userID, long trophyID);

}
