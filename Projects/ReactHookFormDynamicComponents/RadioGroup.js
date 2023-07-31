import React, { useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useFormContext } from 'react-hook-form';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormattedMessage } from 'react-intl';

const FormControlLabel = withStyles({
  root: {
    margin: 0,
    paddingTop: 3,
    paddingBottom: 5
  },
  label: {
    fontSize: 12,
    paddingLeft: 3
  }
})(MuiFormControlLabel);

export default function CustomRadioGroup({ parentFormId, inputObject, setFormData, formData }) {
  const { register } = useFormContext();
  const options = inputObject.choices;
  const [checked, setChecked] = useState();

  useEffect(() => {
    const selectedRadio = formData[`${inputObject.id}`];
    setChecked(selectedRadio ?? inputObject?.defaultSelection);
  }, [formData, inputObject.defaultSelection, inputObject.id]);

  const handleRadioChange = (event) => {
    setFormData();
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup name={`${inputObject.id}`} onChange={handleRadioChange}>
        {options.map((option) => (
          <FormControlLabel
            value={option.id}
            key={option.id}
            control={
              <Radio
                data-qa={`${parentFormId}-${inputObject.id}-radio-option-${option.id}`}
                checked={option.id === checked}
                inputRef={register}
              />
            }
            label={
              <FormattedMessage
                id={option.key}
                defaultMessage={option.default}
              />
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
