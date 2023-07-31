import Tabs from "../ReuseableComponents/Tabs";
import React, {useEffect, useReducer, useState} from "react";
import ScoreCardContent from "./ScoreCardContent";
import {FormProvider, useForm, useFormContext} from "react-hook-form";
import {FormEnums} from "../Util/enums";
import CurentStandings from "./CurrentStandings";


const styles = {
    color:           '#68C222',
    width:           '33.3%',
    backgroundColor: '#FFFFFF',
    fontSize:        15,
    minWidth:        '50%', textTransform: 'none'
};

const buildGolferObject = (golfers) => {
    return Object.fromEntries(golfers.map(golfer => {
        return [[golfer.id], {name: golfer.displayOption}]

    }))

}


const buildScoreCard = (selectedCourse, selectedUsers) => {
    const holeParObject = {}
    const courseList = selectedCourse?.holes?.map((hole) => {
        holeParObject[hole.id] = {hole: hole?.hole, par: hole.par}

        return (
            {
                scoreCardHoleFormInputs: {
                    id:     `${hole?.id}`,
                    accordionLabel:
                            <span>{`HOLE ${hole?.hole}/  Sponsor: ${hole?.advertiser}/   Par: ${hole?.par}`}</span>,
                    inputs: selectedUsers.map(user => {
                        return {
                            id:    `${user.id}`,
                            type:  'text',
                            label: user?.displayOption
                        }
                    })
                }
            }
        )
    })

    return {holeParObject: holeParObject, courseList: courseList}
}

const reducerGolferTotals = (currentScoresObject, newGolferValue) => {
    const userKey = Object.keys(newGolferValue)
    const newValuesAdded = {...currentScoresObject[userKey], ...newGolferValue[userKey]}
    return {...currentScoresObject, ...{[userKey]: newValuesAdded}}
}

const ScoreCard = ({formRef, selectedUsers, selectedCourse}) => {
    const methods = useForm();
    const [golferObject, setGolferObject] = useState(buildGolferObject(selectedUsers))
    const [holeObject, setHoleObject] = useState()
    const [scoreCard, setScoreCard] = useState()
    const [golferStats, setGolferStats] = useState();
    const {handleSubmit, getValues} = methods;
    const [stateOfGolferScores, reducerGolferScores] = useReducer(reducerGolferTotals, {});

    useEffect(() => {
        const {holeParObject, courseList} = buildScoreCard(selectedCourse, selectedUsers);
        setScoreCard(courseList)
        setHoleObject(holeParObject)

    }, [selectedUsers, selectedCourse]);

    const onSubmit = data => {
        const jsonScoreCard = {[selectedCourse?.displayOption]: {...getValues()}}
        console.log(jsonScoreCard)
    };

    const handleChange = (value) => {
        console.log(stateOfGolferScores)
        reducerGolferScores(value.childToParentFormat)
        setGolferStats({...getValues(), ...value.regFormat})
    }

    const tabs = [
        {
            key:     '1',
            label:   "Score Card",
            content: (<ScoreCardContent
                golferStats={golferStats}
                setGolferStats={handleChange}
                selectedUsers={selectedUsers}
                selectedCourse={selectedCourse}
                scoreCard={scoreCard}
            />)
        },
        {
            key:     '2',
            label:   "Current Standings",
            content: (
                         <CurentStandings
                             holesObject={holeObject}
                             currentStandingsObject={stateOfGolferScores}
                             golferObject={golferObject}
                         />
                     )
        }
    ]

    return (
        <FormProvider {...methods}>
            <form id={FormEnums.SCORE_CARD_FORM.enumKey} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <Tabs
                    tabs={tabs}
                    indicatorColor={'primary'}
                    styling={styles}
                    tabMenuColor={'#FFFFFF'}
                />
            </form>
        </FormProvider>
    );
}

export default ScoreCard;
