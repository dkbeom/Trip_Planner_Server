package com.example.tripPlanner.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tripPlanner.entity.LoginForm;
import com.example.tripPlanner.entity.Member;
import com.example.tripPlanner.service.MemberService;
import com.example.tripPlanner.service.SecurityService;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private SecurityService securityService;

    
    @PostMapping("/join")
    public String join(@RequestBody Member member) {
    // 파라미터: id, pwd, name, nickname, gender, age

    	int isJoin = memberService.join(member);
    	
        if (isJoin == 0) {
            return "{\"result\" : \"JOIN_SUCCESS\"}";
        } else if (isJoin == 1) {
            return "{\"result\" : \"JOIN_FAILURE_ID_DUPLICATE\"}";
        } else if (isJoin == 2) {
        	return "{\"result\" : \"JOIN_FAILURE_NICKNAME_DUPLICATE\"}";
        }
        
        return "{\"result\" : \"JOIN_FAILURE\"}";
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginForm loginForm) {
    // 파라미터: id, pwd
    	
        // 로그인 입혁한 정보에 맞는 Member 객체 가져오기
        Member member = memberService.getMemberToLogin(loginForm);

        Map<String, Object> map = new LinkedHashMap<>();
        // 로그인할 때, 입력한 정보와 일치하는 Member가 존재할 때
        if (member != null && member.getId() != null && member.getId() != "") {
            // 토큰 발급
            String token = securityService.createToken(member);
            // 토큰 저장
            map.put("token", token);
        }
        // 로그인할 때, 입력한 정보와 일치하는 Member가 존재하지 않을 때
        else {
        	map.put("token", null);
        }

        // 토큰 반환
        return map;
    }

    // 토큰에서 subject 꺼내기
    @GetMapping("/get/subject")
    public Map<String, String> getIdAndNickname(@RequestHeader(value = "Authorization") String token) {

        return securityService.getSubject(token);
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