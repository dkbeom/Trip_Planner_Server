import { useContext } from 'react';
import { useState } from 'react';
import { MyContext } from './provider';
import { Button, Modal } from 'react-bootstrap';

export default function MyModal() {
  const {showmap, setShowMap} = useContext(MyContext);

  const handleClose = () =>{
    setShowMap(false);
  }
  return (
    <div>
      <Modal show={showmap} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="sd">지도</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" >
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
