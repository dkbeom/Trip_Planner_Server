package com.example.tripPlanner.service;

import java.util.List;

import org.springframework.http.HttpEntity;

import com.example.tripPlanner.entity.GptRequest;
import com.example.tripPlanner.entity.GptResponse;
import com.example.tripPlanner.entity.Place;

public interface GPTApiService {

	HttpEntity<GptRequest> buildHttpEntity(GptRequest gptRequest);

	GptResponse getResponse(HttpEntity<GptRequest> requestHttpEntity);

	GptResponse askQuestion(List<Place> places, int numDays);

	String[][] sendQuestion(List<Place> places, int numDays);
}