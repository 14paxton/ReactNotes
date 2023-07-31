import React, {useEffect, useState} from 'react';
import MuiTextField from '@material-ui/core/TextField';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import {useFormContext, Controller} from 'react-hook-form';
import {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {ErrorMessage} from '@hookform/error-message';


const Autocomplete = withStyles({
    root:      {
        width:           '100%',
        backgroundColor: 'transparent',
        '&$focused':     {
            backgroundColor: 'transparent'
        }
    },
    input:     {
        fontSize:  '12px',
        textAlign: 'left'
    },
    inputRoot: {
        backgroundColor: 'white !important',
        width:           '100%',
        textAlign:       'left'
    },
    option:    {
        fontSize: '13px'
    },
    focused:   {}
})(MuiAutocomplete);

const filterOptions = createFilterOptions({
    stringify: (option) => `${option.name}, ${option.displayOption}`
});

const TextField = withStyles({
    root: {
        backgroundColor: 'white',
        width:           '100%',
        textAlign:       'left'
    }
})(MuiTextField);

const DropDownSelect = ({parentFormId, inputObject, setFormData, formData}) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const { setValue, control, formState: {errors}} = useFormContext();
    const loading = open && options?.length === 0;
    const label = inputObject.label;
    const inputId =`combo-input-${parentFormId}-${inputObject.id}`;
    const selectOne = 'Select One';
    const placeHolderText = !!options?.length
                            ? (options.length > 1
                               ? selectOne
                               : inputObject?.choices[0]?.displayOption)
                            : '';

    useEffect(() => {
        setOptions(inputObject.choices);
        let newSelectedValue
        if (inputObject?.choices && formData && formData[inputId]) {
            const selected = inputObject.choices.find((opt) => opt === formData[inputId]);

            newSelectedValue = selected
            setValue(inputId, selected);
        }
        setSelectedValue(newSelectedValue
                         ? newSelectedValue
                         : null);
    }, [inputObject, formData]);


    return (
        <Controller
            name={inputId}
            control={control}
            defaultValue={selectedValue ?? []}
            rules={inputObject?.rules
                   ? inputObject?.rules
                   : {}}
            shouldUnregister={true}
            render={({
                field:      {onChange, onBlur, value, name, ref},
                fieldState: {invalid, isTouched, isDirty, error},
                formState,
                ...props
            }) => (
                <Autocomplete
                    data-qa={`${parentFormId}-${inputObject.id}-combo-input`}
                    id={name}
                    open={open}
                    disabled={options?.length <= 1}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    freeSolo
                    filterOptions={filterOptions}
                    getOptionSelected={(option, val) => option.id === val.id}
                    getOptionLabel={(option) => option.displayOption ?? ''}
                    renderOption={(option) => option?.displayOption ?? ''}
                    onChange={(e, data) => {
                        setSelectedValue(data)
                        setFormData({[`${name}`]: data})
                        onChange(data)
                    }}
                    options={options}
                    loading={loading}
                    fullWidth

                    value={selectedValue
                           ? selectedValue
                           : ''}
                    renderInput={(params) =>
                        (
                            <TextField
                                {...params}
                                label={label}
                                inputRef={ref}
                                fullWidth
                                margin='normal'
                                variant='filled'
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                                      <React.Fragment>
                                                          {loading
                                                           ? <CircularProgress color='inherit' size={20}/>
                                                           : null}
                                                          {params.InputProps.endAdornment}
                                                      </React.Fragment>
                                                  )
                                }}
                                placeholder={placeHolderText}
                                helperText={
                                    <ErrorMessage
                                        errors={errors}
                                        name={name}
                                        render={({message}) =>
                                            (<p style={{textAlign: 'center', color: "red"}}>
                                                {message}
                                            </p>)
                                        }
                                    />
                                }
                            />
                        )
                    }
                    {...props}
                />
            )}
        />
    );
}

export default DropDownSelect;
