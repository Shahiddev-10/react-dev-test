import React from "react";
import Button from 'react-bootstrap/Button';

const PButton = ({ label, className, onClick }) => {
  return (
    <Button className={`${className}`} onClick={onClick}>{label}</Button>
  );
};

export default PButton;