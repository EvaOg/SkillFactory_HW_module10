let bodyWidth;
let bodyHeight;
let body = document.getElementsByTagName('body');


function getSize () {
    bodyWidth = document.body.clientWidth;
    bodyHeight = document.body.clientHeight;
    alert(`This window width is ${bodyWidth}px, the body height is ${bodyHeight}px`);
}
