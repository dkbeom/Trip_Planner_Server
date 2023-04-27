
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SubTitle } from './Title';
import styled from 'styled-components';
import NavBar from './NavBar';
import ThreeTexts from './ImageAnime';
import NextPageButton from './NextPageButton';
import { Container } from 'react-bootstrap';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

function MainPage() {
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

export default MainPage;