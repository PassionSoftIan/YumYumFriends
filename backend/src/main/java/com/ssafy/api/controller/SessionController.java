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
import org.springframework.web.bind.annotation.PutMapping;
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

	@GetMapping("/sessionid")
	@ApiOperation(value = "세션 조회", notes = "<strong>사용자 ID</strong>를 통해 사용자가 접속 중인 세션에 접속 가능 여부를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = User.class),
        @ApiResponse(code = 404, message = "사용자 혹은 세션 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Boolean> getSessionIDById(@RequestParam("session_id") long sessionID) {
		Optional<Session> session = sessionRepo.findById(sessionID);
		if(session.isPresent()) {
			if(session.get().getCurrent() < 2)
				return ResponseEntity.status(HttpStatus.OK).body(true);
			else
				return ResponseEntity.status(HttpStatus.OK).body(false);
		}else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
	}

	@PostMapping("")
	@ApiOperation(value = "세션 생성", notes = "<strong>세션 정보(사용자 ID, 사용자 이름)</strong>를 통해 세션을 생성한다.") 
    @ApiResponses({
        @ApiResponse(code = 201, message = "생성 성공"),
        @ApiResponse(code = 208, message = "중복"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Boolean> createSession(@RequestParam("session_id") long sessionID, @RequestParam("password") String password) {
		//사용자가 존재하는지 확인
		Optional<User> user = userRepo.findById(sessionID);
		if(!user.isPresent())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
		
		Optional<Session> session = sessionRepo.findById(sessionID);
		if(session.isPresent())
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(false);
		else {
			Session newSession = new Session();
			newSession.setSessionID(user.get().getID());
			newSession.setPublisher(user.get().getNickname());
			newSession.setCurrent(0);
			newSession.setPassword(password);
			sessionRepo.save(newSession);
			return ResponseEntity.status(HttpStatus.CREATED).body(true);
		}
	}

	@PutMapping("/enter")
	@ApiOperation(value = "세션 입장", notes = "<strong>세션 입장 정보</strong>를 통해 세션을 생성한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 202, message = "인원 초과"),
        @ApiResponse(code = 208, message = "중복 입장"),
        @ApiResponse(code = 404, message = "사용자 혹은 세션 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Boolean> enterSession(@RequestParam("session_id") long sessionID, @RequestParam("password") String password) {
		if(sessionID == 0 || password == null)
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

//		//사용자가 존재하는지 확인
//		Optional<User> user = userRepo.findById(userID);
//		if(!user.isPresent())
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		
//		//사용자가 세션에 입장 중인지 확인
//		Optional<SessionInfo> sessionInfo = infoRepo.findByUserID(info.getUserID());
//		if(sessionInfo.isPresent())
//			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(null);

		//사용자가 입장할 세션이 존재하는지 확인
		Optional<Session> session = sessionRepo.findById(sessionID);
		if(session.isPresent()) {
			Session updatedSession = session.get();
			
			// 비밀번호 확인
			if(!updatedSession.getPassword().equals(password))
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(false);

			// 인원수 증가
			int cur = updatedSession.getCurrent()+1;

			// 입장 가능여부 체크
			if(cur > 2)
				// 세션은 존재하지만 입장할 수 없음
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(false);

			updatedSession.setCurrent(cur);
			sessionRepo.save(updatedSession);
			return ResponseEntity.status(HttpStatus.OK).body(true);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
	}
	
	@Transactional
	@DeleteMapping("/exit")
	@ApiOperation(value = "세션 퇴장", notes = "<strong>사용자 ID</strong>를 통해 입장한 세션을 퇴장한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "사용자 혹은 세션 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Void> exitSession(@RequestParam("session_id") long sessionID) {
		//사용자가 존재하는지 확인
//		Optional<User> user = userRepo.findById(userID);
//		if(!user.isPresent())
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

		//사용자가 생성한 세션이 존재하는지 확인
		Optional<Session> session = sessionRepo.findById(sessionID);
		if(session.isPresent()) {
			Session updatedSession = session.get();
			int cur = updatedSession.getCurrent()-1;
			// 세션에 남은 인원이 없으면 세션 삭제
			if(cur == 0)
				sessionRepo.deleteById(sessionID);
			// 세션에 남은 인원이 있으면 인원수 감소
			else {
				updatedSession.setCurrent(cur);
				sessionRepo.save(updatedSession);
			}
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
}
