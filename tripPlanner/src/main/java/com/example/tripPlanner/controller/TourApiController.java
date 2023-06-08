package com.example.tripPlanner.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpServerErrorException;

import com.example.tripPlanner.entity.Member;
import com.example.tripPlanner.entity.Place;
import com.example.tripPlanner.entity.Restaurant;
import com.example.tripPlanner.entity.TourApiParam;
import com.example.tripPlanner.service.GPTApiService;
import com.example.tripPlanner.service.HistoryService;
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
	
	@Autowired
	private GPTApiService gptApiService;
	
	@Autowired
	private HistoryService historyService;
	

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
	public ArrayList<ArrayList<Place>> getAreaBasedPlaceList(@RequestBody TourApiParam param) {
		// 파라미터: currentX, currentY, areas, categories, foodPreferences, travelDuration
		
		System.out.println("시작");
		
		long start1 = System.currentTimeMillis();
		// TourAPI 에서 키워드에 맞는 여행지 리스트 조회
		List<Place> placeList = tourApiService.getAreaBasedPlaceList(param.getAreas(), param.getCategories(), param.getTravelDuration());
		long end1 = System.currentTimeMillis();
		
		System.out.println("ChatGPT 들어가기 전 여행지 리스트");
		for(Place place : placeList) {
			System.out.println("여행지 이름 => "+place.getTitle());
		}
		System.out.println("\nTourAPI 여행지 리스트 조회 끝\n");
		
		
		long start2 = System.currentTimeMillis();
		// -------------------------------------- GPT 시작 --------------------------------------
		System.out.println("\n placeList의 개수 => "+placeList.size()+"\n");
		String[][] placesPerDays;
		
		// 검색된 여행지 수가 적으면, gpt 호출 안하도록
		if(placeList.size() < param.getTravelDuration() * 2) {
			// 조건에 만족하는 여행지가 너무 적어서, null 반환
			return null;
		}
		else if(placeList.size() >= param.getTravelDuration() * 2 && placeList.size() < param.getTravelDuration() * 5) {
			placesPerDays = new String[param.getTravelDuration()][placeList.size() / param.getTravelDuration()];
			for(int i = 0; i < param.getTravelDuration(); i++) {
				for(int j = 0; j < placeList.size() / param.getTravelDuration(); j++) {
					placesPerDays[i][j] = placeList.get(i * (placeList.size() / param.getTravelDuration()) + j).getTitle();
				}
			}
		} else {
			System.out.println();
			System.out.println("gpt 들어가기전 여행지 이름 목록");
			for(Place p1 : placeList) {
				System.out.println("여행지 이름 => "+p1.getTitle());
			}
			System.out.println();

			try {
				placesPerDays = gptApiService.sendQuestion(placeList, param.getTravelDuration());
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
			
			System.out.println();
			System.out.println("gpt 들어갔다 나온 후 여행지 이름 목록");
			int n = 1;
			for(String[] oneday : placesPerDays) {
				System.out.println("day"+(n++));
				for(String onePlace : oneday) {
					System.out.println("여행지 이름 => "+onePlace);
				}
			}
			System.out.println();
		}		
		// -------------------------------------- GPT 끝 --------------------------------------
		long end2 = System.currentTimeMillis();
		System.out.println("\nGPT 끝\n");

		
		long start3 = System.currentTimeMillis();
		// ChatGPT에서 추천 여행지로 받은 2차원 배열 다시 PlaceList로 매핑 (recommendationsAllDates -> recommendedPlaceListAllDates)
		String[][] recommendationsAllDates = placesPerDays; // ChatGPT에서 배열을 받음
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
		long end3 = System.currentTimeMillis();
		System.out.println("\nGPT에서 나온 2차원 배열 다시 PlaceList로 매핑 끝\n");
		
		
		long start4 = System.currentTimeMillis();
		// TSP 알고리즘(Greedy) (recommendedPlaceListAllDates -> orderedPlaceListAllDates)
		ArrayList<ArrayList<Place>> orderedPlaceListAllDates = new ArrayList<>();
		ArrayList<Place> orderedPlaceListByDate;
		for(ArrayList<Place> recommendedPlaceListByDate : recommendedPlaceListAllDates) {
			TSPAlgorithmGreedy tsp = new TSPAlgorithmGreedy(recommendedPlaceListByDate);
			orderedPlaceListByDate = tsp.getTspOrderedPlaceList(param.getCurrentX(), param.getCurrentY());
			orderedPlaceListAllDates.add(new ArrayList<Place>(orderedPlaceListByDate));
		}
		long end4 = System.currentTimeMillis();
		System.out.println("\nTSP 알고리즘 끝\n");
		
		
		long start5 = System.currentTimeMillis();
		// 각 여행지마다 근처 식당 목록 삽입 (orderedPlaceListAllDates -> orderedPlaceListAllDates)
		ExcelReader excelReader = new ExcelReader(param.getFoodPreferences());
		List<Restaurant> restaurantList;
		for(ArrayList<Place> orderedPlaceList : orderedPlaceListAllDates) {
			for (Place p : orderedPlaceList) {
				restaurantList = excelReader.getRestaurantListWithinRadius(tourApiService.getAreaName(p.getAreaCode()), p.getMapX(), p.getMapY(), (double)5);
				p.setNearByRestaurants(new ArrayList<Restaurant>(restaurantList));
			}
		}
		long end5 = System.currentTimeMillis();
		System.out.println("\n근처 식당 목록 삽입 끝\n");
		
		
		long start6 = System.currentTimeMillis();
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
		long end6 = System.currentTimeMillis();
		System.out.println("\n여행지 DB 조회 및 삽입 끝\n");
		
		System.out.println("\n");
		System.out.println("TourAPI 에서 키워드에 맞는 여행지 리스트 조회 경과 시간: " + (end1 - start1) + "ms");
		System.out.println("ChatGPT에서 2차원 배열로 추천 여행지를 받는 시간: " + (end2 - start2) + "ms");
		System.out.println("ChatGPT에서 추천 여행지로 받은 2차원 배열을 다시 PlaceList로 매핑 경과 시간: " + (end3 - start3) + "ms");
		System.out.println("TSP 알고리즘 경과 시간: " + (end4 - start4) + "ms");
		System.out.println("근처 식당 목록 삽입 경과 시간: " + (end5 - start5) + "ms");
		System.out.println("여행지 DB 조회 및 삽입 경과 시간: " + (end6 - start6) + "ms");
		System.out.println("\n");

		return orderedPlaceListAllDates;
	}
	
	@GetMapping("/hi")
	public String hi() {
		
		return "hello everyone~";
	}
}
