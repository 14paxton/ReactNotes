import theme from "common/theme/theme.js"
import {RGBAToHexA} from "common/util/UnitConverters";

export const ROWS_PER_PPT_SLIDE = 10;
export const EXPECTATIONS_PER_PPT_SLIDE = 3;
export const DEFAULT_SLIDE_CONTENT_HEIGHT = {
    pixels: 696, get inches() {
        delete this.inches
        return this.inches = pixelToInch(this.pixels)
    }
}
export const DEFAULT_TALENT_GRID_HEIGHT_WITH_TALENT_RANK_FOOTER = {
    pixels: 850, get inches() {
        delete this.inches
        return this.inches = pixelToInch(this.pixels)
    }
}
export const DEFAULT_TALENT_GRID_HEIGHT = {
    pixels: 750, get inches() {
        delete this.inches
        return this.inches = pixelToInch(this.pixels)
    }
}
export const DEFAULT_SLIDE_CONTENT_WIDTH = {
    pixels: 1270, get inches() {
        delete this.inches
        return this.inches = pixelToInch(this.pixels)
    }
}
export const DEFAULT_SLIDE_HEADER_HEIGHT = {
    pixels: 54, get inches() {
        delete this.inches
        return this.inches = pixelToInch(this.pixels)
    }
}
export const DEFAULT_SLIDE_HEADER_WIDTH = {
    pixels: 1260, get inches() {
        delete this.inches
        return this.inches = pixelToInch(this.pixels)
    }
}
export const DEFAULT_PPT_WIDTH = {
    inches: 13.3, percentage: `98%`, get pixels() {
        delete this.pixels
        return this.pixels = inchToPixel(this.inches)
    }
}
export const DEFAULT_PPT_HEIGHT = {
    inches: 7.5, percentage: `98%`, get pixels() {
        delete this.pixels
        return this.pixels = inchToPixel(this.inches)
    }
}

export const DEFAULT_PPT_X_VALUE = .05
export const DEFAULT_PPT_Y_VALUE = .07

export function pixelToInch(px) {
    const inches = px / 96
    return inches
}

export function inchToPixel(inches) {
    const pixels = inches * 96
    return pixels
}

export const DEFAULT_SLIDE_COLOR = theme?.palette?.blue[20]
                                   ? RGBAToHexA(theme?.palette?.blue[20])
                                   : {rgba: `b1bdddff`, rgb: `b1bddd`}

export function createFileName(fileName, title) {
    const userLocale = navigator.languages && navigator.languages.length
                       ? navigator.languages[0]
                       : navigator.language;
    const removeSpecialChar = /[^a-zA-Z\d ]/g
    const replaceSpace = /\s/g
    const onlyAlpha = (fileName
                       ? fileName
                       : title).replaceAll(removeSpecialChar, '')
    const strippedFName = onlyAlpha.replaceAll(replaceSpace, '_')
    return `${strippedFName}${new Date().toLocaleDateString(userLocale)}`
}

const expectation_card_string_css = {
    wrapperDiv:            `margin: .25em;padding: .5em;display: block;font-family:"Open Sans", sans-serif;background-color: #FFFFFF; position: relative; box-shadow: 0 0  4px #000000;`,
    italicizedDescription: `font-style: italic;padding:0;margin:0`,
    iaGroup:               (backgroundColor) => `background-color: ${backgroundColor}; color: rgb(255, 255, 255);`,
    listSPAN:              `margin:0;padding:0;font-size:1rem;`,
    listH6:                `margin:0;padding:0;font-size:0.875rem;`,
    listH4:                `margin:0;padding:0;font-size:1.125rem;`,
    listLI:                `font-family:"Open Sans", sans-serif;padding-inline-start:inherit;`,
    0:                     (backgroundColor) => `display:flex;min-height:"137px";line-height:1.5;div:nth-child(2){padding-left: "10px";};h2{padding:0; margin:0;color:${backgroundColor};}`,
    1:                     `margin:0;padding:1rem;font-size:1rem;line-height:1.5;`,
    2:                     `* {margin:0;padding:"0.5rem";}
                             ul {padding:"10px" 0px 10px 2rem;} 
                             li {padding: 5px;}`,
    3:                     `* {margin:0;padding:"0.5rem";}
                             ul {padding:"10px" 0px 10px 2rem;} 
                             li {padding: 5px;}`
}

