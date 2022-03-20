 

·       PM Install

o   Run npm install to install dependencies

·       Remove Node Modules

o   Add to scripts in package.json

§  "build": "npm build",

§  "clean": "rm -rf node_modules",

§  "reinstall": "npm run clean && npm install",

§  "rebuild": "npm run clean && npm install && npm run build",

o   To run scripts use npm run [scriptName]

·      Install version of react

o   Npm I -g create-react-app@1.5.2

·      Find and kill instance by port

o   netstat -ano | findstr :3000

o   taskkill /PID 8880 /F

·      Install Prop types

o   Npm I prop-types

o   https://reactjs.org/docs/typechecking-with-proptypes.html

·      Install lodash

o   Npm I lodash

·       Install routing

o   Npm I react-router-dom

·       Working with query strings

o   Npm I query-strings

·       Validation

o   Npm I joy-browser

·       http clients

o   axios

o   jquery ajax

o   fetch api

·       TOASTER

o   NPM I react-toastify

o   In app.js

§  import {ToastContainer} from "react-toastify";

§  import "react-toastify/dist/ReactToastify.css";

§  add toast container to main return

·       LOGGING

o   Sentry.io

o   $ npm install @sentry/browser

o   https://docs.sentry.io/platforms/javascript/react/

·       JSON Web Token decode

o   Npm I jwt-decode@2.2.0

·       DEPLOY

o   Yarn pack -> tar -xvzf /path/to/yourfile.tgz -C /path/where/to/extract/
o  

 

Change ip or port when running

https://dev.to/kevinmel2000/nodejs-reactjs-change-host-and-port-number-70b

https://stackoverflow.com/questions/42083275/running-react-code-on-other-machine

In Linux and Mac terminals, it would be

$export PORT=5000
$export HOST=IP ADDRESS

In Windows, the command is slightly different

$env:PORT=5000
$env:HOST=IP ADDRESS

 

·       <Link to={`/products/${product.id}`}>{product.name}</Link>

o   Rather than <a>

·       Creating tags

o   Ul>(li[className=’test’)*2

·       Access the Dom

o   Const username = React.createRef() [create reference]

o   <input ref={this.username} id="username" type="text"className="form-control"/> [set reference]

o   const username = this.username.current.value; [use ref]

·       Conditional Rendering

o   {error && <div className="alert alert-danger">{error}</div>}

·       AXIOS

o   Patch()

§  Used to update 1 or more properties

§  Axios.patch(apiEndpoint + ‘/’ + http://post.id , {title: post.title});

o   Put()

§  Update all properties

·       axios.put(apiEndpoint + '/' + http://post.id , post)

o   Interceptors

§  axios.interceptors.response.use(success, error)

this.props.history.push('/');

            used to navigate

localStorage.setItem('token', response.headers['x-auth-token']);

            set local storage and access response header, need to have back end make headers visible

                                    .header("access-control-expose-headers", "x-auth-token")

-for hovering

            -use onMouseOver() and onMouseOut()

dangerouslySetInnerHTML- set html in a string

·       {__html: '<p>' + result?.themeSummary +'. <i>*Theme Of Significance.</i></p>'}

·       <Tooltip title={<div dangerouslySetInnerHTML={modifiedToolTip}/>} childrenDisplayStyle="inline">

 

useEffect()

o   -used after browser repaints DOM

o   -react will prioritize UI

React.useEffect(() => {

  // Will be invoked on the initial render

  // and all subsequent re-renders.

})

 

React.useEffect(() => {

  // Will be invoked on the initial render

  // and when "id" or "authed" changes.

}, [id, authed])

 

React.useEffect(() => {

  // Will only be invoked on the initial render

}, [])

 

 

React.useEffect(() => {

 

  return () => {

    // invoked right before invoking

    // the new effect on a re-render AND

    // right before removing the component

    // from the DOM

  }

})

 

-Example-

    

-the order- render, side effect, render, cleanup, side effect-

-getting window size-

·      const [width, setWidth] = React.useState(window.innerWidth)
const [height, setHeight] = React.useState(window.innerHeight)

·       event listener for resize

o   window.addEventListener("resize", listener)

// const [width, setWidth] = useState(window.innerWidth)
// const[padding, setPadding] = useState(0)
//
// const handleResize = ()=>{
//   const x = (window.innerWidth < 1440 && window.innerWidth > 970)
//     ? 1440 - window.innerWidth
//     : 0;
//
//   setPadding(x)
// }
//
// useEffect(() => {
//   window.addEventListener("resize", handleResize);
//
//   if(window.innerWidth < 1440 && window.innerWidth > 960 ){
//     setPadding(1440 - window.innerWidth )
//   }
// }, []);

 

Ellipsis example

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tooltip } from '@talentplus/formation-ui';
import { styled } from '@material-ui/styles';

const EllipsisModifier = ({ textToModify, maxTextLength, ...rest }) => {
  const [toolTipText, setToolTipText] = useState('');
  const [label, setLabel] = useState('');
  const textContainerRef = useRef();

  const setToolTip = useCallback(() => {
    const modify = textContainerRef?.current?.offsetWidth < textContainerRef?.current?.scrollWidth;
    setToolTipText(modify ? textToModify : '');
  }, [textToModify]);

  useEffect(() => {
    const textTooLong = textToModify.length > maxTextLength;

    if (maxTextLength) {
      setLabel(textTooLong ? textToModify.substring(0, maxTextLength) + '...' : textToModify);
      setToolTipText(textTooLong ? textToModify : '');
    } else {
      window.addEventListener('resize', setToolTip);
      setLabel(textToModify);
      setToolTip();
    }
  }, [maxTextLength, setToolTip, textToModify]);

  const TextContainer = styled('div')({
    wordBreak: 'break-all',
    whiteSpace: 'nowrap',
    overflow: !maxTextLength ? 'hidden' : 'unset',
    textOverflow: !maxTextLength ? 'ellipsis' : 'unset'
  });

  return (
    <TextContainer ref={textContainerRef} {...rest} data-qa={'text-container-for-ellipis-text'}>
      <Tooltip title={toolTipText} childrenDisplayStyle='inline' data-qa={'tooltip-for-ellipis-text'}>
        {label}
      </Tooltip>
    </TextContainer>
  );
};

export default EllipsisModifier;

 

 

 

 

 

-React.useReducer(reducerFunction, initialValue, intializerFunction)

export const resultsNameMapReducer = (resultsNameMap, payload) => {
  const { action, data } = payload;
  const { FILTER, NEW_DATA, REMOVE_ALL } = GROUP_RESULT_NAME_MAP;

  switch (action) {
    case FILTER:
      data.forEach((result) => {
        if (!resultsNameMap.has(result.id)) {
          resultsNameMap.set(
            result.id,
            `${result.firstName} ${result.lastName}`
          );
        }
      });
      return resultsNameMap;
    case NEW_DATA:
      return new Map(
        data.map((result) => [
          result.id,
          `${result.firstName} ${result.lastName}`
        ])
      );
    case REMOVE_ALL:
      return new Map();
    default:
      return resultsNameMap;
}
};

 

function resultsNameMapInit(groupMembers) {
  return new Map(
    groupMembers.map((result) => [
      result.id,
      `${result.firstName} ${result.lastName}`
    ])
  );
}

 

 

const [resultsNameMap, resultsNameMapDispatch] = useReducer(
  resultsNameMapReducer,
  groupMembers,
  resultsNameMapInit
);

 

 

React Suspense - React 16.6 added a <Suspense> component that lets you “wait” for some code to load and declaratively specify a loading state (like a spinner) while we’re waiting:

https://reactjs.org/docs/portals.html

 

React Portals - Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

https://reactjs.org/docs/concurrent-mode-suspense.html

 

 

JEST

 

Modify existing object in test

     const modifiedProps = JSON.parse(JSON.stringify(defaultProps))

 

REACT-TESTING

            -MUTATION OBSERVER-

            global.MutationObserver = class {

  constructor(callback) {}

  disconnect() {}

  observe(element, initObject) {}

};
or

global.MutationObserver = MutationObserver;

HTMLCanvasElement

      HTMLCanvasElement.prototype.getContext = jest.fn();
·       fire button example

import React from 'react'

import {render, fireEvent} from 'react-testing-library'

import Counter from '../lessons/02-testing-hooks'

 

test('counter increments the count', () => {

  const {container} = render(<Counter />)

  const button = container.firstChild

  expect(button.textContent).toBe('0')

  fireEvent.click(button)

  expect(button.textContent).toBe('1')

})

o  

ENZYME

https://enzymejs.github.io/enzyme/docs/api/selector.html

https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/find.html

 

·      expect(wrapper.find('.App-intro').exists()).toBe(true)

·      expect(wrapper.find('ul').children().length).toBe(3)

·      expect(wrapper.find('ul').hasClass('tyler')).toBe(true)

·      expect(wrapper.find('h1').text()).toBe('Welcome to React')

·      expect(wrapper.find('[href="tyler"]').text()).toBe('Welcome to React')

·      expect(wrapper.find('[href="tyler ~ .clark"]').text()).toBe('Welcome to React')

·      expect(wrapper.find('[text="Some title"]').text()).toBe('Welcome to React')

·      We can use the object property selector to find nodes by passing in an object that matches the property of a node as a selecto

o   expect(wrapper.find({alt: 'logo'}).text()).toBe('Welcome to React')

·      https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/setProps.html

·       it('test with enzyme', () => {

  const container = shallow(

      <GoalCreationForm
        {...defaultProps}
        currentStep={GOAL_CREATION_WIZARD.LANDING}
      />
  );

  container.setProps({owner: {
      id: 123,
      accountInfo: { clientSetupId: 1 },
      userInfo : {
        firstName: "John",
        lastName: 'Wayne',
        preferredName: "TheDuke"
      }
    }
  })

  console.log(container.find({'data-qa' : 'goals-creation-title-name'}).at(0).html());
  console.log(container.find({'data-qa' : 'goals-creation-title-name'}).html());
  console.log(container.find({'data-qa' : 'goals-creation-title-name'}).text());
  console.log(container.debug());
  console.log(container.find("[variant='h5']").html());
  expect(container.find({'data-qa' : 'goals-creation-title-name'}).exists()).toBe(true);
  expect(container.find({'data-qa' : 'goals-creation-title-name'}).text()).toBe('Creating Goal for TheDuke Wayne');
});

·      use mount to fully render, can only set props on root, use dive to access child components

·      To test a component (with Jest) that contains <Route> and withRouter you need to import Router in you test

o   import { BrowserRouter as Router } from 'react-router-dom';

o    it('containts stuff', ()=>{
  const wrapper = mount(<Router><Footer/> </Router> )
  console.log(wrapper.find('FooterContainer').html())

expect(wrapper.find('a[href="https://talentmine.talentplus.com/s/contactsupport"]').text()).toBe('Contact Support')

})

REACT TESTING LIB

Good example in solution https://stackoverflow.com/questions/62049553/how-to-use-test-id-in-material-ui-textfield

 

        -Use queryBy   to test if something should be null

      it('ellipsis should not appear for shared result viewer role', async () => {

    render(

        <LanguageProvider>

            <CurrentUserContext.Provider value={{ user: sharedResultViewer }}>

            <Members data={members} />

            </CurrentUserContext.Provider>

        </LanguageProvider>

    );



    const ellipsisColumn = await waitFor(() => screen.queryByTestId('ellipses-action-buttons-members-table'))

    expect(ellipsisColumn).toBeNull()

});
 

 

 

·      Firing events

o   import userEvent from '@testing-library/user-event'

§  fire event and set value

·      fireEvent.change(input, { target: { value: 'GroupA' } })

·    userEvent.type(input, 'GroupA')

·      Getting component

o   const {getByTestId, queryByTestId} = render (<CreateGroupForm groups={groupNames}/>)

·      Testing component

o   expect(input).toHaveValue('GROUP')

 

//needed due to tooltip calling document.createRange
// otherwise will get error: Uncaught [TypeError: document.createRange is not a function]
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
});

 

 

 

 

REACT-HOOK-Forms

       -testing context

       https://medium.com/javascript-in-plain-english/using-react-hook-form-in-component-tests-497180abf3c0

 

function renderWithReactHookForm(ui, { defaultValues = {} } = {}) {
  const Wrapper = ({ children }) => {
    const methods = useForm({ defaultValues });
    return (
      <LanguageProvider>
        <FormProvider {...methods}>{children}</FormProvider>
      </LanguageProvider>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper })
  };
}

describe('BasicSearch', () => {
  beforeEach(() => {
    renderWithReactHookForm(<BasicSearch />, {
      defaultValues: {
        firstName: 'Vic',
        lastName: 'Vinegar'
      }
    });
  });

  it('BasicSearch should render withouth crashing', async () => {
    expect(screen.getByTestId('group-first-name-search-input'));
  });

  it('first and last name inputs should have value', async () => {
    expect(screen.getByTestId('group-first-name-search-input').value).toEqual(
      'Vic'
    );
    expect(screen.getByTestId('group-last-name-search-input').value).toEqual(
      'Vinegar'
    );
  });
});

 

-fire submit from parent

     const submitMyForm = (data)=>{

    formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))

}
 

 

 

-using controller component with select and autocomplete

 

<Controller
  name={'users'}
  control={control}
  rules={{
      required: "One user is required",
    validate: (value) => (value.length < 11 ? true : 'Max of 10 results may be shared at a time.')
  }}
  render={({ onChange, value, ref, ...props }) => (
    <Autocomplete
      multiple
      id='tags-standard'
      options={userIds}
      onChange={(e, data) => onChange(data)}
      getOptionLabel={(option) => `${userOptions[option].firstName} ${userOptions[option].lastName}`}
      filterSelectedOptions
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
              color="primary"
            label={`${userOptions[option].firstName} ${userOptions[option].lastName}`}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          label='Search Users'
          placeholder='Enter first name and/or last name'
          InputLabelProps={{
            shrink: true,
            'data-qa': 'score-sheet-result-statement-label',
            style: {
              fontSize: '20px',
              color: 'black',
              display: 'block',
              fontFamily: 'Open Sans, sans-serif',
              fontWeight: 700
            }
          }}
          error={!!errors?.users}
          helperText={errors?.users?.message}
        />
      )}
      {...props}
    />
  )}
