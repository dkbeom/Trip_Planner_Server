package com.example.tripPlanner.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.tripPlanner.dao.ReviewDao;
import com.example.tripPlanner.entity.Review;

@Service
@Transactional
public class ReviewServiceImp implements ReviewService {

	@Autowired
	private ReviewDao reviewDao;

	@Autowired
	private PlaceService placeService;

	
	@Override
	public List<Review> getReviewList(String placeId) {
		return reviewDao.getReviewList(placeId);
	}
	
	@Override
	public Review getReview(Integer reviewId) {
		return reviewDao.getReview(reviewId);
	}

	@Override
	public boolean insertReview(Review review) {

		if(review.getPlaceId() == null) {
			return false;
		}
		
		// 여행지 DB에 있는 종합 평점에 반영
		placeService.scorePlace(review.getPlaceId(), review.getScore());

		return reviewDao.insertReview(review);
	}

	@Override
	public boolean deleteReview(Integer reviewId) {
		
		// 리뷰 객체 가져오기
		Review review = reviewDao.getReview(reviewId);

		// 여행지 DB에 있는 종합 평점에 반영
		placeService.cancelScore(review.getPlaceId(), review.getScore());

		return reviewDao.deleteReview(reviewId);
	}

}