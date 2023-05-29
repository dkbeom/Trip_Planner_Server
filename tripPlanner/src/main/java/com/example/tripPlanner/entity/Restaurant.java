package com.example.tripPlanner.entity;

import lombok.Data;

@Data
//@EqualsAndHashCode(callSuper=true)
public class Restaurant {
//	private Integer rank;          // 순위
//	private String category;       // 소분류 카테고리
//	private String detailCategory; // 상세 카테고리
//	private Integer searchCount;   // 검색 건수
//	
//	public Restaurant(Integer rank, String title, String addr, String mapX, String mapY, String category, String detailCategory, Integer searchCount) {
//		super.setId(title); // id: 음식점 이름
//		this.rank = rank;
//		super.setTitle(title);
//		super.setAddr(addr);
//		super.setMapX(mapX);
//		super.setMapY(mapY);
//		this.category = category;
//		this.detailCategory = detailCategory;
//		this.searchCount = searchCount;
//		super.setContentTypeId("39"); // 관광타입: 음식점(39)
//	}
	
	private Integer rank;          // 순위
	private String title;          // 제목
	private String addr;           // 주소
	private String mapX;           // GPS X좌표(경도)
	private String mapY;           // GPS Y좌표(위도)
	private String category;       // 소분류 카테고리
	private String detailCategory; // 상세 카테고리
	private Integer searchCount;   // 검색 건수
	private Double distance;       // 떨어진 거리(km)
	private Double sumScore;       // 평점 총점
	private Integer numScore;      // 평점 갯수
	
	public Restaurant(Integer rank, String title, String addr, String mapX, String mapY, String category, String detailCategory, Integer searchCount, Double distance) {
		this.rank = rank;
		this.title = title;
		this.addr = addr;
		this.mapX = mapX;
		this.mapY = mapY;
		this.category = category;
		this.detailCategory = detailCategory;
		this.searchCount = searchCount;
		this.distance = Math.round(distance * 100.0) / 100.0;
	}
}
