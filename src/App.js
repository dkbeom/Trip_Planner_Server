import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SubTitle } from './mainpage/Title';
import styled from 'styled-components';
import NavBar from './mainpage/NavBar';
import ThreeTexts from './mainpage/ImageAnime';
import NextPageButton from './mainpage/NextPageButton';
import { Container } from 'react-bootstrap';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

function App() {
  const [images, setImages] = useState([
    'https://picsum.photos/200',
  ]);

  return (
    <Background>
      <NavBar />
      <Container style={{ paddingTop: "30px" }}>
        <div>

        </div>
        <SubTitle children={"We offer..."} />
      </Container>
      <ThreeTexts />
      <NextPageButton />
    </Background>
  );
}

export default App;
