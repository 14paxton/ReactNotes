import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const frame = ({ children, title, iframeRef, elementRef, ...rest }) => {
  const [contentRef, setContentRef] = useState(null);
  const [mountNode, setMountNode] = useState(null);

  useEffect(() => {
    if (iframeRef) {
      iframeRef.current = contentRef;
      setMountNode(contentRef?.contentWindow?.document?.body);
    }
  }, [contentRef, elementRef?.current]);

  return (
    <iframe {...rest} title={title} ref={setContentRef}>
        {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export default frame;