const expectationCSSModFuncObj = {
    imageNameAndIAGroupDiv: async (child, backGroundColor, index) => {
        const p = child.querySelector('p')
        const h2 = child.querySelector('h2')

        if (p) p.setAttribute("style", expectation_card_string_css['italicizedDescription'])
        if (h2) {
            h2.style.padding = 0
            h2.style.margin = 0
            if (backGroundColor) h2.style.color = `${backGroundColor}`
        }

        return child.setAttribute("style", expectation_card_string_css[index](backGroundColor))
    }, whatToExpect:        (child, backGroundColor, index) => {
        const h1 = child.querySelector('h1');
        child.setAttribute("style", expectation_card_string_css[index]);
        if (h1) {
            h1.style.padding = "10px"
            h1.style.margin = "0px"
            h1.style.fontSize = "1rem"
            h1.style.textAlign = "center"
            h1.style.borderRadius = "10px"
            h1.style.color = 'white'
            h1.style.backgroundColor = '#8B9DCB'
        }
        return child
    }, howToStrengthen:     (child, backGroundColor, index) => {
        const h1 = child.querySelector('h1');
        child.setAttribute("style", expectation_card_string_css[index]);
        if (h1) {
            h1.style.padding = "10px"
            h1.style.margin = "0px"
            h1.style.fontSize = "1rem"
            h1.style.textAlign = "center"
            h1.style.borderRadius = "10px"
            h1.style.color = 'white'
            h1.style.backgroundColor = '#253765'
        }
        return child
    },
}

export function defaultElementDimensionObject(bodyObj, addPropObjectArray) {
    const newProps = Array.isArray(addPropObjectArray)
                     ? addPropObjectArray
                     : [addPropObjectArray]
    const defaultObj = {body: {height: '', width: ''}, ...bodyObj}

    for (const newProp of newProps) {
        Object.assign(defaultObj, newProp)
    }
    return defaultObj
}

//some css for ppt is not being reflected,
//function will add static css from string, and
//get color for text from existing attribute
export async function customExpectationCardCSS(element) {
    const iaGroup = element.querySelector('[data-qa ^= talent-slide]')
    if (iaGroup) iaGroup.setAttribute('style', expectation_card_string_css['iaGroup'](iaGroup.style.backgroundColor))
    const backGroundColor = iaGroup
                            ? iaGroup.style.backgroundColor
                            : ''
    const descriptionsArray = element.hasChildNodes()
                              ? Array.from(element.childNodes)
                              : [element]

    const listCard = element.querySelector('ol')
    element.setAttribute("style", expectation_card_string_css['wrapperDiv'])

    return descriptionsArray.map(async (child, index) => {
        if (!listCard && expectation_card_string_css.hasOwnProperty(index)) {
            switch (index) {
                case 0:
                    return expectationCSSModFuncObj['imageNameAndIAGroupDiv'](child, backGroundColor, index);
                case 1:
                    return child.setAttribute("style", expectation_card_string_css[index])
                case 2:
                    return expectationCSSModFuncObj['whatToExpect'](child, backGroundColor, index);
                case 3:
                    return expectationCSSModFuncObj['howToStrengthen'](child, backGroundColor, index)
                default:
                    return child
            }
        }
        else if (listCard) {
            child.className = ''
            const tagName = child?.tagName
                            ? child.tagName
                            : ''
            if (expectation_card_string_css.hasOwnProperty(`list${tagName}`)) {
                child.setAttribute("style", expectation_card_string_css[`list${tagName}`])
            }

            if(tagName === 'OL'){
               const liList = element.querySelectorAll('li > span')

                for(let li of liList){
                    li.setAttribute("style", expectation_card_string_css[`list${tagName}`])
                }
            }

            return child
        }
    });
}


// elementRefObject: [{header: elementRef, body: elementRef , arrayOfElementObjects: {additionalSlides: [array of arrays of elements to be grouped on 1 slide](optional), customElementCSSFunction: function to run on each element if custom css or whatnot is needed}}]
export function defaultElementRefObject(bodyElement, headerElement, additionalSlides) {
    if (bodyElement) {
        const newProps = Array.isArray(additionalSlides)
                         ? additionalSlides
                         : [additionalSlides]

        const elementRefObject = {body: bodyElement}
        if (headerElement) elementRefObject['header'] = headerElement
        if (newProps.length) elementRefObject.arrayOfElementObjects = newProps
        return elementRefObject
    }
}

export function defaultSlideObject(dataURL, internalWidth, internalHeight, addPropObjectArray) {
    const newProps = Array.isArray(addPropObjectArray)
                     ? addPropObjectArray
                     : [addPropObjectArray]

    const defaultObj = {body: {url: dataURL, width: internalWidth, height: internalHeight}}

    newProps.forEach(newProp => {
        Object.assign(defaultObj, newProp)
    })

    return defaultObj
}

//adds writePPT prop from createPPTXFromDataURL()
export function defaultPPTReturnObject(passedDefaultPPTReturnObject, addPropObjectArray) {
    const newProps = Array.isArray(addPropObjectArray)
                     ? addPropObjectArray
                     : [addPropObjectArray]

    const defaultObj = passedDefaultPPTReturnObject
                       ? {...passedDefaultPPTReturnObject}
                       : {}

    for (const newProp of newProps) {
        Object.assign(defaultObj, newProp)
    }

    return defaultObj
}
