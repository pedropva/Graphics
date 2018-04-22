function Poligon(points,color) {//points is a array with the sequence of points to close the polygon
	this.color = color || '#AAAAAA';
	this.points = points || [new Point(200,200),new Point(200,300),new Point(300,300),new Point(300,200)]//[200,200,200,300,300,300,300,200]
	this.curPoint = 1;
}

// Draws this shape to a given context
Poligon.prototype.draw = function(ctx) {
	ctx.strokeStyle = this.color;
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.moveTo(this.points[0].x,this.points[0].y);
	var i=0;
	for (i; i < parseInt(this.points.length); i++) {
		ctx.lineTo(this.points[i].x,this.points[i].y);
	}
	ctx.fill()
}

// Determine if a poligon is inside the mouse's bounds
Poligon.prototype.contains = function(mx, my, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	var cout = 0;
	for (var i = 0;i<this.points.length;i++)
	{
		if(this.points[i].contains(mx,my,tol) == true)
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

		if(my > y0 && my < y1 && (mx > x0 || mx > x1))
		{
			if((mx < x0 && mx < x1))
			{
				cout += 1;
			}
			else{
				var dx = x0 - x1;
				var xc = x0;
				if(dx != 0)
				{
					xc += ( my - y0 ) * dx / ( y0 - y1 );
				}
				if(mx > xc){
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

		if(my > y0 && my < y1 && (mx > x0 || mx > x1))
		{
			if((mx < x0 && mx < x1))
			{
				cout += 1;
			}
			else{
				var dx = x0 - x1;
				var xc = x0;
				if(dx != 0)
				{
					xc += ( my - y0 ) * dx / ( y0 - y1 );
				}
				if(mx > xc){
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
Poligon.prototype.transform = function(mx,my){
	return true;
}

Poligon.prototype.scale = function(mx,my){
	return true
}

Poligon.prototype.rotate = function(mx,my){
	return true
}

Poligon.prototype.mirror = function(mx,my){
	return true
}

Poligon.prototype.highlight = function(ctx){
	
}