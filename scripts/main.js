function $(e, i){if (typeof i == 'number'){if (i==1){/*queryselector*/return document.querySelector(e);} else if (i==2){/*queryselectorall*/return document.querySelectorAll(e);} else if (i==3){ /*tagname*/return document.getElementsByTagName(e);}else{if (i==0){console.error('you dont have to pass the second parameter since it defaults to getElementById');} else if (i>3){console.error('what are you smoking the only available DOM selectors in JS are\n    - getElementById\n  - getElementsByClassName (which youd use querySelector for)\n    - getElementsByTagName\nso are you trying to invent a new method of DOM selecting? dont pass a second parameter higher than 3');}return document.getElementById(e);}}else if (typeof i == 'boolean'){if (i==true){return document.querySelectorAll(e);} else{return document.querySelector(e);}}}
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

fetch('./projects.json').then(data=>data.json()).then(data=>{
	let projects = data.projects;
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