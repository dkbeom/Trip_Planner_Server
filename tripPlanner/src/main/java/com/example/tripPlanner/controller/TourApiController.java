package com.example.tripPlanner.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpServerErrorException;

import com.example.tripPlanner.entity.Place;
import com.example.tripPlanner.entity.Restaurant;
import com.example.tripPlanner.entity.TourApiParam;
import com.example.tripPlanner.service.GPTApiService;
import com.example.tripPlanner.service.MemberService;
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
	
	@Autowired
    private MemberService memberService;
	
	@Autowired
	private GPTApiService gptapiService;

	// 키워드에 맞는 여행지 리스트 조회
	@PostMapping("/keyword")
	public List<Place> getKeywordPlaceList(@RequestBody TourApiParam param) {
		// 파라미터: currentX, currentY, areaName, sigunguName, keyword, foodPreference

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
			restaurantList = excelReader.getRestaurantListWithinRadius(tourApiService.getAreaName(p.getAreaCode()), p.getMapX(), p.getMapY(), param.getFoodPreference(), (double)1);
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
		// 파라미터: currentX, currentY, mapX, mapY, radius, contentTypeId, foodPreference

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
			restaurantList = excelReader.getRestaurantListWithinRadius(tourApiService.getAreaName(p.getAreaCode()), p.getMapX(), p.getMapY(), param.getFoodPreference(), (double)1);
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
	public ArrayList<ArrayList<Place>> getAreaBasedPlaceList(@RequestBody TourApiParam param/*, @RequestHeader(value = "Authorization") String token*/) {
		// 파라미터: currentX, currentY, areaName, sigunguName, cat1, cat2, cat3, foodPreference
		
		// 개인정보 확인
		//Member member = memberService.getMemberById(securityService.getSubject(token).get("id"));
		
		// TourAPI 에서 지역 코드 조회
		Map<String, String> areaCodeMap = tourApiService.getAreaCode(param.getAreaName(), param.getSigunguName());
		
		long start1 = System.currentTimeMillis();
		// TourAPI 에서 키워드에 맞는 여행지 리스트 조회
		List<Place> placeList = new ArrayList<>();
		if (areaCodeMap != null) {
			placeList = tourApiService.getAreaBasedPlaceList((String) areaCodeMap.get("areaCode"), (String) areaCodeMap.get("sigunguCode"), param.getCat1(), param.getCat2(), param.getCat3());
		} else {
			placeList = tourApiService.getAreaBasedPlaceList();
		}
		long end1 = System.currentTimeMillis();
		
//		// TEST
//		int a = 4;
//		int b = 6;
//		String[][] testArray = new String[a][b];
//		for(int i = 0; i < a; i++) {
//			for(int j = 0; j < b; j++) {
//				testArray[i][j] = placeList.get((b+3)*i+j).getTitle();
//			}
//		}
		String[][] testArray;
		try {
		     testArray= gptapiService.sendQuestion(placeList);
		    // 예외가 발생하지 않은 경우에 대한 처리
		    // testArray를 사용하는 나머지 로직을 작성합니다.
		} catch (HttpServerErrorException e) {
		    // 500 Internal Server Error가 발생한 경우에 대한 처리
		    // 예외 처리 로직을 작성합니다.
		    // 예를 들어, 오류 메시지를 출력하거나 로그에 기록할 수 있습니다.
		    System.out.println("서버에서 오류가 발생했습니다: " + e.getMessage());
		    e.printStackTrace();
		    // 필요한 경우 예외를 다시 던져서 상위 호출자에게 전파할 수도 있습니다.
		    throw e;
		}
		
		long start2 = System.currentTimeMillis();
		// ChatGPT에서 추천 여행지로 받은 2차원 배열 다시 PlaceList로 매핑 (recommendationsAllDates -> recommendedPlaceListAllDates)
		String[][] recommendationsAllDates = testArray; // ChatGPT에서 배열을 받음
		ArrayList<ArrayList<Place>> recommendedPlaceListAllDates = new ArrayList<>();
		for(String[] recommendationsByDate : recommendationsAllDates) { // 특정 날짜의 여행지 리스트
			// 날짜별 추천된 여행지 리스트
			ArrayList<Place> recommendedPlaceListByDate = new ArrayList<>();
			for(String recommendation : recommendationsByDate) { // 여행지 하나
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
		ExcelReader excelReader = new ExcelReader();
		List<Restaurant> restaurantList;
		for(ArrayList<Place> orderedPlaceList : orderedPlaceListAllDates) {
			for (Place p : orderedPlaceList) {
				restaurantList = excelReader.getRestaurantListWithinRadius(tourApiService.getAreaName(p.getAreaCode()), p.getMapX(), p.getMapY(), param.getFoodPreference(), (double)5);
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
					p.setSumScore(placeService.getSumScore(p.getId()));
					p.setNumScore(placeService.getNumScore(p.getId()));
				}
				// 기존 여행지 DB에 해당 여행지 정보가 존재하지 않은 경우
				else {
					// 여행지 DB에 해당 여행지 삽입
					placeService.insertPlace(p);
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
		// 파라미터: area, mapX, mapY, radius
		
		ExcelReader excelReader = new ExcelReader();
		List<Restaurant> restaurantList = excelReader.getRestaurantListWithinRadius(param.getArea(), param.getMapX(), param.getMapY(), param.getFoodPreference(), param.getRadius()/1000.0);
		
		// restaurantList 한번 더 필터링하는 작업 필요
		// ...
		
		System.out.println(param.getRadius()/1000.0+"km 반경 이내에 있는 음식점 수 => "+restaurantList.size());
		return restaurantList;
	}
}
