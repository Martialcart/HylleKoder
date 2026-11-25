const barcodeInput = document.querySelector("#barcodeInput");
const barcodeItemDefault = document.querySelector("#barcodeItem").cloneNode(true);
const barcodeContainer = document.querySelector("#barcodeContainer");
const formatCode = "SEPARL";
const inputPlaceHolder = "Hyllenavn";
const placeholderWidth = "12em";
const maxChars = 3;
const charWidthFactor = 1.3;


let prevEmptyParentId = null;
let barcodeIdNumber = 0;

barcodeInput.addEventListener("keyup", (e) => barcodeInputHandler(e));

function barcodeInputHandler(e) {
    console.log(e.key);
    resize(e.target);
    switch(e.key) {
	case 'Enter': createBarcodeItem(e); break;
	case 'Backspace': delEmptyBarcode(e); break;
	case 'Delete': delEmptyBarcode(e); break;
	default: writeBarcode(e); 
    }
}

function resize(e) {
    if (e.value.length < 1) {
	e.style.width = placeholderWidth;
    } else {
	e.style.width = maxChars * charWidthFactor + "ch";
    }
}

function delEmptyBarcode(e) {
    console.log("delBarcode");
    const barcodeParent = e.srcElement.parentNode;
    const parentId = barcodeParent.id;
    const previousInput = getPreviusInput(e);
    const barcode = e.target.value;
    console.log(barcode);
    console.log(barcode.length < 0);

    if (barcode.length <= 0) {
	if (prevEmptyParentId == parentId) {
	    barcodeParent.remove();
	    previousInput.focus();
	}
	prevEmptyParentId = parentId;

    } else {
	writeBarcode(e);
}

function getPreviusInput(e) {
    return e.srcElement.parentNode.previousSibling.querySelector("input");
}

function createBarcodeItem(e) {
    barcodeIdNumber++;

    const tempBarcodeItem = barcodeItemDefault.cloneNode("true");//store clone of default
    const barInput = tempBarcodeItem.querySelector("input");
    
    //set unique id's
    tempBarcodeItem.id += barcodeIdNumber;
    barInput.id += barcodeIdNumber;
    tempBarcodeItem.querySelector("canvas").id += barcodeIdNumber;

    //attach eventlistener to input
    barInput.addEventListener("keyup",(e) => barcodeInputHandler(e)); 

    //reset input placeholder
    barInput.value = "";

    //add barcodeItem to document
    e.srcElement.parentNode.insertAdjacentElement("afterend", tempBarcodeItem);
    
    //set focus to new barcodeInput
    barInput.focus();
    writeBarcode(e);
}

function writeBarcode(e) {
    prevEmptyParentId = null;
    const input = e.srcElement;
    if(input.value !== "") {
	const id = e.srcElement.parentNode.querySelector("canvas").id;
	console.log(id);
	JsBarcode(("#" + id), (formatCode + input.value), {
	    displayValue: false
	}); 
    }
}


