package com.example.tripPlanner.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@Import(TourApiServiceImp.class)
public class TourApiServiceTest {
	
	@Autowired
	private TourApiService tourApiService;
	
	@Test
	public void apiTest() {
		
//		tourApiService.getApiCategoryList("A02", "A0201");
	}
}
