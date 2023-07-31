import {generateRulesAll} from "./generateCSS";
import {buildNewNodeClone} from "./ElementToPNG";

export function createClone(element, idToSet, setCSS, deep, width, height, addStyleString) {
    const newElement = element.cloneNode(deep)
    if (idToSet) newElement.id = idToSet

    const createStyles = new Promise(resolve => {
        if (!setCSS) {
            resolve(true)
        }
        else {
            generateRulesAll(element).then(css => {
                if (element?.id && idToSet) {
                    css = css.replace(`${element?.id}`, `${idToSet}`)
                }
                const generatedStyle = css + addStyleString;
                newElement.setAttribute('style', generatedStyle);
            }).then(resolve)
        }
    })

    createStyles.then(css => {
        if (width) {
            newElement.width = width
            newElement.style.width = `${width}`
        }

        if (height) {
            newElement.height = height
            newElement.style.height = `${height}`
        }
    })

    return newElement
}


export const createRow = async (row, index, newBody) => {
    const newRow = newBody.insertRow(index)
    newRow.innerHTML = row.innerHTML
    return newRow
}

export const createTable = async (tableRows, rowIndex, elementsObject, divToAppend, cssStringAddition) => {
    if (elementsObject && elementsObject?.body?.nodeName === 'TABLE') {
        const table = elementsObject.body
        const tableId = `clone_table_${rowIndex + 1}`
        const {nodeClone: newTable, widthToSet, heightToSet} = buildNewNodeClone(table, tableId, null, null, true, true, cssStringAddition)
        newTable.tBodies[0].remove()
        const tBody = newTable.createTBody()

        if (table?.tHead) {
            const tHead = newTable.createTHead()
            tHead.innerHTML = table.tHead.innerHTML
        }

        if (table?.tFoot) {
            const tFoot = newTable.createTFoot()
            tFoot.innerHTML = table.tFoot.innerHTML
        }

        const rowPromises = tableRows.map((row, index) => new Promise(resolve => resolve(createRow(row, index, tBody))))
        await Promise.all(rowPromises).then(resolved => {
            console.log(`rows for table ${tableId} added`)
        })

        const tableWrapper = document.createElement('div')
        tableWrapper.id = `clone_table_wrapper_${rowIndex + 1}`
        if (elementsObject?.header) {
            const {nodeClone: newHeader, widthToSet, heightToSet} = buildNewNodeClone(elementsObject?.header, null, null, null, true, true)
            tableWrapper.appendChild(newHeader)
        }

        tableWrapper.appendChild(newTable)
        if (divToAppend) divToAppend.appendChild(tableWrapper);

        return tableWrapper
    }
}
