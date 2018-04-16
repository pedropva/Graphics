function Line(Sx,Sy,Ex,Ey,color) {//starting x, starting y, ending x, ending y
  this.Sx = Sx || 10;
  this.Sy = Sy || 10;
  this.Ex = Ex || 400;
  this.Ey = Ey || 300;
  this.color = color || '#AAAAAA';
}

// Draws this shape to a given context
Line.prototype.draw = function(ctx) {
	//ctx.strokeStyle = this.color;
//	alert(this.Sx +" " + this.Sy+" " + this.Ex+" " + this.Ey)
	ctx.beginPath();
	ctx.moveTo(this.Sx, this.Sy);
	ctx.lineTo(this.Ex, this.Ey);
	ctx.closePath();
	//ctx.stroke();
}
// Determine if a line is inside the mouse's bounds
Line.prototype.contains = function(mx, my, tol) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Width) and its Y and (Y + Height)
  return  false;
}