import React, { useCallback, useEffect, useState } from 'react';
import MuiTextField from '@material-ui/core/TextField';
import MuiAutocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import withStyles from '@material-ui/core/styles/withStyles';
import { Controller, useFormContext } from 'react-hook-form';
import { useFormatMessage } from '../../i18n/i18n.util';
import VirtualizedListComponent from './VirtualizedListComponent';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import { SecurityGroupLabel } from '../../containers/assessment/SecurityGroupLabel';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Divider from '@material-ui/core/Divider';

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

const useStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0
    }
  }
});

const buildFilterOptions = (filterOptionsFunction) => {
  const defaultSearch = (option) => `${option?.name}`;
  return createFilterOptions({
    stringify: filterOptionsFunction ? filterOptionsFunction : defaultSearch
  });
};

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    <b>{params.group}</b>
    <Divider style={{ backgroundColor: 'black' }} />
  </ListSubheader>,
  params.children
];

const TextField = withStyles({
  root: {
    backgroundColor: 'white',
    width: '100%',
    textAlign: 'left'
  }
})(MuiTextField);

export default function VirtualizedAutoComplete({ parentFormId, inputObject, setFormData, formData }) {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const filterOptionsFunction = useCallback(buildFilterOptions(inputObject?.filterOptionsFunction), []);
  const { control } = useFormContext();
  const label = useFormatMessage(inputObject.label.key, inputObject.label.default);
  const selectOne = useFormatMessage(
    'create.group.modal.results.table.advanced.search.default.select.one',
    'Select One'
  );
  const placeHolderText = !!options.length ? (options.length > 1 ? selectOne : inputObject?.choices[0]?.name) : '';

  useEffect(() => {
    setOptions(inputObject.choices);
    if (inputObject?.choices) {
      const selected = inputObject.choices.find((opt) => opt?.id === formData[`${inputObject.id}`]);
      setSelectedValue(selected);
    }
  }, [formData, inputObject.choices, inputObject.id]);

  const classes = useStyles();

  return (
    <Controller
      name={`${inputObject.id}`}
      control={control}
      defaultValue={selectedValue ?? ''}
      shouldUnregister={true}
      render={({ onChange, value, ref, ...props }) => (
        <Autocomplete
          id={`virtualize-list-autocomplete-${parentFormId}-${inputObject.id}`}
          data-qa={`test-virtualize-list-autocomplete-${parentFormId}-${inputObject.id}`}
          onChange={(e, data) => {
            onChange(data?.id);
            setFormData();
          }}
          value={selectedValue ?? ''}
          classes={classes}
          disabled={options.length <= 1}
          ListboxComponent={VirtualizedListComponent}
          renderGroup={renderGroup}
          options={options}
          groupBy={(option) => option.name[0].toUpperCase()}
          renderOption={(option) => (
            <Typography noWrap>
              <SecurityGroupLabel option={option} labels={inputObject?.securityGroupLabels} />
            </Typography>
          )}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name ?? ''}
          filterOptions={filterOptionsFunction}
          renderInput={(params) => (
            <TextField
              {...params}
              data-qa={'test-autocomplete-virtual-list-text-field-label'}
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
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
              }}
              placeholder={placeHolderText}
            />
          )}
        />
      )}
    />
  );
}
