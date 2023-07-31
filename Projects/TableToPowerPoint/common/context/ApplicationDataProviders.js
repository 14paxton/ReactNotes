import React from 'react';
import CurrentUserProvider from './CurrentUserProvider';
import { Box, CircularProgress } from '@material-ui/core';

import GoalsProvider from 'containers/investment/common/context/GoalsProvider';
import DirectReportsProvider from 'containers/investment/common/context/DirectReportsProvider';
import DownlineReportsProvider from 'containers/investment/common/context/DownlineReportsProvider';
import TalentsProvider from 'containers/investment/common/context/TalentsProvider';

const DataResolver = ({ children }) => {
  const loading = false;
  // const { loading: goalsLoading } = useContext(GoalsContext);
  // const { loading: talentsLoading } = useContext(TalentsContext);
  // const { loading: directReportsLoading } = useContext(DirectReportsContext);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        width="100vw"
      >
        <CircularProgress />
      </Box>
    );
  }

  return children;
};

const ApplicationDataProviders = ({ children }) => {
  return (
    <>
      <CurrentUserProvider>
        <GoalsProvider>
          <DirectReportsProvider>
            <DownlineReportsProvider>
              <TalentsProvider>
                <DataResolver>{children}</DataResolver>
              </TalentsProvider>
            </DownlineReportsProvider>
          </DirectReportsProvider>
        </GoalsProvider>
      </CurrentUserProvider>
    </>
  );
};

export default ApplicationDataProviders;
