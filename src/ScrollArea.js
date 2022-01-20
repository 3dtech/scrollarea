import vec2 from "./libs/vec2.js"
import View from './View.js';
import ScrollBar from './ScrollBar.js';

export default class ScrollArea {
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
        this.deltaMove = vec2.create();
        this.lastTime = 0;
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
        this.container.style.overflow = 'hidden';
        this.container.style.userSelect = 'none';
        
        this.attachEvents(this.container);
        
        this.scrollbar = new ScrollBar(this.container, this.options);

		if (typeof ResizeObserver != "undefined" &&  this.content) {
			var scope = this;
			// creates a continues loop of resizes when not limited to size
			this.resizeObserver = new ResizeObserver(function () {
				scope.resize();
			});
			    
			this.resizeObserver.observe(this.content);
		}
	}

    attachEvents (element) {
        element.addEventListener("mousewheel", e => {
			var direction = 0;
			if(e.originalEvent)
				e = e.originalEvent;

			if ('wheelDelta' in e) {
				direction = e.wheelDelta < 0 ? 1 : e.wheelDelta > 0 ? -1 : 1;
			}
			else {
				direction = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 1;
			}

			this.scroll(vec2.fromValues(0, this.getOption("wheelSpeed") * direction));
		});

        element.addEventListener('mousedown', e => {
            //console.log('mousedown');
            this.mousedown = true;
            e.stopPropagation();
            e.preventDefault();	
        });
          
        window.addEventListener('mousemove', e => {
            if (this.mousedown) {
                var v = vec2.fromValues(e.movementX, e.movementY);
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
				this.mousedown = true;
                this.lastTouch = vec2.fromValues(e.touches[0].screenX, e.touches[0].screenY);
            }
        }, false);

        window.addEventListener("touchend", e => {
            // console.log('touchend', e);
            //this.onEndDrag()
            this.lastTouch = null;
			this.mousedown = false;
        }, false);

        window.addEventListener("touchcancel", e => {
            this.lastTouch = null;
			this.mousedown = false;
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
            }
        }, false);


    }

    /** 
        animate touchend
        @param deltaMove vector
        @param deltaTime
    */
	onEndDrag(deltaMove, deltaTime) {
        var velocity = vec2.div(0, Math.abs(event.velocity)); // speed of travelled distance
        //if smooth scolling is enabled and drag speed is high enough
        if(this.getOption("smooth") && sqrLen(velocity) > 0.3){
            var dragLength = fromValues(event.deltaX, event.deltaY);	//drag distance
            var smoothDistance = vec2.create();
            vec2.multiply(smoothDistance, dragLength, velocity);
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
		if(this.getOption("swapContainers")){
			this.view.setViewSize(parseInt(this.content.clientWidth), parseInt(this.content.clientHeight));
			this.view.setContentSize(parseInt(this.container.clientWidth), parseInt(this.container.clientHeight));
		}
		else {
			this.view.setViewSize(parseInt(this.container.clientWidth), parseInt(this.container.clientHeight));
			this.view.setContentSize(parseInt(this.content.clientWidth), parseInt(this.content.clientHeight));
		}
		this.checkIfScrollIsNeeded();
		if (this.scrollbar) {
			this.scrollbar.resizeContent(this.view);
		}
	}

	/** Reset scroll */
	reset () {
		this.setContentOffset([0, 0]);
	}

    checkIfScrollIsNeeded (){
		if(this.view.isContentLonger()){
			this.container.classList.add("sa-content-longer");
		}

		if(this.view.isContentWider()){
			this.container.classList.add("sa-content-wider");
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
			delta = vec2.clone(scope.view.getContentPosition());
			scope.setContentOffset(delta);
			scope.scrollbar.setContentPosition(scope.view);
			if(scope.updateCallback && typeof scope.updateCallback === "function"){
				scope.updateCallback(me);
			}
		});
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

};