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