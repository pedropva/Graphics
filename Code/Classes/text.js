function Text(coordinates,text,font,color) {
  this.coordinates = coordinates || new Point(100,100);
  this.text = text || "hello world";
  this.font = font || "30px Arial";
  this.color = color || '#AAAAAA';
}

// Draws this shape to a given context
Text.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.font = this.font;
	ctx.fillText(this.text, this.coordinates.x, this.coordinates.y);
	ctx.closePath();
}
// Determine if a text is inside the mouse's bounds
Text.prototype.contains = function(mouse, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	return this.coordinates.contains(mouse,tol);
}

Text.prototype.translate = function(distanceX,distanceY){
	this.coordinates.translate(distanceX,distanceY);
}

Text.prototype.scale = function(distanceX,distanceY,coordinates){
	var newSize = (parseInt(this.font.substring(0,2))+distanceX);
	if(newSize < 100 && newSize > 1){
		this.font = newSize + this.font.substring(2);	
	}
}

Text.prototype.rotate = function(operationPoint,previousMouse,mouse){
	//TODO ???? HOW DO I DO THAT
}

Text.prototype.mirror = function(mirrorLine){
	this.coordinates.points[i].mirror(mirrorLine);
}


Text.prototype.isOnCanvas = function(){
	return this.coordinates.isOnCanvas();
}

Text.prototype.copy = function(){
	return new Text(this.coordinates,this.text,this.font,this.color);
}

Text.prototype.restore = function(a){
	this.coordinates = a.coordinates;
	this.text = a.text;
	this.font = a.font;
	this.color = a.color;
}

Text.prototype.center = function(){
	return this.coordinates;
}

Text.prototype.highlight = function(ctx){}