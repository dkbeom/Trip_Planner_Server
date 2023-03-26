package com.example.tripPlanner.entity;

import lombok.Data;

@Data
public class Place {
	private String id;
	private String title;
	private String addr;
	private String mapX;
	private String mapY;
	private String image;
	private String contentTypeId;
	private String cat1;
	private String cat2;
	private String cat3;
}
