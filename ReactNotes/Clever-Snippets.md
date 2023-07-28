# Print separate page from current page

<a href="https://gist.github.com/14paxton/8bf4b0df10a7c4add52c9d4d2da88879"> print pre-defined page </a>

# Working with Canvas to create image

https://github.com/14paxton/IFrameComponent/blob/main/CanvasFunctions.js

# Force an Update

```javascript
    const [, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);
```

# recursive component example

```javascript
const RecursiveWrapper = props => {
    const wrappedChildren = React.Children.map(props.children, child => {
        if (child.props && child.props.children) {
            return (<RecursiveWrapper>
                {child.props.children}
            </RecursiveWrapper>)
        }
        return (<div>
            {'children: 0'}
        </div>)
    })
    return (<React.Fragment>
        {`children: ${wrappedChildren.length}`}
        <div>
            {wrappedChildren}
        </div>
    </React.Fragment>)
}

```

# dynamic component

```javascript
const WebApp = (props) => {
    return (<div>
        {config.map((componentName) => componentMapping[componentName];
            return <Component />;})}
    </div>);
};
```

# Force Load a JS script file

```javascript
import React, {useState, useEffect} from 'react';
import './style.css';

export default function App() {
    const [user, setUser] = useState(false);
    const [scriptLoadingState, setScriptLoadingState] = useState('IDLE');

    useEffect(() => {
        if (user) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://www.google-analytics.com/analytics.js';
            script.onload = function () {
                setScriptLoadingState('LOADED');
            };
            script.onerror = function () {
                setScriptLoadingState('FAILED');
            };
            document.body.appendChild(script);
        }
    }, [user]);

    return (<div>
        <button
            onClick={() => setUser(true)}
            style={{width: '200px', height: '30px', fontSize: '16px'}}
        >
            Login
        </button>
        <h2>
            Script Loading State:{' '}
            <span
                style={{
                    color: scriptLoadingState === 'IDLE'
                           ? 'grey'
                           : scriptLoadingState === 'LOADED'
                             ? 'green'
                             : 'red',
                }}
            >
                {scriptLoadingState}
            </span>
        </h2>
    </div>);
}
```
# hyperlink

```javascript
<Link to={`/products/${product.id}`}>{product.name}</Link>
```
> Rather than `<a>`

# Creating tags

```javascript
    Ul > (li[className = 'test')
2
```

# Access the Dom

```javascript
    Const
username = React.createRef() [create
reference
]
;

<input ref={this.username} id="username"
       type="text" className="form-control"/> [set
reference
]

const username = this.username.current.value;
[use ref]
```

# Conditional Rendering

```javascript
    {
    error && <div className="alert
      alert-danger">{error}</div>
}
```

# Axios

## Patch()

>       Used to update 1 or more properties

```javascript
        Axios.patch(apiEndpoint + '/' + post.id, {
    title: post.title
});
```

## Put()

>        Update all properties

```javascript
  axios.put(apiEndpoint + '/' + post.id, post)

```

## Interceptors

```javascript
        axios.interceptors.response.use(success, error)

this.props.history.push('/');
```

# used to navigate

```javascript
this.props.history.push('/');
```

```javascript
localStorage.setItem('token', response.headers['x-auth-token']);
```

# set local storage and access response header, need to have backend make headers visible> set local storage and access response header, need to have backend make headers visible

```.header("access-control-expose-headers", "x-auth-token")```

# dangerouslySetInnerHTMLset html in a string

```javascript 
{ __html: '<p>' + result?.themeSummary + '. <i>Theme Of Significance.</i></p> '}

< Tooltip title={<div dangerouslySetInnerHTML={modifiedToolTip}/>} childrenDisplayStyle="inline">
```

# useEffect()

> used after browser repaints DOM

> react will prioritize UI

```javascript
React.useEffect(() => {

// Will be invoked on the initial render

// and all subsequent re-renders.

>
})
```

```javascript
React.useEffect(() => {

// Will be invoked on the initial render

// and when "id" or "authed" changes.

>
}, [id, authed])
```

```javascript
React.useEffect(() => {

// Will only be invoked on the initial render

>
}, [])
```

```javascript
React.useEffect(() => {

    return () => {

// invoked right before invoking

// the new effect on a re-render AND

// right before removing the component

// from the DOM

    }
```

