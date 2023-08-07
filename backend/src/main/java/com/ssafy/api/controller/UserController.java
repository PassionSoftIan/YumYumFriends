package com.ssafy.api.controller;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.model.User;
import com.ssafy.api.service.FriendshipRepository;
import com.ssafy.api.service.MyBadgeRepository;
import com.ssafy.api.service.MyTrophyRepository;
import com.ssafy.api.service.MyYumRepository;
import com.ssafy.api.service.UserRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "사용자 API", tags = {"User."})
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	FriendshipRepository friendRepo;
	
	@Autowired
	MyYumRepository myYumRepo;
	
	@Autowired
	MyTrophyRepository myTrophyRepo;
	
	@Autowired
	MyBadgeRepository myBadgeRepo;
	
	
	@GetMapping("")
	@ApiOperation(value = "사용자 조회", notes = "<strong>사용자 ID</strong>를 통해 사용자 정보를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = User.class),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<User> getUserById(@RequestParam("id") long id) {
		Optional<User> user = userRepo.findById(id);
		if(user.isPresent())
			return ResponseEntity.status(HttpStatus.OK).body(user.get());
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@PostMapping("")
	@ApiOperation(value = "사용자 등록", notes = "<strong>사용자 객체</strong>를 통해 사용자 정보를 등록한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "가입 성공"),
        @ApiResponse(code = 208, message = "중복"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> registerUser(User target) {
		if(target.getEmail() == null || target.getNickname() == null)
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		
		Optional<User> user = userRepo.findByEmail(target.getEmail());
		if(user.isPresent())
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(null);
		else {
			userRepo.save(target);
			return ResponseEntity.status(HttpStatus.CREATED).body(null);
		}
	}
	
	@PutMapping("")
	@ApiOperation(value = "사용자 정보 수정", notes = "<strong>사용자 객체</strong>를 통해 사용자 정보를 수정한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> getUserById(User target) {
		Optional<User> user = userRepo.findById(target.getID());
		if(user.isPresent()) {
			userRepo.save(target);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@Transactional
	@DeleteMapping("")
	@ApiOperation(value = "사용자 삭제", notes = "<strong>사용자 ID</strong>를 통해 사용자 정보를 삭제한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> deleteUserById(@RequestParam("id") long id) {
		Optional<User> user = userRepo.findById(id);
		if(user.isPresent()) {
			long userID = user.get().getID();
			friendRepo.deleteByFriend1ID(userID);
			friendRepo.deleteByFriend2ID(userID);
			myYumRepo.deleteByUserID(userID);
			myTrophyRepo.deleteByUserID(userID);
			myBadgeRepo.deleteByUserID(userID);
			
			userRepo.deleteById(id);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	
	
	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>사용자 객체(email, password)</strong>를 통해 사용자 정보를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<User> loginUser(User target) {
		if(target.getEmail() == null)
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		
		Optional<User> user = userRepo.findByEmail(target.getEmail());
		if(user.isPresent())
			return ResponseEntity.status(HttpStatus.OK).body(user.get());
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

}
