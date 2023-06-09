package com.example.tripPlanner.entity;

import java.util.List;

import lombok.Data;

@Data
public class Place {
	private String id;            // 콘텐츠ID
	private String title;         // 제목
	private String addr;          // 주소
	private String mapX;          // GPS X좌표(경도)
	private String mapY;          // GPS Y좌표(위도)
	private String image;         // 대표 이미지
	private String contentTypeId; // 콘텐츠타입ID
	private String cat1;          // 대분류
	private String cat2;          // 중분류
	private String cat3;          // 소분류
	private String areaCode;      // 지역코드
	private String sigunguCode;   // 시군구코드
	private String tel;           // 전화번호
	private Double sumScore;      // 평점 총점
	private Integer numScore;     // 평점 갯수
	private String tag;           // 태그
	
	private List<Restaurant> nearByRestaurants;       // 근처 식당 목록
	private List<Accommodation> nearByAccommodations; // 근처 숙박시설 목록
}
