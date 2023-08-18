package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.Friendship;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long>{

	Optional<Friendship> findByFriend1IDAndFriend2ID(long user1id, long user2id);

	List<Friendship> findByFriend1ID(long userID);

	List<Friendship> findByFriend2ID(long userID);

	void deleteByFriend1ID(long userID);

	void deleteByFriend2ID(long userID);
}
