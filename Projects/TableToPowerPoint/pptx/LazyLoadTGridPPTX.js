import React, {useCallback, useRef, useState} from 'react';
import {TalentGridPPTXProvider} from "./TalentGridPPTXContext";
import TableToPPTX from "./TableToPPTX";

function LazyLoadTGridPPTX({children, ...rest}) {
    const tableRef = useRef()
    const [loadingExportData, setLoadingExportData] = useState(true);
    const [isCached, setIsCached] = useState(false);

    const setTableRef = useCallback(() => {
        return tableRef
    }, []);

    return (<TalentGridPPTXProvider value={{setLoadingExportData, isCached, setIsCached}}>
        <TableToPPTX
            ref={setTableRef}
            loadingExportData={loadingExportData}
            {...rest}>
            {children}
        </TableToPPTX>
    </TalentGridPPTXProvider>);
}

export default LazyLoadTGridPPTX;
