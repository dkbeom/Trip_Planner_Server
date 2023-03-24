package com.example.tripPlanner.dao;

import com.example.tripPlanner.entity.LoginForm;
import com.example.tripPlanner.entity.Member;

public interface MemberDao {

    Member getMember(LoginForm loginForm);

    boolean insertMember(Member member);

    String getIdById(String id);

    String getIdByNickname(String nickname);
}