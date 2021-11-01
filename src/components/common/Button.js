import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/button.css';
/**
 * Button react functional component to render button for our application.
 * It has,
 * @param {string} name button name that should be displayed.
 * @param {function} onButtonClick function which is called when button is clicked.
 * @param {bool} disabled boolean prop to disable the button.
 */

const Button = ({ name, onButtonClick, disabled }) => {
  return (
    <button className='btn btn-green' onClick={onButtonClick} disabled={disabled}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  onButtonClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
