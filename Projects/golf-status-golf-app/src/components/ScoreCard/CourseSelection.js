import React, {useEffect, useRef, useState} from "react";
import {availableUsersObject, getUsersSelectionList} from "../../services/userService";
import MultiSelectAutoComplete from "../FormFields/MultiSelectAutoComplete";
import {FormProvider, useForm, useFormContext} from "react-hook-form";
import {availableCourseObject, fetchGolfCourses} from "../../services/golfCourseService";
import DropDownSelect from "../FormFields/DropDownSelect";
import {FormEnums} from "../Util/enums";

const CourseSelection = ({methods, handleSubmit, formRef, selectedCourse, selectedUsers, setSelectedUsers, setSelectedCourse}) => {

    const [courseList, setCourseList] = useState(availableCourseObject);
    const [userList, setUserList] = useState(availableUsersObject);

    useEffect(() => {
        const getData = async () => {
            const [users, courses] = await Promise.all([
                getUsersSelectionList(),
                fetchGolfCourses()
            ]);

            setUserList(users);
            setCourseList(courses)
        }
        getData().then(() => console.log('course selection data retrieved'))

    }, []);

    const onSubmit = (data) => {
        handleSubmit(data)
    };

    return (
        <>
            {(courseList && userList) &&
             <FormProvider {...methods}>
                 <form
                     id={FormEnums.COURSE_SELECTION_FORM.enumKey}
                     ref={formRef}
                     onSubmit={methods.handleSubmit(onSubmit)}
                 >
                     <MultiSelectAutoComplete
                         parentFormId={'course-selection-form'}
                         inputObject={userList ?? []}
                         formData={selectedUsers}
                         setFormData={setSelectedUsers}
                     />
                     <DropDownSelect
                         parentFormId={'course-selection-form'}
                         inputObject={courseList ?? []}
                         formData={selectedCourse}
                         setFormData={setSelectedCourse}
                     />
                 </form>
             </FormProvider>}
        </>
    );
};

export default CourseSelection;
