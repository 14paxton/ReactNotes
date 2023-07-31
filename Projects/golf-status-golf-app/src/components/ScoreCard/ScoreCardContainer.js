import GridLayout from "../ReuseableComponents/GridLayout";
import ScoreCard from "./ScoreCard";
import {useCallback, useEffect, useRef, useState} from "react";
import CourseSelection from "./CourseSelection";
import {useForm, useFormState} from "react-hook-form";
import {FormEnums} from "../Util/enums";

// fire submit programmatically
const submitMyForm = (event, formRef) => {
    formRef?.current?.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}))
}

const ScoreCardContainer = () => {
    const {COURSE_SELECTION_FORM, SCORE_CARD_FORM} = FormEnums
    const [selectedUsers, setSelectedUsers] = useState()
    const [selectedCourse, setSelectedCourse] = useState()
    const [submitLabel, setSubmitLabel] = useState('Create Round')
    const [formType, setFormType] = useState(COURSE_SELECTION_FORM.enumKey)
    const [startRound, setStartRound] = useState(false)
    const methods = useForm({mode: "all"});
    const formRef = useRef();

    const handleCourseSelectionSubmit = (data) => {
        if (data && !methods?.formState?.errors?.length) {
            console.log('submit')
            setStartRound(true)
            setSelectedUsers(data[`multi-select-course-selection-form-availableUsers`])
            setSelectedCourse(data['combo-input-course-selection-form-availableCourses'])
            setSubmitLabel('Publish')
            setFormType(SCORE_CARD_FORM.enumKey)
        }
    }

    const resetForms = () => {
        setSelectedUsers(null)
        setStartRound(false)
        setSelectedCourse(null)
        setSubmitLabel('Create Round')
        setFormType(COURSE_SELECTION_FORM.enumKey)
        methods.reset()
    }


    const buttonArray = [
        {
            id:     'clearForm',
            type:   'button',
            label:  'Reset',
            color:  'secondary',
            action: resetForms
        },
        {
            id:    'submitForm',
            form:  formType,
            type:  'submit',
            label: submitLabel,
            color: 'primary',
            // action: (e) => submitMyForm(e, formRef)
        }
    ]

    return (
        <GridLayout buttonArray={buttonArray}>
            {(selectedUsers && selectedCourse && !methods?.formState?.errors?.length && startRound && !selectedUsers[`multi-select-course-selection-form-availableUsers`] && !selectedCourse['combo-input-course-selection-form-availableCourses'])
             ? <ScoreCard
                 formRef={formRef}
                 selectedUsers={selectedUsers}
                 selectedCourse={selectedCourse}
             />
             : <CourseSelection
                 methods={methods}
                 handleSubmit={handleCourseSelectionSubmit}
                 selectedCourse={selectedCourse}
                 selectedUsers={selectedUsers}
                 setSelectedUsers={setSelectedUsers}
                 setSelectedCourse={setSelectedCourse}
                 formRef={formRef}
             />
            }
        </GridLayout>
    );
};

export default ScoreCardContainer;
