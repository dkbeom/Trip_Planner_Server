package com.example.tripPlanner.service;

import org.springframework.http.HttpEntity;

import com.example.tripPlanner.dto.GPTQuestionDto;
import com.example.tripPlanner.dto.GptRequest;
import com.example.tripPlanner.dto.GptResponse;

public interface GPTApiService {

	HttpEntity<GptRequest> buildHttpEntity(GptRequest gptRequest);
	GptResponse getResponse(HttpEntity<GptRequest> requestHttpEntity);
	GptResponse askQuestion(GPTQuestionDto gptQuestionDto);
}