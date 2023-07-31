import React, { useEffect, useState } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import { useFormContext } from 'react-hook-form';
import { useFormatMessage } from '../../i18n/i18n.util';

const Autocomplete = withStyles({
  root: {
    width: '100%',
    backgroundColor: 'transparent',
    '&$focused': {
      backgroundColor: 'transparent'
    }
  },
  input: {
    fontSize: '12px',
    textAlign: 'left'
  },
  inputRoot: {
    backgroundColor: 'white !important',
    width: '100%',
    textAlign: 'left'
  },
  option: {
    fontSize: '13px'
  },
  focused: {}
})(MuiAutocomplete);

const TextField = withStyles({
  root: {
    backgroundColor: 'white',
    width: '100%',
    textAlign: 'left'
  }
})(MuiTextField);

export default function TextBoxCombo({ parentFormId, inputObject, setFormData, formData }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const { register, setValue } = useFormContext();
  const loading = open && options.length === 0;
  const label = useFormatMessage(inputObject.label.key, inputObject.label.default);
  const selectOne = useFormatMessage(
    'create.group.modal.results.table.advanced.search.default.select.one',
    'Select One'
  );
  const placeHolderText = !!options.length ? (options.length > 1 ? selectOne : inputObject?.choices[0]?.name) : '';

  register(`${inputObject.id}`);

  useEffect(() => {
    setOptions(inputObject.choices);
    if (inputObject?.choices) {
      const selected = inputObject.choices.find((opt) => opt?.id === formData[`${inputObject.id}`]);

      setSelectedValue(selected);
      setValue(`${inputObject.id}`, selected?.id);
    }
  }, [formData, inputObject.choices, inputObject.id, setValue]);

  const handleChange = (event, value) => {
    setSelectedValue(value);
    setValue(`${inputObject.id}`, value?.id);
    setFormData();
  };

  return (
    <Autocomplete
      data-qa={`${parentFormId}-${inputObject.id}-combo-input`}
      id={`combo-text-field-${parentFormId}-${inputObject.id}`}
      open={open}
      disabled={options.length <= 1}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      freeSolo
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name ?? ''}
      renderOption={(option) => option?.displayOption ?? ''}
      onChange={handleChange}
      options={options}
      loading={loading}
      fullWidth
      value={selectedValue ?? ''}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
          placeholder={placeHolderText}
        />
      )}
    />
  );
}
