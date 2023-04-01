package com.example.tripPlanner.dao;

import java.util.List;

import com.example.tripPlanner.entity.Review;

public interface ReviewDao {

	List<Review> getReviewList(String placeId);
	
	Review getReview(Integer reviewId);
	
	boolean insertReview(Review review);
	
	boolean deleteReview(Integer reviewId);
}
