import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NavBar from '../mainpage/NavBar';
import { Container } from 'react-bootstrap';
import PlaceReview from './PlaceReview';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
  background-attachment: fixed; /* Add this line */
`;

function Review() {
    return (
            <Background>
                <NavBar />
                <Container style={{ paddingTop: "30px" }}>
                  <PlaceReview />
                </Container>
            </Background>
    );
}

export default Review;