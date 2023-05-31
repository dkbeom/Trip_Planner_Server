package com.example.tripPlanner.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.tripPlanner.dao.RestaurantDao;
import com.example.tripPlanner.entity.Restaurant;

@Service
@Transactional
public class RestaurantServiceImp implements RestaurantService {
	
	@Autowired
	private RestaurantDao restaurantDao;
	
	
	@Override
	public List<Restaurant> getRestaurantList() {
		return restaurantDao.getRestaurantList();
	}

	@Override
	public Restaurant getRestaurant(String restaurantId) {
		return restaurantDao.getRestaurant(restaurantId);
	}
	
	@Override
	public boolean exist(String restaurantId) {
		
		if(restaurantDao.getIdById(restaurantId) != null) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public Double getSumOfScore(String restaurantId) {
		return restaurantDao.getSumOfScore(restaurantId);
	}
	
	@Override
	public Integer getNumOfScore(String restaurantId) {
		return restaurantDao.getNumOfScore(restaurantId);
	}

	@Override
	public boolean insertRestaurant(Restaurant restaurant) {
		return restaurantDao.insertRestaurant(restaurant);
	}
	
	@Override
	public boolean scoreRestaurant(String restaurantId, Integer score) {
		
		Double sum_score = restaurantDao.getSumOfScore(restaurantId);
		Integer num_score = restaurantDao.getNumOfScore(restaurantId);
		
		Double new_sum_score = (sum_score != null) ? (sum_score + score) : (double)score;
		Integer new_num_score = (num_score != null) ? (num_score + 1) : 1;
		
		Map<String, Object> newScoreMap = new HashMap<>();
		newScoreMap.put("restaurantId", restaurantId);
		newScoreMap.put("new_sum_score", new_sum_score);
		newScoreMap.put("new_num_score", new_num_score);
		
		return restaurantDao.updateRestaurantScore(newScoreMap);
	}
	
	@Override
	public boolean cancelScore(String restaurantId, Integer score) {
		
		Double sum_score = restaurantDao.getSumOfScore(restaurantId);
		Integer num_score = restaurantDao.getNumOfScore(restaurantId);
		
		Double new_sum_score = (sum_score != null && sum_score >= score) ? (sum_score - score) : (double) 0;
		Integer new_num_score = (num_score != null && num_score >= 1) ? (num_score - 1) : 0;
		
		Map<String, Object> newScoreMap = new HashMap<>();
		newScoreMap.put("restaurantId", restaurantId);
		newScoreMap.put("new_sum_score", new_sum_score);
		newScoreMap.put("new_num_score", new_num_score);
		
		return restaurantDao.updateRestaurantScore(newScoreMap);
	}
}
