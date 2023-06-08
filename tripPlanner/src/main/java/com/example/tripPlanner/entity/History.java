package com.example.tripPlanner.entity;

import lombok.Data;

@Data
public class History {
	private String placeId;            // 여행지 또는 음식점 ID
	private String placeTitle;         // 여행지 또는 음식점 Title
	private String memberId;           // 회원 ID
	private String memberNickname;     // 회원 닉네임
}
