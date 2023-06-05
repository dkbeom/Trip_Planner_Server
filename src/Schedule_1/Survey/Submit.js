import React, { useContext, useState, useEffect } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../mainpage/font.css';
import { MyContext } from '../provider';

function NextPageButton() {
    const [showButton, setShowButton] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const { allowButton, setAllowButton } = useContext(MyContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 123);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setShowModal1(false);
        setShowModal2(false);
    }

    const handleClick = () => {
        const token = localStorage.getItem('transport');
        const val1 = localStorage.getItem('value1');
        const val2 = localStorage.getItem('value2');
        if (token && val2 - val1 >= 0) {
            setAllowButton(true);
            setShowModal(true);
        }
        else if (!token) {
            setAllowButton(false);
            setShowModal1(true);
        }
        else {
            setAllowButton(false);
            setShowModal2(true);
        }
    }

    return (
        <Container style={{ paddingTop: '30px', textAlign: 'center' }}>
            <div className={`item ${showButton ? 'show' : ''}`}>
                <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    style={{
                        backgroundColor: '#99CCFF',
                        color: '#121212',
                        boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.2)',
                    }}
                    onClick={handleClick}
                >
                    <div className="fd" style={{ fontSize: '30px' }}>
                        다 만들었어요!
                    </div>
                </button>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>좋습니다!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    다음 단계인 "여행지 선택"으로 넘어가세요!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal1} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>안돼요!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    탈 것을 고르셔야죠!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal2} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>안돼요!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    날짜 입력을 다시 확인하세요!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default NextPageButton;
