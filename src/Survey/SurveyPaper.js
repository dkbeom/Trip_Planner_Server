import React, { useState } from 'react';
import './SurveyPage.css';
import { redirect } from 'react-router-dom';
import axios from 'axios';

function SurveyPage() {
  const questions = [
    { id: 'question1', text: '여행을 계획하고 있을 때 나는 일정을 엄격히 지키는 편이다.' },
    { id: 'question2', text: '새로운 음식을 맛보기 위해 여행지에서 유명한 레스토랑을 찾는 편이다.' },
    { id: 'question3', text: '여행지에서 현지 문화와 관련된 체험을 선호한다.' },
    { id: 'question4', text: '자연 속에서 캠핑이나 트레킹과 같은 액티비티를 즐기는 편이다.' },
    { id: 'question5', text: '여행 중에도 항상 일상 생활과 연결되어 있으려고 노력한다.' },
    { id: 'question6', text: '휴양지나 리조트에서 편안하게 쉬는 것을 선호한다.' },
    { id: 'question7', text: '문화유적지나 역사적인 장소에 관심이 많다.' },
    { id: 'question8', text: '다양한 액티비티와 스포츠를 여행에 포함시키는 것을 좋아한다.' },
    { id: 'question9', text: '지역 주민과 교류하며 현지 문화를 체험하는 것을 좋아한다.' },
    { id: 'question10', text: '여행 도중에도 계획을 변경하거나 새로운 경로를 탐험하는 것을 좋아한다.' },
    { id: 'question11', text: '이색적인 장소나 특이한 경험을 찾아다니는 것을 좋아한다.' },
    { id: 'question12', text: '음식, 음료, 현지 문화와 관련된 투어를 선호한다.' },
    { id: 'question13', text: '호텔이나 숙박시설의 퀄리티보다는 가격과 위치를 우선 고려한다.' },
    { id: 'question14', text: '여행을 할 때 일정에 여유를 두는 것을 선호한다.' },
    { id: 'question15', text: '여행을 통해 새로운 사람들과의 인연을 만들고 교류하는 것을 선호한다.' }
  ];
  
  const choices = ['아니다', '보통이다', '그렇다'];
  const questionsPerPage = 5;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://43.201.19.87:8080/member/survey', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('데이터 전송 완료:', response.data);
        // 성공적으로 데이터를 전송한 후에 수행할 작업을 추가할 수 있습니다.
      })
      .catch(error => {
        console.error('데이터 전송 실패:', error);
        // 데이터 전송 중에 발생한 에러에 대한 처리를 수행할 수 있습니다.
      });
  };
  
  React.useEffect(() => {
    const defaultFormData = {};
    questions.forEach(question => {
      defaultFormData[question.id] = '보통이다';
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
      <h1>설문조사</h1>
      <form onSubmit={handleSubmit}>
        <div ref={scrollRef} className="survey-container">
        {currentQuestions.map(question => (
  <div key={question.id} className="text-center">
    <label htmlFor={question.id}>{question.text}:</label>
    <br />
    <div className="button-group">
      {choices.map(choice => (
        <button
          key={choice}
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
            <button type="button" onClick={handlePrevPage}>
              이전 페이지
            </button>
          )}
          {currentPage < Math.ceil(questions.length / questionsPerPage) && (
            <button type="button" onClick={handleNextPage}>
              다음 페이지
            </button>
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
