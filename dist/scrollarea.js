var ScrollArea =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Derivated from gl-matrix.js - Brandon Jones, Colin MacKenzie IV
 */

/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

module.exports = {
    create: function(){
        return [0,0];
    },

    /**
     * Creates a new this initialized with values from an existing vector
     *
     * @param {this} a vector to clone
     * @returns {this} a new 2D vector
     */
    clone: function(a) {
        var out = new Array(2);
        out[0] = a[0];
        out[1] = a[1];
        return out;
    },

    /**
     * Creates a new this initialized with the given values
     *
     * @param {Number} x X component
     * @param {Number} y Y component
     * @returns {this} a new 2D vector
     */
    fromValues: function(x, y) {
        var out = new Array(2);
        out[0] = x;
        out[1] = y;
        return out;
    },

    /**
     * Copy the values from one this to another
     *
     * @param {this} out the receiving vector
     * @param {this} a the source vector
     * @returns {this} out
     */
    copy: function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        return out;
    },

    /**
     * Set the components of a this to the given values
     *
     * @param {this} out the receiving vector
     * @param {Number} x X component
     * @param {Number} y Y component
     * @returns {this} out
     */
    set: function(out, x, y) {
        out[0] = x;
        out[1] = y;
        return out;
    },

    /**
     * Adds two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    add: function(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        return out;
    },

    /**
     * Subtracts two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    sub: function(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        return out;
    },

    /**
     * Multiplies two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    mul: function(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        return out;
    },

    /**
     * Divides two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    div: function(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        return out;
    },

    /**
     * Returns the minimum of two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    min: function(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        return out;
    },

    /**
     * Returns the maximum of two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    max: function(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        return out;
    },

    /**
     * Scales a this by a scalar number
     *
     * @param {this} out the receiving vector
     * @param {this} a the vector to scale
     * @param {this} b amount to scale the vector by
     * @returns {this} out
     */
    scale: function(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        return out;
    },

    /**
     * Calculates the euclidian distance between two this's
     *
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {Number} distance between a and b
     */
    dist: function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1];
        return Math.sqrt(x*x + y*y);
    },

    /**
     * Calculates the squared euclidian distance between two this's
     *
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {Number} squared distance between a and b
     */
    sqrDist: function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1];
        return x*x + y*y;
    },

    /**
     * Caclulates the length of a this
     *
     * @param {this} a vector to calculate length of
     * @returns {Number} length of a
     */
    len: function (a) {
        var x = a[0],
            y = a[1];
        return Math.sqrt(x*x + y*y);
    },

    length: function (a) {
        var x = a[0],
            y = a[1];
        return Math.sqrt(x*x + y*y);
    },

    /**
     * Caclulates the squared length of a this
     *
     * @param {this} a vector to calculate squared length of
     * @returns {Number} squared length of a
     */
    sqrLen: function (a) {
        var x = a[0],
            y = a[1];
        return x*x + y*y;
    },

    /**
     * Negates the components of a this
     *
     * @param {this} out the receiving vector
     * @param {this} a vector to negate
     * @returns {this} out
     */
    negate: function(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        return out;
    },

    /**
     * Normalize a this
     *
     * @param {this} out the receiving vector
     * @param {this} a vector to normalize
     * @returns {this} out
     */
    normalize: function(out, a) {
        var x = a[0],
            y = a[1];
        var len = x*x + y*y;
        if (len > 0) {
            //TODO: evaluate use of glm_invsqrt here?
            len = 1 / Math.sqrt(len);
            out[0] = a[0] * len;
            out[1] = a[1] * len;
        }
        return out;
    },

    /**
     * Caclulates the dot product of two this's
     *
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {Number} dot product of a and b
     */
    dot: function (a, b) {
        return a[0] * b[0] + a[1] * b[1];
    },

    /**
     * Computes the cross product of two this's
     * Note that the cross product must by definition produce a 3D vector
     *
     * @param {vec3} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {vec3} out
     */
    cross: function(out, a, b) {
        var z = a[0] * b[1] - a[1] * b[0];
        out[0] = out[1] = 0;
        out[2] = z;
        return out;
    },

    /**
     * Performs a linear interpolation between two this's
     *
     * @param {vec3} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @param {Number} t interpolation amount between the two inputs
     * @returns {this} out
     */
    lerp: function (out, a, b, t) {
        var ax = a[0],
            ay = a[1];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        return out;
    },

    /**
     * Transforms the this with a mat2
     *
     * @param {this} out the receiving vector
     * @param {this} a the vector to transform
     * @param {mat2} m matrix to transform with
     * @returns {this} out
     */
    transformMat2: function(out, a, m) {
        var x = a[0],
            y = a[1];
        out[0] = x * m[0] + y * m[1];
        out[1] = x * m[2] + y * m[3];
        return out;
    },

    str: function (a) {
        return 'this(' + a[0] + ', ' + a[1] + ')';
    },
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "ScrollArea", function() { return /* reexport */ ScrollArea_ScrollArea; });

