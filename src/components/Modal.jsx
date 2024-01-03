import React from "react";

// Modal is a functional component that renders a modal dialog.
function Modal({ show, onClose, children }) {
  // If 'show' is false, don't render anything
  if (!show) {
    return null;
  }
  // The JSX returned when 'show' is true
  return (
    // 'modal-backdrop' is a div that covers the entire screen behind the modal, often used for dimming the background
    <div className="modal-backdrop">
      {/* 'modal' is the actual modal box that will contain the content */}
      <div className="modal">
        {/* 'children' are the elements passed from the parent component which will be rendered inside the modal */}
        {children}

        {/* Button to close the modal. It triggers the 'onClose' function passed as a prop when clicked */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
