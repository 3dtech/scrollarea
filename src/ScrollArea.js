import vec2, { dist } from "./libs/vec2.js"
import View from './View.js';
import ScrollBar from './ScrollBar.js';

export default class ScrollArea {
	constructor (_container, contentElement, options) {
        this.container = null; // Parent element
        this.content = null; // Scrolled element
		this.logContainer = null;

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
        this.deltaMove = vec2.create();
		this.lastMouse = vec2.create();
		this.mouseCache = vec2.create();
        this.lastTime = 0;
		this.deltaTime = 0;
        this.smoothDistance = null;
		this.timeout = null;
        this.smoothCoeficent = vec2.fromValues(11, 11);
		this.positionClassNames = ["sa-on-left", "sa-on-right", "sa-on-top", "sa-on-bottom"];
        this.mousedown = false;
        this.touchstart = false;
        this._vec2cache = vec2.create();
        
        var dragElement = this.container;
        if(this.getOption("swapContainers")){
			this.view = new View(vec2.fromValues(this.container.clientWidth, this.container.clientHeight), vec2.fromValues(this.content.clientWidth, this.content.clientHeight));
		}
		else {
			dragElement = this.content;
			this.view = new View(vec2.fromValues(this.content.clientWidth, this.content.clientHeight), vec2.fromValues(this.container.clientWidth, this.container.clientHeight));
        }

        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        this.container.style.userSelect = 'none';
		this.container.style["webkitUserSelect"] = 'none';
        
        this.attachEvents(this.container);
        
        this.scrollbarV = new ScrollBar(this.container, {
			"direction": "vertical", 
			"scollbarPosition": "right", 
			"reverse": this.options["reverse"], 
			"swapContainers": this.options["swapContainers"]});
		this.scrollbarH = new ScrollBar(this.container, {
			"direction": "horizontal", 
			"scollbarPosition": "bottom", 
			"reverse": this.options["reverse"]});

		if (typeof ResizeObserver != "undefined" &&  this.container) {
			var scope = this;
			var resizeTimeout = 0;
			// creates a continues loop of resizes when not limited to size
			this.resizeObserver = new ResizeObserver(function () {
				if(resizeTimeout) clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(function () {
					scope.resize();
				}, 300);
			});
			    
			this.resizeObserver.observe(this.container);
			this.resizeObserver.observe(this.content);
		}

		this.checkContentPosition();
	}
	/**
	 * Calculate average time, distance that mouse moved
	 * @param {vec2} movement 
	 */
	calcVelocity(movement) {
		if(this.lastTime) {
			this.deltaTime = (this.deltaTime + (Date.now() - this.lastTime))/2;
		}
		vec2.scale(this.deltaMove, vec2.add(this.deltaMove, this.deltaMove, movement), 0.5);
		this.lastTime = Date.now();
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
			this.scroll(vec2.fromValues(0, this.getOption("wheelSpeed") * direction));
		});

        element.addEventListener('mousedown', e => {
			vec2.set(this.lastMouse, e.screenX, e.screenY);
			vec2.set(this.deltaMove, 0, 0);
			this.lastTime = Date.now();
			//let clicks have time to react
			setTimeout(() => {
				this.mousedown = true;
			}, 120);
        });
          
        window.addEventListener('mousemove', e => {
            if (this.mousedown) {
				vec2.sub(this.mouseCache, vec2.fromValues(e.screenX, e.screenY), this.lastMouse)
				vec2.set(this.lastMouse, e.screenX, e.screenY);

				this.calcVelocity(this.mouseCache);
                if(this.getOption("reverse")){
                    this.scroll(this.mouseCache.slice());
                }
                else{
                    this.scroll(this.mouseCache.slice());
                }
            }
        });
          
        window.addEventListener('mouseup', e => {
            this.onEndDrag(this.deltaMove, this.deltaTime);
            this.mousedown = false;
			//e.stopPropagation();
            //e.preventDefault();	
        });

        element.addEventListener("touchstart", e => {
            if (e.touches && e.touches.length > 0) {
				this.mousedown = true;
                this.lastTouch = vec2.fromValues(e.touches[0].screenX, e.touches[0].screenY);
				this.lastTime = Date.now();
				//e.stopPropagation();
            	//e.preventDefault();	
            }
        }, false);

        window.addEventListener("touchend", e => {
            this.onEndDrag(vec2.negate(this.deltaMove, this.deltaMove), Date.now() - this.lastTime);
            this.lastTouch = null;
			this.mousedown = false;

			//e.stopPropagation();
            //e.preventDefault();	
			
        }, false);

        window.addEventListener("touchcancel", e => {
			this.onEndDrag(vec2.negate(this.deltaMove, this.deltaMove), Date.now() - this.lastTime);
            this.lastTouch = null;
			this.mousedown = false;

			//e.stopPropagation();
            //e.preventDefault();	
        }, false);

        window.addEventListener("touchmove", e => {
            if (e.touches && e.touches.length > 0 && this.mousedown) {
                if (this.lastTouch) {
                    var v = vec2.fromValues(e.touches[0].screenX, e.touches[0].screenY)
                    if(this.getOption("reverse")){
                        this.scroll(vec2.sub(v, this.lastTouch, v));
                    }
                    else{
                        this.scroll(vec2.sub(v, v, this.lastTouch));
                    }
                }
                this.lastTouch = vec2.fromValues(e.touches[0].screenX, e.touches[0].screenY);
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
		var dragLength = vec2.len(deltaMove);
        var velocity = dragLength / deltaTime; // speed of travelled distance
        //if smooth scolling is enabled and drag speed is high enough
        if(this.getOption("smooth") && velocity > 0.3){
            	//drag distance
            var smoothDistance = vec2.create();
            vec2.scale(smoothDistance, deltaMove, velocity);
            if (!this.getOption("reverse")) {
                //negate(smoothDistance, smoothDistance);
            }
            // console.log(event)
            var me = this;
            this.stop(); //Stop previous scrolling
            var i = 0;
            var distance = vec2.create();
            var smoothScrollTimer = function() {
                vec2.div(distance, smoothDistance, me.smoothCoeficent);
                if(vec2.sqrLen(distance) > 3) {
                    vec2.sub(smoothDistance, smoothDistance, distance);
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
		@param delta Vector containing the scroll delta 
	*/
	scroll (delta) {
		var scope = this;
		if (Math.abs(vec2.len(delta)) > 0) {
			window.requestAnimationFrame(function() {
				scope.view.move(delta);
				var _delta = vec2.clone(scope.view.getContentPosition());
				scope.setContentOffset(_delta);
				scope.scrollbarV.setContentPosition(scope.view);
				scope.scrollbarH.setContentPosition(scope.view);
				if(scope.updateCallback && typeof scope.updateCallback === "function"){
					scope.updateCallback(me);
				}

			});
		}
	}

	/** 
        animate touchend
        @param deltaMove vector
        @param deltaTime
    */
	smoothScroll(delta, time) {
		if (time <= 0) return;
		var distance = vec2.create();
		var remaining = vec2.clone(delta);
		var timePassed = time;
		var start = Date.now();
		var deltaTime = 0;
		var scope = this;

		var smoothScrollTimer = function() {		
			timePassed = Date.now() - start;
			deltaTime = 1 - Math.pow(1 - Math.min(1, timePassed / time), 3);
			vec2.scale(distance, remaining, deltaTime);
			vec2.sub(remaining, remaining, distance);
			if(timePassed < time) {
				window.requestAnimationFrame(smoothScrollTimer);
				if (vec2.len(remaining) > 0)
					scope.scroll(distance);
				else {
					scope.scroll(vec2.sub(distance, distance, remaining));
				}
			}
			else {
				if (vec2.len(remaining) > 0) {
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
		//console.log('setContentOffset', this.container.id, pos, sign)
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
		let sectionSize = vec2.mul(vec2.create(), this.view.getContentSize(), this.view.getContentViewRatio());
		let destination = vec2.scale(vec2.create(), sectionSize, index);
		const animSpeed = _animSpeed ? _animSpeed : 1;
		if (direction == 0) {
			destination[1] = 0;
		}
		else {
			destination[0] = 0;
		}
		
		let delta = vec2.sub(vec2.create(), this.view.getContentPosition(), destination);
		if (animate) {
			let time = vec2.len(delta) * animSpeed;
			this.smoothScroll(delta, time)
		}
		else {
			this.scroll(delta, delta);
		}
	}

	log(message) {
		if(this.logContainer) {
			let el = document.createElement("p");
			let msg = document.createTextNode(message);
			el.appendChild(msg);
			this.logContainer.appendChild(el)

			if (this.logContainer.children.length > 10) {
				this.logContainer.removeChild(this.logContainer.getElementsByTagName('p')[0])
			}
		}
	}

	setLogContainer(element) {
		this.logContainer = element;
	}

};