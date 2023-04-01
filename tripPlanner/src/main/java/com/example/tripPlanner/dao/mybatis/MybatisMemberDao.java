package com.example.tripPlanner.dao.mybatis;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.tripPlanner.dao.MemberDao;
import com.example.tripPlanner.entity.LoginForm;
import com.example.tripPlanner.entity.Member;

@Repository("memberDao")
public class MybatisMemberDao implements MemberDao {

    private MemberDao mapper;
    private SqlSession sqlSession;
    
    @Autowired
    public MybatisMemberDao(SqlSession sqlSession) {
        mapper = sqlSession.getMapper(MemberDao.class);
        this.sqlSession = sqlSession;
    }

    @Override
    public Member getMember(LoginForm loginForm) {
        return mapper.getMember(loginForm);
    	//return sqlSession.selectOne("getMember", loginForm);
    }

    @Override
    public boolean insertMember(Member member) {
        return mapper.insertMember(member);
    }

    @Override
    public String getIdById(String id) {
        return mapper.getIdById(id);
    }

    @Override
    public String getIdByNickname(String nickname) {
        return mapper.getIdByNickname(nickname);
    }
    
    @Override
    public int updatePassword(Map<String, Object> parameterMap) {
        return sqlSession.update("updatePassword", parameterMap);
    }
}


