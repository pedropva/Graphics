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
	this.curPoint=1;
}

// Draws this shape to a given context
Bezier.prototype.draw = function(ctx) {
	ctx.strokeStyle= this.color;
	ctx.beginPath();
	ctx.moveTo(this.Sx,this.Sy);
	ctx.bezierCurveTo(this.C1x,this.C1y,this.C2x,this.C2y,this.Ex,this.Ey);
	//ctx.closePath();
}

// Determine if a bezier curve is inside the mouse's bounds
Bezier.prototype.contains = function(mouse, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	/*
	var biggestX;
	var smallestX;
	var biggestY;
	var smallestY;
	if(this.Sx >= this.Ex){
		biggestX = this.Sx;
		smallestX = this.Ex;
	}else{
		biggestX = this.Ex;
		smallestX = this.Sx;
	}
	if(this.Sy >= this.Ey){
		biggestY = this.Sy;
		smallestY = this.Ey;
	}else{
		biggestY = this.Ey;
		smallestY = this.Sy;
	}
	return  (mouse.x > smallestX) && (mouse.x <= biggestX) && (mouse.y > smallestY) && (mouse.y <= biggestY);
	*/
	var bbox = calculateBoundingBox(this.Sx,this.Sy,this.C1x,this.C1y,this.C2x,this.C2y,this.Ex,this.Ey);
	return (mouse.x > bbox.x) && (mouse.x < bbox.x+bbox.width) && (mouse.y > bbox.y) && (mouse.y < bbox.y+bbox.height)
}

function calculateBoundingBox(ax, ay, bx, by, cx, cy, dx, dy)	{
    var px, py, qx, qy, rx, ry, sx, sy, tx, ty;
    var tobx, toby, tocx, tocy, todx, tody, toqx, toqy, torx, tory, totx, toty;
    var x, y, minx, miny, maxx, maxy;
    
    minx = miny = Number.POSITIVE_INFINITY;
    maxx = maxy = Number.NEGATIVE_INFINITY;
    
    tobx = bx - ax;  toby = by - ay;  
    tocx = cx - bx;  tocy = cy - by;
    todx = dx - cx;  tody = dy - cy;
    var step = 1/40;
    for(var d=0; d<1.001; d+=step){
        px = ax +d*tobx;  py = ay +d*toby;
        qx = bx +d*tocx;  qy = by +d*tocy;
        rx = cx +d*todx;  ry = cy +d*tody;
        toqx = qx - px;      toqy = qy - py;
        torx = rx - qx;      tory = ry - qy;
        
        sx = px +d*toqx;  sy = py +d*toqy;
        tx = qx +d*torx;  ty = qy +d*tory;
        totx = tx - sx;   toty = ty - sy;

        x = sx + d*totx;  y = sy + d*toty;
        
        minx = Math.min(minx, x); miny = Math.min(miny, y);
        maxx = Math.max(maxx, x); maxy = Math.max(maxy, y);
    }        
    return {x:minx, y:miny, width:maxx-minx, height:maxy-miny};
}


Bezier.prototype.translate = function(mouse){
	return true;
}

Bezier.prototype.scale = function(mouse){
	return true
}

Bezier.prototype.rotate = function(mouse){
	return true
}

Bezier.prototype.mirror = function(mouse){
	return true
}


Bezier.prototype.highlight = function(ctx){
	var aux = ctx.strokeStyle;
	var aux2 = ctx.lineWidth;
	ctx.strokeStyle = selectionColor;
	ctx.lineWidth = selectionWidth;
	ctx.beginPath();
	ctx.moveTo(selection.Sx, selection.Sy);
	ctx.lineTo(selection.C1x, selection.C1y);
	ctx.moveTo(selection.Ex, selection.Ey);
	ctx.lineTo(selection.C2x, selection.C2y);
	ctx.closePath();
	ctx.stroke();
	ctx.strokeStyle = aux;
	ctx.lineWidth = aux2;
}