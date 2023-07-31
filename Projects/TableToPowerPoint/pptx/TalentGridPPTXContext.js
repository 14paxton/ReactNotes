import React, {useCallback, useContext, useEffect, useMemo} from 'react';
import worker_script from "./util/ppt.worker";

// const myWorker = new Worker(worker_script)
const TalentGridPPTXContext = React.createContext({setLoadingExportData: () => {}, setDataCached: () => {}, myWorker: null});

export function useTalentGridPPTXContext() {
    const uc = useContext(TalentGridPPTXContext);
    return uc
           ? uc
           : {setLoadingExportData: () => {}, setDataCached: () => {}, myWorker: null};
}

export function TalentGridPPTXProvider({value, children}) {
    const {setLoadingExportData, isCached, setIsCached} = value
    const myWorker = useMemo(function () {
        return new Worker(worker_script)
    }, []);

    const setDataCached = useCallback((cached) => {
        if (cached) {
            setLoadingExportData(false)
            window.removeEventListener("message", handleMessage);
        }
        setIsCached(cached)
    }, [],);

    const handleMessage = (event) => {
        if (event.data.hasOwnProperty("show_more")) {
            if (!isCached) setLoadingExportData(true)

            if (myWorker) myWorker.postMessage("table-resize")
        }
    }

    useEffect(() => {
        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);

            //make sure webworker is released when component unmounts
            console.log("terminate worker")
            if (myWorker) myWorker.terminate()
        };
    }, []);

    return (<TalentGridPPTXContext.Provider
        value={{setDataCached: setDataCached, setLoadingExportData: setLoadingExportData, myWorker: myWorker}}
    >
        {children}
    </TalentGridPPTXContext.Provider>);
}
