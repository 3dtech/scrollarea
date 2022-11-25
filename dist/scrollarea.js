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
        this.contentViewRatio = vec2_default.a.div(vec2_default.a.create(), this.getViewSize(), this.getContentSize()); // Ratio of content and view
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
       
        // Dont let shorter content to scroll
        if (this.getContentSize()[0] <= this.getViewSize()[0]) {
            this._maxPosition[0] = 0;
        }

        if (this.getContentSize()[1] <= this.getViewSize()[1]) {
            this._maxPosition[1] = 0;
        }
        
        this.position = this.clamp(this.position, vec2_default.a.create(), this._maxPosition);
    }

    /** Sets current position
        @param position New position */
    setViewPosition (position) {
        if(!isNaN(parseFloat(position[0])) && isFinite(position[0]) && !isNaN(parseFloat(position[1])) && isFinite(position[1])){
            this.position = position;
            this.clampPosition();
        }
    }

    /** Moves position by given delta
        @param delta Vector instance */
    move (delta) {
        if (delta) {
            this.setViewPosition(vec2_default.a.sub(delta, this.getViewPosition(), delta));
        }
    }

    setViewSize (width, height) {
        vec2_default.a.set(this.viewSize, width, height);
        vec2_default.a.div(this.contentViewRatio, this.getViewSize(), this.getContentSize());
        this.clampPosition();
    }

    setContentSize (width, height) {
        vec2_default.a.set(this.contentSize, width, height);
        vec2_default.a.div(this.contentViewRatio, this.getViewSize(), this.getContentSize());
        this.clampPosition();
    }

    isContentLonger (){
        return (this.viewSize[1] < this.contentSize[1]);
    }

    isContentWider (){
        return (this.viewSize[0] < this.contentSize[0]);
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

    getContentViewRatio () {
        return this.contentViewRatio;
    }
};
    
// CONCATENATED MODULE: ./src/ScrollBar.js




class ScrollBar_ScrollBar {
    constructor (parentElement, _options) {
		this.options = _options ? _options : {};
        this.vertical = this.getOption("direction") == "vertical";
		this.position = 0;
        this.mouseDelta = vec2_default.a.create();
		this.onScroll = false;

		//Create the actual scrollbar
		this.parentElement = parentElement;
		this.element = document.createElement("div");
        this.element.classList.add("sa-scrollbar");
        this.element.classList.add("sa-scrollbar-position-" + this.getOption("scollbarPosition"));
        this.element.style.position = 'absolute';
        this.element.style.right = '0';
        this.element.style.bottom = '0';

		if (this.vertical) {
			this.element.style.top = '0';
		}
		else {
			this.element.style.left = '0';
		}

        this.bar = document.createElement("div");
        this.bar.style.minWidth = '1px';
        this.bar.classList.add("sa-bar");
		this.element.appendChild(this.bar);
		parentElement.appendChild(this.element);

		// needs content scrolling
        //this.attachEvents(this.element);
		
		this.view = new View_View(
 			vec2_default.a.fromValues(this.element.clientWidth, this.element.clientHeight),
			vec2_default.a.fromValues(this.bar.clientWidth, this.bar.clientHeight)
        );
    }

