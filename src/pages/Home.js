import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'react-router-dom';
import PButton from "../components/PButton";
import ModalA from "../modals/ModalA";
import ModalB from "../modals/ModalB";
import ModalC from "../modals/ModalC";
import { GET_CONTACTS, GET_MORE_CONTACTS, INCREASE_CURRENT_PAGE } from "../store/constants";
import { currentPage } from "../store/selectors";
import { ApiCall } from "../utils/apiUtils";
import { Button, Modal } from "react-bootstrap";
import debounce from "lodash.debounce";

const Home = () => {

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("show");
  const page = useSelector(currentPage);

  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [searchModalA, setSearchModalA] = useState('');
  const [searchModalB, setSearchModalB] = useState('')
  const [isEvenA, setIsEvenA] = useState(false)
  const [isEvenB, setIsEvenB] = useState(false)

  const [contactsDetails, setContactDetails] = useState(null)

  const handleModalAOpen = () => {
    setShowModalA(true);
    setSearchParams({ show: 'modal-a' });
  };

  const handleModalAClose = () => {
    setShowModalA(false);
    searchParams.delete('show');
    setSearchParams(searchParams);
  }
  const handleModalBClose = () => {
    setShowModalB(false);
    searchParams.delete('show');
    setSearchParams(searchParams);
  }

  const handleModalBOpen = () => {
    setShowModalB(true);
    setSearchParams({ show: 'modal-b' });
    // API Call
    fetchUsContacts()
  };

  const handleModalCOpen = () => {
    setShowModalC(true)
  }

  const handleModalCClose = () => {
    setShowModalC(false)
    setContactDetails(null)
  }

  const fetchUsContacts = async (query = '') => {
    const res = await ApiCall("GET", `/api/contacts.json?companyId=171&countryId=226&page=${page}&query=${query}`);
    if (page === 1) dispatch({ type: GET_CONTACTS, payload: res });
    else dispatch({ type: GET_MORE_CONTACTS, payload: res });
    // const res = await ApiCall("GET", `/api/contacts.json?companyId=171&page=${page}`);
  }

  const fetchAllContacts = async (query = '') => {
    const res = await ApiCall("GET", `/api/contacts.json?companyId=171&page=${page}&query=${query}`);
    if (page === 1) dispatch({ type: GET_CONTACTS, payload: res });
    else dispatch({ type: GET_MORE_CONTACTS, payload: res });
  }

  const handleUpdateA = ({ top }) => {
    if (top.toFixed(2) == 0.99) {
      dispatch({ type: INCREASE_CURRENT_PAGE });
    }
  }

  const handleUpdateB = ({ top }) => {
    if (top.toFixed(2) == 0.99) {
      dispatch({ type: INCREASE_CURRENT_PAGE });
    }
  }

  const handleSearchDebounceA = debounce(async (query) => {
    try {
      await fetchAllContacts(query)
    } catch (error) {
      console.error('Error searching data:', error);
    }
  }, 400);

  const handleSearchDebounceB = debounce(async (query) => {
    try {
      await fetchUsContacts(query)
    } catch (error) {
      console.error('Error searching data:', error);
    }
  }, 400);

  const handleKeyUpModalA = async (event) => {
    if (event.key === 'Enter') {
      handleSearchDebounceA.cancel();
      handleSearchDebounceA(searchModalA);
    }
  }

  const handleKeyUpModalB = (event) => {
    if (event.key === 'Enter') {
      handleSearchDebounceB.cancel();
      handleSearchDebounceB(searchModalB);
    }
  }

  useEffect(() => {
    if (query === "modal-a") {
      setShowModalA(true);
      setShowModalB(false);
      fetchAllContacts();
    } else if (query === "modal-b") {
      setShowModalA(false);
      setShowModalB(true);
      fetchUsContacts()
    }
  }, [query, page]);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col text-center">
          <PButton label={"Button A"} className="button-a" onClick={handleModalAOpen} />
          <div className="my-2"></div>
          <PButton label={"Button B"} className="button-b" onClick={handleModalBOpen} />
        </div>
      </div>
      {showModalA && <ModalA
        isEvenA={isEvenA}
        setIsEvenA={setIsEvenA}
        handleClose={handleModalAClose}
        show={showModalA}
        handleOpenA={handleModalAOpen}
        handleOpenB={handleModalBOpen}
        handleUpdateA={handleUpdateA}
        setContactDetails={setContactDetails}
        handleModalCOpen={handleModalCOpen}
        setSearchModalA={setSearchModalA}
        handleKeyUpModalA={handleKeyUpModalA}
        handleSearchDebounceA={handleSearchDebounceA}
      />}
      {showModalB && <ModalB
        isEvenB={isEvenB}
        setIsEvenB={setIsEvenB}
        handleClose={handleModalBClose}
        show={showModalB}
        handleOpenA={handleModalAOpen}
        handleOpenB={handleModalBOpen}
        handleUpdateB={handleUpdateB}
        setContactDetails={setContactDetails}
        handleModalCOpen={handleModalCOpen}
        setSearchModalB={setSearchModalB}
        handleKeyUpModalB={handleKeyUpModalB}
        handleSearchDebounceB={handleSearchDebounceB}
      />}
      {showModalC && <ModalC
        show={showModalC}
        contactsDetails={contactsDetails}
        handleModalCOpen={handleModalCOpen}
        handleModalCClose={handleModalCClose}
      />}

    </div>
  );
};

export default Home;