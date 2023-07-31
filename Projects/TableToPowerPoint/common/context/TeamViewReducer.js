/**
 * Reducer Implementation for team view
 */

export default (state, action) => {
  switch (action.type) {
    // set state data along with graphIndex
    case 'extractAndSetInfo':
      return {
        ...state,
        teamData: action.payload.teamData,
        graphDataMapForTalentGrid: action.payload.graphDataMapForTalentGrid,
        assessmentsForTalentGrid: action.payload.assessmentsForTalentGrid,
        graphDataMap: action.payload.graphDataMap,
        assessments: action.payload.assessments,
        graphIndex: action.payload.graphIndex,
        accessibleResultPresent: action.payload.accessibleResultPresent
      };
    // Set graphIndex state only
    case 'setGraphIndex':
      return {
        ...state,
        graphIndex: action.payload.graphIndex
      };
    case 'setCompareTeamsData':
      return {
        ...state,
        teamData: action.payload.teamData,
        graphDataMapForTalentGrid: action.payload.graphDataMapForTalentGrid,
        assessmentsForTalentGrid: action.payload.assessmentsForTalentGrid,
        graphDataMap: action.payload.graphDataMap,
        assessments: action.payload.assessments,
        graphIndex: action.payload.graphIndex,
        accessibleResultPresent: action.payload.accessibleResultPresent,
        isSharedComparison: action.payload.isSharedComparison
      };
    default:
      return state;
  }
};
