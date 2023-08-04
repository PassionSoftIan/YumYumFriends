package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.model.Yum;
import com.ssafy.api.service.YumRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "개발자 API", tags = { "Dev." })
@RestController
@RequestMapping("/api/dev")
public class DevController {

	@Autowired
	YumRepository repo;
	
	@PostMapping()
	@ApiOperation(value = "냠냠 데이터 삽입", notes = "<strong>Json형태 냠냠 데이터</strong>를 DB에 삽입한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 404, message = "결과 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	public void input(@RequestBody List<Yum> yums) {
		System.out.println(yums);
		for(Yum yum : yums)
			repo.save(yum);
	}
	
	@GetMapping()
	public String test() {
		return "test text";
	}
	
}
