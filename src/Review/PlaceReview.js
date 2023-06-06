import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const PlaceReview = () => {
  const [placeList, setPlaceList] = useState([
    { id: 'R1234', name: '장소1', avgRating: 4.5 },
    { id: 'R5678', name: '장소2', avgRating: 3.8 },
    { id: 'R8811', name: '장소3', avgRating: 2.2 },
    // 임의의 장소 데이터 추가
    { id: 'R2468', name: '장소4', avgRating: 4.1 },
    { id: 'R1357', name: '장소5', avgRating: 3.5 },
    { id: 'R9876', name: '장소6', avgRating: 2.9 },
    { id: 'R5432', name: '장소7', avgRating: 4.7 },
    { id: 'R1111', name: '장소8', avgRating: 3.2 },
    { id: 'R2222', name: '장소9', avgRating: 4.0 },
    { id: 'R3333', name: '장소10', avgRating: 3.6 },
  ]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const fetchReviews = async (placeId) => {
    try {
      const response = await axios.get(`http://43.201.19.87:8080/review/list?placeId=${placeId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handlePlaceClick = (placeId) => {
    setSelectedPlace(placeId);
    fetchReviews(placeId);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="container">
      <div className="left-box">
        {placeList.map((place) => (
          <div
            key={place.id}
            className={`place-item ${selectedPlace === place.id ? 'active' : ''}`}
            onClick={() => handlePlaceClick(place.id)}
          >
            {place.name}
          </div>
        ))}
      </div>
      <div className="right-box">
        {selectedPlace && (
          <>
            <div className="place-info">
              <h2>{selectedPlace.name}</h2>
              <p>전체 리뷰 평균별점: {selectedPlace.avgRating}</p>
            </div>
            <div className="review-list">
              {currentReviews.length > 0 ? (
                currentReviews.map((review) => (
                  <div key={review.id} className="review-item">
                    <hr />
                    <div className="review-header">
                      <span className="nickname">{review.memberNickname}</span>
                      <span className="reg-date">
                        {new Date(review.regdate).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <div className="rating">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`star ${index < review.score ? 'filled' : ''}`}
                        ></span>
                      ))}
                    </div>
                    <p className="comment">{review.content}</p>
                    <button className="report-btn">신고</button>
                  </div>
                ))
              ) : (
                <p>등록된 리뷰가 없습니다.</p>
              )}
            </div>
            <div className="pagination">
              <button
                className="page-btn"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                이전 페이지
              </button>
              <button
                className="page-btn"
                onClick={handleNextPage}
                disabled={currentReviews.length < reviewsPerPage}
              >
                다음 페이지
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceReview;
