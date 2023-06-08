package com.example.tripPlanner.dao.mybatis;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.tripPlanner.dao.MemberDao;
import com.example.tripPlanner.entity.LoginForm;
import com.example.tripPlanner.entity.Member;

@Repository("memberDao")
@Transactional
public class MybatisMemberDao implements MemberDao {

    private MemberDao mapper;

    @Autowired
    public MybatisMemberDao(SqlSession sqlSession) {
        mapper = sqlSession.getMapper(MemberDao.class);
    }


    @Override
    public Member getMemberByLoginForm(LoginForm loginForm) {
        return mapper.getMemberByLoginForm(loginForm);
    }
    
    @Override
	public Member getMemberById(String id) {
		return mapper.getMemberById(id);
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
}