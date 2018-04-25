function Point(x,y,w,h,color) {//x,y,width,heigth and color
	this.x = x || 400;
	this.y = y || 300;
	this.w = w || 5;
	this.h = h || 5;
	this.color = color || '#000000';
}

// Draws this shape to a given context
Point.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.fillRect(this.x, this.y, this.w, this.h);
	ctx.closePath();
}
// Determine if a point is inside the mouse's bounds
Point.prototype.contains = function(mouse, tol) {//mouse coordinates,tolerance
	// All we have to do is make sure the Mouse X,Y fall in the area between
	// the shape's X and (X + Width) and its Y and (Y + Height)
	return  (this.x < mouse.x+tol && this.x >mouse.x-tol && this.y < mouse.y+tol && this.y > mouse.y-tol);
}
Point.prototype.translate = function(distanceX,distanceY){//previous Mouse coordinates ,mouse coordinates
	
	var p0 = [];
	var mat =  [[1, 0,distanceX],
				[0, 1,distanceY],
				[0, 0, 1]];
	p0.push([this.x]);
	p0.push([this.y]);
	p0.push([1]);
	p0 = multMatriz(mat,p0);
	this.x = p0[0][0];
	this.y = p0[1][0];
}

Point.prototype.scale = function(distanceX,distanceY,center){
	var p0 = [];

	console.log(distanceX +","+ distanceY);

	var mat =  [[distanceX,0,0],
				[0,distanceY,0],
				[0,0,1]];

	this.translate(-center.x,-center.y);

	p0.push([this.x]);
	p0.push([this.y]);
	p0.push([1]);

    p0=multMatriz(mat,p0);
    this.x = p0[0][0];
	this.y = p0[1][0];

    this.translate(center.x,center.y);
}

Point.prototype.center = function(){
	return this.copy();
}

Point.prototype.rotate = function(operationPoint,angle){
	
	var m1 = [];
	var cos = Math.cos(angle);	
	var sin = Math.sin(angle);

	var m2=[[cos, -sin, 0],
		    [sin, cos, 0],
		    [0,0,1]];	

	this.translate(-operationPoint.x,-operationPoint.y);//moving the rotated point to the center of the coordinates system
	m1.push([this.x]);
	m1.push([this.y]);
	m1.push([1]);
	m1 = multMatriz(m2, m1);
	this.x = m1[0][0];
	this.y = m1[1][0];
	this.translate(operationPoint.x,operationPoint.y);//moving the rotated point back to its original spot
}

Point.prototype.mirror = function(mirrorLine){
	/*
	function mirror(p,p0,p1){
    
    	var dx, dy, a, b, x, y;

        dx = p1.x - p0.x;
        dy = p1.y - p0.y;
        a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
        b = 2 * dx * dy / (dx * dx + dy * dy);
        x = Math.round(a * (p.x - p0.x) + b * (p.y - p0.y) + p0.x); 
        y = Math.round(b * (p.x - p0.x) - a * (p.y - p0.y) + p0.y);

        return new Ponto(x,y);
    }
    */
    var dx, dy, a, b;
    dx = mirrorLine.S.x - mirrorLine.E.x;
    dy = mirrorLine.S.y - mirrorLine.E.y;
    a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
    b = 2 * dx * dy / (dx * dx + dy * dy);
    this.x = Math.round(a * (this.x - mirrorLine.E.x) + b * (this.y - mirrorLine.E.y) + mirrorLine.E.x); 
    this.y = Math.round(b * (this.x - mirrorLine.E.x) - a * (this.y - mirrorLine.E.y) + mirrorLine.E.y);
}

Point.prototype.pickCode = function(mouse,tol){
	var code = []
	code[0] = this.x < mouse.x-tol;
	code[1] = this.x > mouse.x+tol;
	code[2] = this.y < mouse.y-tol;
	code[3] = this.y > mouse.y+tol;
	return code;

}
Point.prototype.isOnCanvas = function(){
	if(this.x > 0 && this.y > 0 && this.x < canvas.width-1 && this.y < canvas.height-1){
		return true;
	}else{
		return false;
	}
}

Point.prototype.copy = function(){
	return new Point(this.x,this.y,this.color);
}

Point.prototype.restore = function(a){
	this.x = a.x;
	this.y = a.y;
	this.color = a.color;
}

Point.prototype.highlight = function(ctx){
	var aux = ctx.strokeStyle;
	var aux2 = ctx.lineWidth;
	ctx.strokeStyle = selectionColor;
	ctx.lineWidth = selectionWidth;
	ctx.strokeRect(this.x,this.y,this.w,this.h);	
	ctx.strokeStyle = aux;
	ctx.lineWidth = aux2;
}
