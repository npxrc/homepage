let blob = document.getElementsByTagName('blob')[0]
window.onpointermove = event => { 
    let { clientX, clientY } = event;
    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });
}