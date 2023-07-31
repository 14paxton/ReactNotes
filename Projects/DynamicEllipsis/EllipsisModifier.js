import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tooltip } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const EllipsisModifier = ({ textToModify, maxTextLength, ...rest }) => {
  const [toolTipText, setToolTipText] = useState('');
  const [label, setLabel] = useState('');
  const textContainerRef = useRef();

  const setToolTip = useCallback(() => {
    const modify = textContainerRef?.current?.offsetWidth < textContainerRef?.current?.scrollWidth;
    setToolTipText(modify ? textToModify : '');
  }, [textToModify]);

  useEffect(() => {
    const textTooLong = textToModify.length > maxTextLength;

    if (maxTextLength) {
      setLabel(textTooLong ? textToModify.substring(0, maxTextLength) + '...' : textToModify);
      setToolTipText(textTooLong ? textToModify : '');
    } else {
      window.addEventListener('resize', setToolTip);
      setLabel(textToModify);
      setToolTip();
    }
  }, [maxTextLength, setToolTip, textToModify]);

  const TextContainer = styled('div')({
    wordBreak: 'break-all',
    whiteSpace: 'nowrap',
    overflow: !maxTextLength ? 'hidden' : 'unset',
    textOverflow: !maxTextLength ? 'ellipsis' : 'unset'
  });

  return (
    <TextContainer ref={textContainerRef} {...rest} data-qa={'text-container-for-ellipis-text'}>
      <Tooltip title={toolTipText} childrenDisplayStyle='inline' data-qa={'tooltip-for-ellipis-text'}>
        {label}
      </Tooltip>
    </TextContainer>
  );
};

export default EllipsisModifier;
