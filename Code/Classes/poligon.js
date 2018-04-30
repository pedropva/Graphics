function Poligon(points,color,fill) {//points is a array with the sequence of points to close the polygon
	this.color = color || '#AAAAAA';
	this.points = points || [new Point(200,200),new Point(200,300),new Point(300,300),new Point(300,200)];//[200,200,200,300,300,300,300,200]
	this.fill = fill || this.color;
	this.curPoint = 1;
}

// Draws this shape to a given context
Poligon.prototype.draw = function(ctx) {
	ctx.strokeStyle = this.color;
	if(this.fill != 1){
		this.fill = this.color;
	}
	ctx.fillStyle = this.fill;
	ctx.beginPath();
	ctx.moveTo(this.points[0].x,this.points[0].y);
	var i=0;
	for (i; i < parseInt(this.points.length); i++) {
		ctx.lineTo(this.points[i].x,this.points[i].y);
	}
	if(this.fill != 1){
		ctx.fill();	
	}
}

// Determine if a poligon is inside the mouse's bounds
Poligon.prototype.contains = function(mouse, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	var cout = 0;
	for (var i = 0;i<this.points.length;i++)
	{
		if(this.points[i].contains(mouse.x,mouse.y,tol) == true)
		{
			return true;
		}
	}
	cout = 0;
	for(var i = 0; i<this.points.length-1; i++){
		var x0
		var x1
		var y0
		var y1
		if(this.points[i].y < this.points[i+1].y)
		{
			x0 = this.points[i].x
			x1 = this.points[i+1].x
			y0 = this.points[i].y
			y1 = this.points[i+1].y
		}
		else
		{
			x0 = this.points[i+1].x
			x1 = this.points[i].x
			y0 = this.points[i+1].y
			y1 = this.points[i].y
		}

		if(mouse.y > y0 && mouse.y < y1 && (mouse.x > x0 || mouse.x > x1))
		{
			if((mouse.x < x0 && mouse.x < x1))
			{
				cout += 1;
			}
			else{
				var dx = x0 - x1;
				var xc = x0;
				if(dx != 0)
				{
					xc += ( mouse.y - y0 ) * dx / ( y0 - y1 );
				}
				if(mouse.x > xc){
					cout += 1
				}
			}


		}

	}

	if(this.points[this.points.length-1].y < this.points[0].y)
		{
			x0 = this.points[this.points.length-1].x
			x1 = this.points[0].x
			y0 = this.points[this.points.length-1].y
			y1 = this.points[0].y
		}
		else
		{
			x0 = this.points[0].x
			x1 = this.points[this.points.length-1].x
			y0 = this.points[0].y
			y1 = this.points[this.points.length-1].y
		}

		if(mouse.y > y0 && mouse.y < y1 && (mouse.x > x0 || mouse.x > x1))
		{
			if((mouse.x < x0 && mouse.x < x1))
			{
				cout += 1;
			}
			else{
				var dx = x0 - x1;
				var xc = x0;
				if(dx != 0)
				{
					xc += ( mouse.y - y0 ) * dx / ( y0 - y1 );
				}
				if(mouse.x > xc){
					cout += 1
				}
			}


	}
	if(cout%2 == 1)
	{
		return true;
	}
	else
	{
		return false;
	}
}
Poligon.prototype.translate = function(distanceX,distanceY){
	for (var i = 0 ; i < this.points.length;i++){
		this.points[i].translate(distanceX,distanceY);
	}
}

Poligon.prototype.scale = function(distanceX,distanceY,center){
	for (var i = 0 ; i < this.points.length;i++){
    	this.points[i].scale(distanceX,distanceY,center);
	}
}

Poligon.prototype.rotate = function(operationPoint,previousMouse,mouse){
	for (var i = 0 ; i < this.points.length;i++){
		this.points[i].rotate(operationPoint,previousMouse,mouse);
	}
}

Poligon.prototype.mirror = function(mirrorLine){
	for (var i = 0 ; i < this.points.length;i++){
		this.points[i].mirror(mirrorLine);
	}
}


Poligon.prototype.isOnCanvas = function(){
	var pointsOnCanvas = 0;
	for (var i = 0 ; i < this.points.length;i++){
		if(this.points[i].isOnCanvas()){
			pointsOnCanvas++;		
		}
	}
	if(pointsOnCanvas == this.points.length){
		return true;
	}else{
		return false;
	}
}

Poligon.prototype.copy = function(){
	var arrayOfPoints = [];
	for (var i = 0 ; i < this.points.length;i++){
		arrayOfPoints.push(this.points[i].copy());
	}
	return new Poligon(arrayOfPoints,this.color);
}

Poligon.prototype.restore = function(a){
	var arrayOfPoints = [];
	for (var i = 0 ; i < a.points.length;i++){
		arrayOfPoints.push(a.points[i].copy());
	}
	this.points = arrayOfPoints;
	this.color = a.color;
}

Poligon.prototype.center = function(){
	var center = new Point(0,0);
	for(var i=0;i<this.points.length;i++){
		center.x += this.points[i].x;
		center.y += this.points[i].y;
	}
	center.x = center.x/this.points.length;
	center.y = center.y/this.points.length;
	return center;
}

Poligon.prototype.highlight = function(ctx){
	
}