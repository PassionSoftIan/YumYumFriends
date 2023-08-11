package com.ssafy.api.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.api.model.Session;

public interface SessionRepository extends JpaRepository<Session, Long>{

}
