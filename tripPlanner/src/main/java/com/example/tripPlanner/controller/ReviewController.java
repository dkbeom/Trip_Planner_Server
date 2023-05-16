package com.example.tripPlanner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.entity.Review;
import com.example.tripPlanner.service.ReviewService;

@RestController
@RequestMapping("/review")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;
	
	
	// 리뷰 DB에서 특정 여행지에 대한 리뷰 목록 조회
	@GetMapping("/list")
	public List<Review> list(String placeId) {
		return reviewService.getReviewList(placeId);
	}
	
	// 리뷰 DB에서 특정 리뷰 조회
	@GetMapping("/detail")
	public Review detail(Integer reviewId) {
		return reviewService.getReview(reviewId);
	}
	
	// 리뷰 DB에 리뷰 하나 삽입
	@PostMapping("/insert")
	public String insert(@RequestBody Review review) {
		// 파라미터: placeId, memberId, memberNickname, score, content
		
		boolean isInsert = reviewService.insertReview(review);
		
		if(isInsert) {
			return "{\"result\" : \"INSERT_SUCCESS\"}";
		} else {
			return "{\"result\" : \"INSERT_FAILURE\"}";
		}
	}
	
	// 리뷰 DB에서 특정 리뷰 삭제
	@GetMapping("/delete")
	public String delete(Integer reviewId) {
		
		boolean isDelete = reviewService.deleteReview(reviewId);
		
		if(isDelete) {
			return "{\"result\" : \"DELETE_SUCCESS\"}";
		} else {
			return "{\"result\" : \"DELETE_FAILURE\"}";
		}
	}
}
