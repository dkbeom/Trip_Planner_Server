package com.example.tripPlanner.service;

import java.util.Map;

import com.example.tripPlanner.entity.Member;

public interface SecurityService {

    // 토큰 생성
    String createToken(Member member);
    
    // subject 가져오기
    Map<String, String> getSubject(String token);
}