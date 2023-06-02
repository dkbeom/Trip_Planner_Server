import React, { useState } from 'react';
import './SurveyPage.css'; // SurveyPage.css 파일은 스타일을 정의합니다.

function SurveyPaper() {
  const questions = [
    { id: 'question1', text: '질문 1 이번에는 질문을 좀 길게 써볼까요?>ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ' },
    { id: 'question2', text: '질문 2' },
    { id: 'question3', text: '질문 3' },
    { id: 'question4', text: '질문 4' },
    { id: 'question5', text: '질문 5' },
    { id: 'question6', text: '질문 6' },
    { id: 'question7', text: '질문 7' },
    { id: 'question8', text: '질문 8' },
    { id: 'question9', text: '질문 9' },
    { id: 'question10', text: '질문 10' },
    { id: 'question11', text: '질문 11' },
    { id: 'question12', text: '질문 12' },
    { id: 'question13', text: '질문 13' },
    { id: 'question14', text: '질문 14' },
    { id: 'question15', text: '질문 15' }
  ];

  const choices = ['A', 'B', 'C']; // 선택지 배열

  const [formData, setFormData] = useState({});

  const handleChange = (question, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [question]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 설문조사 데이터를 처리하는 로직을 작성하세요
    console.log(formData);
    // API 호출 또는 다른 처리를 수행할 수 있습니다.
  };

  return (
    <div>
      <h1>설문조사</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id} className="text-center">
            <label htmlFor={question.id}>{question.text}:</label>
            <br />
            <div className="button-group">
              {choices.map((choice) => (
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
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default SurveyPaper;
