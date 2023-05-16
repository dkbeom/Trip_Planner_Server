package com.example.tripPlanner.service;

import java.util.List;
import java.util.Map;

import com.example.tripPlanner.entity.Category;
import com.example.tripPlanner.entity.Place;

public interface TourApiService {
	
	Map<String, Object> getItemListAndNumOfRows(String uriString);
	
	// Tour API 키워드 검색 조회
	List<Place> getKeywordPlaceList(String keyword);
	List<Place> getKeywordPlaceList(String keyword, String areaCode);
	List<Place> getKeywordPlaceList(String keyword, String areaCode, String sigunguCode);
	List<Place> getKeywordPlaceList(String keyword, String areaCode, String sigunguCode, String cat1);
	List<Place> getKeywordPlaceList(String keyword, String areaCode, String sigunguCode, String cat1, String cat2);
	List<Place> getKeywordPlaceList(String keyword, String areaCode, String sigunguCode, String cat1, String cat2, String cat3);
	
	// DB에서 지역코드, 시군구코드 조회 (input: 지역 이름 / output: 지역 코드)
	Map<String, String> getAreaCode(String areaName);
	Map<String, String> getAreaCode(String areaName, String sigunguName);
	
	// DB에서 지역이름 조회 (input: 지역 코드 / output: 지역 이름)
	String getAreaName(String areaCode);
	
	// Tour API 위치기반 관광정보 조회
	List<Place> getLocationPlaceList(String mapX, String mapY);
	List<Place> getLocationPlaceList(String mapX, String mapY, Integer radius);
	List<Place> getLocationPlaceList(String mapX, String mapY, Integer radius, String contentTypeId);
	
	// Tour API 서비스 분류 코드 조회 (대,중,소분류)
	List<Category> getCategoryList();
	List<Category> getCategoryList(String cat1);
	List<Category> getCategoryList(String cat1, String cat2);
	List<Category> getCategoryList(String cat1, String cat2, String cat3);
	
	// Tour API 지역기반 관광정보 조회
	List<Place> getAreaBasedPlaceList();
	List<Place> getAreaBasedPlaceList(String areaCode);
	List<Place> getAreaBasedPlaceList(String areaCode, String sigunguCode);
	List<Place> getAreaBasedPlaceList(String areaCode, String sigunguCode, String cat1);
	List<Place> getAreaBasedPlaceList(String areaCode, String sigunguCode, String cat1, String cat2);
	List<Place> getAreaBasedPlaceList(String areaCode, String sigunguCode, String cat1, String cat2, String cat3);
}
