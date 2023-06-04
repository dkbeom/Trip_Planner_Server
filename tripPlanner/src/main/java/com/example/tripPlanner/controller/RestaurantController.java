package com.example.tripPlanner.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.entity.Restaurant;
import com.example.tripPlanner.service.RestaurantService;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {
	
	@Autowired
	private RestaurantService restaurantService;
	
	
	// 여행지 DB에 저장된 여행지 목록 조회
	@GetMapping("/get/list")
	public List<Restaurant> getRestaurantList() {
		return restaurantService.getRestaurantList();
	}
	
	// 여행지 DB에 저장된 여행지 중, 특정 여행지 조회
	@GetMapping("/get")
	public Restaurant getRestaurant(String restaurantId) {
		return restaurantService.getRestaurant(restaurantId);
	}
	
	// 여행지 DB에 저장된 여행지 중, 특정 여행지 평점 조회
	@GetMapping("/get/score")
	public Map<String, Double> getScore(String restaurantId) {
		
		if(restaurantService.exist(restaurantId)) {
			Double sum = restaurantService.getSumOfScore(restaurantId);
			Integer num = restaurantService.getNumOfScore(restaurantId);
			
			Map<String, Double> score = new HashMap<>();
			score.put("score", (num != null && num != 0) ? sum/num : 0);
			
			return score;
		} else {
			return null;
		}
	}
	
	// 여행지 DB에 여행지 삽입
	@PostMapping("/insert")
	public String insertRestaurant(@RequestBody Restaurant restaurant) {
		boolean isInsert = restaurantService.insertRestaurant(restaurant);
		
		if(isInsert) {
			return "{\"result\" : \"INSERT_SUCCESS\"}";
		} else {
			return "{\"result\" : \"INSERT_FAILURE\"}";
		}
	}
}
