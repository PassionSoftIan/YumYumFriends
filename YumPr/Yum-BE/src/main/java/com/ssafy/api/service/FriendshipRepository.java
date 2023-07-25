package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.Friendship;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Integer>{

	Optional<Friendship> findByFriend1IDAndFriend2ID(int user1id, int user2id);

	List<Friendship> findByFriend1ID(int userID);

	List<Friendship> findByFriend2ID(int userID);

	void deleteByFriend1ID(int userID);

	void deleteByFriend2ID(int userID);
}
