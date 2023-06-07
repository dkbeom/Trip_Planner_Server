package com.example.tripPlanner.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Choice implements Serializable {


	private Integer index;
	private Message message;
	@JsonProperty("finish_reson")
	private String finishReason;
	
}