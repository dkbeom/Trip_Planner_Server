import React from 'react';
import styled from 'styled-components';
import './font.css'

const TitleWrapper = styled.h1`
  font-size: 45px;
  color: black;
  text-align: center;
  margin-top: 30px;
  cursor: pointer;
  font-family: "SingleDay", sans-serif;

  img {
    margin-right: 10px;
  }

  .green {
    color: #57FC72;
  }

  .orange {
    color: #FE7719;
  }

  .highlight:hover {
    font-size: 50px;
    background-color: rgba(255, 255, 255, 0.5);
    transition: background-color 0.3s ease-in-out;
  }
`;

const SubTitleWrapper = styled.h1`
  font-size: 40px;
  color: #232323;
  text-align: center;
  margin-top: 30px;
  font-family: "SingleDay", sans-serif;
`;

function Title({ children }) {
  return <TitleWrapper className="title">{children}</TitleWrapper>;
}

function SubTitle({ children }) {
  return <SubTitleWrapper className="subtitle"> {children} </SubTitleWrapper>
}

export { Title, SubTitle };
