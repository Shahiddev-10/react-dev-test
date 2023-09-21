import React, { useMemo } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import PButton from "../components/PButton";
import { useSelector } from "react-redux";
import { allContacts } from "../store/selectors";
import Scrollbars from "react-custom-scrollbars";

const ModalB = ({ handleKeyUpModalB, setSearchModalB, handleSearchDebounceB, handleModalCOpen, setContactDetails, isEvenB, setIsEvenB, handleClose, show, handleOpenA, handleOpenB, handleUpdateB }) => {

  const allContactList = useSelector(allContacts);

  // Memoize the filtered data based on the 'showEvenIndices' state
  const filteredData = useMemo(() => {
    return isEvenB
      ? allContactList.contacts_ids.filter((item, index) => index % 2 === 0)
      : allContactList.contacts_ids;
  }, [isEvenB, allContactList]);

  const handleContactDetails = (item) => {
    setContactDetails(allContactList.contacts[item])
    handleModalCOpen()
  }

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
      <Modal.Body className="pb-0">
        <div className="d-flex justify-content-between">
          <PButton onClick={handleOpenA} label={"All Contacts"} className="button-a" />
          <PButton onClick={handleOpenB} label={"US Contacts"} className="button-b" />
          <PButton onClick={handleClose} label={"Close"} className="button-c" />
        </div>
        <div>
          <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="number"
              placeholder="Search..."
              onChange={(e) => {
                setSearchModalB(e.target.value)
                handleSearchDebounceB(e.target.value)
              }}
              onKeyPress={handleKeyUpModalB}
            />
          </Form.Group>
        </div>

      </Modal.Body>
      <hr className="m-0" />
      {!allContactList ?
        <div className="text-center">
          <Spinner animation="border" role="status" className="text-center" />
        </div>
        :
        <div className="m-3">
          <Scrollbars
            style={{ minHeight: 50 }}
            onUpdate={handleUpdateB}
          >
            <ul>
              {filteredData?.map((item, index) => (
                <li className="cursor-pointer" onClick={() => handleContactDetails(item)} style={{ cursor: 'pointer' }}>
                  {item}
                  <br />
                </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
      }
      <Modal.Footer>
        <Form>
          <div key={`default-checkbox`} className="mb-3">
            <Form.Check // prettier-ignore
              type={"checkbox"}
              id={`default-checkbox`}
              label={`Only even`}
              checked={isEvenB}
              onChange={() => setIsEvenB(prev => !prev)}
            />
          </div>
        </Form>
      </Modal.Footer>
    </Modal >
  );
};

export default ModalB;