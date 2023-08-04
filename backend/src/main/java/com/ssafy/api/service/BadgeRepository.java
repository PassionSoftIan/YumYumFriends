package com.ssafy.api.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.Badge;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long>{

}
