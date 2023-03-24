package com.example.tripPlanner.service;

import com.example.tripPlanner.entity.LoginForm;
import com.example.tripPlanner.entity.Member;

public interface MemberService {

    // Member 객체 가져오기
    Member getMember(LoginForm loginForm);

    // 회원가입
    boolean join(Member member);

    // 아이디 중복체크
    boolean checkIdDuplicate(String id);

    // 닉네임 중복체크
    boolean checkNicknameDuplicate(String nickname);
}