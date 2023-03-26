package com.example.tripPlanner.service;

import java.util.List;

import com.example.tripPlanner.entity.Category;
import com.example.tripPlanner.entity.Place;

public interface TourApiService {
	
	// Tour API를 통한 여행지 조회
	List<Place> getApiPlaceList(String mapX, String mapY);
	List<Place> getApiPlaceList(String mapX, String mapY, Integer radius);
	List<Place> getApiPlaceList(String mapX, String mapY, Integer radius, String cat1);
	List<Place> getApiPlaceList(String mapX, String mapY, Integer radius, String cat1, String cat2);
	List<Place> getApiPlaceList(String mapX, String mapY, Integer radius, String cat1, String cat2, String cat3);
	
	// Tour API를 통한 서비스 분류 코드 조회 (대,중,소분류)
	List<Category> getApiCategoryList();
	List<Category> getApiCategoryList(String cat1);
	List<Category> getApiCategoryList(String cat1, String cat2);
	List<Category> getApiCategoryList(String cat1, String cat2, String cat3);
}
