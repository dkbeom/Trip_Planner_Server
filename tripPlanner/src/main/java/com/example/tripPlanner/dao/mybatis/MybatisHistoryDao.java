package com.example.tripPlanner.dao.mybatis;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.tripPlanner.dao.HistoryDao;
import com.example.tripPlanner.entity.History;

@Repository("historyDao")
@Transactional
public class MybatisHistoryDao implements HistoryDao {

    private HistoryDao mapper;

    @Autowired
    public MybatisHistoryDao(SqlSession sqlSession) {
        mapper = sqlSession.getMapper(HistoryDao.class);
    }

	@Override
	public boolean insert(Map<String, String> map) {
		return mapper.insert(map);
	}

	@Override
	public List<History> getList(String memberId) {
		return mapper.getList(memberId);
	}

	@Override
	public List<History> getListByMemberIdAndPlaceId(Map<String, String> map) {
		return mapper.getListByMemberIdAndPlaceId(map);
	}
}