package com.example.tripPlanner.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.entity.Place;
import com.example.tripPlanner.entity.Restaurant;
import com.example.tripPlanner.entity.TourApiParam;
import com.example.tripPlanner.service.MemberService;
import com.example.tripPlanner.service.PlaceService;
import com.example.tripPlanner.service.RestaurantService;
import com.example.tripPlanner.service.SecurityService;
import com.example.tripPlanner.service.TourApiService;
import com.example.tripPlanner.util.ExcelReader;
import com.example.tripPlanner.util.TSPAlgorithmGreedy;

@Transactional
@RestController
@RequestMapping("/tourApi")
public class TourApiController {

	@Autowired
	private TourApiService tourApiService;

	@Autowired
	private PlaceService placeService;
	
	@Autowired
	private RestaurantService restaurantService;
	
	@Autowired
    private SecurityService securityService;
	
	@Autowired
    private MemberService memberService;
	

	// 키워드에 맞는 여행지 리스트 조회
	@PostMapping("/keyword")
	public List<Place> getKeywordPlaceList(@RequestBody TourApiParam param) {
		// 파라미터: currentX, currentY, areaName, sigunguName, keyword, foodPreferences

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
		ExcelReader excelReader = new ExcelReader(param.getFoodPreferences());
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
				p.setSumScore(placeService.getSumOfScore(p.getId()));
				p.setNumScore(placeService.getNumOfScore(p.getId()));
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
		// 파라미터: currentX, currentY, mapX, mapY, radius, contentTypeId, foodPreferences

		// TourAPI 에서 특정 좌표 주변에 있는 여행지 리스트 조회
		List<Place> placeList = tourApiService.getLocationPlaceList(param.getMapX(), param.getMapY(), param.getRadius(), param.getContentTypeId());

		// placeList 한번 더 필터링하는 작업 필요
		// ...
		
		// TSP 알고리즘(Greedy)
		TSPAlgorithmGreedy tsp = new TSPAlgorithmGreedy(placeList);
		ArrayList<Place> orderedPlaceList = tsp.getTspOrderedPlaceList(param.getCurrentX(), param.getCurrentY());

		// 각 여행지마다 근처 식당 목록 삽입
		ExcelReader excelReader = new ExcelReader(param.getFoodPreferences());
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
				p.setSumScore(placeService.getSumOfScore(p.getId()));
				p.setNumScore(placeService.getNumOfScore(p.getId()));
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
	public ArrayList<ArrayList<Place>> getAreaBasedPlaceList(@RequestBody TourApiParam param/*, @RequestHeader(value = "Authorization") String token*/) {
		// 파라미터: currentX, currentY, areas, categories, foodPreferences, tag
		
		// 개인정보 확인
		//Member member = memberService.getMemberById(securityService.getSubject(token).get("id"));
		
		long start1 = System.currentTimeMillis();
		// TourAPI 에서 키워드에 맞는 여행지 리스트 조회
		List<Place> placeList = tourApiService.getAreaBasedPlaceList(param.getAreas(), param.getCategories());
		long end1 = System.currentTimeMillis();
		
		// TEST
		int a = 4;
		int b = 6;
		String[][] testArray = new String[a][b];
		for(int i = 0; i < a; i++) {
			for(int j = 0; j < b; j++) {
				testArray[i][j] = placeList.get((b+3)*i+j).getTitle();
			}
		}

		long start2 = System.currentTimeMillis();
		// ChatGPT에서 추천 여행지로 받은 2차원 배열 다시 PlaceList로 매핑 (recommendationsAllDates -> recommendedPlaceListAllDates)
		String[][] recommendationsAllDates = testArray; // ChatGPT에서 배열을 받음
		ArrayList<ArrayList<Place>> recommendedPlaceListAllDates = new ArrayList<>();
		for(String[] recommendationsByDate : recommendationsAllDates) {
			// 날짜별 추천된 여행지 리스트
			ArrayList<Place> recommendedPlaceListByDate = new ArrayList<>();
			for(String recommendation : recommendationsByDate) {
				// 하나의 날짜 안에서의 특정 여행지
				for(Place place : placeList) {
					if(place.getTitle().equals(recommendation)) {
						recommendedPlaceListByDate.add(place);
						break;
					}
				}
			}
			recommendedPlaceListAllDates.add(recommendedPlaceListByDate);
		}
		long end2 = System.currentTimeMillis();
		
		long start3 = System.currentTimeMillis();
		// TSP 알고리즘(Greedy) (recommendedPlaceListAllDates -> orderedPlaceListAllDates)
		ArrayList<ArrayList<Place>> orderedPlaceListAllDates = new ArrayList<>();
		ArrayList<Place> orderedPlaceListByDate;
		for(ArrayList<Place> recommendedPlaceListByDate : recommendedPlaceListAllDates) {
			TSPAlgorithmGreedy tsp = new TSPAlgorithmGreedy(recommendedPlaceListByDate);
			orderedPlaceListByDate = tsp.getTspOrderedPlaceList(param.getCurrentX(), param.getCurrentY());
			orderedPlaceListAllDates.add(new ArrayList<Place>(orderedPlaceListByDate));
		}
		long end3 = System.currentTimeMillis();
		
		long start4 = System.currentTimeMillis();
		// 각 여행지마다 근처 식당 목록 삽입 (orderedPlaceListAllDates -> orderedPlaceListAllDates)
		ExcelReader excelReader = new ExcelReader(param.getFoodPreferences());
		List<Restaurant> restaurantList;
		for(ArrayList<Place> orderedPlaceList : orderedPlaceListAllDates) {
			for (Place p : orderedPlaceList) {
				restaurantList = excelReader.getRestaurantListWithinRadius(tourApiService.getAreaName(p.getAreaCode()), p.getMapX(), p.getMapY(), (double)5);
				p.setNearByRestaurants(new ArrayList<Restaurant>(restaurantList));
			}
		}
		long end4 = System.currentTimeMillis();
		
		long start5 = System.currentTimeMillis();
		// 여행지 DB 조회 및 삽입 (orderedPlaceListAllDates -> orderedPlaceListAllDates)
		for(ArrayList<Place> orderedPlaceList : orderedPlaceListAllDates) {
			for (Place p : orderedPlaceList) {
				// 기존 여행지 DB에 해당 여행지 정보가 존재하는 경우
				if (placeService.exist(p.getId())) {
					// 기존 여행지 DB에 존재하는 여행지 각각의 평점 정보를 가져와서 삽입
					p.setSumScore(placeService.getSumOfScore(p.getId()));
					p.setNumScore(placeService.getNumOfScore(p.getId()));
				}
				// 기존 여행지 DB에 해당 여행지 정보가 존재하지 않은 경우
				else {
					// 여행지 DB에 해당 여행지 삽입
					placeService.insertPlace(p);
				}
				// 해당 여행지의 근처 음식점 DB 조회 및 삽입
				for(Restaurant r : p.getNearByRestaurants()) {
					// 근처 음식점들이 음식점 DB에 존재하는 경우
					if (restaurantService.exist(r.getId())) {
						// 기존 여행지 DB에 존재하는 여행지 각각의 평점 정보를 가져와서 삽입
						r.setSumScore(restaurantService.getSumOfScore(r.getId()));
						r.setNumScore(restaurantService.getNumOfScore(r.getId()));
					}
					// 근처 음식점들이 음식점 DB에 존재하지 않은 경우
					else {
						// 음식점 DB에 해당 음식점 삽입
						restaurantService.insertRestaurant(r);
					}
				}
			}
		}
		long end5 = System.currentTimeMillis();
		
		System.out.println();
		System.out.println();
		System.out.println("TourAPI 에서 키워드에 맞는 여행지 리스트 조회 경과 시간: " + (end1 - start1) + "ms");
		System.out.println("ChatGPT에서 추천 여행지로 받은 2차원 배열 다시 PlaceList로 매핑 경과 시간: " + (end2 - start2) + "ms");
		System.out.println("TSP 알고리즘 경과 시간: " + (end3 - start3) + "ms");
		System.out.println("근처 식당 목록 삽입 경과 시간: " + (end4 - start4) + "ms");
		System.out.println("여행지 DB 조회 및 삽입 경과 시간: " + (end5 - start5) + "ms");
		System.out.println();

		return orderedPlaceListAllDates;
	}
	
	
	
	// 특정 지역의 특정 좌표 주변 음식점 리스트 조회
	@PostMapping("/restaurant")
	public List<Restaurant> excel(@RequestBody TourApiParam param) {
		// 파라미터: area, mapX, mapY, foodPreferences, radius
		
		ExcelReader excelReader = new ExcelReader(param.getFoodPreferences());
		List<Restaurant> restaurantList = excelReader.getRestaurantListWithinRadius(param.getArea(), param.getMapX(), param.getMapY(), param.getRadius()/1000.0);
		
		// restaurantList 한번 더 필터링하는 작업 필요
		// ...
		
		System.out.println(param.getRadius()/1000.0+"km 반경 이내에 있는 음식점 수 => "+restaurantList.size());
		return restaurantList;
	}
	
	@PostMapping("/insertRestaurant")
	public String ir(@RequestBody Restaurant restaurant) {
		
		boolean isInsert = restaurantService.insertRestaurant(restaurant);
		
		if(isInsert) {
			return "{\"result\" : \"INSERT_SUCCESS\"}";
		} else {
			return "{\"result\" : \"INSERT_FAILURE\"}";
		}
	}
	
	@PostMapping("/test")
	public List<Restaurant> test(@RequestBody TourApiParam param){
		// 파라미터: area, mapX, mapY, foodPreferences, radius
		
		ExcelReader excelReader = new ExcelReader(param.getFoodPreferences());
		List<Restaurant> restaurantList = excelReader.getRestaurantListWithinRadius(param.getArea(), param.getMapX(), param.getMapY(), param.getRadius()/1000.0);
		
		return restaurantList;
	}
	
	@GetMapping("/hi")
	public String hi() {
		
		return "hello everyone~";
	}
}
