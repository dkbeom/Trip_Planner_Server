package com.example.tripPlanner.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Message implements Serializable {
	
	private String role;
	private String content;


	

	
	
}