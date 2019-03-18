import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './EditButtons.css';

/**
 * TODO
 * @param name
 * @param onClick
 * @returns {*}
 */
export function initiateEdit(val, onClick) {
  return (
    <button className="initEdit" onClick={() => onClick(val)}>
      <b className="initEdit txt">Edit</b>
      <FontAwesomeIcon
        className="initEdit btn"
        size="sm"
        icon={['fas', 'pencil-alt']}
      />
    </button>
  );
}

/**
 * TODO
 * @param name
 * @param onClick
 * @returns {*}
 */
export function cancelEdit(field, onClick) {
  return (
    <button className="btn btn-default editIcon" onClick={() => onClick(field)}>
      <b>Cancel</b>
    </button>
  );
}

/**
 * TODO
 * @param name
 * @param onClick
 * @returns {*}
 */
export function saveEdit(field, onClick, newValue) {
  return (
    <button
      className="btn btn-primary editIcon"
      onClick={() => onClick(field, newValue)}
    >
      <b>Save changes</b>
    </button>
  );
}
