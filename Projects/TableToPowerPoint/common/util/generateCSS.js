export function dumpCSSText(element) {
    if (!element?.id) {
        element.id = `${element.tagName}-${Math.floor(Math.random() * 135)}`;
    }

    let promises = [];
    let o = getComputedStyle(element);

    promises.push(new Promise(function (res, rej) {
        let s = `#${element.id}{ `;
        for (let i = 0; i < o.length; i++) {
            s += o[i] + `: ` + o.getPropertyValue(o[i]) + '; ';
        }
        s += ` } `;

        res(s);
    }));

    const children = element?.children;
    if (children) {
        for (let child of children) {
            promises.push.apply(promises, dumpCSSText(child));
        }
    }

    return promises;
}

export const generateRulesAll = async (elementArray) => {
    const usableArray = Array.isArray(elementArray)
                        ? elementArray
                        : [elementArray]
    let promises = [];
    usableArray.forEach(element => {
        promises.push(...dumpCSSText(element))
    })

    let cssString = '';
    await Promise.all(promises).then((result) => {
        result.forEach(function (css) {
            cssString += css;
        });
    });

    return cssString;
};
