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
	ctx.font = this.font;
	ctx.fillText(this.text, this.x, this.y);
}
// Determine if a text is inside the mouse's bounds
Text.prototype.contains = function(mx, my, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	return  ((mx+tol > this.x)||(mx-tol > this.x)) && ((mx-tol <= this.x)||(mx+tol <= this.x)) && ((my+tol > this.y)||(my-tol > this.y)) && ((my-tol <= this.y)||(my+tol <= this.y));
}