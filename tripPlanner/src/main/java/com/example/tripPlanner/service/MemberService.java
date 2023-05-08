package com.example.tripPlanner.service;

import com.example.tripPlanner.entity.LoginForm;
import com.example.tripPlanner.entity.Member;

public interface MemberService {

    // 로그인 시에 Member 객체 가져오기
    Member getMemberToLogin(LoginForm loginForm);
    
    // id로 Member 객체 가져오기
    Member getMemberById(String id);

    // 회원가입
    boolean join(Member member);

    // 아이디 중복체크
    boolean checkIdDuplicate(String id);

    // 닉네임 중복체크
    boolean checkNicknameDuplicate(String nickname);
}