import React from "react";
import PptxGenJS from "pptxgenjs";
import {
    createFileName,
    customExpectationCardCSS,
    DEFAULT_SLIDE_CONTENT_WIDTH,
    DEFAULT_SLIDE_HEADER_HEIGHT,
    DEFAULT_SLIDE_HEADER_WIDTH,
    DEFAULT_TALENT_GRID_HEIGHT,
    DEFAULT_TALENT_GRID_HEIGHT_WITH_TALENT_RANK_FOOTER,
    defaultElementDimensionObject,
    defaultElementRefObject,
    defaultPPTReturnObject,
    EXPECTATIONS_PER_PPT_SLIDE,
    ROWS_PER_PPT_SLIDE
} from "./PPTXCommon";
import {fillSlideHorizontalMultiImage, fillSlideTemplate} from "./PPTXSlideTemplates";
import {buildGroupedElementsForSlide, createElementToPNGBase64} from "../../../common/util/ElementToPNG";
import {createTable} from "../../../common/util/CloneHTML";

// elementRefObject: [{header: elementRef, body: elementRef , arrayOfElementObjects: {additionalSlides: [array of arrays of elements to be grouped on 1 slide](optional), customElementCSSFunction: function to run on each element if custom css or whatnot is needed}}]
// dimension object key should match element if custom dimension needed
// example: {key:{height: number, width: number}}
const generateClonedTableDocument = (elementRefObject, rowArray, dimensionsObj) => {
    return new Promise((resolveURLCreation, rejectURL) => {
        const [additionalSlides, mainSlideObjects] = parseElementRefObject(elementRefObject)

        //create tables to use for slides
        const tablePromises = rowArray.map((tableRows, rowIndex) => new Promise(resolveTable => {
            createTable(tableRows, rowIndex, mainSlideObjects).then(tableWrapper => resolveTable({[tableWrapper.id]: tableWrapper}))
        }))

        Promise.all(tablePromises).then(clonedTableObjArray => {
            clonedTableObjArray.forEach(table => {
                if (dimensionsObj.hasOwnProperty('body')) {
                    dimensionsObj[Object.keys(table)[0]] = {...dimensionsObj['body'], height: DEFAULT_TALENT_GRID_HEIGHT_WITH_TALENT_RANK_FOOTER.pixels}
                }
                if (mainSlideObjects.hasOwnProperty('header')) {
                    table['header'] = mainSlideObjects.header
                }
            })

            createDataUrls(clonedTableObjArray, dimensionsObj, additionalSlides, resolveURLCreation, rejectURL)
        })
    })
}

//create the dataURL for the powerepoint slide,
// elementRefObject: [{header: elementRef, body: elementRef , arrayOfElementObjects: {additionalSlides: [array of arrays of elements to be grouped on 1 slide](optional), customElementCSSFunction: function to run on each element if custom css or whatnot is needed}}]
// dimension object example : {body:{height: bodyH, width: bodyW}, header:{height : headerH, width: headerW}}
const writePowerPointPresentation = (elementRefObject, dimensionsObj) => {
    return new Promise((resolveURLCreation, rejectURL) => {
        const [additionalSlides, mainSlideObjects] = parseElementRefObject(elementRefObject)
        createDataUrls(mainSlideObjects, dimensionsObj, additionalSlides, resolveURLCreation, rejectURL)
    })
};

function createDataUrls(mainSlideObjects, dimensionsObj, additionalSlides, resolveURLCreation, rejectURL) {
    function callbackFn(element) {
        if (element instanceof HTMLElement) {
            Array.from(element.querySelectorAll(`tbody td:nth-child(1), tfoot  tr`)).forEach(e => {
                e.style.backgroundColor = '#fff'
            })
        }
    }

    createElementToPNGBase64(mainSlideObjects, dimensionsObj, null, callbackFn)
        .then(mainSlideImage => {
            if (additionalSlides.size > 0) {
                buildGroupedElementsForSlide(additionalSlides).then(groupURLs => {
                    //resolve and return single url obj, and arrays/groups of elements that need to be added together per slide
                    resolveURLCreation([...mainSlideImage, ...groupURLs.flat()])
                    // resolveURLCreation([mainSlideImage])
                })
            }
            else {
                //resolve and return single url obj
                resolveURLCreation([mainSlideImage])
            }
        })
        .catch(error => {
            console.error("error creating data url", error)
            rejectURL(error)
        })
}

function parseElementRefObject(elementRefObject) {
    const additionalSlides = new Map()
    const mainSlideObjects = Object.keys(elementRefObject).reduce((obj, key) => {
        if (key !== 'arrayOfElementObjects') {
            return Object.assign(obj, {[key]: elementRefObject[key]})
        }
        return obj
    }, {})

    if (elementRefObject.hasOwnProperty('arrayOfElementObjects')) {
        elementRefObject['arrayOfElementObjects'].forEach(obj => {
            const callBack = obj.hasOwnProperty('customElementCSSFunction')
                             ? obj.customElementCSSFunction
                             : ''
            additionalSlides.set(obj.additionalSlides, callBack)
        })
    }

    return [additionalSlides, mainSlideObjects]
}

function groupRows(arr, chunkSize) {
    const maxLength = Math.ceil(arr.length / chunkSize)
    return Array.from({length: maxLength}, () => arr.splice(0, chunkSize));
}

const splitRowsForPPTPages = (tableRef) => {
    return new Promise(resolve => {
        if (tableRef?.nodeName === 'TABLE') {
            const rowList = tableRef?.tBodies[0]?.rows
                            ? tableRef?.tBodies[0]?.rows
                            : []

            const rowArray = []

            for (let row of rowList) {
                rowArray.push(row)
            }

            const pagedRows = groupRows(rowArray, ROWS_PER_PPT_SLIDE)
            const callbackEvent = (tableRef?.tFoot || pagedRows.length > 1)
                                  ? (elementRefObject, dimensionsObj, pptxTitle, pptxFileName, author, subject) => buildMultiSlidePPTFromTableRows(elementRefObject, pagedRows, dimensionsObj, pptxTitle, pptxFileName, author, subject)
                                  : (elementRefObject, dimensionsObj, pptxTitle, pptxFileName, author, subject) => buildSingleSlidePPT(elementRefObject, pagedRows, dimensionsObj, pptxTitle, pptxFileName, author, subject)
            resolve(callbackEvent)
        }

        resolve(false)
    })
}

const splitExpectationCards = (cardsRef) => {
    const cardArray = Array.from(cardsRef);
    if (cardsRef && cardArray.length > 0) {
        return groupRows(cardArray, EXPECTATIONS_PER_PPT_SLIDE)
    }
    return false
}

export const preLoadTalentGridToPPT = (table, renderedHeader, cardsRef, pptxTitle, pptxFileName, author, subject) => {
    return new Promise((preloadResolve, reject) => {
        if (table) {
            const header = renderedHeader
                           ? renderedHeader
                           : ''

            const bodyW = table?.scrollWidth
                          ? table?.scrollWidth
                          : DEFAULT_SLIDE_CONTENT_WIDTH.pixels
            const bodyH = DEFAULT_TALENT_GRID_HEIGHT.pixels
            const headerW = header
                            ? header.scrollWidth
                            : DEFAULT_SLIDE_HEADER_WIDTH.pixels
            const headerH = header
                            ? header.scrollHeight
                            : DEFAULT_SLIDE_HEADER_HEIGHT.pixels

            const cardsGrouped = splitExpectationCards(cardsRef)
            const expectationsCards = (cardsGrouped)
                                      ? {additionalSlides: cardsGrouped, customElementCSSFunction: customExpectationCardCSS}
                                      : null

            const elementRefObject = defaultElementRefObject(table, header, [expectationsCards])
            const elementDimensionObject = defaultElementDimensionObject({body: {height: bodyH, width: bodyW}}, {header: {height: headerH, width: headerW}})
            splitRowsForPPTPages(table).then(slideCountCallBack => {
                if (slideCountCallBack) {
                    slideCountCallBack(elementRefObject, elementDimensionObject, pptxTitle, pptxFileName, author, subject, expectationsCards).then(pptReturnObject => {
                        preloadResolve(pptReturnObject)
                    })
                }
                else {
                    console.error("error creating table", table.id)
                    reject()
                }
            })
        }
        else {
            console.error("unable to recognize table passed")
            reject("unable to recognize table passed")
        }
    })
}

function buildSingleSlidePPT(elementRefObject, rowArray, elementDimensionObjectArray, pptxTitle, pptxFileName, author, subject) {
    return new Promise(buildResolve => {
        writePowerPointPresentation(elementRefObject, elementDimensionObjectArray)
            .then(elementDimensionObjectArray => {
                createPPTXFromDataURL(elementDimensionObjectArray, pptxTitle, pptxFileName, author, subject, true)
                    .then(buildResolve)
            })
    })
}

function buildMultiSlidePPTFromTableRows(elementRefObject, rowArray, dimensionsObj, pptxTitle, pptxFileName, author, subject) {
    return new Promise(buildResolve => {
        generateClonedTableDocument(elementRefObject, rowArray, dimensionsObj)
            .then(elementDimensionObjectArray => {
                createPPTXFromDataURL(elementDimensionObjectArray, pptxTitle, pptxFileName, author, subject, false)
                    .then(buildResolve)
            })
    })
}

async function writePPTXFile(pptx, fileName, compress, pptxFileName) {
    return pptx.writeFile({
        fileName: createFileName((fileName
                                  ? fileName
                                  : pptxFileName), pptx.title), compression: compress
    })
}

//takes elementDimensionObject [{header: {url: dataURL, height: pptTableHeight, width: w}, body: {url: dataURL, height: pptTableHeight, width: w}}]
// can include arrays of grouped elements [obj, obj , [obj, obj]]
export function createPPTXFromDataURL(elementDimensionObjectArray, pptxTitle, pptxFileName, author, subject, singleTableSlide) {
    return new Promise(resolvePPTBuild => {
        if (elementDimensionObjectArray) {
            const pptx = new PptxGenJS()
            pptx.layout = "LAYOUT_WIDE";
            pptx.title = pptxTitle
                         ? pptxTitle
                         : 'talent_grid_to_pptx'
            pptx.subject = subject
            pptx.author = author

            const slidePromises = elementDimensionObjectArray.map((obj, index) => {
                const slideName = `${pptx.title}_${index}`
                const buildSlideFunction = Array.isArray(obj)
                                           ? fillSlideHorizontalMultiImage
                                           : fillSlideTemplate
                return new Promise(resolve => resolve(buildSlideFunction(pptx, obj, slideName)))
            })

            Promise.all(slidePromises).then(slides => {
                slides.forEach(slide => {
                    pptx.addSlide({masterName: `${slide}_slide`})
                })

                function writePPT(fileName, compress) {
                    (async () => { await writePPTXFile(pptx, fileName, !!compress, pptxFileName)})()
                }

                const saveFunctionObject = singleTableSlide
                                           ? {singleSlideFunction: writePPT}
                                           : {multiSlideFunction: writePPT}
                resolvePPTBuild(defaultPPTReturnObject(saveFunctionObject, {writePPT: writePPT}))
            })
        }
    })
}
