package com.example.tripPlanner.dao.mybatis;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.tripPlanner.dao.PlaceDao;
import com.example.tripPlanner.entity.Place;

@Repository
@Transactional
public class MybatisPlaceDao implements PlaceDao {

	private PlaceDao mapper;

    @Autowired
    public MybatisPlaceDao(SqlSession sqlSession) {
        mapper = sqlSession.getMapper(PlaceDao.class);
    }
    
    @Override
	public List<Place> getPlaceList() {
		return mapper.getPlaceList();
	}

	@Override
	public Place getPlace(String placeId) {
		return mapper.getPlace(placeId);
	}
	
	@Override
	public String getIdById(String placeId) {
		return mapper.getIdById(placeId);
	}

	@Override
	public boolean insertPlace(Place place) {
		return mapper.insertPlace(place);
	}
	
	@Override
	public Double getSumOfScore(String placeId) {
		return mapper.getSumOfScore(placeId);
	}

	@Override
	public Integer getNumOfScore(String placeId) {
		return mapper.getNumOfScore(placeId);
	}

	@Override
	public boolean updatePlaceScore(Map<String, Object> newScore) {
		return mapper.updatePlaceScore(newScore);
	}
	
	@Override
	public String getTag(String placeId) {
		return mapper.getTag(placeId);
	}

	@Override
	public boolean addTag(Map<String, String> newTag) {
		return mapper.addTag(newTag);
	}
}
