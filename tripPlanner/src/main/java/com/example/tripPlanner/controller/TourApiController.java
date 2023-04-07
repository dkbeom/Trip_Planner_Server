package com.example.tripPlanner.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.entity.Place;
import com.example.tripPlanner.service.PlaceService;
import com.example.tripPlanner.service.TourApiService;
import com.example.tripPlanner.util.TSPAlgorithm;

@RestController
@RequestMapping("/tourApi")
public class TourApiController {

	@Autowired
	private TourApiService tourApiService;

	@Autowired
	private PlaceService placeService;
	

	// 키워드에 맞는 여행지 추천
	@PostMapping("/keyword")
	public List<Place> getKeywordPlaceList(String currentLocationX, String currentLocationY, String keyword, String areaName, String sigunguName) {

		// TourAPI 에서 지역 코드 조회
		Map<String, String> areaCodeMap = tourApiService.getAreaCode(areaName, sigunguName);

		// TourAPI 에서 키워드에 맞는 여행지 리스트 조회
		List<Place> placeList = new ArrayList<>();
		if (areaCodeMap != null) {
			placeList = tourApiService.getKeywordPlaceList(keyword, (String) areaCodeMap.get("areaCode"), (String) areaCodeMap.get("sigunguCode"));
		} else {
			placeList = tourApiService.getKeywordPlaceList(keyword);
		}

		// placeList 한번 더 필터링하는 작업 필요
		// ...

		// TSP 알고리즘
		TSPAlgorithm tsp = new TSPAlgorithm(placeList);
		ArrayList<Place> orderedPlaceList = tsp.getTspOrderedPlaceList(currentLocationX, currentLocationY);

		// 여행지 DB 조회 및 삽입
		for (Place p : orderedPlaceList) {
			// 기존 여행지 DB에 해당 여행지 정보가 존재하는 경우
			if (placeService.exist(p.getId())) {
				// 기존 여행지 DB에 존재하는 여행지 각각의 평점 정보를 가져와서 삽입
				p.setSumScore(placeService.getSumScore(p.getId()));
				p.setNumScore(placeService.getNumScore(p.getId()));
			}
			// 기존 여행지 DB에 해당 여행지 정보가 존재하지 않은 경우
			else {
				// 여행지 DB에 해당 여행지 삽입
				placeService.insertPlace(p);
			}
		}

		return orderedPlaceList;
	}

	// 지정한 위치 주변에 있는 여행지 추천
	@PostMapping("/location")
	public List<Place> getLocationPlaceList(String currentLocationX, String currentLocationY, String mapX, String mapY) {

		// TourAPI 에서 좌표 주변에 있는 여행지 리스트 조회
		List<Place> placeList = tourApiService.getLocationPlaceList(mapX, mapY);

		// placeList 한번 더 필터링하는 작업 필요
		// ...
		
		// TSP 알고리즘
		TSPAlgorithm tsp = new TSPAlgorithm(placeList);
		ArrayList<Place> orderedPlaceList = tsp.getTspOrderedPlaceList(currentLocationX, currentLocationY);

		// 여행지 DB 조회 및 삽입
		for (Place p : orderedPlaceList) {
			// 기존 여행지 DB에 해당 여행지 정보가 존재하는 경우
			if (placeService.exist(p.getId())) {
				// 기존 여행지 DB에 존재하는 여행지 각각의 평점 정보를 가져와서 삽입
				p.setSumScore(placeService.getSumScore(p.getId()));
				p.setNumScore(placeService.getNumScore(p.getId()));
			}
			// 기존 여행지 DB에 해당 여행지 정보가 존재하지 않은 경우
			else {
				// 여행지 DB에 해당 여행지 삽입
				placeService.insertPlace(p);
			}
		}

		return orderedPlaceList;
	}
}