// EXTERNAL MODULE: ./src/libs/vec2.js
var vec2 = __webpack_require__(0);
var vec2_default = /*#__PURE__*/__webpack_require__.n(vec2);

// CONCATENATED MODULE: ./src/View.js


/** View is used to pan content. It provides view area with given size on content with given size.
	It does not bind itself to any elements.
	@param contentSize Width and height of content as Vector
	@param viewSize Width and height of view as Vector */
class View_View {
    constructor (contentSize, viewSize) {
        this.position = vec2_default.a.create(); ///< Current view position

        // View and content size
        this.contentSize=contentSize;      ///< Width and height of content
        this.viewSize=viewSize;            ///< Width and height of current view
        this._maxPosition = vec2_default.a.create(); /// Buffer vector for clampPosition
        this._minPosition = vec2_default.a.create(); /// Buffer vector for clampPosition

        this._vec2cache = vec2_default.a.create(); /// for temporarly caching a vec2
    }

    /** Gets current view position */
    getViewPosition () {
        return this.position;
    }

    /** Gets position of content */
    getContentPosition () {

        return this.position;
    }

    /** Clamps current position of view into current range */
    clampPosition () {
        vec2_default.a.max(this._maxPosition, this.getViewSize(), this.getContentSize());
        vec2_default.a.min(this._minPosition, this.getViewSize(), this.getContentSize());
        vec2_default.a.sub(this._maxPosition, this._maxPosition, this._minPosition);
        this.position = this.clamp(this.position, vec2_default.a.create(), this._maxPosition);
    }

    /** Sets current position
        @param position New position */
    setViewPosition (position) {
        if(!isNaN(parseFloat(position[0])) && isFinite(position[0]) && !isNaN(parseFloat(position[1])) && isFinite(position[1])){
            //console.log('setViewPosition1', position);
            this.position = position;
            this.clampPosition();
        }
    }

    /** Moves position by given delta
        @param delta Vector instance */
    move (delta) {
        if (delta) {
            this.setViewPosition(vec2_default.a.add(delta, this.getViewPosition(), delta));
        }
    }

    setViewSize (width, height) {
        this.viewSize = vec2_default.a.fromValues(width, height);
        this.clampPosition();
    }

    setContentSize (width, height) {
        this.contentSize = vec2_default.a.fromValues(width, height);
        this.clampPosition();
    }

    isContentLonger (){
        return (this.viewSize[1] <= this.contentSize[1]);
    }

    isContentWider (){
        return (this.viewSize[0] <= this.contentSize[0]);
    }

    /** Gets size content */
    getContentSize () {
        return this.contentSize;
    }

    /** Gets width of container */
    getViewSize () {
        return this.viewSize;
    }

    clamp (v, min, max){
        var out = vec2_default.a.clone(v);
        vec2_default.a.max(out, out, min);
        vec2_default.a.min(out, out, max);
        return out;
    }

    getPercentagePosition (){
        return vec2_default.a.div(vec2_default.a.create(), this.position, this.viewSize);
    }

    getRelativePosition () {
        vec2_default.a.sub(this._vec2cache, this.getViewSize(), this.getContentSize())
        if (vec2_default.a.len(this._vec2cache) !== 0) {
            vec2_default.a.div(this._vec2cache, this.getViewPosition(), vec2_default.a.sub(this._vec2cache, this.getViewSize(), this.getContentSize()));
        }
        
		return this._vec2cache;
    }
};
    
// CONCATENATED MODULE: ./src/ScrollBar.js




