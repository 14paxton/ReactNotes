export const printElement = (elementId) => {
  const ComputedStyle = getComputedStyle(document.getElementById(elementId));

  const originalContents = document.body.innerHTML;
  const originalStyle = getComputedStyle(document.body);

  window.onbeforeprint = () => {
    console.log(document.getElementById(elementId).innerHTML)
    const x = document.createElement('body')
    // const y = document.createElement('div')
    // y.id =  'printDiv'
console.log(x)
    x.append(document.getElementById(elementId))
    document.body =  x

    const sWidth = window.screen.width;
    console.log(`sWidth ${sWidth}`);

    console.log(`CS ${ComputedStyle}`);
    const divW = ComputedStyle.width;
    const w = divW.replace(/[^0-9]/g, '');
    const wN = Number(w);
    console.log(`Width ${wN}`);


    let styles = `
    body {
        width: 800px;
        }
    #print-section {position: absolute;}    
    #talent-card-section {
        height: 892px;
        width: 100%;
        margin-top: 150px !important;
        display: inline-block !important;
        page-break-after: always !important;
        }  
    #tcConCon {
    overflow : visible; 
    height: 120% !important; 
    transform: scale(.5,.5) !important;
    margin-left: 100px;
    }  
    #expanding-panel-section {height: 85% !important}  
}`;

    let stylesheet = document.createElement('style');
    stylesheet.type = 'text/css';
    stylesheet.innerText = styles;
    document.head.appendChild(stylesheet);
  }

  // window.onafterprint = ()=>{
  //   document.body.innerHTML = originalContents;
  //   Array.from(originalStyle).forEach(
  //     key => document.body.style.setProperty(key, ComputedStyle.getPropertyValue(key), 'important')
  //   )
  // }

    window.print();
  };

export const printElementNewWindow = (elementId) => {
  const ComputedStyle = getComputedStyle(document.getElementById(elementId));

  const originalContents = document.body.innerHTML;
  const originalStyle = getComputedStyle(document.body);

  let printElement = document.getElementById(elementId);
  var printWindow = window.open('', '','resizable=0,menubar=0,toolbar=0,location=0,status=0,scrollbars=0,height=500,width=500' );
  printWindow.document.write(document.documentElement.innerHTML);
  setTimeout(() => { // Needed for large documents
    printWindow.document.body.style.margin = '80 80';
    printWindow.document.body.innerHTML = printElement.outerHTML;
    printWindow.document.close(); // necessary for IE >= 10
    printWindow.focus(); // necessary for IE >= 10*/
    printWindow.print();
    printWindow.close();
  }, 1000)

};

export const printUsingScreenSize = ()=>{
var sWidth = screen.width;
console.log("sWidth "+sWidth);
var ComputedStyle = getComputedStyle(document.body);
console.log("CS "+ComputedStyle);
var divW = ComputedStyle.width;
var w = divW.replace(/[^0-9]/g,'');
var wN = Number(w);
console.log("Width "+wN);
if (w > 1000) { 
var styles = `@media print {
body, * { visibility: hidden; }
html, body { overflow: hidden; transform: translateZ(0); }
#slide {
transform: scale(0.75) !important;
}
#wrapper {
transform: scale(0.75) !important;
}
#slide,
#wrapper {
width: 100% !important;
height: 100% !important;
overflow: visible !important;
}
#frame {
overflow: visible !important;
}
.slide-transition-container {
overflow: visible !important;
}
@page {size: A4 landscape;max-height:99%; max-width:99%}
.slide-container, .slide-container * {
visibility: visible !important;
margin-top: 0px !important;
margin-left: 0px !important;
}
#outline-panel {
display: none !important;
}
}
}`
var stylesheet = document.createElement('style');
stylesheet.type = 'text/css';
stylesheet.innerText = styles;
document.head.appendChild(stylesheet);
} else {
var styles = `@media print {
body, * { visibility: hidden; }
html, body { overflow: hidden; transform: translateZ(0); }
#slide {
transform: scale(1.0) !important;
}
#wrapper {
transform: scale(1.0) !important;
}
#slide,
#wrapper {
width: 100% !important;
height: 100% !important;
overflow: visible !important;
}
#frame {
overflow: visible !important;
}
.slide-transition-container {
overflow: visible !important;
}
@page {size: A4 landscape;max-height:99%; max-width:99%}
.slide-container, .slide-container * {
visibility: visible !important;
margin-top: 0px !important;
margin-left: 0px !important;
}
#outline-panel {
display: none !important;
}
}
}`
var stylesheet = document.createElement('style');
stylesheet.type = 'text/css';
stylesheet.innerText = styles;
document.head.appendChild(stylesheet);
}

window.print();
}

