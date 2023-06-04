import React, { useState, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './font.css'
import axios from 'axios';
import { MyContext } from '../provider';

export var isFormOKa = false;

 export function UpdateForm() {
    isFormOKa = false;
  const [formData, setFormData] = useState({
    username: localStorage.getItem("name"),
    nickname: localStorage.getItem("nickname"),
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...formData,
      [name]: value
    }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
          try {
            const id = localStorage.getItem("ID");
      const updatedFormData = {
        id: id,
        ...formData
      };

      //axios.post('http://43.201.19.87:8080/member/modify', formData) //-> EC2 Version
        const response = await axios.put('http://localhost:8080/member/modify', updatedFormData, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
      
            console.log(response.data); // 처리 결과 확인          
            alert("수정되었습니다. 수정된 정보는 재로그인시 반영됩니다.");
          } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                isFormOKa=false;
                alert(error.response.data); // 잘못된 요청에 대한 메시지를 팝업창으로 보여줍니다.
              } else {
                isFormOKa=false;
                alert('요청을 처리하는 중에 오류가 발생했습니다. \n 에러코드 : ' +error.response.status); // 기타 오류에 대한 메시지를 팝업창으로 보여줍니다.
              }
          }
          isFormOKa=true;
      };
      

  return (
    <div>
      <form onSubmit={handleSubmit} className='updateform'>
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
        <button type="submit" style={{ opacity: 0, pointerEvents: 'none', height: '0' }}></button>
      </form>
    </div>
  );
}

