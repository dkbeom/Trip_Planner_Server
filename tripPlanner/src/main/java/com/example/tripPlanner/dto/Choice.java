package com.example.tripPlanner.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class Choice implements Serializable {


	private Integer index;
	private Message message;
	@JsonProperty("finish_reson")
	private String finishReason;
	
}