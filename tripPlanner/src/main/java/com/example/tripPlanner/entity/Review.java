package com.example.tripPlanner.entity;
 
import java.util.Date;

import lombok.Data;

@Data
public class Review {
	private Integer id;        // 시퀀스 번호
	private String placeId;    // placeId 또는 restaurantId
	private String placeTitle; // 장소 이름
	private String memberId;
	private String memberNickname;
	private Integer score;
	private String content;
	private Date regdate;
}
