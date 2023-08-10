package com.ssafy.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.model.Badge;
import com.ssafy.api.model.MyBadge;
import com.ssafy.api.model.MyTrophy;
import com.ssafy.api.model.MyYum;
import com.ssafy.api.model.Trophy;
import com.ssafy.api.model.User;
import com.ssafy.api.model.Yum;
import com.ssafy.api.service.BadgeRepository;
import com.ssafy.api.service.MyBadgeRepository;
import com.ssafy.api.service.MyTrophyRepository;
import com.ssafy.api.service.MyYumRepository;
import com.ssafy.api.service.TrophyRepository;
import com.ssafy.api.service.UserRepository;
import com.ssafy.api.service.YumRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "수집품 API", tags = {"Collection."})
@RestController
@RequestMapping("/api/v1/collection")
public class CollectionController {
	@Autowired
	MyBadgeRepository myBadgeRepo;
	@Autowired
	MyTrophyRepository myTrophyRepo;
	@Autowired
	MyYumRepository myYumRepo;
	
	@Autowired
	UserRepository userRepo;
	@Autowired
	YumRepository yumRepo;
	@Autowired
	BadgeRepository badgeRepo;
	@Autowired
	TrophyRepository trophyRepo;
	

	@PostMapping("/myyum")
	@ApiOperation(value = "수집한 냠냠 등록", notes = "<strong>사용자 ID와 냠냠 ID</strong>를 통해 사용자가 잡은 냠냠 정보를 등록한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "등록 성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> registerMyYum(@RequestParam("user") long userID, @RequestParam("yum") long yumID) {
		Optional<User> user = userRepo.findById(userID);
		if(user.isPresent()) {
			MyYum myYum = new MyYum();
			myYum.setUserID(userID);
			myYum.setYumID(yumID);
			myYumRepo.save(myYum);
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(null);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@GetMapping("/myyum")
	@ApiOperation(value = "수집한 냠냠 목록", notes = "<strong>사용자 ID</strong>를 통해 사용자가 잡은 냠냠 목록을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<List<Yum>> getMyYum(@RequestParam("user") long userID) {
		Optional<User> user = userRepo.findById(userID);
		if(user.isPresent()) {
			List<MyYum> myYumlist = myYumRepo.findAllByUserID(userID);
			List<Yum> myYums = new ArrayList<>();
			for(MyYum myYum : myYumlist)
				myYums.add(yumRepo.findById(myYum.getYumID()).get());
			return ResponseEntity.status(HttpStatus.OK).body(myYums);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@PostMapping("/mybadge")
	@ApiOperation(value = "수집한 뱃지 등록", notes = "<strong>사용자 ID와 뱃지 ID</strong>를 통해 사용자가 획득한 뱃지 정보를 등록한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "등록 성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> registerMyBadge(@RequestParam("user") long userID, @RequestParam("badge") long badgeID) {
		Optional<User> user = userRepo.findById(userID);
		if(user.isPresent()) {
			MyBadge myBadge = new MyBadge();
			myBadge.setUserID(userID);
			myBadge.setBadgeID(badgeID);
			myBadgeRepo.save(myBadge);
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(null);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@GetMapping("/mybadge")
	@ApiOperation(value = "수집한 뱃지 목록", notes = "<strong>사용자 ID</strong>를 통해 사용자가 획득한 뱃지 목록을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<List<Badge>> getMyBadge(@RequestParam("user") long userID) {
		Optional<User> user = userRepo.findById(userID);
		if(user.isPresent()) {
			List<MyBadge> myBadgelist = myBadgeRepo.findAllByUserID(userID);
			List<Badge> myBadges = new ArrayList<>();
			for(MyBadge myBadge : myBadgelist)
				myBadges.add(badgeRepo.findById(myBadge.getBadgeID()).get());
			return ResponseEntity.status(HttpStatus.OK).body(myBadges);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@PostMapping("/mytrophy")
	@ApiOperation(value = "수집한 트로피 등록", notes = "<strong>사용자 ID와 트로피 ID</strong>를 통해 사용자가 획득한 트로피 정보를 등록한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "등록 성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> registerMyTrophy(@RequestParam("user") long userID, @RequestParam("trophy") long trophyID) {
		Optional<User> user = userRepo.findById(userID);
		if(user.isPresent()) {
			MyTrophy myTrophy = new MyTrophy();
			myTrophy.setUserID(userID);
			myTrophy.setTrophyID(trophyID);
			myTrophyRepo.save(myTrophy);
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(null);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@GetMapping("/mytrophy")
	@ApiOperation(value = "수집한 트로피 목록", notes = "<strong>사용자 ID</strong>를 통해 사용자가 획득한 트로피 목록을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<List<Trophy>> getMyTrophy(@RequestParam("user") long userID) {
		Optional<User> user = userRepo.findById(userID);
		if(user.isPresent()) {
			List<MyTrophy> myTrophylist = myTrophyRepo.findAllByUserID(userID);
			List<Trophy> myTrophys = new ArrayList<>();
			for(MyTrophy myTrophy : myTrophylist)
				myTrophys.add(trophyRepo.findById(myTrophy.getTrophyID()).get());
			return ResponseEntity.status(HttpStatus.OK).body(myTrophys);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
}
