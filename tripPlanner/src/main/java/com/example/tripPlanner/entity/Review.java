package com.example.tripPlanner.entity;

import java.util.Date;

import lombok.Data;

@Data
public class Review {
	private Integer id;
	private String placeId; // 콘텐츠ID
	private String memberId;
	private String memberNickname;
	private Integer score;
	private String content;
	private Date regdate;
}
