function Line(Sx,Sy,Ex,Ey,color) {//starting x, starting y, ending x, ending y
  this.Sx = Sx || 10;
  this.Sy = Sy || 10;
  this.Ex = Ex || 400;
  this.Ey = Ey || 300;
  this.color = color || '#AAAAAA';
}

// Draws this shape to a given context
Line.prototype.draw = function(ctx) {
	ctx.strokeStyle = this.color;
//	alert(this.Sx +" " + this.Sy+" " + this.Ex+" " + this.Ey)
	ctx.moveTo(this.Sx, this.Sy);
	ctx.lineTo(this.Ex, this.Ey);
	//ctx.stroke();
}
