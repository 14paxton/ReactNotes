import React, { useCallback, useReducer } from 'react';
import TeamViewContext from './TeamViewContext';
import {
  fetchTeamData,
  fetchTeamGraphData,
  fetchCompareTeamsData,
  fetchTeamCompareById,
  fetchTeamDataBySharedTeamId
} from '../util/externalAPIs';
import { fetchTeamCompareIndividualsData } from '../util/externalAPIs';
import { checkResultsPermissionStatus } from 'common/util/group.utils';
import teamViewReducer from './TeamViewReducer';

/**
 * Provider Implementation
 * Here, we fetch all the data necessary for TG, Team Average, Talent Roster, and Members Component
 */
const TeamViewProvider = (props) => {
  const initialState = {
    teamData: null,
    graphDataMapForTalentGrid: null,
    assessmentsForTalentGrid: null,
    graphDataMap: null,
    assessments: null,
    graphIndex: 0,
    accessibleResultPresent: false,
    isSharedComparison: false
  };
  const [state, dispatch] = useReducer(teamViewReducer, initialState);

  // Set graph Index
  const setGraphIndex = (index) => {
    dispatch({
      type: 'setGraphIndex',
      payload: {
        graphIndex: index
      }
    });
  };

  // Function to destructure modified graphData
  const getAssessmentsAndGraphDataMapArr = (graphDataModified) => {
    let tempGraphDataMap = [];
    let assessmentArr = [];
    let accessibleResultPresent = false;
    for (let i = 0; i < graphDataModified.length; i++) {
      const eachData = graphDataModified[i];
      let graphMap = {};
      graphMap.graphData = eachData;
      graphMap.assessmentsData = eachData?.talentGridData?.assessmentInfo[0];
      assessmentArr.push(eachData?.talentGridData?.assessmentInfo[0]);
      graphMap.benchmarks = eachData?.talentGridData?.scoringModelDetails;
      let resultPermissionStatus =
        eachData?.defaultGroupMembers?.length > 0
          ? checkResultsPermissionStatus(eachData?.defaultGroupMembers)
          : false;
      if (resultPermissionStatus) {
        graphMap.accessibleResultPresent =
          resultPermissionStatus?.accessibleResultPresent;
        accessibleResultPresent = true;
      }
      tempGraphDataMap.push(graphMap);
    }
    return [tempGraphDataMap, assessmentArr, accessibleResultPresent];
  };

  // Function to set request to fetch team info and graphData for all the catalogs
  const extractAndSetInfo = useCallback(async (teamId, includeManager) => {
    // Setting data just for TalntGrid where data is dependent on includeManager
    const [graphDataModifiedForTalentGrid, teamData] = await Promise.all([
      fetchTeamGraphData(teamId, includeManager),
      fetchTeamData(teamId)
    ]);

    // Setting data for Average, Roster, and members list component without manager's data
    const graphDataMapAndAssessmentArrForTG = getAssessmentsAndGraphDataMapArr(
      graphDataModifiedForTalentGrid
    );
    const graphDataModified = !includeManager
      ? graphDataModifiedForTalentGrid
      : await fetchTeamGraphData(teamId, false);
    const graphDataAssessments = getAssessmentsAndGraphDataMapArr(
      graphDataModified
    );
    dispatch({
      type: 'extractAndSetInfo',
      payload: {
        teamData: teamData,
        graphDataMapForTalentGrid: graphDataMapAndAssessmentArrForTG[0],
        assessmentsForTalentGrid: graphDataMapAndAssessmentArrForTG[1],
        graphDataMap: graphDataAssessments[0],
        assessments: graphDataAssessments[1],
        accessibleResultPresent: graphDataAssessments[2],
        graphIndex: 0
      }
    });
  }, []);

  const extractAndSetInfoForSharedTeams = useCallback(
    async (sharedTeamId, includeManager) => {
      const teamData = await fetchTeamDataBySharedTeamId(sharedTeamId, false);

      if (teamData?.graphData) {
        const graphDataModified = getAssessmentsAndGraphDataMapArr(
          teamData?.graphData
        );

        const teamDataForTG = await fetchTeamDataBySharedTeamId(
          sharedTeamId,
          includeManager
        );
        const teamDataForTGModified = getAssessmentsAndGraphDataMapArr(
          teamDataForTG?.graphData
        );
        dispatch({
          type: 'setCompareTeamsData',
          payload: {
            teamData:
              teamData && teamData.teamDetails ? teamData.teamDetails : {},
            graphDataMap: graphDataModified[0],
            assessments: graphDataModified[1],
            graphDataMapForTalentGrid: teamDataForTGModified[0],
            assessmentsForTalentGrid: teamDataForTGModified[1],
            accessibleResultPresent: graphDataModified[2],
            graphIndex: 0,
            isSharedComparison: true
          }
        });
      } else {
        const graphDataModifiedForTalentGrid = await fetchTeamGraphData(
          teamData?.id,
          includeManager
        );

        const graphDataMapAndAssessmentArrForTG = getAssessmentsAndGraphDataMapArr(
          graphDataModifiedForTalentGrid
        );
        const graphDataModified = !includeManager
          ? graphDataModifiedForTalentGrid
          : await fetchTeamGraphData(teamData?.teamId, false);
        const graphDataAssessments = getAssessmentsAndGraphDataMapArr(
          graphDataModified
        );

        dispatch({
          type: 'extractAndSetInfo',
          payload: {
            teamData: teamData,
            graphDataMapForTalentGrid: graphDataMapAndAssessmentArrForTG[0],
            assessmentsForTalentGrid: graphDataMapAndAssessmentArrForTG[1],
            graphDataMap: graphDataAssessments[0],
            assessments: graphDataAssessments[1],
            accessibleResultPresent: graphDataAssessments[2],
            graphIndex: 0
          }
        });
      }
    },
    []
  );

  const extractAndSetInfoForCompareTeams = useCallback(
    async (teamIds, compareSharedTeam, compareTeamId) => {
      const compareTeamsData = await fetchCompareTeamsData(
        teamIds,
        compareSharedTeam,
        compareTeamId
      );
      const graphDataModified = getAssessmentsAndGraphDataMapArr(
        compareTeamsData?.graphData
      );
      dispatch({
        type: 'setCompareTeamsData',
        payload: {
          teamData:
            compareTeamsData && compareTeamsData.teamDetails
              ? compareTeamsData.teamDetails
              : {},
          graphDataMap: graphDataModified[0],
          assessments: graphDataModified[1],
          graphDataMapForTalentGrid: [],
          accessibleResultPresent: graphDataModified[2],
          graphIndex: 0,
          isSharedComparison: false
        }
      });
      return compareTeamsData;
    },
    []
  );

  const extractAndSetInfoForCompareTeamsSaved = useCallback(
    async (teamCompareId) => {
      const compareTeamsData = await fetchTeamCompareById(teamCompareId, false);
      const graphDataModified = getAssessmentsAndGraphDataMapArr(
        compareTeamsData?.graphData
      );
      dispatch({
        type: 'setCompareTeamsData',
        payload: {
          teamData:
            compareTeamsData && compareTeamsData.teamDetails
              ? compareTeamsData.teamDetails
              : {},
          graphDataMap: graphDataModified[0],
          assessments: graphDataModified[1],
          graphDataMapForTalentGrid: [],
          accessibleResultPresent: graphDataModified[2],
          graphIndex: 0,
          isSharedComparison: false
        }
      });
    },
    []
  );

  const extractAndSetInfoForCompareIndividuals = useCallback(
    async (payload) => {
      let individualComparisonData = {};
      let individualComparisonDataForTG = {};
      if (payload?.savedId) {
        individualComparisonDataForTG = await fetchTeamCompareById(
          payload?.savedId,
          payload?.includeManager
        );
        individualComparisonData = await fetchTeamCompareById(
          payload?.savedId,
          false
        );
      } else {
        individualComparisonDataForTG = await fetchTeamCompareIndividualsData(
          payload?.teamIds,
          payload?.assessmentOrderIds,
          payload?.includeManager
        );
        individualComparisonData = await fetchTeamCompareIndividualsData(
          payload?.teamIds,
          payload?.assessmentOrderIds,
          false
        );
      }
      const teamDetails = individualComparisonData?.teamDetails;
      individualComparisonData = getAssessmentsAndGraphDataMapArr(
        individualComparisonData?.graphData
      );
      individualComparisonDataForTG = getAssessmentsAndGraphDataMapArr(
        individualComparisonDataForTG?.graphData
      );
      dispatch({
        type: 'setCompareTeamsData',
        payload: {
          teamData: teamDetails ? teamDetails : {},
          graphDataMap: individualComparisonData[0],
          assessments: individualComparisonData[1],
          graphDataMapForTalentGrid: individualComparisonDataForTG[0],
          assessmentsForTalentGrid: individualComparisonDataForTG[1],
          accessibleResultPresent: individualComparisonData[2],
          graphIndex: 0,
          isSharedComparison: false
        }
      });
    },
    []
  );

  return (
    <TeamViewContext.Provider
      value={{
        teamData: state.teamData,
        graphDataMapForTalentGrid: state.graphDataMapForTalentGrid,
        assessmentsForTalentGrid: state.assessmentsForTalentGrid,
        graphDataMap: state.graphDataMap,
        assessments: state.assessments,
        graphIndex: state.graphIndex,
        accessibleResultPresent: state.accessibleResultPresent,
        isSharedComparison: state.isSharedComparison,
        extractAndSetInfo,
        extractAndSetInfoForCompareTeams,
        extractAndSetInfoForCompareTeamsSaved,
        extractAndSetInfoForCompareIndividuals,
        extractAndSetInfoForSharedTeams,
        setGraphIndex
      }}
    >
      {props.children}
    </TeamViewContext.Provider>
  );
};

export default TeamViewProvider;
