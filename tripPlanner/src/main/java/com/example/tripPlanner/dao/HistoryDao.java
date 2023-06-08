package com.example.tripPlanner.dao;

import java.util.List;
import java.util.Map;

import com.example.tripPlanner.entity.History;

public interface HistoryDao {

	boolean insert(Map<String, String> map);

	List<History> getList(String memberId);

	List<History> getListByMemberIdAndPlaceId(Map<String, String> map);
}
