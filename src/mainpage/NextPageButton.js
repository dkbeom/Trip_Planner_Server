import React, { useState, useEffect } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './font.css';

function NextPageButton() {
    const [showButton, setShowButton] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [myModal, setMyModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 123);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const setShowModal = () => {
        setMyModal(true);
    };
    const removeModal = () => {
        setMyModal(false);
    };

    return (
        <Container style={{ paddingTop: '50px', textAlign: 'center' }}>
            {isLoggedIn ? (
                <div className={`item ${showButton ? 'show' : ''}`}>
                    <Link to="/schedule">
                        <button
                            type="button"
                            className="btn btn-secondary btn-lg"
                            style={{
                                backgroundColor: '#F0CC90',
                                color: '#121212',
                                boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.2)',
                            }}
                        >
                            <div className="sd" style={{ fontSize: '30px' }}>
                                스케줄 만들기
                            </div>
                        </button>
                    </Link>
                </div>
            ) : (
                <div className={`item ${showButton ? 'show' : ''}`}>
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg"
                        style={{
                            backgroundColor: '#F0CC90',
                            color: '#121212',
                            boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.2)',
                        }}
                        onClick={setShowModal}
                    >
                        <div className="sd" style={{ fontSize: '30px' }}>
                            스케줄 만들기
                        </div>
                    </button>
                    <Modal show={myModal} onHide={removeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>로그인이 필요합니다!</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="primary" onClick={removeModal}>
                                닫기
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </Container>
    );
}

export default NextPageButton;
