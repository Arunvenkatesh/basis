import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/heading.css';
/**
 * PrimaryHeader react functional component to render Primary Header.
 * It has,
 * @param {string} value  name that should be displayed.
 */

const PrimaryHeader = ({ value }) => {
  return <h2 className='heading-secondary u-marigin-bottom-medium'>{value}</h2>;
};

PrimaryHeader.propTypes = {
  value: PropTypes.string
};

export default PrimaryHeader;
