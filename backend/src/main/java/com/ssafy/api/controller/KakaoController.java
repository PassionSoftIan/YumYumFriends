package com.ssafy.api.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.model.MyYum;
import com.ssafy.api.model.User;
import com.ssafy.api.service.MyYumRepository;
import com.ssafy.api.service.UserRepository;

import io.swagger.annotations.Api;

@CrossOrigin("*")
@Api(value = "카카오 로그인 API", tags = {"Kakao."})
@RestController
@RequestMapping("/api/v1/kakao")
public class KakaoController {
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	MyYumRepository myYumRepo;
	
//	@ResponseBody
//	@GetMapping("/login")
//	public User getUser(@RequestParam("token") String token) {
//		WebClient webClient = WebClient.create();
//
//		Map<String, Object> resp2 = webClient.get()
//                .uri("https://kapi.kakao.com/v2/user/me")
//                .header("Authorization", "Bearer " + token)
//                .retrieve()
//                .bodyToMono(Map.class)
//				.block();
//		
//		System.out.println("사용자 정보 : " + resp2.toString());
//		
//		long ID = (long)resp2.get("id");
//		System.out.println(ID);
//		Optional<User> user = userRepo.findById(ID);
//		if(user.isPresent())
//			return user.get();
//		else {
//			User newUser = new User();
//			newUser.setID(ID);
//			newUser.setEmail((String)((Map<String,Object>)resp2.get("kakao_account")).get("email"));
//			newUser.setNickname((String)((Map<String, Object>)resp2.get("properties")).get("nickname"));
//			newUser.setMealRemain(3);
//			
//			System.out.println("created new user : " + newUser);
//			userRepo.save(newUser);
//			return newUser;
//		}
//	}
	
	@ResponseBody
	@GetMapping("/login")
	public User getUser(@RequestParam("id") long id, @RequestParam("email") String email, @RequestParam("nickname") String nickname) {
		Optional<User> user = userRepo.findById(id);
		if(user.isPresent())
			return user.get();
		else {
			User newUser = new User();
			newUser.setID(id);
			newUser.setEmail(email);
			newUser.setNickname(nickname);
			newUser.setMealRemain(3);
			newUser.setCurrentYum(1);
			
			System.out.println("created new user : " + newUser);
			userRepo.save(newUser);
			
			MyYum myYum = new MyYum();
			myYum.setUserID(id);
			myYum.setYumID(1);
			myYumRepo.save(myYum);
			
			return newUser;
		}
	}
}
