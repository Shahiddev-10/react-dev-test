import React from "react";
import { Modal } from "react-bootstrap";
import PButton from "../components/PButton";

const ModalC = ({ handleModalCClose, contactsDetails, show }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered={false}
      show={show}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal C - Contact Detail
        </Modal.Title>
        <PButton onClick={handleModalCClose} label={"Close"} className="button-c" />
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-between">
        <div>
          <ul>
            <li>
              <strong> id :</strong> {contactsDetails.id}
            </li>
            <li>
              <strong> first_name :</strong> {contactsDetails.first_name}
            </li>
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalC;