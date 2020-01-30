// ==UserScript==
// @name        CR Queue Sorter
// @version     1.0.1
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
return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict"
var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])
return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{a(r.next(e))}catch(e){i(e)}}function c(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t
e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,c)}a((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1]
return o[1]},trys:[],ops:[]}
return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i
function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.")
for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o
switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i
break
case 4:return u.label++,{value:i[1],done:!1}
case 5:u.label++,r=i[1],i=[0]
continue
case 7:i=u.ops.pop(),u.trys.pop()
continue
default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0
continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1]
break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i
break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i)
break}o[2]&&u.ops.pop(),u.trys.pop()
continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1]
return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0})
var c=u(n(4))
function a(){return{topItem:100,shows:{}}}function s(){return{order:100,type:"current"}}t.defaultAppConfig=a,t.getValidAppConfig=function(e){return r(r({},{topItem:100,shows:{}}),e||{})},t.defaultShowConfig=s,t.getValidShowConfig=function(e){return r(r({},{order:100,type:"current"}),e||{})}
var l=function(){function e(){}return e.prototype.withConfig=function(e){return o(this,void 0,void 0,(function(){var t
return i(this,(function(n){switch(n.label){case 0:return[4,this.getConfig()]
case 1:return t=n.sent(),[4,e(t)]
case 2:return n.sent(),[4,this.saveConfig(t)]
case 3:return n.sent(),[2]}}))}))},e}()
t.BaseConfigManager=l,t.isConfigEqual=function(e,t){return c.default(e,t)}},function(e,t,n){"use strict"
function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(0)),r(n(5)),r(n(6)),r(n(8))},function(e,t,n){"use strict"
function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(11)),r(n(12))},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=n(1),o=n(14),i=n(2)
new o.QueueSorter({configManager:new r.LocalStorageConfig,scheduler:new i.TimeoutScheduler(10)}).init()},function(e,t,n){"use strict"
e.exports=function e(t,n){if(t===n)return!0
if(t&&n&&"object"==typeof t&&"object"==typeof n){if(t.constructor!==n.constructor)return!1
var r,o,i
if(Array.isArray(t)){if((r=t.length)!=n.length)return!1
for(o=r;0!=o--;)if(!e(t[o],n[o]))return!1
return!0}if(t.constructor===RegExp)return t.source===n.source&&t.flags===n.flags
if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===n.valueOf()
if(t.toString!==Object.prototype.toString)return t.toString()===n.toString()
if((r=(i=Object.keys(t)).length)!==Object.keys(n).length)return!1
for(o=r;0!=o--;)if(!Object.prototype.hasOwnProperty.call(n,i[o]))return!1
for(o=r;0!=o--;){var u=i[o]
if(!e(t[u],n[u]))return!1}return!0}return t!=t&&n!=n}},function(e,t,n){"use strict"
var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{a(r.next(e))}catch(e){i(e)}}function c(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t
e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,c)}a((r=r.apply(e,t||[])).next())}))},u=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1]
return o[1]},trys:[],ops:[]}
return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i
function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.")
for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o
switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i
break
case 4:return u.label++,{value:i[1],done:!1}
case 5:u.label++,r=i[1],i=[0]
continue
case 7:i=u.ops.pop(),u.trys.pop()
continue
default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0
continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1]
break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i
break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i)
break}o[2]&&u.ops.pop(),u.trys.pop()
continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1]
return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}
Object.defineProperty(t,"__esModule",{value:!0})
var c=n(0),a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.getConfig=function(){return i(this,void 0,void 0,(function(){var e
return u(this,(function(n){return e=localStorage.getItem(t.LOCAL_STORAGE_KEY),[2,c.getValidAppConfig(e?JSON.parse(e):null)]}))}))},t.prototype.saveConfig=function(e){return i(this,void 0,void 0,(function(){return u(this,(function(n){return localStorage.setItem(t.LOCAL_STORAGE_KEY,JSON.stringify(e)),[2]}))}))},t.LOCAL_STORAGE_KEY="crqueuesort_config",t}(c.BaseConfigManager)
t.LocalStorageConfig=a},function(e,t,n){"use strict"
var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{a(r.next(e))}catch(e){i(e)}}function c(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t
e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,c)}a((r=r.apply(e,t||[])).next())}))},u=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1]
return o[1]},trys:[],ops:[]}
return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i
function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.")
for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o
switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i
break
case 4:return u.label++,{value:i[1],done:!1}
case 5:u.label++,r=i[1],i=[0]
continue
case 7:i=u.ops.pop(),u.trys.pop()
continue
default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0
continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1]
break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i
break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i)
break}o[2]&&u.ops.pop(),u.trys.pop()
continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1]
return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}
Object.defineProperty(t,"__esModule",{value:!0})
var c=n(7)
function a(e){return new Promise((function(t,n){var r={config:e,operation:"SaveConfig"}
chrome.runtime.sendMessage(r,(function(e){c.isError(e)?n(e.error):t()}))}))}var s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.getConfig=function(){return i(this,void 0,void 0,(function(){return u(this,(function(e){switch(e.label){case 0:return[4,new Promise((function(e,t){chrome.runtime.sendMessage({operation:"GetConfig"},(function(n){c.isError(n)?t(n.error):e(n.config)}))}))]
case 1:return[2,e.sent()]}}))}))},t.prototype.saveConfig=function(e){return i(this,void 0,void 0,(function(){return u(this,(function(t){return[2,a(e)]}))}))},t}(n(0).BaseConfigManager)
t.ChromeBackgroundStorage=s},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.isError=function(e){return!!e.error}},function(e,t,n){"use strict"
var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{a(r.next(e))}catch(e){i(e)}}function c(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t
e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,c)}a((r=r.apply(e,t||[])).next())}))},u=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1]
return o[1]},trys:[],ops:[]}
return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i
function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.")
for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o
switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i
break
case 4:return u.label++,{value:i[1],done:!1}
case 5:u.label++,r=i[1],i=[0]
continue
case 7:i=u.ops.pop(),u.trys.pop()
continue
default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0
continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1]
break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i
break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i)
break}o[2]&&u.ops.pop(),u.trys.pop()
continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1]
return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}
Object.defineProperty(t,"__esModule",{value:!0})
var c=n(9),a=n(2),s=n(0),l=new c.Logger("CHROMESYNC")
function f(e){return function(e){return l.enabled&&l.debug("Getting keys",e),new Promise((function(t,n){return chrome.storage.sync.get(e,(function(e){return chrome.runtime.lastError?n(Error(chrome.runtime.lastError.message)):t(e)}))}))}(e).then((function(t){return t[e]}))}function h(e,t){var n={}
return n[e]=t,function(e){return l.enabled&&l.debug("setting datas:",Object.keys(e)),new Promise((function(t,n){return chrome.storage.sync.set(e,(function(){return chrome.runtime.lastError?n(Error(chrome.runtime.lastError.message)):t()}))}))}(n)}l.logLevel=c.LogLevel.DEBUG
var p=function(e){function t(){var n=e.call(this)||this
return n.configCache=void 0,n.throttleScheduler=new a.TimeoutScheduler(5e3,(function(){return n._saveConfig()})),n.throttleScheduler.throttlingMethod="debounce",chrome.storage.onChanged.addListener((function(e,r){if(e[t.STORAGE_KEY]&&"sync"===r){l.enabled&&l.debug("Received changes",e)
var o=e[t.STORAGE_KEY].newValue?JSON.parse(e[t.STORAGE_KEY].newValue):null
s.isConfigEqual(n.configCache,o)?l.enabled&&l.debug("Config is equal, skipping save/schedule"):(n.configCache=s.getValidAppConfig(o),n.onConfigChanged&&n.onConfigChanged())}})),n}return o(t,e),t.prototype.getConfig=function(){return i(this,void 0,void 0,(function(){var e,n
return u(this,(function(r){switch(r.label){case 0:return this.configCache?[2,this.configCache]:[4,f(t.STORAGE_KEY)]
case 1:return e=r.sent(),n=s.getValidAppConfig(e?JSON.parse(e):null),this.configCache=n,[2,n]}}))}))},t.prototype.saveConfig=function(e){return i(this,void 0,void 0,(function(){return u(this,(function(t){return s.isConfigEqual(this.configCache,e)?l.enabled&&l.debug("Config is equal, skipping save/schedule"):(this.configCache=e,this.throttleScheduler.schedule(),this.onConfigChanged&&this.onConfigChanged()),[2]}))}))},t.prototype._saveConfig=function(){h(t.STORAGE_KEY,JSON.stringify(this.configCache))},t.STORAGE_KEY="crqueuesort_config",t}(s.BaseConfigManager)
t.ChromeSyncStorage=p},function(e,t,n){"use strict"
var r=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length
var r=Array(e),o=0
for(t=0;t<n;t++)for(var i=arguments[t],u=0,c=i.length;u<c;u++,o++)r[o]=i[u]
return r}
Object.defineProperty(t,"__esModule",{value:!0})
var o,i=n(10)
!function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO"}(o=t.LogLevel||(t.LogLevel={}))
var u=o.DEBUG,c=function(){function e(e){this.scope=e,this.enabled=!i.production}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return void 0!==this._logLevel?this._logLevel:u},set:function(e){this._logLevel=e},enumerable:!0,configurable:!0}),e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
this.log.apply(this,r([o.INFO],e))},e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
this.log.apply(this,r([o.DEBUG],e))},e.prototype.log=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n]
this.logLevel<e||!this.enabled||console.log.apply(console,r(["["+this.scope+"]"],t))},e}()
t.Logger=c},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.production=!0},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=function(){function e(e){this.callback=e}return e.prototype.schedule=function(){var e=this
this.promise||(this.promise=Promise.resolve().then((function(){e.promise=void 0,e.callback&&e.callback()})))},e}()
t.MicroTaskScheduler=r},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=n(13),o=function(){function e(e,t){this.timeInMs=e,this.callback=t,this.throttlingMethod="throttle"}return e.prototype.schedule=function(){var e=this
if(void 0!==this.timerId){if("debounce"!==this.throttlingMethod)return
r.currentWindow.clearTimeout(this.timerId),this.timerId=void 0}this.timerId=r.currentWindow.setTimeout((function(){e.timerId=void 0,e.callback&&e.callback()}),this.timeInMs)},e}()
t.TimeoutScheduler=o},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.currentWindow="undefined"!=typeof unsafeWindow?unsafeWindow:window},function(e,t,n){"use strict"
var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{a(r.next(e))}catch(e){i(e)}}function c(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t
e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,c)}a((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1]
return o[1]},trys:[],ops:[]}
return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i
function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.")
for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o
switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i
break
case 4:return u.label++,{value:i[1],done:!1}
case 5:u.label++,r=i[1],i=[0]
continue
case 7:i=u.ops.pop(),u.trys.pop()
continue
default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0
continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1]
break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i
break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i)
break}o[2]&&u.ops.pop(),u.trys.pop()
continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1]
return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}
Object.defineProperty(t,"__esModule",{value:!0})
var i=n(1),u=n(15),c=n(16),a=function(){function e(e){var t=this
this.domChangeHelper=new c.DomChangeHelper,this.scheduler=e.scheduler,this.scheduler.callback=function(){return t.sort()},this.configManager=e.configManager}return e.prototype.isConfigDirty=function(){return r(this,void 0,void 0,(function(){var e
return o(this,(function(t){switch(t.label){case 0:return[4,this.configManager.getConfig()]
case 1:return e=t.sent(),[2,!i.isConfigEqual(e,this.lastUsedConfig)]}}))}))},e.prototype.scheduleSort=function(){this.scheduler.schedule()},e.prototype.sort=function(){var t=this
this.configManager.withConfig((function(n){t.lastUsedConfig=n
var r=t.getQueueItems()
t.domChangeHelper.startChangingDom(),r.forEach((function(r){var o=function(e){var t=e.querySelector("div.episode-progress"),n=0
if(t){var r=t.style.width.match(/^(\d+)\%$/)
r&&(n=+r[1])}return n}(r)>70
r.classList.remove(o?"unwatched":"watched"),r.classList.add(o?"watched":"unwatched")
var u=r.querySelector("div.queue-item-content")
if(u){var c=u.querySelector("div."+e.PREFIX+"-ctn")
c||((c=document.createElement("div")).classList.add(e.PREFIX+"-ctn"),u.prepend(c))
var a=r.attributes.getNamedItem("series_id").value,s=i.getValidShowConfig(n.shows[a])
switch(r.classList.remove(e.PREFIX+"-hold"),r.classList.remove(e.PREFIX+"-current"),r.classList.remove(e.PREFIX+"-backlog"),s.type){case"backlog":r.classList.add(e.PREFIX+"-backlog")
break
case"current":r.classList.add(e.PREFIX+"-current")
break
case"hold":r.classList.add(e.PREFIX+"-hold")}var l=function(e,n,r){t.createButton(c,e,n,a,r)}
l(e.PREFIX+"-new-episode","New Episode!"),l(e.PREFIX+"-to-top","Top",(function(e,t){return e.order=--t.topItem})),l(e.PREFIX+"-on-current","Current",(function(e){return e.type="current"})),l(e.PREFIX+"-on-hold","Hold",(function(e){return e.type="hold"})),l(e.PREFIX+"-on-backlock","Backlog",(function(e){return e.type="backlog"}))}})),r.sort((function(t,r){var o,u,c=n.shows,a=i.getValidShowConfig(c[t.attributes.getNamedItem("series_id").value]),s=i.getValidShowConfig(c[r.attributes.getNamedItem("series_id").value]),l=t.classList.contains("watched"),f=r.classList.contains("watched")
if(a&&s){var h=e.typeOrder.indexOf(a.type)-e.typeOrder.indexOf(s.type)
if(h)return h
var p=a.order-s.order
return p||(l!==f?l?1:-1:0)}if(a)return-1
if(s)return 1
var d=(null===(o=t.attributes.getNamedItem("media_id"))||void 0===o?void 0:o.value)||0
return+((null===(u=r.attributes.getNamedItem("media_id"))||void 0===u?void 0:u.value)||0)-+d})),r.forEach((function(e){return t.queueLocation.removeChild(e)})),r.forEach((function(e){return t.queueLocation.appendChild(e)})),t.domChangeHelper.stopChangingDom()}))},e.prototype.init=function(){var t=this
c.appendStyle("\n        ."+e.PREFIX+"-hold { opacity: 0.5;}\n        ."+e.PREFIX+"-hold.unwatched { opacity: 1; }\n        .queue-sortable .queue-item."+e.PREFIX+"-backlog { background-color: lightgray; }\n        ."+e.PREFIX+"-hold.unwatched ."+e.PREFIX+"-ctn > ."+e.PREFIX+"-new-episode { display: block; }\n        ."+e.PREFIX+"-ctn > ."+e.PREFIX+"-new-episode { display: none; padding: 5px; color: white; background-color: #dc3545; }\n        ."+e.PREFIX+"-ctn > a {display: block;}\n        "),this.queueLocation=document.getElementById("sortable"),this.queueLocation&&(this.mutationObserver=new u.Observer(this.queueLocation),this.domChangeHelper.onStartChange=function(){t.mutationObserver.disconnect()},this.domChangeHelper.onEndChange=function(){t.mutationObserver.connect()},this.mutationObserver.registerCallback((function(e,n){for(var r=0,o=e;r<o.length;r++){var i=o[r]
"childList"===i.type?t.scheduleSort():i.type}})),this.mutationObserver.connect(),this.scheduleSort())},e.prototype.getQueueItems=function(){var e=Array.from(this.queueLocation.children)
return e=e.filter((function(e){return!!e.attributes.getNamedItem("series_id")}))},e.prototype.createButton=function(e,t,n,r,o){var u=this,c=e.querySelector("."+t)
return c||((c=document.createElement("a")).classList.add(t),c.text=n,e.append(c)),o&&(c.onclick=function(e){e.preventDefault(),u.configManager.withConfig((function(e){var t=e.shows,n=i.getValidShowConfig(t[r])
t[r]=n,o(n,e),u.scheduleSort()}))}),c},e.PREFIX="crqueuesort",e.typeOrder=["current","backlog","hold"],e}()
t.QueueSorter=a},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=function(){function e(e){var t=this
this.target=e,this._listeners=[],this.config={attributes:!1,childList:!0,subtree:!1},this.callback=function(e,n){for(var r=0,o=t._listeners;r<o.length;r++){(0,o[r])(e,n)}},this.observer=null}return e.prototype.registerCallback=function(e){this._listeners.push(e)},e.prototype.connect=function(){this.observer||(this.observer=new MutationObserver(this.callback)),this.observer.observe(this.target,this.config)},e.prototype.disconnect=function(){this.observer&&this.observer.disconnect()},e}()
t.Observer=r},function(e,t,n){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.appendStyle=function(e){var t=document.createElement("style")
t.type="text/css",t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t)}
var r=function(){function e(){this.changinDom=0}return e.prototype.startChangingDom=function(){0==this.changinDom++&&this.onStartChange&&this.onStartChange()},e.prototype.stopChangingDom=function(){0==--this.changinDom&&this.onEndChange&&this.onEndChange()},e}()
t.DomChangeHelper=r}])
