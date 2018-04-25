function Arc(Cx,Cy,R,Sa,Ea,color) {//Sa and Ea: starting and Ending angle, C: center R:Radius
	this.Cx = Cx || 400;
	this.Cy = Cy || 300;
	this.R = R || 50
	this.Sa = Sa || 0*Math.PI;
	this.Ea = Ea || 1.5*Math.PI;
	this.color = color || '#AAAAAA';
  this.mode = 0; //mode 0 is drwaing from Starting angle and mode 1 from end angle
}

// Draws this shape to a given context
Arc.prototype.draw = function(ctx) {
	//var previous = ctx.strokeStyle;
	ctx.strokeStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.Cx,this.Cy,this.R,this.Sa,this.Ea);//Example: (100,75,50,0*Math.PI,1.5*Math.PI
	//ctx.fill();
	//ctx.closePath();
	//ctx.strokeStyle = previous;
}

// Determine if a arc is inside the mouse's bounds
Arc.prototype.contains = function(mouse, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	var a = mouse.x - this.Cx;
	var b = mouse.y - this.Cy;
	var r = Math.sqrt(a*a + b*b);
	return  (r < this.R);
	//Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < r
}

Arc.prototype.translate = function(mouse){
	return true;
}

Arc.prototype.scale = function(mouse){
	rate = mouse.x/(canvas.width/2);
	this.R *= rate;
}

Arc.prototype.rotate = function(mouse){
	return true
}

Arc.prototype.mirror = function(mouse){
	return true
}
Arc.prototype.invertedAngle = function(ctx){
	while(a < 0)
    {
      a += 2*Math.PI;
    }
    while(a > 2*Math.PI)
    {
      a -= 2*Math.PI;
    }
    return a;
}
Arc.prototype.highlight = function(ctx){}