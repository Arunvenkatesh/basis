import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/textInput.css';

/**
 * It is a custom TextInput react functional component to render input element.
 * It has,
 * @param  {string} placeholder placeholder value for input element
 * @param  {string} label value for label element
 * @param  {string} type  to determine the type of the input element
 * @param  {string} name  name for the input element
 * @param  {function} onTextChange function which is called when input values are changed
 * @param  {string} value value of the input element
 * @param  {bool} isRequired boolean value to comple user fill input value.
 * @param  {bool} isDisabled make input element into disabled state
 * @param  {string} maxlength to determine maximum length of the input value
 */
const TextInput = ({
  placeholder,
  label,
  type,
  name,
  onTextChange,
  value,
  isRequired,
  isDisabled,
  maxlength
}) => {
  return (
    <>
      <input
        type={type}
        className='text__input'
        placeholder={placeholder}
        id={name}
        onChange={onTextChange}
        value={value}
        required={isRequired}
        disabled={isDisabled}
        maxLength={maxlength}
      />
      <label htmlFor={name} className='text__label'>
        {label}
      </label>
    </>
  );
};

TextInput.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onTextChange: PropTypes.func,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  maxlength: PropTypes.string
};

export default TextInput;
