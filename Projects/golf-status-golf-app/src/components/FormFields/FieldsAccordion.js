import React, { useState } from 'react';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { FormControl, useTheme } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextBox from './TextBox';
import {useFormContext} from "react-hook-form";

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
        backgroundColor: `${theme.palette.primary}`,
        borderBottom: '2px solid rgba(0, 0, 0, .125)',
        marginBottom: 0,
        minHeight: 56,
        padding: 0,
        width: '100%',
        '&:hover': {
            backgroundColor: `${theme.palette.primary}`
        },
        '&$expanded': {
            minHeight: 56,
            backgroundColor: `${theme.palette.primary}`
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
        text: TextBox
    };

    const accordionLabel = fieldsObject?.accordionLabel ? fieldsObject?.accordionLabel : ''

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
                    <Typography variant={'body1'} style={{whiteSpace: 'pre-wrap'}}>{accordionLabel}</Typography>
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
