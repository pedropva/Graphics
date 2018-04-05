
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
var lastClickX = 0;
var lastClickY = 0;
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
  // if our state is invalid, redraw and validate!
  if (!valid) {
    clear();
    
    // ** Add stuff you want drawn in the background all the time here **
    
    // draw all shapes
    var l = shapes.length;
    for (var i = 0; i < l; i++) {
      var shape = shapes[i];
      // We can skip the drawing of elements that have moved off the screen:
      if (shape.x > canvas.width || shape.y > canvas.height ||
          shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
      shapes[i].draw(ctx);
  		ctx.stroke();
    }
    
    // draw selection
    // right now this is just a stroke along the edge of the selected Shape
    if (selection != null) {
      ctx.strokeStyle = selectionColor;
      ctx.lineWidth = selectionWidth;
      var mySel = selection;
      ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
    }
    
    // ** Add stuff you want drawn on top all the time here **
    ctx.stroke();
    valid = true;
  }
}
init();
function init() {
  addShape(new Point(400,400)); // The default is gray
  addShape(new Line(0,0,100,300,"#FF0000"));
  addShape(new Poligon([200,200,200,300,300,300,300,200],"#00FF00"));
  addShape(new Arc(90,50,50,2,1,"#0000FF"));
  addShape(new Bezier(180,140,100,100,200,300,400,300,"#FF0000" ));
  addShape(new Text(10,50,"ola mundo","#FF00FF"));
  console.log(shapes);
}

/*
 $(document).mousemove(function(e){
 	switch(curMode){
				case "point":
					
					break;
				case "line":
					
					break;
				case "poligon":
					
					break;
				case "arc":
					
					break;
				case "bezier":
					
					break;
				case "text":
					
					break;
				default:
					//?
		}
 });

$(function() {
  $("body").click(function(e) {
    if (e.target.id == "myCanvas" || $(e.target).parents("#myCanvas").length) {
      console.log("Clicks: "+clicks+" X Axis : " + e.pageX + " Y Axis : " + e.pageY);
      clicks++;
      switch(curMode){
				case "point":
					
					break;
				case "line":
					
					break;
				case "poligon":
					
					break;
				case "arc":
					
					break;
				case "bezier":
					
					break;
				case "text":
					
					break;
				default:
					//?
		}
    }
  });
})
*/