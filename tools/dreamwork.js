let preDefined = [
    {
        name: 'credits',
        html: '<div id="credits">\n    <a href="mailto:neilpatrao@duck.com">Made by Neil Patrao</a>\n</div>',
        css: `#credits{position: absolute;bottom: 0;right: 0;margin: 1vh;animation: rotate2 5s infinite linear forwards;color: white;} @keyframes rotate2 { 0%{transform: rotateY(0deg);} 100%{transform: rotateY(360deg);} }`
    },
    {
        name: 'blob',
        html: '<blob></blob>',
        css: `blob {background-color: white;position: absolute;height: 30vmax;left: 50%;top: 50%;translate: -50% -50%;aspect-ratio: 1;border-radius: 100%;animation: rotate 30s infinite;opacity: 0.8;background: linear-gradient(to right, rgb(218, 95, 95), #735fd8);filter: blur(10vmax);}`,
        script: `let blob = document.getElementsByTagName('blob')[0]; let clientX; let clientY; let hideblob = setTimeout(() => {blob.animate({top: \`\${window.innerHeight/2}\`,left: \`\${window.innerWidth/2}\`},{duration: 500, fill:"forwards", easing: 'ease-in-out'});}, 2500); window.onpointermove = (event)=>{clearTimeout(hideblob); clientX = event.clientX; clientY = event.clientY;blob.animate({left: \`\${clientX}px\`,top: \`\${clientY}px\`}, { duration: 2500, fill: "forwards" }); hideblob = setTimeout(() => {blob.animate({top: \`\${window.innerHeight/2}\`,left: \`\${window.innerWidth/2}\`},{duration: 500, fill:"forwards", easing: 'ease-in-out'});}, 2500);};if (('ontouchstart' in window)==true||navigator.msMaxTouchPoints>0){blob.style.display="none";};`
    }
]
function isClass(str, callback) {
    if (str.startsWith('.')) callback()
}

function isId(str, callback) {
    if (str.startsWith('#')) callback()
}

function isTagName(str, callback) {
    let alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    for (let i = 0; i < alphabet.length; i++) {
        if (str.startsWith(alphabet[i])) return callback()
    }
}
class DreamWorkElemBuilder {
    constructor(elemName, parent = document.body) {
        this.elem = document.createElement(elemName);
        this.elemName = elemName;
        this.parent = parent;
        console.log(`Okay, created a "${elemName}".`);
    }

    thatSays(text) {
        this.elem.innerHTML = text;
        console.log(`Your "${this.elemName}" now says "${text}".`);
        return this;
    }

    giveItAClass(name){
        this.elem.classList.add(name)
        return this;
    }

    giveItAnId(name){
        this.elem.id = name
        return this;
    }

    withA(nameOfInner) {
        const innerBuilder = new ElementBuilder(nameOfInner, this);
        this.elem.appendChild(innerBuilder.elem);
        console.log(`Okay, added a "${nameOfInner}" to your "${this.elemName}".`);
        return innerBuilder;
    }

    css(rule, value) {
        this.elem.style[rule] = value;
        console.log(`Your "${this.elemName}" now has "${rule}": "${value}".`);
        return this;
    }

    andAppendIt() {
        if (this.parent) {
            this.parent.appendChild(this.elem);
            console.log(`Your "${this.elemName}" is now appended to something.`);
        }
        return this.elem;
    }
}
class DreamWork {
    constructor(elemName) {
        isClass(elemName, () => {
            let elem = document.createElement('div')
            elem.classList.add(elemName.split('.')[1])
            document.body.appendChild(elem)
            this.elem = document.querySelector(elemName)
            this.elemName = elemName
        })
        isId(elemName, () => {
            let elem = document.createElement('div')
            elem.id = elemName.split('#')[1]
            document.body.appendChild(elem)
            this.elem = document.getElementById(elemName.split('#')[1])
            this.elemName = elemName
        })
        isTagName(elemName, () => {
            let elem = document.createElement(elemName)
            document.body.appendChild(elem)
            this.elem = document.getElementsByTagName(elemName)[0]
            this.elemName = elemName
        })
        console.log('Alright, created a "' + elemName + '."')
    }
    css(rule, value) {
        this.elem.style[rule] = value
    }
    createA(elemName){
        console.log(this.elem)
        return new DreamWorkElemBuilder(elemName, this.elem)
    }
    font (fontname='Serif', importFrom){
        if (importFrom) {
            let style = document.createElement('style')
            style.innerHTML = `@import ${importFrom}`
            document.head.appendChild(style)
        }
        this.css('fontFamily', fontname)
    }
    preDefined(name, args=[]){
        if (name==undefined||name==null) return;
        for (let i=0;i<preDefined.length;i++){
            if (preDefined[i].name==name){
                document.body.innerHTML+=preDefined[i].html
                if (preDefined[i].css){
                    let cssElem = document.createElement('style')
                    cssElem.innerHTML = preDefined[i].css
                    document.body.appendChild(cssElem)
                }
                if (preDefined[i].script){
                    let scriptElem = document.createElement('script')
                    scriptElem.innerHTML = preDefined[i].script
                    document.body.append(scriptElem)
                }
            }
        }
    }
}

function $() {
    return {
        createA: (elemName)=>{
            return new DreamWorkElemBuilder(elemName, document.body)
        },
        css: (rule, value) => {
            document.body.style[rule] = value
            console.log('Okay, applied "' + rule + '" to the body.')
        },
        font: (fontname, importFrom) => {
            if (importFrom) {
                let style = document.createElement('style')
                style.innerHTML = `@import ${importFrom}`
                document.head.appendChild(style)
            }
            $().css('fontFamily', fontname)
        },
        preDefined: (name)=>{
            if (name==undefined||name==null) return;
            for (let i=0;i<preDefined.length;i++){
                if (preDefined[i].name==name){
                    document.body.innerHTML+=preDefined[i].html
                    let script = document.createElement('script')
                    script.innerHTML = preDefined[i].script
                    document.body.append(script)
                }
            }
        }
    }
}

function repeat(times, callback) {
    for (let i = 0; i < times; i++) {
        callback()
    }
}

function repeatUntil(condition, callback) {
    while (condition()) callback()
}
