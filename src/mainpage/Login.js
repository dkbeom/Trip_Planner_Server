import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { LoginForm, isFormOK } from "./LoginForm.js"
import './font.css'


function Login() {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleSubmit = (formData) => {
        document.querySelector('.registerform button[type="submit"]').click();
        console.log(isFormOK);
        if (!isFormOK)
            return;
        console.log(formData);
        handleClose();
    };

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
