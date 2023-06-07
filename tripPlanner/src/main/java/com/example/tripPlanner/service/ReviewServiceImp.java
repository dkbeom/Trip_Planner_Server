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

	@Autowired
	private RestaurantService restaurantService;

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

		if (review.getPlaceId() == null) {
			return false;
		}

		// 음식점일 경우
		if (review.getPlaceId().startsWith("R")) {
			// 해당 음식점이 음식점 DB에 존재하지 않는 경우
			if (!restaurantService.exist(review.getPlaceId())) {
				return false;
			}
			// 음식점 DB에 있는 종합 평점에 반영
			restaurantService.scoreRestaurant(review.getPlaceId(), review.getScore());
		}
		// 여행지일 경우
		else {
			// 해당 여행지가 여행지 DB에 존재하지 않는 경우
			if (!placeService.exist(review.getPlaceId())) {
				return false;
			}
			// 여행지 DB에 있는 종합 평점에 반영
			placeService.scorePlace(review.getPlaceId(), review.getScore());
		}

		return reviewDao.insertReview(review);
	}

	@Override
	public boolean deleteReview(Integer reviewId, String memberId) {

		// 리뷰 객체 가져오기
		Review review = reviewDao.getReview(reviewId);

		if(review != null) {
			
			// 삭제하려는 리뷰의 작성자 아이디와 현재 접속한 아이디가 같다면
			if(review.getMemberId().equals(memberId)) {
				
				// 삭제하려는 리뷰가 음식점 리뷰일 경우
				if(review.getPlaceId().startsWith("R")) {
					// 음식점 DB에 있는 종합 평점에 반영
					restaurantService.cancelScore(review.getPlaceId(), review.getScore());
					return reviewDao.deleteReview(reviewId);
				}
				// 삭제하려는 리뷰가 여행지 리뷰일 경우
				else {
					// 여행지 DB에 있는 종합 평점에 반영
					placeService.cancelScore(review.getPlaceId(), review.getScore());
					return reviewDao.deleteReview(reviewId);
				}
				
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
