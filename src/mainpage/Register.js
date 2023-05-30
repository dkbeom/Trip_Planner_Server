import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { RegisterForm, isFormOK } from './RegisterForm.js';
import './font.css';
import { MyContext } from '../provider';

var tryRegister = false;
function Register() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const { joinsuccess } = useContext(MyContext);

  useEffect(() => {
    console.log(joinsuccess);
    console.log(tryRegister);
    if (joinsuccess && tryRegister) {
      console.log("hurray");
      setShowSuccessModal(true);
      tryRegister = false;
    }
    else if (!joinsuccess && tryRegister) {
      setShowFailureModal(true);
      tryRegister = false;
    }
  }, [joinsuccess, tryRegister]);

  const handleClose = () => {
    setShowModal(false);
    setShowSuccessModal(false);
    setShowFailureModal(false);
    tryRegister = false;
  };

  const handleShow = () => setShowModal(true);

  const handleSubmit = () => {
    document.querySelector('.registerform button[type="submit"]').click();
    if (!isFormOK) return;
    handleClose();
    tryRegister = true;
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        Register
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="sd">회원가입</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm onSubmit={handleSubmit} />
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

      <Modal show={showSuccessModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원가입에 성공했습니다!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFailureModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원가입에 실패했습니다!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register;
