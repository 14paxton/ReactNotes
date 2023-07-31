import React, {useCallback, useContext, useEffect, useState} from "react";
import {preLoadTalentGridToPPT} from "./createPPT";
import CurrentUserContext from "common/context/CurrentUserContext";
import {defaultPPTReturnObject} from "./PPTXCommon";
import {useTalentGridPPTXContext} from "../TalentGridPPTXContext";

//hook will build the base64/blob string of html used to generate a new window to display the
// table split into no more than 10 rows
export function usePagedRowsToBuildPPTX(useObserver, pptxTitle, pptxFileName) {
    const {setLoadingExportData, setDataCached, myWorker} = useTalentGridPPTXContext()
    const [pptTableObject, setPptTableObject] = useState(defaultPPTReturnObject());
    const [tableRef, setTableRef] = useState();
    const [headerRef, setHeaderRef] = useState();
    const [cardsRef, setCardsRef] = useState()
    const {user: currentUser} = useContext(CurrentUserContext)

    const buildPPTObject = useCallback(async (currentPPTTableObject) => {
        if (tableRef?.current && headerRef?.current) {
            preLoadTalentGridToPPT(tableRef?.current, headerRef?.current, cardsRef?.current, pptxTitle, pptxFileName, currentUser?.userInfo?.email, 'talent_grid')
                .then(newPPTTableObject => {
                    setPptTableObject({...currentPPTTableObject, ...newPPTTableObject})
                    setLoadingExportData(false)
                })
        }
    }, [tableRef, headerRef, cardsRef]);

    useEffect(() => {
        Promise.resolve(buildPPTObject())
    }, [tableRef]);

    useEffect(() => {
        if (window.Worker && myWorker && tableRef?.current && headerRef?.current) {
            setDataCached(!!pptTableObject?.multiSlideFunction && !!pptTableObject?.singleSlideFunction)
            myWorker.onmessage = (message) => {
                if (message && message.data === 'rebuild-ppt') {
                    (async () => {
                        const table = tableRef?.current
                        const multipleSlideTable = table.tBodies[0]?.rows.length > 10

                        //function to download ppt will be built on first render and first table expansion
                        // saved function can just be reused rather than rebuilding data urls and slides every change
                        if (multipleSlideTable && !!pptTableObject?.multiSlideFunction && (typeof pptTableObject.multiSlideFunction === 'function')) {
                            setPptTableObject({...pptTableObject, writePPT: pptTableObject?.multiSlideFunction})
                        }
                        else if (!multipleSlideTable && !!pptTableObject?.singleSlideFunction && (typeof pptTableObject.singleSlideFunction === 'function')) {
                            setPptTableObject({...pptTableObject, writePPT: pptTableObject?.singleSlideFunction})
                        }
                        else {
                            await buildPPTObject(pptTableObject)
                        }
                    })()
                }
            };
        }
    }, [tableRef, headerRef, cardsRef, pptTableObject]);

    function handleTableRef(ref) {
        if (ref) {
            setTableRef({current: ref})
        }
    }

    function handleHeaderRef(ref) {
        if (ref?.current) {
            setHeaderRef({current: ref.current})
        }
    }

    function handleCardsRef(ref) {
        if (ref) {
            const cardArray = Array.from(ref)
            const cards = cardArray.length > 1
                          ? cardArray
                          : cardArray[0].children
                            ? cardArray[0].children
                            : null
            setCardsRef({current: cards})
        }
    }

    return [pptTableObject, handleTableRef, handleHeaderRef, handleCardsRef]
}

