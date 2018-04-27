function Bezier(S,C1,C2,E,color) {//C1 and C2: Control point 1 and 2
	this.C1 = C1 || new Point(100,100);
	
	this.C2 = C2 || new Point(200,300);
	
	this.S = S || new Point(400,400);
	
	this.E = E || new Point(100,150);
	
	this.color = color || '#AAAAAA';
	this.curPoint=1;
}

// Draws this shape to a given context
Bezier.prototype.draw = function(ctx) {
	ctx.strokeStyle= this.color;
	ctx.beginPath();
	ctx.moveTo(this.S.x,this.S.y);
	ctx.bezierCurveTo(this.C1.x,this.C1.y,this.C2.x,this.C2.y,this.E.x,this.E.y);
	//ctx.closePath();
}

// Determine if a bezier curve is inside the mouse's bounds
Bezier.prototype.contains = function(mouse, tol) {
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	var bbox = calculateBoundingBox(this.S.x,this.S.y,this.C1.x,this.C1.y,this.C2.x,this.C2.y,this.E.x,this.E.y);
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

Bezier.prototype.translate = function(distanceX,distanceY){
	var ptList = [this.S,this.E,this.C1,this.C2];
	for (var i = 0 ; i < ptList.length;i++){
		ptList[i].translate(distanceX,distanceY);
	}
}

Bezier.prototype.scale = function(distanceX,distanceY,center){
	var ptList = [this.S,this.E,this.C1,this.C2];
	for (var i = 0 ; i < ptList.length;i++){
    	ptList[i].scale(distanceX,distanceY,center);
	}
}

Bezier.prototype.rotate = function(operationPoint,previousMouse,mouse){
	var ptList = [this.S,this.E,this.C1,this.C2];
	for (var i = 0 ; i < ptList.length;i++){
		ptList[i].rotate(operationPoint,previousMouse,mouse);
	}
}

Bezier.prototype.mirror = function(mirrorLine){
	var ptList = [this.S,this.E,this.C1,this.C2];
	for (var i = 0 ; i < ptList.length;i++){
		ptList[i].mirror(mirrorLine);
	}
}


Bezier.prototype.isOnCanvas = function(){
	var pointsOnCanvas = 0;
	var ptList = [this.S,this.E,this.C1,this.C2];
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

Bezier.prototype.copy = function(){
	return new Bezier(this.S.copy(),this.C1.copy(),this.C2.copy(),this.E.copy(),this.color);
}

Bezier.prototype.restore = function(a){
	this.S = a.S;
	this.C1 = a.C1;
	this.C2 = a.C2;
	this.E = a.E;
	this.color = a.color;
}

Bezier.prototype.center = function(){
	var center = new Point(0,0);
	var ptList = [this.S,this.E,this.C1,this.C2];
	for(var i=0;i<ptList.length;i++){
		center.x += ptList[i].x;
		center.y += ptList[i].y;
	}
	center.x=center.x/ptList.length;
	center.y=center.y/ptList.length;
	return center;
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