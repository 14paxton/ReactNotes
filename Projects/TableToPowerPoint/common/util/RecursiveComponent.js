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
