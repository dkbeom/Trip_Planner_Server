package com.example.tripPlanner.dao.mybatis;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.tripPlanner.dao.ReviewDao;
import com.example.tripPlanner.entity.Review;

@Repository
@Transactional
public class MybatisReviewDao implements ReviewDao {

	private ReviewDao mapper;

    @Autowired
    public MybatisReviewDao(SqlSession sqlSession) {
        mapper = sqlSession.getMapper(ReviewDao.class);
    }
	
    
	@Override
	public List<Review> getReviewList(String placeId) {
		return mapper.getReviewList(placeId);
	}

	@Override
	public Review getReview(Integer reviewId) {
		return mapper.getReview(reviewId);
	}

	@Override
	public boolean insertReview(Review review) {
		return mapper.insertReview(review);
	}

	@Override
	public boolean deleteReview(Integer reviewId) {
		return mapper.deleteReview(reviewId);
	}
	
}
