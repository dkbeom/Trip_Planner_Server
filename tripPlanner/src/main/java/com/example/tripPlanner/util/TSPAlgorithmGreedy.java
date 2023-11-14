package com.example.tripPlanner.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.example.tripPlanner.entity.Place;

public class TSPAlgorithmGreedy {

	private List<Place> placeList; // 정렬되지 않은 여행지 리스트
	private int numOfPlaces; // 여행지의 수
	private boolean[] visited; // 방문한 여행지인지 여부를 저장하는 배열
	private Double[][] distances; // 여행지간 거리를 저장하는 배열
	private ArrayList<Integer> minPath; // 최소 경로

	public TSPAlgorithmGreedy(List<Place> placeList) {
		this.placeList = placeList;
		this.numOfPlaces = placeList.size() + 1;
		this.visited = new boolean[placeList.size() + 1];
		this.distances = new Double[placeList.size() + 1][placeList.size() + 1];
		this.minPath = new ArrayList<>();
	}

	// 여행지 최단 경로 리스트를 반환해주는 메소드
	public ArrayList<Place> getTspOrderedPlaceList(String currentMapX, String currentMapY) {

		// 각각의 여행지 사이 거리 Matrix 작성
		for (int i = 0; i < numOfPlaces; i++) {
			for (int j = 0; j < numOfPlaces; j++) {

				// 비교대상1
				BigDecimal aMapX;
				BigDecimal aMapY;
				if (i == 0) {
					aMapX = new BigDecimal(currentMapX);
					aMapY = new BigDecimal(currentMapY);
				} else {
					aMapX = new BigDecimal(placeList.get(i - 1).getMapX());
					aMapY = new BigDecimal(placeList.get(i - 1).getMapY());
				}

				// 비교대상2
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

				// x2 + y2 의 값을 입력
				distances[i][j] = distance.doubleValue();
			}
		}		

		// Greedy 알고리즘 실행
		ArrayList<Integer> pathOrderList = getGreedyPathOrder();

		// 여행지 순서 변경
		ArrayList<Place> orderedPlaceList = new ArrayList<>();
		for (int i = 1; i < pathOrderList.size(); i++) {
			orderedPlaceList.add(placeList.get(pathOrderList.get(i) - 1));
		}
		
		//--------------------------------TEST--------------------------------
		System.out.println();
		System.out.println("This is Greedy Algorithm");
		System.out.println();
		
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
		System.out.println("여행지 총 "+(numOfPlaces-1)+"개");
		System.out.println();
		//--------------------------------TEST--------------------------------

		return orderedPlaceList;
	}

	// Greedy 알고리즘 실행해서, 여행지 리스트 인덱스 번호들의 순서를 반환하는 메소드 (0부터 시작)
	public ArrayList<Integer> getGreedyPathOrder() {

		// 시작 지역 등록 & 방문 체크
		minPath.add(0);
		visited[0] = true;

		// i번째 index에 들어갈 여행지 찾기
		for (int i = 1; i < numOfPlaces; i++) {

			int closestCity = -1;
			Double closestDistance = Double.MAX_VALUE;

			// 방문하지 않은 여행지 중 가장 가까운 여행지 찾아서 저장
			for (int j = 0; j < numOfPlaces; j++) {
				// 방문하지 않았고, 현재 가장 가까운 여행지면 저장
				if (!visited[j] && distances[minPath.get(i - 1)][j] < closestDistance) {
					closestCity = j;
					closestDistance = distances[minPath.get(i - 1)][j];
				}
			}

			// 현재 가장 가까운 여행지 등록 & 방문 체크
			minPath.add(closestCity);
			visited[closestCity] = true;
		}

		return minPath;
	}
}
