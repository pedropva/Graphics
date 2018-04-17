function Point(x,y,w,h,color) {
	this.x = x || 400;
	this.y = y || 300;
	this.w = w || 5;
	this.h = h || 5;
	this.color = color || '#000000';
}

// Draws this shape to a given context
Point.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.closePath();
}
// Determine if a point is inside the mouse's bounds
Point.prototype.contains = function(mx, my, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	return  ((mx+tol > this.x)||(mx-tol > this.x)) && ((mx-tol <= this.x)||(mx+tol <= this.x)) && ((my+tol > this.y)||(my-tol > this.y)) && ((my-tol <= this.y)||(my+tol <= this.y));
}