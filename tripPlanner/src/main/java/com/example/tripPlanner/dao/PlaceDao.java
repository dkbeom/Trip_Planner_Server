package com.example.tripPlanner.dao;

import java.util.List;
import java.util.Map;

import com.example.tripPlanner.entity.Place;

public interface PlaceDao {
	
	List<Place> getPlaceList();
	
	Place getPlace(String placeId);
	
	String getIdById(String placeId);
	
	boolean insertPlace(Place place);

	Double getSumOfScore(String placeId);

	Integer getNumOfScore(String placeId);
	
	boolean updatePlaceScore(Map<String, Object> newScore);
	
	String getTag(String placeId);
	
	boolean addTag(Map<String, String> newTag);
}
