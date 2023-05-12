package com.example.tripPlanner.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GptRequest implements Serializable{


	private String model;
	//private String prompt;
	@JsonProperty("max_tokens")
	private Integer maxTokens;
	private double temperature;
	@JsonProperty("top_p")
	private Double topP;
	private List<Message> messages;
	 //추가
}
