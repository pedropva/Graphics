
/*FONTS:
https://www.w3schools.com/tags/ref_canvas.asp
https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
https://www.w3schools.com/html/html5_canvas.asp
*/
//readTextFile(file);//do this if you want to draw something from the file

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var file = "./draw.txt";
var grd; //holds gradient data
var curLine="";
var nLine=0;
var curMode = "none";
var clicks =0;
var startingX = 0;
var startingY = 0;
var drawing = null;//holds the id of the shape we're currently drawing
var valid = false; // when set to true, the canvas will redraw everything
var shapes = [];  // the collection of things to be drawn
var dragging = false; // Keep track of when we are dragging
 // the current selected object.
 // In the future we could turn this into an array for multiple selection
 var selection = null;
var dragoffx = 0; // See mousedown and mousemove events for explanation
var dragoffy = 0;
// **** Options! ****
selectionColor = '#CC0000';
selectionWidth = 2;  
interval = 30;
setInterval(function() { draw(); }, interval);

function addShape(shape) {
	shapes.push(shape);
	valid = false;
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
function draw() {
  //console.log(shapes);
  // if our state is invalid, redraw and validate!
  if (!valid) {
  	clear();

	// ** Add stuff you want drawn in the background all the time here **
	//resfresh the current drawing shape

	// draw all shapes
	var l = shapes.length;
	for (var i = 0; i < l; i++) {
		var shape = shapes[i];

		if(shape != undefined){    
		// We can skip the drawing of elements that have moved off the screen:
		if (shape.x > canvas.width || shape.y > canvas.height ||shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
		shapes[i].draw(ctx);		
		ctx.stroke();
	}
}

	// draw selection
	// right now this is just a stroke along the edge of the selected Shape
	if (selection != null) {
		var aux = ctx.strokeStyle;
		var aux2 = ctx.lineWidth;
		ctx.strokeStyle = selectionColor;
		ctx.lineWidth = selectionWidth;
		var mySel = selection;
		ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
		ctx.strokeStyle = aux;
		ctx.lineWidth = aux2;
	}
	
	// ** Add stuff you want drawn on top all the time here **
	ctx.stroke();
	valid = true;
}
}
function getMouse(e) {
	var offsetX = 8;
	var offsetY = 8;
	var mx;
  var my;//element = canvas,
  /*
  // Compute the total offset
  if (element.offsetParent !== undefined) {
	do {
	  offsetX += element.offsetLeft;
	  offsetY += element.offsetTop;
	} while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;
  */
  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  
  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
}
function createShape(x,y,w,h,color){
	switch(curMode){
		case "point":
		return new Point(x,y);
		case "line":
		drawing = new Line(x,y,x,y,color);
		return drawing;
		case "poligon":
		if(drawing != null && drawing.constructor.name == "Poligon"){
			drawing.curPoint++;
			return undefined;
		}
		drawing = new Poligon([x,y],"#00FF00");
		return drawing;
		case "arc":
		if(drawing != null && drawing.constructor.name == "Arc"){
			drawing.mode = (drawing.mode+1)%2;
			return undefined;
		}
		drawing = new Arc(x,y,0,x,y,color);
		return drawing;
		case "bezier":

		drawing = new Line(x,y,x,y,color);
		return drawing;
		case "text":

		drawing = new Line(x,y,x,y,color);
		return drawing;
		default:
		  //?
		}
	}

//fixes a problem where double clicking causes text to get selected on the canvas
canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
  // Up, down, and move are for dragging
  canvas.addEventListener('mousedown', function(e) {
  	var mouse = getMouse(e);
  	var mx = mouse.x;
  	var my = mouse.y;
  	var l = shapes.length;
  	/*
	The value of which will be:

	1 for the left button
	2 for the middle button
	3 for the right button
	*/
	if(e.which == 2){
		drawing = null;
	}
  	for (var i = l-1; i >= 0; i--) {
  		if(shapes[i] != undefined){
  			if (shapes[i].contains(mx, my,15)) {
  				var mySel = shapes[i];
				// Keep track of where in the object we clicked
				// so we can move it smoothly (see mousemove)
				dragoffx = mx - mySel.x;
				dragoffy = my - mySel.y;
				dragging = true;
				selection = mySel;
				valid = false;
				return;
			}
		}
	}
	// havent returned means we have failed to select anything.
	// If there was an object selected, we deselect it
	if (selection) {
		selection = null;
		valid = false; // Need to clear the old selection border
	}
	
}, true);
  canvas.addEventListener('mousemove', function(e) {
  	var mouse = getMouse(e);
  	if (dragging){
  		var mouse = getMouse(e);
	  // We don't want to drag the object by its top-left corner, we want to drag it
	  // from where we clicked. Thats why we saved the offset and use it here
	  selection.x = mouse.x - dragoffx;
	  selection.y = mouse.y - dragoffy;   
	  valid = false; // Something's dragging so we must redraw
	}
	if(drawing != null){
		if(drawing.constructor.name.indexOf("Line") != -1){
			drawing.Ex = mouse.x;
			drawing.Ey = mouse.y;	
		}else if(drawing.constructor.name.indexOf("Poligon") != -1){
			console.log(drawing.points);
			drawing.points[drawing.curPoint*2] = mouse.x;
			drawing.points[drawing.curPoint*2+1] = mouse.y;
		}else if(drawing.constructor.name.indexOf("Arc") != -1){
			var a = mouse.x - drawing.Cx;
			var b = mouse.y - drawing.Cy;
			var r = Math.sqrt(a*a + b*b);
			drawing.R = r;
			var angleRadians = Math.atan2(b,a);// angle in radians
			if(drawing.mode){
				drawing.Ea = angleRadians;
			}else{
				drawing.Sa = angleRadians;
			}
		}
		valid = false; // Something's drawing so we must redraw
	}
}, true);
  canvas.addEventListener('mouseup', function(e) {
  	dragging = false;
  }, true);
  // double click for making new shapes
  canvas.addEventListener('dblclick', function(e) {
  	selection =null;
  	var mouse = getMouse(e);
  	newShape = createShape(mouse.x, mouse.y, 20, 20, '#FF00FF');
  	if(newShape != undefined){
	  addShape(newShape);//new Shape(mouse.x - 10, mouse.y - 10, 20, 20, 'rgba(0,255,0,.6)')  
	}
}, true);

  init();

  function init() {
  //addShape(new Point(400,400)); // The default is gray
  //addShape(new Line(0,0,100,300,"#FF0000"));
  //addShape(new Poligon([200,200,200,300,300,300,300,200],"#00FF00"));
  //addShape(new Arc(90,50,50,2,1,"#0000FF"));
  //addShape(new Bezier(180,140,100,100,200,300,400,300,"#FF0000" ));
  //addShape(new Text(10,50,"ola mundo","#FF00FF"));
  //console.log(shapes);
}
