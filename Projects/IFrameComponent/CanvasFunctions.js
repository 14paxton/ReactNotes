


function render_html_to_canvas(html, ctx, x, y, width, height) {
  var data = "data:image/svg+xml;charset=utf-8,"+'<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'">'      +
             '<foreignObject width="100%" height="100%">' +
             html_to_xml(html) +
             '</foreignObject>' +
             '</svg>';

  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, x, y);
  }
  img.src = data;
}

function html_to_xml(html) {

  var doc = document.implementation.createHTMLDocument('');
  const styleElement = document.createElement('style');
  styleElement.innerText = css;
  doc.head.appendChild(styleElement);
  doc.body.innerHTML = html


  // You must manually set the xmlns if you intend to immediately serialize
  // the HTML document to a string as opposed to appending it to a
  // <foreignObject> in the DOM
  doc.documentElement.setAttribute('xmlns', doc.documentElement.namespaceURI);

  console.log("html", doc.body.parentNode)
  // Get well-formed markup
  html = (new XMLSerializer).serializeToString(doc.body);
  return html;
}

function canvasPPT(iframeRef, canvasRef, css){
  const canvas = canvasRef?.current;
  
  // test html that i know works
  const html = `
          <p>this
          <p>is <span style="color:red; font-weight: bold;">not</span>
          <p><i>xml</i>!
          <p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWElEQVQ4jZ2Tu07DQBBFz9jjvEAQqAlQ0CHxERQ0/AItBV9Ew8dQUNBQIho6qCFE4Nhex4u85OHdWAKxzfWsx0d3HpazdGITA4kROjl0ckFrnYJmQlJrKsQZxFOIMyEqIMpADGhSZpikB1hAGsovdxABGuepC/4L0U7xRTG/riG3J8fuvdifPKnmasXp5c2TB1HNPl24gNTnpeqsgmj1eFgayoHvRDWbLBOKJbn9WLGYflCCpmM/2a4Au6/PTjdH+z9lCJQ9vyeq0w/ve2kA3vaOnI6k4Pz+0Y24yP3Gapy+Bw6qdfsCRZfWSWgclCCVXTZu5LZFXKJJ2sepW2KYNCENB3U5pw93zLoDjNK6E7rTFcgbkGYJtiLckxCiw4W1OURsxUE5BokQiQj3JIToVtKwlhsurq+YDYbMBjuU/W3KtT3xIbrpAD7E60lwQohuaMtP8ldI0uMbGfC1r1zyWPUAAAAASUVORK5CYII=">`;



  const iframeDoc = iframeRef?.current?.contentDocument
  const body = iframeDoc.body
  const table = body.firstElementChild


  const tableHeader = table.firstElementChild
  const tableBody = table.firstElementChild.nextElementSibling
  const newTable = document.createElement('table')
  const newHeader = document.createElement('thead')
  newHeader.innerHTML = tableHeader.innerHTML
  const newBody = document.createElement('tbody')
  newBody.innerHTML = tableBody.innerHTML

  newTable.id = "canvas_table"
  newTable.appendChild(newHeader)
  newTable.appendChild(newBody)
  // newTable.style.display = "none"
  console.log(newTable.outerHTML)

  const ctx = canvas.getContext("2d");
  render_html_to_canvas(newTable.outerHTML, ctx, 0, 0, 1200, 382, css);



  const dataUrl = canvas.toDataURL("image/png");

  let pres = new PptxGenJS();
  pres.layout = "LAYOUT_WIDE";
  let slide = pres.addSlide();
  slide.addImage({ data: dataUrl, w: "100%", h: 5, sizing: { type: "contain" } });
  pres.writeFile({ fileName: `hello_slide.pptx` }).then(fileName => {
    console.log(`created file: ${fileName}`);
  });
}


function createPPT() {

  domtoimage.toPng(document.getElementById("talent_grid_table"), { "height": 400, "width": 1360 })
            .then(function(dataUrl) {

              console.log("result", dataUrl);
              let pres = new PptxGenJS();
              pres.layout = "LAYOUT_WIDE";
              let slide = pres.addSlide();
              slide.addImage({ data: dataUrl, w: "100%", h: 5, sizing: { type: "contain" } });
              pres.writeFile({ fileName: `hello_slide.pptx` }).then(fileName => {
                console.log(`created file: ${fileName}`);
              });
            })
            .catch(function(error) {
              console.error("oops, something went wrong!", error);
            });

  return false;

}
