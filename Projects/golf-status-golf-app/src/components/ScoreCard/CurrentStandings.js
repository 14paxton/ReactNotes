
import React from "react";
import Typography from "@material-ui/core/Typography";

const CurentStandings = ({currentStandingsObject, golferObject, holesObject}) => {

    return (

        Object.entries(currentStandingsObject).map(([userId, userScoresObject])=>{
            const aboverOrBelowPar = Object.entries(userScoresObject).reduce((total, [holeId, userScore])=>{
                console.log(total)
                console.log(holesObject[holeId])
                console.log(userScore)

                total += userScore - holesObject[holeId].par
                return total
            }, 0)

            console.log(golferObject)
            const abovePar = aboverOrBelowPar >+ 0 ? true : false
            const color = !abovePar ? "green" : "red"
         return   <Typography variant={'body1'} style={{whiteSpace: 'pre-wrap', color: color}}>{golferObject[userId].name}:   {aboverOrBelowPar}</Typography>
        })

    );
}

export default CurentStandings;
