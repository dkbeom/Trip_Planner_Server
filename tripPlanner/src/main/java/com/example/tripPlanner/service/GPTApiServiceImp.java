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
	
//	public GptResponse askQuestion(String places){//List<Place> places) {
//		//String placestr=concatenateTitles(places);
//		String placestr=places;
//		List<Message> messages = new ArrayList<>();
//	    Message msg=new Message();
//	    msg.setRole("user");
//	    msg.setContent("나는 2박3일 여행이고 남자 셋, 자연관광을 좋아하고, 매운것을 못먹어, 내가 아래에 보내주는 장소들중에서 별점과 시간 테마를 고려해서 날짜별로 추천해줘 "+placestr+"날짜별로 정리해서 추출해줘 중복은 안 돼!"); // 전달할 content 값을 설정합니다.
//	    messages.add(msg);
//	    System.out.println("여기까지");
//		return this.getResponse(
//				this.buildHttpEntity(
//						new GptRequest(
//								GPTConfig.MODEL,
//								GPTConfig.MAX_TOKEN,
//								GPTConfig.TEMPERATURE,
//								GPTConfig.TOP_P,
//								messages
//								)));
//	}
	public GptResponse askQuestion(String places){//List<Place> places) {
		//String placestr=concatenateTitles(places);
		String placestr=places;
		List<Message> messages = new ArrayList<>();
	    Message msg=new Message();
	    msg.setRole("user");
	    msg.setContent("나는 2박3일 여행을 갈것이고, 남자 셋, 자연관광을 좋아하고, 매운것을 잘먹어, 내가 아래에 보내주는 장소들중에서 날짜별로 추천해줘 "+placestr+"날짜별로 정리해서 추출해줘 중복은 안 되고 장소이름만 적어 예를 들어 1일차 에 A,B,C 2일차에 D,E,F 장소가 있다면 A, B, C \n D, E,F "); // 전달할 content 값을 설정합니다.
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

public List<List<String>> sendQuestion(){//List<Place> places) {
	String places= "홍천 아로마 허브동산\r\n"
			+ "원조뚝배기식당\r\n"
			+ "매화산(강원)\r\n"
			+ "석보군묘각\r\n"
			+ "잠수교집 성수점\r\n"
			+ "이태백캠핑장\r\n"
			+ "안흥식당\r\n"
			+ "충주세계무술박물관\r\n"
			+ "고암이응노생가기념관\r\n"
			+ "월하이태극문학관\r\n"
			+ "석수체육공원\r\n"
			+ "아르떼 물들이다\r\n"
			+ "프롤라\r\n"
			+ "충주 라바랜드\r\n"
			+ "담원두부마을\r\n"
			+ "문암생태공원\r\n"
			+ "문암생태공원캠핑장\r\n"
			+ "신광사(세종)\r\n"
			+ "미식가\r\n"
			+ "늘푸른솔\r\n"
			+ "고북신송지\r\n"
			+ "고복저택\r\n"
			+ "슬랙\r\n"
			+ "평동전통떡마을\r\n"
			+ "에뜨왈\r\n"
			+ "오송호수공원\r\n"
			+ "서울대공원산림욕장\r\n"
			+ "뚝섬 전망 문화 콤플렉스\r\n"
			+ "2023 보드게임콘\r\n"
			+ "2022 보드게임페스타\r\n"
			+ "2023 서울릴랙스위크\r\n"
			+ "오감을 자극하는 감각적인 체험여행\r\n"
			+ "황학동캠핑장\r\n"
			+ "만나카페\r\n"
			+ "충주농수산물도매시장(충주시농수산물도매시장)\r\n"
			+ "대왕해물손칼국수\r\n"
			+ "청학동한식전문점\r\n"
			+ "아로마라이프\r\n"
			+ "장산모텔\r\n"
			+ "충북학생교육문화원\r\n"
			+ "매화쌈밥 광명점\r\n"
			+ "H호텔 세종시티\r\n"
			+ "다낭\r\n"
			+ "글로우\r\n"
			+ "탄금대 왕갈비탕\r\n"
			+ "아델라베일리\r\n"
			+ "봄날\r\n"
			+ "예산 임존성\r\n"
			+ "빵명장\r\n"
			+ "송계옥 성수점\r\n"
			+ "산모퉁이\r\n"
			+ "이씨식당충주점\r\n"
			+ "카페 이페메라 LCDC SEOUL\r\n"
			+ "하방 생태습지\r\n"
			+ "바다펜션\r\n"
			+ "송계서원\r\n"
			+ "오렌즈 상암 DMC\r\n"
			+ "홍주향교\r\n"
			+ "벳소캠프\r\n"
			+ "혜화1938 [한국관광 품질인증/Korea Quality]\r\n"
			+ "상암동MBC신사옥미디어센터\r\n"
			+ "쌍류포도정원협동조합\r\n"
			+ "언약\r\n"
			+ "괴산 트리하우스 가든\r\n"
			+ "로얄링스CC(현대더링스CC)\r\n"
			+ "서울시대공원자연캠프장\r\n"
			+ "원두막\r\n"
			+ "청계천박물관\r\n"
			+ "진두강한방민물장어\r\n"
			+ "태안해안국립공원\r\n"
			+ "호랑도\r\n"
			+ "신가네왕코등갈비 용두동\r\n"
			+ "수달연구센터\r\n"
			+ "횡성자연휴양림\r\n"
			+ "THATS CAMPING 횡성자연휴양림야영장\r\n"
			+ "달이카페\r\n"
			+ "서울무역전시컨벤션센터(SETEC)\r\n"
			+ "디지털 파빌리온\r\n"
			+ "신안골분식\r\n"
			+ "비파해물칼국수\r\n"
			+ "한채당 한옥체험관 [한국관광 품질인증/Korea Quality]\r\n"
			+ "용암골가든\r\n"
			+ "홍성 홍주의사총\r\n"
			+ "횡성 루지체험장\r\n"
			+ "카페재생\r\n"
			+ "마장갈비\r\n"
			+ "대련사\r\n"
			+ "대추나무집\r\n"
			+ "강릉동치미막국수과천점\r\n"
			+ "그리심 글램핑장\r\n"
			+ "리틀그레이프\r\n"
			+ "구름포해수욕장카라반\r\n"
			+ "글램핑클럽레스피아 in 태안\r\n"
			+ "햇살아래캠핑장\r\n"
			+ "구름포해수욕장\r\n"
			+ "듀레베이커리 테크노폴리스점\r\n"
			+ "스페이스 모다[한국관광 품질인증/Korea Quality]\r\n"
			+ "한옥스테이 언니집[한국관광 품질인증/Korea Quality]\r\n"
			+ "에브리선데이 본점\r\n"
			+ "위드쿠잉\r\n"
			+ "내포기사식당\r\n"
			+ "전주밥상\r\n"
			+ "호수길133\r\n"
			+ "꿀벌랜드\r\n"
			+ "롯데마트_충주점\r\n"
			+ "홍성 오관리 당간지주\r\n"
			+ "의항해수욕장\r\n"
			+ "상상초월 돼지갈비\r\n"
			+ "올리브영 충주터미널\r\n"
			+ "도가네매운탕(도가네)\r\n"
			+ "홍성한우미당\r\n"
			+ "고복자연공원\r\n"
			+ "연기대첩비공원\r\n"
			+ "한국잠사박물관(청주)\r\n"
			+ "회랑정\r\n"
			+ "들꽃이야기\r\n"
			+ "숲속장수촌\r\n"
			+ "충주자연생태체험관\r\n"
			+ "아트빈\r\n"
			+ "롯데마트_홍성점\r\n"
			+ "연기향토박물관\r\n"
			+ "제 10회 서울국제불교박람회\r\n"
			+ "제7회 베지노믹스페어 비건페스타\r\n"
			+ "소롯길\r\n"
			+ "노룬산골목시장\r\n"
			+ "홍성전통시장 오일장(홍성5일정기시장)\r\n"
			+ "다래목장\r\n"
			+ "홍성장 (1, 6일)\r\n"
			+ "올리브영 뚝섬유원지역\r\n"
			+ "CS프리미어관광호텔\r\n"
			+ "프레피\r\n"
			+ "카페까망\r\n"
			+ "70년소머리국밥\r\n"
			+ "청계천 자전거도로\r\n"
			+ "명문막국수\r\n"
			+ "조양문\r\n"
			+ "밀리앤코카페\r\n"
			+ "국시집\r\n"
			+ "옥천암(서울)\r\n"
			+ "하우스하이드\r\n"
			+ "제주도화\r\n"
			+ "괴산 보안사 삼층석탑\r\n"
			+ "보안사(괴산)\r\n"
			+ "보안사 석조여래좌상\r\n"
			+ "입이즐거운그만두 본점\r\n"
			+ "라티에라테라스 골프빌리지\r\n"
			+ "[백년가게]동해루\r\n"
			+ "터줏골명가\r\n"
			+ "홍주아문\r\n"
			+ "봉파레트\r\n"
			+ "홍주성 천년여행길\r\n"
			+ "홍성 역사인물축제\r\n"
			+ "안회당과 여하정\r\n"
			+ "SK하이닉스 문화센터\r\n"
			+ "내당한우\r\n"
			+ "세디치\r\n"
			+ "하이마트 율량점\r\n"
			+ "한강\r\n"
			+ "올림픽기념국민생활관\r\n"
			+ "2022 제9회 라틴아메리카축제\r\n"
			+ "한국영상자료원\r\n"
			+ "율량반점\r\n"
			+ "홍주성역사관(홍성)\r\n"
			+ "구학리산채관광마을\r\n"
			+ "청춘식당\r\n"
			+ "원성 성남리 성황림\r\n"
			+ "호텔 필림37.2[한국관광 품질인증/Korea Quality]\r\n"
			+ "갱매폭포\r\n"
			+ "지영옥청국장\r\n"
			+ "미조리 스시\r\n"
			+ "올리브영 상암MBC\r\n"
			+ "인생한우\r\n"
			+ "일번지순대국\r\n"
			+ "홍양저수지(빼뽀저수지)\r\n"
			+ "보문사(서울)\r\n"
			+ "홍성 홍주읍성\r\n"
			+ "국계서원\r\n"
			+ "북정마을\r\n"
			+ "충주그랜드관광호텔\r\n"
			+ "장암 정호 묘소\r\n"
			+ "치악신림오토캠핑장\r\n"
			+ "실희원\r\n"
			+ "가든포레스트\r\n"
			+ "써니힐글램핑\r\n"
			+ "롯데마트 서청주점\r\n"
			+ "K2 롯데청주\r\n"
			+ "나이키롯데청주\r\n"
			+ "K2 롯데청주\r\n"
			+ "코오롱스포츠 롯데청주\r\n"
			+ "블랙야크 롯데청주\r\n"
			+ "노스페이스 롯데청주\r\n"
			+ "SI 보브 롯데청주\r\n"
			+ "휠라 롯데청주\r\n"
			+ "블랙야크 롯데청주\r\n"
			+ "휠라 롯데청주\r\n"
			+ "롯데하이마트 서청주점\r\n"
			+ "코오롱 스포츠 롯데청주\r\n"
			+ "레노마수트 롯데 청주점\r\n"
			+ "노스페이스 롯데청주\r\n"
			+ "나이키 롯데청주";
	String out=askQuestion(places).getChoices().get(0).getMessage().getContent();
	System.out.println(out);

    String[] items = out.split("\n");
    List<List<String>> schedules = new ArrayList<>();
    for (String item : items) {
        String[] arr = item.split(": ");
        List<String> schedule = Arrays.asList(arr[1].split(", "));
        schedules.add(schedule);
    }

    System.out.println(schedules);
    return schedules;
}
}

// messages=[Message(role=user, content=안녕하세요~)])
//{
//	   "messages" : [{
//	       "role" : "user",
//	       "content" : "여행계획짜줘줘"
//	   }]
//	}
//PLACE랑 같이 호출되면 PALCE에서 title만 뽑아서 String으로 변수에담고
//+여행 성향 합쳐서 요청 보내기!