/>




<Controller

  name={'testSelect'}

  control={control}

  defaultValue={currency}

  render={({ onChange, ...props }) => (

    <TextField

      id='standard-select-currency'

      select

      label='Select'

      onChange={(e, data) => onChange(data.props.value)}

      helperText='Please select your currency'

      {...props}

    >

      {currencies.map((option) => (

        <MenuItem key={option.value} value={option.value}>

          {option.label}

        </MenuItem>

      ))}

    </TextField>

  )}

/>
 

 

 

-Material UI styling

  

·      passing props to styles

·      https://blog.logrocket.com/8-awesome-features-of-styled-components/

const Button = styled.button`

    padding: 2px 5px;

    color: ${props => props.theme.color};

    border-radius: 3px;

`

 

const Div = styled.div`

    padding: 10px;

    color: ${props => props.theme.color};

    border: 1px solid ${props => props.theme.borderColor};

·      https://stackoverflow.com/questions/62471093/better-way-to-use-material-system-with-styled-components

 

·       https://stackoverflow.com/questions/64213154/how-to-use-custom-props-and-theme-with-material-ui-styled-components-api-typesc

·      https://material-ui.com/styles/basics/#adapting-based-on-props

·      Preserving white space in typography

o   https://developer.mozilla.org/en-US/docs/Web/CSS/white-space

o   <Typography data-qa="written-analysis-text" variant="body1" style={{whiteSpace: 'pre-wrap'}}>

·       

Material-Table

·       table ref https://stackoverflow.com/questions/56264459/how-can-i-use-tableref-onrowselected-to-update-the-ui-via-the-onrowclick-propert

·       selectors https://github.com/mbrn/material-table/issues/515

o   https://github.com/mbrn/material-table/issues/686

 

· 

 

 
