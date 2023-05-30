package com.example.tripPlanner.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.tripPlanner.configuration.GPTConfig;
import com.example.tripPlanner.dto.GptRequest;
import com.example.tripPlanner.dto.GptResponse;
import com.example.tripPlanner.dto.Message;
import com.example.tripPlanner.entity.Place;

@Service
@PropertySource("classpath:local.properties")
public class GPTApiServiceImp implements GPTApiService{
	public static int cnt=0;
	@Value("${GPT_API_KEY}")
	private String API_KEY;
	
	private static RestTemplate restTemplate =new RestTemplate();
	
	public HttpEntity<GptRequest> buildHttpEntity(GptRequest gptRequest){
		HttpHeaders headers=new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType(GPTConfig.MEDIA_TYPE));
		headers.add(GPTConfig.AUTHORIZATION, GPTConfig.BEARER + API_KEY);
		return new HttpEntity<>(gptRequest,headers);
	}
	
	public GptResponse getResponse(HttpEntity<GptRequest> requestHttpEntity) {
		ResponseEntity<GptResponse> responseEntity =restTemplate.postForEntity(
				GPTConfig.URL,
				requestHttpEntity,
				GptResponse.class);
		return responseEntity.getBody();
	}

	
	public GptResponse askQuestion(List<Place> places) {
		String placestr=concatenateTitles(places);
		//String placestr=places;
		List<Message> messages = new ArrayList<>();
	    Message msg=new Message();
	    msg.setRole("user");
	    msg.setContent("나는 5박6일 여행을 갈것이고, 남자 셋, 자연관광을 좋아하고, 매운것을 잘먹어, 내가 아래에 보내주는 장소들중에서 날짜별로 나름대로 추천해줘 가나다순으로는 안 돼! "+placestr+"날짜별로 정리해서 추출해줘 하루에 3~4곳, 중복은 안 되고 장소이름만 적어 항목마다 줄넘김해서줘 "); // 전달할 content 값을 설정합니다.
	    messages.add(msg);
	    System.out.println(++cnt+"번째 시도");
		return this.getResponse(
				this.buildHttpEntity(
						new GptRequest(
								GPTConfig.MODEL,
								GPTConfig.MAX_TOKEN,
								GPTConfig.TEMPERATURE,
								GPTConfig.TOP_P,
								messages
								)));
	}


	public String concatenateTitles(List<Place> places) {
	    return places.stream()
	            .map(Place::getTitle) // Place 객체에서 title 필드 값을 가져옴
	            .collect(Collectors.joining(" ")); // 공백으로 구분하여 문자열로 연결
	}

public String[][] sendQuestion(List<Place> places) {

	String out=askQuestion(places).getChoices().get(0).getMessage().getContent();
	System.out.println(out);

	String[] lines = out.split("\n");
    List<String[]> outputList = new ArrayList<>();

    int idx=0;
    int index = 0;
    for (String line : lines) {
        if (line.endsWith(":")) {
            ++index;
            idx=0;
            outputList.add(new String[10]);
        } else if (line.startsWith("- ")) {
            line = line.substring(2);
            if (outputList.size() <= index) {
                outputList.add(new String[10]);
            }
            if (outputList.get(index)[idx] == null) {
                outputList.get(index)[idx++] = line;
            }
        }
    }

    String[][] outputArray = outputList.toArray(new String[outputList.size()][]);
    
    System.out.println("저기\n"+outputArray);
    
 
    return outputArray;
	}
}
