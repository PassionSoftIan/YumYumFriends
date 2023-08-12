package com.ssafy.api.controller;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.model.Session;
import com.ssafy.api.model.SessionInfo;
import com.ssafy.api.model.User;
import com.ssafy.api.service.SessionInfoRepository;
import com.ssafy.api.service.SessionRepository;
import com.ssafy.api.service.UserRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*")
@Api(value = "세션 API", tags = {"Session."})
@RestController
@RequestMapping("/api/v1/session")
public class SessionController {
	
	@Autowired
	SessionRepository sessionRepo;
	
	@Autowired
	SessionInfoRepository infoRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("")
	@ApiOperation(value = "세션 정보 조회", notes = "<strong>모든 세션 정보</strong>를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<List<Session>> getSessionById() {
		List<Session> sessions = sessionRepo.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(sessions);
	}

//	@GetMapping("/sessionid")
//	@ApiOperation(value = "세션 조회", notes = "<strong>사용자 ID</strong>를 통해 사용자가 접속 중인 세션 ID를 조회한다.") 
//    @ApiResponses({
//        @ApiResponse(code = 200, message = "성공", response = User.class),
//        @ApiResponse(code = 404, message = "사용자 혹은 세션 없음"),
//        @ApiResponse(code = 500, message = "서버 오류")
//    })
//	public ResponseEntity<String> getSessionIDById(@RequestParam("user_id") long id) {
//		Optional<SessionInfo> sessionInfo = infoRepo.findByUserID(id);
//		if(sessionInfo.isPresent())
//			return ResponseEntity.status(HttpStatus.OK).body(sessionInfo.get().getSessionID());
//		else
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//	}

	@PostMapping("")
	@ApiOperation(value = "세션 생성", notes = "<strong>세션 정보(사용자 ID, 사용자 이름)</strong>를 통해 세션을 생성한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "생성 성공"),
        @ApiResponse(code = 208, message = "중복"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> createSession(@RequestParam("user_id") long userID) {
		//사용자가 존재하는지 확인
		Optional<User> user = userRepo.findById(userID);
		if(!user.isPresent())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
		Optional<Session> session = sessionRepo.findById(userID);
		if(session.isPresent())
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(null);
		else {
			Session newSession = new Session();
			newSession.setSessionID(user.get().getID());
			newSession.setPublisher(user.get().getNickname());
			sessionRepo.save(newSession);
			return ResponseEntity.status(HttpStatus.CREATED).body(null);
		}
	}

//	@PutMapping("/enter")
//	@ApiOperation(value = "세션 입장", notes = "<strong>세션 입장 정보</strong>를 통해 세션을 생성한다.") 
//    @ApiResponses({
//        @ApiResponse(code = 200, message = "성공"),
//        @ApiResponse(code = 202, message = "인원 초과"),
//        @ApiResponse(code = 208, message = "중복 입장"),
//        @ApiResponse(code = 404, message = "사용자 혹은 세션 없음"),
//        @ApiResponse(code = 500, message = "서버 오류")
//    })
//	public ResponseEntity<Void> enterSession(SessionInfo info) {
//		if(info.getSessionID() == null || info.getUserID() == 0 || info.getRole() == null)
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//
//		//사용자가 존재하는지 확인
//		Optional<User> user = userRepo.findById(info.getUserID());
//		if(!user.isPresent())
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		
//		//사용자가 세션에 입장 중인지 확인
//		Optional<SessionInfo> sessionInfo = infoRepo.findByUserID(info.getUserID());
//		if(sessionInfo.isPresent())
//			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(null);
//
//		//사용자가 입장할 세션이 존재하는지 확인
//		Optional<Session> session = sessionRepo.findById(info.getSessionID());
//		if(session.isPresent()) {
//			Session updatedSession = session.get();
//			// 인원수 증가
//			int cur = updatedSession.getCurrent()+1;
//			if(cur > updatedSession.getMax())
//				return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
//
//			updatedSession.setCurrent(cur);
//			sessionRepo.save(updatedSession);
//			infoRepo.save(info);
//			return ResponseEntity.status(HttpStatus.OK).body(null);
//		}
//		else
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//	}
	
	@Transactional
	@DeleteMapping("/exit")
	@ApiOperation(value = "세션 삭제", notes = "<strong>사용자 ID</strong>를 통해 입장한 세션을 삭제한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "사용자 혹은 세션 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> exitSession(@RequestParam("user_id") long userID) {
		//사용자가 존재하는지 확인
		Optional<User> user = userRepo.findById(userID);
		if(!user.isPresent())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

		//사용자가 생성한 세션이 존재하는지 확인
		Optional<Session> session = sessionRepo.findById(userID);
		if(session.isPresent()) {
			sessionRepo.deleteById(userID);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
}
