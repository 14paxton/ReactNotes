// worker.js
// eslint-disable-next-line no-restricted-globals
const workercode = () => {
    // eslint-disable-next-line no-restricted-globals
    self.onmessage = function(event) {
        // self.importScripts("./testModule"); // eslint-disable-line no-restricted-globals
        // eslint-disable-line no-restricted-globals
        const {data} = event
        if (data === "table-resize") {
            self.postMessage("rebuild-ppt")// eslint-disable-line no-restricted-globals
        }
    };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
