package com.example.tripPlanner.service;

import com.example.tripPlanner.entity.LoginForm;

public interface SecurityService {

    // 토큰 생성
    String createToken(LoginForm loginForm);
    
    // subject 가져오기
    String getSubject(String token);
}