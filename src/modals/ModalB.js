import React from "react";
import { Form, Modal } from "react-bootstrap";
import PButton from "../components/PButton";

const ModalB = ({ handleClose, show, handleOpenA, handleOpenB }) => {

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      animation={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal B - US Contacts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-between">
        <PButton onClick={handleOpenA} label={"All Contacts"} className="button-a" />
        <PButton onClick={handleOpenB} label={"US Contacts"} className="button-b" />
        <PButton onClick={handleClose} label={"Close"} className="button-c" />
      </Modal.Body>
      <Modal.Footer>
        <Form>
          <div key={`default-checkbox`} className="mb-3">
            <Form.Check // prettier-ignore
              type={"checkbox"}
              id={`default-checkbox`}
              label={`Only even`}
            />
          </div>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalB;