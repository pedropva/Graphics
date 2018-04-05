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
	ctx.moveTo(this.Sx,this.Sy);
	ctx.bezierCurveTo(this.C1x,this.C1y,this.C2x,this.C2y,this.Ex,this.Ey);
}

