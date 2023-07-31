import React from 'react';
import { cleanup, configure, screen } from '../test/test-utils';
import TextBoxCombo from './TextBoxCombo';
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

const advFormData = { assessmentCatalog: 'one' };

const inputObject = {
  id: 'assessmentCatalog',
  type: 'combo',
  label: {
    key: 'create.group.modal.results.table.advanced.search.assessmentCatalog',
    default: 'Assessment Catalog'
  },
  choices: [
    {
      id: 'one',
      code: 'opt1',
      name: 'The First Option',
      displayOption: <p>OPTION ONE</p>
    },
    {
      id: 'two',
      code: 'opt2',
      name: 'The Second Option',
      displayOption: <p>OPTION TWO</p>
    }
  ]
};

describe('TextBoxCombo', () => {
  it('TextBoxCombo should render with The First Option label showing ', async () => {
    renderWithReactHookForm(<TextBoxCombo parentFormId={'testMe'} inputObject={inputObject} formData={advFormData} />, {
      defaultValues: { ...basicFormData, ...advFormData }
    });
    console.log(inputObject.choices);
    screen.debug(screen.getAllByTestId('testMe-assessmentCatalog-combo-input'));
    expect(screen.getByText('Assessment Catalog'));
    expect(screen.getByDisplayValue('The First Option'));
  });

  it('TextBoxCombo should be disabled if only 1 catalog ', async () => {
    inputObject.choices.shift();
    renderWithReactHookForm(<TextBoxCombo parentFormId={'testMe'} inputObject={inputObject} formData={advFormData} />, {
      defaultValues: { ...basicFormData, ...advFormData }
    });

    const inputSecondChoice = screen.getByPlaceholderText('The Second Option');
    expect(inputSecondChoice.hasAttribute('disabled'));
  });
});
