function Poligon(points,color) {//points is a array with the sequence of points to close the polygon
	this.color = color || '#AAAAAA';
	this.points = points || [200,200,200,300,300,300,300,200]
	this.curPoint = 1;
}

// Draws this shape to a given context
Poligon.prototype.draw = function(ctx) {
	ctx.strokeStyle== this.color;
	ctx.fillStyle== this.color;
	ctx.beginPath();
	ctx.moveTo(this.points[0],this.points[1]);
	var i=0;
	for (i; i <= parseInt(this.points.length); i=i+2) {
		ctx.lineTo(this.points[i],this.points[i+1]);
	}
	//ctx.lineTo(this.points[i+1],this.points[i+2]);
	//ctx.lineTo(this.points[0],this.points[1]);
	//ctx.closePath();
	ctx.fill()
}

// Determine if a poligon is inside the mouse's bounds
Poligon.prototype.contains = function(mx, my, tol) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Width) and its Y and (Y + Height)
  return  false;
}