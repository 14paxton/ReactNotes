## Print separate page from current page
<a href="https://gist.github.com/14paxton/8bf4b0df10a7c4add52c9d4d2da88879"> print pre-defined page </a>


## Working with Canvas to create image
https://github.com/14paxton/IFrameComponent/blob/main/CanvasFunctions.js

## Force an Update
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

## recursive component example
```javascript
const RecursiveWrapper = props => {
    const wrappedChildren = React.Children.map(
        props.children,
        child => {
            if (child.props && child.props.children) {
                return (
                    <RecursiveWrapper>
                        {child.props.children}
                    </RecursiveWrapper>
                )
            }
            return (
                <div>
                    {'children: 0'}
                </div>
            )
        }
    )
    return (
        <React.Fragment>
            {`children: ${wrappedChildren.length}`}
            <div>
                {wrappedChildren}
            </div>
        </React.Fragment>
    )
}

```

## dynamic component
```javascript
const WebApp = (props) => {
  return (
    <div>
      {config.map((componentName) => componentMapping[componentName];
        return <Component />;
      })}
    </div>
  );
};
```

# Force Load a JS script file
```javascript
import React, { useState, useEffect } from 'react';
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

  return (
    <div>
      <button
        onClick={() => setUser(true)}
        style={{ width: '200px', height: '30px', fontSize: '16px' }}
      >
        Login
      </button>
      <h2>
        Script Loading State:{' '}
        <span
          style={{
            color:
              scriptLoadingState === 'IDLE'
                ? 'grey'
                : scriptLoadingState === 'LOADED'
                ? 'green'
                : 'red',
          }}
        >
          {scriptLoadingState}
        </span>
      </h2>
    </div>
  );
}
```