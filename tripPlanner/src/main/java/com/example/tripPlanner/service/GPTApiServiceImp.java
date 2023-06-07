package com.example.tripPlanner.service;

import java.util.ArrayList;
import java.util.Collections;
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

	
	public GptResponse askQuestion(List<Place> places,int numDays){//,int date, String[] tend){
		int placenum=places.size();
		for(int i=0;i<10;i++)
		Collections.shuffle(places);
		
		System.out.println("장소개수 : "+placenum);
		String placestr=concatenateTitles(places);
		String[] tend={"매운거","걷는거","단거","움직이는거"};
		String 중복="중복은 안 되고 ";
		String dates= (numDays-1)+"박"+numDays+"일";
//		if(date*5>placenum) { // 기간동안에 갈 만한 여행지의 수가 부족할때!
//			 중복="";
//		}
		String 성향=tend[0]+"랑 "+tend[1]+"을 좋아하고"+tend[2]+"랑 "+tend[3]+"을 싫어해";
		
		List<Message> messages = new ArrayList<>(); 
	    Message msg=new Message();
	    msg.setRole("user");
	    msg.setContent("나는 "+dates+" 여행을 갈것이고,"+성향+" 내가 아래에 보내주는 장소들중에서 날짜별로 사람들이 많이가는 곳 위주로 추천해줘 도서관같은 여행에 어긋나는 장소는 빼고 각 첫글자 초성이 골고루 나오도록 해줘 !"
	    		+ " ("+placestr+")날짜별로 정리해서 추출해줘 하루에 3~5곳, "+중복+" 장소이름만 적어 표로정리해줘 "); // 전달할 content 값을 설정합니다.
	    System.out.println(msg.getContent());
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
	            .collect(Collectors.joining(",")); // 공백으로 구분하여 문자열로 연결
	}

public String[][] sendQuestion(List<Place> places) {
	int numDays=3;
	String out=askQuestion(places,numDays).getChoices().get(0).getMessage().getContent();
	System.out.println(out);
    String[] lines = out.split("\n");
    //int numDays = lines.length - 2; // 일정의 날짜 수 (첫 번째 줄과 구분선 제외)
    String[][] travelSchedule = new String[numDays][];



    for (int i = 2; i < numDays+2; i++) {
        String[] parts = lines[i].split("\\|");
        String[] place = parts[1].trim().split(",");
        int numPlaces = place.length;

        travelSchedule[i - 2] = new String[numPlaces];
        for (int j = 0; j < numPlaces; j++) {
            travelSchedule[i - 2][j] = place[j].trim();
        }
    }

    System.out.println("저기\n");
    for (int i = 0; i < numDays; i++) {
        for (int j = 0; j < travelSchedule[i].length; j++) {
            System.out.println(travelSchedule[i][j]);
        }
        System.out.println();
    }
    
 
    return  travelSchedule;
	}

}
