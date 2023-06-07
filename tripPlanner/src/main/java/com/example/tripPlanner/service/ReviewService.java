package com.example.tripPlanner.service;

import java.util.List;

import com.example.tripPlanner.entity.Review;

public interface ReviewService {
	
	List<Review> getReviewList(String placeId);
	
	Review getReview(Integer reviewId);
	
	boolean insertReview(Review review);
	
	boolean deleteReview(Integer reviewId, String memberId);
}
