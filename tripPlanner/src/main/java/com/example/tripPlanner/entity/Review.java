package com.example.tripPlanner.entity;
 
import java.util.Date;

import lombok.Data;

@Data
public class Review {
	private Integer id;     // 시퀀스 번호
	private String placeId; // placeId 또는 restaurantId
	private String memberId;
	private String memberNickname;
	private Integer score;
	private String content;
	private String tag;     // 태그
	private Date regdate;
}
