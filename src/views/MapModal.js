import React from "react";
import ReactDOM from "react-dom";

const MapModal = ({ onClose, children }) => {
  const modalRoot = document.getElementById("modal-root");
  const modalContainer = document.createElement("div");

  React.useEffect(() => {
    modalRoot.appendChild(modalContainer);

    return () => {
      modalRoot.removeChild(modalContainer);
    };
  }, [modalContainer, modalRoot]);

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
      <button onClick={onClose}>Close</button>
    </div>,
    modalContainer
  );
};

export default MapModal;
