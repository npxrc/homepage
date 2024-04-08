let menu = document.getElementById('contextmenu')
let menuDisabled=false;
let currentTarget;
let menuOpen=false;
function disableMenu(){
	menuDisabled=true;
    setTimeout(()=>{
        menuDisabled=false;
    }, 250)
}
function hideMenu() {
    menu.style.opacity=0;
    menuOpen=false;
    disableMenu();
}
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    menuOpen=true;
    menu.style.left = (event.clientX+15) + 'px';
    menu.style.top = (event.clientY+15) + 'px';
    menu.style.display = "block";
    menu.style.opacity = 1;
    disableMenu();
    setTimeout(()=>{
        menu.style.opacity = 1;
    }, 250)
});

document.addEventListener('mousedown', (event) => {
    if (event.target !== menu) { // Check if click is outside the menu
        hideMenu();
    }
});
window.onpointermove = event => {
    if (menuDisabled) return;
    if (
        (event.target !== menu)||
        (event.target.classList.has('menuObject'))
    ){
        currentTarget=event.target;
        let menuClientX = event.clientX;
        let menuClientY = event.clientY;
        menu.animate({
            left: `${menuClientX}px`,
            top: `${menuClientY+scrollY}px`
        }, { duration: 1500, fill: "forwards" });
    }
}