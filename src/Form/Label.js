import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = props => {
  const {labelText} = props;

  return (
    <label className="label">
      {labelText}
    </label>
  );
};

MyComponent.propTypes = {
  labelText: PropTypes.string.isRequired
};

export default MyComponent;
