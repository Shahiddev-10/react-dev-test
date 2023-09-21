import React, { useEffect } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import PButton from "../components/PButton";
import { allContacts } from "../store/selectors";

const ModalA = ({ handleClose, show, handleOpenA, handleOpenB, handleUpdateA }) => {

  const allContactList = useSelector(allContacts);
  // console.log('allContactList ', allContactList)

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
              {allContactList?.contacts_ids?.map((item, index) => (
                <div>
                  {item}
                  <br />
                </div>
              ))}
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
            />
          </div>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalA;