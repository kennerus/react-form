import React from 'react';
import PropTypes from 'prop-types';

const ModalBody = props => {

  return (
    <div className="modal__body">
      <button type="button" className="modal__close" onClick={props.click}>×</button>
      <p>{props.modalText}</p>
    </div>
  );
};

ModalBody.propTypes = {
  modalText: PropTypes.string.userRequired,
  click: PropTypes.func
};

export default ModalBody;
