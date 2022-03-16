(()=>{"use strict";function t(t,e,i){const s=i.value;return{configurable:!0,get(){return s.bind(this)}}}class e{static showElement(t){t.classList.toggle("hidden",!1),t.classList.toggle("fadeIn",!0)}static hideElement(t){t.classList.toggle("hidden",!0),t.classList.toggle("fadeIn",!1)}}class i{constructor(t){this.difficulty=t,this.cardsContainer=document.querySelector(".game__content"),this.singleCardTemplate=document.querySelector(".single__card__template"),this.cardsStorage=[],this.initRender()}matchCards(t,e){const i=this.cardsStorage.find((e=>e.id===t)),s=this.cardsStorage.find((t=>t.id===e));return i.position===s.pairPosition}initRender(){switch(this.difficulty){case a.easy:this.createCards(9,"easy"),this.renderCards("easy");break;case a.medium:this.createCards(16,"medium"),this.renderCards("medium");break;case a.hard:this.createCards(32,"hard"),this.renderCards("hard")}}renderCards(t){this.cardsStorage.forEach((e=>{let i=this.singleCardTemplate.content.cloneNode(!0);i=i.querySelector("div"),i.id=e.id,i.classList.add(`single__card__${t}`),i.querySelector(".single__card__image").src=e.imageSrc,this.cardsContainer.append(i)}))}createCards(t,e){const i=this.getRandomNumbers(t);let r=this.getArrayOfNumbers(0,t),n=this.getArrayOfNumbers(t,2*t);for(;!this.arrayValidation(r,n);)r=this.getArrayOfNumbers(0,t),n=this.getArrayOfNumbers(t,2*t);const a=this.cloneArray(i),o=this.cloneArray(i);let h=[],c=[];for(let i=0;i<t;i++){const t=`src/images/${e}/0${a.pop()}.png`,i=0,r=new s(Math.random().toString(),t,i,0);h.push(r)}h.forEach((t=>{const i=`src/images/${e}/0${o.pop()}.png`,r=new s(Math.random().toString(),i,0,0);c.push(r)})),r=this.shuffleArray(r),n=this.shuffleArray(n),h.forEach((t=>{t.position=r.pop()})),c.forEach((t=>{t.position=n.pop()}));for(let t=0;t<h.length;t++)h[t].setPairPosition(c[t].position),c[t].setPairPosition(h[t].position);this.cardsStorage.push(...h,...c),this.sortCards(this.cardsStorage)}sortCards(t){t.sort(((t,e)=>t.position-e.position))}arrayValidation(t,e){if(t.length!==e.length)throw new Error("Arrays must have the same length.");for(let i=0;i<t.length;i++)if(t[i]===e[i])return!1;return!0}cloneArray(t){let e=[];for(let i=0;i<t.length;i++)e.push(t[i]);return e}getArrayOfNumbers(t,e){const i=[];for(let s=t;s<e;s++)i.push(s);return i}getRandomNumbers(t){const e=[];for(let i=0;i<t;i++)e.push(i);for(let t=e.length-1;t>0;t--){let i=Math.floor(Math.random()*(t+1)),s=e[t];e[t]=e[i],e[i]=s}return e}shuffleArray(t){for(let e=t.length-1;e>0;e--){let i=Math.floor(Math.random()*(e+1)),s=t[e];t[e]=t[i],t[i]=s}return t}getRandomIntInclusive(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}}class s{constructor(t,e,i,s){this.id=t,this.imageSrc=e,this.position=i,this.pairPosition=s}setPairPosition(t){this.pairPosition=t}}var r=function(t,e,i,s){var r,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};class n{constructor(t,e){this.name=t,this.difficulty=e,this.timerEnabled=!0,this.timeLimit=!1,this.time="",this.timeContent=document.querySelector(".game__nav__time"),this.seconds=0,this.minutes=0,this.hours=0,this.gameContainer=document.querySelector(".container--game"),this.matchedElement=document.querySelector(".game__nav__matched"),this.missMatchedElement=document.querySelector(".game__nav__missMatched"),this.difficultyElement=document.querySelector(".game__nav__difficulty__text"),this.singleCardElements=document.getElementsByClassName("single__card"),this.currentlyComparing=[],this.totalPairs=0,this.matched=0,this.missMatched=0,this.flipped=0,this.endContainer=document.querySelector(".container--end"),this.failedContainer=document.querySelector(".container--failed"),this.endHeadingName=document.querySelector(".end__heading__name"),this.failedHeadingName=document.querySelector(".failed__heading__name"),this.endScore={time:document.querySelector(".end__score__time"),difficulty:document.querySelector(".end__score__difficulty"),mistakes:document.querySelector(".end__score__mistakes"),matches:document.querySelector(".end__score__matches")},this.failedScore={time:document.querySelector(".failed__score__time"),difficulty:document.querySelector(".failed__score__difficulty"),mistakes:document.querySelector(".failed__score__mistakes"),matches:document.querySelector(".failed__score__matches")},this.resetButton=document.querySelector(".end__restart"),this.resetFailedButton=document.querySelector(".failed__restart"),this.setPairsCount(),this.prepareGame(),this.renderer=new i(this.difficulty),this.setupListeners()}prepareGame(){this.gameContainer.classList.remove("hidden"),this.gameContainer.classList.add("fadeIn"),this.startTimer(),this.difficultyElement.innerText=this.difficulty,this.difficulty===a.hard&&(this.timeLimit=!0)}endGame(){this.timerEnabled=!1,e.hideElement(this.gameContainer),this.gameContainer.classList.add("fadeOut"),e.showElement(this.endContainer),this.resetButton.addEventListener("click",(()=>window.location.reload())),this.endHeadingName.innerText=this.name,this.endScore.time.innerText=this.time,this.endScore.difficulty.innerText=this.difficulty,this.endScore.matches.innerText=this.matched.toString()+" / "+this.totalPairs.toString(),this.endScore.mistakes.innerText=this.missMatched.toString()}gameFailed(){e.hideElement(this.gameContainer),this.gameContainer.classList.add("fadeOut"),e.showElement(this.failedContainer),this.resetFailedButton.addEventListener("click",(()=>window.location.reload())),this.failedHeadingName.innerText=this.name,this.failedScore.time.innerText=this.time,this.failedScore.difficulty.innerText=this.difficulty,this.failedScore.matches.innerText=this.matched.toString()+" / "+this.totalPairs.toString(),this.failedScore.mistakes.innerText=this.missMatched.toString()}setupListeners(){for(let t of this.singleCardElements)t.addEventListener("click",this.handleCardClick)}setPairsCount(){switch(this.difficulty){case a.easy:this.totalPairs=9;break;case a.medium:this.totalPairs=16;break;case a.hard:this.totalPairs=32}}handleCardClick(t){const e=t.currentTarget;this.flipped<2&&(this.flipped++,e.classList.add("single__card__show"),e.classList.add("blocked"),this.addToComparing(e),2===this.flipped&&this.compareCards(),this.matched==this.totalPairs&&this.endGame())}startTimer(){!0===this.timerEnabled&&setInterval(this.timer,1e3)}addToComparing(t){this.currentlyComparing.push(t)}compareCards(){const t=this.currentlyComparing[0].id,e=this.currentlyComparing[1].id;this.renderer.matchCards(t,e)?(this.matched++,this.currentlyComparing.forEach((t=>{t.classList.add("single__card__matched")})),this.currentlyComparing=[],this.flipped=0):(this.missMatched++,setTimeout((()=>{this.currentlyComparing.forEach((t=>{t.classList.remove("single__card__show"),t.classList.remove("blocked")})),this.currentlyComparing=[],this.flipped=0}),1e3)),this.matchedElement.innerText=this.matched.toString(),this.missMatchedElement.innerText=this.missMatched.toString()}timer(){if(this.timeLimit&&10===this.minutes)return this.timerEnabled=!1,this.gameFailed();++this.seconds,60==this.seconds&&(this.seconds=0,this.minutes++,60==this.minutes&&(this.minutes=0,this.hours++)),this.setProperTime(),this.timeContent.innerText=this.time}setProperTime(){let t,e,i;t=this.seconds<10?"0"+this.seconds:this.seconds.toString(),e=this.minutes<10?"0"+this.minutes:this.minutes.toString(),i=this.hours<10?"0"+this.hours:this.hours.toString(),this.time=`${i}:${e}:${t}`}}r([t],n.prototype,"handleCardClick",null),r([t],n.prototype,"startTimer",null),r([t],n.prototype,"timer",null);var a,o=function(t,e,i,s){var r,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};!function(t){t.easy="Łatwy",t.medium="Średni",t.hard="Trudny"}(a||(a={}));class h{constructor(t){this.text=t,this.name="",this.loginContainer=document.querySelector(".container--login"),this.loginLabel=document.querySelector(".login__name__label"),this.loginInput=document.querySelector(".login__name__input"),this.loginError=document.querySelector(".login__error"),this.loginSubmit=document.querySelector(".login__submit"),this.difficultyContainer=document.querySelector(".container--difficulty"),this.difficulties=document.querySelectorAll(".difficulty"),this.difficultySubmit=document.querySelector(".difficulty__submit"),this.gameContainer=document.querySelector(".container--game"),this.setListeners(),this.typingAnimation(),this.difficulty=a.easy}startGame(){new n(this.name,this.difficulty),this.difficultyContainer.classList.remove("fadeIn"),e.hideElement(this.difficultyContainer),this.difficultyContainer.classList.add("fadeOut"),e.showElement(this.gameContainer)}nextStep(){this.setName(),this.loginContainer.classList.add("slideRight"),setTimeout((()=>{this.loginContainer.classList.add("hidden")}),500),setTimeout((()=>{this.difficultyContainer.classList.remove("hidden")}),500),this.difficultyContainer.classList.add("fadeIn")}typingAnimation(){for(let t=0;t<this.text.length;t++)setTimeout((()=>{this.loginLabel.innerHTML+=this.text[t]}),100*t)}setName(){this.name=this.loginInput.value}setDifficulty(t){switch(t.target.value){case"easy":this.difficulty=a.easy;break;case"medium":this.difficulty=a.medium;break;case"hard":this.difficulty=a.hard}e.showElement(this.difficultySubmit)}setListeners(){this.loginInput.addEventListener("input",this.validateInput),this.loginSubmit.addEventListener("click",this.nextStep),this.difficulties.forEach((t=>{t.addEventListener("change",this.setDifficulty)})),this.difficultySubmit.addEventListener("click",this.startGame)}validateInput(t){const i=t.target;this.loginError.innerHTML="",i.value.length>0&&i.value.length<15?(this.setName(),e.showElement(this.loginSubmit)):(this.loginError.innerHTML="Nazwa musi zawierać od 1 do 15 znaków.",e.hideElement(this.loginSubmit))}}o([t],h.prototype,"startGame",null),o([t],h.prototype,"nextStep",null),o([t],h.prototype,"setDifficulty",null),o([t],h.prototype,"validateInput",null),new class{constructor(){new h("Jak masz na Imię?...")}}})();