class ScrollBar_ScrollBar {
    constructor (parentElement, position, horizontal) {
        this.vertical = typeof horizontal !== 'undefined' ? !horizontal : true;
		this.position = 0;
		this.containerSize = 1;
		this.contentSize = 1;
        this.mouseDelta = vec2_default.a.create();
		this.onScroll = false;

		//Create the actual scrollbar
		this.parentElement = parentElement;
		this.element = document.createElement("div");
        this.element.classList.add("sa-scrollbar");
        this.element.classList.add("sa-scrollbar-position-" + position);
        this.element.style.position = 'absolute';
        this.element.style.right = '0';
        this.element.style.top = '0';
        this.element.style.bottom = '0';

        this.bar = document.createElement("div");
        this.bar.style.minWidth = '1px';
        this.bar.classList.add("sa-bar");
		this.element.appendChild(this.bar);
		parentElement.appendChild(this.element);

        this.attachEvents(this.element);
		
		this.view = new View_View(
            vec2_default.a.fromValues(this.bar.clientWidth, this.bar.clientHeight), 
 			vec2_default.a.fromValues(this.element.clientWidth, this.element.clientHeight)
        );
    }


    attachEvents (element) {
        element.addEventListener('mousedown', e => {
            //console.log('mousedown');
            this.mousedown = true;
            e.stopPropagation();
            e.preventDefault();	
        });
          
        window.addEventListener('mousemove', e => {
            if (this.mousedown) {
                var v = vec2_default.a.fromValues(e.movementX, e.movementY);
                this.deltaMove = v;
                this.lastTime = Date.now();
                if(this.getOption("reverse")){
                    this.scroll(v);
                }
                else{
                    this.scroll(v);
                }
            }
        });
          
        window.addEventListener('mouseup', e => {
            //console.log('mouseup', e);
            this.onEndDrag(this.deltaMove, Date.now() - this.lastTime);
            this.mousedown = false;
        });

        element.addEventListener("touchstart", e => {
           // console.log('touchstart', e);
            if (e.touches && e.touches.length > 0) {
                this.lastTouch = vec2_default.a.fromValues(e.touches[0].screenX, e.touches[0].screenY);
            }
        }, false);

        window.addEventListener("touchend", e => {
            // console.log('touchend', e);
            //this.onEndDrag()
            this.lastTouch = null;
        }, false);

        window.addEventListener("touchcancel", e => {
            this.lastTouch = null;
        }, false);

        window.addEventListener("touchmove", e => {
            console.log('touchmove', e);
            if (e.touches && e.touches.length > 0) {
                if (this.lastTouch) {
                    var v = vec2_default.a.fromValues(e.touches[0].screenX, e.touches[0].screenY)
                    if(this.getOption("reverse")){
                        this.scroll(vec2_default.a.sub(v, this.lastTouch, v));
                    }
                    else{
                        this.scroll(vec2_default.a.sub(v, v, this.lastTouch));
                    }
                }
                this.lastTouch = vec2_default.a.fromValues(e.touches[0].screenX, e.touches[0].screenY);
            }
        }, false);

        if (typeof ResizeObserver != "undefined" && element) {
			var scope = this;
			// creates a continues loop of resizes when not limited to size
			this.resizeObserver = new ResizeObserver(function () {
				scope.resize();
			});
			    
			this.resizeObserver.observe(element);
		}
    }

    /** Scrolls child elements immediately by given delta within bounds of the container. Does not update mouse position or mouse delta.
		@param delta Vector containing the scroll delta */
	scroll (delta) {
		var scope = this;
		window.requestAnimationFrame(function() {
			scope.view.move(delta);
			delta = vec2_default.a.clone(scope.view.getContentPosition());
			scope.setContentOffset(delta);
			if(scope.updateCallback && typeof scope.updateCallback === "function"){
				scope.updateCallback(me);
			}
		});
	}

    setContentOffset (pos) {
		var sign = 1;
		if (this.getOption("swapContainers")) {
			sign = -1;
		}
		this.bar.style.transform = "translate("+(pos[0]*sign)+"px,"+(pos[1]*sign)+"px)";
		this.scrolling = false;
		this.checkContentPosition();
	}

    checkContentPosition (){
		var percentage = this.view.getRelativePosition();
		var classes = [];

		if(percentage[0] === 0){
			classes.push("on-left");
		}

		if(percentage[1] === 0){
			classes.push("on-top");
		}

		if(percentage[0] === 1){
			classes.push("on-right");
		}

		if(percentage[1] === 1){
			classes.push("on-bottom");
		}

		if(classes !== this.positionClassNames){
			this.container.classList.remove(... this.positionClassNames);
            if (classes && classes.length > 0) {
			    this.container.classList.add(...classes);
            }
			this.positionClassNames = classes;
		}
	}


