let cursorMoveDuration = 300;
let cursor = document.getElementsByTagName('cursor')[0]
let clientX;
let clientY;
window.onpointermove = event => { 
    cursorActive();
    clientX = event.clientX;
    clientY = event.clientY;
    cursor.animate({
        left: `${clientX}px`,
        top: `${clientY+scrollY}px`
    }, { duration: 750, fill: "forwards" });
    hidecursor = setTimeout(() => {cursorIdle()}, 2500);

    let names=[
        //list all text elements such as <code> <h1> <p> etc
        'CODE',
        'P',
        'INPUT',
        'TEXTAREA',
        'UL',
        'LI',
        'SELECT',
        'OPTION',
        'LABEL',
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6',
    ]
    if (names.includes(event.target.tagName.toUpperCase())){
        cursor.animate({
            width: '0.6vmax',
            height: '2.5vmax',
            borderRadius: '15%'
        }, { duration: 250, fill: "forwards" });
    } else{
        cursor.animate({
            width: '1vmax',
            height: '1vmax',
            borderRadius: '100%'
        }, { duration: 250, fill: "forwards" });
    }
}
if (('ontouchstart' in window)==true||navigator.msMaxTouchPoints>0){
    cursor.style.display="none"
}
setInterval(() => {
    if (('ontouchstart' in window)==true||navigator.msMaxTouchPoints>0){
        cursor.style.display="none"
    } else{
        cursor.style.display="block"
    }
}, 1000);
let mouse='up'
window.addEventListener('mousedown', () => {
    cursorActive();
    cursor.classList.add('mousedown')
    mouse='down'
});
window.addEventListener('mouseup', () => {
    cursor.classList.remove('mousedown')
    mouse='up'
    hidecursor = setTimeout(() => {cursorIdle()}, 2500);
});
window.addEventListener('scroll', () => {
    cursor.classList.remove('idle')
    clearTimeout(hidecursor);
    cursor.animate({
        left: `${clientX}px`,
        top: `${clientY+scrollY}px`
    }, { duration: 750, fill: "forwards" });
});
function cursorActive(){
    cursor.classList.remove('idle')
    clearTimeout(hidecursor);
}
function cursorIdle(){
    if (mouse=='down') return;
    cursor.classList.add('idle');
    clearTimeout(hidecursor);
}
let hidecursor = setTimeout(() => {cursorIdle()}, 2500);