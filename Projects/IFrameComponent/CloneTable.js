import React, { useRef } from "react";

const CloneElement = ({ elementRef }) => {
  const newElementRef = useRef();

  return (
    <>
      {elementRef?.current &&
        React.createElement('table', {
          ref: newElementRef,
          id: 'iframe_table',
          dangerouslySetInnerHTML: {
            __html: elementRef.current.innerHTML
          }
        })}
    </>
  );
};

export default CloneElement;
