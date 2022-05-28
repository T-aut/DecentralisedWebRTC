import React from 'react';

import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const Backdrop = (props) => {
  return <div className={'backdrop'} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={'modal'}>
      <div className={'content'}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  console.log('opening modal');
  if (portalElement !== null)
    return (
      <Fragment>
        {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        {createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          portalElement
        )}
      </Fragment>
    );
  else return <h1>No modal found</h1>;
};

export default Modal;
