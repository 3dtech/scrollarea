module.exports=function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e){t.exports={create:function(){return[0,0]},clone:function(t){var e=new Array(2);return e[0]=t[0],e[1]=t[1],e},fromValues:function(t,e){var i=new Array(2);return i[0]=t,i[1]=e,i},copy:function(t,e){return t[0]=e[0],t[1]=e[1],t},set:function(t,e,i){return t[0]=e,t[1]=i,t},add:function(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t},sub:function(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t},mul:function(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t},div:function(t,e,i){return t[0]=e[0]/i[0],t[1]=e[1]/i[1],t},min:function(t,e,i){return t[0]=Math.min(e[0],i[0]),t[1]=Math.min(e[1],i[1]),t},max:function(t,e,i){return t[0]=Math.max(e[0],i[0]),t[1]=Math.max(e[1],i[1]),t},scale:function(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t},dist:function(t,e){var i=e[0]-t[0],s=e[1]-t[1];return Math.sqrt(i*i+s*s)},sqrDist:function(t,e){var i=e[0]-t[0],s=e[1]-t[1];return i*i+s*s},len:function(t){var e=t[0],i=t[1];return Math.sqrt(e*e+i*i)},length:function(t){var e=t[0],i=t[1];return Math.sqrt(e*e+i*i)},sqrLen:function(t){var e=t[0],i=t[1];return e*e+i*i},negate:function(t,e){return t[0]=-e[0],t[1]=-e[1],t},normalize:function(t,e){var i=e[0],s=e[1],n=i*i+s*s;return n>0&&(n=1/Math.sqrt(n),t[0]=e[0]*n,t[1]=e[1]*n),t},dot:function(t,e){return t[0]*e[0]+t[1]*e[1]},cross:function(t,e,i){var s=e[0]*i[1]-e[1]*i[0];return t[0]=t[1]=0,t[2]=s,t},lerp:function(t,e,i,s){var n=e[0],o=e[1];return t[0]=n+s*(i[0]-n),t[1]=o+s*(i[1]-o),t},transformMat2:function(t,e,i){var s=e[0],n=e[1];return t[0]=s*i[0]+n*i[1],t[1]=s*i[2]+n*i[3],t},str:function(t){return"this("+t[0]+", "+t[1]+")"}}},function(t,e,i){"use strict";i.r(e),i.d(e,"ScrollArea",(function(){return a}));var s=i(0),n=i.n(s);class o{constructor(t,e){this.position=n.a.create(),this.contentSize=t,this.viewSize=e,this._maxPosition=n.a.create(),this._minPosition=n.a.create(),this._vec2cache=n.a.create()}getViewPosition(){return this.position}getContentPosition(){return this.position}clampPosition(){n.a.max(this._maxPosition,this.getViewSize(),this.getContentSize()),n.a.min(this._minPosition,this.getViewSize(),this.getContentSize()),n.a.sub(this._maxPosition,this._maxPosition,this._minPosition),this.position=this.clamp(this.position,n.a.create(),this._maxPosition)}setViewPosition(t){!isNaN(parseFloat(t[0]))&&isFinite(t[0])&&!isNaN(parseFloat(t[1]))&&isFinite(t[1])&&(this.position=t,this.clampPosition())}move(t){t&&this.setViewPosition(n.a.sub(t,this.getViewPosition(),t))}setViewSize(t,e){this.viewSize=n.a.fromValues(t,e),this.clampPosition()}setContentSize(t,e){this.contentSize=n.a.fromValues(t,e),this.clampPosition()}isContentLonger(){return this.viewSize[1]<=this.contentSize[1]}isContentWider(){return this.viewSize[0]<=this.contentSize[0]}getContentSize(){return this.contentSize}getViewSize(){return this.viewSize}clamp(t,e,i){var s=n.a.clone(t);return n.a.max(s,s,e),n.a.min(s,s,i),s}getPercentagePosition(){return n.a.div(n.a.create(),this.position,this.viewSize)}getRelativePosition(){return n.a.sub(this._vec2cache,this.getViewSize(),this.getContentSize()),0!==n.a.len(this._vec2cache)&&n.a.div(this._vec2cache,this.getViewPosition(),n.a.sub(this._vec2cache,this.getViewSize(),this.getContentSize())),this._vec2cache}}class r{constructor(t,e,i){this.vertical=void 0===i||!i,this.position=0,this.containerSize=1,this.contentSize=1,this.mouseDelta=n.a.create(),this.onScroll=!1,this.parentElement=t,this.element=document.createElement("div"),this.element.classList.add("sa-scrollbar"),this.element.classList.add("sa-scrollbar-position-"+e),this.element.style.position="absolute",this.element.style.right="0",this.element.style.top="0",this.element.style.bottom="0",this.bar=document.createElement("div"),this.bar.style.minWidth="1px",this.bar.classList.add("sa-bar"),this.element.appendChild(this.bar),t.appendChild(this.element),this.attachEvents(this.element),this.view=new o(n.a.fromValues(this.bar.clientWidth,this.bar.clientHeight),n.a.fromValues(this.element.clientWidth,this.element.clientHeight))}attachEvents(t){if(t.addEventListener("mousedown",t=>{this.mousedown=!0,t.stopPropagation(),t.preventDefault()}),window.addEventListener("mousemove",t=>{if(this.mousedown){var e=n.a.fromValues(t.movementX,t.movementY);this.deltaMove=e,this.lastTime=Date.now(),this.getOption("reverse"),this.scroll(e)}}),window.addEventListener("mouseup",t=>{this.mousedown=!1}),t.addEventListener("touchstart",t=>{t.touches&&t.touches.length>0&&(this.lastTouch=n.a.fromValues(t.touches[0].screenX,t.touches[0].screenY))},!1),window.addEventListener("touchend",t=>{this.lastTouch=null},!1),window.addEventListener("touchcancel",t=>{this.lastTouch=null},!1),window.addEventListener("touchmove",t=>{if(console.log("touchmove",t),t.touches&&t.touches.length>0){if(this.lastTouch){var e=n.a.fromValues(t.touches[0].screenX,t.touches[0].screenY);this.getOption("reverse")?this.scroll(n.a.sub(e,this.lastTouch,e)):this.scroll(n.a.sub(e,e,this.lastTouch))}this.lastTouch=n.a.fromValues(t.touches[0].screenX,t.touches[0].screenY)}},!1),"undefined"!=typeof ResizeObserver&&t){var e=this;this.resizeObserver=new ResizeObserver((function(){e.resize()})),this.resizeObserver.observe(t)}}scroll(t){var e=this;window.requestAnimationFrame((function(){e.view.move(t),t=n.a.clone(e.view.getContentPosition()),e.setPosition(t),e.updateCallback&&"function"==typeof e.updateCallback&&e.updateCallback(me)}))}setPosition(t){var e=1;this.getOption("swapContainers")&&(e=-1),this.bar.style.transform="translate("+t[0]*e+"px,"+t[1]*e+"px)",this.scrolling=!1,this.checkContentPosition()}checkContentPosition(){var t=this.view.getRelativePosition(),e=[];0===t[0]&&e.push("on-left"),0===t[1]&&e.push("on-top"),1===t[0]&&e.push("on-right"),1===t[1]&&e.push("on-bottom"),e!==this.positionClassNames&&(this.container.classList.remove(...this.positionClassNames),e&&e.length>0&&this.container.classList.add(...e),this.positionClassNames=e)}clear(){this.position=0,this.setPosition(0)}getBarLength(){return this.vertical?parseInt(this.bar.height()):parseInt(this.bar.width())}getViewLength(){return this.vertical?this.view.getViewSize()[1]:this.view.getViewSize()[0]}getContentLength(){return this.vertical?this.view.getContentSize()[1]:this.view.getContentSize()[0]}setContentPosition(t){var e=n.a.create(),i=this.containerSize/this.contentSize;n.a.scale(e,t,i),this.view.setViewPosition(e),this.setPosition(this.view.getContentPosition())}getPercentage(){return n.a.len(this.view.getViewPosition())/this.getViewLength()}resize(){this.view.setViewSize(parseInt(this.element.clientWidth),parseInt(this.bar.clientHeight)),this.view.setContentSize(parseInt(this.element.clientWidth),parseInt(this.bar.clientHeight)),this.checkIfScrollIsNeeded()}checkIfScrollIsNeeded(){this.view.isContentLonger()&&this.element.classList.add("content-longer"),this.view.isContentWider()&&this.element.classList.add("content-wider")}}class a{constructor(t,e,i){this.container=null,this.content=null,this.options={smooth:!0,reverse:!0,swapContainers:!0,updateInterval:10,wheelSpeed:50},void 0!==i&&i&&(this.options=this.chooseOptions(this.options,i)),console.log("vec2",n.a,n.a.create),this.setContainer(t),this.events={change:[],layout:[],ready:[]},this.lastTouch=null,this.deltaMove=n.a.create(),this.lastTime=0,this.smoothDistance=null,this.timeout=null,this.smoothCoeficent=n.a.fromValues(11,11),this.positionClassNames=[],this.mousedown=!1,this.touchstart=!1,this._vec2cache=n.a.create();this.container;if(this.getOption("swapContainers")?this.view=new o(n.a.fromValues(this.container.clientWidth,this.container.clientHeight),n.a.fromValues(this.content.clientWidth,this.content.clientHeight)):(this.content,this.view=new o(n.a.fromValues(this.content.clientWidth,this.content.clientHeight),n.a.fromValues(this.container.clientWidth,this.container.clientHeight))),this.container.style.position="relative",this.container.style.overflow="hidden",this.container.style.overflow="hidden",this.container.style.userSelect="none",this.attachEvents(this.container),this.scrollbar=new r(this.container,"right"),"undefined"!=typeof ResizeObserver&&this.content){var s=this;this.resizeObserver=new ResizeObserver((function(){console.log("resizeObserver2"),s.resize()})),this.resizeObserver.observe(this.content)}}attachEvents(t){t.addEventListener("mousewheel",t=>{var e=0;t.originalEvent&&(t=t.originalEvent),e="wheelDelta"in t?t.wheelDelta<0?1:t.wheelDelta>0?-1:1:t.deltaY>0?1:t.deltaY<0?-1:1,this.scroll(n.a.fromValues(0,this.getOption("wheelSpeed")*e))}),t.addEventListener("mousedown",t=>{this.mousedown=!0,t.stopPropagation(),t.preventDefault()}),window.addEventListener("mousemove",t=>{if(this.mousedown){var e=n.a.fromValues(t.movementX,t.movementY);this.deltaMove=e,this.lastTime=Date.now(),this.getOption("reverse"),this.scroll(e)}}),window.addEventListener("mouseup",t=>{this.mousedown=!1}),t.addEventListener("touchstart",t=>{t.touches&&t.touches.length>0&&(this.mousedown=!0,this.lastTouch=n.a.fromValues(t.touches[0].screenX,t.touches[0].screenY))},!1),window.addEventListener("touchend",t=>{this.lastTouch=null,this.mousedown=!1},!1),window.addEventListener("touchcancel",t=>{this.lastTouch=null,this.mousedown=!1},!1),window.addEventListener("touchmove",t=>{if(console.log("touchmove",t),t.touches&&t.touches.length>0&&this.mousedown){if(this.lastTouch){var e=n.a.fromValues(t.touches[0].screenX,t.touches[0].screenY);this.getOption("reverse")?this.scroll(n.a.sub(e,this.lastTouch,e)):this.scroll(n.a.sub(e,e,this.lastTouch))}this.lastTouch=n.a.fromValues(t.touches[0].screenX,t.touches[0].screenY)}},!1)}onEndDrag(t,e){var i=n.a.div(0,Math.abs(event.velocity));if(this.getOption("smooth")&&sqrLen(i)>.3){var s=fromValues(event.deltaX,event.deltaY),o=n.a.create();n.a.multiply(o,s,i),this.getOption("reverse");var r=this;this.stop();var a=create(),h=function(){div(a,o,r.smoothCoeficent),sqrLen(a)>3?(sub(o,o,a),requestAnimFrame(h,r.getOption("updateInterval")),negate(a,a),r.scroll(a)):r.scrolling=!1};this.timeout=requestAnimFrame(h,r.updateInterval)}else this.scrolling=!1}resize(){this.getOption("swapContainers")?(this.view.setViewSize(parseInt(this.content.clientWidth),parseInt(this.content.clientHeight)),this.view.setContentSize(parseInt(this.container.clientWidth),parseInt(this.container.clientHeight))):(this.view.setViewSize(parseInt(this.container.clientWidth),parseInt(this.container.clientHeight)),this.view.setContentSize(parseInt(this.content.clientWidth),parseInt(this.content.clientHeight))),this.checkIfScrollIsNeeded()}reset(){this.setContentOffset([0,0])}checkIfScrollIsNeeded(){this.view.isContentLonger()&&this.container.classList.add("content-longer"),this.view.isContentWider()&&this.container.classList.add("content-wider")}chooseOptions(t,e){for(var i in e)t[i]&&(t[i]=e[i]);return t}setContainer(t){switch(typeof t){case"undefined":this.container=document.createElement("div"),this.container.classList.add("keyboard"),document.body.appendChild(this.container);break;case"string":this.container=document.getElementById(t);break;default:this.container=t}this.container&&(this.content=this.container.firstElementChild)}getOption(t){return this.options[t]}on(t,e){"object"!=typeof this.events[t]&&(this.events[t]=[]),this.events[t].push(e)}trigger(){let t=Array.prototype.slice.call(arguments);if(t.length>0){let e=t[0];if(t.shift(),this.events[e]){let i;for(let s=0,n=this.events[e].length;s<n;s++)i=this.events[e][s],"function"==typeof i&&i.apply(this,t)}}}scroll(t){var e=this;window.requestAnimationFrame((function(){e.view.move(t),t=n.a.clone(e.view.getContentPosition()),e.setContentOffset(t),e.updateCallback&&"function"==typeof e.updateCallback&&e.updateCallback(me)}))}setContentOffset(t){var e=1;this.getOption("swapContainers")&&(e=-1),this.content.style.transform="translate("+t[0]*e+"px,"+t[1]*e+"px)",this.scrolling=!1,this.checkContentPosition()}checkContentPosition(){var t=this.view.getRelativePosition(),e=[];0===t[0]&&e.push("on-left"),0===t[1]&&e.push("on-top"),1===t[0]&&e.push("on-right"),1===t[1]&&e.push("on-bottom"),e!==this.positionClassNames&&(this.container.classList.remove(...this.positionClassNames),e&&e.length>0&&this.container.classList.add(...e),this.positionClassNames=e)}}}]).ScrollArea;