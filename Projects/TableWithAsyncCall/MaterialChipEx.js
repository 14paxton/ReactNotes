import React from 'react';
import { styled } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { customSort } from '../../../common/util/appUtils';
import { GROUP_RESULT_SELECTION_ACTIONS } from '../helper/groups.helper';

const { SELECT_ONE } = GROUP_RESULT_SELECTION_ACTIONS;

const ChipArea = styled('div')({
  border: '1px solid #CCCCCC',
  borderRadiusadius: '2px',
  width: '100%',
  minHeight: '40px',
  display: 'flex',
  flexWrap: 'wrap'
});

const SelectedChip = styled(Chip)({
  margin: '0.25rem'
});

const AssessmentChip = ({
  selectedResults,
  handleAssessmentSelection,
  resultsNameMap
}) => {
  const chipDelete = (option) => {
    handleAssessmentSelection({ type: SELECT_ONE, payload: option });
  };

  return (
    <ChipArea>
      {resultsNameMap &&
        selectedResults.sort((a, b) =>
          customSort(resultsNameMap.get(a), resultsNameMap.get(b))
        ).map((option) => {
          return (
            <SelectedChip
              color="primary"
              data-qa={`checkbox-select-selected-chip-${option.id}`}
              key={option}
              label={resultsNameMap.get(option)}
              onDelete={() => chipDelete(option)}
            />
          );
        })}
    </ChipArea>
  );
};

export default AssessmentChip;
