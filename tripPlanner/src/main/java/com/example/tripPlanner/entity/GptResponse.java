package com.example.tripPlanner.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class GptResponse implements Serializable {

//	private String id;
//	private String object;
//	private LocalDate created;
//	private String model;
	private List<Choice> choices;

}
/*
 * { "messages": [{ "role": "user", "content": "안녕하세요~" }] }
 */