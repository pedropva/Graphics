function Text(x,y,text,color,font) {
  this.x = x || 400;
  this.y = y || 300;
  this.text = text || "hello world";
  this.font = font || "30px Arial";
  this.color = color || '#AAAAAA';
}

// Draws this shape to a given context
Text.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.font = this.font;
	ctx.fillText(this.text, this.x, this.y);
	ctx.closePath();
}
// Determine if a text is inside the mouse's bounds
Text.prototype.contains = function(mouse, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	return  ((mouse.x+tol > this.x)||(mouse.x-tol > this.x)) && ((mouse.x-tol <= this.x)||(mouse.x+tol <= this.x)) && ((mouse.y+tol > this.y)||(mouse.y-tol > this.y)) && ((mouse.y-tol <= this.y)||(mouse.y+tol <= this.y));
}

Text.prototype.transform = function(mouse){
	return true;
}

Text.prototype.scale = function(mouse){
	return true
}

Text.prototype.rotate = function(mouse){
	return true
}

Text.prototype.mirror = function(mouse){
	return true
}

Text.prototype.highlight = function(ctx){}