    	/**
	*	Setup the scrollbar. Calculates bars length.
	*	@param containerSize the length (height or width) of the element wher the content is displayed
	*/
	setup (containerSize, contentSize) {
		this.contentSize = contentSize;
		this.containerSize = containerSize;

		var ratio = this.containerSize/this.contentSize;
		if(this.vertical){
			this.element.height(containerSize);
			this.bar.height(Math.max(5, Math.floor(containerSize*ratio)));
		}
		else {
			this.element.width(containerSize);
			this.bar.width(Math.max(5, Math.floor(containerSize*ratio)));
		}

		this.resize();
	}

	/**
	*	Clear the bars position
	*/
	clear (){
		this.position = 0;
		this.setPosition(0);
	}

	getBarLength (){
		if(this.vertical)
			return parseInt(this.bar.height());
		else
			return parseInt(this.bar.width());
	}

	getViewLength () {
		if(this.vertical)
			return this.view.getViewSize()[1];
		else
			return this.view.getViewSize()[0];
	}

	getContentLength () {
		if(this.vertical)
			return this.view.getContentSize()[1];
		else
			return this.view.getContentSize()[0];
	}

	setPosition (newPos) {
		if(Modernizr.csstransforms){//this will be rendered on GPU, faster
			this.bar.css(Modernizr.prefixed("transform"), "translate("+newPos[0]+"px,"+newPos[1]+"px)");
		}
		else
			this.bar.css("left", newPos[0]+"px").css("top", newPos[1]+"px");
	}

	/**
	*	Set the bar position depending of the given content position
	*	@param contentPosition the top/left position of the inner content.
	*/
	setContentPosition (contentPosition) {
		var newPos = vec2_default.a.create();
		var ratio = this.containerSize/this.contentSize;
		vec2_default.a.scale(newPos, contentPosition, ratio);
		this.view.setViewPosition(newPos);
		this.setPosition(this.view.getContentPosition());
	}

	onStartDrag (event) {
		if(event && event.gesture){
			event.gesture.preventDefault();	
			event.gesture.stopPropagation();
		}
	}

	onDrag (event) {
		if(!(event && event.gesture)){
			return;	
		}

		event.gesture.preventDefault();	
		event.gesture.stopPropagation();
		var v = vec2_default.a.fromValues(event.gesture.deltaX, event.gesture.deltaY);
		this.view.move(vec2_default.a.negate(vec2_default.a.create(), vec2_default.a.sub(vec2_default.a.create(), this.mouseDelta, v)));
		this.mouseDelta = v;
		this.setPosition(this.view.getContentPosition());
		if(this.onScroll && typeof this.onScroll === "function"){
			this.onScroll(this.getPercentage());
		}
	}

	onTap (event){
		if(!(event && event.gesture)){
			return;	
		}

		event.gesture.preventDefault();	
		event.gesture.stopPropagation();

		var v = vec2_default.a.fromValues(event.gesture.deltaX, event.gesture.deltaY);		
	}

	getPercentage () {
		var distFrom = vec2_default.a.len(this.view.getViewPosition());

		return distFrom/this.getViewLength();
	}

	onEndDrag (event) {
		this.mouseDelta = vec2_default.a.create();
	}

    resize () {
		if(false){}
		else {
			this.view.setViewSize(parseInt(this.element.clientWidth), parseInt(this.bar.clientHeight));
			this.view.setContentSize(parseInt(this.element.clientWidth), parseInt(this.bar.clientHeight));
		}
		this.checkIfScrollIsNeeded();
	}

    checkIfScrollIsNeeded (){
		if(this.view.isContentLonger()){
			this.element.classList.add("content-longer");
		}

		if(this.view.isContentWider()){
			this.element.classList.add("content-wider");
		}
	}
};
// CONCATENATED MODULE: ./src/ScrollArea.js




