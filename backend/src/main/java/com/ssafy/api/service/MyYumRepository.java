package com.ssafy.api.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.MyYum;

@Repository
public interface MyYumRepository extends JpaRepository<MyYum, Integer>{

	void deleteByUserID(int userID);

	List<MyYum> findAllByUserID(int userID);

}
