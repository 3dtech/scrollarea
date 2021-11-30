import vec2 from "./libs/vec2.js"
import View from './View.js';


export default class ScrollBar {
    constructor (parentElement, position, horizontal) {
        this.vertical = typeof horizontal !== 'undefined' ? !horizontal : true;
		this.position = 0;
		this.containerSize = 1;
		this.contentSize = 1;
        this.mouseDelta = vec2.create();
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
		
		this.view = new View(
            vec2.fromValues(this.bar.clientWidth, this.bar.clientHeight), 
 			vec2.fromValues(this.element.clientWidth, this.element.clientHeight)
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
            //console.log('mouseup', e);
            this.mousedown = false;
        });

        element.addEventListener("touchstart", e => {
           // console.log('touchstart', e);
            if (e.touches && e.touches.length > 0) {
                this.lastTouch = vec2.fromValues(e.touches[0].screenX, e.touches[0].screenY);
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
            console.log('touchmove', e);
            if (e.touches && e.touches.length > 0) {
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
			delta = vec2.clone(scope.view.getContentPosition());
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

	/**
	*	Set the bar position depending of the given content position
	*	@param contentPosition the top/left position of the inner content.
	*/
	setContentPosition (contentPosition) {
		var newPos = vec2.create();
		var ratio = this.containerSize/this.contentSize;
		vec2.scale(newPos, contentPosition, ratio);
		this.view.setViewPosition(newPos);
		this.setPosition(this.view.getContentPosition());
	}

	getPercentage () {
		var distFrom = vec2.len(this.view.getViewPosition());

		return distFrom/this.getViewLength();
	}

    resize () {
		if(false){ // this.getOption("swapContainers")
			this.view.setViewSize(parseInt(this.content.clientWidth), parseInt(this.content.clientHeight));
			this.view.setContentSize(parseInt(this.container.clientWidth), parseInt(this.container.clientHeight));
		}
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