import React from 'react';
import PropTypes from 'prop-types';

const ModalOverlay = props => {
  return (
    <div className="popup__overlay" onClick={props.click}/>
  );
};

ModalOverlay.propTypes = {
  click: PropTypes.func
};

export default ModalOverlay;
