let cursorMoveDuration = 300;
let cursor = document.getElementsByTagName('cursor')[0]
let clientX;
let clientY;
let mouse='up'
window.onpointermove = event => { 
    cursorActive();
    clientX = event.clientX;
    clientY = event.clientY;
    cursor.animate({
        left: `${clientX}px`,
        top: `${clientY+scrollY}px`
    }, { duration: 750, fill: "forwards" });
    hidecursor = setTimeout(() => {cursorIdle()}, 2500);
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
window.addEventListener('mousedown', (event) => {
    cursorActive();
    cursor.classList.add('mousedown')
    mouse='down'
    let classlist=event.target.parentElement.classList[2]
    if (classlist==null) return;
    if (classlist==undefined) return;
    window.open(classlist)
    console.log(classlist);
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