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
	ctx.beginPath();
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.closePath();
}
// Determine if a point is inside the mouse's bounds
Point.prototype.contains = function(mx, my, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	return  (this.x < mx+tol && this.x >mx-tol && this.y < my+tol && this.y > my-tol);
}
Point.prototype.transform = function(mx,my){
	this.x = mx;
	this.y = my;
}

Point.prototype.scale = function(mx,my){
	return true
}

Point.prototype.rotate = function(mx,my){
	return true
}

Point.prototype.mirror = function(mx,my){
	return true
}

Point.prototype.pickCode = function(mx,my,tol){
	var code = []
	code[0] = this.x < mx-tol;
	code[1] = this.x > mx+tol;
	code[2] = this.y < my-tol;
	code[3] = this.y > my+tol;
	return code;

}

Point.prototype.highlight = function(ctx){
	var aux = ctx.strokeStyle;
	var aux2 = ctx.lineWidth;
	ctx.strokeStyle = selectionColor;
	ctx.lineWidth = selectionWidth;
	ctx.strokeRect(this.x,this.y,this.w,this.h);	
	ctx.strokeStyle = aux;
	ctx.lineWidth = aux2;
}
