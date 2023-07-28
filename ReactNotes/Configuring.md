# [Change ip or port when running]{.underline}

<https://dev.to/kevinmel2000/nodejs-reactjs-change-host-and-port-number-70b>

<https://stackoverflow.com/questions/42083275/running-react-code-on-other-machine>

> In Linux and Mac terminals, it would be

```export PORT=5000```
```export HOST=IP ADDRESS```

> In Windows, the command is slightly different

```env:PORT=5000```
```env:HOST=IP ADDRESS```

<Link to={`/products/${product.id}`}>{product.name}</Link>

    Rather than <a>

Creating tags

    Ul>(li[className='test')2

Access the Dom

    Const username = React.createRef() [create reference]

    <input ref={this.username} id="username"
      type="text"className="form-control"/> [set reference]

    const username = this.username.current.value; [use ref]

Conditional Rendering

    {error && <div className="alert
      alert-danger">{error}</div>}

[AXIOS]{.underline}

    Patch()

        Used to update 1 or more properties

        Axios.patch(apiEndpoint + '/' + post.id, {title:
          post.title});

    Put()

        Update all properties

            axios.put(apiEndpoint + '/' + post.id, post)

    Interceptors

        axios.interceptors.response.use(success, error)

this.props.history.push('/');

used to navigate

localStorage.setItem('token', response.headers['x-auth-token']);

set local storage and access response header, need to have back end make
headers visible

.header("access-control-expose-headers", "x-auth-token")

[-for hovering]{.underline}

-use onMouseOver() and onMouseOut()

dangerouslySetInnerHTMLset html in a string

{__html: '<p>' + result?.themeSummary +'. <i>Theme Of
Significance.</i></p>'}

<Tooltip title={<div dangerouslySetInnerHTML={modifiedToolTip}/>}
childrenDisplayStyle="inline">

[useEffect()]{.underline}

-used after browser repaints DOM

-react will prioritize UI

React.useEffect(() => {

// Will be invoked on the initial render

// and all subsequent re-renders.

> })

React.useEffect(() => {

// Will be invoked on the initial render

// and when "id" or "authed" changes.

> }, [id, authed])

React.useEffect(() => {

// Will only be invoked on the initial render

> }, [])

React.useEffect(() => {

return () => {

// invoked right before invoking

// the new effect on a re-render AND

// right before removing the component

// from the DOM

}

> })
>
> -Example-
>
> ![](/Users/bpaxton/WebstormProjects/core-client/media/image1.png){width="2.5208333333333335in"
> height="2.9895833333333335in"}
>
> -the orderrender, side effect, render, cleanup, side effect-

## JEST

Modify existing object in test

```javascript

const modifiedProps = JSON.parse(JSON.stringify(defaultProps))

REACT - TESTING

- MUTATION
OBSERVER -

global.MutationObserver = class {
    constructor(callback) {}

    disconnect() {}

    observe(element, initObject) {}
};

or

global.MutationObserver = MutationObserver;

HTMLCanvasElement

HTMLCanvasElement.prototype.getContext = jest.fn();

fire
button
example

import React from 'react'

import {render, fireEvent} from 'react-testing-library'

import Counter from '../lessons/02-testing-hooks'

test('counter increments the count', () => {

    const {container} = render(<Counter/>)

    const button = container.firstChild

    expect(button.textContent).toBe('0')

    fireEvent.click(button)

    expect(button.textContent).toBe('1')

})


```

## Enzyme

<https://enzymejs.github.io/enzyme/docs/api/selector.html>

<https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/find.html>

```javascript

expect(wrapper.find('.App-intro').exists()).toBe(true)

expect(wrapper.find('ul').children().length).toBe(3)

expect(wrapper.find('ul').hasClass('tyler')).toBe(true)

expect(wrapper.find('h1').text()).toBe('Welcome to React')

expect(wrapper.find('[href="tyler"]').text()).toBe('Welcome
to
React
')

expect(wrapper.find('[href="tyler ~.clark
"]').text()).toBe('Welcome to React')

expect(wrapper.find('[text="Some
title
"]').text()).toBe('Welcome to React')
```

We can use the object property selector to find nodes by passing in
an object that matches the property of a node as a selecto

```javascript
    expect(wrapper.find({alt: 'logo'}).text()).toBe('Welcome to React')
```

<https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/setProps.html>

```javascript

it('test with enzyme', () => {

    const container = shallow(<GoalCreationForm
        {...defaultProps}
        currentStep={GOAL_CREATION_WIZARD.LANDING}
    />);

    container.setProps({
        owner: {
            id: 123, accountInfo: {clientSetupId: 1}, userInfo: {
                firstName: "John", lastName: 'Wayne', preferredName: "TheDuke"
            }
        }
    })

    console.log(container.find({
        'data-qa': 'goals-creation-title-name'
    }).at(0).html());
    console.log(container.find({
        'data-qa': 'goals-creation-title-name'
    }).html());
    console.log(container.find({
        'data-qa': 'goals-creation-title-name'
    }).text());
    console.log(container.debug());
    console.log(container.find("[variant='h5']").html());
    expect(container.find({
        'data-qa': 'goals-creation-title-name'
    }).exists()).toBe(true);
    expect(container.find({
        'data-qa': 'goals-creation-title-name'
    }).text()).toBe('Creating Goal for
    TheDuke
    Wayne
    ');
});

```

use mount to fully render, can only set props on root, use dive to
access child components

To test a component (with Jest) that
contains<Route>and withRouter you need to import Router in you
test

```javascript
    import {BrowserRouter as Router} from 'react-router-dom';

it('containts stuff', () => {
    const wrapper = mount(<Router>
        <Footer/>
    </Router>)
    console.log(wrapper.find('FooterContainer').html())

    expect(wrapper.find('a[href="https://talentmine.talentplus.com/s/contactsupport"]').text()).toBe('Contact
    Support
    ')

})
```

## REACT TESTING LIB

### Good example in solution

<https://stackoverflow.com/questions/62049553/how-to-use-test-id-in-material-ui-textfield>

### Use queryBy to test if something should be null

```javascript

it('ellipsis should not appear for shared result viewer role', async () => {
    render(<LanguageProvider>
        <CurrentUserContext.Provider value={{user: sharedResultViewer}}>
            <Members data={members}/>
        </CurrentUserContext.Provider>
    </LanguageProvider>);

    const ellipsisColumn = await waitFor(() => screen.queryByTestId('ellipses-action-buttons-members-table'))
    expect(ellipsisColumn).toBeNull()
});

```

### Firing events

  ```javascript
import userEvent from '@testing-library/user-event'

fire
event
and
set
value

fireEvent.change(input, {
    target: {
        value: 'GroupA'
    }
})

userEvent.type(input, 'GroupA')
```

### Getting component

```javascript
    const {getByTestId, queryByTestId} = render(<CreateGroupForm
    groups={groupNames}/>)
```

### Testing component

```javascript
    expect(input).toHaveValue('GROUP')

```

//needed due to tooltip calling document.createRange
// otherwise will get error: Uncaught [TypeError: document.createRange
is not a function]

```javascript
global.document.createRange = () => ({
    setStart: () => {}, setEnd: () => {}, commonAncestorContainer: {
        nodeName: 'BODY', ownerDocument: document
    }
});
```