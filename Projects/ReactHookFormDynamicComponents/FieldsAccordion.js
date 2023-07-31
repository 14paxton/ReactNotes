import React, { useState } from 'react';
import { useFormatMessage } from '../../i18n/i18n.util';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { FormControl, useTheme } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextBox from './TextBox';
import SelectBox from './SelectBox';
import RadioGroup from './RadioGroup';
import TextBoxCombo from './TextBoxCombo';
import VirtualizedAutoComplete from './VirtualizedAutoComplete';

const Accordion = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: `${theme.palette.primary[20]}`,
    borderBottom: '2px solid rgba(0, 0, 0, .125)',
    marginBottom: 0,
    minHeight: 56,
    width: '100%',
    '&:hover': {
      backgroundColor: `${theme.palette.primary[40]}`
    },
    '&$expanded': {
      minHeight: 56,
      backgroundColor: `${theme.palette.primary[40]}`
    }
  },
  content: {
    paddingLeft: 10,
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: `${theme.palette.primary[10]}`,
    padding: 0
  }
}))(MuiAccordionDetails);

const FieldsAccordion = ({
  setFormData,
  startExpanded,
  fieldsObject,
  formData
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(startExpanded);

  const Components = {
    text: TextBox,
    select: SelectBox,
    radio: RadioGroup,
    combo: TextBoxCombo,
    virtualizedAutoComplete: VirtualizedAutoComplete
  };

  const accordionLabel = useFormatMessage(
    fieldsObject.accordionLabel.key,
    fieldsObject.accordionLabel.default
  );

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded);
  };

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleAccordianChange(`${fieldsObject.id}`)}
      >
        <AccordionSummary
          expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
          aria-controls={`${fieldsObject.id}-content`}
          id={`${fieldsObject.id}-header`}
        >
          <Typography variant={'h6'}>{accordionLabel}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl style={{ margin: theme.spacing(1), width: '100%' }}>
            {fieldsObject.inputs.map((input) => {
              return React.createElement(Components[input.type], {
                key: `advancedSearch-${input.type}-field-${input.id}`,
                inputObject: input,
                parentFormId: fieldsObject.id,
                setFormData: setFormData,
                formData: formData
              });
            })}
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default FieldsAccordion;
