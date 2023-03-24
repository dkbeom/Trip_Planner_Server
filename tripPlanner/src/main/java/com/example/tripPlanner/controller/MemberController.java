package com.example.tripPlanner.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.entity.LoginForm;
import com.example.tripPlanner.entity.Member;
import com.example.tripPlanner.service.MemberService;
import com.example.tripPlanner.service.SecurityService;
import com.google.gson.Gson;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private SecurityService securityService;

    @PostMapping("/join")
    public String join(@ModelAttribute Member member, BindingResult bindingResult) {

        // loginForm에 타입 오류가 발생할 경우
        if (bindingResult.hasErrors()) {
            return "{\"result\" : \"TYPE_ERROR\"}";
        }

        boolean isJoin = memberService.join(member);

        if (isJoin == true) {
            return "{\"result\" : \"JOIN_SUCCESS\"}";
        } else {
            return "{\"result\" : \"JOIN_FAILURE\"}";
        }
    }

    @PostMapping("/login")
    public Map<String, Object> login(@ModelAttribute LoginForm loginForm, BindingResult bindingResult) {

        // loginForm에 타입 오류가 발생할 경우
        if (bindingResult.hasErrors()) {
            return null;
        }

        // 로그인 입혁한 정보에 맞는 Member 객체 가져오기
        Member member = memberService.getMember(loginForm);

        Map<String, Object> map = new LinkedHashMap<>();
        // 가져온 Member가 존재할 때
        if (member != null && member.getId() != null && member.getId() != "") {
            // 토큰 발급
            String token = securityService.createToken(loginForm);
            // 토큰 저장
            map.put("token", token);
        }

        // 토큰 반환
        return map;
    }

    // 토큰에서 subject 꺼내기
    @GetMapping("/get/subject")
    public Map<String, Object> getIdAndNickname(@RequestHeader(value = "Authorization") String token) {

        String subject = securityService.getSubject(token);

        Gson gson = new Gson();
        Map<String, Object> map = gson.fromJson(subject, Map.class);

        return map;
    }

    @GetMapping("/checkIdDuplicate")
    public String checkIdDuplicate(String id) {

        // 아이디 중복
        if (memberService.checkIdDuplicate(id)) {
            return "{\"result\" : \"DUPLICATE_ID\"}";
        }
        // 아이디 중복 아님
        else {
            return "{\"result\" : \"NOT_DUPLICATE_ID\"}";
        }
    }

    @GetMapping("/checkNicknameDuplicate")
    public String checkNicknameDuplicate(String nickname) {
        
        // 닉네임 중복
        if (memberService.checkNicknameDuplicate(nickname)) {
            return "{\"result\" : \"DUPLICATE_NICKNAME\"}";
        }
        // 닉네임 중복 아님
        else {
            return "{\"result\" : \"NOT_DUPLICATE_NICKNAME\"}";
        }
    }
}