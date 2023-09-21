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

const Home = () => {

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("show");
  const page = useSelector(currentPage);

  console.log('page ', page)

  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);

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
  };

  const fetchAllContacts = async () => {
    console.log('fetchAllContacts ', page)
    const res = await ApiCall("GET", `/api/contacts.json?companyId=171&page=${page}`);
    if (page === 1) dispatch({ type: GET_CONTACTS, payload: res });
    else dispatch({ type: GET_MORE_CONTACTS, payload: res });
  }

  const handleUpdateA = ({ top }) => {
    console.log('handleUpdateA ', top.toFixed(2))
    if (top.toFixed(2) == 0.99) {
      dispatch({ type: INCREASE_CURRENT_PAGE });
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
      {showModalA && <ModalA handleClose={handleModalAClose} show={showModalA} handleOpenA={handleModalAOpen} handleOpenB={handleModalBOpen} handleUpdateA={handleUpdateA} />}
      {showModalB && <ModalB handleClose={handleModalBClose} show={showModalB} handleOpenA={handleModalAOpen} handleOpenB={handleModalBOpen} />}
    </div>
  );
};

export default Home;