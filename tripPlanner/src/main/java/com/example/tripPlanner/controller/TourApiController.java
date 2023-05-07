package com.example.tripPlanner.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.entity.Place;
import com.example.tripPlanner.entity.Restaurant;
import com.example.tripPlanner.entity.TourApiParam;
import com.example.tripPlanner.service.PlaceService;
import com.example.tripPlanner.service.SecurityService;
import com.example.tripPlanner.service.TourApiService;
import com.example.tripPlanner.util.ExcelReader;
import com.example.tripPlanner.util.TSPAlgorithmGreedy;

@RestController
@RequestMapping("/tourApi")
public class TourApiController {

	@Autowired
	private TourApiService tourApiService;

	@Autowired
	private PlaceService placeService;
	
	@Autowired
    private SecurityService securityService;
	

	// 키워드에 맞는 여행지 리스트 조회
	@PostMapping("/keyword")
	public List<Place> getKeywordPlaceList(@RequestBody TourApiParam param) {
		// 파라미터: currentX, currentY, areaName, sigunguName, keyword

		// TourAPI 에서 지역 코드 조회
		Map<String, String> areaCodeMap = tourApiService.getAreaCode(param.getAreaName(), param.getSigunguName());

		// TourAPI 에서 키워드에 맞는 여행지 리스트 조회
		List<Place> placeList = new ArrayList<>();
		if (areaCodeMap != null) {
			placeList = tourApiService.getKeywordPlaceList(param.getKeyword(), (String) areaCodeMap.get("areaCode"), (String) areaCodeMap.get("sigunguCode"));
		} else {
			placeList = tourApiService.getKeywordPlaceList(param.getKeyword());
		}

		// placeList 한번 더 필터링하는 작업 필요
		// ...

		// TSP 알고리즘(Greedy)
		TSPAlgorithmGreedy tsp = new TSPAlgorithmGreedy(placeList);
		ArrayList<Place> orderedPlaceList = tsp.getTspOrderedPlaceList(param.getCurrentX(), param.getCurrentY());

		// 각 여행지마다 근처 식당 목록 삽입
		ExcelReader excelReader = new ExcelReader();
		List<Restaurant> restaurantList;
		for (Place p : orderedPlaceList) {
			restaurantList = excelReader.getRestaurantListWithinRadius(tourApiService.getAreaName(p.getAreaCode()), p.getMapX(), p.getMapY(), (double)1);
			// restaurantList 한번 더 필터링하는 작업 필요
			// ...
			p.setNearByRestaurants(restaurantList);
		}
		
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

	// 지정한 위치 주변에 있는 여행지 리스트 조회
	@PostMapping("/location")
	public List<Place> getLocationPlaceList(@RequestBody TourApiParam param) {
		// 파라미터: currentX, currentY, mapX, mapY, radius, contentTypeId

		// TourAPI 에서 특정 좌표 주변에 있는 여행지 리스트 조회
		List<Place> placeList = tourApiService.getLocationPlaceList(param.getMapX(), param.getMapY(), param.getRadius(), param.getContentTypeId());

		// placeList 한번 더 필터링하는 작업 필요
		// ...
		
		// TSP 알고리즘(Greedy)
		TSPAlgorithmGreedy tsp = new TSPAlgorithmGreedy(placeList);
		ArrayList<Place> orderedPlaceList = tsp.getTspOrderedPlaceList(param.getCurrentX(), param.getCurrentY());

		// 각 여행지마다 근처 식당 목록 삽입
		ExcelReader excelReader = new ExcelReader();
		List<Restaurant> restaurantList;
		for (Place p : orderedPlaceList) {
			restaurantList = excelReader.getRestaurantListWithinRadius(tourApiService.getAreaName(p.getAreaCode()), p.getMapX(), p.getMapY(), (double)1);
			// restaurantList 한번 더 필터링하는 작업 필요
			// ...
			p.setNearByRestaurants(restaurantList);
		}
		
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
	
	// 특정 지역에 있는 여행지 리스트 조회
	@PostMapping("/areaBased")
	public List<Place> getAreaBasedPlaceList(@RequestBody TourApiParam param, @RequestHeader(value = "Authorization") String token) {
		// 파라미터: currentX, currentY, areaName, sigunguName, cat1, cat2, cat3
		
		// TEST (개인정보 확인)
		System.out.println("name => "+securityService.getSubject(token).get("name"));
		
		// TourAPI 에서 지역 코드 조회
		Map<String, String> areaCodeMap = tourApiService.getAreaCode(param.getAreaName(), param.getSigunguName());

		// TourAPI 에서 키워드에 맞는 여행지 리스트 조회
		List<Place> placeList = new ArrayList<>();
		if (areaCodeMap != null) {
			placeList = tourApiService.getAreaBasedPlaceList((String) areaCodeMap.get("areaCode"), (String) areaCodeMap.get("sigunguCode"), param.getCat1(), param.getCat2(), param.getCat3());
		} else {
			placeList = tourApiService.getAreaBasedPlaceList();
		}

		// placeList 한번 더 필터링하는 작업 필요
		// ...
		
		// TSP 알고리즘(Greedy)
		TSPAlgorithmGreedy tsp = new TSPAlgorithmGreedy(placeList);
		ArrayList<Place> orderedPlaceList = tsp.getTspOrderedPlaceList(param.getCurrentX(), param.getCurrentY());
		
		// 각 여행지마다 근처 식당 목록 삽입
		ExcelReader excelReader = new ExcelReader();
		List<Restaurant> restaurantList;
		for (Place p : orderedPlaceList) {
			restaurantList = excelReader.getRestaurantListWithinRadius(tourApiService.getAreaName(p.getAreaCode()), p.getMapX(), p.getMapY(), (double)1);
			// restaurantList 한번 더 필터링하는 작업 필요
			// ...
			p.setNearByRestaurants(restaurantList);
		}

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
	
	// 특정 지역의 특정 좌표 주변 음식점 리스트 조회
	@PostMapping("/restaurant")
	public List<Restaurant> excel(@RequestBody TourApiParam param) {
		// 파라미터: area, mapX, mapY, radius
		
		ExcelReader excelReader = new ExcelReader();
		List<Restaurant> restaurantList = excelReader.getRestaurantListWithinRadius(param.getArea(), param.getMapX(), param.getMapY(), param.getRadius()/1000.0);
		
		// restaurantList 한번 더 필터링하는 작업 필요
		// ...
		
		System.out.println(param.getRadius()/1000.0+"km 반경 이내에 있는 음식점 수 => "+restaurantList.size());
		return restaurantList;
	}
}
