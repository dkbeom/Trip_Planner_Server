import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Register() {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                Register
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* 여기에 회원가입 폼을 구현하면 됩니다 */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Register
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Register;
