package com.example.tripPlanner.service;

import java.util.List;

import com.example.tripPlanner.entity.Place;

public interface PlaceService {
	
	// 여행지 DB에 저장된 여행지 리스트 가져오기
	List<Place> getPlaceList();
	
	// 특정 여행지의 정보 가져오기
	Place getPlace(String placeId);
	
	// DB에서 특정 여행지의 존재여부 가져오기
	boolean exist(String placeId);
	
	// 특정 여행지의 평점 총점 가져오기
	Double getSumOfScore(String placeId);
	
	// 특정 여행지의 평점 개수 가져오기
	Integer getNumOfScore(String placeId);
	
	// 여행지 DB에 여행지 삽입
	boolean insertPlace(Place place);
	
	// 특정 여행지에 평점 추가하고, 태그 추가
	boolean scorePlace(String placeId, Integer score);
	
	// 특정 여행지의 특정 평점 제거
	boolean cancelScore(String placeId, Integer score);
	
	// 여행지 태그 추가
	boolean addTag(String placeId, String tag);
}
