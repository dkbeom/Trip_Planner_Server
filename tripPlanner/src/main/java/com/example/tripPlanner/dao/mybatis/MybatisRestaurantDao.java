package com.example.tripPlanner.dao.mybatis;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.tripPlanner.dao.RestaurantDao;
import com.example.tripPlanner.entity.Restaurant;

@Repository
public class MybatisRestaurantDao implements RestaurantDao {

	private RestaurantDao mapper;

    @Autowired
    public MybatisRestaurantDao(SqlSession sqlSession) {
        mapper = sqlSession.getMapper(RestaurantDao.class);
    }
    
    @Override
	public List<Restaurant> getRestaurantList() {
		return mapper.getRestaurantList();
	}

	@Override
	public Restaurant getRestaurant(String restaurantId) {
		return mapper.getRestaurant(restaurantId);
	}
	
	@Override
	public String getIdById(String restaurantId) {
		return mapper.getIdById(restaurantId);
	}

	@Override
	public boolean insertRestaurant(Restaurant restaurant) {
		return mapper.insertRestaurant(restaurant);
	}
	
	@Override
	public Double getSumOfScore(String restaurantId) {
		return mapper.getSumOfScore(restaurantId);
	}

	@Override
	public Integer getNumOfScore(String restaurantId) {
		return mapper.getNumOfScore(restaurantId);
	}
	
	@Override
	public String getTag(String restaurantId) {
		return mapper.getTag(restaurantId);
	}

	@Override
	public boolean updateRestaurantScore(Map<String, Object> newScore) {
		return mapper.updateRestaurantScore(newScore);
	}
}
