!function(e){var t={};function o(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/dist",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);const n=()=>{const e=document.createElement("div");return e.className="dropdown-lists__countryBlock",e},s=(e,t)=>{const o=document.createElement("div");return o.className="dropdown-lists__total-line",o.innerHTML=`\n  <div class="dropdown-lists__country">${e}</div>\n  <div class="dropdown-lists__count">${t}</div>\n`,o},d=e=>{const t=document.createElement("div");return t.dataset.cityLink=e.link,t.className="dropdown-lists__line",t.innerHTML=`\n  <div class="dropdown-lists__city">${e.name}</div>\n  <div class="dropdown-lists__count">${e.count}</div>\n`,t},r=(e,t)=>{const o=document.querySelector(".dropdown-lists__list--autocomplete .dropdown-lists__col");o.innerHTML="";const s=e.reduce((e,o)=>e.concat(o.cities.filter(e=>e.name.toLowerCase().startsWith(t.toLowerCase()))),[]),r=n();if(s.forEach(e=>{const o=d(e),n=o.firstElementChild;console.log("child",n);const s=n.textContent;n.innerHTML=`<span class="match">${s.slice(0,t.length)}</span>${s.slice(t.length)}`,r.append(o)}),!s.length){const e=d({name:"Ничего не найдено",count:"",link:"none"});r.append(e)}o.append(r)},l=({elem:e,display:t,mode:o="show",className:n})=>{"hide"===o&&(e.style.visibility="hidden",e.style.display="none"),"add"===o&&e.classList.add(n),"remove"===o&&e.classList.remove(n),"toggle"===o&&e.classList.toggle(n),"show"===o&&(e.style.visibility="visible",e.style.display=t||"")},a=({dropdowns:e,flag:t,dropdown:o})=>{if(console.log(o),o)switch(t){case"on":o.style.display="block";break;case"off":o.style.display="none";break;default:e.forEach(e=>e.style.display=e===o?"block":"none")}else e.forEach(e=>e.style.display="none")},i=({timing:e=(e=>e),draw:t,duration:o=500})=>{const n=performance.now();requestAnimationFrame((function s(d){let r=(d-n)/o;r>1&&(r=1);const l=e(r);t(l),r<1&&requestAnimationFrame(s)}))},c=document.getElementById("select-cities"),u=document.querySelectorAll(".dropdown-lists__list"),p=e=>{const t=+c.dataset.dropdown,o=t?e:1-e;console.log(o),console.log(-e),u[0].style.transform=`translateX(${-415*o}px)`,u[1].style.transform=`translateX(${-415*o}px)`,1===e&&(a({dropdowns:u,flag:"off",dropdown:t?u[0]:u[1]}),u[0].style.transform="",u[1].style.transform="")},m=(e,t,o,c,u,m,f)=>{o.addEventListener("focus",()=>{a({dropdowns:u,dropdown:u[o.dataset.dropdown]||u[0]})}),document.addEventListener("click",e=>{e.target.closest("#select-cities, .dropdown-lists__list")||a({dropdowns:u}),e.target===m&&(o.value="",o.dataset.dropdown="0",l({elem:m,mode:"hide"}),l({elem:f,mode:"add",className:"button--disabled"}))}),c.addEventListener("click",c=>{const y=o.dataset.dropdown,w=c.target.closest(".dropdown-lists__total-line"),_=c.target.closest(".dropdown-lists__line");w&&(+y?(o.value="",o.dataset.dropdown="0",a({dropdowns:u,flag:"on",dropdown:u[0]}),u[0].style.transform="translateX(-415px)",u[1].style.transform="translateX(-415px)",i({draw:p})):(o.value=w.firstElementChild.textContent,o.dataset.dropdown="1",((e,t)=>{const o=document.querySelector(".dropdown-lists__list--select .dropdown-lists__col");o.innerHTML="";const r=e.find(e=>e.country===t);r.cities.sort((e,t)=>t.count-e.count);const l=n(),a=s(r.country,r.count);l.append(a);for(let e=0;e<r.cities.length;e++){const t=d(r.cities[e]);l.append(t)}o.append(l)})(e,o.value),a({dropdowns:u,flag:"on",dropdown:u[1]}),i({draw:p}))),_&&("none"!==_.dataset.cityLink&&(o.value=_.firstElementChild.textContent,o.dataset.dropdown="2",r(e,o.value),t.href=_.dataset.cityLink,l({elem:f,mode:"remove",className:"button--disabled"})),a({dropdowns:u})),l({elem:m,display:"block"})}),o.addEventListener("input",()=>{o.value?(r(e,o.value),a({dropdowns:u,dropdown:u[2]})):(a({dropdowns:u,dropdown:u[0]}),l({elem:m,mode:"hide"}),l({elem:f,mode:"add",className:"button--disabled"}))})},f=document.querySelector(".button"),y=document.getElementById("select-cities"),w=document.querySelector(".dropdown"),_=document.querySelectorAll(".dropdown-lists__list"),v=document.querySelector(".close-button"),b=document.querySelector(".button"),h=document.querySelector(".preloader");a({dropdowns:_}),l({elem:b,mode:"add",className:"button--disabled"}),setTimeout(()=>{var e;(e="db_cities.json",fetch(e,{method:"GET",headers:{"Content-Type":"application/json"}}).then(e=>{if(200!==e.status)throw new Error("Network status not 200.");return e.json()})).then(e=>{l({elem:h,mode:"hide"}),(e=>{const t=document.querySelector(".dropdown-lists__list--default .dropdown-lists__col");t.innerHTML="",e.forEach(e=>{e.cities.sort((e,t)=>t.count-e.count);const o=n(),r=s(e.country,e.count);o.append(r);for(let t=0;t<3;t++){const n=d(e.cities[t]);o.append(n)}t.append(o)})})(e.RU),m(e.RU,f,y,w,_,v,b)}).catch(e=>{f.insertAdjacentHTML("afterend",'\n      <div class="message">\n        <p>Нам очень жаль, но что-то пошло не так.</p>\n        <p>Пожалуйста, обновите страницу или повторите позже.</p>\n      </div>\n    '),console.error(e)})},2e3)}]);