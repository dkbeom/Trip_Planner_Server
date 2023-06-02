package com.example.tripPlanner.dao;

import java.util.Map;

import com.example.tripPlanner.entity.LoginForm;
import com.example.tripPlanner.entity.Member;

public interface MemberDao {

    Member getMemberByLoginForm(LoginForm loginForm);
    
    Member getMemberById(String id);

    boolean insertMember(Member member);

    String getIdById(String id);

    String getIdByName(String name);
    
    String getIdByNickname(String nickname);
    
    public int updatePassword(Map<String, Object> parameterMap);
    public int updateNickname(Map<String, Object> parameterMap);
   // void delete(String id);
}