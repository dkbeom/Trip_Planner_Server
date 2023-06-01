package com.example.tripPlanner.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.tripPlanner.dao.PlaceDao;
import com.example.tripPlanner.entity.Place;

@Service
@Transactional
public class PlaceServiceImp implements PlaceService {
	
	@Autowired
	private PlaceDao placeDao;
	
	
	@Override
	public List<Place> getPlaceList() {
		return placeDao.getPlaceList();
	}

	@Override
	public Place getPlace(String placeId) {
		return placeDao.getPlace(placeId);
	}
	
	@Override
	public boolean exist(String placeId) {
		
		if(placeDao.getIdById(placeId) != null) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public Double getSumOfScore(String placeId) {
		return placeDao.getSumOfScore(placeId);
	}
	
	@Override
	public Integer getNumOfScore(String placeId) {
		return placeDao.getNumOfScore(placeId);
	}

	@Override
	public boolean insertPlace(Place place) {
		return placeDao.insertPlace(place);
	}
	
	@Override
	public boolean scorePlace(String placeId, Integer score) {
		
		Double sum_score = placeDao.getSumOfScore(placeId);
		Integer num_score = placeDao.getNumOfScore(placeId);
		
		Double new_sum_score = (sum_score != null) ? (sum_score + score) : (double)score;
		Integer new_num_score = (num_score != null) ? (num_score + 1) : 1;
		
		Map<String, Object> newScore = new HashMap<>();
		newScore.put("placeId", placeId);
		newScore.put("new_sum_score", new_sum_score);
		newScore.put("new_num_score", new_num_score);
		
		return placeDao.updatePlaceScore(newScore);
	}
	
	@Override
	public boolean cancelScore(String placeId, Integer score) {
		
		Double sum_score = placeDao.getSumOfScore(placeId);
		Integer num_score = placeDao.getNumOfScore(placeId);
		
		Double new_sum_score = (sum_score != null && sum_score >= score) ? (sum_score - score) : (double) 0;
		Integer new_num_score = (num_score != null && num_score >= 1) ? (num_score - 1) : 0;
		
		Map<String, Object> newScore = new HashMap<>();
		newScore.put("placeId", placeId);
		newScore.put("new_sum_score", new_sum_score);
		newScore.put("new_num_score", new_num_score);
		
		return placeDao.updatePlaceScore(newScore);
	}

	@Override
	public boolean addTag(String placeId, String tag) {
		
		if(exist(placeId)) {
			String old_tag = placeDao.getTag(placeId);
			String new_tag = (old_tag != null) ? (old_tag+"/"+tag) : tag;
			
			Map<String, String> newTagMap = new HashMap<>();
			newTagMap.put("placeId", placeId);
			newTagMap.put("new_tag", new_tag);
			
			return placeDao.addTag(newTagMap);
		} else {
			return false;
		}
		
	}
}
