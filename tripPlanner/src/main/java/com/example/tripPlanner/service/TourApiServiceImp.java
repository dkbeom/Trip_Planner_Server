package com.example.tripPlanner.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.tripPlanner.entity.Category;
import com.example.tripPlanner.entity.Place;

@Service
@PropertySource("classpath:local.properties")
public class TourApiServiceImp implements TourApiService {

	@Value("${TOUR_API_KEY}")
	private String tourApiKey;

	@Override
	public List<Place> getApiPlaceList(String mapX, String mapY) {
		return getApiPlaceList(mapX, mapY, 10000, "", "", "");
	}

	@Override
	public List<Place> getApiPlaceList(String mapX, String mapY, Integer radius) {
		return getApiPlaceList(mapX, mapY, radius, "", "", "");
	}

	@Override
	public List<Place> getApiPlaceList(String mapX, String mapY, Integer radius, String cat1) {
		return getApiPlaceList(mapX, mapY, radius, cat1, "", "");
	}

	@Override
	public List<Place> getApiPlaceList(String mapX, String mapY, Integer radius, String cat1, String cat2) {
		return getApiPlaceList(mapX, mapY, radius, cat1, cat2, "");
	}

	@Override
	public List<Place> getApiPlaceList(String mapX, String mapY, Integer radius, String cat1, String cat2, String cat3) {

		String uriString = "https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=" + tourApiKey
				+ "&MobileOS=ETC&MobileApp=AppTest&mapX=" + mapX + "&mapY=" + mapY + "&radius=" + radius
				+ "&listYN=Y&contentTypeId=32&numOfRows=10&pageNo=1&_type=json";

		try {
			URI uri = new URI(uriString);

			// RestTemplate 생성
			RestTemplate restTemplate = new RestTemplate();

			// api 호출
			ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);

			// response body
			JSONObject body = new JSONObject(responseEntity.getBody()).getJSONObject("response").getJSONObject("body");

			// 해당 페이지에서의 여행지 갯수
			Integer numOfRows = (Integer) body.get("numOfRows");

			// 여행지 배열
			JSONArray item = null;
			if (numOfRows > 0) {
				item = body.getJSONObject("items").getJSONArray("item");
			}

			// List<Place> 생성
			List<Place> placeList = new ArrayList<>();
			for (int i = 0; i < numOfRows; i++) {
				JSONObject eachItem = (JSONObject) item.get(i);
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
				placeList.add(place);
			}

			return placeList;

		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		
		return null;
	}

	
	@Override
	public List<Category> getApiCategoryList() {
		return getApiCategoryList("", "", "");
	}
	
	@Override
	public List<Category> getApiCategoryList(String cat1) {
		return getApiCategoryList(cat1, "", "");
	}
	
	@Override
	public List<Category> getApiCategoryList(String cat1, String cat2) {
		return getApiCategoryList(cat1, cat2, "");
	}
	
	@Override
	public List<Category> getApiCategoryList(String cat1, String cat2, String cat3) {

		String uriString = "https://apis.data.go.kr/B551011/KorService1/categoryCode1?serviceKey=" + tourApiKey
				+ "&numOfRows=30&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&cat1=" + cat1 + "&cat2=" + cat2 + "&cat3=" + cat3;

		try {
			URI uri = new URI(uriString);

			// RestTemplate 생성
			RestTemplate restTemplate = new RestTemplate();

			// api 호출
			ResponseEntity<String> responseEntity = restTemplate.getForEntity(uri, String.class);
			
			// response body
			JSONObject body = new JSONObject(responseEntity.getBody()).getJSONObject("response").getJSONObject("body");

			// 해당 페이지에서의 븐류 갯수
			Integer numOfRows = (Integer) body.get("numOfRows");
			
			JSONArray item = null;
			if (numOfRows > 0) {
				item = body.getJSONObject("items").getJSONArray("item");
			}
			
			// List<Category> 생성
			List<Category> categoryList = new ArrayList<>();
			for(int i = 0; i < numOfRows; i++) {
				JSONObject eachItem = (JSONObject) item.get(i);
				Category category = new Category();
				category.setCode((String) eachItem.get("code"));
				category.setName((String) eachItem.get("name"));
				category.setRnum((Integer) eachItem.get("rnum"));
				category.setDepth((int)(Math.log(category.getCode().length()-1)/Math.log(2)));
				categoryList.add(category);
			}
			
			return categoryList;

		} catch (URISyntaxException e) {
			e.printStackTrace();
		}

		return null;
	}

}
