import React, { useEffect, useState } from 'react';
import { MenuItem } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { useFormatMessage } from '../../i18n/i18n.util';
import MuiTextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormattedMessage } from 'react-intl';

const inputStyles = {
  backgroundColor: 'white',
  fontSize: '14px'
};

const TextField = withStyles({
  root: {
    backgroundColor: 'white',
    width: '100%',
    textAlign: 'left'
  }
})(MuiTextField);

const SelectBox = ({ parentFormId, inputObject, setFormData, formData }) => {
  const { setValue, register } = useFormContext();
  const [selectValue, setSelectValue] = useState();
  const options = inputObject.choices;
  register(`${inputObject.id}`);

  useEffect(() => {
    if (options) {
      const selected = options.find(
        (opt) => opt?.id === formData[`${inputObject.id}`]
      );

      setSelectValue(selected);
    }
  }, [formData, inputObject.id, options]);

  const label = useFormatMessage(
    inputObject.label.key,
    inputObject.label.default
  );

  const selectOne = useFormatMessage(
    'create.group.modal.results.table.advanced.search.default.select.one',
    'Select One'
  );

  const handleChange = (event) => {
    setValue(`${inputObject.id}`, event.target.value.id);
    setSelectValue(event.target.value);
    setFormData();
  };

  return (
    <TextField
      id={`select-field-${parentFormId}-${inputObject.id}`}
      data-qa={`select-field-${parentFormId}-${inputObject.id}`}
      fullWidth
      select
      label={label}
      onChange={handleChange}
      value={selectValue ?? 'none'}
      disabled={options.length < 1}
      variant={'filled'}
      margin="normal"
      SelectProps={{ style: { ...inputStyles } }}
      InputLabelProps={{
        shrink: true,
        'data-qa': `${parentFormId}-${inputObject.id}-search-input-label`
      }}
      inputProps={{
        'data-qa': `${parentFormId}-${inputObject.id}-search-input`,
        style: { ...inputStyles }
      }}
    >
      <MenuItem value="none" disabled>
        <em>{selectOne}</em>
      </MenuItem>
      {options.map((option) => (
        <MenuItem style={{ display: 'flex' }} key={option.id} value={option}>
          <FormattedMessage id={option.key} defaultMessage={option.default} />
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectBox;
