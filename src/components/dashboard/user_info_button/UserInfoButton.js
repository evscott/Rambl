import React, { Component } from 'react';
import {
  Button,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserInfoButton.css';

/**
 *  Dashboard is a component that holds all of the dashboard helper components
 */

export default class UserInfoButton extends Component {
  /**************************** Visual component ****************************/
  render() {
    return (
      <Button className={'user-info'}>
        {['left'].map((placement) => (
          <OverlayTrigger
            key={placement}
            placement={placement}
            overlay={
              <Tooltip id={`tooltip-${placement}`}>
                About <strong> you </strong>
              </Tooltip>
            }
          >
            {/*<Button variant="secondary">Tooltip on {placement}</Button>*/}
            <FontAwesomeIcon size={'lg'} icon={['fas', 'grin-beam']} />
          </OverlayTrigger>
        ))}
      </Button>
    );
  }
}
