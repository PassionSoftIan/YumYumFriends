package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.service.MyBadgeRepository;

import io.swagger.annotations.Api;

@Api(value = "수집품 API", tags = {"Collection."})
@RestController
@RequestMapping("/api/v1/collection")
public class CollectionController {
	@Autowired
	MyBadgeRepository myBadgeRepo;
}
