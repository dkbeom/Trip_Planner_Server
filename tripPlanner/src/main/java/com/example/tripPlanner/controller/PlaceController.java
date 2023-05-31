package com.example.tripPlanner.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.entity.Place;
import com.example.tripPlanner.service.PlaceService;

@RestController
@RequestMapping("/place")
public class PlaceController {
	
	@Autowired
	private PlaceService placeService;
	
	
	// 여행지 DB에 저장된 여행지 목록 조회
	@GetMapping("/get/list")
	public List<Place> getPlaceList() {
		return placeService.getPlaceList();
	}
	
	// 여행지 DB에 저장된 여행지 중, 특정 여행지 조회
	@GetMapping("/get")
	public Place getPlace(String placeId) {
		return placeService.getPlace(placeId);
	}
	
	// 여행지 DB에 저장된 여행지 중, 특정 여행지 평점 조회
	@GetMapping("/score")
	public Map<String, Double> getScore(String placeId) {
		
		Double sum = placeService.getSumOfScore(placeId);
		Integer num = placeService.getNumOfScore(placeId);
		
		Map<String, Double> score = new HashMap<>();
		score.put("score", sum/num);
		
		return score;
	}
	
	// 여행지 DB에 여행지 삽입
	@PostMapping("/insert")
	public String insertPlace(@RequestBody Place place) {
		
		boolean isInsert = placeService.insertPlace(place);
		
		if(isInsert) {
			return "{\"result\" : \"INSERT_SUCCESS\"}";
		} else {
			return "{\"result\" : \"INSERT_FAILURE\"}";
		}
	}
	
	// place에 태그 추가
	@PostMapping("/addTag")
	public String addTag(@RequestBody Map<String, String> placeIdAndTag) {
		
		boolean isTagAdded = placeService.addTag(placeIdAndTag.get("placeId"), placeIdAndTag.get("tag"));
		
		if(isTagAdded) {
			return "{\"result\" : \"TAG_ADDING_SUCCESS\"}";
		} else {
			return "{\"result\" : \"TAG_ADDING_FAILURE\"}";
		}
	}
}
