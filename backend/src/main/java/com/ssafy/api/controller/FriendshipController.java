package com.ssafy.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.model.Friendship;
import com.ssafy.api.model.User;
import com.ssafy.api.service.FriendshipRepository;
import com.ssafy.api.service.UserRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "친구 API", tags = {"Friend."})
@RestController
@RequestMapping("/api/v1/friend")
public class FriendshipController {

	@Autowired
	FriendshipRepository friendRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("")
	@ApiOperation(value = "친구 조회", notes = "<strong>사용자 ID</strong>를 통해 사용자의 친구 목록을 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "등록 성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<List<User>> registerUser(@RequestParam("user") long userID) {
		
		List<User> friends = new ArrayList<>();
		
		Optional<User> user = userRepo.findById(userID);
		if(user.isPresent()) {
			for(Friendship fs : friendRepo.findByFriend1ID(user.get().getID())) {
				Optional<User> friend = userRepo.findById(fs.getFriend2ID());
				if(friend.isPresent())
					friends.add(friend.get());
			}
			for(Friendship fs : friendRepo.findByFriend2ID(user.get().getID())) {
				Optional<User> friend = userRepo.findById(fs.getFriend1ID());
				if(friend.isPresent())
					friends.add(friend.get());
			}
			return ResponseEntity.status(HttpStatus.OK).body(friends);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@PostMapping("")
	@ApiOperation(value = "친구 등록", notes = "<strong>사용자 ID</strong>를 통해 두 사용자를 친구로 등록한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "등록 성공"),
        @ApiResponse(code = 208, message = "중복"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> registerUser(@RequestParam("user1") long user1ID, @RequestParam("user2") long user2ID) {
		long u1ID = Math.min(user1ID, user2ID);
		long u2ID = Math.max(user1ID, user2ID);

		Optional<User> user1 = userRepo.findById(u1ID);
		Optional<User> user2 = userRepo.findById(u2ID);
		if(user1.isPresent() && user2.isPresent()) {
			if(friendRepo.findByFriend1IDAndFriend2ID(u1ID, u2ID).isPresent())
				return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(null);
			else {
				Friendship friend = new Friendship();
				friend.setFriend1ID(u1ID);
				friend.setFriend2ID(u2ID);
				friendRepo.save(friend);
				return ResponseEntity.status(HttpStatus.CREATED).body(null);
			}
		}else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@Transactional
	@DeleteMapping("")
	@ApiOperation(value = "친구 삭제", notes = "<strong>사용자 ID</strong>를 통해 두 사용자의 친구 관계로 삭제한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "삭제 성공"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> DeleteUser(@RequestParam("user1") long user1ID, @RequestParam("user2") long user2ID) {
		long u1ID = Math.min(user1ID, user2ID);
		long u2ID = Math.max(user1ID, user2ID);

		Optional<User> user1 = userRepo.findById(u1ID);
		Optional<User> user2 = userRepo.findById(u2ID);
		if(user1.isPresent() && user2.isPresent()) {
			Optional<Friendship> fs = friendRepo.findByFriend1IDAndFriend2ID(u1ID, u2ID);
			if(fs.isPresent()) {
				friendRepo.deleteById(fs.get().getID());
				return ResponseEntity.status(HttpStatus.OK).body(null);
			}
			else 
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
}
