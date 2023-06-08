package com.example.tripPlanner.service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.tripPlanner.entity.Accommodation;
import com.example.tripPlanner.entity.Area;
import com.example.tripPlanner.entity.Category;
import com.example.tripPlanner.entity.Place;

@Service
@PropertySource("classpath:local.properties")
public class TourApiServiceImp implements TourApiService {

	@Value("${TOUR_API_KEY}")
	private String tourApiKey;

	/////////////////////////////////////////////////////////////////////////

	@Override
	public Map<String, Object> getItemListAndNumOfRows(String uriString) {
		
		try {
			
			URI uri = new URI(uriString);
			
			// RestTemplate 생성
			RestTemplate restTemplate = new RestTemplate();

			// api 호출
			ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);

			// response body
			JSONObject body = new JSONObject(responseEntity.getBody()).getJSONObject("response").getJSONObject("body");

			// item 갯수
			Integer numOfRows = (Integer) body.get("numOfRows");

			// item 배열
			JSONArray item = null;
			if (numOfRows > 0) {
				item = body.getJSONObject("items").getJSONArray("item");
			}
			
			Map<String,Object> itemsAndNumOfRows = new HashMap<>();
			itemsAndNumOfRows.put("numOfRows", numOfRows);
			itemsAndNumOfRows.put("item", item);
			
			return itemsAndNumOfRows;
			
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	/////////////////////////////////////////////////////////////////////////
	
	@Override
	public List<Place> getKeywordPlaceList(String keyword) {
		return getKeywordPlaceList(keyword, "", "", "", "", "");
	}

	@Override
	public List<Place> getKeywordPlaceList(String keyword, String areaCode) {
		return getKeywordPlaceList(keyword, areaCode, "", "", "", "");
	}

	@Override
	public List<Place> getKeywordPlaceList(String keyword, String areaCode, String sigunguCode) {
		return getKeywordPlaceList(keyword, areaCode, sigunguCode, "", "", "");
	}

	@Override
	public List<Place> getKeywordPlaceList(String keyword, String areaCode, String sigunguCode, String cat1) {
		return getKeywordPlaceList(keyword, areaCode, sigunguCode, cat1, "", "");
	}

	@Override
	public List<Place> getKeywordPlaceList(String keyword, String areaCode, String sigunguCode, String cat1,
			String cat2) {
		return getKeywordPlaceList(keyword, areaCode, sigunguCode, cat1, cat2, "");
	}

	@Override
	public List<Place> getKeywordPlaceList(String keyword, String areaCode, String sigunguCode, String cat1,
			String cat2, String cat3) {

		try {

			String urlEncodedKeyword = URLEncoder.encode(keyword, "UTF-8");

			String uriString = "https://apis.data.go.kr/B551011/KorService1/searchKeyword1"
							+ "?serviceKey=" + tourApiKey
							+ "&MobileApp=AppTest&MobileOS=ETC&pageNo=1&numOfRows=200&listYN=Y&_type=json"
							+ "&keyword=" + urlEncodedKeyword
							+ "&cat1=" + cat1
							+ "&cat2=" + (cat1 != null && cat2 != null && cat2.length() >= 5 && cat1.equals(cat2.substring(0, 2)) ? cat2 : "")
							+ "&cat3=" + (cat2 != null && cat3 != null && cat3.length() >= 9 && cat2.equals(cat3.substring(0, 4)) ? cat3 : "")
							+ "&areaCode=" + areaCode
							+ "&sigunguCode=" + (areaCode == null || areaCode.equals("") ? "" : sigunguCode);

			Map<String, Object> itemsAndNumOfRows = getItemListAndNumOfRows(uriString);
			
			// List<Place> 생성
			List<Place> placeList = new ArrayList<>();
			if(itemsAndNumOfRows != null) {
				for (int i = 0; i < (Integer)itemsAndNumOfRows.get("numOfRows"); i++) {
					JSONObject eachItem = (JSONObject) ((JSONArray)itemsAndNumOfRows.get("item")).get(i);
					// 쇼핑, 음식, 숙박 제외
					if(!((String)eachItem.get("cat1")).equals("A04") && !((String)eachItem.get("cat1")).equals("A05") && !((String)eachItem.get("cat1")).equals("B02")) {
						Place place = new Place();
						place.setId((String) eachItem.get("contentid"));
						place.setTitle((String) eachItem.get("title"));
						place.setAddr((String) eachItem.get("addr1"));
						place.setMapX((String) eachItem.get("mapx"));
						place.setMapY((String) eachItem.get("mapy"));
						place.setImage((String) eachItem.get("firstimage"));
						place.setContentTypeId((String) eachItem.get("contenttypeid"));
						place.setCat1((String) eachItem.get("cat1"));
						place.setCat2((String) eachItem.get("cat2"));
						place.setCat3((String) eachItem.get("cat3"));
						place.setAreaCode((String) eachItem.get("areacode"));
						place.setSigunguCode((String) eachItem.get("sigungucode"));
						place.setTel((String) eachItem.get("tel"));
						placeList.add(place);
					}
				}
			}

			return placeList;

		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}

		return null;
	}

	/////////////////////////////////////////////////////////////////////////

	@Override
	public Map<String, String> getAreaCode(String areaName) {
		return getAreaCode(areaName, "");
	}

	@Override
	public Map<String, String> getAreaCode(String areaName, String sigunguName) {

		String uriString = "http://apis.data.go.kr/B551011/KorService1/areaCode1"
							+"?serviceKey="+tourApiKey
							+"&numOfRows=200&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json"
							+"&areaCode=";

		String areaCode = "";
		String sigunguCode = "";
		
		Map<String, Object> itemsAndNumOfRows1 = getItemListAndNumOfRows(uriString);
		
		if(itemsAndNumOfRows1 != null) {
			for (int i = 0; i < (Integer)itemsAndNumOfRows1.get("numOfRows"); i++) {
				JSONObject eachItem = (JSONObject) ((JSONArray)itemsAndNumOfRows1.get("item")).get(i);
				if(((String)eachItem.get("name")).equals(areaName)) {
					areaCode = (String)eachItem.get("code");
				}
			}
			// 지역코드(areaCode)가 존재한다면
			if(!areaCode.equals("")) {
				Map<String, Object> itemsAndNumOfRows2 = getItemListAndNumOfRows(uriString+areaCode);
				if(itemsAndNumOfRows2 != null) {
					for (int i = 0; i < (Integer)itemsAndNumOfRows2.get("numOfRows"); i++) {
						JSONObject eachItem = (JSONObject) ((JSONArray)itemsAndNumOfRows2.get("item")).get(i);
						if(((String)eachItem.get("name")).equals(sigunguName)) {
							sigunguCode = (String)eachItem.get("code");
							break;
						}
					}
				}
			}
		}
		
		Map<String, String> areaCodeMap = new HashMap<>();
		areaCodeMap.put("areaCode", areaCode);
		areaCodeMap.put("sigunguCode", sigunguCode);
		
		return areaCodeMap;
	}
	
	/////////////////////////////////////////////////////////////////////////
	
	@Override
	public String getAreaName(String areaCode) {
		
		String uriString = "http://apis.data.go.kr/B551011/KorService1/areaCode1"
				+"?serviceKey="+tourApiKey
				+"&numOfRows=200&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json";

		String areaName = "";

		Map<String, Object> itemsAndNumOfRows = getItemListAndNumOfRows(uriString);

		if(itemsAndNumOfRows != null) {
			for (int i = 0; i < (Integer)itemsAndNumOfRows.get("numOfRows"); i++) {
				JSONObject eachItem = (JSONObject) ((JSONArray)itemsAndNumOfRows.get("item")).get(i);
				if(((String)eachItem.get("code")).equals(areaCode)) {
					areaName = (String)eachItem.get("name");
					break;
				}
			}
		}
		
		return areaName;
	}

	/////////////////////////////////////////////////////////////////////////

	@Override
	public List<Place> getLocationPlaceList(String mapX, String mapY) {
		return getLocationPlaceList(mapX, mapY, 50000, "");
	}

	@Override
	public List<Place> getLocationPlaceList(String mapX, String mapY, Integer radius) {
		return getLocationPlaceList(mapX, mapY, radius, "");
	}

	@Override
	public List<Place> getLocationPlaceList(String mapX, String mapY, Integer radius, String contentTypeId) {

		String uriString = "https://apis.data.go.kr/B551011/KorService1/locationBasedList1"
				+ "?serviceKey="+ tourApiKey
				+ "&MobileOS=ETC&MobileApp=AppTest&listYN=Y&_type=json&numOfRows=200&pageNo=1"
				+ "&mapX=" + mapX + "&mapY=" + mapY + "&radius=" + radius
				+ "&contentTypeId=" + contentTypeId;
		
		Map<String, Object> itemsAndNumOfRows = getItemListAndNumOfRows(uriString);

		// List<Place> 생성
		List<Place> placeList = new ArrayList<>();
		if(itemsAndNumOfRows != null) {
			for (int i = 0; i < (Integer)itemsAndNumOfRows.get("numOfRows"); i++) {
				JSONObject eachItem = (JSONObject) ((JSONArray)itemsAndNumOfRows.get("item")).get(i);
				// 쇼핑, 음식, 숙박 제외
				if(!((String)eachItem.get("cat1")).equals("A04") && !((String)eachItem.get("cat1")).equals("A05") && !((String)eachItem.get("cat1")).equals("B02")) {
					Place place = new Place();
					place.setId((String) eachItem.get("contentid"));
					place.setTitle((String) eachItem.get("title"));
					place.setAddr((String) eachItem.get("addr1"));
					place.setMapX((String) eachItem.get("mapx"));
					place.setMapY((String) eachItem.get("mapy"));
					place.setImage((String) eachItem.get("firstimage"));
					place.setContentTypeId((String) eachItem.get("contenttypeid"));
					place.setCat1((String) eachItem.get("cat1"));
					place.setCat2((String) eachItem.get("cat2"));
					place.setCat3((String) eachItem.get("cat3"));
					place.setAreaCode((String) eachItem.get("areacode"));
					place.setSigunguCode((String) eachItem.get("sigungucode"));
					place.setTel((String) eachItem.get("tel"));
					placeList.add(place);
				}
			}
		}

		return placeList;
	}

	/////////////////////////////////////////////////////////////////////////

	@Override
	public List<Category> getCategoryList() {
		return getCategoryList("", "", "");
	}

	@Override
	public List<Category> getCategoryList(String cat1) {
		return getCategoryList(cat1, "", "");
	}

	@Override
	public List<Category> getCategoryList(String cat1, String cat2) {
		return getCategoryList(cat1, cat2, "");
	}

	@Override
	public List<Category> getCategoryList(String cat1, String cat2, String cat3) {

		String uriString = "https://apis.data.go.kr/B551011/KorService1/categoryCode1"
				+ "?serviceKey=" + tourApiKey
				+ "&numOfRows=500&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json"
				+ "&cat1=" + cat1
				+ "&cat2=" + (cat1 != null && cat2 != null && cat2.length() >= 5 && cat1.equals(cat2.substring(0, 2)) ? cat2 : "")
				+ "&cat3=" + (cat2 != null && cat3 != null && cat3.length() >= 9 && cat2.equals(cat3.substring(0, 4)) ? cat3 : "");
		
		Map<String, Object> itemsAndNumOfRows = getItemListAndNumOfRows(uriString);

		// List<Category> 생성
		List<Category> categoryList = new ArrayList<>();
		if(itemsAndNumOfRows != null) {
			for (int i = 0; i < (Integer)itemsAndNumOfRows.get("numOfRows"); i++) {
				JSONObject eachItem = (JSONObject) ((JSONArray)itemsAndNumOfRows.get("item")).get(i);
				Category category = new Category();
				category.setCode((String) eachItem.get("code"));
				category.setName((String) eachItem.get("name"));
				category.setRnum((Integer) eachItem.get("rnum"));
				category.setDepth((int) (Math.log(category.getCode().length() - 1) / Math.log(2)));
				categoryList.add(category);
			}
		}

		return categoryList;
	}
	
	/////////////////////////////////////////////////////////////////////////

	@Override
	public List<Place> getAreaBasedPlaceList(Area[] areas, Integer travelDuration) {
		return getAreaBasedPlaceList(areas, new String[]{"A01", "A02", "A03", "C01"}, travelDuration);
	}

	@Override
	public List<Place> getAreaBasedPlaceList(Area[] areas, String[] categories, Integer travelDuration) {
		
		String uriString = "";
		
		Map<String, String> areaCodeMap = new HashMap<>();
		Map<String, Object> itemsAndNumOfRows = new HashMap<>();
		
		// List<Place> 생성
		List<Place> placeList = new ArrayList<>();
		
		// 숙소 리스트
		List<Accommodation> accommodationList = new ArrayList<>();
		
		for(Area area : areas) {
			areaCodeMap = getAreaCode(area.getAreaName() , area.getSigunguName());
			if(areaCodeMap != null) {
				uriString = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1"
						+ "?serviceKey=" + tourApiKey
						+ "&MobileApp=AppTest&MobileOS=ETC&pageNo=1&numOfRows=100&listYN=Y&_type=json&arrange=A"
						+ "&areaCode=" + areaCodeMap.get("areaCode")
						+ "&sigunguCode=" + (areaCodeMap.get("areaCode") == null || areaCodeMap.get("areaCode").equals("") ? "" : areaCodeMap.get("sigunguCode"));
				
				itemsAndNumOfRows = getItemListAndNumOfRows(uriString);
				
				if(itemsAndNumOfRows != null) {
					for (int i = 0; i < (Integer)itemsAndNumOfRows.get("numOfRows"); i++) {
						JSONObject eachItem = (JSONObject) ((JSONArray)itemsAndNumOfRows.get("item")).get(i);
						// 쇼핑, 음식, 추천코스 제외
						if(!((String)eachItem.get("cat1")).equals("A04") && !((String)eachItem.get("cat1")).equals("A05") && !((String)eachItem.get("cat1")).equals("C01")) {
							
							// 해당 여행지가 숙박(B02)인 경우
							if(((String)eachItem.get("cat1")).equals("B02")) {
								Accommodation accommodation = new Accommodation();
								accommodation.setId((String) eachItem.get("contentid"));
								accommodation.setTitle((String) eachItem.get("title"));
								accommodation.setAddr((String) eachItem.get("addr1"));
								accommodation.setMapX((String) eachItem.get("mapx"));
								accommodation.setMapY((String) eachItem.get("mapy"));
								accommodation.setImage((String) eachItem.get("firstimage"));
								accommodation.setContentTypeId((String) eachItem.get("contenttypeid"));
								accommodation.setCat1((String) eachItem.get("cat1"));
								accommodation.setCat2((String) eachItem.get("cat2"));
								accommodation.setCat3((String) eachItem.get("cat3"));
								accommodation.setAreaCode((String) eachItem.get("areacode"));
								accommodation.setSigunguCode((String) eachItem.get("sigungucode"));
								accommodation.setTel((String) eachItem.get("tel"));
								accommodationList.add(accommodation);
							}
							// 해당 여행지가 자연(A01), 인문(A02), 레포츠(A03) 중 하나일 경우
							else {
								boolean isMatch = false;
								
								// categories가 비어있을 경우
								if(categories.length <= 0) {
									isMatch = true;
								}
								// categories가 비어있지 않은 경우
								else {
									// 해당 여행지가 categories에 포함되는지 확인
									for(String category : categories) {
										if(category.equals((String)eachItem.get("cat1"))) {
											isMatch = true;
											break;
										}
									}
								}
								
								if(isMatch) {
									Place place = new Place();
									place.setId((String) eachItem.get("contentid"));
									place.setTitle((String) eachItem.get("title"));
									place.setAddr((String) eachItem.get("addr1"));
									place.setMapX((String) eachItem.get("mapx"));
									place.setMapY((String) eachItem.get("mapy"));
									place.setImage((String) eachItem.get("firstimage"));
									place.setContentTypeId((String) eachItem.get("contenttypeid"));
									place.setCat1((String) eachItem.get("cat1"));
									place.setCat2((String) eachItem.get("cat2"));
									place.setCat3((String) eachItem.get("cat3"));
									place.setAreaCode((String) eachItem.get("areacode"));
									place.setSigunguCode((String) eachItem.get("sigungucode"));
									place.setTel((String) eachItem.get("tel"));
									placeList.add(place);
								}
							}
						}
					}
				}
			}
		}
		// 검색되는 여행지 수가 특정 수치 이상 넘어가면 자르기
		if (placeList.size() > travelDuration * 7) {
		    placeList.subList(travelDuration * 7, placeList.size()).clear();
		}
		
		// 여행지 각각에 근처 숙박시설 정보 삽입
		for(Place place : placeList) {
			
			List<Accommodation> nearByAccommodationsList = new ArrayList<>();
			
			for(Accommodation accommodation : accommodationList) {
				
		        BigDecimal placeMapXDecimal = new BigDecimal(place.getMapX());
		        BigDecimal placeMapYDecimal = new BigDecimal(place.getMapY());
		        
		        BigDecimal accommodationMapXDecimal = new BigDecimal(accommodation.getMapX());
		        BigDecimal accommodationMapYDecimal = new BigDecimal(accommodation.getMapY());
				
		    	// 현재 위치와 해당 음식점의 위도, 경도 차이에 따른 거리 계산
		    	BigDecimal x = placeMapXDecimal.subtract(accommodationMapXDecimal).multiply(new BigDecimal(88));
		    	BigDecimal y = placeMapYDecimal.subtract(accommodationMapYDecimal).multiply(new BigDecimal(111));
		    	BigDecimal x2 = x.pow(2);
		    	BigDecimal y2 = y.pow(2);
		    	MathContext mc = new MathContext(10, RoundingMode.HALF_UP);
		    	BigDecimal distance = x2.add(y2).sqrt(mc);
		    	
		    	// 여행지 근처 10km 내의 숙소 정보 추가
		    	if(distance.doubleValue() <= 10.0) {
		    		accommodation.setDistance(distance.doubleValue());
		    		nearByAccommodationsList.add(accommodation);
		    		if(nearByAccommodationsList.size() >= 3) {
		    			break;
		    		}
		    	}
			}
			place.setNearByAccommodations(nearByAccommodationsList);
		}
		
		return placeList;
	}
}