class ScrollArea_ScrollArea {
	constructor (_container, contentElement, options) {
        this.container = null; // Parent element
        this.content = null; // Scrolled element

        this.options = {
			"smooth": true, //set if the end of drag has a fade out animation
			"reverse": true, //set if content will scroll in reverse direction
			"swapContainers": true, // set if content is bigger than the container
			"updateInterval": 10, // in how many milliseconds will the animation update itself
			"wheelSpeed": 50 // how smooth is the mouse wheel scrolling
		};

        if(options !== undefined && options){
			this.options = this.chooseOptions(this.options, options);
		}
        console.log('vec2', vec2_default.a, vec2_default.a.create);

        this.setContainer(_container);

		this.events = {
			'change': [],
			'layout': [],
			'ready': []
		};

        this.lastTouch = null;
        this.deltaMove = vec2_default.a.create();
        this.lastTime = 0;
        this.smoothDistance = null;
		this.timeout = null;
        this.smoothCoeficent = vec2_default.a.fromValues(11, 11);
        this.positionClassNames = [];
        this.mousedown = false;
        this.touchstart = false;
        this._vec2cache = vec2_default.a.create();
        
        var dragElement = this.container;
        if(this.getOption("swapContainers")){
			this.view = new View_View(vec2_default.a.fromValues(this.container.clientWidth, this.container.clientHeight), vec2_default.a.fromValues(this.content.clientWidth, this.content.clientHeight));
		}
		else {
			dragElement = this.content;
			this.view = new View_View(vec2_default.a.fromValues(this.content.clientWidth, this.content.clientHeight), vec2_default.a.fromValues(this.container.clientWidth, this.container.clientHeight));
        }

        this.container.style.position = 'relative';
        
        this.attachEvents(this.container);
        
        this.scrollbar = new ScrollBar_ScrollBar(this.container, "right");
		this.construct();
	}

    attachEvents (element) {
        element.addEventListener("mousewheel", function(event) {
			var direction = 0;
			if(event.originalEvent)
				event = event.originalEvent;

			if ('wheelDelta' in event) {
				direction = event.wheelDelta < 0 ? 1 : event.wheelDelta > 0 ? -1 : 1;
			}
			else {
				direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 1;
			}

			scope.scroll(vec2_default.a.fromValues(0, scope.getOption("wheelSpeed") * direction));
		});

        element.addEventListener('mousedown', e => {
            //console.log('mousedown');
            this.mousedown = true;
            e.stopPropagation();
            e.preventDefault();	
        });
          
        window.addEventListener('mousemove', e => {
            if (this.mousedown) {
                var v = vec2_default.a.fromValues(e.movementX, e.movementY);
                this.deltaMove = v;
                this.lastTime = Date.now();
                if(this.getOption("reverse")){
                    this.scroll(v);
                }
                else{
                    this.scroll(v);
                }
            }
        });
          
        window.addEventListener('mouseup', e => {
            // console.log('mouseup', e);
            // this.onEndDrag(this.deltaMove, Date.now() - this.lastTime);
            this.mousedown = false;
        });

        element.addEventListener("touchstart", e => {
           // console.log('touchstart', e);
            if (e.touches && e.touches.length > 0) {
                this.lastTouch = vec2_default.a.fromValues(e.touches[0].screenX, e.touches[0].screenY);
            }
        }, false);

        window.addEventListener("touchend", e => {
            // console.log('touchend', e);
            //this.onEndDrag()
            this.lastTouch = null;
        }, false);

        window.addEventListener("touchcancel", e => {
            this.lastTouch = null;
        }, false);

        window.addEventListener("touchmove", e => {
            console.log('touchmove', e);
            if (e.touches && e.touches.length > 0) {
                if (this.lastTouch) {
                    var v = vec2_default.a.fromValues(e.touches[0].screenX, e.touches[0].screenY)
                    if(this.getOption("reverse")){
                        this.scroll(vec2_default.a.sub(v, this.lastTouch, v));
                    }
                    else{
                        this.scroll(vec2_default.a.sub(v, v, this.lastTouch));
                    }
                }
                this.lastTouch = vec2_default.a.fromValues(e.touches[0].screenX, e.touches[0].screenY);
            }
        }, false);

        if (typeof ResizeObserver != "undefined" && element) {
			var scope = this;
			// creates a continues loop of resizes when not limited to size
			this.resizeObserver = new ResizeObserver(function () {
				scope.resize();
			});
			    
			this.resizeObserver.observe(element);
		}
    }

    /** 
        animate touchend
        @param deltaMove vector
        @param deltaTime
    */
	onEndDrag(deltaMove, deltaTime) {
        var velocity = vec2_default.a.div(0, Math.abs(event.velocity)); // speed of travelled distance
        //if smooth scolling is enabled and drag speed is high enough
        if(this.getOption("smooth") && sqrLen(velocity) > 0.3){
            var dragLength = fromValues(event.deltaX, event.deltaY);	//drag distance
            var smoothDistance = vec2_default.a.create();
            vec2_default.a.multiply(smoothDistance, dragLength, velocity);
            if (!this.getOption("reverse")) {
                //negate(smoothDistance, smoothDistance);
            }
            // console.log(event)
            var me=this;
            this.stop(); //Stop previous scrolling
            var i = 0;
            var distance = create();
            var smoothScrollTimer = function() {
                div(distance, smoothDistance, me.smoothCoeficent);
                if(sqrLen(distance) > 3) {
                    sub(smoothDistance, smoothDistance, distance);
                    requestAnimFrame(smoothScrollTimer, me.getOption("updateInterval"));
                    negate(distance, distance);
                    
                    me.scroll(distance);
                }
                else {
                    me.scrolling = false;
                }
            };
            this.timeout=requestAnimFrame(smoothScrollTimer, me.updateInterval);	// Start smooth scrolling
        }
        else {
            this.scrolling = false;
			}
	}

