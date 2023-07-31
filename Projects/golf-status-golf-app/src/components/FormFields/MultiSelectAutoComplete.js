import React, {useEffect, useState} from 'react';
import MuiTextField from '@material-ui/core/TextField';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import {Controller} from 'react-hook-form';
import withStyles from '@material-ui/core/styles/withStyles';
import {useFormContext} from 'react-hook-form';
import {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {Chip} from "@material-ui/core";
import {ErrorMessage} from "@hookform/error-message";


const AutoComplete = withStyles({
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

//can create custom filter options
// const filterOptions = createFilterOptions({
//     stringify: (option) => `${option.name},${option.code}`
// });

const TextField = withStyles({
    root: {
        backgroundColor: 'white',
        width:           '100%',
        textAlign:       'left'
    }
})(MuiTextField);

const buildTags = (value, getTagProps) => {
    return value.map((option, index) => {
        return (
            <Chip
                color='primary'
                label={`${option?.displayOption}`}
                {...getTagProps({index})}
            />)
    })
}

export default function MultiSelectAutoComplete({parentFormId, inputObject, setFormData, formData}) {
    const [options, setOptions] = useState([]);
    const {control, formState: {errors}, setValue, getValues} = useFormContext();
    const [loading, setLoading] = useState(options.length === 0);
    const [selectedValue, setSelectedValue] = useState()
    const label = inputObject.label;
    const selectOne = 'Select One';
    const inputId = `multi-select-${parentFormId}-${inputObject.id}`
    const placeHolderText = !!options.length
                            ? (options.length > 1
                               ? selectOne
                               : inputObject?.choices[0]?.name)
                            : '';

    useEffect(() => {
        setOptions(!!inputObject?.choices?.length
                   ? inputObject?.choices
                   : []);
        setLoading(false)


        let newSelectedValue
        if (inputObject?.choices && formData && formData[inputId]) {
            const selected = inputObject.choices.filter((opt) => {
                return formData[inputId].includes(opt)
            });

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
            render={({
                field:      {onChange, onBlur, value, name, ref},
                fieldState: {invalid, isTouched, isDirty, error},
                formState,
                ...props
            }) => (
                <AutoComplete
                    loading={loading}
                    multiple
                    disabled={options?.length <= 1}
                    data-qa={`${parentFormId}-${inputObject.id}-combo-input`}
                    id={name}
                    options={options}
                    noOptionsText={'No Users Available'}
                    onChange={(e, data) => {
                        setFormData(
                            {[name]: data}
                        )
                        setSelectedValue(data)
                        onChange(data)
                    }}
                    value={selectedValue
                           ? selectedValue
                           : []}

                    //can create custom filter options
                    // filterOptions={filterOptions}

                    getOptionLabel={(option) => `${option?.selectOption ?? ''}`}
                    filterSelectedOptions
                    renderTags={buildTags}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            data-qa={`${parentFormId}-${inputObject.id}-combo-input-text-field`}
                            variant='outlined'
                            inputRef={ref}
                            label={label}
                            placeholder={placeHolderText}
                            InputLabelProps={{
                                shrink:    true,
                                'data-qa': `${parentFormId}-${inputObject.id}-combo-input-input-label`,
                                style:     {
                                    fontSize:   '20px',
                                    color:      'black',
                                    display:    'block',
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 700
                                }
                            }}
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
                    )}
                    {...props}
                />
            )}
        />
    );
}
