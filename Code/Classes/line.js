function Line(S,E,color) {//starting x, starting y, ending x, ending y
	this.S = S || new Point(10,10);
	this.E = E || new Point(400,300);
	this.color = color || '#AAAAAA';
}

// Draws this shape to a given context
Line.prototype.draw = function(ctx) {
	ctx.strokeStyle = this.color;
	//	alert(this.Sx +" " + this.Sy+" " + this.Ex+" " + this.Ey)
	ctx.beginPath();
	ctx.moveTo(this.S.x, this.S.y);
	ctx.lineTo(this.E.x, this.E.y);
	ctx.closePath();
}

// Determine if a line is inside the mouse's bounds
Line.prototype.contains = function(mx, my, tol) {
	var a = this.S.y - this.E.y;
	var b = this.E.x - this.S.x;
	var c = this.S.x*this.E.y - this.E.x*this.S.y;
	var d = (a*mx + b*my + c)/Math.sqrt(a*a + b*b);

	var biggestX;
	var smallestX;
	var biggestY;
	var smallestY;
	if(this.S.x >= this.E.x){
		biggestX = this.S.x;
		smallestX = this.E.x;
	}else{
		biggestX = this.E.x;
		smallestX = this.S.x;
	}
	if(this.S.y >= this.E.y){
		biggestY = this.S.y;
		smallestY = this.E.y;
	}else{
		biggestY = this.E.y;
		smallestY = this.S.y;
	} 
	 return (-tol <= d && d<= tol && mx > smallestX) && (mx <= biggestX) && (my > smallestY) && (my <= biggestY)
}

Line.prototype.transform = function(mx,my){
	var distX = this.S.x 
	var distY = this.S.y
	this.S.transform(mx,my);
	this.E.x += this.S.x - distX
	this.E.y += this.S.y - distY
}

Line.prototype.scale = function(mx,my){
	return true
}

Line.prototype.rotate = function(mx,my){
	return true
}

Line.prototype.mirror = function(mx,my){
	return true
}

Line.prototype.highlight = function(ctx,selectionWidth){
	
}