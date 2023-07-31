import {useFormContext} from 'react-hook-form';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const inputStyles = {
    backgroundColor: 'white'
};

const TextBox = ({parentFormId, inputObject, setFormData, formData}) => {
    const {register, errors} = useFormContext();
    const label = inputObject?.label
                  ? inputObject?.label
                  : '';
    const inputId = `${parentFormId}.${inputObject.id}`

    const textReg = register(inputId)


    return (
        <TextField
            id={inputId}
            name={inputId}
            ref={textReg?.ref}
            label={label}
            onChange={e => {
                setFormData({ regFormat: {[inputId]: e.target.value},
                    childToParentFormat : {[inputObject.id]:  { [parentFormId]: e.target.value  }}
                })

                textReg?.onChange(e)
            }}
            margin="normal"
            variant="filled"
            type={'number'}
            value={formData && formData[`${parentFormId}`][`${inputObject.id}`]}
            error={!!errors?.[inputId]}
            helperText={errors?.[inputId]?.message}
            InputLabelProps={{
                shrink:    true,
                'data-qa': `${parentFormId}-${inputObject.id}-user-label`
            }}
            inputProps={{
                'data-qa': `${parentFormId}-${inputObject.id}-user-input`,
                style:     {...inputStyles}
            }}
        />
    );
};

export default TextBox;
