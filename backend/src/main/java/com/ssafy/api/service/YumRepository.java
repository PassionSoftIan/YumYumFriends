package com.ssafy.api.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.Yum;

@Repository
public interface YumRepository extends JpaRepository<Yum, Integer> {

}