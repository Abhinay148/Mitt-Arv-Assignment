import React from 'react';
import { FaPlus } from "react-icons/fa";

const FloatingButton = ({ onClick }) => {
  return (
    <div className="floating-button" onClick={onClick}>
      <FaPlus />
    </div>
  );
};

export default FloatingButton;
