import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CurrentUserContext from './CurrentUserContext';
import { authenticateUser, hasCoreAccess, redirectToLogin, retrieveAccessToken } from '../util/auth.utils';
import ErrorLandingPage from '../util/ErrorLandingPage';
import { getCoreLoginPath } from '../util/env';
import { externalRedirect } from '../util/ExternalRedirect';
import { initializeGtm } from '../util/gtm';

const CurrentUserProvider = (props) => {
  const { location } = props;
  const { search } = location;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { accessToken, refreshToken } = await retrieveAccessToken(search);
      return authenticateUser(null, accessToken, refreshToken);
    };
    const onLogin = () => {
      const path = getCoreLoginPath();
      const search = window.location.search
        ? window.location.search.substring(1)
        : `customRedirectUrl=${encodeURIComponent(`/v2/groups`)}`;
      const redirectUrl = `${path}&${search}`;
      externalRedirect(redirectUrl);
    };

    const updateData = async () => {
      let currentUser;
      try {
        currentUser = await fetchCurrentUser();
        if (!currentUser) {
          //No access token found, redirect to splash page
          // redirectToLogin();
          onLogin();
          return;
        }
      }
      catch (e) {
        console.error('Unable to fetch user', e);
        redirectToLogin();
        return;
      }
      updateUser(currentUser);
    };

    updateData();
  }, [search]);

  const updateUser = (user) => {
    setUser(user);

    // sets the info about the currently logged in user in the data layer for GTM
    initializeGtm({
      dataLayer: {
        user_id: user?.id?.toString(),
        user_client_name: user?.accountInfo?.clientName
      }
    });

    // sets the info about the currently logged in user as attributes for NR logging
    if (typeof window.newrelic == 'object') {
      window.newrelic.setCustomAttribute('user_id', user?.id?.toString());
      window.newrelic.setCustomAttribute(
        'user_client_name',
        user?.accountInfo?.clientName
      );
    }
  };
  if (user && !hasCoreAccess(user)) {
    return <ErrorLandingPage />;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        updateUser
      }}
      {...props}
    />
  );
};

export default withRouter(CurrentUserProvider);
