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
Line.prototype.contains = function(mouse, tol) {
	var a = this.S.y - this.E.y;
	var b = this.E.x - this.S.x;
	var c = this.S.x*this.E.y - this.E.x*this.S.y;
	var d = (a*mouse.x + b*mouse.y + c)/Math.sqrt(a*a + b*b);

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
	 return (-tol <= d && d<= tol && mouse.x > smallestX) && (mouse.x <= biggestX) && (mouse.y > smallestY) && (mouse.y <= biggestY)
}

Line.prototype.translate = function(distanceX,distanceY){
	var ptList = [this.S,this.E];
	for (var i = 0 ; i < ptList.length;i++){
		ptList[i].translate(distanceX,distanceY);
	}
}

Line.prototype.scale = function(distanceX,distanceY,center){
	var ptList = [this.S,this.E];
	for (var i = 0 ; i < ptList.length;i++){
    	ptList[i].scale(distanceX,distanceY,center);
	}
}

Line.prototype.rotate = function(operationPoint,previousMouse,mouse){
	var ptList = [this.S,this.E];
	for (var i = 0 ; i < ptList.length;i++){
		ptList[i].rotate(operationPoint,previousMouse,mouse);
	}
}

Line.prototype.mirror = function(mirrorLine){
	var ptList = [this.S,this.E];
	for (var i = 0 ; i < ptList.length;i++){
		ptList[i].mirror(mirrorLine);
	}
}

Line.prototype.isOnCanvas = function(){
	var ptList = [this.S,this.E];
	var pointsOnCanvas = 0;
	for (var i = 0 ; i < ptList.length;i++){
		if(ptList[i].isOnCanvas()){
			pointsOnCanvas++;		
		}
	}
	if(pointsOnCanvas == ptList.length){
		return true;
	}else{
		return false;
	}
}

Line.prototype.copy = function(){
	return new Line(this.S.copy(),this.E.copy(),this.color);
}

Line.prototype.restore = function(a){
	this.S = a.S;
	this.E = a.E;
	this.color = a.color;
}

Line.prototype.center = function(){
	return new Point(this.S.x+this.E.x/2,this.S.y+this.E.y/2);
	
}

Line.prototype.highlight = function(ctx,selectionWidth){
	
}