import React from 'react';
import { cleanup, configure, screen } from '../test/test-utils';
import RadioGroup from './RadioGroup';
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
  id: 'sendStatus',
  type: 'radio',
  defaultSelection: 'all',
  choices: [
    {
      id: 'all',
      key: 'create.group.modal.results.table.advanced.search.sendStatus.all',
      default: 'All'
    },
    {
      id: 'failed',
      key: 'create.group.modal.results.table.advanced.search.sendStatus.failed',
      default: 'Failed'
    }
  ]
};

describe('RadioGroup', () => {
  beforeEach(() => {
    renderWithReactHookForm(
      <RadioGroup
        parentFormId={'testMe'}
        inputObject={inputObject}
        formData={advFormData}
      />,
      {
        defaultValues: { ...basicFormData, ...advFormData }
      }
    );
  });

  it('RadioGroup should have all selected ', async () => {
    const checked = screen.getByTestId('testMe-sendStatus-radio-option-all').querySelector('input[type="radio"]');
    expect(checked).toHaveProperty('checked', true);
  });
});
