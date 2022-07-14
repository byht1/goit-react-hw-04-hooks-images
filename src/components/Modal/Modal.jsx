import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { DivOverlay, DivModal } from './Modal.styled';

export default function Modal({ src, alt, hide }) {
  useEffect(() => {
    window.addEventListener('keydown', clickEscate);

    return () => {
      window.removeEventListener('keydown', clickEscate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clickEscate(event) {
    if (event.code !== 'Escape') {
      return;
    }
    hide();
  }

  function clickOverlay(event) {
    if (event.target !== event.currentTarget) {
      return;
    }
    hide();
  }

  return createPortal(
    <DivOverlay onClick={clickOverlay}>
      <DivModal>
        <img src={src} alt={alt} />
      </DivModal>
    </DivOverlay>,
    document.querySelector('#modal-root')
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
};