	getOption (name){
		return this.options[name];
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
            this.lastTouch = null;
        }, false);

        window.addEventListener("touchcancel", e => {
            this.lastTouch = null;
        }, false);

        window.addEventListener("touchmove", e => {
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
    }

    /** Scrolls child elements immediately by given delta within bounds of the container. Does not update mouse position or mouse delta.
		@param delta Vector containing the scroll delta */
	scroll (delta) {
		var scope = this;
		window.requestAnimationFrame(function() {
			scope.view.move(delta);
			delta = vec2_default.a.clone(scope.view.getContentPosition());
			scope.setPosition(delta);
			if(scope.updateCallback && typeof scope.updateCallback === "function"){
				scope.updateCallback(me);
			}
		});
	}

    setPosition (pos) {
		var sign = 1;
		if (this.getOption("swapContainers")) {
			sign = -1;
		}
		this.bar.style.transform = "translate("+(pos[0]*sign)+"px,"+(pos[1]*sign)+"px)";
		this.scrolling = false;
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
			return parseInt(Math.ceil(this.bar.clientHeight));
		else
			return parseInt(Math.ceil(this.bar.clientWidth));
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

	/**
	*	Set the bar position depending of the given content position
	*	@param contentPosition the top/left position of the inner content.
	*/
	setContentPosition (view) {
		var newPos = vec2_default.a.create();
		var ratio = view.getContentViewRatio()[ this.vertical ? 1 : 0];
		
		vec2_default.a.scale(newPos, view.getContentPosition(), ratio);
		this.view.setViewPosition(newPos);
		this.setPosition(this.view.getContentPosition());
	}

	getPercentage () {
		var distFrom = vec2_default.a.len(this.view.getViewPosition());

		return distFrom/this.getViewLength();
	}

	resizeContent (view) {
		if (view) {
			if (this.vertical) {
				this.bar.style.height = Math.floor(view.getViewSize()[1] * (view.getContentViewRatio()[1])) + "px";
				this.element.style.height = view.getViewSize()[1] + "px";
				this.element.style.visibility = view.isContentLonger() ? 'visible' : 'hidden';
	
			}
			else {
				this.bar.style.width = Math.floor(view.getViewSize()[0] * (view.getContentViewRatio()[0])) + "px";
				this.element.style.width = view.getViewSize()[0] + "px";
				this.element.style.visibility = view.isContentWider() ? 'visible' : 'hidden';

			}

			this.resize();
		}
		else {
			console.warn("View undefined");
		}
	}

    resize () {
		if(this.getOption("swapContainers")){
			this.view.setViewSize(parseInt(this.element.clientWidth), parseInt(this.element.clientHeight));
			this.view.setContentSize(parseInt(this.bar.clientWidth), parseInt(this.bar.clientHeight));
		}
		else {
			this.view.setViewSize(parseInt(this.bar.clientWidth), parseInt(this.bar.clientHeight));
			this.view.setContentSize(parseInt(this.element.clientWidth), parseInt(this.element.clientHeight));

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
			"reverse": false, //set if content will scroll in reverse direction
			"swapContainers": false, // set if content is bigger than the container
			"updateInterval": 10, // in how many milliseconds will the animation update itself
			"wheelSpeed": 50, // how smooth is the mouse wheel scrolling
			"scollbarPosition": "right", //Where to put the scrollbar
			"direction": "vertical" // vertical or horizontal scrolling
		};

        if(options !== undefined && options){
			this.options = this.chooseOptions(this.options, options);
		}

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
		this.positionClassNames = ["sa-on-left", "sa-on-right", "sa-on-top", "sa-on-bottom"];
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
        this.container.style.overflow = 'hidden';
        this.container.style.userSelect = 'none';
        
        this.attachEvents(this.container);
        
        this.scrollbarV = new ScrollBar_ScrollBar(this.container, {
			"direction": "vertical", 
			"scollbarPosition": "right", 
			"reverse": this.options["reverse"], 
			"swapContainers": this.options["swapContainers"]});
		this.scrollbarH = new ScrollBar_ScrollBar(this.container, {
			"direction": "horizontal", 
			"scollbarPosition": "bottom", 
			"reverse": this.options["reverse"]});

		if (typeof ResizeObserver != "undefined" &&  this.content) {
			var scope = this;
			// creates a continues loop of resizes when not limited to size
			this.resizeObserver = new ResizeObserver(function () {
				scope.resize();
			});
			    
			this.resizeObserver.observe(this.content);
		}

		this.checkContentPosition();
	}

    attachEvents (element) {
        element.addEventListener("mousewheel", e => {
			var direction = 0;
			if(e.originalEvent)
				e = e.originalEvent;

			if ('wheelDelta' in e) {
				direction = e.wheelDelta < 0 ? -1 : 1;
			}
			else {
				direction = e.deltaY > 0 ? 1 : e.deltaY < 0 ? 1 : -1;
			}
			this.scroll(vec2_default.a.fromValues(0, this.getOption("wheelSpeed") * direction));
		});

        element.addEventListener('mousedown', e => {
            //console.log('mousedown');
            this.mousedown = true;
			this.lastTime = Date.now();
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
            this.onEndDrag(this.deltaMove, Date.now() - this.lastTime);
            this.mousedown = false;
        });

        element.addEventListener("touchstart", e => {
           // console.log('touchstart', e);
            if (e.touches && e.touches.length > 0) {
				this.mousedown = true;
                this.lastTouch = vec2_default.a.fromValues(e.touches[0].screenX, e.touches[0].screenY);
				this.lastTime = Date.now();
            }
        }, false);

        window.addEventListener("touchend", e => {
            // console.log('touchend', e);
            this.onEndDrag(vec2_default.a.negate(this.deltaMove, this.deltaMove), Date.now() - this.lastTime);
            this.lastTouch = null;
			this.mousedown = false;
			
        }, false);

        window.addEventListener("touchcancel", e => {
			this.onEndDrag(vec2_default.a.negate(this.deltaMove, this.deltaMove), Date.now() - this.lastTime);
            this.lastTouch = null;
			this.mousedown = false;
        }, false);

        window.addEventListener("touchmove", e => {
            if (e.touches && e.touches.length > 0 && this.mousedown) {
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
				this.lastTime = Date.now();
            }
        }, false);


    }

    /** 
        animate touchend
        @param deltaMove vector
        @param deltaTime
    */
	onEndDrag(deltaMove, deltaTime) {
		if (deltaTime <= 0) return;
		var dragLength = vec2_default.a.len(deltaMove);
        var velocity = dragLength / deltaTime; // speed of travelled distance
        //if smooth scolling is enabled and drag speed is high enough
        if(this.getOption("smooth") && velocity > 0.3){
            	//drag distance
            var smoothDistance = vec2_default.a.create();
            vec2_default.a.scale(smoothDistance, deltaMove, velocity);
            if (!this.getOption("reverse")) {
                //negate(smoothDistance, smoothDistance);
            }
            // console.log(event)
            var me = this;
            this.stop(); //Stop previous scrolling
            var i = 0;
            var distance = vec2_default.a.create();
            var smoothScrollTimer = function() {
                vec2_default.a.div(distance, smoothDistance, me.smoothCoeficent);
                if(vec2_default.a.sqrLen(distance) > 3) {
                    vec2_default.a.sub(smoothDistance, smoothDistance, distance);
                    window.requestAnimationFrame(smoothScrollTimer);
                    //vec2.negate(distance, distance);
                    me.scroll(distance);
                }
                else {
                    me.scrolling = false;
                }
            };
            this.timeout = window.requestAnimationFrame(smoothScrollTimer);	// Start smooth scrolling
        }
        else {
            this.scrolling = false;
		}
	}

	stop () {
		this.scrolling = false;
	}

    /** Call when resizing the view or child element */
	resize () {
		if(this.getOption("swapContainers")){
			this.view.setViewSize(parseInt(Math.ceil(this.content.clientWidth)), parseInt(Math.ceil(this.content.clientHeight)));
			this.view.setContentSize(parseInt(this.container.clientWidth), parseInt(Math.ceilthis.container.clientHeight));
		}
		else {
			this.view.setViewSize(parseInt(this.container.clientWidth), parseInt(this.container.clientHeight));
			this.view.setContentSize(parseInt(Math.ceil(this.content.clientWidth)), parseInt(Math.ceil(this.content.clientHeight)));
		}
		this.checkIfScrollIsNeeded();
		if (this.scrollbarV) {
			this.scrollbarV.resizeContent(this.view);
		}

		if (this.scrollbarH) {
			this.scrollbarH.resizeContent(this.view);
		}
	}

	/** Reset scroll */
	reset () {
		this.scrollToSection(0, 0, false);
		this.scrollToSection(0, 1, false);
	}

    checkIfScrollIsNeeded (){
		if(this.view.isContentLonger()){
			this.container.classList.add("sa-content-longer");
		}
		else { 
			this.container.classList.remove("sa-content-longer");
		}

		if(this.view.isContentWider()){
			this.container.classList.add("sa-content-wider");
		}
		else {
			this.container.classList.remove("sa-content-wider");
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

    /** Scrolls child elements immediately by given delta within bounds of the container. Does not update mouse position or mouse delta.
		@param delta Vector containing the scroll delta */
	scroll (delta) {
		var scope = this;
		window.requestAnimationFrame(function() {
			scope.view.move(delta);
			delta = vec2_default.a.clone(scope.view.getContentPosition());
			scope.setContentOffset(delta);
			scope.scrollbarV.setContentPosition(scope.view);
			scope.scrollbarH.setContentPosition(scope.view);
			if(scope.updateCallback && typeof scope.updateCallback === "function"){
				scope.updateCallback(me);
			}
		});
	}

	/** 
        animate touchend
        @param deltaMove vector
        @param deltaTime
    */
	smoothScroll(delta, time) {
		if (time <= 0) return;
		var distance = vec2_default.a.create();
		var remaining = vec2_default.a.clone(delta);
		var timePassed = time;
		var start = Date.now();
		var deltaTime = 0;
		var scope = this;

		var smoothScrollTimer = function() {		
			timePassed = Date.now() - start;
			deltaTime = 1 - Math.pow(1 - Math.min(1, timePassed / time), 3);
			vec2_default.a.scale(distance, remaining, deltaTime);
			vec2_default.a.sub(remaining, remaining, distance);
			if(timePassed < time) {
				window.requestAnimationFrame(smoothScrollTimer);
				if (vec2_default.a.len(remaining) > 0)
					scope.scroll(distance);
				else {
					scope.scroll(vec2_default.a.sub(distance, distance, remaining));
				}
			}
			else {
				if (vec2_default.a.len(remaining) > 0) {
					scope.scroll(remaining);
				}
				scope.scrolling = false;
			}
		};
		this.timeout = window.requestAnimationFrame(smoothScrollTimer);	// Start smooth scrolling
	}

    setContentOffset (pos) {
		var sign = -1;
		if (this.getOption("swapContainers")) {
			sign = 1;
		}
		this.content.style.transform = "translate("+(pos[0]*sign)+"px,"+(pos[1]*sign)+"px)";
		this.scrolling = false;
		this.checkContentPosition();
	}

    checkContentPosition (){
		var percentage = this.view.getRelativePosition();
		var classes = [];

		if(percentage[0] === 0){
			classes.push("sa-on-left");
		}

		if(percentage[1] === 0){
			classes.push("sa-on-top");
		}

		if(Math.abs(percentage[0]) === 1){
			classes.push("sa-on-right");
		}

		if(Math.abs(percentage[1]) === 1){
			classes.push("sa-on-bottom");
		}

		if(classes !== this.positionClassNames){
			this.container.classList.remove(... this.positionClassNames);
            if (classes && classes.length > 0) {
			    this.container.classList.add(...classes);
            }
			this.positionClassNames = classes;
		}
	}

	scrollToSection (index, direction, animate, _animSpeed) {
		let sectionSize = vec2_default.a.mul(vec2_default.a.create(), this.view.getContentSize(), this.view.getContentViewRatio());
		let destination = vec2_default.a.scale(vec2_default.a.create(), sectionSize, index);
		const animSpeed = _animSpeed ? _animSpeed : 1;
		if (direction == 0) {
			destination[1] = 0;
		}
		else {
			destination[0] = 0;
		}
		
		let delta = vec2_default.a.sub(vec2_default.a.create(), this.view.getContentPosition(), destination);
		if (animate) {
			let time = vec2_default.a.len(delta) * animSpeed;
			this.smoothScroll(delta, time)
		}
		else {
			this.scroll(delta);
		}
	}

};
// CONCATENATED MODULE: ./index.js




/***/ })
/******/ ]);