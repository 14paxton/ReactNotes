---  
title: WebWorker      
permalink: ReactNotes/WebWorker      
category: ReactNotes      
parent: ReactNotes      
layout: default      
has_children: false      
share: true      
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
  
# Abstracted WebWorker  
  
> set content security policy if needed in index.html  
  
```html      
  
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; worker-src 'self' blob:;/>      
```      
  
## worker builder file  
  
```javascript      
//worker-builder.js      
export default class WorkerBuilder extends Worker {  
    constructor(worker) {  
        super(worker);  
        const code = worker.toString();  
        const blob = new Blob([`(${code})()`]);  
        return new Worker(URL.createObjectURL(blob));  
    }  
}      
```      
  
## handle worker messaging file  
  
```javascript      
//ppt.worker.js      
// eslint-disable-next-line import/no-anonymous-default-export      
export default () => {  
    // eslint-disable-next-line no-restricted-globals      
    self.onmessage = (message) => {  
        postMessage("rebuild-ppt");  
    };  
};      
```      
  
## using working in compoenent  
  
```javascript      
//use relative path from document baseURL      
// can be set in jsconfig.js      
//{      
/*  "compilerOptions": {      
 "baseUrl": "src"      
 },      
 "include": ["src"]      
 }      
 */  
  
import Worker from "containers/pptx/util/ppt.worker"  
  
const myWorker = new WorkerBuilder(Worker);  
  
  
export const MyWorkerComponent = () => {  
  
    useEffect(() => {  
        myWorker.postMessage("table-resize")  
  
    }, []);  
  
    useEffect(() => {  
        if (window.Worker) {  
            myWorker.onmessage = (message) => {  
                //do work      
            };  
        }  
    }, []);  
  
}      
```      
  
# Self Contained WebWorker  
  
```javascript      
// worker.js      
// import api from "./testModule";      
// eslint-disable-next-line no-restricted-globals      
const workercode = () => {  
    // eslint-disable-next-line no-restricted-globals      
    self.onmessage = function (event) {  
        // self.importScripts("./testModule"); // eslint-disable-line no-restricted-globals      
        // eslint-disable-line no-restricted-globals      
        const {data} = event  
        if (data === "table-resize") {  
            // self.postMessage(api.message()); // eslint-disable-line no-restricted-globals      
            self.postMessage("rebuild-ppt")// eslint-disable-line no-restricted-globals      
        }  
    };  
};  
  
let code = workercode.toString();  
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));  
  
const blob = new Blob([code], {type: "application/javascript"});  
const worker_script = URL.createObjectURL(blob);  
  
module.exports = worker_script;  
  
```      
  
## used in a context  
  
```javascript      
export function TalentGridPPTXProvider({value, children}) {  
    const {setLoadingExportData, isCached, setIsCached} = value  
    const myWorker = useMemo(function () {  
        return new Worker(worker_script)  
    }, []);  
  
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
    }, [])  
  
};  
```      
  
# resources  
  
## [react web workers walkthrough ](https://javascript.plainenglish.io/web-worker-in-react-9b2efafe309c)  
  
## [web worker with sockec](https://www.freecodecamp.org/news/how-webworkers-work-in-javascript-with-example/)