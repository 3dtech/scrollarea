!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e){t.exports={create:function(){return[0,0]},clone:function(t){var e=new Array(2);return e[0]=t[0],e[1]=t[1],e},fromValues:function(t,e){var i=new Array(2);return i[0]=t,i[1]=e,i},copy:function(t,e){return t[0]=e[0],t[1]=e[1],t},set:function(t,e,i){return t[0]=e,t[1]=i,t},add:function(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t},sub:function(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t},mul:function(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t},div:function(t,e,i){return t[0]=e[0]/i[0],t[1]=e[1]/i[1],t},min:function(t,e,i){return t[0]=Math.min(e[0],i[0]),t[1]=Math.min(e[1],i[1]),t},max:function(t,e,i){return t[0]=Math.max(e[0],i[0]),t[1]=Math.max(e[1],i[1]),t},scale:function(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t},dist:function(t,e){var i=e[0]-t[0],n=e[1]-t[1];return Math.sqrt(i*i+n*n)},sqrDist:function(t,e){var i=e[0]-t[0],n=e[1]-t[1];return i*i+n*n},len:function(t){var e=t[0],i=t[1];return Math.sqrt(e*e+i*i)},length:function(t){var e=t[0],i=t[1];return Math.sqrt(e*e+i*i)},sqrLen:function(t){var e=t[0],i=t[1];return e*e+i*i},negate:function(t,e){return t[0]=-e[0],t[1]=-e[1],t},normalize:function(t,e){var i=e[0],n=e[1],s=i*i+n*n;return s>0&&(s=1/Math.sqrt(s),t[0]=e[0]*s,t[1]=e[1]*s),t},dot:function(t,e){return t[0]*e[0]+t[1]*e[1]},cross:function(t,e,i){var n=e[0]*i[1]-e[1]*i[0];return t[0]=t[1]=0,t[2]=n,t},lerp:function(t,e,i,n){var s=e[0],o=e[1];return t[0]=s+n*(i[0]-s),t[1]=o+n*(i[1]-o),t},transformMat2:function(t,e,i){var n=e[0],s=e[1];return t[0]=n*i[0]+s*i[1],t[1]=n*i[2]+s*i[3],t},str:function(t){return"this("+t[0]+", "+t[1]+")"}}},function(t,e,i){"use strict";i.r(e),i.d(e,"ScrollArea",(function(){return a}));var n=i(0),s=i.n(n);class o{constructor(t,e){this.position=s.a.create(),this.contentSize=t,this.viewSize=e,this.contentViewRatio=s.a.div(s.a.create(),this.getViewSize(),this.getContentSize()),this._maxPosition=s.a.create(),this._minPosition=s.a.create(),this._vec2cache=s.a.create()}getViewPosition(){return this.position}getContentPosition(){return this.position}clampPosition(){s.a.max(this._maxPosition,this.getViewSize(),this.getContentSize()),s.a.min(this._minPosition,this.getViewSize(),this.getContentSize()),s.a.sub(this._maxPosition,this._maxPosition,this._minPosition),this.position=this.clamp(this.position,s.a.create(),this._maxPosition)}setViewPosition(t){!isNaN(parseFloat(t[0]))&&isFinite(t[0])&&!isNaN(parseFloat(t[1]))&&isFinite(t[1])&&(this.position=t,this.clampPosition())}move(t){t&&this.setViewPosition(s.a.sub(t,this.getViewPosition(),t))}setViewSize(t,e){s.a.set(this.viewSize,t,e),s.a.div(this.contentViewRatio,this.getViewSize(),this.getContentSize()),this.clampPosition()}setContentSize(t,e){s.a.set(this.contentSize,t,e),s.a.div(this.contentViewRatio,this.getViewSize(),this.getContentSize()),this.clampPosition()}isContentLonger(){return this.viewSize[1]<this.contentSize[1]}isContentWider(){return this.viewSize[0]<this.contentSize[0]}getContentSize(){return this.contentSize}getViewSize(){return this.viewSize}clamp(t,e,i){var n=s.a.clone(t);return s.a.max(n,n,e),s.a.min(n,n,i),n}getPercentagePosition(){return s.a.div(s.a.create(),this.position,this.viewSize)}getRelativePosition(){return s.a.sub(this._vec2cache,this.getViewSize(),this.getContentSize()),0!==s.a.len(this._vec2cache)&&s.a.div(this._vec2cache,this.getViewPosition(),s.a.sub(this._vec2cache,this.getViewSize(),this.getContentSize())),this._vec2cache}getContentViewRatio(){return this.contentViewRatio}}class r{constructor(t,e){this.options=e||{},this.vertical="vertical"==this.getOption("direction"),this.position=0,this.mouseDelta=s.a.create(),this.onScroll=!1,this.parentElement=t,this.element=document.createElement("div"),this.element.classList.add("sa-scrollbar"),this.element.classList.add("sa-scrollbar-position-"+this.getOption("scollbarPosition")),this.element.style.position="absolute",this.element.style.right="0",this.element.style.top="0",this.element.style.bottom="0",this.bar=document.createElement("div"),this.bar.style.minWidth="1px",this.bar.classList.add("sa-bar"),this.element.appendChild(this.bar),t.appendChild(this.element),this.view=new o(s.a.fromValues(this.bar.clientWidth,this.bar.clientHeight),s.a.fromValues(this.element.clientWidth,this.element.clientHeight))}getOption(t){return this.options[t]}attachEvents(t){t.addEventListener("mousedown",t=>{this.mousedown=!0,t.stopPropagation(),t.preventDefault()}),window.addEventListener("mousemove",t=>{if(this.mousedown){var e=s.a.fromValues(t.movementX,t.movementY);this.deltaMove=e,this.lastTime=Date.now(),this.getOption("reverse"),this.scroll(e)}}),window.addEventListener("mouseup",t=>{this.mousedown=!1}),t.addEventListener("touchstart",t=>{t.touches&&t.touches.length>0&&(this.lastTouch=s.a.fromValues(t.touches[0].screenX,t.touches[0].screenY))},!1),window.addEventListener("touchend",t=>{this.lastTouch=null},!1),window.addEventListener("touchcancel",t=>{this.lastTouch=null},!1),window.addEventListener("touchmove",t=>{if(t.touches&&t.touches.length>0){if(this.lastTouch){var e=s.a.fromValues(t.touches[0].screenX,t.touches[0].screenY);this.getOption("reverse")?this.scroll(s.a.sub(e,this.lastTouch,e)):this.scroll(s.a.sub(e,e,this.lastTouch))}this.lastTouch=s.a.fromValues(t.touches[0].screenX,t.touches[0].screenY)}},!1)}scroll(t){var e=this;window.requestAnimationFrame((function(){e.view.move(t),t=s.a.clone(e.view.getContentPosition()),e.setPosition(t),e.updateCallback&&"function"==typeof e.updateCallback&&e.updateCallback(me)}))}setPosition(t){var e=1;this.getOption("swapContainers")&&(e=-1),this.bar.style.transform="translate("+t[0]*e+"px,"+t[1]*e+"px)",this.scrolling=!1}clear(){this.position=0,this.setPosition(0)}getBarLength(){return this.vertical?parseInt(this.bar.clientHeight):parseInt(this.bar.clientWidth)}getViewLength(){return this.vertical?this.view.getViewSize()[1]:this.view.getViewSize()[0]}getContentLength(){return this.vertical?this.view.getContentSize()[1]:this.view.getContentSize()[0]}setContentPosition(t){var e=s.a.create(),i=t.getContentViewRatio()[1];s.a.scale(e,t.getContentPosition(),i),this.view.setViewPosition(e),this.setPosition(this.view.getContentPosition())}getPercentage(){return s.a.len(this.view.getViewPosition())/this.getViewLength()}resizeContent(t){t?(this.vertical?(this.bar.style.height=Math.floor(t.getViewSize()[1]*t.getContentViewRatio()[1])+"px",this.element.style.height=t.getViewSize()[1]+"px"):(this.bar.style.width=Math.floor(t.getViewSize()[0]*t.getContentViewRatio()[0])+"px",this.element.style.width=t.getViewSize()[0]+"px"),this.resize()):console.warn("View undefined")}resize(){this.getOption("swapContainers")?(this.view.setViewSize(parseInt(this.bar.clientWidth),parseInt(this.bar.clientHeight)),this.view.setContentSize(parseInt(this.element.clientWidth),parseInt(this.element.clientHeight))):(this.view.setViewSize(parseInt(this.element.clientWidth),parseInt(this.element.clientHeight)),this.view.setContentSize(parseInt(this.bar.clientWidth),parseInt(this.bar.clientHeight)))}}class a{constructor(t,e,i){this.container=null,this.content=null,this.options={smooth:!0,reverse:!1,swapContainers:!1,updateInterval:10,wheelSpeed:50,scollbarPosition:"right",direction:"vertical"},void 0!==i&&i&&(this.options=this.chooseOptions(this.options,i)),this.setContainer(t),this.events={change:[],layout:[],ready:[]},this.lastTouch=null,this.deltaMove=s.a.create(),this.lastTime=0,this.smoothDistance=null,this.timeout=null,this.smoothCoeficent=s.a.fromValues(11,11),this.positionClassNames=["sa-on-left","sa-on-right","sa-on-top","sa-on-bottom"],this.mousedown=!1,this.touchstart=!1,this._vec2cache=s.a.create();this.container;if(this.getOption("swapContainers")?this.view=new o(s.a.fromValues(this.container.clientWidth,this.container.clientHeight),s.a.fromValues(this.content.clientWidth,this.content.clientHeight)):(this.content,this.view=new o(s.a.fromValues(this.content.clientWidth,this.content.clientHeight),s.a.fromValues(this.container.clientWidth,this.container.clientHeight))),this.container.style.position="relative",this.container.style.overflow="hidden",this.container.style.overflow="hidden",this.container.style.userSelect="none",this.attachEvents(this.container),this.scrollbar=new r(this.container,this.options),"undefined"!=typeof ResizeObserver&&this.content){var n=this;this.resizeObserver=new ResizeObserver((function(){n.resize()})),this.resizeObserver.observe(this.content)}}attachEvents(t){t.addEventListener("mousewheel",t=>{var e=0;t.originalEvent&&(t=t.originalEvent),e="wheelDelta"in t?t.wheelDelta<0?1:t.wheelDelta>0?-1:1:t.deltaY>0?1:t.deltaY<0?-1:1,this.scroll(s.a.fromValues(0,this.getOption("wheelSpeed")*e))}),t.addEventListener("mousedown",t=>{this.mousedown=!0,t.stopPropagation(),t.preventDefault()}),window.addEventListener("mousemove",t=>{if(this.mousedown){var e=s.a.fromValues(t.movementX,t.movementY);this.deltaMove=e,this.lastTime=Date.now(),this.getOption("reverse"),this.scroll(e)}}),window.addEventListener("mouseup",t=>{this.mousedown=!1}),t.addEventListener("touchstart",t=>{t.touches&&t.touches.length>0&&(this.mousedown=!0,this.lastTouch=s.a.fromValues(t.touches[0].screenX,t.touches[0].screenY))},!1),window.addEventListener("touchend",t=>{this.lastTouch=null,this.mousedown=!1},!1),window.addEventListener("touchcancel",t=>{this.lastTouch=null,this.mousedown=!1},!1),window.addEventListener("touchmove",t=>{if(t.touches&&t.touches.length>0&&this.mousedown){if(this.lastTouch){var e=s.a.fromValues(t.touches[0].screenX,t.touches[0].screenY);this.getOption("reverse")?this.scroll(s.a.sub(e,this.lastTouch,e)):this.scroll(s.a.sub(e,e,this.lastTouch))}this.lastTouch=s.a.fromValues(t.touches[0].screenX,t.touches[0].screenY)}},!1)}onEndDrag(t,e){var i=s.a.div(0,Math.abs(event.velocity));if(this.getOption("smooth")&&sqrLen(i)>.3){var n=fromValues(event.deltaX,event.deltaY),o=s.a.create();s.a.multiply(o,n,i),this.getOption("reverse");var r=this;this.stop();var a=create(),h=function(){div(a,o,r.smoothCoeficent),sqrLen(a)>3?(sub(o,o,a),requestAnimFrame(h,r.getOption("updateInterval")),negate(a,a),r.scroll(a)):r.scrolling=!1};this.timeout=requestAnimFrame(h,r.updateInterval)}else this.scrolling=!1}resize(){this.getOption("swapContainers")?(this.view.setViewSize(parseInt(this.content.clientWidth),parseInt(this.content.clientHeight)),this.view.setContentSize(parseInt(this.container.clientWidth),parseInt(this.container.clientHeight))):(this.view.setViewSize(parseInt(this.container.clientWidth),parseInt(this.container.clientHeight)),this.view.setContentSize(parseInt(this.content.clientWidth),parseInt(this.content.clientHeight))),this.checkIfScrollIsNeeded(),this.scrollbar&&this.scrollbar.resizeContent(this.view)}reset(){this.setContentOffset([0,0])}checkIfScrollIsNeeded(){this.view.isContentLonger()&&this.container.classList.add("sa-content-longer"),this.view.isContentWider()&&this.container.classList.add("sa-content-wider")}chooseOptions(t,e){for(var i in e)t[i]&&(t[i]=e[i]);return t}setContainer(t){switch(typeof t){case"undefined":this.container=document.createElement("div"),document.body.appendChild(this.container);break;case"string":this.container=document.getElementById(t);break;default:this.container=t}this.container&&(this.content=this.container.firstElementChild)}getOption(t){return this.options[t]}on(t,e){"object"!=typeof this.events[t]&&(this.events[t]=[]),this.events[t].push(e)}trigger(){let t=Array.prototype.slice.call(arguments);if(t.length>0){let e=t[0];if(t.shift(),this.events[e]){let i;for(let n=0,s=this.events[e].length;n<s;n++)i=this.events[e][n],"function"==typeof i&&i.apply(this,t)}}}scroll(t){var e=this;window.requestAnimationFrame((function(){e.view.move(t),t=s.a.clone(e.view.getContentPosition()),e.setContentOffset(t),e.scrollbar.setContentPosition(e.view),e.updateCallback&&"function"==typeof e.updateCallback&&e.updateCallback(me)}))}setContentOffset(t){var e=-1;this.getOption("swapContainers")&&(e=1),this.content.style.transform="translate("+t[0]*e+"px,"+t[1]*e+"px)",this.scrolling=!1,this.checkContentPosition()}checkContentPosition(){var t=this.view.getRelativePosition(),e=[];0===t[0]&&e.push("sa-on-left"),0===t[1]&&e.push("sa-on-top"),1===Math.abs(t[0])&&e.push("sa-on-right"),1===Math.abs(t[1])&&e.push("sa-on-bottom"),e!==this.positionClassNames&&(this.container.classList.remove(...this.positionClassNames),e&&e.length>0&&this.container.classList.add(...e),this.positionClassNames=e)}}}]);