package com.example.tripPlanner.entity;

import lombok.Data;

@Data
public class Member {
    private String id;
    private String pwd;
    private String name;
    private String nickname;
    private String gender;
    private Integer age;
    private Double tourAttr;
    private Double cultureAttr;
    private Double festivalAttr;
    private Double journeyAttr;
    private Double leisureAttr;
    private Double shoppingAttr;
    private Double restaurantAttr;
}