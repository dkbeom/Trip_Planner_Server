package com.example.tripPlanner.entity;

import lombok.Data;

@Data
public class Restaurant {
	
	private String id;             // id
	private Integer rank;          // 순위
	private String title;          // 제목
	private String addr;           // 주소
	private String mapX;           // GPS X좌표(경도)
	private String mapY;           // GPS Y좌표(위도)
	private String category;       // 소분류 카테고리
	private String detailCategory; // 상세 카테고리
	private Integer searchCount;   // 검색 건수
	private Double sumScore;       // 평점 총점
	private Integer numScore;      // 평점 갯수
	private Double distance;       // 떨어진 거리(km)
	
	public Restaurant() {
		
	}
	
	public Restaurant(String id, Integer rank, String title, String addr, String mapX, String mapY, String category, String detailCategory, Integer searchCount, Double distance) {
		this.id = id;
		this.rank = rank;
		this.title = title;
		this.addr = addr;
		this.mapX = mapX;
		this.mapY = mapY;
		this.category = category;
		this.detailCategory = detailCategory;
		this.searchCount = searchCount;
		this.distance = distance != null ? Math.round(distance * 100.0) / 100.0 : null;
	}
}
