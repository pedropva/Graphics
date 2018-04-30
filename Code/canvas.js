
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
var valid = false; // when set to true, the canvas will redraw everything
var shapes = [];  // the collection of things to be drawn
var dragging = false; // Keep track of when we are dragging
var drawing = null;//holds the id of the shape we're currently drawing
var mirrorwing = null;//holds the id of the shape we're currently mirrorwing
 // the current selected object.
 // In the future we could turn this into an array for multiple selection
var selection = null;
var convexhullPoints = [];
var convexhull = null; 
var operationPoint = null;
var operationLine = null;
var previousPoint = new Point(0,0);
var previousColor = "#000000";
ctx.strokeStyle = "#000000";
ctx.fillStyle = "#000000";
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
function deleteShape(shape) {
	var index = shapes.indexOf(shape);
	if(index != -1){
		shapes.splice(index, 1);
	}
}
function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
function draw() {
  // if our state is invalid, redraw and validate!
	if (!valid) {
		//console.log(shapes);
		clear();

		// ** Add stuff you want drawn in the background all the time here **
		//resfresh the current drawing shape

		// draw all shapes
		var l = shapes.length;
		if(operationLine !=null){
			ctx.setLineDash([3, 3]);
			operationLine.draw(ctx);
			ctx.stroke();
			ctx.setLineDash([5, 0]);
		}
		for (var i = 0; i < l; i++) {
			var shape = shapes[i];

			if(shape != undefined){    
				// We can skip the drawing of elements that have moved off the screen:
				if (shape.isOnCanvas()){
					var previous = ctx.strokeStyle;
					var previous2 = ctx.fillStyle;
					shapes[i].draw(ctx);		
					//console.log("desenhei: " + shapes[i].constructor.name);
					ctx.stroke();
					ctx.strokeStyle = previous;
					ctx.fillStyle = previous2;
				}else{
					console.log("Shape: ");
					console.log(shape);
					console.log(" is out of canvas, deleting it...");
					deleteShape(shape);
				}
			}
		}
		// draw selection
		// right now this is just a stroke along the edge of the selected Shape
		
		if (selection != null) {
			selection.highlight(ctx);
		}
		
		// ** Add stuff you want drawn on top all the time here **
		//ctx.stroke();
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
function createShape(x,y,w,h,color,font){
	switch(curMode){
		case "point":
		if(drawing != null && drawing.constructor.name == "Point"){
			return undefined;
		}
		return new Point(x,y,5,5,color);
		case "line":
		if(drawing != null && drawing.constructor.name == "Line"){
			//return undefined;	
		}		
		drawing = new Line(new Point(x,y),new Point(x,y),color);
		return drawing;
		case "poligon":
		if(drawing != null && drawing.constructor.name == "Poligon"){
			drawing.curPoint++;
			return undefined;
		}
		drawing = new Poligon([new Point(x,y)],color);
		return drawing
		case "arc":
		if(drawing != null && drawing.constructor.name == "Arc"){
			drawing.mode = (drawing.mode+1)%2;
			return undefined;
		}
		drawing = new Arc(new Point(x,y),0,x,y,color);
		return drawing;
		case "bezier":
		if(drawing != null && drawing.constructor.name == "Bezier"){
			drawing.curPoint++;
			return undefined;
		}
		drawing = new Bezier(new Point(x,y),new Point(x+50,y+50),new Point(x+60,y-30),new Point(x,y),color);
		return drawing;
		case "text":
		drawing = new Text(new Point(x,y),"Hi",font,color);
		return drawing;
		case "mirror":
		if(selection != null || mirrorwing != null){
			if(mirrorwing == null && selection != null){
				mirrorwing = selection;		
			}
			
			if(drawing != null && drawing.constructor.name == "Line"){
				return undefined;	
			}		
			drawing = new Line(new Point(x,y),new Point(x,y),color);
			return drawing;
		}else{
			console.log(selection +" and "+ mirrorwing);
			alert("please select a shape to mirror first!");
		}
		default:
		  return undefined;
		}
	}

//fixes a problem where double clicking causes text to get selected on the canvas
canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
  // Up, down, and move are for dragging
  canvas.addEventListener('mousedown', function(e) {
	var mouse = getMouse(e);
	var l = shapes.length;
	/*
	The value of which will be:

	1 for the left button
	2 for the middle button
	3 for the right button
	*/
	if(e.which == 2){
		if(curMode.indexOf("convexhull") != -1){
			if(convexhullPoints.length == 0){
				deleteShape(convexhull);
				convexhullPoints = [];
			}else{
				convexhull = new Poligon(jarvisMarch(convexhullPoints),"#000000",1);
				addShape(convexhull);
				console.log(convexhull);
			}
		}
		if(curMode.indexOf("mirror") != -1){
			if(drawing != null && drawing != mirrorwing && mirrorwing != null){
				var backup = mirrorwing.copy();
				mirrorwing.mirror(drawing);// mirror the object and then delete the mirror line
				if(!mirrorwing.isOnCanvas()){
					console.log("transformation out of Canvas! Size of canvas: "+canvas.width +"x"+ canvas.height);
					mirrorwing.restore(backup);
				}
				mirrorwing.color = previousColor;
				mirrorwing = null;
			}else{
				alert("please make a line which to mirror the shape!");		
			}
			deleteShape(drawing);
		}
		drawing = null;
		operationPoint = null;
		operationLine = null;
		if(selection != null){
			selection.color = previousColor;
			selection = null;
		}
		valid = false; // Need to clear the old selection border
		return;
	}
	for (var i = l-1; i >= 0; i--) {
		if(shapes[i] != undefined){
			if (shapes[i].contains(new Point(mouse.x,mouse.y),5)) {
				var mySel = shapes[i];
				// Keep track of where in the object we clicked
				// so we can move it smoothly (see mousemove)
				//dragoffx = mouse.x - mySel.x;
				//dragoffy = mouse.y - mySel.y;
				dragging = true;
				if(selection != null){
					console.log(previousColor);
					selection.color = previousColor;	
				}
				selection = mySel;
				if(selection.color.indexOf("#FF0000") == -1){
					previousColor = selection.color;
				}
				selection.color = "#FF0000";
				if(e.button == 2){//middle mouse click so we want to edit that selection
					drawing = selection;
				}
				if(curMode =="eraser"){
					deleteShape(selection);
					selection = null;
				}else if(curMode =="translate" || curMode =="scale" || curMode =="rotate" || curMode =="mirror"){
					operationPoint = new Point(mouse.x,mouse.y);
					previousPoint.x = mouse.x;
					previousPoint.y = mouse.y;
				}else if(curMode =="convexhull"){
					if(selection.constructor.name.indexOf("Poligon") != -1){
						var auxArray = [];
						auxArray = convexhullPoints;
						convexhullPoints = auxArray.concat(selection.points).unique();
						console.log(convexhullPoints);
					}
				}
				valid = false;
				console.log(selection);
				return;
			}
		}
	}
	if(convexhullPoints.length != 0){
		convexhullPoints = [];
	}
	// havent returned means we have failed to select anything.
	// If there was an object selected, we deselect it, except if we are doing mirrrwing, in which case we still want to have that shape selected
	if (selection != null && curMode.indexOf("mirror") == -1) {
		selection.color = previousColor;
		selection = null;
		valid = false; // Need to clear the old selection border
	}
	
}, true);
canvas.addEventListener('mousemove', function(e) {
	var mouse = getMouse(e);
	if (dragging != null && selection != null){
		var mouse = getMouse(e);
		mouse.x -= dragoffx;
		mouse.y -= dragoffy;
		var distanceX = mouse.x - previousPoint.x;
		var distanceY = mouse.y - previousPoint.y;
		var backup = selection.copy();
		// We don't want to drag the object by its top-left corner, we want to drag it
		// from where we clicked. Thats why we saved the offset and use it here
		operationLine = new Line(operationPoint,new Point(mouse.x,mouse.y));
		if(curMode === "translate"){
			selection.translate(distanceX,distanceY);			
		}else if(curMode === "scale"){
			distanceX = distanceX/100+1;
			distanceY = distanceY/100+1;
			selection.scale(distanceX,distanceY,selection.center());	
		}else if(curMode === "rotate"){
			var angle;
			if(previousPoint.x > mouse.x){
				angle = 0.1;
			}else{
				angle = -0.1;
			}
			selection.rotate(operationPoint,angle);	
		}else if(curMode === "mirror"){
			//i  do the mirror after drawing the mirror line
			mirrorwing = selection;
			operationLine = null;
		}else{
			operationLine = null;
		}
		if(!selection.isOnCanvas()){
			console.log(selection);
			console.log("transformation out of Canvas! Size of canvas: "+canvas.width +"x"+ canvas.height);
			selection.restore(backup);
			console.log(selection);
		}
		previousPoint.x = mouse.x;
		previousPoint.y = mouse.y;
		
		valid = false; // Something's dragging so we must redraw
	}
	if(drawing != null){
		if(drawing.constructor.name.indexOf("Line") != -1){
			drawing.E.x = mouse.x;
			drawing.E.y = mouse.y;	
		}else if(drawing.constructor.name.indexOf("Poligon") != -1){
			drawing.points[drawing.curPoint] = new Point(mouse.x,mouse.y);
		}else if(drawing.constructor.name.indexOf("Arc") != -1){
			var a = mouse.x - drawing.Center.x;
			var b = mouse.y - drawing.Center.y;
			var r = Math.sqrt(a*a + b*b);
			drawing.R = r;
			var angleRadians = Math.atan2(b,a);// angle in radians

			if(drawing.mode){
				drawing.Ea = angleRadians;
			}else{
				drawing.Sa = angleRadians;
			}
		}else if(drawing.constructor.name.indexOf("Bezier") != -1){
			if(drawing.curPoint == 1){
				drawing.E.x= mouse.x;
				drawing.E.y = mouse.y;	
			}else if(drawing.curPoint == 2){
				drawing.C1.x= mouse.x;
				drawing.C1.y = mouse.y;	
			}else if(drawing.curPoint == 3){
				drawing.C2.x= mouse.x;
				drawing.C2.y = mouse.y;	
			}else {
				drawing.S.x= mouse.x;
				drawing.S.y = mouse.y;	
				drawing.curPoint = 1;
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
	newShape = createShape(mouse.x, mouse.y, 5, 5, '#0000FF',"30px Arial");
	if(newShape != undefined){
		addShape(newShape);//new Shape(mouse.x - 10, mouse.y - 10, 20, 20, 'rgba(0,255,0,.6)')  
	}
}, true);

window.addEventListener("keypress", keyPressHandler, true);
window.addEventListener("keyup", keyUpHandler, true);

function keyUpHandler(event) {
	//console.log(event);
	var key = event.keyCode;
	if (key == 8)  {
		if(selection != null && selection.constructor.name == "Text"){
			selection.text = selection.text.slice(0,-1);
			valid = false;
		}
	}
}

function keyPressHandler(event) {
	console.log(event);
	var key = String.fromCharCode(event.charCode);
	if(selection != null && selection.constructor.name == "Text"){
		selection.text += key;
		valid = false;
	}
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
function saveCanvas(){
	//http://diveintohtml5.info/storage.html
	//save the data to local storage
	if(supports_html5_storage){
		console.log(shapes);
		localStorage.setItem("shapes_lenght",shapes.length);			
		for(var y=0;y<shapes.length;y++){
			if(shapes[y].constructor.name.indexOf("Point") != -1){
				//localStorage.setItem(shapes[y].constructor.name+":"+y+":"+shapes[y].x, JSON.stringify(shapes[y].x));		
				localStorage.setItem(y,shapes[y].constructor.name+":"+shapes[y].x+":"+shapes[y].y+":"+shapes[y].color);			
			}else if(shapes[y].constructor.name.indexOf("Line") != -1){
				localStorage.setItem(y,shapes[y].constructor.name+":"+shapes[y].S.x+":"+shapes[y].S.y+":"+shapes[y].E.x+":"+shapes[y].E.y+":"+shapes[y].color);			
			}else if(shapes[y].constructor.name.indexOf("Poligon") != -1){
				var auxSave = "";
				for(var z=0;z<shapes[y].points.length;z++){
					if(auxSave === ""){
						auxSave += shapes[y].points[z].x+":"+shapes[y].points[z].y;
					}else{
						auxSave += ":"+shapes[y].points[z].x+":"+shapes[y].points[z].y;
					}
				}
				localStorage.setItem(y,shapes[y].constructor.name +":"+ auxSave+":"+shapes[y].color);			
			}else if(shapes[y].constructor.name.indexOf("Bezier") != -1){
				localStorage.setItem(y,shapes[y].constructor.name+":"+shapes[y].Sx+":"+shapes[y].Sy+":"+shapes[y].C1x+":"+shapes[y].C1y+":"+shapes[y].C2x+":"+shapes[y].C2y+":"+shapes[y].Ex+":"+shapes[y].Ey+":"+shapes[y].color);			
			}else if(shapes[y].constructor.name.indexOf("Arc") != -1){
				localStorage.setItem(y,shapes[y].constructor.name+":"+shapes[y].Cx+":"+shapes[y].Cy+":"+shapes[y].R+":"+shapes[y].Sa+":"+shapes[y].Ea+":"+shapes[y].color);			
			}else if(shapes[y].constructor.name.indexOf("Text") != -1){
				localStorage.setItem(y,shapes[y].constructor.name+":"+shapes[y].x+":"+shapes[y].y+":"+shapes[y].text+":"+shapes[y].font+":"+shapes[y].color);			
			}
		}
	}else{
		alert("This browser does not support Local Storage!");
	}
}
function loadCanvas(){
	//try to load the data
	if(supports_html5_storage){
		var shapes_length = parseInt(localStorage.getItem("shapes_lenght"));
		//if the data is empty set the data
		if(shapes_length <= 0){
			shapes = []
			return;
		}
		for(var y=0;y<shapes_length;y++){
			var local_shape = localStorage.getItem(y);
			local_shape = local_shape.split(":");
			console.log(local_shape);
			if(local_shape[0].indexOf("Point") != -1){				
				shapes.push(new Point(parseInt(local_shape[1]),parseInt(local_shape[2]),5,5,local_shape[3])); 
			}else if(local_shape[0].indexOf("Line") != -1){
				shapes.push(new Line(new Point(parseInt(local_shape[1]),parseInt(local_shape[2])),new Point(parseInt(local_shape[3]),parseInt(local_shape[4])),local_shape[5])); 
			}else if(local_shape[0].indexOf("Poligon") != -1){
				var auxLoad = new Poligon([],local_shape[local_shape.length-1]);
				for(var z=1;z<local_shape.length-1;z= z+2){
					auxLoad.points.push(new Point(parseInt(local_shape[z]),parseInt(local_shape[z+1]))); 
				}
				shapes.push(auxLoad);
			}else if(local_shape[0].indexOf("Bezier") != -1){
				shapes.push(new Bezier(parseInt(local_shape[1]),parseInt(local_shape[2]),parseInt(local_shape[3]),parseInt(local_shape[4]),parseInt(local_shape[5]),parseInt(local_shape[6]),parseInt(local_shape[7]),parseInt(local_shape[8]),local_shape[9])); 
			}else if(local_shape[0].indexOf("Arc") != -1){
				shapes.push(new Arc(parseInt(local_shape[1]),parseInt(local_shape[2]),parseInt(local_shape[3]),parseInt(local_shape[4]),parseInt(local_shape[5]),local_shape[6])); 
			}else if(local_shape[0].indexOf("Text") != -1){
				shapes.push(new Text(parseInt(local_shape[1]),parseInt(local_shape[2]),local_shape[3],local_shape[4],local_shape[5])); 
			}
		}
		valid = false;
		console.log(shapes);
	}else{
		alert("This browser does not support Local Storage!");
	}
}
