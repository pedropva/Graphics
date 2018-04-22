function Image(src,x,y,w,h) {
  this.src = src || "Icons/Arc2.png";
  this.x = x || 400;
  this.y = y || 300;
  this.w = w || 5;
  this.h = h || 5;
}

// Draws this shape to a given context
Image.prototype.draw = function(ctx) {
	var img = document.getElementById(src);
	ctx.drawImage(this.img,this.x,this.y);
}
