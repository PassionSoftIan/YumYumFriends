package com.ssafy.api.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.api.model.MyBadge;

public interface MyBadgeRepository extends JpaRepository<MyBadge, Integer>{

}
