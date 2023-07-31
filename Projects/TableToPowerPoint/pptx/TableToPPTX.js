import React, {forwardRef, useCallback, useEffect, useRef} from 'react';
import {usePagedRowsToBuildPPTX} from "./util/PPTXHooks";
import PPTTableHeader from "./PPTTableHeader";
import RecursiveComponent from "./PPTTableHeader";

const PPTXHeader = forwardRef((props, ref) => {
    const {assessmentName, nameForGridGrouping, children, ...rest} = props

    return (<div style={{display: "none"}}>
        <PPTTableHeader ref={ref} nameForGridGrouping={nameForGridGrouping} assessmentName={assessmentName} {...rest}>
            {children}
        </PPTTableHeader>
    </div>);
})

const RenderedTableAndPPTSlides = forwardRef(({assessmentName, nameForGridGrouping, setClickExport, children, ...rest}, ref) => {
    const [pptTableObject, handleTableRef, handleHeaderRef, handleCardsRef] = usePagedRowsToBuildPPTX(true, assessmentName, nameForGridGrouping)
    const tableRef = ref
                     ? ref
                     : useRef()
    const pptxHeaderRef = useRef();
    const nodesToFind = ["TABLE"]

    const handleCallback = useCallback((obj) => {
        if (obj.hasOwnProperty("TABLE")) handleTableRef(obj["TABLE"])
        if (obj.hasOwnProperty("unnamedChildren") && obj["unnamedChildren"].length > 0) handleCardsRef(obj["unnamedChildren"])
    }, []);


    useEffect(() => {
        handleHeaderRef(pptxHeaderRef)
    }, [pptxHeaderRef]);

    const handleClick = useCallback(() => {
        if (!!pptTableObject?.writePPT && (typeof pptTableObject.writePPT === 'function')) {
            const writePPT = pptTableObject?.writePPT
            writePPT(nameForGridGrouping)
        }
    }, [pptTableObject],);

    useEffect(() => {
        if (!!pptTableObject?.writePPT && (typeof pptTableObject.writePPT === 'function')) {
            setClickExport(() => handleClick);
        }
        else {
            setClickExport(null)
        }
    }, [handleClick]);

    return (<>
        <PPTXHeader ref={pptxHeaderRef} assessmentName={assessmentName} nameForGridGrouping={nameForGridGrouping}/>
        <RecursiveComponent
            ref={tableRef}
            nodeNameOrIdArray={nodesToFind}
            parentRefHandler={handleCallback}
            {...rest}>
            {children}
        </RecursiveComponent>
    </>)
})

const RenderedComponents = forwardRef((props, ref) => {
    const {renderPPTSlides, children, ...rest} = props
    if (!!renderPPTSlides) {
        return <RenderedTableAndPPTSlides {...rest} ref={ref}>
            {children}
        </RenderedTableAndPPTSlides>
    }

    return <>{children}</>
})

export default React.memo(RenderedComponents)
