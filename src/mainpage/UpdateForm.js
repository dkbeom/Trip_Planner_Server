import React, { useState, useContext } from 'react';
import './font.css'
import axios from 'axios';
import { MyContext } from '../provider';

export var isFormOK = false;

 export function UpdateForm() {
  const [formData, setFormData] = useState({
    username: localStorage.getItem("name"),
    nickname: localStorage.getItem("nickname"),
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  isFormOK = false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await axios.put('http://43.201.19.87:8080/member/modify', formData);
      //const response = await axios.put('http://localhost:8080/member/modify', formData);
      console.log(response.data); // 처리 결과 확인
      // 여기서 필요한 처리를 수행할 수 있습니다.
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };

  return (
    <div>
      {/* 모달 형태로 폼을 표시할 수 있는 코드를 작성하세요 */}
      <form onSubmit={handleSubmit}>
        <label>
          이름 
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          readOnly/>
        </label>
        <br />
        <label>
          닉네임  
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          이전 비밀번호 
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          새 비밀번호  
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          비밀번호 확인  
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />
        </label>
        <br />
      </form>
    </div>
  );
}

