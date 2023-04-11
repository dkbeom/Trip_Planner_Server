package com.example.tripPlanner.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.tripPlanner.configuration.GPTConfig;
import com.example.tripPlanner.dto.GPTQuestionDto;
import com.example.tripPlanner.dto.GptRequest;
import com.example.tripPlanner.dto.GptResponse;

@Service
public class GPTApiServiceImp implements GPTApiService{
	
	private static RestTemplate restTemplate =new RestTemplate();
	
	public HttpEntity<GptRequest> buildHttpEntity(GptRequest gptRequest){
		HttpHeaders headers=new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType(GPTConfig.MEDIA_TYPE));
		headers.add(GPTConfig.AUTHORIZATION, GPTConfig.BEARER + GPTConfig.API_KEY);
		return new HttpEntity<>(gptRequest,headers);
	}
	
	public GptResponse getResponse(HttpEntity<GptRequest> requestHttpEntity) {
		ResponseEntity<GptResponse> responseEntity =restTemplate.postForEntity(
				GPTConfig.URL,
				requestHttpEntity,
				GptResponse.class);
		
		return responseEntity.getBody();
	}
	
	public GptResponse askQuestion(GPTQuestionDto gptQuestionDto) {
		return this.getResponse(
				this.buildHttpEntity(
						new GptRequest(
								GPTConfig.MODEL,
								GPTConfig.MAX_TOKEN,
								GPTConfig.TEMPERATURE,
								GPTConfig.TOP_P,
								gptQuestionDto.getMessages())));
	}
	/*
	public JSONObject getResponse(HttpEntity<GptRequest> requestHttpEntity) {
		ResponseEntity<String> responseEntity = restTemplate.postForEntity(GPTConfig.URL, requestHttpEntity, String.class);
		JSONObject body = new JSONObject(responseEntity.getBody()).getJSONArray("choices").getJSONObject(1).getJSONObject("message");
		return body;
		}

		public JSONObject askQuestion(GPTQuestionDto gptQuestionDto) {
		return this.getResponse(
		this.buildHttpEntity(
		new GptRequest(
		GPTConfig.MODEL,
		GPTConfig.MAX_TOKEN,
		GPTConfig.TEMPERATURE,
		GPTConfig.TOP_P,
		gptQuestionDto.getMessages())));
		}*/
}

