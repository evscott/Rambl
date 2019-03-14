import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * TODO
 * @param name
 * @param onClick
 * @returns {*}
 */
export function initiateEdit(name, onClick) {
  return (
    <td>
      <button className="editIcon" onClick={() => onClick(name)}>
        <FontAwesomeIcon size="sm" icon={['fas', 'pencil-alt']} />
      </button>
    </td>
  );
}

/**
 * TODO
 * @param name
 * @param onClick
 * @returns {*}
 */
export function finishEdit(name, onClick) {
  return (
    <td>
      <button className="editIcon" onClick={() => onClick(name)}>
        <FontAwesomeIcon size="sm" icon={['fas', 'check']} />
      </button>
    </td>
  );
}
