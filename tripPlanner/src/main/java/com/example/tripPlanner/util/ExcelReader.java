package com.example.tripPlanner.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import com.example.tripPlanner.entity.Restaurant;

public class ExcelReader {
	
	private Workbook workbook;
	private FileInputStream inputStream;
	
	public ExcelReader() {
        // 읽어올 엑셀 파일 경로와 파일명을 지정
        String filePath = "excel/Restaurant.xlsx";
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource(filePath).getFile());
        
        // 엑셀 파일을 읽어들임
        try {
			inputStream = new FileInputStream(file);
			workbook = WorkbookFactory.create(inputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
    public List<Restaurant> getRestaurantListWithinRadius(String area, String currentX, String currentY, String[] foodPreference, Double radiusKm) {
        try {
        	// 현재 추천 음식점 개수
        	int n = 0;
            
            Sheet sheet = workbook.getSheet(area);
            
            // 현재 "x,y 좌표"를 BigDecimal 형으로 변환
            BigDecimal currentXDecimal = new BigDecimal(currentX);
            BigDecimal currentYDecimal = new BigDecimal(currentY);
            
            // 음식점 리스트 객체 생성
            List<Restaurant> restaurantList = new ArrayList<>();
            
            // 각 행(Row)마다 반복
            for (Row row : sheet) {
            	// 행이 끝나면 반복 끝
            	if (row.getCell(0) == null) {
            		break;
            	}
            	// 첫번째 행(머리글)은 패스
            	else if(row.getRowNum() == 0) {
            		// Header Row
            		continue;
            	}
            	// 간이음식, 카페/찻집 제외
            	else if(row.getCell(8).getStringCellValue().equals("간이음식") || row.getCell(8).getStringCellValue().equals("카페/찻집")) {
            		// 간이음식, 카페/찻집 패스
            		continue;
            	}
            	// 지정한 반경 이내에 있는 음식점 리스트 수집
            	else {
                	// 현재 위치와 해당 음식점의 위도, 경도 차이에 따른 거리 계산
                	BigDecimal x = currentXDecimal.subtract(new BigDecimal(row.getCell(5).getNumericCellValue())).multiply(new BigDecimal(88));
                	BigDecimal y = currentYDecimal.subtract(new BigDecimal(row.getCell(6).getNumericCellValue())).multiply(new BigDecimal(111));
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
								row.getCell(5) == null ? null : row.getCell(5).getNumericCellValue(),
								row.getCell(6) == null ? null : row.getCell(6).getNumericCellValue(),
								row.getCell(8) == null ? null : row.getCell(8).getStringCellValue(),
								row.getCell(10) == null ? null : row.getCell(10).getStringCellValue(),
								row.getCell(9) == null ? null : (int)row.getCell(9).getNumericCellValue()
							);
                		restaurantList.add(restaurant);
                		
                		n++;
                		// 식당 3개 담았으면 그만
                    	if(n == 3) {
                    		break;
                    	}
                	}
            	}
            }
            System.out.println();
            
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

