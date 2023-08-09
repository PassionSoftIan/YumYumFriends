package com.ssafy.api.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.MyYum;

@Repository
public interface MyYumRepository extends JpaRepository<MyYum, Long>{

	void deleteByUserID(long userID);

	List<MyYum> findAllByUserID(long userID);

}
