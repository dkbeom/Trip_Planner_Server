package com.example.tripPlanner.entity;

import lombok.Data;

@Data
public class TourApiParam {
	private String currentX;      // 현재 x좌표
	private String currentY;      // 현재 y좌표
	private String mapX;          // 위치기반 관광정보 조회: x좌표
	private String mapY;          // 위치기반 관광정보 조회: y좌표
	private Integer radius;       // 위치기반 관광정보 조회: 거리반경(미터 단위)
	private String keyword;       // 키워드 검색 조회: 키워드
	private String area;          // 지역 영문명(전국 음식점 엑셀 시트에 표시된 이름)
	private String areaName;      // 지역 이름(시 단위)
	private String sigunguName;   // 시군구 이름(군,구 단위)
	private String contentTypeId; // 관광타입 ID
	private String cat1;          // 대분류
	private String cat2;          // 중분류
	private String cat3;          // 소분류
}
