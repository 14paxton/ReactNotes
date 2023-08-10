---  
title:        Clever-Snippets    
permalink:    ReactNotes/Clever-Snippets    
category:     ReactNotes    
parent:       ReactNotes    
layout:       default    
has_children: false    
share:        true    
shortRepo:  
  
- clever-snippets  
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
# Print separate page from current page      
  
<a href="https://gist.github.com/14paxton/8bf4b0df10a7c4add52c9d4d2da88879"> print pre-defined page </a>      
  
# Working with Canvas to create image  
  
- [IFrameComponent](https://github.com/14paxton/IFrameComponent/blob/main/CanvasFunctions.js)  
  
# Force an Update  
  
```javascript      
    const [, updateState] = React.useState();  
const forceUpdate = React.useCallback(() => updateState({}), []);      
```      
  
# recursive component example  
  
## template  
  
```javascript      
const RecursiveWrapper = props => {  
  
    const wrappedChildren = React.Children.map(props.children, child => {  
        if (child.props && child.props.children) {  
            return <RecursiveWrapper>  
                {child.props.children}  
            </RecursiveWrapper>  
        }  
  
        return <div>  
            {'children: 0'}  
        </div>  
    })  
  
    return <React.Fragment>  
        {`children: ${wrappedChildren.length}`}  
        <div>  
            {wrappedChildren}  
        </div>  
    </React.Fragment>  
}    
```      
  
## use case  
  
```javascript    
import React, {forwardRef, useCallback, useEffect, useState} from "react";  
import PropTypes from "prop-types";  
import {styled} from "@material-ui/styles";  
  
const ChildContainer = styled('div')({});  
  
const RecursiveComponent = forwardRef(({parentRefHandler, nodeNameOrIdArray, children, ...rest}, ref) => {  
    const [containerRef, setContainerRef] = useState(null);  
    const [elementMounted, setElementMounted] = useState();  
    const [elementRef, setElementRef] = useState(null);  
    const [childrenObject, setChildrenObject] = useState({});  
  
    //passing callback to ref will set a container reference    
    const setContainer = useCallback((element) => {  
        if (element && !elementRef?.current && (nodeNameOrIdArray.indexOf(elementRef?.current?.nodeName) === -1 || nodeNameOrIdArray.indexOf(elementRef?.current?.nodeName) === -1)) {  
            const innerContainer = element.firstElementChild  
            innerContainer.id = `RecursiveComponent_Child_Container`  
            setContainerRef(innerContainer)  
        }  
    }, [children],);  
  
    //once container ref is set, we know the element has mounted    
    useEffect(() => {  
        if (containerRef) {  
            setElementMounted(true)  
        }  
    }, [containerRef]);  
  
    //once the element has mounted we need to query the child elements for any ids or element names that were passed in    
    // from the nodeNameOrIdArray prop    
    //if the element is found it will be added to the object with the name in the array    
    // all unspecified children will be put in an array    
    useEffect(() => {  
        if (containerRef && elementMounted === true && containerRef.children) {  
            const children = {unnamedChildren: []}  
  
            for (const el of containerRef.children) {  
                let foundElement  
  
                nodeNameOrIdArray.forEach((name, index) => {  
                    foundElement = el.querySelector(name)  
                    if (foundElement) {  
                        foundElement.id = `${name}_${index}`  
                                          ? `${name}_${index}`  
                                          : `nested_element_id_${index}`  
                        children[name] = foundElement  
                    }  
                })  
                if (!foundElement) children.unnamedChildren.push(el)  
            }  
  
            setElementRef(ref)  
            setChildrenObject(children)  
        }  
    }, [elementMounted]);  
  
    //after seting a reference to the needed element we can run the method/handler that was passed down    
    useEffect(() => {  
        if (parentRefHandler && childrenObject) {  
            parentRefHandler(childrenObject)  
        }  
    }, [childrenObject]);  
  
  
    return (<ChildContainer ref={setContainer}>  
        {React.cloneElement(children, rest)}  
    </ChildContainer>);  
})  
  
RecursiveComponent.propTypes = {  
    children: PropTypes.instanceOf(Object), nodeNameOrIdArray: PropTypes.array  
}  
  
RecursiveComponent.defaultProps = {  
    nodeNameOrIdArray: []  
}  
export default RecursiveComponent    
```    
  
# dynamic component  
  
```javascript      
const WebApp = (props) => {  
    return <div>  
        {config.map((componentName) => {  
            componentMapping[componentName]  
            return <Component/>;  
        })}  
    </div>  
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
    Ul > (li[className = 'test'])    
```      
  
# Access the Dom  
  
> [React Docs](https://react.dev/learn/manipulating-the-dom-with-refshttps://react.dev/learn/manipulating-the-dom-with-refs)  
  
```javascript      
// create ref    
Const  
username = React.createRef()  
           // [setreference]    
           < input  
ref = {this.username}  
id = "username"  
type = "text"  
className = "form-control" / >  
// use ref    
const username = this.username.current.value;    
```      
  
- alt  
  
```javascript    
const element = <div ref={ref}/>;  
  
// ...    
  
ref.current; // DOM element    
  
```    
  
- alt  
  
```javascript    
export default function Component(props) {  
    const nodeRef = useRef();  
  
    useEffect(() => {  
        console.log(nodeRef.current);  
    }, []);  
  
    // Root Node    
    return <input ref={nodeRef}/>;  
}    
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
 Axios.patch(apiEndpoint + '/' + post.id, {title: post.title});      
```      
  
## Put()  
  
> Update all properties  
  
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
  
})      
```      
  
```javascript      
React.useEffect(() => {  
// Will be invoked on the initial render      
// and when "id" or "authed" changes.      
  
}, [id, authed])      
```      
  
```javascript      
React.useEffect(() => {  
// Will only be invoked on the initial render      
  
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
})    
```    
  
## check for unmounting  
  
```javascript    
useEffect(() => {  
    return () => console.log('unmounting...');  
})    
```    
  
## clean on unmount  
  
```javascript    
useEffect(() => {  
    let isMounted = true;  
    register('interviewModelId');  
  
    fetchInterviewModels().then((data) => {  
        if (isMounted) setAssessmentChoiceList(data);  
        setSelectedInterviewModel(data);  
    });  
  
    if (!groupDetails) {  
        register({name: 'assessmentOrderIds'}, {  
            required: errorMessages.assIdsRequired, validate: (value) => value.length <= maxGroupMembers || errorMessages.maxGroupMembers  
        });  
    }  
    return () => {  
        isMounted = false;  
    };  
}, [errorMessages.assIdsRequired, errorMessages.maxGroupMembers, groupDetails, maxGroupMembers, register, setSelectedInterviewModel]);  
  
```  
  
# Gists  
  
## [DynamicToolTip.js](https://gist.github.com/14paxton/9c745874ec384add89c1908c73832594)  
  
## [PrintPresetPage.js](https://gist.github.com/14paxton/8bf4b0df10a7c4add52c9d4d2da88879)  
  
## [DynamicInternationalizedComponent.js](https://gist.github.com/14paxton/bd94c13e40f4faa41d65442d015b2a1f)