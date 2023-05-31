package com.example.tripPlanner.dao;

import java.util.List;
import java.util.Map;

import com.example.tripPlanner.entity.Restaurant;

public interface RestaurantDao {
	
	List<Restaurant> getRestaurantList();
	
	Restaurant getRestaurant(String restaurantId);
	
	String getIdById(String restaurantId);
	
	boolean insertRestaurant(Restaurant restaurant);

	Double getSumOfScore(String restaurantId);

	Integer getNumOfScore(String restaurantId);
	
	String getTag(String restaurantId);
	
	boolean updateRestaurantScore(Map<String, Object> newScore);
}
