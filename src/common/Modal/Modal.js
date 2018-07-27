import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from "./ModalOverlay";
import ModalBody from "./ModalBody";

class MyComponent extends Component {
  render() {
    const {modalText} = this.props;

    return (
      <div className="modal">
        <ModalOverlay click={this.props.clickHandler} />
        <ModalBody modalText={modalText} click={this.props.clickHandler} />
      </div>
    );
  }
}

MyComponent.propTypes = {
  modalText: PropTypes.string.isRequired,
  clickHandler: PropTypes.func
};

export default MyComponent;
