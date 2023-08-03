package com.ssafy.api.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.ssafy.api.model.User;
import com.ssafy.api.service.UserRepository;

import io.swagger.annotations.Api;

@Api(value = "카카오 로그인 API", tags = {"Kakao."})
@RestController
@RequestMapping("/api/v1/kakao")
public class KakaoController {
	
	@Autowired
	UserRepository userRepo;
	
	private String TOKEN_URI = "https://kauth.kakao.com/oauth/token";
	private String GRANT_TYPE = "authorization_code";
	private String CLIENT_ID = "db4a66f215fd566fd6a8b24f9cfb4ef7";
	private String REDIRECT_URI = "https://yumyumfriends.site/api/v1/kakao/login";
//	private String REDIRECT_URI = "http://localhost:8080/api/v1/kakao/login";
	
	@ResponseBody
	@GetMapping("/login")
	public User kakaoLogin(@RequestParam("code") String code) {
		System.out.println("인가 코드 : "+ code);
		
		String uri = TOKEN_URI
				+ "?grant_type=" + GRANT_TYPE
				+ "&client_id=" + CLIENT_ID
				+ "&redirect_uri=" + REDIRECT_URI
				+ "&code=" + code;
		WebClient webClient = WebClient.create();
		
		Map<String, Object> resp = webClient.post()
		.uri(uri)
		.contentType(MediaType.APPLICATION_JSON)
		.retrieve().bodyToMono(Map.class)
		.block();

		System.out.println("카카오 토큰 : " + resp.toString());
		System.out.println("액세스 토큰 : " + resp.get("access_token"));

		
		Map<String, Object> resp2 = webClient.get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .header("Authorization", "Bearer " + resp.get("access_token"))
                .retrieve()
                .bodyToMono(Map.class)
				.block();
		
		System.out.println("사용자 정보 : " + resp2.toString());
		
		long ID = (long)resp2.get("id");
		System.out.println(ID);
		Optional<User> user = userRepo.findById(ID);
		if(user.isPresent())
			return user.get();
		else {
			User newUser = new User();
			newUser.setID(ID);
			newUser.setEmail((String)((Map<String,Object>)resp2.get("kakao_account")).get("email"));
			newUser.setNickname((String)((Map<String, Object>)resp2.get("properties")).get("nickname"));
			newUser.setMealRemain(3);
			
			System.out.println("created new user : " + newUser);
			userRepo.save(newUser);
			return newUser;
		}
	}
}