    /** Call when resizing the view or child element */
	resize () {
        console.log('resize', this.content.clientWidth, this.content.clientHeight, 'container', this.container.clientWidth, this.container.clientHeight)
		if(this.getOption("swapContainers")){
			this.view.setViewSize(parseInt(this.content.clientWidth), parseInt(this.content.clientHeight));
			this.view.setContentSize(parseInt(this.container.clientWidth), parseInt(this.container.clientHeight));
		}
		else {
			this.view.setViewSize(parseInt(this.container.clientWidth), parseInt(this.container.clientHeight));
			this.view.setContentSize(parseInt(this.content.clientWidth), parseInt(this.content.clientHeight));
		}
		this.checkIfScrollIsNeeded();
	}

    checkIfScrollIsNeeded (){
		if(this.view.isContentLonger()){
			this.container.classList.add("content-longer");
		}

		if(this.view.isContentWider()){
			this.container.classList.add("content-wider");
		}
	}

    /**
	*	Combines default options with given options
	*/
	chooseOptions (defaultOptions, newOptions) {
		for(var i in newOptions){
			if(defaultOptions[i]){
				defaultOptions[i] = newOptions[i];
			}
		}
		return defaultOptions;
	}

    setContainer (container) {
		switch (typeof container) {
			case "undefined":
				this.container = document.createElement("div");
				this.container.classList.add('keyboard');
				document.body.appendChild(this.container);
			break;
			case "string":
				this.container = document.getElementById(container);
			break;
			default:
				this.container = container;
		}

        if (this.container) { // first child has the content. override if needed
            this.content = this.container.firstElementChild;
        }
	}

    getOption (name){
		return this.options[name];
	}

	on (type, callback) {
		if (typeof this.events[type] !== 'object') {
			this.events[type] = [];
		}

		this.events[type].push(callback);
	}

	trigger () {
		let args = Array.prototype.slice.call(arguments);
		if (args.length > 0) {
			let type = args[0];
			args.shift();

			if (this.events[type]) {
				let fun;
				for (let i = 0, len = this.events[type].length; i < len; i++){
					fun = this.events[type][i];
					if (typeof fun === 'function') {
						fun.apply(this, args);
					}
				}
			} 
		}
	}

    clear () {

	}

	construct () {
		this.clear();
		this.resize();
	}

    /** Scrolls child elements immediately by given delta within bounds of the container. Does not update mouse position or mouse delta.
		@param delta Vector containing the scroll delta */
	scroll (delta) {
		var scope = this;
		window.requestAnimationFrame(function() {
			scope.view.move(delta);
			delta = vec2_default.a.clone(scope.view.getContentPosition());
			scope.setContentOffset(delta);
			if(scope.updateCallback && typeof scope.updateCallback === "function"){
				scope.updateCallback(me);
			}
		});
	}

    setContentOffset (pos) {
		var sign = 1;
		if (this.getOption("swapContainers")) {
			sign = -1;
		}
		this.content.style.transform = "translate("+(pos[0]*sign)+"px,"+(pos[1]*sign)+"px)";
		this.scrolling = false;
		this.checkContentPosition();
	}

    checkContentPosition (){
		var percentage = this.view.getRelativePosition();
		var classes = [];

		if(percentage[0] === 0){
			classes.push("on-left");
		}

		if(percentage[1] === 0){
			classes.push("on-top");
		}

		if(percentage[0] === 1){
			classes.push("on-right");
		}

		if(percentage[1] === 1){
			classes.push("on-bottom");
		}

		if(classes !== this.positionClassNames){
			this.container.classList.remove(... this.positionClassNames);
            if (classes && classes.length > 0) {
			    this.container.classList.add(...classes);
            }
			this.positionClassNames = classes;
		}
	}

};
// CONCATENATED MODULE: ./index.js




/***/ })
/******/ ]);