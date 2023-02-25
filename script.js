let blob = document.getElementsByTagName('blob')[0]
let arrow = document.getElementById('goDown')
let clientX;
let clientY;
window.onpointermove = event => { 
    clientX = event.clientX;
    clientY = event.clientY;
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });
}
document.getElementById('goDown').addEventListener('click',()=>{
    if (clientX>(window.innerWidth*0.51)){
        arrow.classList.remove('mousedown')
        arrow.classList.add('mouseright')
        arrow.animate({
            animation: 'leftright 2.5s infinite'
        })
    } else{
        arrow.classList.remove('mouseright')
        arrow.classList.add('mousedown')
        arrow.animate({
            animation: 'updowm 2.5s infinite'
        })
    }
})
document.getElementById('goDown').addEventListener('mouseup',()=>{
    arrow.classList.remove('mousedown')
    arrow.classList.remove('mouseright')
})