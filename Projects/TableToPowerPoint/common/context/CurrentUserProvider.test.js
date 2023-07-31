import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, configure, render, waitFor } from '../test/test-utils';
import CurrentUserProvider from './CurrentUserProvider';
import { authenticateUser, hasCoreAccess, retrieveAccessToken } from '../util/auth.utils';
import { get } from '../util/api';
import CurrentUserContext from './CurrentUserContext';
import MutationObserver from 'mutation-observer';

global.MutationObserver = MutationObserver;

configure({ testIdAttribute: 'data-qa' });

function afterEach(cleanup) {}

afterEach(cleanup);

jest.mock('../util/auth.utils', () => ({
  retrieveAccessToken: jest.fn(),
  authenticateUser: jest.fn(),
  hasCoreAccess: jest.fn()
}));

jest.mock('../util/api', () => ({
  get: jest.fn()
}));

describe('CurrentUserProvider', () => {
  it('should fetch all the data', async () => {
    retrieveAccessToken.mockReturnValue(
      Promise.resolve({ accessToken: 'token', refreshToken: 'refresh' })
    );
    authenticateUser.mockReturnValue(Promise.resolve({ id: 1 }));
    get.mockReturnValue(Promise.resolve({}));
    hasCoreAccess.mockReturnValue(true);

    const { getByTestId } = render(
      <MemoryRouter>
        <CurrentUserProvider>
          <CurrentUserContext.Consumer>
            {({ user }) => {
              if (!user) return 'Loading...';

              return (
                <div>
                  <div data-qa="user">{user.id}</div>
                </div>
              );
            }}
          </CurrentUserContext.Consumer>
        </CurrentUserProvider>
      </MemoryRouter>
    );
    const user = await waitFor(() => getByTestId('user'));
    expect(user).toHaveTextContent('1');
  });
});
