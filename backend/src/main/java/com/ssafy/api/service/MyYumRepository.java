package com.ssafy.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.MyYum;
import com.ssafy.api.model.User;

@Repository
public interface MyYumRepository extends JpaRepository<MyYum, Long>{

	void deleteByUserID(long userID);

	List<MyYum> findAllByUserID(long userID);

	Optional<MyYum> findByUserIDAndYumID(long userID, long yumID);

}
