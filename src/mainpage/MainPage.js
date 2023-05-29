import { MyContextProvider } from './provider';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SubTitle } from './Title';
import styled from 'styled-components';
import NavBar from './NavBar';
import NextPageButton from './NextPageButton';
import { Container } from 'react-bootstrap';
import UncontrolledExample from './Carousel';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

function MainPage() {
    return (
        <MyContextProvider>
            <Background>
                <NavBar />
                <Container style={{ paddingTop: "30px" }}>
                    <div>

                    </div>
                    <SubTitle children={"We offer..."} />
                </Container>
                <UncontrolledExample />
                <NextPageButton />
            </Background>
        </MyContextProvider>
    );
}

export default MainPage;