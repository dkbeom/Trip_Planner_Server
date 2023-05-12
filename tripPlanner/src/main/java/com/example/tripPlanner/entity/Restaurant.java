package com.example.tripPlanner.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=true)
public class Restaurant extends Place {
	private Integer rank;          // 순위
	private String category;       // 소분류 카테고리
	private String detailCategory; // 상세 카테고리
	private Integer searchCount;   // 검색 건수
	
	public Restaurant(Integer rank, String title, String addr, Double mapX, Double mapY, String category, String detailCategory, Integer searchCount) {
		super.setId(title); // id: 음식점 이름
		this.rank = rank;
		super.setTitle(title);
		super.setAddr(addr);
		super.setMapX(Double.toString(mapX));
		super.setMapY(Double.toString(mapY));
		this.category = category;
		this.detailCategory = detailCategory;
		this.searchCount = searchCount;
		super.setContentTypeId("39"); // 관광타입: 음식점(39)
	}
}
