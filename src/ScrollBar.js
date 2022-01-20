import vec2 from "./libs/vec2.js"
import View from './View.js';


export default class ScrollBar {
    constructor (parentElement, _options) {
		this.options = _options ? _options : {};
        this.vertical = this.getOption("direction") == "vertical";
		this.position = 0;
        this.mouseDelta = vec2.create();
		this.onScroll = false;

		//Create the actual scrollbar
		this.parentElement = parentElement;
		this.element = document.createElement("div");
        this.element.classList.add("sa-scrollbar");
        this.element.classList.add("sa-scrollbar-position-" + this.getOption("scollbarPosition"));
        this.element.style.position = 'absolute';
        this.element.style.right = '0';
        this.element.style.top = '0';
        this.element.style.bottom = '0';

        this.bar = document.createElement("div");
        this.bar.style.minWidth = '1px';
        this.bar.classList.add("sa-bar");
		this.element.appendChild(this.bar);
		parentElement.appendChild(this.element);

		// needs content scrolling
        //this.attachEvents(this.element);
		
		this.view = new View(
            vec2.fromValues(this.bar.clientWidth, this.bar.clientHeight), 
 			vec2.fromValues(this.element.clientWidth, this.element.clientHeight)
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
			return parseInt(this.bar.clientHeight);
		else
			return parseInt(this.bar.clientWidth);
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
		var newPos = vec2.create();
		var ratio = view.getContentViewRatio()[1];
		vec2.scale(newPos, view.getContentPosition(), ratio);
		this.view.setViewPosition(newPos);
		this.setPosition(this.view.getContentPosition());
	}

	getPercentage () {
		var distFrom = vec2.len(this.view.getViewPosition());

		return distFrom/this.getViewLength();
	}

	resizeContent (view) {
		if (view) {
			if (this.vertical) {
				this.bar.style.height = Math.floor(view.getViewSize()[1] * (view.getContentViewRatio()[1])) + "px";
				this.element.style.height = view.getViewSize()[1] + "px";
			}
			else {
				this.bar.style.width = Math.floor(view.getViewSize()[0] * (view.getContentViewRatio()[0])) + "px";
				this.element.style.width = view.getViewSize()[0] + "px";
			}

			this.resize();
		}
		else {
			console.warn("View undefined");
		}
	}

    resize () {
		if(this.getOption("swapContainers")){
			this.view.setViewSize(parseInt(this.bar.clientWidth), parseInt(this.bar.clientHeight));
			this.view.setContentSize(parseInt(this.element.clientWidth), parseInt(this.element.clientHeight));
		}
		else {
			
			this.view.setViewSize(parseInt(this.element.clientWidth), parseInt(this.element.clientHeight));
			this.view.setContentSize(parseInt(this.bar.clientWidth), parseInt(this.bar.clientHeight));
		}
	}
};