import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { SignupForm, isFormOK } from "./SignUpForm.js";
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
                    <Modal.Title className='sd'>회원가입</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignupForm onSubmit={handleSubmit} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Register
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login;
