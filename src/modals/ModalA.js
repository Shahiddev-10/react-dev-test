import React, { useEffect, useMemo } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import PButton from "../components/PButton";
import { allContacts } from "../store/selectors";

const ModalA = ({ searchModalA, handleSearchDebounceA, handleKeyUpModalA, setSearchModalA, handleModalCOpen, setContactDetails, setIsEvenA, isEvenA, handleClose, show, handleOpenA, handleOpenB, handleUpdateA }) => {

  const allContactList = useSelector(allContacts);

  // Memoize the filtered data based on the 'showEvenIndices' state
  const filteredData = useMemo(() => {
    return isEvenA
      ? allContactList.contacts_ids.filter((item, index) => index % 2 === 0)
      : allContactList.contacts_ids;
  }, [isEvenA, allContactList]);

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
          Modal A - All Contacts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              value={searchModalA}
              onChange={(e) => {
                setSearchModalA(e.target.value)
                handleSearchDebounceA(e.target.value)
              }}
              onKeyUp={handleKeyUpModalA}
            />
          </Form.Group>
        </div>
        <hr />
        {!allContactList ?
          <div className="text-center">
            <Spinner animation="border" role="status" className="text-center" />
          </div>
          :
          <div>
            <Scrollbars
              style={{ minHeight: 50 }}
              onUpdate={handleUpdateA}
            >
              <ul className="cursor-pointer" style={{ cursor: "pointer" }}>
                {filteredData?.map((item, index) => (
                  <li onClick={() => handleContactDetails(item)}>
                    {item}
                    <br />
                  </li>
                ))}
              </ul>
            </Scrollbars>

            {/* <Scrollbars
              onScroll={(val) => console.log('onScroll val', val)}
              onScrollFrame={(val) => console.log('onScrollFrame val', val)}
              onScrollStart={(val) => console.log('onScrollStart val', val)}
              onScrollStop={(val) => console.log('onScrollStop val', val)}
              onUpdate={(val) => console.log('onUpdate val', val)}
              renderView={renderView}
              // renderTrackHorizontal={this.renderTrackHorizontal}
              // renderTrackVertical={this.renderTrackVertical}
              // renderThumbHorizontal={this.renderThumbHorizontal}
              // renderThumbVertical={this.renderThumbVertical}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              autoHeight
              autoHeightMin={0}
              autoHeightMax={200}
              thumbMinSize={30}
              universal={true}
            /> */}
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Form>
          <div key={`default-checkbox`} className="mb-3">
            <Form.Check // prettier-ignore
              type={"checkbox"}
              id={`default-checkbox`}
              label={`Only even`}
              checked={isEvenA}
              onChange={() => setIsEvenA(prev => !prev)}
            />
          </div>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalA;