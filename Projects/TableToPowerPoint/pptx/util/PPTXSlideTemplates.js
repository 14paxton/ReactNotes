import {
    DEFAULT_PPT_HEIGHT, DEFAULT_PPT_WIDTH, DEFAULT_PPT_X_VALUE, DEFAULT_PPT_Y_VALUE, DEFAULT_SLIDE_COLOR, DEFAULT_SLIDE_CONTENT_HEIGHT, DEFAULT_SLIDE_CONTENT_WIDTH, pixelToInch
} from "./PPTXCommon";

//takes SlideObject {body: {url: dataURL, height: pptTableHeight, width: w}}
export async function fillSlideTemplate(pptx, headerSlideObj, slideName) {
    if (headerSlideObj?.body) {
        const objectsArray = [{
            image: {
                data:   headerSlideObj.body.url,
                w:      DEFAULT_PPT_WIDTH.percentage,
                h:      DEFAULT_PPT_HEIGHT.percentage,
                x:      DEFAULT_PPT_X_VALUE,
                y:      DEFAULT_PPT_Y_VALUE,
                sizing: {w: DEFAULT_SLIDE_CONTENT_WIDTH.inches, h: DEFAULT_SLIDE_CONTENT_HEIGHT.inches, type: "contain"}
            }
        }]
        pptx.defineSlideMaster({
            background: { color: DEFAULT_SLIDE_COLOR['rgb'] },
            title: `${slideName}_slide`, objects: objectsArray,
            // slideNumber: { x: 1.0, y: 7.0, color: "FFFFFF" }
        })
    }
    return slideName
}

//takes array of SlideObject {body: {url: dataURL, height: pptTableHeight, width: w}}
// that should be sized to fit on single slide
export async function fillSlideHorizontalMultiImage(pptx, headerSlideObjArray, slideName) {
    if (Array.isArray(headerSlideObjArray) && headerSlideObjArray[0]?.body) {
        let x = .2
        const objectsArray = headerSlideObjArray.map(urlObj => {
            const {body: elementInfo} = urlObj
            const imageWidth = pixelToInch(elementInfo?.width)
            const imageHeight = elementInfo?.height
                                ? pixelToInch(elementInfo?.height)
                                : DEFAULT_SLIDE_CONTENT_HEIGHT.inches
            const xPosition = x
            x = x + Math.floor(imageWidth) + .45
            return buildObjectArray(elementInfo, imageWidth, imageHeight, xPosition)
        })

        pptx.defineSlideMaster({
            title: `${slideName}_slide`,
            background: { color: DEFAULT_SLIDE_COLOR['rgb'] },
            objects: objectsArray
        })

        return slideName
    }
}

function buildObjectArray(elementInfo, imageWidth, imageHeight, xPosition) {
    const defaultSlideHeight = DEFAULT_SLIDE_CONTENT_HEIGHT.inches
    const computedHeight = (imageHeight > DEFAULT_SLIDE_CONTENT_HEIGHT.inches)
                           ? 1
                           : imageHeight / defaultSlideHeight
    const percentOfSlideHeight = computedHeight.toLocaleString('en-US', {
        style: 'percent', minimumFractionDigits: 2,
    })

    return {
        image: {
            data: elementInfo.url, w: Math.floor(imageWidth), h: percentOfSlideHeight, x: xPosition, y: .5, sizing: {type: "cover"}
        }
    }
}
