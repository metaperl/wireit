YUI.add("canvas-container", function(Y){


/**
 * Container that draw into a canvas. (Draw an Ellipse by default, override the drawCanvas method to customize)
 * @class CanvasContainer
 * @extends Container
 * @constructor
 * @param {Object} options
 * @param {Layer} layer
 */
Y.CanvasContainer = function(options, layer) {
   Y.CanvasContainer.superclass.constructor.call(this, options, layer);
};

Y.extend(Y.CanvasContainer, Y.Container, {
	
	/** 
    * @attribute xtype
    * @description String representing this class for exporting as JSON
    * @default "WireIt.CanvasContainer"
    * @type String
    */
   xtype: "Y.CanvasContainer",
	
	/** 
    * @attribute ddHandle
    * @description (only if draggable) boolean indicating we use a handle for drag'n drop
    * @default false
    * @type Boolean
    */
	ddHandle: false,
	
	/** 
    * @attribute className
    * @description CSS class name for the container element
    * @default ""WireIt-Container WireIt-CanvasContainer"
    * @type String
    */
	className: "WireIt-Container WireIt-CanvasContainer",
	
	/** 
    * @attribute width
    * @description initial width of the container
    * @default 200
    * @type Integer
    */
	width: 200,
	
	/** 
    * @attribute height
    * @description initial height of the container
    * @default 100
    * @type Integer
    */
	height: 100,

   
   /**
 	 * Add the image property as a background image for the container
    * @method render
    */
   render: function() {
      Y.CanvasContainer.superclass.render.call(this);

		this.canvasEl = new Y.CanvasElement(this.bodyEl);
		this.canvasEl.SetCanvasRegion(0,0, this.width, this.height );
		this.canvasWidth = this.width;
		this.canvasHeight = this.height;
		this.drawCanvas();
   },

	/**
	 * On resize, resize the canvas element and redraw it
	 */
	onResize: function(event, args) {
		
		Y.CanvasContainer.superclass.onResize.call(this, event, args);
		
      var size = args[0];
		
		// resize the canvas
		// TODO: do not hardcode those sizes !!
		this.canvasWidth = (size[0]-10);
		this.canvasHeight = (size[1]-( this.ddHandle ? 44 : 14) );
		this.canvasEl.SetCanvasRegion(0,0, this.canvasWidth, this.canvasHeight );
		
		this.drawCanvas();
   },
   
	/**
	 * Draw the canvas
	 */
	drawCanvas: function() {
		var ctx = this.canvasEl.getContext('2d');
	 
		ctx.strokeStyle = "#5B81AD"; 
      ctx.lineWidth= 2;

		ctx.save();
		ctx.translate( this.canvasWidth/2, this.canvasHeight/2);
		ctx.scale(this.canvasWidth/2-5, this.canvasHeight/2-5);
		ctx.arc(0, 0, 1, 0, 2*Math.PI, false);
		
		ctx.restore(); // restore so stroke() isn’t scaled
		
		ctx.stroke();
		
		ctx.fillStyle = "#DCE6F2"; 
		ctx.fill();
	}

});

}, '0.7.0',{
  requires: ['container']
});
