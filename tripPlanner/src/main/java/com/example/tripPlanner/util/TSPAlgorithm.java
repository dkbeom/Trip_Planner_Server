package com.example.tripPlanner.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.example.tripPlanner.entity.Place;

public class TSPAlgorithm {

	private List<Place> placeList; // 정렬되지 않은 여행지 리스트
    private int numOfPlaces; // 여행지의 수
    private boolean[] visited; // 방문한 여행지인지 여부를 저장하는 배열
    private Double[][] distances; // 여행지간 거리를 저장하는 배열
    private Double minDistance; // 최소 거리
    private ArrayList<Integer> minPath; // 최소 경로
    
    public TSPAlgorithm(List<Place> placeList) {
    	this.placeList = placeList;
        this.numOfPlaces = placeList.size() + 1;
        this.visited = new boolean[placeList.size() + 1];
        this.distances = new Double[placeList.size() + 1][placeList.size() + 1];
        this.minDistance = Double.MAX_VALUE;
        this.minPath = new ArrayList<>();
    }
    
    // 여행지 최단 경로 리스트를 반환해주는 메소드
	public ArrayList<Place> getTspOrderedPlaceList(String currentMapX, String currentMapY) {
		
		// 여행지 사이 거리 Matrix 작성
		for (int i = 0; i < placeList.size() + 1; i++) {
			for (int j = 0; j < placeList.size() + 1; j++) {

				BigDecimal aMapX;
				BigDecimal aMapY;
				if (i == 0) {
					aMapX = new BigDecimal(currentMapX);
					aMapY = new BigDecimal(currentMapY);
				} else {
					aMapX = new BigDecimal(placeList.get(i - 1).getMapX());
					aMapY = new BigDecimal(placeList.get(i - 1).getMapY());
				}

				BigDecimal bMapX;
				BigDecimal bMapY;
				if (j == 0) {
					bMapX = new BigDecimal(currentMapX);
					bMapY = new BigDecimal(currentMapY);
				} else {
					bMapX = new BigDecimal(placeList.get(j - 1).getMapX());
					bMapY = new BigDecimal(placeList.get(j - 1).getMapY());
				}

				BigDecimal x = aMapX.subtract(bMapX);
				BigDecimal y = aMapY.subtract(bMapY);

				BigDecimal x2 = x.multiply(x);
				BigDecimal y2 = y.multiply(y);

				BigDecimal distance = x2.add(y2);

				distances[i][j] = distance.doubleValue();
			}
		}
		
		// TSP 알고리즘 실행
		ArrayList<Integer> pathOrderList = getTspPathOrderList();
		
		// 여행지 순서 변경
		ArrayList<Place> orderedPlaceList = new ArrayList<>();
		for (int i = 1; i < pathOrderList.size(); i++) {
			orderedPlaceList.add(placeList.get(pathOrderList.get(i) - 1));
		}
		
		//--------------------------------TEST--------------------------------
		// 원래의 여행지 순서대로 title 출력
		System.out.printf("원래 순서:   ");
		for(Place p : placeList) {
			System.out.printf("[%s]  ", p.getTitle());
		}
		System.out.println();
		System.out.println();
		// 정렬된 여행지 순서대로 title 출력
		System.out.printf("정렬된 순서:  ");
		for(Place p : orderedPlaceList) {
			System.out.printf("[%s]  ", p.getTitle());
		}
		System.out.println();
		System.out.println();
		//--------------------------------TEST--------------------------------
		
		return orderedPlaceList;
	}
    
    // TSP 알고리즘 실행해서, 경로 순서를 반환하는 메소드
    public ArrayList<Integer> getTspPathOrderList() {
        ArrayList<Integer> path = new ArrayList<>(); // 경로
        // 시작 여행지 설정
        int startPlace = 0; // 시작 여행지를 0으로 설정
        int currentPlace = startPlace; // 시작 여행지를 현재 여행지로 설정
        Double totalDistance = (double) 0; // 총 거리 초기화
        path.add(startPlace); // 경로에 시작 여행지 삽입
        visited[startPlace] = true; // 시작 여행지는 방문한 것으로 설정
        
        // 재귀함수 호출
        findTspPath(path, currentPlace, totalDistance, 1);
        
        //--------------------------------TEST--------------------------------
        // 여행지 순서(번호) 출력
        System.out.println();
        System.out.println("여행지 순서: "+minPath);
        System.out.println();
        //--------------------------------TEST--------------------------------
        
        // 최소 경로 반환
        return minPath;
    }
    
    // 재귀함수를 이용하여 최단 경로를 찾는 메소드
    private void findTspPath(ArrayList<Integer> path, int currentPlace, Double totalDistance, int count) {
    	
        // 모든 여행지를 방문했을 경우, 다시 시작 여행지로 돌아가기
        if (count == numOfPlaces) {
            // 마지막 여행지와 시작 여행지를 연결한 거리를 더하여 총 거리 계산
            totalDistance += distances[currentPlace][0];
            
            // 현재까지의 경로와 거리가 최소값보다 작을 경우 "거리" & "최소 경로" 갱신
            if (totalDistance < minDistance) {
                minDistance = totalDistance;
                minPath = new ArrayList<>(path);
            }
            return;
        }
        
        // 아직 모든 여행지를 전부 방문한게 아닌 경우
        for (int i = 1; i < numOfPlaces; i++) {
            if (!visited[i]) { // 방문하지 않은 여행지인 경우
                visited[i] = true; // 방문 처리
                path.add(i); // 경로에 추가
                totalDistance += distances[currentPlace][i]; // 거리 더하기
                findTspPath(path, i, totalDistance, count + 1); // 재귀함수 호출
                visited[i] = false; // 방문 처리 취소
                path.remove(path.size() - 1); // 경로에서 제거
                totalDistance -= distances[currentPlace][i]; // 거리 빼기
            }
        }
    }
}