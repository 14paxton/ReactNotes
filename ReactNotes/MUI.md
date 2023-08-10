---  
title:        MUI      
permalink:    ReactNotes/MUI      
category:     ReactNotes      
parent:       ReactNotes      
layout:       default      
has_children: false      
share:        true      
shortRepo:      
  - reactnotes      
  - default                
---  
    
<br/>                
    
<details markdown="block">                      
<summary>                      
Table of contents                      
</summary>                      
{: .text-delta }                      
1. TOC                      
{:toc}                      
</details>                      
    
<br/>                      
    
***                      
    
<br/>      
{% raw %}      
    
# passing props to styles    
    
- <https://blog.logrocket.com/8-awesome-features-of-styled-components/>    
    
```javascript      
const Button = styled.button`      
 padding: 2px 5px;      
 color: ${props => props.theme.color};      
 border-radius: 3px;      
 `      
```      
    
 ```javascript      
const Div = styled.div`      
 padding: 10px;      
 color: ${props => props.theme.color};      
 border: 1px solid ${props => props.theme.borderColor};      
```      
    
# Style inheritance    
    
We can inherit the styling of a styled component by simply passing it to      
the styled function.    
    
```javascript      
      
      
import styled from "styled-components"      
      
const Div = styled.div`      
adding: 10px;      
color: palevioletred;      
`      
component.const      
InheritedDiv = styled(Div)`border: 1px solid palevioletred;`      
      
```      
    
This InheritedDiv will have the styling of the Div component as well as      
its own styling.    
    
padding: 10px;    
    
color: palevioletred;    
    
border: 1px solid palevioletred;    
    
# Passing props    
    
Props can be passed to styled components just as they are with regular      
React components (class or functional). This is possible because styled      
components are actually React components.    
    
```javascript      
const Button = styled.button`      
padding: 2px 5px;      
color: white;      
border-radius: 3px;      
`      
      
const Div = styled.div`      
padding: 10px;      
color: palevioletred;      
border: 1px solid palevioletred;      
`      
```      
    
styled-components creates a React component, which renders an HTML tag      
corresponding to the property in the styled object.    
    
Button will create and render a button HTML tag, while Div will create      
and render a div tag. They are components, so we can pass props to them.    
    
```javascript      
<Button color="black">Click Me</Button>      
      
<Div borderColor="green"></Div>      
```      
    
This will make styled-components pass props containing the color to the      
Button component and props containing the borderColor to the Div      
component. We can then get the props in the tagged template literal by      
using a function.    
    
```javascript      
const Button = styled.button`      
padding: 2px 5px;      
color: ${props => props.color      
                  ? props.color      
                  : "white"};      
border-radius: 3px;      
`      
      
const Div = styled.div`      
padding: 10px;      
color: palevioletred;      
border: 1px solid ${props => props.borderColor      
                             ? props.borderColor      
                             : "palevioletred"};      
`      
```      
    
The functions in the tagged template literals will receive a props args,      
which is the props passed to the Components. This enables us to      
reference the color and borderColor we passed to the Button and Div      
components, which makes the styling of styled-components dynamic.    
    
styled-components provides theming capabilities and enables you to      
support multiple looks and feels.    
    
To do that, we'll use the ThemeProvider component.    
    
```javascript      
      
import {ThemeProvider} from "styled-components"      
      
Let      
's set up a theme object to hold the CSS styling we want to apply to      
our      
styled      
components.const      
theme = {      
    boderColor: "green", color: "green", bgColor: "green"      
}      
```      
    
The theme object holds colors for the border-color, color, and bgColor.    
    
Now, we have two components: Button and Div. Let's use the theme on      
them.    
    
```javascript      
const Button = styled.button`      
padding: 2px 5px;      
color: ${props => props.theme.color};      
border-radius: 3px;      
`      
      
const Div = styled.div`      
padding: 10px;      
color: ${props => props.theme.color};      
border: 1px solid ${props => props.theme.borderColor};      
`      
```      
    
As you can see, they are accessing the theme property in their props.      
ThemeProvider passes the theme object as a props to the components.    
    
Finally, we'll render the Div and Button components between the      
ThemeProvider tags and pass the theme object to a theme props in the      
ThemeProvider.    
    
```javascript      
<ThemeProvider theme={theme}>      
    <Div>      
        <Button>Click Me</Button>      
    </Div>      
</ThemeProvider>      
```      
    
The theme object will be provided to the children of ThemeProvider in      
their props.    
    
So now if we change any property value in the theme object,      
ThemeProvider will pass along the changes to the children and Div and      
Button will change their styling accordingly.    
    
# Global styling    
    
Most of the styling we've done thus far has been specific to the      
components. The styled-components framework also enables you to create      
global styles to be applied to all styled components.    
    
First, import createGlobalStyle.    
    
```javascript      
import {createGlobalStyle} from "styled-components/macro"      
      
```      
    
Create a globalStyles.js file.    
    
```javascript      
// globalStyles.js      
export default createGlobalStyle`      
html {      
margin: 0;      
}      
body {      
margin: 0;      
}      
`      
```      
    
Next, import it in the App    
    
```javascript      
component.import      
GlobalStyle      
from      
"./globalStyles"      
      
function App() {      
    return (<GlobalStyle/>      
    <AppTree/>      
)      
}      
```      
    
GlobalStyle is rendered first before the rest of the app tree. This will      
apply the global styling to all components in the app tree.    
    
# Switching component types    
    
Styled components are dynamic in nature. They can change from creating      
and rendering one HTML element to another.    
    
```javascript      
      
