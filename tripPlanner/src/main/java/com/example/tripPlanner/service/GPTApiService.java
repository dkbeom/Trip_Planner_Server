package com.example.tripPlanner.service;

import java.util.List;

import org.springframework.http.HttpEntity;

import com.example.tripPlanner.dto.GptQuestionDto;
import com.example.tripPlanner.dto.GptRequest;
import com.example.tripPlanner.dto.GptResponse;
import com.example.tripPlanner.entity.Place;

public interface GPTApiService {

	HttpEntity<GptRequest> buildHttpEntity(GptRequest gptRequest);
	GptResponse getResponse(HttpEntity<GptRequest> requestHttpEntity);
	GptResponse askQuestion(List<Place> places);
	String[][] sendQuestion(List<Place> places);
	}
