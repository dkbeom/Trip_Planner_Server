import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { LoginForm, isFormOK } from "./LoginForm.js"
import './font.css'
import { MyContext } from '../provider.js';
import { useContext } from 'react';
import { useEffect } from 'react';


function Login() {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const { accountEmail } = useContext(MyContext);
    const handleSubmit = (formData) => {
        document.querySelector('.registerform button[type="submit"]').click();
        if (!isFormOK)
            return;
        handleClose();
    };  


    useEffect(() => {
        if(localStorage.getItem("token")){
            window.location.reload();
        }
    }, [accountEmail]);


    return (
        <>
            <Button variant="outline-success" onClick={handleShow}>
                Login
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='sd'>로그인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm onSubmit={handleSubmit} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login;
