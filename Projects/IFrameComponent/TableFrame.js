import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@material-ui/core';
import MuiButton from '@material-ui/core/Button';
import Frame from './Frame';
import CloneElement from './CloneElement';
import { generateRulesAll } from './filterCSSRules';
import PptxGenJS from 'pptxgenjs';

const StyledClearButton = styled(MuiButton)({
  backgroundColor: '#B1BDDD',
  border: 'none',
  boxShadow: '0px 0px 3px 2px #777777',
  borderRadius: '4rem',
  borderWidth: '2px',
  display: 'flex',
  margin: 25,
  padding: 5
});

const TableFrame = ({ tableRef }) => {
  const [passedRef, setPassedRef] = useState(null);
  const iframeRef = useRef();

  function print() {
    console.log(iframeRef?.current);

    const iframeWindow = iframeRef.current.contentWindow;
    iframeRef.current.focus();

    // iframeWindow.print();
    // return false;
  }



  useEffect(() => {
    setPassedRef(tableRef);

    generateRulesAll(tableRef.current).then((css) => {
      const styleElement = document.createElement('style');
      styleElement.innerText = css;
      iframeRef?.current.contentWindow.document.head.appendChild(styleElement);
    });
  }, [tableRef?.current]);

  return passedRef ? (
    <>
      <StyledClearButton onClick={() => print()}>
        Create With Custom CSS
      </StyledClearButton>
      <Frame
        id="tGrid"
        // src="data:text/html,rawr"
        // srcDoc={srcdoc}
        // style={{ display: "none" }}
        iframeRef={iframeRef}
        elementRef={passedRef}
        title="grid_table"
      >
        <CloneElement elementRef={passedRef} />
      </Frame>
    </>
  ) : (
    <></>
  );
};

export default TableFrame;
