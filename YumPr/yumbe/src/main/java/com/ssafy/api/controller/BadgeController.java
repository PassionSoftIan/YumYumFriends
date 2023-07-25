package com.ssafy.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.model.Badge;
import com.ssafy.api.service.BadgeRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "사용자 API", tags = { "Badge." })
@RestController
@RequestMapping("/api/v1/badge")
public class BadgeController {
	
	@Autowired
	BadgeRepository badgeRepo;
	
	@GetMapping("/{id}")
	@ApiOperation(value = "뱃지 조회", notes = "<strong>뱃지 ID</strong>를 통해 뱃지 정보를 조회한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공", response = Badge.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Badge> getBadgeById(@PathVariable("id") int id) {
		Optional<Badge> badge = badgeRepo.findById(id);
		if (badge.isPresent())
			return ResponseEntity.status(HttpStatus.OK).body(badge.get());
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@GetMapping("")
	@ApiOperation(value = "모든 뱃지 조회", notes = "모든 뱃지 정보를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<List<Badge>> getAllBadge() {
		List<Badge> badges = badgeRepo.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(badges);
	}
}
