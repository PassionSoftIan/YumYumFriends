package com.ssafy.api.controller;

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

import com.ssafy.api.model.MyYum;
import com.ssafy.api.model.User;
import com.ssafy.api.model.Yum;
import com.ssafy.api.service.MyYumRepository;
import com.ssafy.api.service.UserRepository;
import com.ssafy.api.service.YumRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "사용자 API", tags = { "Yum." })
@RestController
@RequestMapping("/api/v1/yum")
public class YumController {

	@Autowired
	YumRepository yumRepo;

	@Autowired
	UserRepository userRepo;
	
	@Autowired
	MyYumRepository myYumRepo;

	@GetMapping("")
	@ApiOperation(value = "냠냠 조회", notes = "<strong>냠냠 ID</strong>를 통해 냠냠 정보를 조회한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공",response = User.class),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Yum> getYumById(@RequestParam("id") long id) {
		Optional<Yum> yum = yumRepo.findById(id);
		if (yum.isPresent())
			return ResponseEntity.status(HttpStatus.OK).body(yum.get());
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}

	@GetMapping("/all")
	@ApiOperation(value = "모든 냠냠 조회", notes = "모든 냠냠 정보를 조회한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = List.class),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<List<Yum>> getAllYum() {
		List<Yum> yums = yumRepo.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(yums);
	}

}
