function Poligon(points,color) {//points is a array with the sequence of points to close the polygon
  this.color = color || '#AAAAAA';
  this.points = points || [200,200,200,300,300,300,300,200]
}

// Draws this shape to a given context
Poligon.prototype.draw = function(ctx) {
  ctx.strokeStyle== this.color;
	for (var i = 0; i <= parseInt(this.points.length)/2; i=i+2) {
		drawLine(this.points[i],this.points[i+1],this.points[i+2],this.points[i+3]);
	}
	drawLine(this.points[i],this.points[i+1],this.points[0],this.points[1]);
}
