package com.example.tripPlanner.service;

import java.util.List;

import com.example.tripPlanner.entity.History;

public interface HistoryService {

    // 히스토리 삽입
    boolean insert(String placeId, String placeTitle, String memberId, String memberNickname);
    
    // 특정 회원 히스토리 목록 조회
    List<History> getHistoryList(String memberId);
    
    // 특정 회원 특정 여행지 또는 음식점 히스토리 조회
    List<History> getHistoryListByMemberIdAndPlaceId(String memberId, String placeId);
}