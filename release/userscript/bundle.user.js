// ==UserScript==
// @name        CR Queue Sorter
// @version     1.0.0
// @match       https://www.crunchyroll.com/home/queue
// @grant       unsafeWindow
// @downloadURL https://github.com/edusperoni/cr-queue-sorter/raw/master/release/userscript/bundle.user.js
// @updateURL   https://github.com/edusperoni/cr-queue-sorter/raw/master/release/userscript/bundle.meta.js
// ==/UserScript==

!function(e){var t={}
function n(r){if(t[r])return t[r].exports
var o=t[r]={i:r,l:!1,exports:{}}
return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e
if(4&t&&"object"==typeof e&&e&&e.__esModule)return e
var r=Object.create(null)
if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o))
return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict"
var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])
return e}).apply(this,arguments)}
function o(){return{topItem:100,shows:{}}}function i(){return{order:100,type:"current"}}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultAppConfig=o,t.getValidAppConfig=function(e){return r(r({},{topItem:100,shows:{}}),e||{})},t.defaultShowConfig=i,t.getValidShowConfig=function(e){return r(r({},{order:100,type:"current"}),e||{})}
var c=function(){function e(){}return e.prototype.withConfig=function(e){var t=this.getConfig()
e(t),this.saveConfig(t)},e}()
t.BaseConfigManager=c},function(e,t,n){e.exports=n(2)},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=n(3),o=n(4),i=n(5),c=n(7)
t.prefix="crqueuesort"
var u=["current","backlog","hold"]
!function(){o.appendStyle("\n        ."+t.prefix+"-hold { opacity: 0.5;}\n        ."+t.prefix+"-hold.unwatched { opacity: 1; }\n        .queue-sortable .queue-item."+t.prefix+"-backlog { background-color: lightgray; }\n        ."+t.prefix+"-hold.unwatched ."+t.prefix+"-ctn > ."+t.prefix+"-new-episode { display: block; }\n        ."+t.prefix+"-ctn > ."+t.prefix+"-new-episode { display: none; padding: 5px; color: white; background-color: #dc3545; }\n        ."+t.prefix+"-ctn > a {display: block;}\n    ")
var e=document.getElementById("sortable")
if(e){var n=new o.DomChangeHelper
n.onStartChange=function(){f.disconnect()},n.onEndChange=function(){f.connect()}
var a=new i.LocalStorageConfig,s=new c.TimeoutScheduler(10,(function(){d()})),f=new r.Observer(e)
f.registerCallback((function(e,t){for(var n=0,r=e;n<r.length;n++){var o=r[n]
"childList"===o.type?s.schedule():o.type}})),f.connect(),s.schedule()}function d(){a.withConfig((function(r){var o=function(){var t=Array.from(e.children)
return t=t.filter((function(e){return!!e.attributes.getNamedItem("series_id")}))}()
n.startChangingDom(),o.forEach((function(e){var n=function(e){var t=e.querySelector("div.episode-progress"),n=0
if(t){var r=t.style.width.match(/^(\d+)\%$/)
r&&(n=+r[1])}return n}(e)>70
e.classList.remove(n?"unwatched":"watched"),e.classList.add(n?"watched":"unwatched")
var o=e.querySelector("div.queue-item-content")
if(o){var c=o.querySelector("div."+t.prefix+"-ctn")
c||((c=document.createElement("div")).classList.add(t.prefix+"-ctn"),o.prepend(c))
var u=i.getValidShowConfig(r.shows[e.attributes.getNamedItem("series_id").value])
switch(e.classList.remove(t.prefix+"-hold"),e.classList.remove(t.prefix+"-current"),e.classList.remove(t.prefix+"-backlog"),u.type){case"backlog":e.classList.add(t.prefix+"-backlog")
break
case"current":e.classList.add(t.prefix+"-current")
break
case"hold":e.classList.add(t.prefix+"-hold")}f(t.prefix+"-new-episode","New Episode!"),f(t.prefix+"-to-top","Top",(function(e){return e.order=r.topItem--})),f(t.prefix+"-on-current","Current",(function(e){return e.type="current"})),f(t.prefix+"-on-hold","Hold",(function(e){return e.type="hold"})),f(t.prefix+"-on-backlock","Backlog",(function(e){return e.type="backlog"}))}function f(t,n,r){var o=c.querySelector("."+t)
return o||((o=document.createElement("a")).classList.add(t),o.text=n,c.append(o)),r&&(o.onclick=function(t){t.preventDefault(),a.withConfig((function(t){var n=t.shows,o=i.getValidShowConfig(n[e.attributes.getNamedItem("series_id").value])
n[e.attributes.getNamedItem("series_id").value]=o,r(o),s.schedule()}))}),o}})),o.sort((function(e,t){var n,o,c=r.shows,a=i.getValidShowConfig(c[e.attributes.getNamedItem("series_id").value]),s=i.getValidShowConfig(c[t.attributes.getNamedItem("series_id").value]),f=e.classList.contains("watched"),d=t.classList.contains("watched")
if(a&&s){var l=u.indexOf(a.type)-u.indexOf(s.type)
if(l)return l
var p=a.order-s.order
return p||(f!==d?f?1:-1:0)}if(a)return-1
if(s)return 1
var h=(null===(n=e.attributes.getNamedItem("media_id"))||void 0===n?void 0:n.value)||0
return+((null===(o=t.attributes.getNamedItem("media_id"))||void 0===o?void 0:o.value)||0)-+h})),o.forEach((function(t){return e.removeChild(t)})),o.forEach((function(t){return e.appendChild(t)})),n.stopChangingDom()}))}}()},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=function(){function e(e){var t=this
this.target=e,this._listeners=[],this.config={attributes:!1,childList:!0,subtree:!1},this.callback=function(e,n){for(var r=0,o=t._listeners;r<o.length;r++){(0,o[r])(e,n)}},this.observer=null}return e.prototype.registerCallback=function(e){this._listeners.push(e)},e.prototype.connect=function(){this.observer||(this.observer=new MutationObserver(this.callback)),this.observer.observe(this.target,this.config)},e.prototype.disconnect=function(){this.observer&&this.observer.disconnect()},e}()
t.Observer=r},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.appendStyle=function(e){var t=document.createElement("style")
t.type="text/css",t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t)}
var r=function(){function e(){this.changinDom=0}return e.prototype.startChangingDom=function(){0==this.changinDom++&&this.onStartChange&&this.onStartChange()},e.prototype.stopChangingDom=function(){0==--this.changinDom&&this.onEndChange&&this.onEndChange()},e}()
t.DomChangeHelper=r},function(e,t,n){"use strict"
function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(0)),r(n(6))},function(e,t,n){"use strict"
var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)})
Object.defineProperty(t,"__esModule",{value:!0})
var i=n(0),c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.getConfig=function(){var e=localStorage.getItem(t.LOCAL_STORAGE_KEY)
return i.getValidAppConfig(e?JSON.parse(e):null)},t.prototype.saveConfig=function(e){localStorage.setItem(t.LOCAL_STORAGE_KEY,JSON.stringify(e))},t.LOCAL_STORAGE_KEY="crqueuesort_config",t}(i.BaseConfigManager)
t.LocalStorageConfig=c},function(e,t,n){"use strict"
function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(8)),r(n(9))},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=function(){function e(e){this.cb=e}return e.prototype.schedule=function(){var e=this
this.promise||(this.promise=Promise.resolve().then((function(){e.promise=void 0,e.cb()})))},e}()
t.MicroTaskScheduler=r},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=n(10),o=function(){function e(e,t){this.timeInMs=e,this.cb=t}return e.prototype.schedule=function(){var e=this
void 0===this.timerId&&(this.timerId=r.currentWindow.setTimeout((function(){e.timerId=void 0,e.cb()}),this.timeInMs))},e}()
t.TimeoutScheduler=o},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.currentWindow=unsafeWindow||window}])
