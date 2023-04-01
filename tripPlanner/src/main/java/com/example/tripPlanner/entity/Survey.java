package com.example.tripPlanner.entity;

import java.util.List;

import lombok.Data;

@Data
public class Survey {
    private String question;
    private List<String> choices;
    // 생성자, getter/setter 생략
  
}
