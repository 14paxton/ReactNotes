import {createClone} from "./CloneHTML";
import {customExpectationCardCSS, defaultSlideObject} from "../../containers/pptx/util/PPTXCommon";

function svgToDataURL(svg) {
    return Promise.resolve()
                  .then(() => new XMLSerializer().serializeToString(svg))
                  .then(encodeURIComponent)
                  .then((html) => `data:image/svg+xml;charset=utf-8,${html}`)
}

function nodeToDataURL(node, width, height,) {
    return new Promise(resolve => {
        const xmlns = 'http://www.w3.org/2000/svg'

        const foreignObject = document.createElementNS(xmlns, 'foreignObject')
        foreignObject.setAttribute('width', '100%')
        foreignObject.setAttribute('height', '100%')
        foreignObject.setAttribute('x', '0')
        foreignObject.setAttribute('y', '0')
        foreignObject.setAttribute('externalResourcesRequired', 'true')

        const svg = document.createElementNS(xmlns, 'svg')
        svg.setAttribute('width', `${width}`)
        svg.setAttribute('height', `${height}`)
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

        svg.appendChild(foreignObject)
        foreignObject.appendChild(node)
        resolve(svgToDataURL(svg))
    })

}

function createImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.crossOrigin = 'anonymous'
        img.decoding = 'sync'
        img.src = url
    })
}

function buildCanvas(img) {
    return new Promise(resolveCanvas => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const canvasHeight = img.height
        const canvasWidth = img.width
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        canvas.style.width = `${canvasWidth}`
        canvas.style.height = `${canvasHeight}`
        context.drawImage(img, 0, 0, canvas.width, canvas.height)

        resolveCanvas(defaultSlideObject(canvas.toDataURL("image/png", 1.0), canvas.width, canvas.height))
    })
}

//this is similar to how html2canvas and html-to-image libraries work
// take element -> get generated css -> create ans svg(needed to paint canvas element) ->
// use svg to create xml then uri data string -> use data uri to create image element by adding uri to src attribute ->
// create a canvas element inserting/drawing image in -> get dataURL to use
export function createElementToPNGBase64(elementObjects, dimensionsObj, addIndividualElementCSS, newDocumentCallback) {
    if (elementObjects) {
        return new Promise((resolve, reject) => {
            elementsToNewDocument(elementObjects, dimensionsObj, addIndividualElementCSS)
                .then(({clonedElementsObject, width, height,}) => {

                    const dataURLPromises = Object.values(clonedElementsObject).map(newDocument => {
                        return new Promise(resolveURL => {
                            if (newDocumentCallback && newDocumentCallback instanceof Function) {
                                newDocumentCallback(newDocument.documentElement)
                            }
                            resolveURL(nodeToDataURL(newDocument.documentElement, width, height)
                                .then(createImage)
                                .then(buildCanvas))
                        })
                    })

                    Promise.all(dataURLPromises).then(dataURLArray => {
                        if (dataURLArray) {
                            resolve(dataURLArray)
                        }
                        else {
                            console.error("unable to create data urls")
                            reject("no data urls created")
                        }
                    })
                })
        })
    }
}

export function buildGroupedElementsForSlide(groupedElements) {
    return new Promise(async (resolve, reject) => {
        if ((groupedElements instanceof Map)) {
            const promises = []
            groupedElements.forEach((customElementCSSFunction, group) => {
                promises.push(groupedElementsToBase64(group, customElementCSSFunction))
            })

            Promise.all(promises).then(resolve)
        }
        else (reject("need map of elements to build additional slides"))
    })
}

//pass map of elements grouped by what should be placed together
//array is the key, with a callback function for specific needs on the element as the value
//arg [[e,e,e] => f(), [e,e,e] => f(), [e,e,e] => f()]
export function groupedElementsToBase64(groupedElements, customElementCSSFunction) {
    return new Promise(async (resolve, reject) => {
        const usableArray = Array.isArray(groupedElements)
                            ? groupedElements
                            : [groupedElements]

        //map first level 1:[[2:],[2:]]
        const groupPromises = usableArray.map((group, groupIndex) => {
            return new Promise(resolveGroup => {
                const groupArray = Array.isArray(group)
                                   ? group
                                   : [group]

                //map second level
                const dataURLPromises = groupArray.map((element, elementIndex) => {
                    return new Promise(resolveElementToImage => {
                        const innerElement = element.childElementCount > 1
                                             ? element
                                             : element.firstChild
                        const {nodeClone, widthToSet, heightToSet} = buildNewNodeClone(innerElement, `group_${groupIndex}_${elementIndex}`, null, null, false, true)

                        if (customElementCSSFunction && customElementCSSFunction instanceof Function) {
                            customExpectationCardCSS(nodeClone)
                        }

                        nodeToDataURL(nodeClone, widthToSet, heightToSet)
                            .then(createImage)
                            .then(buildCanvas)
                            .then(resolveElementToImage)
                    })
                })

                //resolve each element being transformed to base64
                Promise.all(dataURLPromises).then(resolveGroup)
            })
        })

        //resolve each grouping, should return array, of groups/arrays ,
        // each group should contain url objects
        // ie {body: {url: string, height: number, width: number}}
        Promise.all(groupPromises).then(resolve)
    });
}

export function buildNewNodeClone(node, idToSet, w, h, addIndividualElementCSS, deep, additionalStyleString) {
    if (node?.nodeType) {
        let nodeWidth
        let nodeHeight
        if (!w || !h) {
            const {width, height} = getWidthAndHeight(node)
            nodeWidth = width
            nodeHeight = height
        }

        const widthToSet = w || nodeWidth
        const heightToSet = h || nodeHeight

        const nodeClone = createClone(node, idToSet, !!addIndividualElementCSS, !!deep, widthToSet, heightToSet, additionalStyleString)
        return {nodeClone, widthToSet, heightToSet}
    }
}

//array of element objects example: [{key: element}]
// if key contains the word clone, a new clone will not be created
// dimension object key should match element if custom dimension needed
// example: {key:{height: number, width: number}}
export function elementsToNewDocument(arrayOfElementObjects, dimensionsObj, addIndividualElementCSS) {
    return new Promise(resolveNewDocument => {
        const usableArray = Array.isArray(arrayOfElementObjects)
                            ? arrayOfElementObjects
                            : [arrayOfElementObjects]

        let totalWidth = 0
        let totalHeight = 0

        const clonedElementsObject = {}
        const newElementPromises = usableArray.map((elementObj, elementIndex) => {
            return new Promise(resolve => {
                const clonedDocument = document.cloneNode(true)
                clonedDocument.head.querySelectorAll('script').forEach(el => el.remove())
                const body = clonedDocument.body
                body.innerHTML = ''

                const regexAlreadyCloned = /clone/i;
                const key = Object.keys(elementObj).find(stringKey => stringKey !== 'header')
                let newNode = elementObj[key]

                const {width: computedWidth, height: computedHeight} = getWidthAndHeight(newNode)
                let width = Object.hasOwn(dimensionsObj, key)
                            ? dimensionsObj[key]?.width
                            : null
                let height = Object.hasOwn(dimensionsObj, key)
                             ? dimensionsObj[key]?.height
                             : null

                width = width
                        ? width
                        : computedWidth
                height = height
                         ? height
                         : computedHeight
                totalWidth = stackElementDirection(false, totalWidth, width)
                totalHeight = stackElementDirection(false, totalHeight, height)

                //if element has already been cloned it should already be set with needed header
                // no need to clone again
                if (!regexAlreadyCloned.exec(key)) {
                    const {nodeClone: bodyElement, widthToSet: bodyWidth, heightToSet: bodyHeight} = buildNewNodeClone(newNode, key, width, height, addIndividualElementCSS, true)
                    bodyElement.id = `clone_element_${elementIndex + 1}`
                    newNode = bodyElement

                    if (elementObj.hasOwnProperty('header')) {
                        const header = elementObj['header']
                        const hHeight = Object.hasOwn(dimensionsObj, 'header')
                                        ? dimensionsObj['header']?.height
                                        : header.scrollHeight

                        const {
                                  nodeClone: headerClone, widthToSet: headerWidth, heightToSet: headerHeight
                              } = buildNewNodeClone(header, `clone_element_header${elementIndex + 1}`, width, hHeight, addIndividualElementCSS, true)
                        totalHeight = stackElementDirection(true, totalHeight, headerHeight)
                        body.prepend(headerClone)
                    }
                }

                body.appendChild(newNode)
                const elementId = newNode?.id
                                  ? newNode.id
                                  : key
                clonedElementsObject[elementId] = clonedDocument
                resolve({[elementId]: clonedDocument})
            })
        })

        Promise.all(newElementPromises).then(array => {
            resolveNewDocument({clonedElementsObject: clonedElementsObject, width: totalWidth, height: totalHeight})
        })
    })
}

function stackElementDirection(accumulate, total, newValue) {
    return accumulate
           ? (total + newValue)
           : (total > newValue)
             ? total
             : newValue
}

function getWidthAndHeight(node) {
    const width = node.scrollWidth || node.offsetWidth || measure(node, 'scrollWidth')
    const height = node.scrollHeight || node.offsetHeight || measure(node, 'scrollHeight')
    return {width, height}
}

function measure(element, returnValue, parentNode) {
    parentNode = parentNode || window.document.documentElement.lastElementChild;
    const clonedElement = element.cloneNode(true);

    clonedElement.style.display = 'block';
    clonedElement.style.visibility = 'hidden';
    clonedElement.style.zIndex = -1;
    parentNode.appendChild(clonedElement);
    const {clientWidth, clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight} = clonedElement;
    clonedElement.remove()

    const returnObj = {clientWidth: clientWidth, clientHeight: clientHeight, offsetWidth: offsetWidth, offsetHeight: offsetHeight, scrollWidth: scrollWidth, scrollHeight: scrollHeight}

    if (returnObj.hasOwnProperty(returnValue)) {
        return returnObj[returnValue]
    }

    return {
        clientWidth, clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight,
    };
}
