import React, {useState, useEffect, useRef} from 'react';
import {styled} from "@material-ui/core";
import MuiButton from "@material-ui/core/Button";
import {generateRulesAll} from "../util/filterCSSRules";

const StyledClearButton = styled(MuiButton)({
    backgroundColor: '#B1BDDD', border: 'none', boxShadow: '0px 0px 3px 2px #777777', borderRadius: '4rem', borderWidth: '2px', display: 'flex', margin: 25, padding: 5
});

function Print() {
    const [isLoading, setIsLoading] = useState(true);
    const [srcdoc, setSrcDoc] = useState('');
    const printFrame = useRef(null);

    const handleMessage = async (event) => {
        if (event.data.action === 'tGrid-loaded') {
            const tGridTable = document.getElementById("no_mods")
            let cache = {}

            const cssString = await generateRulesAll(tGridTable, cache)
            console.log("product css", cssString)
            const tableHeader = tGridTable.firstElementChild
            const tableBody = tGridTable.lastElementChild
            const newTable = document.createElement('table')
            const newHeader = document.createElement('thead')
            newHeader.innerHTML = tableHeader.innerHTML
            const newBody = document.createElement('tbody')
            newBody.innerHTML = tableBody.innerHTML

            newTable.id = "iframe_table"
            newTable.appendChild(newHeader)
            newTable.appendChild(newBody)

            const usedStyles = document.getElementsByTagName('style')
            let usedStylesString = ''
            for (let i = 0; i < usedStyles.length; i++) {
                usedStylesString +=  usedStyles.item(i).innerText
            }

            const srcHTML = `<head>
                                <style>
                               ${cssString}
                                </style>
                                </head>
                               <body>
                                    ${newTable.outerHTML}
                               </body>`
            setIsLoading(false);
            setSrcDoc(srcHTML)
        }
    };

    const printIframe = (id) => {
        //raw js
        // const iframe = document.getElementById(id);
        // const iframeWindow = iframe.contentWindow

        const iframeWindow = printFrame.current.contentWindow
        printFrame.current.focus()

        iframeWindow.print();
        return false;
    };

    useEffect(() => {
        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (<>
            <iframe
                id="tGrid"
                //set source if you have predefined page
                src="data:text/html,rawr"
                srcDoc={srcdoc}
                style={{display: 'none'}}
                title="grid_table"
                ref={printFrame}
            />
            <StyledClearButton onClick={() => printIframe("tGrid")}>{isLoading
                                                                     ? 'Loading...'
                                                                     : 'Print TGrid'}</StyledClearButton>

        </>);
}

export default Print;
