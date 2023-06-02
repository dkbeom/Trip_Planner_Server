import React, { useState } from 'react';
import { MyContextProvider } from '../provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SubTitle } from './Title';
import styled from 'styled-components';
import NavBar from './NavBar';
import NextPageButton from './NextPageButton';
import MyPageMenu from './MyPageMenu';
import { Container } from 'react-bootstrap';
import UncontrolledExample from './Carousel';
import { Row, Col } from 'react-bootstrap';
import './font.css'
import axios from 'axios';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;
const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

function MyProfile() {
  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

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
      console.log(response.data); // 처리 결과 확인
      // 여기서 필요한 처리를 수행할 수 있습니다.
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };

  return (
    <MyContextProvider>
    <Background>
        <NavBar />
        <MainWrapper>
        <Row>
        <MyContextProvider>
        <MyPageMenu Background="black" />  
        </MyContextProvider>

    <div>
      {/* 모달 형태로 폼을 표시할 수 있는 코드를 작성하세요 */}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nickname:
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Old Password:
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Confirm New Password:
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
    </Row>
      </MainWrapper>
        </Background>
        </MyContextProvider>
  );
}

export default MyProfile;
