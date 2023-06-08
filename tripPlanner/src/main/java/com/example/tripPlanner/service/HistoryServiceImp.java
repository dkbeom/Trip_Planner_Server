package com.example.tripPlanner.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.tripPlanner.dao.HistoryDao;
import com.example.tripPlanner.entity.History;

@Service
@Transactional
public class HistoryServiceImp implements HistoryService {

	@Autowired
	private HistoryDao historyDao;

	@Override
	public boolean insert(String placeId, String placeTitle, String memberId, String memberNickname) {

		Map<String, String> map = new HashMap<>();

		map.put("placeId", placeId);
		map.put("placeTitle", placeTitle);
		map.put("memberId", memberId);
		map.put("memberNickname", memberNickname);

		return historyDao.insert(map);
	}

	@Override
	public List<History> getHistoryList(String memberId) {
		return historyDao.getList(memberId);
	}

	@Override
	public List<History> getHistoryListByMemberIdAndPlaceId(String memberId, String placeId) {
		
		Map<String, String> map = new HashMap<>();
		
		map.put("memberId", memberId);
		map.put("placeId", placeId);
		
		return historyDao.getListByMemberIdAndPlaceId(map);
	}

}
