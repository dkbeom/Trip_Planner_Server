package com.example.tripPlanner.dto;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class GptQuestionDto implements Serializable{
	 //private String message;
	 private List<Message> messages;
}
