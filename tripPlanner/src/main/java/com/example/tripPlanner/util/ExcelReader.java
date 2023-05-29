package com.example.tripPlanner.util;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import com.example.tripPlanner.entity.Restaurant;

public class ExcelReader {
	
	private String[] foodPreferences;
	private InputStream inputStream;
	private Workbook workbook;
	
	public ExcelReader(String[] foodPreferences) {
		// "국물요리"
		// "고기"
		// "해산물"
		// "면/분식"
		// "한식/뷔페"
		// "중식"
		// "일식"
		// "이탈리안음식"
		// "패스트푸드"
		// "제과/베이커리/떡"
		// "카페/찻집"
        
        // 음식 취향 입력
        this.foodPreferences = foodPreferences;
		
        // 읽어올 엑셀 파일 경로와 파일명을 지정
		String filePath = "/excel/Restaurant.xlsx";
        
        // 엑셀 파일을 읽어들임
        try {
        	inputStream = ExcelReader.class.getResourceAsStream(filePath);
			workbook = WorkbookFactory.create(inputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public boolean findPreference(String preference) {
		
		for(String foodPreference : foodPreferences) {
			if(foodPreference.equals(preference)) {
				return true;
			}
		}
		return false;
	}
	
	public void includeRestaurantWithinRadius(Row row, List<Restaurant> restaurantList, String currentX, String currentY, Double radiusKm) {
		
		String mapX = row.getCell(5) != null ? String.valueOf(row.getCell(5).getNumericCellValue()) : "";
    	String mapY = row.getCell(6) != null ? String.valueOf(row.getCell(6).getNumericCellValue()) : "";
		
		// 현재 "x,y 좌표"를 BigDecimal 형으로 변환
        BigDecimal currentXDecimal = new BigDecimal(currentX);
        BigDecimal currentYDecimal = new BigDecimal(currentY);
		
    	// 현재 위치와 해당 음식점의 위도, 경도 차이에 따른 거리 계산
    	BigDecimal x = currentXDecimal.subtract(new BigDecimal(mapX)).multiply(new BigDecimal(88));
    	BigDecimal y = currentYDecimal.subtract(new BigDecimal(mapY)).multiply(new BigDecimal(111));
    	BigDecimal x2 = x.pow(2);
    	BigDecimal y2 = y.pow(2);
    	MathContext mc = new MathContext(10, RoundingMode.HALF_UP);
    	BigDecimal distance = x2.add(y2).sqrt(mc);
    	
    	// 음식점이 설정한 반경 안에 있는 경우
    	if(distance.doubleValue() <= radiusKm) {
    		Restaurant restaurant = new Restaurant(
    			row.getCell(0) == null ? null : (int)row.getCell(0).getNumericCellValue(),
    			row.getCell(1) == null ? null : row.getCell(1).getStringCellValue(),
				row.getCell(4) == null ? null : row.getCell(4).getStringCellValue(),
				row.getCell(5) == null ? null : String.valueOf(row.getCell(5).getNumericCellValue()),
				row.getCell(6) == null ? null : String.valueOf(row.getCell(6).getNumericCellValue()),
				row.getCell(8) == null ? null : row.getCell(8).getStringCellValue(),
				row.getCell(10) == null ? null : row.getCell(10).getStringCellValue(),
				row.getCell(9) == null ? null : (int)row.getCell(9).getNumericCellValue(),
				distance.doubleValue()
			);
    		restaurantList.add(restaurant);
    	}
	}
	
    public List<Restaurant> getRestaurantListWithinRadius(String area, String currentX, String currentY, Double radiusKm) {
    	// area: 서울, 경기도, 광주, 부산, ...
        try {
        	List<Restaurant> restaurantList = new ArrayList<>();
        	
            Sheet sheet = workbook.getSheet(area);
            
            // 각 행(Row)마다 반복
            for (Row row : sheet) {
            	
            	// 첫번째 행(머리글)은 패스
            	if(row.getRowNum() == 0) {
            		// Header Row
            		continue;
            	}
            	// 식당 리스트가 3개면 stop
            	else if(restaurantList.size() >= 3) {
            		break;
            	}
            	// 식당 리스트가 3개가 안되었는데, 행이 끝났을 때
            	else if(row.getCell(0) == null) {
            		// 첫번째 행(머리글)은 패스
            		for(Row row2 : sheet) {
            			if(row2.getRowNum() == 0) {
            				continue;
            			} else if(restaurantList.size() >= 3) {
            				break;
            			} else if(row2.getCell(0) == null) {
            				break;
            			}
            			includeRestaurantWithinRadius(row2, restaurantList, currentX, currentY, radiusKm);
            		}
            		break;
            	}
            	
            	String rName = row.getCell(1) != null ? row.getCell(1).getStringCellValue() : "";
            	String category = row.getCell(8) != null ? row.getCell(8).getStringCellValue() : "";
            	String detail = row.getCell(10) != null ? row.getCell(10).getStringCellValue() : "";
            	
            	// 국물요리
            	if(findPreference("국물요리")
            			&& (rName.contains("감자탕") || detail.contains("감자탕")
          				|| rName.contains("곰탕") || detail.contains("곰탕")
          				|| rName.contains("국밥") || detail.contains("국밥")
          				|| rName.contains("매운탕") || detail.contains("매운탕")
           				|| rName.contains("해물탕") || detail.contains("해물탕")
           				|| rName.contains("삼계탕") || detail.contains("삼계탕")
           				|| rName.contains("샤브샤브") || detail.contains("샤브샤브")
           				|| rName.contains("설렁탕") || detail.contains("설렁탕")
           				|| rName.contains("찌개") || detail.contains("찌개")
          				|| rName.contains("전골") || detail.contains("전골")
           				|| rName.contains("추어") || detail.contains("추어")
            			|| rName.contains("사철탕") || detail.contains("사철탕")
            			|| rName.contains("영양탕") || detail.contains("영양탕")
            			|| rName.contains("수제비") || detail.contains("수제비")
            			|| rName.contains("포장마차") || detail.contains("포장마차")
            			|| rName.contains("해장국") || detail.contains("해장국"))) {
            		
            		includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
            	}
            	// 고기
            	else if(findPreference("고기")
            			&& (rName.contains("고기") || detail.contains("고기")
          				|| rName.contains("갈비") || detail.contains("갈비")
          				|| rName.contains("닭요리") || detail.contains("닭요리")
           				|| rName.contains("두루치기") || detail.contains("두루치기")
           				|| rName.contains("삼겹살") || detail.contains("삼겹살")
           				|| rName.contains("삼계탕") || detail.contains("삼계탕")
           				|| rName.contains("육류") || detail.contains("육류")
         				|| rName.contains("족발") || detail.contains("족발")
         				|| rName.contains("보쌈") || detail.contains("보쌈")
         				|| rName.contains("오리") || detail.contains("오리")
          				|| rName.contains("곱창") || detail.contains("곱창")
           				|| rName.contains("막창") || detail.contains("막창")
           				|| rName.contains("정육점") || detail.contains("정육점"))) {
            		
    				includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
            	}
            	// 해산물
            	else if(findPreference("해산물")
            			&& (rName.contains("대게") || detail.contains("대게")
    					|| rName.contains("아구") || detail.contains("아구")
    					|| rName.contains("해물") || detail.contains("해물")
    					|| rName.contains("해산물") || detail.contains("해산물")
    					|| rName.contains("생선") || detail.contains("생선")
    					|| rName.contains("굴") || detail.contains("굴")
    					|| rName.contains("전복") || detail.contains("전복")
   						|| detail.equals("회")
   						|| rName.contains("조개") || detail.contains("조개"))) {
            		
    				includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
            	}
            	// 면/분식
            	else if(findPreference("면/분식")
            			&& (rName.contains("국수") || detail.contains("국수")
    					|| rName.contains("냉면") || detail.contains("냉면")
    					|| rName.contains("돈까스") || detail.contains("돈까스")
    					|| rName.contains("우동") || detail.contains("우동")
    					|| rName.contains("떡볶이") || detail.contains("떡볶이")
    					|| rName.contains("순대") || detail.contains("순대")
    					|| rName.contains("분식") || detail.contains("분식"))) {
    					
    				includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
    			}
            	// 한식/뷔페
            	else if(findPreference("한식/뷔페") && category.contains("한식")
            			&& (rName.contains("두부전문점") || detail.contains("두부전문점")
    					|| rName.contains("쌈밥") || detail.contains("쌈밥")
    					|| rName.contains("한식") || detail.contains("한식")
    					|| rName.contains("한정식") || detail.contains("한정식")
    					|| rName.contains("기사식당") || detail.contains("기사식당")
    					|| rName.contains("뷔페") || detail.contains("뷔페"))) {
            		
            		includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
            	}
            	// 중식
            	else if(findPreference("중식") && category.contains("외국식")
            			&& (rName.contains("중식") || detail.contains("중식")
            			|| rName.contains("중국") || detail.contains("중국")
            			|| rName.contains("짜장") || detail.contains("짜장")
            			|| rName.contains("짬뽕") || detail.contains("짬뽕"))) {
            		
            		includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
            	}
            	// 일식
            	else if(findPreference("일식") && category.contains("외국식")
            			&& (rName.contains("일식") || detail.contains("일식")
            			|| rName.contains("일본") || detail.contains("일본")
            			|| rName.contains("초밥") || detail.contains("초밥")
            			|| rName.contains("우동") || detail.contains("우동"))) {
            		
            		includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
            	}
            	// 이탈리안음식
            	else if(findPreference("이탈리안음식") && category.contains("외국식")
            			&& (rName.contains("이탈리안") || detail.contains("이탈리안")
            			|| rName.contains("피자") || detail.contains("피자")
            			|| rName.contains("파스타") || detail.contains("파스타")
            			|| rName.contains("스파게티") || detail.contains("스파게티"))) {
            		
            		includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
            	}
            	// 패스트푸드
            	else if(findPreference("패스트푸드")
            			&& (rName.contains("패스트푸드") || detail.contains("패스트푸드")
            			|| rName.contains("햄버거") || detail.contains("햄버거")
            			|| rName.contains("치킨") || detail.contains("치킨")
            			|| rName.contains("피자") || detail.contains("피자")
            			|| rName.contains("통닭") || detail.contains("통닭")
            			|| rName.contains("맥도날드") || detail.contains("맥도날드")
            			|| rName.contains("버거킹") || detail.contains("버거킹")
            			|| rName.contains("KFC") || detail.contains("KFC"))) {
            		
            		includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
            	}
            	// 간식
            	else if(findPreference("제과/베이커리/떡") && category.contains("간이음식")
            			&& (rName.contains("떡") || detail.contains("떡")
                		|| rName.contains("빵") || detail.contains("빵")
                		|| rName.contains("디저트") || detail.contains("디저트")
                		|| rName.contains("제과") || detail.contains("제과")
                		|| rName.contains("베이커리") || detail.contains("베이커리")
                		|| rName.contains("도넛") || detail.contains("도넛")
                		|| rName.contains("초콜릿") || detail.contains("초콜릿")
                		|| rName.contains("샌드위치") || detail.contains("샌드위치"))) {
            		
            		includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
            	}
            	// 카페/찻집
            	else if(findPreference("카페/찻집") && category.contains("카페/찻집")) {
            		includeRestaurantWithinRadius(row, restaurantList, currentX, currentY, radiusKm);
            	}
            }
            
            // Workbook, InputStream을 close() 메소드를 통해 닫음
            workbook.close();
            inputStream.close();
            
            return restaurantList;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}

