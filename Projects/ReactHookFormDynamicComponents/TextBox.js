import { useFormContext } from 'react-hook-form';
import { useFormatMessage } from '../../i18n/i18n.util';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const inputStyles = {
  backgroundColor: 'white'
};

const TextBox = ({ parentFormId, inputObject, setFormData, formData }) => {
  const { register, errors } = useFormContext();
  const label = useFormatMessage(
    inputObject.label.key,
    inputObject.label.default
  );

  const twoCharError = useFormatMessage(
    'create.group.modal.results.table.advanced.search.textbox.error.two.characters',
    'Please type at least 2 characters to search.'
  );

  return (
    <TextField
      id={`text-field-${parentFormId}-${inputObject.id}`}
      name={inputObject.id}
      inputRef={register({
        minLength: {
          value: inputObject.twoCharErrorDisabled ? 1 : 2,
          message: twoCharError
        }
      })}
      label={label}
      onChange={setFormData}
      margin="normal"
      variant="filled"
      error={!!errors?.[inputObject.id]}
      helperText={errors?.[inputObject.id]?.message}
      InputLabelProps={{
        shrink: true,
        'data-qa': `${parentFormId}-${inputObject.id}-search-label`
      }}
      inputProps={{
        'data-qa': `${parentFormId}-${inputObject.id}-search-input`,
        style: { ...inputStyles }
      }}
    />
  );
};

export default TextBox;
