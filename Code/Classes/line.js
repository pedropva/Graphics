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
	var distX = this.S.x;
	var distY = this.S.y;
	this.S.transform(mx,my);
	this.E.x += this.S.x - distX;
	this.E.y += this.S.y - distY;
}

Line.prototype.scale = function(mx,my){
	rate = mx/(canvas.width/1.5);
	console.log(rate);
	if((this.S.x*rate > 1 && this.S.y*rate > 1 && this.E.x*rate > 1 && this.E.y*rate > 1)&&(this.S.x*rate < canvas.width-1 && this.S.y*rate < canvas.width-1 && this.E.x*rate < canvas.width-1 && this.E.y*rate < canvas.width-1)){
		this.S.x *= rate;
		this.S.y *= rate;
		this.E.x *= rate;
		this.E.y *= rate;	
	}
}

Line.prototype.rotate = function(mx,my,angle){
	if(mx > 0){
		angle = 0.1;
	}else{
		angle = -0.1;
	}
	var m1 = [];
	var cos = Math.cos(angle*180);
	var sin = Math.sin(angle*180);
	var ptList = [this.S,this.E];
	var aux1 = new Point(this.S.x,this.S.y);
	var aux2 = new Point(this.E.x,this.E.y);
	var dist1 = 0;
	var dist2 = 0;
	var m2 = [[cos, -sin, 0],
		    [sin, cos, 0],
		    [0,0,1]];
	for (var i = 0 ; i < ptList.length;i++){
		m1 = [];
		console.log(ptList[i]);
		console.log(mx+","+my);
		dist1 = mx-ptList[i].x;
		dist2 = my-ptList[i].y;
		ptList[i].x -= dist1;//transladando pro centro
		ptList[i].y -= dist2;
		console.log(ptList[i]);
		m1.push([ptList[i].x]);
		m1.push([ptList[i].y]);
		m1.push([1]);
		m1 = multMatriz(m2, m1);
		ptList[i].x = m1[0];
		ptList[i].y = m1[1];
		ptList[i].x += dist1;//transladando de volta
		ptList[i].y += dist2;
	}
	if((this.S.x > 1 && this.S.y > 1 && this.E.x > 1 && this.E.y > 1)&&(this.S.x < canvas.width-1 && this.S.y < canvas.width-1 && this.E.x < canvas.width-1 && this.E.y < canvas.width-1)){

	}else{
		console.log("transformacao proibida! resultado fora da tela");
		this.S.x = aux1.x;
		this.S.y = aux1.y;
		this.E.x = aux1.x;
		this.E.y = aux1.y;
	}
}

Line.prototype.mirror = function(mx,my){
	return true
}

Line.prototype.highlight = function(ctx,selectionWidth){
	
}