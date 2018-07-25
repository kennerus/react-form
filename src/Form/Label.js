import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = props => {
  const {labelText, inputID} = props;

  return (
    <label className="label" htmlFor={inputID}>
      {labelText}
    </label>
  );
};

MyComponent.propTypes = {
  labelText: PropTypes.string.isRequired
};

export default MyComponent;
