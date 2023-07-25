package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.model.Yum;
import com.ssafy.api.service.YumRepository;

@RestController
@RequestMapping("/test")
public class TestController {

	@Autowired
	YumRepository repo;
	
	@GetMapping()
	public List<Yum> getAll() {
		return repo.findAll();
	}
	
}
