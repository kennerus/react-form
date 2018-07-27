import React from 'react';
import PropTypes from 'prop-types';

const ModalBody = props => {

  return (
    <div className="popup__body">
      <button type="button" className="popup__close" onClick={props.click}>×</button>
      <p>{props.modalText}</p>
    </div>
  );
};

ModalBody.propTypes = {
  modalText: PropTypes.string.isRequired,
  click: PropTypes.func
};

export default ModalBody;
