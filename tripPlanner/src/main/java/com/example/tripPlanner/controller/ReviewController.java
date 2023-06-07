package com.example.tripPlanner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.entity.Member;
import com.example.tripPlanner.entity.Review;
import com.example.tripPlanner.service.MemberService;
import com.example.tripPlanner.service.ReviewService;
import com.example.tripPlanner.service.SecurityService;

@RestController
@RequestMapping("/review")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;

	@Autowired
	private SecurityService securityService;

	@Autowired
	private MemberService memberService;

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
	public String insert(@RequestBody Review review, @RequestHeader(value = "Authorization") String token) {
		// 파라미터: placeId, placeTitle, score, content

		// 개인정보 확인
		Member member = memberService.getMemberById(securityService.getSubject(token).get("id"));

		if (member != null) {
			review.setMemberId(member.getId());
			review.setMemberNickname(member.getNickname());

			boolean isInsert = reviewService.insertReview(review);

			if (isInsert) {
				return "{\"result\" : \"INSERT_SUCCESS\"}";
			} else {
				return "{\"result\" : \"INSERT_FAILURE\"}";
			}
		} else {
			return "{\"result\" : \"INSERT_FAILURE\"}";
		}
	}

	// 리뷰 DB에서 특정 리뷰 삭제
	@GetMapping("/delete")
	public String delete(Integer reviewId, @RequestHeader(value = "Authorization") String token) {

		// 개인정보 확인
		Member member = memberService.getMemberById(securityService.getSubject(token).get("id"));

		if (member != null) {

			boolean isDelete = reviewService.deleteReview(reviewId, member.getId());

			if (isDelete) {
				return "{\"result\" : \"DELETE_SUCCESS\"}";
			} else {
				return "{\"result\" : \"DELETE_FAILURE\"}";
			}
			
		} else {
			return "{\"result\" : \"DELETE_FAILURE\"}";
		}
	}
}
