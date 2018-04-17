function Bezier(Sx,Sy,C1x,C1y,C2x,C2y,Ex,Ey,color) {//C1 and C2: Control point 1 and 2
	this.C1x = C1x || 400;
	this.C1y = C1y || 300;
	this.C2x = C2x || 400;
	this.C2y = C2y || 300;
	this.Sx = Sx || 400;
	this.Sy = Sy || 300;
	this.Ex = Ex || 400;
	this.Ey = Ey || 300;
	this.color = color || '#AAAAAA';
}

// Draws this shape to a given context
Bezier.prototype.draw = function(ctx) {
	ctx.strokeStyle== this.color;
	ctx.beginPath();
	ctx.moveTo(this.Sx,this.Sy);
	ctx.bezierCurveTo(this.C1x,this.C1y,this.C2x,this.C2y,this.Ex,this.Ey);
	//ctx.closePath();
}

// Determine if a bezier curve is inside the mouse's bounds
Bezier.prototype.contains = function(mx, my, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	var biggestX;
	var smallestX;
	var biggestY;
	var smallestY;
	if(this.Sx >= this.Ex){
		biggestX = this.Sx;
		smallestX = this.Ex;
	}else{
		biggestX = this.Ex;
		smallestX = this.Sx;
	}
	if(this.Sy >= this.Ey){
		biggestY = this.Sy;
		smallestY = this.Ey;
	}else{
		biggestY = this.Ey;
		smallestY = this.Sy;
	}
	return  (mx+tol > smallestX) && (mx-tol <= biggestX) && (my+tol > smallestY) && (my-tol <= biggestY);
	//return  (mx+tol > 100) && (mx-tol <= 400) && (my+tol > 100) && (my-tol <= 400);
}