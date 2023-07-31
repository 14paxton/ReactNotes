import React from 'react';
import { cleanup, configure, screen } from '../test/test-utils';
import TextBox from './TextBox';
import MutationObserver from 'mutation-observer';
import renderWithReactHookForm from '../test/renderWithReactHookForm';

global.MutationObserver = MutationObserver;
HTMLCanvasElement.prototype.getContext = jest.fn();
configure({ testIdAttribute: 'data-qa' });
afterEach(cleanup);

const basicFormData = {
  defaultValues: {
    firstName: 'Vic',
    lastName: 'Vinegar'
  }
};

const advFormData = {};

const inputObject = {
  id: 'firstName',
  type: 'text',
  label: {
    key: 'groups.create.group.modal.results.table.basic.search.firstname',
    default: 'First Name'
  }
};

describe('TextBox', () => {
  beforeEach(() => {
    renderWithReactHookForm(
      <TextBox parentFormId={'testMe'} inputObject={inputObject} />,
      {
        defaultValues: { ...basicFormData, ...advFormData }
      }
    );
  });

  it('TextBox should render withouth crashing', async () => {
    expect(screen.getByText('First Name'));
  });
});
