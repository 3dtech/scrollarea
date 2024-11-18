import vec2 from "./libs/vec2.js"

/** View is used to pan content. It provides view area with given size on content with given size.
	It does not bind itself to any elements.
	@param contentSize Width and height of content as Vector
	@param viewSize Width and height of view as Vector */
export default class View {
    constructor (contentSize, viewSize) {
        this.position = vec2.create(); ///< Current view position

        // View and content size
        this.contentSize=contentSize;      ///< Width and height of content
        this.viewSize=viewSize;            ///< Width and height of current view
        this.contentViewRatio = vec2.div(vec2.create(), this.getViewSize(), this.getContentSize()); // Ratio of content and view
        this._maxPosition = vec2.create(); /// Buffer vector for clampPosition
        this._minPosition = vec2.create(); /// Buffer vector for clampPosition

        this._vec2cache = vec2.create(); /// for temporarly caching a vec2
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
        vec2.max(this._maxPosition, this.getViewSize(), this.getContentSize());
        vec2.min(this._minPosition, this.getViewSize(), this.getContentSize());
        vec2.sub(this._maxPosition, this._maxPosition, this._minPosition);
       
        // Dont let shorter content to scroll
        if (this.getContentSize()[0] <= this.getViewSize()[0]) {
            this._maxPosition[0] = 0;
        }

        if (this.getContentSize()[1] <= this.getViewSize()[1]) {
            this._maxPosition[1] = 0;
        }
        this.position = this.clamp(this.position, vec2.create(), this._maxPosition);
    }

    /** Sets current position
        @param position New position
     */
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
            this.setViewPosition(vec2.sub(delta, this.getViewPosition(), delta));
        }
    }

    setViewSize (width, height) {
        vec2.set(this.viewSize, width, height);
        vec2.div(this.contentViewRatio, this.getViewSize(), this.getContentSize());
        this.clampPosition();
    }

    setContentSize (width, height) {
        vec2.set(this.contentSize, width, height);
        vec2.div(this.contentViewRatio, this.getViewSize(), this.getContentSize());
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
        var out = vec2.clone(v);
        vec2.max(out, out, min);
        vec2.min(out, out, max);
        return out;
    }

    getPercentagePosition (){
        return vec2.div(vec2.create(), this.position, this.viewSize);
    }

    getRelativePosition () {
        vec2.sub(this._vec2cache, this.getViewSize(), this.getContentSize())
        if (vec2.len(this._vec2cache) !== 0) {
            vec2.div(this._vec2cache, this.getViewPosition(), vec2.sub(this._vec2cache, this.getViewSize(), this.getContentSize()));
        }
        
		return this._vec2cache;
    }

    getContentViewRatio () {
        return this.contentViewRatio;
    }
};
    