const Button = styled.button`      
padding: 2px 5px;      
color: ${props => props.theme.color};      
border-radius: 3px;      
`      
```      
    
The Button component will create and render a button element. We can      
change that when rendering the Button component by passing the as props      
to it with whatever HTML tag name we want it to change to.    
    
```javascript      
<Button as="a">Click Me</Button>      
```      
    
This will create and render an anchor element. The as="a" changes it      
from rendering a button element to rendering an anchor element.    
    
This can also be done using the withComponent method.    
    
```javascript      
const Button = styled.button`      
padding: 2px 5px;      
color: palevioletred;      
border-radius: 3px;      
`      
      
const Link = Button.withComponent("a")      
```      
    
Link is a styled component that will render the a anchor element with      
the CSS styling of Button applied to it.    
    
# Styling regular components    
    
You can turn regular components into styled components by calling the styled() function with the component, then with the template literals containing the styling code.    
    
```javascript      
function Button(props) {      
    return (<button className={props.className}>      
        {props.children}      
    </button>)      
}      
```      
    
Here we have a Button component that renders a button element. Notice that we set a className attribute to the button element and assigned its value to be from props.className. This is so the      
inherited styling will be applied to the button element.    
    
To turn this component into a styled component, pass it to the styled() function.    
    
```javascript      
Button = styled(Button)`      
padding: 2px 5px;      
border-radius: 3px;      
border: 1px solid palevioletred;      
`      
```      
    
This will style the button element in the Button component with the CSS styling in the template literal. Button will render a button element with the following CSS code.    
    
padding: 2px 5px;      
border-radius: 3px;      
border: 1px solid palevioletred;    
    
# Specifying attributes    
    
You can add attributes to the HTML elements rendered by the styled      
components.    
    
```javascript      
const Input = styled.input`      
    font-size: 14px;      
    padding: 2px 5px;      
    border: 1px solid green;      
`      
```      
    
Input will render and input element. Input elements have different      
types, including:    
    
- text    
    
- number    
    
- password    
    
- email    
    
These are specified in the input element by using the type attribute. To      
tell styled-components the type of input element you want, use the attrs      
method.    
    
```javascript      
const Input = styled.input.attrs({      
    type: "text"      
})`      
    font-size: 14px;      
    padding: 2px 5px;      
    border: 1px solid green;      
`      
```      
    
This will create an input element with type text. We can also add other attributes to styled components.    
    
```javascript       
const Input = styled.input.attrs({      
    type: "text", placeholder: "Type anything here..."      
})`      
    font-size: 14px;      
    padding: 2px 5px;      
    border: 1px solid green;      
`      
      
const PasswordInput = styled.input.attrs({      
    type: "password", placeholder: "Type your password here..."      
})`      
    font-size: 14px;      
    padding: 2px 5px;      
    border: 1px solid green;      
`      
```      
    
# Use with other CSS frameworks    
    
Finally, you can use styled-components with any CSS framework.    
    
For example, let's create a Button component with Bootstrap styling.    
    
```javascript      
const PrimaryButton = styled.button.attrs({      
      
    className: "btn btn-prmiary"      
      
})`      
      
outline: none;      
      
`      
```      
    
We used the attrs method to add a className attribute to the component      
with btn btn-primary value. This will make Bootstrap apply its styling      
to the component.    
    
The same goes for other CSS frameworks.    
    
```javascript      
const MatButton = styled.button.attrs({      
    className: "mat-button"      
})`      
outline: none;      
`      
```      
    
# Customize form field    
    
```javascript      
import React from 'react';      
import PropTypes from 'prop-types';      
import classNames from 'classnames';      
import {withStyles} from '@material-ui/core/styles';      
import MenuItem from '@material-ui/core/MenuItem';      
import TextField from '@material-ui/core/TextField';      
      
const styles = theme => ({      
    container:    {      
        display: 'flex', flexWrap: 'wrap',      
    }, textField: {      
        marginLeft: theme.spacing.unit, marginRight: theme.spacing.unit, width: 200,      
    },      
      
    cssLabel: {      
        color: 'green'      
    },      
      
    cssOutlinedInput: {      
        '&$cssFocused $notchedOutline': {      
            borderColor: `${theme.palette.primary.main} !important`,      
        }      
    },      
      
    cssFocused: {},      
      
    notchedOutline: {      
        borderWidth: '1px', borderColor: 'green !important'      
    },      
      
});      
      
class ValidField extends React.Component {      
    state = {      
        name: 'InputMode',      
    };      
      
    handleChange = name => event => {      
        this.setState({      
            [name]: event.target.value,      
        });      
    };      
      
    render() {      
        const {classes} = this.props;      
      
        return (<form className={classes.container} noValidate autoComplete="off">      
            <TextField      
                id="standard-name"      
                label="Name"      
                className={classes.textField}      
                value={this.state.name}      
                onChange={this.handleChange('name')}      
                margin="normal"      
                variant="outlined"      
                InputLabelProps={{      
                    classes: {      
                        root: classes.cssLabel, focused: classes.cssFocused,      
                    },      
                }}      
                InputProps={{      
                    classes:      {      
                        root: classes.cssOutlinedInput, focused: classes.cssFocused, notchedOutline: classes.notchedOutline,      
                    }, inputMode: "numeric"      
                }}      
            />      
        </form>);      
    }      
}      
      
ValidField.propTypes = {      
    classes: PropTypes.object.isRequired,      
};      
      
export default withStyles(styles)(ValidField);      
      
```      
    
## References    
    
· https://stackoverflow.com/questions/62471093/better-way-to-use-material-system-with-styled-components    
    
· https://stackoverflow.com/questions/64213154/how-to-use-custom-props-and-theme-with-material-ui-styled-components-api-typesc    
    
· https://material-ui.com/styles/basics/#adapting-based-on-props      
{% endraw %}