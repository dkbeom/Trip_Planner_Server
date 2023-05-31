package com.example.tripPlanner.service;

import java.util.List;

import com.example.tripPlanner.entity.Restaurant;

public interface RestaurantService {
	
	// 음식점 DB에 저장된 여행지 리스트 가져오기
	List<Restaurant> getRestaurantList();
	
	// 특정 음식점의 정보 가져오기
	Restaurant getRestaurant(String restaurantId);
	
	// DB에서 특정 음식점의 존재여부 가져오기
	boolean exist(String restaurantId);
	
	// 특정 음식점의 평점 총점 가져오기
	Double getSumOfScore(String restaurantId);
	
	// 특정 음식점의 평점 개수 가져오기
	Integer getNumOfScore(String restaurantId);
	
	// 음식점 DB에 여행지 삽입
	boolean insertRestaurant(Restaurant restaurant);
	
	// 특정 음식점에 평점 추가하고, 태그 추가
	boolean scoreRestaurant(String restaurantId, Integer score);
	
	// 특정 음식점의 특정 평점 제거
	boolean cancelScore(String placeId, Integer score);
}
