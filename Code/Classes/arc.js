function Arc(Cx,Cy,R,Sa,Ea,color) {//Sa and Ea: starting and Ending angle, C: center R:Radius
  this.Cx = Cx || 400;
  this.Cy = Cy || 300;
  this.R = R || 50
  this.Sa = Sa || 5;
  this.Ea = Ea || 5;
  this.color = color || '#AAAAAA';
}

// Draws this shape to a given context
Arc.prototype.draw = function(ctx) {
	ctx.strokeStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.Cx,this.Cy,this.R,this.Sa*Math.PI,this.Ea*Math.PI);//Example: (100,75,50,0*Math.PI,1.5*Math.PI
}
