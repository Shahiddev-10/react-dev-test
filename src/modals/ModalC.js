import React from "react";
import { Modal } from "react-bootstrap";

const ModalC = ({ }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal C - Contact Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-between">
        first_name
        id
      </Modal.Body>
    </Modal>
  );
};

export default ModalC;