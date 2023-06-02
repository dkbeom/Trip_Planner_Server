import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UpdateForm, isFormOK } from "./UpdateForm.js"
import './font.css'
import { MyContext } from '../provider.js';
import { useContext } from 'react';
import { useEffect } from 'react';


function Update() {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const { accountEmail } = useContext(MyContext);
    const handleSubmit = (formData) => {
        if (!isFormOK)
          return;
        handleClose();
      };


    useEffect(() => {
        if(localStorage.getItem("token")){
            //window.location.reload();
        }
    }, [accountEmail]);


    return (
        <>
            <Button variant="outline-success" onClick={handleShow}>
                내 정보 수정
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='sd'>내 정보 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateForm onSubmit={handleSubmit} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Update;
