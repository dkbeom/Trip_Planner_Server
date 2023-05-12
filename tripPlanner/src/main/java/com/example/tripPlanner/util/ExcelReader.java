package com.example.tripPlanner.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
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
	
    public List<Restaurant> getRestaurantListWithinRadius(String area, String currentX, String currentY, Integer radiusKm) {
    	
        try {
            // 읽어올 엑셀 파일 경로와 파일명을 지정
            String filePath = "excel/Restaurant.xlsx";
            ClassLoader classLoader = getClass().getClassLoader();
            File file = new File(classLoader.getResource(filePath).getFile());
            
            // 엑셀 파일을 읽어들임
            FileInputStream inputStream = new FileInputStream(file);
            Workbook workbook = WorkbookFactory.create(inputStream);
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
                	if(distance.doubleValue() <= (double)radiusKm) {
                		Restaurant restaurant = new Restaurant(
                				(int)row.getCell(0).getNumericCellValue(),
								row.getCell(1).getStringCellValue(),
								row.getCell(4).getStringCellValue(),
								row.getCell(5).getNumericCellValue(),
								row.getCell(6).getNumericCellValue(),
								row.getCell(8).getStringCellValue(),
								row.getCell(10).getStringCellValue(),
								(int)row.getCell(9).getNumericCellValue()
							);
                		restaurantList.add(restaurant);
                	}
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

