import React from 'react';
import { cleanup, configure, screen } from '../test/test-utils';
import SelectBox from './SelectBox';
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

const advFormData = { assessmentType: 'P2P' };

const inputObject = {
  id: 'assessmentType',
  type: 'select',
  label: {
    key: 'create.group.modal.results.table.advanced.search.assessmentType',
    default: 'Assessment Type'
  },
  choices: [
    {
      id: 'P2P',
      key:
        'create.group.modal.results.table.advanced.search.assessmentType.select.p2p',
      default: 'Structured Interview'
    },
    {
      id: 'AO6',
      key:
        'create.group.modal.results.table.advanced.search.assessmentType.select.ao6',
      default: 'Talent Online Assessment'
    }
  ]
};

describe('SelectBox', () => {
  beforeEach(() => {
    renderWithReactHookForm(
      <SelectBox
        parentFormId={'testMe'}
        inputObject={inputObject}
        formData={advFormData}
      />,
      {
        defaultValues: { ...basicFormData, ...advFormData }
      }
    );
  });

  it('SelectBox should have P2P selected', async () => {
    expect(screen.getByText('Structured Interview'));
  });
});
