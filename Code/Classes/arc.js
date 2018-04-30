function Arc(Center,R,Sa,Ea,color) {//Sa and Ea: starting and Ending angle, C: center R:Radius
	this.Center = Center || new Point(100,100);
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
	ctx.arc(this.Center.x,this.Center.y,this.R,this.Sa,this.Ea);//Example: (100,75,50,0*Math.PI,1.5*Math.PI
	//ctx.fill();
	//ctx.closePath();
	//ctx.strokeStyle = previous;
}

// Determine if a arc is inside the mouse's bounds
Arc.prototype.contains = function(mouse, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	var a = mouse.x - this.Center.x;
	var b = mouse.y - this.Center.y;
	var r = Math.sqrt(a*a + b*b);
	return  (r < this.R);
	//Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < r
}

Arc.prototype.translate = function(distanceX,distanceY){
	this.Center.translate(distanceX,distanceY);
}

Arc.prototype.scale = function(distanceX,distanceY,center){
	if(distanceX > 1){
		distanceX = 1.5;
	}else{
		distanceX = 0.9;
	}
	this.R *= distanceX;
}

Arc.prototype.rotate = function(operationPoint,previousMouse,mouse){
	//TODO ???? HOW DO I DO THAT
}

Arc.prototype.mirror = function(mirrorLine){
	this.Center.mirror(mirrorLine);
	this.Ea = (this.Ea - Math.PI);
	this.Sa = (this.Sa - Math.PI);
}


Arc.prototype.isOnCanvas = function(){
	var points = 0;
	if(new Point(this.Center.x+this.R,this.Center.y+this.R).isOnCanvas()){
		points++;
	}
	if(new Point(this.Center.x-this.R,this.Center.y+this.R).isOnCanvas()){
		points++;
	}
	if(new Point(this.Center.x+this.R,this.Center.y-this.R).isOnCanvas()){
		points++;
	}
	if(new Point(this.Center.x-this.R,this.Center.y-this.R).isOnCanvas()){
		points++;
	}
	return (points == 4)
}

Arc.prototype.copy = function(){
	return new Arc(this.Center.copy(),this.R,this.Sa,this.Ea,this.color);
}

Arc.prototype.restore = function(a){
	this.Center.restore(a.Center);
	this.R = a.R;
	this.Sa = a.Sa;
	this.Ea = a.Ea;
	this.color = a.color;
}

Arc.prototype.center = function(){
	return this.Center;
}

Arc.prototype.highlight = function(ctx){}