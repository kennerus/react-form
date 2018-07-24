import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  render() {
    const {inputType, inputStyle, inputValue, inputPlaceholder, inputName} = this.props;

    return (
      <input
        type={inputType}
        className={`input ${inputStyle}`}
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceholder}
      />
    );
  }
}


MyComponent.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputStyle: PropTypes.string,
  inputValue: PropTypes.string,
  inputPlaceholder: PropTypes.string,
};

export default MyComponent;
