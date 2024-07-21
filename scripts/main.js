function $(e){return document.getElementById(e)}

class TypingScript {
    /**
     * @param {Array} array 
     * @param {number} onscreentime 
     * @param {number} offscreentime 
     * @param {number} typingtime 
	 * @param {number} onscreenindex
     */
    constructor(array, onscreentime, offscreentime, typingtime, onscreenindex) {
        this.tousearray = array;
        this.onscreenduration = onscreentime;
        this.offscreenduration = offscreentime;
        this.typingduration = typingtime;
        if (!Array.isArray(array)) {
            throw "The array passed must be an array.";
        }
        if (isNaN(onscreentime) || onscreentime == null || onscreentime == undefined) {
            this.onscreenduration = 5000;
            console.warn('The duration for onscreenduration was not passed or is not a number,\n defaulting to 5000.');
        }
        if (isNaN(offscreentime) || offscreentime == null || offscreentime == undefined) {
            this.offscreenduration = 1000;
            console.warn('The duration for offscreenduration was not passed or is not a number,\n defaulting to 1000.');
        }
        if (isNaN(typingtime) || typingtime == null || typingtime == undefined) {
            this.typingduration = 50;
            console.warn('The duration for typingduration was not passed or is not a number,\n defaulting to 50.');
        }
		if (isNaN(onscreenindex) || onscreenindex == null || onscreenindex == undefined) {
            this.onscreenindex = 0;
        } else{
			this.onscreenindex = onscreenindex;
		}

        this.index = 0;
        this.onscreenindex = 0;
        this.addInt = '';
        this.removeInt = '';
        this.started = false;

        // Bind methods to the instance
        this.addTo = this.addTo.bind(this);
        this.removeFrom = this.removeFrom.bind(this);
    }
    addTo() {
        if (this.started == false) return;
        let split = this.tousearray[this.onscreenindex].split('');
        $('typed').innerHTML += split[this.index];
        this.index++;
        if (this.index == split.length) {
            clearInterval(this.addInt);
            setTimeout(() => {
                this.removeInt = setInterval(this.removeFrom, this.typingduration);
            }, this.onscreenduration);
        }
    }
    removeFrom() {
        if (this.started == false) return;
        let split = this.tousearray[this.onscreenindex].split('');
        let toAppend = "";
        for (let i = 0; i < this.index; i++) {
            toAppend += split[i];
        }
        $('typed').innerHTML = toAppend;
        if (this.index == 0) {
            clearInterval(this.removeInt);
            setTimeout(() => {
                this.addInt = setInterval(this.addTo, this.typingduration);
            }, this.offscreenduration);
            this.onscreenindex++;
            if (this.onscreenindex == this.tousearray.length) {
                this.onscreenindex = 0;
            }
        } else {
            this.index--;
        }
    }
    start() {
        if (this.started) return console.error("The script has already started.");
        this.started = true;
        this.addInt = setInterval(this.addTo, this.typingduration);
    }
    stop(){
        this.started = false;
    }
}

let themeToggle = document.getElementById('dark-light');
let requireThemePresence = document.getElementsByClassName('requireThemePresence');
setInterval(()=>{
	requireThemePresence = document.getElementsByClassName('requireThemePresence');
}, 100);

function updateColorScheme() {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.body.setAttribute('data-color-scheme', 'dark');
		for (let i = 0; i < requireThemePresence.length; i++) {
			requireThemePresence[i].setAttribute('data-color-scheme', 'dark');
		}
		theme = 'dark';
	} else {
		document.body.setAttribute('data-color-scheme', 'light');
		for (let i = 0; i < requireThemePresence.length; i++) {
			requireThemePresence[i].setAttribute('data-color-scheme', 'light');
		}
		theme = 'light';
	}
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateColorScheme);
updateColorScheme();
let typedArray = []
let typingscript;
function isElementOffScreen(element) {
	const rect = element.getBoundingClientRect();
	return (
	  rect.right < 0 ||
	  rect.bottom < 0 ||
	  rect.left > window.innerWidth ||
	  rect.top > window.innerHeight
	);
}
let offscreen=false;
let typedarrayindex = 0;

fetch('./info.json').then(data=>data.json()).then(data=>{
	let projects = data.projects;
	let info = data.about;
	
	document.querySelector('.about').innerHTML+=info.text;
	let typingElement = document.createElement('h2')
	typingElement.id = 'typed'
	document.querySelector('.about').append(typingElement)
	
	for (let i=0;i<info.activities.length;i++){
		console.log(Array.isArray(info.activities[i]))
		typedArray.push(info.activities[i].text)
	}

	typingscript = new TypingScript(typedArray, 3000, 500, 40);
	typingscript.start();
	setTimeout(() => {
		$('typed').style.height = $('typed').getBoundingClientRect().height+5+'px';
	}, 500);

	setInterval(() => {
		if (isElementOffScreen($('typed'))){
			offscreen=true;
			typedarrayindex=typingscript.onscreenindex
			typingscript.stop();
			$('typed').style.height = '0px';
			$('typed').innerHTML = '';
		} else if (offscreen==true){
			offscreen=false;
			typingscript = new TypingScript(typedArray, 4000, 500, 50, typedarrayindex);
			typingscript.start();
			$('typed').style.height = $('typed').getBoundingClientRect().height+5+'px';
		} else{
			offscreen=false;
		}
	}, 1);

	document.querySelector('.projects').querySelector('ul').innerHTML=""
	for (let project of projects){
		let card = document.createElement('section')
		let urls = project.urls;
		card.classList.add('content')
		card.innerHTML=`<h2 href="${urls.production}">${project.name} 🔗</h2>\n<p>${project.description}</p>`
		if (urls.production){
			card.classList.add('cursorPointer')
			card.classList.add(urls.production)
		} else if (urls.git){
			card.classList.add('cursorPointer')
			card.classList.add(urls.git)
		}
		document.body.appendChild(card)

		let li = document.createElement('li')
		li.innerHTML=`<big>${project.name}</big> - ${project.description}; `
		if (urls.git){
			li.innerHTML+=`<br><a target="_blank" href="${urls.git}">GitHub; </a>`
		}
		if (urls.production){
			li.innerHTML+=`<br><a target="_blank" href="${urls.production}">Production Site; </a>`
		}
		if (urls.download){
			li.innerHTML+=`<br><a class="exeDownload ./downloads/${urls.download}">Download; </a>`
		}
		li.innerHTML+=`<br><br>`
		document.querySelector('.projects').querySelector('ul').appendChild(li)
	}
	let exeDownloads = document.getElementsByClassName('exeDownload');
	let forcedownload=false;
	for (let exeDownload of exeDownloads){
		exeDownload.addEventListener('click', (event)=>{
			if (!forcedownload) event.preventDefault()
			if (confirm('This is a .exe file, which is meant to be ran on Windows devices. Would you like to download anyways?')){
				let a = document.createElement('a')
				a.href=`${exeDownload.classList[1]}`
				a.setAttribute('download','')
				a.click();
			}
		})
	}
})