import React, { useState } from 'react';
import './SurveyPage.css';
import { redirect } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import '../../mainpage/font.css'

function SurveyPage() {
  const questions = [
    { id: 'question1', text: '1. 첫날 여행 출발을 일찍 하려고 하시나요?' },
    { id: 'question2', text: '2. 평소에 일찍 일어나는 성격인가요?' },
    { id: 'question3', text: '3. 여행지에서 현지 문화와 관련된 체험을 좋아하시나요?' },
    { id: 'question4', text: '4. 자연 속에서 캠핑이나 트레킹과 같은 액티비티를 즐기는 편인가요?' },
    { id: 'question5', text: '5. 여행 중에도 항상 일상 생활과 연결되어 있으려고 노력하시나요?.' },
    { id: 'question6', text: '6. 휴양지나 리조트에서 편안하게 쉬는 것을 선호하시나요?' },
    { id: 'question7', text: '7. 문화유적지나 역사적인 장소에 관심이 많나요?' },
    { id: 'question8', text: '8. 다양한 액티비티와 스포츠를 여행에 포함시키는 것을 좋아하나요?' },
    { id: 'question9', text: '9. 지역 주민과 교류하며 현지 문화를 체험하는 것을 좋아하시나요?' },
    { id: 'question10', text: '10. 여행 도중에도 계획을 변경하거나 새로운 경로를 탐험하는 것을 좋아하나요?' },
    { id: 'question11', text: '11. 이색적인 장소나 특이한 경험을 찾아다니는 것을 좋아하나요?' },
    { id: 'question12', text: '12. 음식, 음료, 현지 문화와 관련된 투어를 선호하나요?' },
    { id: 'question13', text: '13. 호텔이나 숙박시설의 퀄리티보다는 가격과 위치가 더 중요할까요?' },
    { id: 'question14', text: '14. 여행을 할 때 일정에 여유를 두는 것을 선호하나요?' },
    { id: 'question15', text: '15. 새로운 음식을 맛보기 위해 여행지에서 유명한 레스토랑을 찾는 편인가요?' }
  ];

  const choices = ['아니오!', '잘 모르겠어요.', '네!'];
  const questionsPerPage = 1;

  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const scrollRef = React.createRef();

  const handleChange = (question, value) => {
    setFormData(prevData => ({
      ...prevData,
      [question]: value
    }));
  };

  const handleSubmit = () => {
    //if문으로 처리 전부 해두자
  };

  React.useEffect(() => {
    const defaultFormData = {};
    questions.forEach(question => {
      defaultFormData[question.id] = '잘 모르겠어요.';
    });
    setFormData(defaultFormData);
  }, []);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
    scrollRef.current.scrollTop = 0;
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
    scrollRef.current.scrollTop = 0;
  };

  const handleChoiceClick = (questionId, choice) => {
    setFormData(prevData => ({
      ...prevData,
      [questionId]: choice
    }));
    setUnansweredQuestions(prevQuestions => prevQuestions.filter(question => question !== questionId));
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  React.useEffect(() => {
    const unanswered = currentQuestions.filter(question => !formData[question.id]);
    setUnansweredQuestions(unanswered.map(question => question.id));
    scrollRef.current.scrollTop = 0;
  }, [currentPage]);

  return (
    <div>
    <div style={{ textAlign: 'center', marginBottom: "5vh" }}>
      <h1 className="fd">설문조사</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div ref={scrollRef} className="survey-container">
          {currentQuestions.map(question => (
            <div key={question.id} className="dd">
              <label htmlFor={question.id} style={{ fontSize: '23px' }}>{question.text}</label> {/* 콜론 제거 */}
              <br />
              <div className="button-group" style={{marginTop:"10vh"}}>
                {choices.map(choice => (
                  <button
                    key={choice}
                    type="button"
                    className={`option-button ${formData[question.id] === choice ? 'active' : ''}`}
                    onClick={() => handleChange(question.id, choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
              <br />
            </div>
          ))}
        </div>
        <div className="button-group">
          {currentPage > 1 && (
            <Button className="sd" variant="success" onClick={handlePrevPage}>이전 페이지</Button>
          )}
          {currentPage < Math.ceil(questions.length / questionsPerPage) && (
            <Button className="sd" onClick={handleNextPage}>다음 페이지</Button>
          )}
        </div>
        {currentPage === Math.ceil(questions.length / questionsPerPage) && (
          <button type="submit">제출</button>
        )}
      </form>
    </div>
  );
}

export default SurveyPage;
