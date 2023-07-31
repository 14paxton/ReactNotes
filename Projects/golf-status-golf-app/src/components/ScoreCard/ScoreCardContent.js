import FieldsAccordion from "../FormFields/FieldsAccordion";
import React, {useEffect, useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";


const ScoreCardContent = ({golferStats, setGolferStats, scoreCard, selectedUsers, selectedCourse}) => {
    const handleScoreChange = (data)=>{
        setGolferStats(data)
    }

    return (
        <>
            {!scoreCard
             ? <CircularProgress color='inherit' size={20}/>
             : scoreCard?.map((holeData, index) => {
                    return (
                        <FieldsAccordion
                            setFormData={handleScoreChange}
                            formData={golferStats}
                            startExpanded={false}
                            fieldsObject={holeData.scoreCardHoleFormInputs}
                            key={`${index}-field-accordian`}
                        />
                    )
                })}
        </>

    );
}

export default ScoreCardContent;
