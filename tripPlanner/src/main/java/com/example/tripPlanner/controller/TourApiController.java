package com.example.tripPlanner.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.entity.Place;
import com.example.tripPlanner.service.TourApiService;

@RestController
@RequestMapping("/tourApi")
public class TourApiController {
	
	@Autowired
	private TourApiService tourApiService;
	
	
	// 키워드에 맞는 여행지 추천
	@PostMapping("/keyword")
	public List<Place> getKeywordPlaceList(String keyword, String areaName, String sigunguName) {
		
		// TourAPI 에서 지역 코드 조회
		Map<String, String> areaCodeMap = tourApiService.getAreaCode(areaName, sigunguName);
		
		// TourAPI 에서 키워드에 맞는 여행지 리스트 조회
		List<Place> placeList = new ArrayList<>();
		if(areaCodeMap != null) {
			placeList = tourApiService.getKeywordPlaceList(keyword, (String)areaCodeMap.get("areaCode"), (String)areaCodeMap.get("sigunguCode"));
		} else {
			placeList = tourApiService.getKeywordPlaceList(keyword);
		}
		
		// 여행지 리스트 중 리뷰 테이블에 있는 평점도 넣어주기
		// ...
		
		return placeList;
	}
	
	// 지정한 위치 주변에 있는 여행지 추천
	@PostMapping("/location")
	public List<Place> getLocationPlaceList(String mapX, String mapY) {
		
		// TourAPI 에서 좌표 주변에 있는 여행지 리스트 조회
		List<Place> placeList = tourApiService.getLocationPlaceList(mapX, mapY);
		
		// 여행지 리스트 중 리뷰 테이블에 있는 평점도 넣어주기
		// ...
		
		return placeList;
	}
}
