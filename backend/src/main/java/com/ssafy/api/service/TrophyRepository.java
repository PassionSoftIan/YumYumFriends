package com.ssafy.api.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.api.model.Trophy;

@Repository
public interface TrophyRepository extends JpaRepository<Trophy, Long>{

}
